const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true }
});

const Category = mongoose.model('Category', CategorySchema, 'Categories');

module.exports = Category;

module.exports.getAllCategories = (callback) => {
  Category.find(callback);
};

module.exports.getCategoryById = (id, callback) => {
  Category.findOne({ _id: id }, callback);
};

module.exports.addCategory = (category, callback) => {
  const newCategory = new Category();

  newCategory.title = category.title;
  newCategory.image = category.image;

  newCategory.save(callback);
};

module.exports.updateCategory = (id, updatedCategory, callback) => {
  Category.getCategoryById(id, (err, category) => {
    if(err) callback(err, null);

    category.title = updatedCategory.title ? updatedCategory.title : category.title;
    category.image = updatedCategory.image ? updatedCategory.image : category.image;

    category.save(callback);
  });
};

module.exports.deleteCategory = (id, callback) => {
  Category.deleteOne({ _id: id }, callback);
};