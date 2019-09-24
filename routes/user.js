const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const secret = 'secret';

  User.findOne({ email }, (err, user) => {
    if (err) res.status(400).send('Can\'t log user in');
    if (!user) res.status(401).send('Can\'t log user in, it doesn\'t exist');
    else {
      bcrypt.compare(password, user.password).then((result) => {
        if (result) {
          const token = jwt.sign({ id: user._id }, secret);
          res.status(200).json({
            auth: true,
            token,
            user: {
              id: user._id,
              name: user.name,
              status: user.status
            }
          });
        } else res.status(401).send('Can\'t log user in, it doesn\'t exist');
      });
    }
  });
});

router.get('/', (req, res) => {
  User.getAllUsers((err, users) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t find all users \n');
    }
    res.status(200).json(users);
  });
});

router.get('/:id', (req, res) => {
  User.getUserById(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t find the user with that id \n');
    }
    res.status(200).json(user);
  });
});

router.post('/', (req, res) => {
  const {
    email, name, password, superuser, image
  } = req.body;

  const newUser = {};
  newUser.email = email;
  newUser.name = name;
  newUser.password = bcrypt.hashSync(password, 10);
  newUser.superuser = superuser;
  newUser.image = image;

  User.addUser(newUser, (err, user) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t create the user \n');
    }
    res.status(200).json(user);
  });
});

router.put('/', (req, res) => {
  const {
    email, name, password, superuser, image
  } = req.body;

  const updatedUser = {};

  if (password !== undefined) {
    updatedUser.password = bcrypt.hashSync(password, 10);
  } else {
    updatedUser.password = undefined;
  }

  updatedUser.email = email;
  updatedUser.name = name;
  updatedUser.username = username;
  updatedUser.superuser = superuser;
  updatedUser.image = image;

  User.updateUser(id, updatedUser, (err, user) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t update this user \n');
    }
    res.status(200).json(user);
  });
});

router.delete('/', (req, res) => {
  User.deleteUser(req.body.id, (err, user) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t delete this user \n');
    }
    res.status(200).json(user);
  });
});

module.exports = router;