const reqData = require("../model/requested.model");

exports.insert = async (req, res) => {
    try {
        const reqDetails = new reqData({
            email: req.body.email,
            dial_code: req.body.dial_code,
            number: req.body.number,
            field: req.body.field,
            approved: 0
        })

        console.log("reqDetails:::", reqDetails);

        const saveReqData = await reqDetails.save();

        res.status(201).json(
            {
                message: "Requested Insert",
                status: 201,
                data: saveReqData
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
}


exports.viewAll = async (req, res) => {
    try {
        var role = req.params.role
        var roll = "admin"

        if (role == roll) {
            const data = await reqData.find().select('-__v');

            res.status(201).json({
                message: "Get All  Request Data",
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
        console.log("ViewAll:-", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
};