const express = require('express');
const router = express.Router();
const { getLatestOverview, updateOverview } = require('../controllers/overviewController');

router.get('/', getLatestOverview);
router.post('/', updateOverview);

module.exports = router;
