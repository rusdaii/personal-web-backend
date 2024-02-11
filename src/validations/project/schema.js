const Joi = require('joi');

exports.create = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  github: Joi.string().required(),
  demo: Joi.string().required(),
  skills: Joi.array().items(Joi.string()).required(),
});

exports.update = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  github: Joi.string().required(),
  demo: Joi.string().required(),
  skills: Joi.array().items(Joi.string()).required(),
});
