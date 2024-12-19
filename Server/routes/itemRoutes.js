const express = require('express');
const router = express.Router();
const controller = require('./../controllers/item');
const checkSubscription = require('../middlewares/checkSubescribtion');
const isAuthenticate = require('../middlewares/isAuthenticate');
// const resizeImage = require('./../middlewares/resizeImage');
// const uploadToFTP = require('./../middlewares/ftpUpload');
router
   .route('/')
   .get(checkSubscription, controller.getItems)
   .post(checkSubscription, controller.getSpecificItems)
router
   .route('/add')
   .post(checkSubscription, controller.addItem);

// router
//    .route('/add/excel-file')
//    .post(controller.uploadExcel, controller.addItemWithExcel);

router
   .route('/:itemId')
   .get(checkSubscription, controller.getSingleItem)
   .delete(checkSubscription, controller.deleteItem)
   .put(checkSubscription, controller.editItem);

// router
//    .route('/:itemId/rate')
//    .post()


module.exports = router;