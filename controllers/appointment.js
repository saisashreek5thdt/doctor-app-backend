const Appointment = require('../models/Appointment')

module.exports.create = async (req, res) => {
    try {
        //console.log(req.body)
        const newData = new Appointment({
            patientId: "ramesh",
            doctorId: req.body.doctorId,
            date: req.body.date,
        });

        await newData.save()

        return res.status(200).json({
            success: true,
            message: "Appointment created successfully",
            data: newData
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

        return res.status(200).json({
            success: true,
            message: "Appointments fetched successfully",
            data: await Appointment.find()
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}