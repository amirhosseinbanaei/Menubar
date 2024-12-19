const JWT = require("jsonwebtoken");
const createError = require("http-errors");

async function setAccessToken(res, user) {
   const cookieOptions = {
      maxAge: 1000 * 60 * 60 * 24 * 1, // would expire after 1 days
      httpOnly: true, // The cookie only accessible by the web server
      path: '/',
   };
   res.cookie(
      "accessToken",
      await generateToken(user, "1d", process.env.JWT_SECRET_ACCESSTOKEN),
      cookieOptions
   );
}

async function setRefreshToken(res, user) {
   const cookieOptions = {
      maxAge: 1000 * 60 * 60 * 24 * 2, // would expire after 2 days
      httpOnly: true, // The cookie only accessible by the web server
      path: '/',
   };
   res.cookie(
      "refreshToken",
      await generateToken(user, "2d", process.env.JWT_SECRET_REFRESHTOKEN),
      cookieOptions
   );
}

function generateToken(user, expiresIn, secret) {
   return new Promise((resolve, reject) => {
      const payload = {
         userId: typeof user === 'object' ? user._id : user,
      };

      const options = {
         expiresIn,
      };

      JWT.sign(
         payload,
         secret,
         options,
         (err, token) => {
            if (err) reject(createError.InternalServerError("test"));
            resolve(token);
         }
      );
   });
}

function generateRandomNumber(length) {
   if (length === 5) {
      return Math.floor(10000 + Math.random() * 90000);
   }
   if (length === 6) {
      return Math.floor(100000 + Math.random() * 900000);
   }
}

function deleteObjectProperty(object, propertyList) {
   if (propertyList.length > 0) {
      let newObject = { ...object };
      for (let index = 0; index < propertyList.length; index++) {
         delete newObject[`${propertyList[index]}`]
      }
      return newObject
   }
   return false
}

function zarinpal(useSandBox) {

   const sandboxApi = {
      request: 'https://sandbox.zarinpal.com/pg/v4/payment/request.json',
      verify: 'https://sandbox.zarinpal.com/pg/v4/payment/verify.json',
      startPay: 'https://sandbox.zarinpal.com/pg/StartPay/'
   }

   const realApi = {
      request: 'https://api.zarinpal.com/pg/v4/payment/request.json',
      verify: 'https://api.zarinpal.com/pg/v4/payment/verify.json',
      startPay: 'https://www.zarinpal.com/pg/StartPay/'
   }

   const startPay = async (initialParams) => {
      console.log(JSON.stringify(initialParams));
      const url = useSandBox ? sandboxApi.request : realApi.request;
      fetch(url, {
         method: 'POST',
         body: JSON.stringify(initialParams)
      })
         .then(res => res.json())
         .then(data => {
            console.log(data);
         });
   };
   // const verifyPay = () => { };
   return {
      startPay,
      // verifyPay
   }
}

module.exports = {
   setAccessToken,
   setRefreshToken,
   generateToken,
   generateRandomNumber,
   deleteObjectProperty,
   zarinpal
}