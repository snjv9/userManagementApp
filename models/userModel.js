const mongoose = require('mongoose')
const { phone } = require('phone')
const validator = require('validator')
const { Schema } = mongoose
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validator: [validator.isEmail, 'invalid Email'],
        required: true
    },
    phoneNumber: {
        type: String,
        minLength: 10,
        maxlength: 10,
        validator: {
            validate: function (num) {
                const temp = phone(num, { country: 'IN' })
                return temp.isValid
            },
            message: "Please Check Phone Number"
        },
        required: true
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
        select: false
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now(),
        select: false
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;

