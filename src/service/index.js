require('dotenv').config();
const jwt = require('jsonwebtoken');
const { findOneEmail, getProctudModel } = require('../model');
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
    intern: [0, 1, 2],
  };

  return roles[role];
};

const getProctudServices = async (name, role) => {
  // const level = getLevel(role);
  // readOrganzation

  if (name.startsWith('STUFF')){
    console.log('STUFF');
  } else {
    
    const result = await getProctudModel(name, role);
    return result;
  }
};

module.exports = {
  loginServices,
  getProctudServices,
};
