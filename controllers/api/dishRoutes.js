const router = require('express').Router();
// Export the dish model for use in other modules
const { Dish } = require('../../models');

// Route handler for getting all dishes
router.get('/', async (req, res) => {
    try {
        const dishData = await Dish.findAll();      
      // Return the list of allergies as a JSON response
      res.status(200).json(dishData);
    } catch (err) {
    // Handle errors and respond with the error in JSON format
    res.status(500).json({ error: 'Failed to fetch dishes' });
    }
  });
// ToDo - Get a single dish by id
// ToDo - Get all dishes for a single user (by user_id)
// ToDo - Create a new dish
// ToDo - Update an dish    
// ToDo - Delete an dish

module.exports = router