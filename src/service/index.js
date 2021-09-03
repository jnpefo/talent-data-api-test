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

const getProctudServices = async (name) => {
  if (name.startsWith('STUFF')){
    console.log('STUFF');
  } else {
    const result = await getProctudModel(name);
    return result;
  }
};

module.exports = {
  loginServices,
  getProctudServices,
};
