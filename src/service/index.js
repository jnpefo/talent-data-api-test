require('dotenv').config();
const jwt = require('jsonwebtoken');
const { findOneEmail, getProctudModel, filterOrganization } = require('../model');
const validLogin = require('./validator');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const loginServices = async (data) => {
  const { error } = validLogin.validate(data);
  if (error) return { status: 400, message: error.details[0].message };

  const { email, password } = data;

  const existUser = await findOneEmail(email);

  if (existUser === undefined) return { status: 400, message: 'Invalid fields' };
  if (existUser.email !== email) return { status: 400, message: 'Invalid fields' };
  if (existUser.password !== password) return { status: 400, message: 'Invalid fields' };

  const payload = {
    _id: existUser.userId,
    email: data.email,
    role: existUser.roles[0],
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);
  return token;
};

const getLevel = (role) => {
  const roles = {
    junior: 2,
    middle: [1, 2],
    senior: [0, 1, 2],
    intern: [0, 1, 2, 'STUFF A'],
  };

  return roles[role];
};

const getProctudServices = async (organization, role) => {
  const level = getLevel(role);
  const departments = await filterOrganization(organization, level);
  // if (organization.startsWith('STUFF')){
  //   const resultStuff = await getProctudModel(organization, level);
  //   return resultStuff;
  // } else {
  //   const resultName = await getProctudModel(organization, level);
  //   return resultName;
  // }
};

module.exports = {
  loginServices,
  getProctudServices,
};
