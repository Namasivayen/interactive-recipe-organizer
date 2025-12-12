const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const user = await User.findById(req.user._id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = adminMiddleware;
