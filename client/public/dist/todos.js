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
              try {
                response = (0, _ApiUtils.callApi)('categories', categoryId, _ApiUtils.Methods.DELETE);

                if (response.success) {
                  categories = getState().todoFilters.categories;
                  categoryIndex = categories.findIndex(function (category) {
                    return category.id === categoryId;
                  });

                  dispatch(removeCategoryLocal(categoryIndex));
                } else {
                  dispatch((0, _messageActions.showMessageError)(response.messageError));
                }
              } catch (error) {
                dispatch((0, _messageActions.showMessageError)(error.message));
              }

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy9tZXNzYWdlQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMvdG9kb1Rhc2tzQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CdXR0b25Db21wbGV0ZVRhc2suanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0J1dHRvbkRlbGV0ZUNhdGVnb3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CdXR0b25EZWxldGVUYXNrLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CdXR0b25TY29sbC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2F0ZWdvcmllc0ZpbHRlci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2F0ZWdvcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0luZmluaXRlU2Nyb2xsLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9NYWluQWRkQnV0dG9uLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9TbmFja2Jhci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVGFzay5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVGFza3MuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1RvZG9zLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9WaXNpYmlsaXR5RmlsdGVycy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVmlzaWJpbGl0eVN3aXRjaC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvQ29sbGFwc2UuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FuaW1zL0RpYWxvZ0FuaW0uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FuaW1zL1JlcGxhY2VBbmltLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9SZXNpemUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FuaW1zL1NuYWNrYmFyQW5pbS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0FkZENhdGVnb3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2dBZGQvQWRkVGFzay5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0RpYWxvZ0FkZC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0RvbmUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9TZWxlY3RBY3Rpb25BZGQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9TZWxlY3RDYXRlZ29yeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL1NlbGVjdENvbXBsZXRlRGF0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL1N0ZXBzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2xhYmVscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL3N0ZXBzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL0NhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL1Rhc2tzQ29udGFpbmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9Ub2Rvc0NvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy9jb21tb25TZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0b3JzL3RvZG9UYXNrc1NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvQXBpVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL0NvbW1vbi5qcyJdLCJuYW1lcyI6WyJzaG93TWVzc2FnZUluZm8iLCJ0eXBlIiwiU0hPV19NRVNTQUdFX0lORk8iLCJtZXNzYWdlIiwic2hvd01lc3NhZ2VFcnJvciIsIlNIT1dfTUVTU0FHRV9FUlJPUiIsImhpZGVNZXNzYWdlIiwiSElERV9NRVNTQUdFIiwiZmV0Y2hUYXNrcyIsInN0YXRlIiwicmVxdWVzdEZldGNoQWxsQ2F0ZWdvcmllcyIsIlJFUVVFU1RfRkVUQ0hfQUxMX0NBVEVHT1JJRVMiLCJyZWNlaXZlRmV0Y2hBbGxDYXRlZ29yaWVzIiwiUkVDRUlWRV9GRVRDSF9BTExfQ0FURUdPUklFUyIsImNhdGVnb3JpZXMiLCJlcnJvckZldGNoQWxsQ2F0ZWdvcmllcyIsIkVSUk9SX0ZFVENIX0FMTF9DQVRFR09SSUVTIiwiZXJyb3IiLCJhZGRDYXRlZ29yeUxvY2FsIiwiQUREX0NBVEVHT1JZX0xPQ0FMIiwiY2F0ZWdvcnkiLCJyZW1vdmVDYXRlZ29yeUxvY2FsIiwiUkVNT1ZFX0NBVEVHT1JZX0xPQ0FMIiwiY2F0ZWdvcnlJbmRleCIsInRvb2dsZVNlbGVjdENhdGVnb3J5IiwiVE9PR0xFX1NFTEVDVF9DQVRFR09SWSIsInNlbGVjdGVkQ2F0ZWdvcnkiLCJ0b29nbGVTZWxlY3RDYXRlZ29yeUFsbCIsIlRPT0dMRV9TRUxFQ1RfQ0FURUdPUllfQUxMIiwic3dpdGNoVmlzaWJpbGl0eUZpbHRlciIsIlNXSVRDSF9WSVNJQklMSVRZX0ZJTFRFUiIsInZpc2liaWxpdHkiLCJmZXRjaEFsbENhdGVnb3JpZXMiLCJsaW1pdCIsInF1ZXJ5SXRlbXNMaW1pdCIsInNraXAiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwiTWV0aG9kcyIsIkdFVCIsInJlc3BvbnNlIiwic3VjY2VzcyIsImRhdGEiLCJtZXNzYWdlRXJyb3IiLCJkZWxldGVDYXRlZ29yeSIsImNhdGVnb3J5SWQiLCJERUxFVEUiLCJ0b2RvRmlsdGVycyIsImZpbmRJbmRleCIsImlkIiwiYWRkQ2F0ZWdvcnkiLCJuYW1lIiwiY2FsbGJhY2siLCJ1bmRlZmluZWQiLCJQT1NUIiwiY2hhbmdlVmlzaWJpbGl0eSIsInNlbGVjdENhdGVnb3J5Iiwic2VsZWN0Q2F0ZWdvcnlBbGwiLCJyZXF1ZXN0RmV0Y2hUYXNrcyIsIlJFUVVFU1RfRkVUQ0hfVEFTS1MiLCJyZWNlaXZlRmV0Y2hUYXNrcyIsIlJFQ0VJVkVfRkVUQ0hfVEFTS1MiLCJ0YXNrcyIsImVycm9yRmV0Y2hUYXNrcyIsIkVSUk9SX0ZFVENIX1RBU0tTIiwiYWRkVGFza0xvY2FsIiwiQUREX1RBU0tfTE9DQUwiLCJ0YXNrIiwicmVtb3ZlVGFza0xvY2FsIiwiUkVNT1ZFX1RBU0tfTE9DQUwiLCJ0YXNrSW5kZXgiLCJ1cGRhdGVUYXNrTG9jYWwiLCJVUERBVEVfVEFTS19MT0NBTCIsImZldGNoVGFza3NCeUNhdGVnb3J5IiwiY2F0ZWdvcmllc0lkIiwiY29tcGxldGVkIiwidG9kb3MiLCJtYXAiLCJ0b2RvIiwiY29tcGxldGVkQXQiLCJEYXRlIiwidG9kb1dpdGhpbiIsImRlbGV0ZVRhc2siLCJpdGVtcyIsInRvZG9UYXNrcyIsInRvZG9Bcmd1bWVudEluZGV4IiwidG9kb0FyZ3VtZW50IiwiYWRkVGFzayIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJ0b29nbGVUYXNrQ29tcGxldGVkIiwiaXNDb21wbGV0ZWQiLCJQQVRDSCIsIkJ1dHRvbkNvbXBsZXRlVGFzayIsIm9uQ2xpY2siLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsImJvb2wiLCJkZWZhdWx0UHJvcHMiLCJCdXR0b25EZWxldGVDYXRlZ29yeSIsIkJ1dHRvbkRlbGV0ZVRhc2siLCJCdXR0b25TY3JvbGwiLCJkaXJlY3Rpb24iLCJvbmVPZiIsIkNhdGVnb3JpZXNGaWx0ZXIiLCJwcm9wcyIsImNoaXBzIiwiaGFuZGxlTGVmdFNjcm9sbENsaWNrIiwiYmluZCIsImhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2siLCJtb3ZlQ2hpcHNTY3JvbGwiLCJjbGllbnRXaWR0aCIsImRlbHRhIiwibmV4dFNjcm9sbExlZnQiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsIiwibGVmdCIsImNhdGVnb3J5TGlzdCIsIm9uRGVsZXRlQ2F0ZWdvcnkiLCJvbkNpbGNrQ2F0ZWdvcnkiLCJub2RlIiwiZGlzcGxheSIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0Iiwic2VsZWN0ZWQiLCJSZWFjdCIsIkNvbXBvbmVudCIsImFycmF5T2YiLCJzaGFwZSIsInN0cmluZyIsIkNhdGVnb3J5Iiwib25EZWxldGUiLCJjc3NDbGFzcyIsIm9uQ2hpcENsaWNrIiwiZSIsIm9uRGVsZXRlQ2xpY2siLCJ3YWl0VGltZSIsIkluZmluaXRlU2Nyb2xsIiwib25TY3JvbGwiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImlubmVySGVpZ2h0Iiwic2Nyb2xsWSIsImRvY3VtZW50IiwiYm9keSIsIm9mZnNldEhlaWdodCIsImFyZ3MiLCJjaGlsZHJlbiIsImNsYXNzTmFtZSIsImFueSIsIk1haW5BZGRCdXR0b24iLCJBY3Rpb24iLCJ0ZXh0IiwiU25hY2tiYXIiLCJvbkNsb3NlIiwiZHVyYXRpb24iLCJzaG93Iiwic2V0VGltZW91dCIsImlzRXJyb3IiLCJhY3Rpb25UZXh0IiwiYWN0aW9uQ2xpY2siLCJ2ZXJ0aWNhbFBvc3Rpb24iLCJob3Jpem9udGFsUG9zaXRpb24iLCJudW1iZXIiLCJUYXNrIiwiY29sbGFwc2VkIiwicmVuZGVyRGF0ZSIsInNldFN0YXRlIiwibGFiZWxzIiwibGFiZWxQYXJ0aWFsQ29tcGxldGVkIiwibGFiZWxQYXJ0aWFsVG9Db21wbGV0ZWQiLCJsYWJlbE5vdFNldCIsIm9uQ29tcGxldGUiLCJvblRpdGxlQ2xpY2siLCJsYWJlbE5vRGVzY3JpcHRpb24iLCJpbml0aWFsU3RhdGUiLCJUYXNrcyIsIm9uRmV0Y2hUb2RvVGFza3NOZXh0IiwibW9yZVRvTG9hZCIsIm5ld1NraXAiLCJ0YXNrTGlzdCIsIm9uRGVsZXRlVGFzayIsIm9uQ29tcGxldGVUYXNrIiwiYXJnIiwibmV4dFByb3BzIiwicHJldlN0YXRlIiwiVG9kb3MiLCJpc0RpYWxvZ0FkZE9wZW4iLCJpbml0RmV0Y2hBbGxDYXRlZ29yaWVzIiwic2hvd0xvYWRpbmciLCJWaXNpYmlsaXR5RmlsdGVyIiwic2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyIiwib25WaXNpYmlsaXR5U3dpdGNoQ2xpY2siLCJPTkxZX1RPX0NPTVBMRVRFIiwiQUxMX1RPRE9TIiwiT05MWV9DT01QTEVURUQiLCJWaXNpYmlsaXR5U3dpdGNoIiwiZGVmYXVsdFN0eWxlIiwidHJhbnNpdGlvbiIsImhlaWdodCIsIm9uRW50ZXIiLCJzdHlsZSIsImZpcnN0RWxlbWVudENoaWxkIiwib25FeGl0IiwiQ29sbGFwc2UiLCJpblByb3AiLCJpbiIsIm9wYWNpdHkiLCJ0cmFuc2l0aW9uU3R5bGVzIiwiZW50ZXJpbmciLCJlbnRlcmVkIiwiRGlhbG9nQW5pbSIsIndpZHRoIiwiZW50ZXIiLCJSZXBsYWNlQW5pbSIsImVuZExpc3RlbmVyIiwiZXhpdCIsIm9uRW50ZXJlZCIsIm9uRXhpdGVkIiwiUmVzaXplIiwiYm90dG9tIiwiU25hY2tiYXJBbmltIiwiY3VzdG9tQ2xhc3MiLCJBZGRDYXRlZ29yeSIsIm9uSW5wdXRUZXh0Q2hhbmdlIiwib25CdXR0b25BZGRDbGljayIsIm9uQ2F0ZWdvcnlDcmVhdGVkIiwidGFyZ2V0IiwidmFsdWUiLCJtc2dOYW1lUmVxdWlyZWQiLCJvbk5leHQiLCJzdGVwSWQiLCJBRERfVEFTSyIsIm9wdGlvbnMiLCJ0aXRsZUFkZENhdGVnb3J5IiwicGxhY2Vob2xkZXJOYW1lIiwiYnV0dG9uQWRkIiwiQWRkVGFzayIsIm9uQnV0dG9uU2NoZWR1bGVDbGljayIsIm1zZ1RpdGxlUmVxdWlyZWQiLCJTRUxFQ1RfQ09NUExFVEVfREFURSIsInRpdGxlQWRkVGFzayIsImxhYmVsRm9yQ2F0ZWdvcnkiLCJwbGFjZUhvbGRlclRpdGxlIiwicGxhY2VIb2xkZXJEZXNjcmlwdGlvbiIsImJ1dHRvblNjaGVkdWxlIiwiZ2V0Q29udGVudFRvUmVuZGVyIiwic3RlcHMiLCJsZW5ndGgiLCJsYXN0U3RlcCIsIlNFTEVDVF9XQU5UX1RPX0FERCIsIkFERF9DQVRFR09SWSIsIlNFTEVDVF9DQVRFR09SWSIsIkRPTkUiLCJpbml0YWxTdGF0ZSIsIm5leHRTdGVwcyIsInNob3dTdGVwIiwiRGlhbG9nQWRkIiwib25CYWNrIiwib25SZXNldEFuZENsb3NlIiwib25BbmltYXRpb25FbmQiLCJzdGVwQ291bnQiLCJzbGljZSIsInN0ZXAiLCJjb21wbGV0ZSIsImRvbmUiLCJvcGVuIiwic3RlcExpc3QiLCJidXR0b25CYWNrIiwiRG9uZSIsImxhYmVsRG9uZSIsIlNlbGVjdEFjdGlvbkFkZCIsInRpdGxlQWRkIiwibGFiZWxDYXRlZ29yeSIsImxhYmVsVGFzayIsIlNlbGVjdENhdGVnb3J5Iiwib25DYXRlZ29yeUNsaWNrIiwib25CdXR0b25OZXh0Q2xpY2siLCJtc2dTZWxlY3RDYXRlZ29yeSIsImNhdGVnb3JpZXNMaXN0IiwidGl0bGVDaG9vc2VDYXRlZ29yeSIsImJ1dHRvbk5leHQiLCJtYXBTdGF0ZVRvUHJvcCIsIlNlbGVjdENvbXBsZXRlRGF0ZSIsIm9uSW5wdXREYXRlQ2hhbmdlIiwib25Ub2RvVGFza0NyZWF0ZWQiLCJkYXRlIiwibXNnU2VsZWN0RGF0ZSIsInRpdGxlVG9kb1dpdGhpbiIsIlN0ZXAiLCJuZWVkTGluZSIsIlN0ZXBzIiwibGlzdCIsInN0ZXBIaXN0b3J5IiwiaXRlbSIsImkiLCJmaWx0ZXIiLCJzaCIsInN0ZXBEZXNjV2FudFRvQWRkIiwic3RlcERlc2NBZGRDYXRlZ29yeSIsInN0ZXBEZXNjclNlbGVjQ2F0ZWdvcnkiLCJzdGVwRGVzY0FkZFRhc2siLCJzdGVwRGVzY0NvbXBsZXRlRGF0ZSIsInN0ZXBEZXNjRG9uZSIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImNhdGVnb3J5QWxsIiwiQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lciIsIlRhc2tzQ29udGFpbmVyIiwiVG9kb3NDb250YWluZXIiLCJWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyIiwiVmlzaWJpbGl0eUZpbHRlcnMiLCJpc0ZldGNoaW5nQ2F0ZWdvcmllc0ZpbHRlciIsImlzRmV0Y2hpbmdUYXNrcyIsImlzRmV0Y2hpbmdDYXRlZ29yaWVzIiwiaXNGZXRjaGluZ1RvZG9zIiwiaXNGZXRjaGluZyIsImdldFRvZG9GaWx0ZXJzIiwiZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QiLCJnZXRWaXNpYmlsaXR5RmlsdGVyIiwidmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQiLCJnZXRTZWxlY3RlZENhdGVnb3JpZXNGaWx0ZXIiLCJnZXRTZWxlY3RlZENhdGVnb3JpZXNJZCIsImNhdGVnb3J5RmlsdGVyIiwiZ2V0VGFza3MiLCJnZXRUYXNrTGlzdCIsImdldFNraXAiLCJzdGlsbE1vcmVUb0xvYWQiLCJmdWxsVXJsIiwidXJsIiwiYmFzZVJlcXVlc3RJbml0IiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwiY3JlYXRlUG9zdFJlcXVlc3QiLCJmZXRjaCIsIm1ldGhvZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjcmVhdGVHZXRSZXF1ZXN0IiwiZmluYWxVcmwiLCJPYmplY3QiLCJlbnRyaWVzIiwiZm9yRWFjaCIsInBvaXRpb24iLCJrZXkiLCJjcmVhdGVEZWxldGVSZXF1ZXN0IiwiY3JlYXRlUGF0Y2hSZXF1ZXN0IiwiY3JlYXRlUmVxdWVzdCIsImNhbGxBcGkiLCJ0aGVuIiwib2siLCJqc29uIiwiUHJvbWlzZSIsInJlamVjdCIsInRvSnNEYXRlIiwicGFyc2VEYXRlIiwicGFyc2VJbnQiLCJzdWJzdHIiLCJ0b1NpbXBsZURhdGVGb3JtYXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBTU8sSUFBTUEsNENBQWtCLFNBQWxCQSxlQUFrQjtBQUFBLFNBQzdCO0FBQ0VDLFVBQU1DLDhCQURSO0FBRUVDO0FBRkYsR0FENkI7QUFBQSxDQUF4Qjs7QUFPQSxJQUFNQyw4Q0FBbUIsU0FBbkJBLGdCQUFtQjtBQUFBLFNBQzlCO0FBQ0VILFVBQU1JLCtCQURSO0FBRUVGO0FBRkYsR0FEOEI7QUFBQSxDQUF6Qjs7QUFPQSxJQUFNRyxvQ0FBYyxTQUFkQSxXQUFjO0FBQUEsU0FDekI7QUFDRUwsVUFBTU07QUFEUixHQUR5QjtBQUFBLENBQXBCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQlA7O0FBQ0E7O0FBVUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNQyxhQUFhLFNBQWJBLFVBQWE7QUFBQSxTQUFTLDRDQUMxQixtREFBd0JDLEtBQXhCLENBRDBCLEVBRTFCLG1EQUF3QkEsS0FBeEIsQ0FGMEIsQ0FBVDtBQUFBLENBQW5COztBQUtBLElBQU1DLDRCQUE0QixTQUE1QkEseUJBQTRCO0FBQUEsU0FDaEM7QUFDRVQsVUFBTVU7QUFEUixHQURnQztBQUFBLENBQWxDOztBQU1BLElBQU1DLDRCQUE0QixTQUE1QkEseUJBQTRCO0FBQUEsU0FDaEM7QUFDRVgsVUFBTVkseUNBRFI7QUFFRUM7QUFGRixHQURnQztBQUFBLENBQWxDOztBQU9BLElBQU1DLDBCQUEwQixTQUExQkEsdUJBQTBCO0FBQUEsU0FDOUI7QUFDRWQsVUFBTWUsdUNBRFI7QUFFRUM7QUFGRixHQUQ4QjtBQUFBLENBQWhDOztBQU9BLElBQU1DLG1CQUFtQixTQUFuQkEsZ0JBQW1CO0FBQUEsU0FDdkI7QUFDRWpCLFVBQU1rQiwrQkFEUjtBQUVFQztBQUZGLEdBRHVCO0FBQUEsQ0FBekI7O0FBT0EsSUFBTUMsc0JBQXNCLFNBQXRCQSxtQkFBc0I7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VCxTQUFTNFQsSUFBVCxFQURXLEdBRVhDLFFBQVFDLE1BQVIsQ0FBZTlULFNBQVNtSCxJQUFULEVBQWYsQ0FGRjtBQUFBLEdBREYsRUFLRTtBQUFBLFdBQVMwTSxRQUFRQyxNQUFSLENBQWVyVixLQUFmLENBQVQ7QUFBQSxHQUxGLENBRHFCO0FBQUEsQ0FBaEI7O2tCQVVRZ1YsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFFZjs7Ozs7O0FBRU8sSUFBTU0sOEJBQVcsU0FBWEEsUUFBVztBQUFBLE1BQUNDLFNBQUQsdUVBQWEsRUFBYjtBQUFBLFNBQ3RCLElBQUl4UixJQUFKLENBQVN5UixTQUFTRCxVQUFVRSxNQUFWLENBQWlCLENBQWpCLENBQVQsRUFBOEIsRUFBOUIsQ0FBVCxDQURzQjtBQUFBLENBQWpCOztBQUdBLElBQU1DLGtEQUFxQixTQUFyQkEsa0JBQXFCO0FBQUEsU0FDaEMsMEJBQVcxRSxJQUFYLEVBQWlCLGtCQUFqQixDQURnQztBQUFBLENBQTNCLEMiLCJmaWxlIjoidG9kb3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBTSE9XX01FU1NBR0VfSU5GTyxcbiAgU0hPV19NRVNTQUdFX0VSUk9SLFxuICBISURFX01FU1NBR0UsXG59IGZyb20gJy4uL2NvbnN0YW50cy9hY3Rpb25UeXBlcyc7XG5cbmV4cG9ydCBjb25zdCBzaG93TWVzc2FnZUluZm8gPSBtZXNzYWdlID0+IChcbiAge1xuICAgIHR5cGU6IFNIT1dfTUVTU0FHRV9JTkZPLFxuICAgIG1lc3NhZ2UsXG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBzaG93TWVzc2FnZUVycm9yID0gbWVzc2FnZSA9PiAoXG4gIHtcbiAgICB0eXBlOiBTSE9XX01FU1NBR0VfRVJST1IsXG4gICAgbWVzc2FnZSxcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGhpZGVNZXNzYWdlID0gKCkgPT4gKFxuICB7XG4gICAgdHlwZTogSElERV9NRVNTQUdFLFxuICB9XG4pO1xuIiwiaW1wb3J0IHsgY2FsbEFwaSwgTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL0FwaVV0aWxzJztcbmltcG9ydCB7XG4gIFJFUVVFU1RfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gIFJFQ0VJVkVfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gIEVSUk9SX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICBBRERfQ0FURUdPUllfTE9DQUwsXG4gIFJFTU9WRV9DQVRFR09SWV9MT0NBTCxcbiAgVE9PR0xFX1NFTEVDVF9DQVRFR09SWSxcbiAgVE9PR0xFX1NFTEVDVF9DQVRFR09SWV9BTEwsXG4gIFNXSVRDSF9WSVNJQklMSVRZX0ZJTFRFUixcbn0gZnJvbSAnLi4vY29uc3RhbnRzL2FjdGlvblR5cGVzJztcbmltcG9ydCB7IHF1ZXJ5SXRlbXNMaW1pdCB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuaW1wb3J0IHsgZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkgfSBmcm9tICcuL3RvZG9UYXNrc0FjdGlvbnMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VFcnJvciB9IGZyb20gJy4vbWVzc2FnZUFjdGlvbnMnO1xuaW1wb3J0IHsgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQsIHZpc2liaWxpdHlPbmx5Q29tcGxldGVkIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgZmV0Y2hUYXNrcyA9IHN0YXRlID0+IGZldGNoVGFza3NCeUNhdGVnb3J5KFxuICBnZXRTZWxlY3RlZENhdGVnb3JpZXNJZChzdGF0ZSksXG4gIHZpc2liaWxpdHlPbmx5Q29tcGxldGVkKHN0YXRlKSxcbik7XG5cbmNvbnN0IHJlcXVlc3RGZXRjaEFsbENhdGVnb3JpZXMgPSAoKSA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRVFVRVNUX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICB9XG4pO1xuXG5jb25zdCByZWNlaXZlRmV0Y2hBbGxDYXRlZ29yaWVzID0gY2F0ZWdvcmllcyA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRUNFSVZFX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICAgIGNhdGVnb3JpZXMsXG4gIH1cbik7XG5cbmNvbnN0IGVycm9yRmV0Y2hBbGxDYXRlZ29yaWVzID0gZXJyb3IgPT4gKFxuICB7XG4gICAgdHlwZTogRVJST1JfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gICAgZXJyb3IsXG4gIH1cbik7XG5cbmNvbnN0IGFkZENhdGVnb3J5TG9jYWwgPSBjYXRlZ29yeSA9PiAoXG4gIHtcbiAgICB0eXBlOiBBRERfQ0FURUdPUllfTE9DQUwsXG4gICAgY2F0ZWdvcnksXG4gIH1cbik7XG5cbmNvbnN0IHJlbW92ZUNhdGVnb3J5TG9jYWwgPSBjYXRlZ29yeUluZGV4ID0+IChcbiAge1xuICAgIHR5cGU6IFJFTU9WRV9DQVRFR09SWV9MT0NBTCxcbiAgICBjYXRlZ29yeUluZGV4LFxuICB9XG4pO1xuXG5jb25zdCB0b29nbGVTZWxlY3RDYXRlZ29yeSA9IHNlbGVjdGVkQ2F0ZWdvcnkgPT4gKFxuICB7XG4gICAgdHlwZTogVE9PR0xFX1NFTEVDVF9DQVRFR09SWSxcbiAgICBzZWxlY3RlZENhdGVnb3J5LFxuICB9XG4pO1xuXG5jb25zdCB0b29nbGVTZWxlY3RDYXRlZ29yeUFsbCA9ICgpID0+IChcbiAge1xuICAgIHR5cGU6IFRPT0dMRV9TRUxFQ1RfQ0FURUdPUllfQUxMLFxuICB9XG4pO1xuXG5jb25zdCBzd2l0Y2hWaXNpYmlsaXR5RmlsdGVyID0gdmlzaWJpbGl0eSA9PiAoXG4gIHtcbiAgICB0eXBlOiBTV0lUQ0hfVklTSUJJTElUWV9GSUxURVIsXG4gICAgdmlzaWJpbGl0eSxcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGZldGNoQWxsQ2F0ZWdvcmllcyA9IChsaW1pdCA9IHF1ZXJ5SXRlbXNMaW1pdCwgc2tpcCA9IDApID0+XG4gIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBkaXNwYXRjaChyZXF1ZXN0RmV0Y2hBbGxDYXRlZ29yaWVzKCkpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoJ2NhdGVnb3JpZXMnLCB7IGxpbWl0LCBza2lwIH0sIE1ldGhvZHMuR0VUKTtcbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIGRpc3BhdGNoKHJlY2VpdmVGZXRjaEFsbENhdGVnb3JpZXMocmVzcG9uc2UuZGF0YSkpO1xuICAgICAgICBkaXNwYXRjaChmZXRjaFRhc2tzQnlDYXRlZ29yeShnZXRTZWxlY3RlZENhdGVnb3JpZXNJZChnZXRTdGF0ZSgpKSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGF0Y2goZXJyb3JGZXRjaEFsbENhdGVnb3JpZXMocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICAgIH1cbiAgfTtcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZUNhdGVnb3J5ID0gKGNhdGVnb3J5SWQgPSAnJykgPT4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gY2FsbEFwaSgnY2F0ZWdvcmllcycsIGNhdGVnb3J5SWQsIE1ldGhvZHMuREVMRVRFKTtcbiAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgY29uc3QgeyBjYXRlZ29yaWVzIH0gPSBnZXRTdGF0ZSgpLnRvZG9GaWx0ZXJzO1xuICAgICAgY29uc3QgY2F0ZWdvcnlJbmRleCA9IGNhdGVnb3JpZXMuZmluZEluZGV4KGNhdGVnb3J5ID0+IGNhdGVnb3J5LmlkID09PSBjYXRlZ29yeUlkKTtcbiAgICAgIGRpc3BhdGNoKHJlbW92ZUNhdGVnb3J5TG9jYWwoY2F0ZWdvcnlJbmRleCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLm1lc3NhZ2VFcnJvcikpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXF1ZXN0IHRvIGFkZCBhIGNhdGVnb3J5XG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBjYXRlZ29yeSBuYW1lIHRvIGFkZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBuZWVkIHRvIGhhbmRsZSB0aGUgY2F0ZWdvcnkgY3JlYXRlZFxuICovXG5leHBvcnQgY29uc3QgYWRkQ2F0ZWdvcnkgPSAobmFtZSA9ICcnLCBjYWxsYmFjayA9IHVuZGVmaW5lZCkgPT4gYXN5bmMgKGRpc3BhdGNoKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKCdjYXRlZ29yaWVzJywgeyBuYW1lIH0sIE1ldGhvZHMuUE9TVCk7XG4gICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgIGRpc3BhdGNoKGFkZENhdGVnb3J5TG9jYWwocmVzcG9uc2UuZGF0YSkpO1xuICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2FsbGJhY2socmVzcG9uc2UuZGF0YSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY2hhbmdlVmlzaWJpbGl0eSA9IHZpc2liaWxpdHkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBkaXNwYXRjaChzd2l0Y2hWaXNpYmlsaXR5RmlsdGVyKHZpc2liaWxpdHkpKTtcbiAgcmV0dXJuIGRpc3BhdGNoKGZldGNoVGFza3MoZ2V0U3RhdGUoKSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdENhdGVnb3J5ID0gc2VsZWN0ZWRDYXRlZ29yeSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGRpc3BhdGNoKHRvb2dsZVNlbGVjdENhdGVnb3J5KHNlbGVjdGVkQ2F0ZWdvcnkpKTtcbiAgcmV0dXJuIGRpc3BhdGNoKGZldGNoVGFza3MoZ2V0U3RhdGUoKSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdENhdGVnb3J5QWxsID0gKCkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBkaXNwYXRjaCh0b29nbGVTZWxlY3RDYXRlZ29yeUFsbCgpKTtcbiAgcmV0dXJuIGRpc3BhdGNoKGZldGNoVGFza3MoZ2V0U3RhdGUoKSkpO1xufTtcbiIsImltcG9ydCB7IGNhbGxBcGksIE1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9BcGlVdGlscyc7XG5pbXBvcnQge1xuICBSRVFVRVNUX0ZFVENIX1RBU0tTLFxuICBSRUNFSVZFX0ZFVENIX1RBU0tTLFxuICBFUlJPUl9GRVRDSF9UQVNLUyxcbiAgQUREX1RBU0tfTE9DQUwsXG4gIFJFTU9WRV9UQVNLX0xPQ0FMLFxuICBVUERBVEVfVEFTS19MT0NBTCxcbn0gZnJvbSAnLi4vY29uc3RhbnRzL2FjdGlvblR5cGVzJztcbmltcG9ydCB7IHF1ZXJ5SXRlbXNMaW1pdCB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VFcnJvciB9IGZyb20gJy4vbWVzc2FnZUFjdGlvbnMnO1xuXG5jb25zdCByZXF1ZXN0RmV0Y2hUYXNrcyA9IChsaW1pdCwgc2tpcCkgPT4gKFxuICB7XG4gICAgdHlwZTogUkVRVUVTVF9GRVRDSF9UQVNLUyxcbiAgICBsaW1pdCxcbiAgICBza2lwLFxuICB9XG4pO1xuXG5jb25zdCByZWNlaXZlRmV0Y2hUYXNrcyA9IHRhc2tzID0+IChcbiAge1xuICAgIHR5cGU6IFJFQ0VJVkVfRkVUQ0hfVEFTS1MsXG4gICAgdGFza3MsXG4gIH1cbik7XG5cbmNvbnN0IGVycm9yRmV0Y2hUYXNrcyA9IGVycm9yID0+IChcbiAge1xuICAgIHR5cGU6IEVSUk9SX0ZFVENIX1RBU0tTLFxuICAgIGVycm9yLFxuICB9XG4pO1xuXG5jb25zdCBhZGRUYXNrTG9jYWwgPSB0YXNrID0+IChcbiAge1xuICAgIHR5cGU6IEFERF9UQVNLX0xPQ0FMLFxuICAgIHRhc2ssXG4gIH1cbik7XG5cbmNvbnN0IHJlbW92ZVRhc2tMb2NhbCA9IHRhc2tJbmRleCA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRU1PVkVfVEFTS19MT0NBTCxcbiAgICB0YXNrSW5kZXgsXG4gIH1cbik7XG5cbmNvbnN0IHVwZGF0ZVRhc2tMb2NhbCA9IHRhc2sgPT4gKFxuICB7XG4gICAgdHlwZTogVVBEQVRFX1RBU0tfTE9DQUwsXG4gICAgdGFzayxcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGZldGNoVGFza3NCeUNhdGVnb3J5ID0gKFxuICBjYXRlZ29yaWVzSWQgPSBbXSxcbiAgY29tcGxldGVkID0gZmFsc2UsXG4gIGxpbWl0ID0gcXVlcnlJdGVtc0xpbWl0LFxuICBza2lwID0gMCxcbikgPT4gYXN5bmMgKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHJlcXVlc3RGZXRjaFRhc2tzKGxpbWl0LCBza2lwKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbEFwaSgndGFza3MnLCB7XG4gICAgY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsIGxpbWl0LCBza2lwLFxuICB9LCBNZXRob2RzLkdFVCk7XG4gIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgY29uc3QgdG9kb3MgPSByZXNwb25zZS5kYXRhLm1hcCh0b2RvID0+XG4gICAgICAoe1xuICAgICAgICAuLi50b2RvLFxuICAgICAgICBjb21wbGV0ZWRBdDogKHRvZG8uY29tcGxldGVkQXQpID8gbmV3IERhdGUodG9kby5jb21wbGV0ZWRBdCkgOiB1bmRlZmluZWQsXG4gICAgICAgIHRvZG9XaXRoaW46ICh0b2RvLnRvZG9XaXRoaW4pID8gbmV3IERhdGUodG9kby50b2RvV2l0aGluKSA6IHVuZGVmaW5lZCxcbiAgICAgIH0pKTtcbiAgICBkaXNwYXRjaChyZWNlaXZlRmV0Y2hUYXNrcyh0b2RvcykpO1xuICB9IGVsc2Uge1xuICAgIGRpc3BhdGNoKGVycm9yRmV0Y2hUYXNrcyhyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZVRhc2sgPSAoaWQgPSAnJykgPT4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoJ3Rhc2tzJywgaWQsIE1ldGhvZHMuREVMRVRFKTtcbiAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICBjb25zdCB7IGl0ZW1zIH0gPSBnZXRTdGF0ZSgpLnRvZG9UYXNrcztcbiAgICBjb25zdCB0b2RvQXJndW1lbnRJbmRleCA9IGl0ZW1zLmZpbmRJbmRleCh0b2RvQXJndW1lbnQgPT5cbiAgICAgIHRvZG9Bcmd1bWVudC5pZCA9PT0gaWQpO1xuICAgIGRpc3BhdGNoKHJlbW92ZVRhc2tMb2NhbCh0b2RvQXJndW1lbnRJbmRleCkpO1xuICB9IGVsc2Uge1xuICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBhZGRUYXNrID0gKHRpdGxlID0gJycsIGRlc2NyaXB0aW9uID0gJycsIGNhdGVnb3J5ID0geyBpZDogJycgfSwgdG9kb1dpdGhpbiwgY2FsbGJhY2sgPSB1bmRlZmluZWQpID0+IGFzeW5jIChkaXNwYXRjaCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoXG4gICAgJ3Rhc2tzJyxcbiAgICB7XG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnkuaWQsXG4gICAgICB0b2RvV2l0aGluLFxuICAgIH0sXG4gICAgTWV0aG9kcy5QT1NULFxuICApO1xuICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgIGNvbnN0IHRvZG8gPSB7XG4gICAgICAuLi5yZXNwb25zZS5kYXRhLFxuICAgICAgY29tcGxldGVkQXQ6IChyZXNwb25zZS5kYXRhLmNvbXBsZXRlZEF0KVxuICAgICAgICA/IG5ldyBEYXRlKHJlc3BvbnNlLmRhdGEuY29tcGxldGVkQXQpIDogdW5kZWZpbmVkLFxuICAgICAgdG9kb1dpdGhpbjogKHJlc3BvbnNlLmRhdGEudG9kb1dpdGhpbilcbiAgICAgICAgPyBuZXcgRGF0ZShyZXNwb25zZS5kYXRhLnRvZG9XaXRoaW4pIDogdW5kZWZpbmVkLFxuICAgIH07XG4gICAgZGlzcGF0Y2goYWRkVGFza0xvY2FsKHRvZG8pKTtcbiAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHRvb2dsZVRhc2tDb21wbGV0ZWQgPSAoaWQgPSAnJywgaXNDb21wbGV0ZWQgPSBmYWxzZSkgPT4gYXN5bmMgKGRpc3BhdGNoKSA9PiB7XG4gIGNvbnN0IGNvbXBsZXRlZCA9ICFpc0NvbXBsZXRlZDtcbiAgY29uc3QgY29tcGxldGVkQXQgPSAoY29tcGxldGVkKSA/IG5ldyBEYXRlKCkgOiBudWxsO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoJ3Rhc2tzJywgeyBpZCwgY29tcGxldGVkLCBjb21wbGV0ZWRBdCB9LCBNZXRob2RzLlBBVENIKTtcbiAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICBjb25zdCB0b2RvID0ge1xuICAgICAgLi4ucmVzcG9uc2UuZGF0YSxcbiAgICAgIGNvbXBsZXRlZEF0OiAocmVzcG9uc2UuZGF0YS5jb21wbGV0ZWRBdClcbiAgICAgICAgPyBuZXcgRGF0ZShyZXNwb25zZS5kYXRhLmNvbXBsZXRlZEF0KSA6IHVuZGVmaW5lZCxcbiAgICB9O1xuICAgIGRpc3BhdGNoKHVwZGF0ZVRhc2tMb2NhbCh0b2RvKSk7XG4gIH0gZWxzZSB7XG4gICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgfVxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdXR0b25Db21wbGV0ZVRhc2sgPSAoeyBvbkNsaWNrLCBjb21wbGV0ZWQgfSkgPT4gKFxuICA8YnV0dG9uXG4gICAgY2xhc3NOYW1lPXtgYnV0dG9uLWNvbXBsZXRlLXRhc2sgJHsoY29tcGxldGVkKSA/ICdidXR0b24tY29tcGxldGVkLXRhc2snIDogJyd9YH1cbiAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICA+XG4gICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1jaGVja1wiIC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uQ29tcGxldGVUYXNrLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbCxcbn07XG5cbkJ1dHRvbkNvbXBsZXRlVGFzay5kZWZhdWx0UHJvcHMgPSB7XG4gIGNvbXBsZXRlZDogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25Db21wbGV0ZVRhc2s7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgQnV0dG9uRGVsZXRlQ2F0ZWdvcnkgPSAoeyBvbkNsaWNrIH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24tZGVsZXRlLWNhdGVnb3J5XCIgb25DbGljaz17b25DbGlja30+XG4gICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1kZWxldGVcIiAvPlxuICA8L2J1dHRvbj5cbik7XG5cbkJ1dHRvbkRlbGV0ZUNhdGVnb3J5LnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkRlbGV0ZUNhdGVnb3J5O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEJ1dHRvbkRlbGV0ZVRhc2sgPSAoeyBvbkNsaWNrIH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24tZGVsZXRlLXRhc2tcIiBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICA8aSBjbGFzc05hbWU9XCJpY29uLWRlbGV0ZVwiIC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uRGVsZXRlVGFzay5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25EZWxldGVUYXNrO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEJ1dHRvblNjcm9sbCA9ICh7IG9uQ2xpY2ssIGRpcmVjdGlvbiB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPXtgYnV0dG9uLXNjcm9sbCAke2RpcmVjdGlvbn1gfSBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICA8aSBjbGFzc05hbWU9eyhkaXJlY3Rpb24gPT09ICdsZWZ0JykgPyAnaWNvbi1iYWNrd2FyZCcgOiAnaWNvbi1mb3J3YXJkJ30gLz5cbiAgPC9idXR0b24+XG4pO1xuXG5CdXR0b25TY3JvbGwucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBkaXJlY3Rpb246IFByb3BUeXBlcy5vbmVPZihbJ2xlZnQnLCAncmlnaHQnXSksXG59O1xuXG5CdXR0b25TY3JvbGwuZGVmYXVsdFByb3BzID0ge1xuICBkaXJlY3Rpb246ICdsZWZ0Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvblNjcm9sbDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbkdyb3VwIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5pbXBvcnQgc2Nyb2xsIGZyb20gJ3Njcm9sbCc7XG5pbXBvcnQgQnV0dG9uU2Nyb2xsIGZyb20gJy4vQnV0dG9uU2NvbGwnO1xuaW1wb3J0IENhdGVnb3J5IGZyb20gJy4vQ2F0ZWdvcnknO1xuaW1wb3J0IEZhZGUgZnJvbSAnLi9hbmltcy9GYWRlJztcblxuY2xhc3MgQ2F0ZWdvcmllc0ZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuY2hpcHMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5oYW5kbGVMZWZ0U2Nyb2xsQ2xpY2sgPSB0aGlzLmhhbmRsZUxlZnRTY3JvbGxDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlUmlnaHRTY3JvbGxDbGljayA9IHRoaXMuaGFuZGxlUmlnaHRTY3JvbGxDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMubW92ZUNoaXBzU2Nyb2xsID0gdGhpcy5tb3ZlQ2hpcHNTY3JvbGwuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZUxlZnRTY3JvbGxDbGljaygpIHtcbiAgICBpZiAodGhpcy5jaGlwcykge1xuICAgICAgdGhpcy5tb3ZlQ2hpcHNTY3JvbGwoLXRoaXMuY2hpcHMuY2xpZW50V2lkdGgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuY2hpcHMpIHtcbiAgICAgIHRoaXMubW92ZUNoaXBzU2Nyb2xsKHRoaXMuY2hpcHMuY2xpZW50V2lkdGgpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVDaGlwc1Njcm9sbChkZWx0YSkge1xuICAgIGlmICh0aGlzLmNoaXBzKSB7XG4gICAgICBjb25zdCBuZXh0U2Nyb2xsTGVmdCA9IHRoaXMuY2hpcHMuc2Nyb2xsTGVmdCArIGRlbHRhO1xuICAgICAgc2Nyb2xsLmxlZnQodGhpcy5jaGlwcywgbmV4dFNjcm9sbExlZnQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNhdGVnb3J5TGlzdCwgb25EZWxldGVDYXRlZ29yeSwgb25DaWxja0NhdGVnb3J5IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiY29udGVudC1jYXRlZ29yaWVzLWZpbHRlclwiPlxuICAgICAgICA8QnV0dG9uU2Nyb2xsXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVMZWZ0U2Nyb2xsQ2xpY2t9XG4gICAgICAgICAgZGlyZWN0aW9uPVwibGVmdFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJjYXRlZ29yaWVzLWZpbHRlclwiXG4gICAgICAgICAgcmVmPXsobm9kZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGlwcyA9IG5vZGU7XG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxUcmFuc2l0aW9uR3JvdXAgc3R5bGU9e3sgZGlzcGxheTogJ2luaGVyaXQnLCBwYWRkaW5nTGVmdDogJzEuMjVlbScsIHBhZGRpbmdSaWdodDogJzEuMjVlbScgfX0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNhdGVnb3J5TGlzdC5tYXAoY2F0ZWdvcnkgPT4gKFxuICAgICAgICAgICAgICAgIDxGYWRlIGtleT17Y2F0ZWdvcnkuaWR9PlxuICAgICAgICAgICAgICAgICAgPENhdGVnb3J5XG4gICAgICAgICAgICAgICAgICAgIGtleT17Y2F0ZWdvcnkuaWR9XG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5PXtjYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2NhdGVnb3J5LnNlbGVjdGVkfVxuICAgICAgICAgICAgICAgICAgICBvbkRlbGV0ZT17b25EZWxldGVDYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b25DaWxja0NhdGVnb3J5fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L0ZhZGU+XG4gICAgICAgICAgICAgICkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9UcmFuc2l0aW9uR3JvdXA+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8QnV0dG9uU2Nyb2xsXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVSaWdodFNjcm9sbENsaWNrfVxuICAgICAgICAgIGRpcmVjdGlvbj1cInJpZ2h0XCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQ2F0ZWdvcmllc0ZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIGNhdGVnb3J5TGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgb25EZWxldGVDYXRlZ29yeTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2lsY2tDYXRlZ29yeTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbkNhdGVnb3JpZXNGaWx0ZXIuZGVmYXVsdFByb3BzID0ge1xuICBvbkRlbGV0ZUNhdGVnb3J5OiB1bmRlZmluZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYXRlZ29yaWVzRmlsdGVyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQnV0dG9uRGVsZXRlQ2F0ZWdvcnkgZnJvbSAnLi9CdXR0b25EZWxldGVDYXRlZ29yeSc7XG5cbmNvbnN0IENhdGVnb3J5ID0gKHtcbiAgY2F0ZWdvcnksIHNlbGVjdGVkLCBvbkNsaWNrLCBvbkRlbGV0ZSxcbn0pID0+IHtcbiAgbGV0IGNzc0NsYXNzID0gJyc7XG5cbiAgY29uc3Qgb25DaGlwQ2xpY2sgPSAoZSkgPT4ge1xuICAgIG9uQ2xpY2soY2F0ZWdvcnksIGUpO1xuICB9O1xuICBjb25zdCBvbkRlbGV0ZUNsaWNrID0gKCkgPT4ge1xuICAgIG9uRGVsZXRlKGNhdGVnb3J5KTtcbiAgfTtcblxuICBpZiAoc2VsZWN0ZWQpIHtcbiAgICBjc3NDbGFzcyA9ICdjYXRlZ29yeS1zZWxlY3RlZCc7XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2Ake2Nzc0NsYXNzfSBjYXRlZ29yeS1jaGlwIGFsaWduLWl0ZW1zLWNlbnRlcmB9XG4gICAgICBvbkNsaWNrPXtvbkNoaXBDbGlja31cbiAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhdGVnb3J5LXRleHRcIj57Y2F0ZWdvcnkubmFtZX08L3NwYW4+XG4gICAgICB7XG4gICAgICAgIChjYXRlZ29yeS5pZCAhPT0gJzAnICYmIG9uRGVsZXRlICE9PSB1bmRlZmluZWQpICYmXG4gICAgICAgICAgPEJ1dHRvbkRlbGV0ZUNhdGVnb3J5IG9uQ2xpY2s9e29uRGVsZXRlQ2xpY2t9IC8+XG4gICAgICB9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5DYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIG9uRGVsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY2F0ZWdvcnk6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuQ2F0ZWdvcnkuZGVmYXVsdFByb3BzID0ge1xuICBvbkRlbGV0ZTogdW5kZWZpbmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0ZWdvcnk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSAnbG9kYXNoJztcblxuY29uc3Qgd2FpdFRpbWUgPSA1MDA7XG5cbmNsYXNzIEluZmluaXRlU2Nyb2xsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5vblNjcm9sbCA9IHRoaXMub25TY3JvbGwuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZSh0aGlzLm9uU2Nyb2xsLCB3YWl0VGltZSksIGZhbHNlKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZSh0aGlzLm9uU2Nyb2xsLCB3YWl0VGltZSksIGZhbHNlKTtcbiAgfVxuXG4gIG9uU2Nyb2xsKCkge1xuICAgIGlmICgod2luZG93LmlubmVySGVpZ2h0ICsgd2luZG93LnNjcm9sbFkpID49IChkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCAtIDIwMCkpIHtcbiAgICAgIGNvbnN0IHsgYXJncywgb25TY3JvbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICBvblNjcm9sbCguLi5hcmdzKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgY2xhc3NOYW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5JbmZpbml0ZVNjcm9sbC5wcm9wVHlwZXMgPSB7XG4gIGFyZ3M6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvblNjcm9sbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbkluZmluaXRlU2Nyb2xsLmRlZmF1bHRQcm9wcyA9IHtcbiAgYXJnczogW10sXG4gIGNsYXNzTmFtZTogJycsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbmZpbml0ZVNjcm9sbDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBNYWluQWRkQnV0dG9uID0gKHsgb25DbGljayB9KSA9PiAoXG4gIDxidXR0b24gaWQ9XCJtYWluLWFkZC1idXR0b25cIiBvbkNsaWNrPXtvbkNsaWNrfSA+XG4gICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj4mI3hFMTQ1OzwvaT5cbiAgPC9idXR0b24+XG4pO1xuXG5NYWluQWRkQnV0dG9uLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1haW5BZGRCdXR0b247XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBTbmFja2JhckFuaW0gZnJvbSAnLi9hbmltcy9TbmFja2JhckFuaW0nO1xuXG5jb25zdCBBY3Rpb24gPSAoeyBvbkNsaWNrLCB0ZXh0IH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24tYWN0aW9uLXNuYWNrYmFyXCIgb25DbGljaz17b25DbGlja30+XG4gICAge3RleHR9XG4gIDwvYnV0dG9uPlxuKTtcblxuQWN0aW9uLnByb3BUeXBlcyA9IHtcbiAgdGV4dDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuY2xhc3MgU25hY2tiYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgY29uc3Qge1xuICAgICAgb25DbG9zZSwgZHVyYXRpb24sIHNob3csXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoc2hvdykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgIH0sIGR1cmF0aW9uKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbWVzc2FnZSwgaXNFcnJvciwgYWN0aW9uVGV4dCwgYWN0aW9uQ2xpY2ssIHNob3csXG4gICAgICB2ZXJ0aWNhbFBvc3Rpb24sIGhvcml6b250YWxQb3NpdGlvbixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPFNuYWNrYmFyQW5pbSBpbj17c2hvd30gY3VzdG9tQ2xhc3M9e2Ake3ZlcnRpY2FsUG9zdGlvbn0gJHsoaG9yaXpvbnRhbFBvc2l0aW9uKX1gfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YHNuYWNrYmFyICR7KGlzRXJyb3IpID8gJ2Vycm9yJyA6ICcnfWB9XG4gICAgICAgID5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzbmFja2Jhci1tZXNzYWdlXCI+e21lc3NhZ2V9PC9zcGFuPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIChhY3Rpb25UZXh0ICE9PSAnJyAmJiBhY3Rpb25DbGljayAhPT0gdW5kZWZpbmVkKSAmJlxuICAgICAgICAgICAgICA8QWN0aW9uIG9uQ2xpY2s9e2FjdGlvbkNsaWNrfSB0ZXh0PXthY3Rpb25UZXh0fSAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L1NuYWNrYmFyQW5pbT5cbiAgICApO1xuICB9XG59XG5cblNuYWNrYmFyLnByb3BUeXBlcyA9IHtcbiAgc2hvdzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBkdXJhdGlvbjogUHJvcFR5cGVzLm51bWJlcixcbiAgaXNFcnJvcjogUHJvcFR5cGVzLmJvb2wsXG4gIGFjdGlvblRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGFjdGlvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgdmVydGljYWxQb3N0aW9uOiBQcm9wVHlwZXMub25lT2YoWyd0b3AnLCAnYm90dG9tJ10pLFxuICBob3Jpem9udGFsUG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbJ2xlZnQnLCAncmlnaHQnXSksXG59O1xuXG5TbmFja2Jhci5kZWZhdWx0UHJvcHMgPSB7XG4gIGR1cmF0aW9uOiA1MDAwLFxuICBpc0Vycm9yOiBmYWxzZSxcbiAgYWN0aW9uVGV4dDogJycsXG4gIGFjdGlvbkNsaWNrOiB1bmRlZmluZWQsXG4gIHZlcnRpY2FsUG9zdGlvbjogJ2JvdHRvbScsXG4gIGhvcml6b250YWxQb3NpdGlvbjogJ3JpZ2h0Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNuYWNrYmFyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQ29sbGFwc2UgZnJvbSAnLi9hbmltcy9Db2xsYXBzZSc7XG5pbXBvcnQgRmFkZSBmcm9tICcuL2FuaW1zL0ZhZGUnO1xuaW1wb3J0IEJ1dHRvbkNvbXBsZXRlVGFzayBmcm9tICcuL0J1dHRvbkNvbXBsZXRlVGFzayc7XG5pbXBvcnQgQnV0dG9uRGVsZXRlVGFzayBmcm9tICcuL0J1dHRvbkRlbGV0ZVRhc2snO1xuaW1wb3J0IHsgdG9TaW1wbGVEYXRlRm9ybWF0IH0gZnJvbSAnLi4vdXRpbHMvQ29tbW9uJztcbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vY29uc3RhbnRzL2xhYmVscyc7XG5cbmNsYXNzIFRhc2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICB9O1xuICAgIHRoaXMucmVuZGVyRGF0ZSA9IHRoaXMucmVuZGVyRGF0ZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25UaXRsZUNsaWNrKCkge1xuICAgIGNvbnN0IHsgY29sbGFwc2VkIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBjb2xsYXBzZWQ6ICFjb2xsYXBzZWQgfSk7XG4gIH1cblxuICByZW5kZXJEYXRlKCkge1xuICAgIGNvbnN0IHsgdGFzayB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAodGFzay5jb21wbGV0ZWQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cImNvbXBsZXRlLWRhdGVcIj57YCR7bGFiZWxzLmxhYmVsUGFydGlhbENvbXBsZXRlZH0gJHsodGFzay5jb21wbGV0ZWRBdCkgPyB0b1NpbXBsZURhdGVGb3JtYXQodGFzay5jb21wbGV0ZWRBdCkgOiAnJ31gfTwvcD5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8cCBjbGFzc05hbWU9XCJjb21wbGV0ZS13aXRoaW4tZGF0ZVwiPntgJHtsYWJlbHMubGFiZWxQYXJ0aWFsVG9Db21wbGV0ZWR9ICR7KHRhc2sudG9kb1dpdGhpbikgPyB0b1NpbXBsZURhdGVGb3JtYXQodGFzay50b2RvV2l0aGluKSA6IGxhYmVscy5sYWJlbE5vdFNldH1gfTwvcD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgdGFzaywgb25EZWxldGUsIG9uQ29tcGxldGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBjb2xsYXBzZWQgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFzay1pdGVtXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFzay1oZWFkZXJcIj5cbiAgICAgICAgICA8cFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGFzay10aXRsZSAkeyh0YXNrLmNvbXBsZXRlZCkgPyAndGFzay10aXRsZS1jb21wbGV0ZWQnIDogJyd9YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMub25UaXRsZUNsaWNrKCl9XG4gICAgICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGFzay50aXRsZX1cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPEZhZGUgaW49e2NvbGxhcHNlZH0+XG4gICAgICAgICAgICA8QnV0dG9uRGVsZXRlVGFza1xuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkRlbGV0ZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9GYWRlPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG9uQ29tcGxldGUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgPEJ1dHRvbkNvbXBsZXRlVGFza1xuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNvbXBsZXRlfVxuICAgICAgICAgICAgICBjb21wbGV0ZWQ9e3Rhc2suY29tcGxldGVkfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhc2stZGF0ZVwiPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckRhdGUoKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxDb2xsYXBzZSBpbj17Y29sbGFwc2VkfT5cbiAgICAgICAgICA8ZGl2IGtleT17dGFzay5kZXNjcmlwdGlvbn0gY2xhc3NOYW1lPVwidGFzay1ib2R5XCI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0YXNrLWRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAodGFzay5kZXNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkICYmIHRhc2suZGVzY3JpcHRpb24gIT09ICcnKVxuICAgICAgICAgICAgICAgID8gdGFzay5kZXNjcmlwdGlvbiA6IDxzcGFuIGNsYXNzTmFtZT1cImVtcHR5XCI+e2xhYmVscy5sYWJlbE5vRGVzY3JpcHRpb259PC9zcGFuPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQ29sbGFwc2U+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblRhc2sucHJvcFR5cGVzID0ge1xuICBvbkRlbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ29tcGxldGU6IFByb3BUeXBlcy5mdW5jLFxuICB0YXNrOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgY29tcGxldGVkQXQ6IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gIH0pLmlzUmVxdWlyZWQsXG59O1xuXG5UYXNrLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25EZWxldGU6IHVuZGVmaW5lZCxcbiAgb25Db21wbGV0ZTogdW5kZWZpbmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVGFzaztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbkdyb3VwIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5pbXBvcnQgUmVzaXplIGZyb20gJy4vYW5pbXMvUmVzaXplJztcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XG5pbXBvcnQgSW5maW5pdGVTY3JvbGwgZnJvbSAnLi9JbmZpbml0ZVNjcm9sbCc7XG5pbXBvcnQgeyBxdWVyeUl0ZW1zTGltaXQgfSBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBsaW1pdDogcXVlcnlJdGVtc0xpbWl0LFxuICBza2lwOiAwLFxufTtcblxuY2xhc3MgVGFza3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0gaW5pdGlhbFN0YXRlO1xuICAgIHRoaXMub25GZXRjaFRvZG9UYXNrc05leHQgPSB0aGlzLm9uRmV0Y2hUb2RvVGFza3NOZXh0LmJpbmQodGhpcyk7XG4gIH1cblxuICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKG5leHRQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgaWYgKG5leHRQcm9wcy5za2lwICE9PSBwcmV2U3RhdGUuc2tpcCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2tpcDogbmV4dFByb3BzLnNraXAsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIG9uRmV0Y2hUb2RvVGFza3NOZXh0KCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLFxuICAgICAgZmV0Y2hUYXNrcywgbW9yZVRvTG9hZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIW1vcmVUb0xvYWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeyBsaW1pdCwgc2tpcCB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBuZXdTa2lwID0gc2tpcCArIGxpbWl0O1xuICAgIHRoaXMuc2V0U3RhdGUoeyBza2lwOiBuZXdTa2lwIH0pO1xuICAgIGZldGNoVGFza3MoY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsIGxpbWl0LCBuZXdTa2lwKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB0YXNrTGlzdCxcbiAgICAgIG9uRGVsZXRlVGFzayxcbiAgICAgIG9uQ29tcGxldGVUYXNrLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiY29udGVudC10b2RvLXRhc2tzXCI+XG4gICAgICAgIDxJbmZpbml0ZVNjcm9sbCBvblNjcm9sbD17dGhpcy5vbkZldGNoVG9kb1Rhc2tzTmV4dH0+XG4gICAgICAgICAgPFRyYW5zaXRpb25Hcm91cD5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGFza0xpc3QubWFwKGFyZyA9PiAoXG4gICAgICAgICAgICAgICAgPFJlc2l6ZSBrZXk9e2FyZy5pZH0+XG4gICAgICAgICAgICAgICAgICA8VGFza1xuICAgICAgICAgICAgICAgICAgICBrZXk9e2FyZy5pZH1cbiAgICAgICAgICAgICAgICAgICAgdGFzaz17YXJnfVxuICAgICAgICAgICAgICAgICAgICBvbkRlbGV0ZT17KCkgPT4gb25EZWxldGVUYXNrKGFyZyl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9eygpID0+IG9uQ29tcGxldGVUYXNrKGFyZyl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvUmVzaXplPlxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvVHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICA8L0luZmluaXRlU2Nyb2xsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5UYXNrcy5wcm9wVHlwZXMgPSB7XG4gIG9uRGVsZXRlVGFzazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25Db21wbGV0ZVRhc2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHRhc2tMaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIG1vcmVUb0xvYWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGZldGNoVGFza3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNhdGVnb3JpZXNJZDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZykuaXNSZXF1aXJlZCxcbiAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVGFza3M7XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IExvYWRlckxpbmVhciBmcm9tICcuLi9jb21wb25lbnRzL0xvYWRlckxpbmVhcic7XG5pbXBvcnQgTWFpbkFkZEJ1dHRvbiBmcm9tICcuLi9jb21wb25lbnRzL01haW5BZGRCdXR0b24nO1xuaW1wb3J0IENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIgZnJvbSAnLi4vY29udGFpbmVycy9DYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyJztcbmltcG9ydCBWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lcnMvVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lcic7XG5pbXBvcnQgVGFza3NDb250YWluZXIgZnJvbSAnLi4vY29udGFpbmVycy9UYXNrc0NvbnRhaW5lcic7XG5pbXBvcnQgRGlhbG9nQWRkIGZyb20gJy4vZGlhbG9nQWRkL0RpYWxvZ0FkZCc7XG5pbXBvcnQgU25hY2tiYXIgZnJvbSAnLi9TbmFja2Jhcic7XG5cbmNsYXNzIFRvZG9zIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzRGlhbG9nQWRkT3BlbjogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgaW5pdEZldGNoQWxsQ2F0ZWdvcmllcyB9ID0gdGhpcy5wcm9wcztcbiAgICBpbml0RmV0Y2hBbGxDYXRlZ29yaWVzKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBpc0RpYWxvZ0FkZE9wZW4gfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBtZXNzYWdlLCBoaWRlTWVzc2FnZSwgc2hvd0xvYWRpbmcgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1hcHBcIj5cbiAgICAgICAgPExvYWRlckxpbmVhciBzaG93PXtzaG93TG9hZGluZ30gLz5cbiAgICAgICAgPGRpdiBpZD1cIm1haW4tdG9wLWJhclwiPlxuICAgICAgICAgIDxDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyIC8+XG4gICAgICAgICAgPFZpc2liaWxpdHlGaWx0ZXJDb250YWluZXIgLz5cbiAgICAgICAgICA8TWFpbkFkZEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IGlzRGlhbG9nQWRkT3BlbjogdHJ1ZSB9KX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFRhc2tzQ29udGFpbmVyIC8+XG4gICAgICAgIDxEaWFsb2dBZGRcbiAgICAgICAgICBvcGVuPXtpc0RpYWxvZ0FkZE9wZW59XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IGlzRGlhbG9nQWRkT3BlbjogZmFsc2UgfSl9XG4gICAgICAgIC8+XG4gICAgICAgIDxTbmFja2JhclxuICAgICAgICAgIHNob3c9e21lc3NhZ2Uuc2hvd31cbiAgICAgICAgICBpc0Vycm9yPXttZXNzYWdlLmlzRXJyb3J9XG4gICAgICAgICAgbWVzc2FnZT17bWVzc2FnZS50ZXh0fVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IGhpZGVNZXNzYWdlKCl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblRvZG9zLnByb3BUeXBlcyA9IHtcbiAgbWVzc2FnZTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBzaG93OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzRXJyb3I6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkLFxuICBoaWRlTWVzc2FnZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaW5pdEZldGNoQWxsQ2F0ZWdvcmllczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgc2hvd0xvYWRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb2RvcztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFZpc2liaWxpdHlTd2l0Y2ggZnJvbSAnLi9WaXNpYmlsaXR5U3dpdGNoJztcbmltcG9ydCB7IEFMTF9UT0RPUywgT05MWV9DT01QTEVURUQsIE9OTFlfVE9fQ09NUExFVEUgfSBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcblxuY29uc3QgVmlzaWJpbGl0eUZpbHRlciA9ICh7XG4gIHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciwgb25WaXNpYmlsaXR5U3dpdGNoQ2xpY2ssXG59KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwidmlzaWJpbGl0eS1maWx0ZXItd3JhcHBlclwiPlxuICAgIDxWaXNpYmlsaXR5U3dpdGNoXG4gICAgICBzZWxlY3RlZD17KHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciA9PT0gT05MWV9UT19DT01QTEVURVxuICAgICAgICB8fCBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IEFMTF9UT0RPUyl9XG4gICAgICBvbkNsaWNrPXtvblZpc2liaWxpdHlTd2l0Y2hDbGljayhPTkxZX1RPX0NPTVBMRVRFKX1cbiAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgID5cbiAgICAgIDxpIGNsYXNzTmFtZT1cImljb24tY2lyY2xlLWJvcmRlclwiIC8+XG4gICAgPC9WaXNpYmlsaXR5U3dpdGNoPlxuICAgIDxWaXNpYmlsaXR5U3dpdGNoXG4gICAgICBzZWxlY3RlZD17KHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciA9PT0gT05MWV9DT01QTEVURURcbiAgICAgICAgfHwgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyID09PSBBTExfVE9ET1MpfVxuICAgICAgb25DbGljaz17b25WaXNpYmlsaXR5U3dpdGNoQ2xpY2soT05MWV9DT01QTEVURUQpfVxuICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgPlxuICAgICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1jaXJjbGVcIiAvPlxuICAgIDwvVmlzaWJpbGl0eVN3aXRjaD5cbiAgPC9kaXY+XG4pO1xuXG5WaXNpYmlsaXR5RmlsdGVyLnByb3BUeXBlcyA9IHtcbiAgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uVmlzaWJpbGl0eVN3aXRjaENsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaWJpbGl0eUZpbHRlcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBWaXNpYmlsaXR5U3dpdGNoID0gKHtcbiAgc2VsZWN0ZWQsIGNoaWxkcmVuLCBvbkNsaWNrLFxufSkgPT4gKFxuICA8ZGl2XG4gICAgY2xhc3NOYW1lPXtgdmlzaWJpbGl0eS1idXR0b24tc3dpdGNoIGFsaWduLWl0ZW1zLWNlbnRlciAkeyhzZWxlY3RlZCkgPyAnc2VsZWN0ZWQnIDogJyd9IGB9XG4gICAgb25DbGljaz17b25DbGlja31cbiAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgPlxuICAgIHtjaGlsZHJlbn1cbiAgPC9kaXY+XG4pO1xuXG5WaXNpYmlsaXR5U3dpdGNoLnByb3BUeXBlcyA9IHtcbiAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cblZpc2liaWxpdHlTd2l0Y2guZGVmYXVsdFByb3BzID0ge1xuICBzZWxlY3RlZDogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBWaXNpYmlsaXR5U3dpdGNoO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5cbmNvbnN0IGR1cmF0aW9uID0gMzAwO1xuXG5jb25zdCBkZWZhdWx0U3R5bGUgPSB7XG4gIHRyYW5zaXRpb246IGBoZWlnaHQgJHtkdXJhdGlvbn1tcyBlYXNlLWluLW91dGAsXG4gIGhlaWdodDogMCxcbn07XG5cbmNvbnN0IG9uRW50ZXIgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSBgJHtub2RlLmZpcnN0RWxlbWVudENoaWxkLm9mZnNldEhlaWdodH1weGA7XG59O1xuXG5jb25zdCBvbkV4aXQgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSAnMHB4Jztcbn07XG5cbmNvbnN0IENvbGxhcHNlID0gKHsgaW46IGluUHJvcCwgY2hpbGRyZW4gfSkgPT4gKFxuICA8VHJhbnNpdGlvbiBvbkVudGVyPXtvbkVudGVyfSBvbkV4aXQ9e29uRXhpdH0gaW49e2luUHJvcH0gdGltZW91dD17ZHVyYXRpb259PlxuICAgIHsoKSA9PiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICA8L1RyYW5zaXRpb24+XG4pO1xuXG5Db2xsYXBzZS5wcm9wVHlwZXMgPSB7XG4gIGluOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbGxhcHNlO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5cbmNvbnN0IGR1cmF0aW9uID0gMjUwO1xuXG5jb25zdCBkZWZhdWx0U3R5bGUgPSB7XG4gIHRyYW5zaXRpb246IGBhbGwgJHtkdXJhdGlvbn1tcyBlYXNlLWluLW91dGAsXG4gIGhlaWdodDogJzBweCcsXG4gIG9wYWNpdHk6ICcwJyxcbiAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG59O1xuXG5jb25zdCB0cmFuc2l0aW9uU3R5bGVzID0ge1xuICBlbnRlcmluZzoge1xuICAgIGhlaWdodDogJzBweCcsXG4gICAgb3BhY2l0eTogJzAnLFxuICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICB9LFxuICBlbnRlcmVkOiB7XG4gICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICBoZWlnaHQ6ICcxMDB2aCcsXG4gICAgb3BhY2l0eTogJzEnLFxuICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJyxcbiAgfSxcbn07XG5cbmNvbnN0IERpYWxvZ0FuaW0gPSAoeyBpbjogaW5Qcm9wLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxUcmFuc2l0aW9uIGluPXtpblByb3B9IHRpbWVvdXQ9e2R1cmF0aW9ufT5cbiAgICB7c3RhdGUgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD1cImJhY2tkcm9wLWRpYWxvZ1wiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxuICAgICAgICAgIC4uLnRyYW5zaXRpb25TdHlsZXNbc3RhdGVdLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICA8L1RyYW5zaXRpb24+XG4pO1xuXG5EaWFsb2dBbmltLnByb3BUeXBlcyA9IHtcbiAgaW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlhbG9nQW5pbTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDI1MDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB3aWR0aDogJzEwMCUnLFxuICB0cmFuc2l0aW9uOiBgb3BhY2l0eSAke2R1cmF0aW9ufW1zIGVhc2UtaW4tb3V0YCxcbiAgb3BhY2l0eTogMCxcbiAgZGlzcGxheTogJ2luaGVyaXQnLFxufTtcblxuY29uc3QgdHJhbnNpdGlvblN0eWxlcyA9IHtcbiAgZW50ZXI6IHsgb3BhY2l0eTogMCB9LFxuICBlbnRlcmVkOiB7IG9wYWNpdHk6IDEgfSxcbn07XG5cbmNvbnN0IFJlcGxhY2VBbmltID0gKHsgaW46IGluUHJvcCwgZW5kTGlzdGVuZXIsIGNoaWxkcmVuIH0pID0+IChcbiAgPFRyYW5zaXRpb25cbiAgICBpbj17aW5Qcm9wfVxuICAgIHRpbWVvdXQ9e2R1cmF0aW9ufVxuICAgIGFkZEVuZExpc3RlbmVyPXtlbmRMaXN0ZW5lcn1cbiAgPlxuICAgIHtzdGF0ZSA9PiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxuICAgICAgICAgIC4uLnRyYW5zaXRpb25TdHlsZXNbc3RhdGVdLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICA8L1RyYW5zaXRpb24+XG4pO1xuXG5SZXBsYWNlQW5pbS5wcm9wVHlwZXMgPSB7XG4gIGluOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBlbmRMaXN0ZW5lcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZXBsYWNlQW5pbTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IHtcbiAgZW50ZXI6IDMwMCxcbiAgZXhpdDogMjAwLFxufTtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgYWxsICR7ZHVyYXRpb24uZW50ZXJ9bXMgZWFzZS1pbi1vdXRgLFxuICBoZWlnaHQ6IDAsXG4gIG9wYWNpdHk6IDAsXG59O1xuXG5jb25zdCBvbkVudGVyID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gYCR7bm9kZS5maXJzdEVsZW1lbnRDaGlsZC5vZmZzZXRIZWlnaHR9cHhgO1xuICBzdHlsZS5vcGFjaXR5ID0gMTtcbn07XG5cbmNvbnN0IG9uRW50ZXJlZCA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XG4gIHN0eWxlLmhlaWdodCA9ICdhdXRvJztcbn07XG5cbmNvbnN0IG9uRXhpdCA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XG4gIHN0eWxlLmhlaWdodCA9IGAke25vZGUuZmlyc3RFbGVtZW50Q2hpbGQub2Zmc2V0SGVpZ2h0fXB4YDtcbn07XG5cbmNvbnN0IG9uRXhpdGVkID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gJzBweCc7XG4gIHN0eWxlLm9wYWNpdHkgPSAwO1xufTtcblxuXG5jb25zdCBSZXNpemUgPSAoeyAuLi5wcm9wcywgY2hpbGRyZW4gfSkgPT4gKFxuICA8VHJhbnNpdGlvblxuICAgIHsuLi5wcm9wc31cbiAgICBvbkVudGVyPXtvbkVudGVyfVxuICAgIG9uRW50ZXJlZD17b25FbnRlcmVkfVxuICAgIG9uRXhpdD17b25FeGl0fVxuICAgIG9uRXhpdGVkPXtvbkV4aXRlZH1cbiAgICB0aW1lb3V0PXtkdXJhdGlvbn1cbiAgPlxuICAgIHsoKSA9PiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICA8L1RyYW5zaXRpb24+XG4pO1xuXG5SZXNpemUucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJlc2l6ZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDI1MDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgYWxsICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBib3R0b206ICctMTAwcHgnLFxufTtcblxuY29uc3QgdHJhbnNpdGlvblN0eWxlcyA9IHtcbiAgZW50ZXJpbmc6IHtcbiAgICBib3R0b206ICctMTAwcHgnLFxuICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICB9LFxuICBlbnRlcmVkOiB7XG4gICAgYm90dG9tOiAnMHB4JyxcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gIH0sXG59O1xuXG5jb25zdCBTbmFja2JhckFuaW0gPSAoeyBpbjogaW5Qcm9wLCBjaGlsZHJlbiwgY3VzdG9tQ2xhc3MgfSkgPT4gKFxuICA8VHJhbnNpdGlvbiBpbj17aW5Qcm9wfSB0aW1lb3V0PXtkdXJhdGlvbn0+XG4gICAge3N0YXRlID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJjb250ZW50LXNuYWNrYmFyXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAuLi5kZWZhdWx0U3R5bGUsXG4gICAgICAgICAgLi4udHJhbnNpdGlvblN0eWxlc1tzdGF0ZV0sXG4gICAgICAgIH19XG4gICAgICAgIGNsYXNzTmFtZT17Y3VzdG9tQ2xhc3N9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICl9XG4gIDwvVHJhbnNpdGlvbj5cbik7XG5cblNuYWNrYmFyQW5pbS5wcm9wVHlwZXMgPSB7XG4gIGluOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgY3VzdG9tQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5TbmFja2JhckFuaW0uZGVmYXVsdFByb3BzID0ge1xuICBjdXN0b21DbGFzczogJycsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTbmFja2JhckFuaW07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5pbXBvcnQgeyBBRERfVEFTSyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgeyBhZGRDYXRlZ29yeSB9IGZyb20gJy4uLy4uL2FjdGlvbnMvdG9kb0ZpbHRlcnNBY3Rpb25zJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5jbGFzcyBBZGRDYXRlZ29yeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBuYW1lOiAnJyxcbiAgICB9O1xuICAgIHRoaXMub25JbnB1dFRleHRDaGFuZ2UgPSB0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkJ1dHRvbkFkZENsaWNrID0gdGhpcy5vbkJ1dHRvbkFkZENsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkNhdGVnb3J5Q3JlYXRlZCA9IHRoaXMub25DYXRlZ29yeUNyZWF0ZWQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uSW5wdXRUZXh0Q2hhbmdlKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgbmFtZTogZS50YXJnZXQudmFsdWUgfSk7XG4gIH1cblxuICBvbkJ1dHRvbkFkZENsaWNrKCkge1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IGRpc3BhdGNoIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChuYW1lID09PSAnJykge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VJbmZvKGxhYmVscy5tc2dOYW1lUmVxdWlyZWQpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGlzcGF0Y2goYWRkQ2F0ZWdvcnkobmFtZSwgdGhpcy5vbkNhdGVnb3J5Q3JlYXRlZCkpO1xuICB9XG5cbiAgb25DYXRlZ29yeUNyZWF0ZWQoc2VsZWN0ZWRDYXRlZ29yeSkge1xuICAgIGNvbnN0IHsgb25OZXh0IH0gPSB0aGlzLnByb3BzO1xuICAgIG9uTmV4dCh7IHN0ZXBJZDogQUREX1RBU0ssIG9wdGlvbnM6IHsgc2VsZWN0ZWRDYXRlZ29yeSB9IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtYWRkLWNhdGVnb3J5XCI+XG4gICAgICAgIDxoMj57bGFiZWxzLnRpdGxlQWRkQ2F0ZWdvcnl9PC9oMj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4taW5wdXRcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2xhYmVscy5wbGFjZWhvbGRlck5hbWV9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0VGV4dENoYW5nZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQnV0dG9uQWRkQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xhYmVscy5idXR0b25BZGR9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5BZGRDYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbk5leHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCkoQWRkQ2F0ZWdvcnkpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IHsgU0VMRUNUX0NPTVBMRVRFX0RBVEUgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VJbmZvIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5cbmNsYXNzIEFkZFRhc2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0aXRsZTogJycsXG4gICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgfTtcbiAgICB0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlID0gdGhpcy5vbklucHV0VGV4dENoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25CdXR0b25TY2hlZHVsZUNsaWNrID0gdGhpcy5vbkJ1dHRvblNjaGVkdWxlQ2xpY2suYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uSW5wdXRUZXh0Q2hhbmdlKG5hbWUpIHtcbiAgICByZXR1cm4gKGUpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBbbmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pO1xuICAgIH07XG4gIH1cblxuICBvbkJ1dHRvblNjaGVkdWxlQ2xpY2soKSB7XG4gICAgY29uc3QgeyBvcHRpb25zLCBkaXNwYXRjaCwgb25OZXh0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgdGl0bGUsIGRlc2NyaXB0aW9uIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGNhdGVnb3J5ID0gb3B0aW9ucy5zZWxlY3RlZENhdGVnb3J5O1xuICAgIGlmICh0aXRsZSA9PT0gJycpIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlSW5mbyhsYWJlbHMubXNnVGl0bGVSZXF1aXJlZCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvbk5leHQoeyBzdGVwSWQ6IFNFTEVDVF9DT01QTEVURV9EQVRFLCBvcHRpb25zOiB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgY2F0ZWdvcnkgfSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSA9IHRoaXMucHJvcHMub3B0aW9ucztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWFkZC10YXNrXCI+XG4gICAgICAgIDxoMj57bGFiZWxzLnRpdGxlQWRkVGFza308L2gyPlxuICAgICAgICA8aDM+XG4gICAgICAgICAge2xhYmVscy5sYWJlbEZvckNhdGVnb3J5fVxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxhYmVsLWNhdGVnb3J5LW5hbWVcIj5cbiAgICAgICAgICAgIHtgICR7c2VsZWN0ZWRDYXRlZ29yeS5uYW1lfWB9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2gzPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtZmllbGRzXCI+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtsYWJlbHMucGxhY2VIb2xkZXJUaXRsZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlKCd0aXRsZScpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtsYWJlbHMucGxhY2VIb2xkZXJEZXNjcmlwdGlvbn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlKCdkZXNjcmlwdGlvbicpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4tYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25CdXR0b25TY2hlZHVsZUNsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYWJlbHMuYnV0dG9uU2NoZWR1bGV9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5BZGRUYXNrLnByb3BUeXBlcyA9IHtcbiAgZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9wdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2VsZWN0ZWRDYXRlZ29yeTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgfSkuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCgpKEFkZFRhc2spO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBTZWxlY3RBY3Rpb25BZGQgZnJvbSAnLi9TZWxlY3RBY3Rpb25BZGQnO1xuaW1wb3J0IEFkZENhdGVnb3J5IGZyb20gJy4vQWRkQ2F0ZWdvcnknO1xuaW1wb3J0IFNlbGVjdENhdGVnb3J5IGZyb20gJy4vU2VsZWN0Q2F0ZWdvcnknO1xuaW1wb3J0IEFkZFRhc2sgZnJvbSAnLi9BZGRUYXNrJztcbmltcG9ydCBTZWxlY3RDb21wbGV0ZURhdGUgZnJvbSAnLi9TZWxlY3RDb21wbGV0ZURhdGUnO1xuaW1wb3J0IERvbmUgZnJvbSAnLi9Eb25lJztcbmltcG9ydCB7XG4gIFNFTEVDVF9XQU5UX1RPX0FERCxcbiAgQUREX0NBVEVHT1JZLFxuICBBRERfVEFTSyxcbiAgU0VMRUNUX0NBVEVHT1JZLFxuICBTRUxFQ1RfQ09NUExFVEVfREFURSxcbiAgRE9ORSxcbiAgc3RlcExpc3QsXG59IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgUmVwbGFjZUFuaW0gZnJvbSAnLi4vYW5pbXMvUmVwbGFjZUFuaW0nO1xuaW1wb3J0IERpYWxvZ0FuaW0gZnJvbSAnLi4vYW5pbXMvRGlhbG9nQW5pbSc7XG5pbXBvcnQgU3RlcHMgZnJvbSAnLi9TdGVwcyc7XG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuXG5jb25zdCBnZXRDb250ZW50VG9SZW5kZXIgPSAoc3RlcHMsIHByb3BzKSA9PiB7XG4gIGlmIChzdGVwcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gPFNlbGVjdEFjdGlvbkFkZCB7Li4ucHJvcHN9IC8+O1xuICB9XG4gIGNvbnN0IGxhc3RTdGVwID0gc3RlcHNbc3RlcHMubGVuZ3RoIC0gMV07XG4gIHN3aXRjaCAobGFzdFN0ZXAuc3RlcElkKSB7XG4gICAgY2FzZSBTRUxFQ1RfV0FOVF9UT19BREQ6XG4gICAgICByZXR1cm4gPFNlbGVjdEFjdGlvbkFkZCB7Li4ucHJvcHN9IC8+O1xuICAgIGNhc2UgQUREX0NBVEVHT1JZOlxuICAgICAgcmV0dXJuIDxBZGRDYXRlZ29yeSB7Li4ucHJvcHN9IC8+O1xuICAgIGNhc2UgQUREX1RBU0s6XG4gICAgICByZXR1cm4gPEFkZFRhc2sgey4uLnByb3BzfSBvcHRpb25zPXtsYXN0U3RlcC5vcHRpb25zfSAvPjtcbiAgICBjYXNlIFNFTEVDVF9DQVRFR09SWTpcbiAgICAgIHJldHVybiA8U2VsZWN0Q2F0ZWdvcnkgey4uLnByb3BzfSAvPjtcbiAgICBjYXNlIFNFTEVDVF9DT01QTEVURV9EQVRFOlxuICAgICAgcmV0dXJuIDxTZWxlY3RDb21wbGV0ZURhdGUgey4uLnByb3BzfSBvcHRpb25zPXtsYXN0U3RlcC5vcHRpb25zfSAvPjtcbiAgICBjYXNlIERPTkU6XG4gICAgICByZXR1cm4gPERvbmUgey4uLnByb3BzfSAvPjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIDxTZWxlY3RBY3Rpb25BZGQgey4uLnByb3BzfSAvPjtcbiAgfVxufTtcblxuY29uc3QgaW5pdGFsU3RhdGUgPSB7XG4gIG5leHRTdGVwczogW10sXG4gIHN0ZXBzOiBbXG4gICAge1xuICAgICAgc3RlcElkOiBTRUxFQ1RfV0FOVF9UT19BREQsXG4gICAgICBvcHRpb25zOiB7fSxcbiAgICB9LFxuICBdLFxuICBzaG93U3RlcDogdHJ1ZSxcbn07XG5cbmNsYXNzIERpYWxvZ0FkZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAuLi5pbml0YWxTdGF0ZSxcbiAgICB9O1xuICAgIHRoaXMub25CYWNrID0gdGhpcy5vbkJhY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uTmV4dCA9IHRoaXMub25OZXh0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblJlc2V0QW5kQ2xvc2UgPSB0aGlzLm9uUmVzZXRBbmRDbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25BbmltYXRpb25FbmQgPSB0aGlzLm9uQW5pbWF0aW9uRW5kLmJpbmQodGhpcyk7XG4gIH1cblxuICBvbkJhY2soKSB7XG4gICAgY29uc3QgeyBzdGVwcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IG9uQ2xvc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc3RlcENvdW50ID0gc3RlcHMubGVuZ3RoO1xuICAgIGlmIChzdGVwQ291bnQgPT09IDEpIHtcbiAgICAgIC8vIFJldHVybmVkIHRvIHRoZSBmaXJzdCBzdGVwcywgY2xvc2UgdGhlIGRpYWxvZ1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLmluaXRhbFN0YXRlIH0pO1xuICAgICAgb25DbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbmV4dFN0ZXBzOiBbXG4gICAgICAgICAgLi4uc3RlcHMuc2xpY2UoMCwgc3RlcHMubGVuZ3RoIC0gMSksXG4gICAgICAgIF0sXG4gICAgICAgIHNob3dTdGVwOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uTmV4dChzdGVwID0geyBzdGVwSWQ6ICcnLCBvcHRpb25zOiB7fSB9KSB7XG4gICAgY29uc3QgeyBzdGVwcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG5leHRTdGVwczogW1xuICAgICAgICAuLi5zdGVwcywge1xuICAgICAgICAgIC4uLnN0ZXAsXG4gICAgICAgICAgY29tcGxldGU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgc2hvd1N0ZXA6IGZhbHNlLFxuICAgIH0pO1xuICB9XG5cbiAgb25SZXNldEFuZENsb3NlKCkge1xuICAgIGNvbnN0IHsgb25DbG9zZSB9ID0gdGhpcy5wcm9wcztcbiAgICBvbkNsb3NlKCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgLi4uaW5pdGFsU3RhdGUgfSk7XG4gICAgfSwgNTAwKTtcbiAgfVxuXG4gIG9uQW5pbWF0aW9uRW5kKG5vZGUsIGRvbmUpIHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCAoKSA9PiB7XG4gICAgICBkb25lKCk7XG4gICAgICBjb25zdCB7IG5leHRTdGVwcywgc2hvd1N0ZXAgfSA9IHRoaXMuc3RhdGU7XG4gICAgICBpZiAoc2hvd1N0ZXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHN0ZXBzOiBbXG4gICAgICAgICAgLi4ubmV4dFN0ZXBzLFxuICAgICAgICBdLFxuICAgICAgICBzaG93U3RlcDogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHN0ZXBzLCBzaG93U3RlcCB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IG9uQ2xvc2UsIG9wZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBvbk5leHQsIG9uUmVzZXRBbmRDbG9zZSwgb25BbmltYXRpb25FbmQgfSA9IHRoaXM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxEaWFsb2dBbmltIGluPXtvcGVufT5cbiAgICAgICAgPGRpdiBpZD1cImRpYWxvZy1hZGRcIiA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaWFsb2ctaGVhZGVyXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwibWFpbi1jbG9zZS1idXR0b25cIiBvbkNsaWNrPXsoKSA9PiBvbkNsb3NlKCl9PlxuICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPiYjeEU1Q0Q7PC9pPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwcy1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxTdGVwc1xuICAgICAgICAgICAgICBsaXN0PXtzdGVwTGlzdH1cbiAgICAgICAgICAgICAgc3RlcEhpc3Rvcnk9e3N0ZXBzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpYWxvZy1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxSZXBsYWNlQW5pbSBpbj17c2hvd1N0ZXB9IGVuZExpc3RlbmVyPXtvbkFuaW1hdGlvbkVuZH0+XG4gICAgICAgICAgICAgIHtnZXRDb250ZW50VG9SZW5kZXIoc3RlcHMsIHsgb25OZXh0LCBvbkNsb3NlOiBvblJlc2V0QW5kQ2xvc2UgfSl9XG4gICAgICAgICAgICA8L1JlcGxhY2VBbmltPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlhbG9nLWZvb3RlclwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBpZD1cImJhY2stYnV0dG9uLWRpYWxvZ1wiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5vbkJhY2soKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2xhYmVscy5idXR0b25CYWNrfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9EaWFsb2dBbmltPlxuICAgICk7XG4gIH1cbn1cblxuRGlhbG9nQWRkLnByb3BUeXBlcyA9IHtcbiAgb3BlbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpYWxvZ0FkZDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi9jb25zdGFudHMvbGFiZWxzJztcblxuY2xhc3MgRG9uZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgeyBvbkNsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgICAgb25DbG9zZSgpO1xuICAgIH0sIDMwMDApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtZG9uZS1hZGRcIj5cbiAgICAgICAgPGgyPntsYWJlbHMubGFiZWxEb25lfTwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1pYy1kb25lXCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgc3JjPVwiLi9jbGllbnQvcHVibGljL2ltZy9pYy1kb25lLnN2Z1wiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJpYy1kb25lXCJcbiAgICAgICAgICAgIGFsdD1cImRvbmUgaWNvblwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkRvbmUucHJvcFR5cGVzID0ge1xuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRG9uZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgeyBBRERfQ0FURUdPUlksIFNFTEVDVF9DQVRFR09SWSB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuXG5jb25zdCBTZWxlY3RBY3Rpb25BZGQgPSAoeyBvbk5leHQgfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtc2VsZWN0LWFjdGlvbi1hZGRcIj5cbiAgICA8aDI+e2xhYmVscy50aXRsZUFkZH08L2gyPlxuICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbS1zZWxlY3RcIj5cbiAgICAgIDxwXG4gICAgICAgIGNsYXNzTmFtZT1cInNlbGVjdC10aXRsZVwiXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uTmV4dCh7IHN0ZXBJZDogQUREX0NBVEVHT1JZLCBvcHRpb25zOiB7fSB9KX1cbiAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICA+XG4gICAgICAgIHtsYWJlbHMubGFiZWxDYXRlZ29yeX1cbiAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW0tc2VsZWN0XCI+XG4gICAgICA8cFxuICAgICAgICBjbGFzc05hbWU9XCJzZWxlY3QtdGl0bGVcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk5leHQoeyBzdGVwSWQ6IFNFTEVDVF9DQVRFR09SWSwgb3B0aW9uczoge30gfSl9XG4gICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgPlxuICAgICAgICB7bGFiZWxzLmxhYmVsVGFza31cbiAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4pO1xuXG5TZWxlY3RBY3Rpb25BZGQucHJvcFR5cGVzID0ge1xuICBvbk5leHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RBY3Rpb25BZGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5pbXBvcnQgQ2F0ZWdvcnkgZnJvbSAnLi4vQ2F0ZWdvcnknO1xuaW1wb3J0IHsgQUREX1RBU0sgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VJbmZvIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5cblxuY2xhc3MgU2VsZWN0Q2F0ZWdvcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VsZWN0ZWRDYXRlZ29yeTogdW5kZWZpbmVkLFxuICAgIH07XG4gICAgdGhpcy5vbkNhdGVnb3J5Q2xpY2sgPSB0aGlzLm9uQ2F0ZWdvcnlDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25CdXR0b25OZXh0Q2xpY2sgPSB0aGlzLm9uQnV0dG9uTmV4dENsaWNrLmJpbmQodGhpcyk7XG4gIH1cblxuICBvbkNhdGVnb3J5Q2xpY2soY2F0ZWdvcnkpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRDYXRlZ29yeTogY2F0ZWdvcnkgfSk7XG4gIH1cblxuICBvbkJ1dHRvbk5leHRDbGljaygpIHtcbiAgICBjb25zdCB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvbk5leHQsIGRpc3BhdGNoIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChzZWxlY3RlZENhdGVnb3J5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlSW5mbyhsYWJlbHMubXNnU2VsZWN0Q2F0ZWdvcnkpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25OZXh0KHsgc3RlcElkOiBBRERfVEFTSywgb3B0aW9uczogeyBzZWxlY3RlZENhdGVnb3J5IH0gfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjYXRlZ29yaWVzTGlzdCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1zZWxlY3QtY2F0ZWdvcnlcIj5cbiAgICAgICAgPGgyPntsYWJlbHMudGl0bGVDaG9vc2VDYXRlZ29yeX08L2gyPlxuICAgICAgICA8ZGl2IGlkPVwiY29udGVudC1jYXRlZ29yaWVzXCI+XG4gICAgICAgICAge1xuICAgICAgICAgICAgY2F0ZWdvcmllc0xpc3QubWFwKGNhdGVnb3J5ID0+IChcbiAgICAgICAgICAgICAgKGNhdGVnb3J5LmlkICE9PSAnMCcpXG4gICAgICAgICAgICAgID8gPENhdGVnb3J5XG4gICAgICAgICAgICAgICAga2V5PXtjYXRlZ29yeS5pZH1cbiAgICAgICAgICAgICAgICBjYXRlZ29yeT17Y2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3NlbGVjdGVkQ2F0ZWdvcnkgIT09IHVuZGVmaW5lZCAmJiBjYXRlZ29yeS5pZCA9PT0gc2VsZWN0ZWRDYXRlZ29yeS5pZH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2F0ZWdvcnlDbGlja31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICkpXG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQnV0dG9uTmV4dENsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYWJlbHMuYnV0dG9uTmV4dH1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblNlbGVjdENhdGVnb3J5LnByb3BUeXBlcyA9IHtcbiAgZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNhdGVnb3JpZXNMaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICBvbk5leHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcCA9IHN0YXRlID0+IChcbiAge1xuICAgIGNhdGVnb3JpZXNMaXN0OiBzdGF0ZS50b2RvRmlsdGVycy5jYXRlZ29yaWVzLFxuICB9XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wKShTZWxlY3RDYXRlZ29yeSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgRGF0ZVBpY2tlciBmcm9tICdyZWFjdC1kYXRlLXBpY2tlcic7XG5cbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5pbXBvcnQgeyBET05FIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCB7IGFkZFRhc2sgfSBmcm9tICcuLi8uLi9hY3Rpb25zL3RvZG9UYXNrc0FjdGlvbnMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VJbmZvIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5cbmNsYXNzIFNlbGVjdENvbXBsZXRlRGF0ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0b2RvV2l0aGluOiBuZXcgRGF0ZSgpLFxuICAgIH07XG4gICAgdGhpcy5vbklucHV0RGF0ZUNoYW5nZSA9IHRoaXMub25JbnB1dERhdGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQnV0dG9uQWRkQ2xpY2sgPSB0aGlzLm9uQnV0dG9uQWRkQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uVG9kb1Rhc2tDcmVhdGVkID0gdGhpcy5vblRvZG9UYXNrQ3JlYXRlZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25JbnB1dERhdGVDaGFuZ2UoZGF0ZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyB0b2RvV2l0aGluOiBkYXRlIH0pO1xuICB9XG5cbiAgb25CdXR0b25BZGRDbGljaygpIHtcbiAgICBjb25zdCB7IHRvZG9XaXRoaW4gfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBkaXNwYXRjaCwgb3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgY2F0ZWdvcnkgfSA9IG9wdGlvbnM7XG4gICAgaWYgKCF0b2RvV2l0aGluIHx8IHRvZG9XaXRoaW4gPT09ICcnKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ1NlbGVjdERhdGUpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGlzcGF0Y2goYWRkVGFzayhcbiAgICAgIHRpdGxlLCBkZXNjcmlwdGlvbixcbiAgICAgIGNhdGVnb3J5LCB0b2RvV2l0aGluLCB0aGlzLm9uVG9kb1Rhc2tDcmVhdGVkLFxuICAgICkpO1xuICB9XG5cbiAgb25Ub2RvVGFza0NyZWF0ZWQoKSB7XG4gICAgY29uc3QgeyBvbk5leHQgfSA9IHRoaXMucHJvcHM7XG4gICAgb25OZXh0KHsgc3RlcElkOiBET05FLCBvcHRpb25zOiB7IH0gfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB0b2RvV2l0aGluIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtc2VsZWN0LWNvbXBsZXRlLWRhdGVcIj5cbiAgICAgICAgPGgyPntsYWJlbHMudGl0bGVUb2RvV2l0aGlufTwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1pbnB1dFwiPlxuICAgICAgICAgIDxEYXRlUGlja2VyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIGNhbGVuZGFyQ2xhc3NOYW1lPVwiZGFyay1jYWxlbmRhclwiXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0RGF0ZUNoYW5nZX1cbiAgICAgICAgICAgIHZhbHVlPXt0b2RvV2l0aGlufVxuICAgICAgICAgICAgbWluRGF0ZT17bmV3IERhdGUoKX1cbiAgICAgICAgICAgIGxvY2FsZT1cImVuLVVTXCJcbiAgICAgICAgICAgIGNsZWFySWNvbj17PGkgY2xhc3NOYW1lPVwiaWNvbi1kZWxldGVcIiAvPn1cbiAgICAgICAgICAgIGNhbGVuZGFySWNvbj17PGkgY2xhc3NOYW1lPVwiaWNvbi1jYWxlbmRhclwiIC8+fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4tYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25CdXR0b25BZGRDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGFiZWxzLmJ1dHRvbkFkZH1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblNlbGVjdENvbXBsZXRlRGF0ZS5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvcHRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgZGVzY3JpcHRpb246IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjYXRlZ29yeTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgfSkuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCgpKFNlbGVjdENvbXBsZXRlRGF0ZSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgU3RlcCA9ICh7IGRlc2NyaXB0aW9uLCBjb21wbGV0ZWQsIG5lZWRMaW5lIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNvbnRhaW5lclwiPlxuICAgIHtcbiAgICAgIG5lZWRMaW5lICYmXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGxpbmUgJHsoY29tcGxldGVkKSA/ICdjb21wbGV0ZWQnIDogJyd9YH0gLz5cbiAgICB9XG4gICAgPGRpdiBjbGFzc05hbWU9e2BzdGVwICR7KGNvbXBsZXRlZCkgPyAnY29tcGxldGVkJyA6ICcnfWB9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmRpY2F0b3JcIiAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWRlc2NyaXB0aW9uXCI+XG4gICAgICAgIDxwPntkZXNjcmlwdGlvbn08L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4pO1xuXG5TdGVwLnByb3BUeXBlcyA9IHtcbiAgZGVzY3JpcHRpb246IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBuZWVkTGluZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbn07XG5cbmNvbnN0IFN0ZXBzID0gKHsgbGlzdCwgc3RlcEhpc3RvcnkgfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXBzLXdyYXBwZXJcIj5cbiAgICB7XG4gICAgICBsaXN0Lm1hcCgoaXRlbSwgaSkgPT4gKFxuICAgICAgICA8U3RlcFxuICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICB7Li4uaXRlbX1cbiAgICAgICAgICBjb21wbGV0ZWQ9e3N0ZXBIaXN0b3J5LmZpbHRlcihzaCA9PiBzaC5zdGVwSWQgPT09IGl0ZW0uaWQpLmxlbmd0aCA+IDB9XG4gICAgICAgICAgbmVlZExpbmU9e2kgPiAwfVxuICAgICAgICAvPikpXG4gICAgfVxuICA8L2Rpdj5cbik7XG5cblN0ZXBzLnByb3BUeXBlcyA9IHtcbiAgbGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIHN0ZXBIaXN0b3J5OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHN0ZXBJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgfSkpLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdGVwcztcbiIsImNvbnN0IGxhYmVscyA9IHtcbiAgdGl0bGVBZGQ6ICdXaGF0IHdvdWxkIHlvdSBsaWtlIHRvIGFkZD8nLFxuICB0aXRsZUFkZENhdGVnb3J5OiAnQWRkIG5ldyBDQVRFR09SWScsXG4gIHRpdGxlQWRkVGFzazogJ0FkZCBuZXcgVGFzaycsXG4gIHRpdGxlQ2hvb3NlQ2F0ZWdvcnk6ICdDaG9vc2UgYSBDQVRFR09SWScsXG4gIHRpdGxlVG9kb1dpdGhpbjogJ1RvZG8gV2l0aGluJyxcbiAgbGFiZWxGb3JDYXRlZ29yeTogJ2ZvciB0aGUgY2F0ZWdvcnk6JyxcbiAgbGFiZWxEb25lOiAnRG9uZSEnLFxuICBsYWJlbENhdGVnb3J5OiAnQ0FURUdPUlknLFxuICBsYWJlbFRhc2s6ICdUQVNLJyxcbiAgbGFiZWxOb3RTZXQ6ICdub3Qgc2V0JyxcbiAgbGFiZWxOb0Rlc2NyaXB0aW9uOiAnTm8gZGVzY3JpcHRpb24gdG8gc2hvdyA6KCcsXG4gIGxhYmVsUGFydGlhbENvbXBsZXRlZDogJ2NvbXBsZXRlZCcsXG4gIGxhYmVsUGFydGlhbFRvQ29tcGxldGVkOiAndG8gY29tcGxldGUgd2l0aGluJyxcbiAgcGxhY2VIb2xkZXJUaXRsZTogJ1R5cGUgdGhlIHRpdGxlJyxcbiAgcGxhY2VIb2xkZXJEZXNjcmlwdGlvbjogJ1R5cGUgdGhlIGRlc2NyaXB0aW9uJyxcbiAgcGxhY2Vob2xkZXJOYW1lOiAnVHlwZSB0aGUgbmFtZScsXG4gIGJ1dHRvblNjaGVkdWxlOiAnU0NIRURVTEUnLFxuICBidXR0b25BZGQ6ICdBREQnLFxuICBidXR0b25OZXh0OiAnTkVYVCcsXG4gIGJ1dHRvbkJhY2s6ICdORVZFUiBNSU5ELCBHTyBCQUNLJyxcbiAgbXNnVGl0bGVSZXF1aXJlZDogJ0VudGVyIHRoZSB0aXRsZScsXG4gIG1zZ05hbWVSZXF1aXJlZDogJ0VudGVyIHRoZSBuYW1lJyxcbiAgbXNnU2VsZWN0Q2F0ZWdvcnk6ICdTZWxlY3QgYSBjYXRlZ29yeScsXG4gIG1zZ1NlbGVjdERhdGU6ICdQaWNrIGEgZGF0ZSBhbmQgY29tbWl0LiBObyBleGN1c2VzIScsXG4gIHN0ZXBEZXNjV2FudFRvQWRkOiAnV2hhdCB3YW50IHRvIGFkZCcsXG4gIHN0ZXBEZXNjQWRkQ2F0ZWdvcnk6ICdBZGQgYSBjYXRlZ29yeScsXG4gIHN0ZXBEZXNjclNlbGVjQ2F0ZWdvcnk6ICdTZWxlY3QgYSBjYXRlZ29yeScsXG4gIHN0ZXBEZXNjQWRkVGFzazogJ0FkZCB0YXNrJyxcbiAgc3RlcERlc2NDb21wbGV0ZURhdGU6ICdTY2hlZHVsZScsXG4gIHN0ZXBEZXNjRG9uZTogJ1RoYXRcXCdzIGl0Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxhYmVscztcbiIsImltcG9ydCBsYWJlbHMgZnJvbSAnLi9sYWJlbHMnO1xuXG5leHBvcnQgY29uc3QgU0VMRUNUX1dBTlRfVE9fQUREID0gJ1NFTEVDVF9XQU5UX1RPX0FERCc7XG5leHBvcnQgY29uc3QgQUREX0NBVEVHT1JZID0gJ0FERF9DQVRFR09SWSc7XG5leHBvcnQgY29uc3QgQUREX1RBU0sgPSAnQUREX1RBU0snO1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9DQVRFR09SWSA9ICdTRUxFQ1RfQ0FURUdPUlknO1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9DT01QTEVURV9EQVRFID0gJ1NFTEVDVF9DT01QTEVURV9EQVRFJztcbmV4cG9ydCBjb25zdCBET05FID0gJ0RPTkUnO1xuXG5leHBvcnQgY29uc3Qgc3RlcExpc3QgPSBbXG4gIHtcbiAgICBpZDogU0VMRUNUX1dBTlRfVE9fQURELFxuICAgIGRlc2NyaXB0aW9uOiBsYWJlbHMuc3RlcERlc2NXYW50VG9BZGQsXG4gIH0sXG4gIHtcbiAgICBpZDogQUREX0NBVEVHT1JZLFxuICAgIGRlc2NyaXB0aW9uOiBsYWJlbHMuc3RlcERlc2NBZGRDYXRlZ29yeSxcbiAgfSxcbiAge1xuICAgIGlkOiBTRUxFQ1RfQ0FURUdPUlksXG4gICAgZGVzY3JpcHRpb246IGxhYmVscy5zdGVwRGVzY3JTZWxlY0NhdGVnb3J5LFxuICB9LFxuICB7XG4gICAgaWQ6IEFERF9UQVNLLFxuICAgIGRlc2NyaXB0aW9uOiBsYWJlbHMuc3RlcERlc2NBZGRUYXNrLFxuICB9LFxuICB7XG4gICAgaWQ6IFNFTEVDVF9DT01QTEVURV9EQVRFLFxuICAgIGRlc2NyaXB0aW9uOiBsYWJlbHMuc3RlcERlc2NDb21wbGV0ZURhdGUsXG4gIH0sXG4gIHtcbiAgICBpZDogRE9ORSxcbiAgICBkZXNjcmlwdGlvbjogbGFiZWxzLnN0ZXBEZXNjRG9uZSxcbiAgfSxcbl07XG4iLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IENhdGVnb3JpZXNGaWx0ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9DYXRlZ29yaWVzRmlsdGVyJztcbmltcG9ydCB7XG4gIHNlbGVjdENhdGVnb3J5LFxuICBzZWxlY3RDYXRlZ29yeUFsbCxcbiAgZGVsZXRlQ2F0ZWdvcnksXG59IGZyb20gJy4uL2FjdGlvbnMvdG9kb0ZpbHRlcnNBY3Rpb25zJztcbmltcG9ydCBjYXRlZ29yeUFsbCBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcblxuaW1wb3J0IHsgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICBjYXRlZ29yeUxpc3Q6IGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0KHN0YXRlKSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgb25EZWxldGVDYXRlZ29yeTogKGNhdGVnb3J5KSA9PiB7XG4gICAgICBkaXNwYXRjaChkZWxldGVDYXRlZ29yeShjYXRlZ29yeS5pZCkpO1xuICAgIH0sXG4gICAgb25DaWxja0NhdGVnb3J5OiAoY2F0ZWdvcnksIGUpID0+IHtcbiAgICAgIGlmIChlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdpJyAmJiBlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdidXR0b24nKSB7XG4gICAgICAgIGlmIChjYXRlZ29yeS5pZCA9PT0gY2F0ZWdvcnlBbGwuaWQpIHtcbiAgICAgICAgICBkaXNwYXRjaChzZWxlY3RDYXRlZ29yeUFsbCgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaXNwYXRjaChzZWxlY3RDYXRlZ29yeShjYXRlZ29yeSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgfVxuKTtcblxuY29uc3QgQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lciA9IGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuKShDYXRlZ29yaWVzRmlsdGVyKTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lcjtcbiIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVGFza3MgZnJvbSAnLi4vY29tcG9uZW50cy9UYXNrcyc7XG5pbXBvcnQge1xuICBmZXRjaFRhc2tzQnlDYXRlZ29yeSxcbiAgZGVsZXRlVGFzayxcbiAgdG9vZ2xlVGFza0NvbXBsZXRlZCxcbn0gZnJvbSAnLi4vYWN0aW9ucy90b2RvVGFza3NBY3Rpb25zJztcblxuaW1wb3J0IHsgZ2V0VGFza0xpc3QsIGdldFNraXAsIHN0aWxsTW9yZVRvTG9hZCB9IGZyb20gJy4uL3NlbGVjdG9ycy90b2RvVGFza3NTZWxlY3RvcnMnO1xuaW1wb3J0IHsgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQsIHZpc2liaWxpdHlPbmx5Q29tcGxldGVkIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgdGFza0xpc3Q6IGdldFRhc2tMaXN0KHN0YXRlKSxcbiAgICBza2lwOiBnZXRTa2lwKHN0YXRlKSxcbiAgICBtb3JlVG9Mb2FkOiBzdGlsbE1vcmVUb0xvYWQoc3RhdGUpLFxuICAgIGNhdGVnb3JpZXNJZDogZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQoc3RhdGUpLFxuICAgIGNvbXBsZXRlZDogdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQoc3RhdGUpLFxuICB9XG4pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoXG4gIHtcbiAgICBvbkRlbGV0ZVRhc2s6ICh0YXNrKSA9PiB7XG4gICAgICBkaXNwYXRjaChkZWxldGVUYXNrKHRhc2suaWQpKTtcbiAgICB9LFxuICAgIG9uQ29tcGxldGVUYXNrOiAodGFzaykgPT4ge1xuICAgICAgZGlzcGF0Y2godG9vZ2xlVGFza0NvbXBsZXRlZCh0YXNrLmlkLCB0YXNrLmNvbXBsZXRlZCkpO1xuICAgIH0sXG4gICAgZmV0Y2hUYXNrczogKGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgc2tpcCkgPT4ge1xuICAgICAgZGlzcGF0Y2goZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkoY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsIGxpbWl0LCBza2lwKSk7XG4gICAgfSxcbiAgfVxuKTtcblxuY29uc3QgVGFza3NDb250YWluZXIgPSBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbikoVGFza3MpO1xuXG5leHBvcnQgZGVmYXVsdCBUYXNrc0NvbnRhaW5lcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgVG9kb3MgZnJvbSAnLi4vY29tcG9uZW50cy9Ub2Rvcyc7XG5pbXBvcnQgeyBmZXRjaEFsbENhdGVnb3JpZXMgfSBmcm9tICcuLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5pbXBvcnQgeyBoaWRlTWVzc2FnZSB9IGZyb20gJy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuaW1wb3J0IHsgc2hvd0xvYWRpbmcgfSBmcm9tICcuLi9zZWxlY3RvcnMvY29tbW9uU2VsZWN0b3JzJztcblxuY29uc3QgVG9kb3NDb250YWluZXIgPSBwcm9wcyA9PiA8VG9kb3Mgey4uLnByb3BzfSAvPjtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgbWVzc2FnZTogc3RhdGUubWVzc2FnZSxcbiAgICBzaG93TG9hZGluZzogc2hvd0xvYWRpbmcoc3RhdGUpLFxuICB9XG4pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoXG4gIHtcbiAgICBoaWRlTWVzc2FnZTogKCkgPT4ge1xuICAgICAgZGlzcGF0Y2goaGlkZU1lc3NhZ2UoKSk7XG4gICAgfSxcbiAgICBpbml0RmV0Y2hBbGxDYXRlZ29yaWVzOiAoKSA9PiB7XG4gICAgICBkaXNwYXRjaChmZXRjaEFsbENhdGVnb3JpZXMoKSk7XG4gICAgfSxcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVG9kb3NDb250YWluZXIpO1xuIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaXNpYmlsaXR5RmlsdGVycyBmcm9tICcuLi9jb21wb25lbnRzL1Zpc2liaWxpdHlGaWx0ZXJzJztcbmltcG9ydCB7IGNoYW5nZVZpc2liaWxpdHkgfSBmcm9tICcuLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5cbmltcG9ydCB7IGdldFZpc2liaWxpdHlGaWx0ZXIgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXI6IGdldFZpc2liaWxpdHlGaWx0ZXIoc3RhdGUpLFxuICB9XG4pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoXG4gIHtcbiAgICBvblZpc2liaWxpdHlTd2l0Y2hDbGljazogdmlzaWJpbGl0eSA9PiAoKSA9PiAoXG4gICAgICBkaXNwYXRjaChjaGFuZ2VWaXNpYmlsaXR5KHZpc2liaWxpdHkpKVxuICAgICksXG4gIH1cbik7XG5cbmNvbnN0IFZpc2liaWxpdHlGaWx0ZXJDb250YWluZXIgPSBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbikoVmlzaWJpbGl0eUZpbHRlcnMpO1xuXG5leHBvcnQgZGVmYXVsdCBWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyO1xuIiwiaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgeyBpc0ZldGNoaW5nQ2F0ZWdvcmllc0ZpbHRlciB9IGZyb20gJy4vdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuaW1wb3J0IHsgaXNGZXRjaGluZ1Rhc2tzIH0gZnJvbSAnLi90b2RvVGFza3NTZWxlY3RvcnMnO1xuXG5leHBvcnQgY29uc3Qgc2hvd0xvYWRpbmcgPSBjcmVhdGVTZWxlY3RvcihcbiAgaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIsXG4gIGlzRmV0Y2hpbmdUYXNrcyxcbiAgKGlzRmV0Y2hpbmdDYXRlZ29yaWVzLCBpc0ZldGNoaW5nVG9kb3MpID0+IGlzRmV0Y2hpbmdDYXRlZ29yaWVzIHx8IGlzRmV0Y2hpbmdUb2Rvcyxcbik7XG5cbmV4cG9ydCBkZWZhdWx0IHNob3dMb2FkaW5nO1xuIiwiaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgeyBPTkxZX0NPTVBMRVRFRCB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuXG5leHBvcnQgY29uc3QgaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy5pc0ZldGNoaW5nO1xuZXhwb3J0IGNvbnN0IGdldFRvZG9GaWx0ZXJzID0gc3RhdGUgPT4gc3RhdGUudG9kb0ZpbHRlcnM7XG5leHBvcnQgY29uc3QgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy5jYXRlZ29yaWVzO1xuZXhwb3J0IGNvbnN0IGdldFZpc2liaWxpdHlGaWx0ZXIgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy52aXNpYmlsaXR5O1xuXG5leHBvcnQgY29uc3QgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0VmlzaWJpbGl0eUZpbHRlcixcbiAgdmlzaWJpbGl0eSA9PiB2aXNpYmlsaXR5ID09PSBPTkxZX0NPTVBMRVRFRCxcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRTZWxlY3RlZENhdGVnb3JpZXNGaWx0ZXIgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QsXG4gIGNhdGVnb3JpZXMgPT4gY2F0ZWdvcmllcy5maWx0ZXIoY2F0ZWdvcnkgPT4gY2F0ZWdvcnkuc2VsZWN0ZWQpLFxuKTtcblxuZXhwb3J0IGNvbnN0IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0LFxuICBjYXRlZ29yaWVzID0+IGNhdGVnb3JpZXMuZmlsdGVyKGNhdGVnb3J5ID0+IGNhdGVnb3J5LnNlbGVjdGVkKVxuICAgIC5tYXAoY2F0ZWdvcnlGaWx0ZXIgPT4gY2F0ZWdvcnlGaWx0ZXIuaWQpLFxuKTtcbiIsImV4cG9ydCBjb25zdCBpc0ZldGNoaW5nVGFza3MgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvVGFza3MuaXNGZXRjaGluZztcbmV4cG9ydCBjb25zdCBnZXRUYXNrcyA9IHN0YXRlID0+IHN0YXRlLnRvZG9UYXNrcztcbmV4cG9ydCBjb25zdCBnZXRUYXNrTGlzdCA9IHN0YXRlID0+IHN0YXRlLnRvZG9UYXNrcy5pdGVtcztcbmV4cG9ydCBjb25zdCBnZXRTa2lwID0gc3RhdGUgPT4gc3RhdGUudG9kb1Rhc2tzLnNraXA7XG5leHBvcnQgY29uc3Qgc3RpbGxNb3JlVG9Mb2FkID0gc3RhdGUgPT4gc3RhdGUudG9kb1Rhc2tzLm1vcmVUb0xvYWQ7XG4iLCIvKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiY29uc2lzdGVudFwiXSAqL1xuXG5leHBvcnQgY29uc3QgTWV0aG9kcyA9IHtcbiAgUE9TVDogJ1BPU1QnLFxuICBHRVQ6ICdHRVQnLFxuICBERUxFVEU6ICdERUxFVEUnLFxuICBQQVRDSDogJ1BBVENIJyxcbn07XG5cbmNvbnN0IGZ1bGxVcmwgPSB1cmwgPT4gYC9hcGkvJHt1cmx9YDtcblxuY29uc3QgYmFzZVJlcXVlc3RJbml0ID0ge1xuICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICBoZWFkZXJzOiB7XG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgfSxcbn07XG5cbmNvbnN0IGNyZWF0ZVBvc3RSZXF1ZXN0ID0gKHVybCwgb3B0aW9ucyA9IHt9KSA9PiAoXG4gIGZldGNoKHVybCwge1xuICAgIC4uLmJhc2VSZXF1ZXN0SW5pdCxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvcHRpb25zKSxcbiAgfSlcbik7XG5cbmNvbnN0IGNyZWF0ZUdldFJlcXVlc3QgPSAodXJsLCBvcHRpb25zID0ge30pID0+IHtcbiAgbGV0IGZpbmFsVXJsID0gYCR7dXJsfT9gO1xuICBPYmplY3QuZW50cmllcyhvcHRpb25zKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0sIHBvaXRpb24pID0+IHtcbiAgICBmaW5hbFVybCA9IGAke2ZpbmFsVXJsfSR7KHBvaXRpb24gPiAwKSA/ICcmJyA6ICcnfSR7a2V5fT0ke3ZhbHVlfWA7XG4gIH0pO1xuICByZXR1cm4gZmV0Y2goZmluYWxVcmwsIHtcbiAgICAuLi5iYXNlUmVxdWVzdEluaXQsXG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVEZWxldGVSZXF1ZXN0ID0gKHVybCwgb3B0aW9ucykgPT4ge1xuICBjb25zdCBmaW5hbFVybCA9IGAke3VybH0vJHtvcHRpb25zfWA7XG4gIHJldHVybiBmZXRjaChmaW5hbFVybCwge1xuICAgIC4uLmJhc2VSZXF1ZXN0SW5pdCxcbiAgICBtZXRob2Q6ICdERUxFVEUnLFxuICB9KTtcbn07XG5cbmNvbnN0IGNyZWF0ZVBhdGNoUmVxdWVzdCA9ICh1cmwsIG9wdGlvbnMgPSB7fSkgPT4gKFxuICBmZXRjaCh1cmwsIHtcbiAgICAuLi5iYXNlUmVxdWVzdEluaXQsXG4gICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpLFxuICB9KVxuKTtcblxuY29uc3QgY3JlYXRlUmVxdWVzdCA9ICh1cmwsIG9wdGlvbnMsIG1ldGhvZCkgPT4ge1xuICBjb25zdCBmaW5hbFVybCA9IGZ1bGxVcmwodXJsKTtcbiAgc3dpdGNoIChtZXRob2QpIHtcbiAgICBjYXNlIE1ldGhvZHMuUE9TVDogcmV0dXJuIGNyZWF0ZVBvc3RSZXF1ZXN0KGZpbmFsVXJsLCBvcHRpb25zKTtcbiAgICBjYXNlIE1ldGhvZHMuR0VUOiByZXR1cm4gY3JlYXRlR2V0UmVxdWVzdChmaW5hbFVybCwgb3B0aW9ucyk7XG4gICAgY2FzZSBNZXRob2RzLkRFTEVURTogcmV0dXJuIGNyZWF0ZURlbGV0ZVJlcXVlc3QoZmluYWxVcmwsIG9wdGlvbnMpO1xuICAgIGNhc2UgTWV0aG9kcy5QQVRDSDogcmV0dXJuIGNyZWF0ZVBhdGNoUmVxdWVzdChmaW5hbFVybCwgb3B0aW9ucyk7XG4gICAgZGVmYXVsdDogcmV0dXJuIGNyZWF0ZVBvc3RSZXF1ZXN0KGZpbmFsVXJsLCBvcHRpb25zKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNhbGxBcGkgPSAodXJsLCBvcHRpb25zID0ge30sIG1ldGhvZCA9IE1ldGhvZHMuUE9TVCkgPT4gKFxuICBjcmVhdGVSZXF1ZXN0KHVybCwgb3B0aW9ucywgbWV0aG9kKS50aGVuKFxuICAgIHJlc3BvbnNlID0+IChyZXNwb25zZS5vayA/XG4gICAgICByZXNwb25zZS5qc29uKCkgOlxuICAgICAgUHJvbWlzZS5yZWplY3QocmVzcG9uc2UudGV4dCgpKVxuICAgICksXG4gICAgZXJyb3IgPT4gUHJvbWlzZS5yZWplY3QoZXJyb3IpLFxuICApXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBjYWxsQXBpO1xuXG4iLCJpbXBvcnQgZGF0ZUZvcm1hdCBmcm9tICdkYXRlZm9ybWF0JztcblxuZXhwb3J0IGNvbnN0IHRvSnNEYXRlID0gKHBhcnNlRGF0ZSA9ICcnKSA9PlxuICBuZXcgRGF0ZShwYXJzZUludChwYXJzZURhdGUuc3Vic3RyKDYpLCAxMCkpO1xuXG5leHBvcnQgY29uc3QgdG9TaW1wbGVEYXRlRm9ybWF0ID0gZGF0ZSA9PlxuICBkYXRlRm9ybWF0KGRhdGUsICdkZGRkIGRkIG1tbSB5eXl5Jyk7XG4iXSwic291cmNlUm9vdCI6IiJ9