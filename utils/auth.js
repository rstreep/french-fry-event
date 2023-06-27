/**
 * Middleware: withAuth
 * Description: Checks if the user is logged in before allowing access to a route.
 *              If the user is not logged in, it redirects the request to the login route.
 *              If the user is logged in, it allows the request to proceed to the next middleware or route handler.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    // If the user is not logged in, redirect the request to the login route
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
