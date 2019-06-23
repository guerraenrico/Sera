const express = require("express");

const connection = require("../middleware/dbConnectionMiddleware");
const needAuth = require("../middleware/authMiddleware");

const Category = require("../models/Category");
const ApiErrors = require("../ApiErrors");
const { handleError, handleResponse } = require("../Handlers");

const { isSet } = require("../utils/common");

const router = express.Router();

// Get Categories

router.get("/", (req, res) =>
  connection(db =>
    needAuth(db, req, res, async session => {
      const limit = isSet(req.query.limit) ? parseInt(req.query.limit, 10) : 0;
      const skip = isSet(req.query.skip) ? parseInt(req.query.skip, 10) : 0;
      try {
        const categories = await Category.GetAllAsync(
          db,
          session.userId,
          limit,
          skip
        );
        handleResponse(res, categories, session.accessToken);
      } catch (e) {
        console.log("err", e.message);
        handleError(res, ApiErrors.ErrorReadCategory(e), session.accessToken);
      }
    })
  )
);

// Search Categories

router.get("/search", (req, res) =>
  connection(db =>
    needAuth(db, req, res, async session => {
      const text = req.query.text || "";
      try {
        const categories = await Category.SearchAsync(db, session.userId, text);
        handleResponse(res, categories, session.accessToken);
      } catch (e) {
        console.log("err", e.message);
        handleError(res, ApiErrors.ErrorReadCategory(e), session.accessToken);
      }
    })
  )
);

// Insert Category

router.post("/", (req, res) =>
  connection(db =>
    needAuth(db, req, res, async session => {
      const { body } = req;
      const category = Category.CreateFromBodyRequest(body, session.userId);
      if (!isSet(category)) {
        handleError(
          res,
          ApiErrors.InvalidCategoryParameters(),
          400,
          session.accessToken
        );
        return;
      }
      try {
        const result = await Category.InsertAsync(db, category);
        if (isSet(result.insertedId)) {
          handleResponse(
            res,
            { ...category, id: result.insertedId },
            session.accessToken
          );
        } else {
          handleError(
            res,
            ApiErrors.ErrorInsertCategory(),
            session.accessToken
          );
        }
      } catch (e) {
        console.log("err", e.message);
        handleError(res, ApiErrors.ErrorInsertCategory(e), session.accessToken);
      }
    })
  )
);

// Detete Category

router.delete("/:id", (req, res) =>
  connection(db =>
    needAuth(db, req, res, async session => {
      const { id } = req.params;
      if (!isSet(id) || id.toString() === "") {
        handleError(
          res,
          ApiErrors.InvalidCategoryId(),
          400,
          session.accessToken
        );
        return;
      }
      try {
        const result = await Category.DeleteAsync(db, session.userId, id);
        if (result.deletedCount >= 1) {
          handleResponse(res, {}, session.accessToken);
        } else {
          handleError(
            res,
            ApiErrors.ErrorDeleteCategory(),
            session.accessToken
          );
        }
      } catch (e) {
        console.log("err", e.message);
        handleError(res, ApiErrors.ErrorDeleteCategory(e), session.accessToken);
      }
    })
  )
);

module.exports = router;
