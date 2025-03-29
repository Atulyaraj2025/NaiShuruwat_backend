const pool = require('../models/db');

exports.getActiveNews = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM news WHERE active = true ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createNews = async (req, res) => {
  const { title, imageUrl, active } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO news (title, imageUrl, active) VALUES ($1, $2, $3) RETURNING *',
      [title, imageUrl, active ?? true]
    );
    res.status(201).json({ message: 'News uploaded', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
