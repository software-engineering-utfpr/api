const express = require('express');
const Form = require('../models/form');

const router = express.Router();

router.get('/', (req, res) => {
  Form.getAllForms((err, forms) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t find all forms \n', err);
    }
    res.status(200).json(forms);
  });
});

router.get('/:id', (req, res) => {
  Form.getFormById(req.params.id, (err, form) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t find this form \n', err);
    }
    res.status(200).json(form);
  });
});

router.post('/', (req, res) => {
  const {
    link, expireDate
  } = req.body;

  const newForm = {};

  newForm.link = link;
  newForm.expireDate = expireDate;

  Form.addForm(newForm, (err, form) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t create the form \n', err);
    }
    res.status(200).json(form);
  });
});

router.put('/', (req, res) => {
  const {
    id, link, expireDate
  } = req.body;

  const updateForm = {};

  updateForm.link = link;
  updateForm.expireDate = expireDate;

  Form.updateForm(id, updateForm, (err, form) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t update this form \n', err);
    }
    res.status(200).json(form);
  });
});

router.delete('/:id', (req, res) => {
  Form.deleteForm(req.params.id, (err, form) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t delete this form \n', err);
    }
    res.status(200).json(form);
  });
});

module.exports = router;