const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    u_name: {
        type: String,
        required: [true, "Please Enter Name!"],
    },
    u_email: {
        type: String,
        required: [true, "Please Enter Email!"],
        unique: [true, "Email already exists!"],
    },
    u_password: {
        type: String,
        required: [true, "Please Enter Password!"],
    },
})

module.exports = mongoose.model('User', userSchema, 'User');