const router = require("express").Router();
const ambulance = require("../middleware/nrmed");

const {
    ambulanceInsert,
    ambulanceViewById,
    ambulanceViewAll,
    ambulanceUpdate,
    ambulanceDeleteById,
    ambulanceLogin,
    ambulanceLogout,
    emailverify,
    changePassword,
}= require("../controller/ambulance.contoller");

router.post("/ambulanceInsert", ambulanceInsert);
router.get("/ambulanceViewById/:id", ambulanceViewById);
router.get("/ambulanceViewAll", ambulanceViewAll);
router.put("/ambulanceUpdate/:id", ambulanceUpdate);
router.delete("/ambulanceDeleteById/:id", ambulanceDeleteById);
router.post("/login", ambulanceLogin);
router.get("/logout", ambulance, ambulanceLogout);
router.post("/emailverify", emailverify);
router.put("/changePassword/:id", changePassword);




module.exports = router;