const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const ManagerSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  supermanager: { type: Boolean, required: true },
  image: { type: String, required: true }
}, { timestamps: true });

ManagerSchema.plugin(uniquevalidator);

const Manager = mongoose.model('Manager', ManagerSchema, 'Managers');

module.exports = Manager;

module.exports.getAllManagers = (callback) => {
  Manager.find(callback);
};

module.exports.getManagerById = (id, callback) => {
  Manager.findOne({ _id: id }, callback);
};

module.exports.addManager = (manager, callback) => {
  const newManager = new Manager();

  newManager.email = manager.email;
  newManager.name = manager.name;
  newManager.password = manager.password;
  newManager.supermanager = manager.supermanager;
  newManager.image = manager.image;

  newManager.save(callback);
};

module.exports.updateManager = (id, updatedManager, callback) => {
  Manager.getManagerById(id, (err, manager) => {
    if (err) callback(err, null);

    manager.email = updatedManager.email ? updatedManager.email : manager.email;
    manager.name = updatedManager.name ? updatedManager.name : manager.name;
    manager.password = updatedManager.password ? updatedManager.password : manager.password;
    manager.supermanager = updatedManager.supermanager != '' ? updatedManager.supermanager : manager.supermanager;
    manager.image = updatedManager.image ? updatedManager.image : manager.image;

    manager.save(callback);
  });
};

module.exports.deleteManager = (id, callback) => {
  Manager.deleteOne({ _id: id }, callback);
};