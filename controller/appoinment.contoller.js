const appoinmentData = require("../model/appoinment.model");
const ambulanceData = require("../model/ambulance.model");

exports.appoinmentInsert = async (req, res) => {
    try {
        const appoinmentDetails = new appoinmentData({
            patientName: req.body.patientName,
            doctorName: req.body.doctorName,
            patientAddress: req.body.patientAddress,
            patientNumber: req.body.patientNumber,
            patientEmail: req.body.patientEmail,
            doctorNumber: req.body.doctorNumber,
            deases: req.body.deases,
            ambulance: req.body.ambulance,
            date: req.body.date,
            book: req.body.book,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country
        });

        console.log("appoinmentDetails:::", appoinmentDetails);

        const saveAppoinmentData = await appoinmentDetails.save();

        res.status(201).json({
            message: "Appoinment Data Insert",
            status: 201,
            data: saveAppoinmentData
        });
    } catch (error) {
        console.log("appoinmentDetails--error", error);
        res.status(400).json(
            {
                message: "Appoinment Not Registered",
                status: 400
            }
        )
    }
};

exports.appoinmentViewById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await appoinmentData.find({ _id: id }).select('-__v');

        res.status(200).json({
            message: "View Appoinment By Id",
            status: 200,
            info: {
                id: data[0]._id,
                patientName: data[0].patientName,
                doctorName: data[0].doctorName,
                patientAddress: data[0].patientAddress,
                patientNumber: data[0].patientNumber,
                patientEmail: data[0].patientEmail,
                doctorNumber: data[0].doctorNumber,
                deases: data[0].deases,
                ambulance: data[0].ambulance,
                date: data[0].date,
                city: data[0].city,
                state: data[0].state,
                country: data[0].country
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong----appoinmentViewById",
            status: 500
        });
    }
};

exports.appoinmentViewAll = async (req, res) => {
    try {
        const data = await appoinmentData.find().select('-__v');

        res.status(200).json({
            message: "Get All Appoinment Data :)",
            status: 200,
            Total: data.length,
            data: data
        })
    } catch (error) {
        console.log("appoinmentViewAll:--error", error);
        res.status(500).json({
            message: "Somthing Went Wrong",
            status: 500
        })
    }
};

exports.appoinmentUpdate = async (req, res) => {
    try {
        let id = req.params.id;
        const data = await appoinmentData.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    patientName: req.body.patientName,
                    doctorName: req.body.doctorName,
                    patientAddress: req.body.patientAddress,
                    patientNumber: req.body.patientNumber,
                    patientEmail: req.body.patientEmail,
                    doctorNumber: req.body.doctorNumber,
                    deases: req.body.deases,
                    ambulance: req.body.ambulance,
                    date: req.body.date,
                    book: req.body.book,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country
                }
            }
        )
            .then(() => {
                res.status(200).json({
                    message: "Update Appoinment Successfully",
                    status: 200
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Update Appoinment Not Successfully",
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

exports.appoinmentDeleteById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await appoinmentData.find({ id: id });
        const del = appoinmentData.findByIdAndDelete(id);
        del.exec(function (err, data) {
            if (err) throw err;
            res.status(201).json({
                message: "Delete Appoinment Data",
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
        var doctorName = req.body.doctorName;
        const data = await appoinmentData.find({ doctorName: doctorName });

        res.status(200).json({
            message: "View Appoinment Data By doctorName",
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


exports.AmbulanceAvailable = async (req, res) => {
    try {
        var ambulance = req.body.ambulance;
        const data = await appoinmentData.find(
            {
                ambulance: 0
            }
        ).then(async () => {
            const getData = await ambulanceData.find({ driverAvailable: 1 });
            const finaldata = getData.map((ele) => {
                return {
                    id: ele._id,
                    driverName: ele.driverName,
                    driverNumber: ele.driverNumber,
                    ambulanceNumber: ele.ambulanceNumber
                }
            })
            // console.log("getData::", getData);
            // console.log("finaldata:::", finaldata);

            res.status(200).json({
                message: "View Appoinment Data By Ambulance Available",
                status: 200,
                data: finaldata
            })
        });

    } catch (error) {
        console.log("error:", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};

exports.AmbulanceInavailable = async (req, res) => {
    try {
        // var ambulance = req.body.ambulance;
        const data = await appoinmentData.find({ ambulance: 0 });

        res.status(200).json({
            message: "View Appoinment Data By Ambulance Available",
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

exports.appoinmentByDeases = async (req, res) => {
    try {
        var deases = req.body.deases;
        const data = await appoinmentData.find({ deases: deases });

        res.status(200).json({
            message: "View Appoinment Data By Deases",
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

