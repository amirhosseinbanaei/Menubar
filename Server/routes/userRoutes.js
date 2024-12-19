const express = require("express");

const controller = require("../controllers/user");
const isAuthenticate = require('../middlewares/isAuthenticate');
const router = express.Router();

router.post("/get-otp", controller.getOTP);
router.post("/check-otp", controller.checkOTP);
router.post("/complete-profile", isAuthenticate, controller.completeProfile);
router.get("/", isAuthenticate, controller.getUsers);
router.get("/search", isAuthenticate, controller.searchUser);
module.exports = router;