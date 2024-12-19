// Middleware to check if the user is authenticated (using the access token)
const jwt = require('jsonwebtoken');
const { setAccessToken, setRefreshToken } = require('../utils/functions');
const isAuthenticate = async (req, res, next) => {
   const accessToken = req.cookies.accessToken;
   if (!accessToken && !req.cookies.refreshToken) {
      // Access token is not present, user is not logged in
      return res.status(401).json({
         message: {
            fa: 'هویت شما احراز نشد',
            en: 'Unauthorized'
         }
      });
   } else {
      try {
         // Verify the access token and extract the user ID
         const decoded = jwt.verify(accessToken, process.env['JWT_SECRET_ACCESSTOKEN']);
         req.userId = decoded.userId;
         next();
      } catch (error) {
         // Access token has expired or is invalid
         // Check if there is a refresh token
         const refreshToken = req.cookies.refreshToken;

         if (!refreshToken) {
            // Refresh token is not present, user is not logged in
            return res.status(401).json({
               message: {
                  fa: 'هویت شما احراز نشد',
                  en: 'Unauthorized'
               }
            });
         }

         try {
            // Verify the refresh token
            const decodedRefreshToken = jwt.verify(refreshToken, process.env['JWT_SECRET_REFRESHTOKEN']);

            // If the refresh token is valid, issue a new access token and refresh token and set them in the cookies
            await setAccessToken(res, decodedRefreshToken.userId);
            await setRefreshToken(res, decodedRefreshToken.userId);

            // Continue to the next middleware or route
            req.userId = decodedRefreshToken.userId;
            next();
         } catch (refreshError) {
            // Refresh token has expired or is invalid, user is not logged in
            return res.status(401).json({
               message: {
                  fa: 'هویت شما احراز نشد',
                  en: 'Unauthorized'
               }
            });
         }
      }
   }
};
module.exports = isAuthenticate;