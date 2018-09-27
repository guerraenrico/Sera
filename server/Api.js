const Category = require('./models/Category');
const Task = require('./models/Task');
const ApiErrors = require('./ApiErrors');
const { handleError, handleResponse } = require('./Handlers');

// Categories

const getCategories = async (db, req, res) => {
  const limit = (req.query.limit !== undefined) && parseInt(req.query.limit, 10);
  const skip = (req.query.skip !== undefined) && parseInt(req.query.skip, 10);
  try {
    const categories = await Category.GetAllAsync(db, limit, skip);
    handleResponse(res, categories);
  } catch (err) {
    console.log('err', JSON.stringify(err));
    handleError(res, ApiErrors.ErrorReadCategory(err));
  }
};

const insertCategory = async (db, req, res) => {
  const { body } = req;
  const category = Category.CreateFromBodyRequest(body);
  if (category === undefined) {
    handleError(res, ApiErrors.InvalidCategoryParameters(), 400);
    return;
  }
  try {
    const result = await Category.InsertAsync(db, category);
    if (result.insertedId !== undefined) {
      handleResponse(res, { ...category, id: result.insertedId });
    } else {
      handleError(res, ApiErrors.ErrorInsertCategory());
    }
  } catch (err) {
    console.log('err', JSON.stringify(err));
    handleError(res, ApiErrors.ErrorInsertCategory(err));
  }
};

const deleteCategory = async (db, req, res) => {
  const { id } = req.params;
  if (id === undefined || id.toString() === '') {
    handleError(res, ApiErrors.InvalidCategoryId(), 400);
    return;
  }
  try {
    const result = await Category.DeleteAsync(db, id);
    if (result.deletedCount >= 1) {
      handleResponse(res);
    } else {
      handleError(res, ApiErrors.ErrorDeleteCategory());
    }
  } catch (err) {
    console.log('err', JSON.stringify(err));
    handleError(res, ApiErrors.ErrorDeleteCategory(err));
  }
};

// Tasks

const getTasks = async (db, req, res) => {
  const limit = (req.query.limit !== undefined) && parseInt(req.query.limit, 10);
  const skip = (req.query.skip !== undefined) && parseInt(req.query.skip, 10);
  const completed = (req.query.completed === 'true');
  const categoriesId = (req.query.categoriesId !== undefined) && req.query.categoriesId.split(',');
  try {
    const tasks = await Task.GetAllAsync(db, limit, skip, completed, categoriesId);
    handleResponse(res, tasks);
  } catch (err) {
    console.log('err', JSON.stringify(err));
    handleError(res, ApiErrors.ErrorReadTask(err));
  }
};

const insertTask = async (db, req, res) => {
  const { body } = req;
  const task = Task.CreateFromBodyRequest(body);
  if (task === undefined) {
    handleError(res, ApiErrors.InvalidTaskParameters(), 400);
    return;
  }
  try {
    const result = await Task.InsertAsync(db, task);
    if (result.insertedId !== undefined) {
      handleResponse(res, { ...task, id: result.insertedId });
    } else {
      handleError(res, ApiErrors.ErrorInsertTask());
    }
  } catch (err) {
    console.log('err', JSON.stringify(err));
    handleError(res, ApiErrors.ErrorInsertTask(err));
  }
};

const deleteTask = async (db, req, res) => {
  const { id } = req.params;
  if (id === undefined || id.toString() === '') {
    handleError(res, ApiErrors.InvalidTaskId(), 400);
    return;
  }
  try {
    const result = await Task.DeleteAsync(db, id);
    if (result.deletedCount >= 1) {
      handleResponse(res);
    } else {
      handleError(res, ApiErrors.ErrorDeleteTask());
    }
  } catch (err) {
    console.log('err', JSON.stringify(err));
    handleError(res, ApiErrors.ErrorDeleteTask(err));
  }
};

const updateTask = async (db, req, res) => {
  const { body } = req;
  const { id, ...other } = body;
  if (id === undefined) {
    handleError(res, ApiErrors.InvalidTaskParameters(), 400);
    return;
  }
  try {
    const result = await Task.UpdateAsync(db, id, { ...other });
    if (!result !== undefined && result.ok === 1) {
      handleResponse(res, { ...Task.CreateFromDocument(result.value), ...other });
    } else {
      handleError(res, ApiErrors.ErrorUpdateTask());
    }
  } catch (err) {
    console.log('err', JSON.stringify(err));
    handleError(res, ApiErrors.ErrorUpdateTask(err));
  }
};

module.exports = {
  getCategories,
  insertCategory,
  deleteCategory,
  getTasks,
  insertTask,
  deleteTask,
  updateTask,
};
