const router = require('express').Router();
const { sequelize, transaction } = require('sequelize');
// Export the event model for use in other modules
const { Event, User, Dish, Menu, Guest } = require('../../models');


// Route handler for getting all dishes
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

// Get a single event by id
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

// ToDo - Get all events for a single user (by user_id = guest_id)


// Create a new event (without guests and menus)
router.post('/', async (req, res) => {
    try {
        const eventData = await Event.create(req.body);
        res.status(200).json(eventData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// ToDo - Create a new event with guests and menus


// ToDo - Update an event details (without guests and menus)
// router.put('/event/:event_id', async (req, res) => {
//     const eventId = req.params.event_id;
//     try {
//         await sequelize.transaction(async (t) => {
//             // Find the event by event_id
//             const event = await Event.findByPk(eventId, { transaction: t });
//             if (!event) {
//                 return res.status(404).json({ error: 'Event not found.' });
//             }
//             // Update the event
//             await event.update(req.body, { transaction: t });
//             // Return a success message
//             res.status(200).json({ message: 'Event updated successfully.' });
//         });
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while updating the event.' });
//     }
// });

// ToDo - Update an event guests and menus

// ToDo - Update an event guests

// ToDo - Update an event menu

// ToDo - Delete an event
// router.delete('/event/:event_id', async (req, res) => {
//     const eventId = req.params.event_id;
//     try {
//         await sequelize.transaction(async (t) => {
//             // Find the event by event_id
//             const event = await Event.findByPk(eventId, { transaction: t });
//             if (!event) {
//                 return res.status(404).json({ error: 'Event not found.' });
//             }
//             // Delete the associated guests
//             await Guest.destroy({ where: { event_id: eventId }, transaction: t });
//             // Delete the associated menus
//             await Menu.destroy({ where: { event_id: eventId }, transaction: t });
//             // Delete the event
//             await event.destroy({ transaction: t });
//             // Return a success message
//             res.status(200).json({ message: 'Event deleted successfully.' });
//         });
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while deleting the event.' });
//     }
// });


module.exports = router;