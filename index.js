require("dotenv").config();
const dbConnect = require('./config/connectMongo')
const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const userRoutes = require("./src/routes/userRoutes")
const PORT = process.env.EXPRESS_PORT


/**
 * * MONGO
 */

dbConnect.connect();

const db = mongoose.connection;

db.once("open", () => { console.log(chalk.green("Connected at", chalk.blue(db.name))); });
db.on("error", (error) => {console.error(error);});


/**
 * * EXPRESS
 */

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/users', userRoutes);


app.listen(PORT, () => {
  console.log(chalk.magenta(`Listening on port :`, chalk.yellow(PORT) ));
});