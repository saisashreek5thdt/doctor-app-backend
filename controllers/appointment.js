const Appointment = require('../models/Appointment');

const { getFormatDate } = require('../utils/common');

module.exports.create = async (req, res) => {
    try {
        const newData = new Appointment({
            patientId: req.user.id,
            doctorId: req.body.doctorId,
            date: getFormatDate(req.body.date),
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
            data: await Appointment.find().populate([{path:'doctorId',select: ['name', 'email'] },{ path: 'patientId', select: ['name', 'email']}])
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

module.exports.getWithDate = async (req, res) => {
    try {

        const appoints = await Appointment.find({doctorId: req.user.id, date: getFormatDate(req.params.date)}).count()

        return res.status(200).json({
            success: true,
            message: "Appointments fetched successfully",
            data: appoints
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}