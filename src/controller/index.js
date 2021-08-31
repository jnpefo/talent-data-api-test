const rescue = require('express-rescue');
const { loginServices } = require('../service');

const loginUser = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  console.log('entrei aqui', email);
  const token = await loginServices({ email, password });
  if (token.status) return next(token);
  res.status(200).json(token);
});

module.exports = loginUser;
