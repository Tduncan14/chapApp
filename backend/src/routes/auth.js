const express = require('express')
const { Signup, Login, Logout, updateProfile } = require('../controllers/authController.js');
const protectRoute = require('../middleware/auth.middleware.js')

const router = express.Router();


router.post("/signup", Signup)


router.post("/login", Login)

router.post("/logout", Logout)

router.put("/update-profile", protectRoute, updateProfile)


module.exports = router