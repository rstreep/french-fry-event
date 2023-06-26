const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ff_user extends Model {}

ff_user.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstname: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [6],
            },
        },
        allergy_lookupid: {
            type: DataTypes.INTEGER
        },
        createddate: {
            type: DataTypes.DATE
        },
        changeddate: {
            type: DataTypes.DATE
        }
    }
);
module.exports = ff_user;
