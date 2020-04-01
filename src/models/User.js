//Imports
const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//User Schema
const userSchema = new Schema({
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
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
    },
    votes: [{
        area: {
            type: String,
            require: true,
        },
        comment: {
            type: String
        }
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    areaVotePoints: [{
        name: {
            type: String,
            require: true
        },
        area: {
            type: String,
            require: true
        }
    }],
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
}, {
    timestamps: true
});


//Static methods for userSchemas
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if(!user) {
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if(!isMatch) {
        throw new Error("Unable to login");
    }

    return user;
};

//New methods for userSchema
userSchema.methods.encryptPassword = async (password) => {
    return await bcrypt.hash(password, 8);
};

userSchema.methods.generateAuthToken = async function() {
    const user = this;

    const token = jwt.sign({ _id: user._id.toString() }, "thisismytoken");
    user.tokens = user.tokens.concat({ token });

    await user.save();
    
    return token;
};

const User = model('User', userSchema);

module.exports = User;