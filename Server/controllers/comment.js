const Comment = require('../models/commentModel');
const JalaliMoment = require('jalali-moment');
exports.addComment = async (req, res) => {
   const { author, commentText, itemId } = req.body;
   const currentData = new Date().toISOString();
   const iranCurrentDate = JalaliMoment(currentData, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
   try {
      const findComment = await Comment.findOne({ itemId, author });
      if (findComment) {
         return res.status(400).json('You have added comment');
      } else {
         await Comment.create({
            author,
            commentText,
            createdAt: iranCurrentDate,
            itemId
         })

         res.status(201).json({ message: 'comment created successfuly' });
      }
   } catch (error) {
      console.log(error)
      res.status(404).json({ message: 'can not create comment' });
   }
}

exports.getComments = async (req, res) => {
   try {
      const comments = await Comment.find({ itemId: req.query.itemId });
      res.status(200).json(comments);
   } catch (error) {
      res.status(404).json('Failed to get comments');
   }
}