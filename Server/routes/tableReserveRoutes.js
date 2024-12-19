const express = require("express");

const controller = require("../controllers/tableReserve");

const router = express.Router();

router.get("/", controller.getTableReseved);
router.post("/add", controller.addTableReserve);

module.exports = router;