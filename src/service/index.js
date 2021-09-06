require('dotenv').config();
const jwt = require('jsonwebtoken');
const {
  findOneEmail,
  getProductModel,
  filterOrganization,
  filterStuffOrganization,
} = require('../model');
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
    junior: [2],
    middle: [1, 2],
    senior: [0, 1, 2],
    intern: [0, 1, 2, 'STUFF A'],
  };

  return roles[role];
};

const filterStuff = async (organization, level) => {
  let resultStuff = await filterStuffOrganization(organization, level);
  if (resultStuff[0].name.startsWith('STUFF')) {
    const newSTUFF = [];
    for (i = 0; i < resultStuff.length; i++) {  
      const result = await filterStuffOrganization(resultStuff[i].name, level);
      newSTUFF.push(result);
    };
    const newArray = [];
    for (i = 0; i < newSTUFF.length; i++) {
      for (j = 0; j < newSTUFF[i].length; j++) {
        newArray.push(newSTUFF[i][j]);
      };
    };
    resultStuff = newArray;
  };

  const newObj = { total: 0, products: [] };
  for (i = 0; i < resultStuff.length; i++) {
    const result = await getProductModel(resultStuff[i].name);
    newObj.total = (newObj.total + result.total),
    newObj.products.push(result.products);
  };
  return newObj;
};
const getProductServices = async (organization, role) => {
  const level = getLevel(role);
  const departments = await filterOrganization(organization, level);
  if (departments.length === 0) return { status: 400, message: 'access is not allowed'};
  
  if (departments[0].name.startsWith('STUFF')){
    const resultName = await filterStuff(organization, level);
    return resultName;
  } else {
    const resultName = await getProductModel(organization);
    return resultName;
  }
};

module.exports = {
  loginServices,
  getProductServices,
};
