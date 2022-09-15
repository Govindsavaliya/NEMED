const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validatore = require("validator");
require("dotenv").config();

const ambulanceSchema = mongoose.Schema({
    driverName: {
        type: String,
        required: true
    },
    driverNumber: {
        type: String,
        required: true
    },
    driverAddress: {
        type: String,
        required: true
    },
    driverAadharCard: {
        type: String,
        required: true
    },
    driverLicenceNumber: {
        type: String,
        required: true
    },
    driverAvailable: {
        // 0.inavailable,1.available
        type: Number,
        required: true
    },
    ambulanceNumber: {
        type: String,
        required: true
    },
    yearOfField: {
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
    password: {
        type: String,
        required: true
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
    tokens: [
        {
            token: {
                type: String
            }
        }
    ]
});

ambulanceSchema.methods.generateauthtoken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log("error:", error);
    }
};


const Ambulance = new mongoose.model('Ambulance', ambulanceSchema);
module.exports = Ambulance;