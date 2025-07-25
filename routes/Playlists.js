const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const authMiddleware = require('../middleware/auth');

router.post('/playlists', authMiddleware, playlistController.createPlaylist);
router.post('/playlists/add-song', authMiddleware, playlistController.addSongToPlaylist);
router.get('/playlists', authMiddleware, playlistController.getUserPlaylists);

module.exports = router;
