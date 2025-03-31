const express = require('express');
const router = express.Router();
const { getActiveNews, createNews } = require('../controllers/newsController');

router.get('/', getActiveNews);
router.post('/', createNews);

module.exports = router;
