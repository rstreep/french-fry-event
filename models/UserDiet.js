const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

/**
 * UserDiet Model
 *
 * Represents the association between users and diets in a many-to-many relationship.
 * This model defines the UserDiet table and its fields.
 */
class UserDiet extends Model {}

UserDiet.init(
  {
    // Primary key field
    user_diet_id: {
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
    // Foreign key referencing diet table
    diet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'diet',
        key: 'diet_id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_diet'
  }
);

module.exports = UserDiet;
