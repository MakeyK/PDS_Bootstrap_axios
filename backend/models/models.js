const { type } = require('os')
const sequelize = require('../db')
const {DataTypes, DATE, MEDIUMINT} = require('sequelize')
const { model } = require('crypto-js')

const Users = sequelize.define('users',{
    id_user: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    login: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING}
},  {timestamps: false})

const Stations = sequelize.define('stations', {
    id_station: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name_station: {type: DataTypes.TEXT},
    location: {type: DataTypes.STRING, unique: true}
},  {timestamps: false})

const Trains = sequelize.define('trains', {
    id_train: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number_train: {type: DataTypes.TEXT},
    type_train: {type: DataTypes.TEXT}
}, {timestamps: false})

const Passengers = sequelize.define('passengers', {
    id_user: {type: DataTypes.INTEGER, references: {model: Users, key: 'id_user'}},
    id_passenger: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name: {type: DataTypes.TEXT},
    last_name: {type: DataTypes.TEXT}
}, {timestamps: false})

const Van = sequelize.define('van', {
    id_train: {type: DataTypes.INTEGER, references: {model: Trains, key:'id_train'}},
    id_van: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.TEXT},
    capacity: {type: DataTypes.INTEGER}
}, {timestamps: false})

const Tickets = sequelize.define('tickets', {
    id_passenger: {type: DataTypes.INTEGER, references: {model: Passengers, key:'id_passenger'}},
    number_van: {type: DataTypes.INTEGER,references: {model: Van, key:'id_van'}},
    id_ticket: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    place: {type: DataTypes.STRING},
    category: {type: DataTypes.TEXT}
}, {timestamps: false})

const Schedules = sequelize.define('schedules', {
    id_train: {type: DataTypes.INTEGER, references: {model: Trains, key:'id_train'}},
    id_station: {type: DataTypes.INTEGER, references: {model: Stations, key: 'id_station'}},
    id_schedule: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    way: {type: DataTypes.INTEGER},
    arrival_time: {type: DataTypes.DATE},
    departure_time: {type: DataTypes.DATE}
}, {timestamps: false})

Passengers.hasMany(Tickets, {
    foreignKey: 'id_passenger'
})
Users.hasOne(Passengers, {
    foreignKey: 'id_user'
})
Van.hasMany(Tickets, {
    foreignKey: 'id_van'
})
Van.hasMany(Tickets, {
    foreignKey: 'number_van'
})
Schedules.hasMany(Stations, {
    foreignKey: 'id_station'
})
Schedules.hasMany(Trains, {
    foreignKey: 'id_train'
})


module.exports = {
    Users, Passengers, Tickets, Trains, Schedules, Van, Stations 
}