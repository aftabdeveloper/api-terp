const express = require('express');
const router = express.Router();
const EmailVerify = require("../middleware/email-verification.middleware")
const {register,login,forgot} = require("../controller/user.controller")

router.post("/register", register)
router.post("/login", login)
router.post("/forgot", EmailVerify, forgot)

module.exports = router