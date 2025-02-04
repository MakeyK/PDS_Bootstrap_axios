const { Users, Passengers, Tickets, Trains, Schedules, Van, Stations } = require('../models/models')
const { Sequelize } = require('../db')
const { QueryTypes } = require('sequelize')
const sequelize = require('../db')
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
            const { id_user } = req.params;
            const { login, password } = req.body;

            // Проверка наличия логина и пароля
            if (!login || !password) {
                return next(ApiError.badRequest("Введите логин и пароль"));
            }

            // Проверка существования пользователя
            const user = await Users.findOne({ where: { id_user } });
            if (!user) {
                return next(ApiError.notFound("Пользователь не найден"));
            }

            // Обновление данных пользователя
            user.login = login;
            user.password = password;
            await user.save();

            // Возвращаем обновленного пользователя
            return res.json(user);
        } catch (error) {
            console.error("Ошибка при обновлении пользователя:", error);
            return next(ApiError.internal("Ошибка при обновлении пользователя"));
        }
    }
}

module.exports = new DBControllerUsers();