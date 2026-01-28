const jwt = require('jsonwebtoken');

// generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
};

// verify JWT token middleware
const verifyToken = (req, res, next) => {
  try {
    // get token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'no token provided' });
    }

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({ error: 'invalid token' });
  }
};

module.exports = { generateToken, verifyToken };
