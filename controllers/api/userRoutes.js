/**
 * userRoutes.js
 *
 * This module defines the routes for handling users-related operations.
 * It exports an Express router with the defined routes.
 */
const router = require('express').Router();
// Export the user model for use in other modules
const { ff_user } = require('../../models');

// Route: POST /
// Description: Creates a new user and saves their information to the database.
//              Upon successful creation, logs the user in by setting session variables.
//              Responds with the created user data in JSON format.
router.post('/', async (req, res) => {
  try {
    // Create a new user record in the database using the provided request body
    const userData = await ff_user.create(req.body);

    // Save session variables after user creation
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Respond with the created user data in JSON format
      res.status(200).json(userData);
    });
  } catch (err) {
    // Handle errors and respond with the error in JSON format
    res.status(400).json(err);
  }
});

// Route: POST /login
// Description: Authenticates a user by checking their email and password.
//              If the email or password is incorrect, responds with an error message.
//              If the authentication is successful, logs the user in by setting session variables.
//              Responds with the user data and a success message in JSON format.
router.post('/login', async (req, res) => {
  try {
    // Find the user data in the database based on the provided email
    const userData = await ff_user.findOne({ where: { email: req.body.email } });

    if (!userData) {
      // If user data is not found, respond with an error message
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Check if the provided password is valid for the user
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      // If the password is invalid, respond with an error message
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Save session variables after successful authentication
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Respond with the user data and success message in JSON format
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    // Handle errors and respond with the error in JSON format
    res.status(400).json(err);
  }
});


// Route: POST /logout
// Description: Logs out the currently authenticated user by destroying the session.
//              If the user is logged in, the session is destroyed and responds with a status of 204 (No Content).
//              If the user is not logged in, responds with a status of 404 (Not Found).
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // If the user is logged in, destroy the session and respond with a status of 204 (No Content)
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If the user is not logged in, respond with a status of 404 (Not Found)
    res.status(404).end();
  }
});

module.exports = router;
