/**
 * Allergy.js
 *
 * This module defines the Allergy model, representing different types of allergies.
 * It exports the Allergy model class, which can be used to interact with the allergies table in the database.
 */

// Import Sequelize dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Allergy model
class Allergy extends Model {}

// Initialize Allergy model
Allergy.init(
  {
    // Allergy ID field
    allergy_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    // Allergy product field
    allergy_product: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'allergy',
  }
);

// Export Allergy model
module.exports = Allergy;
