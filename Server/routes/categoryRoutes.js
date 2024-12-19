const express = require('express');
const router = express.Router();
const controller = require('./../controllers/category');
const isAuthenticate = require('../middlewares/isAuthenticate');
const checkSubscription = require('../middlewares/checkSubescribtion');
router
   .route('/')
   .get(checkSubscription, controller.getCategories)

router
   .route('/add')
   .post(checkSubscription, controller.addCategory);

router
   .route('/subcategory')
   .put(checkSubscription, controller.editSubCategory)
   .delete(checkSubscription, controller.deleteSubCategory)

router
   .route('/:categoryId')
   .get(checkSubscription, controller.getCategory)
   .put(checkSubscription, controller.editCategory)
   .delete(checkSubscription, controller.deleteCategory);

module.exports = router;