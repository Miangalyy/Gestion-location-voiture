const express = require("express");
const router = express.Router();
const auth = require('../controllers/auth');

const AuthController = require('../controllers/authController');

router.post("/register", AuthController.signup);
router.put("/modifier", AuthController.updateProfile);
router.post("/login", AuthController.login);
router.post("/logout", auth, AuthController.logout);
router.get("/userupdate", AuthController.afficherUser);
module.exports = router;