const router = require("express").Router();

const{
    insert,
    viewAll
}=require("../controller/requested.controller");

router.post("/insert",insert)
router.get("/viewAll/:role",viewAll)

module.exports = router;