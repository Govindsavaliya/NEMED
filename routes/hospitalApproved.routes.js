const router = require("express").Router();

const {
    Insert,
    ViewAll,
    ViewById,
    Update,
    hospitalApproved,
}=require("../controller/hospitalApproved.controller")

router.post("/Insert",Insert);
router.get("/ViewAll/:role",ViewAll);
router.get("/ViewById/:id/:role",ViewById);
router.put("/Update/:id/:role",Update);
router.get("/Approved/:role",hospitalApproved);

module.exports = router