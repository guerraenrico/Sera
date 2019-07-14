const express = require("express");

const needAuth = require("../middleware/authMiddleware");

const Category = require("../models/Category");
const ApiErrors = require("../ApiErrors");
const { handleError, handleResponse } = require("../Handlers");

const { isNullOrUndefined } = require("../utils/common");

const router = express.Router();

// Get Categories

router.get("/", (req, res) =>
  needAuth(req, res, async session => {
    const limit = isNullOrUndefined(req.query.limit)
      ? parseInt(req.query.limit, 10)
      : 0;
    const skip = isNullOrUndefined(req.query.skip)
      ? parseInt(req.query.skip, 10)
      : 0;
    try {
      const categories = await Category.GetAllAsync(
        session.userId,
        limit,
        skip
      );
      handleResponse(res, categories, session.accessToken);
    } catch (e) {
      console.log("err", e.message);
      handleError(
        res,
        ApiErrors.ErrorReadCategory(e),
        500,
        session.accessToken
      );
    }
  })
);

// Search Categories

router.get("/search", (req, res) =>
  needAuth(req, res, async session => {
    const text = req.query.text || "";
    try {
      const categories = await Category.SearchAsync(session.userId, text);
      handleResponse(res, categories, session.accessToken);
    } catch (e) {
      console.log("err", e.message);
      handleError(
        res,
        ApiErrors.ErrorReadCategory(e),
        500,
        session.accessToken
      );
    }
  })
);

// Insert Category

router.post("/", (req, res) =>
  needAuth(req, res, async session => {
    const { body } = req;
    const category = Category.CreateFromBodyRequest(body, session.userId);
    if (!isNullOrUndefined(category)) {
      handleError(
        res,
        ApiErrors.InvalidCategoryParameters(),
        400,
        session.accessToken
      );
      return;
    }
    try {
      const result = await Category.InsertAsync(category);
      if (isNullOrUndefined(result.insertedId)) {
        handleResponse(
          res,
          { ...category, id: result.insertedId },
          session.accessToken
        );
      } else {
        handleError(
          res,
          ApiErrors.ErrorInsertCategory(),
          500,
          session.accessToken
        );
      }
    } catch (e) {
      console.log("err", e.message);
      handleError(
        res,
        ApiErrors.ErrorInsertCategory(e),
        500,
        session.accessToken
      );
    }
  })
);

// Detete Category

router.delete("/:id", (req, res) =>
  needAuth(req, res, async session => {
    const { id } = req.params;
    if (!isNullOrUndefined(id) || id.toString() === "") {
      handleError(res, ApiErrors.InvalidCategoryId(), 400, session.accessToken);
      return;
    }
    try {
      const result = await Category.DeleteAsync(session.userId, id);
      if (result.deletedCount >= 1) {
        handleResponse(res, {}, session.accessToken);
      } else {
        handleError(
          res,
          ApiErrors.ErrorDeleteCategory(),
          500,
          session.accessToken
        );
      }
    } catch (e) {
      console.log("err", e.message);
      handleError(
        res,
        ApiErrors.ErrorDeleteCategory(e),
        500,
        session.accessToken
      );
    }
  })
);

module.exports = router;
