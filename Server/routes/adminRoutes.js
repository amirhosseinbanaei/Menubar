const express = require("express");

const controller = require("../controllers/admin");

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
// router.get("/me", authenticatedMiddleware, adminController.getMe);
// router.put("/customize", adminController.customizeTheme);
// router.put("/aboutRestaurant", adminController.changeAboutText);
// router.get("/getAboutRestaurant", adminController.getAboutText);

module.exports = router;