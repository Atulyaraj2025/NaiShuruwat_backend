const express = require('express');
const router = express.Router();
const { getMapMarkers, addMapMarker } = require('../controllers/mapController');

// router.get('/', getMapMarkers);
router.post('/', addMapMarker);
router.get('/', (req, res) => {
    res.json([
      { lat: 19.0760, lng: 72.8777, label: 'Mumbai HQ' }
    ]);
  });

module.exports = router;
