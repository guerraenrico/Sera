const { ObjectId } = require('mongodb');

const Category = require('./models/Category');
const ApiErrors = require('./ApiErrors');
const ApiResponse = require('./ApiResponse');

const handleError = (res, apiError, httpCode) => {
  res.status(httpCode || 500).json(ApiResponse.error(apiError));
};

const handleResponse = (res, data) => {
  res.status(200).json(ApiResponse.success(data));
};

const getCategories = (db, req, res) => (
  db.collection(Category.Schema.name).find({}).toArray()
    .then((categoriesDocs) => {
      handleResponse(res, Category.CreateFromDocuments(categoriesDocs));
    }, (err) => {
      console.log('err', JSON.stringify(err));
      handleError(res, ApiErrors.ErrorReadCategory(err));
    })
);

const insertCategory = (db, req, res) => {
  const { body } = req;
  const category = Category.CreateFromBodyRequest(body);
  if (category === undefined) {
    return new Promise(() => handleError(res, ApiErrors.InvalidCategoryParameters(), 400));
  }
  return db.collection(Category.Schema.name).insertOne(category)
    .then((result) => {
      if (result.insertedId !== undefined) {
        handleResponse(res, { ...category, id: result.insertedId });
      } else {
        handleError(res, ApiErrors.ErrorInsertCategory());
      }
    }, (err) => {
      console.log('err', JSON.stringify(err));
      handleError(res, ApiErrors.ErrorInsertCategory(err));
    });
};

const deleteCategory = (db, req, res) => {
  const { id } = req.params;
  if (id === undefined || id.toString() === '') {
    return new Promise(() => handleError(res, ApiErrors.InvalidCategoryId(), 400));
  }
  return db.collection(Category.Schema.name).deleteOne({ _id: ObjectId(id.toString()) })
    .then((result) => {
      if (result.deletedCount >= 1) {
        handleResponse(res);
      } else {
        handleError(res, ApiErrors.ErrorDeleteCategory());
      }
    }, (err) => {
      console.log('err', JSON.stringify(err));
      handleError(res, ApiErrors.ErrorDeleteCategory(err));
    });
};

module.exports = {
  getCategories,
  insertCategory,
  deleteCategory,
};
