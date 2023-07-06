/**
 * Dish Model
 *
 * Represents a dish in the application.
 * This model defines the Dish table and its fields.
 */

// Import Sequelize dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Dish model
class Dish extends Model {}

// Initialize Dish model
Dish.init(
    {
        // Primary key field
        dish_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        // Dish type field
        dish_type: {
            type: DataTypes.STRING
        },
        // Dish name field
        dish_name: {
            type: DataTypes.STRING
        },
        // Recipe field
        recipe: {
            type: DataTypes.TEXT
        },
        ingredients: {
            type: DataTypes.TEXT
        },
        // Photo link field
        photo_link: {
            type: DataTypes.STRING
        }
    },
    // Configure options
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'dish'
      }
);

// Export Dish model
module.exports = Dish;
