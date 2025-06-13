const express = require('express');
const router = express.Router();
const { getMessage } = require('../controllers/sample');

// GET /api/message
router.get('/message', getMessage);

module.exports = router;
