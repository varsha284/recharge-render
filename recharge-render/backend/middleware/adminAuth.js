const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if token has user.role structure (from auth.js) or direct role
    const userRole = decoded.user ? decoded.user.role : decoded.role;
    
    if (userRole !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    req.user = decoded.user || decoded;
    next();
  } catch (_error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
