const Joi = require('joi');

const register = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.number().required()
});

const list = Joi.object({
  });

const deleted = Joi.object({
email: Joi.string().required()
});

const login = Joi.object({
email: Joi.string().required(),
password: Joi.string().required()
});
module.exports = {
    register,
    deleted,
    list,
    login
  };