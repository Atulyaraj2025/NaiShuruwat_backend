const express = require('express');
const router = express.Router();
const { getHomeSummary } = require('../controllers/hompepage');

router.get('/', getHomeSummary);

module.exports = router;
