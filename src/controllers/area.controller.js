//Imports
const Area = require("../models/Area");

//Variable
const areaCtrl = {};

//Get areas
areaCtrl.getAreas = async (req, res) => {
  try {
    const areas = await Area.find({});
    res.send(areas);
  } catch (error) {
    res.status(400).send({ error });
  }
};

//Create area only admin
areaCtrl.createArea = async (req, res) => {
  const user = req.user;

  if (user.isAdmin) {
    try {
      const newArea = new Area(req.body);
      await newArea.save();
      res.status(201).send({ newArea });
    } catch (error) {
      res.status(500).send({ error });
    }
  } else {
    return res
      .status(400)
      .send({ error: "You do not have necessary privileges" });
  }
};

//Delete area by ID only admin
areaCtrl.deleteAreaById = async (req, res) => {
  const user = req.user;

  if (user.isAdmin) {
    try {
      const area = await Area.findOneAndDelete({ _id: req.params.id });
      if (!area) {
        return res.status(404).send();
      }
      res.send(area);
    } catch (error) {
      res.status(500).send({ error });
    }
  } else {
    return res
      .status(400)
      .send({ error: "You do not have necessary privileges" });
  }
};

//Delete all areas only admin
areaCtrl.deleteAllAreas = async (req, res) => {
  const user = req.user;

  if (user.isAdmin) {
    try {
      const areas = await Area.deleteMany({});
      res.send(areas);
    } catch (error) {
      res.status(500).send({ error });
    }
  } else {
    return res
      .status(400)
      .send({ error: "You do not have necessary privileges" });
  }
};

//Export router
module.exports = areaCtrl;
