//Imports
const { Router } = require("express");
const { getAreas, createArea, deleteAreaById, deleteAllAreas } = require("../controllers/area.controller");
const auth = require("../middlewares/auth");
const router = Router();

//Routes
router.get("/api/areas/read", getAreas);

router.post("/api/areas/create", auth, createArea);

router.delete("/api/area/delete/:id", auth, deleteAreaById);

router.delete("/api/areas/deleteall", auth, deleteAllAreas);

//Export module
module.exports = router;