const router = require("express").Router();

const {
    insert,
    ViewAll,
    approvedQk,
    viewById,
}=require("../controller/quickConnect.controller");

router.post("/insert",insert)
router.get("/viewAll",ViewAll)
router.post("/approved/:id/:role",approvedQk)
router.get("/viewById/:id",viewById)

module.exports = router;