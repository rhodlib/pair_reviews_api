//Imports
const Area = require("../models/Area");

//Variable
const areaCtrl = {};

//Get areas
areaCtrl.getAreas = async(req, res) => {
    try {
        const areas = await Area.find({});
        res.send(areas);        
    } catch(error) {
        res.status(400).send(error);
    } 
}

//Create area only admin
areaCtrl.createArea = async(req, res) => {
    const user = req.user;

    if(!user.isAdmin) {
        return res.status(400).send("You do not have necessary privileges");
    }
    
    try {
        const newArea = new Area(req.body);
        await newArea.save();
        res.status(201).send({ newArea });
    }  catch(error) {
        res.status(400).send(error);
    }    
}

//Delete area by ID only admin
areaCtrl.deleteAreaById = async(req, res) => {
    const user = req.user;

    if(!user.isAdmin) {
        return res.status(400).send("You do not have necessary privileges");
    }

    try {
        const area = await Area.findOneAndDelete(req.params.id);
        if(!area) {
            return res.status(404).send();
        }
        res.send(area);
    } catch(error) {
        res.status(400).send(error);
    }
}

//Delete all areas only admin
areaCtrl.deleteAllAreas = async(req, res) => {
    const user = req.user;

    if(!user.isAdmin) {
        return res.status(400).send("You do not have necessary privileges");
    }

    try {
        const areas = await Area.deleteMany({});
        res.send(areas);
    } catch(error) {
        res.status(500).send();
    }
}

//Export router
module.exports = areaCtrl;