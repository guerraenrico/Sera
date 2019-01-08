(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["todos"],{

/***/ "./src/actions/todoFiltersActions.js":
/*!*******************************************!*\
  !*** ./src/actions/todoFiltersActions.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectCategoryAll = exports.selectCategory = exports.changeVisibility = exports.addCategory = exports.deleteCategory = exports.fetchAllCategories = undefined;

var _ApiUtils = __webpack_require__(/*! ../utils/ApiUtils */ "./src/utils/ApiUtils.js");

var _RequestUtils = __webpack_require__(/*! ../utils/RequestUtils */ "./src/utils/RequestUtils.js");

var _authActions = __webpack_require__(/*! ./authActions */ "./src/actions/authActions.js");

var _actionTypes = __webpack_require__(/*! ../constants/actionTypes */ "./src/constants/actionTypes.js");

var _config = __webpack_require__(/*! ../constants/config */ "./src/constants/config.js");

var _todoTasksActions = __webpack_require__(/*! ./todoTasksActions */ "./src/actions/todoTasksActions.js");

var _messageActions = __webpack_require__(/*! ./messageActions */ "./src/actions/messageActions.js");

var _todoFiltersSelectors = __webpack_require__(/*! ../selectors/todoFiltersSelectors */ "./src/selectors/todoFiltersSelectors.js");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fetchTasks = function fetchTasks(state) {
  return (0, _todoTasksActions.fetchTasksByCategory)((0, _todoFiltersSelectors.getSelectedCategoriesId)(state), (0, _todoFiltersSelectors.visibilityOnlyCompleted)(state));
};

var requestFetchAllCategories = function requestFetchAllCategories() {
  return {
    type: _actionTypes.REQUEST_FETCH_ALL_CATEGORIES
  };
};

var receiveFetchAllCategories = function receiveFetchAllCategories(categories) {
  return {
    type: _actionTypes.RECEIVE_FETCH_ALL_CATEGORIES,
    categories: categories
  };
};

var errorFetchAllCategories = function errorFetchAllCategories(error) {
  return {
    type: _actionTypes.ERROR_FETCH_ALL_CATEGORIES,
    error: error
  };
};

var addCategoryLocal = function addCategoryLocal(category) {
  return {
    type: _actionTypes.ADD_CATEGORY_LOCAL,
    category: category
  };
};

var removeCategoryLocal = function removeCategoryLocal(categoryIndex) {
  return {
    type: _actionTypes.REMOVE_CATEGORY_LOCAL,
    categoryIndex: categoryIndex
  };
};

var toogleSelectCategory = function toogleSelectCategory(selectedCategory) {
  return {
    type: _actionTypes.TOOGLE_SELECT_CATEGORY,
    selectedCategory: selectedCategory
  };
};

var toogleSelectCategoryAll = function toogleSelectCategoryAll() {
  return {
    type: _actionTypes.TOOGLE_SELECT_CATEGORY_ALL
  };
};

var switchVisibilityFilter = function switchVisibilityFilter(visibility) {
  return {
    type: _actionTypes.SWITCH_VISIBILITY_FILTER,
    visibility: visibility
  };
};

var fetchAllCategories = exports.fetchAllCategories = function fetchAllCategories() {
  var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config.queryItemsLimit;
  var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
      var accessToken, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch(requestFetchAllCategories());
              _context.prev = 1;
              accessToken = getState().auth.accessToken;
              _context.next = 5;
              return (0, _ApiUtils.callApi)('categories', { limit: limit, skip: skip }, _ApiUtils.Methods.GET, accessToken);

            case 5:
              response = _context.sent;

              if (!response.success) {
                _context.next = 11;
                break;
              }

              dispatch(receiveFetchAllCategories(response.data));
              dispatch((0, _todoTasksActions.fetchTasksByCategory)((0, _todoFiltersSelectors.getSelectedCategoriesId)(getState())));
              _context.next = 18;
              break;

            case 11:
              if (!(0, _RequestUtils.shouldRefreshToken)(response)) {
                _context.next = 16;
                break;
              }

              _context.next = 14;
              return dispatch((0, _authActions.refreshAccessToken)());

            case 14:
              dispatch(fetchAllCategories(limit, skip));
              return _context.abrupt('return');

            case 16:
              dispatch(errorFetchAllCategories(response.error.message));
              dispatch((0, _messageActions.showMessageError)(response.error.message));

            case 18:
              _context.next = 23;
              break;

            case 20:
              _context.prev = 20;
              _context.t0 = _context['catch'](1);

              dispatch((0, _messageActions.showMessageError)(_context.t0.message));

            case 23:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[1, 20]]);
    }));

    return function (_x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
};

var deleteCategory = exports.deleteCategory = function deleteCategory() {
  var categoryId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
      var accessToken, response, categories, categoryIndex;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              accessToken = getState().auth.accessToken;
              _context2.next = 4;
              return (0, _ApiUtils.callApi)('categories', categoryId, _ApiUtils.Methods.DELETE, accessToken);

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
              if (!(0, _RequestUtils.shouldRefreshToken)(response)) {
                _context2.next = 16;
                break;
              }

              _context2.next = 14;
              return dispatch((0, _authActions.refreshAccessToken)());

            case 14:
              dispatch(deleteCategory(categoryId));
              return _context2.abrupt('return');

            case 16:
              dispatch((0, _messageActions.showMessageError)(response.error.message));

            case 17:
              _context2.next = 22;
              break;

            case 19:
              _context2.prev = 19;
              _context2.t0 = _context2['catch'](0);

              dispatch((0, _messageActions.showMessageError)(_context2.t0.message));

            case 22:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 19]]);
    }));

    return function (_x6, _x7) {
      return _ref2.apply(this, arguments);
    };
  }();
};

/**
 * Request to add a category
 * @param {String} name category name to add
 * @param {Function} callback function that need to handle the category created
 */
var addCategory = exports.addCategory = function addCategory() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  return function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState) {
      var accessToken, response, category;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              accessToken = getState().auth.accessToken;
              _context3.next = 4;
              return (0, _ApiUtils.callApi)('categories', { name: name }, _ApiUtils.Methods.POST, accessToken);

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
              if (!(0, _RequestUtils.shouldRefreshToken)(response)) {
                _context3.next = 16;
                break;
              }

              _context3.next = 14;
              return dispatch((0, _authActions.refreshAccessToken)());

            case 14:
              dispatch(addCategory(name, callback));
              return _context3.abrupt('return');

            case 16:
              dispatch((0, _messageActions.showMessageError)(response.error.message));

            case 17:
              _context3.next = 22;
              break;

            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3['catch'](0);

              dispatch((0, _messageActions.showMessageError)(_context3.t0.message));

            case 22:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 19]]);
    }));

    return function (_x10, _x11) {
      return _ref3.apply(this, arguments);
    };
  }();
};

var changeVisibility = exports.changeVisibility = function changeVisibility(visibility) {
  return function (dispatch, getState) {
    dispatch(switchVisibilityFilter(visibility));
    return dispatch(fetchTasks(getState()));
  };
};

var selectCategory = exports.selectCategory = function selectCategory(selectedCategory) {
  return function (dispatch, getState) {
    dispatch(toogleSelectCategory(selectedCategory));
    return dispatch(fetchTasks(getState()));
  };
};

var selectCategoryAll = exports.selectCategoryAll = function selectCategoryAll() {
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toogleTaskCompleted = exports.addTask = exports.deleteTask = exports.fetchTasksByCategory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ApiUtils = __webpack_require__(/*! ../utils/ApiUtils */ "./src/utils/ApiUtils.js");

var _RequestUtils = __webpack_require__(/*! ../utils/RequestUtils */ "./src/utils/RequestUtils.js");

var _authActions = __webpack_require__(/*! ./authActions */ "./src/actions/authActions.js");

var _actionTypes = __webpack_require__(/*! ../constants/actionTypes */ "./src/constants/actionTypes.js");

var _config = __webpack_require__(/*! ../constants/config */ "./src/constants/config.js");

var _messageActions = __webpack_require__(/*! ./messageActions */ "./src/actions/messageActions.js");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var requestFetchTasks = function requestFetchTasks(limit, skip) {
  return {
    type: _actionTypes.REQUEST_FETCH_TASKS,
    limit: limit,
    skip: skip
  };
};

var receiveFetchTasks = function receiveFetchTasks(tasks) {
  return {
    type: _actionTypes.RECEIVE_FETCH_TASKS,
    tasks: tasks
  };
};

var errorFetchTasks = function errorFetchTasks(error) {
  return {
    type: _actionTypes.ERROR_FETCH_TASKS,
    error: error
  };
};

var addTaskLocal = function addTaskLocal(task) {
  return {
    type: _actionTypes.ADD_TASK_LOCAL,
    task: task
  };
};

var removeTaskLocal = function removeTaskLocal(taskIndex) {
  return {
    type: _actionTypes.REMOVE_TASK_LOCAL,
    taskIndex: taskIndex
  };
};

var updateTaskLocal = function updateTaskLocal(task) {
  return {
    type: _actionTypes.UPDATE_TASK_LOCAL,
    task: task
  };
};

var fetchTasksByCategory = exports.fetchTasksByCategory = function fetchTasksByCategory() {
  var categoriesId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var completed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _config.queryItemsLimit;
  var skip = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
      var accessToken, response, tasks;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch(requestFetchTasks(limit, skip));
              _context.prev = 1;
              accessToken = getState().auth.accessToken;
              _context.next = 5;
              return (0, _ApiUtils.callApi)('tasks', {
                categoriesId: categoriesId, completed: completed, limit: limit, skip: skip
              }, _ApiUtils.Methods.GET, accessToken);

            case 5:
              response = _context.sent;

              if (!response.success) {
                _context.next = 11;
                break;
              }

              tasks = response.data.map(function (task) {
                return _extends({}, task, {
                  completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
                  todoWithin: task.todoWithin ? new Date(task.todoWithin) : undefined
                });
              });

              dispatch(receiveFetchTasks(tasks));
              _context.next = 18;
              break;

            case 11:
              if (!(0, _RequestUtils.shouldRefreshToken)(response)) {
                _context.next = 16;
                break;
              }

              _context.next = 14;
              return dispatch((0, _authActions.refreshAccessToken)());

            case 14:
              dispatch(fetchTasksByCategory(categoriesId, completed, limit, skip));
              return _context.abrupt('return');

            case 16:
              dispatch(errorFetchTasks(response.error.message));
              dispatch((0, _messageActions.showMessageError)(response.error.message));

            case 18:
              _context.next = 23;
              break;

            case 20:
              _context.prev = 20;
              _context.t0 = _context['catch'](1);

              dispatch((0, _messageActions.showMessageError)(_context.t0.message));

            case 23:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[1, 20]]);
    }));

    return function (_x5, _x6) {
      return _ref.apply(this, arguments);
    };
  }();
};

var deleteTask = exports.deleteTask = function deleteTask() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
      var accessToken, response, items, todoArgumentIndex;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              accessToken = getState().auth.accessToken;
              _context2.next = 4;
              return (0, _ApiUtils.callApi)('tasks', id, _ApiUtils.Methods.DELETE, accessToken);

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
              if (!(0, _RequestUtils.shouldRefreshToken)(response)) {
                _context2.next = 16;
                break;
              }

              _context2.next = 14;
              return dispatch((0, _authActions.refreshAccessToken)());

            case 14:
              dispatch(deleteTask(id));
              return _context2.abrupt('return');

            case 16:
              dispatch((0, _messageActions.showMessageError)(response.error.message));

            case 17:
              _context2.next = 22;
              break;

            case 19:
              _context2.prev = 19;
              _context2.t0 = _context2['catch'](0);

              dispatch((0, _messageActions.showMessageError)(_context2.t0.message));

            case 22:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 19]]);
    }));

    return function (_x8, _x9) {
      return _ref2.apply(this, arguments);
    };
  }();
};

var addTask = exports.addTask = function addTask() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var description = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var category = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { id: '' };
  var todoWithin = arguments[3];
  var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
  return function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState) {
      var accessToken, response, fetchedTask, task;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              accessToken = getState().auth.accessToken;
              _context3.next = 4;
              return (0, _ApiUtils.callApi)('tasks', {
                title: title,
                description: description,
                categoryId: category.id,
                todoWithin: todoWithin
              }, _ApiUtils.Methods.POST, accessToken);

            case 4:
              response = _context3.sent;

              if (!response.success) {
                _context3.next = 12;
                break;
              }

              fetchedTask = response.data;
              task = _extends({}, fetchedTask, {
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
              if (!(0, _RequestUtils.shouldRefreshToken)(response)) {
                _context3.next = 17;
                break;
              }

              _context3.next = 15;
              return dispatch((0, _authActions.refreshAccessToken)());

            case 15:
              dispatch(addTask(title, description, category, todoWithin, callback));
              return _context3.abrupt('return');

            case 17:
              dispatch((0, _messageActions.showMessageError)(response.error.message));

            case 18:
              _context3.next = 23;
              break;

            case 20:
              _context3.prev = 20;
              _context3.t0 = _context3['catch'](0);

              dispatch((0, _messageActions.showMessageError)(_context3.t0.message));

            case 23:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 20]]);
    }));

    return function (_x14, _x15) {
      return _ref3.apply(this, arguments);
    };
  }();
};

var toogleTaskCompleted = exports.toogleTaskCompleted = function toogleTaskCompleted() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var isCompleted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch, getState) {
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
              return (0, _ApiUtils.callApi)('tasks', { id: id, completed: completed, completedAt: completedAt }, _ApiUtils.Methods.PATCH, accessToken);

            case 6:
              response = _context4.sent;

              if (!response.success) {
                _context4.next = 13;
                break;
              }

              fetchedTask = response.data;
              task = _extends({}, fetchedTask, {
                completedAt: fetchedTask.completedAt ? new Date(fetchedTask.completedAt) : undefined
              });

              dispatch(updateTaskLocal(task));
              _context4.next = 19;
              break;

            case 13:
              if (!(0, _RequestUtils.shouldRefreshToken)(response)) {
                _context4.next = 18;
                break;
              }

              _context4.next = 16;
              return dispatch((0, _authActions.refreshAccessToken)());

            case 16:
              dispatch(toogleTaskCompleted(id, isCompleted));
              return _context4.abrupt('return');

            case 18:
              dispatch((0, _messageActions.showMessageError)(response.error.message));

            case 19:
              _context4.next = 24;
              break;

            case 21:
              _context4.prev = 21;
              _context4.t0 = _context4['catch'](2);

              dispatch((0, _messageActions.showMessageError)(_context4.t0.message));

            case 24:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[2, 21]]);
    }));

    return function (_x18, _x19) {
      return _ref4.apply(this, arguments);
    };
  }();
};

/***/ }),

/***/ "./src/components/anims/Collapse.jsx":
/*!*******************************************!*\
  !*** ./src/components/anims/Collapse.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTransitionGroup = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var duration = 300;

var defaultStyle = {
  transition: 'height ' + duration + 'ms ease-in-out',
  height: 0
};

var onEnter = function onEnter(node) {
  var style = node.style;

  style.height = node.firstElementChild.offsetHeight + 'px';
};

var onExit = function onExit(node) {
  var style = node.style;

  style.height = '0px';
};

var Collapse = function Collapse(_ref) {
  var inProp = _ref.in,
      children = _ref.children;
  return _react2.default.createElement(
    _reactTransitionGroup.Transition,
    { onEnter: onEnter, onExit: onExit, 'in': inProp, timeout: duration },
    function () {
      return _react2.default.createElement(
        'div',
        { style: _extends({}, defaultStyle)
        },
        children
      );
    }
  );
};

Collapse.propTypes = {
  in: _propTypes2.default.bool.isRequired,
  children: _propTypes2.default.node.isRequired
};

exports.default = Collapse;

/***/ }),

/***/ "./src/components/anims/DialogAnim.jsx":
/*!*********************************************!*\
  !*** ./src/components/anims/DialogAnim.jsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTransitionGroup = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var duration = 250;

var defaultStyle = {
  transition: 'all ' + duration + 'ms ease-in-out',
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
  return _react2.default.createElement(
    _reactTransitionGroup.Transition,
    { 'in': inProp, timeout: duration },
    function (state) {
      return _react2.default.createElement(
        'div',
        {
          id: 'backdrop-dialog',
          style: _extends({}, defaultStyle, transitionStyles[state])
        },
        children
      );
    }
  );
};

DialogAnim.propTypes = {
  in: _propTypes2.default.bool.isRequired,
  children: _propTypes2.default.node.isRequired
};

exports.default = DialogAnim;

/***/ }),

/***/ "./src/components/anims/Resize.jsx":
/*!*****************************************!*\
  !*** ./src/components/anims/Resize.jsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTransitionGroup = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var duration = {
  enter: 300,
  exit: 200
};

var defaultStyle = {
  transition: 'all ' + duration.enter + 'ms ease-in-out',
  height: 0,
  opacity: 0
};

var onEnter = function onEnter(node) {
  var style = node.style;

  style.height = node.firstElementChild.offsetHeight + 'px';
  style.opacity = 1;
};

var onEntered = function onEntered(node) {
  var style = node.style;

  style.height = 'auto';
};

var onExit = function onExit(node) {
  var style = node.style;

  style.height = node.firstElementChild.offsetHeight + 'px';
};

var onExited = function onExited(node) {
  var style = node.style;

  style.height = '0px';
  style.opacity = 0;
};

var Resize = function Resize(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ['children']);

  return _react2.default.createElement(
    _reactTransitionGroup.Transition,
    _extends({}, props, {
      onEnter: onEnter,
      onEntered: onEntered,
      onExit: onExit,
      onExited: onExited,
      timeout: duration
    }),
    function () {
      return _react2.default.createElement(
        'div',
        { style: _extends({}, defaultStyle)
        },
        children
      );
    }
  );
};

Resize.propTypes = {
  children: _propTypes2.default.node.isRequired
};

exports.default = Resize;

/***/ }),

/***/ "./src/components/anims/SnackbarAnim.jsx":
/*!***********************************************!*\
  !*** ./src/components/anims/SnackbarAnim.jsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTransitionGroup = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var duration = 250;

var defaultStyle = {
  transition: 'all ' + duration + 'ms ease-in-out',
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
  return _react2.default.createElement(
    _reactTransitionGroup.Transition,
    { 'in': inProp, timeout: duration },
    function (state) {
      return _react2.default.createElement(
        'div',
        {
          id: 'content-snackbar',
          style: _extends({}, defaultStyle, transitionStyles[state]),
          className: customClass
        },
        children
      );
    }
  );
};

SnackbarAnim.propTypes = {
  in: _propTypes2.default.bool.isRequired,
  children: _propTypes2.default.node.isRequired,
  customClass: _propTypes2.default.string
};

SnackbarAnim.defaultProps = {
  customClass: ''
};

exports.default = SnackbarAnim;

/***/ }),

/***/ "./src/components/layout/ButtonScoll.jsx":
/*!***********************************************!*\
  !*** ./src/components/layout/ButtonScoll.jsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonScroll = function ButtonScroll(_ref) {
  var onClick = _ref.onClick,
      direction = _ref.direction;
  return _react2.default.createElement(
    'button',
    { className: 'button-scroll ' + direction, onClick: onClick },
    _react2.default.createElement('i', { className: direction === 'left' ? 'icon-backward' : 'icon-forward' })
  );
};

ButtonScroll.propTypes = {
  onClick: _propTypes2.default.func.isRequired,
  direction: _propTypes2.default.oneOf(['left', 'right'])
};

ButtonScroll.defaultProps = {
  direction: 'left'
};

exports.default = ButtonScroll;

/***/ }),

/***/ "./src/components/layout/InfiniteScroll.jsx":
/*!**************************************************!*\
  !*** ./src/components/layout/InfiniteScroll.jsx ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var waitTime = 500;

var InfiniteScroll = function (_React$Component) {
  _inherits(InfiniteScroll, _React$Component);

  function InfiniteScroll(props) {
    _classCallCheck(this, InfiniteScroll);

    var _this = _possibleConstructorReturn(this, (InfiniteScroll.__proto__ || Object.getPrototypeOf(InfiniteScroll)).call(this, props));

    _this.onScroll = _this.onScroll.bind(_this);
    return _this;
  }

  _createClass(InfiniteScroll, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('scroll', (0, _lodash.throttle)(this.onScroll, waitTime), false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', (0, _lodash.throttle)(this.onScroll, waitTime), false);
    }
  }, {
    key: 'onScroll',
    value: function onScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        var _props = this.props,
            args = _props.args,
            onScroll = _props.onScroll;

        onScroll.apply(undefined, _toConsumableArray(args));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          className = _props2.className;

      return _react2.default.createElement(
        'div',
        { className: className },
        children
      );
    }
  }]);

  return InfiniteScroll;
}(_react2.default.Component);

InfiniteScroll.propTypes = {
  args: _propTypes2.default.arrayOf(_propTypes2.default.any),
  children: _propTypes2.default.node.isRequired,
  className: _propTypes2.default.string,
  onScroll: _propTypes2.default.func.isRequired
};

InfiniteScroll.defaultProps = {
  args: [],
  className: ''
};

exports.default = InfiniteScroll;

/***/ }),

/***/ "./src/components/layout/MainAddButton.jsx":
/*!*************************************************!*\
  !*** ./src/components/layout/MainAddButton.jsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MainAddButton = function MainAddButton(_ref) {
  var onClick = _ref.onClick;
  return _react2.default.createElement(
    'button',
    { id: 'main-add-button', onClick: onClick },
    _react2.default.createElement(
      'i',
      { className: 'material-icons' },
      '\uE145'
    )
  );
};

MainAddButton.propTypes = {
  onClick: _propTypes2.default.func.isRequired
};

exports.default = MainAddButton;

/***/ }),

/***/ "./src/components/layout/Snackbar.jsx":
/*!********************************************!*\
  !*** ./src/components/layout/Snackbar.jsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SnackbarAnim = __webpack_require__(/*! ../anims/SnackbarAnim */ "./src/components/anims/SnackbarAnim.jsx");

var _SnackbarAnim2 = _interopRequireDefault(_SnackbarAnim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Action = function Action(_ref) {
  var onClick = _ref.onClick,
      text = _ref.text;
  return _react2.default.createElement(
    'button',
    { className: 'button-action-snackbar', onClick: onClick },
    text
  );
};

Action.propTypes = {
  text: _propTypes2.default.string.isRequired,
  onClick: _propTypes2.default.func.isRequired
};

var Snackbar = function (_React$Component) {
  _inherits(Snackbar, _React$Component);

  function Snackbar() {
    _classCallCheck(this, Snackbar);

    return _possibleConstructorReturn(this, (Snackbar.__proto__ || Object.getPrototypeOf(Snackbar)).apply(this, arguments));
  }

  _createClass(Snackbar, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _props = this.props,
          onClose = _props.onClose,
          duration = _props.duration,
          show = _props.show;


      if (show) {
        setTimeout(function () {
          onClose();
        }, duration);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          message = _props2.message,
          isError = _props2.isError,
          actionText = _props2.actionText,
          actionClick = _props2.actionClick,
          show = _props2.show,
          verticalPostion = _props2.verticalPostion,
          horizontalPosition = _props2.horizontalPosition;

      return _react2.default.createElement(
        _SnackbarAnim2.default,
        { 'in': show, customClass: verticalPostion + ' ' + horizontalPosition },
        _react2.default.createElement(
          'div',
          {
            className: 'snackbar ' + (isError ? 'error' : '')
          },
          _react2.default.createElement(
            'span',
            { className: 'snackbar-message' },
            message
          ),
          actionText !== '' && actionClick !== undefined && _react2.default.createElement(Action, { onClick: actionClick, text: actionText })
        )
      );
    }
  }]);

  return Snackbar;
}(_react2.default.Component);

Snackbar.propTypes = {
  show: _propTypes2.default.bool.isRequired,
  message: _propTypes2.default.string.isRequired,
  onClose: _propTypes2.default.func.isRequired,
  duration: _propTypes2.default.number,
  isError: _propTypes2.default.bool,
  actionText: _propTypes2.default.string,
  actionClick: _propTypes2.default.func,
  verticalPostion: _propTypes2.default.oneOf(['top', 'bottom']),
  horizontalPosition: _propTypes2.default.oneOf(['left', 'right'])
};

Snackbar.defaultProps = {
  duration: 5000,
  isError: false,
  actionText: '',
  actionClick: undefined,
  verticalPostion: 'bottom',
  horizontalPosition: 'right'
};

exports.default = Snackbar;

/***/ }),

/***/ "./src/components/todo/Todos.jsx":
/*!***************************************!*\
  !*** ./src/components/todo/Todos.jsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _LoaderLinear = __webpack_require__(/*! ../layout/LoaderLinear */ "./src/components/layout/LoaderLinear.jsx");

var _LoaderLinear2 = _interopRequireDefault(_LoaderLinear);

var _MainAddButton = __webpack_require__(/*! ../layout/MainAddButton */ "./src/components/layout/MainAddButton.jsx");

var _MainAddButton2 = _interopRequireDefault(_MainAddButton);

var _CategoriesFilterContainer = __webpack_require__(/*! ../../containers/CategoriesFilterContainer */ "./src/containers/CategoriesFilterContainer.jsx");

var _CategoriesFilterContainer2 = _interopRequireDefault(_CategoriesFilterContainer);

var _VisibilityFilterContainer = __webpack_require__(/*! ../../containers/VisibilityFilterContainer */ "./src/containers/VisibilityFilterContainer.jsx");

var _VisibilityFilterContainer2 = _interopRequireDefault(_VisibilityFilterContainer);

var _TasksContainer = __webpack_require__(/*! ../../containers/TasksContainer */ "./src/containers/TasksContainer.jsx");

var _TasksContainer2 = _interopRequireDefault(_TasksContainer);

var _DialogAdd = __webpack_require__(/*! ./dialogAdd/DialogAdd */ "./src/components/todo/dialogAdd/DialogAdd.jsx");

var _DialogAdd2 = _interopRequireDefault(_DialogAdd);

var _Snackbar = __webpack_require__(/*! ../layout/Snackbar */ "./src/components/layout/Snackbar.jsx");

var _Snackbar2 = _interopRequireDefault(_Snackbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Todos = function (_Component) {
  _inherits(Todos, _Component);

  function Todos(props) {
    _classCallCheck(this, Todos);

    var _this = _possibleConstructorReturn(this, (Todos.__proto__ || Object.getPrototypeOf(Todos)).call(this, props));

    _this.state = {
      isDialogAddOpen: false
    };
    return _this;
  }

  _createClass(Todos, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var initFetchAllCategories = this.props.initFetchAllCategories;

      initFetchAllCategories();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var isDialogAddOpen = this.state.isDialogAddOpen;
      var _props = this.props,
          message = _props.message,
          hideMessage = _props.hideMessage,
          showLoading = _props.showLoading;

      return _react2.default.createElement(
        'div',
        { className: 'content-app' },
        _react2.default.createElement(_LoaderLinear2.default, { show: showLoading }),
        _react2.default.createElement(
          'div',
          { id: 'main-top-bar' },
          _react2.default.createElement(_CategoriesFilterContainer2.default, null),
          _react2.default.createElement(_VisibilityFilterContainer2.default, null),
          _react2.default.createElement(_MainAddButton2.default, {
            onClick: function onClick() {
              return _this2.setState({ isDialogAddOpen: true });
            }
          })
        ),
        _react2.default.createElement(_TasksContainer2.default, null),
        _react2.default.createElement(_DialogAdd2.default, {
          open: isDialogAddOpen,
          onClose: function onClose() {
            return _this2.setState({ isDialogAddOpen: false });
          }
        }),
        _react2.default.createElement(_Snackbar2.default, {
          show: message.show,
          isError: message.isError,
          message: message.text,
          onClose: function onClose() {
            return hideMessage();
          }
        })
      );
    }
  }]);

  return Todos;
}(_react.Component);

Todos.propTypes = {
  message: _propTypes2.default.shape({
    show: _propTypes2.default.bool.isRequired,
    isError: _propTypes2.default.bool.isRequired,
    text: _propTypes2.default.string.isRequired
  }).isRequired,
  hideMessage: _propTypes2.default.func.isRequired,
  initFetchAllCategories: _propTypes2.default.func.isRequired,
  showLoading: _propTypes2.default.bool.isRequired
};

exports.default = Todos;

/***/ }),

/***/ "./src/components/todo/category/ButtonDeleteCategory.jsx":
/*!***************************************************************!*\
  !*** ./src/components/todo/category/ButtonDeleteCategory.jsx ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonDeleteCategory = function ButtonDeleteCategory(_ref) {
  var onClick = _ref.onClick;
  return _react2.default.createElement(
    'button',
    { className: 'button-delete-category', onClick: onClick },
    _react2.default.createElement('i', { className: 'icon-delete' })
  );
};

ButtonDeleteCategory.propTypes = {
  onClick: _propTypes2.default.func.isRequired
};

exports.default = ButtonDeleteCategory;

/***/ }),

/***/ "./src/components/todo/category/CategoriesFilter.jsx":
/*!***********************************************************!*\
  !*** ./src/components/todo/category/CategoriesFilter.jsx ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTransitionGroup = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/index.js");

var _scroll = __webpack_require__(/*! scroll */ "./node_modules/scroll/index.js");

var _scroll2 = _interopRequireDefault(_scroll);

var _ButtonScoll = __webpack_require__(/*! ../../layout/ButtonScoll */ "./src/components/layout/ButtonScoll.jsx");

var _ButtonScoll2 = _interopRequireDefault(_ButtonScoll);

var _Category = __webpack_require__(/*! ./Category */ "./src/components/todo/category/Category.jsx");

var _Category2 = _interopRequireDefault(_Category);

var _Fade = __webpack_require__(/*! ../../anims/Fade */ "./src/components/anims/Fade.jsx");

var _Fade2 = _interopRequireDefault(_Fade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CategoriesFilter = function (_React$Component) {
  _inherits(CategoriesFilter, _React$Component);

  function CategoriesFilter(props) {
    _classCallCheck(this, CategoriesFilter);

    var _this = _possibleConstructorReturn(this, (CategoriesFilter.__proto__ || Object.getPrototypeOf(CategoriesFilter)).call(this, props));

    _this.chips = undefined;
    _this.handleLeftScrollClick = _this.handleLeftScrollClick.bind(_this);
    _this.handleRightScrollClick = _this.handleRightScrollClick.bind(_this);
    _this.moveChipsScroll = _this.moveChipsScroll.bind(_this);
    return _this;
  }

  _createClass(CategoriesFilter, [{
    key: 'handleLeftScrollClick',
    value: function handleLeftScrollClick() {
      if (this.chips) {
        this.moveChipsScroll(-this.chips.clientWidth);
      }
    }
  }, {
    key: 'handleRightScrollClick',
    value: function handleRightScrollClick() {
      if (this.chips) {
        this.moveChipsScroll(this.chips.clientWidth);
      }
    }
  }, {
    key: 'moveChipsScroll',
    value: function moveChipsScroll(delta) {
      if (this.chips) {
        var nextScrollLeft = this.chips.scrollLeft + delta;
        _scroll2.default.left(this.chips, nextScrollLeft);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          categoryList = _props.categoryList,
          onDeleteCategory = _props.onDeleteCategory,
          onCilckCategory = _props.onCilckCategory;

      return _react2.default.createElement(
        'div',
        { id: 'content-categories-filter' },
        _react2.default.createElement(_ButtonScoll2.default, {
          onClick: this.handleLeftScrollClick,
          direction: 'left'
        }),
        _react2.default.createElement(
          'div',
          {
            className: 'categories-filter',
            ref: function ref(node) {
              _this2.chips = node;
            }
          },
          _react2.default.createElement(
            _reactTransitionGroup.TransitionGroup,
            { style: { display: 'inherit', paddingLeft: '1.25em', paddingRight: '1.25em' } },
            categoryList.map(function (category) {
              return _react2.default.createElement(
                _Fade2.default,
                { key: category.id },
                _react2.default.createElement(_Category2.default, {
                  key: category.id,
                  category: category,
                  selected: category.selected,
                  onDelete: onDeleteCategory,
                  onClick: onCilckCategory
                })
              );
            })
          )
        ),
        _react2.default.createElement(_ButtonScoll2.default, {
          onClick: this.handleRightScrollClick,
          direction: 'right'
        })
      );
    }
  }]);

  return CategoriesFilter;
}(_react2.default.Component);

CategoriesFilter.propTypes = {
  categoryList: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    selected: _propTypes2.default.bool.isRequired,
    id: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string.isRequired
  }).isRequired).isRequired,
  onDeleteCategory: _propTypes2.default.func,
  onCilckCategory: _propTypes2.default.func.isRequired
};

CategoriesFilter.defaultProps = {
  onDeleteCategory: undefined
};

exports.default = CategoriesFilter;

/***/ }),

/***/ "./src/components/todo/category/Category.jsx":
/*!***************************************************!*\
  !*** ./src/components/todo/category/Category.jsx ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ButtonDeleteCategory = __webpack_require__(/*! ./ButtonDeleteCategory */ "./src/components/todo/category/ButtonDeleteCategory.jsx");

var _ButtonDeleteCategory2 = _interopRequireDefault(_ButtonDeleteCategory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return _react2.default.createElement(
    'div',
    {
      className: cssClass + ' category-chip align-items-center',
      onClick: onChipClick,
      role: 'presentation'
    },
    _react2.default.createElement(
      'span',
      { className: 'category-text' },
      category.name
    ),
    category.id !== '0' && onDelete !== undefined && _react2.default.createElement(_ButtonDeleteCategory2.default, { onClick: onDeleteClick })
  );
};

Category.propTypes = {
  onDelete: _propTypes2.default.func,
  onClick: _propTypes2.default.func.isRequired,
  category: _propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string.isRequired
  }).isRequired,
  selected: _propTypes2.default.bool.isRequired
};

Category.defaultProps = {
  onDelete: undefined
};

exports.default = Category;

/***/ }),

/***/ "./src/components/todo/dialogAdd/AddCategory.jsx":
/*!*******************************************************!*\
  !*** ./src/components/todo/dialogAdd/AddCategory.jsx ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _labels = __webpack_require__(/*! ../../../constants/labels */ "./src/constants/labels.js");

var _labels2 = _interopRequireDefault(_labels);

var _steps = __webpack_require__(/*! ../../../constants/steps */ "./src/constants/steps.js");

var _todoFiltersActions = __webpack_require__(/*! ../../../actions/todoFiltersActions */ "./src/actions/todoFiltersActions.js");

var _messageActions = __webpack_require__(/*! ../../../actions/messageActions */ "./src/actions/messageActions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddCategory = function (_React$Component) {
  _inherits(AddCategory, _React$Component);

  function AddCategory(props) {
    _classCallCheck(this, AddCategory);

    var _this = _possibleConstructorReturn(this, (AddCategory.__proto__ || Object.getPrototypeOf(AddCategory)).call(this, props));

    _this.state = {
      name: ''
    };
    _this.onInputTextChange = _this.onInputTextChange.bind(_this);
    _this.onButtonAddClick = _this.onButtonAddClick.bind(_this);
    _this.onCategoryCreated = _this.onCategoryCreated.bind(_this);
    return _this;
  }

  _createClass(AddCategory, [{
    key: 'onInputTextChange',
    value: function onInputTextChange(e) {
      this.setState({ name: e.target.value });
    }
  }, {
    key: 'onButtonAddClick',
    value: function onButtonAddClick() {
      var name = this.state.name;
      var dispatch = this.props.dispatch;

      if (name === '') {
        dispatch((0, _messageActions.showMessageInfo)(_labels2.default.msgNameRequired));
        return;
      }
      dispatch((0, _todoFiltersActions.addCategory)(name, this.onCategoryCreated));
    }
  }, {
    key: 'onCategoryCreated',
    value: function onCategoryCreated(selectedCategory) {
      var onNext = this.props.onNext;

      onNext({ stepId: _steps.ADD_TASK, options: { selectedCategory: selectedCategory } });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'content-add-category' },
        _react2.default.createElement(
          'h2',
          null,
          _labels2.default.titleAddCategory
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('input', {
            className: 'main-input',
            type: 'text',
            placeholder: _labels2.default.placeholderName,
            onChange: this.onInputTextChange
          })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'button',
            {
              className: 'main-button',
              onClick: this.onButtonAddClick
            },
            _labels2.default.buttonAdd
          )
        )
      );
    }
  }]);

  return AddCategory;
}(_react2.default.Component);

AddCategory.propTypes = {
  dispatch: _propTypes2.default.func.isRequired,
  onNext: _propTypes2.default.func.isRequired
};

exports.default = (0, _reactRedux.connect)()(AddCategory);

/***/ }),

/***/ "./src/components/todo/dialogAdd/AddTask.jsx":
/*!***************************************************!*\
  !*** ./src/components/todo/dialogAdd/AddTask.jsx ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _labels = __webpack_require__(/*! ../../../constants/labels */ "./src/constants/labels.js");

var _labels2 = _interopRequireDefault(_labels);

var _steps = __webpack_require__(/*! ../../../constants/steps */ "./src/constants/steps.js");

var _messageActions = __webpack_require__(/*! ../../../actions/messageActions */ "./src/actions/messageActions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddTask = function (_React$Component) {
  _inherits(AddTask, _React$Component);

  function AddTask() {
    _classCallCheck(this, AddTask);

    var _this = _possibleConstructorReturn(this, (AddTask.__proto__ || Object.getPrototypeOf(AddTask)).call(this));

    _this.state = {
      title: '',
      description: ''
    };
    _this.onInputTextChange = _this.onInputTextChange.bind(_this);
    _this.onButtonScheduleClick = _this.onButtonScheduleClick.bind(_this);
    return _this;
  }

  _createClass(AddTask, [{
    key: 'onInputTextChange',
    value: function onInputTextChange(name) {
      var _this2 = this;

      return function (e) {
        _this2.setState(_defineProperty({}, name, e.target.value));
      };
    }
  }, {
    key: 'onButtonScheduleClick',
    value: function onButtonScheduleClick() {
      var _props = this.props,
          options = _props.options,
          dispatch = _props.dispatch,
          onNext = _props.onNext;
      var _state = this.state,
          title = _state.title,
          description = _state.description;

      var category = options.selectedCategory;
      if (title === '') {
        dispatch((0, _messageActions.showMessageInfo)(_labels2.default.msgTitleRequired));
        return;
      }
      onNext({ stepId: _steps.SELECT_COMPLETE_DATE, options: { title: title, description: description, category: category } });
    }
  }, {
    key: 'render',
    value: function render() {
      var selectedCategory = this.props.options.selectedCategory;

      return _react2.default.createElement(
        'div',
        { className: 'content-add-task' },
        _react2.default.createElement(
          'h2',
          null,
          _labels2.default.titleAddTask
        ),
        _react2.default.createElement(
          'h3',
          null,
          _labels2.default.labelForCategory,
          _react2.default.createElement(
            'span',
            { className: 'label-category-name' },
            ' ' + selectedCategory.name
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'content-fields' },
          _react2.default.createElement('input', {
            className: 'main-input',
            type: 'text',
            placeholder: _labels2.default.placeHolderTitle,
            onChange: this.onInputTextChange('title')
          }),
          _react2.default.createElement('input', {
            className: 'main-input',
            type: 'text',
            placeholder: _labels2.default.placeHolderDescription,
            onChange: this.onInputTextChange('description')
          })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'button',
            {
              className: 'main-button',
              onClick: this.onButtonScheduleClick
            },
            _labels2.default.buttonSchedule
          )
        )
      );
    }
  }]);

  return AddTask;
}(_react2.default.Component);

AddTask.propTypes = {
  dispatch: _propTypes2.default.func.isRequired,
  options: _propTypes2.default.shape({
    selectedCategory: _propTypes2.default.shape({
      id: _propTypes2.default.string.isRequired,
      name: _propTypes2.default.string.isRequired
    }).isRequired
  }).isRequired,
  onNext: _propTypes2.default.func.isRequired
};

exports.default = (0, _reactRedux.connect)()(AddTask);

/***/ }),

/***/ "./src/components/todo/dialogAdd/DialogAdd.jsx":
/*!*****************************************************!*\
  !*** ./src/components/todo/dialogAdd/DialogAdd.jsx ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SelectActionAdd = __webpack_require__(/*! ./SelectActionAdd */ "./src/components/todo/dialogAdd/SelectActionAdd.jsx");

var _SelectActionAdd2 = _interopRequireDefault(_SelectActionAdd);

var _AddCategory = __webpack_require__(/*! ./AddCategory */ "./src/components/todo/dialogAdd/AddCategory.jsx");

var _AddCategory2 = _interopRequireDefault(_AddCategory);

var _SelectCategory = __webpack_require__(/*! ./SelectCategory */ "./src/components/todo/dialogAdd/SelectCategory.jsx");

var _SelectCategory2 = _interopRequireDefault(_SelectCategory);

var _AddTask = __webpack_require__(/*! ./AddTask */ "./src/components/todo/dialogAdd/AddTask.jsx");

var _AddTask2 = _interopRequireDefault(_AddTask);

var _SelectCompleteDate = __webpack_require__(/*! ./SelectCompleteDate */ "./src/components/todo/dialogAdd/SelectCompleteDate.jsx");

var _SelectCompleteDate2 = _interopRequireDefault(_SelectCompleteDate);

var _Done = __webpack_require__(/*! ./Done */ "./src/components/todo/dialogAdd/Done.jsx");

var _Done2 = _interopRequireDefault(_Done);

var _steps = __webpack_require__(/*! ../../../constants/steps */ "./src/constants/steps.js");

var _ReplaceAnim = __webpack_require__(/*! ../../anims/ReplaceAnim */ "./src/components/anims/ReplaceAnim.jsx");

var _ReplaceAnim2 = _interopRequireDefault(_ReplaceAnim);

var _DialogAnim = __webpack_require__(/*! ../../anims/DialogAnim */ "./src/components/anims/DialogAnim.jsx");

var _DialogAnim2 = _interopRequireDefault(_DialogAnim);

var _Steps = __webpack_require__(/*! ./Steps */ "./src/components/todo/dialogAdd/Steps.jsx");

var _Steps2 = _interopRequireDefault(_Steps);

var _labels = __webpack_require__(/*! ../../../constants/labels */ "./src/constants/labels.js");

var _labels2 = _interopRequireDefault(_labels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getContentToRender = function getContentToRender(steps, props) {
  if (steps.length === 0) {
    return _react2.default.createElement(_SelectActionAdd2.default, props);
  }
  var lastStep = steps[steps.length - 1];
  switch (lastStep.stepId) {
    case _steps.SELECT_WANT_TO_ADD:
      return _react2.default.createElement(_SelectActionAdd2.default, props);
    case _steps.ADD_CATEGORY:
      return _react2.default.createElement(_AddCategory2.default, props);
    case _steps.ADD_TASK:
      return _react2.default.createElement(_AddTask2.default, _extends({}, props, { options: lastStep.options }));
    case _steps.SELECT_CATEGORY:
      return _react2.default.createElement(_SelectCategory2.default, props);
    case _steps.SELECT_COMPLETE_DATE:
      return _react2.default.createElement(_SelectCompleteDate2.default, _extends({}, props, { options: lastStep.options }));
    case _steps.DONE:
      return _react2.default.createElement(_Done2.default, props);
    default:
      return _react2.default.createElement(_SelectActionAdd2.default, props);
  }
};

var initalState = {
  nextSteps: [],
  steps: [{
    stepId: _steps.SELECT_WANT_TO_ADD,
    options: {}
  }],
  showStep: true
};

var DialogAdd = function (_React$Component) {
  _inherits(DialogAdd, _React$Component);

  function DialogAdd(props) {
    _classCallCheck(this, DialogAdd);

    var _this = _possibleConstructorReturn(this, (DialogAdd.__proto__ || Object.getPrototypeOf(DialogAdd)).call(this, props));

    _this.state = _extends({}, initalState);
    _this.onBack = _this.onBack.bind(_this);
    _this.onNext = _this.onNext.bind(_this);
    _this.onResetAndClose = _this.onResetAndClose.bind(_this);
    _this.onAnimationEnd = _this.onAnimationEnd.bind(_this);
    return _this;
  }

  _createClass(DialogAdd, [{
    key: 'onBack',
    value: function onBack() {
      var steps = this.state.steps;
      var onClose = this.props.onClose;

      var stepCount = steps.length;
      if (stepCount === 1) {
        // Returned to the first steps, close the dialog
        this.setState(_extends({}, initalState));
        onClose();
      } else {
        this.setState({
          nextSteps: [].concat(_toConsumableArray(steps.slice(0, steps.length - 1))),
          showStep: false
        });
      }
    }
  }, {
    key: 'onNext',
    value: function onNext() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { stepId: '', options: {} };
      var steps = this.state.steps;

      this.setState({
        nextSteps: [].concat(_toConsumableArray(steps), [_extends({}, step, {
          complete: true
        })]),
        showStep: false
      });
    }
  }, {
    key: 'onResetAndClose',
    value: function onResetAndClose() {
      var _this2 = this;

      var onClose = this.props.onClose;

      onClose();
      setTimeout(function () {
        _this2.setState(_extends({}, initalState));
      }, 500);
    }
  }, {
    key: 'onAnimationEnd',
    value: function onAnimationEnd(node, done) {
      var _this3 = this;

      node.addEventListener('transitionend', function () {
        done();
        var _state = _this3.state,
            nextSteps = _state.nextSteps,
            showStep = _state.showStep;

        if (showStep) {
          return;
        }
        _this3.setState({
          steps: [].concat(_toConsumableArray(nextSteps)),
          showStep: true
        });
      }, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _state2 = this.state,
          steps = _state2.steps,
          showStep = _state2.showStep;
      var _props = this.props,
          onClose = _props.onClose,
          open = _props.open;
      var onNext = this.onNext,
          onResetAndClose = this.onResetAndClose,
          onAnimationEnd = this.onAnimationEnd;

      return _react2.default.createElement(
        _DialogAnim2.default,
        { 'in': open },
        _react2.default.createElement(
          'div',
          { id: 'dialog-add' },
          _react2.default.createElement(
            'div',
            { className: 'dialog-header' },
            _react2.default.createElement(
              'button',
              { id: 'main-close-button', onClick: function onClick() {
                  return onClose();
                } },
              _react2.default.createElement(
                'i',
                { className: 'material-icons' },
                '\uE5CD'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'steps-container' },
            _react2.default.createElement(_Steps2.default, {
              list: _steps.stepList,
              stepHistory: steps
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'dialog-container' },
            _react2.default.createElement(
              _ReplaceAnim2.default,
              { 'in': showStep, endListener: onAnimationEnd },
              getContentToRender(steps, { onNext: onNext, onClose: onResetAndClose })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'dialog-footer' },
            _react2.default.createElement(
              'button',
              {
                id: 'back-button-dialog',
                className: 'text-button',
                onClick: function onClick() {
                  return _this4.onBack();
                }
              },
              _labels2.default.buttonBack
            )
          )
        )
      );
    }
  }]);

  return DialogAdd;
}(_react2.default.Component);

DialogAdd.propTypes = {
  open: _propTypes2.default.bool.isRequired,
  onClose: _propTypes2.default.func.isRequired
};

exports.default = DialogAdd;

/***/ }),

/***/ "./src/components/todo/dialogAdd/Done.jsx":
/*!************************************************!*\
  !*** ./src/components/todo/dialogAdd/Done.jsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _labels = __webpack_require__(/*! ../../../constants/labels */ "./src/constants/labels.js");

var _labels2 = _interopRequireDefault(_labels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Done = function (_React$Component) {
  _inherits(Done, _React$Component);

  function Done() {
    _classCallCheck(this, Done);

    return _possibleConstructorReturn(this, (Done.__proto__ || Object.getPrototypeOf(Done)).apply(this, arguments));
  }

  _createClass(Done, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        var onClose = _this2.props.onClose;

        onClose();
      }, 3000);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'content-done-add' },
        _react2.default.createElement(
          'h2',
          null,
          _labels2.default.labelDone
        ),
        _react2.default.createElement(
          'div',
          { className: 'content-ic-done' },
          _react2.default.createElement('img', {
            src: './client/public/img/ic-done.svg',
            className: 'ic-done',
            alt: 'done icon'
          })
        )
      );
    }
  }]);

  return Done;
}(_react2.default.Component);

Done.propTypes = {
  onClose: _propTypes2.default.func.isRequired
};

exports.default = Done;

/***/ }),

/***/ "./src/components/todo/dialogAdd/SelectActionAdd.jsx":
/*!***********************************************************!*\
  !*** ./src/components/todo/dialogAdd/SelectActionAdd.jsx ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _steps = __webpack_require__(/*! ../../../constants/steps */ "./src/constants/steps.js");

var _labels = __webpack_require__(/*! ../../../constants/labels */ "./src/constants/labels.js");

var _labels2 = _interopRequireDefault(_labels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectActionAdd = function SelectActionAdd(_ref) {
  var onNext = _ref.onNext;
  return _react2.default.createElement(
    'div',
    { className: 'content-select-action-add' },
    _react2.default.createElement(
      'h2',
      null,
      _labels2.default.titleAdd
    ),
    _react2.default.createElement(
      'div',
      { className: 'item-select' },
      _react2.default.createElement(
        'p',
        {
          className: 'select-title',
          onClick: function onClick() {
            return onNext({ stepId: _steps.ADD_CATEGORY, options: {} });
          },
          role: 'presentation'
        },
        _labels2.default.labelCategory
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'item-select' },
      _react2.default.createElement(
        'p',
        {
          className: 'select-title',
          onClick: function onClick() {
            return onNext({ stepId: _steps.SELECT_CATEGORY, options: {} });
          },
          role: 'presentation'
        },
        _labels2.default.labelTask
      )
    )
  );
};

SelectActionAdd.propTypes = {
  onNext: _propTypes2.default.func.isRequired
};

exports.default = SelectActionAdd;

/***/ }),

/***/ "./src/components/todo/dialogAdd/SelectCategory.jsx":
/*!**********************************************************!*\
  !*** ./src/components/todo/dialogAdd/SelectCategory.jsx ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _labels = __webpack_require__(/*! ../../../constants/labels */ "./src/constants/labels.js");

var _labels2 = _interopRequireDefault(_labels);

var _Category = __webpack_require__(/*! ../category/Category */ "./src/components/todo/category/Category.jsx");

var _Category2 = _interopRequireDefault(_Category);

var _steps = __webpack_require__(/*! ../../../constants/steps */ "./src/constants/steps.js");

var _messageActions = __webpack_require__(/*! ../../../actions/messageActions */ "./src/actions/messageActions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectCategory = function (_React$Component) {
  _inherits(SelectCategory, _React$Component);

  function SelectCategory(props) {
    _classCallCheck(this, SelectCategory);

    var _this = _possibleConstructorReturn(this, (SelectCategory.__proto__ || Object.getPrototypeOf(SelectCategory)).call(this, props));

    _this.state = {
      selectedCategory: undefined
    };
    _this.onCategoryClick = _this.onCategoryClick.bind(_this);
    _this.onButtonNextClick = _this.onButtonNextClick.bind(_this);
    return _this;
  }

  _createClass(SelectCategory, [{
    key: 'onCategoryClick',
    value: function onCategoryClick(category) {
      this.setState({ selectedCategory: category });
    }
  }, {
    key: 'onButtonNextClick',
    value: function onButtonNextClick() {
      var selectedCategory = this.state.selectedCategory;
      var _props = this.props,
          onNext = _props.onNext,
          dispatch = _props.dispatch;

      if (selectedCategory === undefined) {
        dispatch((0, _messageActions.showMessageInfo)(_labels2.default.msgSelectCategory));
        return;
      }
      onNext({ stepId: _steps.ADD_TASK, options: { selectedCategory: selectedCategory } });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var categoriesList = this.props.categoriesList;
      var selectedCategory = this.state.selectedCategory;

      return _react2.default.createElement(
        'div',
        { className: 'content-select-category' },
        _react2.default.createElement(
          'h2',
          null,
          _labels2.default.titleChooseCategory
        ),
        _react2.default.createElement(
          'div',
          { id: 'content-categories' },
          categoriesList.map(function (category) {
            return category.id !== '0' ? _react2.default.createElement(_Category2.default, {
              key: category.id,
              category: category,
              selected: selectedCategory !== undefined && category.id === selectedCategory.id,
              onClick: _this2.onCategoryClick
            }) : undefined;
          })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'button',
            {
              className: 'main-button',
              onClick: this.onButtonNextClick
            },
            _labels2.default.buttonNext
          )
        )
      );
    }
  }]);

  return SelectCategory;
}(_react2.default.Component);

SelectCategory.propTypes = {
  dispatch: _propTypes2.default.func.isRequired,
  categoriesList: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string.isRequired
  }).isRequired).isRequired,
  onNext: _propTypes2.default.func.isRequired
};

var mapStateToProp = function mapStateToProp(state) {
  return {
    categoriesList: state.todoFilters.categories
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProp)(SelectCategory);

/***/ }),

/***/ "./src/components/todo/dialogAdd/SelectCompleteDate.jsx":
/*!**************************************************************!*\
  !*** ./src/components/todo/dialogAdd/SelectCompleteDate.jsx ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _reactDatePicker = __webpack_require__(/*! react-date-picker */ "./node_modules/react-date-picker/dist/entry.js");

var _reactDatePicker2 = _interopRequireDefault(_reactDatePicker);

var _labels = __webpack_require__(/*! ../../../constants/labels */ "./src/constants/labels.js");

var _labels2 = _interopRequireDefault(_labels);

var _steps = __webpack_require__(/*! ../../../constants/steps */ "./src/constants/steps.js");

var _todoTasksActions = __webpack_require__(/*! ../../../actions/todoTasksActions */ "./src/actions/todoTasksActions.js");

var _messageActions = __webpack_require__(/*! ../../../actions/messageActions */ "./src/actions/messageActions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectCompleteDate = function (_React$Component) {
  _inherits(SelectCompleteDate, _React$Component);

  function SelectCompleteDate(props) {
    _classCallCheck(this, SelectCompleteDate);

    var _this = _possibleConstructorReturn(this, (SelectCompleteDate.__proto__ || Object.getPrototypeOf(SelectCompleteDate)).call(this, props));

    _this.state = {
      todoWithin: new Date()
    };
    _this.onInputDateChange = _this.onInputDateChange.bind(_this);
    _this.onButtonAddClick = _this.onButtonAddClick.bind(_this);
    _this.onTodoTaskCreated = _this.onTodoTaskCreated.bind(_this);
    return _this;
  }

  _createClass(SelectCompleteDate, [{
    key: 'onInputDateChange',
    value: function onInputDateChange(date) {
      this.setState({ todoWithin: date });
    }
  }, {
    key: 'onButtonAddClick',
    value: function onButtonAddClick() {
      var todoWithin = this.state.todoWithin;
      var _props = this.props,
          dispatch = _props.dispatch,
          options = _props.options;
      var title = options.title,
          description = options.description,
          category = options.category;

      if (!todoWithin || todoWithin === '') {
        dispatch((0, _messageActions.showMessageInfo)(_labels2.default.msgSelectDate));
        return;
      }
      dispatch((0, _todoTasksActions.addTask)(title, description, category, todoWithin, this.onTodoTaskCreated));
    }
  }, {
    key: 'onTodoTaskCreated',
    value: function onTodoTaskCreated() {
      var onNext = this.props.onNext;

      onNext({ stepId: _steps.DONE, options: {} });
    }
  }, {
    key: 'render',
    value: function render() {
      var todoWithin = this.state.todoWithin;

      return _react2.default.createElement(
        'div',
        { className: 'content-select-complete-date' },
        _react2.default.createElement(
          'h2',
          null,
          _labels2.default.titleTodoWithin
        ),
        _react2.default.createElement(
          'div',
          { className: 'content-input' },
          _react2.default.createElement(_reactDatePicker2.default, {
            className: 'main-input',
            calendarClassName: 'dark-calendar',
            onChange: this.onInputDateChange,
            value: todoWithin,
            minDate: new Date(),
            locale: 'en-US',
            clearIcon: _react2.default.createElement('i', { className: 'icon-delete' }),
            calendarIcon: _react2.default.createElement('i', { className: 'icon-calendar' })
          })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'button',
            {
              className: 'main-button',
              onClick: this.onButtonAddClick
            },
            _labels2.default.buttonAdd
          )
        )
      );
    }
  }]);

  return SelectCompleteDate;
}(_react2.default.Component);

SelectCompleteDate.propTypes = {
  dispatch: _propTypes2.default.func.isRequired,
  options: _propTypes2.default.shape({
    title: _propTypes2.default.string.isRequired,
    description: _propTypes2.default.string.isRequired,
    category: _propTypes2.default.shape({
      id: _propTypes2.default.string.isRequired,
      name: _propTypes2.default.string.isRequired
    }).isRequired
  }).isRequired,
  onNext: _propTypes2.default.func.isRequired
};

exports.default = (0, _reactRedux.connect)()(SelectCompleteDate);

/***/ }),

/***/ "./src/components/todo/dialogAdd/Steps.jsx":
/*!*************************************************!*\
  !*** ./src/components/todo/dialogAdd/Steps.jsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Step = function Step(_ref) {
  var description = _ref.description,
      completed = _ref.completed,
      needLine = _ref.needLine;
  return _react2.default.createElement(
    'div',
    { className: 'step-container' },
    needLine && _react2.default.createElement('div', { className: 'line ' + (completed ? 'completed' : '') }),
    _react2.default.createElement(
      'div',
      { className: 'step ' + (completed ? 'completed' : '') },
      _react2.default.createElement('div', { className: 'indicator' }),
      _react2.default.createElement(
        'div',
        { className: 'content-description' },
        _react2.default.createElement(
          'p',
          null,
          description
        )
      )
    )
  );
};

Step.propTypes = {
  description: _propTypes2.default.string.isRequired,
  completed: _propTypes2.default.bool.isRequired,
  needLine: _propTypes2.default.bool.isRequired
};

var Steps = function Steps(_ref2) {
  var list = _ref2.list,
      stepHistory = _ref2.stepHistory;
  return _react2.default.createElement(
    'div',
    { className: 'steps-wrapper' },
    list.map(function (item, i) {
      return _react2.default.createElement(Step, _extends({
        key: item.id
      }, item, {
        completed: stepHistory.filter(function (sh) {
          return sh.stepId === item.id;
        }).length > 0,
        needLine: i > 0
      }));
    })
  );
};

Steps.propTypes = {
  list: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    description: _propTypes2.default.string.isRequired
  }).isRequired).isRequired,
  stepHistory: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    stepId: _propTypes2.default.string
  })).isRequired
};

exports.default = Steps;

/***/ }),

/***/ "./src/components/todo/task/ButtonCompleteTask.jsx":
/*!*********************************************************!*\
  !*** ./src/components/todo/task/ButtonCompleteTask.jsx ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonCompleteTask = function ButtonCompleteTask(_ref) {
  var onClick = _ref.onClick,
      completed = _ref.completed;
  return _react2.default.createElement(
    'button',
    {
      className: 'button-complete-task ' + (completed ? 'button-completed-task' : ''),
      onClick: onClick
    },
    _react2.default.createElement('i', { className: 'icon-check' })
  );
};

ButtonCompleteTask.propTypes = {
  onClick: _propTypes2.default.func.isRequired,
  completed: _propTypes2.default.bool
};

ButtonCompleteTask.defaultProps = {
  completed: false
};

exports.default = ButtonCompleteTask;

/***/ }),

/***/ "./src/components/todo/task/ButtonDeleteTask.jsx":
/*!*******************************************************!*\
  !*** ./src/components/todo/task/ButtonDeleteTask.jsx ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonDeleteTask = function ButtonDeleteTask(_ref) {
  var onClick = _ref.onClick;
  return _react2.default.createElement(
    'button',
    { className: 'button-delete-task', onClick: onClick },
    _react2.default.createElement('i', { className: 'icon-delete' })
  );
};

ButtonDeleteTask.propTypes = {
  onClick: _propTypes2.default.func.isRequired
};

exports.default = ButtonDeleteTask;

/***/ }),

/***/ "./src/components/todo/task/Task.jsx":
/*!*******************************************!*\
  !*** ./src/components/todo/task/Task.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Collapse = __webpack_require__(/*! ../../anims/Collapse */ "./src/components/anims/Collapse.jsx");

var _Collapse2 = _interopRequireDefault(_Collapse);

var _Fade = __webpack_require__(/*! ../../anims/Fade */ "./src/components/anims/Fade.jsx");

var _Fade2 = _interopRequireDefault(_Fade);

var _ButtonCompleteTask = __webpack_require__(/*! ./ButtonCompleteTask */ "./src/components/todo/task/ButtonCompleteTask.jsx");

var _ButtonCompleteTask2 = _interopRequireDefault(_ButtonCompleteTask);

var _ButtonDeleteTask = __webpack_require__(/*! ./ButtonDeleteTask */ "./src/components/todo/task/ButtonDeleteTask.jsx");

var _ButtonDeleteTask2 = _interopRequireDefault(_ButtonDeleteTask);

var _Common = __webpack_require__(/*! ../../../utils/Common */ "./src/utils/Common.js");

var _labels = __webpack_require__(/*! ../../../constants/labels */ "./src/constants/labels.js");

var _labels2 = _interopRequireDefault(_labels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Task = function (_React$Component) {
  _inherits(Task, _React$Component);

  function Task(props) {
    _classCallCheck(this, Task);

    var _this = _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).call(this, props));

    _this.state = {
      collapsed: false
    };
    _this.renderDate = _this.renderDate.bind(_this);
    return _this;
  }

  _createClass(Task, [{
    key: 'onTitleClick',
    value: function onTitleClick() {
      var collapsed = this.state.collapsed;

      this.setState({ collapsed: !collapsed });
    }
  }, {
    key: 'renderDate',
    value: function renderDate() {
      var task = this.props.task;

      if (task.completed) {
        return _react2.default.createElement(
          'p',
          { className: 'complete-date' },
          _labels2.default.labelPartialCompleted + ' ' + (task.completedAt ? (0, _Common.toSimpleDateFormat)(task.completedAt) : '')
        );
      }
      return _react2.default.createElement(
        'p',
        { className: 'complete-within-date' },
        _labels2.default.labelPartialToCompleted + ' ' + (task.todoWithin ? (0, _Common.toSimpleDateFormat)(task.todoWithin) : _labels2.default.labelNotSet)
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          task = _props.task,
          onDelete = _props.onDelete,
          onComplete = _props.onComplete;
      var collapsed = this.state.collapsed;

      return _react2.default.createElement(
        'div',
        { className: 'task-item' },
        _react2.default.createElement(
          'div',
          { className: 'task-header' },
          _react2.default.createElement(
            'p',
            {
              className: 'task-title ' + (task.completed ? 'task-title-completed' : ''),
              onClick: function onClick() {
                return _this2.onTitleClick();
              },
              role: 'presentation'
            },
            task.title
          ),
          _react2.default.createElement(
            _Fade2.default,
            { 'in': collapsed },
            _react2.default.createElement(_ButtonDeleteTask2.default, {
              onClick: onDelete
            })
          ),
          onComplete !== undefined && _react2.default.createElement(_ButtonCompleteTask2.default, {
            onClick: onComplete,
            completed: task.completed
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'task-date' },
          this.renderDate()
        ),
        _react2.default.createElement(
          _Collapse2.default,
          { 'in': collapsed },
          _react2.default.createElement(
            'div',
            { key: task.description, className: 'task-body' },
            _react2.default.createElement(
              'p',
              { className: 'task-description' },
              task.description !== undefined && task.description !== '' ? task.description : _react2.default.createElement(
                'span',
                { className: 'empty' },
                _labels2.default.labelNoDescription
              )
            )
          )
        )
      );
    }
  }]);

  return Task;
}(_react2.default.Component);

Task.propTypes = {
  onDelete: _propTypes2.default.func,
  onComplete: _propTypes2.default.func,
  task: _propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string.isRequired,
    completed: _propTypes2.default.bool.isRequired,
    completedAt: _propTypes2.default.shape({})
  }).isRequired
};

Task.defaultProps = {
  onDelete: undefined,
  onComplete: undefined
};

exports.default = Task;

/***/ }),

/***/ "./src/components/todo/task/Tasks.jsx":
/*!********************************************!*\
  !*** ./src/components/todo/task/Tasks.jsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTransitionGroup = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/index.js");

var _Resize = __webpack_require__(/*! ../../anims/Resize */ "./src/components/anims/Resize.jsx");

var _Resize2 = _interopRequireDefault(_Resize);

var _Task = __webpack_require__(/*! ./Task */ "./src/components/todo/task/Task.jsx");

var _Task2 = _interopRequireDefault(_Task);

var _InfiniteScroll = __webpack_require__(/*! ../../layout/InfiniteScroll */ "./src/components/layout/InfiniteScroll.jsx");

var _InfiniteScroll2 = _interopRequireDefault(_InfiniteScroll);

var _config = __webpack_require__(/*! ../../../constants/config */ "./src/constants/config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var initialState = {
  limit: _config.queryItemsLimit,
  skip: 0
};

var Tasks = function (_React$Component) {
  _inherits(Tasks, _React$Component);

  function Tasks(props) {
    _classCallCheck(this, Tasks);

    var _this = _possibleConstructorReturn(this, (Tasks.__proto__ || Object.getPrototypeOf(Tasks)).call(this, props));

    _this.state = initialState;
    _this.onFetchTodoTasksNext = _this.onFetchTodoTasksNext.bind(_this);
    return _this;
  }

  _createClass(Tasks, [{
    key: 'onFetchTodoTasksNext',
    value: function onFetchTodoTasksNext() {
      var _props = this.props,
          categoriesId = _props.categoriesId,
          completed = _props.completed,
          fetchTasks = _props.fetchTasks,
          moreToLoad = _props.moreToLoad;

      if (!moreToLoad) {
        return;
      }
      var _state = this.state,
          limit = _state.limit,
          skip = _state.skip;

      var newSkip = skip + limit;
      fetchTasks(categoriesId, completed, limit, newSkip);
      this.setState(function (state) {
        return { skip: state.skip + state.limit };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          taskList = _props2.taskList,
          onDeleteTask = _props2.onDeleteTask,
          onCompleteTask = _props2.onCompleteTask;

      return _react2.default.createElement(
        'div',
        { id: 'content-todo-tasks' },
        _react2.default.createElement(
          _InfiniteScroll2.default,
          { onScroll: this.onFetchTodoTasksNext },
          _react2.default.createElement(
            _reactTransitionGroup.TransitionGroup,
            null,
            taskList.map(function (arg) {
              return _react2.default.createElement(
                _Resize2.default,
                { key: arg.id },
                _react2.default.createElement(_Task2.default, {
                  key: arg.id,
                  task: arg,
                  onDelete: function onDelete() {
                    return onDeleteTask(arg);
                  },
                  onComplete: function onComplete() {
                    return onCompleteTask(arg);
                  }
                })
              );
            })
          )
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
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
}(_react2.default.Component);

Tasks.propTypes = {
  onDeleteTask: _propTypes2.default.func.isRequired,
  onCompleteTask: _propTypes2.default.func.isRequired,
  taskList: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string.isRequired,
    completed: _propTypes2.default.bool.isRequired
  }).isRequired).isRequired,
  moreToLoad: _propTypes2.default.bool.isRequired,
  fetchTasks: _propTypes2.default.func.isRequired,
  categoriesId: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  completed: _propTypes2.default.bool.isRequired
};

exports.default = Tasks;

/***/ }),

/***/ "./src/components/todo/visibility/VisibilityFilters.jsx":
/*!**************************************************************!*\
  !*** ./src/components/todo/visibility/VisibilityFilters.jsx ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _VisibilitySwitch = __webpack_require__(/*! ./VisibilitySwitch */ "./src/components/todo/visibility/VisibilitySwitch.jsx");

var _VisibilitySwitch2 = _interopRequireDefault(_VisibilitySwitch);

var _config = __webpack_require__(/*! ../../../constants/config */ "./src/constants/config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VisibilityFilter = function VisibilityFilter(_ref) {
  var selectedVisibilityFilter = _ref.selectedVisibilityFilter,
      onVisibilitySwitchClick = _ref.onVisibilitySwitchClick;
  return _react2.default.createElement(
    'div',
    { className: 'visibility-filter-wrapper' },
    _react2.default.createElement(
      _VisibilitySwitch2.default,
      {
        selected: selectedVisibilityFilter === _config.ONLY_TO_COMPLETE || selectedVisibilityFilter === _config.ALL_TODOS,
        onClick: onVisibilitySwitchClick(_config.ONLY_TO_COMPLETE),
        role: 'presentation'
      },
      _react2.default.createElement('i', { className: 'icon-circle-border' })
    ),
    _react2.default.createElement(
      _VisibilitySwitch2.default,
      {
        selected: selectedVisibilityFilter === _config.ONLY_COMPLETED || selectedVisibilityFilter === _config.ALL_TODOS,
        onClick: onVisibilitySwitchClick(_config.ONLY_COMPLETED),
        role: 'presentation'
      },
      _react2.default.createElement('i', { className: 'icon-circle' })
    )
  );
};

VisibilityFilter.propTypes = {
  selectedVisibilityFilter: _propTypes2.default.string.isRequired,
  onVisibilitySwitchClick: _propTypes2.default.func.isRequired
};

exports.default = VisibilityFilter;

/***/ }),

/***/ "./src/components/todo/visibility/VisibilitySwitch.jsx":
/*!*************************************************************!*\
  !*** ./src/components/todo/visibility/VisibilitySwitch.jsx ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VisibilitySwitch = function VisibilitySwitch(_ref) {
  var selected = _ref.selected,
      children = _ref.children,
      onClick = _ref.onClick;
  return _react2.default.createElement(
    'div',
    {
      className: 'visibility-button-switch align-items-center ' + (selected ? 'selected' : '') + ' ',
      onClick: onClick,
      role: 'presentation'
    },
    children
  );
};

VisibilitySwitch.propTypes = {
  selected: _propTypes2.default.bool,
  children: _propTypes2.default.node.isRequired,
  onClick: _propTypes2.default.func.isRequired
};

VisibilitySwitch.defaultProps = {
  selected: false
};

exports.default = VisibilitySwitch;

/***/ }),

/***/ "./src/constants/labels.js":
/*!*********************************!*\
  !*** ./src/constants/labels.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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

exports.default = labels;

/***/ }),

/***/ "./src/constants/steps.js":
/*!********************************!*\
  !*** ./src/constants/steps.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stepList = exports.DONE = exports.SELECT_COMPLETE_DATE = exports.SELECT_CATEGORY = exports.ADD_TASK = exports.ADD_CATEGORY = exports.SELECT_WANT_TO_ADD = undefined;

var _labels = __webpack_require__(/*! ./labels */ "./src/constants/labels.js");

var _labels2 = _interopRequireDefault(_labels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SELECT_WANT_TO_ADD = exports.SELECT_WANT_TO_ADD = 'SELECT_WANT_TO_ADD';
var ADD_CATEGORY = exports.ADD_CATEGORY = 'ADD_CATEGORY';
var ADD_TASK = exports.ADD_TASK = 'ADD_TASK';
var SELECT_CATEGORY = exports.SELECT_CATEGORY = 'SELECT_CATEGORY';
var SELECT_COMPLETE_DATE = exports.SELECT_COMPLETE_DATE = 'SELECT_COMPLETE_DATE';
var DONE = exports.DONE = 'DONE';

var stepList = exports.stepList = [{
  id: SELECT_WANT_TO_ADD,
  description: _labels2.default.stepDescWantToAdd
}, {
  id: ADD_CATEGORY,
  description: _labels2.default.stepDescAddCategory
}, {
  id: SELECT_CATEGORY,
  description: _labels2.default.stepDescrSelecCategory
}, {
  id: ADD_TASK,
  description: _labels2.default.stepDescAddTask
}, {
  id: SELECT_COMPLETE_DATE,
  description: _labels2.default.stepDescCompleteDate
}, {
  id: DONE,
  description: _labels2.default.stepDescDone
}];

/***/ }),

/***/ "./src/containers/CategoriesFilterContainer.jsx":
/*!******************************************************!*\
  !*** ./src/containers/CategoriesFilterContainer.jsx ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _CategoriesFilter = __webpack_require__(/*! ../components/todo/category/CategoriesFilter */ "./src/components/todo/category/CategoriesFilter.jsx");

var _CategoriesFilter2 = _interopRequireDefault(_CategoriesFilter);

var _todoFiltersActions = __webpack_require__(/*! ../actions/todoFiltersActions */ "./src/actions/todoFiltersActions.js");

var _config = __webpack_require__(/*! ../constants/config */ "./src/constants/config.js");

var _config2 = _interopRequireDefault(_config);

var _todoFiltersSelectors = __webpack_require__(/*! ../selectors/todoFiltersSelectors */ "./src/selectors/todoFiltersSelectors.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    categoryList: (0, _todoFiltersSelectors.getCategoriesFilterList)(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onDeleteCategory: function onDeleteCategory(category) {
      dispatch((0, _todoFiltersActions.deleteCategory)(category.id));
    },
    onCilckCategory: function onCilckCategory(category, e) {
      if (e.target.tagName.toLowerCase() !== 'i' && e.target.tagName.toLowerCase() !== 'button') {
        if (category.id === _config2.default.id) {
          dispatch((0, _todoFiltersActions.selectCategoryAll)());
        } else {
          dispatch((0, _todoFiltersActions.selectCategory)(category));
        }
      }
    }
  };
};

var CategoriesFilterContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_CategoriesFilter2.default);

exports.default = CategoriesFilterContainer;

/***/ }),

/***/ "./src/containers/TasksContainer.jsx":
/*!*******************************************!*\
  !*** ./src/containers/TasksContainer.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _Tasks = __webpack_require__(/*! ../components/todo/task/Tasks */ "./src/components/todo/task/Tasks.jsx");

var _Tasks2 = _interopRequireDefault(_Tasks);

var _todoTasksActions = __webpack_require__(/*! ../actions/todoTasksActions */ "./src/actions/todoTasksActions.js");

var _todoTasksSelectors = __webpack_require__(/*! ../selectors/todoTasksSelectors */ "./src/selectors/todoTasksSelectors.js");

var _todoFiltersSelectors = __webpack_require__(/*! ../selectors/todoFiltersSelectors */ "./src/selectors/todoFiltersSelectors.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    taskList: (0, _todoTasksSelectors.getTaskList)(state),
    skip: (0, _todoTasksSelectors.getSkip)(state),
    moreToLoad: (0, _todoTasksSelectors.stillMoreToLoad)(state),
    categoriesId: (0, _todoFiltersSelectors.getSelectedCategoriesId)(state),
    completed: (0, _todoFiltersSelectors.visibilityOnlyCompleted)(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onDeleteTask: function onDeleteTask(task) {
      dispatch((0, _todoTasksActions.deleteTask)(task.id));
    },
    onCompleteTask: function onCompleteTask(task) {
      dispatch((0, _todoTasksActions.toogleTaskCompleted)(task.id, task.completed));
    },
    fetchTasks: function fetchTasks(categoriesId, completed, limit, skip) {
      dispatch((0, _todoTasksActions.fetchTasksByCategory)(categoriesId, completed, limit, skip));
    }
  };
};

var TasksContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Tasks2.default);

exports.default = TasksContainer;

/***/ }),

/***/ "./src/containers/TodosContainer.jsx":
/*!*******************************************!*\
  !*** ./src/containers/TodosContainer.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _Todos = __webpack_require__(/*! ../components/todo/Todos */ "./src/components/todo/Todos.jsx");

var _Todos2 = _interopRequireDefault(_Todos);

var _todoFiltersActions = __webpack_require__(/*! ../actions/todoFiltersActions */ "./src/actions/todoFiltersActions.js");

var _messageActions = __webpack_require__(/*! ../actions/messageActions */ "./src/actions/messageActions.js");

var _commonSelectors = __webpack_require__(/*! ../selectors/commonSelectors */ "./src/selectors/commonSelectors.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TodosContainer = function TodosContainer(props) {
  return _react2.default.createElement(_Todos2.default, props);
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    message: state.message,
    showLoading: (0, _commonSelectors.showLoading)(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    hideMessage: function hideMessage() {
      dispatch((0, _messageActions.hideMessage)());
    },
    initFetchAllCategories: function initFetchAllCategories() {
      dispatch((0, _todoFiltersActions.fetchAllCategories)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TodosContainer);

/***/ }),

/***/ "./src/containers/VisibilityFilterContainer.jsx":
/*!******************************************************!*\
  !*** ./src/containers/VisibilityFilterContainer.jsx ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _VisibilityFilters = __webpack_require__(/*! ../components/todo/visibility/VisibilityFilters */ "./src/components/todo/visibility/VisibilityFilters.jsx");

var _VisibilityFilters2 = _interopRequireDefault(_VisibilityFilters);

var _todoFiltersActions = __webpack_require__(/*! ../actions/todoFiltersActions */ "./src/actions/todoFiltersActions.js");

var _todoFiltersSelectors = __webpack_require__(/*! ../selectors/todoFiltersSelectors */ "./src/selectors/todoFiltersSelectors.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    selectedVisibilityFilter: (0, _todoFiltersSelectors.getVisibilityFilter)(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onVisibilitySwitchClick: function onVisibilitySwitchClick(visibility) {
      return function () {
        return dispatch((0, _todoFiltersActions.changeVisibility)(visibility));
      };
    }
  };
};

var VisibilityFilterContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_VisibilityFilters2.default);

exports.default = VisibilityFilterContainer;

/***/ }),

/***/ "./src/selectors/commonSelectors.js":
/*!******************************************!*\
  !*** ./src/selectors/commonSelectors.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showLoading = undefined;

var _reselect = __webpack_require__(/*! reselect */ "./node_modules/reselect/lib/index.js");

var _todoFiltersSelectors = __webpack_require__(/*! ./todoFiltersSelectors */ "./src/selectors/todoFiltersSelectors.js");

var _todoTasksSelectors = __webpack_require__(/*! ./todoTasksSelectors */ "./src/selectors/todoTasksSelectors.js");

var showLoading = exports.showLoading = (0, _reselect.createSelector)(_todoFiltersSelectors.isFetchingCategoriesFilter, _todoTasksSelectors.isFetchingTasks, function (isFetchingCategories, isFetchingTodos) {
  return isFetchingCategories || isFetchingTodos;
});

exports.default = showLoading;

/***/ }),

/***/ "./src/selectors/todoFiltersSelectors.js":
/*!***********************************************!*\
  !*** ./src/selectors/todoFiltersSelectors.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSelectedCategoriesId = exports.getSelectedCategoriesFilter = exports.visibilityOnlyCompleted = exports.getVisibilityFilter = exports.getCategoriesFilterList = exports.getTodoFilters = exports.isFetchingCategoriesFilter = undefined;

var _reselect = __webpack_require__(/*! reselect */ "./node_modules/reselect/lib/index.js");

var _config = __webpack_require__(/*! ../constants/config */ "./src/constants/config.js");

var isFetchingCategoriesFilter = exports.isFetchingCategoriesFilter = function isFetchingCategoriesFilter(state) {
  return state.todoFilters.isFetching;
};
var getTodoFilters = exports.getTodoFilters = function getTodoFilters(state) {
  return state.todoFilters;
};
var getCategoriesFilterList = exports.getCategoriesFilterList = function getCategoriesFilterList(state) {
  return state.todoFilters.categories;
};
var getVisibilityFilter = exports.getVisibilityFilter = function getVisibilityFilter(state) {
  return state.todoFilters.visibility;
};

var visibilityOnlyCompleted = exports.visibilityOnlyCompleted = (0, _reselect.createSelector)(getVisibilityFilter, function (visibility) {
  return visibility === _config.ONLY_COMPLETED;
});

var getSelectedCategoriesFilter = exports.getSelectedCategoriesFilter = (0, _reselect.createSelector)(getCategoriesFilterList, function (categories) {
  return categories.filter(function (category) {
    return category.selected;
  });
});

var getSelectedCategoriesId = exports.getSelectedCategoriesId = (0, _reselect.createSelector)(getCategoriesFilterList, function (categories) {
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var isFetchingTasks = exports.isFetchingTasks = function isFetchingTasks(state) {
  return state.todoTasks.isFetching;
};
var getTasks = exports.getTasks = function getTasks(state) {
  return state.todoTasks;
};
var getTaskList = exports.getTaskList = function getTaskList(state) {
  return state.todoTasks.items;
};
var getSkip = exports.getSkip = function getSkip(state) {
  return state.todoTasks.skip;
};
var stillMoreToLoad = exports.stillMoreToLoad = function stillMoreToLoad(state) {
  return state.todoTasks.moreToLoad;
};

/***/ }),

/***/ "./src/utils/Common.js":
/*!*****************************!*\
  !*** ./src/utils/Common.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentBaseUrl = exports.toSimpleDateFormat = exports.toJsDate = undefined;

var _dateformat = __webpack_require__(/*! dateformat */ "./node_modules/dateformat/lib/dateformat.js");

var _dateformat2 = _interopRequireDefault(_dateformat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toJsDate = exports.toJsDate = function toJsDate() {
  var parseDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return new Date(parseInt(parseDate.substr(6), 10));
};

var toSimpleDateFormat = exports.toSimpleDateFormat = function toSimpleDateFormat(date) {
  return (0, _dateformat2.default)(date, 'dddd dd mmm yyyy');
};

var getCurrentBaseUrl = exports.getCurrentBaseUrl = function getCurrentBaseUrl() {
  var getUrl = window.location;
  return getUrl.protocol + '//' + getUrl.host;
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMvdG9kb1Rhc2tzQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9Db2xsYXBzZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvRGlhbG9nQW5pbS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvUmVzaXplLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9TbmFja2JhckFuaW0uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2xheW91dC9CdXR0b25TY29sbC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGF5b3V0L0luZmluaXRlU2Nyb2xsLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9sYXlvdXQvTWFpbkFkZEJ1dHRvbi5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGF5b3V0L1NuYWNrYmFyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL1RvZG9zLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL2NhdGVnb3J5L0J1dHRvbkRlbGV0ZUNhdGVnb3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL2NhdGVnb3J5L0NhdGVnb3JpZXNGaWx0ZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vY2F0ZWdvcnkvQ2F0ZWdvcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vZGlhbG9nQWRkL0FkZENhdGVnb3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL2RpYWxvZ0FkZC9BZGRUYXNrLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL2RpYWxvZ0FkZC9EaWFsb2dBZGQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vZGlhbG9nQWRkL0RvbmUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vZGlhbG9nQWRkL1NlbGVjdEFjdGlvbkFkZC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdG9kby9kaWFsb2dBZGQvU2VsZWN0Q2F0ZWdvcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vZGlhbG9nQWRkL1NlbGVjdENvbXBsZXRlRGF0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdG9kby9kaWFsb2dBZGQvU3RlcHMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vdGFzay9CdXR0b25Db21wbGV0ZVRhc2suanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vdGFzay9CdXR0b25EZWxldGVUYXNrLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL3Rhc2svVGFzay5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdG9kby90YXNrL1Rhc2tzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90b2RvL3Zpc2liaWxpdHkvVmlzaWJpbGl0eUZpbHRlcnMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RvZG8vdmlzaWJpbGl0eS9WaXNpYmlsaXR5U3dpdGNoLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2xhYmVscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL3N0ZXBzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL0NhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL1Rhc2tzQ29udGFpbmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9Ub2Rvc0NvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy9jb21tb25TZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0b3JzL3RvZG9UYXNrc1NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvQ29tbW9uLmpzIl0sIm5hbWVzIjpbImZldGNoVGFza3MiLCJzdGF0ZSIsInJlcXVlc3RGZXRjaEFsbENhdGVnb3JpZXMiLCJ0eXBlIiwiUkVRVUVTVF9GRVRDSF9BTExfQ0FURUdPUklFUyIsInJlY2VpdmVGZXRjaEFsbENhdGVnb3JpZXMiLCJSRUNFSVZFX0ZFVENIX0FMTF9DQVRFR09SSUVTIiwiY2F0ZWdvcmllcyIsImVycm9yRmV0Y2hBbGxDYXRlZ29yaWVzIiwiRVJST1JfRkVUQ0hfQUxMX0NBVEVHT1JJRVMiLCJlcnJvciIsImFkZENhdGVnb3J5TG9jYWwiLCJBRERfQ0FURUdPUllfTE9DQUwiLCJjYXRlZ29yeSIsInJlbW92ZUNhdGVnb3J5TG9jYWwiLCJSRU1PVkVfQ0FURUdPUllfTE9DQUwiLCJjYXRlZ29yeUluZGV4IiwidG9vZ2xlU2VsZWN0Q2F0ZWdvcnkiLCJUT09HTEVfU0VMRUNUX0NBVEVHT1JZIiwic2VsZWN0ZWRDYXRlZ29yeSIsInRvb2dsZVNlbGVjdENhdGVnb3J5QWxsIiwiVE9PR0xFX1NFTEVDVF9DQVRFR09SWV9BTEwiLCJzd2l0Y2hWaXNpYmlsaXR5RmlsdGVyIiwiU1dJVENIX1ZJU0lCSUxJVFlfRklMVEVSIiwidmlzaWJpbGl0eSIsImZldGNoQWxsQ2F0ZWdvcmllcyIsImxpbWl0IiwicXVlcnlJdGVtc0xpbWl0Iiwic2tpcCIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJhY2Nlc3NUb2tlbiIsImF1dGgiLCJNZXRob2RzIiwiR0VUIiwicmVzcG9uc2UiLCJzdWNjZXNzIiwiZGF0YSIsIm1lc3NhZ2UiLCJkZWxldGVDYXRlZ29yeSIsImNhdGVnb3J5SWQiLCJERUxFVEUiLCJ0b2RvRmlsdGVycyIsImZpbmRJbmRleCIsImlkIiwiYWRkQ2F0ZWdvcnkiLCJuYW1lIiwiY2FsbGJhY2siLCJ1bmRlZmluZWQiLCJQT1NUIiwiY2hhbmdlVmlzaWJpbGl0eSIsInNlbGVjdENhdGVnb3J5Iiwic2VsZWN0Q2F0ZWdvcnlBbGwiLCJyZXF1ZXN0RmV0Y2hUYXNrcyIsIlJFUVVFU1RfRkVUQ0hfVEFTS1MiLCJyZWNlaXZlRmV0Y2hUYXNrcyIsIlJFQ0VJVkVfRkVUQ0hfVEFTS1MiLCJ0YXNrcyIsImVycm9yRmV0Y2hUYXNrcyIsIkVSUk9SX0ZFVENIX1RBU0tTIiwiYWRkVGFza0xvY2FsIiwiQUREX1RBU0tfTE9DQUwiLCJ0YXNrIiwicmVtb3ZlVGFza0xvY2FsIiwiUkVNT1ZFX1RBU0tfTE9DQUwiLCJ0YXNrSW5kZXgiLCJ1cGRhdGVUYXNrTG9jYWwiLCJVUERBVEVfVEFTS19MT0NBTCIsImZldGNoVGFza3NCeUNhdGVnb3J5IiwiY2F0ZWdvcmllc0lkIiwiY29tcGxldGVkIiwibWFwIiwiY29tcGxldGVkQXQiLCJEYXRlIiwidG9kb1dpdGhpbiIsImRlbGV0ZVRhc2siLCJpdGVtcyIsInRvZG9UYXNrcyIsInRvZG9Bcmd1bWVudEluZGV4IiwidG9kb0FyZ3VtZW50IiwiYWRkVGFzayIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJmZXRjaGVkVGFzayIsInRvb2dsZVRhc2tDb21wbGV0ZWQiLCJpc0NvbXBsZXRlZCIsIlBBVENIIiwiZHVyYXRpb24iLCJkZWZhdWx0U3R5bGUiLCJ0cmFuc2l0aW9uIiwiaGVpZ2h0Iiwib25FbnRlciIsIm5vZGUiLCJzdHlsZSIsImZpcnN0RWxlbWVudENoaWxkIiwib2Zmc2V0SGVpZ2h0Iiwib25FeGl0IiwiQ29sbGFwc2UiLCJpblByb3AiLCJpbiIsImNoaWxkcmVuIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiYm9vbCIsImlzUmVxdWlyZWQiLCJvcGFjaXR5IiwidHJhbnNpdGlvblN0eWxlcyIsImVudGVyaW5nIiwiZW50ZXJlZCIsImRpc3BsYXkiLCJEaWFsb2dBbmltIiwiZW50ZXIiLCJleGl0Iiwib25FbnRlcmVkIiwib25FeGl0ZWQiLCJSZXNpemUiLCJwcm9wcyIsImJvdHRvbSIsIlNuYWNrYmFyQW5pbSIsImN1c3RvbUNsYXNzIiwic3RyaW5nIiwiZGVmYXVsdFByb3BzIiwiQnV0dG9uU2Nyb2xsIiwib25DbGljayIsImRpcmVjdGlvbiIsImZ1bmMiLCJvbmVPZiIsIndhaXRUaW1lIiwiSW5maW5pdGVTY3JvbGwiLCJvblNjcm9sbCIsImJpbmQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImlubmVySGVpZ2h0Iiwic2Nyb2xsWSIsImRvY3VtZW50IiwiYm9keSIsImFyZ3MiLCJjbGFzc05hbWUiLCJSZWFjdCIsIkNvbXBvbmVudCIsImFycmF5T2YiLCJhbnkiLCJNYWluQWRkQnV0dG9uIiwiQWN0aW9uIiwidGV4dCIsIlNuYWNrYmFyIiwib25DbG9zZSIsInNob3ciLCJzZXRUaW1lb3V0IiwiaXNFcnJvciIsImFjdGlvblRleHQiLCJhY3Rpb25DbGljayIsInZlcnRpY2FsUG9zdGlvbiIsImhvcml6b250YWxQb3NpdGlvbiIsIm51bWJlciIsIlRvZG9zIiwiaXNEaWFsb2dBZGRPcGVuIiwiaW5pdEZldGNoQWxsQ2F0ZWdvcmllcyIsImhpZGVNZXNzYWdlIiwic2hvd0xvYWRpbmciLCJzZXRTdGF0ZSIsInNoYXBlIiwiQnV0dG9uRGVsZXRlQ2F0ZWdvcnkiLCJDYXRlZ29yaWVzRmlsdGVyIiwiY2hpcHMiLCJoYW5kbGVMZWZ0U2Nyb2xsQ2xpY2siLCJoYW5kbGVSaWdodFNjcm9sbENsaWNrIiwibW92ZUNoaXBzU2Nyb2xsIiwiY2xpZW50V2lkdGgiLCJkZWx0YSIsIm5leHRTY3JvbGxMZWZ0Iiwic2Nyb2xsTGVmdCIsInNjcm9sbCIsImxlZnQiLCJjYXRlZ29yeUxpc3QiLCJvbkRlbGV0ZUNhdGVnb3J5Iiwib25DaWxja0NhdGVnb3J5IiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJzZWxlY3RlZCIsIkNhdGVnb3J5Iiwib25EZWxldGUiLCJjc3NDbGFzcyIsIm9uQ2hpcENsaWNrIiwiZSIsIm9uRGVsZXRlQ2xpY2siLCJBZGRDYXRlZ29yeSIsIm9uSW5wdXRUZXh0Q2hhbmdlIiwib25CdXR0b25BZGRDbGljayIsIm9uQ2F0ZWdvcnlDcmVhdGVkIiwidGFyZ2V0IiwidmFsdWUiLCJsYWJlbHMiLCJtc2dOYW1lUmVxdWlyZWQiLCJvbk5leHQiLCJzdGVwSWQiLCJBRERfVEFTSyIsIm9wdGlvbnMiLCJ0aXRsZUFkZENhdGVnb3J5IiwicGxhY2Vob2xkZXJOYW1lIiwiYnV0dG9uQWRkIiwiQWRkVGFzayIsIm9uQnV0dG9uU2NoZWR1bGVDbGljayIsIm1zZ1RpdGxlUmVxdWlyZWQiLCJTRUxFQ1RfQ09NUExFVEVfREFURSIsInRpdGxlQWRkVGFzayIsImxhYmVsRm9yQ2F0ZWdvcnkiLCJwbGFjZUhvbGRlclRpdGxlIiwicGxhY2VIb2xkZXJEZXNjcmlwdGlvbiIsImJ1dHRvblNjaGVkdWxlIiwiZ2V0Q29udGVudFRvUmVuZGVyIiwic3RlcHMiLCJsZW5ndGgiLCJsYXN0U3RlcCIsIlNFTEVDVF9XQU5UX1RPX0FERCIsIkFERF9DQVRFR09SWSIsIlNFTEVDVF9DQVRFR09SWSIsIkRPTkUiLCJpbml0YWxTdGF0ZSIsIm5leHRTdGVwcyIsInNob3dTdGVwIiwiRGlhbG9nQWRkIiwib25CYWNrIiwib25SZXNldEFuZENsb3NlIiwib25BbmltYXRpb25FbmQiLCJzdGVwQ291bnQiLCJzbGljZSIsInN0ZXAiLCJjb21wbGV0ZSIsImRvbmUiLCJvcGVuIiwic3RlcExpc3QiLCJidXR0b25CYWNrIiwiRG9uZSIsImxhYmVsRG9uZSIsIlNlbGVjdEFjdGlvbkFkZCIsInRpdGxlQWRkIiwibGFiZWxDYXRlZ29yeSIsImxhYmVsVGFzayIsIlNlbGVjdENhdGVnb3J5Iiwib25DYXRlZ29yeUNsaWNrIiwib25CdXR0b25OZXh0Q2xpY2siLCJtc2dTZWxlY3RDYXRlZ29yeSIsImNhdGVnb3JpZXNMaXN0IiwidGl0bGVDaG9vc2VDYXRlZ29yeSIsImJ1dHRvbk5leHQiLCJtYXBTdGF0ZVRvUHJvcCIsIlNlbGVjdENvbXBsZXRlRGF0ZSIsIm9uSW5wdXREYXRlQ2hhbmdlIiwib25Ub2RvVGFza0NyZWF0ZWQiLCJkYXRlIiwibXNnU2VsZWN0RGF0ZSIsInRpdGxlVG9kb1dpdGhpbiIsIlN0ZXAiLCJuZWVkTGluZSIsIlN0ZXBzIiwibGlzdCIsInN0ZXBIaXN0b3J5IiwiaXRlbSIsImkiLCJmaWx0ZXIiLCJzaCIsIkJ1dHRvbkNvbXBsZXRlVGFzayIsIkJ1dHRvbkRlbGV0ZVRhc2siLCJUYXNrIiwiY29sbGFwc2VkIiwicmVuZGVyRGF0ZSIsImxhYmVsUGFydGlhbENvbXBsZXRlZCIsImxhYmVsUGFydGlhbFRvQ29tcGxldGVkIiwibGFiZWxOb3RTZXQiLCJvbkNvbXBsZXRlIiwib25UaXRsZUNsaWNrIiwibGFiZWxOb0Rlc2NyaXB0aW9uIiwiaW5pdGlhbFN0YXRlIiwiVGFza3MiLCJvbkZldGNoVG9kb1Rhc2tzTmV4dCIsIm1vcmVUb0xvYWQiLCJuZXdTa2lwIiwidGFza0xpc3QiLCJvbkRlbGV0ZVRhc2siLCJvbkNvbXBsZXRlVGFzayIsImFyZyIsIm5leHRQcm9wcyIsInByZXZTdGF0ZSIsIlZpc2liaWxpdHlGaWx0ZXIiLCJzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIiLCJvblZpc2liaWxpdHlTd2l0Y2hDbGljayIsIk9OTFlfVE9fQ09NUExFVEUiLCJBTExfVE9ET1MiLCJPTkxZX0NPTVBMRVRFRCIsIlZpc2liaWxpdHlTd2l0Y2giLCJzdGVwRGVzY1dhbnRUb0FkZCIsInN0ZXBEZXNjQWRkQ2F0ZWdvcnkiLCJzdGVwRGVzY3JTZWxlY0NhdGVnb3J5Iiwic3RlcERlc2NBZGRUYXNrIiwic3RlcERlc2NDb21wbGV0ZURhdGUiLCJzdGVwRGVzY0RvbmUiLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJjYXRlZ29yeUFsbCIsIkNhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIiLCJUYXNrc0NvbnRhaW5lciIsIlRvZG9zQ29udGFpbmVyIiwiVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lciIsIlZpc2liaWxpdHlGaWx0ZXJzIiwiaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIiLCJpc0ZldGNoaW5nVGFza3MiLCJpc0ZldGNoaW5nQ2F0ZWdvcmllcyIsImlzRmV0Y2hpbmdUb2RvcyIsImlzRmV0Y2hpbmciLCJnZXRUb2RvRmlsdGVycyIsImdldENhdGVnb3JpZXNGaWx0ZXJMaXN0IiwiZ2V0VmlzaWJpbGl0eUZpbHRlciIsInZpc2liaWxpdHlPbmx5Q29tcGxldGVkIiwiZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzRmlsdGVyIiwiZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQiLCJjYXRlZ29yeUZpbHRlciIsImdldFRhc2tzIiwiZ2V0VGFza0xpc3QiLCJnZXRTa2lwIiwic3RpbGxNb3JlVG9Mb2FkIiwidG9Kc0RhdGUiLCJwYXJzZURhdGUiLCJwYXJzZUludCIsInN1YnN0ciIsInRvU2ltcGxlRGF0ZUZvcm1hdCIsImdldEN1cnJlbnRCYXNlVXJsIiwiZ2V0VXJsIiwibG9jYXRpb24iLCJwcm90b2NvbCIsImhvc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBVUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxhQUFhLFNBQWJBLFVBQWE7QUFBQSxTQUFTLDRDQUMxQixtREFBd0JDLEtBQXhCLENBRDBCLEVBRTFCLG1EQUF3QkEsS0FBeEIsQ0FGMEIsQ0FBVDtBQUFBLENBQW5COztBQUtBLElBQU1DLDRCQUE0QixTQUE1QkEseUJBQTRCO0FBQUEsU0FDaEM7QUFDRUMsVUFBTUM7QUFE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QUFDQyxTQUFELHVFQUFhLEVBQWI7QUFBQSxTQUN0QixJQUFJN1AsSUFBSixDQUFTOFAsU0FBU0QsVUFBVUUsTUFBVixDQUFpQixDQUFqQixDQUFULEVBQThCLEVBQTlCLENBQVQsQ0FEc0I7QUFBQSxDQUFqQjs7QUFHQSxJQUFNQyxrREFBcUIsU0FBckJBLGtCQUFxQjtBQUFBLFNBQ2hDLDBCQUFXN0UsSUFBWCxFQUFpQixrQkFBakIsQ0FEZ0M7QUFBQSxDQUEzQjs7QUFHQSxJQUFNOEUsZ0RBQW9CLFNBQXBCQSxpQkFBb0IsR0FBTTtBQUNyQyxNQUFNQyxTQUFTeE0sT0FBT3lNLFFBQXRCO0FBQ0EsU0FBVUQsT0FBT0UsUUFBakIsVUFBOEJGLE9BQU9HLElBQXJDO0FBQ0QsQ0FITSxDIiwiZmlsZSI6InRvZG9zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2FsbEFwaSwgTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL0FwaVV0aWxzJztcbmltcG9ydCB7IHNob3VsZFJlZnJlc2hUb2tlbiB9IGZyb20gJy4uL3V0aWxzL1JlcXVlc3RVdGlscyc7XG5pbXBvcnQgeyByZWZyZXNoQWNjZXNzVG9rZW4gfSBmcm9tICcuL2F1dGhBY3Rpb25zJztcbmltcG9ydCB7XG4gIFJFUVVFU1RfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gIFJFQ0VJVkVfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gIEVSUk9SX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICBBRERfQ0FURUdPUllfTE9DQUwsXG4gIFJFTU9WRV9DQVRFR09SWV9MT0NBTCxcbiAgVE9PR0xFX1NFTEVDVF9DQVRFR09SWSxcbiAgVE9PR0xFX1NFTEVDVF9DQVRFR09SWV9BTEwsXG4gIFNXSVRDSF9WSVNJQklMSVRZX0ZJTFRFUixcbn0gZnJvbSAnLi4vY29uc3RhbnRzL2FjdGlvblR5cGVzJztcbmltcG9ydCB7IHF1ZXJ5SXRlbXNMaW1pdCB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuaW1wb3J0IHsgZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkgfSBmcm9tICcuL3RvZG9UYXNrc0FjdGlvbnMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VFcnJvciB9IGZyb20gJy4vbWVzc2FnZUFjdGlvbnMnO1xuaW1wb3J0IHsgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQsIHZpc2liaWxpdHlPbmx5Q29tcGxldGVkIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgZmV0Y2hUYXNrcyA9IHN0YXRlID0+IGZldGNoVGFza3NCeUNhdGVnb3J5KFxuICBnZXRTZWxlY3RlZENhdGVnb3JpZXNJZChzdGF0ZSksXG4gIHZpc2liaWxpdHlPbmx5Q29tcGxldGVkKHN0YXRlKSxcbik7XG5cbmNvbnN0IHJlcXVlc3RGZXRjaEFsbENhdGVnb3JpZXMgPSAoKSA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRVFVRVNUX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICB9XG4pO1xuXG5jb25zdCByZWNlaXZlRmV0Y2hBbGxDYXRlZ29yaWVzID0gY2F0ZWdvcmllcyA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRUNFSVZFX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICAgIGNhdGVnb3JpZXMsXG4gIH1cbik7XG5cbmNvbnN0IGVycm9yRmV0Y2hBbGxDYXRlZ29yaWVzID0gZXJyb3IgPT4gKFxuICB7XG4gICAgdHlwZTogRVJST1JfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gICAgZXJyb3IsXG4gIH1cbik7XG5cbmNvbnN0IGFkZENhdGVnb3J5TG9jYWwgPSBjYXRlZ29yeSA9PiAoXG4gIHtcbiAgICB0eXBlOiBBRERfQ0FURUdPUllfTE9DQUwsXG4gICAgY2F0ZWdvcnksXG4gIH1cbik7XG5cbmNvbnN0IHJlbW92ZUNhdGVnb3J5TG9jYWwgPSBjYXRlZ29yeUluZGV4ID0+IChcbiAge1xuICAgIHR5cGU6IFJFTU9WRV9DQVRFR09SWV9MT0NBTCxcbiAgICBjYXRlZ29yeUluZGV4LFxuICB9XG4pO1xuXG5jb25zdCB0b29nbGVTZWxlY3RDYXRlZ29yeSA9IHNlbGVjdGVkQ2F0ZWdvcnkgPT4gKFxuICB7XG4gICAgdHlwZTogVE9PR0xFX1NFTEVDVF9DQVRFR09SWSxcbiAgICBzZWxlY3RlZENhdGVnb3J5LFxuICB9XG4pO1xuXG5jb25zdCB0b29nbGVTZWxlY3RDYXRlZ29yeUFsbCA9ICgpID0+IChcbiAge1xuICAgIHR5cGU6IFRPT0dMRV9TRUxFQ1RfQ0FURUdPUllfQUxMLFxuICB9XG4pO1xuXG5jb25zdCBzd2l0Y2hWaXNpYmlsaXR5RmlsdGVyID0gdmlzaWJpbGl0eSA9PiAoXG4gIHtcbiAgICB0eXBlOiBTV0lUQ0hfVklTSUJJTElUWV9GSUxURVIsXG4gICAgdmlzaWJpbGl0eSxcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGZldGNoQWxsQ2F0ZWdvcmllcyA9IChsaW1pdCA9IHF1ZXJ5SXRlbXNMaW1pdCwgc2tpcCA9IDApID0+XG4gIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBkaXNwYXRjaChyZXF1ZXN0RmV0Y2hBbGxDYXRlZ29yaWVzKCkpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGFjY2Vzc1Rva2VuIH0gPSBnZXRTdGF0ZSgpLmF1dGg7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoJ2NhdGVnb3JpZXMnLCB7IGxpbWl0LCBza2lwIH0sIE1ldGhvZHMuR0VULCBhY2Nlc3NUb2tlbik7XG4gICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICBkaXNwYXRjaChyZWNlaXZlRmV0Y2hBbGxDYXRlZ29yaWVzKHJlc3BvbnNlLmRhdGEpKTtcbiAgICAgICAgZGlzcGF0Y2goZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkoZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQoZ2V0U3RhdGUoKSkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzaG91bGRSZWZyZXNoVG9rZW4ocmVzcG9uc2UpKSB7XG4gICAgICAgICAgYXdhaXQgZGlzcGF0Y2gocmVmcmVzaEFjY2Vzc1Rva2VuKCkpO1xuICAgICAgICAgIGRpc3BhdGNoKGZldGNoQWxsQ2F0ZWdvcmllcyhsaW1pdCwgc2tpcCkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkaXNwYXRjaChlcnJvckZldGNoQWxsQ2F0ZWdvcmllcyhyZXNwb25zZS5lcnJvci5tZXNzYWdlKSk7XG4gICAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UuZXJyb3IubWVzc2FnZSkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgICB9XG4gIH07XG5cbmV4cG9ydCBjb25zdCBkZWxldGVDYXRlZ29yeSA9IChjYXRlZ29yeUlkID0gJycpID0+IGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGFjY2Vzc1Rva2VuIH0gPSBnZXRTdGF0ZSgpLmF1dGg7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKCdjYXRlZ29yaWVzJywgY2F0ZWdvcnlJZCwgTWV0aG9kcy5ERUxFVEUsIGFjY2Vzc1Rva2VuKTtcbiAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgY29uc3QgeyBjYXRlZ29yaWVzIH0gPSBnZXRTdGF0ZSgpLnRvZG9GaWx0ZXJzO1xuICAgICAgY29uc3QgY2F0ZWdvcnlJbmRleCA9IGNhdGVnb3JpZXMuZmluZEluZGV4KGNhdGVnb3J5ID0+IGNhdGVnb3J5LmlkID09PSBjYXRlZ29yeUlkKTtcbiAgICAgIGRpc3BhdGNoKHJlbW92ZUNhdGVnb3J5TG9jYWwoY2F0ZWdvcnlJbmRleCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc2hvdWxkUmVmcmVzaFRva2VuKHJlc3BvbnNlKSkge1xuICAgICAgICBhd2FpdCBkaXNwYXRjaChyZWZyZXNoQWNjZXNzVG9rZW4oKSk7XG4gICAgICAgIGRpc3BhdGNoKGRlbGV0ZUNhdGVnb3J5KGNhdGVnb3J5SWQpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5lcnJvci5tZXNzYWdlKSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG59O1xuXG4vKipcbiAqIFJlcXVlc3QgdG8gYWRkIGEgY2F0ZWdvcnlcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIGNhdGVnb3J5IG5hbWUgdG8gYWRkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IG5lZWQgdG8gaGFuZGxlIHRoZSBjYXRlZ29yeSBjcmVhdGVkXG4gKi9cbmV4cG9ydCBjb25zdCBhZGRDYXRlZ29yeSA9IChuYW1lID0gJycsIGNhbGxiYWNrID0gdW5kZWZpbmVkKSA9PiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbiB9ID0gZ2V0U3RhdGUoKS5hdXRoO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbEFwaSgnY2F0ZWdvcmllcycsIHsgbmFtZSB9LCBNZXRob2RzLlBPU1QsIGFjY2Vzc1Rva2VuKTtcbiAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgY29uc3QgY2F0ZWdvcnkgPSByZXNwb25zZS5kYXRhO1xuICAgICAgZGlzcGF0Y2goYWRkQ2F0ZWdvcnlMb2NhbChjYXRlZ29yeSkpO1xuICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2FsbGJhY2soY2F0ZWdvcnkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc2hvdWxkUmVmcmVzaFRva2VuKHJlc3BvbnNlKSkge1xuICAgICAgICBhd2FpdCBkaXNwYXRjaChyZWZyZXNoQWNjZXNzVG9rZW4oKSk7XG4gICAgICAgIGRpc3BhdGNoKGFkZENhdGVnb3J5KG5hbWUsIGNhbGxiYWNrKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UuZXJyb3IubWVzc2FnZSkpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNoYW5nZVZpc2liaWxpdHkgPSB2aXNpYmlsaXR5ID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgZGlzcGF0Y2goc3dpdGNoVmlzaWJpbGl0eUZpbHRlcih2aXNpYmlsaXR5KSk7XG4gIHJldHVybiBkaXNwYXRjaChmZXRjaFRhc2tzKGdldFN0YXRlKCkpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RDYXRlZ29yeSA9IHNlbGVjdGVkQ2F0ZWdvcnkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBkaXNwYXRjaCh0b29nbGVTZWxlY3RDYXRlZ29yeShzZWxlY3RlZENhdGVnb3J5KSk7XG4gIHJldHVybiBkaXNwYXRjaChmZXRjaFRhc2tzKGdldFN0YXRlKCkpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RDYXRlZ29yeUFsbCA9ICgpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgZGlzcGF0Y2godG9vZ2xlU2VsZWN0Q2F0ZWdvcnlBbGwoKSk7XG4gIHJldHVybiBkaXNwYXRjaChmZXRjaFRhc2tzKGdldFN0YXRlKCkpKTtcbn07XG4iLCJpbXBvcnQgeyBjYWxsQXBpLCBNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvQXBpVXRpbHMnO1xuaW1wb3J0IHsgc2hvdWxkUmVmcmVzaFRva2VuIH0gZnJvbSAnLi4vdXRpbHMvUmVxdWVzdFV0aWxzJztcbmltcG9ydCB7IHJlZnJlc2hBY2Nlc3NUb2tlbiB9IGZyb20gJy4vYXV0aEFjdGlvbnMnO1xuaW1wb3J0IHtcbiAgUkVRVUVTVF9GRVRDSF9UQVNLUyxcbiAgUkVDRUlWRV9GRVRDSF9UQVNLUyxcbiAgRVJST1JfRkVUQ0hfVEFTS1MsXG4gIEFERF9UQVNLX0xPQ0FMLFxuICBSRU1PVkVfVEFTS19MT0NBTCxcbiAgVVBEQVRFX1RBU0tfTE9DQUwsXG59IGZyb20gJy4uL2NvbnN0YW50cy9hY3Rpb25UeXBlcyc7XG5pbXBvcnQgeyBxdWVyeUl0ZW1zTGltaXQgfSBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcbmltcG9ydCB7IHNob3dNZXNzYWdlRXJyb3IgfSBmcm9tICcuL21lc3NhZ2VBY3Rpb25zJztcblxuY29uc3QgcmVxdWVzdEZldGNoVGFza3MgPSAobGltaXQsIHNraXApID0+IChcbiAge1xuICAgIHR5cGU6IFJFUVVFU1RfRkVUQ0hfVEFTS1MsXG4gICAgbGltaXQsXG4gICAgc2tpcCxcbiAgfVxuKTtcblxuY29uc3QgcmVjZWl2ZUZldGNoVGFza3MgPSB0YXNrcyA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRUNFSVZFX0ZFVENIX1RBU0tTLFxuICAgIHRhc2tzLFxuICB9XG4pO1xuXG5jb25zdCBlcnJvckZldGNoVGFza3MgPSBlcnJvciA9PiAoXG4gIHtcbiAgICB0eXBlOiBFUlJPUl9GRVRDSF9UQVNLUyxcbiAgICBlcnJvcixcbiAgfVxuKTtcblxuY29uc3QgYWRkVGFza0xvY2FsID0gdGFzayA9PiAoXG4gIHtcbiAgICB0eXBlOiBBRERfVEFTS19MT0NBTCxcbiAgICB0YXNrLFxuICB9XG4pO1xuXG5jb25zdCByZW1vdmVUYXNrTG9jYWwgPSB0YXNrSW5kZXggPT4gKFxuICB7XG4gICAgdHlwZTogUkVNT1ZFX1RBU0tfTE9DQUwsXG4gICAgdGFza0luZGV4LFxuICB9XG4pO1xuXG5jb25zdCB1cGRhdGVUYXNrTG9jYWwgPSB0YXNrID0+IChcbiAge1xuICAgIHR5cGU6IFVQREFURV9UQVNLX0xPQ0FMLFxuICAgIHRhc2ssXG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBmZXRjaFRhc2tzQnlDYXRlZ29yeSA9IChcbiAgY2F0ZWdvcmllc0lkID0gW10sXG4gIGNvbXBsZXRlZCA9IGZhbHNlLFxuICBsaW1pdCA9IHF1ZXJ5SXRlbXNMaW1pdCxcbiAgc2tpcCA9IDAsXG4pID0+IGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgZGlzcGF0Y2gocmVxdWVzdEZldGNoVGFza3MobGltaXQsIHNraXApKTtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGFjY2Vzc1Rva2VuIH0gPSBnZXRTdGF0ZSgpLmF1dGg7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKCd0YXNrcycsIHtcbiAgICAgIGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgc2tpcCxcbiAgICB9LCBNZXRob2RzLkdFVCwgYWNjZXNzVG9rZW4pO1xuICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICBjb25zdCB0YXNrcyA9IHJlc3BvbnNlLmRhdGEubWFwKHRhc2sgPT5cbiAgICAgICAgKHtcbiAgICAgICAgICAuLi50YXNrLFxuICAgICAgICAgIGNvbXBsZXRlZEF0OiAodGFzay5jb21wbGV0ZWRBdCkgPyBuZXcgRGF0ZSh0YXNrLmNvbXBsZXRlZEF0KSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB0b2RvV2l0aGluOiAodGFzay50b2RvV2l0aGluKSA/IG5ldyBEYXRlKHRhc2sudG9kb1dpdGhpbikgOiB1bmRlZmluZWQsXG4gICAgICAgIH0pKTtcbiAgICAgIGRpc3BhdGNoKHJlY2VpdmVGZXRjaFRhc2tzKHRhc2tzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzaG91bGRSZWZyZXNoVG9rZW4ocmVzcG9uc2UpKSB7XG4gICAgICAgIGF3YWl0IGRpc3BhdGNoKHJlZnJlc2hBY2Nlc3NUb2tlbigpKTtcbiAgICAgICAgZGlzcGF0Y2goZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkoY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsIGxpbWl0LCBza2lwKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGRpc3BhdGNoKGVycm9yRmV0Y2hUYXNrcyhyZXNwb25zZS5lcnJvci5tZXNzYWdlKSk7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLmVycm9yLm1lc3NhZ2UpKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBkZWxldGVUYXNrID0gKGlkID0gJycpID0+IGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGFjY2Vzc1Rva2VuIH0gPSBnZXRTdGF0ZSgpLmF1dGg7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKCd0YXNrcycsIGlkLCBNZXRob2RzLkRFTEVURSwgYWNjZXNzVG9rZW4pO1xuICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICBjb25zdCB7IGl0ZW1zIH0gPSBnZXRTdGF0ZSgpLnRvZG9UYXNrcztcbiAgICAgIGNvbnN0IHRvZG9Bcmd1bWVudEluZGV4ID0gaXRlbXMuZmluZEluZGV4KHRvZG9Bcmd1bWVudCA9PlxuICAgICAgICB0b2RvQXJndW1lbnQuaWQgPT09IGlkKTtcbiAgICAgIGRpc3BhdGNoKHJlbW92ZVRhc2tMb2NhbCh0b2RvQXJndW1lbnRJbmRleCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc2hvdWxkUmVmcmVzaFRva2VuKHJlc3BvbnNlKSkge1xuICAgICAgICBhd2FpdCBkaXNwYXRjaChyZWZyZXNoQWNjZXNzVG9rZW4oKSk7XG4gICAgICAgIGRpc3BhdGNoKGRlbGV0ZVRhc2soaWQpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5lcnJvci5tZXNzYWdlKSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgYWRkVGFzayA9ICh0aXRsZSA9ICcnLCBkZXNjcmlwdGlvbiA9ICcnLCBjYXRlZ29yeSA9IHsgaWQ6ICcnIH0sIHRvZG9XaXRoaW4sIGNhbGxiYWNrID0gdW5kZWZpbmVkKSA9PiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbiB9ID0gZ2V0U3RhdGUoKS5hdXRoO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbEFwaShcbiAgICAgICd0YXNrcycsXG4gICAgICB7XG4gICAgICAgIHRpdGxlLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnkuaWQsXG4gICAgICAgIHRvZG9XaXRoaW4sXG4gICAgICB9LFxuICAgICAgTWV0aG9kcy5QT1NULFxuICAgICAgYWNjZXNzVG9rZW4sXG4gICAgKTtcbiAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgY29uc3QgZmV0Y2hlZFRhc2sgPSByZXNwb25zZS5kYXRhO1xuICAgICAgY29uc3QgdGFzayA9IHtcbiAgICAgICAgLi4uZmV0Y2hlZFRhc2ssXG4gICAgICAgIGNvbXBsZXRlZEF0OiAoZmV0Y2hlZFRhc2suY29tcGxldGVkQXQpXG4gICAgICAgICAgPyBuZXcgRGF0ZShmZXRjaGVkVGFzay5jb21wbGV0ZWRBdCkgOiB1bmRlZmluZWQsXG4gICAgICAgIHRvZG9XaXRoaW46IChmZXRjaGVkVGFzay50b2RvV2l0aGluKVxuICAgICAgICAgID8gbmV3IERhdGUoZmV0Y2hlZFRhc2sudG9kb1dpdGhpbikgOiB1bmRlZmluZWQsXG4gICAgICB9O1xuICAgICAgZGlzcGF0Y2goYWRkVGFza0xvY2FsKHRhc2spKTtcbiAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzaG91bGRSZWZyZXNoVG9rZW4ocmVzcG9uc2UpKSB7XG4gICAgICAgIGF3YWl0IGRpc3BhdGNoKHJlZnJlc2hBY2Nlc3NUb2tlbigpKTtcbiAgICAgICAgZGlzcGF0Y2goYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGNhdGVnb3J5LCB0b2RvV2l0aGluLCBjYWxsYmFjaykpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLmVycm9yLm1lc3NhZ2UpKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB0b29nbGVUYXNrQ29tcGxldGVkID0gKGlkID0gJycsIGlzQ29tcGxldGVkID0gZmFsc2UpID0+IGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgY29uc3QgY29tcGxldGVkID0gIWlzQ29tcGxldGVkO1xuICBjb25zdCBjb21wbGV0ZWRBdCA9IChjb21wbGV0ZWQpID8gbmV3IERhdGUoKSA6IG51bGw7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbiB9ID0gZ2V0U3RhdGUoKS5hdXRoO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbEFwaSgndGFza3MnLCB7IGlkLCBjb21wbGV0ZWQsIGNvbXBsZXRlZEF0IH0sIE1ldGhvZHMuUEFUQ0gsIGFjY2Vzc1Rva2VuKTtcbiAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgY29uc3QgZmV0Y2hlZFRhc2sgPSByZXNwb25zZS5kYXRhO1xuICAgICAgY29uc3QgdGFzayA9IHtcbiAgICAgICAgLi4uZmV0Y2hlZFRhc2ssXG4gICAgICAgIGNvbXBsZXRlZEF0OiAoZmV0Y2hlZFRhc2suY29tcGxldGVkQXQpXG4gICAgICAgICAgPyBuZXcgRGF0ZShmZXRjaGVkVGFzay5jb21wbGV0ZWRBdCkgOiB1bmRlZmluZWQsXG4gICAgICB9O1xuICAgICAgZGlzcGF0Y2godXBkYXRlVGFza0xvY2FsKHRhc2spKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNob3VsZFJlZnJlc2hUb2tlbihyZXNwb25zZSkpIHtcbiAgICAgICAgYXdhaXQgZGlzcGF0Y2gocmVmcmVzaEFjY2Vzc1Rva2VuKCkpO1xuICAgICAgICBkaXNwYXRjaCh0b29nbGVUYXNrQ29tcGxldGVkKGlkLCBpc0NvbXBsZXRlZCkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLmVycm9yLm1lc3NhZ2UpKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSAzMDA7XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgdHJhbnNpdGlvbjogYGhlaWdodCAke2R1cmF0aW9ufW1zIGVhc2UtaW4tb3V0YCxcbiAgaGVpZ2h0OiAwLFxufTtcblxuY29uc3Qgb25FbnRlciA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XG4gIHN0eWxlLmhlaWdodCA9IGAke25vZGUuZmlyc3RFbGVtZW50Q2hpbGQub2Zmc2V0SGVpZ2h0fXB4YDtcbn07XG5cbmNvbnN0IG9uRXhpdCA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XG4gIHN0eWxlLmhlaWdodCA9ICcwcHgnO1xufTtcblxuY29uc3QgQ29sbGFwc2UgPSAoeyBpbjogaW5Qcm9wLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxUcmFuc2l0aW9uIG9uRW50ZXI9e29uRW50ZXJ9IG9uRXhpdD17b25FeGl0fSBpbj17aW5Qcm9wfSB0aW1lb3V0PXtkdXJhdGlvbn0+XG4gICAgeygpID0+IChcbiAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAuLi5kZWZhdWx0U3R5bGUsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICl9XG4gIDwvVHJhbnNpdGlvbj5cbik7XG5cbkNvbGxhcHNlLnByb3BUeXBlcyA9IHtcbiAgaW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29sbGFwc2U7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSAyNTA7XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgdHJhbnNpdGlvbjogYGFsbCAke2R1cmF0aW9ufW1zIGVhc2UtaW4tb3V0YCxcbiAgaGVpZ2h0OiAnMHB4JyxcbiAgb3BhY2l0eTogJzAnLFxuICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbn07XG5cbmNvbnN0IHRyYW5zaXRpb25TdHlsZXMgPSB7XG4gIGVudGVyaW5nOiB7XG4gICAgaGVpZ2h0OiAnMHB4JyxcbiAgICBvcGFjaXR5OiAnMCcsXG4gICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gIH0sXG4gIGVudGVyZWQ6IHtcbiAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgIGhlaWdodDogJzEwMHZoJyxcbiAgICBvcGFjaXR5OiAnMScsXG4gICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICB9LFxufTtcblxuY29uc3QgRGlhbG9nQW5pbSA9ICh7IGluOiBpblByb3AsIGNoaWxkcmVuIH0pID0+IChcbiAgPFRyYW5zaXRpb24gaW49e2luUHJvcH0gdGltZW91dD17ZHVyYXRpb259PlxuICAgIHtzdGF0ZSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPVwiYmFja2Ryb3AtZGlhbG9nXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAuLi5kZWZhdWx0U3R5bGUsXG4gICAgICAgICAgLi4udHJhbnNpdGlvblN0eWxlc1tzdGF0ZV0sXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICl9XG4gIDwvVHJhbnNpdGlvbj5cbik7XG5cbkRpYWxvZ0FuaW0ucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaWFsb2dBbmltO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xyXG5cclxuY29uc3QgZHVyYXRpb24gPSB7XHJcbiAgZW50ZXI6IDMwMCxcclxuICBleGl0OiAyMDAsXHJcbn07XHJcblxyXG5jb25zdCBkZWZhdWx0U3R5bGUgPSB7XHJcbiAgdHJhbnNpdGlvbjogYGFsbCAke2R1cmF0aW9uLmVudGVyfW1zIGVhc2UtaW4tb3V0YCxcclxuICBoZWlnaHQ6IDAsXHJcbiAgb3BhY2l0eTogMCxcclxufTtcclxuXHJcbmNvbnN0IG9uRW50ZXIgPSAobm9kZSkgPT4ge1xyXG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XHJcbiAgc3R5bGUuaGVpZ2h0ID0gYCR7bm9kZS5maXJzdEVsZW1lbnRDaGlsZC5vZmZzZXRIZWlnaHR9cHhgO1xyXG4gIHN0eWxlLm9wYWNpdHkgPSAxO1xyXG59O1xyXG5cclxuY29uc3Qgb25FbnRlcmVkID0gKG5vZGUpID0+IHtcclxuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xyXG4gIHN0eWxlLmhlaWdodCA9ICdhdXRvJztcclxufTtcclxuXHJcbmNvbnN0IG9uRXhpdCA9IChub2RlKSA9PiB7XHJcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcclxuICBzdHlsZS5oZWlnaHQgPSBgJHtub2RlLmZpcnN0RWxlbWVudENoaWxkLm9mZnNldEhlaWdodH1weGA7XHJcbn07XHJcblxyXG5jb25zdCBvbkV4aXRlZCA9IChub2RlKSA9PiB7XHJcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcclxuICBzdHlsZS5oZWlnaHQgPSAnMHB4JztcclxuICBzdHlsZS5vcGFjaXR5ID0gMDtcclxufTtcclxuXHJcblxyXG5jb25zdCBSZXNpemUgPSAoeyBjaGlsZHJlbiwgLi4ucHJvcHMgfSkgPT4gKFxyXG4gIDxUcmFuc2l0aW9uXHJcbiAgICB7Li4ucHJvcHN9XHJcbiAgICBvbkVudGVyPXtvbkVudGVyfVxyXG4gICAgb25FbnRlcmVkPXtvbkVudGVyZWR9XHJcbiAgICBvbkV4aXQ9e29uRXhpdH1cclxuICAgIG9uRXhpdGVkPXtvbkV4aXRlZH1cclxuICAgIHRpbWVvdXQ9e2R1cmF0aW9ufVxyXG4gID5cclxuICAgIHsoKSA9PiAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcclxuICAgICAgICB9fVxyXG4gICAgICA+XHJcbiAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICA8L2Rpdj5cclxuICAgICl9XHJcbiAgPC9UcmFuc2l0aW9uPlxyXG4pO1xyXG5cclxuUmVzaXplLnByb3BUeXBlcyA9IHtcclxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlc2l6ZTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5cbmNvbnN0IGR1cmF0aW9uID0gMjUwO1xuXG5jb25zdCBkZWZhdWx0U3R5bGUgPSB7XG4gIHRyYW5zaXRpb246IGBhbGwgJHtkdXJhdGlvbn1tcyBlYXNlLWluLW91dGAsXG4gIGJvdHRvbTogJy0xMDBweCcsXG59O1xuXG5jb25zdCB0cmFuc2l0aW9uU3R5bGVzID0ge1xuICBlbnRlcmluZzoge1xuICAgIGJvdHRvbTogJy0xMDBweCcsXG4gICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gIH0sXG4gIGVudGVyZWQ6IHtcbiAgICBib3R0b206ICcwcHgnLFxuICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJyxcbiAgfSxcbn07XG5cbmNvbnN0IFNuYWNrYmFyQW5pbSA9ICh7IGluOiBpblByb3AsIGNoaWxkcmVuLCBjdXN0b21DbGFzcyB9KSA9PiAoXG4gIDxUcmFuc2l0aW9uIGluPXtpblByb3B9IHRpbWVvdXQ9e2R1cmF0aW9ufT5cbiAgICB7c3RhdGUgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD1cImNvbnRlbnQtc25hY2tiYXJcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgICAuLi50cmFuc2l0aW9uU3R5bGVzW3N0YXRlXSxcbiAgICAgICAgfX1cbiAgICAgICAgY2xhc3NOYW1lPXtjdXN0b21DbGFzc31cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuU25hY2tiYXJBbmltLnByb3BUeXBlcyA9IHtcbiAgaW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICBjdXN0b21DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cblNuYWNrYmFyQW5pbS5kZWZhdWx0UHJvcHMgPSB7XG4gIGN1c3RvbUNsYXNzOiAnJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNuYWNrYmFyQW5pbTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdXR0b25TY3JvbGwgPSAoeyBvbkNsaWNrLCBkaXJlY3Rpb24gfSkgPT4gKFxuICA8YnV0dG9uIGNsYXNzTmFtZT17YGJ1dHRvbi1zY3JvbGwgJHtkaXJlY3Rpb259YH0gb25DbGljaz17b25DbGlja30+XG4gICAgPGkgY2xhc3NOYW1lPXsoZGlyZWN0aW9uID09PSAnbGVmdCcpID8gJ2ljb24tYmFja3dhcmQnIDogJ2ljb24tZm9yd2FyZCd9IC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uU2Nyb2xsLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZGlyZWN0aW9uOiBQcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxufTtcblxuQnV0dG9uU2Nyb2xsLmRlZmF1bHRQcm9wcyA9IHtcbiAgZGlyZWN0aW9uOiAnbGVmdCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25TY3JvbGw7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSAnbG9kYXNoJztcblxuY29uc3Qgd2FpdFRpbWUgPSA1MDA7XG5cbmNsYXNzIEluZmluaXRlU2Nyb2xsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5vblNjcm9sbCA9IHRoaXMub25TY3JvbGwuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZSh0aGlzLm9uU2Nyb2xsLCB3YWl0VGltZSksIGZhbHNlKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZSh0aGlzLm9uU2Nyb2xsLCB3YWl0VGltZSksIGZhbHNlKTtcbiAgfVxuXG4gIG9uU2Nyb2xsKCkge1xuICAgIGlmICgod2luZG93LmlubmVySGVpZ2h0ICsgd2luZG93LnNjcm9sbFkpID49IChkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCAtIDIwMCkpIHtcbiAgICAgIGNvbnN0IHsgYXJncywgb25TY3JvbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICBvblNjcm9sbCguLi5hcmdzKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgY2xhc3NOYW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5JbmZpbml0ZVNjcm9sbC5wcm9wVHlwZXMgPSB7XG4gIGFyZ3M6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvblNjcm9sbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbkluZmluaXRlU2Nyb2xsLmRlZmF1bHRQcm9wcyA9IHtcbiAgYXJnczogW10sXG4gIGNsYXNzTmFtZTogJycsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbmZpbml0ZVNjcm9sbDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBNYWluQWRkQnV0dG9uID0gKHsgb25DbGljayB9KSA9PiAoXG4gIDxidXR0b24gaWQ9XCJtYWluLWFkZC1idXR0b25cIiBvbkNsaWNrPXtvbkNsaWNrfSA+XG4gICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj4mI3hFMTQ1OzwvaT5cbiAgPC9idXR0b24+XG4pO1xuXG5NYWluQWRkQnV0dG9uLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1haW5BZGRCdXR0b247XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBTbmFja2JhckFuaW0gZnJvbSAnLi4vYW5pbXMvU25hY2tiYXJBbmltJztcblxuY29uc3QgQWN0aW9uID0gKHsgb25DbGljaywgdGV4dCB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLWFjdGlvbi1zbmFja2JhclwiIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIHt0ZXh0fVxuICA8L2J1dHRvbj5cbik7XG5cbkFjdGlvbi5wcm9wVHlwZXMgPSB7XG4gIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmNsYXNzIFNuYWNrYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2xvc2UsIGR1cmF0aW9uLCBzaG93LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKHNob3cpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBvbkNsb3NlKCk7XG4gICAgICB9LCBkdXJhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG1lc3NhZ2UsIGlzRXJyb3IsIGFjdGlvblRleHQsIGFjdGlvbkNsaWNrLCBzaG93LFxuICAgICAgdmVydGljYWxQb3N0aW9uLCBob3Jpem9udGFsUG9zaXRpb24sXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTbmFja2JhckFuaW0gaW49e3Nob3d9IGN1c3RvbUNsYXNzPXtgJHt2ZXJ0aWNhbFBvc3Rpb259ICR7KGhvcml6b250YWxQb3NpdGlvbil9YH0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2BzbmFja2JhciAkeyhpc0Vycm9yKSA/ICdlcnJvcicgOiAnJ31gfVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic25hY2tiYXItbWVzc2FnZVwiPnttZXNzYWdlfTwvc3Bhbj5cbiAgICAgICAgICB7XG4gICAgICAgICAgICAoYWN0aW9uVGV4dCAhPT0gJycgJiYgYWN0aW9uQ2xpY2sgIT09IHVuZGVmaW5lZCkgJiZcbiAgICAgICAgICAgICAgPEFjdGlvbiBvbkNsaWNrPXthY3Rpb25DbGlja30gdGV4dD17YWN0aW9uVGV4dH0gLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9TbmFja2JhckFuaW0+XG4gICAgKTtcbiAgfVxufVxuXG5TbmFja2Jhci5wcm9wVHlwZXMgPSB7XG4gIHNob3c6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZHVyYXRpb246IFByb3BUeXBlcy5udW1iZXIsXG4gIGlzRXJyb3I6IFByb3BUeXBlcy5ib29sLFxuICBhY3Rpb25UZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBhY3Rpb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gIHZlcnRpY2FsUG9zdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsndG9wJywgJ2JvdHRvbSddKSxcbiAgaG9yaXpvbnRhbFBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxufTtcblxuU25hY2tiYXIuZGVmYXVsdFByb3BzID0ge1xuICBkdXJhdGlvbjogNTAwMCxcbiAgaXNFcnJvcjogZmFsc2UsXG4gIGFjdGlvblRleHQ6ICcnLFxuICBhY3Rpb25DbGljazogdW5kZWZpbmVkLFxuICB2ZXJ0aWNhbFBvc3Rpb246ICdib3R0b20nLFxuICBob3Jpem9udGFsUG9zaXRpb246ICdyaWdodCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTbmFja2JhcjtcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgTG9hZGVyTGluZWFyIGZyb20gJy4uL2xheW91dC9Mb2FkZXJMaW5lYXInO1xuaW1wb3J0IE1haW5BZGRCdXR0b24gZnJvbSAnLi4vbGF5b3V0L01haW5BZGRCdXR0b24nO1xuaW1wb3J0IENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIgZnJvbSAnLi4vLi4vY29udGFpbmVycy9DYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyJztcbmltcG9ydCBWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyIGZyb20gJy4uLy4uL2NvbnRhaW5lcnMvVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lcic7XG5pbXBvcnQgVGFza3NDb250YWluZXIgZnJvbSAnLi4vLi4vY29udGFpbmVycy9UYXNrc0NvbnRhaW5lcic7XG5pbXBvcnQgRGlhbG9nQWRkIGZyb20gJy4vZGlhbG9nQWRkL0RpYWxvZ0FkZCc7XG5pbXBvcnQgU25hY2tiYXIgZnJvbSAnLi4vbGF5b3V0L1NuYWNrYmFyJztcblxuY2xhc3MgVG9kb3MgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNEaWFsb2dBZGRPcGVuOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgeyBpbml0RmV0Y2hBbGxDYXRlZ29yaWVzIH0gPSB0aGlzLnByb3BzO1xuICAgIGluaXRGZXRjaEFsbENhdGVnb3JpZXMoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGlzRGlhbG9nQWRkT3BlbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IG1lc3NhZ2UsIGhpZGVNZXNzYWdlLCBzaG93TG9hZGluZyB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWFwcFwiPlxuICAgICAgICA8TG9hZGVyTGluZWFyIHNob3c9e3Nob3dMb2FkaW5nfSAvPlxuICAgICAgICA8ZGl2IGlkPVwibWFpbi10b3AtYmFyXCI+XG4gICAgICAgICAgPENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIgLz5cbiAgICAgICAgICA8VmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lciAvPlxuICAgICAgICAgIDxNYWluQWRkQnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgaXNEaWFsb2dBZGRPcGVuOiB0cnVlIH0pfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8VGFza3NDb250YWluZXIgLz5cbiAgICAgICAgPERpYWxvZ0FkZFxuICAgICAgICAgIG9wZW49e2lzRGlhbG9nQWRkT3Blbn1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgaXNEaWFsb2dBZGRPcGVuOiBmYWxzZSB9KX1cbiAgICAgICAgLz5cbiAgICAgICAgPFNuYWNrYmFyXG4gICAgICAgICAgc2hvdz17bWVzc2FnZS5zaG93fVxuICAgICAgICAgIGlzRXJyb3I9e21lc3NhZ2UuaXNFcnJvcn1cbiAgICAgICAgICBtZXNzYWdlPXttZXNzYWdlLnRleHR9XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gaGlkZU1lc3NhZ2UoKX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuVG9kb3MucHJvcFR5cGVzID0ge1xuICBtZXNzYWdlOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHNob3c6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNFcnJvcjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICB0ZXh0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIGhpZGVNZXNzYWdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBpbml0RmV0Y2hBbGxDYXRlZ29yaWVzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBzaG93TG9hZGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9zO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEJ1dHRvbkRlbGV0ZUNhdGVnb3J5ID0gKHsgb25DbGljayB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLWRlbGV0ZS1jYXRlZ29yeVwiIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIDxpIGNsYXNzTmFtZT1cImljb24tZGVsZXRlXCIgLz5cbiAgPC9idXR0b24+XG4pO1xuXG5CdXR0b25EZWxldGVDYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25EZWxldGVDYXRlZ29yeTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbkdyb3VwIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5pbXBvcnQgc2Nyb2xsIGZyb20gJ3Njcm9sbCc7XG5pbXBvcnQgQnV0dG9uU2Nyb2xsIGZyb20gJy4uLy4uL2xheW91dC9CdXR0b25TY29sbCc7XG5pbXBvcnQgQ2F0ZWdvcnkgZnJvbSAnLi9DYXRlZ29yeSc7XG5pbXBvcnQgRmFkZSBmcm9tICcuLi8uLi9hbmltcy9GYWRlJztcblxuY2xhc3MgQ2F0ZWdvcmllc0ZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuY2hpcHMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5oYW5kbGVMZWZ0U2Nyb2xsQ2xpY2sgPSB0aGlzLmhhbmRsZUxlZnRTY3JvbGxDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlUmlnaHRTY3JvbGxDbGljayA9IHRoaXMuaGFuZGxlUmlnaHRTY3JvbGxDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMubW92ZUNoaXBzU2Nyb2xsID0gdGhpcy5tb3ZlQ2hpcHNTY3JvbGwuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZUxlZnRTY3JvbGxDbGljaygpIHtcbiAgICBpZiAodGhpcy5jaGlwcykge1xuICAgICAgdGhpcy5tb3ZlQ2hpcHNTY3JvbGwoLXRoaXMuY2hpcHMuY2xpZW50V2lkdGgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuY2hpcHMpIHtcbiAgICAgIHRoaXMubW92ZUNoaXBzU2Nyb2xsKHRoaXMuY2hpcHMuY2xpZW50V2lkdGgpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVDaGlwc1Njcm9sbChkZWx0YSkge1xuICAgIGlmICh0aGlzLmNoaXBzKSB7XG4gICAgICBjb25zdCBuZXh0U2Nyb2xsTGVmdCA9IHRoaXMuY2hpcHMuc2Nyb2xsTGVmdCArIGRlbHRhO1xuICAgICAgc2Nyb2xsLmxlZnQodGhpcy5jaGlwcywgbmV4dFNjcm9sbExlZnQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNhdGVnb3J5TGlzdCwgb25EZWxldGVDYXRlZ29yeSwgb25DaWxja0NhdGVnb3J5IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiY29udGVudC1jYXRlZ29yaWVzLWZpbHRlclwiPlxuICAgICAgICA8QnV0dG9uU2Nyb2xsXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVMZWZ0U2Nyb2xsQ2xpY2t9XG4gICAgICAgICAgZGlyZWN0aW9uPVwibGVmdFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJjYXRlZ29yaWVzLWZpbHRlclwiXG4gICAgICAgICAgcmVmPXsobm9kZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGlwcyA9IG5vZGU7XG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxUcmFuc2l0aW9uR3JvdXAgc3R5bGU9e3sgZGlzcGxheTogJ2luaGVyaXQnLCBwYWRkaW5nTGVmdDogJzEuMjVlbScsIHBhZGRpbmdSaWdodDogJzEuMjVlbScgfX0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNhdGVnb3J5TGlzdC5tYXAoY2F0ZWdvcnkgPT4gKFxuICAgICAgICAgICAgICAgIDxGYWRlIGtleT17Y2F0ZWdvcnkuaWR9PlxuICAgICAgICAgICAgICAgICAgPENhdGVnb3J5XG4gICAgICAgICAgICAgICAgICAgIGtleT17Y2F0ZWdvcnkuaWR9XG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5PXtjYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2NhdGVnb3J5LnNlbGVjdGVkfVxuICAgICAgICAgICAgICAgICAgICBvbkRlbGV0ZT17b25EZWxldGVDYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b25DaWxja0NhdGVnb3J5fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L0ZhZGU+XG4gICAgICAgICAgICAgICkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9UcmFuc2l0aW9uR3JvdXA+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8QnV0dG9uU2Nyb2xsXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVSaWdodFNjcm9sbENsaWNrfVxuICAgICAgICAgIGRpcmVjdGlvbj1cInJpZ2h0XCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQ2F0ZWdvcmllc0ZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIGNhdGVnb3J5TGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgb25EZWxldGVDYXRlZ29yeTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2lsY2tDYXRlZ29yeTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbkNhdGVnb3JpZXNGaWx0ZXIuZGVmYXVsdFByb3BzID0ge1xuICBvbkRlbGV0ZUNhdGVnb3J5OiB1bmRlZmluZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYXRlZ29yaWVzRmlsdGVyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQnV0dG9uRGVsZXRlQ2F0ZWdvcnkgZnJvbSAnLi9CdXR0b25EZWxldGVDYXRlZ29yeSc7XG5cbmNvbnN0IENhdGVnb3J5ID0gKHtcbiAgY2F0ZWdvcnksIHNlbGVjdGVkLCBvbkNsaWNrLCBvbkRlbGV0ZSxcbn0pID0+IHtcbiAgbGV0IGNzc0NsYXNzID0gJyc7XG5cbiAgY29uc3Qgb25DaGlwQ2xpY2sgPSAoZSkgPT4ge1xuICAgIG9uQ2xpY2soY2F0ZWdvcnksIGUpO1xuICB9O1xuICBjb25zdCBvbkRlbGV0ZUNsaWNrID0gKCkgPT4ge1xuICAgIG9uRGVsZXRlKGNhdGVnb3J5KTtcbiAgfTtcblxuICBpZiAoc2VsZWN0ZWQpIHtcbiAgICBjc3NDbGFzcyA9ICdjYXRlZ29yeS1zZWxlY3RlZCc7XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2Ake2Nzc0NsYXNzfSBjYXRlZ29yeS1jaGlwIGFsaWduLWl0ZW1zLWNlbnRlcmB9XG4gICAgICBvbkNsaWNrPXtvbkNoaXBDbGlja31cbiAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhdGVnb3J5LXRleHRcIj57Y2F0ZWdvcnkubmFtZX08L3NwYW4+XG4gICAgICB7XG4gICAgICAgIChjYXRlZ29yeS5pZCAhPT0gJzAnICYmIG9uRGVsZXRlICE9PSB1bmRlZmluZWQpICYmXG4gICAgICAgICAgPEJ1dHRvbkRlbGV0ZUNhdGVnb3J5IG9uQ2xpY2s9e29uRGVsZXRlQ2xpY2t9IC8+XG4gICAgICB9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5DYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIG9uRGVsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY2F0ZWdvcnk6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuQ2F0ZWdvcnkuZGVmYXVsdFByb3BzID0ge1xuICBvbkRlbGV0ZTogdW5kZWZpbmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0ZWdvcnk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5pbXBvcnQgeyBBRERfVEFTSyB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgeyBhZGRDYXRlZ29yeSB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvdG9kb0ZpbHRlcnNBY3Rpb25zJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5jbGFzcyBBZGRDYXRlZ29yeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBuYW1lOiAnJyxcbiAgICB9O1xuICAgIHRoaXMub25JbnB1dFRleHRDaGFuZ2UgPSB0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkJ1dHRvbkFkZENsaWNrID0gdGhpcy5vbkJ1dHRvbkFkZENsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkNhdGVnb3J5Q3JlYXRlZCA9IHRoaXMub25DYXRlZ29yeUNyZWF0ZWQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uSW5wdXRUZXh0Q2hhbmdlKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgbmFtZTogZS50YXJnZXQudmFsdWUgfSk7XG4gIH1cblxuICBvbkJ1dHRvbkFkZENsaWNrKCkge1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IGRpc3BhdGNoIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChuYW1lID09PSAnJykge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VJbmZvKGxhYmVscy5tc2dOYW1lUmVxdWlyZWQpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGlzcGF0Y2goYWRkQ2F0ZWdvcnkobmFtZSwgdGhpcy5vbkNhdGVnb3J5Q3JlYXRlZCkpO1xuICB9XG5cbiAgb25DYXRlZ29yeUNyZWF0ZWQoc2VsZWN0ZWRDYXRlZ29yeSkge1xuICAgIGNvbnN0IHsgb25OZXh0IH0gPSB0aGlzLnByb3BzO1xuICAgIG9uTmV4dCh7IHN0ZXBJZDogQUREX1RBU0ssIG9wdGlvbnM6IHsgc2VsZWN0ZWRDYXRlZ29yeSB9IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtYWRkLWNhdGVnb3J5XCI+XG4gICAgICAgIDxoMj57bGFiZWxzLnRpdGxlQWRkQ2F0ZWdvcnl9PC9oMj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4taW5wdXRcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2xhYmVscy5wbGFjZWhvbGRlck5hbWV9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0VGV4dENoYW5nZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQnV0dG9uQWRkQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xhYmVscy5idXR0b25BZGR9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5BZGRDYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbk5leHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCkoQWRkQ2F0ZWdvcnkpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IHsgU0VMRUNUX0NPTVBMRVRFX0RBVEUgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VJbmZvIH0gZnJvbSAnLi4vLi4vLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5cbmNsYXNzIEFkZFRhc2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0aXRsZTogJycsXG4gICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgfTtcbiAgICB0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlID0gdGhpcy5vbklucHV0VGV4dENoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25CdXR0b25TY2hlZHVsZUNsaWNrID0gdGhpcy5vbkJ1dHRvblNjaGVkdWxlQ2xpY2suYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uSW5wdXRUZXh0Q2hhbmdlKG5hbWUpIHtcbiAgICByZXR1cm4gKGUpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBbbmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pO1xuICAgIH07XG4gIH1cblxuICBvbkJ1dHRvblNjaGVkdWxlQ2xpY2soKSB7XG4gICAgY29uc3QgeyBvcHRpb25zLCBkaXNwYXRjaCwgb25OZXh0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgdGl0bGUsIGRlc2NyaXB0aW9uIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGNhdGVnb3J5ID0gb3B0aW9ucy5zZWxlY3RlZENhdGVnb3J5O1xuICAgIGlmICh0aXRsZSA9PT0gJycpIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlSW5mbyhsYWJlbHMubXNnVGl0bGVSZXF1aXJlZCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvbk5leHQoeyBzdGVwSWQ6IFNFTEVDVF9DT01QTEVURV9EQVRFLCBvcHRpb25zOiB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgY2F0ZWdvcnkgfSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSA9IHRoaXMucHJvcHMub3B0aW9ucztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWFkZC10YXNrXCI+XG4gICAgICAgIDxoMj57bGFiZWxzLnRpdGxlQWRkVGFza308L2gyPlxuICAgICAgICA8aDM+XG4gICAgICAgICAge2xhYmVscy5sYWJlbEZvckNhdGVnb3J5fVxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxhYmVsLWNhdGVnb3J5LW5hbWVcIj5cbiAgICAgICAgICAgIHtgICR7c2VsZWN0ZWRDYXRlZ29yeS5uYW1lfWB9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2gzPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtZmllbGRzXCI+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtsYWJlbHMucGxhY2VIb2xkZXJUaXRsZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlKCd0aXRsZScpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtsYWJlbHMucGxhY2VIb2xkZXJEZXNjcmlwdGlvbn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlKCdkZXNjcmlwdGlvbicpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4tYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25CdXR0b25TY2hlZHVsZUNsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYWJlbHMuYnV0dG9uU2NoZWR1bGV9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5BZGRUYXNrLnByb3BUeXBlcyA9IHtcbiAgZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9wdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2VsZWN0ZWRDYXRlZ29yeTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgfSkuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCgpKEFkZFRhc2spO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBTZWxlY3RBY3Rpb25BZGQgZnJvbSAnLi9TZWxlY3RBY3Rpb25BZGQnO1xuaW1wb3J0IEFkZENhdGVnb3J5IGZyb20gJy4vQWRkQ2F0ZWdvcnknO1xuaW1wb3J0IFNlbGVjdENhdGVnb3J5IGZyb20gJy4vU2VsZWN0Q2F0ZWdvcnknO1xuaW1wb3J0IEFkZFRhc2sgZnJvbSAnLi9BZGRUYXNrJztcbmltcG9ydCBTZWxlY3RDb21wbGV0ZURhdGUgZnJvbSAnLi9TZWxlY3RDb21wbGV0ZURhdGUnO1xuaW1wb3J0IERvbmUgZnJvbSAnLi9Eb25lJztcbmltcG9ydCB7XG4gIFNFTEVDVF9XQU5UX1RPX0FERCxcbiAgQUREX0NBVEVHT1JZLFxuICBBRERfVEFTSyxcbiAgU0VMRUNUX0NBVEVHT1JZLFxuICBTRUxFQ1RfQ09NUExFVEVfREFURSxcbiAgRE9ORSxcbiAgc3RlcExpc3QsXG59IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgUmVwbGFjZUFuaW0gZnJvbSAnLi4vLi4vYW5pbXMvUmVwbGFjZUFuaW0nO1xuaW1wb3J0IERpYWxvZ0FuaW0gZnJvbSAnLi4vLi4vYW5pbXMvRGlhbG9nQW5pbSc7XG5pbXBvcnQgU3RlcHMgZnJvbSAnLi9TdGVwcyc7XG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuXG5jb25zdCBnZXRDb250ZW50VG9SZW5kZXIgPSAoc3RlcHMsIHByb3BzKSA9PiB7XG4gIGlmIChzdGVwcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gPFNlbGVjdEFjdGlvbkFkZCB7Li4ucHJvcHN9IC8+O1xuICB9XG4gIGNvbnN0IGxhc3RTdGVwID0gc3RlcHNbc3RlcHMubGVuZ3RoIC0gMV07XG4gIHN3aXRjaCAobGFzdFN0ZXAuc3RlcElkKSB7XG4gICAgY2FzZSBTRUxFQ1RfV0FOVF9UT19BREQ6XG4gICAgICByZXR1cm4gPFNlbGVjdEFjdGlvbkFkZCB7Li4ucHJvcHN9IC8+O1xuICAgIGNhc2UgQUREX0NBVEVHT1JZOlxuICAgICAgcmV0dXJuIDxBZGRDYXRlZ29yeSB7Li4ucHJvcHN9IC8+O1xuICAgIGNhc2UgQUREX1RBU0s6XG4gICAgICByZXR1cm4gPEFkZFRhc2sgey4uLnByb3BzfSBvcHRpb25zPXtsYXN0U3RlcC5vcHRpb25zfSAvPjtcbiAgICBjYXNlIFNFTEVDVF9DQVRFR09SWTpcbiAgICAgIHJldHVybiA8U2VsZWN0Q2F0ZWdvcnkgey4uLnByb3BzfSAvPjtcbiAgICBjYXNlIFNFTEVDVF9DT01QTEVURV9EQVRFOlxuICAgICAgcmV0dXJuIDxTZWxlY3RDb21wbGV0ZURhdGUgey4uLnByb3BzfSBvcHRpb25zPXtsYXN0U3RlcC5vcHRpb25zfSAvPjtcbiAgICBjYXNlIERPTkU6XG4gICAgICByZXR1cm4gPERvbmUgey4uLnByb3BzfSAvPjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIDxTZWxlY3RBY3Rpb25BZGQgey4uLnByb3BzfSAvPjtcbiAgfVxufTtcblxuY29uc3QgaW5pdGFsU3RhdGUgPSB7XG4gIG5leHRTdGVwczogW10sXG4gIHN0ZXBzOiBbXG4gICAge1xuICAgICAgc3RlcElkOiBTRUxFQ1RfV0FOVF9UT19BREQsXG4gICAgICBvcHRpb25zOiB7fSxcbiAgICB9LFxuICBdLFxuICBzaG93U3RlcDogdHJ1ZSxcbn07XG5cbmNsYXNzIERpYWxvZ0FkZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAuLi5pbml0YWxTdGF0ZSxcbiAgICB9O1xuICAgIHRoaXMub25CYWNrID0gdGhpcy5vbkJhY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uTmV4dCA9IHRoaXMub25OZXh0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblJlc2V0QW5kQ2xvc2UgPSB0aGlzLm9uUmVzZXRBbmRDbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25BbmltYXRpb25FbmQgPSB0aGlzLm9uQW5pbWF0aW9uRW5kLmJpbmQodGhpcyk7XG4gIH1cblxuICBvbkJhY2soKSB7XG4gICAgY29uc3QgeyBzdGVwcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IG9uQ2xvc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc3RlcENvdW50ID0gc3RlcHMubGVuZ3RoO1xuICAgIGlmIChzdGVwQ291bnQgPT09IDEpIHtcbiAgICAgIC8vIFJldHVybmVkIHRvIHRoZSBmaXJzdCBzdGVwcywgY2xvc2UgdGhlIGRpYWxvZ1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLmluaXRhbFN0YXRlIH0pO1xuICAgICAgb25DbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbmV4dFN0ZXBzOiBbXG4gICAgICAgICAgLi4uc3RlcHMuc2xpY2UoMCwgc3RlcHMubGVuZ3RoIC0gMSksXG4gICAgICAgIF0sXG4gICAgICAgIHNob3dTdGVwOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uTmV4dChzdGVwID0geyBzdGVwSWQ6ICcnLCBvcHRpb25zOiB7fSB9KSB7XG4gICAgY29uc3QgeyBzdGVwcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG5leHRTdGVwczogW1xuICAgICAgICAuLi5zdGVwcywge1xuICAgICAgICAgIC4uLnN0ZXAsXG4gICAgICAgICAgY29tcGxldGU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgc2hvd1N0ZXA6IGZhbHNlLFxuICAgIH0pO1xuICB9XG5cbiAgb25SZXNldEFuZENsb3NlKCkge1xuICAgIGNvbnN0IHsgb25DbG9zZSB9ID0gdGhpcy5wcm9wcztcbiAgICBvbkNsb3NlKCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgLi4uaW5pdGFsU3RhdGUgfSk7XG4gICAgfSwgNTAwKTtcbiAgfVxuXG4gIG9uQW5pbWF0aW9uRW5kKG5vZGUsIGRvbmUpIHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCAoKSA9PiB7XG4gICAgICBkb25lKCk7XG4gICAgICBjb25zdCB7IG5leHRTdGVwcywgc2hvd1N0ZXAgfSA9IHRoaXMuc3RhdGU7XG4gICAgICBpZiAoc2hvd1N0ZXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHN0ZXBzOiBbXG4gICAgICAgICAgLi4ubmV4dFN0ZXBzLFxuICAgICAgICBdLFxuICAgICAgICBzaG93U3RlcDogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHN0ZXBzLCBzaG93U3RlcCB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IG9uQ2xvc2UsIG9wZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBvbk5leHQsIG9uUmVzZXRBbmRDbG9zZSwgb25BbmltYXRpb25FbmQgfSA9IHRoaXM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxEaWFsb2dBbmltIGluPXtvcGVufT5cbiAgICAgICAgPGRpdiBpZD1cImRpYWxvZy1hZGRcIiA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaWFsb2ctaGVhZGVyXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwibWFpbi1jbG9zZS1idXR0b25cIiBvbkNsaWNrPXsoKSA9PiBvbkNsb3NlKCl9PlxuICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPiYjeEU1Q0Q7PC9pPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwcy1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxTdGVwc1xuICAgICAgICAgICAgICBsaXN0PXtzdGVwTGlzdH1cbiAgICAgICAgICAgICAgc3RlcEhpc3Rvcnk9e3N0ZXBzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpYWxvZy1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxSZXBsYWNlQW5pbSBpbj17c2hvd1N0ZXB9IGVuZExpc3RlbmVyPXtvbkFuaW1hdGlvbkVuZH0+XG4gICAgICAgICAgICAgIHtnZXRDb250ZW50VG9SZW5kZXIoc3RlcHMsIHsgb25OZXh0LCBvbkNsb3NlOiBvblJlc2V0QW5kQ2xvc2UgfSl9XG4gICAgICAgICAgICA8L1JlcGxhY2VBbmltPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlhbG9nLWZvb3RlclwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBpZD1cImJhY2stYnV0dG9uLWRpYWxvZ1wiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5vbkJhY2soKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2xhYmVscy5idXR0b25CYWNrfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9EaWFsb2dBbmltPlxuICAgICk7XG4gIH1cbn1cblxuRGlhbG9nQWRkLnByb3BUeXBlcyA9IHtcbiAgb3BlbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpYWxvZ0FkZDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvbGFiZWxzJztcblxuY2xhc3MgRG9uZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgeyBvbkNsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgICAgb25DbG9zZSgpO1xuICAgIH0sIDMwMDApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtZG9uZS1hZGRcIj5cbiAgICAgICAgPGgyPntsYWJlbHMubGFiZWxEb25lfTwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1pYy1kb25lXCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgc3JjPVwiLi9jbGllbnQvcHVibGljL2ltZy9pYy1kb25lLnN2Z1wiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJpYy1kb25lXCJcbiAgICAgICAgICAgIGFsdD1cImRvbmUgaWNvblwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkRvbmUucHJvcFR5cGVzID0ge1xuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRG9uZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgeyBBRERfQ0FURUdPUlksIFNFTEVDVF9DQVRFR09SWSB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuXG5jb25zdCBTZWxlY3RBY3Rpb25BZGQgPSAoeyBvbk5leHQgfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtc2VsZWN0LWFjdGlvbi1hZGRcIj5cbiAgICA8aDI+e2xhYmVscy50aXRsZUFkZH08L2gyPlxuICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbS1zZWxlY3RcIj5cbiAgICAgIDxwXG4gICAgICAgIGNsYXNzTmFtZT1cInNlbGVjdC10aXRsZVwiXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uTmV4dCh7IHN0ZXBJZDogQUREX0NBVEVHT1JZLCBvcHRpb25zOiB7fSB9KX1cbiAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICA+XG4gICAgICAgIHtsYWJlbHMubGFiZWxDYXRlZ29yeX1cbiAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW0tc2VsZWN0XCI+XG4gICAgICA8cFxuICAgICAgICBjbGFzc05hbWU9XCJzZWxlY3QtdGl0bGVcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk5leHQoeyBzdGVwSWQ6IFNFTEVDVF9DQVRFR09SWSwgb3B0aW9uczoge30gfSl9XG4gICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgPlxuICAgICAgICB7bGFiZWxzLmxhYmVsVGFza31cbiAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4pO1xuXG5TZWxlY3RBY3Rpb25BZGQucHJvcFR5cGVzID0ge1xuICBvbk5leHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RBY3Rpb25BZGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5pbXBvcnQgQ2F0ZWdvcnkgZnJvbSAnLi4vY2F0ZWdvcnkvQ2F0ZWdvcnknO1xuaW1wb3J0IHsgQUREX1RBU0sgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VJbmZvIH0gZnJvbSAnLi4vLi4vLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5cblxuY2xhc3MgU2VsZWN0Q2F0ZWdvcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VsZWN0ZWRDYXRlZ29yeTogdW5kZWZpbmVkLFxuICAgIH07XG4gICAgdGhpcy5vbkNhdGVnb3J5Q2xpY2sgPSB0aGlzLm9uQ2F0ZWdvcnlDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25CdXR0b25OZXh0Q2xpY2sgPSB0aGlzLm9uQnV0dG9uTmV4dENsaWNrLmJpbmQodGhpcyk7XG4gIH1cblxuICBvbkNhdGVnb3J5Q2xpY2soY2F0ZWdvcnkpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRDYXRlZ29yeTogY2F0ZWdvcnkgfSk7XG4gIH1cblxuICBvbkJ1dHRvbk5leHRDbGljaygpIHtcbiAgICBjb25zdCB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvbk5leHQsIGRpc3BhdGNoIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChzZWxlY3RlZENhdGVnb3J5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlSW5mbyhsYWJlbHMubXNnU2VsZWN0Q2F0ZWdvcnkpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25OZXh0KHsgc3RlcElkOiBBRERfVEFTSywgb3B0aW9uczogeyBzZWxlY3RlZENhdGVnb3J5IH0gfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjYXRlZ29yaWVzTGlzdCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1zZWxlY3QtY2F0ZWdvcnlcIj5cbiAgICAgICAgPGgyPntsYWJlbHMudGl0bGVDaG9vc2VDYXRlZ29yeX08L2gyPlxuICAgICAgICA8ZGl2IGlkPVwiY29udGVudC1jYXRlZ29yaWVzXCI+XG4gICAgICAgICAge1xuICAgICAgICAgICAgY2F0ZWdvcmllc0xpc3QubWFwKGNhdGVnb3J5ID0+IChcbiAgICAgICAgICAgICAgKGNhdGVnb3J5LmlkICE9PSAnMCcpXG4gICAgICAgICAgICAgID8gPENhdGVnb3J5XG4gICAgICAgICAgICAgICAga2V5PXtjYXRlZ29yeS5pZH1cbiAgICAgICAgICAgICAgICBjYXRlZ29yeT17Y2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3NlbGVjdGVkQ2F0ZWdvcnkgIT09IHVuZGVmaW5lZCAmJiBjYXRlZ29yeS5pZCA9PT0gc2VsZWN0ZWRDYXRlZ29yeS5pZH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2F0ZWdvcnlDbGlja31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICkpXG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQnV0dG9uTmV4dENsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYWJlbHMuYnV0dG9uTmV4dH1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblNlbGVjdENhdGVnb3J5LnByb3BUeXBlcyA9IHtcbiAgZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNhdGVnb3JpZXNMaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICBvbk5leHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcCA9IHN0YXRlID0+IChcbiAge1xuICAgIGNhdGVnb3JpZXNMaXN0OiBzdGF0ZS50b2RvRmlsdGVycy5jYXRlZ29yaWVzLFxuICB9XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wKShTZWxlY3RDYXRlZ29yeSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgRGF0ZVBpY2tlciBmcm9tICdyZWFjdC1kYXRlLXBpY2tlcic7XG5cbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5pbXBvcnQgeyBET05FIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCB7IGFkZFRhc2sgfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL3RvZG9UYXNrc0FjdGlvbnMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VJbmZvIH0gZnJvbSAnLi4vLi4vLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5cbmNsYXNzIFNlbGVjdENvbXBsZXRlRGF0ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0b2RvV2l0aGluOiBuZXcgRGF0ZSgpLFxuICAgIH07XG4gICAgdGhpcy5vbklucHV0RGF0ZUNoYW5nZSA9IHRoaXMub25JbnB1dERhdGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQnV0dG9uQWRkQ2xpY2sgPSB0aGlzLm9uQnV0dG9uQWRkQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uVG9kb1Rhc2tDcmVhdGVkID0gdGhpcy5vblRvZG9UYXNrQ3JlYXRlZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25JbnB1dERhdGVDaGFuZ2UoZGF0ZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyB0b2RvV2l0aGluOiBkYXRlIH0pO1xuICB9XG5cbiAgb25CdXR0b25BZGRDbGljaygpIHtcbiAgICBjb25zdCB7IHRvZG9XaXRoaW4gfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBkaXNwYXRjaCwgb3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgY2F0ZWdvcnkgfSA9IG9wdGlvbnM7XG4gICAgaWYgKCF0b2RvV2l0aGluIHx8IHRvZG9XaXRoaW4gPT09ICcnKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ1NlbGVjdERhdGUpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGlzcGF0Y2goYWRkVGFzayhcbiAgICAgIHRpdGxlLCBkZXNjcmlwdGlvbixcbiAgICAgIGNhdGVnb3J5LCB0b2RvV2l0aGluLCB0aGlzLm9uVG9kb1Rhc2tDcmVhdGVkLFxuICAgICkpO1xuICB9XG5cbiAgb25Ub2RvVGFza0NyZWF0ZWQoKSB7XG4gICAgY29uc3QgeyBvbk5leHQgfSA9IHRoaXMucHJvcHM7XG4gICAgb25OZXh0KHsgc3RlcElkOiBET05FLCBvcHRpb25zOiB7IH0gfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB0b2RvV2l0aGluIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtc2VsZWN0LWNvbXBsZXRlLWRhdGVcIj5cbiAgICAgICAgPGgyPntsYWJlbHMudGl0bGVUb2RvV2l0aGlufTwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1pbnB1dFwiPlxuICAgICAgICAgIDxEYXRlUGlja2VyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIGNhbGVuZGFyQ2xhc3NOYW1lPVwiZGFyay1jYWxlbmRhclwiXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0RGF0ZUNoYW5nZX1cbiAgICAgICAgICAgIHZhbHVlPXt0b2RvV2l0aGlufVxuICAgICAgICAgICAgbWluRGF0ZT17bmV3IERhdGUoKX1cbiAgICAgICAgICAgIGxvY2FsZT1cImVuLVVTXCJcbiAgICAgICAgICAgIGNsZWFySWNvbj17PGkgY2xhc3NOYW1lPVwiaWNvbi1kZWxldGVcIiAvPn1cbiAgICAgICAgICAgIGNhbGVuZGFySWNvbj17PGkgY2xhc3NOYW1lPVwiaWNvbi1jYWxlbmRhclwiIC8+fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4tYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25CdXR0b25BZGRDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGFiZWxzLmJ1dHRvbkFkZH1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblNlbGVjdENvbXBsZXRlRGF0ZS5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvcHRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgZGVzY3JpcHRpb246IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjYXRlZ29yeTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgfSkuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCgpKFNlbGVjdENvbXBsZXRlRGF0ZSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgU3RlcCA9ICh7IGRlc2NyaXB0aW9uLCBjb21wbGV0ZWQsIG5lZWRMaW5lIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNvbnRhaW5lclwiPlxuICAgIHtcbiAgICAgIG5lZWRMaW5lICYmXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGxpbmUgJHsoY29tcGxldGVkKSA/ICdjb21wbGV0ZWQnIDogJyd9YH0gLz5cbiAgICB9XG4gICAgPGRpdiBjbGFzc05hbWU9e2BzdGVwICR7KGNvbXBsZXRlZCkgPyAnY29tcGxldGVkJyA6ICcnfWB9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmRpY2F0b3JcIiAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWRlc2NyaXB0aW9uXCI+XG4gICAgICAgIDxwPntkZXNjcmlwdGlvbn08L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4pO1xuXG5TdGVwLnByb3BUeXBlcyA9IHtcbiAgZGVzY3JpcHRpb246IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBuZWVkTGluZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbn07XG5cbmNvbnN0IFN0ZXBzID0gKHsgbGlzdCwgc3RlcEhpc3RvcnkgfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXBzLXdyYXBwZXJcIj5cbiAgICB7XG4gICAgICBsaXN0Lm1hcCgoaXRlbSwgaSkgPT4gKFxuICAgICAgICA8U3RlcFxuICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICB7Li4uaXRlbX1cbiAgICAgICAgICBjb21wbGV0ZWQ9e3N0ZXBIaXN0b3J5LmZpbHRlcihzaCA9PiBzaC5zdGVwSWQgPT09IGl0ZW0uaWQpLmxlbmd0aCA+IDB9XG4gICAgICAgICAgbmVlZExpbmU9e2kgPiAwfVxuICAgICAgICAvPikpXG4gICAgfVxuICA8L2Rpdj5cbik7XG5cblN0ZXBzLnByb3BUeXBlcyA9IHtcbiAgbGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIHN0ZXBIaXN0b3J5OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHN0ZXBJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgfSkpLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdGVwcztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdXR0b25Db21wbGV0ZVRhc2sgPSAoeyBvbkNsaWNrLCBjb21wbGV0ZWQgfSkgPT4gKFxuICA8YnV0dG9uXG4gICAgY2xhc3NOYW1lPXtgYnV0dG9uLWNvbXBsZXRlLXRhc2sgJHsoY29tcGxldGVkKSA/ICdidXR0b24tY29tcGxldGVkLXRhc2snIDogJyd9YH1cbiAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICA+XG4gICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1jaGVja1wiIC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uQ29tcGxldGVUYXNrLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbCxcbn07XG5cbkJ1dHRvbkNvbXBsZXRlVGFzay5kZWZhdWx0UHJvcHMgPSB7XG4gIGNvbXBsZXRlZDogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25Db21wbGV0ZVRhc2s7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgQnV0dG9uRGVsZXRlVGFzayA9ICh7IG9uQ2xpY2sgfSkgPT4gKFxuICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvbi1kZWxldGUtdGFza1wiIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIDxpIGNsYXNzTmFtZT1cImljb24tZGVsZXRlXCIgLz5cbiAgPC9idXR0b24+XG4pO1xuXG5CdXR0b25EZWxldGVUYXNrLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkRlbGV0ZVRhc2s7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBDb2xsYXBzZSBmcm9tICcuLi8uLi9hbmltcy9Db2xsYXBzZSc7XG5pbXBvcnQgRmFkZSBmcm9tICcuLi8uLi9hbmltcy9GYWRlJztcbmltcG9ydCBCdXR0b25Db21wbGV0ZVRhc2sgZnJvbSAnLi9CdXR0b25Db21wbGV0ZVRhc2snO1xuaW1wb3J0IEJ1dHRvbkRlbGV0ZVRhc2sgZnJvbSAnLi9CdXR0b25EZWxldGVUYXNrJztcbmltcG9ydCB7IHRvU2ltcGxlRGF0ZUZvcm1hdCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL0NvbW1vbic7XG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuXG5jbGFzcyBUYXNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgfTtcbiAgICB0aGlzLnJlbmRlckRhdGUgPSB0aGlzLnJlbmRlckRhdGUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uVGl0bGVDbGljaygpIHtcbiAgICBjb25zdCB7IGNvbGxhcHNlZCB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnNldFN0YXRlKHsgY29sbGFwc2VkOiAhY29sbGFwc2VkIH0pO1xuICB9XG5cbiAgcmVuZGVyRGF0ZSgpIHtcbiAgICBjb25zdCB7IHRhc2sgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKHRhc2suY29tcGxldGVkKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8cCBjbGFzc05hbWU9XCJjb21wbGV0ZS1kYXRlXCI+e2Ake2xhYmVscy5sYWJlbFBhcnRpYWxDb21wbGV0ZWR9ICR7KHRhc2suY29tcGxldGVkQXQpID8gdG9TaW1wbGVEYXRlRm9ybWF0KHRhc2suY29tcGxldGVkQXQpIDogJyd9YH08L3A+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPHAgY2xhc3NOYW1lPVwiY29tcGxldGUtd2l0aGluLWRhdGVcIj57YCR7bGFiZWxzLmxhYmVsUGFydGlhbFRvQ29tcGxldGVkfSAkeyh0YXNrLnRvZG9XaXRoaW4pID8gdG9TaW1wbGVEYXRlRm9ybWF0KHRhc2sudG9kb1dpdGhpbikgOiBsYWJlbHMubGFiZWxOb3RTZXR9YH08L3A+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHRhc2ssIG9uRGVsZXRlLCBvbkNvbXBsZXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY29sbGFwc2VkIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhc2staXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhc2staGVhZGVyXCI+XG4gICAgICAgICAgPHBcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHRhc2stdGl0bGUgJHsodGFzay5jb21wbGV0ZWQpID8gJ3Rhc2stdGl0bGUtY29tcGxldGVkJyA6ICcnfWB9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uVGl0bGVDbGljaygpfVxuICAgICAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3Rhc2sudGl0bGV9XG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxGYWRlIGluPXtjb2xsYXBzZWR9PlxuICAgICAgICAgICAgPEJ1dHRvbkRlbGV0ZVRhc2tcbiAgICAgICAgICAgICAgb25DbGljaz17b25EZWxldGV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvRmFkZT5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBvbkNvbXBsZXRlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIDxCdXR0b25Db21wbGV0ZVRhc2tcbiAgICAgICAgICAgICAgb25DbGljaz17b25Db21wbGV0ZX1cbiAgICAgICAgICAgICAgY29tcGxldGVkPXt0YXNrLmNvbXBsZXRlZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YXNrLWRhdGVcIj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJEYXRlKCl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Q29sbGFwc2UgaW49e2NvbGxhcHNlZH0+XG4gICAgICAgICAgPGRpdiBrZXk9e3Rhc2suZGVzY3JpcHRpb259IGNsYXNzTmFtZT1cInRhc2stYm9keVwiPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGFzay1kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgKHRhc2suZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCAmJiB0YXNrLmRlc2NyaXB0aW9uICE9PSAnJylcbiAgICAgICAgICAgICAgICA/IHRhc2suZGVzY3JpcHRpb24gOiA8c3BhbiBjbGFzc05hbWU9XCJlbXB0eVwiPntsYWJlbHMubGFiZWxOb0Rlc2NyaXB0aW9ufTwvc3Bhbj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NvbGxhcHNlPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5UYXNrLnByb3BUeXBlcyA9IHtcbiAgb25EZWxldGU6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNvbXBsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgdGFzazogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGNvbXBsZXRlZEF0OiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICB9KS5pc1JlcXVpcmVkLFxufTtcblxuVGFzay5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uRGVsZXRlOiB1bmRlZmluZWQsXG4gIG9uQ29tcGxldGU6IHVuZGVmaW5lZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2s7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb25Hcm91cCB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuaW1wb3J0IFJlc2l6ZSBmcm9tICcuLi8uLi9hbmltcy9SZXNpemUnO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrJztcbmltcG9ydCBJbmZpbml0ZVNjcm9sbCBmcm9tICcuLi8uLi9sYXlvdXQvSW5maW5pdGVTY3JvbGwnO1xuaW1wb3J0IHsgcXVlcnlJdGVtc0xpbWl0IH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgbGltaXQ6IHF1ZXJ5SXRlbXNMaW1pdCxcbiAgc2tpcDogMCxcbn07XG5cbmNsYXNzIFRhc2tzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IGluaXRpYWxTdGF0ZTtcbiAgICB0aGlzLm9uRmV0Y2hUb2RvVGFza3NOZXh0ID0gdGhpcy5vbkZldGNoVG9kb1Rhc2tzTmV4dC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhuZXh0UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIGlmIChuZXh0UHJvcHMuc2tpcCAhPT0gcHJldlN0YXRlLnNraXApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNraXA6IG5leHRQcm9wcy5za2lwLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBvbkZldGNoVG9kb1Rhc2tzTmV4dCgpIHtcbiAgICBjb25zdCB7XG4gICAgICBjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCxcbiAgICAgIGZldGNoVGFza3MsIG1vcmVUb0xvYWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFtb3JlVG9Mb2FkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgbGltaXQsIHNraXAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgbmV3U2tpcCA9IHNraXAgKyBsaW1pdDtcbiAgICBmZXRjaFRhc2tzKGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgbmV3U2tpcCk7XG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiAoeyBza2lwOiBzdGF0ZS5za2lwICsgc3RhdGUubGltaXQgfSkpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHRhc2tMaXN0LFxuICAgICAgb25EZWxldGVUYXNrLFxuICAgICAgb25Db21wbGV0ZVRhc2ssXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJjb250ZW50LXRvZG8tdGFza3NcIj5cbiAgICAgICAgPEluZmluaXRlU2Nyb2xsIG9uU2Nyb2xsPXt0aGlzLm9uRmV0Y2hUb2RvVGFza3NOZXh0fT5cbiAgICAgICAgICA8VHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0YXNrTGlzdC5tYXAoYXJnID0+IChcbiAgICAgICAgICAgICAgICA8UmVzaXplIGtleT17YXJnLmlkfT5cbiAgICAgICAgICAgICAgICAgIDxUYXNrXG4gICAgICAgICAgICAgICAgICAgIGtleT17YXJnLmlkfVxuICAgICAgICAgICAgICAgICAgICB0YXNrPXthcmd9XG4gICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlPXsoKSA9PiBvbkRlbGV0ZVRhc2soYXJnKX1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17KCkgPT4gb25Db21wbGV0ZVRhc2soYXJnKX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9SZXNpemU+XG4gICAgICAgICAgICAgICkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9UcmFuc2l0aW9uR3JvdXA+XG4gICAgICAgIDwvSW5maW5pdGVTY3JvbGw+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblRhc2tzLnByb3BUeXBlcyA9IHtcbiAgb25EZWxldGVUYXNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkNvbXBsZXRlVGFzazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgdGFza0xpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgbW9yZVRvTG9hZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgZmV0Y2hUYXNrczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY2F0ZWdvcmllc0lkOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKS5pc1JlcXVpcmVkLFxuICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBUYXNrcztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFZpc2liaWxpdHlTd2l0Y2ggZnJvbSAnLi9WaXNpYmlsaXR5U3dpdGNoJztcbmltcG9ydCB7IEFMTF9UT0RPUywgT05MWV9DT01QTEVURUQsIE9OTFlfVE9fQ09NUExFVEUgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvY29uZmlnJztcblxuY29uc3QgVmlzaWJpbGl0eUZpbHRlciA9ICh7XG4gIHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciwgb25WaXNpYmlsaXR5U3dpdGNoQ2xpY2ssXG59KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwidmlzaWJpbGl0eS1maWx0ZXItd3JhcHBlclwiPlxuICAgIDxWaXNpYmlsaXR5U3dpdGNoXG4gICAgICBzZWxlY3RlZD17KHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciA9PT0gT05MWV9UT19DT01QTEVURVxuICAgICAgICB8fCBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IEFMTF9UT0RPUyl9XG4gICAgICBvbkNsaWNrPXtvblZpc2liaWxpdHlTd2l0Y2hDbGljayhPTkxZX1RPX0NPTVBMRVRFKX1cbiAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgID5cbiAgICAgIDxpIGNsYXNzTmFtZT1cImljb24tY2lyY2xlLWJvcmRlclwiIC8+XG4gICAgPC9WaXNpYmlsaXR5U3dpdGNoPlxuICAgIDxWaXNpYmlsaXR5U3dpdGNoXG4gICAgICBzZWxlY3RlZD17KHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciA9PT0gT05MWV9DT01QTEVURURcbiAgICAgICAgfHwgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyID09PSBBTExfVE9ET1MpfVxuICAgICAgb25DbGljaz17b25WaXNpYmlsaXR5U3dpdGNoQ2xpY2soT05MWV9DT01QTEVURUQpfVxuICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgPlxuICAgICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1jaXJjbGVcIiAvPlxuICAgIDwvVmlzaWJpbGl0eVN3aXRjaD5cbiAgPC9kaXY+XG4pO1xuXG5WaXNpYmlsaXR5RmlsdGVyLnByb3BUeXBlcyA9IHtcbiAgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uVmlzaWJpbGl0eVN3aXRjaENsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaWJpbGl0eUZpbHRlcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBWaXNpYmlsaXR5U3dpdGNoID0gKHtcbiAgc2VsZWN0ZWQsIGNoaWxkcmVuLCBvbkNsaWNrLFxufSkgPT4gKFxuICA8ZGl2XG4gICAgY2xhc3NOYW1lPXtgdmlzaWJpbGl0eS1idXR0b24tc3dpdGNoIGFsaWduLWl0ZW1zLWNlbnRlciAkeyhzZWxlY3RlZCkgPyAnc2VsZWN0ZWQnIDogJyd9IGB9XG4gICAgb25DbGljaz17b25DbGlja31cbiAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgPlxuICAgIHtjaGlsZHJlbn1cbiAgPC9kaXY+XG4pO1xuXG5WaXNpYmlsaXR5U3dpdGNoLnByb3BUeXBlcyA9IHtcbiAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cblZpc2liaWxpdHlTd2l0Y2guZGVmYXVsdFByb3BzID0ge1xuICBzZWxlY3RlZDogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBWaXNpYmlsaXR5U3dpdGNoO1xuIiwiY29uc3QgbGFiZWxzID0ge1xuICB0aXRsZUFkZDogJ1doYXQgd291bGQgeW91IGxpa2UgdG8gYWRkPycsXG4gIHRpdGxlQWRkQ2F0ZWdvcnk6ICdBZGQgbmV3IENBVEVHT1JZJyxcbiAgdGl0bGVBZGRUYXNrOiAnQWRkIG5ldyBUYXNrJyxcbiAgdGl0bGVDaG9vc2VDYXRlZ29yeTogJ0Nob29zZSBhIENBVEVHT1JZJyxcbiAgdGl0bGVUb2RvV2l0aGluOiAnVG9kbyBXaXRoaW4nLFxuICBsYWJlbEZvckNhdGVnb3J5OiAnZm9yIHRoZSBjYXRlZ29yeTonLFxuICBsYWJlbERvbmU6ICdEb25lIScsXG4gIGxhYmVsQ2F0ZWdvcnk6ICdDQVRFR09SWScsXG4gIGxhYmVsVGFzazogJ1RBU0snLFxuICBsYWJlbE5vdFNldDogJ25vdCBzZXQnLFxuICBsYWJlbE5vRGVzY3JpcHRpb246ICdObyBkZXNjcmlwdGlvbiB0byBzaG93IDooJyxcbiAgbGFiZWxQYXJ0aWFsQ29tcGxldGVkOiAnY29tcGxldGVkJyxcbiAgbGFiZWxQYXJ0aWFsVG9Db21wbGV0ZWQ6ICd0byBjb21wbGV0ZSB3aXRoaW4nLFxuICBwbGFjZUhvbGRlclRpdGxlOiAnVHlwZSB0aGUgdGl0bGUnLFxuICBwbGFjZUhvbGRlckRlc2NyaXB0aW9uOiAnVHlwZSB0aGUgZGVzY3JpcHRpb24nLFxuICBwbGFjZWhvbGRlck5hbWU6ICdUeXBlIHRoZSBuYW1lJyxcbiAgYnV0dG9uU2NoZWR1bGU6ICdTQ0hFRFVMRScsXG4gIGJ1dHRvbkFkZDogJ0FERCcsXG4gIGJ1dHRvbk5leHQ6ICdORVhUJyxcbiAgYnV0dG9uQmFjazogJ05FVkVSIE1JTkQsIEdPIEJBQ0snLFxuICBtc2dUaXRsZVJlcXVpcmVkOiAnRW50ZXIgdGhlIHRpdGxlJyxcbiAgbXNnTmFtZVJlcXVpcmVkOiAnRW50ZXIgdGhlIG5hbWUnLFxuICBtc2dTZWxlY3RDYXRlZ29yeTogJ1NlbGVjdCBhIGNhdGVnb3J5JyxcbiAgbXNnU2VsZWN0RGF0ZTogJ1BpY2sgYSBkYXRlIGFuZCBjb21taXQuIE5vIGV4Y3VzZXMhJyxcbiAgc3RlcERlc2NXYW50VG9BZGQ6ICdXaGF0IHdhbnQgdG8gYWRkJyxcbiAgc3RlcERlc2NBZGRDYXRlZ29yeTogJ0FkZCBhIGNhdGVnb3J5JyxcbiAgc3RlcERlc2NyU2VsZWNDYXRlZ29yeTogJ1NlbGVjdCBhIGNhdGVnb3J5JyxcbiAgc3RlcERlc2NBZGRUYXNrOiAnQWRkIHRhc2snLFxuICBzdGVwRGVzY0NvbXBsZXRlRGF0ZTogJ1NjaGVkdWxlJyxcbiAgc3RlcERlc2NEb25lOiAnVGhhdFxcJ3MgaXQnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbGFiZWxzO1xuIiwiaW1wb3J0IGxhYmVscyBmcm9tICcuL2xhYmVscyc7XG5cbmV4cG9ydCBjb25zdCBTRUxFQ1RfV0FOVF9UT19BREQgPSAnU0VMRUNUX1dBTlRfVE9fQUREJztcbmV4cG9ydCBjb25zdCBBRERfQ0FURUdPUlkgPSAnQUREX0NBVEVHT1JZJztcbmV4cG9ydCBjb25zdCBBRERfVEFTSyA9ICdBRERfVEFTSyc7XG5leHBvcnQgY29uc3QgU0VMRUNUX0NBVEVHT1JZID0gJ1NFTEVDVF9DQVRFR09SWSc7XG5leHBvcnQgY29uc3QgU0VMRUNUX0NPTVBMRVRFX0RBVEUgPSAnU0VMRUNUX0NPTVBMRVRFX0RBVEUnO1xuZXhwb3J0IGNvbnN0IERPTkUgPSAnRE9ORSc7XG5cbmV4cG9ydCBjb25zdCBzdGVwTGlzdCA9IFtcbiAge1xuICAgIGlkOiBTRUxFQ1RfV0FOVF9UT19BREQsXG4gICAgZGVzY3JpcHRpb246IGxhYmVscy5zdGVwRGVzY1dhbnRUb0FkZCxcbiAgfSxcbiAge1xuICAgIGlkOiBBRERfQ0FURUdPUlksXG4gICAgZGVzY3JpcHRpb246IGxhYmVscy5zdGVwRGVzY0FkZENhdGVnb3J5LFxuICB9LFxuICB7XG4gICAgaWQ6IFNFTEVDVF9DQVRFR09SWSxcbiAgICBkZXNjcmlwdGlvbjogbGFiZWxzLnN0ZXBEZXNjclNlbGVjQ2F0ZWdvcnksXG4gIH0sXG4gIHtcbiAgICBpZDogQUREX1RBU0ssXG4gICAgZGVzY3JpcHRpb246IGxhYmVscy5zdGVwRGVzY0FkZFRhc2ssXG4gIH0sXG4gIHtcbiAgICBpZDogU0VMRUNUX0NPTVBMRVRFX0RBVEUsXG4gICAgZGVzY3JpcHRpb246IGxhYmVscy5zdGVwRGVzY0NvbXBsZXRlRGF0ZSxcbiAgfSxcbiAge1xuICAgIGlkOiBET05FLFxuICAgIGRlc2NyaXB0aW9uOiBsYWJlbHMuc3RlcERlc2NEb25lLFxuICB9LFxuXTtcbiIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgQ2F0ZWdvcmllc0ZpbHRlciBmcm9tICcuLi9jb21wb25lbnRzL3RvZG8vY2F0ZWdvcnkvQ2F0ZWdvcmllc0ZpbHRlcic7XG5pbXBvcnQge1xuICBzZWxlY3RDYXRlZ29yeSxcbiAgc2VsZWN0Q2F0ZWdvcnlBbGwsXG4gIGRlbGV0ZUNhdGVnb3J5LFxufSBmcm9tICcuLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5pbXBvcnQgY2F0ZWdvcnlBbGwgZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmltcG9ydCB7IGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0IH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgY2F0ZWdvcnlMaXN0OiBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdChzdGF0ZSksXG4gIH1cbik7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcbiAge1xuICAgIG9uRGVsZXRlQ2F0ZWdvcnk6IChjYXRlZ29yeSkgPT4ge1xuICAgICAgZGlzcGF0Y2goZGVsZXRlQ2F0ZWdvcnkoY2F0ZWdvcnkuaWQpKTtcbiAgICB9LFxuICAgIG9uQ2lsY2tDYXRlZ29yeTogKGNhdGVnb3J5LCBlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnaScgJiYgZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnYnV0dG9uJykge1xuICAgICAgICBpZiAoY2F0ZWdvcnkuaWQgPT09IGNhdGVnb3J5QWxsLmlkKSB7XG4gICAgICAgICAgZGlzcGF0Y2goc2VsZWN0Q2F0ZWdvcnlBbGwoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGlzcGF0Y2goc2VsZWN0Q2F0ZWdvcnkoY2F0ZWdvcnkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gIH1cbik7XG5cbmNvbnN0IENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIgPSBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbikoQ2F0ZWdvcmllc0ZpbHRlcik7XG5cbmV4cG9ydCBkZWZhdWx0IENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXI7XG4iLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFRhc2tzIGZyb20gJy4uL2NvbXBvbmVudHMvdG9kby90YXNrL1Rhc2tzJztcbmltcG9ydCB7XG4gIGZldGNoVGFza3NCeUNhdGVnb3J5LFxuICBkZWxldGVUYXNrLFxuICB0b29nbGVUYXNrQ29tcGxldGVkLFxufSBmcm9tICcuLi9hY3Rpb25zL3RvZG9UYXNrc0FjdGlvbnMnO1xuXG5pbXBvcnQgeyBnZXRUYXNrTGlzdCwgZ2V0U2tpcCwgc3RpbGxNb3JlVG9Mb2FkIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9UYXNrc1NlbGVjdG9ycyc7XG5pbXBvcnQgeyBnZXRTZWxlY3RlZENhdGVnb3JpZXNJZCwgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICB0YXNrTGlzdDogZ2V0VGFza0xpc3Qoc3RhdGUpLFxuICAgIHNraXA6IGdldFNraXAoc3RhdGUpLFxuICAgIG1vcmVUb0xvYWQ6IHN0aWxsTW9yZVRvTG9hZChzdGF0ZSksXG4gICAgY2F0ZWdvcmllc0lkOiBnZXRTZWxlY3RlZENhdGVnb3JpZXNJZChzdGF0ZSksXG4gICAgY29tcGxldGVkOiB2aXNpYmlsaXR5T25seUNvbXBsZXRlZChzdGF0ZSksXG4gIH1cbik7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcbiAge1xuICAgIG9uRGVsZXRlVGFzazogKHRhc2spID0+IHtcbiAgICAgIGRpc3BhdGNoKGRlbGV0ZVRhc2sodGFzay5pZCkpO1xuICAgIH0sXG4gICAgb25Db21wbGV0ZVRhc2s6ICh0YXNrKSA9PiB7XG4gICAgICBkaXNwYXRjaCh0b29nbGVUYXNrQ29tcGxldGVkKHRhc2suaWQsIHRhc2suY29tcGxldGVkKSk7XG4gICAgfSxcbiAgICBmZXRjaFRhc2tzOiAoY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsIGxpbWl0LCBza2lwKSA9PiB7XG4gICAgICBkaXNwYXRjaChmZXRjaFRhc2tzQnlDYXRlZ29yeShjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCwgbGltaXQsIHNraXApKTtcbiAgICB9LFxuICB9XG4pO1xuXG5jb25zdCBUYXNrc0NvbnRhaW5lciA9IGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuKShUYXNrcyk7XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2tzQ29udGFpbmVyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBUb2RvcyBmcm9tICcuLi9jb21wb25lbnRzL3RvZG8vVG9kb3MnO1xuaW1wb3J0IHsgZmV0Y2hBbGxDYXRlZ29yaWVzIH0gZnJvbSAnLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuaW1wb3J0IHsgaGlkZU1lc3NhZ2UgfSBmcm9tICcuLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcbmltcG9ydCB7IHNob3dMb2FkaW5nIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbW1vblNlbGVjdG9ycyc7XG5cbmNvbnN0IFRvZG9zQ29udGFpbmVyID0gcHJvcHMgPT4gPFRvZG9zIHsuLi5wcm9wc30gLz47XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IChcbiAge1xuICAgIG1lc3NhZ2U6IHN0YXRlLm1lc3NhZ2UsXG4gICAgc2hvd0xvYWRpbmc6IHNob3dMb2FkaW5nKHN0YXRlKSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgaGlkZU1lc3NhZ2U6ICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKGhpZGVNZXNzYWdlKCkpO1xuICAgIH0sXG4gICAgaW5pdEZldGNoQWxsQ2F0ZWdvcmllczogKCkgPT4ge1xuICAgICAgZGlzcGF0Y2goZmV0Y2hBbGxDYXRlZ29yaWVzKCkpO1xuICAgIH0sXG4gIH1cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFRvZG9zQ29udGFpbmVyKTtcbiIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlzaWJpbGl0eUZpbHRlcnMgZnJvbSAnLi4vY29tcG9uZW50cy90b2RvL3Zpc2liaWxpdHkvVmlzaWJpbGl0eUZpbHRlcnMnO1xuaW1wb3J0IHsgY2hhbmdlVmlzaWJpbGl0eSB9IGZyb20gJy4uL2FjdGlvbnMvdG9kb0ZpbHRlcnNBY3Rpb25zJztcblxuaW1wb3J0IHsgZ2V0VmlzaWJpbGl0eUZpbHRlciB9IGZyb20gJy4uL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IChcbiAge1xuICAgIHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlcjogZ2V0VmlzaWJpbGl0eUZpbHRlcihzdGF0ZSksXG4gIH1cbik7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcbiAge1xuICAgIG9uVmlzaWJpbGl0eVN3aXRjaENsaWNrOiB2aXNpYmlsaXR5ID0+ICgpID0+IChcbiAgICAgIGRpc3BhdGNoKGNoYW5nZVZpc2liaWxpdHkodmlzaWJpbGl0eSkpXG4gICAgKSxcbiAgfVxuKTtcblxuY29uc3QgVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lciA9IGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuKShWaXNpYmlsaXR5RmlsdGVycyk7XG5cbmV4cG9ydCBkZWZhdWx0IFZpc2liaWxpdHlGaWx0ZXJDb250YWluZXI7XG4iLCJpbXBvcnQgeyBjcmVhdGVTZWxlY3RvciB9IGZyb20gJ3Jlc2VsZWN0JztcbmltcG9ydCB7IGlzRmV0Y2hpbmdDYXRlZ29yaWVzRmlsdGVyIH0gZnJvbSAnLi90b2RvRmlsdGVyc1NlbGVjdG9ycyc7XG5pbXBvcnQgeyBpc0ZldGNoaW5nVGFza3MgfSBmcm9tICcuL3RvZG9UYXNrc1NlbGVjdG9ycyc7XG5cbmV4cG9ydCBjb25zdCBzaG93TG9hZGluZyA9IGNyZWF0ZVNlbGVjdG9yKFxuICBpc0ZldGNoaW5nQ2F0ZWdvcmllc0ZpbHRlcixcbiAgaXNGZXRjaGluZ1Rhc2tzLFxuICAoaXNGZXRjaGluZ0NhdGVnb3JpZXMsIGlzRmV0Y2hpbmdUb2RvcykgPT4gaXNGZXRjaGluZ0NhdGVnb3JpZXMgfHwgaXNGZXRjaGluZ1RvZG9zLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgc2hvd0xvYWRpbmc7XG4iLCJpbXBvcnQgeyBjcmVhdGVTZWxlY3RvciB9IGZyb20gJ3Jlc2VsZWN0JztcbmltcG9ydCB7IE9OTFlfQ09NUExFVEVEIH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBpc0ZldGNoaW5nQ2F0ZWdvcmllc0ZpbHRlciA9IHN0YXRlID0+IHN0YXRlLnRvZG9GaWx0ZXJzLmlzRmV0Y2hpbmc7XG5leHBvcnQgY29uc3QgZ2V0VG9kb0ZpbHRlcnMgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycztcbmV4cG9ydCBjb25zdCBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdCA9IHN0YXRlID0+IHN0YXRlLnRvZG9GaWx0ZXJzLmNhdGVnb3JpZXM7XG5leHBvcnQgY29uc3QgZ2V0VmlzaWJpbGl0eUZpbHRlciA9IHN0YXRlID0+IHN0YXRlLnRvZG9GaWx0ZXJzLnZpc2liaWxpdHk7XG5cbmV4cG9ydCBjb25zdCB2aXNpYmlsaXR5T25seUNvbXBsZXRlZCA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRWaXNpYmlsaXR5RmlsdGVyLFxuICB2aXNpYmlsaXR5ID0+IHZpc2liaWxpdHkgPT09IE9OTFlfQ09NUExFVEVELFxuKTtcblxuZXhwb3J0IGNvbnN0IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0ZpbHRlciA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdCxcbiAgY2F0ZWdvcmllcyA9PiBjYXRlZ29yaWVzLmZpbHRlcihjYXRlZ29yeSA9PiBjYXRlZ29yeS5zZWxlY3RlZCksXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QsXG4gIGNhdGVnb3JpZXMgPT4gY2F0ZWdvcmllcy5maWx0ZXIoY2F0ZWdvcnkgPT4gY2F0ZWdvcnkuc2VsZWN0ZWQpXG4gICAgLm1hcChjYXRlZ29yeUZpbHRlciA9PiBjYXRlZ29yeUZpbHRlci5pZCksXG4pO1xuIiwiZXhwb3J0IGNvbnN0IGlzRmV0Y2hpbmdUYXNrcyA9IHN0YXRlID0+IHN0YXRlLnRvZG9UYXNrcy5pc0ZldGNoaW5nO1xuZXhwb3J0IGNvbnN0IGdldFRhc2tzID0gc3RhdGUgPT4gc3RhdGUudG9kb1Rhc2tzO1xuZXhwb3J0IGNvbnN0IGdldFRhc2tMaXN0ID0gc3RhdGUgPT4gc3RhdGUudG9kb1Rhc2tzLml0ZW1zO1xuZXhwb3J0IGNvbnN0IGdldFNraXAgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvVGFza3Muc2tpcDtcbmV4cG9ydCBjb25zdCBzdGlsbE1vcmVUb0xvYWQgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvVGFza3MubW9yZVRvTG9hZDtcbiIsImltcG9ydCBkYXRlRm9ybWF0IGZyb20gJ2RhdGVmb3JtYXQnO1xuXG5leHBvcnQgY29uc3QgdG9Kc0RhdGUgPSAocGFyc2VEYXRlID0gJycpID0+XG4gIG5ldyBEYXRlKHBhcnNlSW50KHBhcnNlRGF0ZS5zdWJzdHIoNiksIDEwKSk7XG5cbmV4cG9ydCBjb25zdCB0b1NpbXBsZURhdGVGb3JtYXQgPSBkYXRlID0+XG4gIGRhdGVGb3JtYXQoZGF0ZSwgJ2RkZGQgZGQgbW1tIHl5eXknKTtcblxuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnRCYXNlVXJsID0gKCkgPT4ge1xuICBjb25zdCBnZXRVcmwgPSB3aW5kb3cubG9jYXRpb247XG4gIHJldHVybiBgJHtnZXRVcmwucHJvdG9jb2x9Ly8ke2dldFVybC5ob3N0fWA7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==