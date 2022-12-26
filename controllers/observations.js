const Patient = require('../models/Patient');

module.exports.add = async (req, res) => {
    try {
        console.log(req.body);
        const patient = await Patient.findById(req.params.id);
        if(!patient) {
            return res.status(400).json({
                success: false,
                message: "no patient found",
            })
        }
        patient.observations.push(req.body);
        await patient.save();

        return res.status(200).json({
            success: true,
            message: "Observations added successfully",
            data: patient
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }

};

module.exports.getAll = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if(!patient) {
            return res.status(400).json({
                success: false,
                message: "no patient found",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Observations added successfully",
            data: patient.observations
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

