const express = require('express');
const Occurrence = require('../models/occurrence');

const router = express.Router();

router.get('/', (req, res) => {
    Occurrence.getAllOccurrences((err, occurrences) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t find all cccurrences \n', err);
    }
    res.status(200).json(occurrences);
  });
});

router.get('/:id', (req, res) => {
    Occurrence.getOccurrenceById(req.params.id, (err, occurrence) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t find this occurrence \n', err);
    }
    res.status(200).json(occurrence);
  });
});

router.post('/', (req, res) => {
  const {
    item, location, date, photos, description
  } = req.body;

  const newOccurrence = {};

  newOccurrence.item = item;
  newOccurrence.location = location;
  newOccurrence.date = date;
  newOccurrence.photos = photos;
  newOccurrence.description = description;

  Occurrence.addOccurrence(newOccurrence, (err, occurrence) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t create the occurrence \n', err);
    }
    res.status(200).json(occurrence);
  });
});

router.put('/', (req, res) => {
  const {
    item, location, date, photos, description
  } = req.body;

  const updateOccurrence = {};

  updateOccurrence.item = item;
  updateOccurrence.location = location;
  updateOccurrence.date = date;
  updateOccurrence.photos = photos;
  updateOccurrence.description = description;

  Occurrence.updateOccurrence(id, updateOccurrence, (err, occurrence) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t update this occurrence \n', err);
    }
    res.status(200).json(occurrence);
  });
});

router.delete('/:id', (req, res) => {
    Occurrence.deleteOccurrence(req.params.id, (err, occurrence) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t delete this occurrence \n', err);
    }
    res.status(200).json(occurrence);
  });
});

module.exports = router;