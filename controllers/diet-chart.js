const DietChart = require('../models/DietChart')

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

// module.exports.getBypatient = async (req, res) => {
//     try {
//         const dietCharts  = await DietChart.find({ doctorId: req.user.id, patientId: req.params.id})
//         return res.status(200).json({
//             success: true,
//             message: "diet charts fetched successfully",
//             data: dietCharts
//         })
//     } catch (err) {
//         console.log(err.message)
//         return res.status(500).json({
//             success: false,
//             message: err.message,
//         })
//     }
// }