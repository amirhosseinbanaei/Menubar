const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./app');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_LOCAL;
// const DB = process.env.DATABASE_LIARA_DEV;
// const DB = process.env.DATABASE_LIARA;
mongoose.connect(DB, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})
   .then(() => console.log('Connected To Database Successfuly'));

const port = process.env.PORT || 6002;
app.listen(port, () => console.log(`App run on port ${port}`));