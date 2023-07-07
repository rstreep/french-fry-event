/**
 * dietRoutes.js ( routerPath: /api/diets)
 *
 * This module defines the routes for handling allergy-related operations.
 * It exports an Express router with the defined routes.
 * 
 */
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
// Get a single diet by id/ ids
router.get('/:id', async (req, res) => {
    try {
        const dietData = await Diet.findByPk(req.params.id);
        if (!dietData) {
            return res.status(404).json({ message: 'No diet found with this id!' });
        }
        res.status(200).json(dietData);
    } catch (err) {
        res.status(500).json(err);
    }
});
// Create a new diet
router.post('/', async (req, res) => {
    try {
        const dietData = await Diet.bulkCreate(req.body);
        res.status(200).json(dietData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update an diet
router.put('/:id', async (req, res) => {
    try {
        const dietData = await Diet.update(req.body, {
            where: {
                diet_id: req.params.id,
            },
        });
        if (!dietData[0]) {
            res.status(404).json({ message: 'No diet found with this id!' });
            return;
        }
        res.status(200).json(dietData);
    } catch (err) {
        res.status(500).json(err);
    }
});
// Delete a diet
router.delete('/:id', async (req, res) => {
    try {
        const dietData = await Diet.destroy({
            where: {
                diet_id: req.params.id,
            },
        });
        if (!dietData) {
            res.status(404).json({ message: 'No diet found with this id!' });
            return;
        }
        res.status(200).json(dietData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router