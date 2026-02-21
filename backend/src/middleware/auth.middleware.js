const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const cookieParser = require('cookie-parser');



const protectRoute = async (req, res, next) => {


    try {

        const token = res.cookies.jwt


        if (!token) {
            return res.status(401).json({
                message:
                    "Not authorize"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({ message: "invalid token not authorized" })
        }

        const user = await User.findById(decode.userId).select("-password")

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        req.user = user

        next()

    }


    catch (err) {

        console.log('error in the producted middleware', err.message)

        res.status(500).json({ message: "error in the  protect routes" })

    }




}


module.exports = protectRoute