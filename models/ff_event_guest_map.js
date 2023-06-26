const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ff_event_guest_map extends Model {}

ff_event_guest_map.init(
    {
        eventmapid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userid: {
            type: DataTypes.INTEGER
        },
        eventid: {
            type: DataTypes.INTEGER
        }
    }
);
module.exports = ff_event_guest_map;