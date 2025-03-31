const pool = require('../models/db');

exports.getOverview = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM overview ORDER BY updated_at DESC LIMIT 1');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOverview = async (req, res) => {
  const { title, content, imageUrl, backgroundColor } = req.body;
  try {
    await pool.query('DELETE FROM overview'); // Optional: only keep latest one
    const result = await pool.query(
      'INSERT INTO overview (title, content, imageurl, backgroundcolor) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, content, imageUrl, backgroundColor]
    );
    res.status(200).json({ message: 'Overview updated', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
