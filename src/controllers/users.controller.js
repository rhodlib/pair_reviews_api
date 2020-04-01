//Imports
const User = require("../models/User");

//Variable
const userCtrl = {};

//Register user endpoint
userCtrl.registerUser = async(req, res) => {
    const newUser = new User(req.body);
    try {
        newUser.password = await newUser.encryptPassword(newUser.password);
        await newUser.save();
        const token = newUser.generateAuthToken();
        res.status(201).send({ newUser, token });
    }  catch(error) {
        res.status(400).send(error);
    }
};

//Login user endpoint
userCtrl.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch(error) {
        res.status(400).send();
    }
};

//Logout user endpoint

//Get all users
userCtrl.getUsers = async(req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch(error) {
        res.status(500).send(error);
    }
}

//Profile user endpoint

//Export router
module.exports = userCtrl;