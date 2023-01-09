const express = require("express");

const router = express.Router();

const Ticket = require('../models/ticketModel')
const Train = require("../models/trainModel");

const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");
const { validateTicketBook } = require("../middleware/validator");
const { validateTicketValidate } = require("../middleware/validator");

router
  .get("/find",
      async (req, res) => {
        try {
          Ticket.find({}, (err, tickets) => {
            if (err) return res.send(err);
            res.send(tickets);
          });
        } catch (error) {
          console.error(error);
          res.status(404).send("Not found");
        }
      }
    )
  .post("/book",isAuth,

    async (req, res) => {

    try {

      // Joi Validation
      const { error, value } = validateTicketBookO(req.body);

      if (error) {
        console.log(error);
        return res.send(error.details);
      }


      // Récupérez les informations de réservation envoyées dans la requête
      const { userEmail, trainName } = req.body;

      console.log(userEmail + " " + trainName);

      // Récupérez les informations du train correspondant à l'identifiant de train envoyé dans la requête
      let train = await Train.findOne({ name: trainName });
      // Si le train n'existe pas, renvoyez un message d'erreur indiquant que le train n'existe pas
      if (!train) {
        return res.status(404).send({ error: "Train not found" });
      }

      // Créez un nouveau billet en utilisant l'identifiant de l'utilisateur et l'identifiant du train
      const ticket = new Ticket({
        user: userEmail,
        train: trainName,
        isValidated: false,
      });

      await ticket.save();
      res.send(ticket);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to book ticket" });
    }
  })
  .post("/validate",isAuth,
  
  async (req, res) => {

    // Joi Validation
    const { error, value } = validateTicketValidate(req.body);

    if (error) {
      console.log(error);
      return res.send(error.details);
    }

    try {

      if (!["Employee","Admin"].includes(req.user.role)) {

        return res.status(401).send("You dont have the permission")

      }

      // Récupérez les informations de validation envoyées dans la requête
      const ticketId = req.query.ticketId;
      const { start_station, end_station } = req.body;

      // Récupérez le billet correspondant à l'identifiant de billet envoyé dans la requête
      const ticket = await Ticket.findById(ticketId);

      // Si le billet n'existe pas, renvoyez un message d'erreur indiquant que le billet n'existe pas
      if (!ticket) {
        return res.status(404).send({ error: "Ticket not found" });
      }

      // Vérifiez que le billet n'a pas déjà été validé
      if (ticket.isValidated) {
        return res.status(400).send({ error: "Ticket already validated" });
      }

      // Récupérez les informations du train associé au billet
      const train = await Train.findOne({name: ticket.train});

      // Si le train n'existe pas, renvoyez un message d'erreur indiquant que le train n'existe pas
      if (!train) {
        return res.status(404).send({ error: "Train not found" });
      }

      // Vérifiez que le billet est valide pour le trajet spécifié (gare de départ et gare d'arrivée)
      if (train.start_station !== start_station || train.end_station !== end_station) {
        return res.status(400).send({ error: "Invalid ticket for this journey" });
      }

      // Si le billet est valide, marquez-le comme validé
      ticket.isValidated = true;
      await ticket.save();
      // Renvoyez le billet validé à l'utilisateur
      res.send(ticket);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to validate ticket" });
    }
  });



module.exports = router;
