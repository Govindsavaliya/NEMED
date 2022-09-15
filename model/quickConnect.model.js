const mongoose = require("mongoose");
const validatore = require("validator");

const qkConnectSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
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
    mobile:{
        type: String,
        required: true
    },
    whoYouAre:{
        type: String,
        required: true
    },
    whatYouWant:{
        type: String
    },
    zipCode:{
        type: String,
        required: true,
        minLength:4
    },
    approved:{
        type : Number
    }
})

const qkConnect = new mongoose.model('Quick-Connect', qkConnectSchema);
module.exports = qkConnect;