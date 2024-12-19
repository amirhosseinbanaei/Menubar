const Category = require('./../models/categoryModel');
const { validateCategory } = require('../validators/validator');
const Item = require('../models/itemModel');

exports.addCategory = async (req, res) => {
   try {
      // const { error } = validateCategory(req.body);
      // if (error) {
      //    console.log(error);
      //    return res.status(404).json({ status: 'failed', message: 'Validation error !!' });
      // }

      const newCategory = {
         ...req.body,
         // image: req.body.imageId ? `${req.body.domain}/assets/images/${req.body.imageId}.jpeg` : `${req.body.domain}/assets/images/no-preview.png`,
         project: req.headers.project,
      };

      await Category.create(newCategory);

      res
         .status(201)
         .json({
            status: "success",
            message: 'New category added.'
         })
   } catch (err) {
      console.log(err)
      res
         .status(404)
         .json({
            status: "failed",
            message: 'Failed to add new category !!'
         })
   }
};

exports.getCategory = async (req, res) => {
   const category = await Category.findById(req.params.categoryId);
   if (!category) {
      return res.status(404).json({ status: 'failed', message: "Filed to found category !!" });
   }
   return res.status(200).json(category);
};

exports.getCategories = async (req, res) => {
   const categories = await Category.find({ project: req.headers.project });
   if (!categories) {
      return res.status(404).json({ status: 'failed', message: "Filed to found categories !!" });
   }
   res
      .status(200)
      .json(categories)
};

exports.editCategory = async (req, res) => {
   try {
      const categoryId = req.params.categoryId;
      // const { error } = validateCategory(req.body);
      // if (error) {
      //    console.log(error);
      //    return res.status(404).json({ status: 'failed', message: 'Validation error !!' });
      // }

      await Category.findByIdAndUpdate(categoryId, req.body);

      return res.status(200).json({ message: 'Category updated successfully' });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
   }
};

exports.deleteCategory = async (req, res) => {
   const deleteCategory = await Category.findByIdAndDelete(req.params.categoryId);
   if (!deleteCategory) {
      return res.status(404).json({ status: 'failed', message: "Category not found !!" });
   }
   return res.status(200).json({ status: 'success', message: 'Category deleted successfully' });
};

exports.deleteSubCategory = async (req, res) => {
   try {
      const { categoryId, subCategoryId } = req.query;
      const currentCategory = await Category.findById(categoryId);
      const filtered = currentCategory.subCategory.filter(el => el.id !== subCategoryId);
      currentCategory.subCategory = filtered;
      currentCategory.save();
      await Item.find({ subCategory: subCategoryId }).updateOne({ subCategory: '0' });
      // deleteSubCategoryFromItems.forEach(el => el.subCategory = '0');
      // deleteSubCategoryFromItems.save();
      return res.status(200).json({ status: 'success', message: "Subcategory deleted successfully" });
   } catch (error) {
      console.log(error);
      return res.status(400).json({ status: 'failed', message: "Subcategory couldn't delete" });
   }
};

exports.editSubCategory = async (req, res) => {
   try {
      const { categoryId } = req.query;
      const category = await Category.findById(categoryId);

      if (!category) {
         return res.status(404).json({ message: 'Item not found' });
      }

      category.subCategory = req.body.subCategory;
      category.save();
      // console.log(bodyKeys);
      // const updatedFields = {};
      // bodyKeys.forEach(key => {
      //    if (key !== 'image') {
      //       updatedFields[key] = req.body[key];
      //    } else {
      //       updatedFields[key] = `${req.body.domain}/assets/images/${req.body[key]}.jpeg`
      //    }
      // })
      // if (req.finalImageName) {
      //    updatedFields['image'] = `https://ftp-menubar.amirhosseinbanaei.ir/admin-ftp-menubar${req.finalImageName}`
      // }
      // const updatedCategory = await Category.findByIdAndUpdate(
      //    categoryId,
      //    { $set: updatedFields },
      //    { new: true } // Return the updated document
      // );

      return res.status(200).json({ message: 'SubCategory updated successfully' });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
   }
};