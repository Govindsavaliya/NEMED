const ambulanceData = require("../model/ambulance.model");

exports.ambulanceInsert = async (req, res) => {
    try {
        const ambulanceDetails = new ambulanceData({
            driverName: req.body.driverName,
            driverNumber: req.body.driverNumber,
            driverAddress: req.body.driverAddress,
            driverAadharCard: req.body.driverAadharCard,
            driverLicenceNumber: req.body.driverLicenceNumber,
            driverAvailable: req.body.driverAvailable,
            ambulanceNumber:req.body.ambulanceNumber,
            yearOfField: req.body.yearOfField,
            email: req.body.email,
            password: req.body.password,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country
        });

        console.log("ambulanceDetails:::", ambulanceDetails);

        const saveAmbulanceData = await ambulanceDetails.save();

        res.status(201).json({
            message: "Ambulance Data Insert",
            status: 201,
            data: saveAmbulanceData
        });
    } catch (error) {
        console.log("ambulanceDetails--error", error);
        res.status(400).json(
            {
                message: "Ambulance Not Registered",
                status: 400
            }
        )
    }
};

exports.ambulanceViewById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await ambulanceData.find({ _id: id }).select('-__v');

        res.status(200).json({
            message: "View Ambulance By Id",
            status: 200,
            info: {
                id: data[0]._id,
                driverName: data[0].driverName,
                driverNumber: data[0].driverNumber,
                driverAddress: data[0].driverAddress,
                driverAadharCard: data[0].driverAadharCard,
                driverLicenceNumber: data[0].driverLicenceNumber,
                driverAvailable: data[0].driverAvailable,
                ambulanceNumber:data[0].ambulanceNumber,
                yearOfField: data[0].yearOfField,
                email: data[0].email,
                password: data[0].password,
                city: data[0].city,
                state: data[0].state,
                country: data[0].country
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong--ambulanceViewById",
            status: 500
        });
    }
};

exports.ambulanceViewAll = async (req, res) => {
    try {
       
        const data = await ambulanceData.find().select('-__v');

        res.status(200).json({
            message: "Get All Ambulance Data :)",
            status: 200,
            Total: data.length,
            data: data
        })
    } catch (error) {
        console.log("ambulanceViewAll:--error", error);
        res.status(500).json({
            message: "Somthing Went Wrong",
            status: 500
        })
    }
};


exports.ambulanceUpdate = async (req, res) => {
    try {
        let id = req.params.id;
        const data = await ambulanceData.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    driverName: req.body.driverName,
                    driverNumber: req.body.driverNumber,
                    driverAddress: req.body.driverAddress,
                    driverAadharCard: req.body.driverAadharCard,
                    driverLicenceNumber: req.body.driverLicenceNumber,
                    driverAvailable: req.body.driverAvailable,
                    ambulanceNumber:req.body.ambulanceNumber,
                    yearOfField: req.body.yearOfField,
                    email: req.body.email,
                    password: req.body.password,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country
                }
            }
        )
            .then(() => {
                res.status(200).json({
                    message: "Update Ambulance Successfully",
                    status: 200
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Update Ambulance Not Successfully",
                    status: 500
                })
                console.log("data::::", data);
            })


    } catch (error) {
        res.status(400).json({
            message: "Something Went Wrong",
            status: 400
        })
    }
};


exports.ambulanceDeleteById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await ambulanceData.find({ id: id });
        const del = ambulanceData.findByIdAndDelete(id);
        del.exec(function (err, data) {
            if (err) throw err;
            res.status(201).json({
                message: "Delete Ambulance Data",
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


exports.ambulanceLogin = async (req, res) => {
    try {
        
        const email = req.body.email;
        const pass = req.body.password;

        const data = await ambulanceData.findOne({ email: email });

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
                    message: "Ambulance Login Successfully",
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

exports.ambulanceLogout = async (req, res) => {
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


exports.emailverify = async (req, res) => {
    try {
        const email = req.body.email;
        const otp = req.body.otp
        const otp2 = 9999;

        const data = await ambulanceData.findOne({ email: email });

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

            const data = await ambulanceData.findByIdAndUpdate(
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