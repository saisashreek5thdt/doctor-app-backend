const mongoose = require('mongoose')

const Presc = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true
    },
    patientId: String,
    createdOn: Date,
    medicine_type: String,
    medicine_name: String,
    morning_dose: String,
    afternoon_dose: String,
    evening_dose: String,
    frequency: Number,
    duration: Number,
    duration_days: Number,
    special_inst: String
});

module.exports = mongoose.model('prescription', Presc)
