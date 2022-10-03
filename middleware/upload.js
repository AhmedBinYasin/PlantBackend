const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "client/public/assets/ProfilePics");
    },
    filename: (req, file, cb) => {
        cb(null, "upload" + Date.now() + "-" + file.originalname)
    }
})
 
module.exports = multer({storage})