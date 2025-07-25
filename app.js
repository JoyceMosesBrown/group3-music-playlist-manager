const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const playlists = require('./routes/Playlists');
const songRoutes = require('./routes/Song');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/', songRoutes);
app.use('/', playlists);


app.get('/', (req, res) => {
  res.send('Welcome to Music Playlist Manager');
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
