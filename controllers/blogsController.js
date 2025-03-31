const pool = require('../models/db');

exports.getBlogs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs WHERE active = true ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBlog = async (req, res) => {
  const { title, content, active = true } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO blogs (title, content, active) VALUES ($1, $2, $3) RETURNING *',
      [title, content, active]
    );
    res.status(201).json({ message: 'Blog added', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
