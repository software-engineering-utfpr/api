const express = require('express');
const bcrypt = require('twin-bcrypt');
const jwt = require('jsonwebtoken');

const Game = require('../models/game');

const router = express.Router();

router.get('/', (req, res) => {
  Game.getAllGames((err, Games) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t find all Games \n');
    }
    res.status(200).json(Games);
  });
});

router.get('/:id', (req, res) => {
  Game.getGameById(req.params.id, (err, Game) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t find the Game with that id \n');
    }
    res.status(200).json(Game);
  });
});

router.post('/', (req, res) => {
  const {
    name, link, image
  } = req.body;

  const newGame = {};
  newGame.name = name;
  newGame.link = link;
  newGame.image = image;

  Game.addGame(newGame, (err, Game) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t create the Game \n');
    }
    res.status(200).json(Game);
  });
});

router.put('/', (req, res) => {
  const {
    id, name, link, image
  } = req.body;

  const updatedGame = {};
  
  updatedGame.name = name;
  updatedGame.link = link;
  updatedGame.image = image;

  Game.updateGame(id, updatedGame, (err, Game) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t update this Game \n');
    }
    res.status(200).json(Game);
  });
});

router.delete('/', (req, res) => {
  Game.deleteGame(req.body.id, (err, Game) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t delete this Game \n');
    }
    res.status(200).json(Game);
  });
});

module.exports = router;