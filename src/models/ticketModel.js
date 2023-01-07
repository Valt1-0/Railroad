const mongoose = require('mongoose')

const Schema =  mongoose.Schema;

/**
 * * Ticket
**/

const TicketModel = new Schema({

    // _id: {
  //   type: Number,
  //   required: true,
  // },
  user: {
    type: String,
    required: true,
  },
  train: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('Tickets', TicketModel)