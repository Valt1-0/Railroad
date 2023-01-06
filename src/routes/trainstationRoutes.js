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
                  return res.status(400).json({ msg: "Train Station not existing" });
                }
                // mise à jour des trains associés à la gare
                await Train.updateMany(
                    { start_station: name },
                    { $set: { start_station: null }}
                );
                await Train.updateMany(
                    { end_station: name },
                    { $set: { end_station: null } }
                );

                // suppression de la gare
                const trainStation = await TrainStation.findOneAndDelete({ name });
                res.send(trainStation);
            } catch (error) {
                res.status(401).json({ msg: 'You dont have the permission'})
            }
        }

    )
    .post("/add",

        async (req, res) => {

            try {
                let name = req.body.name
                let stationExist = await TrainStation.findOne({name});

                if (stationExist) {
                    return res.status(409).json({ msg: 'Train Station already exist'})
                }

                const station = new TrainStation({... req.body})
                await station.save();
                res.send(station)
            } catch (error) {
                console.log(error);
                res.status(400).json({error})

            }

        }

    )
    .put("/update",

        async (req, res) => {

            try {
                console.log(req.query._id);

                const user = await TrainStation.findByIdAndUpdate(req.query._id, { ...req.body});
                res.send(user);
            } catch (error) {
                console.log(error);
                res.status(400).json({error})

            }

        }

    )


module.exports = router