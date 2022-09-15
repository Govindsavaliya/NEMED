const router = require("express").Router();

const {
    Insert,
    Update,
    ViewAll,
    ViewById,
    Delete,
}= require("../controller/hospital.controller");

router.post("/Insert",Insert);
router.put("/Update/:id",Update);
router.get("/ViewAll",ViewAll);
router.get("/ViewById/:id",ViewById);
router.delete("/Delete/:id/:role",Delete)

module.exports = router;  