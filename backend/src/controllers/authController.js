const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/userModels');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../lib/generateToken');




const Signup = async (req, res) => {
    const { fullName, email, password } = req.body


    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    try {
        // hash
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }


        // check if the email  or user exist
        const user = await User.findOne({ email })

        if (user) return res.status(400).json({ message: 'Email already exist' })

        // hash the password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        // creating the new user 

        const newUser = new User({
            fullName: fullName,
            email,
            password: hashedPassword
        })


        if (newUser) {
            // generate jwt token here
            generateToken(newUser._id, res)
            await newUser.save()


            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })

        }
        else {
            res.status(400).json({
                message: "Invalid"
            })
        }

    }

    catch (error) {
        console.log(' error in the signup', error.message)
        res.status(500).json({ message: "Internal Server Error" })

    }
}

const Login = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Invalid credentails" })

        }


        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        generateToken(user._id, res)

        res.status(200).json({
            _id: user_id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.ProfilePic
        })

    }

    catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })

    }
}

const Logout = async (req, res) => {
    res.send('logout works')
}

module.exports = { Signup, Login, Logout }
