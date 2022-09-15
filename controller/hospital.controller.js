const hospitalData = require("../model/hospital.model");

exports.Insert = async (req, res) => {
    try {
        const hospitalDetails = new hospitalData({
            name: req.body.name,
            address: req.body.address,
            owenerName: req.body.owenerName,
            email: req.body.email,
            hospital_email: req.body.hospital_email,
            moblie_code: req.body.moblie_code,
            owener_moblie: req.body.owener_moblie,
            dial_code: req.body.dial_code,
            hospital_moblie: req.body.hospital_moblie,
            field_of_specialization: req.body.field_of_specialization,
            year: req.body.year,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            zipCode: req.body.zipCode
        })

        console.log("hospitalInsert::", hospitalDetails);

        const saveHospitalData = await hospitalDetails.save();


        res.status(201).json(
            {
                message: "Hospital Data Insert",
                status: 201,
                data: saveHospitalData
            }
        )
    } catch (error) {
        console.log("hospitalDetails--error:::", error);
        res.status(400).json(
            {
                message: "Somthing Went Wrong",
                status: 400
            }
        )
    }
};

exports.Update = async (req, res) => {
    try {
        let id = req.params.id
        const data = await hospitalData.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    name: req.body.name,
                    address: req.body.address,
                    owenerName: req.body.owenerName,
                    email: req.body.email,
                    hospital_email: req.body.hospital_email,
                    moblie_code: req.body.moblie_code,
                    dial_code: req.body.dial_code,
                    hospital_moblie: req.body.hospital_moblie,
                    field_of_specialization: req.body.field_of_specialization,
                    year: req.body.year,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                    zipCode: req.body.zipCode
                }
            }
        )
            .then(() => {
                res.status(200).json({
                    message: "Update Hospital Data Successfully",
                    status: 200
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Update Not Successfully Data",
                    status: 500
                })
            })
    } catch (error) {
        console.log("hospitalUpdate::::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
};

exports.ViewAll = async (req, res) => {
    try {
        // const { page = 1, limit = 10 } = req.query;
        const data = await hospitalData.find().select('-__v');

        res.status(201).json({
            message: "Get All Hospital Data",
            status: 201,
            Total: data.length,
            data: data
        })
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
        const data = await hospitalData.find({ _id: id }).select('-__v');

        res.status(200).json({
            message: "Hospital Data View By Id",
            status: 200,
            info: {
                id: data[0]._id,
                name: data[0].name,
                address: data[0].address,
                owenerName: data[0].owenerName,
                email: data[0].email,
                hospital_email: data[0].hospital_email,
                moblie_code: data[0].moblie_code,
                owener_moblie: data[0].owener_moblie,
                dial_code: data[0].dial_code,
                hospital_moblie: data[0].hospital_moblie,
                field_of_specialization: data[0].field_of_specialization,
                year: data[0].year,
                city: data[0].city,
                state: data[0].state,
                country: data[0].country,
                zipCode: [0].zipCode
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong---hospitalViewById",
            status: 500
        });
    }
};

exports.Delete = async (req, res) => {
    try {
        var id = req.params.id;
        var role = req.params.role
        var roll = "admin"

        if (role == roll) {
            const data = await hospitalData.find({ id: id });
            const del = hospitalData.findByIdAndDelete(id);

            del.exec(function (err, data) {
                if (err) throw err;

                res.status(201).json({
                    message: "Delete Hospital Data",
                    status: 201,
                    data: data
                });

            });
        } else {
            res.status(400).json({
                message: "Delete Hospital Data",
                status: 400,
                data: data
            });
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500,
        });
    }
}