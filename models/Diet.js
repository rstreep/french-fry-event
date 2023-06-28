/**
 * Diet.js
 *
 * This module defines the Diet model, representing different types of diets.
 * It exports the Diet model class, which can be used to interact with the diets table in the database.
 */

// Import Sequelize dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Diet model
class Diet extends Model {}

// Initialize Diet model
Diet.init(
  {
    // Diet ID field
    diet_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // Diet name field
    diet_name: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'diet',
  }
);

// Export Diet model
module.exports = Diet;
