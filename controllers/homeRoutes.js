/**
 * eventsRoutes.js
 *
 * This module defines the routes for handling events-related operations.
 * It exports an Express router with the defined routes.
 */
const router = require('express').Router();
const { ff_event_guest_map, ff_event, ff_lookup, ff_menu, User} = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../../config/connection');
const Op = sequelize.Op

router.get('/', async (req, res) => {
    // res.send('homeRoutes');
    res.render('homepage', {
      logged_in: req.session.logged_in 
    });
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
});

// Route: Get Event Card 1
router.get('/event', async (req, res) => {
  try {
  const event1 = await Event.findOne({ 
    limit: 3, 
    where: { key },
    order: [ [ 'event_date', 'DESC' ]],
  });
      if (!event1) {
          return res.status(404).json({ error: 'Event not found.' });
      }
      res.status(200).json(event1);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the event.' });
  }
});
  
// Route: Get Event Card 2
router.get('/event', async (req, res) => {
  try {
  const event2 = await Event.findOne({ 
    limit: 2,
    where: { key },
    order: [ [ 'event_date', 'ASC' ]],
  });
      if (!event2) {
          return res.status(404).json({ error: 'Event not found.' });
      }
      res.status(200).json(event2);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the event.' });
  }
});

// Route: Get Event Card 3
router.get('/event', async (req, res) => {
  try {
  const event3 = await Event.findOne({ 
    limit: 2,
    where: { key },
    order: [ [ 'event_date', 'ASC' ]],
  });
      if (!event3) {
          return res.status(404).json({ error: 'Event not found.' });
      }
      res.status(200).json(event3);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the event.' });
  }
});


// Route: Get Upcoming Events
router.get('/events', async (req, res) => {
  try {
  const upcoming = await Event.findall({ 
    limit: 5, 
    where: { key },
    order: [ [ 'event_date', 'DESC' ]],
  });
      if (!upcoming) {
          return res.status(404).json({ error: 'Event not found.' });
      }
      res.status(200).json(upcoming);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the event.' });
  }
});
// Route: Get Events I'm Hosting
router.get('/events', async (req, res) => {
  try {
  const now = moment()
  const hosting = await Event.findall({ 
    limit: 5, 
    where: { event_date: {
      [Op.lt]: now.endOf('day').toString()
    },
    host_user_id: req.params.host_id
   },
    order: [ [ 'event_date', 'DESC' ]],
  });
      if (!hosting) {
          return res.status(404).json({ error: 'Event not found.' });
      }
      res.status(200).json(hosting);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the event.' });
  }
});
// Route: Get Past Events
router.get('/events', async (req, res) => {
  try {
  const now = moment()
  const upcoming = await Event.findall({ 
    limit: 5, 
    where: { event_date: {
      [Op.lt]: now.endOf('day').toString()
    }
   },
    order: [ [ 'event_date', 'DESC' ]],
  });
      if (!upcoming) {
          return res.status(404).json({ error: 'Event not found.' });
      }
      res.status(200).json(upcoming);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the event.' });
  }
});

//  * Route: GET /events
//  * Description: Renders the events page with a list of events.
//  *              Only accessible to authenticated users.
//  */ router.get('/events', withAuth, async (req, res) => {
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