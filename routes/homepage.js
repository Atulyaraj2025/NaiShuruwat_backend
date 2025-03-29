const express = require('express');
const router = express.Router();
const pool = require('../models/db');
 
// GET /api/homepage
router.get('/', async (req, res) => {
  try {
    const [overview, gallery, news, events, blogs] = await Promise.all([
      pool.query('SELECT * FROM overview '),
      pool.query('SELECT * FROM gallery WHERE active = true ORDER BY created_at DESC LIMIT 5'),
      pool.query('SELECT * FROM news WHERE active = true ORDER BY created_at DESC LIMIT 5'),
      pool.query('SELECT * FROM events WHERE active = true ORDER BY date ASC LIMIT 5'),
      pool.query('SELECT * FROM blogs WHERE active = true ORDER BY created_at DESC LIMIT 5')
    ]);
 
    res.json({
      overview: overview.rows[0] || {},
      gallery: gallery.rows,
      news: news.rows,
      events: events.rows,
      blogs: blogs.rows
    });
  } catch (err) {
    console.error('Homepage API Error:', err.message);
    res.status(500).json({ error: 'Server error while fetching homepage content.' });
  }
});
 
module.exports = router;