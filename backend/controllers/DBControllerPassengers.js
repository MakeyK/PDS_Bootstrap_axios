const { Users, Passengers, Tickets, Trains, Schedules, Van, Stations } = require('../models/models')
const { Sequelize } = require('../db')
const { QueryTypes } = require('sequelize')
const sequelize = require('../db')
const ApiError = require('../ApiError')

class DBControllerUPassengers {
    // Создание записи в таблице Passengers
    async createPassengers(req, res, next) {
        try {
            const { first_name, last_name } = req.body.data
            const id_user = req.user.id_user
            if (!first_name || !last_name) {
                return next(ApiError.badRequest("Введите полностью данные"))
            }
            const createpas = await Passengers.create({ id_user, first_name, last_name })
            return res.json({ message: "Производитель создан" })
        } catch (error) {
            next(ApiError.badRequest("Что-то пошло не так"))
            console.log(error)
        }
    }
    // Вывод всей таблицы Passengers
    async getAll(req, res) {
        const passengers = await Passengers.findAll()
        return res.json(passengers)
    }
    // Вывод записей по определённому ID таблицы Passengers
    async getID(req, res) {
        const { id_passenger } = req.params
        let id_passeng = await Passengers.findAll({ where: { id_passenger } })
        return res.json(id_passeng)
    }
    // Удаление по выбранному ID таблицы Users
    async DelId(req, res) {
        const { id_passenger } = req.params
        let delidpas = await Passengers.destroy({ where: { id_passenger } })
        return res.json(delidpas)
    }
    // Удаление всех записей в таблице Passengers
    async DelFull(req, res) {
        let query_del_all = `DELETE FROM "passengers"`
        const test_del_all = await sequelize.query(query_del_all)
        if (test_del_all) res.send({ messenge: "Все записи удалены!" })
        else res.send({ ERROR: "Не удалось удалить записи!" })
    }
    // Редактирование записей по выбранному ID Passengers
    async RedId(req, res) {
        const { id_passenger } = req.body
        const redpas = await Passengers.update({ title: req.body.title }, { where: { id_passenger } })
        return res.json(redpas)
    }

    // Обновление данных Пассажира
    async updatePassenger(req, res, next) {
        try {
            const { data } = req.body;
            if (!data) {
                console.log(data)
                return next(ApiError.badRequest("Данные не предоставлены"));
            }
            const { first_name, last_name } = data;
            const id_user = req.user.id_user;
            const passenger = await Passengers.findOne({ where: { id_user } });
            if (!passenger) {
                return next(ApiError.badRequest("Пассажир не найден"));
            }
            console.log("Полученные данные:", { first_name, last_name });
            if (!first_name?.trim() && !last_name?.trim()) {
                return next(ApiError.badRequest('Введите имя или фамилию для обновления'));
            }
            if (first_name) {
                passenger.first_name = first_name.trim();
            }
            if (last_name) {
                passenger.last_name = last_name.trim();
            }
            await passenger.save();
            return res.json({ message: 'Данные обновлены', passenger });
        } catch (error) {
            console.error("Ошибка при обновлении пассажира:", error);
            return next(ApiError.badRequest("Ошибка при обновлении пассажира"));
        }
    }
}

module.exports = new DBControllerUPassengers()