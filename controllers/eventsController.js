const pool = require('../models/db');

exports.getUpcomingEvents = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM events WHERE active = true AND date >= CURRENT_DATE ORDER BY date ASC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEvent = async (req, res) => {
  const { title, description, date, active } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO events (title, description, date, active) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, date, active ?? true]
    );
    res.status(201).json({ message: 'Event created', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
