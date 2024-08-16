const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
module.exports = function (req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    jwt.verify(token, 'jwtSecret1234567890', (error, user) => {
      if (error) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = user;
      next();
    });
  }