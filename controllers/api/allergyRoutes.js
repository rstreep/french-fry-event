const router = require('express').Router();
// Export the allergy model for use in other modules
const { Allergy } = require('../../models');

// Route handler for getting all allergies
router.get('/', async (req, res) => {
    try {
        const allergyData = await Allergy.findAll();      
      // Return the list of allergies as a JSON response
      res.status(200).json(allergyData);
    } catch (err) {
    // Handle errors and respond with the error in JSON format
    res.status(500).json({ error: 'Failed to fetch allergies' });
    }
  });

// Route handler for getting a single allergy by ID
// router.get('/allergies/:id', async (req, res) => {
//     const allergyId = parseInt(req.params.id);
//     try {
//       // Find the allergy with the specified ID in the allergies array
//       const allergy = allergies.findOne({ id: allergyId });
//       if (!allergy) {
//         // If allergy is not found, return a 404 error
//         return res.status(404).json({ error: 'Allergy not found.' });
//       }
//       // Return the allergy as a JSON response
//       res.status(200).json(allergy);
//     } catch (err) {
//       // Handle any errors that occurred during the asynchronous operation
//       res.status(400).json(err);
//     }
//   });

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
