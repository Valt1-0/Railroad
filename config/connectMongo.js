const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

module.exports.connect = async (callback) => {
    mongoose.connect(MONGODB_URI, error => {
            if (error) {
                console.error('Connection failed')
                console.log(error);
            } else {
                if (callback) {
                    callback(mongoose)
                }
            }
    })
}
