/**
 * dishRoutes.js ( routerPath: /api/dishes)
 *
 * This module defines the routes for handling dishes-related operations.
 * It exports an Express router with the defined routes.
 * 
 */
const router = require('express').Router();
// Export the dish model for use in other modules
const { Dish, Menu } = require('../../models');

// Route handler for getting all dishes
router.get('/', async (req, res) => {
    try {
        const dishData = await Dish.findAll({include: [Menu]});      
      // Return the list of allergies as a JSON response
      res.status(200).json(dishData);
    } catch (err) {
    // Handle errors and respond with the error in JSON format
    res.status(500).json({ error: 'Failed to fetch dishes' });
    }
  });
// Get a single dish by id
router.get('/:id', async (req, res) => {
    try {
        const dishData = await Dish.findByPk(req.params.id);
        if (!dishData) {
            return res.status(404).json({ message: 'No dish found with this id!' });
        }
        res.status(200).json(dishData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new dishes
router.post('/', async (req, res) => {
    try {
        const dishData = await Dish.bulkCreate(req.body);
        res.status(200).json(dishData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Create a new dish
router.post('/dish', async (req, res) => {
    try {
        const dishData = await Dish.create(req.body);
        res.status(200).json(dishData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update an dish    
router.put('/:id', async (req, res) => {
    try {
        const dishData = await Dish.update(req.body, {
            where: {
                dish_id: req.params.id,
            },
        });
        if (!dishData) {
            return res.status(404).json({ message: 'No dish found with this id!' });
        }
        res.status(200).json("A dish was updated!");
    } catch (err) {
        res.status(400).json(err);
    }
});
// Delete an dish
router.delete('/:id', async (req, res) => {
    try {
        const dishData = await Dish.destroy({
            where: {
                dish_id: req.params.id,
            },        
        });
        if (!dishData) {
            return res.status(404).json({ message: 'No dish found with this id!' });

        }
        res.status(200).json("A dish was deleted!");
    } catch (err) {

        res.status(500).json(err);
    }
});

// Get all dishes for a single menu (by menu_id)
router.get('/menu/:menu_id', async (req, res) => {
    try {
        const dishData = await Menu.findAll({
            where: {
                menu_id: req.params.menu_id,
            },
            include: [Dish],
        });
        if (!dishData) {
            return res.status(404).json({ message: 'No dish found with this Menu!' });
        }
        res.status(200).json(dishData);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router