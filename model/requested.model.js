const mongoose = require("mongoose");
const validatore = require("validator");

const reqSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        validate(value) {
            if (!validatore.isEmail(value)) {
                throw new Error("Invalide Email")
            }
        }
    },
    dial_code:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    field:{
        type:String,
        required:true
    },
    approved:{
        type : Number
    }
});

const requested = new mongoose.model("Requested",reqSchema);
module.exports = requested;