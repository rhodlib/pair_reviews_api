//Imports
const { Router } = require("express");
const router = Router();
const {
  getEmployeesMostVote,
  getEmployeesCant,
  getMostVotedByArea
} = require("../controllers/admin.controller");
const auth = require("../middlewares/auth");

//Routes
router.get("/api/users/mostvoted", auth, getEmployeesMostVote);

router.get("/api/users/cant", auth, getEmployeesCant);

router.get("/api/users/mostvotedbyarea", auth, getMostVotedByArea);

//Export module
module.exports = router;
