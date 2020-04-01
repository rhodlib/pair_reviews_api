//Imports
const User = require("../models/User");

//Variable
const userCtrl = {};

//User logout
userCtrl.userLogout = async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter( token => token.token !== req.token );
        await req.user.save();

        res.send();
    } catch(error) {
        res.status(500).send();
    }
};

//User logout All
userCtrl.userLogoutAll = async(req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch(error) {
        res.status(500).send();
    }
}

//Get all users
userCtrl.getUsers = async(req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch(error) {
        res.status(500).send(error);
    }
};

//Profile user endpoint
userCtrl.getProfile = async (req, res) => {
    res.send(req.user);
};

//Export router
module.exports = userCtrl;