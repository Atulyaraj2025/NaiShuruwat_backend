const pool = require('../models/db');

exports.getHomeSummary = async (req, res) => {
  try {
    const [overview, gallery, news, events, blogs] = await Promise.all([
      pool.query('SELECT * FROM overview'),
      pool.query('SELECT * FROM gallery WHERE active = true ORDER BY created_at DESC LIMIT 5'),
      pool.query('SELECT * FROM news WHERE active = true ORDER BY created_at DESC LIMIT 5'),
      pool.query('SELECT * FROM events WHERE active = true ORDER BY date DESC LIMIT 5'),
      pool.query('SELECT * FROM blogs WHERE active = true ORDER BY created_at DESC LIMIT 5')
    ]);

    res.json({
      overview: overview.rows[0],
      gallery: gallery.rows,
      news: news.rows,
      events: events.rows,
      blogs: blogs.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
