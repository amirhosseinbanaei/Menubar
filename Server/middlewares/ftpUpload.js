const Client = require('ftp');
const ftpClient = new Client();
const uuid = require('uuid');
const ftpConfig = {
   host: 'ftp.amirhosseinbanaei.ir',
   port: 21, // FTP port
   user: 'admin-ftp-menubar@ftp-menubar.amirhosseinbanaei.ir',
   password: 'W#aqaWkpBiW#a#U&zN',
}

// const ftpConfig = {
//    host: process.env.FTP_SERVER,
//    port: process.env.FTP_PORT,
//    user: process.env.FTP_USER,
//    password: process.env.FTP_PASSWORD,
// }

const ftpUploadHandler = (req, destination, next) => {
   // Handle FTP connection events
   ftpClient.on('ready', () => {
      const destinationPath = `/${destination}/${req.headers.project}-${uuid.v4()}.jpeg`;

      // Upload the file to the FTP server
      ftpClient.put(req.resizedImagePath, destinationPath, (error) => {
         if (error) {
            console.error('An error occurred while uploading the file:', error);
            res.status(500).json({ message: 'File upload failed.' });
         } else {
            console.log('File uploaded successfully.');
            req.finalImageName = destinationPath;
            // Pass control to the next middleware or route handler
            next();
         }

         // Close the FTP connection
         ftpClient.end();
      });
   });

   // Handle FTP error event
   ftpClient.on('error', (error) => {
      console.error('FTP connection error:', error);
      // res.status(500).json({ message: 'FTP connection error.' });
   });
}

exports.ftpDeleteHandler = (destination) => {
   ftpClient.delete(destination, error => {
      error ? console.log('We have error to delete exist file') : console.log('image deleted successfully');
   })
}

module.exports = (destination) => {
   return function (req, res, next) {
      console.log('ftp middleware call');
      if (!req.file) {
         return next();
      }
      console.log('ftp middleware call');
      ftpClient.connect(ftpConfig);
      if (!req.body.id) {
         ftpUploadHandler(req, destination, next);
      } else {
         if (!req.file) {
            next();
         } else {
            ftpUploadHandler(req, destination, next);
         }
      }
   }
}