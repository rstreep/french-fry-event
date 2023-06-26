const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ff_event extends Model {}

ff_event.init(
    {
        eventid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        eventname: {
            type: DataTypes.STRING,
            unique: true
        },
        eventdesc: {
            type: DataTypes.STRING
        },
        eventtype: {
            type: DataTypes.STRING
        },
        host_userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        menuid: {
            type: DataTypes.INTEGER
        },
        streetaddress: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        zip: {
            type: DataTypes.INTEGER,
            validate: {
                len: [5],
              },
        },
        eventdate: {
            type: DataTypes.DATEONLY
        },
        createddate: {
            type: DataTypes.DATE
        },
    }
);
module.exports = ff_event;