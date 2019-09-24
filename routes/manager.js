const express = require('express');
const bcrypt = require('twin-bcrypt');
const jwt = require('jsonwebtoken');

const Manager = require('../models/manager');

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const secret = 'secret';

  Manager.findOne({ email }, (err, manager) => {
    if (err) res.status(400).send('Can\'t log manager in');
    if (!manager) res.status(401).send('Can\'t log manager in, it doesn\'t exist');
    else {
      bcrypt.compare(password, manager.password, function(result) {
        if (result) {
          const token = jwt.sign({ id: manager._id }, secret);
          return res.status(200).json({
            auth: true,
            token,
            manager: {
              id: manager._id,
              name: manager.name,
              superuser: manager.superuser
            }
          });
        }
        return res.status(401).send('Can\'t log manager in, it doesn\'t exist');
      });
    }
  });
});

router.get('/', (req, res) => {
  Manager.getAllManagers((err, managers) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t find all managers \n');
    }
    res.status(200).json(managers);
  });
});

router.get('/:id', (req, res) => {
  Manager.getManagerById(req.params.id, (err, manager) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t find the manager with that id \n');
    }
    res.status(200).json(manager);
  });
});

router.post('/', (req, res) => {
  const {
    email, name, password, superuser, image
  } = req.body;

  const newManager = {};
  newManager.email = email;
  newManager.name = name;
  newManager.password = bcrypt.hashSync(password, 10);
  newManager.superuser = superuser;
  newManager.image = image;

  Manager.addManager(newManager, (err, manager) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t create the manager \n');
    }
    res.status(200).json(manager);
  });
});

router.put('/', (req, res) => {
  const {
    id, email, name, password, superuser, image
  } = req.body;

  const updatedManager = {};

  if (password !== undefined) {
    updatedManager.password = bcrypt.hashSync(password, 10);
  } else {
    updatedManager.password = undefined;
  }

  updatedManager.email = email;
  updatedManager.name = name;
  updatedManager.managername = managername;
  updatedManager.superuser = superuser;
  updatedManager.image = image;

  Manager.updateManager(id, updatedManager, (err, manager) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t update this manager \n');
    }
    res.status(200).json(manager);
  });
});

router.delete('/', (req, res) => {
  Manager.deleteManager(req.body.id, (err, manager) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t delete this manager \n');
    }
    res.status(200).json(manager);
  });
});

module.exports = router;