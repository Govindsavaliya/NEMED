const router = require("express").Router();

const{
    countryViewAll,
}= require("../controller/country.controller");

router.get("/countryViewAll", countryViewAll);


module.exports = router;   