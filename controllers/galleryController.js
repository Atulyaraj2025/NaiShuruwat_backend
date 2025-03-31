const pool = require('../models/db');

exports.getGallery = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM gallery WHERE active = true ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addImage = async (req, res) => {
  const { caption, imageUrl, active = true } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO gallery (caption, imageurl, active) VALUES ($1, $2, $3) RETURNING *',
      [caption, imageUrl, active]
    );
    res.status(201).json({ message: 'Image uploaded', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
