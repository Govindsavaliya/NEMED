const mongoose = require("mongoose");
const validatore = require("validator");

const hospitalApproved = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true,
        maxLength:4
    },
    approved:{
        type:Number
    }
})

const hospitalApprove = new mongoose.model('hospitalApproved', hospitalApproved);
module.exports = hospitalApprove;