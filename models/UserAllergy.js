/**
 * UserAllergy Model
 *
 * Represents the association between users and allergies in a many-to-many relationship.
 * This model defines the UserAllergy table and its fields.
 */

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserAllergy extends Model {}

UserAllergy.init(
  {
    // Primary key field
    user_allergy_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Foreign key referencing user table
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    // Foreign key referencing allergy table
    allergy_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
      model: 'allergy',
      key: 'allergy_id'
       }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_allergy'
  }
);

module.exports = UserAllergy;
