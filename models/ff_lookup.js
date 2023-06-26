const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ff_lookup extends Model {}

ff_lookup.init(
    {
        lookupid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        typename: {
            type: DataTypes.STRING
        },
        typedesc: {
            type: DataTypes.STRING
        },
        typevalue: {
            type: DataTypes.STRING
        }
    }
);
module.exports = ff_lookup;