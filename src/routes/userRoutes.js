const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose')
const isAuth = require('../middleware/isAuth')
const isAdmin = require('../middleware/isAdmin');
const { validateLogin } = require("../../validator");

router
  .get(
    "/find",isAuth,

    async (req, res) => {

      try {
        req.props = {};

        console.log(req.user);
        console.log(req.query.email);

        if (!["Employee","Admin"].includes(req.user.role) && req.user.email !== req.query.email) {

          return res.status(401).send("You dont have the permission")

        }

          if (req.query)
          for (let attrname in req.query) {
            req.props[attrname] = req.query[attrname];
          }
          console.log(req.props);

          // Utilisez le modèle de schéma pour récupérer tous les utilisateurs de la base de données
          User.find(req.props, (err, users) => {
            if (err) {
              throw err;
            } else {
              res.send(users);
            }
          });

      } catch (error) {
        res.status(500).send(error);
      }
    }
  )
  .delete("/delete",isAuth,

    async (req, res) => {
      console.log(req.body);
      try {

        if (!req.user) return res.status(401).send({ error: 'Not authenticated' });

        if (req.user.email == req.body.email) {
          const user = await User.deleteOne({ email: req.body.email });
          res.send(user);
        } else {
          res.status(403).send({ error: "You dont have the permission"})
        }
      } catch (error) {
        res.status(400).json({ msg: "You dont have the permission" });
      }
    }
  )
  .put("/update",isAuth,

    async (req, res) => {
      try {
        const paramsId = req.query._id;
        const userId = req.user._id;

        console.log(userId);
        console.log(paramsId);
        console.log(userId == paramsId)

        // vérification de la connexion de l'utilisateur
        if (!req.user) return res.status(401).send({ error: 'Not authenticated' });

        if (paramsId != undefined)
        {
          const paramsId = mongoose.Types.ObjectId(req.query._id);

          console.log(userId);
          console.log(paramsId);
          console.log(userId == paramsId)

          if (( paramsId != userId && req.user.role != "Admin" ))
            return res.status(403).send("You dont have the permission")
          else
            userId = paramsId

        }

        const user = await User.findByIdAndUpdate(req.query._id, {...req.body,});
        res.status(200).send(user);

      } catch (error) {
        console.log(error);
        res.status(400).json({ error });
      }
    }
  )
  .post("/login",

    async (req, res) => {
      // Recherchez l'utilisateur dans la base de données en utilisant l'e-mail envoyé dans la requête
      User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
          res.status(500).send(err);
        } else if (!user) {
          res.status(401).send({ message: "E-mail ou mot de passe incorrect" });
        } else {
          // Vérifiez si le mot de passe envoyé dans la requête correspond au mot de passe hashé de l'utilisateur
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
              res.status(500).send(err);
            } else if (!result) {
              res
                .status(401)
                .send({ message: "E-mail ou mot de passe incorrect" });
            } else {
              // Générez un jeton JWT pour l'utilisateur
              const token = jwt.sign(
                { id: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
              );
              res.send({ token });
            }
            const { error, value } = validateLogin(req.body);
          });
        }
      });
    }
  )
  .post("/register",

    async (req, res) => {
      // Vérifiez si l'adresse e-mail est déjà utilisée
      User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
          res.status(500).send(err);
        } else if (user) {
          res
            .status(400)
            .send({ message: "Cette adresse e-mail est déjà utilisée" });
        } else {
          // Hash le mot de passe de l'utilisateur
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              res.status(500).send(err);
            } else {
              // Créez un nouvel utilisateur avec les données envoyées dans la requête et le mot de passe hashé
              const newUser = new User({
                id: req.body.id,
                email: req.body.email,
                pseudo: req.body.pseudo,
                role: req.body.role,
                password: hash,
              });
              // Enregistrez l'utilisateur dans la base de données
              newUser.save((err, user) => {
                if (err) {
                  console.error(err);
                  res.status(500).send(err);
                } else {
                  // Générez un jeton JWT pour l'utilisateur
                  const token = jwt.sign(
                    { id: user._id, email: user.email, role: user.role },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                  );
                  res.send({ token });
                }
              const { error, value } = validateRegister(req.body);
              });
            }
          });
        }
      });
    }
  );

module.exports = router;
