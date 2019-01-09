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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMvdG9kb1Rhc2tzQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9Db2xsYXBzZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvRGlhbG9nQW5pbS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvUmVzaXplLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9TbmFja2JhckFuaW0uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2xheW91dC9CdXR0b25TY29sbC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGF5b3V0L0luZmluaXRlU2Nyb2xsLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9sYXlvdXQvTWFpbkFkZEJ1dHRvbi5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGF5b3V0L1NuYWNrYmFyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL1RvZG9zLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL2NhdGVnb3J5L0J1dHRvbkRlbGV0ZUNhdGVnb3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL2NhdGVnb3J5L0NhdGVnb3JpZXNGaWx0ZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vY2F0ZWdvcnkvQ2F0ZWdvcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vZGlhbG9nQWRkL0FkZENhdGVnb3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL2RpYWxvZ0FkZC9BZGRUYXNrLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL2RpYWxvZ0FkZC9EaWFsb2dBZGQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vZGlhbG9nQWRkL0RvbmUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vZGlhbG9nQWRkL1NlbGVjdEFjdGlvbkFkZC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdG9kby9kaWFsb2dBZGQvU2VsZWN0Q2F0ZWdvcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vZGlhbG9nQWRkL1NlbGVjdENvbXBsZXRlRGF0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdG9kby9kaWFsb2dBZGQvU3RlcHMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vdGFzay9CdXR0b25Db21wbGV0ZVRhc2suanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vdGFzay9CdXR0b25EZWxldGVUYXNrLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL3Rhc2svVGFzay5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdG9kby90YXNrL1Rhc2tzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL3Zpc2liaWxpdHkvVmlzaWJpbGl0eUZpbHRlcnMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vdmlzaWJpbGl0eS9WaXNpYmlsaXR5U3dpdGNoLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2xhYmVscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL3N0ZXBzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL0NhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL1Rhc2tzQ29udGFpbmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9Ub2Rvc0NvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy9jb21tb25TZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0b3JzL3RvZG9UYXNrc1NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvQ29tbW9uLmpzIl0sIm5hbWVzIjpbImZldGNoVGFza3MiLCJzdGF0ZSIsImZldGNoVGFza3NCeUNhdGVnb3J5IiwiZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQiLCJ2aXNpYmlsaXR5T25seUNvbXBsZXRlZCIsInJlcXVlc3RGZXRjaEFsbENhdGVnb3JpZXMiLCJ0eXBlIiwiUkVRVUVTVF9GRVRDSF9BTExfQ0FURUdPUklFUyIsInJlY2VpdmVGZXRjaEFsbENhdGVnb3JpZXMiLCJjYXRlZ29yaWVzIiwiUkVDRUlWRV9GRVRDSF9BTExfQ0FURUdPUklFUyIsImVycm9yRmV0Y2hBbGxDYXRlZ29yaWVzIiwiZXJyb3IiLCJFUlJPUl9GRVRDSF9BTExfQ0FURUdPUklFUyIsImFkZENhdGVnb3J5TG9jYWwiLCJjYXRlZ29yeSIsIkFERF9DQVRFR09SWV9MT0NBTCIsInJlbW92ZUNhdGVnb3J5TG9jYWwiLCJjYXRlZ29yeUluZGV4IiwiUkVNT1ZFX0NBVEVHT1JZX0xPQ0FMIiwidG9vZ2xlU2VsZWN0Q2F0ZWdvcnkiLCJzZWxlY3RlZENhdGVnb3J5IiwiVE9PR0xFX1NFTEVDVF9DQVRFR09SWSIsInRvb2dsZVNlbGVjdENhdGVnb3J5QWxsIiwiVE9PR0xFX1NFTEVDVF9DQVRFR09SWV9BTEwiLCJzd2l0Y2hWaXNpYmlsaXR5RmlsdGVyIiwidmlzaWJpbGl0eSIsIlNXSVRDSF9WSVNJQklMSVRZX0ZJTFRFUiIsImZldGNoQWxsQ2F0ZWdvcmllcyIsImxpbWl0IiwicXVlcnlJdGVtc0xpbWl0Iiwic2tpcCIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJhY2Nlc3NUb2tlbiIsImF1dGgiLCJjYWxsQXBpIiwiTWV0aG9kcyIsIkdFVCIsInJlc3BvbnNlIiwic3VjY2VzcyIsImRhdGEiLCJzaG91bGRSZWZyZXNoVG9rZW4iLCJyZWZyZXNoQWNjZXNzVG9rZW4iLCJtZXNzYWdlIiwic2hvd01lc3NhZ2VFcnJvciIsImRlbGV0ZUNhdGVnb3J5IiwiY2F0ZWdvcnlJZCIsIkRFTEVURSIsInRvZG9GaWx0ZXJzIiwiZmluZEluZGV4IiwiaWQiLCJhZGRDYXRlZ29yeSIsIm5hbWUiLCJjYWxsYmFjayIsInVuZGVmaW5lZCIsIlBPU1QiLCJjaGFuZ2VWaXNpYmlsaXR5Iiwic2VsZWN0Q2F0ZWdvcnkiLCJzZWxlY3RDYXRlZ29yeUFsbCIsInJlcXVlc3RGZXRjaFRhc2tzIiwiUkVRVUVTVF9GRVRDSF9UQVNLUyIsInJlY2VpdmVGZXRjaFRhc2tzIiwidGFza3MiLCJSRUNFSVZFX0ZFVENIX1RBU0tTIiwiZXJyb3JGZXRjaFRhc2tzIiwiRVJST1JfRkVUQ0hfVEFTS1MiLCJhZGRUYXNrTG9jYWwiLCJ0YXNrIiwiQUREX1RBU0tfTE9DQUwiLCJyZW1vdmVUYXNrTG9jYWwiLCJ0YXNrSW5kZXgiLCJSRU1PVkVfVEFTS19MT0NBTCIsInVwZGF0ZVRhc2tMb2NhbCIsIlVQREFURV9UQVNLX0xPQ0FMIiwiY2F0ZWdvcmllc0lkIiwiY29tcGxldGVkIiwibWFwIiwiY29tcGxldGVkQXQiLCJEYXRlIiwidG9kb1dpdGhpbiIsImRlbGV0ZVRhc2siLCJpdGVtcyIsInRvZG9UYXNrcyIsInRvZG9Bcmd1bWVudEluZGV4IiwidG9kb0FyZ3VtZW50IiwiYWRkVGFzayIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJmZXRjaGVkVGFzayIsInRvb2dsZVRhc2tDb21wbGV0ZWQiLCJpc0NvbXBsZXRlZCIsIlBBVENIIiwiZHVyYXRpb24iLCJkZWZhdWx0U3R5bGUiLCJ0cmFuc2l0aW9uIiwiaGVpZ2h0Iiwib25FbnRlciIsIm5vZGUiLCJzdHlsZSIsImZpcnN0RWxlbWVudENoaWxkIiwib2Zmc2V0SGVpZ2h0Iiwib25FeGl0IiwiQ29sbGFwc2UiLCJpblByb3AiLCJpbiIsImNoaWxkcmVuIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiYm9vbCIsImlzUmVxdWlyZWQiLCJvcGFjaXR5IiwidHJhbnNpdGlvblN0eWxlcyIsImVudGVyaW5nIiwiZW50ZXJlZCIsImRpc3BsYXkiLCJEaWFsb2dBbmltIiwiZW50ZXIiLCJleGl0Iiwib25FbnRlcmVkIiwib25FeGl0ZWQiLCJSZXNpemUiLCJwcm9wcyIsImJvdHRvbSIsIlNuYWNrYmFyQW5pbSIsImN1c3RvbUNsYXNzIiwic3RyaW5nIiwiZGVmYXVsdFByb3BzIiwiQnV0dG9uU2Nyb2xsIiwib25DbGljayIsImRpcmVjdGlvbiIsImZ1bmMiLCJvbmVPZiIsIndhaXRUaW1lIiwiSW5maW5pdGVTY3JvbGwiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsInNjcm9sbFkiLCJkb2N1bWVudCIsImJvZHkiLCJhcmdzIiwib25TY3JvbGwiLCJhZGRFdmVudExpc3RlbmVyIiwidGhyb3R0bGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY2xhc3NOYW1lIiwiUmVhY3QiLCJDb21wb25lbnQiLCJhcnJheU9mIiwiYW55IiwiTWFpbkFkZEJ1dHRvbiIsIkFjdGlvbiIsInRleHQiLCJTbmFja2JhciIsIm9uQ2xvc2UiLCJzaG93Iiwic2V0VGltZW91dCIsImlzRXJyb3IiLCJhY3Rpb25UZXh0IiwiYWN0aW9uQ2xpY2siLCJ2ZXJ0aWNhbFBvc3Rpb24iLCJob3Jpem9udGFsUG9zaXRpb24iLCJudW1iZXIiLCJUb2RvcyIsImlzRGlhbG9nQWRkT3BlbiIsImluaXRGZXRjaEFsbENhdGVnb3JpZXMiLCJoaWRlTWVzc2FnZSIsInNob3dMb2FkaW5nIiwic2V0U3RhdGUiLCJzaGFwZSIsIkJ1dHRvbkRlbGV0ZUNhdGVnb3J5IiwiQ2F0ZWdvcmllc0ZpbHRlciIsImNoaXBzIiwibW92ZUNoaXBzU2Nyb2xsIiwiY2xpZW50V2lkdGgiLCJkZWx0YSIsIm5leHRTY3JvbGxMZWZ0Iiwic2Nyb2xsTGVmdCIsInNjcm9sbCIsImxlZnQiLCJjYXRlZ29yeUxpc3QiLCJvbkRlbGV0ZUNhdGVnb3J5Iiwib25DaWxja0NhdGVnb3J5IiwiaGFuZGxlTGVmdFNjcm9sbENsaWNrIiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJzZWxlY3RlZCIsImhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2siLCJDYXRlZ29yeSIsIm9uRGVsZXRlIiwiY3NzQ2xhc3MiLCJvbkNoaXBDbGljayIsImUiLCJvbkRlbGV0ZUNsaWNrIiwiQWRkQ2F0ZWdvcnkiLCJ0YXJnZXQiLCJ2YWx1ZSIsInNob3dNZXNzYWdlSW5mbyIsImxhYmVscyIsIm1zZ05hbWVSZXF1aXJlZCIsIm9uQ2F0ZWdvcnlDcmVhdGVkIiwib25OZXh0Iiwic3RlcElkIiwiQUREX1RBU0siLCJvcHRpb25zIiwidGl0bGVBZGRDYXRlZ29yeSIsInBsYWNlaG9sZGVyTmFtZSIsIm9uSW5wdXRUZXh0Q2hhbmdlIiwib25CdXR0b25BZGRDbGljayIsImJ1dHRvbkFkZCIsImNvbm5lY3QiLCJBZGRUYXNrIiwibXNnVGl0bGVSZXF1aXJlZCIsIlNFTEVDVF9DT01QTEVURV9EQVRFIiwidGl0bGVBZGRUYXNrIiwibGFiZWxGb3JDYXRlZ29yeSIsInBsYWNlSG9sZGVyVGl0bGUiLCJwbGFjZUhvbGRlckRlc2NyaXB0aW9uIiwib25CdXR0b25TY2hlZHVsZUNsaWNrIiwiYnV0dG9uU2NoZWR1bGUiLCJnZXRDb250ZW50VG9SZW5kZXIiLCJzdGVwcyIsImxlbmd0aCIsImxhc3RTdGVwIiwiU0VMRUNUX1dBTlRfVE9fQUREIiwiQUREX0NBVEVHT1JZIiwiU0VMRUNUX0NBVEVHT1JZIiwiRE9ORSIsImluaXRhbFN0YXRlIiwibmV4dFN0ZXBzIiwic2hvd1N0ZXAiLCJEaWFsb2dBZGQiLCJzdGVwQ291bnQiLCJzbGljZSIsInN0ZXAiLCJjb21wbGV0ZSIsImRvbmUiLCJvcGVuIiwib25SZXNldEFuZENsb3NlIiwib25BbmltYXRpb25FbmQiLCJzdGVwTGlzdCIsIm9uQmFjayIsImJ1dHRvbkJhY2siLCJEb25lIiwibGFiZWxEb25lIiwiU2VsZWN0QWN0aW9uQWRkIiwidGl0bGVBZGQiLCJsYWJlbENhdGVnb3J5IiwibGFiZWxUYXNrIiwiU2VsZWN0Q2F0ZWdvcnkiLCJtc2dTZWxlY3RDYXRlZ29yeSIsImNhdGVnb3JpZXNMaXN0IiwidGl0bGVDaG9vc2VDYXRlZ29yeSIsIm9uQ2F0ZWdvcnlDbGljayIsIm9uQnV0dG9uTmV4dENsaWNrIiwiYnV0dG9uTmV4dCIsIm1hcFN0YXRlVG9Qcm9wIiwiU2VsZWN0Q29tcGxldGVEYXRlIiwiZGF0ZSIsIm1zZ1NlbGVjdERhdGUiLCJvblRvZG9UYXNrQ3JlYXRlZCIsInRpdGxlVG9kb1dpdGhpbiIsIm9uSW5wdXREYXRlQ2hhbmdlIiwiU3RlcCIsIm5lZWRMaW5lIiwiU3RlcHMiLCJsaXN0Iiwic3RlcEhpc3RvcnkiLCJpdGVtIiwiaSIsImZpbHRlciIsInNoIiwiQnV0dG9uQ29tcGxldGVUYXNrIiwiQnV0dG9uRGVsZXRlVGFzayIsIlRhc2siLCJjb2xsYXBzZWQiLCJsYWJlbFBhcnRpYWxDb21wbGV0ZWQiLCJ0b1NpbXBsZURhdGVGb3JtYXQiLCJsYWJlbFBhcnRpYWxUb0NvbXBsZXRlZCIsImxhYmVsTm90U2V0Iiwib25Db21wbGV0ZSIsIm9uVGl0bGVDbGljayIsInJlbmRlckRhdGUiLCJsYWJlbE5vRGVzY3JpcHRpb24iLCJpbml0aWFsU3RhdGUiLCJUYXNrcyIsIm1vcmVUb0xvYWQiLCJuZXdTa2lwIiwidGFza0xpc3QiLCJvbkRlbGV0ZVRhc2siLCJvbkNvbXBsZXRlVGFzayIsIm9uRmV0Y2hUb2RvVGFza3NOZXh0IiwiYXJnIiwibmV4dFByb3BzIiwicHJldlN0YXRlIiwiVmlzaWJpbGl0eUZpbHRlciIsInNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciIsIm9uVmlzaWJpbGl0eVN3aXRjaENsaWNrIiwiT05MWV9UT19DT01QTEVURSIsIkFMTF9UT0RPUyIsIk9OTFlfQ09NUExFVEVEIiwiVmlzaWJpbGl0eVN3aXRjaCIsInN0ZXBEZXNjV2FudFRvQWRkIiwic3RlcERlc2NBZGRDYXRlZ29yeSIsInN0ZXBEZXNjclNlbGVjQ2F0ZWdvcnkiLCJzdGVwRGVzY0FkZFRhc2siLCJzdGVwRGVzY0NvbXBsZXRlRGF0ZSIsInN0ZXBEZXNjRG9uZSIsIm1hcFN0YXRlVG9Qcm9wcyIsImdldENhdGVnb3JpZXNGaWx0ZXJMaXN0IiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwiY2F0ZWdvcnlBbGwiLCJDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyIiwiZ2V0VGFza0xpc3QiLCJnZXRTa2lwIiwic3RpbGxNb3JlVG9Mb2FkIiwiVGFza3NDb250YWluZXIiLCJUb2Rvc0NvbnRhaW5lciIsImdldFZpc2liaWxpdHlGaWx0ZXIiLCJWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyIiwiVmlzaWJpbGl0eUZpbHRlcnMiLCJjcmVhdGVTZWxlY3RvciIsImlzRmV0Y2hpbmdDYXRlZ29yaWVzRmlsdGVyIiwiaXNGZXRjaGluZ1Rhc2tzIiwiaXNGZXRjaGluZ0NhdGVnb3JpZXMiLCJpc0ZldGNoaW5nVG9kb3MiLCJpc0ZldGNoaW5nIiwiZ2V0VG9kb0ZpbHRlcnMiLCJnZXRTZWxlY3RlZENhdGVnb3JpZXNGaWx0ZXIiLCJjYXRlZ29yeUZpbHRlciIsImdldFRhc2tzIiwidG9Kc0RhdGUiLCJwYXJzZURhdGUiLCJwYXJzZUludCIsInN1YnN0ciIsImRhdGVGb3JtYXQiLCJnZXRDdXJyZW50QmFzZVVybCIsImdldFVybCIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJob3N0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUEsVUFBVSxHQUFHLFNBQWJBLFVB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QSxDQUFqQjtBQUdBLElBQU0zRCxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQXFCLENBQUFuQixJQUFJO0FBQUEsU0FDcEMrRSxpREFBVSxDQUFDL0UsSUFBRCxFQUFPLGtCQUFQLENBRDBCO0FBQUEsQ0FBL0I7QUFHQSxJQUFNZ0YsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixHQUFNO0FBQ3JDLE1BQU1DLE1BQU0sR0FBRzVNLE1BQU0sQ0FBQzZNLFFBQXRCO0FBQ0EsbUJBQVVELE1BQU0sQ0FBQ0UsUUFBakIsZUFBOEJGLE1BQU0sQ0FBQ0csSUFBckM7QUFDRCxDQUhNLEMiLCJmaWxlIjoidG9kb3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjYWxsQXBpLCBNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvQXBpVXRpbHMnO1xuaW1wb3J0IHsgc2hvdWxkUmVmcmVzaFRva2VuIH0gZnJvbSAnLi4vdXRpbHMvUmVxdWVzdFV0aWxzJztcbmltcG9ydCB7IHJlZnJlc2hBY2Nlc3NUb2tlbiB9IGZyb20gJy4vYXV0aEFjdGlvbnMnO1xuaW1wb3J0IHtcbiAgUkVRVUVTVF9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgUkVDRUlWRV9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgRVJST1JfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gIEFERF9DQVRFR09SWV9MT0NBTCxcbiAgUkVNT1ZFX0NBVEVHT1JZX0xPQ0FMLFxuICBUT09HTEVfU0VMRUNUX0NBVEVHT1JZLFxuICBUT09HTEVfU0VMRUNUX0NBVEVHT1JZX0FMTCxcbiAgU1dJVENIX1ZJU0lCSUxJVFlfRklMVEVSLFxufSBmcm9tICcuLi9jb25zdGFudHMvYWN0aW9uVHlwZXMnO1xuaW1wb3J0IHsgcXVlcnlJdGVtc0xpbWl0IH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5pbXBvcnQgeyBmZXRjaFRhc2tzQnlDYXRlZ29yeSB9IGZyb20gJy4vdG9kb1Rhc2tzQWN0aW9ucyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUVycm9yIH0gZnJvbSAnLi9tZXNzYWdlQWN0aW9ucyc7XG5pbXBvcnQgeyBnZXRTZWxlY3RlZENhdGVnb3JpZXNJZCwgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuXG5jb25zdCBmZXRjaFRhc2tzID0gc3RhdGUgPT4gZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkoXG4gIGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkKHN0YXRlKSxcbiAgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQoc3RhdGUpLFxuKTtcblxuY29uc3QgcmVxdWVzdEZldGNoQWxsQ2F0ZWdvcmllcyA9ICgpID0+IChcbiAge1xuICAgIHR5cGU6IFJFUVVFU1RfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gIH1cbik7XG5cbmNvbnN0IHJlY2VpdmVGZXRjaEFsbENhdGVnb3JpZXMgPSBjYXRlZ29yaWVzID0+IChcbiAge1xuICAgIHR5cGU6IFJFQ0VJVkVfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gICAgY2F0ZWdvcmllcyxcbiAgfVxuKTtcblxuY29uc3QgZXJyb3JGZXRjaEFsbENhdGVnb3JpZXMgPSBlcnJvciA9PiAoXG4gIHtcbiAgICB0eXBlOiBFUlJPUl9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgICBlcnJvcixcbiAgfVxuKTtcblxuY29uc3QgYWRkQ2F0ZWdvcnlMb2NhbCA9IGNhdGVnb3J5ID0+IChcbiAge1xuICAgIHR5cGU6IEFERF9DQVRFR09SWV9MT0NBTCxcbiAgICBjYXRlZ29yeSxcbiAgfVxuKTtcblxuY29uc3QgcmVtb3ZlQ2F0ZWdvcnlMb2NhbCA9IGNhdGVnb3J5SW5kZXggPT4gKFxuICB7XG4gICAgdHlwZTogUkVNT1ZFX0NBVEVHT1JZX0xPQ0FMLFxuICAgIGNhdGVnb3J5SW5kZXgsXG4gIH1cbik7XG5cbmNvbnN0IHRvb2dsZVNlbGVjdENhdGVnb3J5ID0gc2VsZWN0ZWRDYXRlZ29yeSA9PiAoXG4gIHtcbiAgICB0eXBlOiBUT09HTEVfU0VMRUNUX0NBVEVHT1JZLFxuICAgIHNlbGVjdGVkQ2F0ZWdvcnksXG4gIH1cbik7XG5cbmNvbnN0IHRvb2dsZVNlbGVjdENhdGVnb3J5QWxsID0gKCkgPT4gKFxuICB7XG4gICAgdHlwZTogVE9PR0xFX1NFTEVDVF9DQVRFR09SWV9BTEwsXG4gIH1cbik7XG5cbmNvbnN0IHN3aXRjaFZpc2liaWxpdHlGaWx0ZXIgPSB2aXNpYmlsaXR5ID0+IChcbiAge1xuICAgIHR5cGU6IFNXSVRDSF9WSVNJQklMSVRZX0ZJTFRFUixcbiAgICB2aXNpYmlsaXR5LFxuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgZmV0Y2hBbGxDYXRlZ29yaWVzID0gKGxpbWl0ID0gcXVlcnlJdGVtc0xpbWl0LCBza2lwID0gMCkgPT5cbiAgYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGRpc3BhdGNoKHJlcXVlc3RGZXRjaEFsbENhdGVnb3JpZXMoKSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgYWNjZXNzVG9rZW4gfSA9IGdldFN0YXRlKCkuYXV0aDtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbEFwaSgnY2F0ZWdvcmllcycsIHsgbGltaXQsIHNraXAgfSwgTWV0aG9kcy5HRVQsIGFjY2Vzc1Rva2VuKTtcbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIGRpc3BhdGNoKHJlY2VpdmVGZXRjaEFsbENhdGVnb3JpZXMocmVzcG9uc2UuZGF0YSkpO1xuICAgICAgICBkaXNwYXRjaChmZXRjaFRhc2tzQnlDYXRlZ29yeShnZXRTZWxlY3RlZENhdGVnb3JpZXNJZChnZXRTdGF0ZSgpKSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNob3VsZFJlZnJlc2hUb2tlbihyZXNwb25zZSkpIHtcbiAgICAgICAgICBhd2FpdCBkaXNwYXRjaChyZWZyZXNoQWNjZXNzVG9rZW4oKSk7XG4gICAgICAgICAgZGlzcGF0Y2goZmV0Y2hBbGxDYXRlZ29yaWVzKGxpbWl0LCBza2lwKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRpc3BhdGNoKGVycm9yRmV0Y2hBbGxDYXRlZ29yaWVzKHJlc3BvbnNlLmVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5lcnJvci5tZXNzYWdlKSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICAgIH1cbiAgfTtcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZUNhdGVnb3J5ID0gKGNhdGVnb3J5SWQgPSAnJykgPT4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW4gfSA9IGdldFN0YXRlKCkuYXV0aDtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoJ2NhdGVnb3JpZXMnLCBjYXRlZ29yeUlkLCBNZXRob2RzLkRFTEVURSwgYWNjZXNzVG9rZW4pO1xuICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICBjb25zdCB7IGNhdGVnb3JpZXMgfSA9IGdldFN0YXRlKCkudG9kb0ZpbHRlcnM7XG4gICAgICBjb25zdCBjYXRlZ29yeUluZGV4ID0gY2F0ZWdvcmllcy5maW5kSW5kZXgoY2F0ZWdvcnkgPT4gY2F0ZWdvcnkuaWQgPT09IGNhdGVnb3J5SWQpO1xuICAgICAgZGlzcGF0Y2gocmVtb3ZlQ2F0ZWdvcnlMb2NhbChjYXRlZ29yeUluZGV4KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzaG91bGRSZWZyZXNoVG9rZW4ocmVzcG9uc2UpKSB7XG4gICAgICAgIGF3YWl0IGRpc3BhdGNoKHJlZnJlc2hBY2Nlc3NUb2tlbigpKTtcbiAgICAgICAgZGlzcGF0Y2goZGVsZXRlQ2F0ZWdvcnkoY2F0ZWdvcnlJZCkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLmVycm9yLm1lc3NhZ2UpKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbn07XG5cbi8qKlxuICogUmVxdWVzdCB0byBhZGQgYSBjYXRlZ29yeVxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgY2F0ZWdvcnkgbmFtZSB0byBhZGRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgbmVlZCB0byBoYW5kbGUgdGhlIGNhdGVnb3J5IGNyZWF0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGFkZENhdGVnb3J5ID0gKG5hbWUgPSAnJywgY2FsbGJhY2sgPSB1bmRlZmluZWQpID0+IGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGFjY2Vzc1Rva2VuIH0gPSBnZXRTdGF0ZSgpLmF1dGg7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKCdjYXRlZ29yaWVzJywgeyBuYW1lIH0sIE1ldGhvZHMuUE9TVCwgYWNjZXNzVG9rZW4pO1xuICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICBjb25zdCBjYXRlZ29yeSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICBkaXNwYXRjaChhZGRDYXRlZ29yeUxvY2FsKGNhdGVnb3J5KSk7XG4gICAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjYWxsYmFjayhjYXRlZ29yeSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzaG91bGRSZWZyZXNoVG9rZW4ocmVzcG9uc2UpKSB7XG4gICAgICAgIGF3YWl0IGRpc3BhdGNoKHJlZnJlc2hBY2Nlc3NUb2tlbigpKTtcbiAgICAgICAgZGlzcGF0Y2goYWRkQ2F0ZWdvcnkobmFtZSwgY2FsbGJhY2spKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5lcnJvci5tZXNzYWdlKSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY2hhbmdlVmlzaWJpbGl0eSA9IHZpc2liaWxpdHkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBkaXNwYXRjaChzd2l0Y2hWaXNpYmlsaXR5RmlsdGVyKHZpc2liaWxpdHkpKTtcbiAgcmV0dXJuIGRpc3BhdGNoKGZldGNoVGFza3MoZ2V0U3RhdGUoKSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdENhdGVnb3J5ID0gc2VsZWN0ZWRDYXRlZ29yeSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGRpc3BhdGNoKHRvb2dsZVNlbGVjdENhdGVnb3J5KHNlbGVjdGVkQ2F0ZWdvcnkpKTtcbiAgcmV0dXJuIGRpc3BhdGNoKGZldGNoVGFza3MoZ2V0U3RhdGUoKSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdENhdGVnb3J5QWxsID0gKCkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBkaXNwYXRjaCh0b29nbGVTZWxlY3RDYXRlZ29yeUFsbCgpKTtcbiAgcmV0dXJuIGRpc3BhdGNoKGZldGNoVGFza3MoZ2V0U3RhdGUoKSkpO1xufTtcbiIsImltcG9ydCB7IGNhbGxBcGksIE1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9BcGlVdGlscyc7XG5pbXBvcnQgeyBzaG91bGRSZWZyZXNoVG9rZW4gfSBmcm9tICcuLi91dGlscy9SZXF1ZXN0VXRpbHMnO1xuaW1wb3J0IHsgcmVmcmVzaEFjY2Vzc1Rva2VuIH0gZnJvbSAnLi9hdXRoQWN0aW9ucyc7XG5pbXBvcnQge1xuICBSRVFVRVNUX0ZFVENIX1RBU0tTLFxuICBSRUNFSVZFX0ZFVENIX1RBU0tTLFxuICBFUlJPUl9GRVRDSF9UQVNLUyxcbiAgQUREX1RBU0tfTE9DQUwsXG4gIFJFTU9WRV9UQVNLX0xPQ0FMLFxuICBVUERBVEVfVEFTS19MT0NBTCxcbn0gZnJvbSAnLi4vY29uc3RhbnRzL2FjdGlvblR5cGVzJztcbmltcG9ydCB7IHF1ZXJ5SXRlbXNMaW1pdCB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VFcnJvciB9IGZyb20gJy4vbWVzc2FnZUFjdGlvbnMnO1xuXG5jb25zdCByZXF1ZXN0RmV0Y2hUYXNrcyA9IChsaW1pdCwgc2tpcCkgPT4gKFxuICB7XG4gICAgdHlwZTogUkVRVUVTVF9GRVRDSF9UQVNLUyxcbiAgICBsaW1pdCxcbiAgICBza2lwLFxuICB9XG4pO1xuXG5jb25zdCByZWNlaXZlRmV0Y2hUYXNrcyA9IHRhc2tzID0+IChcbiAge1xuICAgIHR5cGU6IFJFQ0VJVkVfRkVUQ0hfVEFTS1MsXG4gICAgdGFza3MsXG4gIH1cbik7XG5cbmNvbnN0IGVycm9yRmV0Y2hUYXNrcyA9IGVycm9yID0+IChcbiAge1xuICAgIHR5cGU6IEVSUk9SX0ZFVENIX1RBU0tTLFxuICAgIGVycm9yLFxuICB9XG4pO1xuXG5jb25zdCBhZGRUYXNrTG9jYWwgPSB0YXNrID0+IChcbiAge1xuICAgIHR5cGU6IEFERF9UQVNLX0xPQ0FMLFxuICAgIHRhc2ssXG4gIH1cbik7XG5cbmNvbnN0IHJlbW92ZVRhc2tMb2NhbCA9IHRhc2tJbmRleCA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRU1PVkVfVEFTS19MT0NBTCxcbiAgICB0YXNrSW5kZXgsXG4gIH1cbik7XG5cbmNvbnN0IHVwZGF0ZVRhc2tMb2NhbCA9IHRhc2sgPT4gKFxuICB7XG4gICAgdHlwZTogVVBEQVRFX1RBU0tfTE9DQUwsXG4gICAgdGFzayxcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGZldGNoVGFza3NCeUNhdGVnb3J5ID0gKFxuICBjYXRlZ29yaWVzSWQgPSBbXSxcbiAgY29tcGxldGVkID0gZmFsc2UsXG4gIGxpbWl0ID0gcXVlcnlJdGVtc0xpbWl0LFxuICBza2lwID0gMCxcbikgPT4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBkaXNwYXRjaChyZXF1ZXN0RmV0Y2hUYXNrcyhsaW1pdCwgc2tpcCkpO1xuICB0cnkge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW4gfSA9IGdldFN0YXRlKCkuYXV0aDtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoJ3Rhc2tzJywge1xuICAgICAgY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsIGxpbWl0LCBza2lwLFxuICAgIH0sIE1ldGhvZHMuR0VULCBhY2Nlc3NUb2tlbik7XG4gICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgIGNvbnN0IHRhc2tzID0gcmVzcG9uc2UuZGF0YS5tYXAodGFzayA9PlxuICAgICAgICAoe1xuICAgICAgICAgIC4uLnRhc2ssXG4gICAgICAgICAgY29tcGxldGVkQXQ6ICh0YXNrLmNvbXBsZXRlZEF0KSA/IG5ldyBEYXRlKHRhc2suY29tcGxldGVkQXQpIDogdW5kZWZpbmVkLFxuICAgICAgICAgIHRvZG9XaXRoaW46ICh0YXNrLnRvZG9XaXRoaW4pID8gbmV3IERhdGUodGFzay50b2RvV2l0aGluKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgfSkpO1xuICAgICAgZGlzcGF0Y2gocmVjZWl2ZUZldGNoVGFza3ModGFza3MpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNob3VsZFJlZnJlc2hUb2tlbihyZXNwb25zZSkpIHtcbiAgICAgICAgYXdhaXQgZGlzcGF0Y2gocmVmcmVzaEFjY2Vzc1Rva2VuKCkpO1xuICAgICAgICBkaXNwYXRjaChmZXRjaFRhc2tzQnlDYXRlZ29yeShjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCwgbGltaXQsIHNraXApKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZGlzcGF0Y2goZXJyb3JGZXRjaFRhc2tzKHJlc3BvbnNlLmVycm9yLm1lc3NhZ2UpKTtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UuZXJyb3IubWVzc2FnZSkpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZVRhc2sgPSAoaWQgPSAnJykgPT4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW4gfSA9IGdldFN0YXRlKCkuYXV0aDtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoJ3Rhc2tzJywgaWQsIE1ldGhvZHMuREVMRVRFLCBhY2Nlc3NUb2tlbik7XG4gICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgIGNvbnN0IHsgaXRlbXMgfSA9IGdldFN0YXRlKCkudG9kb1Rhc2tzO1xuICAgICAgY29uc3QgdG9kb0FyZ3VtZW50SW5kZXggPSBpdGVtcy5maW5kSW5kZXgodG9kb0FyZ3VtZW50ID0+XG4gICAgICAgIHRvZG9Bcmd1bWVudC5pZCA9PT0gaWQpO1xuICAgICAgZGlzcGF0Y2gocmVtb3ZlVGFza0xvY2FsKHRvZG9Bcmd1bWVudEluZGV4KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzaG91bGRSZWZyZXNoVG9rZW4ocmVzcG9uc2UpKSB7XG4gICAgICAgIGF3YWl0IGRpc3BhdGNoKHJlZnJlc2hBY2Nlc3NUb2tlbigpKTtcbiAgICAgICAgZGlzcGF0Y2goZGVsZXRlVGFzayhpZCkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLmVycm9yLm1lc3NhZ2UpKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBhZGRUYXNrID0gKHRpdGxlID0gJycsIGRlc2NyaXB0aW9uID0gJycsIGNhdGVnb3J5ID0geyBpZDogJycgfSwgdG9kb1dpdGhpbiwgY2FsbGJhY2sgPSB1bmRlZmluZWQpID0+IGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGFjY2Vzc1Rva2VuIH0gPSBnZXRTdGF0ZSgpLmF1dGg7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKFxuICAgICAgJ3Rhc2tzJyxcbiAgICAgIHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeS5pZCxcbiAgICAgICAgdG9kb1dpdGhpbixcbiAgICAgIH0sXG4gICAgICBNZXRob2RzLlBPU1QsXG4gICAgICBhY2Nlc3NUb2tlbixcbiAgICApO1xuICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICBjb25zdCBmZXRjaGVkVGFzayA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICBjb25zdCB0YXNrID0ge1xuICAgICAgICAuLi5mZXRjaGVkVGFzayxcbiAgICAgICAgY29tcGxldGVkQXQ6IChmZXRjaGVkVGFzay5jb21wbGV0ZWRBdClcbiAgICAgICAgICA/IG5ldyBEYXRlKGZldGNoZWRUYXNrLmNvbXBsZXRlZEF0KSA6IHVuZGVmaW5lZCxcbiAgICAgICAgdG9kb1dpdGhpbjogKGZldGNoZWRUYXNrLnRvZG9XaXRoaW4pXG4gICAgICAgICAgPyBuZXcgRGF0ZShmZXRjaGVkVGFzay50b2RvV2l0aGluKSA6IHVuZGVmaW5lZCxcbiAgICAgIH07XG4gICAgICBkaXNwYXRjaChhZGRUYXNrTG9jYWwodGFzaykpO1xuICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNob3VsZFJlZnJlc2hUb2tlbihyZXNwb25zZSkpIHtcbiAgICAgICAgYXdhaXQgZGlzcGF0Y2gocmVmcmVzaEFjY2Vzc1Rva2VuKCkpO1xuICAgICAgICBkaXNwYXRjaChhZGRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgY2F0ZWdvcnksIHRvZG9XaXRoaW4sIGNhbGxiYWNrKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UuZXJyb3IubWVzc2FnZSkpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHRvb2dsZVRhc2tDb21wbGV0ZWQgPSAoaWQgPSAnJywgaXNDb21wbGV0ZWQgPSBmYWxzZSkgPT4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBjb25zdCBjb21wbGV0ZWQgPSAhaXNDb21wbGV0ZWQ7XG4gIGNvbnN0IGNvbXBsZXRlZEF0ID0gKGNvbXBsZXRlZCkgPyBuZXcgRGF0ZSgpIDogbnVsbDtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGFjY2Vzc1Rva2VuIH0gPSBnZXRTdGF0ZSgpLmF1dGg7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKCd0YXNrcycsIHsgaWQsIGNvbXBsZXRlZCwgY29tcGxldGVkQXQgfSwgTWV0aG9kcy5QQVRDSCwgYWNjZXNzVG9rZW4pO1xuICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICBjb25zdCBmZXRjaGVkVGFzayA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICBjb25zdCB0YXNrID0ge1xuICAgICAgICAuLi5mZXRjaGVkVGFzayxcbiAgICAgICAgY29tcGxldGVkQXQ6IChmZXRjaGVkVGFzay5jb21wbGV0ZWRBdClcbiAgICAgICAgICA/IG5ldyBEYXRlKGZldGNoZWRUYXNrLmNvbXBsZXRlZEF0KSA6IHVuZGVmaW5lZCxcbiAgICAgIH07XG4gICAgICBkaXNwYXRjaCh1cGRhdGVUYXNrTG9jYWwodGFzaykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc2hvdWxkUmVmcmVzaFRva2VuKHJlc3BvbnNlKSkge1xuICAgICAgICBhd2FpdCBkaXNwYXRjaChyZWZyZXNoQWNjZXNzVG9rZW4oKSk7XG4gICAgICAgIGRpc3BhdGNoKHRvb2dsZVRhc2tDb21wbGV0ZWQoaWQsIGlzQ29tcGxldGVkKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UuZXJyb3IubWVzc2FnZSkpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDMwMDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgaGVpZ2h0ICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBoZWlnaHQ6IDAsXG59O1xuXG5jb25zdCBvbkVudGVyID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gYCR7bm9kZS5maXJzdEVsZW1lbnRDaGlsZC5vZmZzZXRIZWlnaHR9cHhgO1xufTtcblxuY29uc3Qgb25FeGl0ID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gJzBweCc7XG59O1xuXG5jb25zdCBDb2xsYXBzZSA9ICh7IGluOiBpblByb3AsIGNoaWxkcmVuIH0pID0+IChcbiAgPFRyYW5zaXRpb24gb25FbnRlcj17b25FbnRlcn0gb25FeGl0PXtvbkV4aXR9IGluPXtpblByb3B9IHRpbWVvdXQ9e2R1cmF0aW9ufT5cbiAgICB7KCkgPT4gKFxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuQ29sbGFwc2UucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb2xsYXBzZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDI1MDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgYWxsICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBoZWlnaHQ6ICcwcHgnLFxuICBvcGFjaXR5OiAnMCcsXG4gIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxufTtcblxuY29uc3QgdHJhbnNpdGlvblN0eWxlcyA9IHtcbiAgZW50ZXJpbmc6IHtcbiAgICBoZWlnaHQ6ICcwcHgnLFxuICAgIG9wYWNpdHk6ICcwJyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgfSxcbiAgZW50ZXJlZDoge1xuICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgaGVpZ2h0OiAnMTAwdmgnLFxuICAgIG9wYWNpdHk6ICcxJyxcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gIH0sXG59O1xuXG5jb25zdCBEaWFsb2dBbmltID0gKHsgaW46IGluUHJvcCwgY2hpbGRyZW4gfSkgPT4gKFxuICA8VHJhbnNpdGlvbiBpbj17aW5Qcm9wfSB0aW1lb3V0PXtkdXJhdGlvbn0+XG4gICAge3N0YXRlID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJiYWNrZHJvcC1kaWFsb2dcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgICAuLi50cmFuc2l0aW9uU3R5bGVzW3N0YXRlXSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuRGlhbG9nQW5pbS5wcm9wVHlwZXMgPSB7XG4gIGluOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpYWxvZ0FuaW07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XHJcblxyXG5jb25zdCBkdXJhdGlvbiA9IHtcclxuICBlbnRlcjogMzAwLFxyXG4gIGV4aXQ6IDIwMCxcclxufTtcclxuXHJcbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcclxuICB0cmFuc2l0aW9uOiBgYWxsICR7ZHVyYXRpb24uZW50ZXJ9bXMgZWFzZS1pbi1vdXRgLFxyXG4gIGhlaWdodDogMCxcclxuICBvcGFjaXR5OiAwLFxyXG59O1xyXG5cclxuY29uc3Qgb25FbnRlciA9IChub2RlKSA9PiB7XHJcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcclxuICBzdHlsZS5oZWlnaHQgPSBgJHtub2RlLmZpcnN0RWxlbWVudENoaWxkLm9mZnNldEhlaWdodH1weGA7XHJcbiAgc3R5bGUub3BhY2l0eSA9IDE7XHJcbn07XHJcblxyXG5jb25zdCBvbkVudGVyZWQgPSAobm9kZSkgPT4ge1xyXG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XHJcbiAgc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xyXG59O1xyXG5cclxuY29uc3Qgb25FeGl0ID0gKG5vZGUpID0+IHtcclxuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xyXG4gIHN0eWxlLmhlaWdodCA9IGAke25vZGUuZmlyc3RFbGVtZW50Q2hpbGQub2Zmc2V0SGVpZ2h0fXB4YDtcclxufTtcclxuXHJcbmNvbnN0IG9uRXhpdGVkID0gKG5vZGUpID0+IHtcclxuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xyXG4gIHN0eWxlLmhlaWdodCA9ICcwcHgnO1xyXG4gIHN0eWxlLm9wYWNpdHkgPSAwO1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IFJlc2l6ZSA9ICh7IGNoaWxkcmVuLCAuLi5wcm9wcyB9KSA9PiAoXHJcbiAgPFRyYW5zaXRpb25cclxuICAgIHsuLi5wcm9wc31cclxuICAgIG9uRW50ZXI9e29uRW50ZXJ9XHJcbiAgICBvbkVudGVyZWQ9e29uRW50ZXJlZH1cclxuICAgIG9uRXhpdD17b25FeGl0fVxyXG4gICAgb25FeGl0ZWQ9e29uRXhpdGVkfVxyXG4gICAgdGltZW91dD17ZHVyYXRpb259XHJcbiAgPlxyXG4gICAgeygpID0+IChcclxuICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxyXG4gICAgICAgIH19XHJcbiAgICAgID5cclxuICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKX1cclxuICA8L1RyYW5zaXRpb24+XHJcbik7XHJcblxyXG5SZXNpemUucHJvcFR5cGVzID0ge1xyXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVzaXplO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSAyNTA7XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgdHJhbnNpdGlvbjogYGFsbCAke2R1cmF0aW9ufW1zIGVhc2UtaW4tb3V0YCxcbiAgYm90dG9tOiAnLTEwMHB4Jyxcbn07XG5cbmNvbnN0IHRyYW5zaXRpb25TdHlsZXMgPSB7XG4gIGVudGVyaW5nOiB7XG4gICAgYm90dG9tOiAnLTEwMHB4JyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgfSxcbiAgZW50ZXJlZDoge1xuICAgIGJvdHRvbTogJzBweCcsXG4gICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICB9LFxufTtcblxuY29uc3QgU25hY2tiYXJBbmltID0gKHsgaW46IGluUHJvcCwgY2hpbGRyZW4sIGN1c3RvbUNsYXNzIH0pID0+IChcbiAgPFRyYW5zaXRpb24gaW49e2luUHJvcH0gdGltZW91dD17ZHVyYXRpb259PlxuICAgIHtzdGF0ZSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPVwiY29udGVudC1zbmFja2JhclwiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxuICAgICAgICAgIC4uLnRyYW5zaXRpb25TdHlsZXNbc3RhdGVdLFxuICAgICAgICB9fVxuICAgICAgICBjbGFzc05hbWU9e2N1c3RvbUNsYXNzfVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICA8L1RyYW5zaXRpb24+XG4pO1xuXG5TbmFja2JhckFuaW0ucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIGN1c3RvbUNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuU25hY2tiYXJBbmltLmRlZmF1bHRQcm9wcyA9IHtcbiAgY3VzdG9tQ2xhc3M6ICcnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU25hY2tiYXJBbmltO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEJ1dHRvblNjcm9sbCA9ICh7IG9uQ2xpY2ssIGRpcmVjdGlvbiB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPXtgYnV0dG9uLXNjcm9sbCAke2RpcmVjdGlvbn1gfSBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICA8aSBjbGFzc05hbWU9eyhkaXJlY3Rpb24gPT09ICdsZWZ0JykgPyAnaWNvbi1iYWNrd2FyZCcgOiAnaWNvbi1mb3J3YXJkJ30gLz5cbiAgPC9idXR0b24+XG4pO1xuXG5CdXR0b25TY3JvbGwucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBkaXJlY3Rpb246IFByb3BUeXBlcy5vbmVPZihbJ2xlZnQnLCAncmlnaHQnXSksXG59O1xuXG5CdXR0b25TY3JvbGwuZGVmYXVsdFByb3BzID0ge1xuICBkaXJlY3Rpb246ICdsZWZ0Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvblNjcm9sbDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tICdsb2Rhc2gnO1xuXG5jb25zdCB3YWl0VGltZSA9IDUwMDtcblxuY2xhc3MgSW5maW5pdGVTY3JvbGwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhyb3R0bGUodGhpcy5vblNjcm9sbCwgd2FpdFRpbWUpLCBmYWxzZSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhyb3R0bGUodGhpcy5vblNjcm9sbCwgd2FpdFRpbWUpLCBmYWxzZSk7XG4gIH1cblxuICBvblNjcm9sbCA9ICgpID0+IHtcbiAgICBpZiAoKHdpbmRvdy5pbm5lckhlaWdodCArIHdpbmRvdy5zY3JvbGxZKSA+PSAoZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQgLSAyMDApKSB7XG4gICAgICBjb25zdCB7IGFyZ3MsIG9uU2Nyb2xsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgb25TY3JvbGwoLi4uYXJncyk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSW5maW5pdGVTY3JvbGwucHJvcFR5cGVzID0ge1xuICBhcmdzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgb25TY3JvbGw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5JbmZpbml0ZVNjcm9sbC5kZWZhdWx0UHJvcHMgPSB7XG4gIGFyZ3M6IFtdLFxuICBjbGFzc05hbWU6ICcnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgSW5maW5pdGVTY3JvbGw7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgTWFpbkFkZEJ1dHRvbiA9ICh7IG9uQ2xpY2sgfSkgPT4gKFxuICA8YnV0dG9uIGlkPVwibWFpbi1hZGQtYnV0dG9uXCIgb25DbGljaz17b25DbGlja30gPlxuICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+JiN4RTE0NTs8L2k+XG4gIDwvYnV0dG9uPlxuKTtcblxuTWFpbkFkZEJ1dHRvbi5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYWluQWRkQnV0dG9uO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgU25hY2tiYXJBbmltIGZyb20gJy4uL2FuaW1zL1NuYWNrYmFyQW5pbSc7XG5cbmNvbnN0IEFjdGlvbiA9ICh7IG9uQ2xpY2ssIHRleHQgfSkgPT4gKFxuICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvbi1hY3Rpb24tc25hY2tiYXJcIiBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICB7dGV4dH1cbiAgPC9idXR0b24+XG4pO1xuXG5BY3Rpb24ucHJvcFR5cGVzID0ge1xuICB0ZXh0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5jbGFzcyBTbmFja2JhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBjb25zdCB7XG4gICAgICBvbkNsb3NlLCBkdXJhdGlvbiwgc2hvdyxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChzaG93KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgb25DbG9zZSgpO1xuICAgICAgfSwgZHVyYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBtZXNzYWdlLCBpc0Vycm9yLCBhY3Rpb25UZXh0LCBhY3Rpb25DbGljaywgc2hvdyxcbiAgICAgIHZlcnRpY2FsUG9zdGlvbiwgaG9yaXpvbnRhbFBvc2l0aW9uLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8U25hY2tiYXJBbmltIGluPXtzaG93fSBjdXN0b21DbGFzcz17YCR7dmVydGljYWxQb3N0aW9ufSAkeyhob3Jpem9udGFsUG9zaXRpb24pfWB9PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtgc25hY2tiYXIgJHsoaXNFcnJvcikgPyAnZXJyb3InIDogJyd9YH1cbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNuYWNrYmFyLW1lc3NhZ2VcIj57bWVzc2FnZX08L3NwYW4+XG4gICAgICAgICAge1xuICAgICAgICAgICAgKGFjdGlvblRleHQgIT09ICcnICYmIGFjdGlvbkNsaWNrICE9PSB1bmRlZmluZWQpICYmXG4gICAgICAgICAgICAgIDxBY3Rpb24gb25DbGljaz17YWN0aW9uQ2xpY2t9IHRleHQ9e2FjdGlvblRleHR9IC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvU25hY2tiYXJBbmltPlxuICAgICk7XG4gIH1cbn1cblxuU25hY2tiYXIucHJvcFR5cGVzID0ge1xuICBzaG93OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGR1cmF0aW9uOiBQcm9wVHlwZXMubnVtYmVyLFxuICBpc0Vycm9yOiBQcm9wVHlwZXMuYm9vbCxcbiAgYWN0aW9uVGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgYWN0aW9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICB2ZXJ0aWNhbFBvc3Rpb246IFByb3BUeXBlcy5vbmVPZihbJ3RvcCcsICdib3R0b20nXSksXG4gIGhvcml6b250YWxQb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnbGVmdCcsICdyaWdodCddKSxcbn07XG5cblNuYWNrYmFyLmRlZmF1bHRQcm9wcyA9IHtcbiAgZHVyYXRpb246IDUwMDAsXG4gIGlzRXJyb3I6IGZhbHNlLFxuICBhY3Rpb25UZXh0OiAnJyxcbiAgYWN0aW9uQ2xpY2s6IHVuZGVmaW5lZCxcbiAgdmVydGljYWxQb3N0aW9uOiAnYm90dG9tJyxcbiAgaG9yaXpvbnRhbFBvc2l0aW9uOiAncmlnaHQnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU25hY2tiYXI7XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IExvYWRlckxpbmVhciBmcm9tICcuLi9sYXlvdXQvTG9hZGVyTGluZWFyJztcbmltcG9ydCBNYWluQWRkQnV0dG9uIGZyb20gJy4uL2xheW91dC9NYWluQWRkQnV0dG9uJztcbmltcG9ydCBDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyIGZyb20gJy4uLy4uL2NvbnRhaW5lcnMvQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lcic7XG5pbXBvcnQgVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lciBmcm9tICcuLi8uLi9jb250YWluZXJzL1Zpc2liaWxpdHlGaWx0ZXJDb250YWluZXInO1xuaW1wb3J0IFRhc2tzQ29udGFpbmVyIGZyb20gJy4uLy4uL2NvbnRhaW5lcnMvVGFza3NDb250YWluZXInO1xuaW1wb3J0IERpYWxvZ0FkZCBmcm9tICcuL2RpYWxvZ0FkZC9EaWFsb2dBZGQnO1xuaW1wb3J0IFNuYWNrYmFyIGZyb20gJy4uL2xheW91dC9TbmFja2Jhcic7XG5cbmNsYXNzIFRvZG9zIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGUgPSB7XG4gICAgaXNEaWFsb2dBZGRPcGVuOiBmYWxzZSxcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IGluaXRGZXRjaEFsbENhdGVnb3JpZXMgfSA9IHRoaXMucHJvcHM7XG4gICAgaW5pdEZldGNoQWxsQ2F0ZWdvcmllcygpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaXNEaWFsb2dBZGRPcGVuIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgbWVzc2FnZSwgaGlkZU1lc3NhZ2UsIHNob3dMb2FkaW5nIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtYXBwXCI+XG4gICAgICAgIDxMb2FkZXJMaW5lYXIgc2hvdz17c2hvd0xvYWRpbmd9IC8+XG4gICAgICAgIDxkaXYgaWQ9XCJtYWluLXRvcC1iYXJcIj5cbiAgICAgICAgICA8Q2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lciAvPlxuICAgICAgICAgIDxWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyIC8+XG4gICAgICAgICAgPE1haW5BZGRCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBpc0RpYWxvZ0FkZE9wZW46IHRydWUgfSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxUYXNrc0NvbnRhaW5lciAvPlxuICAgICAgICA8RGlhbG9nQWRkXG4gICAgICAgICAgb3Blbj17aXNEaWFsb2dBZGRPcGVufVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBpc0RpYWxvZ0FkZE9wZW46IGZhbHNlIH0pfVxuICAgICAgICAvPlxuICAgICAgICA8U25hY2tiYXJcbiAgICAgICAgICBzaG93PXttZXNzYWdlLnNob3d9XG4gICAgICAgICAgaXNFcnJvcj17bWVzc2FnZS5pc0Vycm9yfVxuICAgICAgICAgIG1lc3NhZ2U9e21lc3NhZ2UudGV4dH1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBoaWRlTWVzc2FnZSgpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Ub2Rvcy5wcm9wVHlwZXMgPSB7XG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2hvdzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0Vycm9yOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgaGlkZU1lc3NhZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGluaXRGZXRjaEFsbENhdGVnb3JpZXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHNob3dMb2FkaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9kb3M7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgQnV0dG9uRGVsZXRlQ2F0ZWdvcnkgPSAoeyBvbkNsaWNrIH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24tZGVsZXRlLWNhdGVnb3J5XCIgb25DbGljaz17b25DbGlja30+XG4gICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1kZWxldGVcIiAvPlxuICA8L2J1dHRvbj5cbik7XG5cbkJ1dHRvbkRlbGV0ZUNhdGVnb3J5LnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkRlbGV0ZUNhdGVnb3J5O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uR3JvdXAgfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcbmltcG9ydCBzY3JvbGwgZnJvbSAnc2Nyb2xsJztcbmltcG9ydCBCdXR0b25TY3JvbGwgZnJvbSAnLi4vLi4vbGF5b3V0L0J1dHRvblNjb2xsJztcbmltcG9ydCBDYXRlZ29yeSBmcm9tICcuL0NhdGVnb3J5JztcbmltcG9ydCBGYWRlIGZyb20gJy4uLy4uL2FuaW1zL0ZhZGUnO1xuXG5jbGFzcyBDYXRlZ29yaWVzRmlsdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY2hpcHMgPSB1bmRlZmluZWQ7XG5cbiAgaGFuZGxlTGVmdFNjcm9sbENsaWNrID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmNoaXBzKSB7XG4gICAgICB0aGlzLm1vdmVDaGlwc1Njcm9sbCgtdGhpcy5jaGlwcy5jbGllbnRXaWR0aCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUmlnaHRTY3JvbGxDbGljayA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5jaGlwcykge1xuICAgICAgdGhpcy5tb3ZlQ2hpcHNTY3JvbGwodGhpcy5jaGlwcy5jbGllbnRXaWR0aCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUNoaXBzU2Nyb2xsID0gKGRlbHRhKSA9PiB7XG4gICAgaWYgKHRoaXMuY2hpcHMpIHtcbiAgICAgIGNvbnN0IG5leHRTY3JvbGxMZWZ0ID0gdGhpcy5jaGlwcy5zY3JvbGxMZWZ0ICsgZGVsdGE7XG4gICAgICBzY3JvbGwubGVmdCh0aGlzLmNoaXBzLCBuZXh0U2Nyb2xsTGVmdCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2F0ZWdvcnlMaXN0LCBvbkRlbGV0ZUNhdGVnb3J5LCBvbkNpbGNrQ2F0ZWdvcnkgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJjb250ZW50LWNhdGVnb3JpZXMtZmlsdGVyXCI+XG4gICAgICAgIDxCdXR0b25TY3JvbGxcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUxlZnRTY3JvbGxDbGlja31cbiAgICAgICAgICBkaXJlY3Rpb249XCJsZWZ0XCJcbiAgICAgICAgLz5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cImNhdGVnb3JpZXMtZmlsdGVyXCJcbiAgICAgICAgICByZWY9eyhub2RlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoaXBzID0gbm9kZTtcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPFRyYW5zaXRpb25Hcm91cCBzdHlsZT17eyBkaXNwbGF5OiAnaW5oZXJpdCcsIHBhZGRpbmdMZWZ0OiAnMS4yNWVtJywgcGFkZGluZ1JpZ2h0OiAnMS4yNWVtJyB9fT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2F0ZWdvcnlMaXN0Lm1hcChjYXRlZ29yeSA9PiAoXG4gICAgICAgICAgICAgICAgPEZhZGUga2V5PXtjYXRlZ29yeS5pZH0+XG4gICAgICAgICAgICAgICAgICA8Q2F0ZWdvcnlcbiAgICAgICAgICAgICAgICAgICAga2V5PXtjYXRlZ29yeS5pZH1cbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk9e2NhdGVnb3J5fVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17Y2F0ZWdvcnkuc2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlPXtvbkRlbGV0ZUNhdGVnb3J5fVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNpbGNrQ2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvRmFkZT5cbiAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L1RyYW5zaXRpb25Hcm91cD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxCdXR0b25TY3JvbGxcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2t9XG4gICAgICAgICAgZGlyZWN0aW9uPVwicmlnaHRcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5DYXRlZ29yaWVzRmlsdGVyLnByb3BUeXBlcyA9IHtcbiAgY2F0ZWdvcnlMaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICBvbkRlbGV0ZUNhdGVnb3J5OiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DaWxja0NhdGVnb3J5OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuQ2F0ZWdvcmllc0ZpbHRlci5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uRGVsZXRlQ2F0ZWdvcnk6IHVuZGVmaW5lZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENhdGVnb3JpZXNGaWx0ZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBCdXR0b25EZWxldGVDYXRlZ29yeSBmcm9tICcuL0J1dHRvbkRlbGV0ZUNhdGVnb3J5JztcblxuY29uc3QgQ2F0ZWdvcnkgPSAoe1xuICBjYXRlZ29yeSwgc2VsZWN0ZWQsIG9uQ2xpY2ssIG9uRGVsZXRlLFxufSkgPT4ge1xuICBsZXQgY3NzQ2xhc3MgPSAnJztcblxuICBjb25zdCBvbkNoaXBDbGljayA9IChlKSA9PiB7XG4gICAgb25DbGljayhjYXRlZ29yeSwgZSk7XG4gIH07XG4gIGNvbnN0IG9uRGVsZXRlQ2xpY2sgPSAoKSA9PiB7XG4gICAgb25EZWxldGUoY2F0ZWdvcnkpO1xuICB9O1xuXG4gIGlmIChzZWxlY3RlZCkge1xuICAgIGNzc0NsYXNzID0gJ2NhdGVnb3J5LXNlbGVjdGVkJztcbiAgfVxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17YCR7Y3NzQ2xhc3N9IGNhdGVnb3J5LWNoaXAgYWxpZ24taXRlbXMtY2VudGVyYH1cbiAgICAgIG9uQ2xpY2s9e29uQ2hpcENsaWNrfVxuICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2F0ZWdvcnktdGV4dFwiPntjYXRlZ29yeS5uYW1lfTwvc3Bhbj5cbiAgICAgIHtcbiAgICAgICAgKGNhdGVnb3J5LmlkICE9PSAnMCcgJiYgb25EZWxldGUgIT09IHVuZGVmaW5lZCkgJiZcbiAgICAgICAgICA8QnV0dG9uRGVsZXRlQ2F0ZWdvcnkgb25DbGljaz17b25EZWxldGVDbGlja30gLz5cbiAgICAgIH1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbkNhdGVnb3J5LnByb3BUeXBlcyA9IHtcbiAgb25EZWxldGU6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjYXRlZ29yeTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5DYXRlZ29yeS5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uRGVsZXRlOiB1bmRlZmluZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYXRlZ29yeTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvbGFiZWxzJztcbmltcG9ydCB7IEFERF9UQVNLIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCB7IGFkZENhdGVnb3J5IH0gZnJvbSAnLi4vLi4vLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VJbmZvIH0gZnJvbSAnLi4vLi4vLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5cbmNsYXNzIEFkZENhdGVnb3J5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGUgPSB7XG4gICAgbmFtZTogJycsXG4gIH07XG5cbiAgb25JbnB1dFRleHRDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBuYW1lOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgfVxuXG4gIG9uQnV0dG9uQWRkQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgZGlzcGF0Y2ggfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKG5hbWUgPT09ICcnKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ05hbWVSZXF1aXJlZCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkaXNwYXRjaChhZGRDYXRlZ29yeShuYW1lLCB0aGlzLm9uQ2F0ZWdvcnlDcmVhdGVkKSk7XG4gIH1cblxuICBvbkNhdGVnb3J5Q3JlYXRlZCA9IChzZWxlY3RlZENhdGVnb3J5KSA9PiB7XG4gICAgY29uc3QgeyBvbk5leHQgfSA9IHRoaXMucHJvcHM7XG4gICAgb25OZXh0KHsgc3RlcElkOiBBRERfVEFTSywgb3B0aW9uczogeyBzZWxlY3RlZENhdGVnb3J5IH0gfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1hZGQtY2F0ZWdvcnlcIj5cbiAgICAgICAgPGgyPntsYWJlbHMudGl0bGVBZGRDYXRlZ29yeX08L2gyPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17bGFiZWxzLnBsYWNlaG9sZGVyTmFtZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4tYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25CdXR0b25BZGRDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGFiZWxzLmJ1dHRvbkFkZH1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkFkZENhdGVnb3J5LnByb3BUeXBlcyA9IHtcbiAgZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoKShBZGRDYXRlZ29yeSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5pbXBvcnQgeyBTRUxFQ1RfQ09NUExFVEVfREFURSB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUluZm8gfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcblxuY2xhc3MgQWRkVGFzayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRlID0ge1xuICAgIHRpdGxlOiAnJyxcbiAgICBkZXNjcmlwdGlvbjogJycsXG4gIH07XG5cbiAgb25JbnB1dFRleHRDaGFuZ2UgPSBuYW1lID0+IGUgPT5cbiAgICB0aGlzLnNldFN0YXRlKHsgW25hbWVdOiBlLnRhcmdldC52YWx1ZSB9KTtcblxuICBvbkJ1dHRvblNjaGVkdWxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvcHRpb25zLCBkaXNwYXRjaCwgb25OZXh0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgdGl0bGUsIGRlc2NyaXB0aW9uIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGNhdGVnb3J5ID0gb3B0aW9ucy5zZWxlY3RlZENhdGVnb3J5O1xuICAgIGlmICh0aXRsZSA9PT0gJycpIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlSW5mbyhsYWJlbHMubXNnVGl0bGVSZXF1aXJlZCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvbk5leHQoeyBzdGVwSWQ6IFNFTEVDVF9DT01QTEVURV9EQVRFLCBvcHRpb25zOiB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgY2F0ZWdvcnkgfSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSA9IHRoaXMucHJvcHMub3B0aW9ucztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWFkZC10YXNrXCI+XG4gICAgICAgIDxoMj57bGFiZWxzLnRpdGxlQWRkVGFza308L2gyPlxuICAgICAgICA8aDM+XG4gICAgICAgICAge2xhYmVscy5sYWJlbEZvckNhdGVnb3J5fVxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxhYmVsLWNhdGVnb3J5LW5hbWVcIj5cbiAgICAgICAgICAgIHtgICR7c2VsZWN0ZWRDYXRlZ29yeS5uYW1lfWB9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2gzPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtZmllbGRzXCI+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtsYWJlbHMucGxhY2VIb2xkZXJUaXRsZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlKCd0aXRsZScpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtsYWJlbHMucGxhY2VIb2xkZXJEZXNjcmlwdGlvbn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlKCdkZXNjcmlwdGlvbicpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4tYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25CdXR0b25TY2hlZHVsZUNsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYWJlbHMuYnV0dG9uU2NoZWR1bGV9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5BZGRUYXNrLnByb3BUeXBlcyA9IHtcbiAgZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9wdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2VsZWN0ZWRDYXRlZ29yeTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgfSkuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCgpKEFkZFRhc2spO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBTZWxlY3RBY3Rpb25BZGQgZnJvbSAnLi9TZWxlY3RBY3Rpb25BZGQnO1xuaW1wb3J0IEFkZENhdGVnb3J5IGZyb20gJy4vQWRkQ2F0ZWdvcnknO1xuaW1wb3J0IFNlbGVjdENhdGVnb3J5IGZyb20gJy4vU2VsZWN0Q2F0ZWdvcnknO1xuaW1wb3J0IEFkZFRhc2sgZnJvbSAnLi9BZGRUYXNrJztcbmltcG9ydCBTZWxlY3RDb21wbGV0ZURhdGUgZnJvbSAnLi9TZWxlY3RDb21wbGV0ZURhdGUnO1xuaW1wb3J0IERvbmUgZnJvbSAnLi9Eb25lJztcbmltcG9ydCB7XG4gIFNFTEVDVF9XQU5UX1RPX0FERCxcbiAgQUREX0NBVEVHT1JZLFxuICBBRERfVEFTSyxcbiAgU0VMRUNUX0NBVEVHT1JZLFxuICBTRUxFQ1RfQ09NUExFVEVfREFURSxcbiAgRE9ORSxcbiAgc3RlcExpc3QsXG59IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgUmVwbGFjZUFuaW0gZnJvbSAnLi4vLi4vYW5pbXMvUmVwbGFjZUFuaW0nO1xuaW1wb3J0IERpYWxvZ0FuaW0gZnJvbSAnLi4vLi4vYW5pbXMvRGlhbG9nQW5pbSc7XG5pbXBvcnQgU3RlcHMgZnJvbSAnLi9TdGVwcyc7XG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuXG5jb25zdCBnZXRDb250ZW50VG9SZW5kZXIgPSAoc3RlcHMsIHByb3BzKSA9PiB7XG4gIGlmIChzdGVwcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gPFNlbGVjdEFjdGlvbkFkZCB7Li4ucHJvcHN9IC8+O1xuICB9XG4gIGNvbnN0IGxhc3RTdGVwID0gc3RlcHNbc3RlcHMubGVuZ3RoIC0gMV07XG4gIHN3aXRjaCAobGFzdFN0ZXAuc3RlcElkKSB7XG4gICAgY2FzZSBTRUxFQ1RfV0FOVF9UT19BREQ6XG4gICAgICByZXR1cm4gPFNlbGVjdEFjdGlvbkFkZCB7Li4ucHJvcHN9IC8+O1xuICAgIGNhc2UgQUREX0NBVEVHT1JZOlxuICAgICAgcmV0dXJuIDxBZGRDYXRlZ29yeSB7Li4ucHJvcHN9IC8+O1xuICAgIGNhc2UgQUREX1RBU0s6XG4gICAgICByZXR1cm4gPEFkZFRhc2sgey4uLnByb3BzfSBvcHRpb25zPXtsYXN0U3RlcC5vcHRpb25zfSAvPjtcbiAgICBjYXNlIFNFTEVDVF9DQVRFR09SWTpcbiAgICAgIHJldHVybiA8U2VsZWN0Q2F0ZWdvcnkgey4uLnByb3BzfSAvPjtcbiAgICBjYXNlIFNFTEVDVF9DT01QTEVURV9EQVRFOlxuICAgICAgcmV0dXJuIDxTZWxlY3RDb21wbGV0ZURhdGUgey4uLnByb3BzfSBvcHRpb25zPXtsYXN0U3RlcC5vcHRpb25zfSAvPjtcbiAgICBjYXNlIERPTkU6XG4gICAgICByZXR1cm4gPERvbmUgey4uLnByb3BzfSAvPjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIDxTZWxlY3RBY3Rpb25BZGQgey4uLnByb3BzfSAvPjtcbiAgfVxufTtcblxuY29uc3QgaW5pdGFsU3RhdGUgPSB7XG4gIG5leHRTdGVwczogW10sXG4gIHN0ZXBzOiBbXG4gICAge1xuICAgICAgc3RlcElkOiBTRUxFQ1RfV0FOVF9UT19BREQsXG4gICAgICBvcHRpb25zOiB7fSxcbiAgICB9LFxuICBdLFxuICBzaG93U3RlcDogdHJ1ZSxcbn07XG5cbmNsYXNzIERpYWxvZ0FkZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRlID0ge1xuICAgIC4uLmluaXRhbFN0YXRlLFxuICB9O1xuXG4gIG9uQmFjayA9ICgpID0+IHtcbiAgICBjb25zdCB7IHN0ZXBzIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgb25DbG9zZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzdGVwQ291bnQgPSBzdGVwcy5sZW5ndGg7XG4gICAgaWYgKHN0ZXBDb3VudCA9PT0gMSkge1xuICAgICAgLy8gUmV0dXJuZWQgdG8gdGhlIGZpcnN0IHN0ZXBzLCBjbG9zZSB0aGUgZGlhbG9nXG4gICAgICB0aGlzLnNldFN0YXRlKHsgLi4uaW5pdGFsU3RhdGUgfSk7XG4gICAgICBvbkNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZXh0U3RlcHM6IFtcbiAgICAgICAgICAuLi5zdGVwcy5zbGljZSgwLCBzdGVwcy5sZW5ndGggLSAxKSxcbiAgICAgICAgXSxcbiAgICAgICAgc2hvd1N0ZXA6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25OZXh0ID0gKHN0ZXAgPSB7IHN0ZXBJZDogJycsIG9wdGlvbnM6IHt9IH0pID0+IHtcbiAgICBjb25zdCB7IHN0ZXBzIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbmV4dFN0ZXBzOiBbXG4gICAgICAgIC4uLnN0ZXBzLCB7XG4gICAgICAgICAgLi4uc3RlcCxcbiAgICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBzaG93U3RlcDogZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBvblJlc2V0QW5kQ2xvc2UgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkNsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgIG9uQ2xvc2UoKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi5pbml0YWxTdGF0ZSB9KTtcbiAgICB9LCA1MDApO1xuICB9XG5cbiAgb25BbmltYXRpb25FbmQgPSAobm9kZSwgZG9uZSkgPT4ge1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsICgpID0+IHtcbiAgICAgIGRvbmUoKTtcbiAgICAgIGNvbnN0IHsgbmV4dFN0ZXBzLCBzaG93U3RlcCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIGlmIChzaG93U3RlcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc3RlcHM6IFtcbiAgICAgICAgICAuLi5uZXh0U3RlcHMsXG4gICAgICAgIF0sXG4gICAgICAgIHNob3dTdGVwOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgc3RlcHMsIHNob3dTdGVwIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgb25DbG9zZSwgb3BlbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IG9uTmV4dCwgb25SZXNldEFuZENsb3NlLCBvbkFuaW1hdGlvbkVuZCB9ID0gdGhpcztcbiAgICByZXR1cm4gKFxuICAgICAgPERpYWxvZ0FuaW0gaW49e29wZW59PlxuICAgICAgICA8ZGl2IGlkPVwiZGlhbG9nLWFkZFwiID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpYWxvZy1oZWFkZXJcIj5cbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJtYWluLWNsb3NlLWJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IG9uQ2xvc2UoKX0+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+JiN4RTVDRDs8L2k+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXBzLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPFN0ZXBzXG4gICAgICAgICAgICAgIGxpc3Q9e3N0ZXBMaXN0fVxuICAgICAgICAgICAgICBzdGVwSGlzdG9yeT17c3RlcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlhbG9nLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPFJlcGxhY2VBbmltIGluPXtzaG93U3RlcH0gZW5kTGlzdGVuZXI9e29uQW5pbWF0aW9uRW5kfT5cbiAgICAgICAgICAgICAge2dldENvbnRlbnRUb1JlbmRlcihzdGVwcywgeyBvbk5leHQsIG9uQ2xvc2U6IG9uUmVzZXRBbmRDbG9zZSB9KX1cbiAgICAgICAgICAgIDwvUmVwbGFjZUFuaW0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaWFsb2ctZm9vdGVyXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGlkPVwiYmFjay1idXR0b24tZGlhbG9nXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1idXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uQmFjaygpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bGFiZWxzLmJ1dHRvbkJhY2t9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0RpYWxvZ0FuaW0+XG4gICAgKTtcbiAgfVxufVxuXG5EaWFsb2dBZGQucHJvcFR5cGVzID0ge1xuICBvcGVuOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlhbG9nQWRkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuXG5jbGFzcyBEb25lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCB7IG9uQ2xvc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgICBvbkNsb3NlKCk7XG4gICAgfSwgMzAwMCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1kb25lLWFkZFwiPlxuICAgICAgICA8aDI+e2xhYmVscy5sYWJlbERvbmV9PC9oMj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWljLWRvbmVcIj5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBzcmM9XCIuL2NsaWVudC9wdWJsaWMvaW1nL2ljLWRvbmUuc3ZnXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImljLWRvbmVcIlxuICAgICAgICAgICAgYWx0PVwiZG9uZSBpY29uXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRG9uZS5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEb25lO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCB7IEFERF9DQVRFR09SWSwgU0VMRUNUX0NBVEVHT1JZIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5cbmNvbnN0IFNlbGVjdEFjdGlvbkFkZCA9ICh7IG9uTmV4dCB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1zZWxlY3QtYWN0aW9uLWFkZFwiPlxuICAgIDxoMj57bGFiZWxzLnRpdGxlQWRkfTwvaDI+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtLXNlbGVjdFwiPlxuICAgICAgPHBcbiAgICAgICAgY2xhc3NOYW1lPVwic2VsZWN0LXRpdGxlXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4gb25OZXh0KHsgc3RlcElkOiBBRERfQ0FURUdPUlksIG9wdGlvbnM6IHt9IH0pfVxuICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgID5cbiAgICAgICAge2xhYmVscy5sYWJlbENhdGVnb3J5fVxuICAgICAgPC9wPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbS1zZWxlY3RcIj5cbiAgICAgIDxwXG4gICAgICAgIGNsYXNzTmFtZT1cInNlbGVjdC10aXRsZVwiXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uTmV4dCh7IHN0ZXBJZDogU0VMRUNUX0NBVEVHT1JZLCBvcHRpb25zOiB7fSB9KX1cbiAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICA+XG4gICAgICAgIHtsYWJlbHMubGFiZWxUYXNrfVxuICAgICAgPC9wPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbik7XG5cblNlbGVjdEFjdGlvbkFkZC5wcm9wVHlwZXMgPSB7XG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdEFjdGlvbkFkZDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvbGFiZWxzJztcbmltcG9ydCBDYXRlZ29yeSBmcm9tICcuLi9jYXRlZ29yeS9DYXRlZ29yeSc7XG5pbXBvcnQgeyBBRERfVEFTSyB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUluZm8gfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcblxuXG5jbGFzcyBTZWxlY3RDYXRlZ29yeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRlID0ge1xuICAgIHNlbGVjdGVkQ2F0ZWdvcnk6IHVuZGVmaW5lZCxcbiAgfTtcblxuICBvbkNhdGVnb3J5Q2xpY2sgPSAoY2F0ZWdvcnkpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRDYXRlZ29yeTogY2F0ZWdvcnkgfSk7XG4gIH1cblxuICBvbkJ1dHRvbk5leHRDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvbk5leHQsIGRpc3BhdGNoIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChzZWxlY3RlZENhdGVnb3J5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlSW5mbyhsYWJlbHMubXNnU2VsZWN0Q2F0ZWdvcnkpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25OZXh0KHsgc3RlcElkOiBBRERfVEFTSywgb3B0aW9uczogeyBzZWxlY3RlZENhdGVnb3J5IH0gfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjYXRlZ29yaWVzTGlzdCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1zZWxlY3QtY2F0ZWdvcnlcIj5cbiAgICAgICAgPGgyPntsYWJlbHMudGl0bGVDaG9vc2VDYXRlZ29yeX08L2gyPlxuICAgICAgICA8ZGl2IGlkPVwiY29udGVudC1jYXRlZ29yaWVzXCI+XG4gICAgICAgICAge1xuICAgICAgICAgICAgY2F0ZWdvcmllc0xpc3QubWFwKGNhdGVnb3J5ID0+IChcbiAgICAgICAgICAgICAgKGNhdGVnb3J5LmlkICE9PSAnMCcpXG4gICAgICAgICAgICAgID8gPENhdGVnb3J5XG4gICAgICAgICAgICAgICAga2V5PXtjYXRlZ29yeS5pZH1cbiAgICAgICAgICAgICAgICBjYXRlZ29yeT17Y2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3NlbGVjdGVkQ2F0ZWdvcnkgIT09IHVuZGVmaW5lZCAmJiBjYXRlZ29yeS5pZCA9PT0gc2VsZWN0ZWRDYXRlZ29yeS5pZH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2F0ZWdvcnlDbGlja31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICkpXG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQnV0dG9uTmV4dENsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYWJlbHMuYnV0dG9uTmV4dH1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblNlbGVjdENhdGVnb3J5LnByb3BUeXBlcyA9IHtcbiAgZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNhdGVnb3JpZXNMaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICBvbk5leHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcCA9IHN0YXRlID0+IChcbiAge1xuICAgIGNhdGVnb3JpZXNMaXN0OiBzdGF0ZS50b2RvRmlsdGVycy5jYXRlZ29yaWVzLFxuICB9XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wKShTZWxlY3RDYXRlZ29yeSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgRGF0ZVBpY2tlciBmcm9tICdyZWFjdC1kYXRlLXBpY2tlcic7XG5cbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5pbXBvcnQgeyBET05FIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCB7IGFkZFRhc2sgfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL3RvZG9UYXNrc0FjdGlvbnMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VJbmZvIH0gZnJvbSAnLi4vLi4vLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5cbmNsYXNzIFNlbGVjdENvbXBsZXRlRGF0ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRlID0ge1xuICAgIHRvZG9XaXRoaW46IG5ldyBEYXRlKCksXG4gIH07XG5cbiAgb25JbnB1dERhdGVDaGFuZ2UgPSAoZGF0ZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyB0b2RvV2l0aGluOiBkYXRlIH0pO1xuICB9XG5cbiAgb25CdXR0b25BZGRDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IHRvZG9XaXRoaW4gfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBkaXNwYXRjaCwgb3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgY2F0ZWdvcnkgfSA9IG9wdGlvbnM7XG4gICAgaWYgKCF0b2RvV2l0aGluIHx8IHRvZG9XaXRoaW4gPT09ICcnKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ1NlbGVjdERhdGUpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGlzcGF0Y2goYWRkVGFzayhcbiAgICAgIHRpdGxlLCBkZXNjcmlwdGlvbixcbiAgICAgIGNhdGVnb3J5LCB0b2RvV2l0aGluLCB0aGlzLm9uVG9kb1Rhc2tDcmVhdGVkLFxuICAgICkpO1xuICB9XG5cbiAgb25Ub2RvVGFza0NyZWF0ZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbk5leHQgfSA9IHRoaXMucHJvcHM7XG4gICAgb25OZXh0KHsgc3RlcElkOiBET05FLCBvcHRpb25zOiB7IH0gfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB0b2RvV2l0aGluIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtc2VsZWN0LWNvbXBsZXRlLWRhdGVcIj5cbiAgICAgICAgPGgyPntsYWJlbHMudGl0bGVUb2RvV2l0aGlufTwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1pbnB1dFwiPlxuICAgICAgICAgIDxEYXRlUGlja2VyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIGNhbGVuZGFyQ2xhc3NOYW1lPVwiZGFyay1jYWxlbmRhclwiXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0RGF0ZUNoYW5nZX1cbiAgICAgICAgICAgIHZhbHVlPXt0b2RvV2l0aGlufVxuICAgICAgICAgICAgbWluRGF0ZT17bmV3IERhdGUoKX1cbiAgICAgICAgICAgIGxvY2FsZT1cImVuLVVTXCJcbiAgICAgICAgICAgIGNsZWFySWNvbj17PGkgY2xhc3NOYW1lPVwiaWNvbi1kZWxldGVcIiAvPn1cbiAgICAgICAgICAgIGNhbGVuZGFySWNvbj17PGkgY2xhc3NOYW1lPVwiaWNvbi1jYWxlbmRhclwiIC8+fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4tYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25CdXR0b25BZGRDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGFiZWxzLmJ1dHRvbkFkZH1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblNlbGVjdENvbXBsZXRlRGF0ZS5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvcHRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgZGVzY3JpcHRpb246IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjYXRlZ29yeTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgfSkuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCgpKFNlbGVjdENvbXBsZXRlRGF0ZSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgU3RlcCA9ICh7IGRlc2NyaXB0aW9uLCBjb21wbGV0ZWQsIG5lZWRMaW5lIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNvbnRhaW5lclwiPlxuICAgIHtcbiAgICAgIG5lZWRMaW5lICYmXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGxpbmUgJHsoY29tcGxldGVkKSA/ICdjb21wbGV0ZWQnIDogJyd9YH0gLz5cbiAgICB9XG4gICAgPGRpdiBjbGFzc05hbWU9e2BzdGVwICR7KGNvbXBsZXRlZCkgPyAnY29tcGxldGVkJyA6ICcnfWB9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmRpY2F0b3JcIiAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWRlc2NyaXB0aW9uXCI+XG4gICAgICAgIDxwPntkZXNjcmlwdGlvbn08L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4pO1xuXG5TdGVwLnByb3BUeXBlcyA9IHtcbiAgZGVzY3JpcHRpb246IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBuZWVkTGluZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbn07XG5cbmNvbnN0IFN0ZXBzID0gKHsgbGlzdCwgc3RlcEhpc3RvcnkgfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXBzLXdyYXBwZXJcIj5cbiAgICB7XG4gICAgICBsaXN0Lm1hcCgoaXRlbSwgaSkgPT4gKFxuICAgICAgICA8U3RlcFxuICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICB7Li4uaXRlbX1cbiAgICAgICAgICBjb21wbGV0ZWQ9e3N0ZXBIaXN0b3J5LmZpbHRlcihzaCA9PiBzaC5zdGVwSWQgPT09IGl0ZW0uaWQpLmxlbmd0aCA+IDB9XG4gICAgICAgICAgbmVlZExpbmU9e2kgPiAwfVxuICAgICAgICAvPikpXG4gICAgfVxuICA8L2Rpdj5cbik7XG5cblN0ZXBzLnByb3BUeXBlcyA9IHtcbiAgbGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIHN0ZXBIaXN0b3J5OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHN0ZXBJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgfSkpLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdGVwcztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdXR0b25Db21wbGV0ZVRhc2sgPSAoeyBvbkNsaWNrLCBjb21wbGV0ZWQgfSkgPT4gKFxuICA8YnV0dG9uXG4gICAgY2xhc3NOYW1lPXtgYnV0dG9uLWNvbXBsZXRlLXRhc2sgJHsoY29tcGxldGVkKSA/ICdidXR0b24tY29tcGxldGVkLXRhc2snIDogJyd9YH1cbiAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICA+XG4gICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1jaGVja1wiIC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uQ29tcGxldGVUYXNrLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbCxcbn07XG5cbkJ1dHRvbkNvbXBsZXRlVGFzay5kZWZhdWx0UHJvcHMgPSB7XG4gIGNvbXBsZXRlZDogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25Db21wbGV0ZVRhc2s7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgQnV0dG9uRGVsZXRlVGFzayA9ICh7IG9uQ2xpY2sgfSkgPT4gKFxuICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvbi1kZWxldGUtdGFza1wiIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIDxpIGNsYXNzTmFtZT1cImljb24tZGVsZXRlXCIgLz5cbiAgPC9idXR0b24+XG4pO1xuXG5CdXR0b25EZWxldGVUYXNrLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkRlbGV0ZVRhc2s7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBDb2xsYXBzZSBmcm9tICcuLi8uLi9hbmltcy9Db2xsYXBzZSc7XG5pbXBvcnQgRmFkZSBmcm9tICcuLi8uLi9hbmltcy9GYWRlJztcbmltcG9ydCBCdXR0b25Db21wbGV0ZVRhc2sgZnJvbSAnLi9CdXR0b25Db21wbGV0ZVRhc2snO1xuaW1wb3J0IEJ1dHRvbkRlbGV0ZVRhc2sgZnJvbSAnLi9CdXR0b25EZWxldGVUYXNrJztcbmltcG9ydCB7IHRvU2ltcGxlRGF0ZUZvcm1hdCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL0NvbW1vbic7XG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuXG5jbGFzcyBUYXNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGUgPSB7XG4gICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgfTtcblxuICBvblRpdGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBjb2xsYXBzZWQgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGNvbGxhcHNlZDogIWNvbGxhcHNlZCB9KTtcbiAgfVxuXG4gIHJlbmRlckRhdGUoKSB7XG4gICAgY29uc3QgeyB0YXNrIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICh0YXNrLmNvbXBsZXRlZCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHAgY2xhc3NOYW1lPVwiY29tcGxldGUtZGF0ZVwiPntgJHtsYWJlbHMubGFiZWxQYXJ0aWFsQ29tcGxldGVkfSAkeyh0YXNrLmNvbXBsZXRlZEF0KSA/IHRvU2ltcGxlRGF0ZUZvcm1hdCh0YXNrLmNvbXBsZXRlZEF0KSA6ICcnfWB9PC9wPlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxwIGNsYXNzTmFtZT1cImNvbXBsZXRlLXdpdGhpbi1kYXRlXCI+e2Ake2xhYmVscy5sYWJlbFBhcnRpYWxUb0NvbXBsZXRlZH0gJHsodGFzay50b2RvV2l0aGluKSA/IHRvU2ltcGxlRGF0ZUZvcm1hdCh0YXNrLnRvZG9XaXRoaW4pIDogbGFiZWxzLmxhYmVsTm90U2V0fWB9PC9wPlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB0YXNrLCBvbkRlbGV0ZSwgb25Db21wbGV0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGNvbGxhcHNlZCB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YXNrLWl0ZW1cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YXNrLWhlYWRlclwiPlxuICAgICAgICAgIDxwXG4gICAgICAgICAgICBjbGFzc05hbWU9e2B0YXNrLXRpdGxlICR7KHRhc2suY29tcGxldGVkKSA/ICd0YXNrLXRpdGxlLWNvbXBsZXRlZCcgOiAnJ31gfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5vblRpdGxlQ2xpY2soKX1cbiAgICAgICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0YXNrLnRpdGxlfVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8RmFkZSBpbj17Y29sbGFwc2VkfT5cbiAgICAgICAgICAgIDxCdXR0b25EZWxldGVUYXNrXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uRGVsZXRlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0ZhZGU+XG4gICAgICAgICAge1xuICAgICAgICAgICAgb25Db21wbGV0ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICA8QnV0dG9uQ29tcGxldGVUYXNrXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ29tcGxldGV9XG4gICAgICAgICAgICAgIGNvbXBsZXRlZD17dGFzay5jb21wbGV0ZWR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFzay1kYXRlXCI+XG4gICAgICAgICAge3RoaXMucmVuZGVyRGF0ZSgpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPENvbGxhcHNlIGluPXtjb2xsYXBzZWR9PlxuICAgICAgICAgIDxkaXYga2V5PXt0YXNrLmRlc2NyaXB0aW9ufSBjbGFzc05hbWU9XCJ0YXNrLWJvZHlcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRhc2stZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICh0YXNrLmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQgJiYgdGFzay5kZXNjcmlwdGlvbiAhPT0gJycpXG4gICAgICAgICAgICAgICAgPyB0YXNrLmRlc2NyaXB0aW9uIDogPHNwYW4gY2xhc3NOYW1lPVwiZW1wdHlcIj57bGFiZWxzLmxhYmVsTm9EZXNjcmlwdGlvbn08L3NwYW4+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Db2xsYXBzZT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuVGFzay5wcm9wVHlwZXMgPSB7XG4gIG9uRGVsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25Db21wbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIHRhc2s6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBjb21wbGV0ZWRBdDogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgfSkuaXNSZXF1aXJlZCxcbn07XG5cblRhc2suZGVmYXVsdFByb3BzID0ge1xuICBvbkRlbGV0ZTogdW5kZWZpbmVkLFxuICBvbkNvbXBsZXRlOiB1bmRlZmluZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBUYXNrO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uR3JvdXAgfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcbmltcG9ydCBSZXNpemUgZnJvbSAnLi4vLi4vYW5pbXMvUmVzaXplJztcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XG5pbXBvcnQgSW5maW5pdGVTY3JvbGwgZnJvbSAnLi4vLi4vbGF5b3V0L0luZmluaXRlU2Nyb2xsJztcbmltcG9ydCB7IHF1ZXJ5SXRlbXNMaW1pdCB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9jb25maWcnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGxpbWl0OiBxdWVyeUl0ZW1zTGltaXQsXG4gIHNraXA6IDAsXG59O1xuXG5jbGFzcyBUYXNrcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRlID0gaW5pdGlhbFN0YXRlO1xuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMobmV4dFByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICBpZiAobmV4dFByb3BzLnNraXAgIT09IHByZXZTdGF0ZS5za2lwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBza2lwOiBuZXh0UHJvcHMuc2tpcCxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgb25GZXRjaFRvZG9UYXNrc05leHQgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsXG4gICAgICBmZXRjaFRhc2tzLCBtb3JlVG9Mb2FkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghbW9yZVRvTG9hZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7IGxpbWl0LCBza2lwIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IG5ld1NraXAgPSBza2lwICsgbGltaXQ7XG4gICAgZmV0Y2hUYXNrcyhjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCwgbGltaXQsIG5ld1NraXApO1xuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHsgc2tpcDogc3RhdGUuc2tpcCArIHN0YXRlLmxpbWl0IH0pKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB0YXNrTGlzdCxcbiAgICAgIG9uRGVsZXRlVGFzayxcbiAgICAgIG9uQ29tcGxldGVUYXNrLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiY29udGVudC10b2RvLXRhc2tzXCI+XG4gICAgICAgIDxJbmZpbml0ZVNjcm9sbCBvblNjcm9sbD17dGhpcy5vbkZldGNoVG9kb1Rhc2tzTmV4dH0+XG4gICAgICAgICAgPFRyYW5zaXRpb25Hcm91cD5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGFza0xpc3QubWFwKGFyZyA9PiAoXG4gICAgICAgICAgICAgICAgPFJlc2l6ZSBrZXk9e2FyZy5pZH0+XG4gICAgICAgICAgICAgICAgICA8VGFza1xuICAgICAgICAgICAgICAgICAgICBrZXk9e2FyZy5pZH1cbiAgICAgICAgICAgICAgICAgICAgdGFzaz17YXJnfVxuICAgICAgICAgICAgICAgICAgICBvbkRlbGV0ZT17KCkgPT4gb25EZWxldGVUYXNrKGFyZyl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9eygpID0+IG9uQ29tcGxldGVUYXNrKGFyZyl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvUmVzaXplPlxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvVHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICA8L0luZmluaXRlU2Nyb2xsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5UYXNrcy5wcm9wVHlwZXMgPSB7XG4gIG9uRGVsZXRlVGFzazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25Db21wbGV0ZVRhc2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHRhc2tMaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIG1vcmVUb0xvYWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGZldGNoVGFza3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNhdGVnb3JpZXNJZDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZykuaXNSZXF1aXJlZCxcbiAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVGFza3M7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBWaXNpYmlsaXR5U3dpdGNoIGZyb20gJy4vVmlzaWJpbGl0eVN3aXRjaCc7XG5pbXBvcnQgeyBBTExfVE9ET1MsIE9OTFlfQ09NUExFVEVELCBPTkxZX1RPX0NPTVBMRVRFIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmNvbnN0IFZpc2liaWxpdHlGaWx0ZXIgPSAoe1xuICBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIsIG9uVmlzaWJpbGl0eVN3aXRjaENsaWNrLFxufSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cInZpc2liaWxpdHktZmlsdGVyLXdyYXBwZXJcIj5cbiAgICA8VmlzaWJpbGl0eVN3aXRjaFxuICAgICAgc2VsZWN0ZWQ9eyhzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IE9OTFlfVE9fQ09NUExFVEVcbiAgICAgICAgfHwgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyID09PSBBTExfVE9ET1MpfVxuICAgICAgb25DbGljaz17b25WaXNpYmlsaXR5U3dpdGNoQ2xpY2soT05MWV9UT19DT01QTEVURSl9XG4gICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICA+XG4gICAgICA8aSBjbGFzc05hbWU9XCJpY29uLWNpcmNsZS1ib3JkZXJcIiAvPlxuICAgIDwvVmlzaWJpbGl0eVN3aXRjaD5cbiAgICA8VmlzaWJpbGl0eVN3aXRjaFxuICAgICAgc2VsZWN0ZWQ9eyhzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IE9OTFlfQ09NUExFVEVEXG4gICAgICAgIHx8IHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciA9PT0gQUxMX1RPRE9TKX1cbiAgICAgIG9uQ2xpY2s9e29uVmlzaWJpbGl0eVN3aXRjaENsaWNrKE9OTFlfQ09NUExFVEVEKX1cbiAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgID5cbiAgICAgIDxpIGNsYXNzTmFtZT1cImljb24tY2lyY2xlXCIgLz5cbiAgICA8L1Zpc2liaWxpdHlTd2l0Y2g+XG4gIDwvZGl2PlxuKTtcblxuVmlzaWJpbGl0eUZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvblZpc2liaWxpdHlTd2l0Y2hDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFZpc2liaWxpdHlGaWx0ZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgVmlzaWJpbGl0eVN3aXRjaCA9ICh7XG4gIHNlbGVjdGVkLCBjaGlsZHJlbiwgb25DbGljayxcbn0pID0+IChcbiAgPGRpdlxuICAgIGNsYXNzTmFtZT17YHZpc2liaWxpdHktYnV0dG9uLXN3aXRjaCBhbGlnbi1pdGVtcy1jZW50ZXIgJHsoc2VsZWN0ZWQpID8gJ3NlbGVjdGVkJyA6ICcnfSBgfVxuICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gID5cbiAgICB7Y2hpbGRyZW59XG4gIDwvZGl2PlxuKTtcblxuVmlzaWJpbGl0eVN3aXRjaC5wcm9wVHlwZXMgPSB7XG4gIHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5WaXNpYmlsaXR5U3dpdGNoLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2VsZWN0ZWQ6IGZhbHNlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaWJpbGl0eVN3aXRjaDtcbiIsImNvbnN0IGxhYmVscyA9IHtcbiAgdGl0bGVBZGQ6ICdXaGF0IHdvdWxkIHlvdSBsaWtlIHRvIGFkZD8nLFxuICB0aXRsZUFkZENhdGVnb3J5OiAnQWRkIG5ldyBDQVRFR09SWScsXG4gIHRpdGxlQWRkVGFzazogJ0FkZCBuZXcgVGFzaycsXG4gIHRpdGxlQ2hvb3NlQ2F0ZWdvcnk6ICdDaG9vc2UgYSBDQVRFR09SWScsXG4gIHRpdGxlVG9kb1dpdGhpbjogJ1RvZG8gV2l0aGluJyxcbiAgbGFiZWxGb3JDYXRlZ29yeTogJ2ZvciB0aGUgY2F0ZWdvcnk6JyxcbiAgbGFiZWxEb25lOiAnRG9uZSEnLFxuICBsYWJlbENhdGVnb3J5OiAnQ0FURUdPUlknLFxuICBsYWJlbFRhc2s6ICdUQVNLJyxcbiAgbGFiZWxOb3RTZXQ6ICdub3Qgc2V0JyxcbiAgbGFiZWxOb0Rlc2NyaXB0aW9uOiAnTm8gZGVzY3JpcHRpb24gdG8gc2hvdyA6KCcsXG4gIGxhYmVsUGFydGlhbENvbXBsZXRlZDogJ2NvbXBsZXRlZCcsXG4gIGxhYmVsUGFydGlhbFRvQ29tcGxldGVkOiAndG8gY29tcGxldGUgd2l0aGluJyxcbiAgcGxhY2VIb2xkZXJUaXRsZTogJ1R5cGUgdGhlIHRpdGxlJyxcbiAgcGxhY2VIb2xkZXJEZXNjcmlwdGlvbjogJ1R5cGUgdGhlIGRlc2NyaXB0aW9uJyxcbiAgcGxhY2Vob2xkZXJOYW1lOiAnVHlwZSB0aGUgbmFtZScsXG4gIGJ1dHRvblNjaGVkdWxlOiAnU0NIRURVTEUnLFxuICBidXR0b25BZGQ6ICdBREQnLFxuICBidXR0b25OZXh0OiAnTkVYVCcsXG4gIGJ1dHRvbkJhY2s6ICdORVZFUiBNSU5ELCBHTyBCQUNLJyxcbiAgbXNnVGl0bGVSZXF1aXJlZDogJ0VudGVyIHRoZSB0aXRsZScsXG4gIG1zZ05hbWVSZXF1aXJlZDogJ0VudGVyIHRoZSBuYW1lJyxcbiAgbXNnU2VsZWN0Q2F0ZWdvcnk6ICdTZWxlY3QgYSBjYXRlZ29yeScsXG4gIG1zZ1NlbGVjdERhdGU6ICdQaWNrIGEgZGF0ZSBhbmQgY29tbWl0LiBObyBleGN1c2VzIScsXG4gIHN0ZXBEZXNjV2FudFRvQWRkOiAnV2hhdCB3YW50IHRvIGFkZCcsXG4gIHN0ZXBEZXNjQWRkQ2F0ZWdvcnk6ICdBZGQgYSBjYXRlZ29yeScsXG4gIHN0ZXBEZXNjclNlbGVjQ2F0ZWdvcnk6ICdTZWxlY3QgYSBjYXRlZ29yeScsXG4gIHN0ZXBEZXNjQWRkVGFzazogJ0FkZCB0YXNrJyxcbiAgc3RlcERlc2NDb21wbGV0ZURhdGU6ICdTY2hlZHVsZScsXG4gIHN0ZXBEZXNjRG9uZTogJ1RoYXRcXCdzIGl0Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxhYmVscztcbiIsImltcG9ydCBsYWJlbHMgZnJvbSAnLi9sYWJlbHMnO1xuXG5leHBvcnQgY29uc3QgU0VMRUNUX1dBTlRfVE9fQUREID0gJ1NFTEVDVF9XQU5UX1RPX0FERCc7XG5leHBvcnQgY29uc3QgQUREX0NBVEVHT1JZID0gJ0FERF9DQVRFR09SWSc7XG5leHBvcnQgY29uc3QgQUREX1RBU0sgPSAnQUREX1RBU0snO1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9DQVRFR09SWSA9ICdTRUxFQ1RfQ0FURUdPUlknO1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9DT01QTEVURV9EQVRFID0gJ1NFTEVDVF9DT01QTEVURV9EQVRFJztcbmV4cG9ydCBjb25zdCBET05FID0gJ0RPTkUnO1xuXG5leHBvcnQgY29uc3Qgc3RlcExpc3QgPSBbXG4gIHtcbiAgICBpZDogU0VMRUNUX1dBTlRfVE9fQURELFxuICAgIGRlc2NyaXB0aW9uOiBsYWJlbHMuc3RlcERlc2NXYW50VG9BZGQsXG4gIH0sXG4gIHtcbiAgICBpZDogQUREX0NBVEVHT1JZLFxuICAgIGRlc2NyaXB0aW9uOiBsYWJlbHMuc3RlcERlc2NBZGRDYXRlZ29yeSxcbiAgfSxcbiAge1xuICAgIGlkOiBTRUxFQ1RfQ0FURUdPUlksXG4gICAgZGVzY3JpcHRpb246IGxhYmVscy5zdGVwRGVzY3JTZWxlY0NhdGVnb3J5LFxuICB9LFxuICB7XG4gICAgaWQ6IEFERF9UQVNLLFxuICAgIGRlc2NyaXB0aW9uOiBsYWJlbHMuc3RlcERlc2NBZGRUYXNrLFxuICB9LFxuICB7XG4gICAgaWQ6IFNFTEVDVF9DT01QTEVURV9EQVRFLFxuICAgIGRlc2NyaXB0aW9uOiBsYWJlbHMuc3RlcERlc2NDb21wbGV0ZURhdGUsXG4gIH0sXG4gIHtcbiAgICBpZDogRE9ORSxcbiAgICBkZXNjcmlwdGlvbjogbGFiZWxzLnN0ZXBEZXNjRG9uZSxcbiAgfSxcbl07XG4iLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IENhdGVnb3JpZXNGaWx0ZXIgZnJvbSAnLi4vY29tcG9uZW50cy90b2RvL2NhdGVnb3J5L0NhdGVnb3JpZXNGaWx0ZXInO1xuaW1wb3J0IHtcbiAgc2VsZWN0Q2F0ZWdvcnksXG4gIHNlbGVjdENhdGVnb3J5QWxsLFxuICBkZWxldGVDYXRlZ29yeSxcbn0gZnJvbSAnLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuaW1wb3J0IGNhdGVnb3J5QWxsIGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuXG5pbXBvcnQgeyBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdCB9IGZyb20gJy4uL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IChcbiAge1xuICAgIGNhdGVnb3J5TGlzdDogZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3Qoc3RhdGUpLFxuICB9XG4pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoXG4gIHtcbiAgICBvbkRlbGV0ZUNhdGVnb3J5OiAoY2F0ZWdvcnkpID0+IHtcbiAgICAgIGRpc3BhdGNoKGRlbGV0ZUNhdGVnb3J5KGNhdGVnb3J5LmlkKSk7XG4gICAgfSxcbiAgICBvbkNpbGNrQ2F0ZWdvcnk6IChjYXRlZ29yeSwgZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2knICYmIGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2J1dHRvbicpIHtcbiAgICAgICAgaWYgKGNhdGVnb3J5LmlkID09PSBjYXRlZ29yeUFsbC5pZCkge1xuICAgICAgICAgIGRpc3BhdGNoKHNlbGVjdENhdGVnb3J5QWxsKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpc3BhdGNoKHNlbGVjdENhdGVnb3J5KGNhdGVnb3J5KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICB9XG4pO1xuXG5jb25zdCBDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyID0gY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pKENhdGVnb3JpZXNGaWx0ZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyO1xuIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBUYXNrcyBmcm9tICcuLi9jb21wb25lbnRzL3RvZG8vdGFzay9UYXNrcyc7XG5pbXBvcnQge1xuICBmZXRjaFRhc2tzQnlDYXRlZ29yeSxcbiAgZGVsZXRlVGFzayxcbiAgdG9vZ2xlVGFza0NvbXBsZXRlZCxcbn0gZnJvbSAnLi4vYWN0aW9ucy90b2RvVGFza3NBY3Rpb25zJztcblxuaW1wb3J0IHsgZ2V0VGFza0xpc3QsIGdldFNraXAsIHN0aWxsTW9yZVRvTG9hZCB9IGZyb20gJy4uL3NlbGVjdG9ycy90b2RvVGFza3NTZWxlY3RvcnMnO1xuaW1wb3J0IHsgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQsIHZpc2liaWxpdHlPbmx5Q29tcGxldGVkIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgdGFza0xpc3Q6IGdldFRhc2tMaXN0KHN0YXRlKSxcbiAgICBza2lwOiBnZXRTa2lwKHN0YXRlKSxcbiAgICBtb3JlVG9Mb2FkOiBzdGlsbE1vcmVUb0xvYWQoc3RhdGUpLFxuICAgIGNhdGVnb3JpZXNJZDogZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQoc3RhdGUpLFxuICAgIGNvbXBsZXRlZDogdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQoc3RhdGUpLFxuICB9XG4pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoXG4gIHtcbiAgICBvbkRlbGV0ZVRhc2s6ICh0YXNrKSA9PiB7XG4gICAgICBkaXNwYXRjaChkZWxldGVUYXNrKHRhc2suaWQpKTtcbiAgICB9LFxuICAgIG9uQ29tcGxldGVUYXNrOiAodGFzaykgPT4ge1xuICAgICAgZGlzcGF0Y2godG9vZ2xlVGFza0NvbXBsZXRlZCh0YXNrLmlkLCB0YXNrLmNvbXBsZXRlZCkpO1xuICAgIH0sXG4gICAgZmV0Y2hUYXNrczogKGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgc2tpcCkgPT4ge1xuICAgICAgZGlzcGF0Y2goZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkoY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsIGxpbWl0LCBza2lwKSk7XG4gICAgfSxcbiAgfVxuKTtcblxuY29uc3QgVGFza3NDb250YWluZXIgPSBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbikoVGFza3MpO1xuXG5leHBvcnQgZGVmYXVsdCBUYXNrc0NvbnRhaW5lcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgVG9kb3MgZnJvbSAnLi4vY29tcG9uZW50cy90b2RvL1RvZG9zJztcbmltcG9ydCB7IGZldGNoQWxsQ2F0ZWdvcmllcyB9IGZyb20gJy4uL2FjdGlvbnMvdG9kb0ZpbHRlcnNBY3Rpb25zJztcbmltcG9ydCB7IGhpZGVNZXNzYWdlIH0gZnJvbSAnLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5pbXBvcnQgeyBzaG93TG9hZGluZyB9IGZyb20gJy4uL3NlbGVjdG9ycy9jb21tb25TZWxlY3RvcnMnO1xuXG5jb25zdCBUb2Rvc0NvbnRhaW5lciA9IHByb3BzID0+IDxUb2RvcyB7Li4ucHJvcHN9IC8+O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICBtZXNzYWdlOiBzdGF0ZS5tZXNzYWdlLFxuICAgIHNob3dMb2FkaW5nOiBzaG93TG9hZGluZyhzdGF0ZSksXG4gIH1cbik7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcbiAge1xuICAgIGhpZGVNZXNzYWdlOiAoKSA9PiB7XG4gICAgICBkaXNwYXRjaChoaWRlTWVzc2FnZSgpKTtcbiAgICB9LFxuICAgIGluaXRGZXRjaEFsbENhdGVnb3JpZXM6ICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKGZldGNoQWxsQ2F0ZWdvcmllcygpKTtcbiAgICB9LFxuICB9XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShUb2Rvc0NvbnRhaW5lcik7XG4iLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpc2liaWxpdHlGaWx0ZXJzIGZyb20gJy4uL2NvbXBvbmVudHMvdG9kby92aXNpYmlsaXR5L1Zpc2liaWxpdHlGaWx0ZXJzJztcbmltcG9ydCB7IGNoYW5nZVZpc2liaWxpdHkgfSBmcm9tICcuLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5cbmltcG9ydCB7IGdldFZpc2liaWxpdHlGaWx0ZXIgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXI6IGdldFZpc2liaWxpdHlGaWx0ZXIoc3RhdGUpLFxuICB9XG4pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoXG4gIHtcbiAgICBvblZpc2liaWxpdHlTd2l0Y2hDbGljazogdmlzaWJpbGl0eSA9PiAoKSA9PiAoXG4gICAgICBkaXNwYXRjaChjaGFuZ2VWaXNpYmlsaXR5KHZpc2liaWxpdHkpKVxuICAgICksXG4gIH1cbik7XG5cbmNvbnN0IFZpc2liaWxpdHlGaWx0ZXJDb250YWluZXIgPSBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbikoVmlzaWJpbGl0eUZpbHRlcnMpO1xuXG5leHBvcnQgZGVmYXVsdCBWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyO1xuIiwiaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgeyBpc0ZldGNoaW5nQ2F0ZWdvcmllc0ZpbHRlciB9IGZyb20gJy4vdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuaW1wb3J0IHsgaXNGZXRjaGluZ1Rhc2tzIH0gZnJvbSAnLi90b2RvVGFza3NTZWxlY3RvcnMnO1xuXG5leHBvcnQgY29uc3Qgc2hvd0xvYWRpbmcgPSBjcmVhdGVTZWxlY3RvcihcbiAgaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIsXG4gIGlzRmV0Y2hpbmdUYXNrcyxcbiAgKGlzRmV0Y2hpbmdDYXRlZ29yaWVzLCBpc0ZldGNoaW5nVG9kb3MpID0+IGlzRmV0Y2hpbmdDYXRlZ29yaWVzIHx8IGlzRmV0Y2hpbmdUb2Rvcyxcbik7XG5cbmV4cG9ydCBkZWZhdWx0IHNob3dMb2FkaW5nO1xuIiwiaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgeyBPTkxZX0NPTVBMRVRFRCB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuXG5leHBvcnQgY29uc3QgaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy5pc0ZldGNoaW5nO1xuZXhwb3J0IGNvbnN0IGdldFRvZG9GaWx0ZXJzID0gc3RhdGUgPT4gc3RhdGUudG9kb0ZpbHRlcnM7XG5leHBvcnQgY29uc3QgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy5jYXRlZ29yaWVzO1xuZXhwb3J0IGNvbnN0IGdldFZpc2liaWxpdHlGaWx0ZXIgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy52aXNpYmlsaXR5O1xuXG5leHBvcnQgY29uc3QgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0VmlzaWJpbGl0eUZpbHRlcixcbiAgdmlzaWJpbGl0eSA9PiB2aXNpYmlsaXR5ID09PSBPTkxZX0NPTVBMRVRFRCxcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRTZWxlY3RlZENhdGVnb3JpZXNGaWx0ZXIgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QsXG4gIGNhdGVnb3JpZXMgPT4gY2F0ZWdvcmllcy5maWx0ZXIoY2F0ZWdvcnkgPT4gY2F0ZWdvcnkuc2VsZWN0ZWQpLFxuKTtcblxuZXhwb3J0IGNvbnN0IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0LFxuICBjYXRlZ29yaWVzID0+IGNhdGVnb3JpZXMuZmlsdGVyKGNhdGVnb3J5ID0+IGNhdGVnb3J5LnNlbGVjdGVkKVxuICAgIC5tYXAoY2F0ZWdvcnlGaWx0ZXIgPT4gY2F0ZWdvcnlGaWx0ZXIuaWQpLFxuKTtcbiIsImV4cG9ydCBjb25zdCBpc0ZldGNoaW5nVGFza3MgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvVGFza3MuaXNGZXRjaGluZztcbmV4cG9ydCBjb25zdCBnZXRUYXNrcyA9IHN0YXRlID0+IHN0YXRlLnRvZG9UYXNrcztcbmV4cG9ydCBjb25zdCBnZXRUYXNrTGlzdCA9IHN0YXRlID0+IHN0YXRlLnRvZG9UYXNrcy5pdGVtcztcbmV4cG9ydCBjb25zdCBnZXRTa2lwID0gc3RhdGUgPT4gc3RhdGUudG9kb1Rhc2tzLnNraXA7XG5leHBvcnQgY29uc3Qgc3RpbGxNb3JlVG9Mb2FkID0gc3RhdGUgPT4gc3RhdGUudG9kb1Rhc2tzLm1vcmVUb0xvYWQ7XG4iLCJpbXBvcnQgZGF0ZUZvcm1hdCBmcm9tICdkYXRlZm9ybWF0JztcblxuZXhwb3J0IGNvbnN0IHRvSnNEYXRlID0gKHBhcnNlRGF0ZSA9ICcnKSA9PlxuICBuZXcgRGF0ZShwYXJzZUludChwYXJzZURhdGUuc3Vic3RyKDYpLCAxMCkpO1xuXG5leHBvcnQgY29uc3QgdG9TaW1wbGVEYXRlRm9ybWF0ID0gZGF0ZSA9PlxuICBkYXRlRm9ybWF0KGRhdGUsICdkZGRkIGRkIG1tbSB5eXl5Jyk7XG5cbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50QmFzZVVybCA9ICgpID0+IHtcbiAgY29uc3QgZ2V0VXJsID0gd2luZG93LmxvY2F0aW9uO1xuICByZXR1cm4gYCR7Z2V0VXJsLnByb3RvY29sfS8vJHtnZXRVcmwuaG9zdH1gO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=