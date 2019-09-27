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

module.exports.addGame = (Game, callback) => {
  const newGame = new Game();

  newGame.name = Game.name;
  newGame.link = Game.link;
  newGame.image = Game.image ? Game.image : newGame.image;

  newGame.save(callback);
};

module.exports.updateGame = (id, updatedGame, callback) => {
  Game.getGameById(id, (err, Game) => {
    if (err) callback(err, null);

    Game.name = updatedGame.name ? updatedGame.name : Game.name;
    Game.link = updatedGame.link ? updatedGame.link : Game.link;
    Game.image = updatedGame.image ? updatedGame.image : Game.image;

    Game.save(callback);
  });
};

module.exports.deleteGame = (id, callback) => {
  Game.deleteOne({ _id: id }, callback);
};