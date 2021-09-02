require('dotenv').config();
const jwt = require('jsonwebtoken');
const { findOneEmail } = require('../model');

const msg = 'Expired or invalid token';
const msg1 = 'Token not found';

const validateJwt = async (req, res, next) => {
  const isToken = req.headers.authorization;

  const token = isToken.split(' ');
  
  if (!token || token.length !== 2) return res.status(401).json({ message: msg1 });
  
  try {
    const decoded = jwt.verify(token[1], process.env.JWT_SECRET);
    const { email } = decoded;

    const existUser = await findOneEmail(email);
    
    if (!existUser) return res.status( 400).json({ message: msg });
    
    const { userId } = existUser;

    const result = { ...decoded, userId };

    req.user = result;

    next();
  } catch (err) {
    return res.status(401).json({ message: msg });
  }
};

module.exports = validateJwt;
