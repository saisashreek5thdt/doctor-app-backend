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
        let presc = []

        if(req.user.type == "patient") {
            presc = await Presc.find({ patientId: req.user.id });
        } else if(req.user.type == "doctor") {
            presc = await Presc.find({doctorId: req.user.id});
        } else {
            presc = await Presc.find();
        }
        return res.status(200).json({
            success: true,
            message: "Prescriptions fetched successfully",
            data: presc
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
};

module.exports.getBypatient = async (req, res) => {
    try {
        const prescs  = await Presc.find({ doctorId: req.user.id, patientId: req.params.id})
        return res.status(200).json({
            success: true,
            message: "Prescriptions fetched successfully",
            data: prescs
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
};

module.exports.getLatest = async (req, res) => {
    try {
        const prescs  = await Presc.findOne({patientId: req.user.id}).sort({"_id": -1});
        return res.status(200).json({
            success: true,
            message: "Prescriptions fetched successfully",
            data: prescs
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}