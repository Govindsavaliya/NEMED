const qkConnectData = require("../model/quickConnect.model");

exports.insert = async (req, res) => {
    try {
        const qkConnectDetails = new qkConnectData({
            name: req.body.name,
            email: req.body.email,
            moblie_code:req.body.moblie_code,
            mobile: req.body.mobile,
            whoYouAre: req.body.whoYouAre,
            whatYouWant: req.body.whatYouWant,
            zipCode: req.body.zipCode,
            approved: 0
        })

        console.log("qkConnectDetails:::", qkConnectDetails);

        const saveQkConnData = await qkConnectDetails.save();

        res.status(201).json(
            {
                message: "Query Insert",
                status: 201,
                data: saveQkConnData
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

exports.ViewAll = async (req, res) => {
    try {

        const data = await qkConnectData.find().select('-__v');

        res.status(201).json({
            message: "Get All Query Request Data",
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

exports.viewById = async (req,res)=>{
    try {
        var id = req.params.id;
        const data = await qkConnectData.find({_id:id}).select('-__v');

        res.status(200).json({
            message: "View Query Request Data By Id",
            status: 200,
            info: {
                id: data[0]._id,
                name: data[0].name,
                email: data[0].email,
                moblie_code:data[0].moblie_code,
                mobile: data[0].mobile,
                whoYouAre:data[0].whoYouAre,
                whatYouWant: data[0].whatYouWant,
                zipCode: data[0].zipCode,
                approved: data[0].approved
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong---ViewById",
            status: 500
        });
    }
}

exports.approvedQk = async (req, res) => {
    try {
        var id = req.params.id;
        var role = req.params.role
        var roll = "admin"


        if (role == roll) {
            const data = await qkConnectData.findByIdAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $set: {
                        approved: 1
                    }
                }
            )
                .then(async () => {


                    const data = await qkConnectData.find({ id: id });
                    const del = qkConnectData.findByIdAndDelete(id);

                    del.exec(function (err, data) {
                        if (err) throw err;

                        res.status(201).json({
                            message: "Approved  Data",
                            status: 201,
                            data: data
                        });


                    });

                })
                .catch((err) => {
                    console.log("error", err);

                    res.status(500).json({
                        message: "Approve Not Data",
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
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500,
        });
    }
}