const router = require("express").Router();

const{
    appoinmentInsert,
    appoinmentViewById,
    appoinmentViewAll,
    appoinmentUpdate,
    appoinmentDeleteById,
    appoinmentByDoctor,
    AmbulanceAvailable,
    AmbulanceInavailable,
    appoinmentByDeases,
}= require("../controller/appoinment.contoller");

router.post("/appoinmentInsert", appoinmentInsert);
router.get("/appoinmentViewById/:id",appoinmentViewById);
router.get("/appoinmentViewAll",appoinmentViewAll);
router.put("/appoinmentUpdate/:id",appoinmentUpdate);
router.delete("/appoinmentDeleteById/:id",appoinmentDeleteById);
router.get("/appoinmentByDoctor",appoinmentByDoctor);
router.get("/AmbulanceAvailable",AmbulanceAvailable);
router.get("/AmbulanceInavailable",AmbulanceInavailable);
router.get("/appoinmentByDeases",appoinmentByDeases);



module.exports = router;   