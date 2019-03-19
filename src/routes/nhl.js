const express = require('express');

const nhlController = require('../controllers/nhl');

const router = express.Router();

router.get('/nhl/games', nhlController.games);
router.get('/nhl/games/:date', nhlController.gamesOnDate);
router.get('/nhl/games/:startDate/:endDate', nhlController.gamesInDateRange);

module.exports = router;