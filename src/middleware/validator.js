const Joi = require('joi');

const validator = (schema) => (playload) =>
    schema.validate(playload, { abortEarly: false });


const registerSchema = Joi.object({
    pseudo: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(12).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
})

exports.validateRegister = validator(registerSchema);
exports.validateLogin = validator(loginSchema);