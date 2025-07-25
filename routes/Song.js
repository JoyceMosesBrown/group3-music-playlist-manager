const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const authMiddleware = require('../middleware/auth');

router.post('/songs', authMiddleware, songController.createSong);
router.get('/songs', authMiddleware, songController.getAllSongs);

module.exports = router;