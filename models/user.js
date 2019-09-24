const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const UserSchema = new Schema({
  telefone: { type: String, unique: true, required: true },
  cpf: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  googleID: { type: String, required: false },
  facebookID: { type: String, required: false }
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

  newUser.telefone = user.telefone;
  newUser.cpf = user.cpf;
  newUser.name = user.name;
  newUser.password = user.password;
  newUser.image = user.image;

  newUser.save(callback);
};

module.exports.updateUser = (id, updatedUser, callback) => {
  User.getUserById(id, (err, user) => {
    if (err) callback(err, null);

    user.telefone = updatedUser.telefone ? updatedUser.telefone : user.telefone;
    user.cpf = updatedUser.cpf ? updatedUser.cpf : user.cpf;
    user.name = updatedUser.name ? updatedUser.name : user.name;
    user.password = updatedUser.password ? updatedUser.password : user.password;
    user.image = updatedUser.image ? updatedUser.image : user.image;

    user.save(callback);
  });
};

module.exports.deleteUser = (id, callback) => {
  User.deleteOne({ _id: id }, callback);
};