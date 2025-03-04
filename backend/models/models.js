const { type } = require('os');
const sequelize = require('../db');
const { DataTypes, UUIDV4 } = require('sequelize');

const Users = sequelize.define('users', {
    id_user: { type: DataTypes.UUID, primaryKey: true, defaultValue: UUIDV4 },
    login: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING }
}, { timestamps: false });

const Stations = sequelize.define('stations', {
    id_station: { type: DataTypes.UUID, primaryKey: true, defaultValue: UUIDV4 },
    name_station: { type: DataTypes.TEXT },
    location: { type: DataTypes.STRING, unique: true }
}, { timestamps: false });

const Trains = sequelize.define('trains', {
    id_train: { type: DataTypes.UUID, primaryKey: true, defaultValue: UUIDV4 },
    number_train: { type: DataTypes.TEXT },
    type_train: { type: DataTypes.TEXT }
}, { timestamps: false });

const Passengers = sequelize.define('passengers', {
    id_user: { type: DataTypes.UUID, references: { model: Users, key: 'id_user' } },
    id_passenger: { type: DataTypes.UUID, primaryKey: true, defaultValue: UUIDV4 },
    first_name: { type: DataTypes.TEXT },
    last_name: { type: DataTypes.TEXT }
}, { timestamps: false });

const Van = sequelize.define('van', {
    id_train: { type: DataTypes.UUID, references: { model: Trains, key: 'id_train' } },
    id_van: { type: DataTypes.UUID, primaryKey: true, defaultValue: UUIDV4 },
    type: { type: DataTypes.TEXT },
    capacity: { type: DataTypes.INTEGER }
}, { timestamps: false });

const Tickets = sequelize.define('tickets', {
    id_passenger: { type: DataTypes.UUID, references: { model: Passengers, key: 'id_passenger' } },
    number_van: { type: DataTypes.UUID, references: { model: Van, key: 'id_van' } },
    id_ticket: { type: DataTypes.UUID, primaryKey: true, defaultValue: UUIDV4 },
    place: { type: DataTypes.STRING },
    category: { type: DataTypes.TEXT }
}, { timestamps: false });

const Schedules = sequelize.define('schedules', {
    id_train: { type: DataTypes.UUID, references: { model: Trains, key: 'id_train' } },
    id_station: { type: DataTypes.UUID, references: { model: Stations, key: 'id_station' } },
    id_schedule: { type: DataTypes.UUID, primaryKey: true, defaultValue: UUIDV4 },
    way: { type: DataTypes.INTEGER },
    arrival_time: { type: DataTypes.DATE },
    departure_time: { type: DataTypes.DATE }
}, { timestamps: false });

// Определение связей
Passengers.belongsTo(Users, {
    foreignKey: 'id_user'
});

Users.hasMany(Passengers, {
    foreignKey: 'id_user'
});

Van.hasMany(Tickets, {
    foreignKey: 'number_van'
});

Schedules.belongsTo(Stations, {
    foreignKey: 'id_station'
});

Schedules.belongsTo(Trains, {
    foreignKey: 'id_train'
});

module.exports = {
    Users,
    Passengers,
    Tickets,
    Trains,
    Schedules,
    Van,
    Stations
};