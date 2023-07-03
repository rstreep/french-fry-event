const router = require('express').Router();
// Export the event model for use in other modules
const { Event } = require('../../models');


// Route handler for getting all dishes
router.get('/', async (req, res) => {
    try {
        const eventData = await Event.findAll();      
      // Return the list of allergies as a JSON response
      res.status(200).json(eventData);
    } catch (err) {
    // Handle errors and respond with the error in JSON format
    res.status(500).json({ error: 'Failed to fetch events' });
    }
  });

// ToDo - Get a single event by id

// ToDo - Get all events for a single user (by user_id = host_user_id)

// ToDo - Get all events for a single user (by user_id = guest_id)

// ToDo - Create a new event

// ToDo - Update an event

// ToDo - Delete an event


module.exports = router;