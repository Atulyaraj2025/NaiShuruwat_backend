const express = require('express');
const router = express.Router();
const { checkAdmin } = require('../controllers/adminAuthController');

// router.post('/', checkAdmin);
const adminEmails = ['admin@gmail.com', 'rajatulya2000r@gmail.com'];

router.post('/', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const isAdmin = adminEmails.includes(email);
  res.json({ isAdmin });
});

module.exports = router;
module.exports = router;
