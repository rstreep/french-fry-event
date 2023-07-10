const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Map } = require('../../models');
const express =require('express');
const app = express();
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    render(preview.handlebars)
});
router.get('/', async (req, res) => {
    try {
        const eventData = await Event.findAll({
            include: [User, Guest, Menu],
            order: [['event_date', 'ASC']],
        });
        // Return the list of allergies as a JSON response
        res.status(200).json(eventData);
        console.log(eventData);
    } catch (err) {
        // Handle errors and respond with the error in JSON format
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});
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
 
module.exports = router