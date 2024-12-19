const express = require("express");

const controller = require("../controllers/sms");

const router = express.Router();

router.post("/send-code", controller.sendCode);
router.post("/verify-code", controller.verifyCode);

module.exports = router;