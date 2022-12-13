const mongoose = require('mongoose')

const FormResponseSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true
    },
    patientId: String,
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "form"
    },
    question: {
        type: String,
        required: true
    },
    answer: [{
        type: String,
        required: true
    }]
})

module.exports = mongoose.model('form-response', FormResponseSchema)
