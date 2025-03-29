const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../models/db');

// Image Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '..', 'uploads', 'initiatives');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}_${Math.random().toString(36).substring(2)}${ext}`;
    cb(null, name);
  }
});
const upload = multer({ storage });

// Upload Image
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const imageUrl = `/uploads/initiatives/${req.file.filename}`;
  res.json({ imageUrl });
});

// Save Initiative
router.post('/', async (req, res) => {
  const { title, content, imageUrl } = req.body;
  if (!title || !content || !imageUrl) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO initiatives (title, content, imageurl, active) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, content, imageUrl, true]
    );
    res.status(201).json({ message: 'Initiative added', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Active Initiatives
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM initiatives WHERE active = true ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
