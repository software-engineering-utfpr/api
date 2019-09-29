const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const GameSchema = new Schema({
  name: { type: String, required: true, unique: true },
  link: { type: String, required: true },
  image: { type: String, default: 'https://res.cloudinary.com/dnnkqjrbi/image/upload/v1569545813/images_jxiacp.png', required: true }
}, { timestamps: true });

GameSchema.plugin(uniquevalidator);

const Game = mongoose.model('Game', GameSchema, 'Games');

module.exports = Game;

module.exports.getAllGames = (callback) => {
  Game.find(callback);
};

module.exports.getGameById = (id, callback) => {
  Game.findOne({ _id: id }, callback);
};

module.exports.getGameBySearch = (searchWord, callback) => {
  Game.find({
    $or: [
      { name: new RegExp(searchWord, 'i') }
    ]
  }, callback);
};

module.exports.addGame = (game, callback) => {
  const newGame = new Game();

  newGame.name = game.name;
  newGame.link = game.link;
  newGame.image = game.image ? game.image : newGame.image;

  newGame.save(callback);
};

module.exports.updateGame = (id, updatedGame, callback) => {
  Game.getGameById(id, (err, game) => {
    if (err) callback(err, null);

    game.name = updatedGame.name ? updatedGame.name : game.name;
    game.link = updatedGame.link ? updatedGame.link : game.link;
    game.image = updatedGame.image ? updatedGame.image : game.image;

    game.save(callback);
  });
};

module.exports.deleteGame = (id, callback) => {
  Game.deleteOne({ _id: id }, callback);
};