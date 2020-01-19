const express = require("express");

const needAuth = require("../middleware/authMiddleware");
const { catchErrors, errorHandler } = require("../middleware//errorMiddleware");

const Category = require("../models/Category");

const errorCodes = require("../constants/errorCodes");
const ApiError = require("../error/ApiError");
const ApiResponse = require("../ApiResponse");
const BadRequestError = require("../error/BadRequestError");

const { isNullOrUndefined } = require("../utils/common");

const router = express.Router();

// Get Categories

router.get(
  "/",
  needAuth,
  catchErrors(async (req, res) => {
    const { session } = res.locals;
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
      res.status(200).json(ApiResponse.success(categories));
    } catch (e) {
      throw new ApiError(errorCodes.ERROR_READ_CATEGORY, e.message);
    }
  })
);

// Search Categories

router.get(
  "/search",
  needAuth,
  catchErrors(async (req, res) => {
    const { session } = res.locals;
    const text = req.query.text || "";
    try {
      const categories = await Category.SearchAsync(session.userId, text);
      res.status(200).json(ApiResponse.success(categories));
    } catch (e) {
      throw new ApiError(errorCodes.ERROR_SEARCH_CATEGORY, e.message);
    }
  })
);

// Insert Category

router.post(
  "/",
  needAuth,
  catchErrors(async (req, res) => {
    const { body } = req;
    const { session } = res.locals;
    const category = Category.ParseFields(body);
    if (isNullOrUndefined(category)) {
      throw new BadRequestError(
        errorCodes.INVALID_CATEGORY_PARAMETERS,
        "Invalid param category"
      );
    }
    try {
      const result = await Category.InsertAsync(category, session.userId);
      if (!isNullOrUndefined(result.insertedId)) {
        res
          .status(200)
          .json(ApiResponse.success({ ...category, id: result.insertedId }));
      } else {
        throw new ApiError(
          errorCodes.ERROR_INSERT_CATEGORY,
          "Error insert category"
        );
      }
    } catch (e) {
      throw new ApiError(errorCodes.ERROR_INSERT_CATEGORY, e.message);
    }
  })
);

// Detete Category

router.delete(
  "/:id",
  needAuth,
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const { session } = res.locals;
    if (isNullOrUndefined(id) || id.toString() === "") {
      throw new BadRequestError(
        errorCodes.INVALID_CATEGORY_PARAMETERS,
        "Missing param id"
      );
    }
    try {
      const result = await Category.DeleteAsync(session.userId, id);
      if (result.deletedCount >= 1) {
        res.status(200);
      } else {
        throw new ApiError(
          errorCodes.ERROR_DELETE_CATEGORY,
          "Error delete category"
        );
      }
    } catch (e) {
      throw new ApiError(errorCodes.ERROR_DELETE_CATEGORY, e.message);
    }
  })
);

router.use(errorHandler);

module.exports = router;
