/**
 * User.js
 *
 * This module defines the User model, representing user data and authentication.
 * It exports the User model class, which can be used to interact with the users table in the database.
 */

// Import Sequelize dependencies
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// User model
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize User model
User.init(
  {
    // User ID field
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    // First name field
    first_name: {
      type: DataTypes.STRING
    },
    // Last name field
    last_name: {
      type: DataTypes.STRING
    },
    // User name field
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15] // Minimum length of 1 and maximum length of 15
      }
    },
    // Email field
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // Password field
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
      }
    },
    // street_address: {
    //   type: DataTypes.STRING
    // },
    // // Event city field
    // city: {
    //   type: DataTypes.STRING
    // },
    // // Event state field
    // state: {
    //   type: DataTypes.STRING
    // },
    // // Event zip code field
    // zip: {
    //   type: DataTypes.INTEGER,
    //   validate: {
    //     len: [5],
    //   },
    // },
    // Created date field
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    // Changed date field
    changed_date: {
      type: DataTypes.DATE
    }
  },
  {
    hooks: {
      // Hashes the user's password before creating a new user
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Hashes the user's password before updating an existing user
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

// Export User model
module.exports = User;
