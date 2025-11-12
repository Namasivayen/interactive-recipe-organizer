
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Serve static files from public (for production build)
app.use(express.static(path.join(__dirname, 'public')));

// Route imports
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const commentRoutes = require('./routes/commentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// API routes
app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);
app.use('/comments', commentRoutes);
app.use('/dashboard', dashboardRoutes);


const PORT = process.env.PORT || 500;
const MONGO_URI = process.env.MONGODB_URI;
console.log('--- MongoDB Connection Log ---');
console.log('MONGODB_URI from .env:', MONGO_URI);
if (!MONGO_URI) {
  console.error('Error: MONGODB_URI is not defined. Please check your .env file.');
} else if (!/^mongodb(\+srv)?:\/\//.test(MONGO_URI)) {
  console.error('Error: MONGODB_URI does not start with "mongodb://" or "mongodb+srv://"');
} else {
  console.log('MONGODB_URI format looks correct. Attempting to connect...');
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    if (err.name === 'MongoParseError') {
      console.error('MongoParseError details:', err.message);
    }
  });

app.get('/', (req, res) => {
  res.send('Recipe Organizer API running');
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
