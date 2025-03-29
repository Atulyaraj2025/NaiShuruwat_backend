const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const pool = require('../models/db');

// Upload config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = 'uploads/gallery';
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      const unique = Date.now() + '_' + file.originalname.replace(/\s+/g, '');
      cb(null, unique);
    }
  });
const upload = multer({ storage });

// Upload Route
router.post('/upload/gallery', upload.single('image'), (req, res) => {
  const { caption } = req.body;
  console.log(req.body)
  if (!req.file) return res.status(400).send('No file uploaded');

  const imageurl = `https://naishuruwat-backend.onrender.com/uploads/gallery/${req.file.filename}`;
  res.json({ imageurl, caption });
});

// Save to DB
router.post('/', async (req, res) => {
    const { caption, imageurl } = req.body;
  
    if (!caption || !imageurl) {
      return res.status(400).json({ error: 'Caption and imageurl are required' });
    }
  
    try {
      const result = await pool.query(
        'INSERT INTO gallery (caption, imageurl, active) VALUES ($1, $2, $3) RETURNING *',
        [caption, imageurl, true]
      );
      res.status(201).json({ message: 'Saved to DB', data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
// Fetch for display
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM gallery WHERE active = true ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
