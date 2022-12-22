const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const isAuth = require('../middleware/auth')

router
  // .post('/signup',

  //     async (req, res) => {
  //         console.log(req.body)

  //     const {
  //         email,
  //         isAdmin,
  //         personnage
  //     } = req.body

  //     try {
  //         let user = await User.findOne({ email })
  //         if (user){
  //             return res.status(400).json({
  //                 message: 'User already exist'
  //             })
  //         }
  //         user = new User({
  //             email,
  //             isAdmin,
  //             personnage
  //         })

  //         await user.save();
  //         const payload =  {
  //             user: {
  //                 id: user.id
  //             }
  //         }
  //     } catch (error) {

  //         console.error(error);
  //         res.status(500).send('Erreur lors de la sauvegarde')
  //     }
  // })
  .get(
    "/find",isAuth,

    async (req, res) => {

      try {
        req.props = {};

        console.log(req.user);
        console.log(req.query.email);

        if (!["Employee","Admin"].includes(req.user.role) && req.user.email !== req.query.email) {

          return res.status(400).send("Vous n'avez pas la permission de voir cette route")

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
  .delete(
    "/delete",isAuth,

    async (req, res) => {
      console.log(req.body);
      try {
        if (req.body.role == "Admin") {
          const user = await User.deleteOne({ email: req.body.email });
          res.send(user);
        }
      } catch (error) {
        res.status(400).json({ msg: "You dont have the permission" });
      }
    }
  )
  .post(
    "/add",

    async (req, res) => {
      try {
        let email = req.body.email;
        let userExist = await User.findOne({ email });

        if (userExist) {
          return res.status(400).json({ msg: "User already exist" });
        }
        const user = new User({ ...req.body });
        await user.save();
        res.send(user);
      } catch (error) {
        console.log(error);
        res.status(400).json({ error });
      }
    }
  )
  .put("/update",isAuth,

    async (req, res) => {
      try {
        console.log(req.query._id);

        const user = await User.findByIdAndUpdate(req.query._id, {...req.body,});
        res.send(user);
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
              });
            }
          });
        }
      });
    }
  );

module.exports = router;
