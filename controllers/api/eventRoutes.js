/**
 * eventRoutes.js ( routerPath: /api/events)
 *
 * This module defines the routes for handling events-related operations.
 * It exports an Express router with the defined routes.
 * 
 */
const router = require('express').Router();
const sequelize = require('../../config/connection');

// Export the event model for use in other modules
const { Event, User, Dish, Menu, Guest } = require('../../models');
const { route } = require('./userRoutes');

// Get all events 
router.get('/', async (req, res) => {
    try {
        const eventData = await Event.findAll({
            include: [User, Guest, Menu],
            order: [['event_date', 'ASC']],
        });
        // Return the list of allergies as a JSON response
        res.status(200).json(eventData);
    } catch (err) {
        // Handle errors and respond with the error in JSON format
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// Get a single event by id (without guests and menu details)
router.get('/event/:event_id', async (req, res) => {
    const eventId = req.params.event_id;
    try {
        const event = await Event.findByPk(eventId, {
            include: [User, Guest, Menu]
        });

        if (!event) {
            return res.status(404).json({ error: 'Event not found.' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the event.' });
    }

});
// Get all events for a single user (by user_id = host_user_id)
router.get('/:host_id', async (req, res) => {
 
    try {
        const eventData = await Event.findAll({
            where: { host_user_id: req.params.host_id },
            include: [User, Guest, Menu],
            order: [['event_date', 'ASC']],
        });
        // Return the list of allergies as a JSON response
        res.status(200).json(eventData);
    } catch (err) {
        // Handle errors and respond with the error in JSON format
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// Get all events for a single user (by user_id = guest_id)
router.get('/byguest/:guest_id', async (req, res) => {
    try {
        const eventData = await Guest.findAll({
            where: { user_id: req.params.guest_id },
            include: [Event]
        });

        // Return the list of allergies as a JSON response
        res.status(200).json(eventData);
    } catch (err) {
        // Handle errors and respond with the error in JSON format
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// Create a new event (without guests and menus)
router.post('/', async (req, res) => {
    try {
        const eventData = await Event.create(req.body);
        res.status(200).json(eventData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update an event details (without guests and menus)
router.put('/event/:event_id', async (req, res) => {
    const eventId = req.params.event_id;
    try {
        await sequelize.transaction(async (t) => {
            // Find the event by event_id
            const event = await Event.findByPk(eventId, { transaction: t });
            if (!event) {
                return res.status(404).json({ error: 'Event not found.' });
            }
            // Update the event
            await event.update(req.body, { transaction: t });
            // Return a success message
            res.status(200).json({ message: 'Event updated successfully.' });
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the event.' });
    }
});

// POST route for creating a list of guests
router.post('/guests/:event_id', async (req, res) => {
    try {
        const guests  = req.body; 
        const eventID = req.params.event_id;
        const eventGuests = guests.map(guest => ({ ...guest, event_id: eventID }));
        // Create the guests
        const createdGuests = await Guest.bulkCreate(eventGuests);
        res.status(201).json(createdGuests); // Respond with the created guests
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the guests.' });
    }
});

// Update an event's guests
router.post('/event/guests/:event_id', async (req, res) => {
    const guests = req.body;
    const eventID = req.params.event_id;
    const eventGuests = guests.map(guest => ({ ...guest, event_id: eventID }));

    try {
        await sequelize.transaction(async (t) => {
            // Find the event by event_id - Step 1
            const event = await Event.findByPk(eventID, { transaction: t });
            if (!event) {
                return res.status(404).json({ error: 'Event not found.' });
            }
            // Create the guests - Step 2
            const createdGuests = await Guest.bulkCreate(eventGuests, { transaction: t });
            // Update the event's guests - Step 3
           const updatedEvent = await event.addGuests(createdGuests, { transaction: t });
            // Return the updated event
            res.status(200).json(updatedEvent);
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the event.' });
    }
});

// Update an menu
router.post('/menus/:event_id', async (req, res) => {
    try {
        const menus = req.body;
        const eventID = req.params.event_id;
        const eventMenus = menus.map(menu => ({ ...menu, event_id: eventID }));
        // Create the menus
        const createdMenus = await Menu.bulkCreate(eventMenus);
        res.status(201).json(createdMenus); // Respond with the created menus
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the menus.' });
    }
});

// Update an event menu
router.post('/event/menus/:event_id', async (req, res) => {
    const menus = req.body;
    const eventID = req.params.event_id;
    const eventMenus = menus.map(menu => ({ ...menu, event_id: eventID }));

    try {
        await sequelize.transaction(async (t) => {
            // Find the event by event_id - Step 1
            const event = await Event.findByPk(eventID, { transaction: t });
            if (!event) {
                return res.status(404).json({ error: 'Event not found.' });
            }
            // Create the menus - Step 2
            const createdMenus = await Menu.bulkCreate(eventMenus, { transaction: t });
            // Update the event's menus - Step 3
            const updatedEvent = await event.addMenus(createdMenus, { transaction: t });
            // Return the updated event
            res.status(200).json(updatedEvent);
        });
    } catch (error) {

        res.status(500).json({ error: 'An error occurred while updating the event.' });
    }
});

// Get Menu with dishes by event_id
router.get('/event/menu/:event_id', async (req, res) => {
    const eventID = req.params.event_id;
  
    try {
      // Find all dishes that associated with the event as Menu
      const menu = await Menu.findAll({
        where: { event_id: eventID },
        include: [Dish]
    });

      if (!menu) {
        return res.status(404).json({ error: 'Event not found.' });
      }
      // Return the menu with dishes as a JSON response
      res.status(200).json(menu);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving the menu.' });
    }
  });
  

// Get Guests wit user details by event_id
router.get('/event/guests/:event_id', async (req, res) => {
    const eventID = req.params.event_id;

    try {
        // Find all guests that associated with the event
        const guests = await Guest.findAll({
            where: { event_id: eventID },
            include: [User]
        });

        if (!guests) {
            return res.status(404).json({ error: 'Event not found.' });
        }
        // Return the guests with user details as a JSON response
        res.status(200).json(guests);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the guests.' });
    }
});

``
//Delete an event
router.delete('/event/:event_id', async (req, res) => {
    const eventId = req.params.event_id;
    try {
        await sequelize.transaction(async (t) => {
            // Find the event by event_id
            const event = await Event.findByPk(eventId, { transaction: t });
            if (!event) {
                return res.status(404).json({ error: 'Event not found.' });
            }
            // Delete the associated guests
            await Guest.destroy({ where: { event_id: eventId }, transaction: t });
            // Delete the associated menus
            await Menu.destroy({ where: { event_id: eventId }, transaction: t });
            // Delete the event
            await event.destroy({ where: { event_id: eventId },transaction: t });
            // Return a success message
            res.status(200).json({ message: 'Event deleted successfully.' });
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the event.' });
    }
});


module.exports = router;