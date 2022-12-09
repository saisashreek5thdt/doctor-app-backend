const Doctor = require('../models/Doctor')

module.exports.addDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({email: req.body.email});
        if(doctor) {
            return res.status(400).json({
                success: false,
                message: "A Doctor is already exist with given email Id",
            })
        }
        const newDoctor = new Doctor({
            ...req.body
        });

        await newDoctor.save();

        return res.status(200).json({
            success: true,
            message: "Doctor added successfully",
            data: newDoctor
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}