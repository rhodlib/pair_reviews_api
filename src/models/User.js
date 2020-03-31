//Imports
const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");

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
    votes: {
        type: [{
            area: String,
            comment: String
        }],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    areaVotePoints: {
        type: [{
            name: String,
            area: String
        }]
    },
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
    console.log(isMatch);
    if(!isMatch) {
        throw new Error("Unable to login");
    }

    return user;
}

//New methods for userSchema
userSchema.methods.encryptPassword = async (password) => {
    return await bcrypt.hash(password, 8);
}

const User = model('User', userSchema);

module.exports = User;