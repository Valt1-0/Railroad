const Joi = require('joi');

const validator = (schema) => (playload) =>
    schema.validate(playload, { abortEarly: false });

const registerSchema = Joi.object({
    pseudo: Joi.string().min(3).required().messages({
        'string.base': 'invalid type',
        'string.empty': 'pseudo is required',
        'string.min': `pseudo minimum {#limit} characters`,
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'invalid type',
        'string.empty': 'email is required',
    }),
    password: Joi.string().min(12).required().messages({
        'string.base': 'invalid type',
        'string.empty': 'password is required',
        'string.min': `password minimum {#limit} characters`,
    }),
    role: Joi.string().valid("User", "Employee", "Admin").required().messages({
        'string.base': 'invalid type',
        'string.empty': 'role is required',
    }),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': 'invalid type',
        'string.empty': 'email is required',
    }),
    password: Joi.string().required().messages({
        'string.base': 'invalid type',
        'string.empty': 'password is required',
        'string.min': `password minimum {#limit} characters`,
    }),
})

const ticketValidateSchema = Joi.object({
    start_station: Joi.string().required().messages({
        'string.base': 'invalid type',
        'string.empty': `start station's name is required`,
    }),
    end_station: Joi.string().required().messages({
        'string.base': 'invalid type',
        'string.empty': `end station's name is required`,
    }),
})

const ticketBookSchema = Joi.object({
    userEmail: Joi.string().required().messages({
        'string.base': 'invalid type',
        'string.empty': 'email is required',
    }),
    trainName: Joi.string().required().messages({
        'string.base': 'invalid type',
        'string.empty': `train's name is required`,
    }),
})

const trainSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'invalid type',
        'string.empty': `train's name is required`,
    }),
    start_station: Joi.string().required().messages({
        'string.base': 'invalid type',
        'string.empty': `station's name is required`,
    }),
    end_station: Joi.string().required().messages({
        'string.base': 'invalid type',
        'string.empty': `station's name is required`,
    }),
    time_of_departure: Joi.string().required().messages({
        'string.base': 'invalid type',
        'string.empty': `time is required`,
    }),
})

const trainStationsSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'invalid type',
        'string.empty': `train station's name is required`,
    }),
    open_hour: Joi.string().required().messages({
        'string.base': 'invalid type',
        'string.empty': `time is required`,
    }),
    close_hour: Joi.string().required().messages({
        'string.base': 'invalid type',
        'string.empty': `time is required`,
    }),
    image: Joi.any()
})

exports.validateRegister = validator(registerSchema);
exports.validateLogin = validator(loginSchema);
exports.validateTicketBook = validator(ticketBookSchema);
exports.validateTicketValidate = validator(ticketValidateSchema);
exports.validateTrain = validator(trainSchema);
exports.validateTrainStations = validator(trainStationsSchema);