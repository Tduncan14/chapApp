const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()


const connectDB = async () => {


    try {
        const connectDatabase = await mongoose.connect(process.env.MONGO_URI)

        console.log('connected to the databse')

    }


    catch (error) {
        console.log('error', error)
        process.exit(1);
    }




}


module.exports = connectDB