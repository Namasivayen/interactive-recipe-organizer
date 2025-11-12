
const express = require('express');
const Recipe = require('../models/Recipe');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST /recipes/:id/favorite - add/remove recipe from user favorites
router.post('/:id/favorite', authMiddleware, async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    const user = req.user;
    const index = user.favorites.indexOf(recipeId);
    let action;
    if (index === -1) {
      user.favorites.push(recipeId);
      action = 'added';
    } else {
      user.favorites.splice(index, 1);
      action = 'removed';
    }
    await user.save();
    res.json({ message: `Recipe ${action} to favorites` });
  } catch (err) {
    next(err);
  }
});

// POST /recipes/:id/rate - add/update rating and compute average
router.post('/:id/rate', authMiddleware, async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    const { value } = req.body;
    if (!value || value < 1 || value > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    // Remove previous rating by user if exists
    recipe.ratings = recipe.ratings.filter(r => r.userId.toString() !== req.user._id.toString());
    // Add new rating
    recipe.ratings.push({ userId: req.user._id, value });
    // Compute average
    const avg = recipe.ratings.reduce((sum, r) => sum + r.value, 0) / recipe.ratings.length;
    recipe.averageRating = Math.round(avg * 100) / 100;
    await recipe.save();
    res.json({ averageRating: recipe.averageRating });
  } catch (err) {
    next(err);
  }
});

// Get all recipes
// GET /recipes with filtering
router.get('/', async (req, res, next) => {
  try {
    const { cuisine, minRating, maxPrepTime } = req.query;
    let filter = {};
    if (cuisine) filter.cuisine = cuisine;
    if (minRating) filter.averageRating = { $gte: Number(minRating) };
    if (maxPrepTime) filter.prepTime = { $lte: Number(maxPrepTime) };
    const recipes = await Recipe.find(filter);
    res.json(recipes);
  } catch (err) {
    next(err);
  }
});

// Create a recipe
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { title, description, ingredients, steps, cuisine, prepTime, dietTags } = req.body;
    const recipe = new Recipe({
      title,
      description,
      ingredients,
      steps,
      cuisine,
      prepTime,
      dietTags,
      authorId: req.user._id
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    next(err);
  }
});

// Get a single recipe
router.get('/:id', async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    next(err);
  }
});

// Update a recipe (only author)
router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    if (recipe.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const updates = req.body;
    Object.assign(recipe, updates);
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    next(err);
  }
});

// Delete a recipe (only author)
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    if (recipe.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await recipe.deleteOne();
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
