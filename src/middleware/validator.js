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
const ticketSchema = Joi.object({
    isValidated: Joi.boolean().required(),
    user: Joi.string().required(),
    train: Joi.string().required(),
})

const trainSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'invalid type',
        'string.epmty': `train's name is required`,
    }),
    start_station: Joi.string().required().messages({
        'string.base': 'invalid type',
        'string.epmty': `station's name is required`,
    }),
    end_station: Joi.string().required().messages({
        'string.base': 'invalid type',
        'string.epmty': `station's name is required`,
    }),
    time_of_departure: Joi.string().required().messages({
        'string.base': 'invalid type',
        'string.epmty': `time is required`,
    }),
})

const trainStationsSchema = Joi.object({
    name: Joi.string().required(),
    open_hour: Joi.string().required(),
    close_hour: Joi.string().required(),
    image: Joi.any()
})

exports.validateRegister = validator(registerSchema);
exports.validateLogin = validator(loginSchema);
exports.validateTicket = validator(ticketSchema);
exports.validateTrain = validator(trainSchema);
exports.validateTrainStations = validator(trainStationsSchema);