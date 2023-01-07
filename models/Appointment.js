const mongoose = require('mongoose')

const Appointment = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor"
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient"
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('appointment', Appointment)
