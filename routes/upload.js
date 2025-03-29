const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.params.type;
    const dir = path.join(__dirname, '..', 'uploads', type);
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

router.post('/:type', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const url = `http://localhost:5000/uploads/${req.params.type}/${req.file.filename}`;
  res.json({ message: 'Uploaded', imageUrl: url });
});

module.exports = router;
