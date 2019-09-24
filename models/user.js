const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  superuser: { type: Boolean, required: true },
  image: { type: String, required: true }
}, { timestamps: true });

UserSchema.plugin(uniquevalidator);

const User = mongoose.model('User', UserSchema, 'Users');

module.exports = User;

module.exports.getAllUsers = (callback) => {
  User.find(callback);
};

module.exports.getUserById = (id, callback) => {
  User.findOne({ _id: id }, callback);
};

module.exports.addUser = (user, callback) => {
  const newUser = new User();

  newUser.email = user.email;
  newUser.name = user.name;
  newUser.password = user.password;
  newUser.superuser = user.superuser;
  newUser.image = user.image;

  newUser.save(callback);
};

module.exports.updateUser = (id, updatedUser, callback) => {
  User.getUserById(id, (err, user) => {
    if (err) callback(err, null);

    user.email = updatedUser.email ? updatedUser.email : user.email;
    user.RA = updatedUser.RA ? updatedUser.RA : user.RA;
    user.name = updatedUser.name ? updatedUser.name : user.name;
    user.password = updatedUser.password ? updatedUser.password : user.password;
    user.superuser = updatedUser.superuser ? updatedUser.superuser : user.superuser;
    user.image = updatedUser.image ? updatedUser.image : user.image;

    user.save(callback);
  });
};

module.exports.deleteUser = (id, callback) => {
  User.deleteOne({ _id: id }, callback);
};