const express = require('express');
const Event = require('../models/event');

const router = express.Router();

router.get('/', (req, res) => {
  Event.getAllEvents((err, events) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t find all events \n', err);
    }
    res.status(200).json(events);
  });
});

router.get('/:id', (req, res) => {
  Event.getEventById(req.params.id, (err, event) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t find this event \n', err);
    }
    res.status(200).json(event);
  });
});

router.post('/', (req, res) => {
  const {
    name, initialDate, finalDate, allDay, description, color
  } = req.body;

  const newEvent = {};

  newEvent.name = name;
  newEvent.initialDate = initialDate;
  newEvent.finalDate = finalDate;
  newEvent.allDay = allDay;
  newEvent.description = description;
  newEvent.color = color;

  Event.addEvent(newEvent, (err, event) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t create the event \n', err);
    }
    res.status(200).json(event);
  });
});

router.put('/', (req, res) => {
  const {
    id, name, initialDate, finalDate, allDay, description, color
  } = req.body;

  const updateEvent = {};

  updateEvent.name = name;
  updateEvent.initialDate = initialDate;
  updateEvent.finalDate = finalDate;
  updateEvent.allDay = allDay;
  updateEvent.description = description;
  updateEvent.color = color;

  Event.updateEvent(id, updateEvent, (err, event) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t update this event \n', err);
    }
    res.status(200).json(event);
  });
});

router.delete('/:id', (req, res) => {
  Event.deleteEvent(req.params.id, (err, event) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t delete this event \n', err);
    }
    res.status(200).json(event);
  });
});

module.exports = router;