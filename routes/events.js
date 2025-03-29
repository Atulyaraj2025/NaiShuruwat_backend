const express = require('express');
const router = express.Router();
const { getUpcomingEvents, createEvent } = require('../controllers/eventsController');

router.get('/', getUpcomingEvents);
router.post('/', createEvent);

module.exports = router;
