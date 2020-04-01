//Imports
const { model } = require('mongoose');

const Area = model('Area', {
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = Area;