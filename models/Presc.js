const mongoose = require('mongoose')

const Presc = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor"
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient"
    },
    createdOn: Date,
    medicine_type: String,
    medicine_name: String,
    morning_dose: String,
    afternoon_dose: String,
    evening_dose: String,
    frequency: String,
    duration: String,
    duration_days: Number,
    special_inst: String
});

module.exports = mongoose.model('prescription', Presc)
