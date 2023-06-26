const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ff_menu extends Model {}

ff_menu.init(
    {
        menu_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        appetizer1_lookupid: {
            type: DataTypes.INTEGER
        },
        appetizer2_lookupid: {
            type: DataTypes.INTEGER
        },
        entree_lookupid: {
            type: DataTypes.INTEGER
        },
        dessert1_lookupid: {
            type: DataTypes.INTEGER
        },
        dessert2_lookupid: {
            type: DataTypes.INTEGER
        },
        event_id: {
            type: DataTypes.INTEGER
        }
    }
);
module.exports = ff_menu;
