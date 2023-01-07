const mongoose = require('mongoose');
const sharp = require("sharp");
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
  }

});


// // Fonction de resize 200 x 200
// TrainStationModel.pre("save", async function (next) {
//   if (this.image) {
//     const imageBuffer = Buffer.from(this.image, "base64");
//     const image = sharp(imageBuffer);
//     const metadata = await image.metadata();
//     if (metadata.width > 200 || metadata.height > 200) {
//       image.resize(200, 200);
//     }
//     const imageResized = await image.toBuffer();
//     this.image = imageResized.toString("base64");
//   }
//   next();
// });


module.exports = mongoose.model('TrainStations', TrainStationModel)