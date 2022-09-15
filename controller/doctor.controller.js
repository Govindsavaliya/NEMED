const doctorData = require("../model/doctor.model");
const appoinmentData = require("../model/appoinment.model");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.doctorRegistration = async (req, res) => {
    try {
        const doctorDetails = new doctorData({
            doctorName: req.body.doctorName,
            doctorAddress: req.body.doctorAddress,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            qualification: req.body.qualification,
            collage: req.body.collage,
            yearOfField: req.body.yearOfField,
            hospitalName: req.body.hospitalName,
            speacilization: req.body.speacilization,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            zipCode: req.body.zipCode
        });

        console.log("doctorDetails:::", doctorDetails);

        const saveDoctoreData = await doctorDetails.save();

        res.status(201).json(
            {
                message: "Doctor Registered",
                status: 201,
                data: saveDoctoreData
            }
        )
    } catch (error) {
        console.log("doctorDetails--error:::", error);
        res.status(400).json(
            {
                message: "Doctor Not Registered",
                status: 400
            }
        )
    }
};

exports.doctorLogin = async (req, res) => {
    try {

        const email = req.body.email;
        const pass = req.body.password;

        const data = await doctorData.findOne({ email: email });

        const accessToken = await data.generateauthtoken();
        console.log("accessToken:::", accessToken);

        if (!data) {
            res.status(404).json(
                {
                    message: "Data Not Exists.",
                    status: 404
                }
            )
        } else {
            if (pass == data.password) {
                res.status(200).json({
                    message: "DoctorLogin Successfully",
                    status: 200,
                    data: data.id,
                    accessToken: accessToken
                })
            } else {
                res.status(401).json({
                    message: "password incorrect",
                    status: 401
                })
            }
        }
    } catch (error) {
        console.log("error:::::::::", error);
        res.status(400).json(
            {
                message: "Something went wrong",
                status: 400
            }
        )
    }
};

exports.doctorLogout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((curelement) => {
            return curelement.token !== req.token;
        })
        // res.clearCookie("jwt");
        await req.user.save();
        res.status(201).json({
            message: "Logout Successfully",
            status: 201
        })
    } catch (error) {
        res.status(401).json({
            message: "Please Try Again..",
            status: 401,

        });
    }
};

exports.doctorViewById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await doctorData.find({ _id: id }).select('-__v');

        res.status(200).json({
            message: "View Doctor By Id",
            status: 200,
            info: {
                id: data[0]._id,
                doctorName: data[0].doctorName,
                doctorAddress: data[0].doctorAddress,
                phone: data[0].phone,
                email: data[0].email,
                password: data[0].password,
                qualification: data[0].qualification,
                collage: data[0].collage,
                yearOfField: data[0].yearOfField,
                hospitalName: data[0].hospitalName,
                speacilization: data[0].speacilization,
                city: data[0].city,
                state: data[0].state,
                country: data[0].country,
                zipCode: data[0].zipCode
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong---doctorViewById",
            status: 500
        });
    }
};

exports.doctorViewAll = async (req, res) => {
    try {
        
        const data = await doctorData.find().select('-__v');

        res.status(201).json({
            message: "Get All doctor Data",
            status: 201,
            Total: data.length, 
            data: data
        })
    } catch (error) {
        console.log("doctorViewAll:-", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
};


exports.doctorUpdate = async (req, res) => {
    try {
        let id = req.params.id;
        const data = await doctorData.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    doctorName: req.body.doctorName,
                    doctorAddress: req.body.doctorAddress,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: req.body.password,
                    qualification: req.body.qualification,
                    collage: req.body.collage,
                    yearOfField: req.body.yearOfField,
                    hospitalName: req.body.hospitalName,
                    speacilization: req.body.speacilization,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                    zipCode: req.body.zipCode
                }
            }
        )
            .then(() => {
                res.status(200).json({
                    message: "Update Successfully",
                    status: 200
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Update Not Successfully",
                    status: 500
                })
            })
    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
};

exports.doctorByspecialization = async (req, res) => {
    try {
        var speacilization = req.body.speacilization;
        const data = await doctorData.find({ speacilization: speacilization }).select('-__v');

        res.status(200).json({
            message: "View Doctor Data By speacilization",
            status: 200,
            Total: data.length,
            data: data
        })

    } catch (error) {
        console.log("error:", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};

exports.doctorByCity = async (req, res) => {
    try {
        var city = req.body.city;
        const data = await doctorData.find({ city: city }).select('-__v');

        res.status(200).json({
            message: "View Doctor Data By city",
            status: 200,
            Total: data.length,
            info: data
        })

    } catch (error) {
        console.log("error:", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};

exports.doctorDeleteById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await doctorData.find({ id: id });
        const del = doctorData.findByIdAndDelete(id);
        del.exec(function (err, data) {
            if (err) throw err;
            res.status(201).json({
                message: "Delete Doctor Data",
                status: 201,
                data: data
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500,
        });
    }
};

exports.appoinmentByDoctor = async (req, res) => {
    try {
        var doctorName = req.body.doctorName
        const data = await appoinmentData.find({ doctorName: doctorName });

        console.log("data::", data);

        res.status(200).json({
            message: "View Appoinment By Doctor",
            status: 200,
            info: data
        })
    } catch (error) {
        console.log("error:", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};

exports.emailverify = async (req, res) => {
    try {
        const email = req.body.email;
        const otp = req.body.otp
        const otp2 = 9999;

        const data = await doctorData.findOne({ email: email });

        if (!data) {
            res.status(500).json({
                message: "Email Id Is Not Exist..",
                status: 500
            })
        } else {
            if (otp == otp2) {
                res.status(200).json({
                    message: "OTP Confirm",
                    status: 200,
                    data: data.id
                })
            } else {
                res.status(400).json({
                    message: "OTP Is Invaild",
                    status: 400
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Email Id IS Not Exist",
            status: 500
        })
    }
};

exports.changePassword = async (req, res) => {
    try {
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if (password == confirmPassword) {
            let id = req.params.id

            const data = await doctorData.findByIdAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $set: {
                        password: req.body.password
                    }
                }
            )
                .then(() => {
                    res.status(200).json(
                        {
                            message: "Update Password Successfully",
                            status: 200
                        }
                    )
                })
                .catch((err) => {
                    console.log("error:", err);
                    res.status(500).json({
                        message: "Something Wrong",
                        status: 500
                    })
                })
        } else {
            res.status(400).json({
                message: "Password And ConfirmPassword Is Not Match",
                status: 400
            })
        }

    } catch (error) {
        console.log("error:::::", error);
        res.status(500).json({
            message: "Something Went wrong",
            status: 500
        })
    }
}