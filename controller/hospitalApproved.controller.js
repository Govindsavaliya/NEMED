const hospitalApprovedData = require("../model/hospitalApproved.model");

exports.Insert = async (req, res) => {
    try {
        const hospitalApprovedDetails = new hospitalApprovedData({
            email: req.body.email,
            number: req.body.number,
            year: req.body.year,
        })

        console.log("hospitalInsert::", hospitalApprovedDetails);

        const saveHospitalApprovedData = await hospitalApprovedDetails.save();


        res.status(201).json(
            {
                message: "Approve Hospital Data Request",
                status: 201,
                data: saveHospitalApprovedData
            }
        )
    } catch (error) {
        console.log("Insert--error:::", error);
        res.status(400).json(
            {
                message: "Somthing Went Wrong",
                status: 400
            }
        )
    }
};


exports.ViewAll = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        var role = req.params.role
        var roll = "admin"


        if (role == roll) {
            const data = await hospitalApprovedData.find().limit(limit * 1).skip((page - 1) * limit).select('-__v');

            res.status(201).json({
                message: "Get All Approve Hospital Request Data",
                status: 201,
                Total: data.length,
                data: data
            })
        } else {
            res.status(400).json({
                message: "Something Went Wrong",
                status: 400
            });
        }


    } catch (error) {
        console.log("hospitalViewAll:-", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
};

exports.ViewById = async (req, res) => {
    try {
        var id = req.params.id;
        var role = req.params.role
        var roll = "admin"

        if (role == roll) {
            const data = await hospitalApprovedData.find({ _id: id }).select('-__v');

            res.status(200).json({
                message: "Approve Hospital Data View By Id Request",
                status: 200,
                info: {
                    id: data[0]._id,
                    email: data[0].email,
                    number: data[0].number,
                    year: data[0].year
                }
            })
        } else {
            res.status(400).json({
                message: "Something Went Wrong",
                status: 400
            });
        }

    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong---ViewById",
            status: 500
        });
    }
};

exports.Update = async (req, res) => {
    try {
        let id = req.params.id
        var role = req.params.role
        var roll = "admin"

        if (role == roll) {
            const data = await hospitalApprovedData.findByIdAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $set: {
                        approved: 1
                    }
                }
            )
                .then(() => {
                    res.status(200).json({
                        message: "Approved Hospital Data Successfully",
                        status: 200
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Approved Not Successfully Data",
                        status: 500
                    })
                })
        } else {
            res.status(400).json({
                message: "Something Went Wrong",
                status: 400
            });
        }


    } catch (error) {
        console.log("Approved::::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
};


exports.hospitalApproved = async (req, res) => {
    try {
        var role = req.params.role
        var roll = "admin"


        if (role == roll) {
            const approvedData = await hospitalApprovedData.find({ approved: 1 })

            res.status(201).json(
                {
                    message: "Hospital Approved",
                    status: 201,
                    Total: approvedData.length,
                    data: approvedData
                }
            )
        } else {
            res.status(400).json({
                message: "Something Went Wrong",
                status: 400
            });
        }


    } catch (error) {
        console.log("error:::", error);
        res.status(400).json(
            {
                message: "Something went wrong",
                status: 400
            }
        )
    }
};