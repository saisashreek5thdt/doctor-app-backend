const mongoose = require('mongoose')

const FormSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true
    },
    patientId: String,
    question_title: String,
    questions: [
        {
            type: {
                type: String,
            },
            question: {
                type: String,
            },
            choise1: {
                type: String,
            },
            choise2: {
                type: String,
            },
            choise3: {
                type: String,
            },
            choise4: {
                type: String,
            }
        }
    ]
})

module.exports = mongoose.model('form', FormSchema)
