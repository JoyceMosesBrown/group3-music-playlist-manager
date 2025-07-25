const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: String,
    duration: Number, // in seconds
    genre: String
}, { timestamps: true });

module.exports = mongoose.model('Song', songSchema);
