/**
 * event.js
 *
 * This module defines the Event model, which represents an event in the application.
 * It exports the Event model class, which is initialized using Sequelize.
 */
// Import Sequelize dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Event model
class Event extends Model {}

// Initialize Event model
Event.init(
    {
        // Event ID field
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        // Event name field
        event_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        // Event description field
        event_description: {
            type: DataTypes.STRING
        },
        // Event type description field
        event_type: {
            type: DataTypes.STRING
        },
        // Event street address field
        street_address: {
            type: DataTypes.STRING
        },
        // Event city field
        city: {
            type: DataTypes.STRING
        },
        // Event state field
        state: {
            type: DataTypes.STRING
        },
        // Event zip code field
        zip: {
            type: DataTypes.INTEGER,
            validate: {
                len: [5],
              },
        },
        // Event date field
        event_date: {
            type: DataTypes.DATE
        },
        // Event time field
        created_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        // Foreign key referencing user table
        host_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,      
            references: {
                model: 'user',
                key: 'user_id'
              }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'event'
      }   
    
);
module.exports = Event;