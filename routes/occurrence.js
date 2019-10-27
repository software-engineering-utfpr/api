const express = require('express');
const Occurrence = require('../models/occurrence');

const router = express.Router();

router.get('/', (req, res) => {
  Occurrence.getAllOccurrences((err, occurrences) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t find all occurrences \n', err);
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

router.get('/user/:id', (req, res) => {
  Occurrence.getOccurrenceByUser(req.params.id, (err, occurrences) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t find the occurrences \n', err);
    }
    res.status(200).json(occurrences);
  });
});

router.post('/', (req, res) => {
  const {
    category, user, location, date, photos, videos, audios, description
  } = req.body;

  const newOccurrence = {};

  newOccurrence.category = category;
  newOccurrence.user = user;
  newOccurrence.location = location;
  newOccurrence.date = date;
  newOccurrence.photos = photos;
  newOccurrence.videos = videos;
  newOccurrence.audios = audios;
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
    category, user, location, date, photos, videos, audios, description
  } = req.body;

  const updateOccurrence = {};

  updateOccurrence.category = category;
  updateOccurrence.user = user;
  updateOccurrence.location = location;
  updateOccurrence.date = date;
  updateOccurrence.photos = photos;
  updateOccurrence.videos = videos;
  updateOccurrence.audios = audios;
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