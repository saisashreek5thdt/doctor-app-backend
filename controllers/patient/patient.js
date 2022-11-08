const Patient = require('../../models/Patient')

module.exports.addPatient = async (req, res) => {
   
    try {
        const patient = await Patient.findOne({email: req.body.email});
        if(patient) {
            return res.status(400).json({
                success: false,
                message: "A patient is already exist with given email Id",
            })
        }
        const newPatient = new Patient({
            doctorId: "dinesh",
            ...req.body
        });

        await newPatient.save();

        return res.status(200).json({
            success: true,
            message: "Patient added successfully",
            data: newPatient
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
};

module.exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find({doctorId: "dinesh"});
        return res.status(200).json({
            success: true,
            message: "Successfully got all patients",
            data: patients
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
};

module.exports.getPatient = async (req, res) => {
    try {
        const patient = await Patient.findOne({doctorId: "dinesh", _id: req.params.id});
        return res.status(200).json({
            success: true,
            message: "Successfully got the patient",
            data: patient
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

