//Imports
const { Router } = require("express");
const router = Router();
const { registerUser, loginUser } = require("../controllers/auth.controller");

//Routes
router.post("/api/user/register", registerUser);

router.post("/api/user/login", loginUser);

module.exports = router;