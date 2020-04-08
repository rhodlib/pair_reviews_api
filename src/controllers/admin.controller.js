//Imports
const User = require("../models/User");
const { votesByArea } = require("../utils/utils");

//Variable
const adminCtrl = {};

//Get most vote employee
adminCtrl.getEmployeesMostVote = async (req, res) => {
  const user = req.user;
  if (user.isAdmin) {
    try {
      const users = await User.find({});
      const sortUsers = users.sort((a, b) => b.votes.length - a.votes.length);
      const displayUser = sortUsers.map((sortUser) => ({
        name: sortUser.name,
        votes: sortUser.votes.length,
      }));
      res.send(displayUser);
    } catch (error) {
      res.status(500).send({ error });
    }
  } else {
    return res
      .status(400)
      .send({ error: "You do not have necessary privileges" });
  }
};

//Get employee register cant
adminCtrl.getEmployeesCant = async (req, res) => {
  const user = req.user;
  if (user.isAdmin) {
    try {
      const users = await User.find({ isAdmin: false });
      res.send({ employees: users.length });
    } catch (error) {
      res.status(500).send({ error });
    }
  } else {
    return res
      .status(400)
      .send({ error: "You do not have necessary privileges" });
  }
};

//Get employee most vote for area.
adminCtrl.getMostVotedByArea = async (req, res) => {
  const reqUser = req.user;
  if (reqUser.isAdmin) {
    try {
      const users = await User.find({ isAdmin: false });
      const userMostVotedByArea = await votesByArea(users);
      res.send(userMostVotedByArea);
    } catch (error) {
      res.status(500).send({ error });
    }
  } else {
    return res
      .status(400)
      .send({ error: "You do not have necessary privileges" });
  }
};

//Export router
module.exports = adminCtrl;
