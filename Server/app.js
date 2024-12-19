const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// Import Routes :
const adminRoutes = require('./routes/adminRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const orderRoutes = require('./routes/orderRoutes');
const itemRoutes = require('./routes/itemRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const projectRoutes = require('./routes/projectRoutes');
const smsRoutes = require('./routes/smsRoutes');
const commentRoutes = require('./routes/commentRoutes');
const tableReserveRoutes = require('./routes/tableReserveRoutes');
const app = express();

// Middlewares :
app.use(cors({
   origin: true,
   credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Use Routes :
app.get('/', (req, res) => res.send('Hello From express App :)'));
// app.get('/test-cookie', (req, res) => {
//    res.cookie('test', 'authorization');
//    res.send('amir')
// });
// app.get('/test-date', (req, res) => {
//    res.cookie('test', 'authorization');
//    res.send('amir')
// });
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/table-reserve', tableReserveRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/sms', smsRoutes);
module.exports = app;