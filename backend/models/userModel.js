const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    position: {
        type: String,
        required: [true, 'Please add a position']
    },
    major: {
        type: String,
        required: [true, 'Please add a major']
    },
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)