/**
 * Guest Model
 *
 * Represents the association between users and events in a many-to-many relationship.
 * This model defines the Guest table and its fields.
 */

// Import Sequelize dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Guest model
class Guest extends Model {}

// Initialize Guest model
Guest.init(
    {
        // Primary key field
        guest_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        // Foreign key referencing user table
        user_id: {
            type: DataTypes.INTEGER,
            // references: {
            //     model: 'user',
            //     key: 'user_id'
            //   }
        },
        // Foreign key referencing event table
        event_id: {
            type: DataTypes.INTEGER,
            // references: {
            //     model: 'event',
            //     key: 'event_id'
            //   }
        }
    },
    // Configure options
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'guest'
      }
);
// Export Guest model
module.exports = Guest;