const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const allergyRouters = require('./allergyRoutes');
const dietRouters = require('./dietRoutes');
const dishRouters = require('./dishRoutes');
const mapRoutes = require('./mapRoutes');


router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/allergies', allergyRouters);
router.use('/diets', dietRouters);
router.use('/dishes', dishRouters);
router.use('/map', mapRoutes);
router.use('/map/allLocations', mapRoutes);
module.exports = router;
