const express = require('express')
const { Signup, Login, Logout } = require('../controllers/authController.js');


const router = express.Router();


router.get("/signup", Signup)


router.get("/login", Login)

router.get("/logout", Logout)


module.exports = router