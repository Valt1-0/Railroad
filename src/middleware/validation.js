const Joi = require("joi");

const userSchema = Joi.object({
    pseudo: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),

});

function validateData(data, schema) {
    const { value, error } = schema.validate(data);
    if (error) {
      return { error: error.details[0].message };
    }
    return { value };
}

module.exports = { userSchema, validateData };