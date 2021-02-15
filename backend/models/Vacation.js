const mongoose = require("mongoose");

const VacationSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    price: {
      type: String,
      required: true
    },
    followers: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Vacation', VacationSchema);
