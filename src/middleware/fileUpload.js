const multer = require('multer');
const path = require('path');
const storage = multer.memoryStorage()


const fileUpload = () => multer({
    //storage: storage(destination),
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2, // 2mb
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype == "image/jpeg") {

            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error('Filetype not allowed'));

        }
    },
    onError: function (err, next) {
        return new Error(err);
    }
}).single('image');


module.exports = fileUpload;