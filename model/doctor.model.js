const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validatore = require("validator");
require("dotenv").config();

const doctorSchema = mongoose.Schema({
    doctorName: {
        type: String,
        required: true
    },
    doctorAddress: {
        type: String
    },
    phone: {
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
    qualification: {
        type: String,
        required: true
    },
    collage: {
        type: String
    },
    yearOfField: {
        type: String
    },
    hospitalName: {
        type: String
    },
    speacilization: {
        type: String,
        required: true
    },
    zipCode:{
        type:String,
        // required:true
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    // __v: {
    //     type: Number,
    //     select: false
    // },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ]
});

doctorSchema.methods.generateauthtoken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log("error:", error);
    }
};



const Doctor = new mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
