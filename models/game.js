const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const GameSchema = new Schema({
  appId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  developer: { type: String, required: true },
  link: { type: String, required: true },
  score: { type: Number },
  image: { type: String, required: true }
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

module.exports.addGame = (game, callback) => {
  const newGame = new Game();

  newGame.appId = game.appId;
  newGame.name = game.name;
  newGame.developer = game.developer;
  newGame.link = game.link;
  newGame.score = game.score;
  newGame.image = game.image;

  newGame.save(callback);
};

module.exports.updateGame = (id, updatedGame, callback) => {
  Game.getGameById(id, (err, game) => {
    if(err) callback(err, null);

    game.appId = updatedGame.appId ? updatedGame.appId : game.appId;
    game.name = updatedGame.name ? updatedGame.name : game.name;
    game.developer = updatedGame.developer ? updatedGame.developer : game.developer;
    game.link = updatedGame.link ? updatedGame.link : game.link;
    game.score = updatedGame.score ? updatedGame.score : game.score;
    game.image = updatedGame.image ? updatedGame.image : game.image;

    game.save(callback);
  });
};

module.exports.deleteGame = (id, callback) => {
  Game.deleteOne({ _id: id }, callback);
};