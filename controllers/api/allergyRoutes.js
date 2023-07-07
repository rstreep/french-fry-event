/**
 * allergyRoutes.js ( routerPath: /api/allergies)
 *
 * This module defines the routes for handling allergy-related operations.
 * It exports an Express router with the defined routes.
 * 
 */
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
    res.status(400).json(err);
    }
  });

// Get a single allergy by id
router.get('/:id', async (req, res) => {
    try {
        const allergyData = await Allergy.findByPk(req.params.id);
        if (!allergyData) {
            return res.status(404).json({ message: 'No allergy found with this id!' });
        }
        res.status(200).json(allergyData);
    } catch (err) {
        res.status(500).json(err);
    }
});
// Create a new allergy(es)
router.post('/', async (req, res) => {
    try {
        const allergyData = await Allergy.bulkCreate(req.body);
        res.status(200).json(allergyData);
    } catch (err) {
        res.status(400).json(err);
    }   
});

// Update an allergy by id
router.put('/:id', async (req, res) => {
    try {
        const allergyData = await Allergy.update(req.body, {
            where: {
                allergy_id: req.params.id,
            },
        });
        if (!allergyData) {
            return res.status(404).json({ message: 'No allergy found with this id!' });
        }
        res.status(200).json(allergyData);
    } catch (err) {
        res.status(400).json(err);
    }
});
// Delete an allergy by id
router.delete('/:id', async (req, res) => {
    try {
        const allergyData = await Allergy.destroy({
            where: {
                allergy_id: req.params.id,
            },
        });
        if (!allergyData) {
            return res.status(404).json({ message: 'No allergy found with this id!' });
        }
        res.status(200).json(allergyData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
