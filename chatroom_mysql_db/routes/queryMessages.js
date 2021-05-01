const express = require('express');
const router = express.Router();
const queryMessages = require('../services/queryMessages');

/* GET top 10 chat messages. */
router.get('/init', async function(req, res, next) {
  try {
    res.json(await queryMessages.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting chat messages `, err.message);
    next(err);
  }
});

// get top 1 message
router.get('/', async function(req, res, next) {
    try {
      res.json(await queryMessages.getSingle(req.query.page));
    } catch (err) {
      console.error(`Error while getting single message `, err.message);
      next(err);
    }
});
  
// post chat message
router.post('/', async function(req, res, next) {
    try {
      res.json(await queryMessages.postSingle(req.body));
    } catch (err) {
      console.error(`Error while posting single message`, err.message);
      next(err);
    }
  });

  

module.exports = router;