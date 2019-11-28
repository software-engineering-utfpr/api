const express = require('express');
const Category = require('../models/category');

const router = express.Router();

router.get('/', (req, res) => {
    Category.getAllCategories((err, categories) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t find all categories \n', err);
    }
    res.status(200).json(categories);
  });
});

router.get('/:id', (req, res) => {
    Category.getCategoryById(req.params.id, (err, category) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t find this category \n', err);
    }
    res.status(200).json(category);
  });
});

router.post('/', (req, res) => {
  const {
    title
  } = req.body;

  const newCategory = {};

  newCategory.title = title;

  Category.addCategory(newCategory, (err, category) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t create the category \n', err);
    }
    res.status(200).json(category);
  });
});

router.put('/', (req, res) => {
  const {
    title, id
  } = req.body;

  const updateCategory = {};

  updateCategory.title = title;

  Category.updateCategory(id, updateCategory, (err, category) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t update this category \n', err);
    }
    res.status(200).json(category);
  });
});

router.delete('/:id', (req, res) => {
    Category.deleteCategory(req.params.id, (err, category) => {
    if (err) {
      console.log(err);
      res.status(400).send('Can\'t delete this category \n', err);
    }
    res.status(200).json(category);
  });
});

module.exports = router;
