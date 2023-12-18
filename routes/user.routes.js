const express = require('express');
const router = express.Router();

const {register,login,forgot} = require("../controller/user.controller")

router.post("/register", register)
router.post("/login", login)
router.post("/forgot", forgot)

module.exports = router