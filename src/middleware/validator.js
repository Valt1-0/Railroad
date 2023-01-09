const Joi = require('joi');
const userModel = require('../models/userModel');

const validator = (schema) => (playload) =>
    schema.validate(playload, { abortEarly: false });


const registerSchema = Joi.object({
    pseudo: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(12).required(),
    role: Joi.string().valid("User", "Employee", "Admin").required(),
})


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const ticketSchema = Joi.object({
    isValidated: Joi.boolean().required(),
    user: Joi.string().required(),
    train: Joi.string().required(),
})

const trainSchema = Joi.object({
    name: Joi.string().required(),
    start_station: Joi.string().required(),
    end_station: Joi.string().required(),
    time_of_departure: Joi.string().required(),
})

exports.validateRegister = validator(registerSchema);
exports.validateLogin = validator(loginSchema);
exports.validateTicket = validator(ticketSchema);
exports.validateTrain = validator(trainSchema);