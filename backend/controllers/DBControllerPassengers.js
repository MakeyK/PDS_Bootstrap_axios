const {Users, Passengers, Tickets, Trains, Schedules, Van, Stations} = require('../models/models')
const {Sequelize} = require('../db')
const {QueryTypes} = require('sequelize')
const sequelize = require('../db')
const ApiError = require('../ApiError')

class DBControllerUPassengers
{
    // Создание записи в таблице Passengers
    async createPassengers(req, res, next)
    {
        try {
            const {first_name, last_name} = req.body
            if(!first_name||!last_name)
            {
                return next(ApiError.badRequest("Введите полностью данные"))
            }
            const createpas = await Passengers.create({first_name, last_name})
            return res.json({message: "Производитель создан"})
        } catch (error) {
            next(ApiError.badRequest("Что-то пошло не так"))
            console.log(error)
        }
    }
    // Вывод всей таблицы Passengers
    async getAll(req,res)
    {
        const passengers = await Passengers.findAll()
        return res.json(passengers)
    }
    // Вывод записей по определённому ID таблицы Passengers
    async getID(req,res)
    {
        const {id_passenger} = req.params
        let id_passeng = await Passengers.findAll({where:{id_passenger}})
        return res.json(id_passeng)
    }
    // Удаление по выбранному ID таблицы Users
    async DelId(req,res)
    {
        const {id_passenger} = req.params
        let delidpas = await Passengers.destroy({where:{id_passenger}})
        return res.json(delidpas)
    }
    // Удаление всех записей в таблице Passengers
    async DelFull(req,res)
    {
        let query_del_all=`DELETE FROM "passengers"`
        const test_del_all = await sequelize.query(query_del_all)
        if(test_del_all) res.send({messenge: "Все записи удалены!"})
        else res.send({ERROR: "Не удалось удалить записи!"})
    }
    // Редактирование записей по выбранному ID Passengers
    async RedId(req,res)
    {
        const {id_passenger} = req.body
        const redpas = await Passengers.update({title : req.body.title},{where:{id_passenger}})
        return res.json(redpas)
    }

    // Обновление имя и фамилия пользователя по ID_user
    async updatePassenger(req, res, next) {
        try {
            const { first_name, last_name } = req.body;
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
            const passenger = await Passengers.findOne({ where: { id_user } });
            if (!passenger) {
                return next(ApiError.notFound("Пассажир не найден"));
            }
            console.log("Полученные данные:", { first_name, last_name });
            if (!first_name?.trim() && !last_name?.trim()) {
                return next(ApiError.badRequest('Введите логин или пароль для обновления'));
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
            console.error("Ошибка при обновлении пользователя:", error);
            return next(ApiError.badRequest("Ошибка при обновлении пользователя"));
        }
    }
}

module.exports = new DBControllerUPassengers()