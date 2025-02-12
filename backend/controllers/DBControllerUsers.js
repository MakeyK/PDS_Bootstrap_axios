const { Users, Passengers, Tickets, Trains, Schedules, Van, Stations } = require('../models/models')
const { Sequelize } = require('../db')
const { QueryTypes } = require('sequelize')
const sequelize = require('../db')
const jwt = require('jsonwebtoken')
const ApiError = require('../ApiError')

class DBControllerUsers {
    // Создание записи в таблице Users
    async createUsers(req, res, next) {
        try {
            const { login, password, role } = req.body;
            if (!login || !password) {
                return next(ApiError.badRequest("Введите полностью данные"));
            }
            const createus = await Users.create({ login, password, role });
            return res.json({ message: "Пользователь создан" });
        } catch (error) {
            next(ApiError.badRequest("Что-то пошло не так"));
            console.log(error);
        }
    }

    // Вывод всей таблицы Users
    async getAll(req, res) {
        const users = await Users.findAll();
        return res.json(users);
    }

    // Вывод записей по определённому ID таблицы Users
    async getID(req, res) {
        const { id_user } = req.params;
        let id_us = await Users.findAll({ where: { id_user } });
        return res.json(id_us);
    }

    // Удаление по выбранному ID таблицы Users
    async DelId(req, res) {
        const { id_user } = req.params;
        let delid = await Users.destroy({ where: { id_user } });
        return res.json(delid);
    }

    // Удаление всех записей в таблице Users
    async DelFull(req, res) {
        let query_del_all = 'DELETE FROM "users"';
        const test_del_all = await sequelize.query(query_del_all);
        if (test_del_all) res.send({ message: "Все записи удалены!" });
        else res.send({ ERROR: "Не удалось удалить записи!" });
    }

    // Редактирование записей по выбранному ID Users
    async RedId(req, res) {
        const { id_user } = req.body;
        const red = await Users.update({ title: req.body.title }, { where: { id_user } });
        return res.json(red);
    }

    // Обновление логина и пароля пользователя по ID_user
    async updateUser(req, res, next) {
        try {
            const { login, password } = req.body;
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return next(ApiError.badRequest('Токен не предоставлен'));
            }
            let decoded;
            try {
                decoded = jwt.verify(token, process.env.SECRET_KEY);
            } catch (jwtError) {
                console.error("Ошибка декодирования токена:", jwtError);
                return next(ApiError.badRequest("Недействительный токен"));
            }
            const id_user = decoded.id_user;
            const user = await Users.findOne({ where: { id_user } });
            if (!user) {
                return next(ApiError.notFound("Пользователь не найден"));
            }
            console.log("Полученные данные:", { login, password });
            if (!login?.trim() && !password?.trim()) {
                return next(ApiError.badRequest('Введите логин или пароль для обновления'));
            }
            if (login) {
                user.login = login.trim();
            }
            if (password) {
                user.password = password.trim();
            }
            await user.save();
            return res.json({ message: 'Данные обновлены', user });
        } catch (error) {
            console.error("Ошибка при обновлении пользователя:", error);
            return next(ApiError.badRequest("Ошибка при обновлении пользователя"));
        }
    }
}

module.exports = new DBControllerUsers();