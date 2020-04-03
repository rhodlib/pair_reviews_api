//Imports
const User = require("../models/User");

//Variable
const authCtrl = {};

//Register user endpoint
authCtrl.registerUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    newUser.password = await newUser.encryptPassword(newUser.password);
    await newUser.save();
    const token = newUser.generateAuthToken();
    res.status(201).send({ newUser, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

//Login user endpoint
authCtrl.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
};

//Export router
module.exports = authCtrl;
