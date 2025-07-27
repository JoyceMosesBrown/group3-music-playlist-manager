const Playlist = require('../models/Playlist');
const Song = require('../models/Song');

exports.createPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.create({ name: req.body.name, user: req.user.userId });
        res.status(201).json(playlist);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.addSongToPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.body;
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

        playlist.songs.push(songId);
        await playlist.save();
        res.json(playlist);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getUserPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({ user: req.user.userId }).populate('songs');
        res.json(playlists);
    } catch (err) {
        console.error('Error in getUserPlaylists:', error);
        res.status(500).json({ error: err.message });
    }
};

// Get a playlist by ID
exports.getPlaylistById = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id).populate('songs');
        if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
        res.json(playlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a playlist by ID
exports.deletePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findByIdAndDelete(req.params.id);
        if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
        res.json({ message: 'Playlist deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Get songs in a specific playlist
exports.getSongsInPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id).populate('songs');
        if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

        res.json(playlist.songs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Remove a song from a playlist
exports.removeSongFromPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.body;

        const playlist = await Playlist.findById(playlistId);
        if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

        const index = playlist.songs.indexOf(songId);
        if (index === -1) return res.status(400).json({ message: 'Song not in playlist' });

        playlist.songs.splice(index, 1);
        await playlist.save();

        res.json({ message: 'Song removed from playlist', playlist });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};