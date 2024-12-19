const express = require('express');
const router = express.Router();
const controller = require('./../controllers/category');

router
   .route('/subcategory')
   .get(controller.getCategories)

router
   .route('/subcategory/add')
   .post(controller.createCategory);

router
   .route('/:subcategoryId')
   .get(controller.getCategory)
   .put(controller.editCategory)
   .delete(controller.deleteCategory);


module.exports = router;