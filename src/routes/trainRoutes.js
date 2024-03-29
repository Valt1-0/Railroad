const express = require("express");
const router = express.Router();

const Train = require("../models/trainModel");
const TrainStation = require("../models/trainstationModel")

const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");
const { validateTrain } = require("../middleware/validator");

router
  .get("/find",

    async (req, res) => {
      try {
        const sort = req.query.sort || "time_of_departure";
        const limit = req.query.limit || 10;

        Train.find({}, null, { sort: sort, limit: limit }, (err, trains) => {
          if (err) return res.send(err);
          res.send(trains);
        });
      } catch (error) {
        console.error(error);
        res.status(404).send("Not found");
      }
    }
  )
  .delete("/delete",isAuth,isAdmin,

    async (req, res) => {
      console.log(req.body);
      try {
        // récupération de l'ID du train à partir de l'URL
        const deletedTrain = req.body.name;

        // suppression du train en base de données
        Train.deleteOne({ name: deletedTrain}, (err, train) => {
          if (err) return res.send(err);
        res.send(train);
        });
      } catch (error) {
        res.status(403).json({ msg: "You dont have the permission" });
      }
    }
  )
  .post("/add",isAuth,isAdmin,

    async (req, res) => {

      // Joi Validation
      const { error, value } = validateTrain(req.body);

      if (error) {
        console.log(error);
        return res.send(error.details);
      }

      try {
        let name = req.body.name;
        let trainExist = await Train.findOne({ name });

        if (trainExist) {
          return res.status(409).json({ msg: "Train already exist" });
        }

        // Vérification de l'existence de la gare de départ
        let startStationExist = await TrainStation.findOne({ name: req.body.start_station });
        if (!startStationExist) {
          return res.status(400).json({ msg: "Start station not existing" });
        }

        // Vérification de l'existence de la gare d'arrivée
        let endStationExist = await TrainStation.findOne({ name: req.body.end_station });
        if (!endStationExist) {
          return res.status(400).json({ msg: "End station not existing" });
        }

        const train = new Train({ ...req.body });
        await train.save();
        res.send(train);
      } catch (error) {
        console.log(error);
        res.status(400).json({ error });
      }
    }
  )
  .put("/update",isAuth,isAdmin,

    async (req, res) => {
      try {
        console.log(req.query._id);

        const train = await Train.findByIdAndUpdate(req.query._id, {
          ...req.body,
        });
        res.send(train);
      } catch (error) {
        console.log(error);
        res.status(400).json({ error });
      }
    }
  );

module.exports = router;
