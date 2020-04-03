//Imports
const User = require("../models/User");

//Variable
const userCtrl = {};

//User logout
userCtrl.userLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
};

//User logout All
userCtrl.userLogoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
};

//Get all users
userCtrl.getUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false });
    const users = users.filter(user => req.user._id !== user._id);
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Vote other user
userCtrl.sendVoteUser = async (req, res) => {
  const {
    user: reqUser,
    body: { id: _id, area, comment }
  } = req;
  //Find user to vote by ID.
  const user = await User.findById({ _id });
  //Find reqUser to prevent errors.
  const reqUser = await User.findById(reqUser._id);

  if(!user._id === reqUser._id) {
    //Verify if reqUser is enable to vote this area.
    const voteIsEnabled = reqUser.areaVotePoints.some( areaVotePoint => areaVotePoint.area === area );
    if(!voteIsEnabled) {
      if (user) {
        //Verify if user to vote have another vote with the same reqUser.
        const isMatch = user.votes.some(({ id }) => id === reqUser._id);
    
        if (!isMatch) {
          user.votes = [...user.votes, { id: reqUser._id, area, comment }];
          reqUser.areaVotePoints = [...reqUser.areaVotePoints, { area }];
    
          await user.save();
          await reqUser.save();
    
          res.status(202).send("Thanks for voting");
        } else {
          return res.status(400).send("You already vote this person");
        }
      } else {
        return res.status(404).send("User not found");
      }
    } else {
      return res.status(400).send("You already use this area for vote");
    }
  } else {
    return res.status(400).send("You cannot vote yourself");
  }
};

//Profile user endpoint
userCtrl.getProfile = async (req, res) => {
  res.send(req.user);
};

//Export router
module.exports = userCtrl;
