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
