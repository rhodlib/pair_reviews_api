//Imports
const User = require("../models/User");
const Area = require("../models/Area");

//Variable
const adminCtrl = {};

//Get most vote employee
adminCtrl.getEmployeesMostVote = async(req, res) => {
    const user = req.user;
    if(!user.isAdmin) {
        return res.status(400).send("You do not have necessary privileges");
    }
    try {
        const users = await User.find({});
        const sortUser = users.sort((a, b) => b.votes.length - a.votes.length);
        res.send(sortUser);
    } catch(error) {
        res.status(500).send(error);
    }
}

//Get employee register cant
adminCtrl.getEmployeesCant = async(req, res) => {
    const user = req.user;
    if(!user.isAdmin) {
        return res.status(400).send("You do not have necessary privileges");
    }
    try {
        const users = await User.find({ isAdmin: false });
        res.send(users);
    } catch(error) {
        res.status(500).send(error);
    }    
}

//Get emplotee most vote for area.

//Export router
module.exports = adminCtrl;