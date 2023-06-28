/**
 * Model Associations
 *
 * This module defines the associations between the different models.
 * It exports the model associations for the application.
 */

// Import Sequelize dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Import models
const User = require('./User');
const Diet = require('./Diet');
const Allergy = require('./Allergy');
const Dish = require('./Dish');
const UserDiet = require('./UserDiet');
const UserAllergy = require('./UserAllergy');
const Event = require('./Event');
const Guest = require('./Guest');
const Menu = require('./Menu');

// Define associations

// User - Event association
User.belongsToMany(Event, {
  through: Guest,
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Event.belongsToMany(User, {
  through: Guest,
  foreignKey: 'event_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Event - User association (host_user_id)
Event.belongsTo(User, {
  foreignKey: 'host_user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
User.hasMany(Event, {
  foreignKey: 'host_user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Event - Dish association
Event.belongsToMany(Dish, {
  through: Menu,
  foreignKey: 'event_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Dish.belongsToMany(Event, {
  through: Menu,
  foreignKey: 'dish_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// User - Allergy association
User.belongsToMany(Allergy, {
  through: UserAllergy,
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Allergy.belongsToMany(User, {
  through: UserAllergy,
  foreignKey: 'allergy_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// User - Diet association
User.belongsToMany(Diet, {
  through: UserDiet,
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Diet.belongsToMany(User, {
  through: UserDiet,
  foreignKey: 'diet_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Export model associations
module.exports = {
  User,
  Diet,
  Allergy,
  Dish,
  UserDiet,
  UserAllergy,
  Event,
  Guest,
  Menu
};
