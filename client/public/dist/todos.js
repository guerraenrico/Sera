(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["todos"],{

/***/ "./src/actions/messageActions.js":
/*!***************************************!*\
  !*** ./src/actions/messageActions.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideMessage = exports.showMessageError = exports.showMessageInfo = undefined;

var _actionTypes = __webpack_require__(/*! ../constants/actionTypes */ "./src/constants/actionTypes.js");

var showMessageInfo = exports.showMessageInfo = function showMessageInfo(message) {
  return {
    type: _actionTypes.SHOW_MESSAGE_INFO,
    message: message
  };
};

var showMessageError = exports.showMessageError = function showMessageError(message) {
  return {
    type: _actionTypes.SHOW_MESSAGE_ERROR,
    message: message
  };
};

var hideMessage = exports.hideMessage = function hideMessage() {
  return {
    type: _actionTypes.HIDE_MESSAGE
  };
};

/***/ }),

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
      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch(requestFetchAllCategories());
              _context.prev = 1;
              _context.next = 4;
              return (0, _ApiUtils.callApi)('categories', { limit: limit, skip: skip }, _ApiUtils.Methods.GET);

            case 4:
              response = _context.sent;

              if (response.success) {
                dispatch(receiveFetchAllCategories(response.data));
                dispatch((0, _todoTasksActions.fetchTasksByCategory)((0, _todoFiltersSelectors.getSelectedCategoriesId)(getState())));
              } else {
                dispatch(errorFetchAllCategories(response.messageError));
              }
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](1);

              dispatch((0, _messageActions.showMessageError)(_context.t0.message));

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[1, 8]]);
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
      var response, categories, categoryIndex;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return (0, _ApiUtils.callApi)('categories', categoryId, _ApiUtils.Methods.DELETE);

            case 3:
              response = _context2.sent;

              if (response.success) {
                categories = getState().todoFilters.categories;
                categoryIndex = categories.findIndex(function (category) {
                  return category.id === categoryId;
                });

                dispatch(removeCategoryLocal(categoryIndex));
              } else {
                dispatch((0, _messageActions.showMessageError)(response.messageError));
              }
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2['catch'](0);

              dispatch((0, _messageActions.showMessageError)(_context2.t0.message));

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 7]]);
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
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch) {
      var response;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return (0, _ApiUtils.callApi)('categories', { name: name }, _ApiUtils.Methods.POST);

            case 3:
              response = _context3.sent;

              if (response.success) {
                dispatch(addCategoryLocal(response.data));
                if (callback !== undefined) {
                  callback(response.data);
                }
              } else {
                dispatch((0, _messageActions.showMessageError)(response.messageError));
              }
              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3['catch'](0);

              dispatch((0, _messageActions.showMessageError)(_context3.t0.message));

            case 10:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 7]]);
    }));

    return function (_x10) {
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
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
      var response, todos;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch(requestFetchTasks(limit, skip));
              _context.next = 3;
              return (0, _ApiUtils.callApi)('tasks', {
                categoriesId: categoriesId, completed: completed, limit: limit, skip: skip
              }, _ApiUtils.Methods.GET);

            case 3:
              response = _context.sent;

              if (response.success) {
                todos = response.data.map(function (todo) {
                  return _extends({}, todo, {
                    completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined,
                    todoWithin: todo.todoWithin ? new Date(todo.todoWithin) : undefined
                  });
                });

                dispatch(receiveFetchTasks(todos));
              } else {
                dispatch(errorFetchTasks(response.messageError));
              }

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x5) {
      return _ref.apply(this, arguments);
    };
  }();
};

var deleteTask = exports.deleteTask = function deleteTask() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
      var response, items, todoArgumentIndex;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _ApiUtils.callApi)('tasks', id, _ApiUtils.Methods.DELETE);

            case 2:
              response = _context2.sent;

              if (response.success) {
                items = getState().todoTasks.items;
                todoArgumentIndex = items.findIndex(function (todoArgument) {
                  return todoArgument.id === id;
                });

                dispatch(removeTaskLocal(todoArgumentIndex));
              } else {
                dispatch((0, _messageActions.showMessageError)(response.messageError));
              }

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x7, _x8) {
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
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch) {
      var response, todo;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _ApiUtils.callApi)('tasks', {
                title: title,
                description: description,
                categoryId: category.id,
                todoWithin: todoWithin
              }, _ApiUtils.Methods.POST);

            case 2:
              response = _context3.sent;

              if (response.success) {
                todo = _extends({}, response.data, {
                  completedAt: response.data.completedAt ? new Date(response.data.completedAt) : undefined,
                  todoWithin: response.data.todoWithin ? new Date(response.data.todoWithin) : undefined
                });

                dispatch(addTaskLocal(todo));
                if (callback !== undefined) {
                  callback();
                }
              } else {
                dispatch((0, _messageActions.showMessageError)(response.messageError));
              }

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function (_x13) {
      return _ref3.apply(this, arguments);
    };
  }();
};

var toogleTaskCompleted = exports.toogleTaskCompleted = function toogleTaskCompleted() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var isCompleted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch) {
      var completed, completedAt, response, todo;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              completed = !isCompleted;
              completedAt = completed ? new Date() : null;
              _context4.next = 4;
              return (0, _ApiUtils.callApi)('tasks', { id: id, completed: completed, completedAt: completedAt }, _ApiUtils.Methods.PATCH);

            case 4:
              response = _context4.sent;

              if (response.success) {
                todo = _extends({}, response.data, {
                  completedAt: response.data.completedAt ? new Date(response.data.completedAt) : undefined
                });

                dispatch(updateTaskLocal(todo));
              } else {
                dispatch((0, _messageActions.showMessageError)(response.messageError));
              }

            case 6:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function (_x16) {
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
      this.setState({ skip: newSkip });
      fetchTasks(categoriesId, completed, limit, newSkip);
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

/***/ "./src/components/anims/ReplaceAnim.jsx":
/*!**********************************************!*\
  !*** ./src/components/anims/ReplaceAnim.jsx ***!
  \**********************************************/
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
  width: '100%',
  transition: 'opacity ' + duration + 'ms ease-in-out',
  opacity: 0,
  display: 'inherit'
};

var transitionStyles = {
  enter: { opacity: 0 },
  entered: { opacity: 1 }
};

var ReplaceAnim = function ReplaceAnim(_ref) {
  var inProp = _ref.in,
      endListener = _ref.endListener,
      children = _ref.children;
  return _react2.default.createElement(
    _reactTransitionGroup.Transition,
    {
      'in': inProp,
      timeout: duration,
      addEndListener: endListener
    },
    function (state) {
      return _react2.default.createElement(
        'div',
        { style: _extends({}, defaultStyle, transitionStyles[state])
        },
        children
      );
    }
  );
};

ReplaceAnim.propTypes = {
  in: _propTypes2.default.bool.isRequired,
  endListener: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.node.isRequired
};

exports.default = ReplaceAnim;

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
  var props = _objectWithoutProperties(_ref, []),
      children = _ref.children;

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

/***/ "./src/utils/ApiUtils.js":
/*!*******************************!*\
  !*** ./src/utils/ApiUtils.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* eslint quote-props: ["error", "consistent"] */

var Methods = exports.Methods = {
  POST: 'POST',
  GET: 'GET',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
};

var fullUrl = function fullUrl(url) {
  return '/api/' + url;
};

var baseRequestInit = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
};

var createPostRequest = function createPostRequest(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return fetch(url, _extends({}, baseRequestInit, {
    method: 'POST',
    body: JSON.stringify(options)
  }));
};

var createGetRequest = function createGetRequest(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var finalUrl = url + '?';
  Object.entries(options).forEach(function (_ref, poition) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    finalUrl = '' + finalUrl + (poition > 0 ? '&' : '') + key + '=' + value;
  });
  return fetch(finalUrl, _extends({}, baseRequestInit, {
    method: 'GET'
  }));
};

var createDeleteRequest = function createDeleteRequest(url, options) {
  var finalUrl = url + '/' + options;
  return fetch(finalUrl, _extends({}, baseRequestInit, {
    method: 'DELETE'
  }));
};

var createPatchRequest = function createPatchRequest(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return fetch(url, _extends({}, baseRequestInit, {
    method: 'PATCH',
    body: JSON.stringify(options)
  }));
};

var createRequest = function createRequest(url, options, method) {
  var finalUrl = fullUrl(url);
  switch (method) {
    case Methods.POST:
      return createPostRequest(finalUrl, options);
    case Methods.GET:
      return createGetRequest(finalUrl, options);
    case Methods.DELETE:
      return createDeleteRequest(finalUrl, options);
    case Methods.PATCH:
      return createPatchRequest(finalUrl, options);
    default:
      return createPostRequest(finalUrl, options);
  }
};

var callApi = exports.callApi = function callApi(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Methods.POST;
  return createRequest(url, options, method).then(function (response) {
    return response.ok ? response.json() : Promise.reject(response.text());
  }, function (error) {
    return Promise.reject(error);
  });
};

exports.default = callApi;

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
exports.toSimpleDateFormat = exports.toJsDate = undefined;

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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy9tZXNzYWdlQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMvdG9kb1Rhc2tzQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CdXR0b25Db21wbGV0ZVRhc2suanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0J1dHRvbkRlbGV0ZUNhdGVnb3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CdXR0b25EZWxldGVUYXNrLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CdXR0b25TY29sbC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2F0ZWdvcmllc0ZpbHRlci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2F0ZWdvcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0luZmluaXRlU2Nyb2xsLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9NYWluQWRkQnV0dG9uLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9TbmFja2Jhci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVGFzay5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVGFza3MuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1RvZG9zLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9WaXNpYmlsaXR5RmlsdGVycy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVmlzaWJpbGl0eVN3aXRjaC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvQ29sbGFwc2UuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FuaW1zL0RpYWxvZ0FuaW0uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FuaW1zL1JlcGxhY2VBbmltLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9SZXNpemUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FuaW1zL1NuYWNrYmFyQW5pbS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0FkZENhdGVnb3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2dBZGQvQWRkVGFzay5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0RpYWxvZ0FkZC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0RvbmUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9TZWxlY3RBY3Rpb25BZGQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9TZWxlY3RDYXRlZ29yeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL1NlbGVjdENvbXBsZXRlRGF0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL1N0ZXBzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2xhYmVscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL3N0ZXBzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL0NhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL1Rhc2tzQ29udGFpbmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9Ub2Rvc0NvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy9jb21tb25TZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0b3JzL3RvZG9UYXNrc1NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvQXBpVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL0NvbW1vbi5qcyJdLCJuYW1lcyI6WyJzaG93TWVzc2FnZUluZm8iLCJ0eXBlIiwiU0hPV19NRVNTQUdFX0lORk8iLCJtZXNzYWdlIiwic2hvd01lc3NhZ2VFcnJvciIsIlNIT1dfTUVTU0FHRV9FUlJPUiIsImhpZGVNZXNzYWdlIiwiSElERV9NRVNTQUdFIiwiZmV0Y2hUYXNrcyIsInN0YXRlIiwicmVxdWVzdEZldGNoQWxsQ2F0ZWdvcmllcyIsIlJFUVVFU1RfRkVUQ0hfQUxMX0NBVEVHT1JJRVMiLCJyZWNlaXZlRmV0Y2hBbGxDYXRlZ29yaWVzIiwiUkVDRUlWRV9GRVRDSF9BTExfQ0FURUdPUklFUyIsImNhdGVnb3JpZXMiLCJlcnJvckZldGNoQWxsQ2F0ZWdvcmllcyIsIkVSUk9SX0ZFVENIX0FMTF9DQVRFR09SSUVTIiwiZXJyb3IiLCJhZGRDYXRlZ29yeUxvY2FsIiwiQUREX0NBVEVHT1JZX0xPQ0FMIiwiY2F0ZWdvcnkiLCJyZW1vdmVDYXRlZ29yeUxvY2FsIiwiUkVNT1ZFX0NBVEVHT1JZX0xPQ0FMIiwiY2F0ZWdvcnlJbmRleCIsInRvb2dsZVNlbGVjdENhdGVnb3J5IiwiVE9PR0xFX1NFTEVDVF9DQVRFR09SWSIsInNlbGVjdGVkQ2F0ZWdvcnkiLCJ0b29nbGVTZWxlY3RDYXRlZ29yeUFsbCIsIlRPT0dMRV9TRUxFQ1RfQ0FURUdPUllfQUxMIiwic3dpdGNoVmlzaWJpbGl0eUZpbHRlciIsIlNXSVRDSF9WSVNJQklMSVRZX0ZJTFRFUiIsInZpc2liaWxpdHkiLCJmZXRjaEFsbENhdGVnb3JpZXMiLCJsaW1pdCIsInF1ZXJ5SXRlbXNMaW1pdCIsInNraXAiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwiTWV0aG9kcyIsIkdFVCIsInJlc3BvbnNlIiwic3VjY2VzcyIsImRhdGEiLCJtZXNzYWdlRXJyb3IiLCJkZWxldGVDYXRlZ29yeSIsImNhdGVnb3J5SWQiLCJERUxFVEUiLCJ0b2RvRmlsdGVycyIsImZpbmRJbmRleCIsImlkIiwiYWRkQ2F0ZWdvcnkiLCJuYW1lIiwiY2FsbGJhY2siLCJ1bmRlZmluZWQiLCJQT1NUIiwiY2hhbmdlVmlzaWJpbGl0eSIsInNlbGVjdENhdGVnb3J5Iiwic2VsZWN0Q2F0ZWdvcnlBbGwiLCJyZXF1ZXN0RmV0Y2hUYXNrcyIsIlJFUVVFU1RfRkVUQ0hfVEFTS1MiLCJyZWNlaXZlRmV0Y2hUYXNrcyIsIlJFQ0VJVkVfRkVUQ0hfVEFTS1MiLCJ0YXNrcyIsImVycm9yRmV0Y2hUYXNrcyIsIkVSUk9SX0ZFVENIX1RBU0tTIiwiYWRkVGFza0xvY2FsIiwiQUREX1RBU0tfTE9DQUwiLCJ0YXNrIiwicmVtb3ZlVGFza0xvY2FsIiwiUkVNT1ZFX1RBU0tfTE9DQUwiLCJ0YXNrSW5kZXgiLCJ1cGRhdGVUYXNrTG9jYWwiLCJVUERBVEVfVEFTS19MT0NBTCIsImZldGNoVGFza3NCeUNhdGVnb3J5IiwiY2F0ZWdvcmllc0lkIiwiY29tcGxldGVkIiwidG9kb3MiLCJtYXAiLCJ0b2RvIiwiY29tcGxldGVkQXQiLCJEYXRlIiwidG9kb1dpdGhpbiIsImRlbGV0ZVRhc2siLCJpdGVtcyIsInRvZG9UYXNrcyIsInRvZG9Bcmd1bWVudEluZGV4IiwidG9kb0FyZ3VtZW50IiwiYWRkVGFzayIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJ0b29nbGVUYXNrQ29tcGxldGVkIiwiaXNDb21wbGV0ZWQiLCJQQVRDSCIsIkJ1dHRvbkNvbXBsZXRlVGFzayIsIm9uQ2xpY2siLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsImJvb2wiLCJkZWZhdWx0UHJvcHMiLCJCdXR0b25EZWxldGVDYXRlZ29yeSIsIkJ1dHRvbkRlbGV0ZVRhc2siLCJCdXR0b25TY3JvbGwiLCJkaXJlY3Rpb24iLCJvbmVPZiIsIkNhdGVnb3JpZXNGaWx0ZXIiLCJwcm9wcyIsImNoaXBzIiwiaGFuZGxlTGVmdFNjcm9sbENsaWNrIiwiYmluZCIsImhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2siLCJtb3ZlQ2hpcHNTY3JvbGwiLCJjbGllbnRXaWR0aCIsImRlbHRhIiwibmV4dFNjcm9sbExlZnQiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsIiwibGVmdCIsImNhdGVnb3J5TGlzdCIsIm9uRGVsZXRlQ2F0ZWdvcnkiLCJvbkNpbGNrQ2F0ZWdvcnkiLCJub2RlIiwiZGlzcGxheSIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0Iiwic2VsZWN0ZWQiLCJSZWFjdCIsIkNvbXBvbmVudCIsImFycmF5T2YiLCJzaGFwZSIsInN0cmluZyIsIkNhdGVnb3J5Iiwib25EZWxldGUiLCJjc3NDbGFzcyIsIm9uQ2hpcENsaWNrIiwiZSIsIm9uRGVsZXRlQ2xpY2siLCJ3YWl0VGltZSIsIkluZmluaXRlU2Nyb2xsIiwib25TY3JvbGwiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImlubmVySGVpZ2h0Iiwic2Nyb2xsWSIsImRvY3VtZW50IiwiYm9keSIsIm9mZnNldEhlaWdodCIsImFyZ3MiLCJjaGlsZHJlbiIsImNsYXNzTmFtZSIsImFueSIsIk1haW5BZGRCdXR0b24iLCJBY3Rpb24iLCJ0ZXh0IiwiU25hY2tiYXIiLCJvbkNsb3NlIiwiZHVyYXRpb24iLCJzaG93Iiwic2V0VGltZW91dCIsImlzRXJyb3IiLCJhY3Rpb25UZXh0IiwiYWN0aW9uQ2xpY2siLCJ2ZXJ0aWNhbFBvc3Rpb24iLCJob3Jpem9udGFsUG9zaXRpb24iLCJudW1iZXIiLCJUYXNrIiwiY29sbGFwc2VkIiwicmVuZGVyRGF0ZSIsInNldFN0YXRlIiwibGFiZWxzIiwibGFiZWxQYXJ0aWFsQ29tcGxldGVkIiwibGFiZWxQYXJ0aWFsVG9Db21wbGV0ZWQiLCJsYWJlbE5vdFNldCIsIm9uQ29tcGxldGUiLCJvblRpdGxlQ2xpY2siLCJsYWJlbE5vRGVzY3JpcHRpb24iLCJpbml0aWFsU3RhdGUiLCJUYXNrcyIsIm9uRmV0Y2hUb2RvVGFza3NOZXh0IiwibW9yZVRvTG9hZCIsIm5ld1NraXAiLCJ0YXNrTGlzdCIsIm9uRGVsZXRlVGFzayIsIm9uQ29tcGxldGVUYXNrIiwiYXJnIiwibmV4dFByb3BzIiwicHJldlN0YXRlIiwiVG9kb3MiLCJpc0RpYWxvZ0FkZE9wZW4iLCJpbml0RmV0Y2hBbGxDYXRlZ29yaWVzIiwic2hvd0xvYWRpbmciLCJWaXNpYmlsaXR5RmlsdGVyIiwic2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyIiwib25WaXNpYmlsaXR5U3dpdGNoQ2xpY2siLCJPTkxZX1RPX0NPTVBMRVRFIiwiQUxMX1RPRE9TIiwiT05MWV9DT01QTEVURUQiLCJWaXNpYmlsaXR5U3dpdGNoIiwiZGVmYXVsdFN0eWxlIiwidHJhbnNpdGlvbiIsImhlaWdodCIsIm9uRW50ZXIiLCJzdHlsZSIsImZpcnN0RWxlbWVudENoaWxkIiwib25FeGl0IiwiQ29sbGFwc2UiLCJpblByb3AiLCJpbiIsIm9wYWNpdHkiLCJ0cmFuc2l0aW9uU3R5bGVzIiwiZW50ZXJpbmciLCJlbnRlcmVkIiwiRGlhbG9nQW5pbSIsIndpZHRoIiwiZW50ZXIiLCJSZXBsYWNlQW5pbSIsImVuZExpc3RlbmVyIiwiZXhpdCIsIm9uRW50ZXJlZCIsIm9uRXhpdGVkIiwiUmVzaXplIiwiYm90dG9tIiwiU25hY2tiYXJBbmltIiwiY3VzdG9tQ2xhc3MiLCJBZGRDYXRlZ29yeSIsIm9uSW5wdXRUZXh0Q2hhbmdlIiwib25CdXR0b25BZGRDbGljayIsIm9uQ2F0ZWdvcnlDcmVhdGVkIiwidGFyZ2V0IiwidmFsdWUiLCJtc2dOYW1lUmVxdWlyZWQiLCJvbk5leHQiLCJzdGVwSWQiLCJBRERfVEFTSyIsIm9wdGlvbnMiLCJ0aXRsZUFkZENhdGVnb3J5IiwicGxhY2Vob2xkZXJOYW1lIiwiYnV0dG9uQWRkIiwiQWRkVGFzayIsIm9uQnV0dG9uU2NoZWR1bGVDbGljayIsIm1zZ1RpdGxlUmVxdWlyZWQiLCJTRUxFQ1RfQ09NUExFVEVfREFURSIsInRpdGxlQWRkVGFzayIsImxhYmVsRm9yQ2F0ZWdvcnkiLCJwbGFjZUhvbGRlclRpdGxlIiwicGxhY2VIb2xkZXJEZXNjcmlwdGlvbiIsImJ1dHRvblNjaGVkdWxlIiwiZ2V0Q29udGVudFRvUmVuZGVyIiwic3RlcHMiLCJsZW5ndGgiLCJsYXN0U3RlcCIsIlNFTEVDVF9XQU5UX1RPX0FERCIsIkFERF9DQVRFR09SWSIsIlNFTEVDVF9DQVRFR09SWSIsIkRPTkUiLCJpbml0YWxTdGF0ZSIsIm5leHRTdGVwcyIsInNob3dTdGVwIiwiRGlhbG9nQWRkIiwib25CYWNrIiwib25SZXNldEFuZENsb3NlIiwib25BbmltYXRpb25FbmQiLCJzdGVwQ291bnQiLCJzbGljZSIsInN0ZXAiLCJjb21wbGV0ZSIsImRvbmUiLCJvcGVuIiwic3RlcExpc3QiLCJidXR0b25CYWNrIiwiRG9uZSIsImxhYmVsRG9uZSIsIlNlbGVjdEFjdGlvbkFkZCIsInRpdGxlQWRkIiwibGFiZWxDYXRlZ29yeSIsImxhYmVsVGFzayIsIlNlbGVjdENhdGVnb3J5Iiwib25DYXRlZ29yeUNsaWNrIiwib25CdXR0b25OZXh0Q2xpY2siLCJtc2dTZWxlY3RDYXRlZ29yeSIsImNhdGVnb3JpZXNMaXN0IiwidGl0bGVDaG9vc2VDYXRlZ29yeSIsImJ1dHRvbk5leHQiLCJtYXBTdGF0ZVRvUHJvcCIsIlNlbGVjdENvbXBsZXRlRGF0ZSIsIm9uSW5wdXREYXRlQ2hhbmdlIiwib25Ub2RvVGFza0NyZWF0ZWQiLCJkYXRlIiwibXNnU2VsZWN0RGF0ZSIsInRpdGxlVG9kb1dpdGhpbiIsIlN0ZXAiLCJuZWVkTGluZSIsIlN0ZXBzIiwibGlzdCIsInN0ZXBIaXN0b3J5IiwiaXRlbSIsImkiLCJmaWx0ZXIiLCJzaCIsInN0ZXBEZXNjV2FudFRvQWRkIiwic3RlcERlc2NBZGRDYXRlZ29yeSIsInN0ZXBEZXNjclNlbGVjQ2F0ZWdvcnkiLCJzdGVwRGVzY0FkZFRhc2siLCJzdGVwRGVzY0NvbXBsZXRlRGF0ZSIsInN0ZXBEZXNjRG9uZSIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImNhdGVnb3J5QWxsIiwiQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lciIsIlRhc2tzQ29udGFpbmVyIiwiVG9kb3NDb250YWluZXIiLCJWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyIiwiVmlzaWJpbGl0eUZpbHRlcnMiLCJpc0ZldGNoaW5nQ2F0ZWdvcmllc0ZpbHRlciIsImlzRmV0Y2hpbmdUYXNrcyIsImlzRmV0Y2hpbmdDYXRlZ29yaWVzIiwiaXNGZXRjaGluZ1RvZG9zIiwiaXNGZXRjaGluZyIsImdldFRvZG9GaWx0ZXJzIiwiZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QiLCJnZXRWaXNpYmlsaXR5RmlsdGVyIiwidmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQiLCJnZXRTZWxlY3RlZENhdGVnb3JpZXNGaWx0ZXIiLCJnZXRTZWxlY3RlZENhdGVnb3JpZXNJZCIsImNhdGVnb3J5RmlsdGVyIiwiZ2V0VGFza3MiLCJnZXRUYXNrTGlzdCIsImdldFNraXAiLCJzdGlsbE1vcmVUb0xvYWQiLCJmdWxsVXJsIiwidXJsIiwiYmFzZVJlcXVlc3RJbml0IiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwiY3JlYXRlUG9zdFJlcXVlc3QiLCJmZXRjaCIsIm1ldGhvZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjcmVhdGVHZXRSZXF1ZXN0IiwiZmluYWxVcmwiLCJPYmplY3QiLCJlbnRyaWVzIiwiZm9yRWFjaCIsInBvaXRpb24iLCJrZXkiLCJjcmVhdGVEZWxldGVSZXF1ZXN0IiwiY3JlYXRlUGF0Y2hSZXF1ZXN0IiwiY3JlYXRlUmVxdWVzdCIsImNhbGxBcGkiLCJ0aGVuIiwib2siLCJqc29uIiwiUHJvbWlzZSIsInJlamVjdCIsInRvSnNEYXRlIiwicGFyc2VEYXRlIiwicGFyc2VJbnQiLCJzdWJzdHIiLCJ0b1NpbXBsZURhdGVGb3JtYXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBTU8sSUFBTUEsNENBQWtCLFNBQWxCQSxlQUFrQjtBQUFBLFNBQzdCO0FBQ0VDLFVBQU1DLDhCQURSO0FBRUVDO0FBRkYsR0FENkI7QUFBQSxDQUF4Qjs7QUFPQSxJQUFNQyw4Q0FBbUIsU0FBbkJBLGdCQUFtQjtBQUFBLFNBQzlCO0FBQ0VILFVBQU1JLCtCQURSO0FBRUVGO0FBRkYsR0FEOEI7QUFBQSxDQUF6Qjs7QUFPQSxJQUFNRyxvQ0FBYyxTQUFkQSxXQUFjO0FBQUEsU0FDekI7QUFDRUwsVUFBTU07QUFEUixHQUR5QjtBQUFBLENBQXBCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQlA7O0FBQ0E7O0FBVUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNQyxhQUFhLFNBQWJBLFVBQWE7QUFBQSxTQUFTLDRDQUMxQixtREFBd0JDLEtBQXhCLENBRDBCLEVBRTFCLG1EQUF3QkEsS0FBeEIsQ0FGMEIsQ0FBVDtBQUFBLENBQW5COztBQUtBLElBQU1DLDRCQUE0QixTQUE1QkEseUJBQTRCO0FBQUEsU0FDaEM7QUFDRVQsVUFBTVU7QUFEUixHQURnQztBQUFBLENBQWxDOztBQU1BLElBQU1DLDRCQUE0QixTQUE1QkEseUJBQTRCO0FBQUEsU0FDaEM7QUFDRVgsVUFBTVkseUNBRFI7QUFFRUM7QUFGRixHQURnQztBQUFBLENBQWxDOztBQU9BLElBQU1DLDBCQUEwQixTQUExQkEsdUJBQTBCO0FBQUEsU0FDOUI7QUFDRWQsVUFBTWUsdUNBRFI7QUFFRUM7QUFGRixHQUQ4QjtBQUFBLENBQWhDOztBQU9BLElBQU1DLG1CQUFtQixTQUFuQkEsZ0JBQW1CO0FBQUEsU0FDdkI7QUFDRWpCLFVBQU1rQiwrQkFEUjtBQUVFQztBQUZGLEdBRHVCO0FBQUEsQ0FBekI7O0FBT0EsSUFBTUMsc0JBQXNCLFNBQXRCQSxtQkFBc0I7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QUNYM1QsU0FBUzRULElBQVQsRUFEVyxHQUVYQyxRQUFRQyxNQUFSLENBQWU5VCxTQUFTbUgsSUFBVCxFQUFmLENBRkY7QUFBQSxHQURGLEVBS0U7QUFBQSxXQUFTME0sUUFBUUMsTUFBUixDQUFlclYsS0FBZixDQUFUO0FBQUEsR0FMRixDQURxQjtBQUFBLENBQWhCOztrQkFVUWdWLE87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRWY7Ozs7OztBQUVPLElBQU1NLDhCQUFXLFNBQVhBLFFBQVc7QUFBQSxNQUFDQyxTQUFELHVFQUFhLEVBQWI7QUFBQSxTQUN0QixJQUFJeFIsSUFBSixDQUFTeVIsU0FBU0QsVUFBVUUsTUFBVixDQUFpQixDQUFqQixDQUFULEVBQThCLEVBQTlCLENBQVQsQ0FEc0I7QUFBQSxDQUFqQjs7QUFHQSxJQUFNQyxrREFBcUIsU0FBckJBLGtCQUFxQjtBQUFBLFNBQ2hDLDBCQUFXMUUsSUFBWCxFQUFpQixrQkFBakIsQ0FEZ0M7QUFBQSxDQUEzQixDIiwiZmlsZSI6InRvZG9zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgU0hPV19NRVNTQUdFX0lORk8sXG4gIFNIT1dfTUVTU0FHRV9FUlJPUixcbiAgSElERV9NRVNTQUdFLFxufSBmcm9tICcuLi9jb25zdGFudHMvYWN0aW9uVHlwZXMnO1xuXG5leHBvcnQgY29uc3Qgc2hvd01lc3NhZ2VJbmZvID0gbWVzc2FnZSA9PiAoXG4gIHtcbiAgICB0eXBlOiBTSE9XX01FU1NBR0VfSU5GTyxcbiAgICBtZXNzYWdlLFxuICB9XG4pO1xuXG5leHBvcnQgY29uc3Qgc2hvd01lc3NhZ2VFcnJvciA9IG1lc3NhZ2UgPT4gKFxuICB7XG4gICAgdHlwZTogU0hPV19NRVNTQUdFX0VSUk9SLFxuICAgIG1lc3NhZ2UsXG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBoaWRlTWVzc2FnZSA9ICgpID0+IChcbiAge1xuICAgIHR5cGU6IEhJREVfTUVTU0FHRSxcbiAgfVxuKTtcbiIsImltcG9ydCB7IGNhbGxBcGksIE1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9BcGlVdGlscyc7XG5pbXBvcnQge1xuICBSRVFVRVNUX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICBSRUNFSVZFX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICBFUlJPUl9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgQUREX0NBVEVHT1JZX0xPQ0FMLFxuICBSRU1PVkVfQ0FURUdPUllfTE9DQUwsXG4gIFRPT0dMRV9TRUxFQ1RfQ0FURUdPUlksXG4gIFRPT0dMRV9TRUxFQ1RfQ0FURUdPUllfQUxMLFxuICBTV0lUQ0hfVklTSUJJTElUWV9GSUxURVIsXG59IGZyb20gJy4uL2NvbnN0YW50cy9hY3Rpb25UeXBlcyc7XG5pbXBvcnQgeyBxdWVyeUl0ZW1zTGltaXQgfSBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcbmltcG9ydCB7IGZldGNoVGFza3NCeUNhdGVnb3J5IH0gZnJvbSAnLi90b2RvVGFza3NBY3Rpb25zJztcbmltcG9ydCB7IHNob3dNZXNzYWdlRXJyb3IgfSBmcm9tICcuL21lc3NhZ2VBY3Rpb25zJztcbmltcG9ydCB7IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkLCB2aXNpYmlsaXR5T25seUNvbXBsZXRlZCB9IGZyb20gJy4uL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycyc7XG5cbmNvbnN0IGZldGNoVGFza3MgPSBzdGF0ZSA9PiBmZXRjaFRhc2tzQnlDYXRlZ29yeShcbiAgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQoc3RhdGUpLFxuICB2aXNpYmlsaXR5T25seUNvbXBsZXRlZChzdGF0ZSksXG4pO1xuXG5jb25zdCByZXF1ZXN0RmV0Y2hBbGxDYXRlZ29yaWVzID0gKCkgPT4gKFxuICB7XG4gICAgdHlwZTogUkVRVUVTVF9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgfVxuKTtcblxuY29uc3QgcmVjZWl2ZUZldGNoQWxsQ2F0ZWdvcmllcyA9IGNhdGVnb3JpZXMgPT4gKFxuICB7XG4gICAgdHlwZTogUkVDRUlWRV9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgICBjYXRlZ29yaWVzLFxuICB9XG4pO1xuXG5jb25zdCBlcnJvckZldGNoQWxsQ2F0ZWdvcmllcyA9IGVycm9yID0+IChcbiAge1xuICAgIHR5cGU6IEVSUk9SX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICAgIGVycm9yLFxuICB9XG4pO1xuXG5jb25zdCBhZGRDYXRlZ29yeUxvY2FsID0gY2F0ZWdvcnkgPT4gKFxuICB7XG4gICAgdHlwZTogQUREX0NBVEVHT1JZX0xPQ0FMLFxuICAgIGNhdGVnb3J5LFxuICB9XG4pO1xuXG5jb25zdCByZW1vdmVDYXRlZ29yeUxvY2FsID0gY2F0ZWdvcnlJbmRleCA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRU1PVkVfQ0FURUdPUllfTE9DQUwsXG4gICAgY2F0ZWdvcnlJbmRleCxcbiAgfVxuKTtcblxuY29uc3QgdG9vZ2xlU2VsZWN0Q2F0ZWdvcnkgPSBzZWxlY3RlZENhdGVnb3J5ID0+IChcbiAge1xuICAgIHR5cGU6IFRPT0dMRV9TRUxFQ1RfQ0FURUdPUlksXG4gICAgc2VsZWN0ZWRDYXRlZ29yeSxcbiAgfVxuKTtcblxuY29uc3QgdG9vZ2xlU2VsZWN0Q2F0ZWdvcnlBbGwgPSAoKSA9PiAoXG4gIHtcbiAgICB0eXBlOiBUT09HTEVfU0VMRUNUX0NBVEVHT1JZX0FMTCxcbiAgfVxuKTtcblxuY29uc3Qgc3dpdGNoVmlzaWJpbGl0eUZpbHRlciA9IHZpc2liaWxpdHkgPT4gKFxuICB7XG4gICAgdHlwZTogU1dJVENIX1ZJU0lCSUxJVFlfRklMVEVSLFxuICAgIHZpc2liaWxpdHksXG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBmZXRjaEFsbENhdGVnb3JpZXMgPSAobGltaXQgPSBxdWVyeUl0ZW1zTGltaXQsIHNraXAgPSAwKSA9PlxuICBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgZGlzcGF0Y2gocmVxdWVzdEZldGNoQWxsQ2F0ZWdvcmllcygpKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKCdjYXRlZ29yaWVzJywgeyBsaW1pdCwgc2tpcCB9LCBNZXRob2RzLkdFVCk7XG4gICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICBkaXNwYXRjaChyZWNlaXZlRmV0Y2hBbGxDYXRlZ29yaWVzKHJlc3BvbnNlLmRhdGEpKTtcbiAgICAgICAgZGlzcGF0Y2goZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkoZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQoZ2V0U3RhdGUoKSkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoKGVycm9yRmV0Y2hBbGxDYXRlZ29yaWVzKHJlc3BvbnNlLm1lc3NhZ2VFcnJvcikpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgICB9XG4gIH07XG5cbmV4cG9ydCBjb25zdCBkZWxldGVDYXRlZ29yeSA9IChjYXRlZ29yeUlkID0gJycpID0+IGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoJ2NhdGVnb3JpZXMnLCBjYXRlZ29yeUlkLCBNZXRob2RzLkRFTEVURSk7XG4gICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgIGNvbnN0IHsgY2F0ZWdvcmllcyB9ID0gZ2V0U3RhdGUoKS50b2RvRmlsdGVycztcbiAgICAgIGNvbnN0IGNhdGVnb3J5SW5kZXggPSBjYXRlZ29yaWVzLmZpbmRJbmRleChjYXRlZ29yeSA9PiBjYXRlZ29yeS5pZCA9PT0gY2F0ZWdvcnlJZCk7XG4gICAgICBkaXNwYXRjaChyZW1vdmVDYXRlZ29yeUxvY2FsKGNhdGVnb3J5SW5kZXgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbn07XG5cbi8qKlxuICogUmVxdWVzdCB0byBhZGQgYSBjYXRlZ29yeVxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgY2F0ZWdvcnkgbmFtZSB0byBhZGRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgbmVlZCB0byBoYW5kbGUgdGhlIGNhdGVnb3J5IGNyZWF0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGFkZENhdGVnb3J5ID0gKG5hbWUgPSAnJywgY2FsbGJhY2sgPSB1bmRlZmluZWQpID0+IGFzeW5jIChkaXNwYXRjaCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbEFwaSgnY2F0ZWdvcmllcycsIHsgbmFtZSB9LCBNZXRob2RzLlBPU1QpO1xuICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICBkaXNwYXRjaChhZGRDYXRlZ29yeUxvY2FsKHJlc3BvbnNlLmRhdGEpKTtcbiAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLm1lc3NhZ2VFcnJvcikpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNoYW5nZVZpc2liaWxpdHkgPSB2aXNpYmlsaXR5ID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgZGlzcGF0Y2goc3dpdGNoVmlzaWJpbGl0eUZpbHRlcih2aXNpYmlsaXR5KSk7XG4gIHJldHVybiBkaXNwYXRjaChmZXRjaFRhc2tzKGdldFN0YXRlKCkpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RDYXRlZ29yeSA9IHNlbGVjdGVkQ2F0ZWdvcnkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBkaXNwYXRjaCh0b29nbGVTZWxlY3RDYXRlZ29yeShzZWxlY3RlZENhdGVnb3J5KSk7XG4gIHJldHVybiBkaXNwYXRjaChmZXRjaFRhc2tzKGdldFN0YXRlKCkpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RDYXRlZ29yeUFsbCA9ICgpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgZGlzcGF0Y2godG9vZ2xlU2VsZWN0Q2F0ZWdvcnlBbGwoKSk7XG4gIHJldHVybiBkaXNwYXRjaChmZXRjaFRhc2tzKGdldFN0YXRlKCkpKTtcbn07XG4iLCJpbXBvcnQgeyBjYWxsQXBpLCBNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvQXBpVXRpbHMnO1xuaW1wb3J0IHtcbiAgUkVRVUVTVF9GRVRDSF9UQVNLUyxcbiAgUkVDRUlWRV9GRVRDSF9UQVNLUyxcbiAgRVJST1JfRkVUQ0hfVEFTS1MsXG4gIEFERF9UQVNLX0xPQ0FMLFxuICBSRU1PVkVfVEFTS19MT0NBTCxcbiAgVVBEQVRFX1RBU0tfTE9DQUwsXG59IGZyb20gJy4uL2NvbnN0YW50cy9hY3Rpb25UeXBlcyc7XG5pbXBvcnQgeyBxdWVyeUl0ZW1zTGltaXQgfSBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcbmltcG9ydCB7IHNob3dNZXNzYWdlRXJyb3IgfSBmcm9tICcuL21lc3NhZ2VBY3Rpb25zJztcblxuY29uc3QgcmVxdWVzdEZldGNoVGFza3MgPSAobGltaXQsIHNraXApID0+IChcbiAge1xuICAgIHR5cGU6IFJFUVVFU1RfRkVUQ0hfVEFTS1MsXG4gICAgbGltaXQsXG4gICAgc2tpcCxcbiAgfVxuKTtcblxuY29uc3QgcmVjZWl2ZUZldGNoVGFza3MgPSB0YXNrcyA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRUNFSVZFX0ZFVENIX1RBU0tTLFxuICAgIHRhc2tzLFxuICB9XG4pO1xuXG5jb25zdCBlcnJvckZldGNoVGFza3MgPSBlcnJvciA9PiAoXG4gIHtcbiAgICB0eXBlOiBFUlJPUl9GRVRDSF9UQVNLUyxcbiAgICBlcnJvcixcbiAgfVxuKTtcblxuY29uc3QgYWRkVGFza0xvY2FsID0gdGFzayA9PiAoXG4gIHtcbiAgICB0eXBlOiBBRERfVEFTS19MT0NBTCxcbiAgICB0YXNrLFxuICB9XG4pO1xuXG5jb25zdCByZW1vdmVUYXNrTG9jYWwgPSB0YXNrSW5kZXggPT4gKFxuICB7XG4gICAgdHlwZTogUkVNT1ZFX1RBU0tfTE9DQUwsXG4gICAgdGFza0luZGV4LFxuICB9XG4pO1xuXG5jb25zdCB1cGRhdGVUYXNrTG9jYWwgPSB0YXNrID0+IChcbiAge1xuICAgIHR5cGU6IFVQREFURV9UQVNLX0xPQ0FMLFxuICAgIHRhc2ssXG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBmZXRjaFRhc2tzQnlDYXRlZ29yeSA9IChcbiAgY2F0ZWdvcmllc0lkID0gW10sXG4gIGNvbXBsZXRlZCA9IGZhbHNlLFxuICBsaW1pdCA9IHF1ZXJ5SXRlbXNMaW1pdCxcbiAgc2tpcCA9IDAsXG4pID0+IGFzeW5jIChkaXNwYXRjaCkgPT4ge1xuICBkaXNwYXRjaChyZXF1ZXN0RmV0Y2hUYXNrcyhsaW1pdCwgc2tpcCkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoJ3Rhc2tzJywge1xuICAgIGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgc2tpcCxcbiAgfSwgTWV0aG9kcy5HRVQpO1xuICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgIGNvbnN0IHRvZG9zID0gcmVzcG9uc2UuZGF0YS5tYXAodG9kbyA9PlxuICAgICAgKHtcbiAgICAgICAgLi4udG9kbyxcbiAgICAgICAgY29tcGxldGVkQXQ6ICh0b2RvLmNvbXBsZXRlZEF0KSA/IG5ldyBEYXRlKHRvZG8uY29tcGxldGVkQXQpIDogdW5kZWZpbmVkLFxuICAgICAgICB0b2RvV2l0aGluOiAodG9kby50b2RvV2l0aGluKSA/IG5ldyBEYXRlKHRvZG8udG9kb1dpdGhpbikgOiB1bmRlZmluZWQsXG4gICAgICB9KSk7XG4gICAgZGlzcGF0Y2gocmVjZWl2ZUZldGNoVGFza3ModG9kb3MpKTtcbiAgfSBlbHNlIHtcbiAgICBkaXNwYXRjaChlcnJvckZldGNoVGFza3MocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBkZWxldGVUYXNrID0gKGlkID0gJycpID0+IGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKCd0YXNrcycsIGlkLCBNZXRob2RzLkRFTEVURSk7XG4gIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgY29uc3QgeyBpdGVtcyB9ID0gZ2V0U3RhdGUoKS50b2RvVGFza3M7XG4gICAgY29uc3QgdG9kb0FyZ3VtZW50SW5kZXggPSBpdGVtcy5maW5kSW5kZXgodG9kb0FyZ3VtZW50ID0+XG4gICAgICB0b2RvQXJndW1lbnQuaWQgPT09IGlkKTtcbiAgICBkaXNwYXRjaChyZW1vdmVUYXNrTG9jYWwodG9kb0FyZ3VtZW50SW5kZXgpKTtcbiAgfSBlbHNlIHtcbiAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLm1lc3NhZ2VFcnJvcikpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgYWRkVGFzayA9ICh0aXRsZSA9ICcnLCBkZXNjcmlwdGlvbiA9ICcnLCBjYXRlZ29yeSA9IHsgaWQ6ICcnIH0sIHRvZG9XaXRoaW4sIGNhbGxiYWNrID0gdW5kZWZpbmVkKSA9PiBhc3luYyAoZGlzcGF0Y2gpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKFxuICAgICd0YXNrcycsXG4gICAge1xuICAgICAgdGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5LmlkLFxuICAgICAgdG9kb1dpdGhpbixcbiAgICB9LFxuICAgIE1ldGhvZHMuUE9TVCxcbiAgKTtcbiAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICBjb25zdCB0b2RvID0ge1xuICAgICAgLi4ucmVzcG9uc2UuZGF0YSxcbiAgICAgIGNvbXBsZXRlZEF0OiAocmVzcG9uc2UuZGF0YS5jb21wbGV0ZWRBdClcbiAgICAgICAgPyBuZXcgRGF0ZShyZXNwb25zZS5kYXRhLmNvbXBsZXRlZEF0KSA6IHVuZGVmaW5lZCxcbiAgICAgIHRvZG9XaXRoaW46IChyZXNwb25zZS5kYXRhLnRvZG9XaXRoaW4pXG4gICAgICAgID8gbmV3IERhdGUocmVzcG9uc2UuZGF0YS50b2RvV2l0aGluKSA6IHVuZGVmaW5lZCxcbiAgICB9O1xuICAgIGRpc3BhdGNoKGFkZFRhc2tMb2NhbCh0b2RvKSk7XG4gICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB0b29nbGVUYXNrQ29tcGxldGVkID0gKGlkID0gJycsIGlzQ29tcGxldGVkID0gZmFsc2UpID0+IGFzeW5jIChkaXNwYXRjaCkgPT4ge1xuICBjb25zdCBjb21wbGV0ZWQgPSAhaXNDb21wbGV0ZWQ7XG4gIGNvbnN0IGNvbXBsZXRlZEF0ID0gKGNvbXBsZXRlZCkgPyBuZXcgRGF0ZSgpIDogbnVsbDtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKCd0YXNrcycsIHsgaWQsIGNvbXBsZXRlZCwgY29tcGxldGVkQXQgfSwgTWV0aG9kcy5QQVRDSCk7XG4gIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgY29uc3QgdG9kbyA9IHtcbiAgICAgIC4uLnJlc3BvbnNlLmRhdGEsXG4gICAgICBjb21wbGV0ZWRBdDogKHJlc3BvbnNlLmRhdGEuY29tcGxldGVkQXQpXG4gICAgICAgID8gbmV3IERhdGUocmVzcG9uc2UuZGF0YS5jb21wbGV0ZWRBdCkgOiB1bmRlZmluZWQsXG4gICAgfTtcbiAgICBkaXNwYXRjaCh1cGRhdGVUYXNrTG9jYWwodG9kbykpO1xuICB9IGVsc2Uge1xuICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgQnV0dG9uQ29tcGxldGVUYXNrID0gKHsgb25DbGljaywgY29tcGxldGVkIH0pID0+IChcbiAgPGJ1dHRvblxuICAgIGNsYXNzTmFtZT17YGJ1dHRvbi1jb21wbGV0ZS10YXNrICR7KGNvbXBsZXRlZCkgPyAnYnV0dG9uLWNvbXBsZXRlZC10YXNrJyA6ICcnfWB9XG4gICAgb25DbGljaz17b25DbGlja31cbiAgPlxuICAgIDxpIGNsYXNzTmFtZT1cImljb24tY2hlY2tcIiAvPlxuICA8L2J1dHRvbj5cbik7XG5cbkJ1dHRvbkNvbXBsZXRlVGFzay5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5CdXR0b25Db21wbGV0ZVRhc2suZGVmYXVsdFByb3BzID0ge1xuICBjb21wbGV0ZWQ6IGZhbHNlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uQ29tcGxldGVUYXNrO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEJ1dHRvbkRlbGV0ZUNhdGVnb3J5ID0gKHsgb25DbGljayB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLWRlbGV0ZS1jYXRlZ29yeVwiIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIDxpIGNsYXNzTmFtZT1cImljb24tZGVsZXRlXCIgLz5cbiAgPC9idXR0b24+XG4pO1xuXG5CdXR0b25EZWxldGVDYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25EZWxldGVDYXRlZ29yeTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdXR0b25EZWxldGVUYXNrID0gKHsgb25DbGljayB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLWRlbGV0ZS10YXNrXCIgb25DbGljaz17b25DbGlja30+XG4gICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1kZWxldGVcIiAvPlxuICA8L2J1dHRvbj5cbik7XG5cbkJ1dHRvbkRlbGV0ZVRhc2sucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uRGVsZXRlVGFzaztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdXR0b25TY3JvbGwgPSAoeyBvbkNsaWNrLCBkaXJlY3Rpb24gfSkgPT4gKFxuICA8YnV0dG9uIGNsYXNzTmFtZT17YGJ1dHRvbi1zY3JvbGwgJHtkaXJlY3Rpb259YH0gb25DbGljaz17b25DbGlja30+XG4gICAgPGkgY2xhc3NOYW1lPXsoZGlyZWN0aW9uID09PSAnbGVmdCcpID8gJ2ljb24tYmFja3dhcmQnIDogJ2ljb24tZm9yd2FyZCd9IC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uU2Nyb2xsLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZGlyZWN0aW9uOiBQcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxufTtcblxuQnV0dG9uU2Nyb2xsLmRlZmF1bHRQcm9wcyA9IHtcbiAgZGlyZWN0aW9uOiAnbGVmdCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25TY3JvbGw7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb25Hcm91cCB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuaW1wb3J0IHNjcm9sbCBmcm9tICdzY3JvbGwnO1xuaW1wb3J0IEJ1dHRvblNjcm9sbCBmcm9tICcuL0J1dHRvblNjb2xsJztcbmltcG9ydCBDYXRlZ29yeSBmcm9tICcuL0NhdGVnb3J5JztcbmltcG9ydCBGYWRlIGZyb20gJy4vYW5pbXMvRmFkZSc7XG5cbmNsYXNzIENhdGVnb3JpZXNGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmNoaXBzID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuaGFuZGxlTGVmdFNjcm9sbENsaWNrID0gdGhpcy5oYW5kbGVMZWZ0U2Nyb2xsQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2sgPSB0aGlzLmhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vdmVDaGlwc1Njcm9sbCA9IHRoaXMubW92ZUNoaXBzU2Nyb2xsLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVMZWZ0U2Nyb2xsQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuY2hpcHMpIHtcbiAgICAgIHRoaXMubW92ZUNoaXBzU2Nyb2xsKC10aGlzLmNoaXBzLmNsaWVudFdpZHRoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVSaWdodFNjcm9sbENsaWNrKCkge1xuICAgIGlmICh0aGlzLmNoaXBzKSB7XG4gICAgICB0aGlzLm1vdmVDaGlwc1Njcm9sbCh0aGlzLmNoaXBzLmNsaWVudFdpZHRoKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlQ2hpcHNTY3JvbGwoZGVsdGEpIHtcbiAgICBpZiAodGhpcy5jaGlwcykge1xuICAgICAgY29uc3QgbmV4dFNjcm9sbExlZnQgPSB0aGlzLmNoaXBzLnNjcm9sbExlZnQgKyBkZWx0YTtcbiAgICAgIHNjcm9sbC5sZWZ0KHRoaXMuY2hpcHMsIG5leHRTY3JvbGxMZWZ0KTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjYXRlZ29yeUxpc3QsIG9uRGVsZXRlQ2F0ZWdvcnksIG9uQ2lsY2tDYXRlZ29yeSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cImNvbnRlbnQtY2F0ZWdvcmllcy1maWx0ZXJcIj5cbiAgICAgICAgPEJ1dHRvblNjcm9sbFxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTGVmdFNjcm9sbENsaWNrfVxuICAgICAgICAgIGRpcmVjdGlvbj1cImxlZnRcIlxuICAgICAgICAvPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwiY2F0ZWdvcmllcy1maWx0ZXJcIlxuICAgICAgICAgIHJlZj17KG5vZGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hpcHMgPSBub2RlO1xuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8VHJhbnNpdGlvbkdyb3VwIHN0eWxlPXt7IGRpc3BsYXk6ICdpbmhlcml0JywgcGFkZGluZ0xlZnQ6ICcxLjI1ZW0nLCBwYWRkaW5nUmlnaHQ6ICcxLjI1ZW0nIH19PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjYXRlZ29yeUxpc3QubWFwKGNhdGVnb3J5ID0+IChcbiAgICAgICAgICAgICAgICA8RmFkZSBrZXk9e2NhdGVnb3J5LmlkfT5cbiAgICAgICAgICAgICAgICAgIDxDYXRlZ29yeVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2NhdGVnb3J5LmlkfVxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeT17Y2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtjYXRlZ29yeS5zZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICAgb25EZWxldGU9e29uRGVsZXRlQ2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2lsY2tDYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9GYWRlPlxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvVHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEJ1dHRvblNjcm9sbFxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlUmlnaHRTY3JvbGxDbGlja31cbiAgICAgICAgICBkaXJlY3Rpb249XCJyaWdodFwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkNhdGVnb3JpZXNGaWx0ZXIucHJvcFR5cGVzID0ge1xuICBjYXRlZ29yeUxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIG9uRGVsZXRlQ2F0ZWdvcnk6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNpbGNrQ2F0ZWdvcnk6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5DYXRlZ29yaWVzRmlsdGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25EZWxldGVDYXRlZ29yeTogdW5kZWZpbmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0ZWdvcmllc0ZpbHRlcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEJ1dHRvbkRlbGV0ZUNhdGVnb3J5IGZyb20gJy4vQnV0dG9uRGVsZXRlQ2F0ZWdvcnknO1xuXG5jb25zdCBDYXRlZ29yeSA9ICh7XG4gIGNhdGVnb3J5LCBzZWxlY3RlZCwgb25DbGljaywgb25EZWxldGUsXG59KSA9PiB7XG4gIGxldCBjc3NDbGFzcyA9ICcnO1xuXG4gIGNvbnN0IG9uQ2hpcENsaWNrID0gKGUpID0+IHtcbiAgICBvbkNsaWNrKGNhdGVnb3J5LCBlKTtcbiAgfTtcbiAgY29uc3Qgb25EZWxldGVDbGljayA9ICgpID0+IHtcbiAgICBvbkRlbGV0ZShjYXRlZ29yeSk7XG4gIH07XG5cbiAgaWYgKHNlbGVjdGVkKSB7XG4gICAgY3NzQ2xhc3MgPSAnY2F0ZWdvcnktc2VsZWN0ZWQnO1xuICB9XG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtgJHtjc3NDbGFzc30gY2F0ZWdvcnktY2hpcCBhbGlnbi1pdGVtcy1jZW50ZXJgfVxuICAgICAgb25DbGljaz17b25DaGlwQ2xpY2t9XG4gICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXRlZ29yeS10ZXh0XCI+e2NhdGVnb3J5Lm5hbWV9PC9zcGFuPlxuICAgICAge1xuICAgICAgICAoY2F0ZWdvcnkuaWQgIT09ICcwJyAmJiBvbkRlbGV0ZSAhPT0gdW5kZWZpbmVkKSAmJlxuICAgICAgICAgIDxCdXR0b25EZWxldGVDYXRlZ29yeSBvbkNsaWNrPXtvbkRlbGV0ZUNsaWNrfSAvPlxuICAgICAgfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuQ2F0ZWdvcnkucHJvcFR5cGVzID0ge1xuICBvbkRlbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNhdGVnb3J5OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbn07XG5cbkNhdGVnb3J5LmRlZmF1bHRQcm9wcyA9IHtcbiAgb25EZWxldGU6IHVuZGVmaW5lZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENhdGVnb3J5O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJ2xvZGFzaCc7XG5cbmNvbnN0IHdhaXRUaW1lID0gNTAwO1xuXG5jbGFzcyBJbmZpbml0ZVNjcm9sbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMub25TY3JvbGwgPSB0aGlzLm9uU2Nyb2xsLmJpbmQodGhpcyk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhyb3R0bGUodGhpcy5vblNjcm9sbCwgd2FpdFRpbWUpLCBmYWxzZSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhyb3R0bGUodGhpcy5vblNjcm9sbCwgd2FpdFRpbWUpLCBmYWxzZSk7XG4gIH1cblxuICBvblNjcm9sbCgpIHtcbiAgICBpZiAoKHdpbmRvdy5pbm5lckhlaWdodCArIHdpbmRvdy5zY3JvbGxZKSA+PSAoZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQgLSAyMDApKSB7XG4gICAgICBjb25zdCB7IGFyZ3MsIG9uU2Nyb2xsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgb25TY3JvbGwoLi4uYXJncyk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSW5maW5pdGVTY3JvbGwucHJvcFR5cGVzID0ge1xuICBhcmdzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgb25TY3JvbGw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5JbmZpbml0ZVNjcm9sbC5kZWZhdWx0UHJvcHMgPSB7XG4gIGFyZ3M6IFtdLFxuICBjbGFzc05hbWU6ICcnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgSW5maW5pdGVTY3JvbGw7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgTWFpbkFkZEJ1dHRvbiA9ICh7IG9uQ2xpY2sgfSkgPT4gKFxuICA8YnV0dG9uIGlkPVwibWFpbi1hZGQtYnV0dG9uXCIgb25DbGljaz17b25DbGlja30gPlxuICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+JiN4RTE0NTs8L2k+XG4gIDwvYnV0dG9uPlxuKTtcblxuTWFpbkFkZEJ1dHRvbi5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYWluQWRkQnV0dG9uO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgU25hY2tiYXJBbmltIGZyb20gJy4vYW5pbXMvU25hY2tiYXJBbmltJztcblxuY29uc3QgQWN0aW9uID0gKHsgb25DbGljaywgdGV4dCB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLWFjdGlvbi1zbmFja2JhclwiIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIHt0ZXh0fVxuICA8L2J1dHRvbj5cbik7XG5cbkFjdGlvbi5wcm9wVHlwZXMgPSB7XG4gIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmNsYXNzIFNuYWNrYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2xvc2UsIGR1cmF0aW9uLCBzaG93LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKHNob3cpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBvbkNsb3NlKCk7XG4gICAgICB9LCBkdXJhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG1lc3NhZ2UsIGlzRXJyb3IsIGFjdGlvblRleHQsIGFjdGlvbkNsaWNrLCBzaG93LFxuICAgICAgdmVydGljYWxQb3N0aW9uLCBob3Jpem9udGFsUG9zaXRpb24sXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTbmFja2JhckFuaW0gaW49e3Nob3d9IGN1c3RvbUNsYXNzPXtgJHt2ZXJ0aWNhbFBvc3Rpb259ICR7KGhvcml6b250YWxQb3NpdGlvbil9YH0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2BzbmFja2JhciAkeyhpc0Vycm9yKSA/ICdlcnJvcicgOiAnJ31gfVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic25hY2tiYXItbWVzc2FnZVwiPnttZXNzYWdlfTwvc3Bhbj5cbiAgICAgICAgICB7XG4gICAgICAgICAgICAoYWN0aW9uVGV4dCAhPT0gJycgJiYgYWN0aW9uQ2xpY2sgIT09IHVuZGVmaW5lZCkgJiZcbiAgICAgICAgICAgICAgPEFjdGlvbiBvbkNsaWNrPXthY3Rpb25DbGlja30gdGV4dD17YWN0aW9uVGV4dH0gLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9TbmFja2JhckFuaW0+XG4gICAgKTtcbiAgfVxufVxuXG5TbmFja2Jhci5wcm9wVHlwZXMgPSB7XG4gIHNob3c6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZHVyYXRpb246IFByb3BUeXBlcy5udW1iZXIsXG4gIGlzRXJyb3I6IFByb3BUeXBlcy5ib29sLFxuICBhY3Rpb25UZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBhY3Rpb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gIHZlcnRpY2FsUG9zdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsndG9wJywgJ2JvdHRvbSddKSxcbiAgaG9yaXpvbnRhbFBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxufTtcblxuU25hY2tiYXIuZGVmYXVsdFByb3BzID0ge1xuICBkdXJhdGlvbjogNTAwMCxcbiAgaXNFcnJvcjogZmFsc2UsXG4gIGFjdGlvblRleHQ6ICcnLFxuICBhY3Rpb25DbGljazogdW5kZWZpbmVkLFxuICB2ZXJ0aWNhbFBvc3Rpb246ICdib3R0b20nLFxuICBob3Jpem9udGFsUG9zaXRpb246ICdyaWdodCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTbmFja2JhcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IENvbGxhcHNlIGZyb20gJy4vYW5pbXMvQ29sbGFwc2UnO1xuaW1wb3J0IEZhZGUgZnJvbSAnLi9hbmltcy9GYWRlJztcbmltcG9ydCBCdXR0b25Db21wbGV0ZVRhc2sgZnJvbSAnLi9CdXR0b25Db21wbGV0ZVRhc2snO1xuaW1wb3J0IEJ1dHRvbkRlbGV0ZVRhc2sgZnJvbSAnLi9CdXR0b25EZWxldGVUYXNrJztcbmltcG9ydCB7IHRvU2ltcGxlRGF0ZUZvcm1hdCB9IGZyb20gJy4uL3V0aWxzL0NvbW1vbic7XG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuXG5jbGFzcyBUYXNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgfTtcbiAgICB0aGlzLnJlbmRlckRhdGUgPSB0aGlzLnJlbmRlckRhdGUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uVGl0bGVDbGljaygpIHtcbiAgICBjb25zdCB7IGNvbGxhcHNlZCB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnNldFN0YXRlKHsgY29sbGFwc2VkOiAhY29sbGFwc2VkIH0pO1xuICB9XG5cbiAgcmVuZGVyRGF0ZSgpIHtcbiAgICBjb25zdCB7IHRhc2sgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKHRhc2suY29tcGxldGVkKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8cCBjbGFzc05hbWU9XCJjb21wbGV0ZS1kYXRlXCI+e2Ake2xhYmVscy5sYWJlbFBhcnRpYWxDb21wbGV0ZWR9ICR7KHRhc2suY29tcGxldGVkQXQpID8gdG9TaW1wbGVEYXRlRm9ybWF0KHRhc2suY29tcGxldGVkQXQpIDogJyd9YH08L3A+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPHAgY2xhc3NOYW1lPVwiY29tcGxldGUtd2l0aGluLWRhdGVcIj57YCR7bGFiZWxzLmxhYmVsUGFydGlhbFRvQ29tcGxldGVkfSAkeyh0YXNrLnRvZG9XaXRoaW4pID8gdG9TaW1wbGVEYXRlRm9ybWF0KHRhc2sudG9kb1dpdGhpbikgOiBsYWJlbHMubGFiZWxOb3RTZXR9YH08L3A+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHRhc2ssIG9uRGVsZXRlLCBvbkNvbXBsZXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY29sbGFwc2VkIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhc2staXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhc2staGVhZGVyXCI+XG4gICAgICAgICAgPHBcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHRhc2stdGl0bGUgJHsodGFzay5jb21wbGV0ZWQpID8gJ3Rhc2stdGl0bGUtY29tcGxldGVkJyA6ICcnfWB9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uVGl0bGVDbGljaygpfVxuICAgICAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3Rhc2sudGl0bGV9XG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxGYWRlIGluPXtjb2xsYXBzZWR9PlxuICAgICAgICAgICAgPEJ1dHRvbkRlbGV0ZVRhc2tcbiAgICAgICAgICAgICAgb25DbGljaz17b25EZWxldGV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvRmFkZT5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBvbkNvbXBsZXRlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIDxCdXR0b25Db21wbGV0ZVRhc2tcbiAgICAgICAgICAgICAgb25DbGljaz17b25Db21wbGV0ZX1cbiAgICAgICAgICAgICAgY29tcGxldGVkPXt0YXNrLmNvbXBsZXRlZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YXNrLWRhdGVcIj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJEYXRlKCl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Q29sbGFwc2UgaW49e2NvbGxhcHNlZH0+XG4gICAgICAgICAgPGRpdiBrZXk9e3Rhc2suZGVzY3JpcHRpb259IGNsYXNzTmFtZT1cInRhc2stYm9keVwiPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGFzay1kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgKHRhc2suZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCAmJiB0YXNrLmRlc2NyaXB0aW9uICE9PSAnJylcbiAgICAgICAgICAgICAgICA/IHRhc2suZGVzY3JpcHRpb24gOiA8c3BhbiBjbGFzc05hbWU9XCJlbXB0eVwiPntsYWJlbHMubGFiZWxOb0Rlc2NyaXB0aW9ufTwvc3Bhbj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NvbGxhcHNlPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5UYXNrLnByb3BUeXBlcyA9IHtcbiAgb25EZWxldGU6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNvbXBsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgdGFzazogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGNvbXBsZXRlZEF0OiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICB9KS5pc1JlcXVpcmVkLFxufTtcblxuVGFzay5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uRGVsZXRlOiB1bmRlZmluZWQsXG4gIG9uQ29tcGxldGU6IHVuZGVmaW5lZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2s7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb25Hcm91cCB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuaW1wb3J0IFJlc2l6ZSBmcm9tICcuL2FuaW1zL1Jlc2l6ZSc7XG5pbXBvcnQgVGFzayBmcm9tICcuL1Rhc2snO1xuaW1wb3J0IEluZmluaXRlU2Nyb2xsIGZyb20gJy4vSW5maW5pdGVTY3JvbGwnO1xuaW1wb3J0IHsgcXVlcnlJdGVtc0xpbWl0IH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgbGltaXQ6IHF1ZXJ5SXRlbXNMaW1pdCxcbiAgc2tpcDogMCxcbn07XG5cbmNsYXNzIFRhc2tzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IGluaXRpYWxTdGF0ZTtcbiAgICB0aGlzLm9uRmV0Y2hUb2RvVGFza3NOZXh0ID0gdGhpcy5vbkZldGNoVG9kb1Rhc2tzTmV4dC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhuZXh0UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIGlmIChuZXh0UHJvcHMuc2tpcCAhPT0gcHJldlN0YXRlLnNraXApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNraXA6IG5leHRQcm9wcy5za2lwLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBvbkZldGNoVG9kb1Rhc2tzTmV4dCgpIHtcbiAgICBjb25zdCB7XG4gICAgICBjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCxcbiAgICAgIGZldGNoVGFza3MsIG1vcmVUb0xvYWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFtb3JlVG9Mb2FkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgbGltaXQsIHNraXAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgbmV3U2tpcCA9IHNraXAgKyBsaW1pdDtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2tpcDogbmV3U2tpcCB9KTtcbiAgICBmZXRjaFRhc2tzKGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgbmV3U2tpcCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdGFza0xpc3QsXG4gICAgICBvbkRlbGV0ZVRhc2ssXG4gICAgICBvbkNvbXBsZXRlVGFzayxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cImNvbnRlbnQtdG9kby10YXNrc1wiPlxuICAgICAgICA8SW5maW5pdGVTY3JvbGwgb25TY3JvbGw9e3RoaXMub25GZXRjaFRvZG9UYXNrc05leHR9PlxuICAgICAgICAgIDxUcmFuc2l0aW9uR3JvdXA+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRhc2tMaXN0Lm1hcChhcmcgPT4gKFxuICAgICAgICAgICAgICAgIDxSZXNpemUga2V5PXthcmcuaWR9PlxuICAgICAgICAgICAgICAgICAgPFRhc2tcbiAgICAgICAgICAgICAgICAgICAga2V5PXthcmcuaWR9XG4gICAgICAgICAgICAgICAgICAgIHRhc2s9e2FyZ31cbiAgICAgICAgICAgICAgICAgICAgb25EZWxldGU9eygpID0+IG9uRGVsZXRlVGFzayhhcmcpfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXsoKSA9PiBvbkNvbXBsZXRlVGFzayhhcmcpfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L1Jlc2l6ZT5cbiAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L1RyYW5zaXRpb25Hcm91cD5cbiAgICAgICAgPC9JbmZpbml0ZVNjcm9sbD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuVGFza3MucHJvcFR5cGVzID0ge1xuICBvbkRlbGV0ZVRhc2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uQ29tcGxldGVUYXNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICB0YXNrTGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICBtb3JlVG9Mb2FkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBmZXRjaFRhc2tzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjYXRlZ29yaWVzSWQ6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLmlzUmVxdWlyZWQsXG4gIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2tzO1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBMb2FkZXJMaW5lYXIgZnJvbSAnLi4vY29tcG9uZW50cy9Mb2FkZXJMaW5lYXInO1xuaW1wb3J0IE1haW5BZGRCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9NYWluQWRkQnV0dG9uJztcbmltcG9ydCBDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lcnMvQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lcic7XG5pbXBvcnQgVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lciBmcm9tICcuLi9jb250YWluZXJzL1Zpc2liaWxpdHlGaWx0ZXJDb250YWluZXInO1xuaW1wb3J0IFRhc2tzQ29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lcnMvVGFza3NDb250YWluZXInO1xuaW1wb3J0IERpYWxvZ0FkZCBmcm9tICcuL2RpYWxvZ0FkZC9EaWFsb2dBZGQnO1xuaW1wb3J0IFNuYWNrYmFyIGZyb20gJy4vU25hY2tiYXInO1xuXG5jbGFzcyBUb2RvcyBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc0RpYWxvZ0FkZE9wZW46IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IGluaXRGZXRjaEFsbENhdGVnb3JpZXMgfSA9IHRoaXMucHJvcHM7XG4gICAgaW5pdEZldGNoQWxsQ2F0ZWdvcmllcygpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaXNEaWFsb2dBZGRPcGVuIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgbWVzc2FnZSwgaGlkZU1lc3NhZ2UsIHNob3dMb2FkaW5nIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtYXBwXCI+XG4gICAgICAgIDxMb2FkZXJMaW5lYXIgc2hvdz17c2hvd0xvYWRpbmd9IC8+XG4gICAgICAgIDxkaXYgaWQ9XCJtYWluLXRvcC1iYXJcIj5cbiAgICAgICAgICA8Q2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lciAvPlxuICAgICAgICAgIDxWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyIC8+XG4gICAgICAgICAgPE1haW5BZGRCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBpc0RpYWxvZ0FkZE9wZW46IHRydWUgfSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxUYXNrc0NvbnRhaW5lciAvPlxuICAgICAgICA8RGlhbG9nQWRkXG4gICAgICAgICAgb3Blbj17aXNEaWFsb2dBZGRPcGVufVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBpc0RpYWxvZ0FkZE9wZW46IGZhbHNlIH0pfVxuICAgICAgICAvPlxuICAgICAgICA8U25hY2tiYXJcbiAgICAgICAgICBzaG93PXttZXNzYWdlLnNob3d9XG4gICAgICAgICAgaXNFcnJvcj17bWVzc2FnZS5pc0Vycm9yfVxuICAgICAgICAgIG1lc3NhZ2U9e21lc3NhZ2UudGV4dH1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBoaWRlTWVzc2FnZSgpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Ub2Rvcy5wcm9wVHlwZXMgPSB7XG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2hvdzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0Vycm9yOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgaGlkZU1lc3NhZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGluaXRGZXRjaEFsbENhdGVnb3JpZXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHNob3dMb2FkaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9kb3M7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBWaXNpYmlsaXR5U3dpdGNoIGZyb20gJy4vVmlzaWJpbGl0eVN3aXRjaCc7XG5pbXBvcnQgeyBBTExfVE9ET1MsIE9OTFlfQ09NUExFVEVELCBPTkxZX1RPX0NPTVBMRVRFIH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmNvbnN0IFZpc2liaWxpdHlGaWx0ZXIgPSAoe1xuICBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIsIG9uVmlzaWJpbGl0eVN3aXRjaENsaWNrLFxufSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cInZpc2liaWxpdHktZmlsdGVyLXdyYXBwZXJcIj5cbiAgICA8VmlzaWJpbGl0eVN3aXRjaFxuICAgICAgc2VsZWN0ZWQ9eyhzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IE9OTFlfVE9fQ09NUExFVEVcbiAgICAgICAgfHwgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyID09PSBBTExfVE9ET1MpfVxuICAgICAgb25DbGljaz17b25WaXNpYmlsaXR5U3dpdGNoQ2xpY2soT05MWV9UT19DT01QTEVURSl9XG4gICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICA+XG4gICAgICA8aSBjbGFzc05hbWU9XCJpY29uLWNpcmNsZS1ib3JkZXJcIiAvPlxuICAgIDwvVmlzaWJpbGl0eVN3aXRjaD5cbiAgICA8VmlzaWJpbGl0eVN3aXRjaFxuICAgICAgc2VsZWN0ZWQ9eyhzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IE9OTFlfQ09NUExFVEVEXG4gICAgICAgIHx8IHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciA9PT0gQUxMX1RPRE9TKX1cbiAgICAgIG9uQ2xpY2s9e29uVmlzaWJpbGl0eVN3aXRjaENsaWNrKE9OTFlfQ09NUExFVEVEKX1cbiAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgID5cbiAgICAgIDxpIGNsYXNzTmFtZT1cImljb24tY2lyY2xlXCIgLz5cbiAgICA8L1Zpc2liaWxpdHlTd2l0Y2g+XG4gIDwvZGl2PlxuKTtcblxuVmlzaWJpbGl0eUZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvblZpc2liaWxpdHlTd2l0Y2hDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFZpc2liaWxpdHlGaWx0ZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgVmlzaWJpbGl0eVN3aXRjaCA9ICh7XG4gIHNlbGVjdGVkLCBjaGlsZHJlbiwgb25DbGljayxcbn0pID0+IChcbiAgPGRpdlxuICAgIGNsYXNzTmFtZT17YHZpc2liaWxpdHktYnV0dG9uLXN3aXRjaCBhbGlnbi1pdGVtcy1jZW50ZXIgJHsoc2VsZWN0ZWQpID8gJ3NlbGVjdGVkJyA6ICcnfSBgfVxuICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gID5cbiAgICB7Y2hpbGRyZW59XG4gIDwvZGl2PlxuKTtcblxuVmlzaWJpbGl0eVN3aXRjaC5wcm9wVHlwZXMgPSB7XG4gIHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5WaXNpYmlsaXR5U3dpdGNoLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2VsZWN0ZWQ6IGZhbHNlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaWJpbGl0eVN3aXRjaDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDMwMDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgaGVpZ2h0ICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBoZWlnaHQ6IDAsXG59O1xuXG5jb25zdCBvbkVudGVyID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gYCR7bm9kZS5maXJzdEVsZW1lbnRDaGlsZC5vZmZzZXRIZWlnaHR9cHhgO1xufTtcblxuY29uc3Qgb25FeGl0ID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gJzBweCc7XG59O1xuXG5jb25zdCBDb2xsYXBzZSA9ICh7IGluOiBpblByb3AsIGNoaWxkcmVuIH0pID0+IChcbiAgPFRyYW5zaXRpb24gb25FbnRlcj17b25FbnRlcn0gb25FeGl0PXtvbkV4aXR9IGluPXtpblByb3B9IHRpbWVvdXQ9e2R1cmF0aW9ufT5cbiAgICB7KCkgPT4gKFxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuQ29sbGFwc2UucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb2xsYXBzZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDI1MDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgYWxsICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBoZWlnaHQ6ICcwcHgnLFxuICBvcGFjaXR5OiAnMCcsXG4gIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxufTtcblxuY29uc3QgdHJhbnNpdGlvblN0eWxlcyA9IHtcbiAgZW50ZXJpbmc6IHtcbiAgICBoZWlnaHQ6ICcwcHgnLFxuICAgIG9wYWNpdHk6ICcwJyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgfSxcbiAgZW50ZXJlZDoge1xuICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgaGVpZ2h0OiAnMTAwdmgnLFxuICAgIG9wYWNpdHk6ICcxJyxcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gIH0sXG59O1xuXG5jb25zdCBEaWFsb2dBbmltID0gKHsgaW46IGluUHJvcCwgY2hpbGRyZW4gfSkgPT4gKFxuICA8VHJhbnNpdGlvbiBpbj17aW5Qcm9wfSB0aW1lb3V0PXtkdXJhdGlvbn0+XG4gICAge3N0YXRlID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJiYWNrZHJvcC1kaWFsb2dcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgICAuLi50cmFuc2l0aW9uU3R5bGVzW3N0YXRlXSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuRGlhbG9nQW5pbS5wcm9wVHlwZXMgPSB7XG4gIGluOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpYWxvZ0FuaW07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSAyNTA7XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgd2lkdGg6ICcxMDAlJyxcbiAgdHJhbnNpdGlvbjogYG9wYWNpdHkgJHtkdXJhdGlvbn1tcyBlYXNlLWluLW91dGAsXG4gIG9wYWNpdHk6IDAsXG4gIGRpc3BsYXk6ICdpbmhlcml0Jyxcbn07XG5cbmNvbnN0IHRyYW5zaXRpb25TdHlsZXMgPSB7XG4gIGVudGVyOiB7IG9wYWNpdHk6IDAgfSxcbiAgZW50ZXJlZDogeyBvcGFjaXR5OiAxIH0sXG59O1xuXG5jb25zdCBSZXBsYWNlQW5pbSA9ICh7IGluOiBpblByb3AsIGVuZExpc3RlbmVyLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxUcmFuc2l0aW9uXG4gICAgaW49e2luUHJvcH1cbiAgICB0aW1lb3V0PXtkdXJhdGlvbn1cbiAgICBhZGRFbmRMaXN0ZW5lcj17ZW5kTGlzdGVuZXJ9XG4gID5cbiAgICB7c3RhdGUgPT4gKFxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgICAuLi50cmFuc2l0aW9uU3R5bGVzW3N0YXRlXSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuUmVwbGFjZUFuaW0ucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgZW5kTGlzdGVuZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVwbGFjZUFuaW07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSB7XG4gIGVudGVyOiAzMDAsXG4gIGV4aXQ6IDIwMCxcbn07XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgdHJhbnNpdGlvbjogYGFsbCAke2R1cmF0aW9uLmVudGVyfW1zIGVhc2UtaW4tb3V0YCxcbiAgaGVpZ2h0OiAwLFxuICBvcGFjaXR5OiAwLFxufTtcblxuY29uc3Qgb25FbnRlciA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XG4gIHN0eWxlLmhlaWdodCA9IGAke25vZGUuZmlyc3RFbGVtZW50Q2hpbGQub2Zmc2V0SGVpZ2h0fXB4YDtcbiAgc3R5bGUub3BhY2l0eSA9IDE7XG59O1xuXG5jb25zdCBvbkVudGVyZWQgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSAnYXV0byc7XG59O1xuXG5jb25zdCBvbkV4aXQgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSBgJHtub2RlLmZpcnN0RWxlbWVudENoaWxkLm9mZnNldEhlaWdodH1weGA7XG59O1xuXG5jb25zdCBvbkV4aXRlZCA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XG4gIHN0eWxlLmhlaWdodCA9ICcwcHgnO1xuICBzdHlsZS5vcGFjaXR5ID0gMDtcbn07XG5cblxuY29uc3QgUmVzaXplID0gKHsgLi4ucHJvcHMsIGNoaWxkcmVuIH0pID0+IChcbiAgPFRyYW5zaXRpb25cbiAgICB7Li4ucHJvcHN9XG4gICAgb25FbnRlcj17b25FbnRlcn1cbiAgICBvbkVudGVyZWQ9e29uRW50ZXJlZH1cbiAgICBvbkV4aXQ9e29uRXhpdH1cbiAgICBvbkV4aXRlZD17b25FeGl0ZWR9XG4gICAgdGltZW91dD17ZHVyYXRpb259XG4gID5cbiAgICB7KCkgPT4gKFxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuUmVzaXplLnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZXNpemU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSAyNTA7XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgdHJhbnNpdGlvbjogYGFsbCAke2R1cmF0aW9ufW1zIGVhc2UtaW4tb3V0YCxcbiAgYm90dG9tOiAnLTEwMHB4Jyxcbn07XG5cbmNvbnN0IHRyYW5zaXRpb25TdHlsZXMgPSB7XG4gIGVudGVyaW5nOiB7XG4gICAgYm90dG9tOiAnLTEwMHB4JyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgfSxcbiAgZW50ZXJlZDoge1xuICAgIGJvdHRvbTogJzBweCcsXG4gICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICB9LFxufTtcblxuY29uc3QgU25hY2tiYXJBbmltID0gKHsgaW46IGluUHJvcCwgY2hpbGRyZW4sIGN1c3RvbUNsYXNzIH0pID0+IChcbiAgPFRyYW5zaXRpb24gaW49e2luUHJvcH0gdGltZW91dD17ZHVyYXRpb259PlxuICAgIHtzdGF0ZSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPVwiY29udGVudC1zbmFja2JhclwiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxuICAgICAgICAgIC4uLnRyYW5zaXRpb25TdHlsZXNbc3RhdGVdLFxuICAgICAgICB9fVxuICAgICAgICBjbGFzc05hbWU9e2N1c3RvbUNsYXNzfVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICA8L1RyYW5zaXRpb24+XG4pO1xuXG5TbmFja2JhckFuaW0ucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIGN1c3RvbUNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuU25hY2tiYXJBbmltLmRlZmF1bHRQcm9wcyA9IHtcbiAgY3VzdG9tQ2xhc3M6ICcnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU25hY2tiYXJBbmltO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IHsgQUREX1RBU0sgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IHsgYWRkQ2F0ZWdvcnkgfSBmcm9tICcuLi8uLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUluZm8gfSBmcm9tICcuLi8uLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcblxuY2xhc3MgQWRkQ2F0ZWdvcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbmFtZTogJycsXG4gICAgfTtcbiAgICB0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlID0gdGhpcy5vbklucHV0VGV4dENoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25CdXR0b25BZGRDbGljayA9IHRoaXMub25CdXR0b25BZGRDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25DYXRlZ29yeUNyZWF0ZWQgPSB0aGlzLm9uQ2F0ZWdvcnlDcmVhdGVkLmJpbmQodGhpcyk7XG4gIH1cblxuICBvbklucHV0VGV4dENoYW5nZShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IG5hbWU6IGUudGFyZ2V0LnZhbHVlIH0pO1xuICB9XG5cbiAgb25CdXR0b25BZGRDbGljaygpIHtcbiAgICBjb25zdCB7IG5hbWUgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBkaXNwYXRjaCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAobmFtZSA9PT0gJycpIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlSW5mbyhsYWJlbHMubXNnTmFtZVJlcXVpcmVkKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRpc3BhdGNoKGFkZENhdGVnb3J5KG5hbWUsIHRoaXMub25DYXRlZ29yeUNyZWF0ZWQpKTtcbiAgfVxuXG4gIG9uQ2F0ZWdvcnlDcmVhdGVkKHNlbGVjdGVkQ2F0ZWdvcnkpIHtcbiAgICBjb25zdCB7IG9uTmV4dCB9ID0gdGhpcy5wcm9wcztcbiAgICBvbk5leHQoeyBzdGVwSWQ6IEFERF9UQVNLLCBvcHRpb25zOiB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWFkZC1jYXRlZ29yeVwiPlxuICAgICAgICA8aDI+e2xhYmVscy50aXRsZUFkZENhdGVnb3J5fTwvaDI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtsYWJlbHMucGxhY2Vob2xkZXJOYW1lfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dFRleHRDaGFuZ2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1idXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkJ1dHRvbkFkZENsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYWJlbHMuYnV0dG9uQWRkfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQWRkQ2F0ZWdvcnkucHJvcFR5cGVzID0ge1xuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCgpKEFkZENhdGVnb3J5KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi9jb25zdGFudHMvbGFiZWxzJztcbmltcG9ydCB7IFNFTEVDVF9DT01QTEVURV9EQVRFIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5jbGFzcyBBZGRUYXNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdGl0bGU6ICcnLFxuICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgIH07XG4gICAgdGhpcy5vbklucHV0VGV4dENoYW5nZSA9IHRoaXMub25JbnB1dFRleHRDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQnV0dG9uU2NoZWR1bGVDbGljayA9IHRoaXMub25CdXR0b25TY2hlZHVsZUNsaWNrLmJpbmQodGhpcyk7XG4gIH1cblxuICBvbklucHV0VGV4dENoYW5nZShuYW1lKSB7XG4gICAgcmV0dXJuIChlKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgW25hbWVdOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgICB9O1xuICB9XG5cbiAgb25CdXR0b25TY2hlZHVsZUNsaWNrKCkge1xuICAgIGNvbnN0IHsgb3B0aW9ucywgZGlzcGF0Y2gsIG9uTmV4dCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBjYXRlZ29yeSA9IG9wdGlvbnMuc2VsZWN0ZWRDYXRlZ29yeTtcbiAgICBpZiAodGl0bGUgPT09ICcnKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ1RpdGxlUmVxdWlyZWQpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25OZXh0KHsgc3RlcElkOiBTRUxFQ1RfQ09NUExFVEVfREFURSwgb3B0aW9uczogeyB0aXRsZSwgZGVzY3JpcHRpb24sIGNhdGVnb3J5IH0gfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBzZWxlY3RlZENhdGVnb3J5IH0gPSB0aGlzLnByb3BzLm9wdGlvbnM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1hZGQtdGFza1wiPlxuICAgICAgICA8aDI+e2xhYmVscy50aXRsZUFkZFRhc2t9PC9oMj5cbiAgICAgICAgPGgzPlxuICAgICAgICAgIHtsYWJlbHMubGFiZWxGb3JDYXRlZ29yeX1cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsYWJlbC1jYXRlZ29yeS1uYW1lXCI+XG4gICAgICAgICAgICB7YCAke3NlbGVjdGVkQ2F0ZWdvcnkubmFtZX1gfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9oMz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWZpZWxkc1wiPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17bGFiZWxzLnBsYWNlSG9sZGVyVGl0bGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0VGV4dENoYW5nZSgndGl0bGUnKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17bGFiZWxzLnBsYWNlSG9sZGVyRGVzY3JpcHRpb259XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0VGV4dENoYW5nZSgnZGVzY3JpcHRpb24nKX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQnV0dG9uU2NoZWR1bGVDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGFiZWxzLmJ1dHRvblNjaGVkdWxlfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQWRkVGFzay5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvcHRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHNlbGVjdGVkQ2F0ZWdvcnk6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIH0pLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoKShBZGRUYXNrKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgU2VsZWN0QWN0aW9uQWRkIGZyb20gJy4vU2VsZWN0QWN0aW9uQWRkJztcbmltcG9ydCBBZGRDYXRlZ29yeSBmcm9tICcuL0FkZENhdGVnb3J5JztcbmltcG9ydCBTZWxlY3RDYXRlZ29yeSBmcm9tICcuL1NlbGVjdENhdGVnb3J5JztcbmltcG9ydCBBZGRUYXNrIGZyb20gJy4vQWRkVGFzayc7XG5pbXBvcnQgU2VsZWN0Q29tcGxldGVEYXRlIGZyb20gJy4vU2VsZWN0Q29tcGxldGVEYXRlJztcbmltcG9ydCBEb25lIGZyb20gJy4vRG9uZSc7XG5pbXBvcnQge1xuICBTRUxFQ1RfV0FOVF9UT19BREQsXG4gIEFERF9DQVRFR09SWSxcbiAgQUREX1RBU0ssXG4gIFNFTEVDVF9DQVRFR09SWSxcbiAgU0VMRUNUX0NPTVBMRVRFX0RBVEUsXG4gIERPTkUsXG4gIHN0ZXBMaXN0LFxufSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IFJlcGxhY2VBbmltIGZyb20gJy4uL2FuaW1zL1JlcGxhY2VBbmltJztcbmltcG9ydCBEaWFsb2dBbmltIGZyb20gJy4uL2FuaW1zL0RpYWxvZ0FuaW0nO1xuaW1wb3J0IFN0ZXBzIGZyb20gJy4vU3RlcHMnO1xuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi9jb25zdGFudHMvbGFiZWxzJztcblxuY29uc3QgZ2V0Q29udGVudFRvUmVuZGVyID0gKHN0ZXBzLCBwcm9wcykgPT4ge1xuICBpZiAoc3RlcHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIDxTZWxlY3RBY3Rpb25BZGQgey4uLnByb3BzfSAvPjtcbiAgfVxuICBjb25zdCBsYXN0U3RlcCA9IHN0ZXBzW3N0ZXBzLmxlbmd0aCAtIDFdO1xuICBzd2l0Y2ggKGxhc3RTdGVwLnN0ZXBJZCkge1xuICAgIGNhc2UgU0VMRUNUX1dBTlRfVE9fQUREOlxuICAgICAgcmV0dXJuIDxTZWxlY3RBY3Rpb25BZGQgey4uLnByb3BzfSAvPjtcbiAgICBjYXNlIEFERF9DQVRFR09SWTpcbiAgICAgIHJldHVybiA8QWRkQ2F0ZWdvcnkgey4uLnByb3BzfSAvPjtcbiAgICBjYXNlIEFERF9UQVNLOlxuICAgICAgcmV0dXJuIDxBZGRUYXNrIHsuLi5wcm9wc30gb3B0aW9ucz17bGFzdFN0ZXAub3B0aW9uc30gLz47XG4gICAgY2FzZSBTRUxFQ1RfQ0FURUdPUlk6XG4gICAgICByZXR1cm4gPFNlbGVjdENhdGVnb3J5IHsuLi5wcm9wc30gLz47XG4gICAgY2FzZSBTRUxFQ1RfQ09NUExFVEVfREFURTpcbiAgICAgIHJldHVybiA8U2VsZWN0Q29tcGxldGVEYXRlIHsuLi5wcm9wc30gb3B0aW9ucz17bGFzdFN0ZXAub3B0aW9uc30gLz47XG4gICAgY2FzZSBET05FOlxuICAgICAgcmV0dXJuIDxEb25lIHsuLi5wcm9wc30gLz47XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiA8U2VsZWN0QWN0aW9uQWRkIHsuLi5wcm9wc30gLz47XG4gIH1cbn07XG5cbmNvbnN0IGluaXRhbFN0YXRlID0ge1xuICBuZXh0U3RlcHM6IFtdLFxuICBzdGVwczogW1xuICAgIHtcbiAgICAgIHN0ZXBJZDogU0VMRUNUX1dBTlRfVE9fQURELFxuICAgICAgb3B0aW9uczoge30sXG4gICAgfSxcbiAgXSxcbiAgc2hvd1N0ZXA6IHRydWUsXG59O1xuXG5jbGFzcyBEaWFsb2dBZGQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLi4uaW5pdGFsU3RhdGUsXG4gICAgfTtcbiAgICB0aGlzLm9uQmFjayA9IHRoaXMub25CYWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbk5leHQgPSB0aGlzLm9uTmV4dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25SZXNldEFuZENsb3NlID0gdGhpcy5vblJlc2V0QW5kQ2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQW5pbWF0aW9uRW5kID0gdGhpcy5vbkFuaW1hdGlvbkVuZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25CYWNrKCkge1xuICAgIGNvbnN0IHsgc3RlcHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvbkNsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHN0ZXBDb3VudCA9IHN0ZXBzLmxlbmd0aDtcbiAgICBpZiAoc3RlcENvdW50ID09PSAxKSB7XG4gICAgICAvLyBSZXR1cm5lZCB0byB0aGUgZmlyc3Qgc3RlcHMsIGNsb3NlIHRoZSBkaWFsb2dcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi5pbml0YWxTdGF0ZSB9KTtcbiAgICAgIG9uQ2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5leHRTdGVwczogW1xuICAgICAgICAgIC4uLnN0ZXBzLnNsaWNlKDAsIHN0ZXBzLmxlbmd0aCAtIDEpLFxuICAgICAgICBdLFxuICAgICAgICBzaG93U3RlcDogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbk5leHQoc3RlcCA9IHsgc3RlcElkOiAnJywgb3B0aW9uczoge30gfSkge1xuICAgIGNvbnN0IHsgc3RlcHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZXh0U3RlcHM6IFtcbiAgICAgICAgLi4uc3RlcHMsIHtcbiAgICAgICAgICAuLi5zdGVwLFxuICAgICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHNob3dTdGVwOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIG9uUmVzZXRBbmRDbG9zZSgpIHtcbiAgICBjb25zdCB7IG9uQ2xvc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgb25DbG9zZSgpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLmluaXRhbFN0YXRlIH0pO1xuICAgIH0sIDUwMCk7XG4gIH1cblxuICBvbkFuaW1hdGlvbkVuZChub2RlLCBkb25lKSB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgKCkgPT4ge1xuICAgICAgZG9uZSgpO1xuICAgICAgY29uc3QgeyBuZXh0U3RlcHMsIHNob3dTdGVwIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgaWYgKHNob3dTdGVwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzdGVwczogW1xuICAgICAgICAgIC4uLm5leHRTdGVwcyxcbiAgICAgICAgXSxcbiAgICAgICAgc2hvd1N0ZXA6IHRydWUsXG4gICAgICB9KTtcbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBzdGVwcywgc2hvd1N0ZXAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvbkNsb3NlLCBvcGVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgb25OZXh0LCBvblJlc2V0QW5kQ2xvc2UsIG9uQW5pbWF0aW9uRW5kIH0gPSB0aGlzO1xuICAgIHJldHVybiAoXG4gICAgICA8RGlhbG9nQW5pbSBpbj17b3Blbn0+XG4gICAgICAgIDxkaXYgaWQ9XCJkaWFsb2ctYWRkXCIgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlhbG9nLWhlYWRlclwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cIm1haW4tY2xvc2UtYnV0dG9uXCIgb25DbGljaz17KCkgPT4gb25DbG9zZSgpfT5cbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj4mI3hFNUNEOzwvaT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcHMtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8U3RlcHNcbiAgICAgICAgICAgICAgbGlzdD17c3RlcExpc3R9XG4gICAgICAgICAgICAgIHN0ZXBIaXN0b3J5PXtzdGVwc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaWFsb2ctY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8UmVwbGFjZUFuaW0gaW49e3Nob3dTdGVwfSBlbmRMaXN0ZW5lcj17b25BbmltYXRpb25FbmR9PlxuICAgICAgICAgICAgICB7Z2V0Q29udGVudFRvUmVuZGVyKHN0ZXBzLCB7IG9uTmV4dCwgb25DbG9zZTogb25SZXNldEFuZENsb3NlIH0pfVxuICAgICAgICAgICAgPC9SZXBsYWNlQW5pbT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpYWxvZy1mb290ZXJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgaWQ9XCJiYWNrLWJ1dHRvbi1kaWFsb2dcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMub25CYWNrKCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtsYWJlbHMuYnV0dG9uQmFja31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvRGlhbG9nQW5pbT5cbiAgICApO1xuICB9XG59XG5cbkRpYWxvZ0FkZC5wcm9wVHlwZXMgPSB7XG4gIG9wZW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaWFsb2dBZGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5cbmNsYXNzIERvbmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHsgb25DbG9zZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgIG9uQ2xvc2UoKTtcbiAgICB9LCAzMDAwKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWRvbmUtYWRkXCI+XG4gICAgICAgIDxoMj57bGFiZWxzLmxhYmVsRG9uZX08L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtaWMtZG9uZVwiPlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz1cIi4vY2xpZW50L3B1YmxpYy9pbWcvaWMtZG9uZS5zdmdcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaWMtZG9uZVwiXG4gICAgICAgICAgICBhbHQ9XCJkb25lIGljb25cIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Eb25lLnByb3BUeXBlcyA9IHtcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERvbmU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHsgQUREX0NBVEVHT1JZLCBTRUxFQ1RfQ0FURUdPUlkgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi9jb25zdGFudHMvbGFiZWxzJztcblxuY29uc3QgU2VsZWN0QWN0aW9uQWRkID0gKHsgb25OZXh0IH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LXNlbGVjdC1hY3Rpb24tYWRkXCI+XG4gICAgPGgyPntsYWJlbHMudGl0bGVBZGR9PC9oMj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW0tc2VsZWN0XCI+XG4gICAgICA8cFxuICAgICAgICBjbGFzc05hbWU9XCJzZWxlY3QtdGl0bGVcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk5leHQoeyBzdGVwSWQ6IEFERF9DQVRFR09SWSwgb3B0aW9uczoge30gfSl9XG4gICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgPlxuICAgICAgICB7bGFiZWxzLmxhYmVsQ2F0ZWdvcnl9XG4gICAgICA8L3A+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtLXNlbGVjdFwiPlxuICAgICAgPHBcbiAgICAgICAgY2xhc3NOYW1lPVwic2VsZWN0LXRpdGxlXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4gb25OZXh0KHsgc3RlcElkOiBTRUxFQ1RfQ0FURUdPUlksIG9wdGlvbnM6IHt9IH0pfVxuICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgID5cbiAgICAgICAge2xhYmVscy5sYWJlbFRhc2t9XG4gICAgICA8L3A+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuU2VsZWN0QWN0aW9uQWRkLnByb3BUeXBlcyA9IHtcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0QWN0aW9uQWRkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IENhdGVnb3J5IGZyb20gJy4uL0NhdGVnb3J5JztcbmltcG9ydCB7IEFERF9UQVNLIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5cbmNsYXNzIFNlbGVjdENhdGVnb3J5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlbGVjdGVkQ2F0ZWdvcnk6IHVuZGVmaW5lZCxcbiAgICB9O1xuICAgIHRoaXMub25DYXRlZ29yeUNsaWNrID0gdGhpcy5vbkNhdGVnb3J5Q2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQnV0dG9uTmV4dENsaWNrID0gdGhpcy5vbkJ1dHRvbk5leHRDbGljay5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25DYXRlZ29yeUNsaWNrKGNhdGVnb3J5KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkQ2F0ZWdvcnk6IGNhdGVnb3J5IH0pO1xuICB9XG5cbiAgb25CdXR0b25OZXh0Q2xpY2soKSB7XG4gICAgY29uc3QgeyBzZWxlY3RlZENhdGVnb3J5IH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgb25OZXh0LCBkaXNwYXRjaCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoc2VsZWN0ZWRDYXRlZ29yeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ1NlbGVjdENhdGVnb3J5KSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9uTmV4dCh7IHN0ZXBJZDogQUREX1RBU0ssIG9wdGlvbnM6IHsgc2VsZWN0ZWRDYXRlZ29yeSB9IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2F0ZWdvcmllc0xpc3QgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBzZWxlY3RlZENhdGVnb3J5IH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtc2VsZWN0LWNhdGVnb3J5XCI+XG4gICAgICAgIDxoMj57bGFiZWxzLnRpdGxlQ2hvb3NlQ2F0ZWdvcnl9PC9oMj5cbiAgICAgICAgPGRpdiBpZD1cImNvbnRlbnQtY2F0ZWdvcmllc1wiPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNhdGVnb3JpZXNMaXN0Lm1hcChjYXRlZ29yeSA9PiAoXG4gICAgICAgICAgICAgIChjYXRlZ29yeS5pZCAhPT0gJzAnKVxuICAgICAgICAgICAgICA/IDxDYXRlZ29yeVxuICAgICAgICAgICAgICAgIGtleT17Y2F0ZWdvcnkuaWR9XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk9e2NhdGVnb3J5fVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtzZWxlY3RlZENhdGVnb3J5ICE9PSB1bmRlZmluZWQgJiYgY2F0ZWdvcnkuaWQgPT09IHNlbGVjdGVkQ2F0ZWdvcnkuaWR9XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNhdGVnb3J5Q2xpY2t9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICApKVxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1idXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkJ1dHRvbk5leHRDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGFiZWxzLmJ1dHRvbk5leHR9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TZWxlY3RDYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjYXRlZ29yaWVzTGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3AgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICBjYXRlZ29yaWVzTGlzdDogc3RhdGUudG9kb0ZpbHRlcnMuY2F0ZWdvcmllcyxcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcCkoU2VsZWN0Q2F0ZWdvcnkpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IERhdGVQaWNrZXIgZnJvbSAncmVhY3QtZGF0ZS1waWNrZXInO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IHsgRE9ORSB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgeyBhZGRUYXNrIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy90b2RvVGFza3NBY3Rpb25zJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5jbGFzcyBTZWxlY3RDb21wbGV0ZURhdGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdG9kb1dpdGhpbjogbmV3IERhdGUoKSxcbiAgICB9O1xuICAgIHRoaXMub25JbnB1dERhdGVDaGFuZ2UgPSB0aGlzLm9uSW5wdXREYXRlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkJ1dHRvbkFkZENsaWNrID0gdGhpcy5vbkJ1dHRvbkFkZENsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblRvZG9UYXNrQ3JlYXRlZCA9IHRoaXMub25Ub2RvVGFza0NyZWF0ZWQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uSW5wdXREYXRlQ2hhbmdlKGRhdGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgdG9kb1dpdGhpbjogZGF0ZSB9KTtcbiAgfVxuXG4gIG9uQnV0dG9uQWRkQ2xpY2soKSB7XG4gICAgY29uc3QgeyB0b2RvV2l0aGluIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgZGlzcGF0Y2gsIG9wdGlvbnMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyB0aXRsZSwgZGVzY3JpcHRpb24sIGNhdGVnb3J5IH0gPSBvcHRpb25zO1xuICAgIGlmICghdG9kb1dpdGhpbiB8fCB0b2RvV2l0aGluID09PSAnJykge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VJbmZvKGxhYmVscy5tc2dTZWxlY3REYXRlKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRpc3BhdGNoKGFkZFRhc2soXG4gICAgICB0aXRsZSwgZGVzY3JpcHRpb24sXG4gICAgICBjYXRlZ29yeSwgdG9kb1dpdGhpbiwgdGhpcy5vblRvZG9UYXNrQ3JlYXRlZCxcbiAgICApKTtcbiAgfVxuXG4gIG9uVG9kb1Rhc2tDcmVhdGVkKCkge1xuICAgIGNvbnN0IHsgb25OZXh0IH0gPSB0aGlzLnByb3BzO1xuICAgIG9uTmV4dCh7IHN0ZXBJZDogRE9ORSwgb3B0aW9uczogeyB9IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgdG9kb1dpdGhpbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LXNlbGVjdC1jb21wbGV0ZS1kYXRlXCI+XG4gICAgICAgIDxoMj57bGFiZWxzLnRpdGxlVG9kb1dpdGhpbn08L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtaW5wdXRcIj5cbiAgICAgICAgICA8RGF0ZVBpY2tlclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICBjYWxlbmRhckNsYXNzTmFtZT1cImRhcmstY2FsZW5kYXJcIlxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dERhdGVDaGFuZ2V9XG4gICAgICAgICAgICB2YWx1ZT17dG9kb1dpdGhpbn1cbiAgICAgICAgICAgIG1pbkRhdGU9e25ldyBEYXRlKCl9XG4gICAgICAgICAgICBsb2NhbGU9XCJlbi1VU1wiXG4gICAgICAgICAgICBjbGVhckljb249ezxpIGNsYXNzTmFtZT1cImljb24tZGVsZXRlXCIgLz59XG4gICAgICAgICAgICBjYWxlbmRhckljb249ezxpIGNsYXNzTmFtZT1cImljb24tY2FsZW5kYXJcIiAvPn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQnV0dG9uQWRkQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xhYmVscy5idXR0b25BZGR9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TZWxlY3RDb21wbGV0ZURhdGUucHJvcFR5cGVzID0ge1xuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb3B0aW9uczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY2F0ZWdvcnk6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIH0pLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoKShTZWxlY3RDb21wbGV0ZURhdGUpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IFN0ZXAgPSAoeyBkZXNjcmlwdGlvbiwgY29tcGxldGVkLCBuZWVkTGluZSB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1jb250YWluZXJcIj5cbiAgICB7XG4gICAgICBuZWVkTGluZSAmJlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BsaW5lICR7KGNvbXBsZXRlZCkgPyAnY29tcGxldGVkJyA6ICcnfWB9IC8+XG4gICAgfVxuICAgIDxkaXYgY2xhc3NOYW1lPXtgc3RlcCAkeyhjb21wbGV0ZWQpID8gJ2NvbXBsZXRlZCcgOiAnJ31gfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5kaWNhdG9yXCIgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1kZXNjcmlwdGlvblwiPlxuICAgICAgICA8cD57ZGVzY3JpcHRpb259PC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuU3RlcC5wcm9wVHlwZXMgPSB7XG4gIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgbmVlZExpbmU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5jb25zdCBTdGVwcyA9ICh7IGxpc3QsIHN0ZXBIaXN0b3J5IH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJzdGVwcy13cmFwcGVyXCI+XG4gICAge1xuICAgICAgbGlzdC5tYXAoKGl0ZW0sIGkpID0+IChcbiAgICAgICAgPFN0ZXBcbiAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgey4uLml0ZW19XG4gICAgICAgICAgY29tcGxldGVkPXtzdGVwSGlzdG9yeS5maWx0ZXIoc2ggPT4gc2guc3RlcElkID09PSBpdGVtLmlkKS5sZW5ndGggPiAwfVxuICAgICAgICAgIG5lZWRMaW5lPXtpID4gMH1cbiAgICAgICAgLz4pKVxuICAgIH1cbiAgPC9kaXY+XG4pO1xuXG5TdGVwcy5wcm9wVHlwZXMgPSB7XG4gIGxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICBzdGVwSGlzdG9yeTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBzdGVwSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH0pKS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3RlcHM7XG4iLCJjb25zdCBsYWJlbHMgPSB7XG4gIHRpdGxlQWRkOiAnV2hhdCB3b3VsZCB5b3UgbGlrZSB0byBhZGQ/JyxcbiAgdGl0bGVBZGRDYXRlZ29yeTogJ0FkZCBuZXcgQ0FURUdPUlknLFxuICB0aXRsZUFkZFRhc2s6ICdBZGQgbmV3IFRhc2snLFxuICB0aXRsZUNob29zZUNhdGVnb3J5OiAnQ2hvb3NlIGEgQ0FURUdPUlknLFxuICB0aXRsZVRvZG9XaXRoaW46ICdUb2RvIFdpdGhpbicsXG4gIGxhYmVsRm9yQ2F0ZWdvcnk6ICdmb3IgdGhlIGNhdGVnb3J5OicsXG4gIGxhYmVsRG9uZTogJ0RvbmUhJyxcbiAgbGFiZWxDYXRlZ29yeTogJ0NBVEVHT1JZJyxcbiAgbGFiZWxUYXNrOiAnVEFTSycsXG4gIGxhYmVsTm90U2V0OiAnbm90IHNldCcsXG4gIGxhYmVsTm9EZXNjcmlwdGlvbjogJ05vIGRlc2NyaXB0aW9uIHRvIHNob3cgOignLFxuICBsYWJlbFBhcnRpYWxDb21wbGV0ZWQ6ICdjb21wbGV0ZWQnLFxuICBsYWJlbFBhcnRpYWxUb0NvbXBsZXRlZDogJ3RvIGNvbXBsZXRlIHdpdGhpbicsXG4gIHBsYWNlSG9sZGVyVGl0bGU6ICdUeXBlIHRoZSB0aXRsZScsXG4gIHBsYWNlSG9sZGVyRGVzY3JpcHRpb246ICdUeXBlIHRoZSBkZXNjcmlwdGlvbicsXG4gIHBsYWNlaG9sZGVyTmFtZTogJ1R5cGUgdGhlIG5hbWUnLFxuICBidXR0b25TY2hlZHVsZTogJ1NDSEVEVUxFJyxcbiAgYnV0dG9uQWRkOiAnQUREJyxcbiAgYnV0dG9uTmV4dDogJ05FWFQnLFxuICBidXR0b25CYWNrOiAnTkVWRVIgTUlORCwgR08gQkFDSycsXG4gIG1zZ1RpdGxlUmVxdWlyZWQ6ICdFbnRlciB0aGUgdGl0bGUnLFxuICBtc2dOYW1lUmVxdWlyZWQ6ICdFbnRlciB0aGUgbmFtZScsXG4gIG1zZ1NlbGVjdENhdGVnb3J5OiAnU2VsZWN0IGEgY2F0ZWdvcnknLFxuICBtc2dTZWxlY3REYXRlOiAnUGljayBhIGRhdGUgYW5kIGNvbW1pdC4gTm8gZXhjdXNlcyEnLFxuICBzdGVwRGVzY1dhbnRUb0FkZDogJ1doYXQgd2FudCB0byBhZGQnLFxuICBzdGVwRGVzY0FkZENhdGVnb3J5OiAnQWRkIGEgY2F0ZWdvcnknLFxuICBzdGVwRGVzY3JTZWxlY0NhdGVnb3J5OiAnU2VsZWN0IGEgY2F0ZWdvcnknLFxuICBzdGVwRGVzY0FkZFRhc2s6ICdBZGQgdGFzaycsXG4gIHN0ZXBEZXNjQ29tcGxldGVEYXRlOiAnU2NoZWR1bGUnLFxuICBzdGVwRGVzY0RvbmU6ICdUaGF0XFwncyBpdCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBsYWJlbHM7XG4iLCJpbXBvcnQgbGFiZWxzIGZyb20gJy4vbGFiZWxzJztcblxuZXhwb3J0IGNvbnN0IFNFTEVDVF9XQU5UX1RPX0FERCA9ICdTRUxFQ1RfV0FOVF9UT19BREQnO1xuZXhwb3J0IGNvbnN0IEFERF9DQVRFR09SWSA9ICdBRERfQ0FURUdPUlknO1xuZXhwb3J0IGNvbnN0IEFERF9UQVNLID0gJ0FERF9UQVNLJztcbmV4cG9ydCBjb25zdCBTRUxFQ1RfQ0FURUdPUlkgPSAnU0VMRUNUX0NBVEVHT1JZJztcbmV4cG9ydCBjb25zdCBTRUxFQ1RfQ09NUExFVEVfREFURSA9ICdTRUxFQ1RfQ09NUExFVEVfREFURSc7XG5leHBvcnQgY29uc3QgRE9ORSA9ICdET05FJztcblxuZXhwb3J0IGNvbnN0IHN0ZXBMaXN0ID0gW1xuICB7XG4gICAgaWQ6IFNFTEVDVF9XQU5UX1RPX0FERCxcbiAgICBkZXNjcmlwdGlvbjogbGFiZWxzLnN0ZXBEZXNjV2FudFRvQWRkLFxuICB9LFxuICB7XG4gICAgaWQ6IEFERF9DQVRFR09SWSxcbiAgICBkZXNjcmlwdGlvbjogbGFiZWxzLnN0ZXBEZXNjQWRkQ2F0ZWdvcnksXG4gIH0sXG4gIHtcbiAgICBpZDogU0VMRUNUX0NBVEVHT1JZLFxuICAgIGRlc2NyaXB0aW9uOiBsYWJlbHMuc3RlcERlc2NyU2VsZWNDYXRlZ29yeSxcbiAgfSxcbiAge1xuICAgIGlkOiBBRERfVEFTSyxcbiAgICBkZXNjcmlwdGlvbjogbGFiZWxzLnN0ZXBEZXNjQWRkVGFzayxcbiAgfSxcbiAge1xuICAgIGlkOiBTRUxFQ1RfQ09NUExFVEVfREFURSxcbiAgICBkZXNjcmlwdGlvbjogbGFiZWxzLnN0ZXBEZXNjQ29tcGxldGVEYXRlLFxuICB9LFxuICB7XG4gICAgaWQ6IERPTkUsXG4gICAgZGVzY3JpcHRpb246IGxhYmVscy5zdGVwRGVzY0RvbmUsXG4gIH0sXG5dO1xuIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBDYXRlZ29yaWVzRmlsdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvQ2F0ZWdvcmllc0ZpbHRlcic7XG5pbXBvcnQge1xuICBzZWxlY3RDYXRlZ29yeSxcbiAgc2VsZWN0Q2F0ZWdvcnlBbGwsXG4gIGRlbGV0ZUNhdGVnb3J5LFxufSBmcm9tICcuLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5pbXBvcnQgY2F0ZWdvcnlBbGwgZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmltcG9ydCB7IGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0IH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgY2F0ZWdvcnlMaXN0OiBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdChzdGF0ZSksXG4gIH1cbik7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcbiAge1xuICAgIG9uRGVsZXRlQ2F0ZWdvcnk6IChjYXRlZ29yeSkgPT4ge1xuICAgICAgZGlzcGF0Y2goZGVsZXRlQ2F0ZWdvcnkoY2F0ZWdvcnkuaWQpKTtcbiAgICB9LFxuICAgIG9uQ2lsY2tDYXRlZ29yeTogKGNhdGVnb3J5LCBlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnaScgJiYgZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnYnV0dG9uJykge1xuICAgICAgICBpZiAoY2F0ZWdvcnkuaWQgPT09IGNhdGVnb3J5QWxsLmlkKSB7XG4gICAgICAgICAgZGlzcGF0Y2goc2VsZWN0Q2F0ZWdvcnlBbGwoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGlzcGF0Y2goc2VsZWN0Q2F0ZWdvcnkoY2F0ZWdvcnkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gIH1cbik7XG5cbmNvbnN0IENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIgPSBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbikoQ2F0ZWdvcmllc0ZpbHRlcik7XG5cbmV4cG9ydCBkZWZhdWx0IENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXI7XG4iLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFRhc2tzIGZyb20gJy4uL2NvbXBvbmVudHMvVGFza3MnO1xuaW1wb3J0IHtcbiAgZmV0Y2hUYXNrc0J5Q2F0ZWdvcnksXG4gIGRlbGV0ZVRhc2ssXG4gIHRvb2dsZVRhc2tDb21wbGV0ZWQsXG59IGZyb20gJy4uL2FjdGlvbnMvdG9kb1Rhc2tzQWN0aW9ucyc7XG5cbmltcG9ydCB7IGdldFRhc2tMaXN0LCBnZXRTa2lwLCBzdGlsbE1vcmVUb0xvYWQgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb1Rhc2tzU2VsZWN0b3JzJztcbmltcG9ydCB7IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkLCB2aXNpYmlsaXR5T25seUNvbXBsZXRlZCB9IGZyb20gJy4uL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IChcbiAge1xuICAgIHRhc2tMaXN0OiBnZXRUYXNrTGlzdChzdGF0ZSksXG4gICAgc2tpcDogZ2V0U2tpcChzdGF0ZSksXG4gICAgbW9yZVRvTG9hZDogc3RpbGxNb3JlVG9Mb2FkKHN0YXRlKSxcbiAgICBjYXRlZ29yaWVzSWQ6IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkKHN0YXRlKSxcbiAgICBjb21wbGV0ZWQ6IHZpc2liaWxpdHlPbmx5Q29tcGxldGVkKHN0YXRlKSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgb25EZWxldGVUYXNrOiAodGFzaykgPT4ge1xuICAgICAgZGlzcGF0Y2goZGVsZXRlVGFzayh0YXNrLmlkKSk7XG4gICAgfSxcbiAgICBvbkNvbXBsZXRlVGFzazogKHRhc2spID0+IHtcbiAgICAgIGRpc3BhdGNoKHRvb2dsZVRhc2tDb21wbGV0ZWQodGFzay5pZCwgdGFzay5jb21wbGV0ZWQpKTtcbiAgICB9LFxuICAgIGZldGNoVGFza3M6IChjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCwgbGltaXQsIHNraXApID0+IHtcbiAgICAgIGRpc3BhdGNoKGZldGNoVGFza3NCeUNhdGVnb3J5KGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgc2tpcCkpO1xuICAgIH0sXG4gIH1cbik7XG5cbmNvbnN0IFRhc2tzQ29udGFpbmVyID0gY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pKFRhc2tzKTtcblxuZXhwb3J0IGRlZmF1bHQgVGFza3NDb250YWluZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IFRvZG9zIGZyb20gJy4uL2NvbXBvbmVudHMvVG9kb3MnO1xuaW1wb3J0IHsgZmV0Y2hBbGxDYXRlZ29yaWVzIH0gZnJvbSAnLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuaW1wb3J0IHsgaGlkZU1lc3NhZ2UgfSBmcm9tICcuLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcbmltcG9ydCB7IHNob3dMb2FkaW5nIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbW1vblNlbGVjdG9ycyc7XG5cbmNvbnN0IFRvZG9zQ29udGFpbmVyID0gcHJvcHMgPT4gPFRvZG9zIHsuLi5wcm9wc30gLz47XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IChcbiAge1xuICAgIG1lc3NhZ2U6IHN0YXRlLm1lc3NhZ2UsXG4gICAgc2hvd0xvYWRpbmc6IHNob3dMb2FkaW5nKHN0YXRlKSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgaGlkZU1lc3NhZ2U6ICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKGhpZGVNZXNzYWdlKCkpO1xuICAgIH0sXG4gICAgaW5pdEZldGNoQWxsQ2F0ZWdvcmllczogKCkgPT4ge1xuICAgICAgZGlzcGF0Y2goZmV0Y2hBbGxDYXRlZ29yaWVzKCkpO1xuICAgIH0sXG4gIH1cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFRvZG9zQ29udGFpbmVyKTtcbiIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlzaWJpbGl0eUZpbHRlcnMgZnJvbSAnLi4vY29tcG9uZW50cy9WaXNpYmlsaXR5RmlsdGVycyc7XG5pbXBvcnQgeyBjaGFuZ2VWaXNpYmlsaXR5IH0gZnJvbSAnLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuXG5pbXBvcnQgeyBnZXRWaXNpYmlsaXR5RmlsdGVyIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyOiBnZXRWaXNpYmlsaXR5RmlsdGVyKHN0YXRlKSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgb25WaXNpYmlsaXR5U3dpdGNoQ2xpY2s6IHZpc2liaWxpdHkgPT4gKCkgPT4gKFxuICAgICAgZGlzcGF0Y2goY2hhbmdlVmlzaWJpbGl0eSh2aXNpYmlsaXR5KSlcbiAgICApLFxuICB9XG4pO1xuXG5jb25zdCBWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyID0gY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pKFZpc2liaWxpdHlGaWx0ZXJzKTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lcjtcbiIsImltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHsgaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIgfSBmcm9tICcuL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcbmltcG9ydCB7IGlzRmV0Y2hpbmdUYXNrcyB9IGZyb20gJy4vdG9kb1Rhc2tzU2VsZWN0b3JzJztcblxuZXhwb3J0IGNvbnN0IHNob3dMb2FkaW5nID0gY3JlYXRlU2VsZWN0b3IoXG4gIGlzRmV0Y2hpbmdDYXRlZ29yaWVzRmlsdGVyLFxuICBpc0ZldGNoaW5nVGFza3MsXG4gIChpc0ZldGNoaW5nQ2F0ZWdvcmllcywgaXNGZXRjaGluZ1RvZG9zKSA9PiBpc0ZldGNoaW5nQ2F0ZWdvcmllcyB8fCBpc0ZldGNoaW5nVG9kb3MsXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBzaG93TG9hZGluZztcbiIsImltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHsgT05MWV9DT01QTEVURUQgfSBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcblxuZXhwb3J0IGNvbnN0IGlzRmV0Y2hpbmdDYXRlZ29yaWVzRmlsdGVyID0gc3RhdGUgPT4gc3RhdGUudG9kb0ZpbHRlcnMuaXNGZXRjaGluZztcbmV4cG9ydCBjb25zdCBnZXRUb2RvRmlsdGVycyA9IHN0YXRlID0+IHN0YXRlLnRvZG9GaWx0ZXJzO1xuZXhwb3J0IGNvbnN0IGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0ID0gc3RhdGUgPT4gc3RhdGUudG9kb0ZpbHRlcnMuY2F0ZWdvcmllcztcbmV4cG9ydCBjb25zdCBnZXRWaXNpYmlsaXR5RmlsdGVyID0gc3RhdGUgPT4gc3RhdGUudG9kb0ZpbHRlcnMudmlzaWJpbGl0eTtcblxuZXhwb3J0IGNvbnN0IHZpc2liaWxpdHlPbmx5Q29tcGxldGVkID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldFZpc2liaWxpdHlGaWx0ZXIsXG4gIHZpc2liaWxpdHkgPT4gdmlzaWJpbGl0eSA9PT0gT05MWV9DT01QTEVURUQsXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzRmlsdGVyID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0LFxuICBjYXRlZ29yaWVzID0+IGNhdGVnb3JpZXMuZmlsdGVyKGNhdGVnb3J5ID0+IGNhdGVnb3J5LnNlbGVjdGVkKSxcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRTZWxlY3RlZENhdGVnb3JpZXNJZCA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdCxcbiAgY2F0ZWdvcmllcyA9PiBjYXRlZ29yaWVzLmZpbHRlcihjYXRlZ29yeSA9PiBjYXRlZ29yeS5zZWxlY3RlZClcbiAgICAubWFwKGNhdGVnb3J5RmlsdGVyID0+IGNhdGVnb3J5RmlsdGVyLmlkKSxcbik7XG4iLCJleHBvcnQgY29uc3QgaXNGZXRjaGluZ1Rhc2tzID0gc3RhdGUgPT4gc3RhdGUudG9kb1Rhc2tzLmlzRmV0Y2hpbmc7XG5leHBvcnQgY29uc3QgZ2V0VGFza3MgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvVGFza3M7XG5leHBvcnQgY29uc3QgZ2V0VGFza0xpc3QgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvVGFza3MuaXRlbXM7XG5leHBvcnQgY29uc3QgZ2V0U2tpcCA9IHN0YXRlID0+IHN0YXRlLnRvZG9UYXNrcy5za2lwO1xuZXhwb3J0IGNvbnN0IHN0aWxsTW9yZVRvTG9hZCA9IHN0YXRlID0+IHN0YXRlLnRvZG9UYXNrcy5tb3JlVG9Mb2FkO1xuIiwiLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImNvbnNpc3RlbnRcIl0gKi9cblxuZXhwb3J0IGNvbnN0IE1ldGhvZHMgPSB7XG4gIFBPU1Q6ICdQT1NUJyxcbiAgR0VUOiAnR0VUJyxcbiAgREVMRVRFOiAnREVMRVRFJyxcbiAgUEFUQ0g6ICdQQVRDSCcsXG59O1xuXG5jb25zdCBmdWxsVXJsID0gdXJsID0+IGAvYXBpLyR7dXJsfWA7XG5cbmNvbnN0IGJhc2VSZXF1ZXN0SW5pdCA9IHtcbiAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgaGVhZGVyczoge1xuICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gIH0sXG59O1xuXG5jb25zdCBjcmVhdGVQb3N0UmVxdWVzdCA9ICh1cmwsIG9wdGlvbnMgPSB7fSkgPT4gKFxuICBmZXRjaCh1cmwsIHtcbiAgICAuLi5iYXNlUmVxdWVzdEluaXQsXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkob3B0aW9ucyksXG4gIH0pXG4pO1xuXG5jb25zdCBjcmVhdGVHZXRSZXF1ZXN0ID0gKHVybCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGxldCBmaW5hbFVybCA9IGAke3VybH0/YDtcbiAgT2JqZWN0LmVudHJpZXMob3B0aW9ucykuZm9yRWFjaCgoW2tleSwgdmFsdWVdLCBwb2l0aW9uKSA9PiB7XG4gICAgZmluYWxVcmwgPSBgJHtmaW5hbFVybH0keyhwb2l0aW9uID4gMCkgPyAnJicgOiAnJ30ke2tleX09JHt2YWx1ZX1gO1xuICB9KTtcbiAgcmV0dXJuIGZldGNoKGZpbmFsVXJsLCB7XG4gICAgLi4uYmFzZVJlcXVlc3RJbml0LFxuICAgIG1ldGhvZDogJ0dFVCcsXG4gIH0pO1xufTtcblxuY29uc3QgY3JlYXRlRGVsZXRlUmVxdWVzdCA9ICh1cmwsIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgZmluYWxVcmwgPSBgJHt1cmx9LyR7b3B0aW9uc31gO1xuICByZXR1cm4gZmV0Y2goZmluYWxVcmwsIHtcbiAgICAuLi5iYXNlUmVxdWVzdEluaXQsXG4gICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVQYXRjaFJlcXVlc3QgPSAodXJsLCBvcHRpb25zID0ge30pID0+IChcbiAgZmV0Y2godXJsLCB7XG4gICAgLi4uYmFzZVJlcXVlc3RJbml0LFxuICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvcHRpb25zKSxcbiAgfSlcbik7XG5cbmNvbnN0IGNyZWF0ZVJlcXVlc3QgPSAodXJsLCBvcHRpb25zLCBtZXRob2QpID0+IHtcbiAgY29uc3QgZmluYWxVcmwgPSBmdWxsVXJsKHVybCk7XG4gIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgY2FzZSBNZXRob2RzLlBPU1Q6IHJldHVybiBjcmVhdGVQb3N0UmVxdWVzdChmaW5hbFVybCwgb3B0aW9ucyk7XG4gICAgY2FzZSBNZXRob2RzLkdFVDogcmV0dXJuIGNyZWF0ZUdldFJlcXVlc3QoZmluYWxVcmwsIG9wdGlvbnMpO1xuICAgIGNhc2UgTWV0aG9kcy5ERUxFVEU6IHJldHVybiBjcmVhdGVEZWxldGVSZXF1ZXN0KGZpbmFsVXJsLCBvcHRpb25zKTtcbiAgICBjYXNlIE1ldGhvZHMuUEFUQ0g6IHJldHVybiBjcmVhdGVQYXRjaFJlcXVlc3QoZmluYWxVcmwsIG9wdGlvbnMpO1xuICAgIGRlZmF1bHQ6IHJldHVybiBjcmVhdGVQb3N0UmVxdWVzdChmaW5hbFVybCwgb3B0aW9ucyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjYWxsQXBpID0gKHVybCwgb3B0aW9ucyA9IHt9LCBtZXRob2QgPSBNZXRob2RzLlBPU1QpID0+IChcbiAgY3JlYXRlUmVxdWVzdCh1cmwsIG9wdGlvbnMsIG1ldGhvZCkudGhlbihcbiAgICByZXNwb25zZSA9PiAocmVzcG9uc2Uub2sgP1xuICAgICAgcmVzcG9uc2UuanNvbigpIDpcbiAgICAgIFByb21pc2UucmVqZWN0KHJlc3BvbnNlLnRleHQoKSlcbiAgICApLFxuICAgIGVycm9yID0+IFByb21pc2UucmVqZWN0KGVycm9yKSxcbiAgKVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY2FsbEFwaTtcblxuIiwiaW1wb3J0IGRhdGVGb3JtYXQgZnJvbSAnZGF0ZWZvcm1hdCc7XG5cbmV4cG9ydCBjb25zdCB0b0pzRGF0ZSA9IChwYXJzZURhdGUgPSAnJykgPT5cbiAgbmV3IERhdGUocGFyc2VJbnQocGFyc2VEYXRlLnN1YnN0cig2KSwgMTApKTtcblxuZXhwb3J0IGNvbnN0IHRvU2ltcGxlRGF0ZUZvcm1hdCA9IGRhdGUgPT5cbiAgZGF0ZUZvcm1hdChkYXRlLCAnZGRkZCBkZCBtbW0geXl5eScpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==