const jwt = require('jsonwebtoken');
const { findOneEmail } = require('../model');
require('dotenv').config();

const msg = 'Expired or invalid token';
const msg1 = 'Token not found';

const validateJwt = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) return res.status(401).json({ message: msg1 });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(token);
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
