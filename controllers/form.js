const Form = require('../models/Form');

module.exports.addForm = async (req, res) => {
    try {

        const newForm  = new Form({
            doctorId: req.user.id,
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

        let forms = [];
        console.log(req.user.type)

        if(req.user.type == "doctor") {
            forms = await Form.find({doctorId: req.user.id});
        } else if(req.user.type == "admin") {
            forms = await Form.find();
        }

        return res.status(200).json({
            success: true,
            message: "Forms fetched successfully",
            data: forms
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

        const form  = await Form.findOne({_id: req.body.formId, patientId: req.user.patientId})

        if(form) {
            for (let i = 0; i < form.questions.length; i++) {
                if((form.questions[i].id == req.body.questionId) && !form.questions[i].answered) {
                    form.questions[i].answer = req.body.answer;
                    form.questions[i].answered = true;
                    break;
                }
                
            }
            await form.save();
    
            return res.status(200).json({
                success: true,
                message: "Form submitted successfully",
                data: form
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
};

module.exports.deactivate = async (req, res) => {
    try {

        const form = await Form.findById(req.params.id)
        if(!form) {
            return res.status(400).json({
                success: false,
                message: "no form found",
            })
        }

        form.status = "De-Active";

        await form.save()

        return res.status(200).json({
            success: true,
            message: "Form deactivated succesfully",
            data: form
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

module.exports.activate = async (req, res) => {
    try {

        const form = await Form.findById(req.params.id)
        if(!form) {
            return res.status(400).json({
                success: false,
                message: "no form found",
            })
        }

        form.status = "Active";

        await form.save()

        return res.status(200).json({
            success: true,
            message: "Form activated succesfully",
            data: form
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

// module.exports.getBypatient = async (req, res) => {
//     try {
//         const forms  = await Form.find({ doctorId: req.user.id,})
//         return res.status(200).json({
//             success: true,
//             message: "Forms fetched successfully",
//             data: forms
//         })
//     } catch (err) {
//         console.log(err.message)
//         return res.status(500).json({
//             success: false,
//             message: err.message,
//         })
//     }
// }