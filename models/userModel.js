const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    cart: {
        type: Array,
        default: []
    },
    role:{
        type : Number,
        default : 0
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("Users", userSchema);