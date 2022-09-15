const mongoose = require("mongoose");
const validatore = require("validator");

const hospitalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    owenerName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validatore.isEmail(value)) {
                throw new Error("Invalide Email")
            }
        }
    },
    moblie_code: {
        type: String,
        required: true
    },
    owener_moblie: {
        type: String,
        required: true
    },
    dial_code: {
        type: String,
        required: true
    },
    hospital_moblie: {
        type: String,
        required: true
    },
    field_of_specialization: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true,
        maxLength:4
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true,
        minLength:4
    }
});

const Hospital = new mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;