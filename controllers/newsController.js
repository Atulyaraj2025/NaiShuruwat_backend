// controllers/newsController.js
const pool = require('../models/db');

exports.createNews = async (req, res) => {
  const { title, imageUrl, content, active = true } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO news (title, imageurl, content, active) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, imageUrl, content, active]
    );
    res.status(201).json({ message: 'News added', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getActiveNews = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, imageurl, content, created_at FROM news WHERE active = true ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
