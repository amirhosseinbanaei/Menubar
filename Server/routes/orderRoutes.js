const express = require("express");

const controller = require("../controllers/order");

const router = express.Router();

router.get("/", controller.getOrders);
router.post("/add", controller.addOrder);

module.exports = router;