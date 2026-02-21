const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');
const connectDB = require('./lib/utils');
const cookieParser = require('cookie-parser')

dotenv.config()




const app = express()







app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
const PORT = process.env.PORT || 5000





app.listen(5000, () => {
    console.log(`listening on port ${PORT}`)
    connectDB()

})