const Category = require('./models/Category');
const Task = require('./models/Task');
const ApiErrors = require('./ApiErrors');
const { handleError, handleResponse } = require('./Handlers');

// Categories

const getCategories = async (db, req, res, session) => {
  const limit = (req.query.limit !== undefined) && parseInt(req.query.limit, 10);
  const skip = (req.query.skip !== undefined) && parseInt(req.query.skip, 10);
  try {
    const categories = await Category.GetAllAsync(
      db, session.userId, limit, skip,
    );
    handleResponse(res, categories, session.accessToken);
  } catch (err) {
    console.log('err', JSON.stringify(err));
    handleError(res, ApiErrors.ErrorReadCategory(err), session.accessToken);
  }
};

const insertCategory = async (db, req, res, session) => {
  const { body } = req;
  const category = Category.CreateFromBodyRequest(body, session.userId);
  if (category === undefined) {
    handleError(res, ApiErrors.InvalidCategoryParameters(), 400, session.accessToken);
    return;
  }
  try {
    const result = await Category.InsertAsync(db, category);
    if (result.insertedId !== undefined) {
      handleResponse(res, { ...category, id: result.insertedId }, session.accessToken);
    } else {
      handleError(res, ApiErrors.ErrorInsertCategory(), session.accessToken);
    }
  } catch (err) {
    console.log('err', JSON.stringify(err));
    handleError(res, ApiErrors.ErrorInsertCategory(err), session.accessToken);
  }
};

const deleteCategory = async (db, req, res, session) => {
  const { id } = req.params;
  if (id === undefined || id.toString() === '') {
    handleError(res, ApiErrors.InvalidCategoryId(), 400, session.accessToken);
    return;
  }
  try {
    const result = await Category.DeleteAsync(db, session.userId, id);
    if (result.deletedCount >= 1) {
      handleResponse(res, { }, session.accessToken);
    } else {
      handleError(res, ApiErrors.ErrorDeleteCategory(), session.accessToken);
    }
  } catch (err) {
    console.log('err', JSON.stringify(err));
    handleError(res, ApiErrors.ErrorDeleteCategory(err), session.accessToken);
  }
};

// Tasks

const getTasks = async (db, req, res, session) => {
  const limit = (req.query.limit !== undefined) && parseInt(req.query.limit, 10);
  const skip = (req.query.skip !== undefined) && parseInt(req.query.skip, 10);
  const completed = (req.query.completed === 'true');
  const categoriesId = (req.query.categoriesId !== undefined) && req.query.categoriesId.split(',');
  try {
    const tasks = await Task.GetAllAsync(
      db, session.userId, limit, skip, completed, categoriesId,
    );
    handleResponse(res, tasks, session.accessToken);
  } catch (err) {
    console.log('err', JSON.stringify(err));
    handleError(res, ApiErrors.ErrorReadTask(err), session.accessToken);
  }
};

const insertTask = async (db, req, res, session) => {
  const { body } = req;
  const task = Task.CreateFromBodyRequest(body, session.userId);
  if (task === undefined) {
    handleError(res, ApiErrors.InvalidTaskParameters(), 400, session.accessToken);
    return;
  }
  try {
    const result = await Task.InsertAsync(db, task);
    if (result.insertedId !== undefined) {
      handleResponse(res, { ...task, id: result.insertedId }, session.accessToken);
    } else {
      handleError(res, ApiErrors.ErrorInsertTask(), session.accessToken);
    }
  } catch (err) {
    console.log('err', JSON.stringify(err));
    handleError(res, ApiErrors.ErrorInsertTask(err), session.accessToken);
  }
};

const deleteTask = async (db, req, res, session) => {
  const { id } = req.params;
  if (id === undefined || id.toString() === '') {
    handleError(res, ApiErrors.InvalidTaskId(), 400, session.accessToken);
    return;
  }
  try {
    const result = await Task.DeleteAsync(
      db, session.userId, id,
    );
    if (result.deletedCount >= 1) {
      handleResponse(res, { }, session.accessToken);
    } else {
      handleError(res, ApiErrors.ErrorDeleteTask(), session.accessToken);
    }
  } catch (err) {
    console.log('err', JSON.stringify(err));
    handleError(res, ApiErrors.ErrorDeleteTask(err), session.accessToken);
  }
};

const updateTask = async (db, req, res, session) => {
  const { body } = req;
  const { id, ...other } = body;
  if (id === undefined) {
    handleError(res, ApiErrors.InvalidTaskParameters(), 400, session.accessToken);
    return;
  }
  try {
    const result = await Task.UpdateAsync(db, id, { ...other });
    if (!result !== undefined && result.ok === 1) {
      handleResponse(res,
        { ...Task.CreateFromDocument(result.value), ...other }, session.accessToken);
    } else {
      handleError(res, ApiErrors.ErrorUpdateTask(), session.accessToken);
    }
  } catch (err) {
    console.log('err', JSON.stringify(err));
    handleError(res, ApiErrors.ErrorUpdateTask(err), session.accessToken);
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
