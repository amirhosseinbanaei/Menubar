const express = require('express');
const router = express.Router();
const controller = require('../controllers/comment');


router
   .route('/add')
   .post(controller.addComment);

router
   .route('/')
   .post(controller.getComments);


module.exports = router;