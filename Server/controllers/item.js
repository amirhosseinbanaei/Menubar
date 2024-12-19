// const fs = require('fs');
// const path = require('path');
const Item = require('./../models/itemModel');
const { validateItem } = require('../validators/validator');
// const xlsx = require('xlsx');
// const multerStorage = require('./../utils/multerStorage');
// const ftpDeleteHandler = require('./../middlewares/ftpUpload');

// const uploadExcel = multerStorage('excel files');
// exports.uploadExcel = uploadExcel.single('excel-file');

exports.addItem = async (req, res) => {
   try {
      // const { error } = validateItem(req.body);
      // if (error) {
      //    console.log(error);
      //    return res.status(404).json({ status: 'failed', message: 'Validation error !!' });
      // }

      const newItem = {
         image: req.body.imageId ? `${req.body.domain}/assets/images/${req.body.imageId}.jpeg` : `${req.body.domain}/assets/images/no-preview.png`,
         price: req.body.price || 0,
         ...req.body,
         project: req.headers.project
      };

      await Item.create(newItem);
      res
         .status(201)
         .json({
            status: "success",
            message: "New item added successfully"
         })
   } catch (err) {
      console.log(err)
      res
         .status(404)
         .json({
            status: "failed",
            message: "Failed to add new item !!"
         })
   }
};

// exports.addItemWithExcel = async (req, res) => {
//    const excelPath = path.join(__dirname, '..', `/uploads/excel files/${req.file.originalname}`)
//    console.log(excelPath)
//    const workbook = xlsx.readFile(excelPath);
//    const sheetName = workbook.SheetNames[0];
//    const sheet = workbook.Sheets[sheetName];
//    const data = xlsx.utils.sheet_to_json(sheet);
//    console.log(data)
// }

exports.getItems = async (req, res) => {
   const project = req.headers.project;
   const getItem = await Item.find({ project }).populate('category');
   if (!getItem) {
      return res.status(404).json({ status: 'failed', message: 'Item not found' });
   }
   return res.status(200).json(getItem);
};

exports.getSpecificItems = async (req, res) => {
   const project = req.headers.project;
   const items = await Item.find({ project }).populate('category').exec();
   // Filter items based on the categoryId in req.body
   const filteredItems = items.filter(item => item.category && item.category._id.toString() === req.body.categoryId);
   if (!filteredItems) {
      return res.status(404).json({ status: 'failed', message: 'Item not found' });
   }
   return res.status(200).json(filteredItems);
};

exports.getSingleItem = async (req, res) => {
   const itemId = req.params.itemId
   const item = await Item.findById(itemId).populate('category');
   if (!item) {
      return res.status(404).json({ status: 'failed', message: 'Item not found' });
   }
   return res.status(200).json(item);
};

exports.editItem = async (req, res) => {
   try {
      const itemId = req.params.itemId;

      // const { error } = validateItem(req.body);
      // if (error) {
      //    console.log(error);
      //    return res.status(404).json({ status: 'failed', message: 'Validation error !!' });
      // }

      await Item.findByIdAndUpdate(itemId, req.body);

      return res.status(200).json({ message: 'Item updated successfully' });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
   }
   // try {
   //    const itemId = req.params.itemId;
   //    const item = await Item.findById(itemId);
   //    const bodyKeys = Object.keys(req.body);
   //    if (bodyKeys.length > 1) {
   //       bodyKeys.forEach(eachKey => {
   //          item[eachKey] = req.body[eachKey];
   //       })
   //    } else {
   //       item[bodyKeys] = req.body[bodyKeys];
   //    }
   //    item.save();
   //    return res.status(200).json({ message: 'Item updated successfully' });
   // } catch (error) {
   //    console.error(error);
   //    res.status(500).json({ message: 'An error occurred' });
   // }
};

exports.deleteItem = async (req, res) => {
   const deleteItem = await Item.findByIdAndDelete(req.params.itemId);
   if (!deleteItem) {
      return res.status(404).json({ status: 'failed', message: 'Item not found !!' });
   }
   return res.status(200).json({ status: 'success', message: 'Item deleted successfully' });
};

exports.addRating = async (req, res) => {
   const itemId = req.params.itemId;
   const { rating, userId } = req.body;

   try {
      const item = await Item.findById(itemId);

      if (!item) {
         return res.status(404).json({ message: 'Item not found' });
      }

      // Check if the user has already rated this item
      const existingRating = item.ratings.find(
         (r) => r.user.toString() === userId.toString()
      );

      if (existingRating) {
         return res.status(400).json({ message: 'You have already rated this item' });
      }

      // Add the new rating
      item.ratings.push({ user: userId, rating });
      await item.save();
      res.status(200).json({ message: 'Rating added successfully' });
   } catch (error) {
      console.error('Error adding rating:', error);
      res.status(500).json({ message: 'Internal server error' });
   }
}