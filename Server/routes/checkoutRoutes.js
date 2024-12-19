const express = require("express");

const controller = require("../controllers/checkout");

const router = express.Router();

router.post("/", controller.checkout);
router.post("/check", controller.checkCheckout);


module.exports = router;