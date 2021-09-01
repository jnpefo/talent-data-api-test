const rescue = require('express-rescue');
const { loginServices } = require('../service');

const loginUser = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const token = await loginServices({ email, password });
  if (token.status) return next(token);
  res.status(200).json(token);
});

const getProctud = rescue(async (_req, res, _next) => {
  res.status(200).json('Tudo ok');
});

module.exports = {
  loginUser,
  getProctud,
};
