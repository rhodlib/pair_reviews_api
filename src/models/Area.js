//Imports
const { model } = require('mongoose');

const Area = model('Area', {
    name: {
        type: String,
        required: true,
        unique: true
    }
});

//Export module
module.exports = Area;