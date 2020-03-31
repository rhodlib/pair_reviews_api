//Imports
const express = require("express");
const userRoutes = require("./routes/user");

//Initializations
const app = express();

//Configure
app.set('port', process.env.PORT || 4000);
app.use(express.json());

//Middlewares
app.use(express.urlencoded({extended: false}));

//Routes
app.use(userRoutes);


//Exports
module.exports = app;