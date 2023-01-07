const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Form = require('../models/Form');
const DietChart = require('../models/DietChart')

module.exports.patient = async (req, res) => {
    try {
        const patient = await Patient.findOne({ patientId: req.user.id });
        const forms = await Form.find({ patientId: req.user.id }).count();
        const diet_charts = await DietChart.find({ patientId: req.user.id }).count();

        return res.status(200).json({
            success: true,
            message: "data fetched susseccfully",
            data: {
                patient,
                forms,
                diet_charts
            }
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
};

module.exports.doctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.user.id);
        const patients = await Patient.find({doctors: req.user.id}).select("doctors");
        let primary_patients = 0;
        patients.map((p) => {
            if(p.doctors[0] == req.user.id) {
                primary_patients ++;
            }
        })

        const forms = await Form.find({ doctorId: req.user.id }).count();
        const diet_charts = await DietChart.find({ doctorId: req.user.id }).count();

        return res.status(200).json({
            success: true,
            message: "data fetched susseccfully",
            data: {
                doctor: doctor,
                total_patients: patients.length,
                primary_patients,
                secondary_patients: patients.length - primary_patients,
                forms,
                diet_charts
            }
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}