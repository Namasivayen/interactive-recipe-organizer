const express = require('express');
const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');
const User = require('../models/User');
const router = express.Router();

// Top-rated recipes
router.get('/top-rated', async (req, res, next) => {
  try {
    const recipes = await Recipe.find().sort({ averageRating: -1 }).limit(5);
    res.json(recipes);
  } catch (err) {
    next(err);
  }
});

// Most active users (by comment count)
router.get('/active-users', async (req, res, next) => {
  try {
    const users = await Comment.aggregate([
      { $group: { _id: '$userId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $project: { username: '$user.username', count: 1 } }
    ]);
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Most popular cuisines
router.get('/popular-cuisines', async (req, res, next) => {
  try {
    const cuisines = await Recipe.aggregate([
      { $group: { _id: '$cuisine', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    res.json(cuisines);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
