const express = require('express');

const nhlController = require('../controllers/nhl');

const router = express.Router();

router.get('/nhl/schedule', nhlController.schedule);
router.get('/nhl/scores', nhlController.scores);

module.exports = router;