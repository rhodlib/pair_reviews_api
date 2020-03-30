//Imports
const { Schema, model } = require('mongoose');
const validator = require('validator');


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

const user = model('User', userSchema);

module.exports = user;