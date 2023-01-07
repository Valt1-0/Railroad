const express = require("express");

const router = express.Router();

const Train = require("../models/trainModel");

const isAuth = require("../middleware/isAuth");

const isAdmin = require("../middleware/isAdmin");

router
    .post("/book", async (req, res) => {
    
    try {
      // Récupérez les informations de réservation envoyées dans la requête
      const { userEmail, trainId } = req.body;
  
      // Vérifiez que l'utilisateur est authentifié et autorisé à réserver un billet
      // Vous pouvez utiliser un middleware d'authentification pour vérifier si l'utilisateur est connecté et si son rôle lui permet de réserver un billet
      // Si l'utilisateur n'est pas authentifié ou autorisé, renvoyez un message d'erreur indiquant qu'il n'a pas la permission de réserver un billet
  
      // Récupérez les informations du train correspondant à l'identifiant de train envoyé dans la requête
      const train = await Train.findById(trainId);
  
      // Si le train n'existe pas, renvoyez un message d'erreur indiquant que le train n'existe pas
      if (!train) {
        return res.status(404).send({ error: "Train not found" });
      }
  
      // Créez un nouveau billet en utilisant l'identifiant de l'utilisateur et l'identifiant du train
      const ticket = new Ticket({
        user: userId,
        train: trainId,
      });

      await ticket.save();
      res.send(ticket);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to book ticket" });
    }
  })
  .post("/validate", async (req, res) => {
    try {
      // Récupérez les informations de validation envoyées dans la requête
      const { ticketId, departureStation, arrivalStation } = req.body;
  
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
      const train = await Train.findById(ticket.train);
  
      // Si le train n'existe pas, renvoyez un message d'erreur indiquant que le train n'existe pas
      if (!train) {
        return res.status(404).send({ error: "Train not found" });
      }
  
      // Vérifiez que le billet est valide pour le trajet spécifié (gare de départ et gare d'arrivée)
      if (train.startStation !== departureStation || train.endStation !== arrivalStation) {
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
