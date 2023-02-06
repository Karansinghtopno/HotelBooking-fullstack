const express = require("express");
const router = express.Router();
const { userRegister, userLogin } = require("../controllers/authController");

//middlewares
// const { verifyToken, verifyTokenAdmin } = require("../middlewares/verifyToken");

//routes

router.post("/register", userRegister);
router.post("/login", userLogin);

module.exports = router;
