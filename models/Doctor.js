const mongoose = require('mongoose')

const Doctor = new mongoose.Schema({
    name: String,
    role: String,
    email: String,
    phone: Number,
    registration_no: String,
    avatar: String
})

module.exports = mongoose.model('doctor', Doctor)
