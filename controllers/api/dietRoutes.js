const router = require('express').Router();
// Export the diet model for use in other modules
const { Diet } = require('../../models');

// Route handler for getting all diets
router.get('/', async (req, res) => {
    try {
        const dietData = await Diet.findAll();      
      // Return the list of allergies as a JSON response
      res.status(200).json(dietData);
    } catch (err) {
    // Handle errors and respond with the error in JSON format
    res.status(500).json({ error: 'Failed to fetch diets' });
    }
  });
// ToDo - Get a single diet by id
// ToDo - Get all diet for a single user (by user_id)
// ToDo - Create a new diet
// ToDo - Update an diet
// ToDo - Delete an diet






module.exports = router