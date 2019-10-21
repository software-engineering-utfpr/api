const mongoose = require('mongoose');

const { Schema } = mongoose;

const OccurrenceSchema = Schema({
  item: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  photos: [{ type: String }],
  description: { type: String }
}, { timestamps: true });

const Occurrence = mongoose.model('Occurrence', OccurrenceSchema, 'Occurrences');

module.exports = Occurrence;

module.exports.getAllOccurrences = (callback) => {
    Occurrence.find(callback);
};

module.exports.getOccurrenceById = (id, callback) => {
    Occurrence.findOne({ _id: id }, callback);
};

module.exports.addOccurrence = (occurrence, callback) => {
  const newOccurrence = new Occurrence();

  newOccurrence.item = occurrence.item;
  newOccurrence.location = occurrence.location;
  newOccurrence.date = occurrence.date;
  newOccurrence.photos = occurrence.photos;
  newOccurrence.description = occurrence.description;

  newOccurrence.save(callback);
};

module.exports.updateOccurrence = (id, updateOccurrence, callback) => {
    Occurrence.getOccurrenceById(id, (err, occurrence) => {
    if (err) callback(err, null);

    occurrence.item = updateOccurrence.item ? updateOccurrence.item : occurrence.item;
    occurrence.location = updateOccurrence.location ? updateOccurrence.location : occurrence.location;
    occurrence.date = updateOccurrence.date ? updateOccurrence.date : occurrence.date;
    occurrence.photos = updateOccurrence.photos ? updateOccurrence.photos : occurrence.photos;
    occurrence.description = updateOccurrence.description ? updateOccurrence.description : occurrence.description;

    occurrence.save(callback);
  });
};

module.exports.deleteOccurrence = (id, callback) => {
    Occurrence.deleteOne({ _id: id }, callback);
};