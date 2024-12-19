const path = require('path');
const multer = require('multer');
const multerStorage = (destination) => {
   const finalDestination = path.join(__dirname, '..', 'uploads', `${destination}`)
   const storage = multer.diskStorage({
      destination: function (req, file, cb) {
         cb(null, finalDestination)
      },
      filename: (req, file, cb) => {
         cb(null, file.originalname);
      }
   });
   return multer({ storage: storage })
}

module.exports = multerStorage;