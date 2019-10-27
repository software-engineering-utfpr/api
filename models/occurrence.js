const mongoose = require('mongoose');

const { Schema } = mongoose;

const UFs = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];

const OccurrenceSchema = Schema({
  category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
  location: {
    notUrbanizedArea: { type: Boolean, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, default: 'Campo Mourão', required: true },
    uf: { type: String, enum: UFs, default: 'PR', required: true },
    cep: { type: String },
    number: { type: Number },
    referencePoint: { type: String }
  },
  date: { type: Date, required: true },
  photos: [{ type: String }],
  videos: [{ type: String }],
  audios: [{ type: String }],
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

  newOccurrence.category = occurrence.category;
  newOccurrence.location = occurrence.location;
  newOccurrence.date = occurrence.date;
  newOccurrence.photos = occurrence.photos;
  newOccurrence.videos = occurrence.videos;
  newOccurrence.audios = occurrence.audios;
  newOccurrence.description = occurrence.description;

  newOccurrence.save(callback);
};

module.exports.updateOccurrence = (id, updateOccurrence, callback) => {
    Occurrence.getOccurrenceById(id, (err, occurrence) => {
    if(err) callback(err, null);

    occurrence.category = updateOccurrence.category ? updateOccurrence.category : occurrence.category;
    occurrence.location = updateOccurrence.location ? updateOccurrence.location : occurrence.location;
    occurrence.date = updateOccurrence.date ? updateOccurrence.date : occurrence.date;
    occurrence.photos = updateOccurrence.photos ? updateOccurrence.photos : occurrence.photos;
    occurrence.videos = updateOccurrence.videos ? updateOccurrence.videos : occurrence.videos;
    occurrence.audios = updateOccurrence.audios ? updateOccurrence.audios : occurrence.audios;
    occurrence.description = updateOccurrence.description ? updateOccurrence.description : occurrence.description;

    occurrence.save(callback);
  });
};

module.exports.deleteOccurrence = (id, callback) => {
    Occurrence.deleteOne({ _id: id }, callback);
};