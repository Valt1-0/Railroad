require("dotenv").config();
const PORT = process.env.EXPRESS_PORT
const dbConnect = require('./config/connectMongo')
const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require('body-parser');
const cors = require('cors')



const userRoutes = require("./src/routes/userRoutes")
const trainRoutes = require("./src/routes/trainRoutes")
const trainStationRoutes = require("./src/routes/trainstationRoutes")
const ticketRoutes = require("./src/routes/ticketRoutes")

/**
 * * MONGO
 */

dbConnect.connect();

const db = mongoose.connection;

db.once("open", () => { console.log(chalk.green("MongoDB Database Connected at", chalk.blue(db.name))); });
db.on("error", (error) => {console.error(error);});


/**
 * * EXPRESS
 */

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json( { type: 'application/json'}));

app.use('/users', userRoutes);
app.use('/trains', trainRoutes);
app.use('/trainstations', trainStationRoutes);
app.use('/tickets', ticketRoutes);

const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

app.use('/swagger',swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(chalk.magenta(`Listening on port :`, chalk.yellow(PORT) ));
  console.log(chalk.cyan('Swagger on :', chalk.yellow.underline('http://localhost:3000/swagger')));
});