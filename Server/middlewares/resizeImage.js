const fs = require('fs');
const sharp = require('sharp');
module.exports = (width, height) => {
   return function async(req, res, next) {
      if (!req.file) return next();
      const baseUrlSplited = req.baseUrl.split('/');
      let targetFolder;
      switch (baseUrlSplited[baseUrlSplited.length - 1]) {
         case 'category':
            targetFolder = 'category'
            break;
         case 'item':
            targetFolder = 'item'
            break;
      }
      if (targetFolder) {
         const originalImagePath = `uploads/${targetFolder}/${req.file.originalname}`;
         const resizedImagePath = `uploads/${targetFolder}/${req.headers.project}.jpeg`;

         fs.readFile(originalImagePath, async (err, data) => {
            if (err) {
               console.log(err);
               return next();
            }

            try {
               await sharp(data)
                  .resize(width, height)
                  .toFormat('jpeg')
                  .jpeg({ quality: 95 })
                  .toFile(resizedImagePath);

               req.resizedImagePath = resizedImagePath; // Attach the resized image path to the request object
               next();
            } catch (error) {
               console.error('Error while resizing and saving the image:', error);
               next();
            }
         });
      } else {
         next();
      }
   }
};