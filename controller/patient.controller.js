const patientdata = require("../model/patient.model");

exports.patientRegistration = async (req, res) => {
    try {
        const patientDetails = new patientdata({
            patientName: req.body.patientName,
            patientNumber: req.body.patientNumber,
            patientAddress: req.body.patientAddress,
            patientAge :req.body.patientAge,
            email: req.body.email,
            password: req.body.password,
            patientOccupation: req.body.patientOccupation,
            patientDeases: req.body.patientDeases,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country
        });

        console.log("patientDetails:::", patientDetails);

        const savePatientData = await patientDetails.save();

        res.status(201).json(
            {
                message: "Patient Registered",
                status: 201,
                data: savePatientData
            }
        )
    } catch (error) {
        console.log("doctorDetails--error:::", error);
        res.status(400).json(
            {
                message: "Patient Not Registered",
                status: 400
            }
        )
    }
};

exports.patientLogin = async (req, res) => {
    try {
        
        const email = req.body.email;
        const pass = req.body.password;

        const data = await patientdata.findOne({ email: email });

        const token = await data.generateauthtoken();
        console.log("token:::", token);
  

        if (!data) {
            res.status(404).json(
                {
                    message: "Data Not Exists.",
                    status: 404
                }
            )
        } else {
            if(pass == data.password) {
                res.status(200).json({
                    message: "Patient Login Successfully",
                    status: 200,
                    data: data.id,
                    token: token
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

exports.patientLogout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((curelement) => {
            return curelement.token !== req.token;
        })
        res.clearCookie("jwt");
        await req.user.save();
        res.status(200).json({
            message: "Logout Successfully",
            status: 201
        })
    } catch (error) {
        res.status(401).json({
            message: "Please Try Again..",
            status: 401
        });
    }
};

exports.patientViewById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await patientdata.find({ _id: id }).select('-__v');

        res.status(200).json({
            message: "View Patient By Id",
            status: 200,
            info: {
                id: data[0]._id,
                patientName: data[0].patientName,
                patientNumber: data[0].patientNumber,
                patientAddress: data[0].patientAddress,
                patientAge:data[0].patientAge,
                email: data[0].email,
                password: data[0].password,
                patientOccupation: data[0].patientOccupation,
                patientDeases: data[0].patientDeases,
                city: data[0].city,
                state: data[0].state,
                country: data[0].country
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong----patientVieById",
            status: 500
        });
    }
};

exports.patientViewAll = async (req, res) => {
    try {
        // const { page = 1, limit = 10 } = req.query;
        const data = await patientdata.find().select('-__v');

        res.status(201).json({
            message: "Get All Apartment Data",
            status: 201,
            Total: data.length,
            data: data
        })
    } catch (error) {
        console.log("All User:-", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
};

exports.patientUpdate = async (req, res) => {
    try {
        let id = req.params.id;
        const data = await patientdata.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                patientName: req.body.patientName,
                patientNumber: req.body.patientNumber,
                patientAddress: req.body.patientAddress,
                patientAge :req.body.patientAge,
                email: req.body.email,
                password: req.body.password,
                patientOccupation: req.body.patientOccupation,
                patientDeases: req.body.patientDeases,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country
            }
        )
            .then(() => {
                res.status(200).json({
                    message: "Update Patient Successfully",
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

exports.patientByPatientDeases = async (req, res) => {
    try {
        var patientDeases = req.body.patientDeases;
        const data = await patientdata.find({ patientDeases: patientDeases });

        res.status(200).json({
            message: "View Doctor Data By patientDeases",
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

exports.patientByCity = async (req, res) => {
    try {
        var city = req.body.city;
        const data = await patientdata.find({ city: city });

        res.status(200).json({
            message: "View Patient Data By city",
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

exports.patientDeleteById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await patientdata.find({ id: id });
        const del = patientdata.findByIdAndDelete(id);
        del.exec(function (err, data) {
            if (err) throw err;
            res.status(201).json({
                message: "Delete Patient Data",
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

exports.emailverify = async (req, res) => {
    try {
        const email = req.body.email;
        const otp = req.body.otp
        const otp2 = 9999;

        const data = await patientdata.findOne({ email: email });

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

            const data = await patientdata.findByIdAndUpdate(
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