const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const LeavingSchema = new Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  image: { type: String, default: "https://res.cloudinary.com/dnnkqjrbi/image/upload/v1574190702/noimage_uii7ob.png" }
}, { timestamps: true });

LeavingSchema.plugin(uniquevalidator);

const Leaving = mongoose.model('Leaving', LeavingSchema, 'Leavings');

module.exports = Leaving;

module.exports.getAllLeavings = (callback) => {
  Leaving.find(callback);
};

module.exports.getLeavingById = (id, callback) => {
  Leaving.findOne({ _id: id }, callback);
};

module.exports.addLeaving = (leaving, callback) => {
  const newLeaving = new Leaving();

  newLeaving.name = leaving.name;
  newLeaving.description = leaving.description;
  newLeaving.latitude = leaving.latitude;
  newLeaving.longitude = leaving.longitude;
  newLeaving.image = leaving.image;

  newLeaving.save(callback);
};

module.exports.updateLeaving = (id, updatedLeaving, callback) => {
  Leaving.getLeavingById(id, (err, leaving) => {
    if(err) callback(err, null);

    leaving.name = updatedLeaving.name ? updatedLeaving.name : leaving.name;
    leaving.description = updatedLeaving.description ? updatedLeaving.description : leaving.description;
    leaving.latitude = updatedLeaving.latitude ? updatedLeaving.latitude : leaving.latitude;
    leaving.longitude = updatedLeaving.longitude ? updatedLeaving.longitude : leaving.longitude;
    leaving.image = updatedLeaving.image ? updatedLeaving.image : leaving.image;

    leaving.save(callback);
  });
};

module.exports.deleteLeaving = (id, callback) => {
  Leaving.deleteOne({ _id: id }, callback);
};
