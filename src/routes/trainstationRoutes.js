const express = require('express');

const router = express.Router();
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const TrainStation = require('../models/trainstationModel');
const Train = require('../models/trainModel');

const isAuth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const fileUpload = require('../middleware/fileUpload');




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
    .post("/add",isAuth,isAdmin,fileUpload(),

        async (req, res) => {

            try {
                let name = req.body.name
                let stationExist = await TrainStation.findOne({name});

                if (stationExist) {
                    return res.status(409).json({ msg: 'Train Station already exist'})
                }


                console.log("image : " + req.file.originalname)
                console.log("image : " + req.file.fieldname)
                console.log("image : " + req.file.size)

                // redimensionnement de l'image si nécessaire
                if (req.file) {
                try {
                    const fileName = req.file.originalname

                    const image = sharp(req.file.buffer);
                    const metadata = await image.metadata();
                    if (metadata.width > 200 || metadata.height > 200) {
                        image.resize(200, 200);
                    }
                    const imageResized = await image.toBuffer();
                    const imgUrl = `src/img/trainStations/${fileName}`;
                    fs.writeFileSync(imgUrl, imageResized);
                    req.body.image = fileName;
                } catch (error) {
                    console.error(error);
                    return res.status(400).json({ msg: "Invalid image link" });
                }}

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