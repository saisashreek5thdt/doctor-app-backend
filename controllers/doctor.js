const Doctor = require('../models/Doctor')

const { getFormatDate } = require('../utils/common');

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
            createdOn: getFormatDate(new Date),
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
};

module.exports.getAll = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Doctors fetched successfully",
            data: await Doctor.find()
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

module.exports.edit = async (req, res) => {
    try {

        const doctor = await Doctor.findById(req.params.id)
        if(!doctor) {
            return res.status(400).json({
                success: false,
                message: "no doctor found",
            })
        }

        doctor.name =  req.body.name,
        doctor.role = req.body.role,
        doctor.email = req.body.email,
        doctor.phone = req.body.phone,
        doctor.registration_no = req.body.registration_no

        await doctor.save()

        return res.status(200).json({
            success: true,
            message: "Doctor updated succesfully",
            data: doctor
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
};

module.exports.deactivate = async (req, res) => {
    try {

        const doctor = await Doctor.findById(req.params.id)
        if(!doctor) {
            return res.status(400).json({
                success: false,
                message: "no doctor found",
            })
        }

        doctor.status = "De-Active";

        await doctor.save()

        return res.status(200).json({
            success: true,
            message: "Doctor deactivated succesfully",
            data: doctor
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

        const doctor = await Doctor.findById(req.params.id)
        if(!doctor) {
            return res.status(400).json({
                success: false,
                message: "no doctor found",
            })
        }

        doctor.status = "Active";

        await doctor.save()

        return res.status(200).json({
            success: true,
            message: "Doctor activated succesfully",
            data: doctor
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}