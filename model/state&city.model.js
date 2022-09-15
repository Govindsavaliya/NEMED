const mongoose = require("mongoose");

const countrySchema = mongoose.Schema({
    city: {
        type: String
    },
    state: {
        type: String
    }
});

const stateCity = new mongoose.model('StartCity', countrySchema);

module.exports = stateCity;