const countryData = require("../model/country.model");

exports.countryViewAll= async (req,res) =>{
    try {
        const data = await countryData.find();

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