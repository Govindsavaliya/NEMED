const jwt = require("jsonwebtoken");
require("dotenv").config();
const doctorToken = require("../model/doctor.model");

const doctorSchema = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        })
    } catch (error) {
        res.status(401).send('Not Match Data');
    }
};

module.exports = doctorSchema;