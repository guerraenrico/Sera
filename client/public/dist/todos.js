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




var waitTime = 500;

var InfiniteScroll =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InfiniteScroll, _React$Component);

  function InfiniteScroll(props) {
    var _this;

    _classCallCheck(this, InfiniteScroll);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InfiniteScroll).call(this, props));
    _this.onScroll = _this.onScroll.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
    key: "onScroll",
    value: function onScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        var _this$props = this.props,
            args = _this$props.args,
            onScroll = _this$props.onScroll;
        onScroll.apply(void 0, _toConsumableArray(args));
      }
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

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }











var Todos =
/*#__PURE__*/
function (_Component) {
  _inherits(Todos, _Component);

  function Todos(props) {
    var _this;

    _classCallCheck(this, Todos);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Todos).call(this, props));
    _this.state = {
      isDialogAddOpen: false
    };
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









var CategoriesFilter =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CategoriesFilter, _React$Component);

  function CategoriesFilter(props) {
    var _this;

    _classCallCheck(this, CategoriesFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CategoriesFilter).call(this, props));
    _this.chips = undefined;
    _this.handleLeftScrollClick = _this.handleLeftScrollClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleRightScrollClick = _this.handleRightScrollClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.moveChipsScroll = _this.moveChipsScroll.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(CategoriesFilter, [{
    key: "handleLeftScrollClick",
    value: function handleLeftScrollClick() {
      if (this.chips) {
        this.moveChipsScroll(-this.chips.clientWidth);
      }
    }
  }, {
    key: "handleRightScrollClick",
    value: function handleRightScrollClick() {
      if (this.chips) {
        this.moveChipsScroll(this.chips.clientWidth);
      }
    }
  }, {
    key: "moveChipsScroll",
    value: function moveChipsScroll(delta) {
      if (this.chips) {
        var nextScrollLeft = this.chips.scrollLeft + delta;
        scroll__WEBPACK_IMPORTED_MODULE_3___default.a.left(this.chips, nextScrollLeft);
      }
    }
  }, {
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









var AddCategory =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AddCategory, _React$Component);

  function AddCategory(props) {
    var _this;

    _classCallCheck(this, AddCategory);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AddCategory).call(this, props));
    _this.state = {
      name: ''
    };
    _this.onInputTextChange = _this.onInputTextChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onButtonAddClick = _this.onButtonAddClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onCategoryCreated = _this.onCategoryCreated.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(AddCategory, [{
    key: "onInputTextChange",
    value: function onInputTextChange(e) {
      this.setState({
        name: e.target.value
      });
    }
  }, {
    key: "onButtonAddClick",
    value: function onButtonAddClick() {
      var name = this.state.name;
      var dispatch = this.props.dispatch;

      if (name === '') {
        dispatch(Object(_actions_messageActions__WEBPACK_IMPORTED_MODULE_6__["showMessageInfo"])(_constants_labels__WEBPACK_IMPORTED_MODULE_3__["default"].msgNameRequired));
        return;
      }

      dispatch(Object(_actions_todoFiltersActions__WEBPACK_IMPORTED_MODULE_5__["addCategory"])(name, this.onCategoryCreated));
    }
  }, {
    key: "onCategoryCreated",
    value: function onCategoryCreated(selectedCategory) {
      var onNext = this.props.onNext;
      onNext({
        stepId: _constants_steps__WEBPACK_IMPORTED_MODULE_4__["ADD_TASK"],
        options: {
          selectedCategory: selectedCategory
        }
      });
    }
  }, {
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }








var AddTask =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AddTask, _React$Component);

  function AddTask() {
    var _this;

    _classCallCheck(this, AddTask);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AddTask).call(this));
    _this.state = {
      title: '',
      description: ''
    };
    _this.onInputTextChange = _this.onInputTextChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onButtonScheduleClick = _this.onButtonScheduleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(AddTask, [{
    key: "onInputTextChange",
    value: function onInputTextChange(name) {
      var _this2 = this;

      return function (e) {
        _this2.setState(_defineProperty({}, name, e.target.value));
      };
    }
  }, {
    key: "onButtonScheduleClick",
    value: function onButtonScheduleClick() {
      var _this$props = this.props,
          options = _this$props.options,
          dispatch = _this$props.dispatch,
          onNext = _this$props.onNext;
      var _this$state = this.state,
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
    }
  }, {
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

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

  function DialogAdd(props) {
    var _this;

    _classCallCheck(this, DialogAdd);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DialogAdd).call(this, props));
    _this.state = _objectSpread({}, initalState);
    _this.onBack = _this.onBack.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onNext = _this.onNext.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onResetAndClose = _this.onResetAndClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onAnimationEnd = _this.onAnimationEnd.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(DialogAdd, [{
    key: "onBack",
    value: function onBack() {
      var steps = this.state.steps;
      var onClose = this.props.onClose;
      var stepCount = steps.length;

      if (stepCount === 1) {
        // Returned to the first steps, close the dialog
        this.setState(_objectSpread({}, initalState));
        onClose();
      } else {
        this.setState({
          nextSteps: _toConsumableArray(steps.slice(0, steps.length - 1)),
          showStep: false
        });
      }
    }
  }, {
    key: "onNext",
    value: function onNext() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        stepId: '',
        options: {}
      };
      var steps = this.state.steps;
      this.setState({
        nextSteps: [].concat(_toConsumableArray(steps), [_objectSpread({}, step, {
          complete: true
        })]),
        showStep: false
      });
    }
  }, {
    key: "onResetAndClose",
    value: function onResetAndClose() {
      var _this2 = this;

      var onClose = this.props.onClose;
      onClose();
      setTimeout(function () {
        _this2.setState(_objectSpread({}, initalState));
      }, 500);
    }
  }, {
    key: "onAnimationEnd",
    value: function onAnimationEnd(node, done) {
      var _this3 = this;

      node.addEventListener('transitionend', function () {
        done();
        var _this3$state = _this3.state,
            nextSteps = _this3$state.nextSteps,
            showStep = _this3$state.showStep;

        if (showStep) {
          return;
        }

        _this3.setState({
          steps: _toConsumableArray(nextSteps),
          showStep: true
        });
      }, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$state = this.state,
          steps = _this$state.steps,
          showStep = _this$state.showStep;
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
          return _this4.onBack();
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









var SelectCategory =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SelectCategory, _React$Component);

  function SelectCategory(props) {
    var _this;

    _classCallCheck(this, SelectCategory);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectCategory).call(this, props));
    _this.state = {
      selectedCategory: undefined
    };
    _this.onCategoryClick = _this.onCategoryClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onButtonNextClick = _this.onButtonNextClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(SelectCategory, [{
    key: "onCategoryClick",
    value: function onCategoryClick(category) {
      this.setState({
        selectedCategory: category
      });
    }
  }, {
    key: "onButtonNextClick",
    value: function onButtonNextClick() {
      var selectedCategory = this.state.selectedCategory;
      var _this$props = this.props,
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
    }
  }, {
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










var SelectCompleteDate =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SelectCompleteDate, _React$Component);

  function SelectCompleteDate(props) {
    var _this;

    _classCallCheck(this, SelectCompleteDate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectCompleteDate).call(this, props));
    _this.state = {
      todoWithin: new Date()
    };
    _this.onInputDateChange = _this.onInputDateChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onButtonAddClick = _this.onButtonAddClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onTodoTaskCreated = _this.onTodoTaskCreated.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(SelectCompleteDate, [{
    key: "onInputDateChange",
    value: function onInputDateChange(date) {
      this.setState({
        todoWithin: date
      });
    }
  }, {
    key: "onButtonAddClick",
    value: function onButtonAddClick() {
      var todoWithin = this.state.todoWithin;
      var _this$props = this.props,
          dispatch = _this$props.dispatch,
          options = _this$props.options;
      var title = options.title,
          description = options.description,
          category = options.category;

      if (!todoWithin || todoWithin === '') {
        dispatch(Object(_actions_messageActions__WEBPACK_IMPORTED_MODULE_7__["showMessageInfo"])(_constants_labels__WEBPACK_IMPORTED_MODULE_4__["default"].msgSelectDate));
        return;
      }

      dispatch(Object(_actions_todoTasksActions__WEBPACK_IMPORTED_MODULE_6__["addTask"])(title, description, category, todoWithin, this.onTodoTaskCreated));
    }
  }, {
    key: "onTodoTaskCreated",
    value: function onTodoTaskCreated() {
      var onNext = this.props.onNext;
      onNext({
        stepId: _constants_steps__WEBPACK_IMPORTED_MODULE_5__["DONE"],
        options: {}
      });
    }
  }, {
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










var Task =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Task, _React$Component);

  function Task(props) {
    var _this;

    _classCallCheck(this, Task);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Task).call(this, props));
    _this.state = {
      collapsed: false
    };
    _this.renderDate = _this.renderDate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Task, [{
    key: "onTitleClick",
    value: function onTitleClick() {
      var collapsed = this.state.collapsed;
      this.setState({
        collapsed: !collapsed
      });
    }
  }, {
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








var initialState = {
  limit: _constants_config__WEBPACK_IMPORTED_MODULE_6__["queryItemsLimit"],
  skip: 0
};

var Tasks =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tasks, _React$Component);

  function Tasks(props) {
    var _this;

    _classCallCheck(this, Tasks);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tasks).call(this, props));
    _this.state = initialState;
    _this.onFetchTodoTasksNext = _this.onFetchTodoTasksNext.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Tasks, [{
    key: "onFetchTodoTasksNext",
    value: function onFetchTodoTasksNext() {
      var _this$props = this.props,
          categoriesId = _this$props.categoriesId,
          completed = _this$props.completed,
          fetchTasks = _this$props.fetchTasks,
          moreToLoad = _this$props.moreToLoad;

      if (!moreToLoad) {
        return;
      }

      var _this$state = this.state,
          limit = _this$state.limit,
          skip = _this$state.skip;
      var newSkip = skip + limit;
      fetchTasks(categoriesId, completed, limit, newSkip);
      this.setState(function (state) {
        return {
          skip: state.skip + state.limit
        };
      });
    }
  }, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMvdG9kb1Rhc2tzQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9Db2xsYXBzZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvRGlhbG9nQW5pbS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvUmVzaXplLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9TbmFja2JhckFuaW0uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2xheW91dC9CdXR0b25TY29sbC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGF5b3V0L0luZmluaXRlU2Nyb2xsLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9sYXlvdXQvTWFpbkFkZEJ1dHRvbi5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGF5b3V0L1NuYWNrYmFyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL1RvZG9zLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL2NhdGVnb3J5L0J1dHRvbkRlbGV0ZUNhdGVnb3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL2NhdGVnb3J5L0NhdGVnb3JpZXNGaWx0ZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vY2F0ZWdvcnkvQ2F0ZWdvcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vZGlhbG9nQWRkL0FkZENhdGVnb3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL2RpYWxvZ0FkZC9BZGRUYXNrLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL2RpYWxvZ0FkZC9EaWFsb2dBZGQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vZGlhbG9nQWRkL0RvbmUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vZGlhbG9nQWRkL1NlbGVjdEFjdGlvbkFkZC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdG9kby9kaWFsb2dBZGQvU2VsZWN0Q2F0ZWdvcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vZGlhbG9nQWRkL1NlbGVjdENvbXBsZXRlRGF0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdG9kby9kaWFsb2dBZGQvU3RlcHMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vdGFzay9CdXR0b25Db21wbGV0ZVRhc2suanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vdGFzay9CdXR0b25EZWxldGVUYXNrLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL3Rhc2svVGFzay5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdG9kby90YXNrL1Rhc2tzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL3Zpc2liaWxpdHkvVmlzaWJpbGl0eUZpbHRlcnMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vdmlzaWJpbGl0eS9WaXNpYmlsaXR5U3dpdGNoLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2xhYmVscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL3N0ZXBzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL0NhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL1Rhc2tzQ29udGFpbmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9Ub2Rvc0NvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy9jb21tb25TZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0b3JzL3RvZG9UYXNrc1NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvQ29tbW9uLmpzIl0sIm5hbWVzIjpbImZldGNoVGFza3MiLCJzdGF0ZSIsInJlcXVlc3RGZXRjaEFsbENhdGVnb3JpZXMiLCJ0eXBlIiwiUkVRVUVTVF9GRVRDSF9BTExfQ0FURUdPUklFUyIsInJlY2VpdmVGZXRjaEFsbENhdGVnb3JpZXMiLCJjYXRlZ29yaWVzIiwiZXJyb3JGZXRjaEFsbENhdGVnb3JpZXMiLCJlcnJvciIsImFkZENhdGVnb3J5TG9jYWwiLCJjYXRlZ29yeSIsInJlbW92ZUNhdGVnb3J5TG9jYWwiLCJjYXRlZ29yeUluZGV4IiwidG9vZ2xlU2VsZWN0Q2F0ZWdvcnkiLCJzZWxlY3RlZENhdGVnb3J5IiwidG9vZ2xlU2VsZWN0Q2F0ZWdvcnlBbGwiLCJUT09HTEVfU0VMRUNUX0NBVEVHT1JZX0FMTCIsInN3aXRjaFZpc2liaWxpdHlGaWx0ZXIiLCJ2aXNpYmlsaXR5IiwiZmV0Y2hBbGxDYXRlZ29yaWVzIiwibGltaXQiLCJza2lwIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsImFjY2Vzc1Rva2VuIiwiYXV0aCIsIkdFVCIsInJlc3BvbnNlIiwic3VjY2VzcyIsImRhdGEiLCJtZXNzYWdlIiwiZGVsZXRlQ2F0ZWdvcnkiLCJjYXRlZ29yeUlkIiwiREVMRVRFIiwidG9kb0ZpbHRlcnMiLCJmaW5kSW5kZXgiLCJpZCIsImFkZENhdGVnb3J5IiwibmFtZSIsImNhbGxiYWNrIiwidW5kZWZpbmVkIiwiUE9TVCIsImNoYW5nZVZpc2liaWxpdHkiLCJzZWxlY3RDYXRlZ29yeSIsInNlbGVjdENhdGVnb3J5QWxsIiwicmVxdWVzdEZldGNoVGFza3MiLCJyZWNlaXZlRmV0Y2hUYXNrcyIsInRhc2tzIiwiZXJyb3JGZXRjaFRhc2tzIiwiYWRkVGFza0xvY2FsIiwidGFzayIsInJlbW92ZVRhc2tMb2NhbCIsInRhc2tJbmRleCIsInVwZGF0ZVRhc2tMb2NhbCIsImZldGNoVGFza3NCeUNhdGVnb3J5IiwiY2F0ZWdvcmllc0lkIiwiY29tcGxldGVkIiwibWFwIiwiY29tcGxldGVkQXQiLCJEYXRlIiwidG9kb1dpdGhpbiIsImRlbGV0ZVRhc2siLCJpdGVtcyIsInRvZG9UYXNrcyIsInRvZG9Bcmd1bWVudEluZGV4IiwidG9kb0FyZ3VtZW50IiwiYWRkVGFzayIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJmZXRjaGVkVGFzayIsInRvb2dsZVRhc2tDb21wbGV0ZWQiLCJpc0NvbXBsZXRlZCIsIlBBVENIIiwiZHVyYXRpb24iLCJkZWZhdWx0U3R5bGUiLCJ0cmFuc2l0aW9uIiwiaGVpZ2h0Iiwib25FbnRlciIsIm5vZGUiLCJzdHlsZSIsImZpcnN0RWxlbWVudENoaWxkIiwib2Zmc2V0SGVpZ2h0Iiwib25FeGl0IiwiQ29sbGFwc2UiLCJpblByb3AiLCJpbiIsImNoaWxkcmVuIiwicHJvcFR5cGVzIiwiYm9vbCIsImlzUmVxdWlyZWQiLCJvcGFjaXR5IiwidHJhbnNpdGlvblN0eWxlcyIsImVudGVyaW5nIiwiZW50ZXJlZCIsImRpc3BsYXkiLCJEaWFsb2dBbmltIiwiZW50ZXIiLCJleGl0Iiwib25FbnRlcmVkIiwib25FeGl0ZWQiLCJSZXNpemUiLCJwcm9wcyIsImJvdHRvbSIsIlNuYWNrYmFyQW5pbSIsImN1c3RvbUNsYXNzIiwic3RyaW5nIiwiZGVmYXVsdFByb3BzIiwiQnV0dG9uU2Nyb2xsIiwib25DbGljayIsImRpcmVjdGlvbiIsImZ1bmMiLCJvbmVPZiIsIndhaXRUaW1lIiwiSW5maW5pdGVTY3JvbGwiLCJvblNjcm9sbCIsImJpbmQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImlubmVySGVpZ2h0Iiwic2Nyb2xsWSIsImRvY3VtZW50IiwiYm9keSIsImFyZ3MiLCJjbGFzc05hbWUiLCJDb21wb25lbnQiLCJhcnJheU9mIiwiYW55IiwiTWFpbkFkZEJ1dHRvbiIsIkFjdGlvbiIsInRleHQiLCJTbmFja2JhciIsIm9uQ2xvc2UiLCJzaG93Iiwic2V0VGltZW91dCIsImlzRXJyb3IiLCJhY3Rpb25UZXh0IiwiYWN0aW9uQ2xpY2siLCJ2ZXJ0aWNhbFBvc3Rpb24iLCJob3Jpem9udGFsUG9zaXRpb24iLCJudW1iZXIiLCJUb2RvcyIsImlzRGlhbG9nQWRkT3BlbiIsImluaXRGZXRjaEFsbENhdGVnb3JpZXMiLCJoaWRlTWVzc2FnZSIsInNob3dMb2FkaW5nIiwic2V0U3RhdGUiLCJzaGFwZSIsIkJ1dHRvbkRlbGV0ZUNhdGVnb3J5IiwiQ2F0ZWdvcmllc0ZpbHRlciIsImNoaXBzIiwiaGFuZGxlTGVmdFNjcm9sbENsaWNrIiwiaGFuZGxlUmlnaHRTY3JvbGxDbGljayIsIm1vdmVDaGlwc1Njcm9sbCIsImNsaWVudFdpZHRoIiwiZGVsdGEiLCJuZXh0U2Nyb2xsTGVmdCIsInNjcm9sbExlZnQiLCJzY3JvbGwiLCJsZWZ0IiwiY2F0ZWdvcnlMaXN0Iiwib25EZWxldGVDYXRlZ29yeSIsIm9uQ2lsY2tDYXRlZ29yeSIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0Iiwic2VsZWN0ZWQiLCJDYXRlZ29yeSIsIm9uRGVsZXRlIiwiY3NzQ2xhc3MiLCJvbkNoaXBDbGljayIsImUiLCJvbkRlbGV0ZUNsaWNrIiwiQWRkQ2F0ZWdvcnkiLCJvbklucHV0VGV4dENoYW5nZSIsIm9uQnV0dG9uQWRkQ2xpY2siLCJvbkNhdGVnb3J5Q3JlYXRlZCIsInRhcmdldCIsInZhbHVlIiwibXNnTmFtZVJlcXVpcmVkIiwib25OZXh0Iiwic3RlcElkIiwib3B0aW9ucyIsInRpdGxlQWRkQ2F0ZWdvcnkiLCJwbGFjZWhvbGRlck5hbWUiLCJidXR0b25BZGQiLCJBZGRUYXNrIiwib25CdXR0b25TY2hlZHVsZUNsaWNrIiwibXNnVGl0bGVSZXF1aXJlZCIsInRpdGxlQWRkVGFzayIsImxhYmVsRm9yQ2F0ZWdvcnkiLCJwbGFjZUhvbGRlclRpdGxlIiwicGxhY2VIb2xkZXJEZXNjcmlwdGlvbiIsImJ1dHRvblNjaGVkdWxlIiwiZ2V0Q29udGVudFRvUmVuZGVyIiwic3RlcHMiLCJsZW5ndGgiLCJsYXN0U3RlcCIsImluaXRhbFN0YXRlIiwibmV4dFN0ZXBzIiwic2hvd1N0ZXAiLCJEaWFsb2dBZGQiLCJvbkJhY2siLCJvblJlc2V0QW5kQ2xvc2UiLCJvbkFuaW1hdGlvbkVuZCIsInN0ZXBDb3VudCIsInNsaWNlIiwic3RlcCIsImNvbXBsZXRlIiwiZG9uZSIsIm9wZW4iLCJidXR0b25CYWNrIiwiRG9uZSIsImxhYmVsRG9uZSIsIlNlbGVjdEFjdGlvbkFkZCIsInRpdGxlQWRkIiwibGFiZWxDYXRlZ29yeSIsImxhYmVsVGFzayIsIlNlbGVjdENhdGVnb3J5Iiwib25DYXRlZ29yeUNsaWNrIiwib25CdXR0b25OZXh0Q2xpY2siLCJtc2dTZWxlY3RDYXRlZ29yeSIsImNhdGVnb3JpZXNMaXN0IiwidGl0bGVDaG9vc2VDYXRlZ29yeSIsImJ1dHRvbk5leHQiLCJtYXBTdGF0ZVRvUHJvcCIsIlNlbGVjdENvbXBsZXRlRGF0ZSIsIm9uSW5wdXREYXRlQ2hhbmdlIiwib25Ub2RvVGFza0NyZWF0ZWQiLCJkYXRlIiwibXNnU2VsZWN0RGF0ZSIsInRpdGxlVG9kb1dpdGhpbiIsIlN0ZXAiLCJuZWVkTGluZSIsIlN0ZXBzIiwibGlzdCIsInN0ZXBIaXN0b3J5IiwiaXRlbSIsImkiLCJmaWx0ZXIiLCJzaCIsIkJ1dHRvbkNvbXBsZXRlVGFzayIsIkJ1dHRvbkRlbGV0ZVRhc2siLCJUYXNrIiwiY29sbGFwc2VkIiwicmVuZGVyRGF0ZSIsImxhYmVsUGFydGlhbENvbXBsZXRlZCIsImxhYmVsUGFydGlhbFRvQ29tcGxldGVkIiwibGFiZWxOb3RTZXQiLCJvbkNvbXBsZXRlIiwib25UaXRsZUNsaWNrIiwibGFiZWxOb0Rlc2NyaXB0aW9uIiwiaW5pdGlhbFN0YXRlIiwiVGFza3MiLCJvbkZldGNoVG9kb1Rhc2tzTmV4dCIsIm1vcmVUb0xvYWQiLCJuZXdTa2lwIiwidGFza0xpc3QiLCJvbkRlbGV0ZVRhc2siLCJvbkNvbXBsZXRlVGFzayIsImFyZyIsIm5leHRQcm9wcyIsInByZXZTdGF0ZSIsIlZpc2liaWxpdHlGaWx0ZXIiLCJzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIiLCJvblZpc2liaWxpdHlTd2l0Y2hDbGljayIsIlZpc2liaWxpdHlTd2l0Y2giLCJsYWJlbHMiLCJzdGVwRGVzY1dhbnRUb0FkZCIsInN0ZXBEZXNjQWRkQ2F0ZWdvcnkiLCJzdGVwRGVzY3JTZWxlY0NhdGVnb3J5Iiwic3RlcERlc2NBZGRUYXNrIiwic3RlcERlc2NDb21wbGV0ZURhdGUiLCJzdGVwRGVzY0RvbmUiLCJTRUxFQ1RfV0FOVF9UT19BREQiLCJBRERfQ0FURUdPUlkiLCJBRERfVEFTSyIsIlNFTEVDVF9DQVRFR09SWSIsIlNFTEVDVF9DT01QTEVURV9EQVRFIiwiRE9ORSIsInN0ZXBMaXN0IiwibWFwU3RhdGVUb1Byb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwiQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lciIsIlRhc2tzQ29udGFpbmVyIiwiVG9kb3NDb250YWluZXIiLCJWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyIiwiaXNGZXRjaGluZ0NhdGVnb3JpZXMiLCJpc0ZldGNoaW5nVG9kb3MiLCJpc0ZldGNoaW5nQ2F0ZWdvcmllc0ZpbHRlciIsImlzRmV0Y2hpbmciLCJnZXRUb2RvRmlsdGVycyIsImdldENhdGVnb3JpZXNGaWx0ZXJMaXN0IiwiZ2V0VmlzaWJpbGl0eUZpbHRlciIsInZpc2liaWxpdHlPbmx5Q29tcGxldGVkIiwiZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzRmlsdGVyIiwiZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQiLCJjYXRlZ29yeUZpbHRlciIsImlzRmV0Y2hpbmdUYXNrcyIsImdldFRhc2tzIiwiZ2V0VGFza0xpc3QiLCJnZXRTa2lwIiwic3RpbGxNb3JlVG9Mb2FkIiwidG9Kc0RhdGUiLCJwYXJzZURhdGUiLCJwYXJzZUludCIsInN1YnN0ciIsInRvU2ltcGxlRGF0ZUZvcm1hdCIsImdldEN1cnJlbnRCYXNlVXJsIiwiZ2V0VXJsIiwibG9jYXRpb24iLCJwcm90b2NvbCIsImhvc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNQSxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFBQyxLQUFLO0FBQUEsU0FBSSw4RUFBb0IsQ0FDOUMsK0ZBQXVCLENBQUNBLEtBQUQsQ0FEdUIsRUFFOUMsK0ZBQXVCLENBQUNBLEtBQUQsQ0FGdUIsQ0FBeEI7QUFBQSxDQUF4Qjs7QUFLQSxJQUFNQyx5QkFBeUIsR0FBRyxTQUE1QkEseUJBQTRCO0FBQUEsU0FDaEM7QUFDRUMsUUFBSSxFQUFFLG1GQUE0QkM7QUFEcEMsR0FEZ0M7QUFBQSxDQUFsQzs7QUFNQSxJQUFNQyx5QkFBeUIsR0FBRyxTQUE1QkEseUJBQTRCLENBQUFDLFVBQVU7QUFBQSxTQUMxQztBQUNFSCxRQUFJLEVBQUUsbUZBRFI7QUFFRUcsY0FBVSxFQUFWQTtBQUZGLEdBRDBDO0FBQUEsQ0FBNUM7O0FBT0EsSUFBTUMsdUJBQXVCLEdBQUcsU0FBMUJBLHVCQUEwQixDQUFBQyxLQUFLO0FBQUEsU0FDbkM7QUFDRUwsUUFBSSxFQUFFLGlGQURSO0FBRUVLLFNBQUssRUFBTEE7QUFGRixHQURtQztBQUFBLENBQXJDOztBQU9BLElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQUMsUUFBUTtBQUFBLFNBQy9CO0FBQ0VQLFFBQUksRUFBRSx5RUFEUjtBQUVFTyxZQUFRLEVBQVJBO0FBRkYsR0FEK0I7QUFBQSxDQUFqQzs7QUFPQSxJQUFNQyxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCLENBQUFDLGFBQWE7QUFBQSxTQUN2QztBQUNFVCxRQUFJLEVBQUUsNEVBRFI7QUFFRVMsaUJBQWEsRUFBYkE7QUFGRixHQUR1QztBQUFBLENBQXpDOztBQU9BLElBQU1DLG9CQUFvQixHQUFHLFNBQXZCQSxvQkFBdUIsQ0FBQUMsZ0JBQWdCO0FBQUEsU0FDM0M7QUFDRVgsUUFBSSxFQUFFLDZFQURSO0FBRUVXLG9CQUFnQixFQUFoQkE7QUFGRixHQUQyQztBQUFBLENBQTdDOztBQU9BLElBQU1DLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBMEI7QUFBQSxTQUM5QjtBQUNFWixRQUFJLEVBQUUsaUZBQTBCYTtBQURsQyxHQUQ4QjtBQUFBLENBQWhDOztBQU1BLElBQU1DLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBeUIsQ0FBQUMsVUFBVTtBQUFBLFNBQ3ZDO0FBQ0VmLFFBQUksRUFBRSwrRUFEUjtBQUVFZSxjQUFVLEVBQVZBO0FBRkYsR0FEdUM7QUFBQSxDQUF6Qzs7QUFPTyxJQUFNQyxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQXFCO0FBQUEsTUFBQ0MsS0FBRCx1RUFBUyxpRUFBVDtBQUFBLE1BQTBCQyxJQUExQix1RUFBaUMsQ0FBakM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOEJBQ2hDLGlCQUFPQyxRQUFQLEVBQWlCQyxRQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDRUQsd0JBQVEsQ0FBQ3BCLHlCQUF5QixFQUExQixDQUFSO0FBREY7QUFHWXNCLDJCQUhaLEdBRzRCRCxRQUFRLEdBQUdFLElBSHZDLENBR1lELFdBSFo7QUFBQTtBQUFBLHVCQUkyQiwrREFBTyxDQUFDLFlBQUQsRUFBZTtBQUFFSix1QkFBSyxFQUFMQSxLQUFGO0FBQVNDLHNCQUFJLEVBQUpBO0FBQVQsaUJBQWYsRUFBZ0MsdURBQU8sQ0FBQ0ssR0FBeEMsRUFBNkNGLFdBQTdDLENBSmxDOztBQUFBO0FBSVVHLHdCQUpWOztBQUFBLHFCQUtRQSxRQUFRLENBQUNDLE9BTGpCO0FBQUE7QUFBQTtBQUFBOztBQU1NTix3QkFBUSxDQUFDakIseUJBQXlCLENBQUNzQixRQUFRLENBQUNFLElBQVYsQ0FBMUIsQ0FBUjtBQUNBUCx3QkFBUSxDQUFDLDhFQUFvQixDQUFDLCtGQUF1QixDQUFDQyxRQUFRLEVBQVQsQ0FBeEIsQ0FBckIsQ0FBUjtBQVBOO0FBQUE7O0FBQUE7QUFBQSxxQkFTVSw4RUFBa0IsQ0FBQ0ksUUFBRCxDQVQ1QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHVCQVVjTCxRQUFRLENBQUMsdUVBQWtCLEVBQW5CLENBVnRCOztBQUFBO0FBV1FBLHdCQUFRLENBQUNILGtCQUFrQixDQUFDQyxLQUFELEVBQVFDLElBQVIsQ0FBbkIsQ0FBUjtBQVhSOztBQUFBO0FBY01DLHdCQUFRLENBQUNmLHVCQUF1QixDQUFDb0IsUUFBUSxDQUFDbkIsS0FBVCxDQUFlc0IsT0FBaEIsQ0FBeEIsQ0FBUjtBQUNBUix3QkFBUSxDQUFDLHdFQUFnQixDQUFDSyxRQUFRLENBQUNuQixLQUFULENBQWVzQixPQUFoQixDQUFqQixDQUFSOztBQWZOO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFrQklSLHdCQUFRLENBQUMsd0VBQWdCLENBQUMsWUFBTVEsT0FBUCxDQUFqQixDQUFSOztBQWxCSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQURnQzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FBM0I7QUF1QkEsSUFBTUMsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQjtBQUFBLE1BQUNDLFVBQUQsdUVBQWMsRUFBZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw4QkFBcUIsa0JBQU9WLFFBQVAsRUFBaUJDLFFBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRXZDQywyQkFGdUMsR0FFdkJELFFBQVEsR0FBR0UsSUFGWSxDQUV2Q0QsV0FGdUM7QUFBQTtBQUFBLHVCQUd4QiwrREFBTyxDQUFDLFlBQUQsRUFBZVEsVUFBZixFQUEyQix1REFBTyxDQUFDQyxNQUFuQyxFQUEyQ1QsV0FBM0MsQ0FIaUI7O0FBQUE7QUFHekNHLHdCQUh5Qzs7QUFBQSxxQkFJM0NBLFFBQVEsQ0FBQ0MsT0FKa0M7QUFBQTtBQUFBO0FBQUE7O0FBS3JDdEIsMEJBTHFDLEdBS3RCaUIsUUFBUSxHQUFHVyxXQUxXLENBS3JDNUIsVUFMcUM7QUFNdkNNLDZCQU51QyxHQU12Qk4sVUFBVSxDQUFDNkIsU0FBWCxDQUFxQixVQUFBekIsUUFBUTtBQUFBLHlCQUFJQSxRQUFRLENBQUMwQixFQUFULEtBQWdCSixVQUFwQjtBQUFBLGlCQUE3QixDQU51QjtBQU83Q1Ysd0JBQVEsQ0FBQ1gsbUJBQW1CLENBQUNDLGFBQUQsQ0FBcEIsQ0FBUjtBQVA2QztBQUFBOztBQUFBO0FBQUEscUJBU3pDLDhFQUFrQixDQUFDZSxRQUFELENBVHVCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsdUJBVXJDTCxRQUFRLENBQUMsdUVBQWtCLEVBQW5CLENBVjZCOztBQUFBO0FBVzNDQSx3QkFBUSxDQUFDUyxjQUFjLENBQUNDLFVBQUQsQ0FBZixDQUFSO0FBWDJDOztBQUFBO0FBYzdDVix3QkFBUSxDQUFDLHdFQUFnQixDQUFDSyxRQUFRLENBQUNuQixLQUFULENBQWVzQixPQUFoQixDQUFqQixDQUFSOztBQWQ2QztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBaUIvQ1Isd0JBQVEsQ0FBQyx3RUFBZ0IsQ0FBQyxhQUFNUSxPQUFQLENBQWpCLENBQVI7O0FBakIrQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUFyQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FBdkI7QUFxQlA7Ozs7OztBQUtPLElBQU1PLFdBQVcsR0FBRyxTQUFkQSxXQUFjO0FBQUEsTUFBQ0MsSUFBRCx1RUFBUSxFQUFSO0FBQUEsTUFBWUMsUUFBWix1RUFBdUJDLFNBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhCQUFxQyxrQkFBT2xCLFFBQVAsRUFBaUJDLFFBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRXBEQywyQkFGb0QsR0FFcENELFFBQVEsR0FBR0UsSUFGeUIsQ0FFcERELFdBRm9EO0FBQUE7QUFBQSx1QkFHckMsK0RBQU8sQ0FBQyxZQUFELEVBQWU7QUFBRWMsc0JBQUksRUFBSkE7QUFBRixpQkFBZixFQUF5Qix1REFBTyxDQUFDRyxJQUFqQyxFQUF1Q2pCLFdBQXZDLENBSDhCOztBQUFBO0FBR3RERyx3QkFIc0Q7O0FBQUEscUJBSXhEQSxRQUFRLENBQUNDLE9BSitDO0FBQUE7QUFBQTtBQUFBOztBQUtwRGxCLHdCQUxvRCxHQUt6Q2lCLFFBQVEsQ0FBQ0UsSUFMZ0M7QUFNMURQLHdCQUFRLENBQUNiLGdCQUFnQixDQUFDQyxRQUFELENBQWpCLENBQVI7O0FBQ0Esb0JBQUk2QixRQUFRLEtBQUtDLFNBQWpCLEVBQTRCO0FBQzFCRCwwQkFBUSxDQUFDN0IsUUFBRCxDQUFSO0FBQ0Q7O0FBVHlEO0FBQUE7O0FBQUE7QUFBQSxxQkFXdEQsOEVBQWtCLENBQUNpQixRQUFELENBWG9DO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsdUJBWWxETCxRQUFRLENBQUMsdUVBQWtCLEVBQW5CLENBWjBDOztBQUFBO0FBYXhEQSx3QkFBUSxDQUFDZSxXQUFXLENBQUNDLElBQUQsRUFBT0MsUUFBUCxDQUFaLENBQVI7QUFid0Q7O0FBQUE7QUFnQjFEakIsd0JBQVEsQ0FBQyx3RUFBZ0IsQ0FBQ0ssUUFBUSxDQUFDbkIsS0FBVCxDQUFlc0IsT0FBaEIsQ0FBakIsQ0FBUjs7QUFoQjBEO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFtQjVEUix3QkFBUSxDQUFDLHdFQUFnQixDQUFDLGFBQU1RLE9BQVAsQ0FBakIsQ0FBUjs7QUFuQjREO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQXJDOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxDQUFwQjtBQXVCQSxJQUFNWSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUF4QixVQUFVO0FBQUEsU0FBSSxVQUFDSSxRQUFELEVBQVdDLFFBQVgsRUFBd0I7QUFDcEVELFlBQVEsQ0FBQ0wsc0JBQXNCLENBQUNDLFVBQUQsQ0FBdkIsQ0FBUjtBQUNBLFdBQU9JLFFBQVEsQ0FBQ3RCLFVBQVUsQ0FBQ3VCLFFBQVEsRUFBVCxDQUFYLENBQWY7QUFDRCxHQUh5QztBQUFBLENBQW5DO0FBS0EsSUFBTW9CLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQTdCLGdCQUFnQjtBQUFBLFNBQUksVUFBQ1EsUUFBRCxFQUFXQyxRQUFYLEVBQXdCO0FBQ3hFRCxZQUFRLENBQUNULG9CQUFvQixDQUFDQyxnQkFBRCxDQUFyQixDQUFSO0FBQ0EsV0FBT1EsUUFBUSxDQUFDdEIsVUFBVSxDQUFDdUIsUUFBUSxFQUFULENBQVgsQ0FBZjtBQUNELEdBSDZDO0FBQUEsQ0FBdkM7QUFLQSxJQUFNcUIsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQjtBQUFBLFNBQU0sVUFBQ3RCLFFBQUQsRUFBV0MsUUFBWCxFQUF3QjtBQUM3REQsWUFBUSxDQUFDUCx1QkFBdUIsRUFBeEIsQ0FBUjtBQUNBLFdBQU9PLFFBQVEsQ0FBQ3RCLFVBQVUsQ0FBQ3VCLFFBQVEsRUFBVCxDQUFYLENBQWY7QUFDRCxHQUhnQztBQUFBLENBQTFCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvSlA7QUFDQTtBQUNBO0FBQ0E7QUFRQTtBQUNBOztBQUVBLElBQU1zQixpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUN6QixLQUFELEVBQVFDLElBQVI7QUFBQSxTQUN4QjtBQUNFbEIsUUFBSSxFQUFFLDBFQURSO0FBRUVpQixTQUFLLEVBQUxBLEtBRkY7QUFHRUMsUUFBSSxFQUFKQTtBQUhGLEdBRHdCO0FBQUEsQ0FBMUI7O0FBUUEsSUFBTXlCLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsQ0FBQUMsS0FBSztBQUFBLFNBQzdCO0FBQ0U1QyxRQUFJLEVBQUUsMEVBRFI7QUFFRTRDLFNBQUssRUFBTEE7QUFGRixHQUQ2QjtBQUFBLENBQS9COztBQU9BLElBQU1DLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQXhDLEtBQUs7QUFBQSxTQUMzQjtBQUNFTCxRQUFJLEVBQUUsd0VBRFI7QUFFRUssU0FBSyxFQUFMQTtBQUZGLEdBRDJCO0FBQUEsQ0FBN0I7O0FBT0EsSUFBTXlDLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUFDLElBQUk7QUFBQSxTQUN2QjtBQUNFL0MsUUFBSSxFQUFFLHFFQURSO0FBRUUrQyxRQUFJLEVBQUpBO0FBRkYsR0FEdUI7QUFBQSxDQUF6Qjs7QUFPQSxJQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUFDLFNBQVM7QUFBQSxTQUMvQjtBQUNFakQsUUFBSSxFQUFFLHdFQURSO0FBRUVpRCxhQUFTLEVBQVRBO0FBRkYsR0FEK0I7QUFBQSxDQUFqQzs7QUFPQSxJQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUFILElBQUk7QUFBQSxTQUMxQjtBQUNFL0MsUUFBSSxFQUFFLHdFQURSO0FBRUUrQyxRQUFJLEVBQUpBO0FBRkYsR0FEMEI7QUFBQSxDQUE1Qjs7QUFPTyxJQUFNSSxvQkFBb0IsR0FBRyxTQUF2QkEsb0JBQXVCO0FBQUEsTUFDbENDLFlBRGtDLHVFQUNuQixFQURtQjtBQUFBLE1BRWxDQyxTQUZrQyx1RUFFdEIsS0FGc0I7QUFBQSxNQUdsQ3BDLEtBSGtDLHVFQUcxQixpRUFIMEI7QUFBQSxNQUlsQ0MsSUFKa0MsdUVBSTNCLENBSjJCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhCQUsvQixpQkFBT0MsUUFBUCxFQUFpQkMsUUFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0hELHdCQUFRLENBQUN1QixpQkFBaUIsQ0FBQ3pCLEtBQUQsRUFBUUMsSUFBUixDQUFsQixDQUFSO0FBREc7QUFHT0csMkJBSFAsR0FHdUJELFFBQVEsR0FBR0UsSUFIbEMsQ0FHT0QsV0FIUDtBQUFBO0FBQUEsdUJBSXNCLCtEQUFPLENBQUMsT0FBRCxFQUFVO0FBQ3RDK0IsOEJBQVksRUFBWkEsWUFEc0M7QUFDeEJDLDJCQUFTLEVBQVRBLFNBRHdCO0FBQ2JwQyx1QkFBSyxFQUFMQSxLQURhO0FBQ05DLHNCQUFJLEVBQUpBO0FBRE0saUJBQVYsRUFFM0IsdURBQU8sQ0FBQ0ssR0FGbUIsRUFFZEYsV0FGYyxDQUo3Qjs7QUFBQTtBQUlLRyx3QkFKTDs7QUFBQSxxQkFPR0EsUUFBUSxDQUFDQyxPQVBaO0FBQUE7QUFBQTtBQUFBOztBQVFPbUIscUJBUlAsR0FRZXBCLFFBQVEsQ0FBQ0UsSUFBVCxDQUFjNEIsR0FBZCxDQUFrQixVQUFBUCxJQUFJO0FBQUEsMkNBRTdCQSxJQUY2QjtBQUdoQ1EsK0JBQVcsRUFBR1IsSUFBSSxDQUFDUSxXQUFOLEdBQXFCLElBQUlDLElBQUosQ0FBU1QsSUFBSSxDQUFDUSxXQUFkLENBQXJCLEdBQWtEbEIsU0FIL0I7QUFJaENvQiw4QkFBVSxFQUFHVixJQUFJLENBQUNVLFVBQU4sR0FBb0IsSUFBSUQsSUFBSixDQUFTVCxJQUFJLENBQUNVLFVBQWQsQ0FBcEIsR0FBZ0RwQjtBQUo1QjtBQUFBLGlCQUF0QixDQVJmO0FBY0NsQix3QkFBUSxDQUFDd0IsaUJBQWlCLENBQUNDLEtBQUQsQ0FBbEIsQ0FBUjtBQWREO0FBQUE7O0FBQUE7QUFBQSxxQkFnQkssOEVBQWtCLENBQUNwQixRQUFELENBaEJ2QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHVCQWlCU0wsUUFBUSxDQUFDLHVFQUFrQixFQUFuQixDQWpCakI7O0FBQUE7QUFrQkdBLHdCQUFRLENBQUNnQyxvQkFBb0IsQ0FBQ0MsWUFBRCxFQUFlQyxTQUFmLEVBQTBCcEMsS0FBMUIsRUFBaUNDLElBQWpDLENBQXJCLENBQVI7QUFsQkg7O0FBQUE7QUFxQkNDLHdCQUFRLENBQUMwQixlQUFlLENBQUNyQixRQUFRLENBQUNuQixLQUFULENBQWVzQixPQUFoQixDQUFoQixDQUFSO0FBQ0FSLHdCQUFRLENBQUMsd0VBQWdCLENBQUNLLFFBQVEsQ0FBQ25CLEtBQVQsQ0FBZXNCLE9BQWhCLENBQWpCLENBQVI7O0FBdEJEO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUF5QkRSLHdCQUFRLENBQUMsd0VBQWdCLENBQUMsWUFBTVEsT0FBUCxDQUFqQixDQUFSOztBQXpCQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUwrQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FBN0I7QUFrQ0EsSUFBTStCLFVBQVUsR0FBRyxTQUFiQSxVQUFhO0FBQUEsTUFBQ3pCLEVBQUQsdUVBQU0sRUFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw4QkFBYSxrQkFBT2QsUUFBUCxFQUFpQkMsUUFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFM0JDLDJCQUYyQixHQUVYRCxRQUFRLEdBQUdFLElBRkEsQ0FFM0JELFdBRjJCO0FBQUE7QUFBQSx1QkFHWiwrREFBTyxDQUFDLE9BQUQsRUFBVVksRUFBVixFQUFjLHVEQUFPLENBQUNILE1BQXRCLEVBQThCVCxXQUE5QixDQUhLOztBQUFBO0FBRzdCRyx3QkFINkI7O0FBQUEscUJBSS9CQSxRQUFRLENBQUNDLE9BSnNCO0FBQUE7QUFBQTtBQUFBOztBQUt6QmtDLHFCQUx5QixHQUtmdkMsUUFBUSxHQUFHd0MsU0FMSSxDQUt6QkQsS0FMeUI7QUFNM0JFLGlDQU4yQixHQU1QRixLQUFLLENBQUMzQixTQUFOLENBQWdCLFVBQUE4QixZQUFZO0FBQUEseUJBQ3BEQSxZQUFZLENBQUM3QixFQUFiLEtBQW9CQSxFQURnQztBQUFBLGlCQUE1QixDQU5PO0FBUWpDZCx3QkFBUSxDQUFDNkIsZUFBZSxDQUFDYSxpQkFBRCxDQUFoQixDQUFSO0FBUmlDO0FBQUE7O0FBQUE7QUFBQSxxQkFVN0IsOEVBQWtCLENBQUNyQyxRQUFELENBVlc7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSx1QkFXekJMLFFBQVEsQ0FBQyx1RUFBa0IsRUFBbkIsQ0FYaUI7O0FBQUE7QUFZL0JBLHdCQUFRLENBQUN1QyxVQUFVLENBQUN6QixFQUFELENBQVgsQ0FBUjtBQVorQjs7QUFBQTtBQWVqQ2Qsd0JBQVEsQ0FBQyx3RUFBZ0IsQ0FBQ0ssUUFBUSxDQUFDbkIsS0FBVCxDQUFlc0IsT0FBaEIsQ0FBakIsQ0FBUjs7QUFmaUM7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQWtCbkNSLHdCQUFRLENBQUMsd0VBQWdCLENBQUMsYUFBTVEsT0FBUCxDQUFqQixDQUFSOztBQWxCbUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBYjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FBbkI7QUFzQkEsSUFBTW9DLE9BQU8sR0FBRyxTQUFWQSxPQUFVO0FBQUEsTUFBQ0MsS0FBRCx1RUFBUyxFQUFUO0FBQUEsTUFBYUMsV0FBYix1RUFBMkIsRUFBM0I7QUFBQSxNQUErQjFELFFBQS9CLHVFQUEwQztBQUFFMEIsTUFBRSxFQUFFO0FBQU4sR0FBMUM7QUFBQSxNQUFzRHdCLFVBQXREO0FBQUEsTUFBa0VyQixRQUFsRSx1RUFBNkVDLFNBQTdFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhCQUEyRixrQkFBT2xCLFFBQVAsRUFBaUJDLFFBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRXRHQywyQkFGc0csR0FFdEZELFFBQVEsR0FBR0UsSUFGMkUsQ0FFdEdELFdBRnNHO0FBQUE7QUFBQSx1QkFHdkYsK0RBQU8sQ0FDNUIsT0FENEIsRUFFNUI7QUFDRTJDLHVCQUFLLEVBQUxBLEtBREY7QUFFRUMsNkJBQVcsRUFBWEEsV0FGRjtBQUdFcEMsNEJBQVUsRUFBRXRCLFFBQVEsQ0FBQzBCLEVBSHZCO0FBSUV3Qiw0QkFBVSxFQUFWQTtBQUpGLGlCQUY0QixFQVE1Qix1REFBTyxDQUFDbkIsSUFSb0IsRUFTNUJqQixXQVQ0QixDQUhnRjs7QUFBQTtBQUd4R0csd0JBSHdHOztBQUFBLHFCQWMxR0EsUUFBUSxDQUFDQyxPQWRpRztBQUFBO0FBQUE7QUFBQTs7QUFldEd5QywyQkFmc0csR0FleEYxQyxRQUFRLENBQUNFLElBZitFO0FBZ0J0R3FCLG9CQWhCc0cscUJBaUJ2R21CLFdBakJ1RztBQWtCMUdYLDZCQUFXLEVBQUdXLFdBQVcsQ0FBQ1gsV0FBYixHQUNULElBQUlDLElBQUosQ0FBU1UsV0FBVyxDQUFDWCxXQUFyQixDQURTLEdBQzJCbEIsU0FuQmtFO0FBb0IxR29CLDRCQUFVLEVBQUdTLFdBQVcsQ0FBQ1QsVUFBYixHQUNSLElBQUlELElBQUosQ0FBU1UsV0FBVyxDQUFDVCxVQUFyQixDQURRLEdBQzJCcEI7QUFyQm1FO0FBdUI1R2xCLHdCQUFRLENBQUMyQixZQUFZLENBQUNDLElBQUQsQ0FBYixDQUFSOztBQUNBLG9CQUFJWCxRQUFRLEtBQUtDLFNBQWpCLEVBQTRCO0FBQzFCRCwwQkFBUTtBQUNUOztBQTFCMkc7QUFBQTs7QUFBQTtBQUFBLHFCQTRCeEcsOEVBQWtCLENBQUNaLFFBQUQsQ0E1QnNGO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsdUJBNkJwR0wsUUFBUSxDQUFDLHVFQUFrQixFQUFuQixDQTdCNEY7O0FBQUE7QUE4QjFHQSx3QkFBUSxDQUFDNEMsT0FBTyxDQUFDQyxLQUFELEVBQVFDLFdBQVIsRUFBcUIxRCxRQUFyQixFQUErQmtELFVBQS9CLEVBQTJDckIsUUFBM0MsQ0FBUixDQUFSO0FBOUIwRzs7QUFBQTtBQWlDNUdqQix3QkFBUSxDQUFDLHdFQUFnQixDQUFDSyxRQUFRLENBQUNuQixLQUFULENBQWVzQixPQUFoQixDQUFqQixDQUFSOztBQWpDNEc7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQW9DOUdSLHdCQUFRLENBQUMsd0VBQWdCLENBQUMsYUFBTVEsT0FBUCxDQUFqQixDQUFSOztBQXBDOEc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBM0Y7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBQWhCO0FBd0NBLElBQU13QyxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCO0FBQUEsTUFBQ2xDLEVBQUQsdUVBQU0sRUFBTjtBQUFBLE1BQVVtQyxXQUFWLHVFQUF3QixLQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw4QkFBa0Msa0JBQU9qRCxRQUFQLEVBQWlCQyxRQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDN0RpQyx5QkFENkQsR0FDakQsQ0FBQ2UsV0FEZ0Q7QUFFN0RiLDJCQUY2RCxHQUU5Q0YsU0FBRCxHQUFjLElBQUlHLElBQUosRUFBZCxHQUEyQixJQUZvQjtBQUFBO0FBSXpEbkMsMkJBSnlELEdBSXpDRCxRQUFRLEdBQUdFLElBSjhCLENBSXpERCxXQUp5RDtBQUFBO0FBQUEsdUJBSzFDLCtEQUFPLENBQUMsT0FBRCxFQUFVO0FBQUVZLG9CQUFFLEVBQUZBLEVBQUY7QUFBTW9CLDJCQUFTLEVBQVRBLFNBQU47QUFBaUJFLDZCQUFXLEVBQVhBO0FBQWpCLGlCQUFWLEVBQTBDLHVEQUFPLENBQUNjLEtBQWxELEVBQXlEaEQsV0FBekQsQ0FMbUM7O0FBQUE7QUFLM0RHLHdCQUwyRDs7QUFBQSxxQkFNN0RBLFFBQVEsQ0FBQ0MsT0FOb0Q7QUFBQTtBQUFBO0FBQUE7O0FBT3pEeUMsMkJBUHlELEdBTzNDMUMsUUFBUSxDQUFDRSxJQVBrQztBQVF6RHFCLG9CQVJ5RCxxQkFTMURtQixXQVQwRDtBQVU3RFgsNkJBQVcsRUFBR1csV0FBVyxDQUFDWCxXQUFiLEdBQ1QsSUFBSUMsSUFBSixDQUFTVSxXQUFXLENBQUNYLFdBQXJCLENBRFMsR0FDMkJsQjtBQVhxQjtBQWEvRGxCLHdCQUFRLENBQUMrQixlQUFlLENBQUNILElBQUQsQ0FBaEIsQ0FBUjtBQWIrRDtBQUFBOztBQUFBO0FBQUEscUJBZTNELDhFQUFrQixDQUFDdkIsUUFBRCxDQWZ5QztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHVCQWdCdkRMLFFBQVEsQ0FBQyx1RUFBa0IsRUFBbkIsQ0FoQitDOztBQUFBO0FBaUI3REEsd0JBQVEsQ0FBQ2dELG1CQUFtQixDQUFDbEMsRUFBRCxFQUFLbUMsV0FBTCxDQUFwQixDQUFSO0FBakI2RDs7QUFBQTtBQW9CL0RqRCx3QkFBUSxDQUFDLHdFQUFnQixDQUFDSyxRQUFRLENBQUNuQixLQUFULENBQWVzQixPQUFoQixDQUFqQixDQUFSOztBQXBCK0Q7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQXVCakVSLHdCQUFRLENBQUMsd0VBQWdCLENBQUMsYUFBTVEsT0FBUCxDQUFqQixDQUFSOztBQXZCaUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBbEM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBQTVCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekpQO0FBQ0E7QUFDQTtBQUVBLElBQU0yQyxRQUFRLEdBQUcsR0FBakI7QUFFQSxJQUFNQyxZQUFZLEdBQUc7QUFDbkJDLFlBQVUsbUJBQVlGLFFBQVosbUJBRFM7QUFFbkJHLFFBQU0sRUFBRTtBQUZXLENBQXJCOztBQUtBLElBQU1DLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUNDLElBQUQsRUFBVTtBQUFBLE1BQ2hCQyxLQURnQixHQUNORCxJQURNLENBQ2hCQyxLQURnQjtBQUV4QkEsT0FBSyxDQUFDSCxNQUFOLGFBQWtCRSxJQUFJLENBQUNFLGlCQUFMLENBQXVCQyxZQUF6QztBQUNELENBSEQ7O0FBS0EsSUFBTUMsTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBQ0osSUFBRCxFQUFVO0FBQUEsTUFDZkMsS0FEZSxHQUNMRCxJQURLLENBQ2ZDLEtBRGU7QUFFdkJBLE9BQUssQ0FBQ0gsTUFBTixHQUFlLEtBQWY7QUFDRCxDQUhEOztBQUtBLElBQU1PLFFBQVEsR0FBRyxTQUFYQSxRQUFXO0FBQUEsTUFBT0MsTUFBUCxRQUFHQyxFQUFIO0FBQUEsTUFBZUMsUUFBZixRQUFlQSxRQUFmO0FBQUEsU0FDZiwyREFBQyxpRUFBRDtBQUFZLFdBQU8sRUFBRVQsT0FBckI7QUFBOEIsVUFBTSxFQUFFSyxNQUF0QztBQUE4QyxNQUFFLEVBQUVFLE1BQWxEO0FBQTBELFdBQU8sRUFBRVg7QUFBbkUsS0FDRztBQUFBLFdBQ0M7QUFBSyxXQUFLLG9CQUNIQyxZQURHO0FBQVYsT0FJR1ksUUFKSCxDQUREO0FBQUEsR0FESCxDQURlO0FBQUEsQ0FBakI7O0FBYUFILFFBQVEsQ0FBQ0ksU0FBVCxHQUFxQjtBQUNuQkYsSUFBRSxFQUFFLGlEQUFTLENBQUNHLElBQVYsQ0FBZUMsVUFEQTtBQUVuQkgsVUFBUSxFQUFFLGlEQUFTLENBQUNSLElBQVYsQ0FBZVc7QUFGTixDQUFyQjtBQUtlLCtEQUFBTixRQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkNBO0FBQ0E7QUFDQTtBQUVBLElBQU1WLFFBQVEsR0FBRyxHQUFqQjtBQUVBLElBQU1DLFlBQVksR0FBRztBQUNuQkMsWUFBVSxnQkFBU0YsUUFBVCxtQkFEUztBQUVuQkcsUUFBTSxFQUFFLEtBRlc7QUFHbkJjLFNBQU8sRUFBRSxHQUhVO0FBSW5CeEUsWUFBVSxFQUFFO0FBSk8sQ0FBckI7QUFPQSxJQUFNeUUsZ0JBQWdCLEdBQUc7QUFDdkJDLFVBQVEsRUFBRTtBQUNSaEIsVUFBTSxFQUFFLEtBREE7QUFFUmMsV0FBTyxFQUFFLEdBRkQ7QUFHUnhFLGNBQVUsRUFBRTtBQUhKLEdBRGE7QUFNdkIyRSxTQUFPLEVBQUU7QUFDUEMsV0FBTyxFQUFFLE9BREY7QUFFUGxCLFVBQU0sRUFBRSxPQUZEO0FBR1BjLFdBQU8sRUFBRSxHQUhGO0FBSVB4RSxjQUFVLEVBQUU7QUFKTDtBQU5jLENBQXpCOztBQWNBLElBQU02RSxVQUFVLEdBQUcsU0FBYkEsVUFBYTtBQUFBLE1BQU9YLE1BQVAsUUFBR0MsRUFBSDtBQUFBLE1BQWVDLFFBQWYsUUFBZUEsUUFBZjtBQUFBLFNBQ2pCLDJEQUFDLGlFQUFEO0FBQVksTUFBRSxFQUFFRixNQUFoQjtBQUF3QixXQUFPLEVBQUVYO0FBQWpDLEtBQ0csVUFBQXhFLEtBQUs7QUFBQSxXQUNKO0FBQ0UsUUFBRSxFQUFDLGlCQURMO0FBRUUsV0FBSyxvQkFDQXlFLFlBREEsRUFFQWlCLGdCQUFnQixDQUFDMUYsS0FBRCxDQUZoQjtBQUZQLE9BT0dxRixRQVBILENBREk7QUFBQSxHQURSLENBRGlCO0FBQUEsQ0FBbkI7O0FBZ0JBUyxVQUFVLENBQUNSLFNBQVgsR0FBdUI7QUFDckJGLElBQUUsRUFBRSxpREFBUyxDQUFDRyxJQUFWLENBQWVDLFVBREU7QUFFckJILFVBQVEsRUFBRSxpREFBUyxDQUFDUixJQUFWLENBQWVXO0FBRkosQ0FBdkI7QUFLZSwrREFBQU0sVUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hEQTtBQUNBO0FBQ0E7QUFFQSxJQUFNdEIsUUFBUSxHQUFHO0FBQ2Z1QixPQUFLLEVBQUUsR0FEUTtBQUVmQyxNQUFJLEVBQUU7QUFGUyxDQUFqQjtBQUtBLElBQU12QixZQUFZLEdBQUc7QUFDbkJDLFlBQVUsZ0JBQVNGLFFBQVEsQ0FBQ3VCLEtBQWxCLG1CQURTO0FBRW5CcEIsUUFBTSxFQUFFLENBRlc7QUFHbkJjLFNBQU8sRUFBRTtBQUhVLENBQXJCOztBQU1BLElBQU1iLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUNDLElBQUQsRUFBVTtBQUFBLE1BQ2hCQyxLQURnQixHQUNORCxJQURNLENBQ2hCQyxLQURnQjtBQUV4QkEsT0FBSyxDQUFDSCxNQUFOLGFBQWtCRSxJQUFJLENBQUNFLGlCQUFMLENBQXVCQyxZQUF6QztBQUNBRixPQUFLLENBQUNXLE9BQU4sR0FBZ0IsQ0FBaEI7QUFDRCxDQUpEOztBQU1BLElBQU1RLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNwQixJQUFELEVBQVU7QUFBQSxNQUNsQkMsS0FEa0IsR0FDUkQsSUFEUSxDQUNsQkMsS0FEa0I7QUFFMUJBLE9BQUssQ0FBQ0gsTUFBTixHQUFlLE1BQWY7QUFDRCxDQUhEOztBQUtBLElBQU1NLE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQUNKLElBQUQsRUFBVTtBQUFBLE1BQ2ZDLEtBRGUsR0FDTEQsSUFESyxDQUNmQyxLQURlO0FBRXZCQSxPQUFLLENBQUNILE1BQU4sYUFBa0JFLElBQUksQ0FBQ0UsaUJBQUwsQ0FBdUJDLFlBQXpDO0FBQ0QsQ0FIRDs7QUFLQSxJQUFNa0IsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ3JCLElBQUQsRUFBVTtBQUFBLE1BQ2pCQyxLQURpQixHQUNQRCxJQURPLENBQ2pCQyxLQURpQjtBQUV6QkEsT0FBSyxDQUFDSCxNQUFOLEdBQWUsS0FBZjtBQUNBRyxPQUFLLENBQUNXLE9BQU4sR0FBZ0IsQ0FBaEI7QUFDRCxDQUpEOztBQU9BLElBQU1VLE1BQU0sR0FBRyxTQUFUQSxNQUFTO0FBQUEsTUFBR2QsUUFBSCxRQUFHQSxRQUFIO0FBQUEsTUFBZ0JlLEtBQWhCOztBQUFBLFNBQ2IsMkRBQUMsaUVBQUQsZUFDTUEsS0FETjtBQUVFLFdBQU8sRUFBRXhCLE9BRlg7QUFHRSxhQUFTLEVBQUVxQixTQUhiO0FBSUUsVUFBTSxFQUFFaEIsTUFKVjtBQUtFLFlBQVEsRUFBRWlCLFFBTFo7QUFNRSxXQUFPLEVBQUUxQjtBQU5YLE1BUUc7QUFBQSxXQUNDO0FBQUssV0FBSyxvQkFDSEMsWUFERztBQUFWLE9BSUdZLFFBSkgsQ0FERDtBQUFBLEdBUkgsQ0FEYTtBQUFBLENBQWY7O0FBb0JBYyxNQUFNLENBQUNiLFNBQVAsR0FBbUI7QUFDakJELFVBQVEsRUFBRSxpREFBUyxDQUFDUixJQUFWLENBQWVXO0FBRFIsQ0FBbkI7QUFJZSwrREFBQVcsTUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlEQTtBQUNBO0FBQ0E7QUFFQSxJQUFNM0IsUUFBUSxHQUFHLEdBQWpCO0FBRUEsSUFBTUMsWUFBWSxHQUFHO0FBQ25CQyxZQUFVLGdCQUFTRixRQUFULG1CQURTO0FBRW5CNkIsUUFBTSxFQUFFO0FBRlcsQ0FBckI7QUFLQSxJQUFNWCxnQkFBZ0IsR0FBRztBQUN2QkMsVUFBUSxFQUFFO0FBQ1JVLFVBQU0sRUFBRSxRQURBO0FBRVJwRixjQUFVLEVBQUU7QUFGSixHQURhO0FBS3ZCMkUsU0FBTyxFQUFFO0FBQ1BTLFVBQU0sRUFBRSxLQUREO0FBRVBwRixjQUFVLEVBQUU7QUFGTDtBQUxjLENBQXpCOztBQVdBLElBQU1xRixZQUFZLEdBQUcsU0FBZkEsWUFBZTtBQUFBLE1BQU9uQixNQUFQLFFBQUdDLEVBQUg7QUFBQSxNQUFlQyxRQUFmLFFBQWVBLFFBQWY7QUFBQSxNQUF5QmtCLFdBQXpCLFFBQXlCQSxXQUF6QjtBQUFBLFNBQ25CLDJEQUFDLGlFQUFEO0FBQVksTUFBRSxFQUFFcEIsTUFBaEI7QUFBd0IsV0FBTyxFQUFFWDtBQUFqQyxLQUNHLFVBQUF4RSxLQUFLO0FBQUEsV0FDSjtBQUNFLFFBQUUsRUFBQyxrQkFETDtBQUVFLFdBQUssb0JBQ0F5RSxZQURBLEVBRUFpQixnQkFBZ0IsQ0FBQzFGLEtBQUQsQ0FGaEIsQ0FGUDtBQU1FLGVBQVMsRUFBRXVHO0FBTmIsT0FRR2xCLFFBUkgsQ0FESTtBQUFBLEdBRFIsQ0FEbUI7QUFBQSxDQUFyQjs7QUFpQkFpQixZQUFZLENBQUNoQixTQUFiLEdBQXlCO0FBQ3ZCRixJQUFFLEVBQUUsaURBQVMsQ0FBQ0csSUFBVixDQUFlQyxVQURJO0FBRXZCSCxVQUFRLEVBQUUsaURBQVMsQ0FBQ1IsSUFBVixDQUFlVyxVQUZGO0FBR3ZCZSxhQUFXLEVBQUUsaURBQVMsQ0FBQ0M7QUFIQSxDQUF6QjtBQU1BRixZQUFZLENBQUNHLFlBQWIsR0FBNEI7QUFDMUJGLGFBQVcsRUFBRTtBQURhLENBQTVCO0FBSWUsK0RBQUFELFlBQWYsRTs7Ozs7Ozs7Ozs7O0FDakRBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUVBLElBQU1JLFlBQVksR0FBRyxTQUFmQSxZQUFlO0FBQUEsTUFBR0MsT0FBSCxRQUFHQSxPQUFIO0FBQUEsTUFBWUMsU0FBWixRQUFZQSxTQUFaO0FBQUEsU0FDbkI7QUFBUSxhQUFTLDBCQUFtQkEsU0FBbkIsQ0FBakI7QUFBaUQsV0FBTyxFQUFFRDtBQUExRCxLQUNFO0FBQUcsYUFBUyxFQUFHQyxTQUFTLEtBQUssTUFBZixHQUF5QixlQUF6QixHQUEyQztBQUF6RCxJQURGLENBRG1CO0FBQUEsQ0FBckI7O0FBTUFGLFlBQVksQ0FBQ3BCLFNBQWIsR0FBeUI7QUFDdkJxQixTQUFPLEVBQUUsaURBQVMsQ0FBQ0UsSUFBVixDQUFlckIsVUFERDtBQUV2Qm9CLFdBQVMsRUFBRSxpREFBUyxDQUFDRSxLQUFWLENBQWdCLENBQUMsTUFBRCxFQUFTLE9BQVQsQ0FBaEI7QUFGWSxDQUF6QjtBQUtBSixZQUFZLENBQUNELFlBQWIsR0FBNEI7QUFDMUJHLFdBQVMsRUFBRTtBQURlLENBQTVCO0FBSWUsK0RBQUFGLFlBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUVBLElBQU1LLFFBQVEsR0FBRyxHQUFqQjs7SUFFTUMsYzs7Ozs7QUFDSiwwQkFBWVosS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNqQix3RkFBTUEsS0FBTjtBQUNBLFVBQUthLFFBQUwsR0FBZ0IsTUFBS0EsUUFBTCxDQUFjQyxJQUFkLHVEQUFoQjtBQUZpQjtBQUdsQjs7Ozt3Q0FFbUI7QUFDbEJDLFlBQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsdURBQVEsQ0FBQyxLQUFLSCxRQUFOLEVBQWdCRixRQUFoQixDQUExQyxFQUFxRSxLQUFyRTtBQUNEOzs7MkNBRXNCO0FBQ3JCSSxZQUFNLENBQUNFLG1CQUFQLENBQTJCLFFBQTNCLEVBQXFDLHVEQUFRLENBQUMsS0FBS0osUUFBTixFQUFnQkYsUUFBaEIsQ0FBN0MsRUFBd0UsS0FBeEU7QUFDRDs7OytCQUVVO0FBQ1QsVUFBS0ksTUFBTSxDQUFDRyxXQUFQLEdBQXFCSCxNQUFNLENBQUNJLE9BQTdCLElBQTBDQyxRQUFRLENBQUNDLElBQVQsQ0FBY3pDLFlBQWQsR0FBNkIsR0FBM0UsRUFBaUY7QUFBQSwwQkFDcEQsS0FBS29CLEtBRCtDO0FBQUEsWUFDdkVzQixJQUR1RSxlQUN2RUEsSUFEdUU7QUFBQSxZQUNqRVQsUUFEaUUsZUFDakVBLFFBRGlFO0FBRS9FQSxnQkFBUSxNQUFSLDRCQUFZUyxJQUFaO0FBQ0Q7QUFDRjs7OzZCQUVRO0FBQUEseUJBQ3lCLEtBQUt0QixLQUQ5QjtBQUFBLFVBQ0NmLFFBREQsZ0JBQ0NBLFFBREQ7QUFBQSxVQUNXc0MsU0FEWCxnQkFDV0EsU0FEWDtBQUVQLGFBQ0U7QUFBSyxpQkFBUyxFQUFFQTtBQUFoQixTQUNHdEMsUUFESCxDQURGO0FBS0Q7Ozs7RUE1QjBCLDRDQUFLLENBQUN1QyxTOztBQStCbkNaLGNBQWMsQ0FBQzFCLFNBQWYsR0FBMkI7QUFDekJvQyxNQUFJLEVBQUUsaURBQVMsQ0FBQ0csT0FBVixDQUFrQixpREFBUyxDQUFDQyxHQUE1QixDQURtQjtBQUV6QnpDLFVBQVEsRUFBRSxpREFBUyxDQUFDUixJQUFWLENBQWVXLFVBRkE7QUFHekJtQyxXQUFTLEVBQUUsaURBQVMsQ0FBQ25CLE1BSEk7QUFJekJTLFVBQVEsRUFBRSxpREFBUyxDQUFDSixJQUFWLENBQWVyQjtBQUpBLENBQTNCO0FBT0F3QixjQUFjLENBQUNQLFlBQWYsR0FBOEI7QUFDNUJpQixNQUFJLEVBQUUsRUFEc0I7QUFFNUJDLFdBQVMsRUFBRTtBQUZpQixDQUE5QjtBQUtlLCtEQUFBWCxjQUFmLEU7Ozs7Ozs7Ozs7OztBQ2pEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFFQSxJQUFNZSxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCO0FBQUEsTUFBR3BCLE9BQUgsUUFBR0EsT0FBSDtBQUFBLFNBQ3BCO0FBQVEsTUFBRSxFQUFDLGlCQUFYO0FBQTZCLFdBQU8sRUFBRUE7QUFBdEMsS0FDRTtBQUFHLGFBQVMsRUFBQztBQUFiLGNBREYsQ0FEb0I7QUFBQSxDQUF0Qjs7QUFNQW9CLGFBQWEsQ0FBQ3pDLFNBQWQsR0FBMEI7QUFDeEJxQixTQUFPLEVBQUUsaURBQVMsQ0FBQ0UsSUFBVixDQUFlckI7QUFEQSxDQUExQjtBQUllLCtEQUFBdUMsYUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUMsTUFBTSxHQUFHLFNBQVRBLE1BQVM7QUFBQSxNQUFHckIsT0FBSCxRQUFHQSxPQUFIO0FBQUEsTUFBWXNCLElBQVosUUFBWUEsSUFBWjtBQUFBLFNBQ2I7QUFBUSxhQUFTLEVBQUMsd0JBQWxCO0FBQTJDLFdBQU8sRUFBRXRCO0FBQXBELEtBQ0dzQixJQURILENBRGE7QUFBQSxDQUFmOztBQU1BRCxNQUFNLENBQUMxQyxTQUFQLEdBQW1CO0FBQ2pCMkMsTUFBSSxFQUFFLGlEQUFTLENBQUN6QixNQUFWLENBQWlCaEIsVUFETjtBQUVqQm1CLFNBQU8sRUFBRSxpREFBUyxDQUFDRSxJQUFWLENBQWVyQjtBQUZQLENBQW5COztJQUtNMEMsUTs7Ozs7Ozs7Ozs7Ozt5Q0FDaUI7QUFBQSx3QkFHZixLQUFLOUIsS0FIVTtBQUFBLFVBRWpCK0IsT0FGaUIsZUFFakJBLE9BRmlCO0FBQUEsVUFFUjNELFFBRlEsZUFFUkEsUUFGUTtBQUFBLFVBRUU0RCxJQUZGLGVBRUVBLElBRkY7O0FBS25CLFVBQUlBLElBQUosRUFBVTtBQUNSQyxrQkFBVSxDQUFDLFlBQU07QUFDZkYsaUJBQU87QUFDUixTQUZTLEVBRVAzRCxRQUZPLENBQVY7QUFHRDtBQUNGOzs7NkJBRVE7QUFBQSx5QkFJSCxLQUFLNEIsS0FKRjtBQUFBLFVBRUx2RSxPQUZLLGdCQUVMQSxPQUZLO0FBQUEsVUFFSXlHLE9BRkosZ0JBRUlBLE9BRko7QUFBQSxVQUVhQyxVQUZiLGdCQUVhQSxVQUZiO0FBQUEsVUFFeUJDLFdBRnpCLGdCQUV5QkEsV0FGekI7QUFBQSxVQUVzQ0osSUFGdEMsZ0JBRXNDQSxJQUZ0QztBQUFBLFVBR0xLLGVBSEssZ0JBR0xBLGVBSEs7QUFBQSxVQUdZQyxrQkFIWixnQkFHWUEsa0JBSFo7QUFLUCxhQUNFLDJEQUFDLDJEQUFEO0FBQWMsVUFBRSxFQUFFTixJQUFsQjtBQUF3QixtQkFBVyxZQUFLSyxlQUFMLGNBQXlCQyxrQkFBekI7QUFBbkMsU0FDRTtBQUNFLGlCQUFTLHFCQUFlSixPQUFELEdBQVksT0FBWixHQUFzQixFQUFwQztBQURYLFNBR0U7QUFBTSxpQkFBUyxFQUFDO0FBQWhCLFNBQW9DekcsT0FBcEMsQ0FIRixFQUtLMEcsVUFBVSxLQUFLLEVBQWYsSUFBcUJDLFdBQVcsS0FBS2pHLFNBQXRDLElBQ0UsMkRBQUMsTUFBRDtBQUFRLGVBQU8sRUFBRWlHLFdBQWpCO0FBQThCLFlBQUksRUFBRUQ7QUFBcEMsUUFOTixDQURGLENBREY7QUFhRDs7OztFQS9Cb0IsNENBQUssQ0FBQ1gsUzs7QUFrQzdCTSxRQUFRLENBQUM1QyxTQUFULEdBQXFCO0FBQ25COEMsTUFBSSxFQUFFLGlEQUFTLENBQUM3QyxJQUFWLENBQWVDLFVBREY7QUFFbkIzRCxTQUFPLEVBQUUsaURBQVMsQ0FBQzJFLE1BQVYsQ0FBaUJoQixVQUZQO0FBR25CMkMsU0FBTyxFQUFFLGlEQUFTLENBQUN0QixJQUFWLENBQWVyQixVQUhMO0FBSW5CaEIsVUFBUSxFQUFFLGlEQUFTLENBQUNtRSxNQUpEO0FBS25CTCxTQUFPLEVBQUUsaURBQVMsQ0FBQy9DLElBTEE7QUFNbkJnRCxZQUFVLEVBQUUsaURBQVMsQ0FBQy9CLE1BTkg7QUFPbkJnQyxhQUFXLEVBQUUsaURBQVMsQ0FBQzNCLElBUEo7QUFRbkI0QixpQkFBZSxFQUFFLGlEQUFTLENBQUMzQixLQUFWLENBQWdCLENBQUMsS0FBRCxFQUFRLFFBQVIsQ0FBaEIsQ0FSRTtBQVNuQjRCLG9CQUFrQixFQUFFLGlEQUFTLENBQUM1QixLQUFWLENBQWdCLENBQUMsTUFBRCxFQUFTLE9BQVQsQ0FBaEI7QUFURCxDQUFyQjtBQVlBb0IsUUFBUSxDQUFDekIsWUFBVCxHQUF3QjtBQUN0QmpDLFVBQVEsRUFBRSxJQURZO0FBRXRCOEQsU0FBTyxFQUFFLEtBRmE7QUFHdEJDLFlBQVUsRUFBRSxFQUhVO0FBSXRCQyxhQUFXLEVBQUVqRyxTQUpTO0FBS3RCa0csaUJBQWUsRUFBRSxRQUxLO0FBTXRCQyxvQkFBa0IsRUFBRTtBQU5FLENBQXhCO0FBU2UsK0RBQUFSLFFBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFFTVUsSzs7Ozs7QUFDSixpQkFBWXhDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakIsK0VBQU1BLEtBQU47QUFDQSxVQUFLcEcsS0FBTCxHQUFhO0FBQ1g2SSxxQkFBZSxFQUFFO0FBRE4sS0FBYjtBQUZpQjtBQUtsQjs7Ozt3Q0FFbUI7QUFBQSxVQUNWQyxzQkFEVSxHQUNpQixLQUFLMUMsS0FEdEIsQ0FDVjBDLHNCQURVO0FBRWxCQSw0QkFBc0I7QUFDdkI7Ozs2QkFFUTtBQUFBOztBQUFBLFVBQ0NELGVBREQsR0FDcUIsS0FBSzdJLEtBRDFCLENBQ0M2SSxlQUREO0FBQUEsd0JBRXVDLEtBQUt6QyxLQUY1QztBQUFBLFVBRUN2RSxPQUZELGVBRUNBLE9BRkQ7QUFBQSxVQUVVa0gsV0FGVixlQUVVQSxXQUZWO0FBQUEsVUFFdUJDLFdBRnZCLGVBRXVCQSxXQUZ2QjtBQUdQLGFBQ0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FDRSwyREFBQyw0REFBRDtBQUFjLFlBQUksRUFBRUE7QUFBcEIsUUFERixFQUVFO0FBQUssVUFBRSxFQUFDO0FBQVIsU0FDRSwyREFBQyw2RUFBRCxPQURGLEVBRUUsMkRBQUMsNkVBQUQsT0FGRixFQUdFLDJEQUFDLDZEQUFEO0FBQ0UsZUFBTyxFQUFFO0FBQUEsaUJBQU0sTUFBSSxDQUFDQyxRQUFMLENBQWM7QUFBRUosMkJBQWUsRUFBRTtBQUFuQixXQUFkLENBQU47QUFBQTtBQURYLFFBSEYsQ0FGRixFQVNFLDJEQUFDLGtFQUFELE9BVEYsRUFVRSwyREFBQyw0REFBRDtBQUNFLFlBQUksRUFBRUEsZUFEUjtBQUVFLGVBQU8sRUFBRTtBQUFBLGlCQUFNLE1BQUksQ0FBQ0ksUUFBTCxDQUFjO0FBQUVKLDJCQUFlLEVBQUU7QUFBbkIsV0FBZCxDQUFOO0FBQUE7QUFGWCxRQVZGLEVBY0UsMkRBQUMsd0RBQUQ7QUFDRSxZQUFJLEVBQUVoSCxPQUFPLENBQUN1RyxJQURoQjtBQUVFLGVBQU8sRUFBRXZHLE9BQU8sQ0FBQ3lHLE9BRm5CO0FBR0UsZUFBTyxFQUFFekcsT0FBTyxDQUFDb0csSUFIbkI7QUFJRSxlQUFPLEVBQUU7QUFBQSxpQkFBTWMsV0FBVyxFQUFqQjtBQUFBO0FBSlgsUUFkRixDQURGO0FBdUJEOzs7O0VBdkNpQiwrQzs7QUEwQ3BCSCxLQUFLLENBQUN0RCxTQUFOLEdBQWtCO0FBQ2hCekQsU0FBTyxFQUFFLGlEQUFTLENBQUNxSCxLQUFWLENBQWdCO0FBQ3ZCZCxRQUFJLEVBQUUsaURBQVMsQ0FBQzdDLElBQVYsQ0FBZUMsVUFERTtBQUV2QjhDLFdBQU8sRUFBRSxpREFBUyxDQUFDL0MsSUFBVixDQUFlQyxVQUZEO0FBR3ZCeUMsUUFBSSxFQUFFLGlEQUFTLENBQUN6QixNQUFWLENBQWlCaEI7QUFIQSxHQUFoQixFQUlOQSxVQUxhO0FBTWhCdUQsYUFBVyxFQUFFLGlEQUFTLENBQUNsQyxJQUFWLENBQWVyQixVQU5aO0FBT2hCc0Qsd0JBQXNCLEVBQUUsaURBQVMsQ0FBQ2pDLElBQVYsQ0FBZXJCLFVBUHZCO0FBUWhCd0QsYUFBVyxFQUFFLGlEQUFTLENBQUN6RCxJQUFWLENBQWVDO0FBUlosQ0FBbEI7QUFXZSwrREFBQW9ELEtBQWYsRTs7Ozs7Ozs7Ozs7O0FDaEVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUVBLElBQU1PLG9CQUFvQixHQUFHLFNBQXZCQSxvQkFBdUI7QUFBQSxNQUFHeEMsT0FBSCxRQUFHQSxPQUFIO0FBQUEsU0FDM0I7QUFBUSxhQUFTLEVBQUMsd0JBQWxCO0FBQTJDLFdBQU8sRUFBRUE7QUFBcEQsS0FDRTtBQUFHLGFBQVMsRUFBQztBQUFiLElBREYsQ0FEMkI7QUFBQSxDQUE3Qjs7QUFNQXdDLG9CQUFvQixDQUFDN0QsU0FBckIsR0FBaUM7QUFDL0JxQixTQUFPLEVBQUUsaURBQVMsQ0FBQ0UsSUFBVixDQUFlckI7QUFETyxDQUFqQztBQUllLCtEQUFBMkQsb0JBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRU1DLGdCOzs7OztBQUNKLDRCQUFZaEQsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNqQiwwRkFBTUEsS0FBTjtBQUNBLFVBQUtpRCxLQUFMLEdBQWE5RyxTQUFiO0FBQ0EsVUFBSytHLHFCQUFMLEdBQTZCLE1BQUtBLHFCQUFMLENBQTJCcEMsSUFBM0IsdURBQTdCO0FBQ0EsVUFBS3FDLHNCQUFMLEdBQThCLE1BQUtBLHNCQUFMLENBQTRCckMsSUFBNUIsdURBQTlCO0FBQ0EsVUFBS3NDLGVBQUwsR0FBdUIsTUFBS0EsZUFBTCxDQUFxQnRDLElBQXJCLHVEQUF2QjtBQUxpQjtBQU1sQjs7Ozs0Q0FFdUI7QUFDdEIsVUFBSSxLQUFLbUMsS0FBVCxFQUFnQjtBQUNkLGFBQUtHLGVBQUwsQ0FBcUIsQ0FBQyxLQUFLSCxLQUFMLENBQVdJLFdBQWpDO0FBQ0Q7QUFDRjs7OzZDQUV3QjtBQUN2QixVQUFJLEtBQUtKLEtBQVQsRUFBZ0I7QUFDZCxhQUFLRyxlQUFMLENBQXFCLEtBQUtILEtBQUwsQ0FBV0ksV0FBaEM7QUFDRDtBQUNGOzs7b0NBRWVDLEssRUFBTztBQUNyQixVQUFJLEtBQUtMLEtBQVQsRUFBZ0I7QUFDZCxZQUFNTSxjQUFjLEdBQUcsS0FBS04sS0FBTCxDQUFXTyxVQUFYLEdBQXdCRixLQUEvQztBQUNBRyxRQUFBLDZDQUFNLENBQUNDLElBQVAsQ0FBWSxLQUFLVCxLQUFqQixFQUF3Qk0sY0FBeEI7QUFDRDtBQUNGOzs7NkJBRVE7QUFBQTs7QUFBQSx3QkFDcUQsS0FBS3ZELEtBRDFEO0FBQUEsVUFDQzJELFlBREQsZUFDQ0EsWUFERDtBQUFBLFVBQ2VDLGdCQURmLGVBQ2VBLGdCQURmO0FBQUEsVUFDaUNDLGVBRGpDLGVBQ2lDQSxlQURqQztBQUVQLGFBQ0U7QUFBSyxVQUFFLEVBQUM7QUFBUixTQUNFLDJEQUFDLDJEQUFEO0FBQ0UsZUFBTyxFQUFFLEtBQUtYLHFCQURoQjtBQUVFLGlCQUFTLEVBQUM7QUFGWixRQURGLEVBS0U7QUFDRSxpQkFBUyxFQUFDLG1CQURaO0FBRUUsV0FBRyxFQUFFLGFBQUN6RSxJQUFELEVBQVU7QUFDYixnQkFBSSxDQUFDd0UsS0FBTCxHQUFheEUsSUFBYjtBQUNEO0FBSkgsU0FNRSwyREFBQyxzRUFBRDtBQUFpQixhQUFLLEVBQUU7QUFBRWdCLGlCQUFPLEVBQUUsU0FBWDtBQUFzQnFFLHFCQUFXLEVBQUUsUUFBbkM7QUFBNkNDLHNCQUFZLEVBQUU7QUFBM0Q7QUFBeEIsU0FFSUosWUFBWSxDQUFDdkcsR0FBYixDQUFpQixVQUFBL0MsUUFBUTtBQUFBLGVBQ3ZCLDJEQUFDLG1EQUFEO0FBQU0sYUFBRyxFQUFFQSxRQUFRLENBQUMwQjtBQUFwQixXQUNFLDJEQUFDLGlEQUFEO0FBQ0UsYUFBRyxFQUFFMUIsUUFBUSxDQUFDMEIsRUFEaEI7QUFFRSxrQkFBUSxFQUFFMUIsUUFGWjtBQUdFLGtCQUFRLEVBQUVBLFFBQVEsQ0FBQzJKLFFBSHJCO0FBSUUsa0JBQVEsRUFBRUosZ0JBSlo7QUFLRSxpQkFBTyxFQUFFQztBQUxYLFVBREYsQ0FEdUI7QUFBQSxPQUF6QixDQUZKLENBTkYsQ0FMRixFQTJCRSwyREFBQywyREFBRDtBQUNFLGVBQU8sRUFBRSxLQUFLVixzQkFEaEI7QUFFRSxpQkFBUyxFQUFDO0FBRlosUUEzQkYsQ0FERjtBQWtDRDs7OztFQWhFNEIsNENBQUssQ0FBQzNCLFM7O0FBbUVyQ3dCLGdCQUFnQixDQUFDOUQsU0FBakIsR0FBNkI7QUFDM0J5RSxjQUFZLEVBQUUsaURBQVMsQ0FBQ2xDLE9BQVYsQ0FBa0IsaURBQVMsQ0FBQ3FCLEtBQVYsQ0FBZ0I7QUFDOUNrQixZQUFRLEVBQUUsaURBQVMsQ0FBQzdFLElBQVYsQ0FBZUMsVUFEcUI7QUFFOUNyRCxNQUFFLEVBQUUsaURBQVMsQ0FBQ3FFLE1BQVYsQ0FBaUJoQixVQUZ5QjtBQUc5Q25ELFFBQUksRUFBRSxpREFBUyxDQUFDbUUsTUFBVixDQUFpQmhCO0FBSHVCLEdBQWhCLEVBSTdCQSxVQUpXLEVBSUNBLFVBTFk7QUFNM0J3RSxrQkFBZ0IsRUFBRSxpREFBUyxDQUFDbkQsSUFORDtBQU8zQm9ELGlCQUFlLEVBQUUsaURBQVMsQ0FBQ3BELElBQVYsQ0FBZXJCO0FBUEwsQ0FBN0I7QUFVQTRELGdCQUFnQixDQUFDM0MsWUFBakIsR0FBZ0M7QUFDOUJ1RCxrQkFBZ0IsRUFBRXpIO0FBRFksQ0FBaEM7QUFJZSwrREFBQTZHLGdCQUFmLEU7Ozs7Ozs7Ozs7OztBQ3pGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTWlCLFFBQVEsR0FBRyxTQUFYQSxRQUFXLE9BRVg7QUFBQSxNQURKNUosUUFDSSxRQURKQSxRQUNJO0FBQUEsTUFETTJKLFFBQ04sUUFETUEsUUFDTjtBQUFBLE1BRGdCekQsT0FDaEIsUUFEZ0JBLE9BQ2hCO0FBQUEsTUFEeUIyRCxRQUN6QixRQUR5QkEsUUFDekI7QUFDSixNQUFJQyxRQUFRLEdBQUcsRUFBZjs7QUFFQSxNQUFNQyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFDQyxDQUFELEVBQU87QUFDekI5RCxXQUFPLENBQUNsRyxRQUFELEVBQVdnSyxDQUFYLENBQVA7QUFDRCxHQUZEOztBQUdBLE1BQU1DLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsR0FBTTtBQUMxQkosWUFBUSxDQUFDN0osUUFBRCxDQUFSO0FBQ0QsR0FGRDs7QUFJQSxNQUFJMkosUUFBSixFQUFjO0FBQ1pHLFlBQVEsR0FBRyxtQkFBWDtBQUNEOztBQUNELFNBQ0U7QUFDRSxhQUFTLFlBQUtBLFFBQUwsc0NBRFg7QUFFRSxXQUFPLEVBQUVDLFdBRlg7QUFHRSxRQUFJLEVBQUM7QUFIUCxLQUtFO0FBQU0sYUFBUyxFQUFDO0FBQWhCLEtBQWlDL0osUUFBUSxDQUFDNEIsSUFBMUMsQ0FMRixFQU9LNUIsUUFBUSxDQUFDMEIsRUFBVCxLQUFnQixHQUFoQixJQUF1Qm1JLFFBQVEsS0FBSy9ILFNBQXJDLElBQ0UsMkRBQUMsNkRBQUQ7QUFBc0IsV0FBTyxFQUFFbUk7QUFBL0IsSUFSTixDQURGO0FBYUQsQ0E1QkQ7O0FBOEJBTCxRQUFRLENBQUMvRSxTQUFULEdBQXFCO0FBQ25CZ0YsVUFBUSxFQUFFLGlEQUFTLENBQUN6RCxJQUREO0FBRW5CRixTQUFPLEVBQUUsaURBQVMsQ0FBQ0UsSUFBVixDQUFlckIsVUFGTDtBQUduQi9FLFVBQVEsRUFBRSxpREFBUyxDQUFDeUksS0FBVixDQUFnQjtBQUN4Qi9HLE1BQUUsRUFBRSxpREFBUyxDQUFDcUUsTUFBVixDQUFpQmhCLFVBREc7QUFFeEJuRCxRQUFJLEVBQUUsaURBQVMsQ0FBQ21FLE1BQVYsQ0FBaUJoQjtBQUZDLEdBQWhCLEVBR1BBLFVBTmdCO0FBT25CNEUsVUFBUSxFQUFFLGlEQUFTLENBQUM3RSxJQUFWLENBQWVDO0FBUE4sQ0FBckI7QUFVQTZFLFFBQVEsQ0FBQzVELFlBQVQsR0FBd0I7QUFDdEI2RCxVQUFRLEVBQUUvSDtBQURZLENBQXhCO0FBSWUsK0RBQUE4SCxRQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoREE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0lBRU1NLFc7Ozs7O0FBQ0osdUJBQVl2RSxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2pCLHFGQUFNQSxLQUFOO0FBQ0EsVUFBS3BHLEtBQUwsR0FBYTtBQUNYcUMsVUFBSSxFQUFFO0FBREssS0FBYjtBQUdBLFVBQUt1SSxpQkFBTCxHQUF5QixNQUFLQSxpQkFBTCxDQUF1QjFELElBQXZCLHVEQUF6QjtBQUNBLFVBQUsyRCxnQkFBTCxHQUF3QixNQUFLQSxnQkFBTCxDQUFzQjNELElBQXRCLHVEQUF4QjtBQUNBLFVBQUs0RCxpQkFBTCxHQUF5QixNQUFLQSxpQkFBTCxDQUF1QjVELElBQXZCLHVEQUF6QjtBQVBpQjtBQVFsQjs7OztzQ0FFaUJ1RCxDLEVBQUc7QUFDbkIsV0FBS3hCLFFBQUwsQ0FBYztBQUFFNUcsWUFBSSxFQUFFb0ksQ0FBQyxDQUFDTSxNQUFGLENBQVNDO0FBQWpCLE9BQWQ7QUFDRDs7O3VDQUVrQjtBQUFBLFVBQ1QzSSxJQURTLEdBQ0EsS0FBS3JDLEtBREwsQ0FDVHFDLElBRFM7QUFBQSxVQUVUaEIsUUFGUyxHQUVJLEtBQUsrRSxLQUZULENBRVQvRSxRQUZTOztBQUdqQixVQUFJZ0IsSUFBSSxLQUFLLEVBQWIsRUFBaUI7QUFDZmhCLGdCQUFRLENBQUMsK0VBQWUsQ0FBQyx5REFBTSxDQUFDNEosZUFBUixDQUFoQixDQUFSO0FBQ0E7QUFDRDs7QUFDRDVKLGNBQVEsQ0FBQywrRUFBVyxDQUFDZ0IsSUFBRCxFQUFPLEtBQUt5SSxpQkFBWixDQUFaLENBQVI7QUFDRDs7O3NDQUVpQmpLLGdCLEVBQWtCO0FBQUEsVUFDMUJxSyxNQUQwQixHQUNmLEtBQUs5RSxLQURVLENBQzFCOEUsTUFEMEI7QUFFbENBLFlBQU0sQ0FBQztBQUFFQyxjQUFNLEVBQUUseURBQVY7QUFBb0JDLGVBQU8sRUFBRTtBQUFFdkssMEJBQWdCLEVBQWhCQTtBQUFGO0FBQTdCLE9BQUQsQ0FBTjtBQUNEOzs7NkJBRVE7QUFDUCxhQUNFO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQ0UsdUVBQUsseURBQU0sQ0FBQ3dLLGdCQUFaLENBREYsRUFFRSx3RUFDRTtBQUNFLGlCQUFTLEVBQUMsWUFEWjtBQUVFLFlBQUksRUFBQyxNQUZQO0FBR0UsbUJBQVcsRUFBRSx5REFBTSxDQUFDQyxlQUh0QjtBQUlFLGdCQUFRLEVBQUUsS0FBS1Y7QUFKakIsUUFERixDQUZGLEVBVUUsd0VBQ0U7QUFDRSxpQkFBUyxFQUFDLGFBRFo7QUFFRSxlQUFPLEVBQUUsS0FBS0M7QUFGaEIsU0FJRyx5REFBTSxDQUFDVSxTQUpWLENBREYsQ0FWRixDQURGO0FBcUJEOzs7O0VBcER1Qiw0Q0FBSyxDQUFDM0QsUzs7QUF1RGhDK0MsV0FBVyxDQUFDckYsU0FBWixHQUF3QjtBQUN0QmpFLFVBQVEsRUFBRSxpREFBUyxDQUFDd0YsSUFBVixDQUFlckIsVUFESDtBQUV0QjBGLFFBQU0sRUFBRSxpREFBUyxDQUFDckUsSUFBVixDQUFlckI7QUFGRCxDQUF4QjtBQUtlLDBIQUFPLEdBQUdtRixXQUFILENBQXRCLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7SUFFTWEsTzs7Ozs7QUFDSixxQkFBYztBQUFBOztBQUFBOztBQUNaO0FBQ0EsVUFBS3hMLEtBQUwsR0FBYTtBQUNYa0UsV0FBSyxFQUFFLEVBREk7QUFFWEMsaUJBQVcsRUFBRTtBQUZGLEtBQWI7QUFJQSxVQUFLeUcsaUJBQUwsR0FBeUIsTUFBS0EsaUJBQUwsQ0FBdUIxRCxJQUF2Qix1REFBekI7QUFDQSxVQUFLdUUscUJBQUwsR0FBNkIsTUFBS0EscUJBQUwsQ0FBMkJ2RSxJQUEzQix1REFBN0I7QUFQWTtBQVFiOzs7O3NDQUVpQjdFLEksRUFBTTtBQUFBOztBQUN0QixhQUFPLFVBQUNvSSxDQUFELEVBQU87QUFDWixjQUFJLENBQUN4QixRQUFMLHFCQUFpQjVHLElBQWpCLEVBQXdCb0ksQ0FBQyxDQUFDTSxNQUFGLENBQVNDLEtBQWpDO0FBQ0QsT0FGRDtBQUdEOzs7NENBRXVCO0FBQUEsd0JBQ2dCLEtBQUs1RSxLQURyQjtBQUFBLFVBQ2RnRixPQURjLGVBQ2RBLE9BRGM7QUFBQSxVQUNML0osUUFESyxlQUNMQSxRQURLO0FBQUEsVUFDSzZKLE1BREwsZUFDS0EsTUFETDtBQUFBLHdCQUVTLEtBQUtsTCxLQUZkO0FBQUEsVUFFZGtFLEtBRmMsZUFFZEEsS0FGYztBQUFBLFVBRVBDLFdBRk8sZUFFUEEsV0FGTztBQUd0QixVQUFNMUQsUUFBUSxHQUFHMkssT0FBTyxDQUFDdkssZ0JBQXpCOztBQUNBLFVBQUlxRCxLQUFLLEtBQUssRUFBZCxFQUFrQjtBQUNoQjdDLGdCQUFRLENBQUMsK0VBQWUsQ0FBQyx5REFBTSxDQUFDcUssZ0JBQVIsQ0FBaEIsQ0FBUjtBQUNBO0FBQ0Q7O0FBQ0RSLFlBQU0sQ0FBQztBQUFFQyxjQUFNLEVBQUUscUVBQVY7QUFBZ0NDLGVBQU8sRUFBRTtBQUFFbEgsZUFBSyxFQUFMQSxLQUFGO0FBQVNDLHFCQUFXLEVBQVhBLFdBQVQ7QUFBc0IxRCxrQkFBUSxFQUFSQTtBQUF0QjtBQUF6QyxPQUFELENBQU47QUFDRDs7OzZCQUVRO0FBQUEsVUFDQ0ksZ0JBREQsR0FDc0IsS0FBS3VGLEtBQUwsQ0FBV2dGLE9BRGpDLENBQ0N2SyxnQkFERDtBQUVQLGFBQ0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FDRSx1RUFBSyx5REFBTSxDQUFDOEssWUFBWixDQURGLEVBRUUsdUVBQ0cseURBQU0sQ0FBQ0MsZ0JBRFYsRUFFRTtBQUFNLGlCQUFTLEVBQUM7QUFBaEIsb0JBQ08vSyxnQkFBZ0IsQ0FBQ3dCLElBRHhCLEVBRkYsQ0FGRixFQVFFO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQ0U7QUFDRSxpQkFBUyxFQUFDLFlBRFo7QUFFRSxZQUFJLEVBQUMsTUFGUDtBQUdFLG1CQUFXLEVBQUUseURBQU0sQ0FBQ3dKLGdCQUh0QjtBQUlFLGdCQUFRLEVBQUUsS0FBS2pCLGlCQUFMLENBQXVCLE9BQXZCO0FBSlosUUFERixFQU9FO0FBQ0UsaUJBQVMsRUFBQyxZQURaO0FBRUUsWUFBSSxFQUFDLE1BRlA7QUFHRSxtQkFBVyxFQUFFLHlEQUFNLENBQUNrQixzQkFIdEI7QUFJRSxnQkFBUSxFQUFFLEtBQUtsQixpQkFBTCxDQUF1QixhQUF2QjtBQUpaLFFBUEYsQ0FSRixFQXNCRSx3RUFDRTtBQUNFLGlCQUFTLEVBQUMsYUFEWjtBQUVFLGVBQU8sRUFBRSxLQUFLYTtBQUZoQixTQUlHLHlEQUFNLENBQUNNLGNBSlYsQ0FERixDQXRCRixDQURGO0FBaUNEOzs7O0VBL0RtQiw0Q0FBSyxDQUFDbkUsUzs7QUFrRTVCNEQsT0FBTyxDQUFDbEcsU0FBUixHQUFvQjtBQUNsQmpFLFVBQVEsRUFBRSxpREFBUyxDQUFDd0YsSUFBVixDQUFlckIsVUFEUDtBQUVsQjRGLFNBQU8sRUFBRSxpREFBUyxDQUFDbEMsS0FBVixDQUFnQjtBQUN2QnJJLG9CQUFnQixFQUFFLGlEQUFTLENBQUNxSSxLQUFWLENBQWdCO0FBQ2hDL0csUUFBRSxFQUFFLGlEQUFTLENBQUNxRSxNQUFWLENBQWlCaEIsVUFEVztBQUVoQ25ELFVBQUksRUFBRSxpREFBUyxDQUFDbUUsTUFBVixDQUFpQmhCO0FBRlMsS0FBaEIsRUFHZkE7QUFKb0IsR0FBaEIsRUFLTkEsVUFQZTtBQVFsQjBGLFFBQU0sRUFBRSxpREFBUyxDQUFDckUsSUFBVixDQUFlckI7QUFSTCxDQUFwQjtBQVdlLDBIQUFPLEdBQUdnRyxPQUFILENBQXRCLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JGQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNUSxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQXFCLENBQUNDLEtBQUQsRUFBUTdGLEtBQVIsRUFBa0I7QUFDM0MsTUFBSTZGLEtBQUssQ0FBQ0MsTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUN0QixXQUFPLDJEQUFDLHdEQUFELEVBQXFCOUYsS0FBckIsQ0FBUDtBQUNEOztBQUNELE1BQU0rRixRQUFRLEdBQUdGLEtBQUssQ0FBQ0EsS0FBSyxDQUFDQyxNQUFOLEdBQWUsQ0FBaEIsQ0FBdEI7O0FBQ0EsVUFBUUMsUUFBUSxDQUFDaEIsTUFBakI7QUFDRSxTQUFLLG1FQUFMO0FBQ0UsYUFBTywyREFBQyx3REFBRCxFQUFxQi9FLEtBQXJCLENBQVA7O0FBQ0YsU0FBSyw2REFBTDtBQUNFLGFBQU8sMkRBQUMsb0RBQUQsRUFBaUJBLEtBQWpCLENBQVA7O0FBQ0YsU0FBSyx5REFBTDtBQUNFLGFBQU8sMkRBQUMsZ0RBQUQsZUFBYUEsS0FBYjtBQUFvQixlQUFPLEVBQUUrRixRQUFRLENBQUNmO0FBQXRDLFNBQVA7O0FBQ0YsU0FBSyxnRUFBTDtBQUNFLGFBQU8sMkRBQUMsdURBQUQsRUFBb0JoRixLQUFwQixDQUFQOztBQUNGLFNBQUsscUVBQUw7QUFDRSxhQUFPLDJEQUFDLDJEQUFELGVBQXdCQSxLQUF4QjtBQUErQixlQUFPLEVBQUUrRixRQUFRLENBQUNmO0FBQWpELFNBQVA7O0FBQ0YsU0FBSyxxREFBTDtBQUNFLGFBQU8sMkRBQUMsNkNBQUQsRUFBVWhGLEtBQVYsQ0FBUDs7QUFDRjtBQUNFLGFBQU8sMkRBQUMsd0RBQUQsRUFBcUJBLEtBQXJCLENBQVA7QUFkSjtBQWdCRCxDQXJCRDs7QUF1QkEsSUFBTWdHLFdBQVcsR0FBRztBQUNsQkMsV0FBUyxFQUFFLEVBRE87QUFFbEJKLE9BQUssRUFBRSxDQUNMO0FBQ0VkLFVBQU0sRUFBRSxtRUFEVjtBQUVFQyxXQUFPLEVBQUU7QUFGWCxHQURLLENBRlc7QUFRbEJrQixVQUFRLEVBQUU7QUFSUSxDQUFwQjs7SUFXTUMsUzs7Ozs7QUFDSixxQkFBWW5HLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakIsbUZBQU1BLEtBQU47QUFDQSxVQUFLcEcsS0FBTCxxQkFDS29NLFdBREw7QUFHQSxVQUFLSSxNQUFMLEdBQWMsTUFBS0EsTUFBTCxDQUFZdEYsSUFBWix1REFBZDtBQUNBLFVBQUtnRSxNQUFMLEdBQWMsTUFBS0EsTUFBTCxDQUFZaEUsSUFBWix1REFBZDtBQUNBLFVBQUt1RixlQUFMLEdBQXVCLE1BQUtBLGVBQUwsQ0FBcUJ2RixJQUFyQix1REFBdkI7QUFDQSxVQUFLd0YsY0FBTCxHQUFzQixNQUFLQSxjQUFMLENBQW9CeEYsSUFBcEIsdURBQXRCO0FBUmlCO0FBU2xCOzs7OzZCQUVRO0FBQUEsVUFDQytFLEtBREQsR0FDVyxLQUFLak0sS0FEaEIsQ0FDQ2lNLEtBREQ7QUFBQSxVQUVDOUQsT0FGRCxHQUVhLEtBQUsvQixLQUZsQixDQUVDK0IsT0FGRDtBQUdQLFVBQU13RSxTQUFTLEdBQUdWLEtBQUssQ0FBQ0MsTUFBeEI7O0FBQ0EsVUFBSVMsU0FBUyxLQUFLLENBQWxCLEVBQXFCO0FBQ25CO0FBQ0EsYUFBSzFELFFBQUwsbUJBQW1CbUQsV0FBbkI7QUFDQWpFLGVBQU87QUFDUixPQUpELE1BSU87QUFDTCxhQUFLYyxRQUFMLENBQWM7QUFDWm9ELG1CQUFTLHFCQUNKSixLQUFLLENBQUNXLEtBQU4sQ0FBWSxDQUFaLEVBQWVYLEtBQUssQ0FBQ0MsTUFBTixHQUFlLENBQTlCLENBREksQ0FERztBQUlaSSxrQkFBUSxFQUFFO0FBSkUsU0FBZDtBQU1EO0FBQ0Y7Ozs2QkFFMEM7QUFBQSxVQUFwQ08sSUFBb0MsdUVBQTdCO0FBQUUxQixjQUFNLEVBQUUsRUFBVjtBQUFjQyxlQUFPLEVBQUU7QUFBdkIsT0FBNkI7QUFBQSxVQUNqQ2EsS0FEaUMsR0FDdkIsS0FBS2pNLEtBRGtCLENBQ2pDaU0sS0FEaUM7QUFFekMsV0FBS2hELFFBQUwsQ0FBYztBQUNab0QsaUJBQVMsK0JBQ0pKLEtBREksc0JBRUZZLElBRkU7QUFHTEMsa0JBQVEsRUFBRTtBQUhMLFlBREc7QUFPWlIsZ0JBQVEsRUFBRTtBQVBFLE9BQWQ7QUFTRDs7O3NDQUVpQjtBQUFBOztBQUFBLFVBQ1JuRSxPQURRLEdBQ0ksS0FBSy9CLEtBRFQsQ0FDUitCLE9BRFE7QUFFaEJBLGFBQU87QUFDUEUsZ0JBQVUsQ0FBQyxZQUFNO0FBQ2YsY0FBSSxDQUFDWSxRQUFMLG1CQUFtQm1ELFdBQW5CO0FBQ0QsT0FGUyxFQUVQLEdBRk8sQ0FBVjtBQUdEOzs7bUNBRWN2SCxJLEVBQU1rSSxJLEVBQU07QUFBQTs7QUFDekJsSSxVQUFJLENBQUN1QyxnQkFBTCxDQUFzQixlQUF0QixFQUF1QyxZQUFNO0FBQzNDMkYsWUFBSTtBQUR1QywyQkFFWCxNQUFJLENBQUMvTSxLQUZNO0FBQUEsWUFFbkNxTSxTQUZtQyxnQkFFbkNBLFNBRm1DO0FBQUEsWUFFeEJDLFFBRndCLGdCQUV4QkEsUUFGd0I7O0FBRzNDLFlBQUlBLFFBQUosRUFBYztBQUNaO0FBQ0Q7O0FBQ0QsY0FBSSxDQUFDckQsUUFBTCxDQUFjO0FBQ1pnRCxlQUFLLHFCQUNBSSxTQURBLENBRE87QUFJWkMsa0JBQVEsRUFBRTtBQUpFLFNBQWQ7QUFNRCxPQVpELEVBWUcsS0FaSDtBQWFEOzs7NkJBRVE7QUFBQTs7QUFBQSx3QkFDcUIsS0FBS3RNLEtBRDFCO0FBQUEsVUFDQ2lNLEtBREQsZUFDQ0EsS0FERDtBQUFBLFVBQ1FLLFFBRFIsZUFDUUEsUUFEUjtBQUFBLHdCQUVtQixLQUFLbEcsS0FGeEI7QUFBQSxVQUVDK0IsT0FGRCxlQUVDQSxPQUZEO0FBQUEsVUFFVTZFLElBRlYsZUFFVUEsSUFGVjtBQUFBLFVBR0M5QixNQUhELEdBRzZDLElBSDdDLENBR0NBLE1BSEQ7QUFBQSxVQUdTdUIsZUFIVCxHQUc2QyxJQUg3QyxDQUdTQSxlQUhUO0FBQUEsVUFHMEJDLGNBSDFCLEdBRzZDLElBSDdDLENBRzBCQSxjQUgxQjtBQUlQLGFBQ0UsMkRBQUMsMERBQUQ7QUFBWSxVQUFFLEVBQUVNO0FBQWhCLFNBQ0U7QUFBSyxVQUFFLEVBQUM7QUFBUixTQUNFO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQ0U7QUFBUSxVQUFFLEVBQUMsbUJBQVg7QUFBK0IsZUFBTyxFQUFFO0FBQUEsaUJBQU03RSxPQUFPLEVBQWI7QUFBQTtBQUF4QyxTQUNFO0FBQUcsaUJBQVMsRUFBQztBQUFiLGtCQURGLENBREYsQ0FERixFQU1FO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQ0UsMkRBQUMsK0NBQUQ7QUFDRSxZQUFJLEVBQUUseURBRFI7QUFFRSxtQkFBVyxFQUFFOEQ7QUFGZixRQURGLENBTkYsRUFZRTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNFLDJEQUFDLDBEQUFEO0FBQWEsVUFBRSxFQUFFSyxRQUFqQjtBQUEyQixtQkFBVyxFQUFFSTtBQUF4QyxTQUNHVixrQkFBa0IsQ0FBQ0MsS0FBRCxFQUFRO0FBQUVmLGNBQU0sRUFBTkEsTUFBRjtBQUFVL0MsZUFBTyxFQUFFc0U7QUFBbkIsT0FBUixDQURyQixDQURGLENBWkYsRUFpQkU7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FDRTtBQUNFLFVBQUUsRUFBQyxvQkFETDtBQUVFLGlCQUFTLEVBQUMsYUFGWjtBQUdFLGVBQU8sRUFBRTtBQUFBLGlCQUFNLE1BQUksQ0FBQ0QsTUFBTCxFQUFOO0FBQUE7QUFIWCxTQUtHLDBEQUFNLENBQUNTLFVBTFYsQ0FERixDQWpCRixDQURGLENBREY7QUErQkQ7Ozs7RUF0R3FCLDRDQUFLLENBQUNyRixTOztBQXlHOUIyRSxTQUFTLENBQUNqSCxTQUFWLEdBQXNCO0FBQ3BCMEgsTUFBSSxFQUFFLGlEQUFTLENBQUN6SCxJQUFWLENBQWVDLFVBREQ7QUFFcEIyQyxTQUFPLEVBQUUsaURBQVMsQ0FBQ3RCLElBQVYsQ0FBZXJCO0FBRkosQ0FBdEI7QUFLZSwrREFBQStHLFNBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdktBO0FBQ0E7QUFDQTs7SUFFTVcsSTs7Ozs7Ozs7Ozs7Ozt3Q0FDZ0I7QUFBQTs7QUFDbEI3RSxnQkFBVSxDQUFDLFlBQU07QUFBQSxZQUNQRixPQURPLEdBQ0ssS0FBSSxDQUFDL0IsS0FEVixDQUNQK0IsT0FETztBQUVmQSxlQUFPO0FBQ1IsT0FIUyxFQUdQLElBSE8sQ0FBVjtBQUlEOzs7NkJBRVE7QUFDUCxhQUNFO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQ0UsdUVBQUsseURBQU0sQ0FBQ2dGLFNBQVosQ0FERixFQUVFO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQ0U7QUFDRSxXQUFHLEVBQUMsaUNBRE47QUFFRSxpQkFBUyxFQUFDLFNBRlo7QUFHRSxXQUFHLEVBQUM7QUFITixRQURGLENBRkYsQ0FERjtBQVlEOzs7O0VBckJnQiw0Q0FBSyxDQUFDdkYsUzs7QUF3QnpCc0YsSUFBSSxDQUFDNUgsU0FBTCxHQUFpQjtBQUNmNkMsU0FBTyxFQUFFLGlEQUFTLENBQUN0QixJQUFWLENBQWVyQjtBQURULENBQWpCO0FBSWUsK0RBQUEwSCxJQUFmLEU7Ozs7Ozs7Ozs7OztBQ2hDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBOztBQUVBLElBQU1FLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0I7QUFBQSxNQUFHbEMsTUFBSCxRQUFHQSxNQUFIO0FBQUEsU0FDdEI7QUFBSyxhQUFTLEVBQUM7QUFBZixLQUNFLHVFQUFLLHlEQUFNLENBQUNtQyxRQUFaLENBREYsRUFFRTtBQUFLLGFBQVMsRUFBQztBQUFmLEtBQ0U7QUFDRSxhQUFTLEVBQUMsY0FEWjtBQUVFLFdBQU8sRUFBRTtBQUFBLGFBQU1uQyxNQUFNLENBQUM7QUFBRUMsY0FBTSxFQUFFLDZEQUFWO0FBQXdCQyxlQUFPLEVBQUU7QUFBakMsT0FBRCxDQUFaO0FBQUEsS0FGWDtBQUdFLFFBQUksRUFBQztBQUhQLEtBS0cseURBQU0sQ0FBQ2tDLGFBTFYsQ0FERixDQUZGLEVBV0U7QUFBSyxhQUFTLEVBQUM7QUFBZixLQUNFO0FBQ0UsYUFBUyxFQUFDLGNBRFo7QUFFRSxXQUFPLEVBQUU7QUFBQSxhQUFNcEMsTUFBTSxDQUFDO0FBQUVDLGNBQU0sRUFBRSxnRUFBVjtBQUEyQkMsZUFBTyxFQUFFO0FBQXBDLE9BQUQsQ0FBWjtBQUFBLEtBRlg7QUFHRSxRQUFJLEVBQUM7QUFIUCxLQUtHLHlEQUFNLENBQUNtQyxTQUxWLENBREYsQ0FYRixDQURzQjtBQUFBLENBQXhCOztBQXdCQUgsZUFBZSxDQUFDOUgsU0FBaEIsR0FBNEI7QUFDMUI0RixRQUFNLEVBQUUsaURBQVMsQ0FBQ3JFLElBQVYsQ0FBZXJCO0FBREcsQ0FBNUI7QUFJZSwrREFBQTRILGVBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7SUFHTUksYzs7Ozs7QUFDSiwwQkFBWXBILEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakIsd0ZBQU1BLEtBQU47QUFDQSxVQUFLcEcsS0FBTCxHQUFhO0FBQ1hhLHNCQUFnQixFQUFFMEI7QUFEUCxLQUFiO0FBR0EsVUFBS2tMLGVBQUwsR0FBdUIsTUFBS0EsZUFBTCxDQUFxQnZHLElBQXJCLHVEQUF2QjtBQUNBLFVBQUt3RyxpQkFBTCxHQUF5QixNQUFLQSxpQkFBTCxDQUF1QnhHLElBQXZCLHVEQUF6QjtBQU5pQjtBQU9sQjs7OztvQ0FFZXpHLFEsRUFBVTtBQUN4QixXQUFLd0ksUUFBTCxDQUFjO0FBQUVwSSx3QkFBZ0IsRUFBRUo7QUFBcEIsT0FBZDtBQUNEOzs7d0NBRW1CO0FBQUEsVUFDVkksZ0JBRFUsR0FDVyxLQUFLYixLQURoQixDQUNWYSxnQkFEVTtBQUFBLHdCQUVXLEtBQUt1RixLQUZoQjtBQUFBLFVBRVY4RSxNQUZVLGVBRVZBLE1BRlU7QUFBQSxVQUVGN0osUUFGRSxlQUVGQSxRQUZFOztBQUdsQixVQUFJUixnQkFBZ0IsS0FBSzBCLFNBQXpCLEVBQW9DO0FBQ2xDbEIsZ0JBQVEsQ0FBQywrRUFBZSxDQUFDLHlEQUFNLENBQUNzTSxpQkFBUixDQUFoQixDQUFSO0FBQ0E7QUFDRDs7QUFDRHpDLFlBQU0sQ0FBQztBQUFFQyxjQUFNLEVBQUUseURBQVY7QUFBb0JDLGVBQU8sRUFBRTtBQUFFdkssMEJBQWdCLEVBQWhCQTtBQUFGO0FBQTdCLE9BQUQsQ0FBTjtBQUNEOzs7NkJBRVE7QUFBQTs7QUFBQSxVQUNDK00sY0FERCxHQUNvQixLQUFLeEgsS0FEekIsQ0FDQ3dILGNBREQ7QUFBQSxVQUVDL00sZ0JBRkQsR0FFc0IsS0FBS2IsS0FGM0IsQ0FFQ2EsZ0JBRkQ7QUFHUCxhQUNFO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQ0UsdUVBQUsseURBQU0sQ0FBQ2dOLG1CQUFaLENBREYsRUFFRTtBQUFLLFVBQUUsRUFBQztBQUFSLFNBRUlELGNBQWMsQ0FBQ3BLLEdBQWYsQ0FBbUIsVUFBQS9DLFFBQVE7QUFBQSxlQUN4QkEsUUFBUSxDQUFDMEIsRUFBVCxLQUFnQixHQUFqQixHQUNFLDJEQUFDLDBEQUFEO0FBQ0EsYUFBRyxFQUFFMUIsUUFBUSxDQUFDMEIsRUFEZDtBQUVBLGtCQUFRLEVBQUUxQixRQUZWO0FBR0Esa0JBQVEsRUFBRUksZ0JBQWdCLEtBQUswQixTQUFyQixJQUFrQzlCLFFBQVEsQ0FBQzBCLEVBQVQsS0FBZ0J0QixnQkFBZ0IsQ0FBQ3NCLEVBSDdFO0FBSUEsaUJBQU8sRUFBRSxNQUFJLENBQUNzTDtBQUpkLFVBREYsR0FPRWxMLFNBUnVCO0FBQUEsT0FBM0IsQ0FGSixDQUZGLEVBZ0JFLHdFQUNFO0FBQ0UsaUJBQVMsRUFBQyxhQURaO0FBRUUsZUFBTyxFQUFFLEtBQUttTDtBQUZoQixTQUlHLHlEQUFNLENBQUNJLFVBSlYsQ0FERixDQWhCRixDQURGO0FBMkJEOzs7O0VBdEQwQiw0Q0FBSyxDQUFDbEcsUzs7QUF5RG5DNEYsY0FBYyxDQUFDbEksU0FBZixHQUEyQjtBQUN6QmpFLFVBQVEsRUFBRSxpREFBUyxDQUFDd0YsSUFBVixDQUFlckIsVUFEQTtBQUV6Qm9JLGdCQUFjLEVBQUUsaURBQVMsQ0FBQy9GLE9BQVYsQ0FBa0IsaURBQVMsQ0FBQ3FCLEtBQVYsQ0FBZ0I7QUFDaEQvRyxNQUFFLEVBQUUsaURBQVMsQ0FBQ3FFLE1BQVYsQ0FBaUJoQixVQUQyQjtBQUVoRG5ELFFBQUksRUFBRSxpREFBUyxDQUFDbUUsTUFBVixDQUFpQmhCO0FBRnlCLEdBQWhCLEVBRy9CQSxVQUhhLEVBR0RBLFVBTFU7QUFNekIwRixRQUFNLEVBQUUsaURBQVMsQ0FBQ3JFLElBQVYsQ0FBZXJCO0FBTkUsQ0FBM0I7O0FBU0EsSUFBTXVJLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQS9OLEtBQUs7QUFBQSxTQUMxQjtBQUNFNE4sa0JBQWMsRUFBRTVOLEtBQUssQ0FBQ2lDLFdBQU4sQ0FBa0I1QjtBQURwQyxHQUQwQjtBQUFBLENBQTVCOztBQU1lLDBIQUFPLENBQUMwTixjQUFELENBQVAsQ0FBd0JQLGNBQXhCLENBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0lBRU1RLGtCOzs7OztBQUNKLDhCQUFZNUgsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNqQiw0RkFBTUEsS0FBTjtBQUNBLFVBQUtwRyxLQUFMLEdBQWE7QUFDWDJELGdCQUFVLEVBQUUsSUFBSUQsSUFBSjtBQURELEtBQWI7QUFHQSxVQUFLdUssaUJBQUwsR0FBeUIsTUFBS0EsaUJBQUwsQ0FBdUIvRyxJQUF2Qix1REFBekI7QUFDQSxVQUFLMkQsZ0JBQUwsR0FBd0IsTUFBS0EsZ0JBQUwsQ0FBc0IzRCxJQUF0Qix1REFBeEI7QUFDQSxVQUFLZ0gsaUJBQUwsR0FBeUIsTUFBS0EsaUJBQUwsQ0FBdUJoSCxJQUF2Qix1REFBekI7QUFQaUI7QUFRbEI7Ozs7c0NBRWlCaUgsSSxFQUFNO0FBQ3RCLFdBQUtsRixRQUFMLENBQWM7QUFBRXRGLGtCQUFVLEVBQUV3SztBQUFkLE9BQWQ7QUFDRDs7O3VDQUVrQjtBQUFBLFVBQ1R4SyxVQURTLEdBQ00sS0FBSzNELEtBRFgsQ0FDVDJELFVBRFM7QUFBQSx3QkFFYSxLQUFLeUMsS0FGbEI7QUFBQSxVQUVUL0UsUUFGUyxlQUVUQSxRQUZTO0FBQUEsVUFFQytKLE9BRkQsZUFFQ0EsT0FGRDtBQUFBLFVBR1RsSCxLQUhTLEdBR3dCa0gsT0FIeEIsQ0FHVGxILEtBSFM7QUFBQSxVQUdGQyxXQUhFLEdBR3dCaUgsT0FIeEIsQ0FHRmpILFdBSEU7QUFBQSxVQUdXMUQsUUFIWCxHQUd3QjJLLE9BSHhCLENBR1czSyxRQUhYOztBQUlqQixVQUFJLENBQUNrRCxVQUFELElBQWVBLFVBQVUsS0FBSyxFQUFsQyxFQUFzQztBQUNwQ3RDLGdCQUFRLENBQUMsK0VBQWUsQ0FBQyx5REFBTSxDQUFDK00sYUFBUixDQUFoQixDQUFSO0FBQ0E7QUFDRDs7QUFDRC9NLGNBQVEsQ0FBQyx5RUFBTyxDQUNkNkMsS0FEYyxFQUNQQyxXQURPLEVBRWQxRCxRQUZjLEVBRUprRCxVQUZJLEVBRVEsS0FBS3VLLGlCQUZiLENBQVIsQ0FBUjtBQUlEOzs7d0NBRW1CO0FBQUEsVUFDVmhELE1BRFUsR0FDQyxLQUFLOUUsS0FETixDQUNWOEUsTUFEVTtBQUVsQkEsWUFBTSxDQUFDO0FBQUVDLGNBQU0sRUFBRSxxREFBVjtBQUFnQkMsZUFBTyxFQUFFO0FBQXpCLE9BQUQsQ0FBTjtBQUNEOzs7NkJBRVE7QUFBQSxVQUNDekgsVUFERCxHQUNnQixLQUFLM0QsS0FEckIsQ0FDQzJELFVBREQ7QUFFUCxhQUNFO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQ0UsdUVBQUsseURBQU0sQ0FBQzBLLGVBQVosQ0FERixFQUVFO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQ0UsMkRBQUMsd0RBQUQ7QUFDRSxpQkFBUyxFQUFDLFlBRFo7QUFFRSx5QkFBaUIsRUFBQyxlQUZwQjtBQUdFLGdCQUFRLEVBQUUsS0FBS0osaUJBSGpCO0FBSUUsYUFBSyxFQUFFdEssVUFKVDtBQUtFLGVBQU8sRUFBRSxJQUFJRCxJQUFKLEVBTFg7QUFNRSxjQUFNLEVBQUMsT0FOVDtBQU9FLGlCQUFTLEVBQUU7QUFBRyxtQkFBUyxFQUFDO0FBQWIsVUFQYjtBQVFFLG9CQUFZLEVBQUU7QUFBRyxtQkFBUyxFQUFDO0FBQWI7QUFSaEIsUUFERixDQUZGLEVBY0Usd0VBQ0U7QUFDRSxpQkFBUyxFQUFDLGFBRFo7QUFFRSxlQUFPLEVBQUUsS0FBS21IO0FBRmhCLFNBSUcseURBQU0sQ0FBQ1UsU0FKVixDQURGLENBZEYsQ0FERjtBQXlCRDs7OztFQTdEOEIsNENBQUssQ0FBQzNELFM7O0FBZ0V2Q29HLGtCQUFrQixDQUFDMUksU0FBbkIsR0FBK0I7QUFDN0JqRSxVQUFRLEVBQUUsaURBQVMsQ0FBQ3dGLElBQVYsQ0FBZXJCLFVBREk7QUFFN0I0RixTQUFPLEVBQUUsaURBQVMsQ0FBQ2xDLEtBQVYsQ0FBZ0I7QUFDdkJoRixTQUFLLEVBQUUsaURBQVMsQ0FBQ3NDLE1BQVYsQ0FBaUJoQixVQUREO0FBRXZCckIsZUFBVyxFQUFFLGlEQUFTLENBQUNxQyxNQUFWLENBQWlCaEIsVUFGUDtBQUd2Qi9FLFlBQVEsRUFBRSxpREFBUyxDQUFDeUksS0FBVixDQUFnQjtBQUN4Qi9HLFFBQUUsRUFBRSxpREFBUyxDQUFDcUUsTUFBVixDQUFpQmhCLFVBREc7QUFFeEJuRCxVQUFJLEVBQUUsaURBQVMsQ0FBQ21FLE1BQVYsQ0FBaUJoQjtBQUZDLEtBQWhCLEVBR1BBO0FBTm9CLEdBQWhCLEVBT05BLFVBVDBCO0FBVTdCMEYsUUFBTSxFQUFFLGlEQUFTLENBQUNyRSxJQUFWLENBQWVyQjtBQVZNLENBQS9CO0FBYWUsMEhBQU8sR0FBR3dJLGtCQUFILENBQXRCLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2RkE7QUFDQTs7QUFFQSxJQUFNTSxJQUFJLEdBQUcsU0FBUEEsSUFBTztBQUFBLE1BQUduSyxXQUFILFFBQUdBLFdBQUg7QUFBQSxNQUFnQlosU0FBaEIsUUFBZ0JBLFNBQWhCO0FBQUEsTUFBMkJnTCxRQUEzQixRQUEyQkEsUUFBM0I7QUFBQSxTQUNYO0FBQUssYUFBUyxFQUFDO0FBQWYsS0FFSUEsUUFBUSxJQUNSO0FBQUssYUFBUyxpQkFBV2hMLFNBQUQsR0FBYyxXQUFkLEdBQTRCLEVBQXRDO0FBQWQsSUFISixFQUtFO0FBQUssYUFBUyxpQkFBV0EsU0FBRCxHQUFjLFdBQWQsR0FBNEIsRUFBdEM7QUFBZCxLQUNFO0FBQUssYUFBUyxFQUFDO0FBQWYsSUFERixFQUVFO0FBQUssYUFBUyxFQUFDO0FBQWYsS0FDRSxzRUFBSVksV0FBSixDQURGLENBRkYsQ0FMRixDQURXO0FBQUEsQ0FBYjs7QUFlQW1LLElBQUksQ0FBQ2hKLFNBQUwsR0FBaUI7QUFDZm5CLGFBQVcsRUFBRSxpREFBUyxDQUFDcUMsTUFBVixDQUFpQmhCLFVBRGY7QUFFZmpDLFdBQVMsRUFBRSxpREFBUyxDQUFDZ0MsSUFBVixDQUFlQyxVQUZYO0FBR2YrSSxVQUFRLEVBQUUsaURBQVMsQ0FBQ2hKLElBQVYsQ0FBZUM7QUFIVixDQUFqQjs7QUFNQSxJQUFNZ0osS0FBSyxHQUFHLFNBQVJBLEtBQVE7QUFBQSxNQUFHQyxJQUFILFNBQUdBLElBQUg7QUFBQSxNQUFTQyxXQUFULFNBQVNBLFdBQVQ7QUFBQSxTQUNaO0FBQUssYUFBUyxFQUFDO0FBQWYsS0FFSUQsSUFBSSxDQUFDakwsR0FBTCxDQUFTLFVBQUNtTCxJQUFELEVBQU9DLENBQVA7QUFBQSxXQUNQLDJEQUFDLElBQUQ7QUFDRSxTQUFHLEVBQUVELElBQUksQ0FBQ3hNO0FBRFosT0FFTXdNLElBRk47QUFHRSxlQUFTLEVBQUVELFdBQVcsQ0FBQ0csTUFBWixDQUFtQixVQUFBQyxFQUFFO0FBQUEsZUFBSUEsRUFBRSxDQUFDM0QsTUFBSCxLQUFjd0QsSUFBSSxDQUFDeE0sRUFBdkI7QUFBQSxPQUFyQixFQUFnRCtKLE1BQWhELEdBQXlELENBSHRFO0FBSUUsY0FBUSxFQUFFMEMsQ0FBQyxHQUFHO0FBSmhCLE9BRE87QUFBQSxHQUFULENBRkosQ0FEWTtBQUFBLENBQWQ7O0FBY0FKLEtBQUssQ0FBQ2xKLFNBQU4sR0FBa0I7QUFDaEJtSixNQUFJLEVBQUUsaURBQVMsQ0FBQzVHLE9BQVYsQ0FBa0IsaURBQVMsQ0FBQ3FCLEtBQVYsQ0FBZ0I7QUFDdEMvRyxNQUFFLEVBQUUsaURBQVMsQ0FBQ3FFLE1BQVYsQ0FBaUJoQixVQURpQjtBQUV0Q3JCLGVBQVcsRUFBRSxpREFBUyxDQUFDcUMsTUFBVixDQUFpQmhCO0FBRlEsR0FBaEIsRUFHckJBLFVBSEcsRUFHU0EsVUFKQztBQUtoQmtKLGFBQVcsRUFBRSxpREFBUyxDQUFDN0csT0FBVixDQUFrQixpREFBUyxDQUFDcUIsS0FBVixDQUFnQjtBQUM3Q2lDLFVBQU0sRUFBRSxpREFBUyxDQUFDM0U7QUFEMkIsR0FBaEIsQ0FBbEIsRUFFVGhCO0FBUFksQ0FBbEI7QUFVZSwrREFBQWdKLEtBQWYsRTs7Ozs7Ozs7Ozs7O0FDaERBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUVBLElBQU1PLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUI7QUFBQSxNQUFHcEksT0FBSCxRQUFHQSxPQUFIO0FBQUEsTUFBWXBELFNBQVosUUFBWUEsU0FBWjtBQUFBLFNBQ3pCO0FBQ0UsYUFBUyxpQ0FBMkJBLFNBQUQsR0FBYyx1QkFBZCxHQUF3QyxFQUFsRSxDQURYO0FBRUUsV0FBTyxFQUFFb0Q7QUFGWCxLQUlFO0FBQUcsYUFBUyxFQUFDO0FBQWIsSUFKRixDQUR5QjtBQUFBLENBQTNCOztBQVNBb0ksa0JBQWtCLENBQUN6SixTQUFuQixHQUErQjtBQUM3QnFCLFNBQU8sRUFBRSxpREFBUyxDQUFDRSxJQUFWLENBQWVyQixVQURLO0FBRTdCakMsV0FBUyxFQUFFLGlEQUFTLENBQUNnQztBQUZRLENBQS9CO0FBS0F3SixrQkFBa0IsQ0FBQ3RJLFlBQW5CLEdBQWtDO0FBQ2hDbEQsV0FBUyxFQUFFO0FBRHFCLENBQWxDO0FBSWUsK0RBQUF3TCxrQkFBZixFOzs7Ozs7Ozs7Ozs7QUNyQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBRUEsSUFBTUMsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQjtBQUFBLE1BQUdySSxPQUFILFFBQUdBLE9BQUg7QUFBQSxTQUN2QjtBQUFRLGFBQVMsRUFBQyxvQkFBbEI7QUFBdUMsV0FBTyxFQUFFQTtBQUFoRCxLQUNFO0FBQUcsYUFBUyxFQUFDO0FBQWIsSUFERixDQUR1QjtBQUFBLENBQXpCOztBQU1BcUksZ0JBQWdCLENBQUMxSixTQUFqQixHQUE2QjtBQUMzQnFCLFNBQU8sRUFBRSxpREFBUyxDQUFDRSxJQUFWLENBQWVyQjtBQURHLENBQTdCO0FBSWUsK0RBQUF3SixnQkFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRU1DLEk7Ozs7O0FBQ0osZ0JBQVk3SSxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2pCLDhFQUFNQSxLQUFOO0FBQ0EsVUFBS3BHLEtBQUwsR0FBYTtBQUNYa1AsZUFBUyxFQUFFO0FBREEsS0FBYjtBQUdBLFVBQUtDLFVBQUwsR0FBa0IsTUFBS0EsVUFBTCxDQUFnQmpJLElBQWhCLHVEQUFsQjtBQUxpQjtBQU1sQjs7OzttQ0FFYztBQUFBLFVBQ0xnSSxTQURLLEdBQ1MsS0FBS2xQLEtBRGQsQ0FDTGtQLFNBREs7QUFFYixXQUFLakcsUUFBTCxDQUFjO0FBQUVpRyxpQkFBUyxFQUFFLENBQUNBO0FBQWQsT0FBZDtBQUNEOzs7aUNBRVk7QUFBQSxVQUNIak0sSUFERyxHQUNNLEtBQUttRCxLQURYLENBQ0huRCxJQURHOztBQUVYLFVBQUlBLElBQUksQ0FBQ00sU0FBVCxFQUFvQjtBQUNsQixlQUNFO0FBQUcsbUJBQVMsRUFBQztBQUFiLHFCQUFpQyx5REFBTSxDQUFDNkwscUJBQXhDLGNBQWtFbk0sSUFBSSxDQUFDUSxXQUFOLEdBQXFCLHdFQUFrQixDQUFDUixJQUFJLENBQUNRLFdBQU4sQ0FBdkMsR0FBNEQsRUFBN0gsRUFERjtBQUdEOztBQUNELGFBQ0U7QUFBRyxpQkFBUyxFQUFDO0FBQWIsbUJBQXdDLHlEQUFNLENBQUM0TCx1QkFBL0MsY0FBMkVwTSxJQUFJLENBQUNVLFVBQU4sR0FBb0Isd0VBQWtCLENBQUNWLElBQUksQ0FBQ1UsVUFBTixDQUF0QyxHQUEwRCx5REFBTSxDQUFDMkwsV0FBM0ksRUFERjtBQUdEOzs7NkJBRVE7QUFBQTs7QUFBQSx3QkFDZ0MsS0FBS2xKLEtBRHJDO0FBQUEsVUFDQ25ELElBREQsZUFDQ0EsSUFERDtBQUFBLFVBQ09xSCxRQURQLGVBQ09BLFFBRFA7QUFBQSxVQUNpQmlGLFVBRGpCLGVBQ2lCQSxVQURqQjtBQUFBLFVBRUNMLFNBRkQsR0FFZSxLQUFLbFAsS0FGcEIsQ0FFQ2tQLFNBRkQ7QUFHUCxhQUNFO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQ0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FDRTtBQUNFLGlCQUFTLHVCQUFpQmpNLElBQUksQ0FBQ00sU0FBTixHQUFtQixzQkFBbkIsR0FBNEMsRUFBNUQsQ0FEWDtBQUVFLGVBQU8sRUFBRTtBQUFBLGlCQUFNLE1BQUksQ0FBQ2lNLFlBQUwsRUFBTjtBQUFBLFNBRlg7QUFHRSxZQUFJLEVBQUM7QUFIUCxTQUtHdk0sSUFBSSxDQUFDaUIsS0FMUixDQURGLEVBUUUsMkRBQUMsbURBQUQ7QUFBTSxVQUFFLEVBQUVnTDtBQUFWLFNBQ0UsMkRBQUMseURBQUQ7QUFDRSxlQUFPLEVBQUU1RTtBQURYLFFBREYsQ0FSRixFQWNJaUYsVUFBVSxLQUFLaE4sU0FBZixJQUNBLDJEQUFDLDJEQUFEO0FBQ0UsZUFBTyxFQUFFZ04sVUFEWDtBQUVFLGlCQUFTLEVBQUV0TSxJQUFJLENBQUNNO0FBRmxCLFFBZkosQ0FERixFQXNCRTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNHLEtBQUs0TCxVQUFMLEVBREgsQ0F0QkYsRUF5QkUsMkRBQUMsdURBQUQ7QUFBVSxVQUFFLEVBQUVEO0FBQWQsU0FDRTtBQUFLLFdBQUcsRUFBRWpNLElBQUksQ0FBQ2tCLFdBQWY7QUFBNEIsaUJBQVMsRUFBQztBQUF0QyxTQUNFO0FBQUcsaUJBQVMsRUFBQztBQUFiLFNBRUtsQixJQUFJLENBQUNrQixXQUFMLEtBQXFCNUIsU0FBckIsSUFBa0NVLElBQUksQ0FBQ2tCLFdBQUwsS0FBcUIsRUFBeEQsR0FDRWxCLElBQUksQ0FBQ2tCLFdBRFAsR0FDcUI7QUFBTSxpQkFBUyxFQUFDO0FBQWhCLFNBQXlCLHlEQUFNLENBQUNzTCxrQkFBaEMsQ0FIekIsQ0FERixDQURGLENBekJGLENBREY7QUFzQ0Q7Ozs7RUFuRWdCLDRDQUFLLENBQUM3SCxTOztBQXNFekJxSCxJQUFJLENBQUMzSixTQUFMLEdBQWlCO0FBQ2ZnRixVQUFRLEVBQUUsaURBQVMsQ0FBQ3pELElBREw7QUFFZjBJLFlBQVUsRUFBRSxpREFBUyxDQUFDMUksSUFGUDtBQUdmNUQsTUFBSSxFQUFFLGlEQUFTLENBQUNpRyxLQUFWLENBQWdCO0FBQ3BCL0csTUFBRSxFQUFFLGlEQUFTLENBQUNxRSxNQUFWLENBQWlCaEIsVUFERDtBQUVwQnRCLFNBQUssRUFBRSxpREFBUyxDQUFDc0MsTUFBVixDQUFpQmhCLFVBRko7QUFHcEJqQyxhQUFTLEVBQUUsaURBQVMsQ0FBQ2dDLElBQVYsQ0FBZUMsVUFITjtBQUlwQi9CLGVBQVcsRUFBRSxpREFBUyxDQUFDeUYsS0FBVixDQUFnQixFQUFoQjtBQUpPLEdBQWhCLEVBS0gxRDtBQVJZLENBQWpCO0FBV0F5SixJQUFJLENBQUN4SSxZQUFMLEdBQW9CO0FBQ2xCNkQsVUFBUSxFQUFFL0gsU0FEUTtBQUVsQmdOLFlBQVUsRUFBRWhOO0FBRk0sQ0FBcEI7QUFLZSwrREFBQTBNLElBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNUyxZQUFZLEdBQUc7QUFDbkJ2TyxPQUFLLEVBQUUsaUVBRFk7QUFFbkJDLE1BQUksRUFBRTtBQUZhLENBQXJCOztJQUtNdU8sSzs7Ozs7QUFDSixpQkFBWXZKLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakIsK0VBQU1BLEtBQU47QUFDQSxVQUFLcEcsS0FBTCxHQUFhMFAsWUFBYjtBQUNBLFVBQUtFLG9CQUFMLEdBQTRCLE1BQUtBLG9CQUFMLENBQTBCMUksSUFBMUIsdURBQTVCO0FBSGlCO0FBSWxCOzs7OzJDQVdzQjtBQUFBLHdCQUlqQixLQUFLZCxLQUpZO0FBQUEsVUFFbkI5QyxZQUZtQixlQUVuQkEsWUFGbUI7QUFBQSxVQUVMQyxTQUZLLGVBRUxBLFNBRks7QUFBQSxVQUduQnhELFVBSG1CLGVBR25CQSxVQUhtQjtBQUFBLFVBR1A4UCxVQUhPLGVBR1BBLFVBSE87O0FBS3JCLFVBQUksQ0FBQ0EsVUFBTCxFQUFpQjtBQUNmO0FBQ0Q7O0FBUG9CLHdCQVFHLEtBQUs3UCxLQVJSO0FBQUEsVUFRYm1CLEtBUmEsZUFRYkEsS0FSYTtBQUFBLFVBUU5DLElBUk0sZUFRTkEsSUFSTTtBQVNyQixVQUFNME8sT0FBTyxHQUFHMU8sSUFBSSxHQUFHRCxLQUF2QjtBQUNBcEIsZ0JBQVUsQ0FBQ3VELFlBQUQsRUFBZUMsU0FBZixFQUEwQnBDLEtBQTFCLEVBQWlDMk8sT0FBakMsQ0FBVjtBQUNBLFdBQUs3RyxRQUFMLENBQWMsVUFBQWpKLEtBQUs7QUFBQSxlQUFLO0FBQUVvQixjQUFJLEVBQUVwQixLQUFLLENBQUNvQixJQUFOLEdBQWFwQixLQUFLLENBQUNtQjtBQUEzQixTQUFMO0FBQUEsT0FBbkI7QUFDRDs7OzZCQUVRO0FBQUEseUJBS0gsS0FBS2lGLEtBTEY7QUFBQSxVQUVMMkosUUFGSyxnQkFFTEEsUUFGSztBQUFBLFVBR0xDLFlBSEssZ0JBR0xBLFlBSEs7QUFBQSxVQUlMQyxjQUpLLGdCQUlMQSxjQUpLO0FBTVAsYUFDRTtBQUFLLFVBQUUsRUFBQztBQUFSLFNBQ0UsMkRBQUMsOERBQUQ7QUFBZ0IsZ0JBQVEsRUFBRSxLQUFLTDtBQUEvQixTQUNFLDJEQUFDLHNFQUFELFFBRUlHLFFBQVEsQ0FBQ3ZNLEdBQVQsQ0FBYSxVQUFBME0sR0FBRztBQUFBLGVBQ2QsMkRBQUMscURBQUQ7QUFBUSxhQUFHLEVBQUVBLEdBQUcsQ0FBQy9OO0FBQWpCLFdBQ0UsMkRBQUMsNkNBQUQ7QUFDRSxhQUFHLEVBQUUrTixHQUFHLENBQUMvTixFQURYO0FBRUUsY0FBSSxFQUFFK04sR0FGUjtBQUdFLGtCQUFRLEVBQUU7QUFBQSxtQkFBTUYsWUFBWSxDQUFDRSxHQUFELENBQWxCO0FBQUEsV0FIWjtBQUlFLG9CQUFVLEVBQUU7QUFBQSxtQkFBTUQsY0FBYyxDQUFDQyxHQUFELENBQXBCO0FBQUE7QUFKZCxVQURGLENBRGM7QUFBQSxPQUFoQixDQUZKLENBREYsQ0FERixDQURGO0FBb0JEOzs7NkNBakQrQkMsUyxFQUFXQyxTLEVBQVc7QUFDcEQsVUFBSUQsU0FBUyxDQUFDL08sSUFBVixLQUFtQmdQLFNBQVMsQ0FBQ2hQLElBQWpDLEVBQXVDO0FBQ3JDLGVBQU87QUFDTEEsY0FBSSxFQUFFK08sU0FBUyxDQUFDL087QUFEWCxTQUFQO0FBR0Q7O0FBQ0QsYUFBTyxJQUFQO0FBQ0Q7Ozs7RUFkaUIsNENBQUssQ0FBQ3dHLFM7O0FBMkQxQitILEtBQUssQ0FBQ3JLLFNBQU4sR0FBa0I7QUFDaEIwSyxjQUFZLEVBQUUsaURBQVMsQ0FBQ25KLElBQVYsQ0FBZXJCLFVBRGI7QUFFaEJ5SyxnQkFBYyxFQUFFLGlEQUFTLENBQUNwSixJQUFWLENBQWVyQixVQUZmO0FBR2hCdUssVUFBUSxFQUFFLGlEQUFTLENBQUNsSSxPQUFWLENBQWtCLGlEQUFTLENBQUNxQixLQUFWLENBQWdCO0FBQzFDL0csTUFBRSxFQUFFLGlEQUFTLENBQUNxRSxNQUFWLENBQWlCaEIsVUFEcUI7QUFFMUN0QixTQUFLLEVBQUUsaURBQVMsQ0FBQ3NDLE1BQVYsQ0FBaUJoQixVQUZrQjtBQUcxQ2pDLGFBQVMsRUFBRSxpREFBUyxDQUFDZ0MsSUFBVixDQUFlQztBQUhnQixHQUFoQixFQUl6QkEsVUFKTyxFQUlLQSxVQVBDO0FBUWhCcUssWUFBVSxFQUFFLGlEQUFTLENBQUN0SyxJQUFWLENBQWVDLFVBUlg7QUFTaEJ6RixZQUFVLEVBQUUsaURBQVMsQ0FBQzhHLElBQVYsQ0FBZXJCLFVBVFg7QUFVaEJsQyxjQUFZLEVBQUUsaURBQVMsQ0FBQ3VFLE9BQVYsQ0FBa0IsaURBQVMsQ0FBQ3JCLE1BQTVCLEVBQW9DaEIsVUFWbEM7QUFXaEJqQyxXQUFTLEVBQUUsaURBQVMsQ0FBQ2dDLElBQVYsQ0FBZUM7QUFYVixDQUFsQjtBQWNlLCtEQUFBbUssS0FBZixFOzs7Ozs7Ozs7Ozs7QUN0RkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNVSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CO0FBQUEsTUFDdkJDLHdCQUR1QixRQUN2QkEsd0JBRHVCO0FBQUEsTUFDR0MsdUJBREgsUUFDR0EsdUJBREg7QUFBQSxTQUd2QjtBQUFLLGFBQVMsRUFBQztBQUFmLEtBQ0UsMkRBQUMseURBQUQ7QUFDRSxZQUFRLEVBQUdELHdCQUF3QixLQUFLLGtFQUE3QixJQUNOQSx3QkFBd0IsS0FBSywyREFGcEM7QUFHRSxXQUFPLEVBQUVDLHVCQUF1QixDQUFDLGtFQUFELENBSGxDO0FBSUUsUUFBSSxFQUFDO0FBSlAsS0FNRTtBQUFHLGFBQVMsRUFBQztBQUFiLElBTkYsQ0FERixFQVNFLDJEQUFDLHlEQUFEO0FBQ0UsWUFBUSxFQUFHRCx3QkFBd0IsS0FBSyxnRUFBN0IsSUFDTkEsd0JBQXdCLEtBQUssMkRBRnBDO0FBR0UsV0FBTyxFQUFFQyx1QkFBdUIsQ0FBQyxnRUFBRCxDQUhsQztBQUlFLFFBQUksRUFBQztBQUpQLEtBTUU7QUFBRyxhQUFTLEVBQUM7QUFBYixJQU5GLENBVEYsQ0FIdUI7QUFBQSxDQUF6Qjs7QUF1QkFGLGdCQUFnQixDQUFDL0ssU0FBakIsR0FBNkI7QUFDM0JnTCwwQkFBd0IsRUFBRSxpREFBUyxDQUFDOUosTUFBVixDQUFpQmhCLFVBRGhCO0FBRTNCK0sseUJBQXVCLEVBQUUsaURBQVMsQ0FBQzFKLElBQVYsQ0FBZXJCO0FBRmIsQ0FBN0I7QUFLZSwrREFBQTZLLGdCQUFmLEU7Ozs7Ozs7Ozs7OztBQ2pDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFFQSxJQUFNRyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CO0FBQUEsTUFDdkJwRyxRQUR1QixRQUN2QkEsUUFEdUI7QUFBQSxNQUNiL0UsUUFEYSxRQUNiQSxRQURhO0FBQUEsTUFDSHNCLE9BREcsUUFDSEEsT0FERztBQUFBLFNBR3ZCO0FBQ0UsYUFBUyx3REFBa0R5RCxRQUFELEdBQWEsVUFBYixHQUEwQixFQUEzRSxNQURYO0FBRUUsV0FBTyxFQUFFekQsT0FGWDtBQUdFLFFBQUksRUFBQztBQUhQLEtBS0d0QixRQUxILENBSHVCO0FBQUEsQ0FBekI7O0FBWUFtTCxnQkFBZ0IsQ0FBQ2xMLFNBQWpCLEdBQTZCO0FBQzNCOEUsVUFBUSxFQUFFLGlEQUFTLENBQUM3RSxJQURPO0FBRTNCRixVQUFRLEVBQUUsaURBQVMsQ0FBQ1IsSUFBVixDQUFlVyxVQUZFO0FBRzNCbUIsU0FBTyxFQUFFLGlEQUFTLENBQUNFLElBQVYsQ0FBZXJCO0FBSEcsQ0FBN0I7QUFNQWdMLGdCQUFnQixDQUFDL0osWUFBakIsR0FBZ0M7QUFDOUIyRCxVQUFRLEVBQUU7QUFEb0IsQ0FBaEM7QUFJZSwrREFBQW9HLGdCQUFmLEU7Ozs7Ozs7Ozs7OztBQ3pCQTtBQUFBLElBQU1DLE1BQU0sR0FBRztBQUNicEQsVUFBUSxFQUFFLDZCQURHO0FBRWJoQyxrQkFBZ0IsRUFBRSxrQkFGTDtBQUdiTSxjQUFZLEVBQUUsY0FIRDtBQUlia0MscUJBQW1CLEVBQUUsbUJBSlI7QUFLYlEsaUJBQWUsRUFBRSxhQUxKO0FBTWJ6QyxrQkFBZ0IsRUFBRSxtQkFOTDtBQU9idUIsV0FBUyxFQUFFLE9BUEU7QUFRYkcsZUFBYSxFQUFFLFVBUkY7QUFTYkMsV0FBUyxFQUFFLE1BVEU7QUFVYitCLGFBQVcsRUFBRSxTQVZBO0FBV2JHLG9CQUFrQixFQUFFLDJCQVhQO0FBWWJMLHVCQUFxQixFQUFFLFdBWlY7QUFhYkMseUJBQXVCLEVBQUUsb0JBYlo7QUFjYnhELGtCQUFnQixFQUFFLGdCQWRMO0FBZWJDLHdCQUFzQixFQUFFLHNCQWZYO0FBZ0JiUixpQkFBZSxFQUFFLGVBaEJKO0FBaUJiUyxnQkFBYyxFQUFFLFVBakJIO0FBa0JiUixXQUFTLEVBQUUsS0FsQkU7QUFtQmJ1QyxZQUFVLEVBQUUsTUFuQkM7QUFvQmJiLFlBQVUsRUFBRSxxQkFwQkM7QUFxQmJ2QixrQkFBZ0IsRUFBRSxpQkFyQkw7QUFzQmJULGlCQUFlLEVBQUUsZ0JBdEJKO0FBdUJiMEMsbUJBQWlCLEVBQUUsbUJBdkJOO0FBd0JiUyxlQUFhLEVBQUUscUNBeEJGO0FBeUJic0MsbUJBQWlCLEVBQUUsa0JBekJOO0FBMEJiQyxxQkFBbUIsRUFBRSxnQkExQlI7QUEyQmJDLHdCQUFzQixFQUFFLG1CQTNCWDtBQTRCYkMsaUJBQWUsRUFBRSxVQTVCSjtBQTZCYkMsc0JBQW9CLEVBQUUsVUE3QlQ7QUE4QmJDLGNBQVksRUFBRTtBQTlCRCxDQUFmO0FBaUNlLCtEQUFBTixNQUFmLEU7Ozs7Ozs7Ozs7OztBQ2pDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVPLElBQU1PLGtCQUFrQixHQUFHLG9CQUEzQjtBQUNBLElBQU1DLFlBQVksR0FBRyxjQUFyQjtBQUNBLElBQU1DLFFBQVEsR0FBRyxVQUFqQjtBQUNBLElBQU1DLGVBQWUsR0FBRyxpQkFBeEI7QUFDQSxJQUFNQyxvQkFBb0IsR0FBRyxzQkFBN0I7QUFDQSxJQUFNQyxJQUFJLEdBQUcsTUFBYjtBQUVBLElBQU1DLFFBQVEsR0FBRyxDQUN0QjtBQUNFblAsSUFBRSxFQUFFNk8sa0JBRE47QUFFRTdNLGFBQVcsRUFBRSwrQ0FBTSxDQUFDdU07QUFGdEIsQ0FEc0IsRUFLdEI7QUFDRXZPLElBQUUsRUFBRThPLFlBRE47QUFFRTlNLGFBQVcsRUFBRSwrQ0FBTSxDQUFDd007QUFGdEIsQ0FMc0IsRUFTdEI7QUFDRXhPLElBQUUsRUFBRWdQLGVBRE47QUFFRWhOLGFBQVcsRUFBRSwrQ0FBTSxDQUFDeU07QUFGdEIsQ0FUc0IsRUFhdEI7QUFDRXpPLElBQUUsRUFBRStPLFFBRE47QUFFRS9NLGFBQVcsRUFBRSwrQ0FBTSxDQUFDME07QUFGdEIsQ0Fic0IsRUFpQnRCO0FBQ0UxTyxJQUFFLEVBQUVpUCxvQkFETjtBQUVFak4sYUFBVyxFQUFFLCtDQUFNLENBQUMyTTtBQUZ0QixDQWpCc0IsRUFxQnRCO0FBQ0UzTyxJQUFFLEVBQUVrUCxJQUROO0FBRUVsTixhQUFXLEVBQUUsK0NBQU0sQ0FBQzRNO0FBRnRCLENBckJzQixDQUFqQixDOzs7Ozs7Ozs7Ozs7QUNUUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFLQTtBQUVBOztBQUVBLElBQU1RLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQXZSLEtBQUs7QUFBQSxTQUMzQjtBQUNFK0osZ0JBQVksRUFBRSwrRkFBdUIsQ0FBQy9KLEtBQUQ7QUFEdkMsR0FEMkI7QUFBQSxDQUE3Qjs7QUFNQSxJQUFNd1Isa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixDQUFBblEsUUFBUTtBQUFBLFNBQ2pDO0FBQ0UySSxvQkFBZ0IsRUFBRSwwQkFBQ3ZKLFFBQUQsRUFBYztBQUM5QlksY0FBUSxDQUFDLGtGQUFjLENBQUNaLFFBQVEsQ0FBQzBCLEVBQVYsQ0FBZixDQUFSO0FBQ0QsS0FISDtBQUlFOEgsbUJBQWUsRUFBRSx5QkFBQ3hKLFFBQUQsRUFBV2dLLENBQVgsRUFBaUI7QUFDaEMsVUFBSUEsQ0FBQyxDQUFDTSxNQUFGLENBQVMwRyxPQUFULENBQWlCQyxXQUFqQixPQUFtQyxHQUFuQyxJQUEwQ2pILENBQUMsQ0FBQ00sTUFBRixDQUFTMEcsT0FBVCxDQUFpQkMsV0FBakIsT0FBbUMsUUFBakYsRUFBMkY7QUFDekYsWUFBSWpSLFFBQVEsQ0FBQzBCLEVBQVQsS0FBZ0IseURBQVcsQ0FBQ0EsRUFBaEMsRUFBb0M7QUFDbENkLGtCQUFRLENBQUMscUZBQWlCLEVBQWxCLENBQVI7QUFDRCxTQUZELE1BRU87QUFDTEEsa0JBQVEsQ0FBQyxrRkFBYyxDQUFDWixRQUFELENBQWYsQ0FBUjtBQUNEO0FBQ0Y7QUFDRjtBQVpILEdBRGlDO0FBQUEsQ0FBbkM7O0FBaUJBLElBQU1rUix5QkFBeUIsR0FBRywyREFBTyxDQUN2Q0osZUFEdUMsRUFFdkNDLGtCQUZ1QyxDQUFQLENBR2hDLGtGQUhnQyxDQUFsQztBQUtlLCtEQUFBRyx5QkFBZixFOzs7Ozs7Ozs7Ozs7QUN2Q0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBTUE7QUFDQTs7QUFFQSxJQUFNSixlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUF2UixLQUFLO0FBQUEsU0FDM0I7QUFDRStQLFlBQVEsRUFBRSxpRkFBVyxDQUFDL1AsS0FBRCxDQUR2QjtBQUVFb0IsUUFBSSxFQUFFLDZFQUFPLENBQUNwQixLQUFELENBRmY7QUFHRTZQLGNBQVUsRUFBRSxxRkFBZSxDQUFDN1AsS0FBRCxDQUg3QjtBQUlFc0QsZ0JBQVksRUFBRSwrRkFBdUIsQ0FBQ3RELEtBQUQsQ0FKdkM7QUFLRXVELGFBQVMsRUFBRSwrRkFBdUIsQ0FBQ3ZELEtBQUQ7QUFMcEMsR0FEMkI7QUFBQSxDQUE3Qjs7QUFVQSxJQUFNd1Isa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixDQUFBblEsUUFBUTtBQUFBLFNBQ2pDO0FBQ0UyTyxnQkFBWSxFQUFFLHNCQUFDL00sSUFBRCxFQUFVO0FBQ3RCNUIsY0FBUSxDQUFDLDRFQUFVLENBQUM0QixJQUFJLENBQUNkLEVBQU4sQ0FBWCxDQUFSO0FBQ0QsS0FISDtBQUlFOE4sa0JBQWMsRUFBRSx3QkFBQ2hOLElBQUQsRUFBVTtBQUN4QjVCLGNBQVEsQ0FBQyxxRkFBbUIsQ0FBQzRCLElBQUksQ0FBQ2QsRUFBTixFQUFVYyxJQUFJLENBQUNNLFNBQWYsQ0FBcEIsQ0FBUjtBQUNELEtBTkg7QUFPRXhELGNBQVUsRUFBRSxvQkFBQ3VELFlBQUQsRUFBZUMsU0FBZixFQUEwQnBDLEtBQTFCLEVBQWlDQyxJQUFqQyxFQUEwQztBQUNwREMsY0FBUSxDQUFDLHNGQUFvQixDQUFDaUMsWUFBRCxFQUFlQyxTQUFmLEVBQTBCcEMsS0FBMUIsRUFBaUNDLElBQWpDLENBQXJCLENBQVI7QUFDRDtBQVRILEdBRGlDO0FBQUEsQ0FBbkM7O0FBY0EsSUFBTXdRLGNBQWMsR0FBRywyREFBTyxDQUM1QkwsZUFENEIsRUFFNUJDLGtCQUY0QixDQUFQLENBR3JCLG1FQUhxQixDQUF2QjtBQUtlLCtEQUFBSSxjQUFmLEU7Ozs7Ozs7Ozs7OztBQ3hDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU1DLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQXpMLEtBQUs7QUFBQSxTQUFJLDJEQUFDLDhEQUFELEVBQVdBLEtBQVgsQ0FBSjtBQUFBLENBQTVCOztBQUVBLElBQU1tTCxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUF2UixLQUFLO0FBQUEsU0FDM0I7QUFDRTZCLFdBQU8sRUFBRTdCLEtBQUssQ0FBQzZCLE9BRGpCO0FBRUVtSCxlQUFXLEVBQUUsOEVBQVcsQ0FBQ2hKLEtBQUQ7QUFGMUIsR0FEMkI7QUFBQSxDQUE3Qjs7QUFPQSxJQUFNd1Isa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixDQUFBblEsUUFBUTtBQUFBLFNBQ2pDO0FBQ0UwSCxlQUFXLEVBQUUsdUJBQU07QUFDakIxSCxjQUFRLENBQUMsMkVBQVcsRUFBWixDQUFSO0FBQ0QsS0FISDtBQUlFeUgsMEJBQXNCLEVBQUUsa0NBQU07QUFDNUJ6SCxjQUFRLENBQUMsc0ZBQWtCLEVBQW5CLENBQVI7QUFDRDtBQU5ILEdBRGlDO0FBQUEsQ0FBbkM7O0FBV2UsMEhBQU8sQ0FBQ2tRLGVBQUQsRUFBa0JDLGtCQUFsQixDQUFQLENBQTZDSyxjQUE3QyxDQUFmLEU7Ozs7Ozs7Ozs7OztBQzVCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7O0FBRUEsSUFBTU4sZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFBdlIsS0FBSztBQUFBLFNBQzNCO0FBQ0VzUSw0QkFBd0IsRUFBRSwyRkFBbUIsQ0FBQ3RRLEtBQUQ7QUFEL0MsR0FEMkI7QUFBQSxDQUE3Qjs7QUFNQSxJQUFNd1Isa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixDQUFBblEsUUFBUTtBQUFBLFNBQ2pDO0FBQ0VrUCwyQkFBdUIsRUFBRSxpQ0FBQXRQLFVBQVU7QUFBQSxhQUFJO0FBQUEsZUFDckNJLFFBQVEsQ0FBQyxvRkFBZ0IsQ0FBQ0osVUFBRCxDQUFqQixDQUQ2QjtBQUFBLE9BQUo7QUFBQTtBQURyQyxHQURpQztBQUFBLENBQW5DOztBQVFBLElBQU02USx5QkFBeUIsR0FBRywyREFBTyxDQUN2Q1AsZUFEdUMsRUFFdkNDLGtCQUZ1QyxDQUFQLENBR2hDLHFGQUhnQyxDQUFsQztBQUtlLCtEQUFBTSx5QkFBZixFOzs7Ozs7Ozs7Ozs7QUN6QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRU8sSUFBTTlJLFdBQVcsR0FBRywrREFBYyxDQUN2QyxnRkFEdUMsRUFFdkMsbUVBRnVDLEVBR3ZDLFVBQUMrSSxvQkFBRCxFQUF1QkMsZUFBdkI7QUFBQSxTQUEyQ0Qsb0JBQW9CLElBQUlDLGVBQW5FO0FBQUEsQ0FIdUMsQ0FBbEM7QUFNUSwrREFBQWhKLFdBQWYsRTs7Ozs7Ozs7Ozs7O0FDVkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFTyxJQUFNaUosMEJBQTBCLEdBQUcsU0FBN0JBLDBCQUE2QixDQUFBalMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ2lDLFdBQU4sQ0FBa0JpUSxVQUF0QjtBQUFBLENBQXhDO0FBQ0EsSUFBTUMsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFBblMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ2lDLFdBQVY7QUFBQSxDQUE1QjtBQUNBLElBQU1tUSx1QkFBdUIsR0FBRyxTQUExQkEsdUJBQTBCLENBQUFwUyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDaUMsV0FBTixDQUFrQjVCLFVBQXRCO0FBQUEsQ0FBckM7QUFDQSxJQUFNZ1MsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUFBclMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ2lDLFdBQU4sQ0FBa0JoQixVQUF0QjtBQUFBLENBQWpDO0FBRUEsSUFBTXFSLHVCQUF1QixHQUFHLCtEQUFjLENBQ25ERCxtQkFEbUQsRUFFbkQsVUFBQXBSLFVBQVU7QUFBQSxTQUFJQSxVQUFVLEtBQUssZ0VBQW5CO0FBQUEsQ0FGeUMsQ0FBOUM7QUFLQSxJQUFNc1IsMkJBQTJCLEdBQUcsK0RBQWMsQ0FDdkRILHVCQUR1RCxFQUV2RCxVQUFBL1IsVUFBVTtBQUFBLFNBQUlBLFVBQVUsQ0FBQ3dPLE1BQVgsQ0FBa0IsVUFBQXBPLFFBQVE7QUFBQSxXQUFJQSxRQUFRLENBQUMySixRQUFiO0FBQUEsR0FBMUIsQ0FBSjtBQUFBLENBRjZDLENBQWxEO0FBS0EsSUFBTW9JLHVCQUF1QixHQUFHLCtEQUFjLENBQ25ESix1QkFEbUQsRUFFbkQsVUFBQS9SLFVBQVU7QUFBQSxTQUFJQSxVQUFVLENBQUN3TyxNQUFYLENBQWtCLFVBQUFwTyxRQUFRO0FBQUEsV0FBSUEsUUFBUSxDQUFDMkosUUFBYjtBQUFBLEdBQTFCLEVBQ1g1RyxHQURXLENBQ1AsVUFBQWlQLGNBQWM7QUFBQSxXQUFJQSxjQUFjLENBQUN0USxFQUFuQjtBQUFBLEdBRFAsQ0FBSjtBQUFBLENBRnlDLENBQTlDLEM7Ozs7Ozs7Ozs7OztBQ2xCUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBTyxJQUFNdVEsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFBMVMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQzhELFNBQU4sQ0FBZ0JvTyxVQUFwQjtBQUFBLENBQTdCO0FBQ0EsSUFBTVMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQTNTLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUM4RCxTQUFWO0FBQUEsQ0FBdEI7QUFDQSxJQUFNOE8sV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQTVTLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUM4RCxTQUFOLENBQWdCRCxLQUFwQjtBQUFBLENBQXpCO0FBQ0EsSUFBTWdQLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUE3UyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDOEQsU0FBTixDQUFnQjFDLElBQXBCO0FBQUEsQ0FBckI7QUFDQSxJQUFNMFIsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFBOVMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQzhELFNBQU4sQ0FBZ0IrTCxVQUFwQjtBQUFBLENBQTdCLEM7Ozs7Ozs7Ozs7OztBQ0pQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRU8sSUFBTWtELFFBQVEsR0FBRyxTQUFYQSxRQUFXO0FBQUEsTUFBQ0MsU0FBRCx1RUFBYSxFQUFiO0FBQUEsU0FDdEIsSUFBSXRQLElBQUosQ0FBU3VQLFFBQVEsQ0FBQ0QsU0FBUyxDQUFDRSxNQUFWLENBQWlCLENBQWpCLENBQUQsRUFBc0IsRUFBdEIsQ0FBakIsQ0FEc0I7QUFBQSxDQUFqQjtBQUdBLElBQU1DLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsQ0FBQWhGLElBQUk7QUFBQSxTQUNwQyxpREFBVSxDQUFDQSxJQUFELEVBQU8sa0JBQVAsQ0FEMEI7QUFBQSxDQUEvQjtBQUdBLElBQU1pRixpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLEdBQU07QUFDckMsTUFBTUMsTUFBTSxHQUFHbE0sTUFBTSxDQUFDbU0sUUFBdEI7QUFDQSxtQkFBVUQsTUFBTSxDQUFDRSxRQUFqQixlQUE4QkYsTUFBTSxDQUFDRyxJQUFyQztBQUNELENBSE0sQyIsImZpbGUiOiJ0b2Rvcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNhbGxBcGksIE1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9BcGlVdGlscyc7XG5pbXBvcnQgeyBzaG91bGRSZWZyZXNoVG9rZW4gfSBmcm9tICcuLi91dGlscy9SZXF1ZXN0VXRpbHMnO1xuaW1wb3J0IHsgcmVmcmVzaEFjY2Vzc1Rva2VuIH0gZnJvbSAnLi9hdXRoQWN0aW9ucyc7XG5pbXBvcnQge1xuICBSRVFVRVNUX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICBSRUNFSVZFX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICBFUlJPUl9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgQUREX0NBVEVHT1JZX0xPQ0FMLFxuICBSRU1PVkVfQ0FURUdPUllfTE9DQUwsXG4gIFRPT0dMRV9TRUxFQ1RfQ0FURUdPUlksXG4gIFRPT0dMRV9TRUxFQ1RfQ0FURUdPUllfQUxMLFxuICBTV0lUQ0hfVklTSUJJTElUWV9GSUxURVIsXG59IGZyb20gJy4uL2NvbnN0YW50cy9hY3Rpb25UeXBlcyc7XG5pbXBvcnQgeyBxdWVyeUl0ZW1zTGltaXQgfSBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcbmltcG9ydCB7IGZldGNoVGFza3NCeUNhdGVnb3J5IH0gZnJvbSAnLi90b2RvVGFza3NBY3Rpb25zJztcbmltcG9ydCB7IHNob3dNZXNzYWdlRXJyb3IgfSBmcm9tICcuL21lc3NhZ2VBY3Rpb25zJztcbmltcG9ydCB7IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkLCB2aXNpYmlsaXR5T25seUNvbXBsZXRlZCB9IGZyb20gJy4uL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycyc7XG5cbmNvbnN0IGZldGNoVGFza3MgPSBzdGF0ZSA9PiBmZXRjaFRhc2tzQnlDYXRlZ29yeShcbiAgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQoc3RhdGUpLFxuICB2aXNpYmlsaXR5T25seUNvbXBsZXRlZChzdGF0ZSksXG4pO1xuXG5jb25zdCByZXF1ZXN0RmV0Y2hBbGxDYXRlZ29yaWVzID0gKCkgPT4gKFxuICB7XG4gICAgdHlwZTogUkVRVUVTVF9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgfVxuKTtcblxuY29uc3QgcmVjZWl2ZUZldGNoQWxsQ2F0ZWdvcmllcyA9IGNhdGVnb3JpZXMgPT4gKFxuICB7XG4gICAgdHlwZTogUkVDRUlWRV9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgICBjYXRlZ29yaWVzLFxuICB9XG4pO1xuXG5jb25zdCBlcnJvckZldGNoQWxsQ2F0ZWdvcmllcyA9IGVycm9yID0+IChcbiAge1xuICAgIHR5cGU6IEVSUk9SX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICAgIGVycm9yLFxuICB9XG4pO1xuXG5jb25zdCBhZGRDYXRlZ29yeUxvY2FsID0gY2F0ZWdvcnkgPT4gKFxuICB7XG4gICAgdHlwZTogQUREX0NBVEVHT1JZX0xPQ0FMLFxuICAgIGNhdGVnb3J5LFxuICB9XG4pO1xuXG5jb25zdCByZW1vdmVDYXRlZ29yeUxvY2FsID0gY2F0ZWdvcnlJbmRleCA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRU1PVkVfQ0FURUdPUllfTE9DQUwsXG4gICAgY2F0ZWdvcnlJbmRleCxcbiAgfVxuKTtcblxuY29uc3QgdG9vZ2xlU2VsZWN0Q2F0ZWdvcnkgPSBzZWxlY3RlZENhdGVnb3J5ID0+IChcbiAge1xuICAgIHR5cGU6IFRPT0dMRV9TRUxFQ1RfQ0FURUdPUlksXG4gICAgc2VsZWN0ZWRDYXRlZ29yeSxcbiAgfVxuKTtcblxuY29uc3QgdG9vZ2xlU2VsZWN0Q2F0ZWdvcnlBbGwgPSAoKSA9PiAoXG4gIHtcbiAgICB0eXBlOiBUT09HTEVfU0VMRUNUX0NBVEVHT1JZX0FMTCxcbiAgfVxuKTtcblxuY29uc3Qgc3dpdGNoVmlzaWJpbGl0eUZpbHRlciA9IHZpc2liaWxpdHkgPT4gKFxuICB7XG4gICAgdHlwZTogU1dJVENIX1ZJU0lCSUxJVFlfRklMVEVSLFxuICAgIHZpc2liaWxpdHksXG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBmZXRjaEFsbENhdGVnb3JpZXMgPSAobGltaXQgPSBxdWVyeUl0ZW1zTGltaXQsIHNraXAgPSAwKSA9PlxuICBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgZGlzcGF0Y2gocmVxdWVzdEZldGNoQWxsQ2F0ZWdvcmllcygpKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBhY2Nlc3NUb2tlbiB9ID0gZ2V0U3RhdGUoKS5hdXRoO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKCdjYXRlZ29yaWVzJywgeyBsaW1pdCwgc2tpcCB9LCBNZXRob2RzLkdFVCwgYWNjZXNzVG9rZW4pO1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgZGlzcGF0Y2gocmVjZWl2ZUZldGNoQWxsQ2F0ZWdvcmllcyhyZXNwb25zZS5kYXRhKSk7XG4gICAgICAgIGRpc3BhdGNoKGZldGNoVGFza3NCeUNhdGVnb3J5KGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkKGdldFN0YXRlKCkpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2hvdWxkUmVmcmVzaFRva2VuKHJlc3BvbnNlKSkge1xuICAgICAgICAgIGF3YWl0IGRpc3BhdGNoKHJlZnJlc2hBY2Nlc3NUb2tlbigpKTtcbiAgICAgICAgICBkaXNwYXRjaChmZXRjaEFsbENhdGVnb3JpZXMobGltaXQsIHNraXApKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZGlzcGF0Y2goZXJyb3JGZXRjaEFsbENhdGVnb3JpZXMocmVzcG9uc2UuZXJyb3IubWVzc2FnZSkpO1xuICAgICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLmVycm9yLm1lc3NhZ2UpKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gICAgfVxuICB9O1xuXG5leHBvcnQgY29uc3QgZGVsZXRlQ2F0ZWdvcnkgPSAoY2F0ZWdvcnlJZCA9ICcnKSA9PiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbiB9ID0gZ2V0U3RhdGUoKS5hdXRoO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbEFwaSgnY2F0ZWdvcmllcycsIGNhdGVnb3J5SWQsIE1ldGhvZHMuREVMRVRFLCBhY2Nlc3NUb2tlbik7XG4gICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgIGNvbnN0IHsgY2F0ZWdvcmllcyB9ID0gZ2V0U3RhdGUoKS50b2RvRmlsdGVycztcbiAgICAgIGNvbnN0IGNhdGVnb3J5SW5kZXggPSBjYXRlZ29yaWVzLmZpbmRJbmRleChjYXRlZ29yeSA9PiBjYXRlZ29yeS5pZCA9PT0gY2F0ZWdvcnlJZCk7XG4gICAgICBkaXNwYXRjaChyZW1vdmVDYXRlZ29yeUxvY2FsKGNhdGVnb3J5SW5kZXgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNob3VsZFJlZnJlc2hUb2tlbihyZXNwb25zZSkpIHtcbiAgICAgICAgYXdhaXQgZGlzcGF0Y2gocmVmcmVzaEFjY2Vzc1Rva2VuKCkpO1xuICAgICAgICBkaXNwYXRjaChkZWxldGVDYXRlZ29yeShjYXRlZ29yeUlkKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UuZXJyb3IubWVzc2FnZSkpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXF1ZXN0IHRvIGFkZCBhIGNhdGVnb3J5XG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBjYXRlZ29yeSBuYW1lIHRvIGFkZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBuZWVkIHRvIGhhbmRsZSB0aGUgY2F0ZWdvcnkgY3JlYXRlZFxuICovXG5leHBvcnQgY29uc3QgYWRkQ2F0ZWdvcnkgPSAobmFtZSA9ICcnLCBjYWxsYmFjayA9IHVuZGVmaW5lZCkgPT4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW4gfSA9IGdldFN0YXRlKCkuYXV0aDtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoJ2NhdGVnb3JpZXMnLCB7IG5hbWUgfSwgTWV0aG9kcy5QT1NULCBhY2Nlc3NUb2tlbik7XG4gICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgIGNvbnN0IGNhdGVnb3J5ID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIGRpc3BhdGNoKGFkZENhdGVnb3J5TG9jYWwoY2F0ZWdvcnkpKTtcbiAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNhbGxiYWNrKGNhdGVnb3J5KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNob3VsZFJlZnJlc2hUb2tlbihyZXNwb25zZSkpIHtcbiAgICAgICAgYXdhaXQgZGlzcGF0Y2gocmVmcmVzaEFjY2Vzc1Rva2VuKCkpO1xuICAgICAgICBkaXNwYXRjaChhZGRDYXRlZ29yeShuYW1lLCBjYWxsYmFjaykpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLmVycm9yLm1lc3NhZ2UpKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VWaXNpYmlsaXR5ID0gdmlzaWJpbGl0eSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGRpc3BhdGNoKHN3aXRjaFZpc2liaWxpdHlGaWx0ZXIodmlzaWJpbGl0eSkpO1xuICByZXR1cm4gZGlzcGF0Y2goZmV0Y2hUYXNrcyhnZXRTdGF0ZSgpKSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0Q2F0ZWdvcnkgPSBzZWxlY3RlZENhdGVnb3J5ID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgZGlzcGF0Y2godG9vZ2xlU2VsZWN0Q2F0ZWdvcnkoc2VsZWN0ZWRDYXRlZ29yeSkpO1xuICByZXR1cm4gZGlzcGF0Y2goZmV0Y2hUYXNrcyhnZXRTdGF0ZSgpKSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0Q2F0ZWdvcnlBbGwgPSAoKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGRpc3BhdGNoKHRvb2dsZVNlbGVjdENhdGVnb3J5QWxsKCkpO1xuICByZXR1cm4gZGlzcGF0Y2goZmV0Y2hUYXNrcyhnZXRTdGF0ZSgpKSk7XG59O1xuIiwiaW1wb3J0IHsgY2FsbEFwaSwgTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL0FwaVV0aWxzJztcbmltcG9ydCB7IHNob3VsZFJlZnJlc2hUb2tlbiB9IGZyb20gJy4uL3V0aWxzL1JlcXVlc3RVdGlscyc7XG5pbXBvcnQgeyByZWZyZXNoQWNjZXNzVG9rZW4gfSBmcm9tICcuL2F1dGhBY3Rpb25zJztcbmltcG9ydCB7XG4gIFJFUVVFU1RfRkVUQ0hfVEFTS1MsXG4gIFJFQ0VJVkVfRkVUQ0hfVEFTS1MsXG4gIEVSUk9SX0ZFVENIX1RBU0tTLFxuICBBRERfVEFTS19MT0NBTCxcbiAgUkVNT1ZFX1RBU0tfTE9DQUwsXG4gIFVQREFURV9UQVNLX0xPQ0FMLFxufSBmcm9tICcuLi9jb25zdGFudHMvYWN0aW9uVHlwZXMnO1xuaW1wb3J0IHsgcXVlcnlJdGVtc0xpbWl0IH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUVycm9yIH0gZnJvbSAnLi9tZXNzYWdlQWN0aW9ucyc7XG5cbmNvbnN0IHJlcXVlc3RGZXRjaFRhc2tzID0gKGxpbWl0LCBza2lwKSA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRVFVRVNUX0ZFVENIX1RBU0tTLFxuICAgIGxpbWl0LFxuICAgIHNraXAsXG4gIH1cbik7XG5cbmNvbnN0IHJlY2VpdmVGZXRjaFRhc2tzID0gdGFza3MgPT4gKFxuICB7XG4gICAgdHlwZTogUkVDRUlWRV9GRVRDSF9UQVNLUyxcbiAgICB0YXNrcyxcbiAgfVxuKTtcblxuY29uc3QgZXJyb3JGZXRjaFRhc2tzID0gZXJyb3IgPT4gKFxuICB7XG4gICAgdHlwZTogRVJST1JfRkVUQ0hfVEFTS1MsXG4gICAgZXJyb3IsXG4gIH1cbik7XG5cbmNvbnN0IGFkZFRhc2tMb2NhbCA9IHRhc2sgPT4gKFxuICB7XG4gICAgdHlwZTogQUREX1RBU0tfTE9DQUwsXG4gICAgdGFzayxcbiAgfVxuKTtcblxuY29uc3QgcmVtb3ZlVGFza0xvY2FsID0gdGFza0luZGV4ID0+IChcbiAge1xuICAgIHR5cGU6IFJFTU9WRV9UQVNLX0xPQ0FMLFxuICAgIHRhc2tJbmRleCxcbiAgfVxuKTtcblxuY29uc3QgdXBkYXRlVGFza0xvY2FsID0gdGFzayA9PiAoXG4gIHtcbiAgICB0eXBlOiBVUERBVEVfVEFTS19MT0NBTCxcbiAgICB0YXNrLFxuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkgPSAoXG4gIGNhdGVnb3JpZXNJZCA9IFtdLFxuICBjb21wbGV0ZWQgPSBmYWxzZSxcbiAgbGltaXQgPSBxdWVyeUl0ZW1zTGltaXQsXG4gIHNraXAgPSAwLFxuKSA9PiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGRpc3BhdGNoKHJlcXVlc3RGZXRjaFRhc2tzKGxpbWl0LCBza2lwKSk7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbiB9ID0gZ2V0U3RhdGUoKS5hdXRoO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbEFwaSgndGFza3MnLCB7XG4gICAgICBjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCwgbGltaXQsIHNraXAsXG4gICAgfSwgTWV0aG9kcy5HRVQsIGFjY2Vzc1Rva2VuKTtcbiAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgY29uc3QgdGFza3MgPSByZXNwb25zZS5kYXRhLm1hcCh0YXNrID0+XG4gICAgICAgICh7XG4gICAgICAgICAgLi4udGFzayxcbiAgICAgICAgICBjb21wbGV0ZWRBdDogKHRhc2suY29tcGxldGVkQXQpID8gbmV3IERhdGUodGFzay5jb21wbGV0ZWRBdCkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgdG9kb1dpdGhpbjogKHRhc2sudG9kb1dpdGhpbikgPyBuZXcgRGF0ZSh0YXNrLnRvZG9XaXRoaW4pIDogdW5kZWZpbmVkLFxuICAgICAgICB9KSk7XG4gICAgICBkaXNwYXRjaChyZWNlaXZlRmV0Y2hUYXNrcyh0YXNrcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc2hvdWxkUmVmcmVzaFRva2VuKHJlc3BvbnNlKSkge1xuICAgICAgICBhd2FpdCBkaXNwYXRjaChyZWZyZXNoQWNjZXNzVG9rZW4oKSk7XG4gICAgICAgIGRpc3BhdGNoKGZldGNoVGFza3NCeUNhdGVnb3J5KGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgc2tpcCkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBkaXNwYXRjaChlcnJvckZldGNoVGFza3MocmVzcG9uc2UuZXJyb3IubWVzc2FnZSkpO1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5lcnJvci5tZXNzYWdlKSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZGVsZXRlVGFzayA9IChpZCA9ICcnKSA9PiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbiB9ID0gZ2V0U3RhdGUoKS5hdXRoO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbEFwaSgndGFza3MnLCBpZCwgTWV0aG9kcy5ERUxFVEUsIGFjY2Vzc1Rva2VuKTtcbiAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgY29uc3QgeyBpdGVtcyB9ID0gZ2V0U3RhdGUoKS50b2RvVGFza3M7XG4gICAgICBjb25zdCB0b2RvQXJndW1lbnRJbmRleCA9IGl0ZW1zLmZpbmRJbmRleCh0b2RvQXJndW1lbnQgPT5cbiAgICAgICAgdG9kb0FyZ3VtZW50LmlkID09PSBpZCk7XG4gICAgICBkaXNwYXRjaChyZW1vdmVUYXNrTG9jYWwodG9kb0FyZ3VtZW50SW5kZXgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNob3VsZFJlZnJlc2hUb2tlbihyZXNwb25zZSkpIHtcbiAgICAgICAgYXdhaXQgZGlzcGF0Y2gocmVmcmVzaEFjY2Vzc1Rva2VuKCkpO1xuICAgICAgICBkaXNwYXRjaChkZWxldGVUYXNrKGlkKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UuZXJyb3IubWVzc2FnZSkpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRhc2sgPSAodGl0bGUgPSAnJywgZGVzY3JpcHRpb24gPSAnJywgY2F0ZWdvcnkgPSB7IGlkOiAnJyB9LCB0b2RvV2l0aGluLCBjYWxsYmFjayA9IHVuZGVmaW5lZCkgPT4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW4gfSA9IGdldFN0YXRlKCkuYXV0aDtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoXG4gICAgICAndGFza3MnLFxuICAgICAge1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5LmlkLFxuICAgICAgICB0b2RvV2l0aGluLFxuICAgICAgfSxcbiAgICAgIE1ldGhvZHMuUE9TVCxcbiAgICAgIGFjY2Vzc1Rva2VuLFxuICAgICk7XG4gICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgIGNvbnN0IGZldGNoZWRUYXNrID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIGNvbnN0IHRhc2sgPSB7XG4gICAgICAgIC4uLmZldGNoZWRUYXNrLFxuICAgICAgICBjb21wbGV0ZWRBdDogKGZldGNoZWRUYXNrLmNvbXBsZXRlZEF0KVxuICAgICAgICAgID8gbmV3IERhdGUoZmV0Y2hlZFRhc2suY29tcGxldGVkQXQpIDogdW5kZWZpbmVkLFxuICAgICAgICB0b2RvV2l0aGluOiAoZmV0Y2hlZFRhc2sudG9kb1dpdGhpbilcbiAgICAgICAgICA/IG5ldyBEYXRlKGZldGNoZWRUYXNrLnRvZG9XaXRoaW4pIDogdW5kZWZpbmVkLFxuICAgICAgfTtcbiAgICAgIGRpc3BhdGNoKGFkZFRhc2tMb2NhbCh0YXNrKSk7XG4gICAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc2hvdWxkUmVmcmVzaFRva2VuKHJlc3BvbnNlKSkge1xuICAgICAgICBhd2FpdCBkaXNwYXRjaChyZWZyZXNoQWNjZXNzVG9rZW4oKSk7XG4gICAgICAgIGRpc3BhdGNoKGFkZFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBjYXRlZ29yeSwgdG9kb1dpdGhpbiwgY2FsbGJhY2spKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5lcnJvci5tZXNzYWdlKSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgdG9vZ2xlVGFza0NvbXBsZXRlZCA9IChpZCA9ICcnLCBpc0NvbXBsZXRlZCA9IGZhbHNlKSA9PiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGNvbnN0IGNvbXBsZXRlZCA9ICFpc0NvbXBsZXRlZDtcbiAgY29uc3QgY29tcGxldGVkQXQgPSAoY29tcGxldGVkKSA/IG5ldyBEYXRlKCkgOiBudWxsO1xuICB0cnkge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW4gfSA9IGdldFN0YXRlKCkuYXV0aDtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoJ3Rhc2tzJywgeyBpZCwgY29tcGxldGVkLCBjb21wbGV0ZWRBdCB9LCBNZXRob2RzLlBBVENILCBhY2Nlc3NUb2tlbik7XG4gICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgIGNvbnN0IGZldGNoZWRUYXNrID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIGNvbnN0IHRhc2sgPSB7XG4gICAgICAgIC4uLmZldGNoZWRUYXNrLFxuICAgICAgICBjb21wbGV0ZWRBdDogKGZldGNoZWRUYXNrLmNvbXBsZXRlZEF0KVxuICAgICAgICAgID8gbmV3IERhdGUoZmV0Y2hlZFRhc2suY29tcGxldGVkQXQpIDogdW5kZWZpbmVkLFxuICAgICAgfTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZVRhc2tMb2NhbCh0YXNrKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzaG91bGRSZWZyZXNoVG9rZW4ocmVzcG9uc2UpKSB7XG4gICAgICAgIGF3YWl0IGRpc3BhdGNoKHJlZnJlc2hBY2Nlc3NUb2tlbigpKTtcbiAgICAgICAgZGlzcGF0Y2godG9vZ2xlVGFza0NvbXBsZXRlZChpZCwgaXNDb21wbGV0ZWQpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5lcnJvci5tZXNzYWdlKSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5cbmNvbnN0IGR1cmF0aW9uID0gMzAwO1xuXG5jb25zdCBkZWZhdWx0U3R5bGUgPSB7XG4gIHRyYW5zaXRpb246IGBoZWlnaHQgJHtkdXJhdGlvbn1tcyBlYXNlLWluLW91dGAsXG4gIGhlaWdodDogMCxcbn07XG5cbmNvbnN0IG9uRW50ZXIgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSBgJHtub2RlLmZpcnN0RWxlbWVudENoaWxkLm9mZnNldEhlaWdodH1weGA7XG59O1xuXG5jb25zdCBvbkV4aXQgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSAnMHB4Jztcbn07XG5cbmNvbnN0IENvbGxhcHNlID0gKHsgaW46IGluUHJvcCwgY2hpbGRyZW4gfSkgPT4gKFxuICA8VHJhbnNpdGlvbiBvbkVudGVyPXtvbkVudGVyfSBvbkV4aXQ9e29uRXhpdH0gaW49e2luUHJvcH0gdGltZW91dD17ZHVyYXRpb259PlxuICAgIHsoKSA9PiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICA8L1RyYW5zaXRpb24+XG4pO1xuXG5Db2xsYXBzZS5wcm9wVHlwZXMgPSB7XG4gIGluOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbGxhcHNlO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5cbmNvbnN0IGR1cmF0aW9uID0gMjUwO1xuXG5jb25zdCBkZWZhdWx0U3R5bGUgPSB7XG4gIHRyYW5zaXRpb246IGBhbGwgJHtkdXJhdGlvbn1tcyBlYXNlLWluLW91dGAsXG4gIGhlaWdodDogJzBweCcsXG4gIG9wYWNpdHk6ICcwJyxcbiAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG59O1xuXG5jb25zdCB0cmFuc2l0aW9uU3R5bGVzID0ge1xuICBlbnRlcmluZzoge1xuICAgIGhlaWdodDogJzBweCcsXG4gICAgb3BhY2l0eTogJzAnLFxuICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICB9LFxuICBlbnRlcmVkOiB7XG4gICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICBoZWlnaHQ6ICcxMDB2aCcsXG4gICAgb3BhY2l0eTogJzEnLFxuICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJyxcbiAgfSxcbn07XG5cbmNvbnN0IERpYWxvZ0FuaW0gPSAoeyBpbjogaW5Qcm9wLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxUcmFuc2l0aW9uIGluPXtpblByb3B9IHRpbWVvdXQ9e2R1cmF0aW9ufT5cbiAgICB7c3RhdGUgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD1cImJhY2tkcm9wLWRpYWxvZ1wiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxuICAgICAgICAgIC4uLnRyYW5zaXRpb25TdHlsZXNbc3RhdGVdLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICA8L1RyYW5zaXRpb24+XG4pO1xuXG5EaWFsb2dBbmltLnByb3BUeXBlcyA9IHtcbiAgaW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlhbG9nQW5pbTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcclxuXHJcbmNvbnN0IGR1cmF0aW9uID0ge1xyXG4gIGVudGVyOiAzMDAsXHJcbiAgZXhpdDogMjAwLFxyXG59O1xyXG5cclxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xyXG4gIHRyYW5zaXRpb246IGBhbGwgJHtkdXJhdGlvbi5lbnRlcn1tcyBlYXNlLWluLW91dGAsXHJcbiAgaGVpZ2h0OiAwLFxyXG4gIG9wYWNpdHk6IDAsXHJcbn07XHJcblxyXG5jb25zdCBvbkVudGVyID0gKG5vZGUpID0+IHtcclxuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xyXG4gIHN0eWxlLmhlaWdodCA9IGAke25vZGUuZmlyc3RFbGVtZW50Q2hpbGQub2Zmc2V0SGVpZ2h0fXB4YDtcclxuICBzdHlsZS5vcGFjaXR5ID0gMTtcclxufTtcclxuXHJcbmNvbnN0IG9uRW50ZXJlZCA9IChub2RlKSA9PiB7XHJcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcclxuICBzdHlsZS5oZWlnaHQgPSAnYXV0byc7XHJcbn07XHJcblxyXG5jb25zdCBvbkV4aXQgPSAobm9kZSkgPT4ge1xyXG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XHJcbiAgc3R5bGUuaGVpZ2h0ID0gYCR7bm9kZS5maXJzdEVsZW1lbnRDaGlsZC5vZmZzZXRIZWlnaHR9cHhgO1xyXG59O1xyXG5cclxuY29uc3Qgb25FeGl0ZWQgPSAobm9kZSkgPT4ge1xyXG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XHJcbiAgc3R5bGUuaGVpZ2h0ID0gJzBweCc7XHJcbiAgc3R5bGUub3BhY2l0eSA9IDA7XHJcbn07XHJcblxyXG5cclxuY29uc3QgUmVzaXplID0gKHsgY2hpbGRyZW4sIC4uLnByb3BzIH0pID0+IChcclxuICA8VHJhbnNpdGlvblxyXG4gICAgey4uLnByb3BzfVxyXG4gICAgb25FbnRlcj17b25FbnRlcn1cclxuICAgIG9uRW50ZXJlZD17b25FbnRlcmVkfVxyXG4gICAgb25FeGl0PXtvbkV4aXR9XHJcbiAgICBvbkV4aXRlZD17b25FeGl0ZWR9XHJcbiAgICB0aW1lb3V0PXtkdXJhdGlvbn1cclxuICA+XHJcbiAgICB7KCkgPT4gKFxyXG4gICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICAuLi5kZWZhdWx0U3R5bGUsXHJcbiAgICAgICAgfX1cclxuICAgICAgPlxyXG4gICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgPC9kaXY+XHJcbiAgICApfVxyXG4gIDwvVHJhbnNpdGlvbj5cclxuKTtcclxuXHJcblJlc2l6ZS5wcm9wVHlwZXMgPSB7XHJcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZXNpemU7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDI1MDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgYWxsICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBib3R0b206ICctMTAwcHgnLFxufTtcblxuY29uc3QgdHJhbnNpdGlvblN0eWxlcyA9IHtcbiAgZW50ZXJpbmc6IHtcbiAgICBib3R0b206ICctMTAwcHgnLFxuICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICB9LFxuICBlbnRlcmVkOiB7XG4gICAgYm90dG9tOiAnMHB4JyxcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gIH0sXG59O1xuXG5jb25zdCBTbmFja2JhckFuaW0gPSAoeyBpbjogaW5Qcm9wLCBjaGlsZHJlbiwgY3VzdG9tQ2xhc3MgfSkgPT4gKFxuICA8VHJhbnNpdGlvbiBpbj17aW5Qcm9wfSB0aW1lb3V0PXtkdXJhdGlvbn0+XG4gICAge3N0YXRlID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJjb250ZW50LXNuYWNrYmFyXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAuLi5kZWZhdWx0U3R5bGUsXG4gICAgICAgICAgLi4udHJhbnNpdGlvblN0eWxlc1tzdGF0ZV0sXG4gICAgICAgIH19XG4gICAgICAgIGNsYXNzTmFtZT17Y3VzdG9tQ2xhc3N9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICl9XG4gIDwvVHJhbnNpdGlvbj5cbik7XG5cblNuYWNrYmFyQW5pbS5wcm9wVHlwZXMgPSB7XG4gIGluOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgY3VzdG9tQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5TbmFja2JhckFuaW0uZGVmYXVsdFByb3BzID0ge1xuICBjdXN0b21DbGFzczogJycsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTbmFja2JhckFuaW07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgQnV0dG9uU2Nyb2xsID0gKHsgb25DbGljaywgZGlyZWN0aW9uIH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9e2BidXR0b24tc2Nyb2xsICR7ZGlyZWN0aW9ufWB9IG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIDxpIGNsYXNzTmFtZT17KGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSA/ICdpY29uLWJhY2t3YXJkJyA6ICdpY29uLWZvcndhcmQnfSAvPlxuICA8L2J1dHRvbj5cbik7XG5cbkJ1dHRvblNjcm9sbC5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGRpcmVjdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnbGVmdCcsICdyaWdodCddKSxcbn07XG5cbkJ1dHRvblNjcm9sbC5kZWZhdWx0UHJvcHMgPSB7XG4gIGRpcmVjdGlvbjogJ2xlZnQnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uU2Nyb2xsO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJ2xvZGFzaCc7XG5cbmNvbnN0IHdhaXRUaW1lID0gNTAwO1xuXG5jbGFzcyBJbmZpbml0ZVNjcm9sbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMub25TY3JvbGwgPSB0aGlzLm9uU2Nyb2xsLmJpbmQodGhpcyk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhyb3R0bGUodGhpcy5vblNjcm9sbCwgd2FpdFRpbWUpLCBmYWxzZSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhyb3R0bGUodGhpcy5vblNjcm9sbCwgd2FpdFRpbWUpLCBmYWxzZSk7XG4gIH1cblxuICBvblNjcm9sbCgpIHtcbiAgICBpZiAoKHdpbmRvdy5pbm5lckhlaWdodCArIHdpbmRvdy5zY3JvbGxZKSA+PSAoZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQgLSAyMDApKSB7XG4gICAgICBjb25zdCB7IGFyZ3MsIG9uU2Nyb2xsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgb25TY3JvbGwoLi4uYXJncyk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSW5maW5pdGVTY3JvbGwucHJvcFR5cGVzID0ge1xuICBhcmdzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgb25TY3JvbGw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5JbmZpbml0ZVNjcm9sbC5kZWZhdWx0UHJvcHMgPSB7XG4gIGFyZ3M6IFtdLFxuICBjbGFzc05hbWU6ICcnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgSW5maW5pdGVTY3JvbGw7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgTWFpbkFkZEJ1dHRvbiA9ICh7IG9uQ2xpY2sgfSkgPT4gKFxuICA8YnV0dG9uIGlkPVwibWFpbi1hZGQtYnV0dG9uXCIgb25DbGljaz17b25DbGlja30gPlxuICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+JiN4RTE0NTs8L2k+XG4gIDwvYnV0dG9uPlxuKTtcblxuTWFpbkFkZEJ1dHRvbi5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYWluQWRkQnV0dG9uO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgU25hY2tiYXJBbmltIGZyb20gJy4uL2FuaW1zL1NuYWNrYmFyQW5pbSc7XG5cbmNvbnN0IEFjdGlvbiA9ICh7IG9uQ2xpY2ssIHRleHQgfSkgPT4gKFxuICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvbi1hY3Rpb24tc25hY2tiYXJcIiBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICB7dGV4dH1cbiAgPC9idXR0b24+XG4pO1xuXG5BY3Rpb24ucHJvcFR5cGVzID0ge1xuICB0ZXh0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5jbGFzcyBTbmFja2JhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBjb25zdCB7XG4gICAgICBvbkNsb3NlLCBkdXJhdGlvbiwgc2hvdyxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChzaG93KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgb25DbG9zZSgpO1xuICAgICAgfSwgZHVyYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBtZXNzYWdlLCBpc0Vycm9yLCBhY3Rpb25UZXh0LCBhY3Rpb25DbGljaywgc2hvdyxcbiAgICAgIHZlcnRpY2FsUG9zdGlvbiwgaG9yaXpvbnRhbFBvc2l0aW9uLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8U25hY2tiYXJBbmltIGluPXtzaG93fSBjdXN0b21DbGFzcz17YCR7dmVydGljYWxQb3N0aW9ufSAkeyhob3Jpem9udGFsUG9zaXRpb24pfWB9PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtgc25hY2tiYXIgJHsoaXNFcnJvcikgPyAnZXJyb3InIDogJyd9YH1cbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNuYWNrYmFyLW1lc3NhZ2VcIj57bWVzc2FnZX08L3NwYW4+XG4gICAgICAgICAge1xuICAgICAgICAgICAgKGFjdGlvblRleHQgIT09ICcnICYmIGFjdGlvbkNsaWNrICE9PSB1bmRlZmluZWQpICYmXG4gICAgICAgICAgICAgIDxBY3Rpb24gb25DbGljaz17YWN0aW9uQ2xpY2t9IHRleHQ9e2FjdGlvblRleHR9IC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvU25hY2tiYXJBbmltPlxuICAgICk7XG4gIH1cbn1cblxuU25hY2tiYXIucHJvcFR5cGVzID0ge1xuICBzaG93OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGR1cmF0aW9uOiBQcm9wVHlwZXMubnVtYmVyLFxuICBpc0Vycm9yOiBQcm9wVHlwZXMuYm9vbCxcbiAgYWN0aW9uVGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgYWN0aW9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICB2ZXJ0aWNhbFBvc3Rpb246IFByb3BUeXBlcy5vbmVPZihbJ3RvcCcsICdib3R0b20nXSksXG4gIGhvcml6b250YWxQb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnbGVmdCcsICdyaWdodCddKSxcbn07XG5cblNuYWNrYmFyLmRlZmF1bHRQcm9wcyA9IHtcbiAgZHVyYXRpb246IDUwMDAsXG4gIGlzRXJyb3I6IGZhbHNlLFxuICBhY3Rpb25UZXh0OiAnJyxcbiAgYWN0aW9uQ2xpY2s6IHVuZGVmaW5lZCxcbiAgdmVydGljYWxQb3N0aW9uOiAnYm90dG9tJyxcbiAgaG9yaXpvbnRhbFBvc2l0aW9uOiAncmlnaHQnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU25hY2tiYXI7XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IExvYWRlckxpbmVhciBmcm9tICcuLi9sYXlvdXQvTG9hZGVyTGluZWFyJztcbmltcG9ydCBNYWluQWRkQnV0dG9uIGZyb20gJy4uL2xheW91dC9NYWluQWRkQnV0dG9uJztcbmltcG9ydCBDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyIGZyb20gJy4uLy4uL2NvbnRhaW5lcnMvQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lcic7XG5pbXBvcnQgVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lciBmcm9tICcuLi8uLi9jb250YWluZXJzL1Zpc2liaWxpdHlGaWx0ZXJDb250YWluZXInO1xuaW1wb3J0IFRhc2tzQ29udGFpbmVyIGZyb20gJy4uLy4uL2NvbnRhaW5lcnMvVGFza3NDb250YWluZXInO1xuaW1wb3J0IERpYWxvZ0FkZCBmcm9tICcuL2RpYWxvZ0FkZC9EaWFsb2dBZGQnO1xuaW1wb3J0IFNuYWNrYmFyIGZyb20gJy4uL2xheW91dC9TbmFja2Jhcic7XG5cbmNsYXNzIFRvZG9zIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzRGlhbG9nQWRkT3BlbjogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgaW5pdEZldGNoQWxsQ2F0ZWdvcmllcyB9ID0gdGhpcy5wcm9wcztcbiAgICBpbml0RmV0Y2hBbGxDYXRlZ29yaWVzKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBpc0RpYWxvZ0FkZE9wZW4gfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBtZXNzYWdlLCBoaWRlTWVzc2FnZSwgc2hvd0xvYWRpbmcgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1hcHBcIj5cbiAgICAgICAgPExvYWRlckxpbmVhciBzaG93PXtzaG93TG9hZGluZ30gLz5cbiAgICAgICAgPGRpdiBpZD1cIm1haW4tdG9wLWJhclwiPlxuICAgICAgICAgIDxDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyIC8+XG4gICAgICAgICAgPFZpc2liaWxpdHlGaWx0ZXJDb250YWluZXIgLz5cbiAgICAgICAgICA8TWFpbkFkZEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IGlzRGlhbG9nQWRkT3BlbjogdHJ1ZSB9KX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFRhc2tzQ29udGFpbmVyIC8+XG4gICAgICAgIDxEaWFsb2dBZGRcbiAgICAgICAgICBvcGVuPXtpc0RpYWxvZ0FkZE9wZW59XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IGlzRGlhbG9nQWRkT3BlbjogZmFsc2UgfSl9XG4gICAgICAgIC8+XG4gICAgICAgIDxTbmFja2JhclxuICAgICAgICAgIHNob3c9e21lc3NhZ2Uuc2hvd31cbiAgICAgICAgICBpc0Vycm9yPXttZXNzYWdlLmlzRXJyb3J9XG4gICAgICAgICAgbWVzc2FnZT17bWVzc2FnZS50ZXh0fVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IGhpZGVNZXNzYWdlKCl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblRvZG9zLnByb3BUeXBlcyA9IHtcbiAgbWVzc2FnZTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBzaG93OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzRXJyb3I6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkLFxuICBoaWRlTWVzc2FnZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaW5pdEZldGNoQWxsQ2F0ZWdvcmllczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgc2hvd0xvYWRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb2RvcztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdXR0b25EZWxldGVDYXRlZ29yeSA9ICh7IG9uQ2xpY2sgfSkgPT4gKFxuICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvbi1kZWxldGUtY2F0ZWdvcnlcIiBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICA8aSBjbGFzc05hbWU9XCJpY29uLWRlbGV0ZVwiIC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uRGVsZXRlQ2F0ZWdvcnkucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uRGVsZXRlQ2F0ZWdvcnk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb25Hcm91cCB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuaW1wb3J0IHNjcm9sbCBmcm9tICdzY3JvbGwnO1xuaW1wb3J0IEJ1dHRvblNjcm9sbCBmcm9tICcuLi8uLi9sYXlvdXQvQnV0dG9uU2NvbGwnO1xuaW1wb3J0IENhdGVnb3J5IGZyb20gJy4vQ2F0ZWdvcnknO1xuaW1wb3J0IEZhZGUgZnJvbSAnLi4vLi4vYW5pbXMvRmFkZSc7XG5cbmNsYXNzIENhdGVnb3JpZXNGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmNoaXBzID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuaGFuZGxlTGVmdFNjcm9sbENsaWNrID0gdGhpcy5oYW5kbGVMZWZ0U2Nyb2xsQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2sgPSB0aGlzLmhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vdmVDaGlwc1Njcm9sbCA9IHRoaXMubW92ZUNoaXBzU2Nyb2xsLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVMZWZ0U2Nyb2xsQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuY2hpcHMpIHtcbiAgICAgIHRoaXMubW92ZUNoaXBzU2Nyb2xsKC10aGlzLmNoaXBzLmNsaWVudFdpZHRoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVSaWdodFNjcm9sbENsaWNrKCkge1xuICAgIGlmICh0aGlzLmNoaXBzKSB7XG4gICAgICB0aGlzLm1vdmVDaGlwc1Njcm9sbCh0aGlzLmNoaXBzLmNsaWVudFdpZHRoKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlQ2hpcHNTY3JvbGwoZGVsdGEpIHtcbiAgICBpZiAodGhpcy5jaGlwcykge1xuICAgICAgY29uc3QgbmV4dFNjcm9sbExlZnQgPSB0aGlzLmNoaXBzLnNjcm9sbExlZnQgKyBkZWx0YTtcbiAgICAgIHNjcm9sbC5sZWZ0KHRoaXMuY2hpcHMsIG5leHRTY3JvbGxMZWZ0KTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjYXRlZ29yeUxpc3QsIG9uRGVsZXRlQ2F0ZWdvcnksIG9uQ2lsY2tDYXRlZ29yeSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cImNvbnRlbnQtY2F0ZWdvcmllcy1maWx0ZXJcIj5cbiAgICAgICAgPEJ1dHRvblNjcm9sbFxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTGVmdFNjcm9sbENsaWNrfVxuICAgICAgICAgIGRpcmVjdGlvbj1cImxlZnRcIlxuICAgICAgICAvPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwiY2F0ZWdvcmllcy1maWx0ZXJcIlxuICAgICAgICAgIHJlZj17KG5vZGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hpcHMgPSBub2RlO1xuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8VHJhbnNpdGlvbkdyb3VwIHN0eWxlPXt7IGRpc3BsYXk6ICdpbmhlcml0JywgcGFkZGluZ0xlZnQ6ICcxLjI1ZW0nLCBwYWRkaW5nUmlnaHQ6ICcxLjI1ZW0nIH19PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjYXRlZ29yeUxpc3QubWFwKGNhdGVnb3J5ID0+IChcbiAgICAgICAgICAgICAgICA8RmFkZSBrZXk9e2NhdGVnb3J5LmlkfT5cbiAgICAgICAgICAgICAgICAgIDxDYXRlZ29yeVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2NhdGVnb3J5LmlkfVxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeT17Y2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtjYXRlZ29yeS5zZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICAgb25EZWxldGU9e29uRGVsZXRlQ2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2lsY2tDYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9GYWRlPlxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvVHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEJ1dHRvblNjcm9sbFxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlUmlnaHRTY3JvbGxDbGlja31cbiAgICAgICAgICBkaXJlY3Rpb249XCJyaWdodFwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkNhdGVnb3JpZXNGaWx0ZXIucHJvcFR5cGVzID0ge1xuICBjYXRlZ29yeUxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIG9uRGVsZXRlQ2F0ZWdvcnk6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNpbGNrQ2F0ZWdvcnk6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5DYXRlZ29yaWVzRmlsdGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25EZWxldGVDYXRlZ29yeTogdW5kZWZpbmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0ZWdvcmllc0ZpbHRlcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEJ1dHRvbkRlbGV0ZUNhdGVnb3J5IGZyb20gJy4vQnV0dG9uRGVsZXRlQ2F0ZWdvcnknO1xuXG5jb25zdCBDYXRlZ29yeSA9ICh7XG4gIGNhdGVnb3J5LCBzZWxlY3RlZCwgb25DbGljaywgb25EZWxldGUsXG59KSA9PiB7XG4gIGxldCBjc3NDbGFzcyA9ICcnO1xuXG4gIGNvbnN0IG9uQ2hpcENsaWNrID0gKGUpID0+IHtcbiAgICBvbkNsaWNrKGNhdGVnb3J5LCBlKTtcbiAgfTtcbiAgY29uc3Qgb25EZWxldGVDbGljayA9ICgpID0+IHtcbiAgICBvbkRlbGV0ZShjYXRlZ29yeSk7XG4gIH07XG5cbiAgaWYgKHNlbGVjdGVkKSB7XG4gICAgY3NzQ2xhc3MgPSAnY2F0ZWdvcnktc2VsZWN0ZWQnO1xuICB9XG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtgJHtjc3NDbGFzc30gY2F0ZWdvcnktY2hpcCBhbGlnbi1pdGVtcy1jZW50ZXJgfVxuICAgICAgb25DbGljaz17b25DaGlwQ2xpY2t9XG4gICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXRlZ29yeS10ZXh0XCI+e2NhdGVnb3J5Lm5hbWV9PC9zcGFuPlxuICAgICAge1xuICAgICAgICAoY2F0ZWdvcnkuaWQgIT09ICcwJyAmJiBvbkRlbGV0ZSAhPT0gdW5kZWZpbmVkKSAmJlxuICAgICAgICAgIDxCdXR0b25EZWxldGVDYXRlZ29yeSBvbkNsaWNrPXtvbkRlbGV0ZUNsaWNrfSAvPlxuICAgICAgfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuQ2F0ZWdvcnkucHJvcFR5cGVzID0ge1xuICBvbkRlbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNhdGVnb3J5OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbn07XG5cbkNhdGVnb3J5LmRlZmF1bHRQcm9wcyA9IHtcbiAgb25EZWxldGU6IHVuZGVmaW5lZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENhdGVnb3J5O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IHsgQUREX1RBU0sgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IHsgYWRkQ2F0ZWdvcnkgfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUluZm8gfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcblxuY2xhc3MgQWRkQ2F0ZWdvcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbmFtZTogJycsXG4gICAgfTtcbiAgICB0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlID0gdGhpcy5vbklucHV0VGV4dENoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25CdXR0b25BZGRDbGljayA9IHRoaXMub25CdXR0b25BZGRDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25DYXRlZ29yeUNyZWF0ZWQgPSB0aGlzLm9uQ2F0ZWdvcnlDcmVhdGVkLmJpbmQodGhpcyk7XG4gIH1cblxuICBvbklucHV0VGV4dENoYW5nZShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IG5hbWU6IGUudGFyZ2V0LnZhbHVlIH0pO1xuICB9XG5cbiAgb25CdXR0b25BZGRDbGljaygpIHtcbiAgICBjb25zdCB7IG5hbWUgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBkaXNwYXRjaCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAobmFtZSA9PT0gJycpIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlSW5mbyhsYWJlbHMubXNnTmFtZVJlcXVpcmVkKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRpc3BhdGNoKGFkZENhdGVnb3J5KG5hbWUsIHRoaXMub25DYXRlZ29yeUNyZWF0ZWQpKTtcbiAgfVxuXG4gIG9uQ2F0ZWdvcnlDcmVhdGVkKHNlbGVjdGVkQ2F0ZWdvcnkpIHtcbiAgICBjb25zdCB7IG9uTmV4dCB9ID0gdGhpcy5wcm9wcztcbiAgICBvbk5leHQoeyBzdGVwSWQ6IEFERF9UQVNLLCBvcHRpb25zOiB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWFkZC1jYXRlZ29yeVwiPlxuICAgICAgICA8aDI+e2xhYmVscy50aXRsZUFkZENhdGVnb3J5fTwvaDI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtsYWJlbHMucGxhY2Vob2xkZXJOYW1lfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dFRleHRDaGFuZ2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1idXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkJ1dHRvbkFkZENsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYWJlbHMuYnV0dG9uQWRkfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQWRkQ2F0ZWdvcnkucHJvcFR5cGVzID0ge1xuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCgpKEFkZENhdGVnb3J5KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvbGFiZWxzJztcbmltcG9ydCB7IFNFTEVDVF9DT01QTEVURV9EQVRFIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5jbGFzcyBBZGRUYXNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdGl0bGU6ICcnLFxuICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgIH07XG4gICAgdGhpcy5vbklucHV0VGV4dENoYW5nZSA9IHRoaXMub25JbnB1dFRleHRDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQnV0dG9uU2NoZWR1bGVDbGljayA9IHRoaXMub25CdXR0b25TY2hlZHVsZUNsaWNrLmJpbmQodGhpcyk7XG4gIH1cblxuICBvbklucHV0VGV4dENoYW5nZShuYW1lKSB7XG4gICAgcmV0dXJuIChlKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgW25hbWVdOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgICB9O1xuICB9XG5cbiAgb25CdXR0b25TY2hlZHVsZUNsaWNrKCkge1xuICAgIGNvbnN0IHsgb3B0aW9ucywgZGlzcGF0Y2gsIG9uTmV4dCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBjYXRlZ29yeSA9IG9wdGlvbnMuc2VsZWN0ZWRDYXRlZ29yeTtcbiAgICBpZiAodGl0bGUgPT09ICcnKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ1RpdGxlUmVxdWlyZWQpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25OZXh0KHsgc3RlcElkOiBTRUxFQ1RfQ09NUExFVEVfREFURSwgb3B0aW9uczogeyB0aXRsZSwgZGVzY3JpcHRpb24sIGNhdGVnb3J5IH0gfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBzZWxlY3RlZENhdGVnb3J5IH0gPSB0aGlzLnByb3BzLm9wdGlvbnM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1hZGQtdGFza1wiPlxuICAgICAgICA8aDI+e2xhYmVscy50aXRsZUFkZFRhc2t9PC9oMj5cbiAgICAgICAgPGgzPlxuICAgICAgICAgIHtsYWJlbHMubGFiZWxGb3JDYXRlZ29yeX1cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsYWJlbC1jYXRlZ29yeS1uYW1lXCI+XG4gICAgICAgICAgICB7YCAke3NlbGVjdGVkQ2F0ZWdvcnkubmFtZX1gfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9oMz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWZpZWxkc1wiPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17bGFiZWxzLnBsYWNlSG9sZGVyVGl0bGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0VGV4dENoYW5nZSgndGl0bGUnKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17bGFiZWxzLnBsYWNlSG9sZGVyRGVzY3JpcHRpb259XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0VGV4dENoYW5nZSgnZGVzY3JpcHRpb24nKX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQnV0dG9uU2NoZWR1bGVDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGFiZWxzLmJ1dHRvblNjaGVkdWxlfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQWRkVGFzay5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvcHRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHNlbGVjdGVkQ2F0ZWdvcnk6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIH0pLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoKShBZGRUYXNrKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgU2VsZWN0QWN0aW9uQWRkIGZyb20gJy4vU2VsZWN0QWN0aW9uQWRkJztcbmltcG9ydCBBZGRDYXRlZ29yeSBmcm9tICcuL0FkZENhdGVnb3J5JztcbmltcG9ydCBTZWxlY3RDYXRlZ29yeSBmcm9tICcuL1NlbGVjdENhdGVnb3J5JztcbmltcG9ydCBBZGRUYXNrIGZyb20gJy4vQWRkVGFzayc7XG5pbXBvcnQgU2VsZWN0Q29tcGxldGVEYXRlIGZyb20gJy4vU2VsZWN0Q29tcGxldGVEYXRlJztcbmltcG9ydCBEb25lIGZyb20gJy4vRG9uZSc7XG5pbXBvcnQge1xuICBTRUxFQ1RfV0FOVF9UT19BREQsXG4gIEFERF9DQVRFR09SWSxcbiAgQUREX1RBU0ssXG4gIFNFTEVDVF9DQVRFR09SWSxcbiAgU0VMRUNUX0NPTVBMRVRFX0RBVEUsXG4gIERPTkUsXG4gIHN0ZXBMaXN0LFxufSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IFJlcGxhY2VBbmltIGZyb20gJy4uLy4uL2FuaW1zL1JlcGxhY2VBbmltJztcbmltcG9ydCBEaWFsb2dBbmltIGZyb20gJy4uLy4uL2FuaW1zL0RpYWxvZ0FuaW0nO1xuaW1wb3J0IFN0ZXBzIGZyb20gJy4vU3RlcHMnO1xuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvbGFiZWxzJztcblxuY29uc3QgZ2V0Q29udGVudFRvUmVuZGVyID0gKHN0ZXBzLCBwcm9wcykgPT4ge1xuICBpZiAoc3RlcHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIDxTZWxlY3RBY3Rpb25BZGQgey4uLnByb3BzfSAvPjtcbiAgfVxuICBjb25zdCBsYXN0U3RlcCA9IHN0ZXBzW3N0ZXBzLmxlbmd0aCAtIDFdO1xuICBzd2l0Y2ggKGxhc3RTdGVwLnN0ZXBJZCkge1xuICAgIGNhc2UgU0VMRUNUX1dBTlRfVE9fQUREOlxuICAgICAgcmV0dXJuIDxTZWxlY3RBY3Rpb25BZGQgey4uLnByb3BzfSAvPjtcbiAgICBjYXNlIEFERF9DQVRFR09SWTpcbiAgICAgIHJldHVybiA8QWRkQ2F0ZWdvcnkgey4uLnByb3BzfSAvPjtcbiAgICBjYXNlIEFERF9UQVNLOlxuICAgICAgcmV0dXJuIDxBZGRUYXNrIHsuLi5wcm9wc30gb3B0aW9ucz17bGFzdFN0ZXAub3B0aW9uc30gLz47XG4gICAgY2FzZSBTRUxFQ1RfQ0FURUdPUlk6XG4gICAgICByZXR1cm4gPFNlbGVjdENhdGVnb3J5IHsuLi5wcm9wc30gLz47XG4gICAgY2FzZSBTRUxFQ1RfQ09NUExFVEVfREFURTpcbiAgICAgIHJldHVybiA8U2VsZWN0Q29tcGxldGVEYXRlIHsuLi5wcm9wc30gb3B0aW9ucz17bGFzdFN0ZXAub3B0aW9uc30gLz47XG4gICAgY2FzZSBET05FOlxuICAgICAgcmV0dXJuIDxEb25lIHsuLi5wcm9wc30gLz47XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiA8U2VsZWN0QWN0aW9uQWRkIHsuLi5wcm9wc30gLz47XG4gIH1cbn07XG5cbmNvbnN0IGluaXRhbFN0YXRlID0ge1xuICBuZXh0U3RlcHM6IFtdLFxuICBzdGVwczogW1xuICAgIHtcbiAgICAgIHN0ZXBJZDogU0VMRUNUX1dBTlRfVE9fQURELFxuICAgICAgb3B0aW9uczoge30sXG4gICAgfSxcbiAgXSxcbiAgc2hvd1N0ZXA6IHRydWUsXG59O1xuXG5jbGFzcyBEaWFsb2dBZGQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLi4uaW5pdGFsU3RhdGUsXG4gICAgfTtcbiAgICB0aGlzLm9uQmFjayA9IHRoaXMub25CYWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbk5leHQgPSB0aGlzLm9uTmV4dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25SZXNldEFuZENsb3NlID0gdGhpcy5vblJlc2V0QW5kQ2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQW5pbWF0aW9uRW5kID0gdGhpcy5vbkFuaW1hdGlvbkVuZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25CYWNrKCkge1xuICAgIGNvbnN0IHsgc3RlcHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvbkNsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHN0ZXBDb3VudCA9IHN0ZXBzLmxlbmd0aDtcbiAgICBpZiAoc3RlcENvdW50ID09PSAxKSB7XG4gICAgICAvLyBSZXR1cm5lZCB0byB0aGUgZmlyc3Qgc3RlcHMsIGNsb3NlIHRoZSBkaWFsb2dcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi5pbml0YWxTdGF0ZSB9KTtcbiAgICAgIG9uQ2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5leHRTdGVwczogW1xuICAgICAgICAgIC4uLnN0ZXBzLnNsaWNlKDAsIHN0ZXBzLmxlbmd0aCAtIDEpLFxuICAgICAgICBdLFxuICAgICAgICBzaG93U3RlcDogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbk5leHQoc3RlcCA9IHsgc3RlcElkOiAnJywgb3B0aW9uczoge30gfSkge1xuICAgIGNvbnN0IHsgc3RlcHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZXh0U3RlcHM6IFtcbiAgICAgICAgLi4uc3RlcHMsIHtcbiAgICAgICAgICAuLi5zdGVwLFxuICAgICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHNob3dTdGVwOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIG9uUmVzZXRBbmRDbG9zZSgpIHtcbiAgICBjb25zdCB7IG9uQ2xvc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgb25DbG9zZSgpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLmluaXRhbFN0YXRlIH0pO1xuICAgIH0sIDUwMCk7XG4gIH1cblxuICBvbkFuaW1hdGlvbkVuZChub2RlLCBkb25lKSB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgKCkgPT4ge1xuICAgICAgZG9uZSgpO1xuICAgICAgY29uc3QgeyBuZXh0U3RlcHMsIHNob3dTdGVwIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgaWYgKHNob3dTdGVwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzdGVwczogW1xuICAgICAgICAgIC4uLm5leHRTdGVwcyxcbiAgICAgICAgXSxcbiAgICAgICAgc2hvd1N0ZXA6IHRydWUsXG4gICAgICB9KTtcbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBzdGVwcywgc2hvd1N0ZXAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvbkNsb3NlLCBvcGVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgb25OZXh0LCBvblJlc2V0QW5kQ2xvc2UsIG9uQW5pbWF0aW9uRW5kIH0gPSB0aGlzO1xuICAgIHJldHVybiAoXG4gICAgICA8RGlhbG9nQW5pbSBpbj17b3Blbn0+XG4gICAgICAgIDxkaXYgaWQ9XCJkaWFsb2ctYWRkXCIgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlhbG9nLWhlYWRlclwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cIm1haW4tY2xvc2UtYnV0dG9uXCIgb25DbGljaz17KCkgPT4gb25DbG9zZSgpfT5cbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj4mI3hFNUNEOzwvaT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcHMtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8U3RlcHNcbiAgICAgICAgICAgICAgbGlzdD17c3RlcExpc3R9XG4gICAgICAgICAgICAgIHN0ZXBIaXN0b3J5PXtzdGVwc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaWFsb2ctY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8UmVwbGFjZUFuaW0gaW49e3Nob3dTdGVwfSBlbmRMaXN0ZW5lcj17b25BbmltYXRpb25FbmR9PlxuICAgICAgICAgICAgICB7Z2V0Q29udGVudFRvUmVuZGVyKHN0ZXBzLCB7IG9uTmV4dCwgb25DbG9zZTogb25SZXNldEFuZENsb3NlIH0pfVxuICAgICAgICAgICAgPC9SZXBsYWNlQW5pbT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpYWxvZy1mb290ZXJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgaWQ9XCJiYWNrLWJ1dHRvbi1kaWFsb2dcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMub25CYWNrKCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtsYWJlbHMuYnV0dG9uQmFja31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvRGlhbG9nQW5pbT5cbiAgICApO1xuICB9XG59XG5cbkRpYWxvZ0FkZC5wcm9wVHlwZXMgPSB7XG4gIG9wZW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaWFsb2dBZGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5cbmNsYXNzIERvbmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHsgb25DbG9zZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgIG9uQ2xvc2UoKTtcbiAgICB9LCAzMDAwKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWRvbmUtYWRkXCI+XG4gICAgICAgIDxoMj57bGFiZWxzLmxhYmVsRG9uZX08L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtaWMtZG9uZVwiPlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz1cIi4vY2xpZW50L3B1YmxpYy9pbWcvaWMtZG9uZS5zdmdcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaWMtZG9uZVwiXG4gICAgICAgICAgICBhbHQ9XCJkb25lIGljb25cIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Eb25lLnByb3BUeXBlcyA9IHtcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERvbmU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHsgQUREX0NBVEVHT1JZLCBTRUxFQ1RfQ0FURUdPUlkgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvbGFiZWxzJztcblxuY29uc3QgU2VsZWN0QWN0aW9uQWRkID0gKHsgb25OZXh0IH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LXNlbGVjdC1hY3Rpb24tYWRkXCI+XG4gICAgPGgyPntsYWJlbHMudGl0bGVBZGR9PC9oMj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW0tc2VsZWN0XCI+XG4gICAgICA8cFxuICAgICAgICBjbGFzc05hbWU9XCJzZWxlY3QtdGl0bGVcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk5leHQoeyBzdGVwSWQ6IEFERF9DQVRFR09SWSwgb3B0aW9uczoge30gfSl9XG4gICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgPlxuICAgICAgICB7bGFiZWxzLmxhYmVsQ2F0ZWdvcnl9XG4gICAgICA8L3A+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtLXNlbGVjdFwiPlxuICAgICAgPHBcbiAgICAgICAgY2xhc3NOYW1lPVwic2VsZWN0LXRpdGxlXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4gb25OZXh0KHsgc3RlcElkOiBTRUxFQ1RfQ0FURUdPUlksIG9wdGlvbnM6IHt9IH0pfVxuICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgID5cbiAgICAgICAge2xhYmVscy5sYWJlbFRhc2t9XG4gICAgICA8L3A+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuU2VsZWN0QWN0aW9uQWRkLnByb3BUeXBlcyA9IHtcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0QWN0aW9uQWRkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IENhdGVnb3J5IGZyb20gJy4uL2NhdGVnb3J5L0NhdGVnb3J5JztcbmltcG9ydCB7IEFERF9UQVNLIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5cbmNsYXNzIFNlbGVjdENhdGVnb3J5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlbGVjdGVkQ2F0ZWdvcnk6IHVuZGVmaW5lZCxcbiAgICB9O1xuICAgIHRoaXMub25DYXRlZ29yeUNsaWNrID0gdGhpcy5vbkNhdGVnb3J5Q2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQnV0dG9uTmV4dENsaWNrID0gdGhpcy5vbkJ1dHRvbk5leHRDbGljay5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25DYXRlZ29yeUNsaWNrKGNhdGVnb3J5KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkQ2F0ZWdvcnk6IGNhdGVnb3J5IH0pO1xuICB9XG5cbiAgb25CdXR0b25OZXh0Q2xpY2soKSB7XG4gICAgY29uc3QgeyBzZWxlY3RlZENhdGVnb3J5IH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgb25OZXh0LCBkaXNwYXRjaCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoc2VsZWN0ZWRDYXRlZ29yeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ1NlbGVjdENhdGVnb3J5KSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9uTmV4dCh7IHN0ZXBJZDogQUREX1RBU0ssIG9wdGlvbnM6IHsgc2VsZWN0ZWRDYXRlZ29yeSB9IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2F0ZWdvcmllc0xpc3QgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBzZWxlY3RlZENhdGVnb3J5IH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtc2VsZWN0LWNhdGVnb3J5XCI+XG4gICAgICAgIDxoMj57bGFiZWxzLnRpdGxlQ2hvb3NlQ2F0ZWdvcnl9PC9oMj5cbiAgICAgICAgPGRpdiBpZD1cImNvbnRlbnQtY2F0ZWdvcmllc1wiPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNhdGVnb3JpZXNMaXN0Lm1hcChjYXRlZ29yeSA9PiAoXG4gICAgICAgICAgICAgIChjYXRlZ29yeS5pZCAhPT0gJzAnKVxuICAgICAgICAgICAgICA/IDxDYXRlZ29yeVxuICAgICAgICAgICAgICAgIGtleT17Y2F0ZWdvcnkuaWR9XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk9e2NhdGVnb3J5fVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtzZWxlY3RlZENhdGVnb3J5ICE9PSB1bmRlZmluZWQgJiYgY2F0ZWdvcnkuaWQgPT09IHNlbGVjdGVkQ2F0ZWdvcnkuaWR9XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNhdGVnb3J5Q2xpY2t9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICApKVxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1idXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkJ1dHRvbk5leHRDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGFiZWxzLmJ1dHRvbk5leHR9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TZWxlY3RDYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjYXRlZ29yaWVzTGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3AgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICBjYXRlZ29yaWVzTGlzdDogc3RhdGUudG9kb0ZpbHRlcnMuY2F0ZWdvcmllcyxcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcCkoU2VsZWN0Q2F0ZWdvcnkpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IERhdGVQaWNrZXIgZnJvbSAncmVhY3QtZGF0ZS1waWNrZXInO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IHsgRE9ORSB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgeyBhZGRUYXNrIH0gZnJvbSAnLi4vLi4vLi4vYWN0aW9ucy90b2RvVGFza3NBY3Rpb25zJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5jbGFzcyBTZWxlY3RDb21wbGV0ZURhdGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdG9kb1dpdGhpbjogbmV3IERhdGUoKSxcbiAgICB9O1xuICAgIHRoaXMub25JbnB1dERhdGVDaGFuZ2UgPSB0aGlzLm9uSW5wdXREYXRlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkJ1dHRvbkFkZENsaWNrID0gdGhpcy5vbkJ1dHRvbkFkZENsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblRvZG9UYXNrQ3JlYXRlZCA9IHRoaXMub25Ub2RvVGFza0NyZWF0ZWQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uSW5wdXREYXRlQ2hhbmdlKGRhdGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgdG9kb1dpdGhpbjogZGF0ZSB9KTtcbiAgfVxuXG4gIG9uQnV0dG9uQWRkQ2xpY2soKSB7XG4gICAgY29uc3QgeyB0b2RvV2l0aGluIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgZGlzcGF0Y2gsIG9wdGlvbnMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyB0aXRsZSwgZGVzY3JpcHRpb24sIGNhdGVnb3J5IH0gPSBvcHRpb25zO1xuICAgIGlmICghdG9kb1dpdGhpbiB8fCB0b2RvV2l0aGluID09PSAnJykge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VJbmZvKGxhYmVscy5tc2dTZWxlY3REYXRlKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRpc3BhdGNoKGFkZFRhc2soXG4gICAgICB0aXRsZSwgZGVzY3JpcHRpb24sXG4gICAgICBjYXRlZ29yeSwgdG9kb1dpdGhpbiwgdGhpcy5vblRvZG9UYXNrQ3JlYXRlZCxcbiAgICApKTtcbiAgfVxuXG4gIG9uVG9kb1Rhc2tDcmVhdGVkKCkge1xuICAgIGNvbnN0IHsgb25OZXh0IH0gPSB0aGlzLnByb3BzO1xuICAgIG9uTmV4dCh7IHN0ZXBJZDogRE9ORSwgb3B0aW9uczogeyB9IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgdG9kb1dpdGhpbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LXNlbGVjdC1jb21wbGV0ZS1kYXRlXCI+XG4gICAgICAgIDxoMj57bGFiZWxzLnRpdGxlVG9kb1dpdGhpbn08L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtaW5wdXRcIj5cbiAgICAgICAgICA8RGF0ZVBpY2tlclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICBjYWxlbmRhckNsYXNzTmFtZT1cImRhcmstY2FsZW5kYXJcIlxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dERhdGVDaGFuZ2V9XG4gICAgICAgICAgICB2YWx1ZT17dG9kb1dpdGhpbn1cbiAgICAgICAgICAgIG1pbkRhdGU9e25ldyBEYXRlKCl9XG4gICAgICAgICAgICBsb2NhbGU9XCJlbi1VU1wiXG4gICAgICAgICAgICBjbGVhckljb249ezxpIGNsYXNzTmFtZT1cImljb24tZGVsZXRlXCIgLz59XG4gICAgICAgICAgICBjYWxlbmRhckljb249ezxpIGNsYXNzTmFtZT1cImljb24tY2FsZW5kYXJcIiAvPn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQnV0dG9uQWRkQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xhYmVscy5idXR0b25BZGR9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TZWxlY3RDb21wbGV0ZURhdGUucHJvcFR5cGVzID0ge1xuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb3B0aW9uczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY2F0ZWdvcnk6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIH0pLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoKShTZWxlY3RDb21wbGV0ZURhdGUpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IFN0ZXAgPSAoeyBkZXNjcmlwdGlvbiwgY29tcGxldGVkLCBuZWVkTGluZSB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1jb250YWluZXJcIj5cbiAgICB7XG4gICAgICBuZWVkTGluZSAmJlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BsaW5lICR7KGNvbXBsZXRlZCkgPyAnY29tcGxldGVkJyA6ICcnfWB9IC8+XG4gICAgfVxuICAgIDxkaXYgY2xhc3NOYW1lPXtgc3RlcCAkeyhjb21wbGV0ZWQpID8gJ2NvbXBsZXRlZCcgOiAnJ31gfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5kaWNhdG9yXCIgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1kZXNjcmlwdGlvblwiPlxuICAgICAgICA8cD57ZGVzY3JpcHRpb259PC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuU3RlcC5wcm9wVHlwZXMgPSB7XG4gIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgbmVlZExpbmU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5jb25zdCBTdGVwcyA9ICh7IGxpc3QsIHN0ZXBIaXN0b3J5IH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJzdGVwcy13cmFwcGVyXCI+XG4gICAge1xuICAgICAgbGlzdC5tYXAoKGl0ZW0sIGkpID0+IChcbiAgICAgICAgPFN0ZXBcbiAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgey4uLml0ZW19XG4gICAgICAgICAgY29tcGxldGVkPXtzdGVwSGlzdG9yeS5maWx0ZXIoc2ggPT4gc2guc3RlcElkID09PSBpdGVtLmlkKS5sZW5ndGggPiAwfVxuICAgICAgICAgIG5lZWRMaW5lPXtpID4gMH1cbiAgICAgICAgLz4pKVxuICAgIH1cbiAgPC9kaXY+XG4pO1xuXG5TdGVwcy5wcm9wVHlwZXMgPSB7XG4gIGxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICBzdGVwSGlzdG9yeTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBzdGVwSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH0pKS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3RlcHM7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgQnV0dG9uQ29tcGxldGVUYXNrID0gKHsgb25DbGljaywgY29tcGxldGVkIH0pID0+IChcbiAgPGJ1dHRvblxuICAgIGNsYXNzTmFtZT17YGJ1dHRvbi1jb21wbGV0ZS10YXNrICR7KGNvbXBsZXRlZCkgPyAnYnV0dG9uLWNvbXBsZXRlZC10YXNrJyA6ICcnfWB9XG4gICAgb25DbGljaz17b25DbGlja31cbiAgPlxuICAgIDxpIGNsYXNzTmFtZT1cImljb24tY2hlY2tcIiAvPlxuICA8L2J1dHRvbj5cbik7XG5cbkJ1dHRvbkNvbXBsZXRlVGFzay5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5CdXR0b25Db21wbGV0ZVRhc2suZGVmYXVsdFByb3BzID0ge1xuICBjb21wbGV0ZWQ6IGZhbHNlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uQ29tcGxldGVUYXNrO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEJ1dHRvbkRlbGV0ZVRhc2sgPSAoeyBvbkNsaWNrIH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24tZGVsZXRlLXRhc2tcIiBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICA8aSBjbGFzc05hbWU9XCJpY29uLWRlbGV0ZVwiIC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uRGVsZXRlVGFzay5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25EZWxldGVUYXNrO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQ29sbGFwc2UgZnJvbSAnLi4vLi4vYW5pbXMvQ29sbGFwc2UnO1xuaW1wb3J0IEZhZGUgZnJvbSAnLi4vLi4vYW5pbXMvRmFkZSc7XG5pbXBvcnQgQnV0dG9uQ29tcGxldGVUYXNrIGZyb20gJy4vQnV0dG9uQ29tcGxldGVUYXNrJztcbmltcG9ydCBCdXR0b25EZWxldGVUYXNrIGZyb20gJy4vQnV0dG9uRGVsZXRlVGFzayc7XG5pbXBvcnQgeyB0b1NpbXBsZURhdGVGb3JtYXQgfSBmcm9tICcuLi8uLi8uLi91dGlscy9Db21tb24nO1xuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvbGFiZWxzJztcblxuY2xhc3MgVGFzayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgIH07XG4gICAgdGhpcy5yZW5kZXJEYXRlID0gdGhpcy5yZW5kZXJEYXRlLmJpbmQodGhpcyk7XG4gIH1cblxuICBvblRpdGxlQ2xpY2soKSB7XG4gICAgY29uc3QgeyBjb2xsYXBzZWQgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGNvbGxhcHNlZDogIWNvbGxhcHNlZCB9KTtcbiAgfVxuXG4gIHJlbmRlckRhdGUoKSB7XG4gICAgY29uc3QgeyB0YXNrIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICh0YXNrLmNvbXBsZXRlZCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHAgY2xhc3NOYW1lPVwiY29tcGxldGUtZGF0ZVwiPntgJHtsYWJlbHMubGFiZWxQYXJ0aWFsQ29tcGxldGVkfSAkeyh0YXNrLmNvbXBsZXRlZEF0KSA/IHRvU2ltcGxlRGF0ZUZvcm1hdCh0YXNrLmNvbXBsZXRlZEF0KSA6ICcnfWB9PC9wPlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxwIGNsYXNzTmFtZT1cImNvbXBsZXRlLXdpdGhpbi1kYXRlXCI+e2Ake2xhYmVscy5sYWJlbFBhcnRpYWxUb0NvbXBsZXRlZH0gJHsodGFzay50b2RvV2l0aGluKSA/IHRvU2ltcGxlRGF0ZUZvcm1hdCh0YXNrLnRvZG9XaXRoaW4pIDogbGFiZWxzLmxhYmVsTm90U2V0fWB9PC9wPlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB0YXNrLCBvbkRlbGV0ZSwgb25Db21wbGV0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGNvbGxhcHNlZCB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YXNrLWl0ZW1cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YXNrLWhlYWRlclwiPlxuICAgICAgICAgIDxwXG4gICAgICAgICAgICBjbGFzc05hbWU9e2B0YXNrLXRpdGxlICR7KHRhc2suY29tcGxldGVkKSA/ICd0YXNrLXRpdGxlLWNvbXBsZXRlZCcgOiAnJ31gfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5vblRpdGxlQ2xpY2soKX1cbiAgICAgICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0YXNrLnRpdGxlfVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8RmFkZSBpbj17Y29sbGFwc2VkfT5cbiAgICAgICAgICAgIDxCdXR0b25EZWxldGVUYXNrXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uRGVsZXRlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0ZhZGU+XG4gICAgICAgICAge1xuICAgICAgICAgICAgb25Db21wbGV0ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICA8QnV0dG9uQ29tcGxldGVUYXNrXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ29tcGxldGV9XG4gICAgICAgICAgICAgIGNvbXBsZXRlZD17dGFzay5jb21wbGV0ZWR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFzay1kYXRlXCI+XG4gICAgICAgICAge3RoaXMucmVuZGVyRGF0ZSgpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPENvbGxhcHNlIGluPXtjb2xsYXBzZWR9PlxuICAgICAgICAgIDxkaXYga2V5PXt0YXNrLmRlc2NyaXB0aW9ufSBjbGFzc05hbWU9XCJ0YXNrLWJvZHlcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRhc2stZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICh0YXNrLmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQgJiYgdGFzay5kZXNjcmlwdGlvbiAhPT0gJycpXG4gICAgICAgICAgICAgICAgPyB0YXNrLmRlc2NyaXB0aW9uIDogPHNwYW4gY2xhc3NOYW1lPVwiZW1wdHlcIj57bGFiZWxzLmxhYmVsTm9EZXNjcmlwdGlvbn08L3NwYW4+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Db2xsYXBzZT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuVGFzay5wcm9wVHlwZXMgPSB7XG4gIG9uRGVsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25Db21wbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIHRhc2s6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBjb21wbGV0ZWRBdDogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgfSkuaXNSZXF1aXJlZCxcbn07XG5cblRhc2suZGVmYXVsdFByb3BzID0ge1xuICBvbkRlbGV0ZTogdW5kZWZpbmVkLFxuICBvbkNvbXBsZXRlOiB1bmRlZmluZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBUYXNrO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uR3JvdXAgfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcbmltcG9ydCBSZXNpemUgZnJvbSAnLi4vLi4vYW5pbXMvUmVzaXplJztcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XG5pbXBvcnQgSW5maW5pdGVTY3JvbGwgZnJvbSAnLi4vLi4vbGF5b3V0L0luZmluaXRlU2Nyb2xsJztcbmltcG9ydCB7IHF1ZXJ5SXRlbXNMaW1pdCB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9jb25maWcnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGxpbWl0OiBxdWVyeUl0ZW1zTGltaXQsXG4gIHNraXA6IDAsXG59O1xuXG5jbGFzcyBUYXNrcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSBpbml0aWFsU3RhdGU7XG4gICAgdGhpcy5vbkZldGNoVG9kb1Rhc2tzTmV4dCA9IHRoaXMub25GZXRjaFRvZG9UYXNrc05leHQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMobmV4dFByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICBpZiAobmV4dFByb3BzLnNraXAgIT09IHByZXZTdGF0ZS5za2lwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBza2lwOiBuZXh0UHJvcHMuc2tpcCxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgb25GZXRjaFRvZG9UYXNrc05leHQoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsXG4gICAgICBmZXRjaFRhc2tzLCBtb3JlVG9Mb2FkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghbW9yZVRvTG9hZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7IGxpbWl0LCBza2lwIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IG5ld1NraXAgPSBza2lwICsgbGltaXQ7XG4gICAgZmV0Y2hUYXNrcyhjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCwgbGltaXQsIG5ld1NraXApO1xuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHsgc2tpcDogc3RhdGUuc2tpcCArIHN0YXRlLmxpbWl0IH0pKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB0YXNrTGlzdCxcbiAgICAgIG9uRGVsZXRlVGFzayxcbiAgICAgIG9uQ29tcGxldGVUYXNrLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiY29udGVudC10b2RvLXRhc2tzXCI+XG4gICAgICAgIDxJbmZpbml0ZVNjcm9sbCBvblNjcm9sbD17dGhpcy5vbkZldGNoVG9kb1Rhc2tzTmV4dH0+XG4gICAgICAgICAgPFRyYW5zaXRpb25Hcm91cD5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGFza0xpc3QubWFwKGFyZyA9PiAoXG4gICAgICAgICAgICAgICAgPFJlc2l6ZSBrZXk9e2FyZy5pZH0+XG4gICAgICAgICAgICAgICAgICA8VGFza1xuICAgICAgICAgICAgICAgICAgICBrZXk9e2FyZy5pZH1cbiAgICAgICAgICAgICAgICAgICAgdGFzaz17YXJnfVxuICAgICAgICAgICAgICAgICAgICBvbkRlbGV0ZT17KCkgPT4gb25EZWxldGVUYXNrKGFyZyl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9eygpID0+IG9uQ29tcGxldGVUYXNrKGFyZyl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvUmVzaXplPlxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvVHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICA8L0luZmluaXRlU2Nyb2xsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5UYXNrcy5wcm9wVHlwZXMgPSB7XG4gIG9uRGVsZXRlVGFzazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25Db21wbGV0ZVRhc2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHRhc2tMaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIG1vcmVUb0xvYWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGZldGNoVGFza3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNhdGVnb3JpZXNJZDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZykuaXNSZXF1aXJlZCxcbiAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVGFza3M7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBWaXNpYmlsaXR5U3dpdGNoIGZyb20gJy4vVmlzaWJpbGl0eVN3aXRjaCc7XG5pbXBvcnQgeyBBTExfVE9ET1MsIE9OTFlfQ09NUExFVEVELCBPTkxZX1RPX0NPTVBMRVRFIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmNvbnN0IFZpc2liaWxpdHlGaWx0ZXIgPSAoe1xuICBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIsIG9uVmlzaWJpbGl0eVN3aXRjaENsaWNrLFxufSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cInZpc2liaWxpdHktZmlsdGVyLXdyYXBwZXJcIj5cbiAgICA8VmlzaWJpbGl0eVN3aXRjaFxuICAgICAgc2VsZWN0ZWQ9eyhzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IE9OTFlfVE9fQ09NUExFVEVcbiAgICAgICAgfHwgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyID09PSBBTExfVE9ET1MpfVxuICAgICAgb25DbGljaz17b25WaXNpYmlsaXR5U3dpdGNoQ2xpY2soT05MWV9UT19DT01QTEVURSl9XG4gICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICA+XG4gICAgICA8aSBjbGFzc05hbWU9XCJpY29uLWNpcmNsZS1ib3JkZXJcIiAvPlxuICAgIDwvVmlzaWJpbGl0eVN3aXRjaD5cbiAgICA8VmlzaWJpbGl0eVN3aXRjaFxuICAgICAgc2VsZWN0ZWQ9eyhzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IE9OTFlfQ09NUExFVEVEXG4gICAgICAgIHx8IHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciA9PT0gQUxMX1RPRE9TKX1cbiAgICAgIG9uQ2xpY2s9e29uVmlzaWJpbGl0eVN3aXRjaENsaWNrKE9OTFlfQ09NUExFVEVEKX1cbiAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgID5cbiAgICAgIDxpIGNsYXNzTmFtZT1cImljb24tY2lyY2xlXCIgLz5cbiAgICA8L1Zpc2liaWxpdHlTd2l0Y2g+XG4gIDwvZGl2PlxuKTtcblxuVmlzaWJpbGl0eUZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvblZpc2liaWxpdHlTd2l0Y2hDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFZpc2liaWxpdHlGaWx0ZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgVmlzaWJpbGl0eVN3aXRjaCA9ICh7XG4gIHNlbGVjdGVkLCBjaGlsZHJlbiwgb25DbGljayxcbn0pID0+IChcbiAgPGRpdlxuICAgIGNsYXNzTmFtZT17YHZpc2liaWxpdHktYnV0dG9uLXN3aXRjaCBhbGlnbi1pdGVtcy1jZW50ZXIgJHsoc2VsZWN0ZWQpID8gJ3NlbGVjdGVkJyA6ICcnfSBgfVxuICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gID5cbiAgICB7Y2hpbGRyZW59XG4gIDwvZGl2PlxuKTtcblxuVmlzaWJpbGl0eVN3aXRjaC5wcm9wVHlwZXMgPSB7XG4gIHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5WaXNpYmlsaXR5U3dpdGNoLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2VsZWN0ZWQ6IGZhbHNlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaWJpbGl0eVN3aXRjaDtcbiIsImNvbnN0IGxhYmVscyA9IHtcbiAgdGl0bGVBZGQ6ICdXaGF0IHdvdWxkIHlvdSBsaWtlIHRvIGFkZD8nLFxuICB0aXRsZUFkZENhdGVnb3J5OiAnQWRkIG5ldyBDQVRFR09SWScsXG4gIHRpdGxlQWRkVGFzazogJ0FkZCBuZXcgVGFzaycsXG4gIHRpdGxlQ2hvb3NlQ2F0ZWdvcnk6ICdDaG9vc2UgYSBDQVRFR09SWScsXG4gIHRpdGxlVG9kb1dpdGhpbjogJ1RvZG8gV2l0aGluJyxcbiAgbGFiZWxGb3JDYXRlZ29yeTogJ2ZvciB0aGUgY2F0ZWdvcnk6JyxcbiAgbGFiZWxEb25lOiAnRG9uZSEnLFxuICBsYWJlbENhdGVnb3J5OiAnQ0FURUdPUlknLFxuICBsYWJlbFRhc2s6ICdUQVNLJyxcbiAgbGFiZWxOb3RTZXQ6ICdub3Qgc2V0JyxcbiAgbGFiZWxOb0Rlc2NyaXB0aW9uOiAnTm8gZGVzY3JpcHRpb24gdG8gc2hvdyA6KCcsXG4gIGxhYmVsUGFydGlhbENvbXBsZXRlZDogJ2NvbXBsZXRlZCcsXG4gIGxhYmVsUGFydGlhbFRvQ29tcGxldGVkOiAndG8gY29tcGxldGUgd2l0aGluJyxcbiAgcGxhY2VIb2xkZXJUaXRsZTogJ1R5cGUgdGhlIHRpdGxlJyxcbiAgcGxhY2VIb2xkZXJEZXNjcmlwdGlvbjogJ1R5cGUgdGhlIGRlc2NyaXB0aW9uJyxcbiAgcGxhY2Vob2xkZXJOYW1lOiAnVHlwZSB0aGUgbmFtZScsXG4gIGJ1dHRvblNjaGVkdWxlOiAnU0NIRURVTEUnLFxuICBidXR0b25BZGQ6ICdBREQnLFxuICBidXR0b25OZXh0OiAnTkVYVCcsXG4gIGJ1dHRvbkJhY2s6ICdORVZFUiBNSU5ELCBHTyBCQUNLJyxcbiAgbXNnVGl0bGVSZXF1aXJlZDogJ0VudGVyIHRoZSB0aXRsZScsXG4gIG1zZ05hbWVSZXF1aXJlZDogJ0VudGVyIHRoZSBuYW1lJyxcbiAgbXNnU2VsZWN0Q2F0ZWdvcnk6ICdTZWxlY3QgYSBjYXRlZ29yeScsXG4gIG1zZ1NlbGVjdERhdGU6ICdQaWNrIGEgZGF0ZSBhbmQgY29tbWl0LiBObyBleGN1c2VzIScsXG4gIHN0ZXBEZXNjV2FudFRvQWRkOiAnV2hhdCB3YW50IHRvIGFkZCcsXG4gIHN0ZXBEZXNjQWRkQ2F0ZWdvcnk6ICdBZGQgYSBjYXRlZ29yeScsXG4gIHN0ZXBEZXNjclNlbGVjQ2F0ZWdvcnk6ICdTZWxlY3QgYSBjYXRlZ29yeScsXG4gIHN0ZXBEZXNjQWRkVGFzazogJ0FkZCB0YXNrJyxcbiAgc3RlcERlc2NDb21wbGV0ZURhdGU6ICdTY2hlZHVsZScsXG4gIHN0ZXBEZXNjRG9uZTogJ1RoYXRcXCdzIGl0Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxhYmVscztcbiIsImltcG9ydCBsYWJlbHMgZnJvbSAnLi9sYWJlbHMnO1xuXG5leHBvcnQgY29uc3QgU0VMRUNUX1dBTlRfVE9fQUREID0gJ1NFTEVDVF9XQU5UX1RPX0FERCc7XG5leHBvcnQgY29uc3QgQUREX0NBVEVHT1JZID0gJ0FERF9DQVRFR09SWSc7XG5leHBvcnQgY29uc3QgQUREX1RBU0sgPSAnQUREX1RBU0snO1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9DQVRFR09SWSA9ICdTRUxFQ1RfQ0FURUdPUlknO1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9DT01QTEVURV9EQVRFID0gJ1NFTEVDVF9DT01QTEVURV9EQVRFJztcbmV4cG9ydCBjb25zdCBET05FID0gJ0RPTkUnO1xuXG5leHBvcnQgY29uc3Qgc3RlcExpc3QgPSBbXG4gIHtcbiAgICBpZDogU0VMRUNUX1dBTlRfVE9fQURELFxuICAgIGRlc2NyaXB0aW9uOiBsYWJlbHMuc3RlcERlc2NXYW50VG9BZGQsXG4gIH0sXG4gIHtcbiAgICBpZDogQUREX0NBVEVHT1JZLFxuICAgIGRlc2NyaXB0aW9uOiBsYWJlbHMuc3RlcERlc2NBZGRDYXRlZ29yeSxcbiAgfSxcbiAge1xuICAgIGlkOiBTRUxFQ1RfQ0FURUdPUlksXG4gICAgZGVzY3JpcHRpb246IGxhYmVscy5zdGVwRGVzY3JTZWxlY0NhdGVnb3J5LFxuICB9LFxuICB7XG4gICAgaWQ6IEFERF9UQVNLLFxuICAgIGRlc2NyaXB0aW9uOiBsYWJlbHMuc3RlcERlc2NBZGRUYXNrLFxuICB9LFxuICB7XG4gICAgaWQ6IFNFTEVDVF9DT01QTEVURV9EQVRFLFxuICAgIGRlc2NyaXB0aW9uOiBsYWJlbHMuc3RlcERlc2NDb21wbGV0ZURhdGUsXG4gIH0sXG4gIHtcbiAgICBpZDogRE9ORSxcbiAgICBkZXNjcmlwdGlvbjogbGFiZWxzLnN0ZXBEZXNjRG9uZSxcbiAgfSxcbl07XG4iLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IENhdGVnb3JpZXNGaWx0ZXIgZnJvbSAnLi4vY29tcG9uZW50cy90b2RvL2NhdGVnb3J5L0NhdGVnb3JpZXNGaWx0ZXInO1xuaW1wb3J0IHtcbiAgc2VsZWN0Q2F0ZWdvcnksXG4gIHNlbGVjdENhdGVnb3J5QWxsLFxuICBkZWxldGVDYXRlZ29yeSxcbn0gZnJvbSAnLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuaW1wb3J0IGNhdGVnb3J5QWxsIGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuXG5pbXBvcnQgeyBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdCB9IGZyb20gJy4uL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IChcbiAge1xuICAgIGNhdGVnb3J5TGlzdDogZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3Qoc3RhdGUpLFxuICB9XG4pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoXG4gIHtcbiAgICBvbkRlbGV0ZUNhdGVnb3J5OiAoY2F0ZWdvcnkpID0+IHtcbiAgICAgIGRpc3BhdGNoKGRlbGV0ZUNhdGVnb3J5KGNhdGVnb3J5LmlkKSk7XG4gICAgfSxcbiAgICBvbkNpbGNrQ2F0ZWdvcnk6IChjYXRlZ29yeSwgZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2knICYmIGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2J1dHRvbicpIHtcbiAgICAgICAgaWYgKGNhdGVnb3J5LmlkID09PSBjYXRlZ29yeUFsbC5pZCkge1xuICAgICAgICAgIGRpc3BhdGNoKHNlbGVjdENhdGVnb3J5QWxsKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpc3BhdGNoKHNlbGVjdENhdGVnb3J5KGNhdGVnb3J5KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICB9XG4pO1xuXG5jb25zdCBDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyID0gY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pKENhdGVnb3JpZXNGaWx0ZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyO1xuIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBUYXNrcyBmcm9tICcuLi9jb21wb25lbnRzL3RvZG8vdGFzay9UYXNrcyc7XG5pbXBvcnQge1xuICBmZXRjaFRhc2tzQnlDYXRlZ29yeSxcbiAgZGVsZXRlVGFzayxcbiAgdG9vZ2xlVGFza0NvbXBsZXRlZCxcbn0gZnJvbSAnLi4vYWN0aW9ucy90b2RvVGFza3NBY3Rpb25zJztcblxuaW1wb3J0IHsgZ2V0VGFza0xpc3QsIGdldFNraXAsIHN0aWxsTW9yZVRvTG9hZCB9IGZyb20gJy4uL3NlbGVjdG9ycy90b2RvVGFza3NTZWxlY3RvcnMnO1xuaW1wb3J0IHsgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQsIHZpc2liaWxpdHlPbmx5Q29tcGxldGVkIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgdGFza0xpc3Q6IGdldFRhc2tMaXN0KHN0YXRlKSxcbiAgICBza2lwOiBnZXRTa2lwKHN0YXRlKSxcbiAgICBtb3JlVG9Mb2FkOiBzdGlsbE1vcmVUb0xvYWQoc3RhdGUpLFxuICAgIGNhdGVnb3JpZXNJZDogZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQoc3RhdGUpLFxuICAgIGNvbXBsZXRlZDogdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQoc3RhdGUpLFxuICB9XG4pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoXG4gIHtcbiAgICBvbkRlbGV0ZVRhc2s6ICh0YXNrKSA9PiB7XG4gICAgICBkaXNwYXRjaChkZWxldGVUYXNrKHRhc2suaWQpKTtcbiAgICB9LFxuICAgIG9uQ29tcGxldGVUYXNrOiAodGFzaykgPT4ge1xuICAgICAgZGlzcGF0Y2godG9vZ2xlVGFza0NvbXBsZXRlZCh0YXNrLmlkLCB0YXNrLmNvbXBsZXRlZCkpO1xuICAgIH0sXG4gICAgZmV0Y2hUYXNrczogKGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgc2tpcCkgPT4ge1xuICAgICAgZGlzcGF0Y2goZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkoY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsIGxpbWl0LCBza2lwKSk7XG4gICAgfSxcbiAgfVxuKTtcblxuY29uc3QgVGFza3NDb250YWluZXIgPSBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbikoVGFza3MpO1xuXG5leHBvcnQgZGVmYXVsdCBUYXNrc0NvbnRhaW5lcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgVG9kb3MgZnJvbSAnLi4vY29tcG9uZW50cy90b2RvL1RvZG9zJztcbmltcG9ydCB7IGZldGNoQWxsQ2F0ZWdvcmllcyB9IGZyb20gJy4uL2FjdGlvbnMvdG9kb0ZpbHRlcnNBY3Rpb25zJztcbmltcG9ydCB7IGhpZGVNZXNzYWdlIH0gZnJvbSAnLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5pbXBvcnQgeyBzaG93TG9hZGluZyB9IGZyb20gJy4uL3NlbGVjdG9ycy9jb21tb25TZWxlY3RvcnMnO1xuXG5jb25zdCBUb2Rvc0NvbnRhaW5lciA9IHByb3BzID0+IDxUb2RvcyB7Li4ucHJvcHN9IC8+O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICBtZXNzYWdlOiBzdGF0ZS5tZXNzYWdlLFxuICAgIHNob3dMb2FkaW5nOiBzaG93TG9hZGluZyhzdGF0ZSksXG4gIH1cbik7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcbiAge1xuICAgIGhpZGVNZXNzYWdlOiAoKSA9PiB7XG4gICAgICBkaXNwYXRjaChoaWRlTWVzc2FnZSgpKTtcbiAgICB9LFxuICAgIGluaXRGZXRjaEFsbENhdGVnb3JpZXM6ICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKGZldGNoQWxsQ2F0ZWdvcmllcygpKTtcbiAgICB9LFxuICB9XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShUb2Rvc0NvbnRhaW5lcik7XG4iLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpc2liaWxpdHlGaWx0ZXJzIGZyb20gJy4uL2NvbXBvbmVudHMvdG9kby92aXNpYmlsaXR5L1Zpc2liaWxpdHlGaWx0ZXJzJztcbmltcG9ydCB7IGNoYW5nZVZpc2liaWxpdHkgfSBmcm9tICcuLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5cbmltcG9ydCB7IGdldFZpc2liaWxpdHlGaWx0ZXIgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXI6IGdldFZpc2liaWxpdHlGaWx0ZXIoc3RhdGUpLFxuICB9XG4pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoXG4gIHtcbiAgICBvblZpc2liaWxpdHlTd2l0Y2hDbGljazogdmlzaWJpbGl0eSA9PiAoKSA9PiAoXG4gICAgICBkaXNwYXRjaChjaGFuZ2VWaXNpYmlsaXR5KHZpc2liaWxpdHkpKVxuICAgICksXG4gIH1cbik7XG5cbmNvbnN0IFZpc2liaWxpdHlGaWx0ZXJDb250YWluZXIgPSBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbikoVmlzaWJpbGl0eUZpbHRlcnMpO1xuXG5leHBvcnQgZGVmYXVsdCBWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyO1xuIiwiaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgeyBpc0ZldGNoaW5nQ2F0ZWdvcmllc0ZpbHRlciB9IGZyb20gJy4vdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuaW1wb3J0IHsgaXNGZXRjaGluZ1Rhc2tzIH0gZnJvbSAnLi90b2RvVGFza3NTZWxlY3RvcnMnO1xuXG5leHBvcnQgY29uc3Qgc2hvd0xvYWRpbmcgPSBjcmVhdGVTZWxlY3RvcihcbiAgaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIsXG4gIGlzRmV0Y2hpbmdUYXNrcyxcbiAgKGlzRmV0Y2hpbmdDYXRlZ29yaWVzLCBpc0ZldGNoaW5nVG9kb3MpID0+IGlzRmV0Y2hpbmdDYXRlZ29yaWVzIHx8IGlzRmV0Y2hpbmdUb2Rvcyxcbik7XG5cbmV4cG9ydCBkZWZhdWx0IHNob3dMb2FkaW5nO1xuIiwiaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgeyBPTkxZX0NPTVBMRVRFRCB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuXG5leHBvcnQgY29uc3QgaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy5pc0ZldGNoaW5nO1xuZXhwb3J0IGNvbnN0IGdldFRvZG9GaWx0ZXJzID0gc3RhdGUgPT4gc3RhdGUudG9kb0ZpbHRlcnM7XG5leHBvcnQgY29uc3QgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy5jYXRlZ29yaWVzO1xuZXhwb3J0IGNvbnN0IGdldFZpc2liaWxpdHlGaWx0ZXIgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy52aXNpYmlsaXR5O1xuXG5leHBvcnQgY29uc3QgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0VmlzaWJpbGl0eUZpbHRlcixcbiAgdmlzaWJpbGl0eSA9PiB2aXNpYmlsaXR5ID09PSBPTkxZX0NPTVBMRVRFRCxcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRTZWxlY3RlZENhdGVnb3JpZXNGaWx0ZXIgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QsXG4gIGNhdGVnb3JpZXMgPT4gY2F0ZWdvcmllcy5maWx0ZXIoY2F0ZWdvcnkgPT4gY2F0ZWdvcnkuc2VsZWN0ZWQpLFxuKTtcblxuZXhwb3J0IGNvbnN0IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0LFxuICBjYXRlZ29yaWVzID0+IGNhdGVnb3JpZXMuZmlsdGVyKGNhdGVnb3J5ID0+IGNhdGVnb3J5LnNlbGVjdGVkKVxuICAgIC5tYXAoY2F0ZWdvcnlGaWx0ZXIgPT4gY2F0ZWdvcnlGaWx0ZXIuaWQpLFxuKTtcbiIsImV4cG9ydCBjb25zdCBpc0ZldGNoaW5nVGFza3MgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvVGFza3MuaXNGZXRjaGluZztcbmV4cG9ydCBjb25zdCBnZXRUYXNrcyA9IHN0YXRlID0+IHN0YXRlLnRvZG9UYXNrcztcbmV4cG9ydCBjb25zdCBnZXRUYXNrTGlzdCA9IHN0YXRlID0+IHN0YXRlLnRvZG9UYXNrcy5pdGVtcztcbmV4cG9ydCBjb25zdCBnZXRTa2lwID0gc3RhdGUgPT4gc3RhdGUudG9kb1Rhc2tzLnNraXA7XG5leHBvcnQgY29uc3Qgc3RpbGxNb3JlVG9Mb2FkID0gc3RhdGUgPT4gc3RhdGUudG9kb1Rhc2tzLm1vcmVUb0xvYWQ7XG4iLCJpbXBvcnQgZGF0ZUZvcm1hdCBmcm9tICdkYXRlZm9ybWF0JztcblxuZXhwb3J0IGNvbnN0IHRvSnNEYXRlID0gKHBhcnNlRGF0ZSA9ICcnKSA9PlxuICBuZXcgRGF0ZShwYXJzZUludChwYXJzZURhdGUuc3Vic3RyKDYpLCAxMCkpO1xuXG5leHBvcnQgY29uc3QgdG9TaW1wbGVEYXRlRm9ybWF0ID0gZGF0ZSA9PlxuICBkYXRlRm9ybWF0KGRhdGUsICdkZGRkIGRkIG1tbSB5eXl5Jyk7XG5cbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50QmFzZVVybCA9ICgpID0+IHtcbiAgY29uc3QgZ2V0VXJsID0gd2luZG93LmxvY2F0aW9uO1xuICByZXR1cm4gYCR7Z2V0VXJsLnByb3RvY29sfS8vJHtnZXRVcmwuaG9zdH1gO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=