const router = require('express').Router();
const { Map } = require('../../models');

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
module.exports = router