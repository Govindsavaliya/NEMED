const router = require("express").Router();
const patient = require("../middleware/nrmed");

const{
    patientRegistration,
    patientLogin,
    patientLogout,
    patientViewById,
    patientViewAll,
    patientUpdate,
    patientByPatientDeases,
    patientByCity,
    patientDeleteById,
    emailverify,
    changePassword,
}=require("../controller/patient.controller");

router.post("/patientRegistration", patientRegistration);
router.post("/login", patientLogin);
router.get("/logout", patient, patientLogout);
router.get("/viewById/:id",patientViewById);
router.get("/viewAll",patientViewAll);
router.put("/update/:id", patientUpdate);
router.post("/patientByPatientDeases", patientByPatientDeases);
router.post("/patientByCity", patientByCity);
router.delete("/patientDeleteById/:id", patientDeleteById);
router.post("/emailverify", emailverify);
router.put("/changePassword/:id", changePassword);


module.exports = router;