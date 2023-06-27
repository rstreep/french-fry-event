/**
 * ../controllers/ index.js This file defines the router for the Express application, and exports the router for use by the server.
 */
const router = require('express').Router();

const apiRoutes = require('./api');       // Import API routes module
//const homeRoutes = require('./homeRoutes');   // Import home routes module

//router.use('/', homeRoutes);           // Mount home routes
router.use('/api', apiRoutes);         // Mount API routes

module.exports = router;               // Export the configured router for use in other modules
