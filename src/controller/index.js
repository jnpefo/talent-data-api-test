const rescue = require('express-rescue');
const loginServer = require('../service/index');

const loginUser = rescue(async (req, res, netx) => {
  const { email, password } = req.body;
  const token = await loginServer({ email, password });
  if (token.status) return netx(token);
  res.status(200).json(token);
});

module.exports = loginUser;
