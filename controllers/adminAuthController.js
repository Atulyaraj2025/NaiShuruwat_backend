const pool = require('../models/db');

exports.checkAdmin = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
    res.json({ isAdmin: result.rowCount > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
