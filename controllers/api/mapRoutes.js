const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Map } = require('../../models');
const express =require('express');
const app = express();
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newMap = await Map.create({
      ...req.body,
    });

    res.status(200).json(newMap);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const allMaps = await Map.findAll();

    res.status(200).json(allMaps);
  } catch (err) {
    res.status(400).json(err);
  }
});
  
  // Define the API endpoint
  
 
module.exports = router