const DietChart = require('../models/DietChart')
const Patient = require('../models/Patient');

module.exports.addDietChart = async (req, res) => {
    try {

        const newDiet  = new DietChart({
            doctorId: req.user.id,
            calorie_lower: req.body.calorie_lower,
            calorie_upper: req.body.calorie_upper,
            ch_lower: req.body.ch_lower,
            ch_upper: req.body.ch_upper,
            protiens: req.body.protiens,
            fats: req.body.fats,
            food_type: req.body.food,
            cuisine_type: req.body.cuisine_type,
            file: "sample link"
        })

        await newDiet.save()

        return res.status(200).json({
            success: true,
            message: "Diet chart created successfully",
            data: newDiet
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
};

module.exports.getLatest = async (req, res) => {
    try {
        const patient = await Patient.findOne({patientId: req.user.id })
        const diets  = await DietChart.findOne({doctorId: {$in: patient.doctors }}).sort({"_id": -1});
        return res.status(200).json({
            success: true,
            message: "diet charts fetched successfully",
            data: diets
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

module.exports.getAll = async (req, res) => {
    try {

        let diets = [];

        if(req.user.type == "doctor") {
            diets = await DietChart.find({doctorId: req.user.id});
        } else if(req.user.type == "patient") {
            diets  = await DietChart.findOne({doctorId: {$in: req.user.doctors }});
        } else if(req.user.type == "admin") {
            diets = await DietChart.find();
        }

        return res.status(200).json({
            success: true,
            message: "diet charts fetched successfully",
            data: diets
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

module.exports.deactivate = async (req, res) => {
    try {

        const diet = await DietChart.findById(req.params.id)
        if(!diet) {
            return res.status(400).json({
                success: false,
                message: "no diet chart found",
            })
        }

        diet.status = "De-Active";

        await diet.save()

        return res.status(200).json({
            success: true,
            message: "Diet chart deactivated succesfully",
            data: diet
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

        const diet = await DietChart.findById(req.params.id)
        if(!diet) {
            return res.status(400).json({
                success: false,
                message: "no diet chart found",
            })
        }

        diet.status = "Active";

        await diet.save()

        return res.status(200).json({
            success: true,
            message: "Diet chart activated succesfully",
            data: diet
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}