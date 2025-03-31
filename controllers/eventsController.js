const pool = require('../models/db');

exports.getEvents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events WHERE active = true ORDER BY date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEvent = async (req, res) => {
  const { title, date, description, active = true } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO events (title, date, description, active) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, date, description, active]
    );
    res.status(201).json({ message: 'Event created', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
