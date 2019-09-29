const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventSchema = Schema({
  name: { type: String, required: true },
  initialDate: { type: Date, required: true },
  finalDate: { type: Date, required: true },
  allDay: { type: Boolean, required: true },
  color: { type: String },
  description: { type: String }
}, { timestamps: true });

const Event = mongoose.model('Event', EventSchema, 'Events');

module.exports = Event;

module.exports.getAllEvents = (callback) => {
  Event.find(callback);
};

module.exports.getEventById = (id, callback) => {
  Event.findOne({ _id: id }, callback);
};

module.exports.addEvent = (event, callback) => {
  const newEvent = new Event();

  newEvent.name = event.name;
  newEvent.initialDate = event.initialDate;
  newEvent.finalDate = event.finalDate;
  newEvent.allDay = event.allDay;
  newEvent.description = event.description;
  newEvent.color = event.color;

  newEvent.save(callback);
};

module.exports.updateEvent = (id, updateEvent, callback) => {
  Event.getEventById(id, (err, event) => {
    if (err) callback(err, null);

    event.name = updateEvent.name ? updateEvent.name : event.name;
    event.initialDate = updateEvent.initialDate ? updateEvent.initialDate : event.initialDate;
    event.finalDate = updateEvent.finalDate ? updateEvent.finalDate : event.finalDate;
    event.allDay = updateEvent.allDay;
    event.description = updateEvent.description;
    event.color = updateEvent.color ? updateEvent.color : event.color;

    event.save(callback);
  });
};

module.exports.deleteEvent = (id, callback) => {
  Event.deleteOne({ _id: id }, callback);
};