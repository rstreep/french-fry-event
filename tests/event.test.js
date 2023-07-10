const e = require('express');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Event = require('../models/Event');

describe('Event model', () => {
    beforeAll(async () => {
        const existingEventData = {
            event_name: 'Test Event',
            event_description: 'This is a test event',
            event_type: 'Test Type',
            street_address: '123 Test St',
            city: 'Test City',
            state: 'Test State',
            zip: 12345,
            event_date: new Date(),
            host_user_id: 1,
        };
    
        // Check if the event exists
        existingEvent = await Event.findOne({
          where: { event_name: existingEventData.event_name },
        });
    
        // If the event exists, delete it
        if (existingEvent) {
          await existingEvent.destroy();
        }
      });
    
      afterAll(async () => {
        await sequelize.close();
      });
    

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a new event with valid attributes', async () => {
    const newEvent = {
      event_name: 'Test Event',
      event_description: 'This is a test event',
      event_type: 'Test Type',
      street_address: '123 Test St',
      city: 'Test City',
      state: 'Test State',
      zip: 12345,
      event_date: new Date(),
      host_user_id: 1,
    };

    const createdEvent = await Event.create(newEvent);

    expect(createdEvent.event_name).toBe(newEvent.event_name);
    expect(createdEvent.event_description).toBe(newEvent.event_description);
    expect(createdEvent.event_type).toBe(newEvent.event_type);
    expect(createdEvent.street_address).toBe(newEvent.street_address);
    expect(createdEvent.city).toBe(newEvent.city);
    expect(createdEvent.state).toBe(newEvent.state);
    expect(createdEvent.zip).toBe(newEvent.zip);
    expect(createdEvent.event_date.getTime()).toBe(newEvent.event_date.getTime());
    expect(createdEvent.host_user_id).toBe(newEvent.host_user_id);
  });

  it('should fail to create a new event with a duplicate event_name', async () => {
    const newEvent = {
      event_name: 'Test Event',
      event_description: 'This is a duplicate event name',
      event_type: 'Test Type',
      street_address: '456 Test St',
      city: 'Test City',
      state: 'Test State',
      zip: 12345,
      event_date: new Date(),
      host_user_id: 2,
    };

    await expect(Event.create(newEvent)).rejects.toThrow();
  });

  it('should fail to create a new event with an invalid zip code', async () => {
    const newEvent = {
      event_name: 'Invalid Zip Event',
      event_description: 'This event has an invalid zip code',
      event_type: 'Test Type',
      street_address: '789 Test St',
      city: 'Test City',
      state: 'Test State',
      zip: 123,
      event_date: new Date(),
      host_user_id: 3,
    };

    await expect(Event.create(newEvent)).rejects.toThrow();
  });

  it('should fail to create a new event without a host_user_id', async () => {
    const newEvent = {
      event_name: 'No Host Event',
      event_description: 'This event does not have a host',
      event_type: 'Test Type',
      street_address: '123 Test St',
      city: 'Test City',
      state: 'Test State',
      zip: 12345,
      event_date: new Date(),
      host_user_id: null,
    };

    await expect(Event.create(newEvent)).rejects.toThrow();
  });
});
