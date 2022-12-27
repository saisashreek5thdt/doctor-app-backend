const Presc = require('../models/Presc');

const { getFormatDate } = require('../utils/common');

module.exports.add = async (req, res) => {
    try {
        const newPresc  = new Presc({
            doctorId: req.user.id,
            patientId: req.body.patientId,
            createdOn: getFormatDate(new Date),
            medicine_type: req.body.medicine_type,
            medicine_name: req.body.medicine_name,
            morning_dose: req.body.morning_dose,
            afternoon_dose: req.body.afternoon_dose,
            evening_dose: req.body.evening_dose,
            frequency: req.body.frequency,
            duration: req.body.duration,
            duration_days: req.body.duration_days,
            special_inst: req.body.special_inst
        });

        await newPresc.save();

        return res.status(200).json({
            success: true,
            message: "Prescription created successfully",
            data: newPresc
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
            message: "Prescriptions fetched successfully",
            data: await Presc.find()
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}