const express = require('express');
const Comment = require('../models/Comment');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// GET /:id/comments - fetch nested/threaded comments for a recipe
router.get('/:id/comments', async (req, res, next) => {
  try {
    const allComments = await Comment.find({ recipeId: req.params.id }).lean();
    // Build threaded/nested structure
    const map = {};
    allComments.forEach(c => { c.children = []; map[c._id] = c; });
    const roots = [];
    allComments.forEach(c => {
      if (c.parentId) {
        if (map[c.parentId]) map[c.parentId].children.push(c);
      } else {
        roots.push(c);
      }
    });
    res.json(roots);
  } catch (err) {
    next(err);
  }
});

// POST /:id/comments - add comment or reply to a recipe
router.post('/:id/comments', authMiddleware, async (req, res, next) => {
  try {
    const { content, parentId } = req.body;
    const comment = new Comment({
      recipeId: req.params.id,
      userId: req.user._id,
      username: req.user.username,
      content,
      parentId: parentId || null
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
});

// POST /comments/:id/like - like/unlike a comment
router.post('/comments/:id/like', authMiddleware, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    // Like or unlike based on req.body.action
    const { action } = req.body;
    if (action === 'like') {
      comment.likes = (comment.likes || 0) + 1;
    } else if (action === 'unlike' && comment.likes > 0) {
      comment.likes -= 1;
    }
    await comment.save();
    res.json({ likes: comment.likes });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
