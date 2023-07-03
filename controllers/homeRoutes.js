/**
 * eventsRoutes.js
 *
 * This module defines the routes for handling events-related operations.
 * It exports an Express router with the defined routes.
 */
const router = require('express').Router();
const { ff_event_guest_map, ff_event, ff_lookup, ff_menu, User} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
      // only for debugging  
      res.send ('Home page router!!!!')
    // try {


    //   // Get all blogs and JOIN with user data
    //   const blogData = await Blog.findAll({
    //     include: [
    //       {
    //         model: User,
    //         attributes: ['user_name'],
    //       },
    //       {
    //         model: Comment,
    //         attributes: ['comment'],
    //       },
    //     ],
    //   });
  
    //   // Serialize data so the template can read it
    //   const blogs = blogData.map((blog) => blog.get({ plain: true }));

      // Convert undefined to false if req.session.logged_in is undefined
      //const isLoggedIn = req.session.logged_in !== undefined ? req.session.logged_in : false;
  
    //   console.log(`Home page router!!!! ${JSON.stringify(blogs)}`);
    //   console.log(`Session ID: ${JSON.stringify(req.session)}`);
    //     const blogs = [];


    // console.log("Home page router!!!!");

    //   // Pass serialized data and session flag into template
    //   res.render('homepage', { 
    //     blogs, 
    //     logged_in: isLoggedIn, //false, //req.session.logged_in 
    //   });
    // } catch (err) {
    //   res.status(500).json(err);
    // }
  });

  router.get('/login', (req, res) => {
     // only for debugging  
   // res.send ('Login router!!!!');
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

router.get('/map', (req, res) => {
  res.render('map');
})



///////////////////////// - Example of possible routers - need models and seed implementation to complete/////////////////////////////////
// /**
//  * Route: GET /events
//  * Description: Renders the events page with a list of events.
//  *              Only accessible to authenticated users.
//  */
// router.get('/events', withAuth, async (req, res) => {
//   try {
//     // Fetch the list of events from the database
//     const events = await ff_event.findAll();

//     // Render the events page with the list of events
//     res.render('events', { events });
//   } catch (err) {
//     // Handle errors
//     console.error(err);
//     res.status(500).json({ error: 'Failed to retrieve events' });
//   }
// });

// /**
//  * Route: GET /events/:id
//  * Description: Renders the details page for a specific event.
//  *              Only accessible to authenticated users.
//  */
// router.get('/events/:id', withAuth, async (req, res) => {
//   try {
//     // Fetch the event details from the database based on the provided ID
//     const event = await ff_event.findByPk(req.params.id, {
//       include: [
//         { model: ff_lookup },
//         { model: ff_menu },
//         { model: user }
//       ]
//     });

//     if (!event) {
//       // If the event is not found, render an error page
//       return res.status(404).render('error', { message: 'Event not found' });
//     }

//     // Render the event details page with the retrieved event data
//     res.render('event-details', { event });
//   } catch (err) {
//     // Handle errors
//     console.error(err);
//     res.status(500).json({ error: 'Failed to retrieve event details' });
//   }
// });

/////////////////////////////////////////////////////////




module.exports = router;