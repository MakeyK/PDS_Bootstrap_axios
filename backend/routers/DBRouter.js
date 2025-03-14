const Router = require('express')
const router = new Router()
const authMiddleware = require('../authMiddleware')
const DBControllerUsers = require('../controllers/DBControllerUsers')
const DBControllerPassengers = require('../controllers/DBControllerPassengers')
const DBControllerSchedules = require('../controllers/DBControllerSchedules')
const DBControllerStations = require('../controllers/DBControllerStations')
const DBControllerTrains = require('../controllers/DBControllerTrains')
const DBControllerVans = require('../controllers/DBControllerVans')
const DBControllerTickets = require('../controllers/DBCotrollerTickets')
const AuthController = require('../controllers/AuthController')
const db = require('../db')
const checkRoleMiddleware = require('../checkRoleMiddleware')

// Авторизация и регистрация
router.post('/registration', AuthController.registration)
router.post('/login', AuthController.login)

// Создание записей в таблицах
router.post('/createuser', DBControllerUsers.createUsers)
router.post('/createpassenger', authMiddleware, DBControllerPassengers.createPassengers)
router.post('/createschedule', authMiddleware, DBControllerSchedules.createSchedules)
router.post('/createtrain', checkRoleMiddleware(['admin']), authMiddleware, DBControllerTrains.createTrains)
router.post('/createticket', authMiddleware, DBControllerTickets.createTickets)
router.post('/createvan', authMiddleware, DBControllerVans.createVans)
router.post('/createstation', authMiddleware, DBControllerStations.createStations)

// Выборка всех записей из таблицы
router.get('/getallpassengers', DBControllerPassengers.getAll)
router.get('/getallusers', authMiddleware, DBControllerUsers.getAll)

router.get('/getallschedules', DBControllerSchedules.getAll)
router.get('/getalltrains', DBControllerTrains.getAll)
router.get('/getalltickets', DBControllerTickets.getAll)
router.get('/getallvans', DBControllerVans.getAll)
router.get('/getallstations', DBControllerStations.getAll)

// Выборка по ID
router.get('/getus/:id_user', DBControllerUsers.getID)
router.get('/getpas/:id_passenger', DBControllerPassengers.getID)
router.get('/getsched/:id_schedule', DBControllerSchedules.getID)
router.get('/gettr/:id_train', DBControllerTrains.getID)
router.get('/gettick/:id_ticket', DBControllerTickets.getID)
router.get('/getv/:id_van', DBControllerVans.getID)
router.get('/getstat/:id_station', DBControllerStations.getID)

// Удаление по ID 
router.delete('/delus/:id_user', checkRoleMiddleware(['admin']), DBControllerUsers.DelId)
router.delete('/delpas/:id_passenger', DBControllerPassengers.DelId)
router.delete('/delsched/:id_schedule', DBControllerSchedules.DelId)
router.delete('/deltr/:id_train', DBControllerTrains.DelId)
router.delete('/deltick/:id_ticket', DBControllerTickets.DelId)
router.delete('/delv/:id_van', DBControllerVans.DelId)
router.delete('/delstat/:id_station', DBControllerStations.DelId)

// Удаление
router.delete('/delfus', DBControllerUsers.DelFull)
router.delete('/delfpas', DBControllerPassengers.DelFull)
router.delete('/delfsched', DBControllerSchedules.DelFull)
router.delete('/delftr', DBControllerTrains.DelFull)
router.delete('/delftick', DBControllerTickets.DelFull)
router.delete('/delfv', DBControllerVans.DelFull)
router.delete('/delfstat', DBControllerStations.DelFull)
router.delete('/del/:id_train',checkRoleMiddleware(['admin']), DBControllerTrains.DelId)
router.delete('/del/:id_user',checkRoleMiddleware(['admin']), DBControllerUsers.DelId)

// Редактирование по ID
router.patch('/redus/:id_user', DBControllerUsers.RedId)
router.patch('/redpas/:id_passenger', DBControllerPassengers.RedId)
router.patch('/redsched/:id_schedule', DBControllerSchedules.RedId)
router.patch('/redtr/:id_train', DBControllerTrains.RedId)
router.patch('/redtick/:id_ticket', DBControllerTickets.RedId)
router.patch('/redv/:id_van', DBControllerVans.RedId)
router.patch('/redstat/:id_station', DBControllerStations.RedId)

// Обновление данных
router.patch('/red', DBControllerUsers.updateUser)
router.patch('/redpassenger', authMiddleware, DBControllerPassengers.updatePassenger)

module.exports = router