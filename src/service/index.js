const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: 
}

// const loginServices = async (data) => {
//   const { error } = validLogin.validate(data);
//   if (error) return { status: helpers.QOO, message: error.details[0].message };

//   const { email } = data;
//   const emailExists = await User.findOne({ where: { email } });
//   if (emailExists === null) return { status: helpers.QOO, message: 'Invalid fields' };
  
//   const payload = {
//     _id: emailExists.id,
//     email: data.email,
//     role: true,
//   };

//   const token = jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);
//   return token;
// };
