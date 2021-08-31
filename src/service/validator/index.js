const joi = require('joi');

const msg1 = '"email" is not string';
const msg2 = '"email" is required';
const msg3 = '"password" is not string';
const msg4 = '"password" is required';

const validLogin = joi.object({
  email: joi
    .string()
    .messages({ 
      'string.email': msg1,
      'any.required': msg2,
    })
    .required(),
  password: joi
    .string()
    .messages({ 
      'string.min': msg3,
      'any.required': msg4,
    })
    .required(),
});

module.exports = validLogin;
