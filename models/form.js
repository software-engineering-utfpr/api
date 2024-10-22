const mongoose = require('mongoose');

const { Schema } = mongoose;

const FormSchema = Schema({
  title: { type: String },
  description: { type: String },
  link: { type: String, required: true },
  expireDate: { type: Date, required: true }
}, { timestamps: true });

const Form = mongoose.model('Form', FormSchema, 'Forms');

module.exports = Form;

module.exports.getAllForms = (callback) => {
  Form.find(callback);
};

module.exports.getFormById = (id, callback) => {
  Form.findOne({ _id: id }, callback);
};

module.exports.addForm = (form, callback) => {
  const newForm = new Form();

  newForm.title = form.title;
  newForm.description = form.description;
  newForm.link = form.link;
  newForm.expireDate = form.expireDate;

  newForm.save(callback);
};

module.exports.updateForm = (id, updateForm, callback) => {
  Form.getFormById(id, (err, form) => {
    if(err) callback(err, null);

    form.title = updateForm.title ? updateForm.title : form.title;
    form.description = updateForm.description ? updateForm.description : form.description;
    form.link = updateForm.link ? updateForm.link : form.link;
    form.expireDate = updateForm.expireDate ? updateForm.expireDate : form.expireDate;

    form.save(callback);
  });
};

module.exports.deleteForm = (id, callback) => {
  Form.deleteOne({ _id: id }, callback);
};