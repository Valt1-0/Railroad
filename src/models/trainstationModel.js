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
    type: Date,
    required: true,
  },
  close_hour: {
    type: Date,
    required: true,
  },
  image: {
    uri: {
      type: String
  },
  path: {
      type: String
  },
  }

});

module.exports = mongoose.model('TrainStations', TrainStationModel)