const rescue = require('express-rescue');
const { loginServices, getProductServices } = require('../service');

const loginUser = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const token = await loginServices({ email, password });
  if (token.status) return next(token);
  res.status(200).json({ token:`Bearer ${token}` });
});

const getProduct = rescue(async (req, res, next) => {
  const { organizationName } = req.params;
  const { user } = req;
  const result = await getProductServices(organizationName, user);
  if (result.status) return next(result);
  res.status(200).json(result);
});

module.exports = {
  loginUser,
  getProduct,
};
