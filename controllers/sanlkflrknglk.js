/**
 * eventsRoutes.js
 *
 * This module defines the routes for handling events-related operations.
 * It exports an Express router with the defined routes.
 */
const router = require('express').Router();
const {Event, User, Dish, Menu, Guest} = require('../models');
const withAuth = require('../utils/auth');

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
})

router.get('/create-event', async (req, res) => {
  res.render('create-event');
  // res.render('homepage', {
  //   logged_in: req.session.logged_in 
  // });
});


router.get('/map', (req, res) => {
res.render('map');
});



router.get('/preview', (req, res)=> {
res.render('preview');
});

 
router.get('/user-profile', (req, res)=> {
  res.render('user-profile');
}); 

  // Get Card Images
  router.get('/', async (req, res) => {
    let images=[
      {
        image: "/assets/images/pexels-fauxels-3184188.jpg"
      },
      {
        image: "/assets/images/pexels-rachel-claire-4819705.jpg"
      },
      {
        image: "/assets/images/pexels-rachel-claire-4819714.jpg"
      }
    ]
    res.render('index' , {images});
  });
  
  // Get New Events
  router.get('/', async (req, res) => {
    const eventDataNew  = await Event.findall({
      limit: 3,
      include: [User, Guest, Menu],
      order: [['event_date','ASC']],
   });
   const eventsNEW = eventDataNew.map((event) => event.get({plan:true}));
 
   // Get Old Events
   const eventDataOld = await Event.findall({
      include: [User,Guest,Menu],
      where: { event_date: {
        [Op.lt]: now.endOf('day').toString()
      }
     },
      order: [['event_Date','ASC']],
   });
   const eventsOLD = eventDataOld.map((event) => event.get({plan:true}));

   // Get Events Where I am Host
   const eventDataHost= await Event.findall({
    include: [User,Guest,Menu],
    host_user_id: req.params.host_id,
    order: [['event_Date','ASC']],
    });
 const eventsHOST = eventDataHost.map((event) => event.get({plan:true}));


   try {
    res.render('homepage',{
      eventsNEW,
      eventsOLD,
      eventsHOST
      //logged_in: isLoggedIn
    });

   } catch (err) {
    res.status(500).json(err);
   }

  });



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