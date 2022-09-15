const mongoose= require("mongoose");
const jwt = require("jsonwebtoken");
const validatore = require("validator");
require("dotenv").config();

const patientSchema = mongoose.Schema({
    patientName:{
        type:String,
        required:true
    },
    patientNumber:{
        type:String,
        required:true
    },
    patientAddress:{
        type:String,
        required:true
    },
    patientAge:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate(value) {
            if (!validatore.isEmail(value)) {
                throw new Error("Invalide Email")
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    patientOccupation:{
        type:String,
        required:true
    },
    patientDeases:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ]
});


patientSchema.methods.generateauthtoken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log("error:", error);
    }
};

const Patient = new mongoose.model('Patient', patientSchema);
module.exports = Patient;