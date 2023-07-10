/**
 * server.js
 *
 * This module is responsible for initializing and configuring the Node.js server for the project.
 * It sets up the necessary dependencies, middleware, routes, and starts the server.
 */

// Import the 'path' module from the Node.js standard library
const path = require('path');
// Connect express lib as content generation engine
const express = require('express');
// Manages sessions for express.js applications
const session = require('express-session');
// This lib allows develop handlebars for express
const exphbs = require('express-handlebars');
// Import the routes module from the './controllers' file
const routes = require('./controllers');
// Import the helpers module from the './utils/helpers' file
const helpers = require('./utils/helpers');
// Import the sequelize instance from the './config/connection' file
const sequelize = require('./config/connection');
// Import the SequelizeStore constructor from the 'connect-session-sequelize' module
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Create an instance of the Express application
const app = express();
const axios= require('axios');
// Set the port number for the server
const PORT = process.env.PORT || 3003;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Session configuration
const sess = {
    secret: 'Super secret secret',  // Secret used to sign the session ID cookie
    cookie: {
      maxAge: 300000,               // Maximum age of the session cookie in milliseconds
      httpOnly: true,               // Restrict cookie access to HTTP(S) requests
      secure: false,                // Set to 'true' for secure HTTPS-only cookies
      sameSite: 'strict',           // Control cross-site cookie behavior
    },
    resave: false,                  // Disable session resaving
    saveUninitialized: true,        // Save uninitialized sessions to the store
    store: new SequelizeStore({     // Configure session store using Sequelize
      db: sequelize                 // Database connection for session persistence
    }),
      // Set the default value of 'logIn' to false
      logged_in: false,
  };
  
  app.use(session(sess));           // Enable session middleware for the application
  

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware setup
app.use(express.json());                                     // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));              // Parse URL-encoded request bodies
app.use(express.static(path.join(__dirname, 'public')));      // Serve static files from the 'public' directory

// Route setup
app.use(routes);





// Database synchronization and server start
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on http://127.0.0.1:' + PORT));
});

