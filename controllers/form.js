const Form = require('../models/Form');
const FormResponse = require('../models/FormResponse');

module.exports.addForm = async (req, res) => {
    try {

        const newForm  = new Form({
            doctorId: req.user.id,
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
};

module.exports.getAll = async (req, res) => {
    try {

        return res.status(200).json({
            success: true,
            message: "Forms fetched successfully",
            data: await Form.find()
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

module.exports.submitForm = async (req, res) => {
    try {

        const form  = await Form.findOne({_id: req.body.formId, patientId: req.user.id})

        if(form) {
            const newFormResponse  = new FormResponse({
                doctorId: form.doctorId,
                patientId: req.user.id,
                formId: req.body.formId,
                question: req.body.question,
                answer: req.body.answer
            })

            await newFormResponse.save();
    
            return res.status(200).json({
                success: true,
                message: "Form submitted successfully",
                data: newFormResponse
            })
        } else {
            return res.status(400).json({
                success: true,
                message: "Form not found",
            })
        }
        
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}