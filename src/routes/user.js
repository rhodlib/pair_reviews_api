//Imports
const { Router } = require("express");
const router = Router();
const {registerUser, loginUser, getUsers} = require("../controllers/users.controller");

//Routes
router.post("/api/user/register", registerUser);

router.post("/api/user/login", loginUser);

router.get("/api/users", getUsers);

module.exports = router;