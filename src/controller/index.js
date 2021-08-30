const rescue = require('express-rescue');
const { loginServices } = require('../service');

const loginUser = rescue(async (req, res, netx) => {
  const { email, password } = req.body;
  const token = await loginServices({ email, password });
  console.log("entrei aqui1");
  if (token.status) return netx(token);
  res.status(200).json(token);
});

module.exports = loginUser;
