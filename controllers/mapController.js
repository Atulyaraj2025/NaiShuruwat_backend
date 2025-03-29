const pool = require('../models/db');

exports.getMapMarkers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM map_markers WHERE active = true');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMapMarker = async (req, res) => {
  const { lat, lng, label, active } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO map_markers (lat, lng, label, active) VALUES ($1, $2, $3, $4) RETURNING *',
      [lat, lng, label, active ?? true]
    );
    res.status(201).json({ message: 'Marker added', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
