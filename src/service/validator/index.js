const joi = require('joi');

const msg1 = '"email" must be a valid email';
const msg2 = '"email" is required';
const msg3 = '"password" length must be 6 characters long';
const msg4 = '"password" is required';

const validLogin = joi.object({
  email: joi
    .string()
    .email()
    .messages({ 
      'string.email': msg1,
      'any.required': msg2,
    })
    .required(),
  password: joi
    .string()
    .min(6)
    .messages({ 
      'string.min': msg3,
      'any.required': msg4,
    })
    .required(),
});

module.exports = validLogin;
