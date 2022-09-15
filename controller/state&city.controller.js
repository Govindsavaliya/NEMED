const stateCitiesData = require("../model/state&city.model");

exports.stateCitiesViewAll= async (req,res) =>{
    try {
        const data = await stateCitiesData.find().select('-__v');

        res.status(201).json({
            message : "Get All Country Data",
            status : 201,
            data : data
        })
    } catch (error) {
    console.log("error:::",error);
    res.status(500).json({
        message: "Something Went Wrong",
            status: 500
    })        
    }
}

exports.stateCitiesViewById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await stateCitiesData.find({ _id: id }).select('-__v');


        res.status(201).json({
            message: "View State And City By Id",
            status: 201,
            info: {
                id: data[0]._id,
                city: data[0].city,
                state: data[0].state
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};

exports.stateCitiesDeleteById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await stateCitiesData.find({ id: id });
        const del = stateCitiesData.findByIdAndDelete(id);
        del.exec(function (err, data) {
            if (err) throw err;
            res.status(201).json({
                message: "Delete State Cities Data",
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