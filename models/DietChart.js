const mongoose = require('mongoose')

const DietChart = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true
    },
    calorie_lower: Number,
    calorie_upper: Number,
    ch_lower: Number,
    ch_upper: Number,
    protiens: String,
    fats: String,
    food_type: String,
    cuisine_type: String,
    file: String
})

module.exports = mongoose.model('diet-chart', DietChart)
