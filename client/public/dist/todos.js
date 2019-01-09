(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["todos"],{

/***/ "./src/actions/todoFiltersActions.js":
/*!*******************************************!*\
  !*** ./src/actions/todoFiltersActions.js ***!
  \*******************************************/
/*! exports provided: fetchAllCategories, deleteCategory, addCategory, changeVisibility, selectCategory, selectCategoryAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchAllCategories", function() { return fetchAllCategories; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteCategory", function() { return deleteCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCategory", function() { return addCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeVisibility", function() { return changeVisibility; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCategory", function() { return selectCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCategoryAll", function() { return selectCategoryAll; });
/* harmony import */ var _utils_ApiUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ApiUtils */ "./src/utils/ApiUtils.js");
/* harmony import */ var _utils_RequestUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/RequestUtils */ "./src/utils/RequestUtils.js");
/* harmony import */ var _authActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./authActions */ "./src/actions/authActions.js");
/* harmony import */ var _constants_actionTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/actionTypes */ "./src/constants/actionTypes.js");
/* harmony import */ var _constants_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/config */ "./src/constants/config.js");
/* harmony import */ var _todoTasksActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./todoTasksActions */ "./src/actions/todoTasksActions.js");
/* harmony import */ var _messageActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./messageActions */ "./src/actions/messageActions.js");
/* harmony import */ var _selectors_todoFiltersSelectors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../selectors/todoFiltersSelectors */ "./src/selectors/todoFiltersSelectors.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }










var fetchTasks = function fetchTasks(state) {
  return Object(_todoTasksActions__WEBPACK_IMPORTED_MODULE_5__["fetchTasksByCategory"])(Object(_selectors_todoFiltersSelectors__WEBPACK_IMPORTED_MODULE_7__["getSelectedCategoriesId"])(state), Object(_selectors_todoFiltersSelectors__WEBPACK_IMPORTED_MODULE_7__["visibilityOnlyCompleted"])(state));
};

var requestFetchAllCategories = function requestFetchAllCategories() {
  return {
    type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_3__["REQUEST_FETCH_ALL_CATEGORIES"]
  };
};

var receiveFetchAllCategories = function receiveFetchAllCategories(categories) {
  return {
    type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_3__["RECEIVE_FETCH_ALL_CATEGORIES"],
    categories: categories
  };
};

var errorFetchAllCategories = function errorFetchAllCategories(error) {
  return {
    type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_3__["ERROR_FETCH_ALL_CATEGORIES"],
    error: error
  };
};

var addCategoryLocal = function addCategoryLocal(category) {
  return {
    type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_3__["ADD_CATEGORY_LOCAL"],
    category: category
  };
};

var removeCategoryLocal = function removeCategoryLocal(categoryIndex) {
  return {
    type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_3__["REMOVE_CATEGORY_LOCAL"],
    categoryIndex: categoryIndex
  };
};

var toogleSelectCategory = function toogleSelectCategory(selectedCategory) {
  return {
    type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_3__["TOOGLE_SELECT_CATEGORY"],
    selectedCategory: selectedCategory
  };
};

var toogleSelectCategoryAll = function toogleSelectCategoryAll() {
  return {
    type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_3__["TOOGLE_SELECT_CATEGORY_ALL"]
  };
};

var switchVisibilityFilter = function switchVisibilityFilter(visibility) {
  return {
    type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_3__["SWITCH_VISIBILITY_FILTER"],
    visibility: visibility
  };
};

var fetchAllCategories = function fetchAllCategories() {
  var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants_config__WEBPACK_IMPORTED_MODULE_4__["queryItemsLimit"];
  var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(dispatch, getState) {
        var accessToken, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dispatch(requestFetchAllCategories());
                _context.prev = 1;
                accessToken = getState().auth.accessToken;
                _context.next = 5;
                return Object(_utils_ApiUtils__WEBPACK_IMPORTED_MODULE_0__["callApi"])('categories', {
                  limit: limit,
                  skip: skip
                }, _utils_ApiUtils__WEBPACK_IMPORTED_MODULE_0__["Methods"].GET, accessToken);

              case 5:
                response = _context.sent;

                if (!response.success) {
                  _context.next = 11;
                  break;
                }

                dispatch(receiveFetchAllCategories(response.data));
                dispatch(Object(_todoTasksActions__WEBPACK_IMPORTED_MODULE_5__["fetchTasksByCategory"])(Object(_selectors_todoFiltersSelectors__WEBPACK_IMPORTED_MODULE_7__["getSelectedCategoriesId"])(getState())));
                _context.next = 18;
                break;

              case 11:
                if (!Object(_utils_RequestUtils__WEBPACK_IMPORTED_MODULE_1__["shouldRefreshToken"])(response)) {
                  _context.next = 16;
                  break;
                }

                _context.next = 14;
                return dispatch(Object(_authActions__WEBPACK_IMPORTED_MODULE_2__["refreshAccessToken"])());

              case 14:
                dispatch(fetchAllCategories(limit, skip));
                return _context.abrupt("return");

              case 16:
                dispatch(errorFetchAllCategories(response.error.message));
                dispatch(Object(_messageActions__WEBPACK_IMPORTED_MODULE_6__["showMessageError"])(response.error.message));

              case 18:
                _context.next = 23;
                break;

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](1);
                dispatch(Object(_messageActions__WEBPACK_IMPORTED_MODULE_6__["showMessageError"])(_context.t0.message));

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 20]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};
var deleteCategory = function deleteCategory() {
  var categoryId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(dispatch, getState) {
        var accessToken, response, categories, categoryIndex;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                accessToken = getState().auth.accessToken;
                _context2.next = 4;
                return Object(_utils_ApiUtils__WEBPACK_IMPORTED_MODULE_0__["callApi"])('categories', categoryId, _utils_ApiUtils__WEBPACK_IMPORTED_MODULE_0__["Methods"].DELETE, accessToken);

              case 4:
                response = _context2.sent;

                if (!response.success) {
                  _context2.next = 11;
                  break;
                }

                categories = getState().todoFilters.categories;
                categoryIndex = categories.findIndex(function (category) {
                  return category.id === categoryId;
                });
                dispatch(removeCategoryLocal(categoryIndex));
                _context2.next = 17;
                break;

              case 11:
                if (!Object(_utils_RequestUtils__WEBPACK_IMPORTED_MODULE_1__["shouldRefreshToken"])(response)) {
                  _context2.next = 16;
                  break;
                }

                _context2.next = 14;
                return dispatch(Object(_authActions__WEBPACK_IMPORTED_MODULE_2__["refreshAccessToken"])());

              case 14:
                dispatch(deleteCategory(categoryId));
                return _context2.abrupt("return");

              case 16:
                dispatch(Object(_messageActions__WEBPACK_IMPORTED_MODULE_6__["showMessageError"])(response.error.message));

              case 17:
                _context2.next = 22;
                break;

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2["catch"](0);
                dispatch(Object(_messageActions__WEBPACK_IMPORTED_MODULE_6__["showMessageError"])(_context2.t0.message));

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 19]]);
      }));

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
};
/**
 * Request to add a category
 * @param {String} name category name to add
 * @param {Function} callback function that need to handle the category created
 */

var addCategory = function addCategory() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  return (
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(dispatch, getState) {
        var accessToken, response, category;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                accessToken = getState().auth.accessToken;
                _context3.next = 4;
                return Object(_utils_ApiUtils__WEBPACK_IMPORTED_MODULE_0__["callApi"])('categories', {
                  name: name
                }, _utils_ApiUtils__WEBPACK_IMPORTED_MODULE_0__["Methods"].POST, accessToken);

              case 4:
                response = _context3.sent;

                if (!response.success) {
                  _context3.next = 11;
                  break;
                }

                category = response.data;
                dispatch(addCategoryLocal(category));

                if (callback !== undefined) {
                  callback(category);
                }

                _context3.next = 17;
                break;

              case 11:
                if (!Object(_utils_RequestUtils__WEBPACK_IMPORTED_MODULE_1__["shouldRefreshToken"])(response)) {
                  _context3.next = 16;
                  break;
                }

                _context3.next = 14;
                return dispatch(Object(_authActions__WEBPACK_IMPORTED_MODULE_2__["refreshAccessToken"])());

              case 14:
                dispatch(addCategory(name, callback));
                return _context3.abrupt("return");

              case 16:
                dispatch(Object(_messageActions__WEBPACK_IMPORTED_MODULE_6__["showMessageError"])(response.error.message));

              case 17:
                _context3.next = 22;
                break;

              case 19:
                _context3.prev = 19;
                _context3.t0 = _context3["catch"](0);
                dispatch(Object(_messageActions__WEBPACK_IMPORTED_MODULE_6__["showMessageError"])(_context3.t0.message));

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 19]]);
      }));

      return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
};
var changeVisibility = function changeVisibility(visibility) {
  return function (dispatch, getState) {
    dispatch(switchVisibilityFilter(visibility));
    return dispatch(fetchTasks(getState()));
  };
};
var selectCategory = function selectCategory(selectedCategory) {
  return function (dispatch, getState) {
    dispatch(toogleSelectCategory(selectedCategory));
    return dispatch(fetchTasks(getState()));
  };
};
var selectCategoryAll = function selectCategoryAll() {
  return function (dispatch, getState) {
    dispatch(toogleSelectCategoryAll());
    return dispatch(fetchTasks(getState()));
  };
};

/***/ }),

/***/ "./src/actions/todoTasksActions.js":
/*!*****************************************!*\
  !*** ./src/actions/todoTasksActions.js ***!
  \*****************************************/
/*! exports provided: fetchTasksByCategory, deleteTask, addTask, toogleTaskCompleted */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTasksByCategory", function() { return fetchTasksByCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteTask", function() { return deleteTask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addTask", function() { return addTask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toogleTaskCompleted", function() { return toogleTaskCompleted; });
/* harmony import */ var _utils_ApiUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ApiUtils */ "./src/utils/ApiUtils.js");
/* harmony import */ var _utils_RequestUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/RequestUtils */ "./src/utils/RequestUtils.js");
/* harmony import */ var _authActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./authActions */ "./src/actions/authActions.js");
/* harmony import */ var _constants_actionTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/actionTypes */ "./src/constants/actionTypes.js");
/* harmony import */ var _constants_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/config */ "./src/constants/config.js");
/* harmony import */ var _messageActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./messageActions */ "./src/actions/messageActions.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }








var requestFetchTasks = function requestFetchTasks(limit, skip) {
  return {
    type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_3__["REQUEST_FETCH_TASKS"],
    limit: limit,
    skip: skip
  };
};

var receiveFetchTasks = function receiveFetchTasks(tasks) {
  return {
    type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_3__["RECEIVE_FETCH_TASKS"],
    tasks: tasks
  };
};

var errorFetchTasks = function errorFetchTasks(error) {
  return {
    type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_3__["ERROR_FETCH_TASKS"],
    error: error
  };
};

var addTaskLocal = function addTaskLocal(task) {
  return {
    type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_3__["ADD_TASK_LOCAL"],
    task: task
  };
};

var removeTaskLocal = function removeTaskLocal(taskIndex) {
  return {
    type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_3__["REMOVE_TASK_LOCAL"],
    taskIndex: taskIndex
  };
};

var updateTaskLocal = function updateTaskLocal(task) {
  return {
    type: _constants_actionTypes__WEBPACK_IMPORTED_MODULE_3__["UPDATE_TASK_LOCAL"],
    task: task
  };
};

var fetchTasksByCategory = function fetchTasksByCategory() {
  var categoriesId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var completed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants_config__WEBPACK_IMPORTED_MODULE_4__["queryItemsLimit"];
  var skip = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(dispatch, getState) {
        var accessToken, response, tasks;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dispatch(requestFetchTasks(limit, skip));
                _context.prev = 1;
                accessToken = getState().auth.accessToken;
                _context.next = 5;
                return Object(_utils_ApiUtils__WEBPACK_IMPORTED_MODULE_0__["callApi"])('tasks', {
                  categoriesId: categoriesId,
                  completed: completed,
                  limit: limit,
                  skip: skip
                }, _utils_ApiUtils__WEBPACK_IMPORTED_MODULE_0__["Methods"].GET, accessToken);

              case 5:
                response = _context.sent;

                if (!response.success) {
                  _context.next = 11;
                  break;
                }

                tasks = response.data.map(function (task) {
                  return _objectSpread({}, task, {
                    completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
                    todoWithin: task.todoWithin ? new Date(task.todoWithin) : undefined
                  });
                });
                dispatch(receiveFetchTasks(tasks));
                _context.next = 18;
                break;

              case 11:
                if (!Object(_utils_RequestUtils__WEBPACK_IMPORTED_MODULE_1__["shouldRefreshToken"])(response)) {
                  _context.next = 16;
                  break;
                }

                _context.next = 14;
                return dispatch(Object(_authActions__WEBPACK_IMPORTED_MODULE_2__["refreshAccessToken"])());

              case 14:
                dispatch(fetchTasksByCategory(categoriesId, completed, limit, skip));
                return _context.abrupt("return");

              case 16:
                dispatch(errorFetchTasks(response.error.message));
                dispatch(Object(_messageActions__WEBPACK_IMPORTED_MODULE_5__["showMessageError"])(response.error.message));

              case 18:
                _context.next = 23;
                break;

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](1);
                dispatch(Object(_messageActions__WEBPACK_IMPORTED_MODULE_5__["showMessageError"])(_context.t0.message));

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 20]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};
var deleteTask = function deleteTask() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(dispatch, getState) {
        var accessToken, response, items, todoArgumentIndex;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                accessToken = getState().auth.accessToken;
                _context2.next = 4;
                return Object(_utils_ApiUtils__WEBPACK_IMPORTED_MODULE_0__["callApi"])('tasks', id, _utils_ApiUtils__WEBPACK_IMPORTED_MODULE_0__["Methods"].DELETE, accessToken);

              case 4:
                response = _context2.sent;

                if (!response.success) {
                  _context2.next = 11;
                  break;
                }

                items = getState().todoTasks.items;
                todoArgumentIndex = items.findIndex(function (todoArgument) {
                  return todoArgument.id === id;
                });
                dispatch(removeTaskLocal(todoArgumentIndex));
                _context2.next = 17;
                break;

              case 11:
                if (!Object(_utils_RequestUtils__WEBPACK_IMPORTED_MODULE_1__["shouldRefreshToken"])(response)) {
                  _context2.next = 16;
                  break;
                }

                _context2.next = 14;
                return dispatch(Object(_authActions__WEBPACK_IMPORTED_MODULE_2__["refreshAccessToken"])());

              case 14:
                dispatch(deleteTask(id));
                return _context2.abrupt("return");

              case 16:
                dispatch(Object(_messageActions__WEBPACK_IMPORTED_MODULE_5__["showMessageError"])(response.error.message));

              case 17:
                _context2.next = 22;
                break;

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2["catch"](0);
                dispatch(Object(_messageActions__WEBPACK_IMPORTED_MODULE_5__["showMessageError"])(_context2.t0.message));

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 19]]);
      }));

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
};
var addTask = function addTask() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var description = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var category = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    id: ''
  };
  var todoWithin = arguments.length > 3 ? arguments[3] : undefined;
  var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
  return (
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(dispatch, getState) {
        var accessToken, response, fetchedTask, task;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                accessToken = getState().auth.accessToken;
                _context3.next = 4;
                return Object(_utils_ApiUtils__WEBPACK_IMPORTED_MODULE_0__["callApi"])('tasks', {
                  title: title,
                  description: description,
                  categoryId: category.id,
                  todoWithin: todoWithin
                }, _utils_ApiUtils__WEBPACK_IMPORTED_MODULE_0__["Methods"].POST, accessToken);

              case 4:
                response = _context3.sent;

                if (!response.success) {
                  _context3.next = 12;
                  break;
                }

                fetchedTask = response.data;
                task = _objectSpread({}, fetchedTask, {
                  completedAt: fetchedTask.completedAt ? new Date(fetchedTask.completedAt) : undefined,
                  todoWithin: fetchedTask.todoWithin ? new Date(fetchedTask.todoWithin) : undefined
                });
                dispatch(addTaskLocal(task));

                if (callback !== undefined) {
                  callback();
                }

                _context3.next = 18;
                break;

              case 12:
                if (!Object(_utils_RequestUtils__WEBPACK_IMPORTED_MODULE_1__["shouldRefreshToken"])(response)) {
                  _context3.next = 17;
                  break;
                }

                _context3.next = 15;
                return dispatch(Object(_authActions__WEBPACK_IMPORTED_MODULE_2__["refreshAccessToken"])());

              case 15:
                dispatch(addTask(title, description, category, todoWithin, callback));
                return _context3.abrupt("return");

              case 17:
                dispatch(Object(_messageActions__WEBPACK_IMPORTED_MODULE_5__["showMessageError"])(response.error.message));

              case 18:
                _context3.next = 23;
                break;

              case 20:
                _context3.prev = 20;
                _context3.t0 = _context3["catch"](0);
                dispatch(Object(_messageActions__WEBPACK_IMPORTED_MODULE_5__["showMessageError"])(_context3.t0.message));

              case 23:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 20]]);
      }));

      return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
};
var toogleTaskCompleted = function toogleTaskCompleted() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var isCompleted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return (
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(dispatch, getState) {
        var completed, completedAt, accessToken, response, fetchedTask, task;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                completed = !isCompleted;
                completedAt = completed ? new Date() : null;
                _context4.prev = 2;
                accessToken = getState().auth.accessToken;
                _context4.next = 6;
                return Object(_utils_ApiUtils__WEBPACK_IMPORTED_MODULE_0__["callApi"])('tasks', {
                  id: id,
                  completed: completed,
                  completedAt: completedAt
                }, _utils_ApiUtils__WEBPACK_IMPORTED_MODULE_0__["Methods"].PATCH, accessToken);

              case 6:
                response = _context4.sent;

                if (!response.success) {
                  _context4.next = 13;
                  break;
                }

                fetchedTask = response.data;
                task = _objectSpread({}, fetchedTask, {
                  completedAt: fetchedTask.completedAt ? new Date(fetchedTask.completedAt) : undefined
                });
                dispatch(updateTaskLocal(task));
                _context4.next = 19;
                break;

              case 13:
                if (!Object(_utils_RequestUtils__WEBPACK_IMPORTED_MODULE_1__["shouldRefreshToken"])(response)) {
                  _context4.next = 18;
                  break;
                }

                _context4.next = 16;
                return dispatch(Object(_authActions__WEBPACK_IMPORTED_MODULE_2__["refreshAccessToken"])());

              case 16:
                dispatch(toogleTaskCompleted(id, isCompleted));
                return _context4.abrupt("return");

              case 18:
                dispatch(Object(_messageActions__WEBPACK_IMPORTED_MODULE_5__["showMessageError"])(response.error.message));

              case 19:
                _context4.next = 24;
                break;

              case 21:
                _context4.prev = 21;
                _context4.t0 = _context4["catch"](2);
                dispatch(Object(_messageActions__WEBPACK_IMPORTED_MODULE_5__["showMessageError"])(_context4.t0.message));

              case 24:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 21]]);
      }));

      return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
      };
    }()
  );
};

/***/ }),

/***/ "./src/components/anims/Collapse.jsx":
/*!*******************************************!*\
  !*** ./src/components/anims/Collapse.jsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/index.js");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_transition_group__WEBPACK_IMPORTED_MODULE_2__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var duration = 300;
var defaultStyle = {
  transition: "height ".concat(duration, "ms ease-in-out"),
  height: 0
};

var onEnter = function onEnter(node) {
  var style = node.style;
  style.height = "".concat(node.firstElementChild.offsetHeight, "px");
};

var onExit = function onExit(node) {
  var style = node.style;
  style.height = '0px';
};

var Collapse = function Collapse(_ref) {
  var inProp = _ref.in,
      children = _ref.children;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_2__["Transition"], {
    onEnter: onEnter,
    onExit: onExit,
    in: inProp,
    timeout: duration
  }, function () {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: _objectSpread({}, defaultStyle)
    }, children);
  });
};

Collapse.propTypes = {
  in: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Collapse);

/***/ }),

/***/ "./src/components/anims/DialogAnim.jsx":
/*!*********************************************!*\
  !*** ./src/components/anims/DialogAnim.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/index.js");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_transition_group__WEBPACK_IMPORTED_MODULE_2__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var duration = 250;
var defaultStyle = {
  transition: "all ".concat(duration, "ms ease-in-out"),
  height: '0px',
  opacity: '0',
  visibility: 'hidden'
};
var transitionStyles = {
  entering: {
    height: '0px',
    opacity: '0',
    visibility: 'hidden'
  },
  entered: {
    display: 'block',
    height: '100vh',
    opacity: '1',
    visibility: 'visible'
  }
};

var DialogAnim = function DialogAnim(_ref) {
  var inProp = _ref.in,
      children = _ref.children;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_2__["Transition"], {
    in: inProp,
    timeout: duration
  }, function (state) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "backdrop-dialog",
      style: _objectSpread({}, defaultStyle, transitionStyles[state])
    }, children);
  });
};

DialogAnim.propTypes = {
  in: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (DialogAnim);

/***/ }),

/***/ "./src/components/anims/Resize.jsx":
/*!*****************************************!*\
  !*** ./src/components/anims/Resize.jsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/index.js");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_transition_group__WEBPACK_IMPORTED_MODULE_2__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




var duration = {
  enter: 300,
  exit: 200
};
var defaultStyle = {
  transition: "all ".concat(duration.enter, "ms ease-in-out"),
  height: 0,
  opacity: 0
};

var onEnter = function onEnter(node) {
  var style = node.style;
  style.height = "".concat(node.firstElementChild.offsetHeight, "px");
  style.opacity = 1;
};

var onEntered = function onEntered(node) {
  var style = node.style;
  style.height = 'auto';
};

var onExit = function onExit(node) {
  var style = node.style;
  style.height = "".concat(node.firstElementChild.offsetHeight, "px");
};

var onExited = function onExited(node) {
  var style = node.style;
  style.height = '0px';
  style.opacity = 0;
};

var Resize = function Resize(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_2__["Transition"], _extends({}, props, {
    onEnter: onEnter,
    onEntered: onEntered,
    onExit: onExit,
    onExited: onExited,
    timeout: duration
  }), function () {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: _objectSpread({}, defaultStyle)
    }, children);
  });
};

Resize.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Resize);

/***/ }),

/***/ "./src/components/anims/SnackbarAnim.jsx":
/*!***********************************************!*\
  !*** ./src/components/anims/SnackbarAnim.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/index.js");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_transition_group__WEBPACK_IMPORTED_MODULE_2__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var duration = 250;
var defaultStyle = {
  transition: "all ".concat(duration, "ms ease-in-out"),
  bottom: '-100px'
};
var transitionStyles = {
  entering: {
    bottom: '-100px',
    visibility: 'hidden'
  },
  entered: {
    bottom: '0px',
    visibility: 'visible'
  }
};

var SnackbarAnim = function SnackbarAnim(_ref) {
  var inProp = _ref.in,
      children = _ref.children,
      customClass = _ref.customClass;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_2__["Transition"], {
    in: inProp,
    timeout: duration
  }, function (state) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "content-snackbar",
      style: _objectSpread({}, defaultStyle, transitionStyles[state]),
      className: customClass
    }, children);
  });
};

SnackbarAnim.propTypes = {
  in: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired,
  customClass: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
SnackbarAnim.defaultProps = {
  customClass: ''
};
/* harmony default export */ __webpack_exports__["default"] = (SnackbarAnim);

/***/ }),

/***/ "./src/components/layout/ButtonScoll.jsx":
/*!***********************************************!*\
  !*** ./src/components/layout/ButtonScoll.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);



var ButtonScroll = function ButtonScroll(_ref) {
  var onClick = _ref.onClick,
      direction = _ref.direction;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "button-scroll ".concat(direction),
    onClick: onClick
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: direction === 'left' ? 'icon-backward' : 'icon-forward'
  }));
};

ButtonScroll.propTypes = {
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  direction: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['left', 'right'])
};
ButtonScroll.defaultProps = {
  direction: 'left'
};
/* harmony default export */ __webpack_exports__["default"] = (ButtonScroll);

/***/ }),

/***/ "./src/components/layout/InfiniteScroll.jsx":
/*!**************************************************!*\
  !*** ./src/components/layout/InfiniteScroll.jsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var waitTime = 500;

var InfiniteScroll =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InfiniteScroll, _React$Component);

  function InfiniteScroll() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, InfiniteScroll);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InfiniteScroll)).call.apply(_getPrototypeOf2, [this].concat(_args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onScroll", function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        var _this$props = _this.props,
            args = _this$props.args,
            onScroll = _this$props.onScroll;
        onScroll.apply(void 0, _toConsumableArray(args));
      }
    });

    return _this;
  }

  _createClass(InfiniteScroll, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('scroll', Object(lodash__WEBPACK_IMPORTED_MODULE_2__["throttle"])(this.onScroll, waitTime), false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', Object(lodash__WEBPACK_IMPORTED_MODULE_2__["throttle"])(this.onScroll, waitTime), false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          className = _this$props2.className;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: className
      }, children);
    }
  }]);

  return InfiniteScroll;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

InfiniteScroll.propTypes = {
  args: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any),
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired,
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  onScroll: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
InfiniteScroll.defaultProps = {
  args: [],
  className: ''
};
/* harmony default export */ __webpack_exports__["default"] = (InfiniteScroll);

/***/ }),

/***/ "./src/components/layout/MainAddButton.jsx":
/*!*************************************************!*\
  !*** ./src/components/layout/MainAddButton.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);



var MainAddButton = function MainAddButton(_ref) {
  var onClick = _ref.onClick;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    id: "main-add-button",
    onClick: onClick
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "material-icons"
  }, "\uE145"));
};

MainAddButton.propTypes = {
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (MainAddButton);

/***/ }),

/***/ "./src/components/layout/Snackbar.jsx":
/*!********************************************!*\
  !*** ./src/components/layout/Snackbar.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _anims_SnackbarAnim__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../anims/SnackbarAnim */ "./src/components/anims/SnackbarAnim.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Action = function Action(_ref) {
  var onClick = _ref.onClick,
      text = _ref.text;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "button-action-snackbar",
    onClick: onClick
  }, text);
};

Action.propTypes = {
  text: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};

var Snackbar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Snackbar, _React$Component);

  function Snackbar() {
    _classCallCheck(this, Snackbar);

    return _possibleConstructorReturn(this, _getPrototypeOf(Snackbar).apply(this, arguments));
  }

  _createClass(Snackbar, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$props = this.props,
          onClose = _this$props.onClose,
          duration = _this$props.duration,
          show = _this$props.show;

      if (show) {
        setTimeout(function () {
          onClose();
        }, duration);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          message = _this$props2.message,
          isError = _this$props2.isError,
          actionText = _this$props2.actionText,
          actionClick = _this$props2.actionClick,
          show = _this$props2.show,
          verticalPostion = _this$props2.verticalPostion,
          horizontalPosition = _this$props2.horizontalPosition;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_anims_SnackbarAnim__WEBPACK_IMPORTED_MODULE_2__["default"], {
        in: show,
        customClass: "".concat(verticalPostion, " ").concat(horizontalPosition)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "snackbar ".concat(isError ? 'error' : '')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "snackbar-message"
      }, message), actionText !== '' && actionClick !== undefined && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Action, {
        onClick: actionClick,
        text: actionText
      })));
    }
  }]);

  return Snackbar;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Snackbar.propTypes = {
  show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
  message: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  duration: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  isError: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  actionText: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  actionClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  verticalPostion: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['top', 'bottom']),
  horizontalPosition: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['left', 'right'])
};
Snackbar.defaultProps = {
  duration: 5000,
  isError: false,
  actionText: '',
  actionClick: undefined,
  verticalPostion: 'bottom',
  horizontalPosition: 'right'
};
/* harmony default export */ __webpack_exports__["default"] = (Snackbar);

/***/ }),

/***/ "./src/components/todo/Todos.jsx":
/*!***************************************!*\
  !*** ./src/components/todo/Todos.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _layout_LoaderLinear__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../layout/LoaderLinear */ "./src/components/layout/LoaderLinear.jsx");
/* harmony import */ var _layout_MainAddButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../layout/MainAddButton */ "./src/components/layout/MainAddButton.jsx");
/* harmony import */ var _containers_CategoriesFilterContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../containers/CategoriesFilterContainer */ "./src/containers/CategoriesFilterContainer.jsx");
/* harmony import */ var _containers_VisibilityFilterContainer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../containers/VisibilityFilterContainer */ "./src/containers/VisibilityFilterContainer.jsx");
/* harmony import */ var _containers_TasksContainer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../containers/TasksContainer */ "./src/containers/TasksContainer.jsx");
/* harmony import */ var _dialogAdd_DialogAdd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dialogAdd/DialogAdd */ "./src/components/todo/dialogAdd/DialogAdd.jsx");
/* harmony import */ var _layout_Snackbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../layout/Snackbar */ "./src/components/layout/Snackbar.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var Todos =
/*#__PURE__*/
function (_Component) {
  _inherits(Todos, _Component);

  function Todos() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Todos);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Todos)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      isDialogAddOpen: false
    });

    return _this;
  }

  _createClass(Todos, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var initFetchAllCategories = this.props.initFetchAllCategories;
      initFetchAllCategories();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var isDialogAddOpen = this.state.isDialogAddOpen;
      var _this$props = this.props,
          message = _this$props.message,
          hideMessage = _this$props.hideMessage,
          showLoading = _this$props.showLoading;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content-app"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layout_LoaderLinear__WEBPACK_IMPORTED_MODULE_2__["default"], {
        show: showLoading
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "main-top-bar"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_CategoriesFilterContainer__WEBPACK_IMPORTED_MODULE_4__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_VisibilityFilterContainer__WEBPACK_IMPORTED_MODULE_5__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layout_MainAddButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
        onClick: function onClick() {
          return _this2.setState({
            isDialogAddOpen: true
          });
        }
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_TasksContainer__WEBPACK_IMPORTED_MODULE_6__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dialogAdd_DialogAdd__WEBPACK_IMPORTED_MODULE_7__["default"], {
        open: isDialogAddOpen,
        onClose: function onClose() {
          return _this2.setState({
            isDialogAddOpen: false
          });
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layout_Snackbar__WEBPACK_IMPORTED_MODULE_8__["default"], {
        show: message.show,
        isError: message.isError,
        message: message.text,
        onClose: function onClose() {
          return hideMessage();
        }
      }));
    }
  }]);

  return Todos;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

Todos.propTypes = {
  message: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
    isError: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
    text: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
  }).isRequired,
  hideMessage: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  initFetchAllCategories: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  showLoading: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Todos);

/***/ }),

/***/ "./src/components/todo/category/ButtonDeleteCategory.jsx":
/*!***************************************************************!*\
  !*** ./src/components/todo/category/ButtonDeleteCategory.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);



var ButtonDeleteCategory = function ButtonDeleteCategory(_ref) {
  var onClick = _ref.onClick;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "button-delete-category",
    onClick: onClick
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "icon-delete"
  }));
};

ButtonDeleteCategory.propTypes = {
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (ButtonDeleteCategory);

/***/ }),

/***/ "./src/components/todo/category/CategoriesFilter.jsx":
/*!***********************************************************!*\
  !*** ./src/components/todo/category/CategoriesFilter.jsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/index.js");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_transition_group__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var scroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scroll */ "./node_modules/scroll/index.js");
/* harmony import */ var scroll__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(scroll__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _layout_ButtonScoll__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../layout/ButtonScoll */ "./src/components/layout/ButtonScoll.jsx");
/* harmony import */ var _Category__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Category */ "./src/components/todo/category/Category.jsx");
/* harmony import */ var _anims_Fade__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../anims/Fade */ "./src/components/anims/Fade.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var CategoriesFilter =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CategoriesFilter, _React$Component);

  function CategoriesFilter() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CategoriesFilter);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CategoriesFilter)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "chips", undefined);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleLeftScrollClick", function () {
      if (_this.chips) {
        _this.moveChipsScroll(-_this.chips.clientWidth);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRightScrollClick", function () {
      if (_this.chips) {
        _this.moveChipsScroll(_this.chips.clientWidth);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "moveChipsScroll", function (delta) {
      if (_this.chips) {
        var nextScrollLeft = _this.chips.scrollLeft + delta;
        scroll__WEBPACK_IMPORTED_MODULE_3___default.a.left(_this.chips, nextScrollLeft);
      }
    });

    return _this;
  }

  _createClass(CategoriesFilter, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          categoryList = _this$props.categoryList,
          onDeleteCategory = _this$props.onDeleteCategory,
          onCilckCategory = _this$props.onCilckCategory;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "content-categories-filter"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layout_ButtonScoll__WEBPACK_IMPORTED_MODULE_4__["default"], {
        onClick: this.handleLeftScrollClick,
        direction: "left"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "categories-filter",
        ref: function ref(node) {
          _this2.chips = node;
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_2__["TransitionGroup"], {
        style: {
          display: 'inherit',
          paddingLeft: '1.25em',
          paddingRight: '1.25em'
        }
      }, categoryList.map(function (category) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_anims_Fade__WEBPACK_IMPORTED_MODULE_6__["default"], {
          key: category.id
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Category__WEBPACK_IMPORTED_MODULE_5__["default"], {
          key: category.id,
          category: category,
          selected: category.selected,
          onDelete: onDeleteCategory,
          onClick: onCilckCategory
        }));
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layout_ButtonScoll__WEBPACK_IMPORTED_MODULE_4__["default"], {
        onClick: this.handleRightScrollClick,
        direction: "right"
      }));
    }
  }]);

  return CategoriesFilter;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

CategoriesFilter.propTypes = {
  categoryList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    selected: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
    id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
  }).isRequired).isRequired,
  onDeleteCategory: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onCilckCategory: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
CategoriesFilter.defaultProps = {
  onDeleteCategory: undefined
};
/* harmony default export */ __webpack_exports__["default"] = (CategoriesFilter);

/***/ }),

/***/ "./src/components/todo/category/Category.jsx":
/*!***************************************************!*\
  !*** ./src/components/todo/category/Category.jsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ButtonDeleteCategory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ButtonDeleteCategory */ "./src/components/todo/category/ButtonDeleteCategory.jsx");




var Category = function Category(_ref) {
  var category = _ref.category,
      selected = _ref.selected,
      onClick = _ref.onClick,
      onDelete = _ref.onDelete;
  var cssClass = '';

  var onChipClick = function onChipClick(e) {
    onClick(category, e);
  };

  var onDeleteClick = function onDeleteClick() {
    onDelete(category);
  };

  if (selected) {
    cssClass = 'category-selected';
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "".concat(cssClass, " category-chip align-items-center"),
    onClick: onChipClick,
    role: "presentation"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "category-text"
  }, category.name), category.id !== '0' && onDelete !== undefined && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonDeleteCategory__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onClick: onDeleteClick
  }));
};

Category.propTypes = {
  onDelete: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  category: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
  }).isRequired,
  selected: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired
};
Category.defaultProps = {
  onDelete: undefined
};
/* harmony default export */ __webpack_exports__["default"] = (Category);

/***/ }),

/***/ "./src/components/todo/dialogAdd/AddCategory.jsx":
/*!*******************************************************!*\
  !*** ./src/components/todo/dialogAdd/AddCategory.jsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _constants_labels__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants/labels */ "./src/constants/labels.js");
/* harmony import */ var _constants_steps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../constants/steps */ "./src/constants/steps.js");
/* harmony import */ var _actions_todoFiltersActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../actions/todoFiltersActions */ "./src/actions/todoFiltersActions.js");
/* harmony import */ var _actions_messageActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../actions/messageActions */ "./src/actions/messageActions.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var AddCategory =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AddCategory, _React$Component);

  function AddCategory() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AddCategory);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AddCategory)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      name: ''
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onInputTextChange", function (e) {
      _this.setState({
        name: e.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onButtonAddClick", function () {
      var name = _this.state.name;
      var dispatch = _this.props.dispatch;

      if (name === '') {
        dispatch(Object(_actions_messageActions__WEBPACK_IMPORTED_MODULE_6__["showMessageInfo"])(_constants_labels__WEBPACK_IMPORTED_MODULE_3__["default"].msgNameRequired));
        return;
      }

      dispatch(Object(_actions_todoFiltersActions__WEBPACK_IMPORTED_MODULE_5__["addCategory"])(name, _this.onCategoryCreated));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onCategoryCreated", function (selectedCategory) {
      var onNext = _this.props.onNext;
      onNext({
        stepId: _constants_steps__WEBPACK_IMPORTED_MODULE_4__["ADD_TASK"],
        options: {
          selectedCategory: selectedCategory
        }
      });
    });

    return _this;
  }

  _createClass(AddCategory, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content-add-category"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, _constants_labels__WEBPACK_IMPORTED_MODULE_3__["default"].titleAddCategory), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "main-input",
        type: "text",
        placeholder: _constants_labels__WEBPACK_IMPORTED_MODULE_3__["default"].placeholderName,
        onChange: this.onInputTextChange
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "main-button",
        onClick: this.onButtonAddClick
      }, _constants_labels__WEBPACK_IMPORTED_MODULE_3__["default"].buttonAdd)));
    }
  }]);

  return AddCategory;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

AddCategory.propTypes = {
  dispatch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  onNext: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])()(AddCategory));

/***/ }),

/***/ "./src/components/todo/dialogAdd/AddTask.jsx":
/*!***************************************************!*\
  !*** ./src/components/todo/dialogAdd/AddTask.jsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _constants_labels__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants/labels */ "./src/constants/labels.js");
/* harmony import */ var _constants_steps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../constants/steps */ "./src/constants/steps.js");
/* harmony import */ var _actions_messageActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../actions/messageActions */ "./src/actions/messageActions.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var AddTask =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AddTask, _React$Component);

  function AddTask() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AddTask);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AddTask)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      title: '',
      description: ''
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onInputTextChange", function (name) {
      return function (e) {
        return _this.setState(_defineProperty({}, name, e.target.value));
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onButtonScheduleClick", function () {
      var _this$props = _this.props,
          options = _this$props.options,
          dispatch = _this$props.dispatch,
          onNext = _this$props.onNext;
      var _this$state = _this.state,
          title = _this$state.title,
          description = _this$state.description;
      var category = options.selectedCategory;

      if (title === '') {
        dispatch(Object(_actions_messageActions__WEBPACK_IMPORTED_MODULE_5__["showMessageInfo"])(_constants_labels__WEBPACK_IMPORTED_MODULE_3__["default"].msgTitleRequired));
        return;
      }

      onNext({
        stepId: _constants_steps__WEBPACK_IMPORTED_MODULE_4__["SELECT_COMPLETE_DATE"],
        options: {
          title: title,
          description: description,
          category: category
        }
      });
    });

    return _this;
  }

  _createClass(AddTask, [{
    key: "render",
    value: function render() {
      var selectedCategory = this.props.options.selectedCategory;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content-add-task"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, _constants_labels__WEBPACK_IMPORTED_MODULE_3__["default"].titleAddTask), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, _constants_labels__WEBPACK_IMPORTED_MODULE_3__["default"].labelForCategory, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "label-category-name"
      }, " ".concat(selectedCategory.name))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content-fields"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "main-input",
        type: "text",
        placeholder: _constants_labels__WEBPACK_IMPORTED_MODULE_3__["default"].placeHolderTitle,
        onChange: this.onInputTextChange('title')
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "main-input",
        type: "text",
        placeholder: _constants_labels__WEBPACK_IMPORTED_MODULE_3__["default"].placeHolderDescription,
        onChange: this.onInputTextChange('description')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "main-button",
        onClick: this.onButtonScheduleClick
      }, _constants_labels__WEBPACK_IMPORTED_MODULE_3__["default"].buttonSchedule)));
    }
  }]);

  return AddTask;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

AddTask.propTypes = {
  dispatch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  options: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    selectedCategory: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
      id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
      name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
    }).isRequired
  }).isRequired,
  onNext: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])()(AddTask));

/***/ }),

/***/ "./src/components/todo/dialogAdd/DialogAdd.jsx":
/*!*****************************************************!*\
  !*** ./src/components/todo/dialogAdd/DialogAdd.jsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _SelectActionAdd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SelectActionAdd */ "./src/components/todo/dialogAdd/SelectActionAdd.jsx");
/* harmony import */ var _AddCategory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AddCategory */ "./src/components/todo/dialogAdd/AddCategory.jsx");
/* harmony import */ var _SelectCategory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SelectCategory */ "./src/components/todo/dialogAdd/SelectCategory.jsx");
/* harmony import */ var _AddTask__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AddTask */ "./src/components/todo/dialogAdd/AddTask.jsx");
/* harmony import */ var _SelectCompleteDate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SelectCompleteDate */ "./src/components/todo/dialogAdd/SelectCompleteDate.jsx");
/* harmony import */ var _Done__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Done */ "./src/components/todo/dialogAdd/Done.jsx");
/* harmony import */ var _constants_steps__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../constants/steps */ "./src/constants/steps.js");
/* harmony import */ var _anims_ReplaceAnim__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../anims/ReplaceAnim */ "./src/components/anims/ReplaceAnim.jsx");
/* harmony import */ var _anims_DialogAnim__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../anims/DialogAnim */ "./src/components/anims/DialogAnim.jsx");
/* harmony import */ var _Steps__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Steps */ "./src/components/todo/dialogAdd/Steps.jsx");
/* harmony import */ var _constants_labels__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../constants/labels */ "./src/constants/labels.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }















var getContentToRender = function getContentToRender(steps, props) {
  if (steps.length === 0) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SelectActionAdd__WEBPACK_IMPORTED_MODULE_2__["default"], props);
  }

  var lastStep = steps[steps.length - 1];

  switch (lastStep.stepId) {
    case _constants_steps__WEBPACK_IMPORTED_MODULE_8__["SELECT_WANT_TO_ADD"]:
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SelectActionAdd__WEBPACK_IMPORTED_MODULE_2__["default"], props);

    case _constants_steps__WEBPACK_IMPORTED_MODULE_8__["ADD_CATEGORY"]:
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AddCategory__WEBPACK_IMPORTED_MODULE_3__["default"], props);

    case _constants_steps__WEBPACK_IMPORTED_MODULE_8__["ADD_TASK"]:
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AddTask__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({}, props, {
        options: lastStep.options
      }));

    case _constants_steps__WEBPACK_IMPORTED_MODULE_8__["SELECT_CATEGORY"]:
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SelectCategory__WEBPACK_IMPORTED_MODULE_4__["default"], props);

    case _constants_steps__WEBPACK_IMPORTED_MODULE_8__["SELECT_COMPLETE_DATE"]:
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SelectCompleteDate__WEBPACK_IMPORTED_MODULE_6__["default"], _extends({}, props, {
        options: lastStep.options
      }));

    case _constants_steps__WEBPACK_IMPORTED_MODULE_8__["DONE"]:
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Done__WEBPACK_IMPORTED_MODULE_7__["default"], props);

    default:
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SelectActionAdd__WEBPACK_IMPORTED_MODULE_2__["default"], props);
  }
};

var initalState = {
  nextSteps: [],
  steps: [{
    stepId: _constants_steps__WEBPACK_IMPORTED_MODULE_8__["SELECT_WANT_TO_ADD"],
    options: {}
  }],
  showStep: true
};

var DialogAdd =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DialogAdd, _React$Component);

  function DialogAdd() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DialogAdd);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DialogAdd)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", _objectSpread({}, initalState));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onBack", function () {
      var steps = _this.state.steps;
      var onClose = _this.props.onClose;
      var stepCount = steps.length;

      if (stepCount === 1) {
        // Returned to the first steps, close the dialog
        _this.setState(_objectSpread({}, initalState));

        onClose();
      } else {
        _this.setState({
          nextSteps: _toConsumableArray(steps.slice(0, steps.length - 1)),
          showStep: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onNext", function () {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        stepId: '',
        options: {}
      };
      var steps = _this.state.steps;

      _this.setState({
        nextSteps: [].concat(_toConsumableArray(steps), [_objectSpread({}, step, {
          complete: true
        })]),
        showStep: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onResetAndClose", function () {
      var onClose = _this.props.onClose;
      onClose();
      setTimeout(function () {
        _this.setState(_objectSpread({}, initalState));
      }, 500);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onAnimationEnd", function (node, done) {
      node.addEventListener('transitionend', function () {
        done();
        var _this$state = _this.state,
            nextSteps = _this$state.nextSteps,
            showStep = _this$state.showStep;

        if (showStep) {
          return;
        }

        _this.setState({
          steps: _toConsumableArray(nextSteps),
          showStep: true
        });
      }, false);
    });

    return _this;
  }

  _createClass(DialogAdd, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state,
          steps = _this$state2.steps,
          showStep = _this$state2.showStep;
      var _this$props = this.props,
          onClose = _this$props.onClose,
          open = _this$props.open;
      var onNext = this.onNext,
          onResetAndClose = this.onResetAndClose,
          onAnimationEnd = this.onAnimationEnd;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_anims_DialogAnim__WEBPACK_IMPORTED_MODULE_10__["default"], {
        in: open
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "dialog-add"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "dialog-header"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "main-close-button",
        onClick: function onClick() {
          return onClose();
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "material-icons"
      }, "\uE5CD"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "steps-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Steps__WEBPACK_IMPORTED_MODULE_11__["default"], {
        list: _constants_steps__WEBPACK_IMPORTED_MODULE_8__["stepList"],
        stepHistory: steps
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "dialog-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_anims_ReplaceAnim__WEBPACK_IMPORTED_MODULE_9__["default"], {
        in: showStep,
        endListener: onAnimationEnd
      }, getContentToRender(steps, {
        onNext: onNext,
        onClose: onResetAndClose
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "dialog-footer"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "back-button-dialog",
        className: "text-button",
        onClick: function onClick() {
          return _this2.onBack();
        }
      }, _constants_labels__WEBPACK_IMPORTED_MODULE_12__["default"].buttonBack))));
    }
  }]);

  return DialogAdd;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

DialogAdd.propTypes = {
  open: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (DialogAdd);

/***/ }),

/***/ "./src/components/todo/dialogAdd/Done.jsx":
/*!************************************************!*\
  !*** ./src/components/todo/dialogAdd/Done.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_labels__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../constants/labels */ "./src/constants/labels.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Done =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Done, _React$Component);

  function Done() {
    _classCallCheck(this, Done);

    return _possibleConstructorReturn(this, _getPrototypeOf(Done).apply(this, arguments));
  }

  _createClass(Done, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      setTimeout(function () {
        var onClose = _this.props.onClose;
        onClose();
      }, 3000);
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content-done-add"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, _constants_labels__WEBPACK_IMPORTED_MODULE_2__["default"].labelDone), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content-ic-done"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "./client/public/img/ic-done.svg",
        className: "ic-done",
        alt: "done icon"
      })));
    }
  }]);

  return Done;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Done.propTypes = {
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Done);

/***/ }),

/***/ "./src/components/todo/dialogAdd/SelectActionAdd.jsx":
/*!***********************************************************!*\
  !*** ./src/components/todo/dialogAdd/SelectActionAdd.jsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_steps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../constants/steps */ "./src/constants/steps.js");
/* harmony import */ var _constants_labels__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants/labels */ "./src/constants/labels.js");





var SelectActionAdd = function SelectActionAdd(_ref) {
  var onNext = _ref.onNext;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "content-select-action-add"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, _constants_labels__WEBPACK_IMPORTED_MODULE_3__["default"].titleAdd), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "item-select"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "select-title",
    onClick: function onClick() {
      return onNext({
        stepId: _constants_steps__WEBPACK_IMPORTED_MODULE_2__["ADD_CATEGORY"],
        options: {}
      });
    },
    role: "presentation"
  }, _constants_labels__WEBPACK_IMPORTED_MODULE_3__["default"].labelCategory)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "item-select"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "select-title",
    onClick: function onClick() {
      return onNext({
        stepId: _constants_steps__WEBPACK_IMPORTED_MODULE_2__["SELECT_CATEGORY"],
        options: {}
      });
    },
    role: "presentation"
  }, _constants_labels__WEBPACK_IMPORTED_MODULE_3__["default"].labelTask)));
};

SelectActionAdd.propTypes = {
  onNext: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (SelectActionAdd);

/***/ }),

/***/ "./src/components/todo/dialogAdd/SelectCategory.jsx":
/*!**********************************************************!*\
  !*** ./src/components/todo/dialogAdd/SelectCategory.jsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _constants_labels__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants/labels */ "./src/constants/labels.js");
/* harmony import */ var _category_Category__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../category/Category */ "./src/components/todo/category/Category.jsx");
/* harmony import */ var _constants_steps__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../constants/steps */ "./src/constants/steps.js");
/* harmony import */ var _actions_messageActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../actions/messageActions */ "./src/actions/messageActions.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var SelectCategory =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SelectCategory, _React$Component);

  function SelectCategory() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SelectCategory);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SelectCategory)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      selectedCategory: undefined
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onCategoryClick", function (category) {
      _this.setState({
        selectedCategory: category
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onButtonNextClick", function () {
      var selectedCategory = _this.state.selectedCategory;
      var _this$props = _this.props,
          onNext = _this$props.onNext,
          dispatch = _this$props.dispatch;

      if (selectedCategory === undefined) {
        dispatch(Object(_actions_messageActions__WEBPACK_IMPORTED_MODULE_6__["showMessageInfo"])(_constants_labels__WEBPACK_IMPORTED_MODULE_3__["default"].msgSelectCategory));
        return;
      }

      onNext({
        stepId: _constants_steps__WEBPACK_IMPORTED_MODULE_5__["ADD_TASK"],
        options: {
          selectedCategory: selectedCategory
        }
      });
    });

    return _this;
  }

  _createClass(SelectCategory, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var categoriesList = this.props.categoriesList;
      var selectedCategory = this.state.selectedCategory;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content-select-category"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, _constants_labels__WEBPACK_IMPORTED_MODULE_3__["default"].titleChooseCategory), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "content-categories"
      }, categoriesList.map(function (category) {
        return category.id !== '0' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_category_Category__WEBPACK_IMPORTED_MODULE_4__["default"], {
          key: category.id,
          category: category,
          selected: selectedCategory !== undefined && category.id === selectedCategory.id,
          onClick: _this2.onCategoryClick
        }) : undefined;
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "main-button",
        onClick: this.onButtonNextClick
      }, _constants_labels__WEBPACK_IMPORTED_MODULE_3__["default"].buttonNext)));
    }
  }]);

  return SelectCategory;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

SelectCategory.propTypes = {
  dispatch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  categoriesList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
  }).isRequired).isRequired,
  onNext: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};

var mapStateToProp = function mapStateToProp(state) {
  return {
    categoriesList: state.todoFilters.categories
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProp)(SelectCategory));

/***/ }),

/***/ "./src/components/todo/dialogAdd/SelectCompleteDate.jsx":
/*!**************************************************************!*\
  !*** ./src/components/todo/dialogAdd/SelectCompleteDate.jsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_date_picker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-date-picker */ "./node_modules/react-date-picker/dist/entry.js");
/* harmony import */ var react_date_picker__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_date_picker__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _constants_labels__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../constants/labels */ "./src/constants/labels.js");
/* harmony import */ var _constants_steps__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../constants/steps */ "./src/constants/steps.js");
/* harmony import */ var _actions_todoTasksActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../actions/todoTasksActions */ "./src/actions/todoTasksActions.js");
/* harmony import */ var _actions_messageActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../actions/messageActions */ "./src/actions/messageActions.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var SelectCompleteDate =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SelectCompleteDate, _React$Component);

  function SelectCompleteDate() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SelectCompleteDate);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SelectCompleteDate)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      todoWithin: new Date()
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onInputDateChange", function (date) {
      _this.setState({
        todoWithin: date
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onButtonAddClick", function () {
      var todoWithin = _this.state.todoWithin;
      var _this$props = _this.props,
          dispatch = _this$props.dispatch,
          options = _this$props.options;
      var title = options.title,
          description = options.description,
          category = options.category;

      if (!todoWithin || todoWithin === '') {
        dispatch(Object(_actions_messageActions__WEBPACK_IMPORTED_MODULE_7__["showMessageInfo"])(_constants_labels__WEBPACK_IMPORTED_MODULE_4__["default"].msgSelectDate));
        return;
      }

      dispatch(Object(_actions_todoTasksActions__WEBPACK_IMPORTED_MODULE_6__["addTask"])(title, description, category, todoWithin, _this.onTodoTaskCreated));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTodoTaskCreated", function () {
      var onNext = _this.props.onNext;
      onNext({
        stepId: _constants_steps__WEBPACK_IMPORTED_MODULE_5__["DONE"],
        options: {}
      });
    });

    return _this;
  }

  _createClass(SelectCompleteDate, [{
    key: "render",
    value: function render() {
      var todoWithin = this.state.todoWithin;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content-select-complete-date"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, _constants_labels__WEBPACK_IMPORTED_MODULE_4__["default"].titleTodoWithin), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content-input"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_date_picker__WEBPACK_IMPORTED_MODULE_3___default.a, {
        className: "main-input",
        calendarClassName: "dark-calendar",
        onChange: this.onInputDateChange,
        value: todoWithin,
        minDate: new Date(),
        locale: "en-US",
        clearIcon: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "icon-delete"
        }),
        calendarIcon: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "icon-calendar"
        })
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "main-button",
        onClick: this.onButtonAddClick
      }, _constants_labels__WEBPACK_IMPORTED_MODULE_4__["default"].buttonAdd)));
    }
  }]);

  return SelectCompleteDate;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

SelectCompleteDate.propTypes = {
  dispatch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  options: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    description: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    category: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
      id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
      name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
    }).isRequired
  }).isRequired,
  onNext: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])()(SelectCompleteDate));

/***/ }),

/***/ "./src/components/todo/dialogAdd/Steps.jsx":
/*!*************************************************!*\
  !*** ./src/components/todo/dialogAdd/Steps.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var Step = function Step(_ref) {
  var description = _ref.description,
      completed = _ref.completed,
      needLine = _ref.needLine;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "step-container"
  }, needLine && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "line ".concat(completed ? 'completed' : '')
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "step ".concat(completed ? 'completed' : '')
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "indicator"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "content-description"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, description))));
};

Step.propTypes = {
  description: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  completed: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
  needLine: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired
};

var Steps = function Steps(_ref2) {
  var list = _ref2.list,
      stepHistory = _ref2.stepHistory;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "steps-wrapper"
  }, list.map(function (item, i) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Step, _extends({
      key: item.id
    }, item, {
      completed: stepHistory.filter(function (sh) {
        return sh.stepId === item.id;
      }).length > 0,
      needLine: i > 0
    }));
  }));
};

Steps.propTypes = {
  list: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    description: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
  }).isRequired).isRequired,
  stepHistory: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    stepId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
  })).isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Steps);

/***/ }),

/***/ "./src/components/todo/task/ButtonCompleteTask.jsx":
/*!*********************************************************!*\
  !*** ./src/components/todo/task/ButtonCompleteTask.jsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);



var ButtonCompleteTask = function ButtonCompleteTask(_ref) {
  var onClick = _ref.onClick,
      completed = _ref.completed;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "button-complete-task ".concat(completed ? 'button-completed-task' : ''),
    onClick: onClick
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "icon-check"
  }));
};

ButtonCompleteTask.propTypes = {
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  completed: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};
ButtonCompleteTask.defaultProps = {
  completed: false
};
/* harmony default export */ __webpack_exports__["default"] = (ButtonCompleteTask);

/***/ }),

/***/ "./src/components/todo/task/ButtonDeleteTask.jsx":
/*!*******************************************************!*\
  !*** ./src/components/todo/task/ButtonDeleteTask.jsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);



var ButtonDeleteTask = function ButtonDeleteTask(_ref) {
  var onClick = _ref.onClick;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "button-delete-task",
    onClick: onClick
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "icon-delete"
  }));
};

ButtonDeleteTask.propTypes = {
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (ButtonDeleteTask);

/***/ }),

/***/ "./src/components/todo/task/Task.jsx":
/*!*******************************************!*\
  !*** ./src/components/todo/task/Task.jsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _anims_Collapse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../anims/Collapse */ "./src/components/anims/Collapse.jsx");
/* harmony import */ var _anims_Fade__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../anims/Fade */ "./src/components/anims/Fade.jsx");
/* harmony import */ var _ButtonCompleteTask__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ButtonCompleteTask */ "./src/components/todo/task/ButtonCompleteTask.jsx");
/* harmony import */ var _ButtonDeleteTask__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ButtonDeleteTask */ "./src/components/todo/task/ButtonDeleteTask.jsx");
/* harmony import */ var _utils_Common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/Common */ "./src/utils/Common.js");
/* harmony import */ var _constants_labels__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../constants/labels */ "./src/constants/labels.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var Task =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Task, _React$Component);

  function Task() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Task);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Task)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      collapsed: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTitleClick", function () {
      var collapsed = _this.state.collapsed;

      _this.setState({
        collapsed: !collapsed
      });
    });

    return _this;
  }

  _createClass(Task, [{
    key: "renderDate",
    value: function renderDate() {
      var task = this.props.task;

      if (task.completed) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          className: "complete-date"
        }, "".concat(_constants_labels__WEBPACK_IMPORTED_MODULE_7__["default"].labelPartialCompleted, " ").concat(task.completedAt ? Object(_utils_Common__WEBPACK_IMPORTED_MODULE_6__["toSimpleDateFormat"])(task.completedAt) : ''));
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "complete-within-date"
      }, "".concat(_constants_labels__WEBPACK_IMPORTED_MODULE_7__["default"].labelPartialToCompleted, " ").concat(task.todoWithin ? Object(_utils_Common__WEBPACK_IMPORTED_MODULE_6__["toSimpleDateFormat"])(task.todoWithin) : _constants_labels__WEBPACK_IMPORTED_MODULE_7__["default"].labelNotSet));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          task = _this$props.task,
          onDelete = _this$props.onDelete,
          onComplete = _this$props.onComplete;
      var collapsed = this.state.collapsed;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "task-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "task-header"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "task-title ".concat(task.completed ? 'task-title-completed' : ''),
        onClick: function onClick() {
          return _this2.onTitleClick();
        },
        role: "presentation"
      }, task.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_anims_Fade__WEBPACK_IMPORTED_MODULE_3__["default"], {
        in: collapsed
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonDeleteTask__WEBPACK_IMPORTED_MODULE_5__["default"], {
        onClick: onDelete
      })), onComplete !== undefined && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonCompleteTask__WEBPACK_IMPORTED_MODULE_4__["default"], {
        onClick: onComplete,
        completed: task.completed
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "task-date"
      }, this.renderDate()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_anims_Collapse__WEBPACK_IMPORTED_MODULE_2__["default"], {
        in: collapsed
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: task.description,
        className: "task-body"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "task-description"
      }, task.description !== undefined && task.description !== '' ? task.description : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "empty"
      }, _constants_labels__WEBPACK_IMPORTED_MODULE_7__["default"].labelNoDescription)))));
    }
  }]);

  return Task;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Task.propTypes = {
  onDelete: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onComplete: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  task: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    completed: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
    completedAt: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({})
  }).isRequired
};
Task.defaultProps = {
  onDelete: undefined,
  onComplete: undefined
};
/* harmony default export */ __webpack_exports__["default"] = (Task);

/***/ }),

/***/ "./src/components/todo/task/Tasks.jsx":
/*!********************************************!*\
  !*** ./src/components/todo/task/Tasks.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/index.js");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_transition_group__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _anims_Resize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../anims/Resize */ "./src/components/anims/Resize.jsx");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Task */ "./src/components/todo/task/Task.jsx");
/* harmony import */ var _layout_InfiniteScroll__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../layout/InfiniteScroll */ "./src/components/layout/InfiniteScroll.jsx");
/* harmony import */ var _constants_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../constants/config */ "./src/constants/config.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var initialState = {
  limit: _constants_config__WEBPACK_IMPORTED_MODULE_6__["queryItemsLimit"],
  skip: 0
};

var Tasks =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tasks, _React$Component);

  function Tasks() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tasks);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tasks)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", initialState);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onFetchTodoTasksNext", function () {
      var _this$props = _this.props,
          categoriesId = _this$props.categoriesId,
          completed = _this$props.completed,
          fetchTasks = _this$props.fetchTasks,
          moreToLoad = _this$props.moreToLoad;

      if (!moreToLoad) {
        return;
      }

      var _this$state = _this.state,
          limit = _this$state.limit,
          skip = _this$state.skip;
      var newSkip = skip + limit;
      fetchTasks(categoriesId, completed, limit, newSkip);

      _this.setState(function (state) {
        return {
          skip: state.skip + state.limit
        };
      });
    });

    return _this;
  }

  _createClass(Tasks, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          taskList = _this$props2.taskList,
          onDeleteTask = _this$props2.onDeleteTask,
          onCompleteTask = _this$props2.onCompleteTask;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "content-todo-tasks"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layout_InfiniteScroll__WEBPACK_IMPORTED_MODULE_5__["default"], {
        onScroll: this.onFetchTodoTasksNext
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_2__["TransitionGroup"], null, taskList.map(function (arg) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_anims_Resize__WEBPACK_IMPORTED_MODULE_3__["default"], {
          key: arg.id
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Task__WEBPACK_IMPORTED_MODULE_4__["default"], {
          key: arg.id,
          task: arg,
          onDelete: function onDelete() {
            return onDeleteTask(arg);
          },
          onComplete: function onComplete() {
            return onCompleteTask(arg);
          }
        }));
      }))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.skip !== prevState.skip) {
        return {
          skip: nextProps.skip
        };
      }

      return null;
    }
  }]);

  return Tasks;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Tasks.propTypes = {
  onDeleteTask: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  onCompleteTask: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  taskList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    completed: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired
  }).isRequired).isRequired,
  moreToLoad: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
  fetchTasks: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  categoriesId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string).isRequired,
  completed: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Tasks);

/***/ }),

/***/ "./src/components/todo/visibility/VisibilityFilters.jsx":
/*!**************************************************************!*\
  !*** ./src/components/todo/visibility/VisibilityFilters.jsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _VisibilitySwitch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VisibilitySwitch */ "./src/components/todo/visibility/VisibilitySwitch.jsx");
/* harmony import */ var _constants_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants/config */ "./src/constants/config.js");





var VisibilityFilter = function VisibilityFilter(_ref) {
  var selectedVisibilityFilter = _ref.selectedVisibilityFilter,
      onVisibilitySwitchClick = _ref.onVisibilitySwitchClick;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "visibility-filter-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VisibilitySwitch__WEBPACK_IMPORTED_MODULE_2__["default"], {
    selected: selectedVisibilityFilter === _constants_config__WEBPACK_IMPORTED_MODULE_3__["ONLY_TO_COMPLETE"] || selectedVisibilityFilter === _constants_config__WEBPACK_IMPORTED_MODULE_3__["ALL_TODOS"],
    onClick: onVisibilitySwitchClick(_constants_config__WEBPACK_IMPORTED_MODULE_3__["ONLY_TO_COMPLETE"]),
    role: "presentation"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "icon-circle-border"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VisibilitySwitch__WEBPACK_IMPORTED_MODULE_2__["default"], {
    selected: selectedVisibilityFilter === _constants_config__WEBPACK_IMPORTED_MODULE_3__["ONLY_COMPLETED"] || selectedVisibilityFilter === _constants_config__WEBPACK_IMPORTED_MODULE_3__["ALL_TODOS"],
    onClick: onVisibilitySwitchClick(_constants_config__WEBPACK_IMPORTED_MODULE_3__["ONLY_COMPLETED"]),
    role: "presentation"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "icon-circle"
  })));
};

VisibilityFilter.propTypes = {
  selectedVisibilityFilter: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  onVisibilitySwitchClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (VisibilityFilter);

/***/ }),

/***/ "./src/components/todo/visibility/VisibilitySwitch.jsx":
/*!*************************************************************!*\
  !*** ./src/components/todo/visibility/VisibilitySwitch.jsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);



var VisibilitySwitch = function VisibilitySwitch(_ref) {
  var selected = _ref.selected,
      children = _ref.children,
      onClick = _ref.onClick;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "visibility-button-switch align-items-center ".concat(selected ? 'selected' : '', " "),
    onClick: onClick,
    role: "presentation"
  }, children);
};

VisibilitySwitch.propTypes = {
  selected: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
VisibilitySwitch.defaultProps = {
  selected: false
};
/* harmony default export */ __webpack_exports__["default"] = (VisibilitySwitch);

/***/ }),

/***/ "./src/constants/labels.js":
/*!*********************************!*\
  !*** ./src/constants/labels.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var labels = {
  titleAdd: 'What would you like to add?',
  titleAddCategory: 'Add new CATEGORY',
  titleAddTask: 'Add new Task',
  titleChooseCategory: 'Choose a CATEGORY',
  titleTodoWithin: 'Todo Within',
  labelForCategory: 'for the category:',
  labelDone: 'Done!',
  labelCategory: 'CATEGORY',
  labelTask: 'TASK',
  labelNotSet: 'not set',
  labelNoDescription: 'No description to show :(',
  labelPartialCompleted: 'completed',
  labelPartialToCompleted: 'to complete within',
  placeHolderTitle: 'Type the title',
  placeHolderDescription: 'Type the description',
  placeholderName: 'Type the name',
  buttonSchedule: 'SCHEDULE',
  buttonAdd: 'ADD',
  buttonNext: 'NEXT',
  buttonBack: 'NEVER MIND, GO BACK',
  msgTitleRequired: 'Enter the title',
  msgNameRequired: 'Enter the name',
  msgSelectCategory: 'Select a category',
  msgSelectDate: 'Pick a date and commit. No excuses!',
  stepDescWantToAdd: 'What want to add',
  stepDescAddCategory: 'Add a category',
  stepDescrSelecCategory: 'Select a category',
  stepDescAddTask: 'Add task',
  stepDescCompleteDate: 'Schedule',
  stepDescDone: 'That\'s it'
};
/* harmony default export */ __webpack_exports__["default"] = (labels);

/***/ }),

/***/ "./src/constants/steps.js":
/*!********************************!*\
  !*** ./src/constants/steps.js ***!
  \********************************/
/*! exports provided: SELECT_WANT_TO_ADD, ADD_CATEGORY, ADD_TASK, SELECT_CATEGORY, SELECT_COMPLETE_DATE, DONE, stepList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SELECT_WANT_TO_ADD", function() { return SELECT_WANT_TO_ADD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_CATEGORY", function() { return ADD_CATEGORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_TASK", function() { return ADD_TASK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SELECT_CATEGORY", function() { return SELECT_CATEGORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SELECT_COMPLETE_DATE", function() { return SELECT_COMPLETE_DATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DONE", function() { return DONE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stepList", function() { return stepList; });
/* harmony import */ var _labels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./labels */ "./src/constants/labels.js");

var SELECT_WANT_TO_ADD = 'SELECT_WANT_TO_ADD';
var ADD_CATEGORY = 'ADD_CATEGORY';
var ADD_TASK = 'ADD_TASK';
var SELECT_CATEGORY = 'SELECT_CATEGORY';
var SELECT_COMPLETE_DATE = 'SELECT_COMPLETE_DATE';
var DONE = 'DONE';
var stepList = [{
  id: SELECT_WANT_TO_ADD,
  description: _labels__WEBPACK_IMPORTED_MODULE_0__["default"].stepDescWantToAdd
}, {
  id: ADD_CATEGORY,
  description: _labels__WEBPACK_IMPORTED_MODULE_0__["default"].stepDescAddCategory
}, {
  id: SELECT_CATEGORY,
  description: _labels__WEBPACK_IMPORTED_MODULE_0__["default"].stepDescrSelecCategory
}, {
  id: ADD_TASK,
  description: _labels__WEBPACK_IMPORTED_MODULE_0__["default"].stepDescAddTask
}, {
  id: SELECT_COMPLETE_DATE,
  description: _labels__WEBPACK_IMPORTED_MODULE_0__["default"].stepDescCompleteDate
}, {
  id: DONE,
  description: _labels__WEBPACK_IMPORTED_MODULE_0__["default"].stepDescDone
}];

/***/ }),

/***/ "./src/containers/CategoriesFilterContainer.jsx":
/*!******************************************************!*\
  !*** ./src/containers/CategoriesFilterContainer.jsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components_todo_category_CategoriesFilter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/todo/category/CategoriesFilter */ "./src/components/todo/category/CategoriesFilter.jsx");
/* harmony import */ var _actions_todoFiltersActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/todoFiltersActions */ "./src/actions/todoFiltersActions.js");
/* harmony import */ var _constants_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/config */ "./src/constants/config.js");
/* harmony import */ var _selectors_todoFiltersSelectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../selectors/todoFiltersSelectors */ "./src/selectors/todoFiltersSelectors.js");






var mapStateToProps = function mapStateToProps(state) {
  return {
    categoryList: Object(_selectors_todoFiltersSelectors__WEBPACK_IMPORTED_MODULE_4__["getCategoriesFilterList"])(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onDeleteCategory: function onDeleteCategory(category) {
      dispatch(Object(_actions_todoFiltersActions__WEBPACK_IMPORTED_MODULE_2__["deleteCategory"])(category.id));
    },
    onCilckCategory: function onCilckCategory(category, e) {
      if (e.target.tagName.toLowerCase() !== 'i' && e.target.tagName.toLowerCase() !== 'button') {
        if (category.id === _constants_config__WEBPACK_IMPORTED_MODULE_3__["default"].id) {
          dispatch(Object(_actions_todoFiltersActions__WEBPACK_IMPORTED_MODULE_2__["selectCategoryAll"])());
        } else {
          dispatch(Object(_actions_todoFiltersActions__WEBPACK_IMPORTED_MODULE_2__["selectCategory"])(category));
        }
      }
    }
  };
};

var CategoriesFilterContainer = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(_components_todo_category_CategoriesFilter__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (CategoriesFilterContainer);

/***/ }),

/***/ "./src/containers/TasksContainer.jsx":
/*!*******************************************!*\
  !*** ./src/containers/TasksContainer.jsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components_todo_task_Tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/todo/task/Tasks */ "./src/components/todo/task/Tasks.jsx");
/* harmony import */ var _actions_todoTasksActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/todoTasksActions */ "./src/actions/todoTasksActions.js");
/* harmony import */ var _selectors_todoTasksSelectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../selectors/todoTasksSelectors */ "./src/selectors/todoTasksSelectors.js");
/* harmony import */ var _selectors_todoFiltersSelectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../selectors/todoFiltersSelectors */ "./src/selectors/todoFiltersSelectors.js");






var mapStateToProps = function mapStateToProps(state) {
  return {
    taskList: Object(_selectors_todoTasksSelectors__WEBPACK_IMPORTED_MODULE_3__["getTaskList"])(state),
    skip: Object(_selectors_todoTasksSelectors__WEBPACK_IMPORTED_MODULE_3__["getSkip"])(state),
    moreToLoad: Object(_selectors_todoTasksSelectors__WEBPACK_IMPORTED_MODULE_3__["stillMoreToLoad"])(state),
    categoriesId: Object(_selectors_todoFiltersSelectors__WEBPACK_IMPORTED_MODULE_4__["getSelectedCategoriesId"])(state),
    completed: Object(_selectors_todoFiltersSelectors__WEBPACK_IMPORTED_MODULE_4__["visibilityOnlyCompleted"])(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onDeleteTask: function onDeleteTask(task) {
      dispatch(Object(_actions_todoTasksActions__WEBPACK_IMPORTED_MODULE_2__["deleteTask"])(task.id));
    },
    onCompleteTask: function onCompleteTask(task) {
      dispatch(Object(_actions_todoTasksActions__WEBPACK_IMPORTED_MODULE_2__["toogleTaskCompleted"])(task.id, task.completed));
    },
    fetchTasks: function fetchTasks(categoriesId, completed, limit, skip) {
      dispatch(Object(_actions_todoTasksActions__WEBPACK_IMPORTED_MODULE_2__["fetchTasksByCategory"])(categoriesId, completed, limit, skip));
    }
  };
};

var TasksContainer = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(_components_todo_task_Tasks__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (TasksContainer);

/***/ }),

/***/ "./src/containers/TodosContainer.jsx":
/*!*******************************************!*\
  !*** ./src/containers/TodosContainer.jsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components_todo_Todos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/todo/Todos */ "./src/components/todo/Todos.jsx");
/* harmony import */ var _actions_todoFiltersActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/todoFiltersActions */ "./src/actions/todoFiltersActions.js");
/* harmony import */ var _actions_messageActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions/messageActions */ "./src/actions/messageActions.js");
/* harmony import */ var _selectors_commonSelectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../selectors/commonSelectors */ "./src/selectors/commonSelectors.js");







var TodosContainer = function TodosContainer(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_todo_Todos__WEBPACK_IMPORTED_MODULE_2__["default"], props);
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    message: state.message,
    showLoading: Object(_selectors_commonSelectors__WEBPACK_IMPORTED_MODULE_5__["showLoading"])(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    hideMessage: function hideMessage() {
      dispatch(Object(_actions_messageActions__WEBPACK_IMPORTED_MODULE_4__["hideMessage"])());
    },
    initFetchAllCategories: function initFetchAllCategories() {
      dispatch(Object(_actions_todoFiltersActions__WEBPACK_IMPORTED_MODULE_3__["fetchAllCategories"])());
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(TodosContainer));

/***/ }),

/***/ "./src/containers/VisibilityFilterContainer.jsx":
/*!******************************************************!*\
  !*** ./src/containers/VisibilityFilterContainer.jsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components_todo_visibility_VisibilityFilters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/todo/visibility/VisibilityFilters */ "./src/components/todo/visibility/VisibilityFilters.jsx");
/* harmony import */ var _actions_todoFiltersActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/todoFiltersActions */ "./src/actions/todoFiltersActions.js");
/* harmony import */ var _selectors_todoFiltersSelectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../selectors/todoFiltersSelectors */ "./src/selectors/todoFiltersSelectors.js");





var mapStateToProps = function mapStateToProps(state) {
  return {
    selectedVisibilityFilter: Object(_selectors_todoFiltersSelectors__WEBPACK_IMPORTED_MODULE_3__["getVisibilityFilter"])(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onVisibilitySwitchClick: function onVisibilitySwitchClick(visibility) {
      return function () {
        return dispatch(Object(_actions_todoFiltersActions__WEBPACK_IMPORTED_MODULE_2__["changeVisibility"])(visibility));
      };
    }
  };
};

var VisibilityFilterContainer = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(_components_todo_visibility_VisibilityFilters__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (VisibilityFilterContainer);

/***/ }),

/***/ "./src/selectors/commonSelectors.js":
/*!******************************************!*\
  !*** ./src/selectors/commonSelectors.js ***!
  \******************************************/
/*! exports provided: showLoading, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showLoading", function() { return showLoading; });
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reselect */ "./node_modules/reselect/lib/index.js");
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reselect__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _todoFiltersSelectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todoFiltersSelectors */ "./src/selectors/todoFiltersSelectors.js");
/* harmony import */ var _todoTasksSelectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todoTasksSelectors */ "./src/selectors/todoTasksSelectors.js");



var showLoading = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_todoFiltersSelectors__WEBPACK_IMPORTED_MODULE_1__["isFetchingCategoriesFilter"], _todoTasksSelectors__WEBPACK_IMPORTED_MODULE_2__["isFetchingTasks"], function (isFetchingCategories, isFetchingTodos) {
  return isFetchingCategories || isFetchingTodos;
});
/* harmony default export */ __webpack_exports__["default"] = (showLoading);

/***/ }),

/***/ "./src/selectors/todoFiltersSelectors.js":
/*!***********************************************!*\
  !*** ./src/selectors/todoFiltersSelectors.js ***!
  \***********************************************/
/*! exports provided: isFetchingCategoriesFilter, getTodoFilters, getCategoriesFilterList, getVisibilityFilter, visibilityOnlyCompleted, getSelectedCategoriesFilter, getSelectedCategoriesId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFetchingCategoriesFilter", function() { return isFetchingCategoriesFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTodoFilters", function() { return getTodoFilters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCategoriesFilterList", function() { return getCategoriesFilterList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVisibilityFilter", function() { return getVisibilityFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visibilityOnlyCompleted", function() { return visibilityOnlyCompleted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelectedCategoriesFilter", function() { return getSelectedCategoriesFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelectedCategoriesId", function() { return getSelectedCategoriesId; });
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reselect */ "./node_modules/reselect/lib/index.js");
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reselect__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/config */ "./src/constants/config.js");


var isFetchingCategoriesFilter = function isFetchingCategoriesFilter(state) {
  return state.todoFilters.isFetching;
};
var getTodoFilters = function getTodoFilters(state) {
  return state.todoFilters;
};
var getCategoriesFilterList = function getCategoriesFilterList(state) {
  return state.todoFilters.categories;
};
var getVisibilityFilter = function getVisibilityFilter(state) {
  return state.todoFilters.visibility;
};
var visibilityOnlyCompleted = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(getVisibilityFilter, function (visibility) {
  return visibility === _constants_config__WEBPACK_IMPORTED_MODULE_1__["ONLY_COMPLETED"];
});
var getSelectedCategoriesFilter = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(getCategoriesFilterList, function (categories) {
  return categories.filter(function (category) {
    return category.selected;
  });
});
var getSelectedCategoriesId = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(getCategoriesFilterList, function (categories) {
  return categories.filter(function (category) {
    return category.selected;
  }).map(function (categoryFilter) {
    return categoryFilter.id;
  });
});

/***/ }),

/***/ "./src/selectors/todoTasksSelectors.js":
/*!*********************************************!*\
  !*** ./src/selectors/todoTasksSelectors.js ***!
  \*********************************************/
/*! exports provided: isFetchingTasks, getTasks, getTaskList, getSkip, stillMoreToLoad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFetchingTasks", function() { return isFetchingTasks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTasks", function() { return getTasks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTaskList", function() { return getTaskList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSkip", function() { return getSkip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stillMoreToLoad", function() { return stillMoreToLoad; });
var isFetchingTasks = function isFetchingTasks(state) {
  return state.todoTasks.isFetching;
};
var getTasks = function getTasks(state) {
  return state.todoTasks;
};
var getTaskList = function getTaskList(state) {
  return state.todoTasks.items;
};
var getSkip = function getSkip(state) {
  return state.todoTasks.skip;
};
var stillMoreToLoad = function stillMoreToLoad(state) {
  return state.todoTasks.moreToLoad;
};

/***/ }),

/***/ "./src/utils/Common.js":
/*!*****************************!*\
  !*** ./src/utils/Common.js ***!
  \*****************************/
/*! exports provided: toJsDate, toSimpleDateFormat, getCurrentBaseUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toJsDate", function() { return toJsDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toSimpleDateFormat", function() { return toSimpleDateFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentBaseUrl", function() { return getCurrentBaseUrl; });
/* harmony import */ var dateformat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dateformat */ "./node_modules/dateformat/lib/dateformat.js");
/* harmony import */ var dateformat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dateformat__WEBPACK_IMPORTED_MODULE_0__);

var toJsDate = function toJsDate() {
  var parseDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return new Date(parseInt(parseDate.substr(6), 10));
};
var toSimpleDateFormat = function toSimpleDateFormat(date) {
  return dateformat__WEBPACK_IMPORTED_MODULE_0___default()(date, 'dddd dd mmm yyyy');
};
var getCurrentBaseUrl = function getCurrentBaseUrl() {
  var getUrl = window.location;
  return "".concat(getUrl.protocol, "//").concat(getUrl.host);
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMvdG9kb1Rhc2tzQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9Db2xsYXBzZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvRGlhbG9nQW5pbS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvUmVzaXplLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9TbmFja2JhckFuaW0uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2xheW91dC9CdXR0b25TY29sbC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGF5b3V0L0luZmluaXRlU2Nyb2xsLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9sYXlvdXQvTWFpbkFkZEJ1dHRvbi5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGF5b3V0L1NuYWNrYmFyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL1RvZG9zLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL2NhdGVnb3J5L0J1dHRvbkRlbGV0ZUNhdGVnb3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL2NhdGVnb3J5L0NhdGVnb3JpZXNGaWx0ZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vY2F0ZWdvcnkvQ2F0ZWdvcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vZGlhbG9nQWRkL0FkZENhdGVnb3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL2RpYWxvZ0FkZC9BZGRUYXNrLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL2RpYWxvZ0FkZC9EaWFsb2dBZGQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vZGlhbG9nQWRkL0RvbmUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vZGlhbG9nQWRkL1NlbGVjdEFjdGlvbkFkZC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdG9kby9kaWFsb2dBZGQvU2VsZWN0Q2F0ZWdvcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vZGlhbG9nQWRkL1NlbGVjdENvbXBsZXRlRGF0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdG9kby9kaWFsb2dBZGQvU3RlcHMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vdGFzay9CdXR0b25Db21wbGV0ZVRhc2suanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vdGFzay9CdXR0b25EZWxldGVUYXNrLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL3Rhc2svVGFzay5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdG9kby90YXNrL1Rhc2tzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL3Zpc2liaWxpdHkvVmlzaWJpbGl0eUZpbHRlcnMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vdmlzaWJpbGl0eS9WaXNpYmlsaXR5U3dpdGNoLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2xhYmVscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL3N0ZXBzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL0NhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL1Rhc2tzQ29udGFpbmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9Ub2Rvc0NvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy9jb21tb25TZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0b3JzL3RvZG9UYXNrc1NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvQ29tbW9uLmpzIl0sIm5hbWVzIjpbImZldGNoVGFza3MiLCJzdGF0ZSIsInJlcXVlc3RGZXRjaEFsbENhdGVnb3JpZXMiLCJ0eXBlIiwiUkVRVUVTVF9GRVRDSF9BTExfQ0FURUdPUklFUyIsInJlY2VpdmVGZXRjaEFsbENhdGVnb3JpZXMiLCJjYXRlZ29yaWVzIiwiZXJyb3JGZXRjaEFsbENhdGVnb3JpZXMiLCJlcnJvciIsImFkZENhdGVnb3J5TG9jYWwiLCJjYXRlZ29yeSIsInJlbW92ZUNhdGVnb3J5TG9jYWwiLCJjYXRlZ29yeUluZGV4IiwidG9vZ2xlU2VsZWN0Q2F0ZWdvcnkiLCJzZWxlY3RlZENhdGVnb3J5IiwidG9vZ2xlU2VsZWN0Q2F0ZWdvcnlBbGwiLCJUT09HTEVfU0VMRUNUX0NBVEVHT1JZX0FMTCIsInN3aXRjaFZpc2liaWxpdHlGaWx0ZXIiLCJ2aXNpYmlsaXR5IiwiZmV0Y2hBbGxDYXRlZ29yaWVzIiwibGltaXQiLCJza2lwIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsImFjY2Vzc1Rva2VuIiwiYXV0aCIsIkdFVCIsInJlc3BvbnNlIiwic3VjY2VzcyIsImRhdGEiLCJtZXNzYWdlIiwiZGVsZXRlQ2F0ZWdvcnkiLCJjYXRlZ29yeUlkIiwiREVMRVRFIiwidG9kb0ZpbHRlcnMiLCJmaW5kSW5kZXgiLCJpZCIsImFkZENhdGVnb3J5IiwibmFtZSIsImNhbGxiYWNrIiwidW5kZWZpbmVkIiwiUE9TVCIsImNoYW5nZVZpc2liaWxpdHkiLCJzZWxlY3RDYXRlZ29yeSIsInNlbGVjdENhdGVnb3J5QWxsIiwicmVxdWVzdEZldGNoVGFza3MiLCJyZWNlaXZlRmV0Y2hUYXNrcyIsInRhc2tzIiwiZXJyb3JGZXRjaFRhc2tzIiwiYWRkVGFza0xvY2FsIiwidGFzayIsInJlbW92ZVRhc2tMb2NhbCIsInRhc2tJbmRleCIsInVwZGF0ZVRhc2tMb2NhbCIsImZldGNoVGFza3NCeUNhdGVnb3J5IiwiY2F0ZWdvcmllc0lkIiwiY29tcGxldGVkIiwibWFwIiwiY29tcGxldGVkQXQiLCJEYXRlIiwidG9kb1dpdGhpbiIsImRlbGV0ZVRhc2siLCJpdGVtcyIsInRvZG9UYXNrcyIsInRvZG9Bcmd1bWVudEluZGV4IiwidG9kb0FyZ3VtZW50IiwiYWRkVGFzayIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJmZXRjaGVkVGFzayIsInRvb2dsZVRhc2tDb21wbGV0ZWQiLCJpc0NvbXBsZXRlZCIsIlBBVENIIiwiZHVyYXRpb24iLCJkZWZhdWx0U3R5bGUiLCJ0cmFuc2l0aW9uIiwiaGVpZ2h0Iiwib25FbnRlciIsIm5vZGUiLCJzdHlsZSIsImZpcnN0RWxlbWVudENoaWxkIiwib2Zmc2V0SGVpZ2h0Iiwib25FeGl0IiwiQ29sbGFwc2UiLCJpblByb3AiLCJpbiIsImNoaWxkcmVuIiwicHJvcFR5cGVzIiwiYm9vbCIsImlzUmVxdWlyZWQiLCJvcGFjaXR5IiwidHJhbnNpdGlvblN0eWxlcyIsImVudGVyaW5nIiwiZW50ZXJlZCIsImRpc3BsYXkiLCJEaWFsb2dBbmltIiwiZW50ZXIiLCJleGl0Iiwib25FbnRlcmVkIiwib25FeGl0ZWQiLCJSZXNpemUiLCJwcm9wcyIsImJvdHRvbSIsIlNuYWNrYmFyQW5pbSIsImN1c3RvbUNsYXNzIiwic3RyaW5nIiwiZGVmYXVsdFByb3BzIiwiQnV0dG9uU2Nyb2xsIiwib25DbGljayIsImRpcmVjdGlvbiIsImZ1bmMiLCJvbmVPZiIsIndhaXRUaW1lIiwiSW5maW5pdGVTY3JvbGwiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsInNjcm9sbFkiLCJkb2N1bWVudCIsImJvZHkiLCJhcmdzIiwib25TY3JvbGwiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImNsYXNzTmFtZSIsIkNvbXBvbmVudCIsImFycmF5T2YiLCJhbnkiLCJNYWluQWRkQnV0dG9uIiwiQWN0aW9uIiwidGV4dCIsIlNuYWNrYmFyIiwib25DbG9zZSIsInNob3ciLCJzZXRUaW1lb3V0IiwiaXNFcnJvciIsImFjdGlvblRleHQiLCJhY3Rpb25DbGljayIsInZlcnRpY2FsUG9zdGlvbiIsImhvcml6b250YWxQb3NpdGlvbiIsIm51bWJlciIsIlRvZG9zIiwiaXNEaWFsb2dBZGRPcGVuIiwiaW5pdEZldGNoQWxsQ2F0ZWdvcmllcyIsImhpZGVNZXNzYWdlIiwic2hvd0xvYWRpbmciLCJzZXRTdGF0ZSIsInNoYXBlIiwiQnV0dG9uRGVsZXRlQ2F0ZWdvcnkiLCJDYXRlZ29yaWVzRmlsdGVyIiwiY2hpcHMiLCJtb3ZlQ2hpcHNTY3JvbGwiLCJjbGllbnRXaWR0aCIsImRlbHRhIiwibmV4dFNjcm9sbExlZnQiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsIiwibGVmdCIsImNhdGVnb3J5TGlzdCIsIm9uRGVsZXRlQ2F0ZWdvcnkiLCJvbkNpbGNrQ2F0ZWdvcnkiLCJoYW5kbGVMZWZ0U2Nyb2xsQ2xpY2siLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsInNlbGVjdGVkIiwiaGFuZGxlUmlnaHRTY3JvbGxDbGljayIsIkNhdGVnb3J5Iiwib25EZWxldGUiLCJjc3NDbGFzcyIsIm9uQ2hpcENsaWNrIiwiZSIsIm9uRGVsZXRlQ2xpY2siLCJBZGRDYXRlZ29yeSIsInRhcmdldCIsInZhbHVlIiwibXNnTmFtZVJlcXVpcmVkIiwib25DYXRlZ29yeUNyZWF0ZWQiLCJvbk5leHQiLCJzdGVwSWQiLCJvcHRpb25zIiwidGl0bGVBZGRDYXRlZ29yeSIsInBsYWNlaG9sZGVyTmFtZSIsIm9uSW5wdXRUZXh0Q2hhbmdlIiwib25CdXR0b25BZGRDbGljayIsImJ1dHRvbkFkZCIsIkFkZFRhc2siLCJtc2dUaXRsZVJlcXVpcmVkIiwidGl0bGVBZGRUYXNrIiwibGFiZWxGb3JDYXRlZ29yeSIsInBsYWNlSG9sZGVyVGl0bGUiLCJwbGFjZUhvbGRlckRlc2NyaXB0aW9uIiwib25CdXR0b25TY2hlZHVsZUNsaWNrIiwiYnV0dG9uU2NoZWR1bGUiLCJnZXRDb250ZW50VG9SZW5kZXIiLCJzdGVwcyIsImxlbmd0aCIsImxhc3RTdGVwIiwiaW5pdGFsU3RhdGUiLCJuZXh0U3RlcHMiLCJzaG93U3RlcCIsIkRpYWxvZ0FkZCIsInN0ZXBDb3VudCIsInNsaWNlIiwic3RlcCIsImNvbXBsZXRlIiwiZG9uZSIsIm9wZW4iLCJvblJlc2V0QW5kQ2xvc2UiLCJvbkFuaW1hdGlvbkVuZCIsIm9uQmFjayIsImJ1dHRvbkJhY2siLCJEb25lIiwibGFiZWxEb25lIiwiU2VsZWN0QWN0aW9uQWRkIiwidGl0bGVBZGQiLCJsYWJlbENhdGVnb3J5IiwibGFiZWxUYXNrIiwiU2VsZWN0Q2F0ZWdvcnkiLCJtc2dTZWxlY3RDYXRlZ29yeSIsImNhdGVnb3JpZXNMaXN0IiwidGl0bGVDaG9vc2VDYXRlZ29yeSIsIm9uQ2F0ZWdvcnlDbGljayIsIm9uQnV0dG9uTmV4dENsaWNrIiwiYnV0dG9uTmV4dCIsIm1hcFN0YXRlVG9Qcm9wIiwiU2VsZWN0Q29tcGxldGVEYXRlIiwiZGF0ZSIsIm1zZ1NlbGVjdERhdGUiLCJvblRvZG9UYXNrQ3JlYXRlZCIsInRpdGxlVG9kb1dpdGhpbiIsIm9uSW5wdXREYXRlQ2hhbmdlIiwiU3RlcCIsIm5lZWRMaW5lIiwiU3RlcHMiLCJsaXN0Iiwic3RlcEhpc3RvcnkiLCJpdGVtIiwiaSIsImZpbHRlciIsInNoIiwiQnV0dG9uQ29tcGxldGVUYXNrIiwiQnV0dG9uRGVsZXRlVGFzayIsIlRhc2siLCJjb2xsYXBzZWQiLCJsYWJlbFBhcnRpYWxDb21wbGV0ZWQiLCJsYWJlbFBhcnRpYWxUb0NvbXBsZXRlZCIsImxhYmVsTm90U2V0Iiwib25Db21wbGV0ZSIsIm9uVGl0bGVDbGljayIsInJlbmRlckRhdGUiLCJsYWJlbE5vRGVzY3JpcHRpb24iLCJpbml0aWFsU3RhdGUiLCJUYXNrcyIsIm1vcmVUb0xvYWQiLCJuZXdTa2lwIiwidGFza0xpc3QiLCJvbkRlbGV0ZVRhc2siLCJvbkNvbXBsZXRlVGFzayIsIm9uRmV0Y2hUb2RvVGFza3NOZXh0IiwiYXJnIiwibmV4dFByb3BzIiwicHJldlN0YXRlIiwiVmlzaWJpbGl0eUZpbHRlciIsInNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciIsIm9uVmlzaWJpbGl0eVN3aXRjaENsaWNrIiwiVmlzaWJpbGl0eVN3aXRjaCIsImxhYmVscyIsInN0ZXBEZXNjV2FudFRvQWRkIiwic3RlcERlc2NBZGRDYXRlZ29yeSIsInN0ZXBEZXNjclNlbGVjQ2F0ZWdvcnkiLCJzdGVwRGVzY0FkZFRhc2siLCJzdGVwRGVzY0NvbXBsZXRlRGF0ZSIsInN0ZXBEZXNjRG9uZSIsIlNFTEVDVF9XQU5UX1RPX0FERCIsIkFERF9DQVRFR09SWSIsIkFERF9UQVNLIiwiU0VMRUNUX0NBVEVHT1JZIiwiU0VMRUNUX0NPTVBMRVRFX0RBVEUiLCJET05FIiwic3RlcExpc3QiLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyIiwiVGFza3NDb250YWluZXIiLCJUb2Rvc0NvbnRhaW5lciIsIlZpc2liaWxpdHlGaWx0ZXJDb250YWluZXIiLCJpc0ZldGNoaW5nQ2F0ZWdvcmllcyIsImlzRmV0Y2hpbmdUb2RvcyIsImlzRmV0Y2hpbmdDYXRlZ29yaWVzRmlsdGVyIiwiaXNGZXRjaGluZyIsImdldFRvZG9GaWx0ZXJzIiwiZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QiLCJnZXRWaXNpYmlsaXR5RmlsdGVyIiwidmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQiLCJnZXRTZWxlY3RlZENhdGVnb3JpZXNGaWx0ZXIiLCJnZXRTZWxlY3RlZENhdGVnb3JpZXNJZCIsImNhdGVnb3J5RmlsdGVyIiwiaXNGZXRjaGluZ1Rhc2tzIiwiZ2V0VGFza3MiLCJnZXRUYXNrTGlzdCIsImdldFNraXAiLCJzdGlsbE1vcmVUb0xvYWQiLCJ0b0pzRGF0ZSIsInBhcnNlRGF0ZSIsInBhcnNlSW50Iiwic3Vic3RyIiwidG9TaW1wbGVEYXRlRm9ybWF0IiwiZ2V0Q3VycmVudEJhc2VVcmwiLCJnZXRVcmwiLCJsb2NhdGlvbiIsInByb3RvY29sIiwiaG9zdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU1BLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUFDLEtBQUs7QUFBQSxTQUFJLDhFQUFvQixDQUM5QywrRkFBdUIsQ0FBQ0EsS0FBRCxDQUR1QixFQUU5QywrRkFBdUIsQ0FBQ0EsS0FBRCxDQUZ1QixDQUF4QjtBQUFBLENBQXhCOztBQUtBLElBQU1DLHlCQUF5QixHQUFHLFNBQTVCQSx5QkFBNEI7QUFBQSxTQUNoQztBQUNFQyxRQUFJLEVBQUUsbUZBQTRCQztBQURwQyxHQURnQztBQUFBLENBQWxDOztBQU1BLElBQU1DLHlCQUF5QixHQUFHLFNBQTVCQSx5QkFBNEIsQ0FBQUMsVUFBVTtBQUFBLFNBQzFDO0FBQ0VILFFBQUksRUFBRSxtRkFEUjtBQUVFRyxjQUFVLEVBQVZBO0FBRkYsR0FEMEM7QUFBQSxDQUE1Qzs7QUFPQSxJQUFNQyx1QkFBdUIsR0FBRyxTQUExQkEsdUJBQTBCLENBQUFDLEtBQUs7QUFBQSxTQUNuQztBQUNFTCxRQUFJLEVBQUUsaUZBRFI7QUFFRUssU0FBSyxFQUFMQTtBQUZGLEdBRG1DO0FBQUEsQ0FBckM7O0FBT0EsSUFBTUMsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixDQUFBQyxRQUFRO0FBQUEsU0FDL0I7QUFDRVAsUUFBSSxFQUFFLHlFQURSO0FBRUVPLFlBQVEsRUFBUkE7QUFG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LElBQU1DLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsQ0FBQWxGLElBQUk7QUFBQSxTQUNwQyxpREFBVSxDQUFDQSxJQUFELEVBQU8sa0JBQVAsQ0FEMEI7QUFBQSxDQUEvQjtBQUdBLElBQU1tRixpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLEdBQU07QUFDckMsTUFBTUMsTUFBTSxHQUFHbk0sTUFBTSxDQUFDb00sUUFBdEI7QUFDQSxtQkFBVUQsTUFBTSxDQUFDRSxRQUFqQixlQUE4QkYsTUFBTSxDQUFDRyxJQUFyQztBQUNELENBSE0sQyIsImZpbGUiOiJ0b2Rvcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNhbGxBcGksIE1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9BcGlVdGlscyc7XG5pbXBvcnQgeyBzaG91bGRSZWZyZXNoVG9rZW4gfSBmcm9tICcuLi91dGlscy9SZXF1ZXN0VXRpbHMnO1xuaW1wb3J0IHsgcmVmcmVzaEFjY2Vzc1Rva2VuIH0gZnJvbSAnLi9hdXRoQWN0aW9ucyc7XG5pbXBvcnQge1xuICBSRVFVRVNUX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICBSRUNFSVZFX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICBFUlJPUl9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgQUREX0NBVEVHT1JZX0xPQ0FMLFxuICBSRU1PVkVfQ0FURUdPUllfTE9DQUwsXG4gIFRPT0dMRV9TRUxFQ1RfQ0FURUdPUlksXG4gIFRPT0dMRV9TRUxFQ1RfQ0FURUdPUllfQUxMLFxuICBTV0lUQ0hfVklTSUJJTElUWV9GSUxURVIsXG59IGZyb20gJy4uL2NvbnN0YW50cy9hY3Rpb25UeXBlcyc7XG5pbXBvcnQgeyBxdWVyeUl0ZW1zTGltaXQgfSBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcbmltcG9ydCB7IGZldGNoVGFza3NCeUNhdGVnb3J5IH0gZnJvbSAnLi90b2RvVGFza3NBY3Rpb25zJztcbmltcG9ydCB7IHNob3dNZXNzYWdlRXJyb3IgfSBmcm9tICcuL21lc3NhZ2VBY3Rpb25zJztcbmltcG9ydCB7IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkLCB2aXNpYmlsaXR5T25seUNvbXBsZXRlZCB9IGZyb20gJy4uL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycyc7XG5cbmNvbnN0IGZldGNoVGFza3MgPSBzdGF0ZSA9PiBmZXRjaFRhc2tzQnlDYXRlZ29yeShcbiAgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQoc3RhdGUpLFxuICB2aXNpYmlsaXR5T25seUNvbXBsZXRlZChzdGF0ZSksXG4pO1xuXG5jb25zdCByZXF1ZXN0RmV0Y2hBbGxDYXRlZ29yaWVzID0gKCkgPT4gKFxuICB7XG4gICAgdHlwZTogUkVRVUVTVF9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgfVxuKTtcblxuY29uc3QgcmVjZWl2ZUZldGNoQWxsQ2F0ZWdvcmllcyA9IGNhdGVnb3JpZXMgPT4gKFxuICB7XG4gICAgdHlwZTogUkVDRUlWRV9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgICBjYXRlZ29yaWVzLFxuICB9XG4pO1xuXG5jb25zdCBlcnJvckZldGNoQWxsQ2F0ZWdvcmllcyA9IGVycm9yID0+IChcbiAge1xuICAgIHR5cGU6IEVSUk9SX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICAgIGVycm9yLFxuICB9XG4pO1xuXG5jb25zdCBhZGRDYXRlZ29yeUxvY2FsID0gY2F0ZWdvcnkgPT4gKFxuICB7XG4gICAgdHlwZTogQUREX0NBVEVHT1JZX0xPQ0FMLFxuICAgIGNhdGVnb3J5LFxuICB9XG4pO1xuXG5jb25zdCByZW1vdmVDYXRlZ29yeUxvY2FsID0gY2F0ZWdvcnlJbmRleCA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRU1PVkVfQ0FURUdPUllfTE9DQUwsXG4gICAgY2F0ZWdvcnlJbmRleCxcbiAgfVxuKTtcblxuY29uc3QgdG9vZ2xlU2VsZWN0Q2F0ZWdvcnkgPSBzZWxlY3RlZENhdGVnb3J5ID0+IChcbiAge1xuICAgIHR5cGU6IFRPT0dMRV9TRUxFQ1RfQ0FURUdPUlksXG4gICAgc2VsZWN0ZWRDYXRlZ29yeSxcbiAgfVxuKTtcblxuY29uc3QgdG9vZ2xlU2VsZWN0Q2F0ZWdvcnlBbGwgPSAoKSA9PiAoXG4gIHtcbiAgICB0eXBlOiBUT09HTEVfU0VMRUNUX0NBVEVHT1JZX0FMTCxcbiAgfVxuKTtcblxuY29uc3Qgc3dpdGNoVmlzaWJpbGl0eUZpbHRlciA9IHZpc2liaWxpdHkgPT4gKFxuICB7XG4gICAgdHlwZTogU1dJVENIX1ZJU0lCSUxJVFlfRklMVEVSLFxuICAgIHZpc2liaWxpdHksXG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBmZXRjaEFsbENhdGVnb3JpZXMgPSAobGltaXQgPSBxdWVyeUl0ZW1zTGltaXQsIHNraXAgPSAwKSA9PlxuICBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgZGlzcGF0Y2gocmVxdWVzdEZldGNoQWxsQ2F0ZWdvcmllcygpKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBhY2Nlc3NUb2tlbiB9ID0gZ2V0U3RhdGUoKS5hdXRoO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKCdjYXRlZ29yaWVzJywgeyBsaW1pdCwgc2tpcCB9LCBNZXRob2RzLkdFVCwgYWNjZXNzVG9rZW4pO1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgZGlzcGF0Y2gocmVjZWl2ZUZldGNoQWxsQ2F0ZWdvcmllcyhyZXNwb25zZS5kYXRhKSk7XG4gICAgICAgIGRpc3BhdGNoKGZldGNoVGFza3NCeUNhdGVnb3J5KGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkKGdldFN0YXRlKCkpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2hvdWxkUmVmcmVzaFRva2VuKHJlc3BvbnNlKSkge1xuICAgICAgICAgIGF3YWl0IGRpc3BhdGNoKHJlZnJlc2hBY2Nlc3NUb2tlbigpKTtcbiAgICAgICAgICBkaXNwYXRjaChmZXRjaEFsbENhdGVnb3JpZXMobGltaXQsIHNraXApKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZGlzcGF0Y2goZXJyb3JGZXRjaEFsbENhdGVnb3JpZXMocmVzcG9uc2UuZXJyb3IubWVzc2FnZSkpO1xuICAgICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLmVycm9yLm1lc3NhZ2UpKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gICAgfVxuICB9O1xuXG5leHBvcnQgY29uc3QgZGVsZXRlQ2F0ZWdvcnkgPSAoY2F0ZWdvcnlJZCA9ICcnKSA9PiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbiB9ID0gZ2V0U3RhdGUoKS5hdXRoO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbEFwaSgnY2F0ZWdvcmllcycsIGNhdGVnb3J5SWQsIE1ldGhvZHMuREVMRVRFLCBhY2Nlc3NUb2tlbik7XG4gICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgIGNvbnN0IHsgY2F0ZWdvcmllcyB9ID0gZ2V0U3RhdGUoKS50b2RvRmlsdGVycztcbiAgICAgIGNvbnN0IGNhdGVnb3J5SW5kZXggPSBjYXRlZ29yaWVzLmZpbmRJbmRleChjYXRlZ29yeSA9PiBjYXRlZ29yeS5pZCA9PT0gY2F0ZWdvcnlJZCk7XG4gICAgICBkaXNwYXRjaChyZW1vdmVDYXRlZ29yeUxvY2FsKGNhdGVnb3J5SW5kZXgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNob3VsZFJlZnJlc2hUb2tlbihyZXNwb25zZSkpIHtcbiAgICAgICAgYXdhaXQgZGlzcGF0Y2gocmVmcmVzaEFjY2Vzc1Rva2VuKCkpO1xuICAgICAgICBkaXNwYXRjaChkZWxldGVDYXRlZ29yeShjYXRlZ29yeUlkKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UuZXJyb3IubWVzc2FnZSkpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXF1ZXN0IHRvIGFkZCBhIGNhdGVnb3J5XG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBjYXRlZ29yeSBuYW1lIHRvIGFkZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBuZWVkIHRvIGhhbmRsZSB0aGUgY2F0ZWdvcnkgY3JlYXRlZFxuICovXG5leHBvcnQgY29uc3QgYWRkQ2F0ZWdvcnkgPSAobmFtZSA9ICcnLCBjYWxsYmFjayA9IHVuZGVmaW5lZCkgPT4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW4gfSA9IGdldFN0YXRlKCkuYXV0aDtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoJ2NhdGVnb3JpZXMnLCB7IG5hbWUgfSwgTWV0aG9kcy5QT1NULCBhY2Nlc3NUb2tlbik7XG4gICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgIGNvbnN0IGNhdGVnb3J5ID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIGRpc3BhdGNoKGFkZENhdGVnb3J5TG9jYWwoY2F0ZWdvcnkpKTtcbiAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNhbGxiYWNrKGNhdGVnb3J5KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNob3VsZFJlZnJlc2hUb2tlbihyZXNwb25zZSkpIHtcbiAgICAgICAgYXdhaXQgZGlzcGF0Y2gocmVmcmVzaEFjY2Vzc1Rva2VuKCkpO1xuICAgICAgICBkaXNwYXRjaChhZGRDYXRlZ29yeShuYW1lLCBjYWxsYmFjaykpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLmVycm9yLm1lc3NhZ2UpKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VWaXNpYmlsaXR5ID0gdmlzaWJpbGl0eSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGRpc3BhdGNoKHN3aXRjaFZpc2liaWxpdHlGaWx0ZXIodmlzaWJpbGl0eSkpO1xuICByZXR1cm4gZGlzcGF0Y2goZmV0Y2hUYXNrcyhnZXRTdGF0ZSgpKSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0Q2F0ZWdvcnkgPSBzZWxlY3RlZENhdGVnb3J5ID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgZGlzcGF0Y2godG9vZ2xlU2VsZWN0Q2F0ZWdvcnkoc2VsZWN0ZWRDYXRlZ29yeSkpO1xuICByZXR1cm4gZGlzcGF0Y2goZmV0Y2hUYXNrcyhnZXRTdGF0ZSgpKSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0Q2F0ZWdvcnlBbGwgPSAoKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGRpc3BhdGNoKHRvb2dsZVNlbGVjdENhdGVnb3J5QWxsKCkpO1xuICByZXR1cm4gZGlzcGF0Y2goZmV0Y2hUYXNrcyhnZXRTdGF0ZSgpKSk7XG59O1xuIiwiaW1wb3J0IHsgY2FsbEFwaSwgTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL0FwaVV0aWxzJztcbmltcG9ydCB7IHNob3VsZFJlZnJlc2hUb2tlbiB9IGZyb20gJy4uL3V0aWxzL1JlcXVlc3RVdGlscyc7XG5pbXBvcnQgeyByZWZyZXNoQWNjZXNzVG9rZW4gfSBmcm9tICcuL2F1dGhBY3Rpb25zJztcbmltcG9ydCB7XG4gIFJFUVVFU1RfRkVUQ0hfVEFTS1MsXG4gIFJFQ0VJVkVfRkVUQ0hfVEFTS1MsXG4gIEVSUk9SX0ZFVENIX1RBU0tTLFxuICBBRERfVEFTS19MT0NBTCxcbiAgUkVNT1ZFX1RBU0tfTE9DQUwsXG4gIFVQREFURV9UQVNLX0xPQ0FMLFxufSBmcm9tICcuLi9jb25zdGFudHMvYWN0aW9uVHlwZXMnO1xuaW1wb3J0IHsgcXVlcnlJdGVtc0xpbWl0IH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUVycm9yIH0gZnJvbSAnLi9tZXNzYWdlQWN0aW9ucyc7XG5cbmNvbnN0IHJlcXVlc3RGZXRjaFRhc2tzID0gKGxpbWl0LCBza2lwKSA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRVFVRVNUX0ZFVENIX1RBU0tTLFxuICAgIGxpbWl0LFxuICAgIHNraXAsXG4gIH1cbik7XG5cbmNvbnN0IHJlY2VpdmVGZXRjaFRhc2tzID0gdGFza3MgPT4gKFxuICB7XG4gICAgdHlwZTogUkVDRUlWRV9GRVRDSF9UQVNLUyxcbiAgICB0YXNrcyxcbiAgfVxuKTtcblxuY29uc3QgZXJyb3JGZXRjaFRhc2tzID0gZXJyb3IgPT4gKFxuICB7XG4gICAgdHlwZTogRVJST1JfRkVUQ0hfVEFTS1MsXG4gICAgZXJyb3IsXG4gIH1cbik7XG5cbmNvbnN0IGFkZFRhc2tMb2NhbCA9IHRhc2sgPT4gKFxuICB7XG4gICAgdHlwZTogQUREX1RBU0tfTE9DQUwsXG4gICAgdGFzayxcbiAgfVxuKTtcblxuY29uc3QgcmVtb3ZlVGFza0xvY2FsID0gdGFza0luZGV4ID0+IChcbiAge1xuICAgIHR5cGU6IFJFTU9WRV9UQVNLX0xPQ0FMLFxuICAgIHRhc2tJbmRleCxcbiAgfVxuKTtcblxuY29uc3QgdXBkYXRlVGFza0xvY2FsID0gdGFzayA9PiAoXG4gIHtcbiAgICB0eXBlOiBVUERBVEVfVEFTS19MT0NBTCxcbiAgICB0YXNrLFxuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkgPSAoXG4gIGNhdGVnb3JpZXNJZCA9IFtdLFxuICBjb21wbGV0ZWQgPSBmYWxzZSxcbiAgbGltaXQgPSBxdWVyeUl0ZW1zTGltaXQsXG4gIHNraXAgPSAwLFxuKSA9PiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGRpc3BhdGNoKHJlcXVlc3RGZXRjaFRhc2tzKGxpbWl0LCBza2lwKSk7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbiB9ID0gZ2V0U3RhdGUoKS5hdXRoO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbEFwaSgndGFza3MnLCB7XG4gICAgICBjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCwgbGltaXQsIHNraXAsXG4gICAgfSwgTWV0aG9kcy5HRVQsIGFjY2Vzc1Rva2VuKTtcbiAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgY29uc3QgdGFza3MgPSByZXNwb25zZS5kYXRhLm1hcCh0YXNrID0+XG4gICAgICAgICh7XG4gICAgICAgICAgLi4udGFzayxcbiAgICAgICAgICBjb21wbGV0ZWRBdDogKHRhc2suY29tcGxldGVkQXQpID8gbmV3IERhdGUodGFzay5jb21wbGV0ZWRBdCkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgdG9kb1dpdGhpbjogKHRhc2sudG9kb1dpdGhpbikgPyBuZXcgRGF0ZSh0YXNrLnRvZG9XaXRoaW4pIDogdW5kZWZpbmVkLFxuICAgICAgICB9KSk7XG4gICAgICBkaXNwYXRjaChyZWNlaXZlRmV0Y2hUYXNrcyh0YXNrcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc2hvdWxkUmVmcmVzaFRva2VuKHJlc3BvbnNlKSkge1xuICAgICAgICBhd2FpdCBkaXNwYXRjaChyZWZyZXNoQWNjZXNzVG9rZW4oKSk7XG4gICAgICAgIGRpc3BhdGNoKGZldGNoVGFza3NCeUNhdGVnb3J5KGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgc2tpcCkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBkaXNwYXRjaChlcnJvckZldGNoVGFza3MocmVzcG9uc2UuZXJyb3IubWVzc2FnZSkpO1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5lcnJvci5tZXNzYWdlKSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZGVsZXRlVGFzayA9IChpZCA9ICcnKSA9PiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbiB9ID0gZ2V0U3RhdGUoKS5hdXRoO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbEFwaSgndGFza3MnLCBpZCwgTWV0aG9kcy5ERUxFVEUsIGFjY2Vzc1Rva2VuKTtcbiAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgY29uc3QgeyBpdGVtcyB9ID0gZ2V0U3RhdGUoKS50b2RvVGFza3M7XG4gICAgICBjb25zdCB0b2RvQXJndW1lbnRJbmRleCA9IGl0ZW1zLmZpbmRJbmRleCh0b2RvQXJndW1lbnQgPT5cbiAgICAgICAgdG9kb0FyZ3VtZW50LmlkID09PSBpZCk7XG4gICAgICBkaXNwYXRjaChyZW1vdmVUYXNrTG9jYWwodG9kb0FyZ3VtZW50SW5kZXgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNob3VsZFJlZnJlc2hUb2tlbihyZXNwb25zZSkpIHtcbiAgICAgICAgYXdhaXQgZGlzcGF0Y2gocmVmcmVzaEFjY2Vzc1Rva2VuKCkpO1xuICAgICAgICBkaXNwYXRjaChkZWxldGVUYXNrKGlkKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UuZXJyb3IubWVzc2FnZSkpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRhc2sgPSAodGl0bGUgPSAnJywgZGVzY3JpcHRpb24gPSAnJywgY2F0ZWdvcnkgPSB7IGlkOiAnJyB9LCB0b2RvV2l0aGluLCBjYWxsYmFjayA9IHVuZGVmaW5lZCkgPT4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW4gfSA9IGdldFN0YXRlKCkuYXV0aDtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoXG4gICAgICAndGFza3MnLFxuICAgICAge1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5LmlkLFxuICAgICAgICB0b2RvV2l0aGluLFxuICAgICAgfSxcbiAgICAgIE1ldGhvZHMuUE9TVCxcbiAgICAgIGFjY2Vzc1Rva2VuLFxuICAgICk7XG4gICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgIGNvbnN0IGZldGNoZWRUYXNrID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIGNvbnN0IHRhc2sgPSB7XG4gICAgICAgIC4uLmZldGNoZWRUYXNrLFxuICAgICAgICBjb21wbGV0ZWRBdDogKGZldGNoZWRUYXNrLmNvbXBsZXRlZEF0KVxuICAgICAgICAgID8gbmV3IERhdGUoZmV0Y2hlZFRhc2suY29tcGxldGVkQXQpIDogdW5kZWZpbmVkLFxuICAgICAgICB0b2RvV2l0aGluOiAoZmV0Y2hlZFRhc2sudG9kb1dpdGhpbilcbiAgICAgICAgICA/IG5ldyBEYXRlKGZldGNoZWRUYXNrLnRvZG9XaXRoaW4pIDogdW5kZWZpbmVkLFxuICAgICAgfTtcbiAgICAgIGRpc3BhdGNoKGFkZFRhc2tMb2NhbCh0YXNrKSk7XG4gICAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc2hvdWxkUmVmcmVzaFRva2VuKHJlc3BvbnNlKSkge1xuICAgICAgICBhd2FpdCBkaXNwYXRjaChyZWZyZXNoQWNjZXNzVG9rZW4oKSk7XG4gICAgICAgIGRpc3BhdGNoKGFkZFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBjYXRlZ29yeSwgdG9kb1dpdGhpbiwgY2FsbGJhY2spKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5lcnJvci5tZXNzYWdlKSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgdG9vZ2xlVGFza0NvbXBsZXRlZCA9IChpZCA9ICcnLCBpc0NvbXBsZXRlZCA9IGZhbHNlKSA9PiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGNvbnN0IGNvbXBsZXRlZCA9ICFpc0NvbXBsZXRlZDtcbiAgY29uc3QgY29tcGxldGVkQXQgPSAoY29tcGxldGVkKSA/IG5ldyBEYXRlKCkgOiBudWxsO1xuICB0cnkge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW4gfSA9IGdldFN0YXRlKCkuYXV0aDtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoJ3Rhc2tzJywgeyBpZCwgY29tcGxldGVkLCBjb21wbGV0ZWRBdCB9LCBNZXRob2RzLlBBVENILCBhY2Nlc3NUb2tlbik7XG4gICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgIGNvbnN0IGZldGNoZWRUYXNrID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIGNvbnN0IHRhc2sgPSB7XG4gICAgICAgIC4uLmZldGNoZWRUYXNrLFxuICAgICAgICBjb21wbGV0ZWRBdDogKGZldGNoZWRUYXNrLmNvbXBsZXRlZEF0KVxuICAgICAgICAgID8gbmV3IERhdGUoZmV0Y2hlZFRhc2suY29tcGxldGVkQXQpIDogdW5kZWZpbmVkLFxuICAgICAgfTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZVRhc2tMb2NhbCh0YXNrKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzaG91bGRSZWZyZXNoVG9rZW4ocmVzcG9uc2UpKSB7XG4gICAgICAgIGF3YWl0IGRpc3BhdGNoKHJlZnJlc2hBY2Nlc3NUb2tlbigpKTtcbiAgICAgICAgZGlzcGF0Y2godG9vZ2xlVGFza0NvbXBsZXRlZChpZCwgaXNDb21wbGV0ZWQpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5lcnJvci5tZXNzYWdlKSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5cbmNvbnN0IGR1cmF0aW9uID0gMzAwO1xuXG5jb25zdCBkZWZhdWx0U3R5bGUgPSB7XG4gIHRyYW5zaXRpb246IGBoZWlnaHQgJHtkdXJhdGlvbn1tcyBlYXNlLWluLW91dGAsXG4gIGhlaWdodDogMCxcbn07XG5cbmNvbnN0IG9uRW50ZXIgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSBgJHtub2RlLmZpcnN0RWxlbWVudENoaWxkLm9mZnNldEhlaWdodH1weGA7XG59O1xuXG5jb25zdCBvbkV4aXQgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSAnMHB4Jztcbn07XG5cbmNvbnN0IENvbGxhcHNlID0gKHsgaW46IGluUHJvcCwgY2hpbGRyZW4gfSkgPT4gKFxuICA8VHJhbnNpdGlvbiBvbkVudGVyPXtvbkVudGVyfSBvbkV4aXQ9e29uRXhpdH0gaW49e2luUHJvcH0gdGltZW91dD17ZHVyYXRpb259PlxuICAgIHsoKSA9PiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICA8L1RyYW5zaXRpb24+XG4pO1xuXG5Db2xsYXBzZS5wcm9wVHlwZXMgPSB7XG4gIGluOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbGxhcHNlO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5cbmNvbnN0IGR1cmF0aW9uID0gMjUwO1xuXG5jb25zdCBkZWZhdWx0U3R5bGUgPSB7XG4gIHRyYW5zaXRpb246IGBhbGwgJHtkdXJhdGlvbn1tcyBlYXNlLWluLW91dGAsXG4gIGhlaWdodDogJzBweCcsXG4gIG9wYWNpdHk6ICcwJyxcbiAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG59O1xuXG5jb25zdCB0cmFuc2l0aW9uU3R5bGVzID0ge1xuICBlbnRlcmluZzoge1xuICAgIGhlaWdodDogJzBweCcsXG4gICAgb3BhY2l0eTogJzAnLFxuICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICB9LFxuICBlbnRlcmVkOiB7XG4gICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICBoZWlnaHQ6ICcxMDB2aCcsXG4gICAgb3BhY2l0eTogJzEnLFxuICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJyxcbiAgfSxcbn07XG5cbmNvbnN0IERpYWxvZ0FuaW0gPSAoeyBpbjogaW5Qcm9wLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxUcmFuc2l0aW9uIGluPXtpblByb3B9IHRpbWVvdXQ9e2R1cmF0aW9ufT5cbiAgICB7c3RhdGUgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD1cImJhY2tkcm9wLWRpYWxvZ1wiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxuICAgICAgICAgIC4uLnRyYW5zaXRpb25TdHlsZXNbc3RhdGVdLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICA8L1RyYW5zaXRpb24+XG4pO1xuXG5EaWFsb2dBbmltLnByb3BUeXBlcyA9IHtcbiAgaW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlhbG9nQW5pbTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcclxuXHJcbmNvbnN0IGR1cmF0aW9uID0ge1xyXG4gIGVudGVyOiAzMDAsXHJcbiAgZXhpdDogMjAwLFxyXG59O1xyXG5cclxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xyXG4gIHRyYW5zaXRpb246IGBhbGwgJHtkdXJhdGlvbi5lbnRlcn1tcyBlYXNlLWluLW91dGAsXHJcbiAgaGVpZ2h0OiAwLFxyXG4gIG9wYWNpdHk6IDAsXHJcbn07XHJcblxyXG5jb25zdCBvbkVudGVyID0gKG5vZGUpID0+IHtcclxuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xyXG4gIHN0eWxlLmhlaWdodCA9IGAke25vZGUuZmlyc3RFbGVtZW50Q2hpbGQub2Zmc2V0SGVpZ2h0fXB4YDtcclxuICBzdHlsZS5vcGFjaXR5ID0gMTtcclxufTtcclxuXHJcbmNvbnN0IG9uRW50ZXJlZCA9IChub2RlKSA9PiB7XHJcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcclxuICBzdHlsZS5oZWlnaHQgPSAnYXV0byc7XHJcbn07XHJcblxyXG5jb25zdCBvbkV4aXQgPSAobm9kZSkgPT4ge1xyXG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XHJcbiAgc3R5bGUuaGVpZ2h0ID0gYCR7bm9kZS5maXJzdEVsZW1lbnRDaGlsZC5vZmZzZXRIZWlnaHR9cHhgO1xyXG59O1xyXG5cclxuY29uc3Qgb25FeGl0ZWQgPSAobm9kZSkgPT4ge1xyXG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XHJcbiAgc3R5bGUuaGVpZ2h0ID0gJzBweCc7XHJcbiAgc3R5bGUub3BhY2l0eSA9IDA7XHJcbn07XHJcblxyXG5cclxuY29uc3QgUmVzaXplID0gKHsgY2hpbGRyZW4sIC4uLnByb3BzIH0pID0+IChcclxuICA8VHJhbnNpdGlvblxyXG4gICAgey4uLnByb3BzfVxyXG4gICAgb25FbnRlcj17b25FbnRlcn1cclxuICAgIG9uRW50ZXJlZD17b25FbnRlcmVkfVxyXG4gICAgb25FeGl0PXtvbkV4aXR9XHJcbiAgICBvbkV4aXRlZD17b25FeGl0ZWR9XHJcbiAgICB0aW1lb3V0PXtkdXJhdGlvbn1cclxuICA+XHJcbiAgICB7KCkgPT4gKFxyXG4gICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICAuLi5kZWZhdWx0U3R5bGUsXHJcbiAgICAgICAgfX1cclxuICAgICAgPlxyXG4gICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgPC9kaXY+XHJcbiAgICApfVxyXG4gIDwvVHJhbnNpdGlvbj5cclxuKTtcclxuXHJcblJlc2l6ZS5wcm9wVHlwZXMgPSB7XHJcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZXNpemU7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDI1MDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgYWxsICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBib3R0b206ICctMTAwcHgnLFxufTtcblxuY29uc3QgdHJhbnNpdGlvblN0eWxlcyA9IHtcbiAgZW50ZXJpbmc6IHtcbiAgICBib3R0b206ICctMTAwcHgnLFxuICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICB9LFxuICBlbnRlcmVkOiB7XG4gICAgYm90dG9tOiAnMHB4JyxcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gIH0sXG59O1xuXG5jb25zdCBTbmFja2JhckFuaW0gPSAoeyBpbjogaW5Qcm9wLCBjaGlsZHJlbiwgY3VzdG9tQ2xhc3MgfSkgPT4gKFxuICA8VHJhbnNpdGlvbiBpbj17aW5Qcm9wfSB0aW1lb3V0PXtkdXJhdGlvbn0+XG4gICAge3N0YXRlID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJjb250ZW50LXNuYWNrYmFyXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAuLi5kZWZhdWx0U3R5bGUsXG4gICAgICAgICAgLi4udHJhbnNpdGlvblN0eWxlc1tzdGF0ZV0sXG4gICAgICAgIH19XG4gICAgICAgIGNsYXNzTmFtZT17Y3VzdG9tQ2xhc3N9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICl9XG4gIDwvVHJhbnNpdGlvbj5cbik7XG5cblNuYWNrYmFyQW5pbS5wcm9wVHlwZXMgPSB7XG4gIGluOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgY3VzdG9tQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5TbmFja2JhckFuaW0uZGVmYXVsdFByb3BzID0ge1xuICBjdXN0b21DbGFzczogJycsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTbmFja2JhckFuaW07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgQnV0dG9uU2Nyb2xsID0gKHsgb25DbGljaywgZGlyZWN0aW9uIH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9e2BidXR0b24tc2Nyb2xsICR7ZGlyZWN0aW9ufWB9IG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIDxpIGNsYXNzTmFtZT17KGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSA/ICdpY29uLWJhY2t3YXJkJyA6ICdpY29uLWZvcndhcmQnfSAvPlxuICA8L2J1dHRvbj5cbik7XG5cbkJ1dHRvblNjcm9sbC5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGRpcmVjdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnbGVmdCcsICdyaWdodCddKSxcbn07XG5cbkJ1dHRvblNjcm9sbC5kZWZhdWx0UHJvcHMgPSB7XG4gIGRpcmVjdGlvbjogJ2xlZnQnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uU2Nyb2xsO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJ2xvZGFzaCc7XG5cbmNvbnN0IHdhaXRUaW1lID0gNTAwO1xuXG5jbGFzcyBJbmZpbml0ZVNjcm9sbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZSh0aGlzLm9uU2Nyb2xsLCB3YWl0VGltZSksIGZhbHNlKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZSh0aGlzLm9uU2Nyb2xsLCB3YWl0VGltZSksIGZhbHNlKTtcbiAgfVxuXG4gIG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgIGlmICgod2luZG93LmlubmVySGVpZ2h0ICsgd2luZG93LnNjcm9sbFkpID49IChkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCAtIDIwMCkpIHtcbiAgICAgIGNvbnN0IHsgYXJncywgb25TY3JvbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICBvblNjcm9sbCguLi5hcmdzKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgY2xhc3NOYW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5JbmZpbml0ZVNjcm9sbC5wcm9wVHlwZXMgPSB7XG4gIGFyZ3M6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvblNjcm9sbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbkluZmluaXRlU2Nyb2xsLmRlZmF1bHRQcm9wcyA9IHtcbiAgYXJnczogW10sXG4gIGNsYXNzTmFtZTogJycsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbmZpbml0ZVNjcm9sbDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBNYWluQWRkQnV0dG9uID0gKHsgb25DbGljayB9KSA9PiAoXG4gIDxidXR0b24gaWQ9XCJtYWluLWFkZC1idXR0b25cIiBvbkNsaWNrPXtvbkNsaWNrfSA+XG4gICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj4mI3hFMTQ1OzwvaT5cbiAgPC9idXR0b24+XG4pO1xuXG5NYWluQWRkQnV0dG9uLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1haW5BZGRCdXR0b247XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBTbmFja2JhckFuaW0gZnJvbSAnLi4vYW5pbXMvU25hY2tiYXJBbmltJztcblxuY29uc3QgQWN0aW9uID0gKHsgb25DbGljaywgdGV4dCB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLWFjdGlvbi1zbmFja2JhclwiIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIHt0ZXh0fVxuICA8L2J1dHRvbj5cbik7XG5cbkFjdGlvbi5wcm9wVHlwZXMgPSB7XG4gIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmNsYXNzIFNuYWNrYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2xvc2UsIGR1cmF0aW9uLCBzaG93LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKHNob3cpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBvbkNsb3NlKCk7XG4gICAgICB9LCBkdXJhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG1lc3NhZ2UsIGlzRXJyb3IsIGFjdGlvblRleHQsIGFjdGlvbkNsaWNrLCBzaG93LFxuICAgICAgdmVydGljYWxQb3N0aW9uLCBob3Jpem9udGFsUG9zaXRpb24sXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTbmFja2JhckFuaW0gaW49e3Nob3d9IGN1c3RvbUNsYXNzPXtgJHt2ZXJ0aWNhbFBvc3Rpb259ICR7KGhvcml6b250YWxQb3NpdGlvbil9YH0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2BzbmFja2JhciAkeyhpc0Vycm9yKSA/ICdlcnJvcicgOiAnJ31gfVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic25hY2tiYXItbWVzc2FnZVwiPnttZXNzYWdlfTwvc3Bhbj5cbiAgICAgICAgICB7XG4gICAgICAgICAgICAoYWN0aW9uVGV4dCAhPT0gJycgJiYgYWN0aW9uQ2xpY2sgIT09IHVuZGVmaW5lZCkgJiZcbiAgICAgICAgICAgICAgPEFjdGlvbiBvbkNsaWNrPXthY3Rpb25DbGlja30gdGV4dD17YWN0aW9uVGV4dH0gLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9TbmFja2JhckFuaW0+XG4gICAgKTtcbiAgfVxufVxuXG5TbmFja2Jhci5wcm9wVHlwZXMgPSB7XG4gIHNob3c6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZHVyYXRpb246IFByb3BUeXBlcy5udW1iZXIsXG4gIGlzRXJyb3I6IFByb3BUeXBlcy5ib29sLFxuICBhY3Rpb25UZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBhY3Rpb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gIHZlcnRpY2FsUG9zdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsndG9wJywgJ2JvdHRvbSddKSxcbiAgaG9yaXpvbnRhbFBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxufTtcblxuU25hY2tiYXIuZGVmYXVsdFByb3BzID0ge1xuICBkdXJhdGlvbjogNTAwMCxcbiAgaXNFcnJvcjogZmFsc2UsXG4gIGFjdGlvblRleHQ6ICcnLFxuICBhY3Rpb25DbGljazogdW5kZWZpbmVkLFxuICB2ZXJ0aWNhbFBvc3Rpb246ICdib3R0b20nLFxuICBob3Jpem9udGFsUG9zaXRpb246ICdyaWdodCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTbmFja2JhcjtcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgTG9hZGVyTGluZWFyIGZyb20gJy4uL2xheW91dC9Mb2FkZXJMaW5lYXInO1xuaW1wb3J0IE1haW5BZGRCdXR0b24gZnJvbSAnLi4vbGF5b3V0L01haW5BZGRCdXR0b24nO1xuaW1wb3J0IENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIgZnJvbSAnLi4vLi4vY29udGFpbmVycy9DYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyJztcbmltcG9ydCBWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyIGZyb20gJy4uLy4uL2NvbnRhaW5lcnMvVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lcic7XG5pbXBvcnQgVGFza3NDb250YWluZXIgZnJvbSAnLi4vLi4vY29udGFpbmVycy9UYXNrc0NvbnRhaW5lcic7XG5pbXBvcnQgRGlhbG9nQWRkIGZyb20gJy4vZGlhbG9nQWRkL0RpYWxvZ0FkZCc7XG5pbXBvcnQgU25hY2tiYXIgZnJvbSAnLi4vbGF5b3V0L1NuYWNrYmFyJztcblxuY2xhc3MgVG9kb3MgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0ZSA9IHtcbiAgICBpc0RpYWxvZ0FkZE9wZW46IGZhbHNlLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgaW5pdEZldGNoQWxsQ2F0ZWdvcmllcyB9ID0gdGhpcy5wcm9wcztcbiAgICBpbml0RmV0Y2hBbGxDYXRlZ29yaWVzKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBpc0RpYWxvZ0FkZE9wZW4gfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBtZXNzYWdlLCBoaWRlTWVzc2FnZSwgc2hvd0xvYWRpbmcgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1hcHBcIj5cbiAgICAgICAgPExvYWRlckxpbmVhciBzaG93PXtzaG93TG9hZGluZ30gLz5cbiAgICAgICAgPGRpdiBpZD1cIm1haW4tdG9wLWJhclwiPlxuICAgICAgICAgIDxDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyIC8+XG4gICAgICAgICAgPFZpc2liaWxpdHlGaWx0ZXJDb250YWluZXIgLz5cbiAgICAgICAgICA8TWFpbkFkZEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IGlzRGlhbG9nQWRkT3BlbjogdHJ1ZSB9KX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFRhc2tzQ29udGFpbmVyIC8+XG4gICAgICAgIDxEaWFsb2dBZGRcbiAgICAgICAgICBvcGVuPXtpc0RpYWxvZ0FkZE9wZW59XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IGlzRGlhbG9nQWRkT3BlbjogZmFsc2UgfSl9XG4gICAgICAgIC8+XG4gICAgICAgIDxTbmFja2JhclxuICAgICAgICAgIHNob3c9e21lc3NhZ2Uuc2hvd31cbiAgICAgICAgICBpc0Vycm9yPXttZXNzYWdlLmlzRXJyb3J9XG4gICAgICAgICAgbWVzc2FnZT17bWVzc2FnZS50ZXh0fVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IGhpZGVNZXNzYWdlKCl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblRvZG9zLnByb3BUeXBlcyA9IHtcbiAgbWVzc2FnZTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBzaG93OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzRXJyb3I6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkLFxuICBoaWRlTWVzc2FnZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaW5pdEZldGNoQWxsQ2F0ZWdvcmllczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgc2hvd0xvYWRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb2RvcztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdXR0b25EZWxldGVDYXRlZ29yeSA9ICh7IG9uQ2xpY2sgfSkgPT4gKFxuICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvbi1kZWxldGUtY2F0ZWdvcnlcIiBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICA8aSBjbGFzc05hbWU9XCJpY29uLWRlbGV0ZVwiIC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uRGVsZXRlQ2F0ZWdvcnkucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uRGVsZXRlQ2F0ZWdvcnk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb25Hcm91cCB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuaW1wb3J0IHNjcm9sbCBmcm9tICdzY3JvbGwnO1xuaW1wb3J0IEJ1dHRvblNjcm9sbCBmcm9tICcuLi8uLi9sYXlvdXQvQnV0dG9uU2NvbGwnO1xuaW1wb3J0IENhdGVnb3J5IGZyb20gJy4vQ2F0ZWdvcnknO1xuaW1wb3J0IEZhZGUgZnJvbSAnLi4vLi4vYW5pbXMvRmFkZSc7XG5cbmNsYXNzIENhdGVnb3JpZXNGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjaGlwcyA9IHVuZGVmaW5lZDtcblxuICBoYW5kbGVMZWZ0U2Nyb2xsQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuY2hpcHMpIHtcbiAgICAgIHRoaXMubW92ZUNoaXBzU2Nyb2xsKC10aGlzLmNoaXBzLmNsaWVudFdpZHRoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVSaWdodFNjcm9sbENsaWNrID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmNoaXBzKSB7XG4gICAgICB0aGlzLm1vdmVDaGlwc1Njcm9sbCh0aGlzLmNoaXBzLmNsaWVudFdpZHRoKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlQ2hpcHNTY3JvbGwgPSAoZGVsdGEpID0+IHtcbiAgICBpZiAodGhpcy5jaGlwcykge1xuICAgICAgY29uc3QgbmV4dFNjcm9sbExlZnQgPSB0aGlzLmNoaXBzLnNjcm9sbExlZnQgKyBkZWx0YTtcbiAgICAgIHNjcm9sbC5sZWZ0KHRoaXMuY2hpcHMsIG5leHRTY3JvbGxMZWZ0KTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjYXRlZ29yeUxpc3QsIG9uRGVsZXRlQ2F0ZWdvcnksIG9uQ2lsY2tDYXRlZ29yeSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cImNvbnRlbnQtY2F0ZWdvcmllcy1maWx0ZXJcIj5cbiAgICAgICAgPEJ1dHRvblNjcm9sbFxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTGVmdFNjcm9sbENsaWNrfVxuICAgICAgICAgIGRpcmVjdGlvbj1cImxlZnRcIlxuICAgICAgICAvPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwiY2F0ZWdvcmllcy1maWx0ZXJcIlxuICAgICAgICAgIHJlZj17KG5vZGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hpcHMgPSBub2RlO1xuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8VHJhbnNpdGlvbkdyb3VwIHN0eWxlPXt7IGRpc3BsYXk6ICdpbmhlcml0JywgcGFkZGluZ0xlZnQ6ICcxLjI1ZW0nLCBwYWRkaW5nUmlnaHQ6ICcxLjI1ZW0nIH19PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjYXRlZ29yeUxpc3QubWFwKGNhdGVnb3J5ID0+IChcbiAgICAgICAgICAgICAgICA8RmFkZSBrZXk9e2NhdGVnb3J5LmlkfT5cbiAgICAgICAgICAgICAgICAgIDxDYXRlZ29yeVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2NhdGVnb3J5LmlkfVxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeT17Y2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtjYXRlZ29yeS5zZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICAgb25EZWxldGU9e29uRGVsZXRlQ2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2lsY2tDYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9GYWRlPlxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvVHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEJ1dHRvblNjcm9sbFxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlUmlnaHRTY3JvbGxDbGlja31cbiAgICAgICAgICBkaXJlY3Rpb249XCJyaWdodFwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkNhdGVnb3JpZXNGaWx0ZXIucHJvcFR5cGVzID0ge1xuICBjYXRlZ29yeUxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIG9uRGVsZXRlQ2F0ZWdvcnk6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNpbGNrQ2F0ZWdvcnk6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5DYXRlZ29yaWVzRmlsdGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25EZWxldGVDYXRlZ29yeTogdW5kZWZpbmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0ZWdvcmllc0ZpbHRlcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEJ1dHRvbkRlbGV0ZUNhdGVnb3J5IGZyb20gJy4vQnV0dG9uRGVsZXRlQ2F0ZWdvcnknO1xuXG5jb25zdCBDYXRlZ29yeSA9ICh7XG4gIGNhdGVnb3J5LCBzZWxlY3RlZCwgb25DbGljaywgb25EZWxldGUsXG59KSA9PiB7XG4gIGxldCBjc3NDbGFzcyA9ICcnO1xuXG4gIGNvbnN0IG9uQ2hpcENsaWNrID0gKGUpID0+IHtcbiAgICBvbkNsaWNrKGNhdGVnb3J5LCBlKTtcbiAgfTtcbiAgY29uc3Qgb25EZWxldGVDbGljayA9ICgpID0+IHtcbiAgICBvbkRlbGV0ZShjYXRlZ29yeSk7XG4gIH07XG5cbiAgaWYgKHNlbGVjdGVkKSB7XG4gICAgY3NzQ2xhc3MgPSAnY2F0ZWdvcnktc2VsZWN0ZWQnO1xuICB9XG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtgJHtjc3NDbGFzc30gY2F0ZWdvcnktY2hpcCBhbGlnbi1pdGVtcy1jZW50ZXJgfVxuICAgICAgb25DbGljaz17b25DaGlwQ2xpY2t9XG4gICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXRlZ29yeS10ZXh0XCI+e2NhdGVnb3J5Lm5hbWV9PC9zcGFuPlxuICAgICAge1xuICAgICAgICAoY2F0ZWdvcnkuaWQgIT09ICcwJyAmJiBvbkRlbGV0ZSAhPT0gdW5kZWZpbmVkKSAmJlxuICAgICAgICAgIDxCdXR0b25EZWxldGVDYXRlZ29yeSBvbkNsaWNrPXtvbkRlbGV0ZUNsaWNrfSAvPlxuICAgICAgfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuQ2F0ZWdvcnkucHJvcFR5cGVzID0ge1xuICBvbkRlbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNhdGVnb3J5OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbn07XG5cbkNhdGVnb3J5LmRlZmF1bHRQcm9wcyA9IHtcbiAgb25EZWxldGU6IHVuZGVmaW5lZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENhdGVnb3J5O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IHsgQUREX1RBU0sgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IHsgYWRkQ2F0ZWdvcnkgfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUluZm8gfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcblxuY2xhc3MgQWRkQ2F0ZWdvcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0ZSA9IHtcbiAgICBuYW1lOiAnJyxcbiAgfTtcblxuICBvbklucHV0VGV4dENoYW5nZSA9IChlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IG5hbWU6IGUudGFyZ2V0LnZhbHVlIH0pO1xuICB9XG5cbiAgb25CdXR0b25BZGRDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IG5hbWUgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBkaXNwYXRjaCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAobmFtZSA9PT0gJycpIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlSW5mbyhsYWJlbHMubXNnTmFtZVJlcXVpcmVkKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRpc3BhdGNoKGFkZENhdGVnb3J5KG5hbWUsIHRoaXMub25DYXRlZ29yeUNyZWF0ZWQpKTtcbiAgfVxuXG4gIG9uQ2F0ZWdvcnlDcmVhdGVkID0gKHNlbGVjdGVkQ2F0ZWdvcnkpID0+IHtcbiAgICBjb25zdCB7IG9uTmV4dCB9ID0gdGhpcy5wcm9wcztcbiAgICBvbk5leHQoeyBzdGVwSWQ6IEFERF9UQVNLLCBvcHRpb25zOiB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWFkZC1jYXRlZ29yeVwiPlxuICAgICAgICA8aDI+e2xhYmVscy50aXRsZUFkZENhdGVnb3J5fTwvaDI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtsYWJlbHMucGxhY2Vob2xkZXJOYW1lfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dFRleHRDaGFuZ2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1idXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkJ1dHRvbkFkZENsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYWJlbHMuYnV0dG9uQWRkfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQWRkQ2F0ZWdvcnkucHJvcFR5cGVzID0ge1xuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCgpKEFkZENhdGVnb3J5KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvbGFiZWxzJztcbmltcG9ydCB7IFNFTEVDVF9DT01QTEVURV9EQVRFIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5jbGFzcyBBZGRUYXNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGUgPSB7XG4gICAgdGl0bGU6ICcnLFxuICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgfTtcblxuICBvbklucHV0VGV4dENoYW5nZSA9IG5hbWUgPT4gZSA9PlxuICAgIHRoaXMuc2V0U3RhdGUoeyBbbmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pO1xuXG4gIG9uQnV0dG9uU2NoZWR1bGVDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9wdGlvbnMsIGRpc3BhdGNoLCBvbk5leHQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyB0aXRsZSwgZGVzY3JpcHRpb24gfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgY2F0ZWdvcnkgPSBvcHRpb25zLnNlbGVjdGVkQ2F0ZWdvcnk7XG4gICAgaWYgKHRpdGxlID09PSAnJykge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VJbmZvKGxhYmVscy5tc2dUaXRsZVJlcXVpcmVkKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9uTmV4dCh7IHN0ZXBJZDogU0VMRUNUX0NPTVBMRVRFX0RBVEUsIG9wdGlvbnM6IHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBjYXRlZ29yeSB9IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgc2VsZWN0ZWRDYXRlZ29yeSB9ID0gdGhpcy5wcm9wcy5vcHRpb25zO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtYWRkLXRhc2tcIj5cbiAgICAgICAgPGgyPntsYWJlbHMudGl0bGVBZGRUYXNrfTwvaDI+XG4gICAgICAgIDxoMz5cbiAgICAgICAgICB7bGFiZWxzLmxhYmVsRm9yQ2F0ZWdvcnl9XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGFiZWwtY2F0ZWdvcnktbmFtZVwiPlxuICAgICAgICAgICAge2AgJHtzZWxlY3RlZENhdGVnb3J5Lm5hbWV9YH1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvaDM+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1maWVsZHNcIj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4taW5wdXRcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2xhYmVscy5wbGFjZUhvbGRlclRpdGxlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dFRleHRDaGFuZ2UoJ3RpdGxlJyl9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4taW5wdXRcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2xhYmVscy5wbGFjZUhvbGRlckRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dFRleHRDaGFuZ2UoJ2Rlc2NyaXB0aW9uJyl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1idXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkJ1dHRvblNjaGVkdWxlQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xhYmVscy5idXR0b25TY2hlZHVsZX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkFkZFRhc2sucHJvcFR5cGVzID0ge1xuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb3B0aW9uczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBzZWxlY3RlZENhdGVnb3J5OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB9KS5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkLFxuICBvbk5leHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCkoQWRkVGFzayk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IFNlbGVjdEFjdGlvbkFkZCBmcm9tICcuL1NlbGVjdEFjdGlvbkFkZCc7XG5pbXBvcnQgQWRkQ2F0ZWdvcnkgZnJvbSAnLi9BZGRDYXRlZ29yeSc7XG5pbXBvcnQgU2VsZWN0Q2F0ZWdvcnkgZnJvbSAnLi9TZWxlY3RDYXRlZ29yeSc7XG5pbXBvcnQgQWRkVGFzayBmcm9tICcuL0FkZFRhc2snO1xuaW1wb3J0IFNlbGVjdENvbXBsZXRlRGF0ZSBmcm9tICcuL1NlbGVjdENvbXBsZXRlRGF0ZSc7XG5pbXBvcnQgRG9uZSBmcm9tICcuL0RvbmUnO1xuaW1wb3J0IHtcbiAgU0VMRUNUX1dBTlRfVE9fQURELFxuICBBRERfQ0FURUdPUlksXG4gIEFERF9UQVNLLFxuICBTRUxFQ1RfQ0FURUdPUlksXG4gIFNFTEVDVF9DT01QTEVURV9EQVRFLFxuICBET05FLFxuICBzdGVwTGlzdCxcbn0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCBSZXBsYWNlQW5pbSBmcm9tICcuLi8uLi9hbmltcy9SZXBsYWNlQW5pbSc7XG5pbXBvcnQgRGlhbG9nQW5pbSBmcm9tICcuLi8uLi9hbmltcy9EaWFsb2dBbmltJztcbmltcG9ydCBTdGVwcyBmcm9tICcuL1N0ZXBzJztcbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5cbmNvbnN0IGdldENvbnRlbnRUb1JlbmRlciA9IChzdGVwcywgcHJvcHMpID0+IHtcbiAgaWYgKHN0ZXBzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiA8U2VsZWN0QWN0aW9uQWRkIHsuLi5wcm9wc30gLz47XG4gIH1cbiAgY29uc3QgbGFzdFN0ZXAgPSBzdGVwc1tzdGVwcy5sZW5ndGggLSAxXTtcbiAgc3dpdGNoIChsYXN0U3RlcC5zdGVwSWQpIHtcbiAgICBjYXNlIFNFTEVDVF9XQU5UX1RPX0FERDpcbiAgICAgIHJldHVybiA8U2VsZWN0QWN0aW9uQWRkIHsuLi5wcm9wc30gLz47XG4gICAgY2FzZSBBRERfQ0FURUdPUlk6XG4gICAgICByZXR1cm4gPEFkZENhdGVnb3J5IHsuLi5wcm9wc30gLz47XG4gICAgY2FzZSBBRERfVEFTSzpcbiAgICAgIHJldHVybiA8QWRkVGFzayB7Li4ucHJvcHN9IG9wdGlvbnM9e2xhc3RTdGVwLm9wdGlvbnN9IC8+O1xuICAgIGNhc2UgU0VMRUNUX0NBVEVHT1JZOlxuICAgICAgcmV0dXJuIDxTZWxlY3RDYXRlZ29yeSB7Li4ucHJvcHN9IC8+O1xuICAgIGNhc2UgU0VMRUNUX0NPTVBMRVRFX0RBVEU6XG4gICAgICByZXR1cm4gPFNlbGVjdENvbXBsZXRlRGF0ZSB7Li4ucHJvcHN9IG9wdGlvbnM9e2xhc3RTdGVwLm9wdGlvbnN9IC8+O1xuICAgIGNhc2UgRE9ORTpcbiAgICAgIHJldHVybiA8RG9uZSB7Li4ucHJvcHN9IC8+O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gPFNlbGVjdEFjdGlvbkFkZCB7Li4ucHJvcHN9IC8+O1xuICB9XG59O1xuXG5jb25zdCBpbml0YWxTdGF0ZSA9IHtcbiAgbmV4dFN0ZXBzOiBbXSxcbiAgc3RlcHM6IFtcbiAgICB7XG4gICAgICBzdGVwSWQ6IFNFTEVDVF9XQU5UX1RPX0FERCxcbiAgICAgIG9wdGlvbnM6IHt9LFxuICAgIH0sXG4gIF0sXG4gIHNob3dTdGVwOiB0cnVlLFxufTtcblxuY2xhc3MgRGlhbG9nQWRkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGUgPSB7XG4gICAgLi4uaW5pdGFsU3RhdGUsXG4gIH07XG5cbiAgb25CYWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc3RlcHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvbkNsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHN0ZXBDb3VudCA9IHN0ZXBzLmxlbmd0aDtcbiAgICBpZiAoc3RlcENvdW50ID09PSAxKSB7XG4gICAgICAvLyBSZXR1cm5lZCB0byB0aGUgZmlyc3Qgc3RlcHMsIGNsb3NlIHRoZSBkaWFsb2dcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi5pbml0YWxTdGF0ZSB9KTtcbiAgICAgIG9uQ2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5leHRTdGVwczogW1xuICAgICAgICAgIC4uLnN0ZXBzLnNsaWNlKDAsIHN0ZXBzLmxlbmd0aCAtIDEpLFxuICAgICAgICBdLFxuICAgICAgICBzaG93U3RlcDogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbk5leHQgPSAoc3RlcCA9IHsgc3RlcElkOiAnJywgb3B0aW9uczoge30gfSkgPT4ge1xuICAgIGNvbnN0IHsgc3RlcHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZXh0U3RlcHM6IFtcbiAgICAgICAgLi4uc3RlcHMsIHtcbiAgICAgICAgICAuLi5zdGVwLFxuICAgICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHNob3dTdGVwOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIG9uUmVzZXRBbmRDbG9zZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9uQ2xvc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgb25DbG9zZSgpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLmluaXRhbFN0YXRlIH0pO1xuICAgIH0sIDUwMCk7XG4gIH1cblxuICBvbkFuaW1hdGlvbkVuZCA9IChub2RlLCBkb25lKSA9PiB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgKCkgPT4ge1xuICAgICAgZG9uZSgpO1xuICAgICAgY29uc3QgeyBuZXh0U3RlcHMsIHNob3dTdGVwIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgaWYgKHNob3dTdGVwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzdGVwczogW1xuICAgICAgICAgIC4uLm5leHRTdGVwcyxcbiAgICAgICAgXSxcbiAgICAgICAgc2hvd1N0ZXA6IHRydWUsXG4gICAgICB9KTtcbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBzdGVwcywgc2hvd1N0ZXAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvbkNsb3NlLCBvcGVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgb25OZXh0LCBvblJlc2V0QW5kQ2xvc2UsIG9uQW5pbWF0aW9uRW5kIH0gPSB0aGlzO1xuICAgIHJldHVybiAoXG4gICAgICA8RGlhbG9nQW5pbSBpbj17b3Blbn0+XG4gICAgICAgIDxkaXYgaWQ9XCJkaWFsb2ctYWRkXCIgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlhbG9nLWhlYWRlclwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cIm1haW4tY2xvc2UtYnV0dG9uXCIgb25DbGljaz17KCkgPT4gb25DbG9zZSgpfT5cbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj4mI3hFNUNEOzwvaT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcHMtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8U3RlcHNcbiAgICAgICAgICAgICAgbGlzdD17c3RlcExpc3R9XG4gICAgICAgICAgICAgIHN0ZXBIaXN0b3J5PXtzdGVwc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaWFsb2ctY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8UmVwbGFjZUFuaW0gaW49e3Nob3dTdGVwfSBlbmRMaXN0ZW5lcj17b25BbmltYXRpb25FbmR9PlxuICAgICAgICAgICAgICB7Z2V0Q29udGVudFRvUmVuZGVyKHN0ZXBzLCB7IG9uTmV4dCwgb25DbG9zZTogb25SZXNldEFuZENsb3NlIH0pfVxuICAgICAgICAgICAgPC9SZXBsYWNlQW5pbT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpYWxvZy1mb290ZXJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgaWQ9XCJiYWNrLWJ1dHRvbi1kaWFsb2dcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMub25CYWNrKCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtsYWJlbHMuYnV0dG9uQmFja31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvRGlhbG9nQW5pbT5cbiAgICApO1xuICB9XG59XG5cbkRpYWxvZ0FkZC5wcm9wVHlwZXMgPSB7XG4gIG9wZW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaWFsb2dBZGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5cbmNsYXNzIERvbmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHsgb25DbG9zZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgIG9uQ2xvc2UoKTtcbiAgICB9LCAzMDAwKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWRvbmUtYWRkXCI+XG4gICAgICAgIDxoMj57bGFiZWxzLmxhYmVsRG9uZX08L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtaWMtZG9uZVwiPlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz1cIi4vY2xpZW50L3B1YmxpYy9pbWcvaWMtZG9uZS5zdmdcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaWMtZG9uZVwiXG4gICAgICAgICAgICBhbHQ9XCJkb25lIGljb25cIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Eb25lLnByb3BUeXBlcyA9IHtcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERvbmU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHsgQUREX0NBVEVHT1JZLCBTRUxFQ1RfQ0FURUdPUlkgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvbGFiZWxzJztcblxuY29uc3QgU2VsZWN0QWN0aW9uQWRkID0gKHsgb25OZXh0IH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LXNlbGVjdC1hY3Rpb24tYWRkXCI+XG4gICAgPGgyPntsYWJlbHMudGl0bGVBZGR9PC9oMj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW0tc2VsZWN0XCI+XG4gICAgICA8cFxuICAgICAgICBjbGFzc05hbWU9XCJzZWxlY3QtdGl0bGVcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk5leHQoeyBzdGVwSWQ6IEFERF9DQVRFR09SWSwgb3B0aW9uczoge30gfSl9XG4gICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgPlxuICAgICAgICB7bGFiZWxzLmxhYmVsQ2F0ZWdvcnl9XG4gICAgICA8L3A+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtLXNlbGVjdFwiPlxuICAgICAgPHBcbiAgICAgICAgY2xhc3NOYW1lPVwic2VsZWN0LXRpdGxlXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4gb25OZXh0KHsgc3RlcElkOiBTRUxFQ1RfQ0FURUdPUlksIG9wdGlvbnM6IHt9IH0pfVxuICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgID5cbiAgICAgICAge2xhYmVscy5sYWJlbFRhc2t9XG4gICAgICA8L3A+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuU2VsZWN0QWN0aW9uQWRkLnByb3BUeXBlcyA9IHtcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0QWN0aW9uQWRkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IENhdGVnb3J5IGZyb20gJy4uL2NhdGVnb3J5L0NhdGVnb3J5JztcbmltcG9ydCB7IEFERF9UQVNLIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5cbmNsYXNzIFNlbGVjdENhdGVnb3J5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGUgPSB7XG4gICAgc2VsZWN0ZWRDYXRlZ29yeTogdW5kZWZpbmVkLFxuICB9O1xuXG4gIG9uQ2F0ZWdvcnlDbGljayA9IChjYXRlZ29yeSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZENhdGVnb3J5OiBjYXRlZ29yeSB9KTtcbiAgfVxuXG4gIG9uQnV0dG9uTmV4dENsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc2VsZWN0ZWRDYXRlZ29yeSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IG9uTmV4dCwgZGlzcGF0Y2ggfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKHNlbGVjdGVkQ2F0ZWdvcnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VJbmZvKGxhYmVscy5tc2dTZWxlY3RDYXRlZ29yeSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvbk5leHQoeyBzdGVwSWQ6IEFERF9UQVNLLCBvcHRpb25zOiB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNhdGVnb3JpZXNMaXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgc2VsZWN0ZWRDYXRlZ29yeSB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LXNlbGVjdC1jYXRlZ29yeVwiPlxuICAgICAgICA8aDI+e2xhYmVscy50aXRsZUNob29zZUNhdGVnb3J5fTwvaDI+XG4gICAgICAgIDxkaXYgaWQ9XCJjb250ZW50LWNhdGVnb3JpZXNcIj5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBjYXRlZ29yaWVzTGlzdC5tYXAoY2F0ZWdvcnkgPT4gKFxuICAgICAgICAgICAgICAoY2F0ZWdvcnkuaWQgIT09ICcwJylcbiAgICAgICAgICAgICAgPyA8Q2F0ZWdvcnlcbiAgICAgICAgICAgICAgICBrZXk9e2NhdGVnb3J5LmlkfVxuICAgICAgICAgICAgICAgIGNhdGVnb3J5PXtjYXRlZ29yeX1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17c2VsZWN0ZWRDYXRlZ29yeSAhPT0gdW5kZWZpbmVkICYmIGNhdGVnb3J5LmlkID09PSBzZWxlY3RlZENhdGVnb3J5LmlkfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DYXRlZ29yeUNsaWNrfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSlcbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4tYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25CdXR0b25OZXh0Q2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xhYmVscy5idXR0b25OZXh0fVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuU2VsZWN0Q2F0ZWdvcnkucHJvcFR5cGVzID0ge1xuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY2F0ZWdvcmllc0xpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wID0gc3RhdGUgPT4gKFxuICB7XG4gICAgY2F0ZWdvcmllc0xpc3Q6IHN0YXRlLnRvZG9GaWx0ZXJzLmNhdGVnb3JpZXMsXG4gIH1cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3ApKFNlbGVjdENhdGVnb3J5KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBEYXRlUGlja2VyIGZyb20gJ3JlYWN0LWRhdGUtcGlja2VyJztcblxuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvbGFiZWxzJztcbmltcG9ydCB7IERPTkUgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IHsgYWRkVGFzayB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvdG9kb1Rhc2tzQWN0aW9ucyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUluZm8gfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcblxuY2xhc3MgU2VsZWN0Q29tcGxldGVEYXRlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGUgPSB7XG4gICAgdG9kb1dpdGhpbjogbmV3IERhdGUoKSxcbiAgfTtcblxuICBvbklucHV0RGF0ZUNoYW5nZSA9IChkYXRlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHRvZG9XaXRoaW46IGRhdGUgfSk7XG4gIH1cblxuICBvbkJ1dHRvbkFkZENsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgdG9kb1dpdGhpbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IGRpc3BhdGNoLCBvcHRpb25zIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBjYXRlZ29yeSB9ID0gb3B0aW9ucztcbiAgICBpZiAoIXRvZG9XaXRoaW4gfHwgdG9kb1dpdGhpbiA9PT0gJycpIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlSW5mbyhsYWJlbHMubXNnU2VsZWN0RGF0ZSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkaXNwYXRjaChhZGRUYXNrKFxuICAgICAgdGl0bGUsIGRlc2NyaXB0aW9uLFxuICAgICAgY2F0ZWdvcnksIHRvZG9XaXRoaW4sIHRoaXMub25Ub2RvVGFza0NyZWF0ZWQsXG4gICAgKSk7XG4gIH1cblxuICBvblRvZG9UYXNrQ3JlYXRlZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9uTmV4dCB9ID0gdGhpcy5wcm9wcztcbiAgICBvbk5leHQoeyBzdGVwSWQ6IERPTkUsIG9wdGlvbnM6IHsgfSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHRvZG9XaXRoaW4gfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1zZWxlY3QtY29tcGxldGUtZGF0ZVwiPlxuICAgICAgICA8aDI+e2xhYmVscy50aXRsZVRvZG9XaXRoaW59PC9oMj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWlucHV0XCI+XG4gICAgICAgICAgPERhdGVQaWNrZXJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4taW5wdXRcIlxuICAgICAgICAgICAgY2FsZW5kYXJDbGFzc05hbWU9XCJkYXJrLWNhbGVuZGFyXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXREYXRlQ2hhbmdlfVxuICAgICAgICAgICAgdmFsdWU9e3RvZG9XaXRoaW59XG4gICAgICAgICAgICBtaW5EYXRlPXtuZXcgRGF0ZSgpfVxuICAgICAgICAgICAgbG9jYWxlPVwiZW4tVVNcIlxuICAgICAgICAgICAgY2xlYXJJY29uPXs8aSBjbGFzc05hbWU9XCJpY29uLWRlbGV0ZVwiIC8+fVxuICAgICAgICAgICAgY2FsZW5kYXJJY29uPXs8aSBjbGFzc05hbWU9XCJpY29uLWNhbGVuZGFyXCIgLz59XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1idXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkJ1dHRvbkFkZENsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYWJlbHMuYnV0dG9uQWRkfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuU2VsZWN0Q29tcGxldGVEYXRlLnByb3BUeXBlcyA9IHtcbiAgZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9wdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNhdGVnb3J5OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB9KS5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkLFxuICBvbk5leHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCkoU2VsZWN0Q29tcGxldGVEYXRlKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBTdGVwID0gKHsgZGVzY3JpcHRpb24sIGNvbXBsZXRlZCwgbmVlZExpbmUgfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtY29udGFpbmVyXCI+XG4gICAge1xuICAgICAgbmVlZExpbmUgJiZcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbGluZSAkeyhjb21wbGV0ZWQpID8gJ2NvbXBsZXRlZCcgOiAnJ31gfSAvPlxuICAgIH1cbiAgICA8ZGl2IGNsYXNzTmFtZT17YHN0ZXAgJHsoY29tcGxldGVkKSA/ICdjb21wbGV0ZWQnIDogJyd9YH0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImluZGljYXRvclwiIC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtZGVzY3JpcHRpb25cIj5cbiAgICAgICAgPHA+e2Rlc2NyaXB0aW9ufTwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbik7XG5cblN0ZXAucHJvcFR5cGVzID0ge1xuICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIG5lZWRMaW5lOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuY29uc3QgU3RlcHMgPSAoeyBsaXN0LCBzdGVwSGlzdG9yeSB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwic3RlcHMtd3JhcHBlclwiPlxuICAgIHtcbiAgICAgIGxpc3QubWFwKChpdGVtLCBpKSA9PiAoXG4gICAgICAgIDxTdGVwXG4gICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgIHsuLi5pdGVtfVxuICAgICAgICAgIGNvbXBsZXRlZD17c3RlcEhpc3RvcnkuZmlsdGVyKHNoID0+IHNoLnN0ZXBJZCA9PT0gaXRlbS5pZCkubGVuZ3RoID4gMH1cbiAgICAgICAgICBuZWVkTGluZT17aSA+IDB9XG4gICAgICAgIC8+KSlcbiAgICB9XG4gIDwvZGl2PlxuKTtcblxuU3RlcHMucHJvcFR5cGVzID0ge1xuICBsaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgZGVzY3JpcHRpb246IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgc3RlcEhpc3Rvcnk6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc3RlcElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9KSkuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN0ZXBzO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEJ1dHRvbkNvbXBsZXRlVGFzayA9ICh7IG9uQ2xpY2ssIGNvbXBsZXRlZCB9KSA9PiAoXG4gIDxidXR0b25cbiAgICBjbGFzc05hbWU9e2BidXR0b24tY29tcGxldGUtdGFzayAkeyhjb21wbGV0ZWQpID8gJ2J1dHRvbi1jb21wbGV0ZWQtdGFzaycgOiAnJ31gfVxuICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gID5cbiAgICA8aSBjbGFzc05hbWU9XCJpY29uLWNoZWNrXCIgLz5cbiAgPC9idXR0b24+XG4pO1xuXG5CdXR0b25Db21wbGV0ZVRhc2sucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLFxufTtcblxuQnV0dG9uQ29tcGxldGVUYXNrLmRlZmF1bHRQcm9wcyA9IHtcbiAgY29tcGxldGVkOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkNvbXBsZXRlVGFzaztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdXR0b25EZWxldGVUYXNrID0gKHsgb25DbGljayB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLWRlbGV0ZS10YXNrXCIgb25DbGljaz17b25DbGlja30+XG4gICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1kZWxldGVcIiAvPlxuICA8L2J1dHRvbj5cbik7XG5cbkJ1dHRvbkRlbGV0ZVRhc2sucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uRGVsZXRlVGFzaztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IENvbGxhcHNlIGZyb20gJy4uLy4uL2FuaW1zL0NvbGxhcHNlJztcbmltcG9ydCBGYWRlIGZyb20gJy4uLy4uL2FuaW1zL0ZhZGUnO1xuaW1wb3J0IEJ1dHRvbkNvbXBsZXRlVGFzayBmcm9tICcuL0J1dHRvbkNvbXBsZXRlVGFzayc7XG5pbXBvcnQgQnV0dG9uRGVsZXRlVGFzayBmcm9tICcuL0J1dHRvbkRlbGV0ZVRhc2snO1xuaW1wb3J0IHsgdG9TaW1wbGVEYXRlRm9ybWF0IH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvQ29tbW9uJztcbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5cbmNsYXNzIFRhc2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0ZSA9IHtcbiAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICB9O1xuXG4gIG9uVGl0bGVDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IGNvbGxhcHNlZCB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnNldFN0YXRlKHsgY29sbGFwc2VkOiAhY29sbGFwc2VkIH0pO1xuICB9XG5cbiAgcmVuZGVyRGF0ZSgpIHtcbiAgICBjb25zdCB7IHRhc2sgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKHRhc2suY29tcGxldGVkKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8cCBjbGFzc05hbWU9XCJjb21wbGV0ZS1kYXRlXCI+e2Ake2xhYmVscy5sYWJlbFBhcnRpYWxDb21wbGV0ZWR9ICR7KHRhc2suY29tcGxldGVkQXQpID8gdG9TaW1wbGVEYXRlRm9ybWF0KHRhc2suY29tcGxldGVkQXQpIDogJyd9YH08L3A+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPHAgY2xhc3NOYW1lPVwiY29tcGxldGUtd2l0aGluLWRhdGVcIj57YCR7bGFiZWxzLmxhYmVsUGFydGlhbFRvQ29tcGxldGVkfSAkeyh0YXNrLnRvZG9XaXRoaW4pID8gdG9TaW1wbGVEYXRlRm9ybWF0KHRhc2sudG9kb1dpdGhpbikgOiBsYWJlbHMubGFiZWxOb3RTZXR9YH08L3A+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHRhc2ssIG9uRGVsZXRlLCBvbkNvbXBsZXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY29sbGFwc2VkIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhc2staXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhc2staGVhZGVyXCI+XG4gICAgICAgICAgPHBcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHRhc2stdGl0bGUgJHsodGFzay5jb21wbGV0ZWQpID8gJ3Rhc2stdGl0bGUtY29tcGxldGVkJyA6ICcnfWB9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uVGl0bGVDbGljaygpfVxuICAgICAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3Rhc2sudGl0bGV9XG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxGYWRlIGluPXtjb2xsYXBzZWR9PlxuICAgICAgICAgICAgPEJ1dHRvbkRlbGV0ZVRhc2tcbiAgICAgICAgICAgICAgb25DbGljaz17b25EZWxldGV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvRmFkZT5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBvbkNvbXBsZXRlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIDxCdXR0b25Db21wbGV0ZVRhc2tcbiAgICAgICAgICAgICAgb25DbGljaz17b25Db21wbGV0ZX1cbiAgICAgICAgICAgICAgY29tcGxldGVkPXt0YXNrLmNvbXBsZXRlZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YXNrLWRhdGVcIj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJEYXRlKCl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Q29sbGFwc2UgaW49e2NvbGxhcHNlZH0+XG4gICAgICAgICAgPGRpdiBrZXk9e3Rhc2suZGVzY3JpcHRpb259IGNsYXNzTmFtZT1cInRhc2stYm9keVwiPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGFzay1kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgKHRhc2suZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCAmJiB0YXNrLmRlc2NyaXB0aW9uICE9PSAnJylcbiAgICAgICAgICAgICAgICA/IHRhc2suZGVzY3JpcHRpb24gOiA8c3BhbiBjbGFzc05hbWU9XCJlbXB0eVwiPntsYWJlbHMubGFiZWxOb0Rlc2NyaXB0aW9ufTwvc3Bhbj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NvbGxhcHNlPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5UYXNrLnByb3BUeXBlcyA9IHtcbiAgb25EZWxldGU6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNvbXBsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgdGFzazogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGNvbXBsZXRlZEF0OiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICB9KS5pc1JlcXVpcmVkLFxufTtcblxuVGFzay5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uRGVsZXRlOiB1bmRlZmluZWQsXG4gIG9uQ29tcGxldGU6IHVuZGVmaW5lZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2s7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb25Hcm91cCB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuaW1wb3J0IFJlc2l6ZSBmcm9tICcuLi8uLi9hbmltcy9SZXNpemUnO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrJztcbmltcG9ydCBJbmZpbml0ZVNjcm9sbCBmcm9tICcuLi8uLi9sYXlvdXQvSW5maW5pdGVTY3JvbGwnO1xuaW1wb3J0IHsgcXVlcnlJdGVtc0xpbWl0IH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgbGltaXQ6IHF1ZXJ5SXRlbXNMaW1pdCxcbiAgc2tpcDogMCxcbn07XG5cbmNsYXNzIFRhc2tzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGUgPSBpbml0aWFsU3RhdGU7XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhuZXh0UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIGlmIChuZXh0UHJvcHMuc2tpcCAhPT0gcHJldlN0YXRlLnNraXApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNraXA6IG5leHRQcm9wcy5za2lwLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBvbkZldGNoVG9kb1Rhc2tzTmV4dCA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCxcbiAgICAgIGZldGNoVGFza3MsIG1vcmVUb0xvYWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFtb3JlVG9Mb2FkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgbGltaXQsIHNraXAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgbmV3U2tpcCA9IHNraXAgKyBsaW1pdDtcbiAgICBmZXRjaFRhc2tzKGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgbmV3U2tpcCk7XG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiAoeyBza2lwOiBzdGF0ZS5za2lwICsgc3RhdGUubGltaXQgfSkpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHRhc2tMaXN0LFxuICAgICAgb25EZWxldGVUYXNrLFxuICAgICAgb25Db21wbGV0ZVRhc2ssXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJjb250ZW50LXRvZG8tdGFza3NcIj5cbiAgICAgICAgPEluZmluaXRlU2Nyb2xsIG9uU2Nyb2xsPXt0aGlzLm9uRmV0Y2hUb2RvVGFza3NOZXh0fT5cbiAgICAgICAgICA8VHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0YXNrTGlzdC5tYXAoYXJnID0+IChcbiAgICAgICAgICAgICAgICA8UmVzaXplIGtleT17YXJnLmlkfT5cbiAgICAgICAgICAgICAgICAgIDxUYXNrXG4gICAgICAgICAgICAgICAgICAgIGtleT17YXJnLmlkfVxuICAgICAgICAgICAgICAgICAgICB0YXNrPXthcmd9XG4gICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlPXsoKSA9PiBvbkRlbGV0ZVRhc2soYXJnKX1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17KCkgPT4gb25Db21wbGV0ZVRhc2soYXJnKX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9SZXNpemU+XG4gICAgICAgICAgICAgICkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9UcmFuc2l0aW9uR3JvdXA+XG4gICAgICAgIDwvSW5maW5pdGVTY3JvbGw+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblRhc2tzLnByb3BUeXBlcyA9IHtcbiAgb25EZWxldGVUYXNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkNvbXBsZXRlVGFzazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgdGFza0xpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgbW9yZVRvTG9hZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgZmV0Y2hUYXNrczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY2F0ZWdvcmllc0lkOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKS5pc1JlcXVpcmVkLFxuICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBUYXNrcztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFZpc2liaWxpdHlTd2l0Y2ggZnJvbSAnLi9WaXNpYmlsaXR5U3dpdGNoJztcbmltcG9ydCB7IEFMTF9UT0RPUywgT05MWV9DT01QTEVURUQsIE9OTFlfVE9fQ09NUExFVEUgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvY29uZmlnJztcblxuY29uc3QgVmlzaWJpbGl0eUZpbHRlciA9ICh7XG4gIHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciwgb25WaXNpYmlsaXR5U3dpdGNoQ2xpY2ssXG59KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwidmlzaWJpbGl0eS1maWx0ZXItd3JhcHBlclwiPlxuICAgIDxWaXNpYmlsaXR5U3dpdGNoXG4gICAgICBzZWxlY3RlZD17KHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciA9PT0gT05MWV9UT19DT01QTEVURVxuICAgICAgICB8fCBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IEFMTF9UT0RPUyl9XG4gICAgICBvbkNsaWNrPXtvblZpc2liaWxpdHlTd2l0Y2hDbGljayhPTkxZX1RPX0NPTVBMRVRFKX1cbiAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgID5cbiAgICAgIDxpIGNsYXNzTmFtZT1cImljb24tY2lyY2xlLWJvcmRlclwiIC8+XG4gICAgPC9WaXNpYmlsaXR5U3dpdGNoPlxuICAgIDxWaXNpYmlsaXR5U3dpdGNoXG4gICAgICBzZWxlY3RlZD17KHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciA9PT0gT05MWV9DT01QTEVURURcbiAgICAgICAgfHwgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyID09PSBBTExfVE9ET1MpfVxuICAgICAgb25DbGljaz17b25WaXNpYmlsaXR5U3dpdGNoQ2xpY2soT05MWV9DT01QTEVURUQpfVxuICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgPlxuICAgICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1jaXJjbGVcIiAvPlxuICAgIDwvVmlzaWJpbGl0eVN3aXRjaD5cbiAgPC9kaXY+XG4pO1xuXG5WaXNpYmlsaXR5RmlsdGVyLnByb3BUeXBlcyA9IHtcbiAgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uVmlzaWJpbGl0eVN3aXRjaENsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaWJpbGl0eUZpbHRlcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBWaXNpYmlsaXR5U3dpdGNoID0gKHtcbiAgc2VsZWN0ZWQsIGNoaWxkcmVuLCBvbkNsaWNrLFxufSkgPT4gKFxuICA8ZGl2XG4gICAgY2xhc3NOYW1lPXtgdmlzaWJpbGl0eS1idXR0b24tc3dpdGNoIGFsaWduLWl0ZW1zLWNlbnRlciAkeyhzZWxlY3RlZCkgPyAnc2VsZWN0ZWQnIDogJyd9IGB9XG4gICAgb25DbGljaz17b25DbGlja31cbiAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgPlxuICAgIHtjaGlsZHJlbn1cbiAgPC9kaXY+XG4pO1xuXG5WaXNpYmlsaXR5U3dpdGNoLnByb3BUeXBlcyA9IHtcbiAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cblZpc2liaWxpdHlTd2l0Y2guZGVmYXVsdFByb3BzID0ge1xuICBzZWxlY3RlZDogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBWaXNpYmlsaXR5U3dpdGNoO1xuIiwiY29uc3QgbGFiZWxzID0ge1xuICB0aXRsZUFkZDogJ1doYXQgd291bGQgeW91IGxpa2UgdG8gYWRkPycsXG4gIHRpdGxlQWRkQ2F0ZWdvcnk6ICdBZGQgbmV3IENBVEVHT1JZJyxcbiAgdGl0bGVBZGRUYXNrOiAnQWRkIG5ldyBUYXNrJyxcbiAgdGl0bGVDaG9vc2VDYXRlZ29yeTogJ0Nob29zZSBhIENBVEVHT1JZJyxcbiAgdGl0bGVUb2RvV2l0aGluOiAnVG9kbyBXaXRoaW4nLFxuICBsYWJlbEZvckNhdGVnb3J5OiAnZm9yIHRoZSBjYXRlZ29yeTonLFxuICBsYWJlbERvbmU6ICdEb25lIScsXG4gIGxhYmVsQ2F0ZWdvcnk6ICdDQVRFR09SWScsXG4gIGxhYmVsVGFzazogJ1RBU0snLFxuICBsYWJlbE5vdFNldDogJ25vdCBzZXQnLFxuICBsYWJlbE5vRGVzY3JpcHRpb246ICdObyBkZXNjcmlwdGlvbiB0byBzaG93IDooJyxcbiAgbGFiZWxQYXJ0aWFsQ29tcGxldGVkOiAnY29tcGxldGVkJyxcbiAgbGFiZWxQYXJ0aWFsVG9Db21wbGV0ZWQ6ICd0byBjb21wbGV0ZSB3aXRoaW4nLFxuICBwbGFjZUhvbGRlclRpdGxlOiAnVHlwZSB0aGUgdGl0bGUnLFxuICBwbGFjZUhvbGRlckRlc2NyaXB0aW9uOiAnVHlwZSB0aGUgZGVzY3JpcHRpb24nLFxuICBwbGFjZWhvbGRlck5hbWU6ICdUeXBlIHRoZSBuYW1lJyxcbiAgYnV0dG9uU2NoZWR1bGU6ICdTQ0hFRFVMRScsXG4gIGJ1dHRvbkFkZDogJ0FERCcsXG4gIGJ1dHRvbk5leHQ6ICdORVhUJyxcbiAgYnV0dG9uQmFjazogJ05FVkVSIE1JTkQsIEdPIEJBQ0snLFxuICBtc2dUaXRsZVJlcXVpcmVkOiAnRW50ZXIgdGhlIHRpdGxlJyxcbiAgbXNnTmFtZVJlcXVpcmVkOiAnRW50ZXIgdGhlIG5hbWUnLFxuICBtc2dTZWxlY3RDYXRlZ29yeTogJ1NlbGVjdCBhIGNhdGVnb3J5JyxcbiAgbXNnU2VsZWN0RGF0ZTogJ1BpY2sgYSBkYXRlIGFuZCBjb21taXQuIE5vIGV4Y3VzZXMhJyxcbiAgc3RlcERlc2NXYW50VG9BZGQ6ICdXaGF0IHdhbnQgdG8gYWRkJyxcbiAgc3RlcERlc2NBZGRDYXRlZ29yeTogJ0FkZCBhIGNhdGVnb3J5JyxcbiAgc3RlcERlc2NyU2VsZWNDYXRlZ29yeTogJ1NlbGVjdCBhIGNhdGVnb3J5JyxcbiAgc3RlcERlc2NBZGRUYXNrOiAnQWRkIHRhc2snLFxuICBzdGVwRGVzY0NvbXBsZXRlRGF0ZTogJ1NjaGVkdWxlJyxcbiAgc3RlcERlc2NEb25lOiAnVGhhdFxcJ3MgaXQnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbGFiZWxzO1xuIiwiaW1wb3J0IGxhYmVscyBmcm9tICcuL2xhYmVscyc7XG5cbmV4cG9ydCBjb25zdCBTRUxFQ1RfV0FOVF9UT19BREQgPSAnU0VMRUNUX1dBTlRfVE9fQUREJztcbmV4cG9ydCBjb25zdCBBRERfQ0FURUdPUlkgPSAnQUREX0NBVEVHT1JZJztcbmV4cG9ydCBjb25zdCBBRERfVEFTSyA9ICdBRERfVEFTSyc7XG5leHBvcnQgY29uc3QgU0VMRUNUX0NBVEVHT1JZID0gJ1NFTEVDVF9DQVRFR09SWSc7XG5leHBvcnQgY29uc3QgU0VMRUNUX0NPTVBMRVRFX0RBVEUgPSAnU0VMRUNUX0NPTVBMRVRFX0RBVEUnO1xuZXhwb3J0IGNvbnN0IERPTkUgPSAnRE9ORSc7XG5cbmV4cG9ydCBjb25zdCBzdGVwTGlzdCA9IFtcbiAge1xuICAgIGlkOiBTRUxFQ1RfV0FOVF9UT19BREQsXG4gICAgZGVzY3JpcHRpb246IGxhYmVscy5zdGVwRGVzY1dhbnRUb0FkZCxcbiAgfSxcbiAge1xuICAgIGlkOiBBRERfQ0FURUdPUlksXG4gICAgZGVzY3JpcHRpb246IGxhYmVscy5zdGVwRGVzY0FkZENhdGVnb3J5LFxuICB9LFxuICB7XG4gICAgaWQ6IFNFTEVDVF9DQVRFR09SWSxcbiAgICBkZXNjcmlwdGlvbjogbGFiZWxzLnN0ZXBEZXNjclNlbGVjQ2F0ZWdvcnksXG4gIH0sXG4gIHtcbiAgICBpZDogQUREX1RBU0ssXG4gICAgZGVzY3JpcHRpb246IGxhYmVscy5zdGVwRGVzY0FkZFRhc2ssXG4gIH0sXG4gIHtcbiAgICBpZDogU0VMRUNUX0NPTVBMRVRFX0RBVEUsXG4gICAgZGVzY3JpcHRpb246IGxhYmVscy5zdGVwRGVzY0NvbXBsZXRlRGF0ZSxcbiAgfSxcbiAge1xuICAgIGlkOiBET05FLFxuICAgIGRlc2NyaXB0aW9uOiBsYWJlbHMuc3RlcERlc2NEb25lLFxuICB9LFxuXTtcbiIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgQ2F0ZWdvcmllc0ZpbHRlciBmcm9tICcuLi9jb21wb25lbnRzL3RvZG8vY2F0ZWdvcnkvQ2F0ZWdvcmllc0ZpbHRlcic7XG5pbXBvcnQge1xuICBzZWxlY3RDYXRlZ29yeSxcbiAgc2VsZWN0Q2F0ZWdvcnlBbGwsXG4gIGRlbGV0ZUNhdGVnb3J5LFxufSBmcm9tICcuLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5pbXBvcnQgY2F0ZWdvcnlBbGwgZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmltcG9ydCB7IGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0IH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgY2F0ZWdvcnlMaXN0OiBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdChzdGF0ZSksXG4gIH1cbik7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcbiAge1xuICAgIG9uRGVsZXRlQ2F0ZWdvcnk6IChjYXRlZ29yeSkgPT4ge1xuICAgICAgZGlzcGF0Y2goZGVsZXRlQ2F0ZWdvcnkoY2F0ZWdvcnkuaWQpKTtcbiAgICB9LFxuICAgIG9uQ2lsY2tDYXRlZ29yeTogKGNhdGVnb3J5LCBlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnaScgJiYgZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnYnV0dG9uJykge1xuICAgICAgICBpZiAoY2F0ZWdvcnkuaWQgPT09IGNhdGVnb3J5QWxsLmlkKSB7XG4gICAgICAgICAgZGlzcGF0Y2goc2VsZWN0Q2F0ZWdvcnlBbGwoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGlzcGF0Y2goc2VsZWN0Q2F0ZWdvcnkoY2F0ZWdvcnkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gIH1cbik7XG5cbmNvbnN0IENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIgPSBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbikoQ2F0ZWdvcmllc0ZpbHRlcik7XG5cbmV4cG9ydCBkZWZhdWx0IENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXI7XG4iLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFRhc2tzIGZyb20gJy4uL2NvbXBvbmVudHMvdG9kby90YXNrL1Rhc2tzJztcbmltcG9ydCB7XG4gIGZldGNoVGFza3NCeUNhdGVnb3J5LFxuICBkZWxldGVUYXNrLFxuICB0b29nbGVUYXNrQ29tcGxldGVkLFxufSBmcm9tICcuLi9hY3Rpb25zL3RvZG9UYXNrc0FjdGlvbnMnO1xuXG5pbXBvcnQgeyBnZXRUYXNrTGlzdCwgZ2V0U2tpcCwgc3RpbGxNb3JlVG9Mb2FkIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9UYXNrc1NlbGVjdG9ycyc7XG5pbXBvcnQgeyBnZXRTZWxlY3RlZENhdGVnb3JpZXNJZCwgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICB0YXNrTGlzdDogZ2V0VGFza0xpc3Qoc3RhdGUpLFxuICAgIHNraXA6IGdldFNraXAoc3RhdGUpLFxuICAgIG1vcmVUb0xvYWQ6IHN0aWxsTW9yZVRvTG9hZChzdGF0ZSksXG4gICAgY2F0ZWdvcmllc0lkOiBnZXRTZWxlY3RlZENhdGVnb3JpZXNJZChzdGF0ZSksXG4gICAgY29tcGxldGVkOiB2aXNpYmlsaXR5T25seUNvbXBsZXRlZChzdGF0ZSksXG4gIH1cbik7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcbiAge1xuICAgIG9uRGVsZXRlVGFzazogKHRhc2spID0+IHtcbiAgICAgIGRpc3BhdGNoKGRlbGV0ZVRhc2sodGFzay5pZCkpO1xuICAgIH0sXG4gICAgb25Db21wbGV0ZVRhc2s6ICh0YXNrKSA9PiB7XG4gICAgICBkaXNwYXRjaCh0b29nbGVUYXNrQ29tcGxldGVkKHRhc2suaWQsIHRhc2suY29tcGxldGVkKSk7XG4gICAgfSxcbiAgICBmZXRjaFRhc2tzOiAoY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsIGxpbWl0LCBza2lwKSA9PiB7XG4gICAgICBkaXNwYXRjaChmZXRjaFRhc2tzQnlDYXRlZ29yeShjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCwgbGltaXQsIHNraXApKTtcbiAgICB9LFxuICB9XG4pO1xuXG5jb25zdCBUYXNrc0NvbnRhaW5lciA9IGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuKShUYXNrcyk7XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2tzQ29udGFpbmVyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBUb2RvcyBmcm9tICcuLi9jb21wb25lbnRzL3RvZG8vVG9kb3MnO1xuaW1wb3J0IHsgZmV0Y2hBbGxDYXRlZ29yaWVzIH0gZnJvbSAnLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuaW1wb3J0IHsgaGlkZU1lc3NhZ2UgfSBmcm9tICcuLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcbmltcG9ydCB7IHNob3dMb2FkaW5nIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbW1vblNlbGVjdG9ycyc7XG5cbmNvbnN0IFRvZG9zQ29udGFpbmVyID0gcHJvcHMgPT4gPFRvZG9zIHsuLi5wcm9wc30gLz47XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IChcbiAge1xuICAgIG1lc3NhZ2U6IHN0YXRlLm1lc3NhZ2UsXG4gICAgc2hvd0xvYWRpbmc6IHNob3dMb2FkaW5nKHN0YXRlKSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgaGlkZU1lc3NhZ2U6ICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKGhpZGVNZXNzYWdlKCkpO1xuICAgIH0sXG4gICAgaW5pdEZldGNoQWxsQ2F0ZWdvcmllczogKCkgPT4ge1xuICAgICAgZGlzcGF0Y2goZmV0Y2hBbGxDYXRlZ29yaWVzKCkpO1xuICAgIH0sXG4gIH1cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFRvZG9zQ29udGFpbmVyKTtcbiIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlzaWJpbGl0eUZpbHRlcnMgZnJvbSAnLi4vY29tcG9uZW50cy90b2RvL3Zpc2liaWxpdHkvVmlzaWJpbGl0eUZpbHRlcnMnO1xuaW1wb3J0IHsgY2hhbmdlVmlzaWJpbGl0eSB9IGZyb20gJy4uL2FjdGlvbnMvdG9kb0ZpbHRlcnNBY3Rpb25zJztcblxuaW1wb3J0IHsgZ2V0VmlzaWJpbGl0eUZpbHRlciB9IGZyb20gJy4uL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IChcbiAge1xuICAgIHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlcjogZ2V0VmlzaWJpbGl0eUZpbHRlcihzdGF0ZSksXG4gIH1cbik7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcbiAge1xuICAgIG9uVmlzaWJpbGl0eVN3aXRjaENsaWNrOiB2aXNpYmlsaXR5ID0+ICgpID0+IChcbiAgICAgIGRpc3BhdGNoKGNoYW5nZVZpc2liaWxpdHkodmlzaWJpbGl0eSkpXG4gICAgKSxcbiAgfVxuKTtcblxuY29uc3QgVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lciA9IGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuKShWaXNpYmlsaXR5RmlsdGVycyk7XG5cbmV4cG9ydCBkZWZhdWx0IFZpc2liaWxpdHlGaWx0ZXJDb250YWluZXI7XG4iLCJpbXBvcnQgeyBjcmVhdGVTZWxlY3RvciB9IGZyb20gJ3Jlc2VsZWN0JztcbmltcG9ydCB7IGlzRmV0Y2hpbmdDYXRlZ29yaWVzRmlsdGVyIH0gZnJvbSAnLi90b2RvRmlsdGVyc1NlbGVjdG9ycyc7XG5pbXBvcnQgeyBpc0ZldGNoaW5nVGFza3MgfSBmcm9tICcuL3RvZG9UYXNrc1NlbGVjdG9ycyc7XG5cbmV4cG9ydCBjb25zdCBzaG93TG9hZGluZyA9IGNyZWF0ZVNlbGVjdG9yKFxuICBpc0ZldGNoaW5nQ2F0ZWdvcmllc0ZpbHRlcixcbiAgaXNGZXRjaGluZ1Rhc2tzLFxuICAoaXNGZXRjaGluZ0NhdGVnb3JpZXMsIGlzRmV0Y2hpbmdUb2RvcykgPT4gaXNGZXRjaGluZ0NhdGVnb3JpZXMgfHwgaXNGZXRjaGluZ1RvZG9zLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgc2hvd0xvYWRpbmc7XG4iLCJpbXBvcnQgeyBjcmVhdGVTZWxlY3RvciB9IGZyb20gJ3Jlc2VsZWN0JztcbmltcG9ydCB7IE9OTFlfQ09NUExFVEVEIH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBpc0ZldGNoaW5nQ2F0ZWdvcmllc0ZpbHRlciA9IHN0YXRlID0+IHN0YXRlLnRvZG9GaWx0ZXJzLmlzRmV0Y2hpbmc7XG5leHBvcnQgY29uc3QgZ2V0VG9kb0ZpbHRlcnMgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycztcbmV4cG9ydCBjb25zdCBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdCA9IHN0YXRlID0+IHN0YXRlLnRvZG9GaWx0ZXJzLmNhdGVnb3JpZXM7XG5leHBvcnQgY29uc3QgZ2V0VmlzaWJpbGl0eUZpbHRlciA9IHN0YXRlID0+IHN0YXRlLnRvZG9GaWx0ZXJzLnZpc2liaWxpdHk7XG5cbmV4cG9ydCBjb25zdCB2aXNpYmlsaXR5T25seUNvbXBsZXRlZCA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRWaXNpYmlsaXR5RmlsdGVyLFxuICB2aXNpYmlsaXR5ID0+IHZpc2liaWxpdHkgPT09IE9OTFlfQ09NUExFVEVELFxuKTtcblxuZXhwb3J0IGNvbnN0IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0ZpbHRlciA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdCxcbiAgY2F0ZWdvcmllcyA9PiBjYXRlZ29yaWVzLmZpbHRlcihjYXRlZ29yeSA9PiBjYXRlZ29yeS5zZWxlY3RlZCksXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QsXG4gIGNhdGVnb3JpZXMgPT4gY2F0ZWdvcmllcy5maWx0ZXIoY2F0ZWdvcnkgPT4gY2F0ZWdvcnkuc2VsZWN0ZWQpXG4gICAgLm1hcChjYXRlZ29yeUZpbHRlciA9PiBjYXRlZ29yeUZpbHRlci5pZCksXG4pO1xuIiwiZXhwb3J0IGNvbnN0IGlzRmV0Y2hpbmdUYXNrcyA9IHN0YXRlID0+IHN0YXRlLnRvZG9UYXNrcy5pc0ZldGNoaW5nO1xuZXhwb3J0IGNvbnN0IGdldFRhc2tzID0gc3RhdGUgPT4gc3RhdGUudG9kb1Rhc2tzO1xuZXhwb3J0IGNvbnN0IGdldFRhc2tMaXN0ID0gc3RhdGUgPT4gc3RhdGUudG9kb1Rhc2tzLml0ZW1zO1xuZXhwb3J0IGNvbnN0IGdldFNraXAgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvVGFza3Muc2tpcDtcbmV4cG9ydCBjb25zdCBzdGlsbE1vcmVUb0xvYWQgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvVGFza3MubW9yZVRvTG9hZDtcbiIsImltcG9ydCBkYXRlRm9ybWF0IGZyb20gJ2RhdGVmb3JtYXQnO1xuXG5leHBvcnQgY29uc3QgdG9Kc0RhdGUgPSAocGFyc2VEYXRlID0gJycpID0+XG4gIG5ldyBEYXRlKHBhcnNlSW50KHBhcnNlRGF0ZS5zdWJzdHIoNiksIDEwKSk7XG5cbmV4cG9ydCBjb25zdCB0b1NpbXBsZURhdGVGb3JtYXQgPSBkYXRlID0+XG4gIGRhdGVGb3JtYXQoZGF0ZSwgJ2RkZGQgZGQgbW1tIHl5eXknKTtcblxuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnRCYXNlVXJsID0gKCkgPT4ge1xuICBjb25zdCBnZXRVcmwgPSB3aW5kb3cubG9jYXRpb247XG4gIHJldHVybiBgJHtnZXRVcmwucHJvdG9jb2x9Ly8ke2dldFVybC5ob3N0fWA7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==