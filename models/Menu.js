/**
 * Menu Model (List of Dishes that represent an Event's Menu)
 *
 * Represents the association between dishes and events in a many-to-many relationship.
 * This model defines the Menu table and its fields.
 */

// Import Sequelize dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// Menu model
class Menu extends Model {}
// Initialize Menu model
Menu.init(
    {
        // Primary key field
        menu_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        // Foreign key referencing dish table
        dish_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'dish',
              key: 'dish_id'
            }
        },
        // Foreign key referencing event table
        event_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'event',
                key: 'event_id'
              }
        }
    },
    // Configure options
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'menu'
      }
);
// Export Menu model
module.exports = Menu;
