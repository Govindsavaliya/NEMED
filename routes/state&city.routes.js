const router = require("express").Router();

const{
    stateCitiesViewAll,
    stateCitiesViewById,
    stateCitiesDeleteById
}= require("../controller/state&city.controller");

router.get("/stateCitiesViewAll", stateCitiesViewAll);
router.get("/stateCitiesViewById/:id", stateCitiesViewById);
router.delete("/stateCitiesDeleteById/:id", stateCitiesDeleteById);

module.exports = router;  