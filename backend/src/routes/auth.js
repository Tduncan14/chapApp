const express = require('express')
const { Signup, Login, Logout } = require('../controllers/authController.js');


const router = express.Router();


router.post("/signup", Signup)


router.post("/login", Login)

router.post("/logout", Logout)

router.put("/update-profile", protectRoute, updateProfile)


module.exports = router