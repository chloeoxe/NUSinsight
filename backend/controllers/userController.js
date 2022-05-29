const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, position, major, email, username, password } = req.body

    if (!name || !position || !major 
    || !email || !username || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    let userExists = ''
    // Check if user email exists
    const userEmailExists = await User.findOne({ email })

    if (userEmailExists) {
        userExists += 'This email is already registered as a user.'
    }

    // Check if username exists
    const usernameExists = await User.findOne({ username })

    if (usernameExists) {
        userExists += ' This username is already being used.'
    }

    // Handle userExists error
    if (userExists) {
        res.status(400)
        throw new Error(userExists)
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const user = await User.create({
        name, 
        position,
        major,
        email,
        username,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            position: user.position,
            major: user.major,
            email: user.email,
            username: user.username, 
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

// @desc Authenticate/login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            position: user.position,
            major: user.major,
            email: user.email,
            username: user.username, 
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

})

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    const {_id, name, position, major, email, username } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        position, 
        major, 
        email,
        username
    })
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}