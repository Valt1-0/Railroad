const express = require('express');

const router = express.Router();

const TrainStation = require('../models/trainstationModel')
const Train = require('../models/trainModel')
const isAuth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')

router
    .get("/find",

        async (req, res) => {

            try {
                const sort = req.query.sort || "name";

                TrainStation.find({}, null, { sort: sort }, (err, trainStations) => {
                    if (err) return res.send(err);
                    res.send(trainStations);
                });
            } catch (error) {
                console.error(error);
                res.status(404).send('Not found');
            }
        }
    )
    .delete("/delete",isAuth,isAdmin,

        async (req, res) => {
            console.log(req.body);
            try {
                let name = req.body.name;
                let stationExist = await TrainStation.findOne({ name });

                if (!stationExist) {
                  return res.status(404).json({ msg: "Train Station not existing" });
                }
                // Suppression des trains associés
                await Train.deleteMany({ $or: [{ start_station: name }, { end_station: name }] });

                // Suppression de la gare
                const trainStation = await TrainStation.deleteOne({ name });
                res.send(trainStation);
            } catch (error) {
                res.status(403).json({ msg: 'You dont have the permission'})
            }
        }

    )
    .post("/add",isAuth,isAdmin,

        async (req, res) => {

            try {
                let name = req.body.name
                let stationExist = await TrainStation.findOne({name});

                if (stationExist) {
                    return res.status(409).json({ msg: 'Train Station already exist'})
                }

                const trainStation = new TrainStation({... req.body});
                await trainStation.save();
                res.send(trainStation);
            } catch (error) {
                console.log(error);
                res.status(400).json({error})

            }
        }
    )
    .put("/update",isAuth,isAdmin,

        async (req, res) => {

            try {
                console.log(req.query._id);

                const trainStation = await TrainStation.findByIdAndUpdate(req.query._id, { ...req.body});
                res.send(trainStation);
            } catch (error) {
                console.log(error);
                res.status(400).json({error})

            }

        }

    )


module.exports = router