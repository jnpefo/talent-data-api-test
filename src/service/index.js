const jwt = require('jsonwebtoken');
const findOne = require('../model');
const validLogin = require('./validator');

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const loginServices = async (data) => {
  const { error } = validLogin.validate(data);
  console.log("entrei aqui2");
  if (error) return { status: 400, message: error.details[0].message };

  const { email } = data;
  const emailExists = findOne(email);
  if (emailExists === null) return { status: 400, message: 'Invalid fields' };
  
  const payload = {
    _id: emailExists.userId,
    email: data.email,
    role: emailExists.roles[0],
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);
  return token;
};

module.exports = {
  loginServices,
};
