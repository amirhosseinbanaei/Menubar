const express = require("express");
const isAdmin = require("../middlewares/isAdmin");
const isAuthenticate = require('./../middlewares/isAuthenticate');
const controller = require("../controllers/payment");

const router = express.Router();

router.get("/get-payment/:project", isAuthenticate, isAdmin, controller.GetProjectPayment);
router.post("/create", isAuthenticate, isAdmin, controller.CreatePayment);

module.exports = router;