const router = require('express').Router();
// Export the allergy model for use in other modules
const { Allergy } = require('../../models');

// Route handler for getting all allergies
router.get('/allergies', async (req, res) => {
    try {
        const allergyData = await Allergy.findAll();      
      // Return the list of allergies as a JSON response
      res.status(200).json(allergyData);
    } catch (err) {
    // Handle errors and respond with the error in JSON format
    res.status(400).json(err);
    }
  });

// ToDo - Get a single allergy by id

// ToDo - Get all allergies for a single user (by user_id)
//////////////////////////////////
// ToDo - Get all allergies for a single event (by event_id)
//////////////////////////////////
// ToDo - Get all allergies for a single dish (by dish_id)
//////////////////////////////////
// ToDo - Get all allergies for a single menu (by menu_id)
//////////////////////////////////

// ToDo - Create a new allergy


// ToDo - Update an allergy by id
// ToDo - Delete an allergy by id

module.exports = router;
