//Imports
const { Router } = require("express");
const router = Router();
const { getEmployeesMostVote, getEmployeesCant } = require("../controllers/admin.controller");
const auth = require("../middlewares/auth");

//Routes
router.get("/api/users/mostvoted", auth, getEmployeesMostVote);

router.get("/api/users/cant", auth, getEmployeesCant);

//Export module
module.exports = router;