//Imports
const { Router } = require("express");
const router = Router();
const { getUsers, getProfile, userLogout, userLogoutAll } = require("../controllers/users.controller");
const auth = require("../middlewares/auth");

//Routes

router.get("/api/users",auth , getUsers);

router.post("/api/user/logout", auth, userLogout);

router.post("/api/user/logoutall", auth, userLogoutAll);

router.get("/api/user/profile", auth, getProfile);

//Export module
module.exports = router;