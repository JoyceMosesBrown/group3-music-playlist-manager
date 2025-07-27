const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const authMiddleware = require('../middleware/auth');

router.post('/playlists', authMiddleware, playlistController.createPlaylist);
router.post('/playlists/add-song', authMiddleware, playlistController.addSongToPlaylist);
router.get('/playlists', authMiddleware, playlistController.getUserPlaylists);
router.get('/playlists/:id', authMiddleware, playlistController.getPlaylistById);
router.delete('/playlists/:id', authMiddleware, playlistController.deletePlaylist);
router.get('/playlists/:id/songs', authMiddleware, playlistController.getSongsInPlaylist);
router.put('/playlists/remove-song', authMiddleware, playlistController.removeSongFromPlaylist);


module.exports = router;
