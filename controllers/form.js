const Form = require('../models/Form')

module.exports.addForm = async (req, res) => {
    try {

        const newForm  = new Form({
            doctorId: "dinesh",
            patientId: req.body.patientId,
            question_title: req.body.question_title,
            questions: req.body.questions
        })

        await newForm.save()

        return res.status(200).json({
            success: true,
            message: "Form created successfully",
            data: newForm
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}