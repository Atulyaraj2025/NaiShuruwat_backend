const express = require('express');
const router = express.Router();
const { getOverview, updateOverview } = require('../controllers/overviewController');

router.get('/', getOverview);
router.post('/', updateOverview);

module.exports = router;
