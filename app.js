const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const songRoutes = require('./routes/Song');
const playlistRoutes = require('./routes/Playlists');
const path = require('path');

dotenv.config();

const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

app.use(cors()); 

// Middleware
app.use(express.json());

// Serve static frontend files (optional: remove if not using plain HTML)
app.use(express.static(path.join(__dirname, 'frontend')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', songRoutes);
app.use('/api', playlistRoutes);

// Root Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
  //res.send('🎵 Welcome to Music Playlist Manager API');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
