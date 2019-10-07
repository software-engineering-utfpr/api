const express = require('express');

const Leaving = require('../models/leaving');

const router = express.Router();

router.get('/', (req, res) => {
  Leaving.getAllLeavings((err, leavings) => {
    if(err) {
      console.log(err);
      res.status(400).send('Can\'t find all leavings \n');
    }
    res.status(200).json(leavings);
  });
});

router.get('/:id', (req, res) => {
  Leaving.getLeavingById(req.params.id, (err, leaving) => {
    if(err) {
      console.log(err);
      res.status(400).send('Can\'t find the leaving with that id \n');
    }
    res.status(200).json(leaving);
  });
});

router.post('/', (req, res) => {
  const {
    name, description, latitude, longitude, image
  } = req.body;

  const newLeaving = {};
  newLeaving.name = name;
  newLeaving.description = description;
  newLeaving.latitude = latitude;
  newLeaving.longitude = longitude;
  newLeaving.image = image;

  Leaving.addLeaving(newLeaving, (err, leaving) => {
    if(err) {
      console.log(err);
      res.status(400).send('Can\'t create the leaving \n');
    }
    res.status(200).json(leaving);
  });
});

router.put('/', (req, res) => {
  const {
    id, name, description, latitude, longitude, image
  } = req.body;

  const updatedLeaving = {};
  
  updatedLeaving.name = name;
  updatedLeaving.description = description;
  updatedLeaving.latitude = latitude;
  updatedLeaving.longitude = longitude;
  updatedLeaving.image = image;

  Leaving.updateLeaving(id, updatedLeaving, (err, leaving) => {
    if(err) {
      console.log(err);
      res.status(400).send('Can\'t update this Leaving \n');
    }
    res.status(200).json(leaving);
  });
});

router.delete('/:id', (req, res) => {
  Leaving.deleteLeaving(req.params.id, (err, leaving) => {
    if(err) {
      console.log(err);
      res.status(400).send('Can\'t delete this leaving \n');
    }
    res.status(200).json(leaving);
  });
});

module.exports = router;