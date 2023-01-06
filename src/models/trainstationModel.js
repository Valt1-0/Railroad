const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose')

const Schema =  mongoose.Schema;

/**
 * * TrainStation
**/

const TrainStationModel = new Schema({

    // _id: {
  //   type: Number,
  //   required: true,
  // },
  name: {
    type: String,
    required: true,
  },
  open_hour: {
    type: String,
    required: true,
  },
  close_hour: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: faker.image.transport(200,200),
  }

});

module.exports = mongoose.model('TrainStations', TrainStationModel)