const express = require("express");
const controller = require("../controllers/project");
const checkSubscription = require('../middlewares/checkSubescribtion');
const isAuthenticate = require('../middlewares/isAuthenticate');
const router = express.Router();

router.route('/create').post(controller.createProject);
router
   .route('/:projectName')
   .put(checkSubscription, controller.updateProject)
   .get(controller.getProject);
module.exports = router;