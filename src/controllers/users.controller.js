//Imports
const User = require("../models/User");
const Area = require("../models/Area");

//Variable
const userCtrl = {};

//User logout
userCtrl.userLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();

    res.status(200).send();
  } catch (error) {
    res.status(500).send({ error });
  }
};

//User logout All
userCtrl.userLogoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send({ error });
  }
};

//Get all users
userCtrl.getUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false });
    //const usersFilter = users.filter(user => user._id != req.user._id.toString());
    res.send(users);
  } catch (error) {
    res.status(500).send({ error });
  }
};

// Vote other user
userCtrl.sendVoteUser = async (req, res) => {
  const { id, area, comment } = req.body;

  try {
    //Find user to vote by ID.
    const user = await User.findById(id);
    //Find reqUser to prevent errors.
    const reqUser = await User.findById(req.user._id);
    //Get areas
    const areasFind = await Area.find({ name: area });
    console.log(areasFind);
    if (areasFind.length !== 0) {
      if (!user._id.equals(reqUser._id)) {
        //Verify if reqUser is enable to vote this area.
        const voteIsEnabled = reqUser.areaVotePoints.some(
          (areaVotePoint) => areaVotePoint.area === area
        );
        if (!voteIsEnabled) {
          if (user) {
            //Verify if user to vote have another vote with the same reqUser.
            const isMatch = user.votes.some(
              ({ id }) => id === reqUser._id.toString()
            );

            if (!isMatch) {
              user.votes = [
                ...user.votes,
                { id: reqUser._id, area, comment, date: new Date() },
              ];
              reqUser.areaVotePoints = [...reqUser.areaVotePoints, { area }];

              await user.save();
              await reqUser.save();

              res.status(202).send({ message: "Thanks for voting" });
            } else {
              return res
                .status(400)
                .send({ error: "You already vote this person" });
            }
          } else {
            return res.status(404).send({ error: "User not found" });
          }
        } else {
          return res
            .status(400)
            .send({ error: "You already use this area for vote" });
        }
      } else {
        return res.status(400).send({ error: "You cannot vote yourself" });
      }
    } else {
      return res.status(404).send({ error: "Area not found" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

//Profile user endpoint
userCtrl.getProfile = async (req, res) => {
  res.send(req.user);
};

//Export router
module.exports = userCtrl;
