//Imports
const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Area = require("../models/Area");

//User Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true
    },
    votes: [
      {
        id: {
          type: String,
          require: true
        },
        area: {
          type: String,
          require: true
        },
        comment: {
          type: String
        }
      }
    ],
    isAdmin: {
      type: Boolean,
      default: false
    },
    areaVotePoints: [
      {
        area: {
          type: String,
          require: true,
        }
      }
    ],
    tokens: [
      {
        token: {
          type: String,
          require: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

//Static methods for userSchemas
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return user;
    } else {
      throw new Error("Unable to login");
    }
  } else {
    throw new Error("Unable to login");
  }
};

//New methods for userSchema

//Encrypt Password
userSchema.methods.encryptPassword = async password => {
  return await bcrypt.hash(password, 8);
};

//Generate Authentication Token
userSchema.methods.generateAuthToken = async function() {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, "thisismytoken");
  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

//Get public profile
userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.isAdmin;
  delete userObject.password;
  delete userObject.votes;
  delete userObject.areaVotePoints;
  delete userObject.tokens;

  return userObject;
};

// Count votes
userSchema.methods.countVotes = async function() {
  return ((await Area.find({})) || []).map(area => ({
    name: area.name,
    votes: this.votes.filter(vote => vote.area === area.name).length
  }));
};

const User = model("User", userSchema);

//Export module
module.exports = User;
