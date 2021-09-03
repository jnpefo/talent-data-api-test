const rescue = require('express-rescue');
const { loginServices, getProctudServices } = require('../service');

const loginUser = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const token = await loginServices({ email, password });
  if (token.status) return next(token);
  res.status(200).json({ token:`Bearer ${token}` });
});

const getProctud = rescue(async (req, res, _next) => {
  const { organizationName } = req.params;
  const { user } = req;
  const result = await getProctudServices(organizationName, user.roles[0]);
  res.status(200).json(result);
});

module.exports = {
  loginUser,
  getProctud,
};
