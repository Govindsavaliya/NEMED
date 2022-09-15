const router = require("express").Router();
const doctor = require("../middleware/nrmed");
// const appoinment = require("../middleware/nrmed2");

const {
    doctorRegistration,
    doctorLogin,
    doctorLogout,
    doctorViewById,
    doctorViewAll,
    doctorUpdate,
    doctorByspecialization,
    doctorByCity,
    doctorDeleteById,
    appoinmentByDoctor,
    emailverify,
    changePassword,
} = require("../controller/doctor.controller");

router.post("/doctorRegistration", doctorRegistration)
router.post("/login", doctorLogin);
router.get("/logout", doctor, doctorLogout);
router.get("/viewById/:id",doctorViewById);
router.get("/viewAll",doctorViewAll);
router.put("/update/:id", doctorUpdate);
router.post("/doctorByspecialization", doctorByspecialization);
router.post("/doctorByCity", doctorByCity);
router.delete("/doctorDeleteById/:id", doctorDeleteById);
router.get("/appoinmentByDoctor", doctor, appoinmentByDoctor);
router.post("/emailverify", emailverify);
router.put("/changePassword/:id", changePassword);


module.exports = router;