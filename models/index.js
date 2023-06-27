const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const ff_user = require('./ff_user');


module.exports = { ff_user };