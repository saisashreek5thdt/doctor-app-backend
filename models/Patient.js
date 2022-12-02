const mongoose = require('mongoose')

const Patient = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true
    },
    patientId: {
        type: String,
    },
    logo: {
        type: String,
    },
    phone: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    caretakers_name: {
        type: String
    },
    caretakers_relation: {
        type: String
    },
    caretakers_phone: {
        type: Number
    },
    caretakers_time: {
        type: String
    },
    health_plan: {
        type: String
    },
    health_plan_date: {
        type: Date
    },
    team: {
        type: String
    },
    amount: {
        type: Number
    },
    payment_mode: {
        type: String
    },
    payment_date: {
        type: Date
    },
    ref_id: {
        type: String
    },
    next_payment_date: {
        type: Date
    },
    otp: String,
    otpExpiresIn: String
})

module.exports = mongoose.model('patient', Patient)
