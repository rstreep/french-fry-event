/**
 * logout.js
 *
 * This module provides functionality to log out a user by sending a POST request to the '/api/users/logout' endpoint.
 * It defines the 'logout' function that is triggered when the '#logout' element is clicked.
 * The function sends the request to the server and handles the response, redirecting the user on success or displaying an alert on failure.
 */

// Function: logout
// Description: Sends a POST request to the '/api/users/logout' endpoint to log out the user.
//              If the response is successful (status code 200), redirects the user to the homepage.
//              If the response is unsuccessful, displays an alert with the error message.
const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // If the response is successful, redirect the user to the homepage
      document.location.replace('/');
    } else {
      // If the response is unsuccessful, display an alert with the error message
      alert(response.statusText);
    }
  };
  
  // Attach the 'click' event listener to the '#logout' element, triggering the logout function
  document.querySelector('#logout').addEventListener('click', logout);
  
  // Export the module to be used in other parts of the application
  module.exports = logout;
  
  