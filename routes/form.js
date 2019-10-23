const express = require('express');
var request = require('request');
var cheerio = require('cheerio');
const Form = require('../models/form');

const router = express.Router();

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/';

router.get('/searchByLink/:formId', (req, res, next) => {
  const { formId } = req.params;

  request(GOOGLE_FORM_URL + formId, function(error, response, html) {
    if(!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var $form = $('#ss-form');

      const result = {
        title: $('.freebirdFormviewerViewHeaderTitle').text(),
        description: $('.freebirdFormviewerViewHeaderDescription').text()
      };
      res.status(200).json(result);
    }
    else res.status(400).send('Can\'t find form \n');
  });
});

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
    name, description, link, expireDate
  } = req.body;

  const newForm = {};

  newForm.name = name;
  newForm.description = description;
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
    id, name, description, link, expireDate
  } = req.body;

  const updateForm = {};

  updateForm.name = name;
  updateForm.description = description;
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