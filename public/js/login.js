/**
 * login.js
 *
 * This module provides functions for handling login and signup forms, making requests to the server's API endpoints.
 * It defines the 'loginFormHandler' and 'signupFormHandler' functions to handle form submissions.
 * The functions collect form values, send POST requests to the server, and handle the responses.
 * If the responses are successful, the browser is redirected to the profile page. Otherwise, an alert is displayed.
 */

// Function: loginFormHandler
// Description: Handles the submission of the login form.
//              Collects values from the form, sends a POST request to the '/api/users/login' endpoint,
//              and redirects the browser to the profile page on success or displays an alert on failure.
const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Send a POST request to the '/api/users/login' endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If the response is successful, redirect the browser to the profile page
        document.location.replace('/homepage');
      } else {
        // If the response is unsuccessful, display an alert with the error message
        const errorMessage = await response.text();
        prompt('Error', errorMessage);
      }
    }
  };
  
  // Function: signupFormHandler
  // Description: Handles the submission of the signup form.
  //              Collects values from the form, sends a POST request to the '/api/users' endpoint,
  //              and redirects the browser to the profile page on success or displays an alert on failure.
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    // console.log (JSON.stringify({ username, email, password }));

    if (username && email && password) {
        alert (JSON.stringify({ username, email, password }));
      // Send a POST request to the '/api/users' endpoint
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If the response is successful, redirect the browser to the profile page
        document.location.replace('/homepage');
      } else {
        //If the response is unsuccessful, display a prompt with the error message
        const errorMessage = await response.text();
        prompt('Error', errorMessage);
      }
    }
  };
  
  // Attach event listeners to the login forms
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
    // Attach event listeners to the  signup forms
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  
  // Export the module to be used in other parts of the application
  module.exports = {
    loginFormHandler,
    signupFormHandler,
  };
  