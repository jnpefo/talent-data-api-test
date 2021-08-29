const jwt = require('jsonwebtoken');
const validLogin = require('./validator');

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const loginServices = async (data) => {
  const { error } = validLogin(data);
  if (error) return { status: 400, message: error.details[0].message };

  // const { email } = data;
  // const emailExists = await User.findOne({ where: { email } });
  // if (emailExists === null) return { status: helpers.QOO, message: 'Invalid fields' };
  
  const payload = {
    _id: emailExists.id,
    email: data.email,
    role: true,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);
  return token;
};
