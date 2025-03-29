const pool = require('../models/db');

exports.getActiveInitiatives = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM initiatives WHERE active = true ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createInitiative = async (req, res) => {
  const { title, content, imageUrl, active } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO initiatives (title, content, imageUrl, active) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, content, imageUrl, active ?? true]
    );
    res.status(201).json({ message: 'Initiative added', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
