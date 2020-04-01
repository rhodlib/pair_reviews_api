//Imports
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Middleware for authenticate
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, "thisismytoken");

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token});
        if(!user) {
            throw new Error()
        }

        req.token = token;
        req.user = user;
        next();
    } catch(error) {
        res.status(401).send({ error: "Please authenticate." });
    }
};

//Export module
module.exports = auth;