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

              if (response.success) {
                dispatch((0, _authActions.refreshAccessToken)(response.accessToken));
                dispatch(receiveFetchAllCategories(response.data));
                dispatch((0, _todoTasksActions.fetchTasksByCategory)((0, _todoFiltersSelectors.getSelectedCategoriesId)(getState())));
              } else {
                dispatch(errorFetchAllCategories(response.error.message));
              }
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context['catch'](1);

              dispatch((0, _messageActions.showMessageError)(_context.t0.message));

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[1, 9]]);
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

              if (response.success) {
                dispatch((0, _authActions.refreshAccessToken)(response.accessToken));
                categories = getState().todoFilters.categories;
                categoryIndex = categories.findIndex(function (category) {
                  return category.id === categoryId;
                });

                dispatch(removeCategoryLocal(categoryIndex));
              } else {
                dispatch((0, _messageActions.showMessageError)(response.error.message));
              }
              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2['catch'](0);

              dispatch((0, _messageActions.showMessageError)(_context2.t0.message));

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 8]]);
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

              if (response.success) {
                category = response.data;

                dispatch((0, _authActions.refreshAccessToken)(response.accessToken));
                dispatch(addCategoryLocal(category));
                if (callback !== undefined) {
                  callback(category);
                }
              } else {
                dispatch((0, _messageActions.showMessageError)(response.error.message));
              }
              _context3.next = 11;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3['catch'](0);

              dispatch((0, _messageActions.showMessageError)(_context3.t0.message));

            case 11:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 8]]);
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

              if (response.success) {
                dispatch((0, _authActions.refreshAccessToken)(response.accessToken));
                tasks = response.data.map(function (task) {
                  return _extends({}, task, {
                    completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
                    todoWithin: task.todoWithin ? new Date(task.todoWithin) : undefined
                  });
                });

                dispatch(receiveFetchTasks(tasks));
              } else {
                dispatch(errorFetchTasks(response.error.message));
              }
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context['catch'](1);

              dispatch((0, _messageActions.showMessageError)(_context.t0.message));

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[1, 9]]);
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

              if (response.success) {
                items = getState().todoTasks.items;

                dispatch((0, _authActions.refreshAccessToken)(response.accessToken));
                todoArgumentIndex = items.findIndex(function (todoArgument) {
                  return todoArgument.id === id;
                });

                dispatch(removeTaskLocal(todoArgumentIndex));
              } else {
                dispatch((0, _messageActions.showMessageError)(response.error.message));
              }
              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2['catch'](0);

              dispatch((0, _messageActions.showMessageError)(_context2.t0.message));

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 8]]);
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

              if (response.success) {
                dispatch((0, _authActions.refreshAccessToken)(response.accessToken));
                fetchedTask = response.data;
                task = _extends({}, fetchedTask, {
                  completedAt: fetchedTask.completedAt ? new Date(fetchedTask.completedAt) : undefined,
                  todoWithin: fetchedTask.todoWithin ? new Date(fetchedTask.todoWithin) : undefined
                });

                dispatch(addTaskLocal(task));
                if (callback !== undefined) {
                  callback();
                }
              } else {
                dispatch((0, _messageActions.showMessageError)(response.error.message));
              }
              _context3.next = 11;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3['catch'](0);

              dispatch((0, _messageActions.showMessageError)(_context3.t0.message));

            case 11:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 8]]);
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

              if (response.success) {
                dispatch((0, _authActions.refreshAccessToken)(response.accessToken));
                fetchedTask = response.data;
                task = _extends({}, fetchedTask, {
                  completedAt: fetchedTask.completedAt ? new Date(fetchedTask.completedAt) : undefined
                });

                dispatch(updateTaskLocal(task));
              } else {
                dispatch((0, _messageActions.showMessageError)(response.error.message));
              }
              _context4.next = 13;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4['catch'](2);

              dispatch((0, _messageActions.showMessageError)(_context4.t0.message));

            case 13:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[2, 10]]);
    }));

    return function (_x18, _x19) {
      return _ref4.apply(this, arguments);
    };
  }();
};

/***/ }),

/***/ "./src/components/ButtonCompleteTask.jsx":
/*!***********************************************!*\
  !*** ./src/components/ButtonCompleteTask.jsx ***!
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

/***/ "./src/components/ButtonDeleteCategory.jsx":
/*!*************************************************!*\
  !*** ./src/components/ButtonDeleteCategory.jsx ***!
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

/***/ "./src/components/ButtonDeleteTask.jsx":
/*!*********************************************!*\
  !*** ./src/components/ButtonDeleteTask.jsx ***!
  \*********************************************/
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

/***/ "./src/components/ButtonScoll.jsx":
/*!****************************************!*\
  !*** ./src/components/ButtonScoll.jsx ***!
  \****************************************/
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

/***/ "./src/components/CategoriesFilter.jsx":
/*!*********************************************!*\
  !*** ./src/components/CategoriesFilter.jsx ***!
  \*********************************************/
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

var _ButtonScoll = __webpack_require__(/*! ./ButtonScoll */ "./src/components/ButtonScoll.jsx");

var _ButtonScoll2 = _interopRequireDefault(_ButtonScoll);

var _Category = __webpack_require__(/*! ./Category */ "./src/components/Category.jsx");

var _Category2 = _interopRequireDefault(_Category);

var _Fade = __webpack_require__(/*! ./anims/Fade */ "./src/components/anims/Fade.jsx");

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

/***/ "./src/components/Category.jsx":
/*!*************************************!*\
  !*** ./src/components/Category.jsx ***!
  \*************************************/
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

var _ButtonDeleteCategory = __webpack_require__(/*! ./ButtonDeleteCategory */ "./src/components/ButtonDeleteCategory.jsx");

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

/***/ "./src/components/InfiniteScroll.jsx":
/*!*******************************************!*\
  !*** ./src/components/InfiniteScroll.jsx ***!
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

/***/ "./src/components/MainAddButton.jsx":
/*!******************************************!*\
  !*** ./src/components/MainAddButton.jsx ***!
  \******************************************/
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

/***/ "./src/components/Snackbar.jsx":
/*!*************************************!*\
  !*** ./src/components/Snackbar.jsx ***!
  \*************************************/
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

var _SnackbarAnim = __webpack_require__(/*! ./anims/SnackbarAnim */ "./src/components/anims/SnackbarAnim.jsx");

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

/***/ "./src/components/Task.jsx":
/*!*********************************!*\
  !*** ./src/components/Task.jsx ***!
  \*********************************/
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

var _Collapse = __webpack_require__(/*! ./anims/Collapse */ "./src/components/anims/Collapse.jsx");

var _Collapse2 = _interopRequireDefault(_Collapse);

var _Fade = __webpack_require__(/*! ./anims/Fade */ "./src/components/anims/Fade.jsx");

var _Fade2 = _interopRequireDefault(_Fade);

var _ButtonCompleteTask = __webpack_require__(/*! ./ButtonCompleteTask */ "./src/components/ButtonCompleteTask.jsx");

var _ButtonCompleteTask2 = _interopRequireDefault(_ButtonCompleteTask);

var _ButtonDeleteTask = __webpack_require__(/*! ./ButtonDeleteTask */ "./src/components/ButtonDeleteTask.jsx");

var _ButtonDeleteTask2 = _interopRequireDefault(_ButtonDeleteTask);

var _Common = __webpack_require__(/*! ../utils/Common */ "./src/utils/Common.js");

var _labels = __webpack_require__(/*! ../constants/labels */ "./src/constants/labels.js");

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

/***/ "./src/components/Tasks.jsx":
/*!**********************************!*\
  !*** ./src/components/Tasks.jsx ***!
  \**********************************/
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

var _Resize = __webpack_require__(/*! ./anims/Resize */ "./src/components/anims/Resize.jsx");

var _Resize2 = _interopRequireDefault(_Resize);

var _Task = __webpack_require__(/*! ./Task */ "./src/components/Task.jsx");

var _Task2 = _interopRequireDefault(_Task);

var _InfiniteScroll = __webpack_require__(/*! ./InfiniteScroll */ "./src/components/InfiniteScroll.jsx");

var _InfiniteScroll2 = _interopRequireDefault(_InfiniteScroll);

var _config = __webpack_require__(/*! ../constants/config */ "./src/constants/config.js");

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

/***/ "./src/components/Todos.jsx":
/*!**********************************!*\
  !*** ./src/components/Todos.jsx ***!
  \**********************************/
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

var _LoaderLinear = __webpack_require__(/*! ../components/LoaderLinear */ "./src/components/LoaderLinear.jsx");

var _LoaderLinear2 = _interopRequireDefault(_LoaderLinear);

var _MainAddButton = __webpack_require__(/*! ../components/MainAddButton */ "./src/components/MainAddButton.jsx");

var _MainAddButton2 = _interopRequireDefault(_MainAddButton);

var _CategoriesFilterContainer = __webpack_require__(/*! ../containers/CategoriesFilterContainer */ "./src/containers/CategoriesFilterContainer.jsx");

var _CategoriesFilterContainer2 = _interopRequireDefault(_CategoriesFilterContainer);

var _VisibilityFilterContainer = __webpack_require__(/*! ../containers/VisibilityFilterContainer */ "./src/containers/VisibilityFilterContainer.jsx");

var _VisibilityFilterContainer2 = _interopRequireDefault(_VisibilityFilterContainer);

var _TasksContainer = __webpack_require__(/*! ../containers/TasksContainer */ "./src/containers/TasksContainer.jsx");

var _TasksContainer2 = _interopRequireDefault(_TasksContainer);

var _DialogAdd = __webpack_require__(/*! ./dialogAdd/DialogAdd */ "./src/components/dialogAdd/DialogAdd.jsx");

var _DialogAdd2 = _interopRequireDefault(_DialogAdd);

var _Snackbar = __webpack_require__(/*! ./Snackbar */ "./src/components/Snackbar.jsx");

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

/***/ "./src/components/VisibilityFilters.jsx":
/*!**********************************************!*\
  !*** ./src/components/VisibilityFilters.jsx ***!
  \**********************************************/
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

var _VisibilitySwitch = __webpack_require__(/*! ./VisibilitySwitch */ "./src/components/VisibilitySwitch.jsx");

var _VisibilitySwitch2 = _interopRequireDefault(_VisibilitySwitch);

var _config = __webpack_require__(/*! ../constants/config */ "./src/constants/config.js");

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

/***/ "./src/components/VisibilitySwitch.jsx":
/*!*********************************************!*\
  !*** ./src/components/VisibilitySwitch.jsx ***!
  \*********************************************/
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

/***/ "./src/components/dialogAdd/AddCategory.jsx":
/*!**************************************************!*\
  !*** ./src/components/dialogAdd/AddCategory.jsx ***!
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

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _labels = __webpack_require__(/*! ../../constants/labels */ "./src/constants/labels.js");

var _labels2 = _interopRequireDefault(_labels);

var _steps = __webpack_require__(/*! ../../constants/steps */ "./src/constants/steps.js");

var _todoFiltersActions = __webpack_require__(/*! ../../actions/todoFiltersActions */ "./src/actions/todoFiltersActions.js");

var _messageActions = __webpack_require__(/*! ../../actions/messageActions */ "./src/actions/messageActions.js");

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

/***/ "./src/components/dialogAdd/AddTask.jsx":
/*!**********************************************!*\
  !*** ./src/components/dialogAdd/AddTask.jsx ***!
  \**********************************************/
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

var _labels = __webpack_require__(/*! ../../constants/labels */ "./src/constants/labels.js");

var _labels2 = _interopRequireDefault(_labels);

var _steps = __webpack_require__(/*! ../../constants/steps */ "./src/constants/steps.js");

var _messageActions = __webpack_require__(/*! ../../actions/messageActions */ "./src/actions/messageActions.js");

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

/***/ "./src/components/dialogAdd/DialogAdd.jsx":
/*!************************************************!*\
  !*** ./src/components/dialogAdd/DialogAdd.jsx ***!
  \************************************************/
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

var _SelectActionAdd = __webpack_require__(/*! ./SelectActionAdd */ "./src/components/dialogAdd/SelectActionAdd.jsx");

var _SelectActionAdd2 = _interopRequireDefault(_SelectActionAdd);

var _AddCategory = __webpack_require__(/*! ./AddCategory */ "./src/components/dialogAdd/AddCategory.jsx");

var _AddCategory2 = _interopRequireDefault(_AddCategory);

var _SelectCategory = __webpack_require__(/*! ./SelectCategory */ "./src/components/dialogAdd/SelectCategory.jsx");

var _SelectCategory2 = _interopRequireDefault(_SelectCategory);

var _AddTask = __webpack_require__(/*! ./AddTask */ "./src/components/dialogAdd/AddTask.jsx");

var _AddTask2 = _interopRequireDefault(_AddTask);

var _SelectCompleteDate = __webpack_require__(/*! ./SelectCompleteDate */ "./src/components/dialogAdd/SelectCompleteDate.jsx");

var _SelectCompleteDate2 = _interopRequireDefault(_SelectCompleteDate);

var _Done = __webpack_require__(/*! ./Done */ "./src/components/dialogAdd/Done.jsx");

var _Done2 = _interopRequireDefault(_Done);

var _steps = __webpack_require__(/*! ../../constants/steps */ "./src/constants/steps.js");

var _ReplaceAnim = __webpack_require__(/*! ../anims/ReplaceAnim */ "./src/components/anims/ReplaceAnim.jsx");

var _ReplaceAnim2 = _interopRequireDefault(_ReplaceAnim);

var _DialogAnim = __webpack_require__(/*! ../anims/DialogAnim */ "./src/components/anims/DialogAnim.jsx");

var _DialogAnim2 = _interopRequireDefault(_DialogAnim);

var _Steps = __webpack_require__(/*! ./Steps */ "./src/components/dialogAdd/Steps.jsx");

var _Steps2 = _interopRequireDefault(_Steps);

var _labels = __webpack_require__(/*! ../../constants/labels */ "./src/constants/labels.js");

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

/***/ "./src/components/dialogAdd/Done.jsx":
/*!*******************************************!*\
  !*** ./src/components/dialogAdd/Done.jsx ***!
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

var _labels = __webpack_require__(/*! ../../constants/labels */ "./src/constants/labels.js");

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

/***/ "./src/components/dialogAdd/SelectActionAdd.jsx":
/*!******************************************************!*\
  !*** ./src/components/dialogAdd/SelectActionAdd.jsx ***!
  \******************************************************/
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

var _steps = __webpack_require__(/*! ../../constants/steps */ "./src/constants/steps.js");

var _labels = __webpack_require__(/*! ../../constants/labels */ "./src/constants/labels.js");

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

/***/ "./src/components/dialogAdd/SelectCategory.jsx":
/*!*****************************************************!*\
  !*** ./src/components/dialogAdd/SelectCategory.jsx ***!
  \*****************************************************/
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

var _labels = __webpack_require__(/*! ../../constants/labels */ "./src/constants/labels.js");

var _labels2 = _interopRequireDefault(_labels);

var _Category = __webpack_require__(/*! ../Category */ "./src/components/Category.jsx");

var _Category2 = _interopRequireDefault(_Category);

var _steps = __webpack_require__(/*! ../../constants/steps */ "./src/constants/steps.js");

var _messageActions = __webpack_require__(/*! ../../actions/messageActions */ "./src/actions/messageActions.js");

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

/***/ "./src/components/dialogAdd/SelectCompleteDate.jsx":
/*!*********************************************************!*\
  !*** ./src/components/dialogAdd/SelectCompleteDate.jsx ***!
  \*********************************************************/
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

var _labels = __webpack_require__(/*! ../../constants/labels */ "./src/constants/labels.js");

var _labels2 = _interopRequireDefault(_labels);

var _steps = __webpack_require__(/*! ../../constants/steps */ "./src/constants/steps.js");

var _todoTasksActions = __webpack_require__(/*! ../../actions/todoTasksActions */ "./src/actions/todoTasksActions.js");

var _messageActions = __webpack_require__(/*! ../../actions/messageActions */ "./src/actions/messageActions.js");

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

/***/ "./src/components/dialogAdd/Steps.jsx":
/*!********************************************!*\
  !*** ./src/components/dialogAdd/Steps.jsx ***!
  \********************************************/
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

var _CategoriesFilter = __webpack_require__(/*! ../components/CategoriesFilter */ "./src/components/CategoriesFilter.jsx");

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

var _Tasks = __webpack_require__(/*! ../components/Tasks */ "./src/components/Tasks.jsx");

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

var _Todos = __webpack_require__(/*! ../components/Todos */ "./src/components/Todos.jsx");

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

var _VisibilityFilters = __webpack_require__(/*! ../components/VisibilityFilters */ "./src/components/VisibilityFilters.jsx");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMvdG9kb1Rhc2tzQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CdXR0b25Db21wbGV0ZVRhc2suanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0J1dHRvbkRlbGV0ZUNhdGVnb3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CdXR0b25EZWxldGVUYXNrLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CdXR0b25TY29sbC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2F0ZWdvcmllc0ZpbHRlci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2F0ZWdvcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0luZmluaXRlU2Nyb2xsLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9NYWluQWRkQnV0dG9uLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9TbmFja2Jhci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVGFzay5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVGFza3MuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1RvZG9zLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9WaXNpYmlsaXR5RmlsdGVycy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVmlzaWJpbGl0eVN3aXRjaC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvQ29sbGFwc2UuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FuaW1zL0RpYWxvZ0FuaW0uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FuaW1zL1Jlc2l6ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvU25hY2tiYXJBbmltLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2dBZGQvQWRkQ2F0ZWdvcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9BZGRUYXNrLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2dBZGQvRGlhbG9nQWRkLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2dBZGQvRG9uZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL1NlbGVjdEFjdGlvbkFkZC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL1NlbGVjdENhdGVnb3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2dBZGQvU2VsZWN0Q29tcGxldGVEYXRlLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2dBZGQvU3RlcHMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMvbGFiZWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMvc3RlcHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvVGFza3NDb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL1RvZG9zQ29udGFpbmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9WaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0b3JzL2NvbW1vblNlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzLmpzIiwid2VicGFjazovLy8uL3NyYy9zZWxlY3RvcnMvdG9kb1Rhc2tzU2VsZWN0b3JzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9Db21tb24uanMiXSwibmFtZXMiOlsiZmV0Y2hUYXNrcyIsInN0YXRlIiwicmVxdWVzdEZldGNoQWxsQ2F0ZWdvcmllcyIsInR5cGUiLCJSRVFVRVNUX0ZFVENIX0FMTF9DQVRFR09SSUVTIiwicmVjZWl2ZUZldGNoQWxsQ2F0ZWdvcmllcyIsIlJFQ0VJVkVfRkVUQ0hfQUxMX0NBVEVHT1JJRVMiLCJjYXRlZ29yaWVzIiwiZXJyb3JGZXRjaEFsbENhdGVnb3JpZXMiLCJFUlJPUl9GRVRDSF9BTExfQ0FURUdPUklFUyIsImVycm9yIiwiYWRkQ2F0ZWdvcnlMb2NhbCIsIkFERF9DQVRFR09SWV9MT0NBTCIsImNhdGVnb3J5IiwicmVtb3ZlQ2F0ZWdvcnlMb2NhbCIsIlJFTU9WRV9DQVRFR09SWV9MT0NBTCIsImNhdGVnb3J5SW5kZXgiLCJ0b29nbGVTZWxlY3RDYXRlZ29yeSIsIlRPT0dMRV9TRUxFQ1RfQ0FURUdPUlkiLCJzZWxlY3RlZENhdGVnb3J5IiwidG9vZ2xlU2VsZWN0Q2F0ZWdvcnlBbGwiLCJUT09HTEVfU0VMRUNUX0NBVEVHT1JZX0FMTCIsInN3aXRjaFZpc2liaWxpdHlGaWx0ZXIiLCJTV0lUQ0hfVklTSUJJTElUWV9GSUxURVIiLCJ2aXNpYmlsaXR5IiwiZmV0Y2hBbGxDYXRlZ29yaWVzIiwibGltaXQiLCJxdWVyeUl0ZW1zTGltaXQiLCJza2lwIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsImFjY2Vzc1Rva2VuIiwiYXV0aCIsIk1ldGhvZHMiLCJHRVQiLCJyZXNwb25zZSIsInN1Y2Nlc3MiLCJkYXRhIiwibWVzc2FnZSIsImRlbGV0ZUNhdGVnb3J5IiwiY2F0ZWdvcnlJZCIsIkRFTEVURSIsInRvZG9GaWx0ZXJzIiwiZmluZEluZGV4IiwiaWQiLCJhZGRDYXRlZ29yeSIsIm5hbWUiLCJjYWxsYmFjayIsInVuZGVmaW5lZCIsIlBPU1QiLCJjaGFuZ2VWaXNpYmlsaXR5Iiwic2VsZWN0Q2F0ZWdvcnkiLCJzZWxlY3RDYXRlZ29yeUFsbCIsInJlcXVlc3RGZXRjaFRhc2tzIiwiUkVRVUVTVF9GRVRDSF9UQVNLUyIsInJlY2VpdmVGZXRjaFRhc2tzIiwiUkVDRUlWRV9GRVRDSF9UQVNLUyIsInRhc2tzIiwiZXJyb3JGZXRjaFRhc2tzIiwiRVJST1JfRkVUQ0hfVEFTS1MiLCJhZGRUYXNrTG9jYWwiLCJBRERfVEFTS19MT0NBTCIsInRhc2siLCJyZW1vdmVUYXNrTG9jYWwiLCJSRU1PVkVfVEFTS19MT0NBTCIsInRhc2tJbmRleCIsInVwZGF0ZVRhc2tMb2NhbCIsIlVQREFURV9UQVNLX0xPQ0FMIiwiZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkiLCJjYXRlZ29yaWVzSWQiLCJjb21wbGV0ZWQiLCJtYXAiLCJjb21wbGV0ZWRBdCIsIkRhdGUiLCJ0b2RvV2l0aGluIiwiZGVsZXRlVGFzayIsIml0ZW1zIiwidG9kb1Rhc2tzIiwidG9kb0FyZ3VtZW50SW5kZXgiLCJ0b2RvQXJndW1lbnQiLCJhZGRUYXNrIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImZldGNoZWRUYXNrIiwidG9vZ2xlVGFza0NvbXBsZXRlZCIsImlzQ29tcGxldGVkIiwiUEFUQ0giLCJCdXR0b25Db21wbGV0ZVRhc2siLCJvbkNsaWNrIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJib29sIiwiZGVmYXVsdFByb3BzIiwiQnV0dG9uRGVsZXRlQ2F0ZWdvcnkiLCJCdXR0b25EZWxldGVUYXNrIiwiQnV0dG9uU2Nyb2xsIiwiZGlyZWN0aW9uIiwib25lT2YiLCJDYXRlZ29yaWVzRmlsdGVyIiwicHJvcHMiLCJjaGlwcyIsImhhbmRsZUxlZnRTY3JvbGxDbGljayIsImJpbmQiLCJoYW5kbGVSaWdodFNjcm9sbENsaWNrIiwibW92ZUNoaXBzU2Nyb2xsIiwiY2xpZW50V2lkdGgiLCJkZWx0YSIsIm5leHRTY3JvbGxMZWZ0Iiwic2Nyb2xsTGVmdCIsInNjcm9sbCIsImxlZnQiLCJjYXRlZ29yeUxpc3QiLCJvbkRlbGV0ZUNhdGVnb3J5Iiwib25DaWxja0NhdGVnb3J5Iiwibm9kZSIsImRpc3BsYXkiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsInNlbGVjdGVkIiwiUmVhY3QiLCJDb21wb25lbnQiLCJhcnJheU9mIiwic2hhcGUiLCJzdHJpbmciLCJDYXRlZ29yeSIsIm9uRGVsZXRlIiwiY3NzQ2xhc3MiLCJvbkNoaXBDbGljayIsImUiLCJvbkRlbGV0ZUNsaWNrIiwid2FpdFRpbWUiLCJJbmZpbml0ZVNjcm9sbCIsIm9uU2Nyb2xsIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJpbm5lckhlaWdodCIsInNjcm9sbFkiLCJkb2N1bWVudCIsImJvZHkiLCJvZmZzZXRIZWlnaHQiLCJhcmdzIiwiY2hpbGRyZW4iLCJjbGFzc05hbWUiLCJhbnkiLCJNYWluQWRkQnV0dG9uIiwiQWN0aW9uIiwidGV4dCIsIlNuYWNrYmFyIiwib25DbG9zZSIsImR1cmF0aW9uIiwic2hvdyIsInNldFRpbWVvdXQiLCJpc0Vycm9yIiwiYWN0aW9uVGV4dCIsImFjdGlvbkNsaWNrIiwidmVydGljYWxQb3N0aW9uIiwiaG9yaXpvbnRhbFBvc2l0aW9uIiwibnVtYmVyIiwiVGFzayIsImNvbGxhcHNlZCIsInJlbmRlckRhdGUiLCJzZXRTdGF0ZSIsImxhYmVscyIsImxhYmVsUGFydGlhbENvbXBsZXRlZCIsImxhYmVsUGFydGlhbFRvQ29tcGxldGVkIiwibGFiZWxOb3RTZXQiLCJvbkNvbXBsZXRlIiwib25UaXRsZUNsaWNrIiwibGFiZWxOb0Rlc2NyaXB0aW9uIiwiaW5pdGlhbFN0YXRlIiwiVGFza3MiLCJvbkZldGNoVG9kb1Rhc2tzTmV4dCIsIm1vcmVUb0xvYWQiLCJuZXdTa2lwIiwidGFza0xpc3QiLCJvbkRlbGV0ZVRhc2siLCJvbkNvbXBsZXRlVGFzayIsImFyZyIsIm5leHRQcm9wcyIsInByZXZTdGF0ZSIsIlRvZG9zIiwiaXNEaWFsb2dBZGRPcGVuIiwiaW5pdEZldGNoQWxsQ2F0ZWdvcmllcyIsImhpZGVNZXNzYWdlIiwic2hvd0xvYWRpbmciLCJWaXNpYmlsaXR5RmlsdGVyIiwic2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyIiwib25WaXNpYmlsaXR5U3dpdGNoQ2xpY2siLCJPTkxZX1RPX0NPTVBMRVRFIiwiQUxMX1RPRE9TIiwiT05MWV9DT01QTEVURUQiLCJWaXNpYmlsaXR5U3dpdGNoIiwiZGVmYXVsdFN0eWxlIiwidHJhbnNpdGlvbiIsImhlaWdodCIsIm9uRW50ZXIiLCJzdHlsZSIsImZpcnN0RWxlbWVudENoaWxkIiwib25FeGl0IiwiQ29sbGFwc2UiLCJpblByb3AiLCJpbiIsIm9wYWNpdHkiLCJ0cmFuc2l0aW9uU3R5bGVzIiwiZW50ZXJpbmciLCJlbnRlcmVkIiwiRGlhbG9nQW5pbSIsImVudGVyIiwiZXhpdCIsIm9uRW50ZXJlZCIsIm9uRXhpdGVkIiwiUmVzaXplIiwiYm90dG9tIiwiU25hY2tiYXJBbmltIiwiY3VzdG9tQ2xhc3MiLCJBZGRDYXRlZ29yeSIsIm9uSW5wdXRUZXh0Q2hhbmdlIiwib25CdXR0b25BZGRDbGljayIsIm9uQ2F0ZWdvcnlDcmVhdGVkIiwidGFyZ2V0IiwidmFsdWUiLCJtc2dOYW1lUmVxdWlyZWQiLCJvbk5leHQiLCJzdGVwSWQiLCJBRERfVEFTSyIsIm9wdGlvbnMiLCJ0aXRsZUFkZENhdGVnb3J5IiwicGxhY2Vob2xkZXJOYW1lIiwiYnV0dG9uQWRkIiwiQWRkVGFzayIsIm9uQnV0dG9uU2NoZWR1bGVDbGljayIsIm1zZ1RpdGxlUmVxdWlyZWQiLCJTRUxFQ1RfQ09NUExFVEVfREFURSIsInRpdGxlQWRkVGFzayIsImxhYmVsRm9yQ2F0ZWdvcnkiLCJwbGFjZUhvbGRlclRpdGxlIiwicGxhY2VIb2xkZXJEZXNjcmlwdGlvbiIsImJ1dHRvblNjaGVkdWxlIiwiZ2V0Q29udGVudFRvUmVuZGVyIiwic3RlcHMiLCJsZW5ndGgiLCJsYXN0U3RlcCIsIlNFTEVDVF9XQU5UX1RPX0FERCIsIkFERF9DQVRFR09SWSIsIlNFTEVDVF9DQVRFR09SWSIsIkRPTkUiLCJpbml0YWxTdGF0ZSIsIm5leHRTdGVwcyIsInNob3dTdGVwIiwiRGlhbG9nQWRkIiwib25CYWNrIiwib25SZXNldEFuZENsb3NlIiwib25BbmltYXRpb25FbmQiLCJzdGVwQ291bnQiLCJzbGljZSIsInN0ZXAiLCJjb21wbGV0ZSIsImRvbmUiLCJvcGVuIiwic3RlcExpc3QiLCJidXR0b25CYWNrIiwiRG9uZSIsImxhYmVsRG9uZSIsIlNlbGVjdEFjdGlvbkFkZCIsInRpdGxlQWRkIiwibGFiZWxDYXRlZ29yeSIsImxhYmVsVGFzayIsIlNlbGVjdENhdGVnb3J5Iiwib25DYXRlZ29yeUNsaWNrIiwib25CdXR0b25OZXh0Q2xpY2siLCJtc2dTZWxlY3RDYXRlZ29yeSIsImNhdGVnb3JpZXNMaXN0IiwidGl0bGVDaG9vc2VDYXRlZ29yeSIsImJ1dHRvbk5leHQiLCJtYXBTdGF0ZVRvUHJvcCIsIlNlbGVjdENvbXBsZXRlRGF0ZSIsIm9uSW5wdXREYXRlQ2hhbmdlIiwib25Ub2RvVGFza0NyZWF0ZWQiLCJkYXRlIiwibXNnU2VsZWN0RGF0ZSIsInRpdGxlVG9kb1dpdGhpbiIsIlN0ZXAiLCJuZWVkTGluZSIsIlN0ZXBzIiwibGlzdCIsInN0ZXBIaXN0b3J5IiwiaXRlbSIsImkiLCJmaWx0ZXIiLCJzaCIsInN0ZXBEZXNjV2FudFRvQWRkIiwic3RlcERlc2NBZGRDYXRlZ29yeSIsInN0ZXBEZXNjclNlbGVjQ2F0ZWdvcnkiLCJzdGVwRGVzY0FkZFRhc2siLCJzdGVwRGVzY0NvbXBsZXRlRGF0ZSIsInN0ZXBEZXNjRG9uZSIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImNhdGVnb3J5QWxsIiwiQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lciIsIlRhc2tzQ29udGFpbmVyIiwiVG9kb3NDb250YWluZXIiLCJWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyIiwiVmlzaWJpbGl0eUZpbHRlcnMiLCJpc0ZldGNoaW5nQ2F0ZWdvcmllc0ZpbHRlciIsImlzRmV0Y2hpbmdUYXNrcyIsImlzRmV0Y2hpbmdDYXRlZ29yaWVzIiwiaXNGZXRjaGluZ1RvZG9zIiwiaXNGZXRjaGluZyIsImdldFRvZG9GaWx0ZXJzIiwiZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QiLCJnZXRWaXNpYmlsaXR5RmlsdGVyIiwidmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQiLCJnZXRTZWxlY3RlZENhdGVnb3JpZXNGaWx0ZXIiLCJnZXRTZWxlY3RlZENhdGVnb3JpZXNJZCIsImNhdGVnb3J5RmlsdGVyIiwiZ2V0VGFza3MiLCJnZXRUYXNrTGlzdCIsImdldFNraXAiLCJzdGlsbE1vcmVUb0xvYWQiLCJ0b0pzRGF0ZSIsInBhcnNlRGF0ZSIsInBhcnNlSW50Iiwic3Vic3RyIiwidG9TaW1wbGVEYXRlRm9ybWF0IiwiZ2V0Q3VycmVudEJhc2VVcmwiLCJnZXRVcmwiLCJsb2NhdGlvbiIsInByb3RvY29sIiwiaG9zdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFVQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLElBQU1BLGFBQWEsU0FBYkEsVUFBYTtBQUFBLFNBQVMsNENBQzFCLG1EQUF3QkMsS0FBeEIsQ0FEMEIsRUFFMUIsbURBQXdCQSxLQUF4QixDQUYwQixDQUFUO0FBQUEsQ0FBbkI7O0FBS0EsSUFBTUMsNEJBQTRCLFNBQTVCQSx5QkFBNEI7QUFBQSxTQUNoQztBQUNFQyxVQUFNQztBQURSLEdBRGdDO0FBQUEsQ0FBbEM7O0FBTUEsSUFBTUMsNEJBQTRCLFNBQTVCQSx5QkFBNEI7QUFBQSxTQUNoQztBQUNFRixVQUFNRyx5Q0FEUjtBQUVFQztBQUZGLEdBRGdDO0FBQUEsQ0FBbEM7O0FBT0EsSUFBTUMsMEJBQTBCLFNBQTFCQSx1QkFBMEI7QUFBQSxTQUM5QjtBQUNFTCxVQUFNTSx1Q0FEUjtBQUVFQztBQUZGLEdBRDhCO0FBQUEs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bXBvcnQgeyBjYWxsQXBpLCBNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvQXBpVXRpbHMnO1xuaW1wb3J0IHsgcmVmcmVzaEFjY2Vzc1Rva2VuIH0gZnJvbSAnLi9hdXRoQWN0aW9ucyc7XG5pbXBvcnQge1xuICBSRVFVRVNUX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICBSRUNFSVZFX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICBFUlJPUl9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgQUREX0NBVEVHT1JZX0xPQ0FMLFxuICBSRU1PVkVfQ0FURUdPUllfTE9DQUwsXG4gIFRPT0dMRV9TRUxFQ1RfQ0FURUdPUlksXG4gIFRPT0dMRV9TRUxFQ1RfQ0FURUdPUllfQUxMLFxuICBTV0lUQ0hfVklTSUJJTElUWV9GSUxURVIsXG59IGZyb20gJy4uL2NvbnN0YW50cy9hY3Rpb25UeXBlcyc7XG5pbXBvcnQgeyBxdWVyeUl0ZW1zTGltaXQgfSBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcbmltcG9ydCB7IGZldGNoVGFza3NCeUNhdGVnb3J5IH0gZnJvbSAnLi90b2RvVGFza3NBY3Rpb25zJztcbmltcG9ydCB7IHNob3dNZXNzYWdlRXJyb3IgfSBmcm9tICcuL21lc3NhZ2VBY3Rpb25zJztcbmltcG9ydCB7IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkLCB2aXNpYmlsaXR5T25seUNvbXBsZXRlZCB9IGZyb20gJy4uL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycyc7XG5cbmNvbnN0IGZldGNoVGFza3MgPSBzdGF0ZSA9PiBmZXRjaFRhc2tzQnlDYXRlZ29yeShcbiAgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQoc3RhdGUpLFxuICB2aXNpYmlsaXR5T25seUNvbXBsZXRlZChzdGF0ZSksXG4pO1xuXG5jb25zdCByZXF1ZXN0RmV0Y2hBbGxDYXRlZ29yaWVzID0gKCkgPT4gKFxuICB7XG4gICAgdHlwZTogUkVRVUVTVF9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgfVxuKTtcblxuY29uc3QgcmVjZWl2ZUZldGNoQWxsQ2F0ZWdvcmllcyA9IGNhdGVnb3JpZXMgPT4gKFxuICB7XG4gICAgdHlwZTogUkVDRUlWRV9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgICBjYXRlZ29yaWVzLFxuICB9XG4pO1xuXG5jb25zdCBlcnJvckZldGNoQWxsQ2F0ZWdvcmllcyA9IGVycm9yID0+IChcbiAge1xuICAgIHR5cGU6IEVSUk9SX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICAgIGVycm9yLFxuICB9XG4pO1xuXG5jb25zdCBhZGRDYXRlZ29yeUxvY2FsID0gY2F0ZWdvcnkgPT4gKFxuICB7XG4gICAgdHlwZTogQUREX0NBVEVHT1JZX0xPQ0FMLFxuICAgIGNhdGVnb3J5LFxuICB9XG4pO1xuXG5jb25zdCByZW1vdmVDYXRlZ29yeUxvY2FsID0gY2F0ZWdvcnlJbmRleCA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRU1PVkVfQ0FURUdPUllfTE9DQUwsXG4gICAgY2F0ZWdvcnlJbmRleCxcbiAgfVxuKTtcblxuY29uc3QgdG9vZ2xlU2VsZWN0Q2F0ZWdvcnkgPSBzZWxlY3RlZENhdGVnb3J5ID0+IChcbiAge1xuICAgIHR5cGU6IFRPT0dMRV9TRUxFQ1RfQ0FURUdPUlksXG4gICAgc2VsZWN0ZWRDYXRlZ29yeSxcbiAgfVxuKTtcblxuY29uc3QgdG9vZ2xlU2VsZWN0Q2F0ZWdvcnlBbGwgPSAoKSA9PiAoXG4gIHtcbiAgICB0eXBlOiBUT09HTEVfU0VMRUNUX0NBVEVHT1JZX0FMTCxcbiAgfVxuKTtcblxuY29uc3Qgc3dpdGNoVmlzaWJpbGl0eUZpbHRlciA9IHZpc2liaWxpdHkgPT4gKFxuICB7XG4gICAgdHlwZTogU1dJVENIX1ZJU0lCSUxJVFlfRklMVEVSLFxuICAgIHZpc2liaWxpdHksXG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBmZXRjaEFsbENhdGVnb3JpZXMgPSAobGltaXQgPSBxdWVyeUl0ZW1zTGltaXQsIHNraXAgPSAwKSA9PlxuICBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgZGlzcGF0Y2gocmVxdWVzdEZldGNoQWxsQ2F0ZWdvcmllcygpKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBhY2Nlc3NUb2tlbiB9ID0gZ2V0U3RhdGUoKS5hdXRoO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKCdjYXRlZ29yaWVzJywgeyBsaW1pdCwgc2tpcCB9LCBNZXRob2RzLkdFVCwgYWNjZXNzVG9rZW4pO1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgZGlzcGF0Y2gocmVmcmVzaEFjY2Vzc1Rva2VuKHJlc3BvbnNlLmFjY2Vzc1Rva2VuKSk7XG4gICAgICAgIGRpc3BhdGNoKHJlY2VpdmVGZXRjaEFsbENhdGVnb3JpZXMocmVzcG9uc2UuZGF0YSkpO1xuICAgICAgICBkaXNwYXRjaChmZXRjaFRhc2tzQnlDYXRlZ29yeShnZXRTZWxlY3RlZENhdGVnb3JpZXNJZChnZXRTdGF0ZSgpKSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGF0Y2goZXJyb3JGZXRjaEFsbENhdGVnb3JpZXMocmVzcG9uc2UuZXJyb3IubWVzc2FnZSkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgICB9XG4gIH07XG5cbmV4cG9ydCBjb25zdCBkZWxldGVDYXRlZ29yeSA9IChjYXRlZ29yeUlkID0gJycpID0+IGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGFjY2Vzc1Rva2VuIH0gPSBnZXRTdGF0ZSgpLmF1dGg7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKCdjYXRlZ29yaWVzJywgY2F0ZWdvcnlJZCwgTWV0aG9kcy5ERUxFVEUsIGFjY2Vzc1Rva2VuKTtcbiAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgZGlzcGF0Y2gocmVmcmVzaEFjY2Vzc1Rva2VuKHJlc3BvbnNlLmFjY2Vzc1Rva2VuKSk7XG4gICAgICBjb25zdCB7IGNhdGVnb3JpZXMgfSA9IGdldFN0YXRlKCkudG9kb0ZpbHRlcnM7XG4gICAgICBjb25zdCBjYXRlZ29yeUluZGV4ID0gY2F0ZWdvcmllcy5maW5kSW5kZXgoY2F0ZWdvcnkgPT4gY2F0ZWdvcnkuaWQgPT09IGNhdGVnb3J5SWQpO1xuICAgICAgZGlzcGF0Y2gocmVtb3ZlQ2F0ZWdvcnlMb2NhbChjYXRlZ29yeUluZGV4KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UuZXJyb3IubWVzc2FnZSkpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXF1ZXN0IHRvIGFkZCBhIGNhdGVnb3J5XG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBjYXRlZ29yeSBuYW1lIHRvIGFkZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBuZWVkIHRvIGhhbmRsZSB0aGUgY2F0ZWdvcnkgY3JlYXRlZFxuICovXG5leHBvcnQgY29uc3QgYWRkQ2F0ZWdvcnkgPSAobmFtZSA9ICcnLCBjYWxsYmFjayA9IHVuZGVmaW5lZCkgPT4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW4gfSA9IGdldFN0YXRlKCkuYXV0aDtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoJ2NhdGVnb3JpZXMnLCB7IG5hbWUgfSwgTWV0aG9kcy5QT1NULCBhY2Nlc3NUb2tlbik7XG4gICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgIGNvbnN0IGNhdGVnb3J5ID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIGRpc3BhdGNoKHJlZnJlc2hBY2Nlc3NUb2tlbihyZXNwb25zZS5hY2Nlc3NUb2tlbikpO1xuICAgICAgZGlzcGF0Y2goYWRkQ2F0ZWdvcnlMb2NhbChjYXRlZ29yeSkpO1xuICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2FsbGJhY2soY2F0ZWdvcnkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLmVycm9yLm1lc3NhZ2UpKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VWaXNpYmlsaXR5ID0gdmlzaWJpbGl0eSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGRpc3BhdGNoKHN3aXRjaFZpc2liaWxpdHlGaWx0ZXIodmlzaWJpbGl0eSkpO1xuICByZXR1cm4gZGlzcGF0Y2goZmV0Y2hUYXNrcyhnZXRTdGF0ZSgpKSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0Q2F0ZWdvcnkgPSBzZWxlY3RlZENhdGVnb3J5ID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgZGlzcGF0Y2godG9vZ2xlU2VsZWN0Q2F0ZWdvcnkoc2VsZWN0ZWRDYXRlZ29yeSkpO1xuICByZXR1cm4gZGlzcGF0Y2goZmV0Y2hUYXNrcyhnZXRTdGF0ZSgpKSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0Q2F0ZWdvcnlBbGwgPSAoKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGRpc3BhdGNoKHRvb2dsZVNlbGVjdENhdGVnb3J5QWxsKCkpO1xuICByZXR1cm4gZGlzcGF0Y2goZmV0Y2hUYXNrcyhnZXRTdGF0ZSgpKSk7XG59O1xuIiwiaW1wb3J0IHsgY2FsbEFwaSwgTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL0FwaVV0aWxzJztcbmltcG9ydCB7IHJlZnJlc2hBY2Nlc3NUb2tlbiB9IGZyb20gJy4vYXV0aEFjdGlvbnMnO1xuaW1wb3J0IHtcbiAgUkVRVUVTVF9GRVRDSF9UQVNLUyxcbiAgUkVDRUlWRV9GRVRDSF9UQVNLUyxcbiAgRVJST1JfRkVUQ0hfVEFTS1MsXG4gIEFERF9UQVNLX0xPQ0FMLFxuICBSRU1PVkVfVEFTS19MT0NBTCxcbiAgVVBEQVRFX1RBU0tfTE9DQUwsXG59IGZyb20gJy4uL2NvbnN0YW50cy9hY3Rpb25UeXBlcyc7XG5pbXBvcnQgeyBxdWVyeUl0ZW1zTGltaXQgfSBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcbmltcG9ydCB7IHNob3dNZXNzYWdlRXJyb3IgfSBmcm9tICcuL21lc3NhZ2VBY3Rpb25zJztcblxuY29uc3QgcmVxdWVzdEZldGNoVGFza3MgPSAobGltaXQsIHNraXApID0+IChcbiAge1xuICAgIHR5cGU6IFJFUVVFU1RfRkVUQ0hfVEFTS1MsXG4gICAgbGltaXQsXG4gICAgc2tpcCxcbiAgfVxuKTtcblxuY29uc3QgcmVjZWl2ZUZldGNoVGFza3MgPSB0YXNrcyA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRUNFSVZFX0ZFVENIX1RBU0tTLFxuICAgIHRhc2tzLFxuICB9XG4pO1xuXG5jb25zdCBlcnJvckZldGNoVGFza3MgPSBlcnJvciA9PiAoXG4gIHtcbiAgICB0eXBlOiBFUlJPUl9GRVRDSF9UQVNLUyxcbiAgICBlcnJvcixcbiAgfVxuKTtcblxuY29uc3QgYWRkVGFza0xvY2FsID0gdGFzayA9PiAoXG4gIHtcbiAgICB0eXBlOiBBRERfVEFTS19MT0NBTCxcbiAgICB0YXNrLFxuICB9XG4pO1xuXG5jb25zdCByZW1vdmVUYXNrTG9jYWwgPSB0YXNrSW5kZXggPT4gKFxuICB7XG4gICAgdHlwZTogUkVNT1ZFX1RBU0tfTE9DQUwsXG4gICAgdGFza0luZGV4LFxuICB9XG4pO1xuXG5jb25zdCB1cGRhdGVUYXNrTG9jYWwgPSB0YXNrID0+IChcbiAge1xuICAgIHR5cGU6IFVQREFURV9UQVNLX0xPQ0FMLFxuICAgIHRhc2ssXG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBmZXRjaFRhc2tzQnlDYXRlZ29yeSA9IChcbiAgY2F0ZWdvcmllc0lkID0gW10sXG4gIGNvbXBsZXRlZCA9IGZhbHNlLFxuICBsaW1pdCA9IHF1ZXJ5SXRlbXNMaW1pdCxcbiAgc2tpcCA9IDAsXG4pID0+IGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgZGlzcGF0Y2gocmVxdWVzdEZldGNoVGFza3MobGltaXQsIHNraXApKTtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGFjY2Vzc1Rva2VuIH0gPSBnZXRTdGF0ZSgpLmF1dGg7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKCd0YXNrcycsIHtcbiAgICAgIGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgc2tpcCxcbiAgICB9LCBNZXRob2RzLkdFVCwgYWNjZXNzVG9rZW4pO1xuICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICBkaXNwYXRjaChyZWZyZXNoQWNjZXNzVG9rZW4ocmVzcG9uc2UuYWNjZXNzVG9rZW4pKTtcbiAgICAgIGNvbnN0IHRhc2tzID0gcmVzcG9uc2UuZGF0YS5tYXAodGFzayA9PlxuICAgICAgICAoe1xuICAgICAgICAgIC4uLnRhc2ssXG4gICAgICAgICAgY29tcGxldGVkQXQ6ICh0YXNrLmNvbXBsZXRlZEF0KSA/IG5ldyBEYXRlKHRhc2suY29tcGxldGVkQXQpIDogdW5kZWZpbmVkLFxuICAgICAgICAgIHRvZG9XaXRoaW46ICh0YXNrLnRvZG9XaXRoaW4pID8gbmV3IERhdGUodGFzay50b2RvV2l0aGluKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgfSkpO1xuICAgICAgZGlzcGF0Y2gocmVjZWl2ZUZldGNoVGFza3ModGFza3MpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlzcGF0Y2goZXJyb3JGZXRjaFRhc2tzKHJlc3BvbnNlLmVycm9yLm1lc3NhZ2UpKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBkZWxldGVUYXNrID0gKGlkID0gJycpID0+IGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGFjY2Vzc1Rva2VuIH0gPSBnZXRTdGF0ZSgpLmF1dGg7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKCd0YXNrcycsIGlkLCBNZXRob2RzLkRFTEVURSwgYWNjZXNzVG9rZW4pO1xuICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICBjb25zdCB7IGl0ZW1zIH0gPSBnZXRTdGF0ZSgpLnRvZG9UYXNrcztcbiAgICAgIGRpc3BhdGNoKHJlZnJlc2hBY2Nlc3NUb2tlbihyZXNwb25zZS5hY2Nlc3NUb2tlbikpO1xuICAgICAgY29uc3QgdG9kb0FyZ3VtZW50SW5kZXggPSBpdGVtcy5maW5kSW5kZXgodG9kb0FyZ3VtZW50ID0+XG4gICAgICAgIHRvZG9Bcmd1bWVudC5pZCA9PT0gaWQpO1xuICAgICAgZGlzcGF0Y2gocmVtb3ZlVGFza0xvY2FsKHRvZG9Bcmd1bWVudEluZGV4KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UuZXJyb3IubWVzc2FnZSkpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRhc2sgPSAodGl0bGUgPSAnJywgZGVzY3JpcHRpb24gPSAnJywgY2F0ZWdvcnkgPSB7IGlkOiAnJyB9LCB0b2RvV2l0aGluLCBjYWxsYmFjayA9IHVuZGVmaW5lZCkgPT4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW4gfSA9IGdldFN0YXRlKCkuYXV0aDtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoXG4gICAgICAndGFza3MnLFxuICAgICAge1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5LmlkLFxuICAgICAgICB0b2RvV2l0aGluLFxuICAgICAgfSxcbiAgICAgIE1ldGhvZHMuUE9TVCxcbiAgICAgIGFjY2Vzc1Rva2VuLFxuICAgICk7XG4gICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgIGRpc3BhdGNoKHJlZnJlc2hBY2Nlc3NUb2tlbihyZXNwb25zZS5hY2Nlc3NUb2tlbikpO1xuICAgICAgY29uc3QgZmV0Y2hlZFRhc2sgPSByZXNwb25zZS5kYXRhO1xuICAgICAgY29uc3QgdGFzayA9IHtcbiAgICAgICAgLi4uZmV0Y2hlZFRhc2ssXG4gICAgICAgIGNvbXBsZXRlZEF0OiAoZmV0Y2hlZFRhc2suY29tcGxldGVkQXQpXG4gICAgICAgICAgPyBuZXcgRGF0ZShmZXRjaGVkVGFzay5jb21wbGV0ZWRBdCkgOiB1bmRlZmluZWQsXG4gICAgICAgIHRvZG9XaXRoaW46IChmZXRjaGVkVGFzay50b2RvV2l0aGluKVxuICAgICAgICAgID8gbmV3IERhdGUoZmV0Y2hlZFRhc2sudG9kb1dpdGhpbikgOiB1bmRlZmluZWQsXG4gICAgICB9O1xuICAgICAgZGlzcGF0Y2goYWRkVGFza0xvY2FsKHRhc2spKTtcbiAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UuZXJyb3IubWVzc2FnZSkpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHRvb2dsZVRhc2tDb21wbGV0ZWQgPSAoaWQgPSAnJywgaXNDb21wbGV0ZWQgPSBmYWxzZSkgPT4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBjb25zdCBjb21wbGV0ZWQgPSAhaXNDb21wbGV0ZWQ7XG4gIGNvbnN0IGNvbXBsZXRlZEF0ID0gKGNvbXBsZXRlZCkgPyBuZXcgRGF0ZSgpIDogbnVsbDtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGFjY2Vzc1Rva2VuIH0gPSBnZXRTdGF0ZSgpLmF1dGg7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKCd0YXNrcycsIHsgaWQsIGNvbXBsZXRlZCwgY29tcGxldGVkQXQgfSwgTWV0aG9kcy5QQVRDSCwgYWNjZXNzVG9rZW4pO1xuICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICBkaXNwYXRjaChyZWZyZXNoQWNjZXNzVG9rZW4ocmVzcG9uc2UuYWNjZXNzVG9rZW4pKTtcbiAgICAgIGNvbnN0IGZldGNoZWRUYXNrID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIGNvbnN0IHRhc2sgPSB7XG4gICAgICAgIC4uLmZldGNoZWRUYXNrLFxuICAgICAgICBjb21wbGV0ZWRBdDogKGZldGNoZWRUYXNrLmNvbXBsZXRlZEF0KVxuICAgICAgICAgID8gbmV3IERhdGUoZmV0Y2hlZFRhc2suY29tcGxldGVkQXQpIDogdW5kZWZpbmVkLFxuICAgICAgfTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZVRhc2tMb2NhbCh0YXNrKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UuZXJyb3IubWVzc2FnZSkpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdXR0b25Db21wbGV0ZVRhc2sgPSAoeyBvbkNsaWNrLCBjb21wbGV0ZWQgfSkgPT4gKFxuICA8YnV0dG9uXG4gICAgY2xhc3NOYW1lPXtgYnV0dG9uLWNvbXBsZXRlLXRhc2sgJHsoY29tcGxldGVkKSA/ICdidXR0b24tY29tcGxldGVkLXRhc2snIDogJyd9YH1cbiAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICA+XG4gICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1jaGVja1wiIC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uQ29tcGxldGVUYXNrLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbCxcbn07XG5cbkJ1dHRvbkNvbXBsZXRlVGFzay5kZWZhdWx0UHJvcHMgPSB7XG4gIGNvbXBsZXRlZDogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25Db21wbGV0ZVRhc2s7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgQnV0dG9uRGVsZXRlQ2F0ZWdvcnkgPSAoeyBvbkNsaWNrIH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24tZGVsZXRlLWNhdGVnb3J5XCIgb25DbGljaz17b25DbGlja30+XG4gICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1kZWxldGVcIiAvPlxuICA8L2J1dHRvbj5cbik7XG5cbkJ1dHRvbkRlbGV0ZUNhdGVnb3J5LnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkRlbGV0ZUNhdGVnb3J5O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEJ1dHRvbkRlbGV0ZVRhc2sgPSAoeyBvbkNsaWNrIH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24tZGVsZXRlLXRhc2tcIiBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICA8aSBjbGFzc05hbWU9XCJpY29uLWRlbGV0ZVwiIC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uRGVsZXRlVGFzay5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25EZWxldGVUYXNrO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEJ1dHRvblNjcm9sbCA9ICh7IG9uQ2xpY2ssIGRpcmVjdGlvbiB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPXtgYnV0dG9uLXNjcm9sbCAke2RpcmVjdGlvbn1gfSBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICA8aSBjbGFzc05hbWU9eyhkaXJlY3Rpb24gPT09ICdsZWZ0JykgPyAnaWNvbi1iYWNrd2FyZCcgOiAnaWNvbi1mb3J3YXJkJ30gLz5cbiAgPC9idXR0b24+XG4pO1xuXG5CdXR0b25TY3JvbGwucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBkaXJlY3Rpb246IFByb3BUeXBlcy5vbmVPZihbJ2xlZnQnLCAncmlnaHQnXSksXG59O1xuXG5CdXR0b25TY3JvbGwuZGVmYXVsdFByb3BzID0ge1xuICBkaXJlY3Rpb246ICdsZWZ0Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvblNjcm9sbDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbkdyb3VwIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5pbXBvcnQgc2Nyb2xsIGZyb20gJ3Njcm9sbCc7XG5pbXBvcnQgQnV0dG9uU2Nyb2xsIGZyb20gJy4vQnV0dG9uU2NvbGwnO1xuaW1wb3J0IENhdGVnb3J5IGZyb20gJy4vQ2F0ZWdvcnknO1xuaW1wb3J0IEZhZGUgZnJvbSAnLi9hbmltcy9GYWRlJztcblxuY2xhc3MgQ2F0ZWdvcmllc0ZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuY2hpcHMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5oYW5kbGVMZWZ0U2Nyb2xsQ2xpY2sgPSB0aGlzLmhhbmRsZUxlZnRTY3JvbGxDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlUmlnaHRTY3JvbGxDbGljayA9IHRoaXMuaGFuZGxlUmlnaHRTY3JvbGxDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMubW92ZUNoaXBzU2Nyb2xsID0gdGhpcy5tb3ZlQ2hpcHNTY3JvbGwuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZUxlZnRTY3JvbGxDbGljaygpIHtcbiAgICBpZiAodGhpcy5jaGlwcykge1xuICAgICAgdGhpcy5tb3ZlQ2hpcHNTY3JvbGwoLXRoaXMuY2hpcHMuY2xpZW50V2lkdGgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuY2hpcHMpIHtcbiAgICAgIHRoaXMubW92ZUNoaXBzU2Nyb2xsKHRoaXMuY2hpcHMuY2xpZW50V2lkdGgpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVDaGlwc1Njcm9sbChkZWx0YSkge1xuICAgIGlmICh0aGlzLmNoaXBzKSB7XG4gICAgICBjb25zdCBuZXh0U2Nyb2xsTGVmdCA9IHRoaXMuY2hpcHMuc2Nyb2xsTGVmdCArIGRlbHRhO1xuICAgICAgc2Nyb2xsLmxlZnQodGhpcy5jaGlwcywgbmV4dFNjcm9sbExlZnQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNhdGVnb3J5TGlzdCwgb25EZWxldGVDYXRlZ29yeSwgb25DaWxja0NhdGVnb3J5IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiY29udGVudC1jYXRlZ29yaWVzLWZpbHRlclwiPlxuICAgICAgICA8QnV0dG9uU2Nyb2xsXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVMZWZ0U2Nyb2xsQ2xpY2t9XG4gICAgICAgICAgZGlyZWN0aW9uPVwibGVmdFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJjYXRlZ29yaWVzLWZpbHRlclwiXG4gICAgICAgICAgcmVmPXsobm9kZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGlwcyA9IG5vZGU7XG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxUcmFuc2l0aW9uR3JvdXAgc3R5bGU9e3sgZGlzcGxheTogJ2luaGVyaXQnLCBwYWRkaW5nTGVmdDogJzEuMjVlbScsIHBhZGRpbmdSaWdodDogJzEuMjVlbScgfX0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNhdGVnb3J5TGlzdC5tYXAoY2F0ZWdvcnkgPT4gKFxuICAgICAgICAgICAgICAgIDxGYWRlIGtleT17Y2F0ZWdvcnkuaWR9PlxuICAgICAgICAgICAgICAgICAgPENhdGVnb3J5XG4gICAgICAgICAgICAgICAgICAgIGtleT17Y2F0ZWdvcnkuaWR9XG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5PXtjYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2NhdGVnb3J5LnNlbGVjdGVkfVxuICAgICAgICAgICAgICAgICAgICBvbkRlbGV0ZT17b25EZWxldGVDYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b25DaWxja0NhdGVnb3J5fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L0ZhZGU+XG4gICAgICAgICAgICAgICkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9UcmFuc2l0aW9uR3JvdXA+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8QnV0dG9uU2Nyb2xsXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVSaWdodFNjcm9sbENsaWNrfVxuICAgICAgICAgIGRpcmVjdGlvbj1cInJpZ2h0XCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQ2F0ZWdvcmllc0ZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIGNhdGVnb3J5TGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgb25EZWxldGVDYXRlZ29yeTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2lsY2tDYXRlZ29yeTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbkNhdGVnb3JpZXNGaWx0ZXIuZGVmYXVsdFByb3BzID0ge1xuICBvbkRlbGV0ZUNhdGVnb3J5OiB1bmRlZmluZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYXRlZ29yaWVzRmlsdGVyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQnV0dG9uRGVsZXRlQ2F0ZWdvcnkgZnJvbSAnLi9CdXR0b25EZWxldGVDYXRlZ29yeSc7XG5cbmNvbnN0IENhdGVnb3J5ID0gKHtcbiAgY2F0ZWdvcnksIHNlbGVjdGVkLCBvbkNsaWNrLCBvbkRlbGV0ZSxcbn0pID0+IHtcbiAgbGV0IGNzc0NsYXNzID0gJyc7XG5cbiAgY29uc3Qgb25DaGlwQ2xpY2sgPSAoZSkgPT4ge1xuICAgIG9uQ2xpY2soY2F0ZWdvcnksIGUpO1xuICB9O1xuICBjb25zdCBvbkRlbGV0ZUNsaWNrID0gKCkgPT4ge1xuICAgIG9uRGVsZXRlKGNhdGVnb3J5KTtcbiAgfTtcblxuICBpZiAoc2VsZWN0ZWQpIHtcbiAgICBjc3NDbGFzcyA9ICdjYXRlZ29yeS1zZWxlY3RlZCc7XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2Ake2Nzc0NsYXNzfSBjYXRlZ29yeS1jaGlwIGFsaWduLWl0ZW1zLWNlbnRlcmB9XG4gICAgICBvbkNsaWNrPXtvbkNoaXBDbGlja31cbiAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhdGVnb3J5LXRleHRcIj57Y2F0ZWdvcnkubmFtZX08L3NwYW4+XG4gICAgICB7XG4gICAgICAgIChjYXRlZ29yeS5pZCAhPT0gJzAnICYmIG9uRGVsZXRlICE9PSB1bmRlZmluZWQpICYmXG4gICAgICAgICAgPEJ1dHRvbkRlbGV0ZUNhdGVnb3J5IG9uQ2xpY2s9e29uRGVsZXRlQ2xpY2t9IC8+XG4gICAgICB9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5DYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIG9uRGVsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY2F0ZWdvcnk6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuQ2F0ZWdvcnkuZGVmYXVsdFByb3BzID0ge1xuICBvbkRlbGV0ZTogdW5kZWZpbmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0ZWdvcnk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSAnbG9kYXNoJztcblxuY29uc3Qgd2FpdFRpbWUgPSA1MDA7XG5cbmNsYXNzIEluZmluaXRlU2Nyb2xsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5vblNjcm9sbCA9IHRoaXMub25TY3JvbGwuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZSh0aGlzLm9uU2Nyb2xsLCB3YWl0VGltZSksIGZhbHNlKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZSh0aGlzLm9uU2Nyb2xsLCB3YWl0VGltZSksIGZhbHNlKTtcbiAgfVxuXG4gIG9uU2Nyb2xsKCkge1xuICAgIGlmICgod2luZG93LmlubmVySGVpZ2h0ICsgd2luZG93LnNjcm9sbFkpID49IChkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCAtIDIwMCkpIHtcbiAgICAgIGNvbnN0IHsgYXJncywgb25TY3JvbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICBvblNjcm9sbCguLi5hcmdzKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgY2xhc3NOYW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5JbmZpbml0ZVNjcm9sbC5wcm9wVHlwZXMgPSB7XG4gIGFyZ3M6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvblNjcm9sbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbkluZmluaXRlU2Nyb2xsLmRlZmF1bHRQcm9wcyA9IHtcbiAgYXJnczogW10sXG4gIGNsYXNzTmFtZTogJycsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbmZpbml0ZVNjcm9sbDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBNYWluQWRkQnV0dG9uID0gKHsgb25DbGljayB9KSA9PiAoXG4gIDxidXR0b24gaWQ9XCJtYWluLWFkZC1idXR0b25cIiBvbkNsaWNrPXtvbkNsaWNrfSA+XG4gICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj4mI3hFMTQ1OzwvaT5cbiAgPC9idXR0b24+XG4pO1xuXG5NYWluQWRkQnV0dG9uLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1haW5BZGRCdXR0b247XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBTbmFja2JhckFuaW0gZnJvbSAnLi9hbmltcy9TbmFja2JhckFuaW0nO1xuXG5jb25zdCBBY3Rpb24gPSAoeyBvbkNsaWNrLCB0ZXh0IH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24tYWN0aW9uLXNuYWNrYmFyXCIgb25DbGljaz17b25DbGlja30+XG4gICAge3RleHR9XG4gIDwvYnV0dG9uPlxuKTtcblxuQWN0aW9uLnByb3BUeXBlcyA9IHtcbiAgdGV4dDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuY2xhc3MgU25hY2tiYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgY29uc3Qge1xuICAgICAgb25DbG9zZSwgZHVyYXRpb24sIHNob3csXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoc2hvdykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgIH0sIGR1cmF0aW9uKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbWVzc2FnZSwgaXNFcnJvciwgYWN0aW9uVGV4dCwgYWN0aW9uQ2xpY2ssIHNob3csXG4gICAgICB2ZXJ0aWNhbFBvc3Rpb24sIGhvcml6b250YWxQb3NpdGlvbixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPFNuYWNrYmFyQW5pbSBpbj17c2hvd30gY3VzdG9tQ2xhc3M9e2Ake3ZlcnRpY2FsUG9zdGlvbn0gJHsoaG9yaXpvbnRhbFBvc2l0aW9uKX1gfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YHNuYWNrYmFyICR7KGlzRXJyb3IpID8gJ2Vycm9yJyA6ICcnfWB9XG4gICAgICAgID5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzbmFja2Jhci1tZXNzYWdlXCI+e21lc3NhZ2V9PC9zcGFuPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIChhY3Rpb25UZXh0ICE9PSAnJyAmJiBhY3Rpb25DbGljayAhPT0gdW5kZWZpbmVkKSAmJlxuICAgICAgICAgICAgICA8QWN0aW9uIG9uQ2xpY2s9e2FjdGlvbkNsaWNrfSB0ZXh0PXthY3Rpb25UZXh0fSAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L1NuYWNrYmFyQW5pbT5cbiAgICApO1xuICB9XG59XG5cblNuYWNrYmFyLnByb3BUeXBlcyA9IHtcbiAgc2hvdzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBkdXJhdGlvbjogUHJvcFR5cGVzLm51bWJlcixcbiAgaXNFcnJvcjogUHJvcFR5cGVzLmJvb2wsXG4gIGFjdGlvblRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGFjdGlvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgdmVydGljYWxQb3N0aW9uOiBQcm9wVHlwZXMub25lT2YoWyd0b3AnLCAnYm90dG9tJ10pLFxuICBob3Jpem9udGFsUG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbJ2xlZnQnLCAncmlnaHQnXSksXG59O1xuXG5TbmFja2Jhci5kZWZhdWx0UHJvcHMgPSB7XG4gIGR1cmF0aW9uOiA1MDAwLFxuICBpc0Vycm9yOiBmYWxzZSxcbiAgYWN0aW9uVGV4dDogJycsXG4gIGFjdGlvbkNsaWNrOiB1bmRlZmluZWQsXG4gIHZlcnRpY2FsUG9zdGlvbjogJ2JvdHRvbScsXG4gIGhvcml6b250YWxQb3NpdGlvbjogJ3JpZ2h0Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNuYWNrYmFyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQ29sbGFwc2UgZnJvbSAnLi9hbmltcy9Db2xsYXBzZSc7XG5pbXBvcnQgRmFkZSBmcm9tICcuL2FuaW1zL0ZhZGUnO1xuaW1wb3J0IEJ1dHRvbkNvbXBsZXRlVGFzayBmcm9tICcuL0J1dHRvbkNvbXBsZXRlVGFzayc7XG5pbXBvcnQgQnV0dG9uRGVsZXRlVGFzayBmcm9tICcuL0J1dHRvbkRlbGV0ZVRhc2snO1xuaW1wb3J0IHsgdG9TaW1wbGVEYXRlRm9ybWF0IH0gZnJvbSAnLi4vdXRpbHMvQ29tbW9uJztcbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vY29uc3RhbnRzL2xhYmVscyc7XG5cbmNsYXNzIFRhc2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICB9O1xuICAgIHRoaXMucmVuZGVyRGF0ZSA9IHRoaXMucmVuZGVyRGF0ZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25UaXRsZUNsaWNrKCkge1xuICAgIGNvbnN0IHsgY29sbGFwc2VkIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBjb2xsYXBzZWQ6ICFjb2xsYXBzZWQgfSk7XG4gIH1cblxuICByZW5kZXJEYXRlKCkge1xuICAgIGNvbnN0IHsgdGFzayB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAodGFzay5jb21wbGV0ZWQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cImNvbXBsZXRlLWRhdGVcIj57YCR7bGFiZWxzLmxhYmVsUGFydGlhbENvbXBsZXRlZH0gJHsodGFzay5jb21wbGV0ZWRBdCkgPyB0b1NpbXBsZURhdGVGb3JtYXQodGFzay5jb21wbGV0ZWRBdCkgOiAnJ31gfTwvcD5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8cCBjbGFzc05hbWU9XCJjb21wbGV0ZS13aXRoaW4tZGF0ZVwiPntgJHtsYWJlbHMubGFiZWxQYXJ0aWFsVG9Db21wbGV0ZWR9ICR7KHRhc2sudG9kb1dpdGhpbikgPyB0b1NpbXBsZURhdGVGb3JtYXQodGFzay50b2RvV2l0aGluKSA6IGxhYmVscy5sYWJlbE5vdFNldH1gfTwvcD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgdGFzaywgb25EZWxldGUsIG9uQ29tcGxldGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBjb2xsYXBzZWQgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFzay1pdGVtXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFzay1oZWFkZXJcIj5cbiAgICAgICAgICA8cFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGFzay10aXRsZSAkeyh0YXNrLmNvbXBsZXRlZCkgPyAndGFzay10aXRsZS1jb21wbGV0ZWQnIDogJyd9YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMub25UaXRsZUNsaWNrKCl9XG4gICAgICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGFzay50aXRsZX1cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPEZhZGUgaW49e2NvbGxhcHNlZH0+XG4gICAgICAgICAgICA8QnV0dG9uRGVsZXRlVGFza1xuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkRlbGV0ZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9GYWRlPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG9uQ29tcGxldGUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgPEJ1dHRvbkNvbXBsZXRlVGFza1xuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNvbXBsZXRlfVxuICAgICAgICAgICAgICBjb21wbGV0ZWQ9e3Rhc2suY29tcGxldGVkfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhc2stZGF0ZVwiPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckRhdGUoKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxDb2xsYXBzZSBpbj17Y29sbGFwc2VkfT5cbiAgICAgICAgICA8ZGl2IGtleT17dGFzay5kZXNjcmlwdGlvbn0gY2xhc3NOYW1lPVwidGFzay1ib2R5XCI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0YXNrLWRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAodGFzay5kZXNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkICYmIHRhc2suZGVzY3JpcHRpb24gIT09ICcnKVxuICAgICAgICAgICAgICAgID8gdGFzay5kZXNjcmlwdGlvbiA6IDxzcGFuIGNsYXNzTmFtZT1cImVtcHR5XCI+e2xhYmVscy5sYWJlbE5vRGVzY3JpcHRpb259PC9zcGFuPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQ29sbGFwc2U+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblRhc2sucHJvcFR5cGVzID0ge1xuICBvbkRlbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ29tcGxldGU6IFByb3BUeXBlcy5mdW5jLFxuICB0YXNrOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgY29tcGxldGVkQXQ6IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gIH0pLmlzUmVxdWlyZWQsXG59O1xuXG5UYXNrLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25EZWxldGU6IHVuZGVmaW5lZCxcbiAgb25Db21wbGV0ZTogdW5kZWZpbmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVGFzaztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCB7IFRyYW5zaXRpb25Hcm91cCB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xyXG5pbXBvcnQgUmVzaXplIGZyb20gJy4vYW5pbXMvUmVzaXplJztcclxuaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrJztcclxuaW1wb3J0IEluZmluaXRlU2Nyb2xsIGZyb20gJy4vSW5maW5pdGVTY3JvbGwnO1xyXG5pbXBvcnQgeyBxdWVyeUl0ZW1zTGltaXQgfSBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcclxuXHJcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcclxuICBsaW1pdDogcXVlcnlJdGVtc0xpbWl0LFxyXG4gIHNraXA6IDAsXHJcbn07XHJcblxyXG5jbGFzcyBUYXNrcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSBpbml0aWFsU3RhdGU7XHJcbiAgICB0aGlzLm9uRmV0Y2hUb2RvVGFza3NOZXh0ID0gdGhpcy5vbkZldGNoVG9kb1Rhc2tzTmV4dC5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhuZXh0UHJvcHMsIHByZXZTdGF0ZSkge1xyXG4gICAgaWYgKG5leHRQcm9wcy5za2lwICE9PSBwcmV2U3RhdGUuc2tpcCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNraXA6IG5leHRQcm9wcy5za2lwLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBvbkZldGNoVG9kb1Rhc2tzTmV4dCgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsXHJcbiAgICAgIGZldGNoVGFza3MsIG1vcmVUb0xvYWQsXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuICAgIGlmICghbW9yZVRvTG9hZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IGxpbWl0LCBza2lwIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgbmV3U2tpcCA9IHNraXAgKyBsaW1pdDtcclxuICAgIGZldGNoVGFza3MoY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsIGxpbWl0LCBuZXdTa2lwKTtcclxuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHsgc2tpcDogc3RhdGUuc2tpcCArIHN0YXRlLmxpbWl0IH0pKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgdGFza0xpc3QsXHJcbiAgICAgIG9uRGVsZXRlVGFzayxcclxuICAgICAgb25Db21wbGV0ZVRhc2ssXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgaWQ9XCJjb250ZW50LXRvZG8tdGFza3NcIj5cclxuICAgICAgICA8SW5maW5pdGVTY3JvbGwgb25TY3JvbGw9e3RoaXMub25GZXRjaFRvZG9UYXNrc05leHR9PlxyXG4gICAgICAgICAgPFRyYW5zaXRpb25Hcm91cD5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRhc2tMaXN0Lm1hcChhcmcgPT4gKFxyXG4gICAgICAgICAgICAgICAgPFJlc2l6ZSBrZXk9e2FyZy5pZH0+XHJcbiAgICAgICAgICAgICAgICAgIDxUYXNrXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXthcmcuaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgdGFzaz17YXJnfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlPXsoKSA9PiBvbkRlbGV0ZVRhc2soYXJnKX1cclxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXsoKSA9PiBvbkNvbXBsZXRlVGFzayhhcmcpfVxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9SZXNpemU+XHJcbiAgICAgICAgICAgICAgKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgPC9UcmFuc2l0aW9uR3JvdXA+XHJcbiAgICAgICAgPC9JbmZpbml0ZVNjcm9sbD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuVGFza3MucHJvcFR5cGVzID0ge1xyXG4gIG9uRGVsZXRlVGFzazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICBvbkNvbXBsZXRlVGFzazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICB0YXNrTGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcclxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxyXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXHJcbiAgbW9yZVRvTG9hZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICBmZXRjaFRhc2tzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gIGNhdGVnb3JpZXNJZDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZykuaXNSZXF1aXJlZCxcclxuICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYXNrcztcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBMb2FkZXJMaW5lYXIgZnJvbSAnLi4vY29tcG9uZW50cy9Mb2FkZXJMaW5lYXInO1xuaW1wb3J0IE1haW5BZGRCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9NYWluQWRkQnV0dG9uJztcbmltcG9ydCBDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lcnMvQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lcic7XG5pbXBvcnQgVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lciBmcm9tICcuLi9jb250YWluZXJzL1Zpc2liaWxpdHlGaWx0ZXJDb250YWluZXInO1xuaW1wb3J0IFRhc2tzQ29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lcnMvVGFza3NDb250YWluZXInO1xuaW1wb3J0IERpYWxvZ0FkZCBmcm9tICcuL2RpYWxvZ0FkZC9EaWFsb2dBZGQnO1xuaW1wb3J0IFNuYWNrYmFyIGZyb20gJy4vU25hY2tiYXInO1xuXG5jbGFzcyBUb2RvcyBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc0RpYWxvZ0FkZE9wZW46IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IGluaXRGZXRjaEFsbENhdGVnb3JpZXMgfSA9IHRoaXMucHJvcHM7XG4gICAgaW5pdEZldGNoQWxsQ2F0ZWdvcmllcygpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaXNEaWFsb2dBZGRPcGVuIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgbWVzc2FnZSwgaGlkZU1lc3NhZ2UsIHNob3dMb2FkaW5nIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtYXBwXCI+XG4gICAgICAgIDxMb2FkZXJMaW5lYXIgc2hvdz17c2hvd0xvYWRpbmd9IC8+XG4gICAgICAgIDxkaXYgaWQ9XCJtYWluLXRvcC1iYXJcIj5cbiAgICAgICAgICA8Q2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lciAvPlxuICAgICAgICAgIDxWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyIC8+XG4gICAgICAgICAgPE1haW5BZGRCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBpc0RpYWxvZ0FkZE9wZW46IHRydWUgfSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxUYXNrc0NvbnRhaW5lciAvPlxuICAgICAgICA8RGlhbG9nQWRkXG4gICAgICAgICAgb3Blbj17aXNEaWFsb2dBZGRPcGVufVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBpc0RpYWxvZ0FkZE9wZW46IGZhbHNlIH0pfVxuICAgICAgICAvPlxuICAgICAgICA8U25hY2tiYXJcbiAgICAgICAgICBzaG93PXttZXNzYWdlLnNob3d9XG4gICAgICAgICAgaXNFcnJvcj17bWVzc2FnZS5pc0Vycm9yfVxuICAgICAgICAgIG1lc3NhZ2U9e21lc3NhZ2UudGV4dH1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBoaWRlTWVzc2FnZSgpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Ub2Rvcy5wcm9wVHlwZXMgPSB7XG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2hvdzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0Vycm9yOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgaGlkZU1lc3NhZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGluaXRGZXRjaEFsbENhdGVnb3JpZXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHNob3dMb2FkaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9kb3M7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBWaXNpYmlsaXR5U3dpdGNoIGZyb20gJy4vVmlzaWJpbGl0eVN3aXRjaCc7XG5pbXBvcnQgeyBBTExfVE9ET1MsIE9OTFlfQ09NUExFVEVELCBPTkxZX1RPX0NPTVBMRVRFIH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmNvbnN0IFZpc2liaWxpdHlGaWx0ZXIgPSAoe1xuICBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIsIG9uVmlzaWJpbGl0eVN3aXRjaENsaWNrLFxufSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cInZpc2liaWxpdHktZmlsdGVyLXdyYXBwZXJcIj5cbiAgICA8VmlzaWJpbGl0eVN3aXRjaFxuICAgICAgc2VsZWN0ZWQ9eyhzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IE9OTFlfVE9fQ09NUExFVEVcbiAgICAgICAgfHwgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyID09PSBBTExfVE9ET1MpfVxuICAgICAgb25DbGljaz17b25WaXNpYmlsaXR5U3dpdGNoQ2xpY2soT05MWV9UT19DT01QTEVURSl9XG4gICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICA+XG4gICAgICA8aSBjbGFzc05hbWU9XCJpY29uLWNpcmNsZS1ib3JkZXJcIiAvPlxuICAgIDwvVmlzaWJpbGl0eVN3aXRjaD5cbiAgICA8VmlzaWJpbGl0eVN3aXRjaFxuICAgICAgc2VsZWN0ZWQ9eyhzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IE9OTFlfQ09NUExFVEVEXG4gICAgICAgIHx8IHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciA9PT0gQUxMX1RPRE9TKX1cbiAgICAgIG9uQ2xpY2s9e29uVmlzaWJpbGl0eVN3aXRjaENsaWNrKE9OTFlfQ09NUExFVEVEKX1cbiAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgID5cbiAgICAgIDxpIGNsYXNzTmFtZT1cImljb24tY2lyY2xlXCIgLz5cbiAgICA8L1Zpc2liaWxpdHlTd2l0Y2g+XG4gIDwvZGl2PlxuKTtcblxuVmlzaWJpbGl0eUZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvblZpc2liaWxpdHlTd2l0Y2hDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFZpc2liaWxpdHlGaWx0ZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgVmlzaWJpbGl0eVN3aXRjaCA9ICh7XG4gIHNlbGVjdGVkLCBjaGlsZHJlbiwgb25DbGljayxcbn0pID0+IChcbiAgPGRpdlxuICAgIGNsYXNzTmFtZT17YHZpc2liaWxpdHktYnV0dG9uLXN3aXRjaCBhbGlnbi1pdGVtcy1jZW50ZXIgJHsoc2VsZWN0ZWQpID8gJ3NlbGVjdGVkJyA6ICcnfSBgfVxuICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gID5cbiAgICB7Y2hpbGRyZW59XG4gIDwvZGl2PlxuKTtcblxuVmlzaWJpbGl0eVN3aXRjaC5wcm9wVHlwZXMgPSB7XG4gIHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5WaXNpYmlsaXR5U3dpdGNoLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2VsZWN0ZWQ6IGZhbHNlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaWJpbGl0eVN3aXRjaDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDMwMDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgaGVpZ2h0ICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBoZWlnaHQ6IDAsXG59O1xuXG5jb25zdCBvbkVudGVyID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gYCR7bm9kZS5maXJzdEVsZW1lbnRDaGlsZC5vZmZzZXRIZWlnaHR9cHhgO1xufTtcblxuY29uc3Qgb25FeGl0ID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gJzBweCc7XG59O1xuXG5jb25zdCBDb2xsYXBzZSA9ICh7IGluOiBpblByb3AsIGNoaWxkcmVuIH0pID0+IChcbiAgPFRyYW5zaXRpb24gb25FbnRlcj17b25FbnRlcn0gb25FeGl0PXtvbkV4aXR9IGluPXtpblByb3B9IHRpbWVvdXQ9e2R1cmF0aW9ufT5cbiAgICB7KCkgPT4gKFxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuQ29sbGFwc2UucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb2xsYXBzZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDI1MDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgYWxsICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBoZWlnaHQ6ICcwcHgnLFxuICBvcGFjaXR5OiAnMCcsXG4gIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxufTtcblxuY29uc3QgdHJhbnNpdGlvblN0eWxlcyA9IHtcbiAgZW50ZXJpbmc6IHtcbiAgICBoZWlnaHQ6ICcwcHgnLFxuICAgIG9wYWNpdHk6ICcwJyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgfSxcbiAgZW50ZXJlZDoge1xuICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgaGVpZ2h0OiAnMTAwdmgnLFxuICAgIG9wYWNpdHk6ICcxJyxcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gIH0sXG59O1xuXG5jb25zdCBEaWFsb2dBbmltID0gKHsgaW46IGluUHJvcCwgY2hpbGRyZW4gfSkgPT4gKFxuICA8VHJhbnNpdGlvbiBpbj17aW5Qcm9wfSB0aW1lb3V0PXtkdXJhdGlvbn0+XG4gICAge3N0YXRlID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJiYWNrZHJvcC1kaWFsb2dcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgICAuLi50cmFuc2l0aW9uU3R5bGVzW3N0YXRlXSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuRGlhbG9nQW5pbS5wcm9wVHlwZXMgPSB7XG4gIGluOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpYWxvZ0FuaW07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XHJcblxyXG5jb25zdCBkdXJhdGlvbiA9IHtcclxuICBlbnRlcjogMzAwLFxyXG4gIGV4aXQ6IDIwMCxcclxufTtcclxuXHJcbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcclxuICB0cmFuc2l0aW9uOiBgYWxsICR7ZHVyYXRpb24uZW50ZXJ9bXMgZWFzZS1pbi1vdXRgLFxyXG4gIGhlaWdodDogMCxcclxuICBvcGFjaXR5OiAwLFxyXG59O1xyXG5cclxuY29uc3Qgb25FbnRlciA9IChub2RlKSA9PiB7XHJcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcclxuICBzdHlsZS5oZWlnaHQgPSBgJHtub2RlLmZpcnN0RWxlbWVudENoaWxkLm9mZnNldEhlaWdodH1weGA7XHJcbiAgc3R5bGUub3BhY2l0eSA9IDE7XHJcbn07XHJcblxyXG5jb25zdCBvbkVudGVyZWQgPSAobm9kZSkgPT4ge1xyXG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XHJcbiAgc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xyXG59O1xyXG5cclxuY29uc3Qgb25FeGl0ID0gKG5vZGUpID0+IHtcclxuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xyXG4gIHN0eWxlLmhlaWdodCA9IGAke25vZGUuZmlyc3RFbGVtZW50Q2hpbGQub2Zmc2V0SGVpZ2h0fXB4YDtcclxufTtcclxuXHJcbmNvbnN0IG9uRXhpdGVkID0gKG5vZGUpID0+IHtcclxuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xyXG4gIHN0eWxlLmhlaWdodCA9ICcwcHgnO1xyXG4gIHN0eWxlLm9wYWNpdHkgPSAwO1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IFJlc2l6ZSA9ICh7IGNoaWxkcmVuLCAuLi5wcm9wcyB9KSA9PiAoXHJcbiAgPFRyYW5zaXRpb25cclxuICAgIHsuLi5wcm9wc31cclxuICAgIG9uRW50ZXI9e29uRW50ZXJ9XHJcbiAgICBvbkVudGVyZWQ9e29uRW50ZXJlZH1cclxuICAgIG9uRXhpdD17b25FeGl0fVxyXG4gICAgb25FeGl0ZWQ9e29uRXhpdGVkfVxyXG4gICAgdGltZW91dD17ZHVyYXRpb259XHJcbiAgPlxyXG4gICAgeygpID0+IChcclxuICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxyXG4gICAgICAgIH19XHJcbiAgICAgID5cclxuICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKX1cclxuICA8L1RyYW5zaXRpb24+XHJcbik7XHJcblxyXG5SZXNpemUucHJvcFR5cGVzID0ge1xyXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVzaXplO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSAyNTA7XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgdHJhbnNpdGlvbjogYGFsbCAke2R1cmF0aW9ufW1zIGVhc2UtaW4tb3V0YCxcbiAgYm90dG9tOiAnLTEwMHB4Jyxcbn07XG5cbmNvbnN0IHRyYW5zaXRpb25TdHlsZXMgPSB7XG4gIGVudGVyaW5nOiB7XG4gICAgYm90dG9tOiAnLTEwMHB4JyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgfSxcbiAgZW50ZXJlZDoge1xuICAgIGJvdHRvbTogJzBweCcsXG4gICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICB9LFxufTtcblxuY29uc3QgU25hY2tiYXJBbmltID0gKHsgaW46IGluUHJvcCwgY2hpbGRyZW4sIGN1c3RvbUNsYXNzIH0pID0+IChcbiAgPFRyYW5zaXRpb24gaW49e2luUHJvcH0gdGltZW91dD17ZHVyYXRpb259PlxuICAgIHtzdGF0ZSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPVwiY29udGVudC1zbmFja2JhclwiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxuICAgICAgICAgIC4uLnRyYW5zaXRpb25TdHlsZXNbc3RhdGVdLFxuICAgICAgICB9fVxuICAgICAgICBjbGFzc05hbWU9e2N1c3RvbUNsYXNzfVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICA8L1RyYW5zaXRpb24+XG4pO1xuXG5TbmFja2JhckFuaW0ucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIGN1c3RvbUNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuU25hY2tiYXJBbmltLmRlZmF1bHRQcm9wcyA9IHtcbiAgY3VzdG9tQ2xhc3M6ICcnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU25hY2tiYXJBbmltO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IHsgQUREX1RBU0sgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IHsgYWRkQ2F0ZWdvcnkgfSBmcm9tICcuLi8uLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUluZm8gfSBmcm9tICcuLi8uLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcblxuY2xhc3MgQWRkQ2F0ZWdvcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbmFtZTogJycsXG4gICAgfTtcbiAgICB0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlID0gdGhpcy5vbklucHV0VGV4dENoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25CdXR0b25BZGRDbGljayA9IHRoaXMub25CdXR0b25BZGRDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25DYXRlZ29yeUNyZWF0ZWQgPSB0aGlzLm9uQ2F0ZWdvcnlDcmVhdGVkLmJpbmQodGhpcyk7XG4gIH1cblxuICBvbklucHV0VGV4dENoYW5nZShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IG5hbWU6IGUudGFyZ2V0LnZhbHVlIH0pO1xuICB9XG5cbiAgb25CdXR0b25BZGRDbGljaygpIHtcbiAgICBjb25zdCB7IG5hbWUgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBkaXNwYXRjaCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAobmFtZSA9PT0gJycpIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlSW5mbyhsYWJlbHMubXNnTmFtZVJlcXVpcmVkKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRpc3BhdGNoKGFkZENhdGVnb3J5KG5hbWUsIHRoaXMub25DYXRlZ29yeUNyZWF0ZWQpKTtcbiAgfVxuXG4gIG9uQ2F0ZWdvcnlDcmVhdGVkKHNlbGVjdGVkQ2F0ZWdvcnkpIHtcbiAgICBjb25zdCB7IG9uTmV4dCB9ID0gdGhpcy5wcm9wcztcbiAgICBvbk5leHQoeyBzdGVwSWQ6IEFERF9UQVNLLCBvcHRpb25zOiB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWFkZC1jYXRlZ29yeVwiPlxuICAgICAgICA8aDI+e2xhYmVscy50aXRsZUFkZENhdGVnb3J5fTwvaDI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtsYWJlbHMucGxhY2Vob2xkZXJOYW1lfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dFRleHRDaGFuZ2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1idXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkJ1dHRvbkFkZENsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYWJlbHMuYnV0dG9uQWRkfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQWRkQ2F0ZWdvcnkucHJvcFR5cGVzID0ge1xuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCgpKEFkZENhdGVnb3J5KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi9jb25zdGFudHMvbGFiZWxzJztcbmltcG9ydCB7IFNFTEVDVF9DT01QTEVURV9EQVRFIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5jbGFzcyBBZGRUYXNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdGl0bGU6ICcnLFxuICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgIH07XG4gICAgdGhpcy5vbklucHV0VGV4dENoYW5nZSA9IHRoaXMub25JbnB1dFRleHRDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQnV0dG9uU2NoZWR1bGVDbGljayA9IHRoaXMub25CdXR0b25TY2hlZHVsZUNsaWNrLmJpbmQodGhpcyk7XG4gIH1cblxuICBvbklucHV0VGV4dENoYW5nZShuYW1lKSB7XG4gICAgcmV0dXJuIChlKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgW25hbWVdOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgICB9O1xuICB9XG5cbiAgb25CdXR0b25TY2hlZHVsZUNsaWNrKCkge1xuICAgIGNvbnN0IHsgb3B0aW9ucywgZGlzcGF0Y2gsIG9uTmV4dCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBjYXRlZ29yeSA9IG9wdGlvbnMuc2VsZWN0ZWRDYXRlZ29yeTtcbiAgICBpZiAodGl0bGUgPT09ICcnKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ1RpdGxlUmVxdWlyZWQpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25OZXh0KHsgc3RlcElkOiBTRUxFQ1RfQ09NUExFVEVfREFURSwgb3B0aW9uczogeyB0aXRsZSwgZGVzY3JpcHRpb24sIGNhdGVnb3J5IH0gfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBzZWxlY3RlZENhdGVnb3J5IH0gPSB0aGlzLnByb3BzLm9wdGlvbnM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1hZGQtdGFza1wiPlxuICAgICAgICA8aDI+e2xhYmVscy50aXRsZUFkZFRhc2t9PC9oMj5cbiAgICAgICAgPGgzPlxuICAgICAgICAgIHtsYWJlbHMubGFiZWxGb3JDYXRlZ29yeX1cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsYWJlbC1jYXRlZ29yeS1uYW1lXCI+XG4gICAgICAgICAgICB7YCAke3NlbGVjdGVkQ2F0ZWdvcnkubmFtZX1gfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9oMz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWZpZWxkc1wiPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17bGFiZWxzLnBsYWNlSG9sZGVyVGl0bGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0VGV4dENoYW5nZSgndGl0bGUnKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17bGFiZWxzLnBsYWNlSG9sZGVyRGVzY3JpcHRpb259XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0VGV4dENoYW5nZSgnZGVzY3JpcHRpb24nKX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQnV0dG9uU2NoZWR1bGVDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGFiZWxzLmJ1dHRvblNjaGVkdWxlfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQWRkVGFzay5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvcHRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHNlbGVjdGVkQ2F0ZWdvcnk6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIH0pLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoKShBZGRUYXNrKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgU2VsZWN0QWN0aW9uQWRkIGZyb20gJy4vU2VsZWN0QWN0aW9uQWRkJztcbmltcG9ydCBBZGRDYXRlZ29yeSBmcm9tICcuL0FkZENhdGVnb3J5JztcbmltcG9ydCBTZWxlY3RDYXRlZ29yeSBmcm9tICcuL1NlbGVjdENhdGVnb3J5JztcbmltcG9ydCBBZGRUYXNrIGZyb20gJy4vQWRkVGFzayc7XG5pbXBvcnQgU2VsZWN0Q29tcGxldGVEYXRlIGZyb20gJy4vU2VsZWN0Q29tcGxldGVEYXRlJztcbmltcG9ydCBEb25lIGZyb20gJy4vRG9uZSc7XG5pbXBvcnQge1xuICBTRUxFQ1RfV0FOVF9UT19BREQsXG4gIEFERF9DQVRFR09SWSxcbiAgQUREX1RBU0ssXG4gIFNFTEVDVF9DQVRFR09SWSxcbiAgU0VMRUNUX0NPTVBMRVRFX0RBVEUsXG4gIERPTkUsXG4gIHN0ZXBMaXN0LFxufSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IFJlcGxhY2VBbmltIGZyb20gJy4uL2FuaW1zL1JlcGxhY2VBbmltJztcbmltcG9ydCBEaWFsb2dBbmltIGZyb20gJy4uL2FuaW1zL0RpYWxvZ0FuaW0nO1xuaW1wb3J0IFN0ZXBzIGZyb20gJy4vU3RlcHMnO1xuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi9jb25zdGFudHMvbGFiZWxzJztcblxuY29uc3QgZ2V0Q29udGVudFRvUmVuZGVyID0gKHN0ZXBzLCBwcm9wcykgPT4ge1xuICBpZiAoc3RlcHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIDxTZWxlY3RBY3Rpb25BZGQgey4uLnByb3BzfSAvPjtcbiAgfVxuICBjb25zdCBsYXN0U3RlcCA9IHN0ZXBzW3N0ZXBzLmxlbmd0aCAtIDFdO1xuICBzd2l0Y2ggKGxhc3RTdGVwLnN0ZXBJZCkge1xuICAgIGNhc2UgU0VMRUNUX1dBTlRfVE9fQUREOlxuICAgICAgcmV0dXJuIDxTZWxlY3RBY3Rpb25BZGQgey4uLnByb3BzfSAvPjtcbiAgICBjYXNlIEFERF9DQVRFR09SWTpcbiAgICAgIHJldHVybiA8QWRkQ2F0ZWdvcnkgey4uLnByb3BzfSAvPjtcbiAgICBjYXNlIEFERF9UQVNLOlxuICAgICAgcmV0dXJuIDxBZGRUYXNrIHsuLi5wcm9wc30gb3B0aW9ucz17bGFzdFN0ZXAub3B0aW9uc30gLz47XG4gICAgY2FzZSBTRUxFQ1RfQ0FURUdPUlk6XG4gICAgICByZXR1cm4gPFNlbGVjdENhdGVnb3J5IHsuLi5wcm9wc30gLz47XG4gICAgY2FzZSBTRUxFQ1RfQ09NUExFVEVfREFURTpcbiAgICAgIHJldHVybiA8U2VsZWN0Q29tcGxldGVEYXRlIHsuLi5wcm9wc30gb3B0aW9ucz17bGFzdFN0ZXAub3B0aW9uc30gLz47XG4gICAgY2FzZSBET05FOlxuICAgICAgcmV0dXJuIDxEb25lIHsuLi5wcm9wc30gLz47XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiA8U2VsZWN0QWN0aW9uQWRkIHsuLi5wcm9wc30gLz47XG4gIH1cbn07XG5cbmNvbnN0IGluaXRhbFN0YXRlID0ge1xuICBuZXh0U3RlcHM6IFtdLFxuICBzdGVwczogW1xuICAgIHtcbiAgICAgIHN0ZXBJZDogU0VMRUNUX1dBTlRfVE9fQURELFxuICAgICAgb3B0aW9uczoge30sXG4gICAgfSxcbiAgXSxcbiAgc2hvd1N0ZXA6IHRydWUsXG59O1xuXG5jbGFzcyBEaWFsb2dBZGQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLi4uaW5pdGFsU3RhdGUsXG4gICAgfTtcbiAgICB0aGlzLm9uQmFjayA9IHRoaXMub25CYWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbk5leHQgPSB0aGlzLm9uTmV4dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25SZXNldEFuZENsb3NlID0gdGhpcy5vblJlc2V0QW5kQ2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQW5pbWF0aW9uRW5kID0gdGhpcy5vbkFuaW1hdGlvbkVuZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25CYWNrKCkge1xuICAgIGNvbnN0IHsgc3RlcHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvbkNsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHN0ZXBDb3VudCA9IHN0ZXBzLmxlbmd0aDtcbiAgICBpZiAoc3RlcENvdW50ID09PSAxKSB7XG4gICAgICAvLyBSZXR1cm5lZCB0byB0aGUgZmlyc3Qgc3RlcHMsIGNsb3NlIHRoZSBkaWFsb2dcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi5pbml0YWxTdGF0ZSB9KTtcbiAgICAgIG9uQ2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5leHRTdGVwczogW1xuICAgICAgICAgIC4uLnN0ZXBzLnNsaWNlKDAsIHN0ZXBzLmxlbmd0aCAtIDEpLFxuICAgICAgICBdLFxuICAgICAgICBzaG93U3RlcDogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbk5leHQoc3RlcCA9IHsgc3RlcElkOiAnJywgb3B0aW9uczoge30gfSkge1xuICAgIGNvbnN0IHsgc3RlcHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZXh0U3RlcHM6IFtcbiAgICAgICAgLi4uc3RlcHMsIHtcbiAgICAgICAgICAuLi5zdGVwLFxuICAgICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHNob3dTdGVwOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIG9uUmVzZXRBbmRDbG9zZSgpIHtcbiAgICBjb25zdCB7IG9uQ2xvc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgb25DbG9zZSgpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLmluaXRhbFN0YXRlIH0pO1xuICAgIH0sIDUwMCk7XG4gIH1cblxuICBvbkFuaW1hdGlvbkVuZChub2RlLCBkb25lKSB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgKCkgPT4ge1xuICAgICAgZG9uZSgpO1xuICAgICAgY29uc3QgeyBuZXh0U3RlcHMsIHNob3dTdGVwIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgaWYgKHNob3dTdGVwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzdGVwczogW1xuICAgICAgICAgIC4uLm5leHRTdGVwcyxcbiAgICAgICAgXSxcbiAgICAgICAgc2hvd1N0ZXA6IHRydWUsXG4gICAgICB9KTtcbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBzdGVwcywgc2hvd1N0ZXAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvbkNsb3NlLCBvcGVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgb25OZXh0LCBvblJlc2V0QW5kQ2xvc2UsIG9uQW5pbWF0aW9uRW5kIH0gPSB0aGlzO1xuICAgIHJldHVybiAoXG4gICAgICA8RGlhbG9nQW5pbSBpbj17b3Blbn0+XG4gICAgICAgIDxkaXYgaWQ9XCJkaWFsb2ctYWRkXCIgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlhbG9nLWhlYWRlclwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cIm1haW4tY2xvc2UtYnV0dG9uXCIgb25DbGljaz17KCkgPT4gb25DbG9zZSgpfT5cbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj4mI3hFNUNEOzwvaT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcHMtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8U3RlcHNcbiAgICAgICAgICAgICAgbGlzdD17c3RlcExpc3R9XG4gICAgICAgICAgICAgIHN0ZXBIaXN0b3J5PXtzdGVwc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaWFsb2ctY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8UmVwbGFjZUFuaW0gaW49e3Nob3dTdGVwfSBlbmRMaXN0ZW5lcj17b25BbmltYXRpb25FbmR9PlxuICAgICAgICAgICAgICB7Z2V0Q29udGVudFRvUmVuZGVyKHN0ZXBzLCB7IG9uTmV4dCwgb25DbG9zZTogb25SZXNldEFuZENsb3NlIH0pfVxuICAgICAgICAgICAgPC9SZXBsYWNlQW5pbT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpYWxvZy1mb290ZXJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgaWQ9XCJiYWNrLWJ1dHRvbi1kaWFsb2dcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMub25CYWNrKCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtsYWJlbHMuYnV0dG9uQmFja31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvRGlhbG9nQW5pbT5cbiAgICApO1xuICB9XG59XG5cbkRpYWxvZ0FkZC5wcm9wVHlwZXMgPSB7XG4gIG9wZW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaWFsb2dBZGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5cbmNsYXNzIERvbmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHsgb25DbG9zZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgIG9uQ2xvc2UoKTtcbiAgICB9LCAzMDAwKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWRvbmUtYWRkXCI+XG4gICAgICAgIDxoMj57bGFiZWxzLmxhYmVsRG9uZX08L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtaWMtZG9uZVwiPlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz1cIi4vY2xpZW50L3B1YmxpYy9pbWcvaWMtZG9uZS5zdmdcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaWMtZG9uZVwiXG4gICAgICAgICAgICBhbHQ9XCJkb25lIGljb25cIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Eb25lLnByb3BUeXBlcyA9IHtcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERvbmU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHsgQUREX0NBVEVHT1JZLCBTRUxFQ1RfQ0FURUdPUlkgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi9jb25zdGFudHMvbGFiZWxzJztcblxuY29uc3QgU2VsZWN0QWN0aW9uQWRkID0gKHsgb25OZXh0IH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LXNlbGVjdC1hY3Rpb24tYWRkXCI+XG4gICAgPGgyPntsYWJlbHMudGl0bGVBZGR9PC9oMj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW0tc2VsZWN0XCI+XG4gICAgICA8cFxuICAgICAgICBjbGFzc05hbWU9XCJzZWxlY3QtdGl0bGVcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk5leHQoeyBzdGVwSWQ6IEFERF9DQVRFR09SWSwgb3B0aW9uczoge30gfSl9XG4gICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgPlxuICAgICAgICB7bGFiZWxzLmxhYmVsQ2F0ZWdvcnl9XG4gICAgICA8L3A+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtLXNlbGVjdFwiPlxuICAgICAgPHBcbiAgICAgICAgY2xhc3NOYW1lPVwic2VsZWN0LXRpdGxlXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4gb25OZXh0KHsgc3RlcElkOiBTRUxFQ1RfQ0FURUdPUlksIG9wdGlvbnM6IHt9IH0pfVxuICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgID5cbiAgICAgICAge2xhYmVscy5sYWJlbFRhc2t9XG4gICAgICA8L3A+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuU2VsZWN0QWN0aW9uQWRkLnByb3BUeXBlcyA9IHtcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0QWN0aW9uQWRkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IENhdGVnb3J5IGZyb20gJy4uL0NhdGVnb3J5JztcbmltcG9ydCB7IEFERF9UQVNLIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5cbmNsYXNzIFNlbGVjdENhdGVnb3J5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlbGVjdGVkQ2F0ZWdvcnk6IHVuZGVmaW5lZCxcbiAgICB9O1xuICAgIHRoaXMub25DYXRlZ29yeUNsaWNrID0gdGhpcy5vbkNhdGVnb3J5Q2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQnV0dG9uTmV4dENsaWNrID0gdGhpcy5vbkJ1dHRvbk5leHRDbGljay5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25DYXRlZ29yeUNsaWNrKGNhdGVnb3J5KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkQ2F0ZWdvcnk6IGNhdGVnb3J5IH0pO1xuICB9XG5cbiAgb25CdXR0b25OZXh0Q2xpY2soKSB7XG4gICAgY29uc3QgeyBzZWxlY3RlZENhdGVnb3J5IH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgb25OZXh0LCBkaXNwYXRjaCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoc2VsZWN0ZWRDYXRlZ29yeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ1NlbGVjdENhdGVnb3J5KSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9uTmV4dCh7IHN0ZXBJZDogQUREX1RBU0ssIG9wdGlvbnM6IHsgc2VsZWN0ZWRDYXRlZ29yeSB9IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2F0ZWdvcmllc0xpc3QgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBzZWxlY3RlZENhdGVnb3J5IH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtc2VsZWN0LWNhdGVnb3J5XCI+XG4gICAgICAgIDxoMj57bGFiZWxzLnRpdGxlQ2hvb3NlQ2F0ZWdvcnl9PC9oMj5cbiAgICAgICAgPGRpdiBpZD1cImNvbnRlbnQtY2F0ZWdvcmllc1wiPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNhdGVnb3JpZXNMaXN0Lm1hcChjYXRlZ29yeSA9PiAoXG4gICAgICAgICAgICAgIChjYXRlZ29yeS5pZCAhPT0gJzAnKVxuICAgICAgICAgICAgICA/IDxDYXRlZ29yeVxuICAgICAgICAgICAgICAgIGtleT17Y2F0ZWdvcnkuaWR9XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk9e2NhdGVnb3J5fVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtzZWxlY3RlZENhdGVnb3J5ICE9PSB1bmRlZmluZWQgJiYgY2F0ZWdvcnkuaWQgPT09IHNlbGVjdGVkQ2F0ZWdvcnkuaWR9XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNhdGVnb3J5Q2xpY2t9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICApKVxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1idXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkJ1dHRvbk5leHRDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGFiZWxzLmJ1dHRvbk5leHR9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TZWxlY3RDYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjYXRlZ29yaWVzTGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3AgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICBjYXRlZ29yaWVzTGlzdDogc3RhdGUudG9kb0ZpbHRlcnMuY2F0ZWdvcmllcyxcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcCkoU2VsZWN0Q2F0ZWdvcnkpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IERhdGVQaWNrZXIgZnJvbSAncmVhY3QtZGF0ZS1waWNrZXInO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IHsgRE9ORSB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgeyBhZGRUYXNrIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy90b2RvVGFza3NBY3Rpb25zJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5jbGFzcyBTZWxlY3RDb21wbGV0ZURhdGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdG9kb1dpdGhpbjogbmV3IERhdGUoKSxcbiAgICB9O1xuICAgIHRoaXMub25JbnB1dERhdGVDaGFuZ2UgPSB0aGlzLm9uSW5wdXREYXRlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkJ1dHRvbkFkZENsaWNrID0gdGhpcy5vbkJ1dHRvbkFkZENsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblRvZG9UYXNrQ3JlYXRlZCA9IHRoaXMub25Ub2RvVGFza0NyZWF0ZWQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uSW5wdXREYXRlQ2hhbmdlKGRhdGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgdG9kb1dpdGhpbjogZGF0ZSB9KTtcbiAgfVxuXG4gIG9uQnV0dG9uQWRkQ2xpY2soKSB7XG4gICAgY29uc3QgeyB0b2RvV2l0aGluIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgZGlzcGF0Y2gsIG9wdGlvbnMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyB0aXRsZSwgZGVzY3JpcHRpb24sIGNhdGVnb3J5IH0gPSBvcHRpb25zO1xuICAgIGlmICghdG9kb1dpdGhpbiB8fCB0b2RvV2l0aGluID09PSAnJykge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VJbmZvKGxhYmVscy5tc2dTZWxlY3REYXRlKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRpc3BhdGNoKGFkZFRhc2soXG4gICAgICB0aXRsZSwgZGVzY3JpcHRpb24sXG4gICAgICBjYXRlZ29yeSwgdG9kb1dpdGhpbiwgdGhpcy5vblRvZG9UYXNrQ3JlYXRlZCxcbiAgICApKTtcbiAgfVxuXG4gIG9uVG9kb1Rhc2tDcmVhdGVkKCkge1xuICAgIGNvbnN0IHsgb25OZXh0IH0gPSB0aGlzLnByb3BzO1xuICAgIG9uTmV4dCh7IHN0ZXBJZDogRE9ORSwgb3B0aW9uczogeyB9IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgdG9kb1dpdGhpbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LXNlbGVjdC1jb21wbGV0ZS1kYXRlXCI+XG4gICAgICAgIDxoMj57bGFiZWxzLnRpdGxlVG9kb1dpdGhpbn08L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtaW5wdXRcIj5cbiAgICAgICAgICA8RGF0ZVBpY2tlclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICBjYWxlbmRhckNsYXNzTmFtZT1cImRhcmstY2FsZW5kYXJcIlxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dERhdGVDaGFuZ2V9XG4gICAgICAgICAgICB2YWx1ZT17dG9kb1dpdGhpbn1cbiAgICAgICAgICAgIG1pbkRhdGU9e25ldyBEYXRlKCl9XG4gICAgICAgICAgICBsb2NhbGU9XCJlbi1VU1wiXG4gICAgICAgICAgICBjbGVhckljb249ezxpIGNsYXNzTmFtZT1cImljb24tZGVsZXRlXCIgLz59XG4gICAgICAgICAgICBjYWxlbmRhckljb249ezxpIGNsYXNzTmFtZT1cImljb24tY2FsZW5kYXJcIiAvPn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQnV0dG9uQWRkQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xhYmVscy5idXR0b25BZGR9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TZWxlY3RDb21wbGV0ZURhdGUucHJvcFR5cGVzID0ge1xuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb3B0aW9uczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY2F0ZWdvcnk6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIH0pLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoKShTZWxlY3RDb21wbGV0ZURhdGUpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IFN0ZXAgPSAoeyBkZXNjcmlwdGlvbiwgY29tcGxldGVkLCBuZWVkTGluZSB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1jb250YWluZXJcIj5cbiAgICB7XG4gICAgICBuZWVkTGluZSAmJlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BsaW5lICR7KGNvbXBsZXRlZCkgPyAnY29tcGxldGVkJyA6ICcnfWB9IC8+XG4gICAgfVxuICAgIDxkaXYgY2xhc3NOYW1lPXtgc3RlcCAkeyhjb21wbGV0ZWQpID8gJ2NvbXBsZXRlZCcgOiAnJ31gfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5kaWNhdG9yXCIgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1kZXNjcmlwdGlvblwiPlxuICAgICAgICA8cD57ZGVzY3JpcHRpb259PC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuU3RlcC5wcm9wVHlwZXMgPSB7XG4gIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgbmVlZExpbmU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5jb25zdCBTdGVwcyA9ICh7IGxpc3QsIHN0ZXBIaXN0b3J5IH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJzdGVwcy13cmFwcGVyXCI+XG4gICAge1xuICAgICAgbGlzdC5tYXAoKGl0ZW0sIGkpID0+IChcbiAgICAgICAgPFN0ZXBcbiAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgey4uLml0ZW19XG4gICAgICAgICAgY29tcGxldGVkPXtzdGVwSGlzdG9yeS5maWx0ZXIoc2ggPT4gc2guc3RlcElkID09PSBpdGVtLmlkKS5sZW5ndGggPiAwfVxuICAgICAgICAgIG5lZWRMaW5lPXtpID4gMH1cbiAgICAgICAgLz4pKVxuICAgIH1cbiAgPC9kaXY+XG4pO1xuXG5TdGVwcy5wcm9wVHlwZXMgPSB7XG4gIGxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICBzdGVwSGlzdG9yeTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBzdGVwSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH0pKS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3RlcHM7XG4iLCJjb25zdCBsYWJlbHMgPSB7XG4gIHRpdGxlQWRkOiAnV2hhdCB3b3VsZCB5b3UgbGlrZSB0byBhZGQ/JyxcbiAgdGl0bGVBZGRDYXRlZ29yeTogJ0FkZCBuZXcgQ0FURUdPUlknLFxuICB0aXRsZUFkZFRhc2s6ICdBZGQgbmV3IFRhc2snLFxuICB0aXRsZUNob29zZUNhdGVnb3J5OiAnQ2hvb3NlIGEgQ0FURUdPUlknLFxuICB0aXRsZVRvZG9XaXRoaW46ICdUb2RvIFdpdGhpbicsXG4gIGxhYmVsRm9yQ2F0ZWdvcnk6ICdmb3IgdGhlIGNhdGVnb3J5OicsXG4gIGxhYmVsRG9uZTogJ0RvbmUhJyxcbiAgbGFiZWxDYXRlZ29yeTogJ0NBVEVHT1JZJyxcbiAgbGFiZWxUYXNrOiAnVEFTSycsXG4gIGxhYmVsTm90U2V0OiAnbm90IHNldCcsXG4gIGxhYmVsTm9EZXNjcmlwdGlvbjogJ05vIGRlc2NyaXB0aW9uIHRvIHNob3cgOignLFxuICBsYWJlbFBhcnRpYWxDb21wbGV0ZWQ6ICdjb21wbGV0ZWQnLFxuICBsYWJlbFBhcnRpYWxUb0NvbXBsZXRlZDogJ3RvIGNvbXBsZXRlIHdpdGhpbicsXG4gIHBsYWNlSG9sZGVyVGl0bGU6ICdUeXBlIHRoZSB0aXRsZScsXG4gIHBsYWNlSG9sZGVyRGVzY3JpcHRpb246ICdUeXBlIHRoZSBkZXNjcmlwdGlvbicsXG4gIHBsYWNlaG9sZGVyTmFtZTogJ1R5cGUgdGhlIG5hbWUnLFxuICBidXR0b25TY2hlZHVsZTogJ1NDSEVEVUxFJyxcbiAgYnV0dG9uQWRkOiAnQUREJyxcbiAgYnV0dG9uTmV4dDogJ05FWFQnLFxuICBidXR0b25CYWNrOiAnTkVWRVIgTUlORCwgR08gQkFDSycsXG4gIG1zZ1RpdGxlUmVxdWlyZWQ6ICdFbnRlciB0aGUgdGl0bGUnLFxuICBtc2dOYW1lUmVxdWlyZWQ6ICdFbnRlciB0aGUgbmFtZScsXG4gIG1zZ1NlbGVjdENhdGVnb3J5OiAnU2VsZWN0IGEgY2F0ZWdvcnknLFxuICBtc2dTZWxlY3REYXRlOiAnUGljayBhIGRhdGUgYW5kIGNvbW1pdC4gTm8gZXhjdXNlcyEnLFxuICBzdGVwRGVzY1dhbnRUb0FkZDogJ1doYXQgd2FudCB0byBhZGQnLFxuICBzdGVwRGVzY0FkZENhdGVnb3J5OiAnQWRkIGEgY2F0ZWdvcnknLFxuICBzdGVwRGVzY3JTZWxlY0NhdGVnb3J5OiAnU2VsZWN0IGEgY2F0ZWdvcnknLFxuICBzdGVwRGVzY0FkZFRhc2s6ICdBZGQgdGFzaycsXG4gIHN0ZXBEZXNjQ29tcGxldGVEYXRlOiAnU2NoZWR1bGUnLFxuICBzdGVwRGVzY0RvbmU6ICdUaGF0XFwncyBpdCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBsYWJlbHM7XG4iLCJpbXBvcnQgbGFiZWxzIGZyb20gJy4vbGFiZWxzJztcblxuZXhwb3J0IGNvbnN0IFNFTEVDVF9XQU5UX1RPX0FERCA9ICdTRUxFQ1RfV0FOVF9UT19BREQnO1xuZXhwb3J0IGNvbnN0IEFERF9DQVRFR09SWSA9ICdBRERfQ0FURUdPUlknO1xuZXhwb3J0IGNvbnN0IEFERF9UQVNLID0gJ0FERF9UQVNLJztcbmV4cG9ydCBjb25zdCBTRUxFQ1RfQ0FURUdPUlkgPSAnU0VMRUNUX0NBVEVHT1JZJztcbmV4cG9ydCBjb25zdCBTRUxFQ1RfQ09NUExFVEVfREFURSA9ICdTRUxFQ1RfQ09NUExFVEVfREFURSc7XG5leHBvcnQgY29uc3QgRE9ORSA9ICdET05FJztcblxuZXhwb3J0IGNvbnN0IHN0ZXBMaXN0ID0gW1xuICB7XG4gICAgaWQ6IFNFTEVDVF9XQU5UX1RPX0FERCxcbiAgICBkZXNjcmlwdGlvbjogbGFiZWxzLnN0ZXBEZXNjV2FudFRvQWRkLFxuICB9LFxuICB7XG4gICAgaWQ6IEFERF9DQVRFR09SWSxcbiAgICBkZXNjcmlwdGlvbjogbGFiZWxzLnN0ZXBEZXNjQWRkQ2F0ZWdvcnksXG4gIH0sXG4gIHtcbiAgICBpZDogU0VMRUNUX0NBVEVHT1JZLFxuICAgIGRlc2NyaXB0aW9uOiBsYWJlbHMuc3RlcERlc2NyU2VsZWNDYXRlZ29yeSxcbiAgfSxcbiAge1xuICAgIGlkOiBBRERfVEFTSyxcbiAgICBkZXNjcmlwdGlvbjogbGFiZWxzLnN0ZXBEZXNjQWRkVGFzayxcbiAgfSxcbiAge1xuICAgIGlkOiBTRUxFQ1RfQ09NUExFVEVfREFURSxcbiAgICBkZXNjcmlwdGlvbjogbGFiZWxzLnN0ZXBEZXNjQ29tcGxldGVEYXRlLFxuICB9LFxuICB7XG4gICAgaWQ6IERPTkUsXG4gICAgZGVzY3JpcHRpb246IGxhYmVscy5zdGVwRGVzY0RvbmUsXG4gIH0sXG5dO1xuIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBDYXRlZ29yaWVzRmlsdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvQ2F0ZWdvcmllc0ZpbHRlcic7XG5pbXBvcnQge1xuICBzZWxlY3RDYXRlZ29yeSxcbiAgc2VsZWN0Q2F0ZWdvcnlBbGwsXG4gIGRlbGV0ZUNhdGVnb3J5LFxufSBmcm9tICcuLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5pbXBvcnQgY2F0ZWdvcnlBbGwgZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmltcG9ydCB7IGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0IH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgY2F0ZWdvcnlMaXN0OiBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdChzdGF0ZSksXG4gIH1cbik7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcbiAge1xuICAgIG9uRGVsZXRlQ2F0ZWdvcnk6IChjYXRlZ29yeSkgPT4ge1xuICAgICAgZGlzcGF0Y2goZGVsZXRlQ2F0ZWdvcnkoY2F0ZWdvcnkuaWQpKTtcbiAgICB9LFxuICAgIG9uQ2lsY2tDYXRlZ29yeTogKGNhdGVnb3J5LCBlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnaScgJiYgZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnYnV0dG9uJykge1xuICAgICAgICBpZiAoY2F0ZWdvcnkuaWQgPT09IGNhdGVnb3J5QWxsLmlkKSB7XG4gICAgICAgICAgZGlzcGF0Y2goc2VsZWN0Q2F0ZWdvcnlBbGwoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGlzcGF0Y2goc2VsZWN0Q2F0ZWdvcnkoY2F0ZWdvcnkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gIH1cbik7XG5cbmNvbnN0IENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIgPSBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbikoQ2F0ZWdvcmllc0ZpbHRlcik7XG5cbmV4cG9ydCBkZWZhdWx0IENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXI7XG4iLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFRhc2tzIGZyb20gJy4uL2NvbXBvbmVudHMvVGFza3MnO1xuaW1wb3J0IHtcbiAgZmV0Y2hUYXNrc0J5Q2F0ZWdvcnksXG4gIGRlbGV0ZVRhc2ssXG4gIHRvb2dsZVRhc2tDb21wbGV0ZWQsXG59IGZyb20gJy4uL2FjdGlvbnMvdG9kb1Rhc2tzQWN0aW9ucyc7XG5cbmltcG9ydCB7IGdldFRhc2tMaXN0LCBnZXRTa2lwLCBzdGlsbE1vcmVUb0xvYWQgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb1Rhc2tzU2VsZWN0b3JzJztcbmltcG9ydCB7IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkLCB2aXNpYmlsaXR5T25seUNvbXBsZXRlZCB9IGZyb20gJy4uL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IChcbiAge1xuICAgIHRhc2tMaXN0OiBnZXRUYXNrTGlzdChzdGF0ZSksXG4gICAgc2tpcDogZ2V0U2tpcChzdGF0ZSksXG4gICAgbW9yZVRvTG9hZDogc3RpbGxNb3JlVG9Mb2FkKHN0YXRlKSxcbiAgICBjYXRlZ29yaWVzSWQ6IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkKHN0YXRlKSxcbiAgICBjb21wbGV0ZWQ6IHZpc2liaWxpdHlPbmx5Q29tcGxldGVkKHN0YXRlKSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgb25EZWxldGVUYXNrOiAodGFzaykgPT4ge1xuICAgICAgZGlzcGF0Y2goZGVsZXRlVGFzayh0YXNrLmlkKSk7XG4gICAgfSxcbiAgICBvbkNvbXBsZXRlVGFzazogKHRhc2spID0+IHtcbiAgICAgIGRpc3BhdGNoKHRvb2dsZVRhc2tDb21wbGV0ZWQodGFzay5pZCwgdGFzay5jb21wbGV0ZWQpKTtcbiAgICB9LFxuICAgIGZldGNoVGFza3M6IChjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCwgbGltaXQsIHNraXApID0+IHtcbiAgICAgIGRpc3BhdGNoKGZldGNoVGFza3NCeUNhdGVnb3J5KGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgc2tpcCkpO1xuICAgIH0sXG4gIH1cbik7XG5cbmNvbnN0IFRhc2tzQ29udGFpbmVyID0gY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pKFRhc2tzKTtcblxuZXhwb3J0IGRlZmF1bHQgVGFza3NDb250YWluZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IFRvZG9zIGZyb20gJy4uL2NvbXBvbmVudHMvVG9kb3MnO1xuaW1wb3J0IHsgZmV0Y2hBbGxDYXRlZ29yaWVzIH0gZnJvbSAnLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuaW1wb3J0IHsgaGlkZU1lc3NhZ2UgfSBmcm9tICcuLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcbmltcG9ydCB7IHNob3dMb2FkaW5nIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbW1vblNlbGVjdG9ycyc7XG5cbmNvbnN0IFRvZG9zQ29udGFpbmVyID0gcHJvcHMgPT4gPFRvZG9zIHsuLi5wcm9wc30gLz47XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IChcbiAge1xuICAgIG1lc3NhZ2U6IHN0YXRlLm1lc3NhZ2UsXG4gICAgc2hvd0xvYWRpbmc6IHNob3dMb2FkaW5nKHN0YXRlKSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgaGlkZU1lc3NhZ2U6ICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKGhpZGVNZXNzYWdlKCkpO1xuICAgIH0sXG4gICAgaW5pdEZldGNoQWxsQ2F0ZWdvcmllczogKCkgPT4ge1xuICAgICAgZGlzcGF0Y2goZmV0Y2hBbGxDYXRlZ29yaWVzKCkpO1xuICAgIH0sXG4gIH1cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFRvZG9zQ29udGFpbmVyKTtcbiIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlzaWJpbGl0eUZpbHRlcnMgZnJvbSAnLi4vY29tcG9uZW50cy9WaXNpYmlsaXR5RmlsdGVycyc7XG5pbXBvcnQgeyBjaGFuZ2VWaXNpYmlsaXR5IH0gZnJvbSAnLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuXG5pbXBvcnQgeyBnZXRWaXNpYmlsaXR5RmlsdGVyIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyOiBnZXRWaXNpYmlsaXR5RmlsdGVyKHN0YXRlKSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgb25WaXNpYmlsaXR5U3dpdGNoQ2xpY2s6IHZpc2liaWxpdHkgPT4gKCkgPT4gKFxuICAgICAgZGlzcGF0Y2goY2hhbmdlVmlzaWJpbGl0eSh2aXNpYmlsaXR5KSlcbiAgICApLFxuICB9XG4pO1xuXG5jb25zdCBWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyID0gY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pKFZpc2liaWxpdHlGaWx0ZXJzKTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lcjtcbiIsImltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHsgaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIgfSBmcm9tICcuL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcbmltcG9ydCB7IGlzRmV0Y2hpbmdUYXNrcyB9IGZyb20gJy4vdG9kb1Rhc2tzU2VsZWN0b3JzJztcblxuZXhwb3J0IGNvbnN0IHNob3dMb2FkaW5nID0gY3JlYXRlU2VsZWN0b3IoXG4gIGlzRmV0Y2hpbmdDYXRlZ29yaWVzRmlsdGVyLFxuICBpc0ZldGNoaW5nVGFza3MsXG4gIChpc0ZldGNoaW5nQ2F0ZWdvcmllcywgaXNGZXRjaGluZ1RvZG9zKSA9PiBpc0ZldGNoaW5nQ2F0ZWdvcmllcyB8fCBpc0ZldGNoaW5nVG9kb3MsXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBzaG93TG9hZGluZztcbiIsImltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHsgT05MWV9DT01QTEVURUQgfSBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcblxuZXhwb3J0IGNvbnN0IGlzRmV0Y2hpbmdDYXRlZ29yaWVzRmlsdGVyID0gc3RhdGUgPT4gc3RhdGUudG9kb0ZpbHRlcnMuaXNGZXRjaGluZztcbmV4cG9ydCBjb25zdCBnZXRUb2RvRmlsdGVycyA9IHN0YXRlID0+IHN0YXRlLnRvZG9GaWx0ZXJzO1xuZXhwb3J0IGNvbnN0IGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0ID0gc3RhdGUgPT4gc3RhdGUudG9kb0ZpbHRlcnMuY2F0ZWdvcmllcztcbmV4cG9ydCBjb25zdCBnZXRWaXNpYmlsaXR5RmlsdGVyID0gc3RhdGUgPT4gc3RhdGUudG9kb0ZpbHRlcnMudmlzaWJpbGl0eTtcblxuZXhwb3J0IGNvbnN0IHZpc2liaWxpdHlPbmx5Q29tcGxldGVkID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldFZpc2liaWxpdHlGaWx0ZXIsXG4gIHZpc2liaWxpdHkgPT4gdmlzaWJpbGl0eSA9PT0gT05MWV9DT01QTEVURUQsXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzRmlsdGVyID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0LFxuICBjYXRlZ29yaWVzID0+IGNhdGVnb3JpZXMuZmlsdGVyKGNhdGVnb3J5ID0+IGNhdGVnb3J5LnNlbGVjdGVkKSxcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRTZWxlY3RlZENhdGVnb3JpZXNJZCA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdCxcbiAgY2F0ZWdvcmllcyA9PiBjYXRlZ29yaWVzLmZpbHRlcihjYXRlZ29yeSA9PiBjYXRlZ29yeS5zZWxlY3RlZClcbiAgICAubWFwKGNhdGVnb3J5RmlsdGVyID0+IGNhdGVnb3J5RmlsdGVyLmlkKSxcbik7XG4iLCJleHBvcnQgY29uc3QgaXNGZXRjaGluZ1Rhc2tzID0gc3RhdGUgPT4gc3RhdGUudG9kb1Rhc2tzLmlzRmV0Y2hpbmc7XG5leHBvcnQgY29uc3QgZ2V0VGFza3MgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvVGFza3M7XG5leHBvcnQgY29uc3QgZ2V0VGFza0xpc3QgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvVGFza3MuaXRlbXM7XG5leHBvcnQgY29uc3QgZ2V0U2tpcCA9IHN0YXRlID0+IHN0YXRlLnRvZG9UYXNrcy5za2lwO1xuZXhwb3J0IGNvbnN0IHN0aWxsTW9yZVRvTG9hZCA9IHN0YXRlID0+IHN0YXRlLnRvZG9UYXNrcy5tb3JlVG9Mb2FkO1xuIiwiaW1wb3J0IGRhdGVGb3JtYXQgZnJvbSAnZGF0ZWZvcm1hdCc7XG5cbmV4cG9ydCBjb25zdCB0b0pzRGF0ZSA9IChwYXJzZURhdGUgPSAnJykgPT5cbiAgbmV3IERhdGUocGFyc2VJbnQocGFyc2VEYXRlLnN1YnN0cig2KSwgMTApKTtcblxuZXhwb3J0IGNvbnN0IHRvU2ltcGxlRGF0ZUZvcm1hdCA9IGRhdGUgPT5cbiAgZGF0ZUZvcm1hdChkYXRlLCAnZGRkZCBkZCBtbW0geXl5eScpO1xuXG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudEJhc2VVcmwgPSAoKSA9PiB7XG4gIGNvbnN0IGdldFVybCA9IHdpbmRvdy5sb2NhdGlvbjtcbiAgcmV0dXJuIGAke2dldFVybC5wcm90b2NvbH0vLyR7Z2V0VXJsLmhvc3R9YDtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9