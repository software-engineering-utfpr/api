const express = require('express');
var request = require('request');
var cheerio = require('cheerio');
const Form = require('../models/form');

const router = express.Router();

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/';

function scrapeForm(formId, callback) {
  request(GOOGLE_FORM_URL + formId, function(error, response, html) {
    console.log('ooooooooooooo', error);
    console.log('aaaaaaaaaaaaa', response);
    console.log('nnnnnnnnnnnnn', html);
    if(!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var $form = $('#ss-form');

      var parsedResults = [];

      $('#ss-form .ss-item').each(function(i, element) {
      	var obj = {
      		title: $('.ss-q-title', this).text(),
      		helpText: $('.ss-secondary-text', this).text(),
      		html: $(this).html()
      	};
        parsedResults.push(obj);
      });

      return callback(parsedResults, null);
    }
    else return callback(null, error);
  });
}

router.get('/searchByLink/:link', (req, res, next) => {
  scrapeForm(req.params.link, function(data, error) {
    if(error) res.status(400).send('Can\'t find form \n');
    else res.json(data);
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