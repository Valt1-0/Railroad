const express = require('express');

const router = express.Router();

const Train = require('../models/trainModel')

router
    .get("/find",

        async (req, res) => {

            try {

                const sort = req.query.sort || 'time_of_departure';
                const limit = req.query.limit || 10;

                req.props =  {};
                if (req.query) for (let attrname in req.query) {
                    req.props[attrname] = req.query[attrname];
                }
                const trains = await Train.find(req.props);
                res.status(200).send(trains);

            } catch (error) {
                console.error(error);
                res.status(400).send('Don\'t Exist');
            }


        }
    )
    .delete("/delete",

        async (req, res) => {
            console.log(req.body);
            try {
                if (req.body.role == 'Admin') {
                    const user = await User.deleteOne({ "email": req.body.email})
                    res.send(user)
                }
            } catch (error) {
                res.status(400).json({ msg: 'You dont have the permission'})
            }
        }

    )
    .post("/add",

        async (req, res) => {

            try {
                let email = req.body.email
                let userExist = await Train.findOne({email});

                if (userExist) {
                    return res.status(400).json({ msg: 'User already exist'})
                }
                const user = new Train({... req.body})
                await user.save();
                res.send(user)
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

                const user = await Train.findByIdAndUpdate(req.query._id, { ...req.body});
                res.send(user);
            } catch (error) {
                console.log(error);
                res.status(400).json({error})

            }

        }

    )


module.exports = router