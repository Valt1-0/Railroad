const Joi = require("joi");

const userSchema = Joi.object({
    pseudo: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(12).required(),
    role: Joi.string().valid("User", "Employee", "Admin").required(),

});

const validateData = (req, res, next) => {
  // Validez les données de la requête avec Joi
  const { error, value } = userSchema.validate(req.body);

  // Si les données ne sont pas valides, renvoyez un message d'erreur
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  // Si les données sont valides, passez au prochain middleware ou à la route correspondante
  next();
};

module.exports = { validateData };