const express = require('express');

const connection = require('../middleware/dbConnectionMiddleware');
const needAuth = require('../middleware/authMiddleware');

const Category = require('../models/Category');
const ApiErrors = require('../ApiErrors');
const { handleError, handleResponse } = require('../Handlers');

const router = express.Router();

// Get Categories

router.get('/', (req, res) => connection(db => needAuth(db, req, res, async (session) => {
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
})));

// Insert Category

router.post('/', (req, res) => connection(db => needAuth(db, req, res, async (session) => {
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
})));

// Detete Category

router.delete('/:id', (req, res) => connection(db => needAuth(db, req, res, async (session) => {
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
})));

module.exports = router;
