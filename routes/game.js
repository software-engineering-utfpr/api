const express = require('express');
const gplay = require('google-play-scraper');

const Game = require('../models/game');

const router = express.Router();

router.get('/searchByLink/:link', (req, res, next) => {
  gplay.search({
    term: req.params.link,
    num: 10
  }).then(response => res.json(response))
  .catch(err => next(err));
});

router.get('/getById/:appId', (req, res, next) => {
  gplay.app({ appId: req.params.appId })
    .then(response => res.json(response))
    .catch(err => next(err));
});

router.get('/', (req, res) => {
  Game.getAllGames((err, games) => {
    if(err) {
      console.log(err);
      res.status(400).send('Can\'t find all games \n');
    }
    res.status(200).json(games);
  });
});

router.get('/:id', (req, res) => {
  Game.getGameById(req.params.id, (err, game) => {
    if(err) {
      console.log(err);
      res.status(400).send('Can\'t find the game with that id \n');
    }
    res.status(200).json(game);
  });
});

router.post('/', (req, res) => {
  const {
    name, developer, link, score, image
  } = req.body;

  const newGame = {};
  newGame.name = name;
  newGame.developer = developer;
  newGame.link = link;
  newGame.score = score;
  newGame.image = image;

  Game.addGame(newGame, (err, game) => {
    if(err) {
      console.log(err);
      res.status(400).send('Can\'t create the game \n');
    }
    res.status(200).json(game);
  });
});

router.put('/', (req, res) => {
  const {
    id, name, developer, link, score, image
  } = req.body;

  const updatedGame = {};
  
  updatedGame.name = name;
  updatedGame.developer = developer;
  updatedGame.link = link;
  updatedGame.score = score;
  updatedGame.image = image;

  Game.updateGame(id, updatedGame, (err, game) => {
    if(err) {
      console.log(err);
      res.status(400).send('Can\'t update this Game \n');
    }
    res.status(200).json(game);
  });
});

router.delete('/:id', (req, res) => {
  Game.deleteGame(req.params.id, (err, game) => {
    if(err) {
      console.log(err);
      res.status(400).send('Can\'t delete this game \n');
    }
    res.status(200).json(game);
  });
});

module.exports = router;