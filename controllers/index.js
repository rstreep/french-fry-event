/**
 * ../controllers/ index.js This file defines the router for the Express application, and exports the router for use by the server.
 */
const router = require('express').Router();

const apiRoutes = require('./api');       // Import API routes module
const homeRoutes = require('./homeRoutes');   // Import home routes module

router.use((req, res, next) => {
    // Check if user ID exists in the session
    if (req.session.user_id) {
    const userId = req.session.user_id;
localStorage.setItem("user_id",req.session.user_id)
    console.log('User ID:', userId);
    }
    next();
    });

router.use('/', homeRoutes);           // Mount home routes
router.use('/api', apiRoutes);         // Mount API routes

module.exports = router;               // Export the configured router for use in other modules
