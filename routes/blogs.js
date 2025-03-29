const express = require('express');
const router = express.Router();
const { getActiveBlogs, createBlog } = require('../controllers/blogsController');

router.get('/', getActiveBlogs);
router.post('/', createBlog);

module.exports = router;
