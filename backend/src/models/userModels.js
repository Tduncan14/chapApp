const mongoose = require('mongoose');


const UserAuth = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePic: {
        type: String,
        default: "",
    }

}, {
    timestamps: true
})



const User = mongoose.model('User', UserAuth)


module.exports = User