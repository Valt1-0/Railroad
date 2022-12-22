const mongoose = require('mongoose')

const Schema =  mongoose.Schema;

/**
 * * Train
**/

const TrainModel = new Schema({

    // _id: {
  //   type: Number,
  //   required: true,
  // },
  name: {
    type: String,
    required: true,
  },
  start_station: {
    type: String,
    required: true,
  },
  end_station: {
    type: String,
    required: true,
  },
  time_of_departure: {
    type: String,
    required: true,
  }

});

module.exports = mongoose.model('Trains', TrainModel)