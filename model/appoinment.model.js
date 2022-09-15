const mongoose = require("mongoose");
const validatore = require("validator");

const appointmentSchema = mongoose.Schema({
    patientName:{
        type: String,
        required: true
    },
    doctorName:{
        type: String,
        required: true
    },
    patientAddress:{
        type: String,
        required: true
    },
    patientNumber:{
        type: String,
        required: true
    },
    patientEmail:{
        type: String,
        required: true,
        validate(value) {
            if (!validatore.isEmail(value)) {
                throw new Error("Invalide Email")
            }
        }
    },
    doctorNumber:{
        type: String
    },
    deases:{
        type: String,
        required: true
    },
    ambulance:{
        //0. not av. 1.av
        type: Number,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    book:{
        type: Number,
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
    }
});

const Appointment = new mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;