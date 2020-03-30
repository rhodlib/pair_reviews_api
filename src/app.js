//Imports
const express = require("express");

//Configure
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Exports
module.exports = app;