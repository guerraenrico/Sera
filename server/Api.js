const { ObjectId } = require('mongodb');

const Category = require('./models/Category');
const Task = require('./models/Task');
const ApiErrors = require('./ApiErrors');
const ApiResponse = require('./ApiResponse');

const handleError = (res, apiError, httpCode) => {
  res.status(httpCode || 500).json(ApiResponse.error(apiError));
};

const handleResponse = (res, data) => {
  res.status(200).json(ApiResponse.success(data));
};

// Categories

const getCategories = (db, req, res) => {
  const limit = (req.query.limit !== undefined) && parseInt(req.query.limit, 10);
  const skip = (req.query.skip !== undefined) && parseInt(req.query.skip, 10);
  const query = (limit && skip)
    ? db.collection(Category.Schema.name).find({}).limit(limit).skip(skip)
    : db.collection(Category.Schema.name).find({});
  return query.toArray()
    .then((categoriesDocs) => {
      handleResponse(res, Category.CreateFromDocuments(categoriesDocs));
    }, (err) => {
      console.log('err', JSON.stringify(err));
      handleError(res, ApiErrors.ErrorReadCategory(err));
    });
};

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

// Tasks

const getTasks = (db, req, res) => {
  const limit = (req.query.limit !== undefined) && parseInt(req.query.limit, 10);
  const skip = (req.query.skip !== undefined) && parseInt(req.query.skip, 10);
  const completed = (req.query.completed == 'true');
  // const categoriesId = (req.categoriesId !== undefined) &&
  // { name: { $in: ["aa", "bb"] } }
  const query = (limit && skip)
    ? db.collection(Task.Schema.name).find({}).limit(limit).skip(skip)
    : db.collection(Task.Schema.name).find({});
  return query.toArray()
    .then((tasksDocs) => {
      handleResponse(res, Task.CreateFromDocuments(tasksDocs));
    }, (err) => {
      console.log('err', JSON.stringify(err));
      handleError(res, ApiErrors.ErrorReadTask(err));
    });
};

const insertTask = (db, req, res) => {
  const { body } = req;
  const task = Task.CreateFromBodyRequest(body);
  if (task === undefined) {
    return new Promise(() => handleError(res, ApiErrors.InvalidTaskParameters(), 400));
  }
  return db.collection(Task.Schema.name).insertOne(task)
    .then((result) => {
      if (result.insertedId !== undefined) {
        handleResponse(res, { ...task, id: result.insertedId });
      } else {
        handleError(res, ApiErrors.ErrorInsertTask());
      }
    }, (err) => {
      console.log('err', JSON.stringify(err));
      handleError(res, ApiErrors.ErrorInsertTask(err));
    });
};

const deleteTask = (db, req, res) => {
  const { id } = req.params;
  if (id === undefined || id.toString() === '') {
    return new Promise(() => handleError(res, ApiErrors.InvalidTaskId(), 400));
  }
  return db.collection(Task.Schema.name).deleteOne({ _id: ObjectId(id.toString()) })
    .then((result) => {
      if (result.deletedCount >= 1) {
        handleResponse(res);
      } else {
        handleError(res, ApiErrors.ErrorDeleteTask());
      }
    }, (err) => {
      console.log('err', JSON.stringify(err));
      handleError(res, ApiErrors.ErrorDeleteTask(err));
    });
};

module.exports = {
  getCategories,
  insertCategory,
  deleteCategory,
  getTasks,
  insertTask,
  deleteTask,
};
