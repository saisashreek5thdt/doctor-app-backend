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
            },
            answered: {
                type: Boolean,
                default: false 
            },
            answer: [{
                type: String,
                required: true
            }]
        },
    ],
    status: {
        type: String,
        default: "Active" //De-Active
    },
})

module.exports = mongoose.model('form', FormSchema)
