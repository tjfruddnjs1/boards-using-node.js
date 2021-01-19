const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.render('home/welcome');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/about', async (req, res, next) => {
    try {
      res.render('home/about');
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;