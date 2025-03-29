const pool = require('../models/db');

exports.getLatestOverview = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM overview ORDER BY id DESC LIMIT 1');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOverview = async (req, res) => {
  const { title, content, imageUrl, backgroundColor } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO overview (title, content, imageUrl, backgroundColor) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, content, imageUrl, backgroundColor ?? '#f7f7f7']
    );
    res.status(201).json({ message: 'Overview updated', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
