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

/***/ "./src/components/ButtonCompleteArgument.jsx":
/*!***************************************************!*\
  !*** ./src/components/ButtonCompleteArgument.jsx ***!
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonCompleteArgument = function ButtonCompleteArgument(_ref) {
  var onClick = _ref.onClick,
      completed = _ref.completed;
  return _react2.default.createElement(
    'button',
    {
      className: 'button-complete-argument ' + (completed ? 'button-completed-argument' : ''),
      onClick: onClick
    },
    _react2.default.createElement('i', { className: 'icon-check' })
  );
};

ButtonCompleteArgument.propTypes = {
  onClick: _propTypes2.default.func.isRequired,
  completed: _propTypes2.default.bool
};

ButtonCompleteArgument.defaultProps = {
  completed: false
};

exports.default = ButtonCompleteArgument;

/***/ }),

/***/ "./src/components/ButtonDeleteArgument.jsx":
/*!*************************************************!*\
  !*** ./src/components/ButtonDeleteArgument.jsx ***!
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

var ButtonDeleteArgument = function ButtonDeleteArgument(_ref) {
  var onClick = _ref.onClick;
  return _react2.default.createElement(
    'button',
    { className: 'button-delete-argument', onClick: onClick },
    _react2.default.createElement('i', { className: 'icon-delete' })
  );
};

ButtonDeleteArgument.propTypes = {
  onClick: _propTypes2.default.func.isRequired
};

exports.default = ButtonDeleteArgument;

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

var _ButtonCompleteArgument = __webpack_require__(/*! ./ButtonCompleteArgument */ "./src/components/ButtonCompleteArgument.jsx");

var _ButtonCompleteArgument2 = _interopRequireDefault(_ButtonCompleteArgument);

var _ButtonDeleteArgument = __webpack_require__(/*! ./ButtonDeleteArgument */ "./src/components/ButtonDeleteArgument.jsx");

var _ButtonDeleteArgument2 = _interopRequireDefault(_ButtonDeleteArgument);

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
        { className: 'argument-item' },
        _react2.default.createElement(
          'div',
          { className: 'argument-header' },
          _react2.default.createElement(
            'p',
            {
              className: 'argument-title ' + (task.completed ? 'argument-title-completed' : ''),
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
            _react2.default.createElement(_ButtonDeleteArgument2.default, {
              onClick: onDelete
            })
          ),
          onComplete !== undefined && _react2.default.createElement(_ButtonCompleteArgument2.default, {
            onClick: onComplete,
            completed: task.completed
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'argument-date' },
          this.renderDate()
        ),
        _react2.default.createElement(
          _Collapse2.default,
          { 'in': collapsed },
          _react2.default.createElement(
            'div',
            { key: task.description, className: 'argument-body' },
            _react2.default.createElement(
              'p',
              { className: 'argument-description' },
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
    _this.onFetchTodoArgumentsNext = _this.onFetchTodoArgumentsNext.bind(_this);
    return _this;
  }

  _createClass(Tasks, [{
    key: 'onFetchTodoArgumentsNext',
    value: function onFetchTodoArgumentsNext() {
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
          onDeleteArgument = _props2.onDeleteArgument,
          onCompleteArgument = _props2.onCompleteArgument;

      return _react2.default.createElement(
        'div',
        { id: 'content-todo-arguments' },
        _react2.default.createElement(
          _InfiniteScroll2.default,
          { onScroll: this.onFetchTodoArgumentsNext },
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
                    return onDeleteArgument(arg);
                  },
                  onComplete: function onComplete() {
                    return onCompleteArgument(arg);
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
  onDeleteArgument: _propTypes2.default.func.isRequired,
  onCompleteArgument: _propTypes2.default.func.isRequired,
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

      onNext({ stepId: _steps.ADD_ARGUMENT, options: { selectedCategory: selectedCategory } });
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
          'Add new CATEGORY'
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
        { className: 'content-add-argument' },
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
    case _steps.ADD_ARGUMENT:
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
              'NEVER MIND, GO BACK'
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
      onNext({ stepId: _steps.ADD_ARGUMENT, options: { selectedCategory: selectedCategory } });
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
          'Choose a CATEGORY'
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
    _this.onTodoArgumentCreated = _this.onTodoArgumentCreated.bind(_this);
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
      dispatch((0, _todoTasksActions.addTask)(title, description, category, todoWithin, this.onTodoArgumentCreated));
    }
  }, {
    key: 'onTodoArgumentCreated',
    value: function onTodoArgumentCreated() {
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
          'Todo Within'
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
  titleAddTask: 'Add new Task',
  labelForCategory: 'for the category:',
  labelDone: 'Done!',
  labelCategory: 'CATEGORY',
  labelTask: 'TASK',
  placeHolderTitle: 'Type the title',
  placeHolderDescription: 'Type the description',
  placeholderName: 'Type the name',
  buttonSchedule: 'SCHEDULE',
  buttonAdd: 'ADD',
  buttonNext: 'NEXT',
  msgTitleRequired: 'Enter the title',
  msgNameRequired: 'Enter the name',
  msgSelectCategory: 'Select a category',
  msgSelectDate: 'Pick a date and commit. No excuses!'
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
var SELECT_WANT_TO_ADD = exports.SELECT_WANT_TO_ADD = 'SELECT_WANT_TO_ADD';
var ADD_CATEGORY = exports.ADD_CATEGORY = 'ADD_CATEGORY';
var ADD_ARGUMENT = exports.ADD_ARGUMENT = 'ADD_ARGUMENT';
var SELECT_CATEGORY = exports.SELECT_CATEGORY = 'SELECT_CATEGORY';
var SELECT_COMPLETE_DATE = exports.SELECT_COMPLETE_DATE = 'SELECT_COMPLETE_DATE';
var DONE = exports.DONE = 'DONE';

var stepList = exports.stepList = [{
  id: SELECT_WANT_TO_ADD,
  description: 'What want to add'
}, {
  id: ADD_CATEGORY,
  description: 'Add a category'
}, {
  id: SELECT_CATEGORY,
  description: 'Select a category'
}, {
  id: ADD_ARGUMENT,
  description: 'Add Argument'
}, {
  id: SELECT_COMPLETE_DATE,
  description: 'Schedule'
}, {
  id: DONE,
  description: 'That\'s it'
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
    onDeleteArgument: function onDeleteArgument(task) {
      dispatch((0, _todoTasksActions.deleteTask)(task.id));
    },
    onCompleteArgument: function onCompleteArgument(task) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy9tZXNzYWdlQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMvdG9kb1Rhc2tzQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CdXR0b25Db21wbGV0ZUFyZ3VtZW50LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CdXR0b25EZWxldGVBcmd1bWVudC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQnV0dG9uRGVsZXRlQ2F0ZWdvcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0J1dHRvblNjb2xsLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYXRlZ29yaWVzRmlsdGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYXRlZ29yeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvSW5maW5pdGVTY3JvbGwuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL01haW5BZGRCdXR0b24uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1NuYWNrYmFyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9UYXNrLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9UYXNrcy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVG9kb3MuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Zpc2liaWxpdHlGaWx0ZXJzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9WaXNpYmlsaXR5U3dpdGNoLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9Db2xsYXBzZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvRGlhbG9nQW5pbS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvUmVwbGFjZUFuaW0uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FuaW1zL1Jlc2l6ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvU25hY2tiYXJBbmltLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2dBZGQvQWRkQ2F0ZWdvcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9BZGRUYXNrLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2dBZGQvRGlhbG9nQWRkLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2dBZGQvRG9uZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL1NlbGVjdEFjdGlvbkFkZC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL1NlbGVjdENhdGVnb3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2dBZGQvU2VsZWN0Q29tcGxldGVEYXRlLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2dBZGQvU3RlcHMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMvbGFiZWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMvc3RlcHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvVGFza3NDb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL1RvZG9zQ29udGFpbmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9WaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0b3JzL2NvbW1vblNlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzLmpzIiwid2VicGFjazovLy8uL3NyYy9zZWxlY3RvcnMvdG9kb1Rhc2tzU2VsZWN0b3JzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9BcGlVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvQ29tbW9uLmpzIl0sIm5hbWVzIjpbInNob3dNZXNzYWdlSW5mbyIsInR5cGUiLCJTSE9XX01FU1NBR0VfSU5GTyIsIm1lc3NhZ2UiLCJzaG93TWVzc2FnZUVycm9yIiwiU0hPV19NRVNTQUdFX0VSUk9SIiwiaGlkZU1lc3NhZ2UiLCJISURFX01FU1NBR0UiLCJmZXRjaFRhc2tzIiwic3RhdGUiLCJyZXF1ZXN0RmV0Y2hBbGxDYXRlZ29yaWVzIiwiUkVRVUVTVF9GRVRDSF9BTExfQ0FURUdPUklFUyIsInJlY2VpdmVGZXRjaEFsbENhdGVnb3JpZXMiLCJSRUNFSVZFX0ZFVENIX0FMTF9DQVRFR09SSUVTIiwiY2F0ZWdvcmllcyIsImVycm9yRmV0Y2hBbGxDYXRlZ29yaWVzIiwiRVJST1JfRkVUQ0hfQUxMX0NBVEVHT1JJRVMiLCJlcnJvciIsImFkZENhdGVnb3J5TG9jYWwiLCJBRERfQ0FURUdPUllfTE9DQUwiLCJjYXRlZ29yeSIsInJlbW92ZUNhdGVnb3J5TG9jYWwiLCJSRU1PVkVfQ0FURUdPUllfTE9DQUwiLCJjYXRlZ29yeUluZGV4IiwidG9vZ2xlU2VsZWN0Q2F0ZWdvcnkiLCJUT09HTEVfU0VMRUNUX0NBVEVHT1JZIiwic2VsZWN0ZWRDYXRlZ29yeSIsInRvb2dsZVNlbGVjdENhdGVnb3J5QWxsIiwiVE9PR0xFX1NFTEVDVF9DQVRFR09SWV9BTEwiLCJzd2l0Y2hWaXNpYmlsaXR5RmlsdGVyIiwiU1dJVENIX1ZJU0lCSUxJVFlfRklMVEVSIiwidmlzaWJpbGl0eSIsImZldGNoQWxsQ2F0ZWdvcmllcyIsImxpbWl0IiwicXVlcnlJdGVtc0xpbWl0Iiwic2tpcCIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJNZXRob2RzIiwiR0VUIiwicmVzcG9uc2UiLCJzdWNjZXNzIiwiZGF0YSIsIm1lc3NhZ2VFcnJvciIsImRlbGV0ZUNhdGVnb3J5IiwiY2F0ZWdvcnlJZCIsIkRFTEVURSIsInRvZG9GaWx0ZXJzIiwiZmluZEluZGV4IiwiaWQiLCJhZGRDYXRlZ29yeSIsIm5hbWUiLCJjYWxsYmFjayIsInVuZGVmaW5lZCIsIlBPU1QiLCJjaGFuZ2VWaXNpYmlsaXR5Iiwic2VsZWN0Q2F0ZWdvcnkiLCJzZWxlY3RDYXRlZ29yeUFsbCIsInJlcXVlc3RGZXRjaFRhc2tzIiwiUkVRVUVTVF9GRVRDSF9UQVNLUyIsInJlY2VpdmVGZXRjaFRhc2tzIiwiUkVDRUlWRV9GRVRDSF9UQVNLUyIsInRhc2tzIiwiZXJyb3JGZXRjaFRhc2tzIiwiRVJST1JfRkVUQ0hfVEFTS1MiLCJhZGRUYXNrTG9jYWwiLCJBRERfVEFTS19MT0NBTCIsInRhc2siLCJyZW1vdmVUYXNrTG9jYWwiLCJSRU1PVkVfVEFTS19MT0NBTCIsInRhc2tJbmRleCIsInVwZGF0ZVRhc2tMb2NhbCIsIlVQREFURV9UQVNLX0xPQ0FMIiwiZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkiLCJjYXRlZ29yaWVzSWQiLCJjb21wbGV0ZWQiLCJ0b2RvcyIsIm1hcCIsInRvZG8iLCJjb21wbGV0ZWRBdCIsIkRhdGUiLCJ0b2RvV2l0aGluIiwiZGVsZXRlVGFzayIsIml0ZW1zIiwidG9kb1Rhc2tzIiwidG9kb0FyZ3VtZW50SW5kZXgiLCJ0b2RvQXJndW1lbnQiLCJhZGRUYXNrIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInRvb2dsZVRhc2tDb21wbGV0ZWQiLCJpc0NvbXBsZXRlZCIsIlBBVENIIiwiQnV0dG9uQ29tcGxldGVBcmd1bWVudCIsIm9uQ2xpY2siLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsImJvb2wiLCJkZWZhdWx0UHJvcHMiLCJCdXR0b25EZWxldGVBcmd1bWVudCIsIkJ1dHRvbkRlbGV0ZUNhdGVnb3J5IiwiQnV0dG9uU2Nyb2xsIiwiZGlyZWN0aW9uIiwib25lT2YiLCJDYXRlZ29yaWVzRmlsdGVyIiwicHJvcHMiLCJjaGlwcyIsImhhbmRsZUxlZnRTY3JvbGxDbGljayIsImJpbmQiLCJoYW5kbGVSaWdodFNjcm9sbENsaWNrIiwibW92ZUNoaXBzU2Nyb2xsIiwiY2xpZW50V2lkdGgiLCJkZWx0YSIsIm5leHRTY3JvbGxMZWZ0Iiwic2Nyb2xsTGVmdCIsInNjcm9sbCIsImxlZnQiLCJjYXRlZ29yeUxpc3QiLCJvbkRlbGV0ZUNhdGVnb3J5Iiwib25DaWxja0NhdGVnb3J5Iiwibm9kZSIsImRpc3BsYXkiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsInNlbGVjdGVkIiwiUmVhY3QiLCJDb21wb25lbnQiLCJhcnJheU9mIiwic2hhcGUiLCJzdHJpbmciLCJDYXRlZ29yeSIsIm9uRGVsZXRlIiwiY3NzQ2xhc3MiLCJvbkNoaXBDbGljayIsImUiLCJvbkRlbGV0ZUNsaWNrIiwid2FpdFRpbWUiLCJJbmZpbml0ZVNjcm9sbCIsIm9uU2Nyb2xsIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJpbm5lckhlaWdodCIsInNjcm9sbFkiLCJkb2N1bWVudCIsImJvZHkiLCJvZmZzZXRIZWlnaHQiLCJhcmdzIiwiY2hpbGRyZW4iLCJjbGFzc05hbWUiLCJhbnkiLCJNYWluQWRkQnV0dG9uIiwiQWN0aW9uIiwidGV4dCIsIlNuYWNrYmFyIiwib25DbG9zZSIsImR1cmF0aW9uIiwic2hvdyIsInNldFRpbWVvdXQiLCJpc0Vycm9yIiwiYWN0aW9uVGV4dCIsImFjdGlvbkNsaWNrIiwidmVydGljYWxQb3N0aW9uIiwiaG9yaXpvbnRhbFBvc2l0aW9uIiwibnVtYmVyIiwiVGFzayIsImNvbGxhcHNlZCIsInJlbmRlckRhdGUiLCJzZXRTdGF0ZSIsImxhYmVscyIsImxhYmVsUGFydGlhbENvbXBsZXRlZCIsImxhYmVsUGFydGlhbFRvQ29tcGxldGVkIiwibGFiZWxOb3RTZXQiLCJvbkNvbXBsZXRlIiwib25UaXRsZUNsaWNrIiwibGFiZWxOb0Rlc2NyaXB0aW9uIiwiaW5pdGlhbFN0YXRlIiwiVGFza3MiLCJvbkZldGNoVG9kb0FyZ3VtZW50c05leHQiLCJtb3JlVG9Mb2FkIiwibmV3U2tpcCIsInRhc2tMaXN0Iiwib25EZWxldGVBcmd1bWVudCIsIm9uQ29tcGxldGVBcmd1bWVudCIsImFyZyIsIm5leHRQcm9wcyIsInByZXZTdGF0ZSIsIlRvZG9zIiwiaXNEaWFsb2dBZGRPcGVuIiwiaW5pdEZldGNoQWxsQ2F0ZWdvcmllcyIsInNob3dMb2FkaW5nIiwiVmlzaWJpbGl0eUZpbHRlciIsInNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciIsIm9uVmlzaWJpbGl0eVN3aXRjaENsaWNrIiwiT05MWV9UT19DT01QTEVURSIsIkFMTF9UT0RPUyIsIk9OTFlfQ09NUExFVEVEIiwiVmlzaWJpbGl0eVN3aXRjaCIsImRlZmF1bHRTdHlsZSIsInRyYW5zaXRpb24iLCJoZWlnaHQiLCJvbkVudGVyIiwic3R5bGUiLCJmaXJzdEVsZW1lbnRDaGlsZCIsIm9uRXhpdCIsIkNvbGxhcHNlIiwiaW5Qcm9wIiwiaW4iLCJvcGFjaXR5IiwidHJhbnNpdGlvblN0eWxlcyIsImVudGVyaW5nIiwiZW50ZXJlZCIsIkRpYWxvZ0FuaW0iLCJ3aWR0aCIsImVudGVyIiwiUmVwbGFjZUFuaW0iLCJlbmRMaXN0ZW5lciIsImV4aXQiLCJvbkVudGVyZWQiLCJvbkV4aXRlZCIsIlJlc2l6ZSIsImJvdHRvbSIsIlNuYWNrYmFyQW5pbSIsImN1c3RvbUNsYXNzIiwiQWRkQ2F0ZWdvcnkiLCJvbklucHV0VGV4dENoYW5nZSIsIm9uQnV0dG9uQWRkQ2xpY2siLCJvbkNhdGVnb3J5Q3JlYXRlZCIsInRhcmdldCIsInZhbHVlIiwibXNnTmFtZVJlcXVpcmVkIiwib25OZXh0Iiwic3RlcElkIiwiQUREX0FSR1VNRU5UIiwib3B0aW9ucyIsInBsYWNlaG9sZGVyTmFtZSIsImJ1dHRvbkFkZCIsIkFkZFRhc2siLCJvbkJ1dHRvblNjaGVkdWxlQ2xpY2siLCJtc2dUaXRsZVJlcXVpcmVkIiwiU0VMRUNUX0NPTVBMRVRFX0RBVEUiLCJ0aXRsZUFkZFRhc2siLCJsYWJlbEZvckNhdGVnb3J5IiwicGxhY2VIb2xkZXJUaXRsZSIsInBsYWNlSG9sZGVyRGVzY3JpcHRpb24iLCJidXR0b25TY2hlZHVsZSIsImdldENvbnRlbnRUb1JlbmRlciIsInN0ZXBzIiwibGVuZ3RoIiwibGFzdFN0ZXAiLCJTRUxFQ1RfV0FOVF9UT19BREQiLCJBRERfQ0FURUdPUlkiLCJTRUxFQ1RfQ0FURUdPUlkiLCJET05FIiwiaW5pdGFsU3RhdGUiLCJuZXh0U3RlcHMiLCJzaG93U3RlcCIsIkRpYWxvZ0FkZCIsIm9uQmFjayIsIm9uUmVzZXRBbmRDbG9zZSIsIm9uQW5pbWF0aW9uRW5kIiwic3RlcENvdW50Iiwic2xpY2UiLCJzdGVwIiwiY29tcGxldGUiLCJkb25lIiwib3BlbiIsInN0ZXBMaXN0IiwiRG9uZSIsImxhYmVsRG9uZSIsIlNlbGVjdEFjdGlvbkFkZCIsInRpdGxlQWRkIiwibGFiZWxDYXRlZ29yeSIsImxhYmVsVGFzayIsIlNlbGVjdENhdGVnb3J5Iiwib25DYXRlZ29yeUNsaWNrIiwib25CdXR0b25OZXh0Q2xpY2siLCJtc2dTZWxlY3RDYXRlZ29yeSIsImNhdGVnb3JpZXNMaXN0IiwiYnV0dG9uTmV4dCIsIm1hcFN0YXRlVG9Qcm9wIiwiU2VsZWN0Q29tcGxldGVEYXRlIiwib25JbnB1dERhdGVDaGFuZ2UiLCJvblRvZG9Bcmd1bWVudENyZWF0ZWQiLCJkYXRlIiwibXNnU2VsZWN0RGF0ZSIsIlN0ZXAiLCJuZWVkTGluZSIsIlN0ZXBzIiwibGlzdCIsInN0ZXBIaXN0b3J5IiwiaXRlbSIsImkiLCJmaWx0ZXIiLCJzaCIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImNhdGVnb3J5QWxsIiwiQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lciIsIlRhc2tzQ29udGFpbmVyIiwiVG9kb3NDb250YWluZXIiLCJWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyIiwiVmlzaWJpbGl0eUZpbHRlcnMiLCJpc0ZldGNoaW5nQ2F0ZWdvcmllc0ZpbHRlciIsImlzRmV0Y2hpbmdUYXNrcyIsImlzRmV0Y2hpbmdDYXRlZ29yaWVzIiwiaXNGZXRjaGluZ1RvZG9zIiwiaXNGZXRjaGluZyIsImdldFRvZG9GaWx0ZXJzIiwiZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QiLCJnZXRWaXNpYmlsaXR5RmlsdGVyIiwidmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQiLCJnZXRTZWxlY3RlZENhdGVnb3JpZXNGaWx0ZXIiLCJnZXRTZWxlY3RlZENhdGVnb3JpZXNJZCIsImNhdGVnb3J5RmlsdGVyIiwiZ2V0VGFza3MiLCJnZXRUYXNrTGlzdCIsImdldFNraXAiLCJzdGlsbE1vcmVUb0xvYWQiLCJmdWxsVXJsIiwidXJsIiwiYmFzZVJlcXVlc3RJbml0IiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwiY3JlYXRlUG9zdFJlcXVlc3QiLCJmZXRjaCIsIm1ldGhvZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjcmVhdGVHZXRSZXF1ZXN0IiwiZmluYWxVcmwiLCJPYmplY3QiLCJlbnRyaWVzIiwiZm9yRWFjaCIsInBvaXRpb24iLCJrZXkiLCJjcmVhdGVEZWxldGVSZXF1ZXN0IiwiY3JlYXRlUGF0Y2hSZXF1ZXN0IiwiY3JlYXRlUmVxdWVzdCIsImNhbGxBcGkiLCJ0aGVuIiwib2siLCJqc29uIiwiUHJvbWlzZSIsInJlamVjdCIsInRvSnNEYXRlIiwicGFyc2VEYXRlIiwicGFyc2VJbnQiLCJzdWJzdHIiLCJ0b1NpbXBsZURhdGVGb3JtYXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBTU8sSUFBTUEsNENBQWtCLFNBQWxCQSxlQUFrQjtBQUFBLFNBQzdCO0FBQ0VDLFVBQU1DLDhCQURS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O0FBQ3JCLFNBQUt0TSxRQUFRc0QsS0FBYjtBQUFvQixhQUFPeVAsbUJBQW1CUCxRQUFuQixFQUE2QmxHLE9BQTdCLENBQVA7QUFDcEI7QUFBUyxhQUFPNEYsa0JBQWtCTSxRQUFsQixFQUE0QmxHLE9BQTVCLENBQVA7QUFMWDtBQU9ELENBVEQ7O0FBV08sSUFBTTJHLDRCQUFVLFNBQVZBLE9BQVUsQ0FBQ25CLEdBQUQ7QUFBQSxNQUFNeEYsT0FBTix1RUFBZ0IsRUFBaEI7QUFBQSxNQUFvQjhGLE1BQXBCLHVFQUE2QnBTLFFBQVFnQixJQUFyQztBQUFBLFNBQ3JCZ1MsY0FBY2xCLEdBQWQsRUFBbUJ4RixPQUFuQixFQUE0QjhGLE1BQTVCLEVBQW9DYyxJQUFwQyxDQUNFO0FBQUEsV0FBYWhULFNBQVNpVCxFQUFULEdBQ1hqVCxTQUFTa1QsSUFBVCxFQURXLEdBRVhDLFFBQVFDLE1BQVIsQ0FBZXBULFNBQVNtSCxJQUFULEVBQWYsQ0FGRjtBQUFBLEdBREYsRUFLRTtBQUFBLFdBQVNnTSxRQUFRQyxNQUFSLENBQWUzVSxLQUFmLENBQVQ7QUFBQSxHQUxGLENBRHFCO0FBQUEsQ0FBaEI7O2tCQVVRc1UsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFFZjs7Ozs7O0FBRU8sSUFBTU0sOEJBQVcsU0FBWEEsUUFBVztBQUFBLE1BQUNDLFNBQUQsdUVBQWEsRUFBYjtBQUFBLFNBQ3RCLElBQUk5USxJQUFKLENBQVMrUSxTQUFTRCxVQUFVRSxNQUFWLENBQWlCLENBQWpCLENBQVQsRUFBOEIsRUFBOUIsQ0FBVCxDQURzQjtBQUFBLENBQWpCOztBQUdBLElBQU1DLGtEQUFxQixTQUFyQkEsa0JBQXFCO0FBQUEsU0FDaEMsMEJBQVduRSxJQUFYLEVBQWlCLGtCQUFqQixDQURnQztBQUFBLENBQTNCLEMiLCJmaWxlIjoidG9kb3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBTSE9XX01FU1NBR0VfSU5GTyxcbiAgU0hPV19NRVNTQUdFX0VSUk9SLFxuICBISURFX01FU1NBR0UsXG59IGZyb20gJy4uL2NvbnN0YW50cy9hY3Rpb25UeXBlcyc7XG5cbmV4cG9ydCBjb25zdCBzaG93TWVzc2FnZUluZm8gPSBtZXNzYWdlID0+IChcbiAge1xuICAgIHR5cGU6IFNIT1dfTUVTU0FHRV9JTkZPLFxuICAgIG1lc3NhZ2UsXG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBzaG93TWVzc2FnZUVycm9yID0gbWVzc2FnZSA9PiAoXG4gIHtcbiAgICB0eXBlOiBTSE9XX01FU1NBR0VfRVJST1IsXG4gICAgbWVzc2FnZSxcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGhpZGVNZXNzYWdlID0gKCkgPT4gKFxuICB7XG4gICAgdHlwZTogSElERV9NRVNTQUdFLFxuICB9XG4pO1xuIiwiaW1wb3J0IHsgY2FsbEFwaSwgTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL0FwaVV0aWxzJztcbmltcG9ydCB7XG4gIFJFUVVFU1RfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gIFJFQ0VJVkVfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gIEVSUk9SX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICBBRERfQ0FURUdPUllfTE9DQUwsXG4gIFJFTU9WRV9DQVRFR09SWV9MT0NBTCxcbiAgVE9PR0xFX1NFTEVDVF9DQVRFR09SWSxcbiAgVE9PR0xFX1NFTEVDVF9DQVRFR09SWV9BTEwsXG4gIFNXSVRDSF9WSVNJQklMSVRZX0ZJTFRFUixcbn0gZnJvbSAnLi4vY29uc3RhbnRzL2FjdGlvblR5cGVzJztcbmltcG9ydCB7IHF1ZXJ5SXRlbXNMaW1pdCB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuaW1wb3J0IHsgZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkgfSBmcm9tICcuL3RvZG9UYXNrc0FjdGlvbnMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VFcnJvciB9IGZyb20gJy4vbWVzc2FnZUFjdGlvbnMnO1xuaW1wb3J0IHsgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQsIHZpc2liaWxpdHlPbmx5Q29tcGxldGVkIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgZmV0Y2hUYXNrcyA9IHN0YXRlID0+IGZldGNoVGFza3NCeUNhdGVnb3J5KFxuICBnZXRTZWxlY3RlZENhdGVnb3JpZXNJZChzdGF0ZSksXG4gIHZpc2liaWxpdHlPbmx5Q29tcGxldGVkKHN0YXRlKSxcbik7XG5cbmNvbnN0IHJlcXVlc3RGZXRjaEFsbENhdGVnb3JpZXMgPSAoKSA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRVFVRVNUX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICB9XG4pO1xuXG5jb25zdCByZWNlaXZlRmV0Y2hBbGxDYXRlZ29yaWVzID0gY2F0ZWdvcmllcyA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRUNFSVZFX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICAgIGNhdGVnb3JpZXMsXG4gIH1cbik7XG5cbmNvbnN0IGVycm9yRmV0Y2hBbGxDYXRlZ29yaWVzID0gZXJyb3IgPT4gKFxuICB7XG4gICAgdHlwZTogRVJST1JfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gICAgZXJyb3IsXG4gIH1cbik7XG5cbmNvbnN0IGFkZENhdGVnb3J5TG9jYWwgPSBjYXRlZ29yeSA9PiAoXG4gIHtcbiAgICB0eXBlOiBBRERfQ0FURUdPUllfTE9DQUwsXG4gICAgY2F0ZWdvcnksXG4gIH1cbik7XG5cbmNvbnN0IHJlbW92ZUNhdGVnb3J5TG9jYWwgPSBjYXRlZ29yeUluZGV4ID0+IChcbiAge1xuICAgIHR5cGU6IFJFTU9WRV9DQVRFR09SWV9MT0NBTCxcbiAgICBjYXRlZ29yeUluZGV4LFxuICB9XG4pO1xuXG5jb25zdCB0b29nbGVTZWxlY3RDYXRlZ29yeSA9IHNlbGVjdGVkQ2F0ZWdvcnkgPT4gKFxuICB7XG4gICAgdHlwZTogVE9PR0xFX1NFTEVDVF9DQVRFR09SWSxcbiAgICBzZWxlY3RlZENhdGVnb3J5LFxuICB9XG4pO1xuXG5jb25zdCB0b29nbGVTZWxlY3RDYXRlZ29yeUFsbCA9ICgpID0+IChcbiAge1xuICAgIHR5cGU6IFRPT0dMRV9TRUxFQ1RfQ0FURUdPUllfQUxMLFxuICB9XG4pO1xuXG5jb25zdCBzd2l0Y2hWaXNpYmlsaXR5RmlsdGVyID0gdmlzaWJpbGl0eSA9PiAoXG4gIHtcbiAgICB0eXBlOiBTV0lUQ0hfVklTSUJJTElUWV9GSUxURVIsXG4gICAgdmlzaWJpbGl0eSxcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGZldGNoQWxsQ2F0ZWdvcmllcyA9IChsaW1pdCA9IHF1ZXJ5SXRlbXNMaW1pdCwgc2tpcCA9IDApID0+XG4gIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBkaXNwYXRjaChyZXF1ZXN0RmV0Y2hBbGxDYXRlZ29yaWVzKCkpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoJ2NhdGVnb3JpZXMnLCB7IGxpbWl0LCBza2lwIH0sIE1ldGhvZHMuR0VUKTtcbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIGRpc3BhdGNoKHJlY2VpdmVGZXRjaEFsbENhdGVnb3JpZXMocmVzcG9uc2UuZGF0YSkpO1xuICAgICAgICBkaXNwYXRjaChmZXRjaFRhc2tzQnlDYXRlZ29yeShnZXRTZWxlY3RlZENhdGVnb3JpZXNJZChnZXRTdGF0ZSgpKSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGF0Y2goZXJyb3JGZXRjaEFsbENhdGVnb3JpZXMocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICAgIH1cbiAgfTtcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZUNhdGVnb3J5ID0gKGNhdGVnb3J5SWQgPSAnJykgPT4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gY2FsbEFwaSgnY2F0ZWdvcmllcycsIGNhdGVnb3J5SWQsIE1ldGhvZHMuREVMRVRFKTtcbiAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgY29uc3QgeyBjYXRlZ29yaWVzIH0gPSBnZXRTdGF0ZSgpLnRvZG9GaWx0ZXJzO1xuICAgICAgY29uc3QgY2F0ZWdvcnlJbmRleCA9IGNhdGVnb3JpZXMuZmluZEluZGV4KGNhdGVnb3J5ID0+IGNhdGVnb3J5LmlkID09PSBjYXRlZ29yeUlkKTtcbiAgICAgIGRpc3BhdGNoKHJlbW92ZUNhdGVnb3J5TG9jYWwoY2F0ZWdvcnlJbmRleCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLm1lc3NhZ2VFcnJvcikpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXF1ZXN0IHRvIGFkZCBhIGNhdGVnb3J5XG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBjYXRlZ29yeSBuYW1lIHRvIGFkZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBuZWVkIHRvIGhhbmRsZSB0aGUgY2F0ZWdvcnkgY3JlYXRlZFxuICovXG5leHBvcnQgY29uc3QgYWRkQ2F0ZWdvcnkgPSAobmFtZSA9ICcnLCBjYWxsYmFjayA9IHVuZGVmaW5lZCkgPT4gYXN5bmMgKGRpc3BhdGNoKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKCdjYXRlZ29yaWVzJywgeyBuYW1lIH0sIE1ldGhvZHMuUE9TVCk7XG4gICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgIGRpc3BhdGNoKGFkZENhdGVnb3J5TG9jYWwocmVzcG9uc2UuZGF0YSkpO1xuICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2FsbGJhY2socmVzcG9uc2UuZGF0YSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY2hhbmdlVmlzaWJpbGl0eSA9IHZpc2liaWxpdHkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBkaXNwYXRjaChzd2l0Y2hWaXNpYmlsaXR5RmlsdGVyKHZpc2liaWxpdHkpKTtcbiAgcmV0dXJuIGRpc3BhdGNoKGZldGNoVGFza3MoZ2V0U3RhdGUoKSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdENhdGVnb3J5ID0gc2VsZWN0ZWRDYXRlZ29yeSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGRpc3BhdGNoKHRvb2dsZVNlbGVjdENhdGVnb3J5KHNlbGVjdGVkQ2F0ZWdvcnkpKTtcbiAgcmV0dXJuIGRpc3BhdGNoKGZldGNoVGFza3MoZ2V0U3RhdGUoKSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdENhdGVnb3J5QWxsID0gKCkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBkaXNwYXRjaCh0b29nbGVTZWxlY3RDYXRlZ29yeUFsbCgpKTtcbiAgcmV0dXJuIGRpc3BhdGNoKGZldGNoVGFza3MoZ2V0U3RhdGUoKSkpO1xufTtcbiIsImltcG9ydCB7IGNhbGxBcGksIE1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9BcGlVdGlscyc7XG5pbXBvcnQge1xuICBSRVFVRVNUX0ZFVENIX1RBU0tTLFxuICBSRUNFSVZFX0ZFVENIX1RBU0tTLFxuICBFUlJPUl9GRVRDSF9UQVNLUyxcbiAgQUREX1RBU0tfTE9DQUwsXG4gIFJFTU9WRV9UQVNLX0xPQ0FMLFxuICBVUERBVEVfVEFTS19MT0NBTCxcbn0gZnJvbSAnLi4vY29uc3RhbnRzL2FjdGlvblR5cGVzJztcbmltcG9ydCB7IHF1ZXJ5SXRlbXNMaW1pdCB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VFcnJvciB9IGZyb20gJy4vbWVzc2FnZUFjdGlvbnMnO1xuXG5jb25zdCByZXF1ZXN0RmV0Y2hUYXNrcyA9IChsaW1pdCwgc2tpcCkgPT4gKFxuICB7XG4gICAgdHlwZTogUkVRVUVTVF9GRVRDSF9UQVNLUyxcbiAgICBsaW1pdCxcbiAgICBza2lwLFxuICB9XG4pO1xuXG5jb25zdCByZWNlaXZlRmV0Y2hUYXNrcyA9IHRhc2tzID0+IChcbiAge1xuICAgIHR5cGU6IFJFQ0VJVkVfRkVUQ0hfVEFTS1MsXG4gICAgdGFza3MsXG4gIH1cbik7XG5cbmNvbnN0IGVycm9yRmV0Y2hUYXNrcyA9IGVycm9yID0+IChcbiAge1xuICAgIHR5cGU6IEVSUk9SX0ZFVENIX1RBU0tTLFxuICAgIGVycm9yLFxuICB9XG4pO1xuXG5jb25zdCBhZGRUYXNrTG9jYWwgPSB0YXNrID0+IChcbiAge1xuICAgIHR5cGU6IEFERF9UQVNLX0xPQ0FMLFxuICAgIHRhc2ssXG4gIH1cbik7XG5cbmNvbnN0IHJlbW92ZVRhc2tMb2NhbCA9IHRhc2tJbmRleCA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRU1PVkVfVEFTS19MT0NBTCxcbiAgICB0YXNrSW5kZXgsXG4gIH1cbik7XG5cbmNvbnN0IHVwZGF0ZVRhc2tMb2NhbCA9IHRhc2sgPT4gKFxuICB7XG4gICAgdHlwZTogVVBEQVRFX1RBU0tfTE9DQUwsXG4gICAgdGFzayxcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGZldGNoVGFza3NCeUNhdGVnb3J5ID0gKFxuICBjYXRlZ29yaWVzSWQgPSBbXSxcbiAgY29tcGxldGVkID0gZmFsc2UsXG4gIGxpbWl0ID0gcXVlcnlJdGVtc0xpbWl0LFxuICBza2lwID0gMCxcbikgPT4gYXN5bmMgKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHJlcXVlc3RGZXRjaFRhc2tzKGxpbWl0LCBza2lwKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbEFwaSgndGFza3MnLCB7XG4gICAgY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsIGxpbWl0LCBza2lwLFxuICB9LCBNZXRob2RzLkdFVCk7XG4gIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgY29uc3QgdG9kb3MgPSByZXNwb25zZS5kYXRhLm1hcCh0b2RvID0+XG4gICAgICAoe1xuICAgICAgICAuLi50b2RvLFxuICAgICAgICBjb21wbGV0ZWRBdDogKHRvZG8uY29tcGxldGVkQXQpID8gbmV3IERhdGUodG9kby5jb21wbGV0ZWRBdCkgOiB1bmRlZmluZWQsXG4gICAgICAgIHRvZG9XaXRoaW46ICh0b2RvLnRvZG9XaXRoaW4pID8gbmV3IERhdGUodG9kby50b2RvV2l0aGluKSA6IHVuZGVmaW5lZCxcbiAgICAgIH0pKTtcbiAgICBkaXNwYXRjaChyZWNlaXZlRmV0Y2hUYXNrcyh0b2RvcykpO1xuICB9IGVsc2Uge1xuICAgIGRpc3BhdGNoKGVycm9yRmV0Y2hUYXNrcyhyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZVRhc2sgPSAoaWQgPSAnJykgPT4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoJ3Rhc2tzJywgaWQsIE1ldGhvZHMuREVMRVRFKTtcbiAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICBjb25zdCB7IGl0ZW1zIH0gPSBnZXRTdGF0ZSgpLnRvZG9UYXNrcztcbiAgICBjb25zdCB0b2RvQXJndW1lbnRJbmRleCA9IGl0ZW1zLmZpbmRJbmRleCh0b2RvQXJndW1lbnQgPT5cbiAgICAgIHRvZG9Bcmd1bWVudC5pZCA9PT0gaWQpO1xuICAgIGRpc3BhdGNoKHJlbW92ZVRhc2tMb2NhbCh0b2RvQXJndW1lbnRJbmRleCkpO1xuICB9IGVsc2Uge1xuICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBhZGRUYXNrID0gKHRpdGxlID0gJycsIGRlc2NyaXB0aW9uID0gJycsIGNhdGVnb3J5ID0geyBpZDogJycgfSwgdG9kb1dpdGhpbiwgY2FsbGJhY2sgPSB1bmRlZmluZWQpID0+IGFzeW5jIChkaXNwYXRjaCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoXG4gICAgJ3Rhc2tzJyxcbiAgICB7XG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnkuaWQsXG4gICAgICB0b2RvV2l0aGluLFxuICAgIH0sXG4gICAgTWV0aG9kcy5QT1NULFxuICApO1xuICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgIGNvbnN0IHRvZG8gPSB7XG4gICAgICAuLi5yZXNwb25zZS5kYXRhLFxuICAgICAgY29tcGxldGVkQXQ6IChyZXNwb25zZS5kYXRhLmNvbXBsZXRlZEF0KVxuICAgICAgICA/IG5ldyBEYXRlKHJlc3BvbnNlLmRhdGEuY29tcGxldGVkQXQpIDogdW5kZWZpbmVkLFxuICAgICAgdG9kb1dpdGhpbjogKHJlc3BvbnNlLmRhdGEudG9kb1dpdGhpbilcbiAgICAgICAgPyBuZXcgRGF0ZShyZXNwb25zZS5kYXRhLnRvZG9XaXRoaW4pIDogdW5kZWZpbmVkLFxuICAgIH07XG4gICAgZGlzcGF0Y2goYWRkVGFza0xvY2FsKHRvZG8pKTtcbiAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHRvb2dsZVRhc2tDb21wbGV0ZWQgPSAoaWQgPSAnJywgaXNDb21wbGV0ZWQgPSBmYWxzZSkgPT4gYXN5bmMgKGRpc3BhdGNoKSA9PiB7XG4gIGNvbnN0IGNvbXBsZXRlZCA9ICFpc0NvbXBsZXRlZDtcbiAgY29uc3QgY29tcGxldGVkQXQgPSAoY29tcGxldGVkKSA/IG5ldyBEYXRlKCkgOiBudWxsO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoJ3Rhc2tzJywgeyBpZCwgY29tcGxldGVkLCBjb21wbGV0ZWRBdCB9LCBNZXRob2RzLlBBVENIKTtcbiAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICBjb25zdCB0b2RvID0ge1xuICAgICAgLi4ucmVzcG9uc2UuZGF0YSxcbiAgICAgIGNvbXBsZXRlZEF0OiAocmVzcG9uc2UuZGF0YS5jb21wbGV0ZWRBdClcbiAgICAgICAgPyBuZXcgRGF0ZShyZXNwb25zZS5kYXRhLmNvbXBsZXRlZEF0KSA6IHVuZGVmaW5lZCxcbiAgICB9O1xuICAgIGRpc3BhdGNoKHVwZGF0ZVRhc2tMb2NhbCh0b2RvKSk7XG4gIH0gZWxzZSB7XG4gICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgfVxufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdXR0b25Db21wbGV0ZUFyZ3VtZW50ID0gKHsgb25DbGljaywgY29tcGxldGVkIH0pID0+IChcbiAgPGJ1dHRvblxuICAgIGNsYXNzTmFtZT17YGJ1dHRvbi1jb21wbGV0ZS1hcmd1bWVudCAkeyhjb21wbGV0ZWQpID8gJ2J1dHRvbi1jb21wbGV0ZWQtYXJndW1lbnQnIDogJyd9YH1cbiAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICA+XG4gICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1jaGVja1wiIC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uQ29tcGxldGVBcmd1bWVudC5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5CdXR0b25Db21wbGV0ZUFyZ3VtZW50LmRlZmF1bHRQcm9wcyA9IHtcbiAgY29tcGxldGVkOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkNvbXBsZXRlQXJndW1lbnQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgQnV0dG9uRGVsZXRlQXJndW1lbnQgPSAoeyBvbkNsaWNrIH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24tZGVsZXRlLWFyZ3VtZW50XCIgb25DbGljaz17b25DbGlja30+XG4gICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1kZWxldGVcIiAvPlxuICA8L2J1dHRvbj5cbik7XG5cbkJ1dHRvbkRlbGV0ZUFyZ3VtZW50LnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkRlbGV0ZUFyZ3VtZW50O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEJ1dHRvbkRlbGV0ZUNhdGVnb3J5ID0gKHsgb25DbGljayB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLWRlbGV0ZS1jYXRlZ29yeVwiIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIDxpIGNsYXNzTmFtZT1cImljb24tZGVsZXRlXCIgLz5cbiAgPC9idXR0b24+XG4pO1xuXG5CdXR0b25EZWxldGVDYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25EZWxldGVDYXRlZ29yeTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdXR0b25TY3JvbGwgPSAoeyBvbkNsaWNrLCBkaXJlY3Rpb24gfSkgPT4gKFxuICA8YnV0dG9uIGNsYXNzTmFtZT17YGJ1dHRvbi1zY3JvbGwgJHtkaXJlY3Rpb259YH0gb25DbGljaz17b25DbGlja30+XG4gICAgPGkgY2xhc3NOYW1lPXsoZGlyZWN0aW9uID09PSAnbGVmdCcpID8gJ2ljb24tYmFja3dhcmQnIDogJ2ljb24tZm9yd2FyZCd9IC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uU2Nyb2xsLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZGlyZWN0aW9uOiBQcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxufTtcblxuQnV0dG9uU2Nyb2xsLmRlZmF1bHRQcm9wcyA9IHtcbiAgZGlyZWN0aW9uOiAnbGVmdCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25TY3JvbGw7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb25Hcm91cCB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuaW1wb3J0IHNjcm9sbCBmcm9tICdzY3JvbGwnO1xuaW1wb3J0IEJ1dHRvblNjcm9sbCBmcm9tICcuL0J1dHRvblNjb2xsJztcbmltcG9ydCBDYXRlZ29yeSBmcm9tICcuL0NhdGVnb3J5JztcbmltcG9ydCBGYWRlIGZyb20gJy4vYW5pbXMvRmFkZSc7XG5cbmNsYXNzIENhdGVnb3JpZXNGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmNoaXBzID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuaGFuZGxlTGVmdFNjcm9sbENsaWNrID0gdGhpcy5oYW5kbGVMZWZ0U2Nyb2xsQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2sgPSB0aGlzLmhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vdmVDaGlwc1Njcm9sbCA9IHRoaXMubW92ZUNoaXBzU2Nyb2xsLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVMZWZ0U2Nyb2xsQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuY2hpcHMpIHtcbiAgICAgIHRoaXMubW92ZUNoaXBzU2Nyb2xsKC10aGlzLmNoaXBzLmNsaWVudFdpZHRoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVSaWdodFNjcm9sbENsaWNrKCkge1xuICAgIGlmICh0aGlzLmNoaXBzKSB7XG4gICAgICB0aGlzLm1vdmVDaGlwc1Njcm9sbCh0aGlzLmNoaXBzLmNsaWVudFdpZHRoKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlQ2hpcHNTY3JvbGwoZGVsdGEpIHtcbiAgICBpZiAodGhpcy5jaGlwcykge1xuICAgICAgY29uc3QgbmV4dFNjcm9sbExlZnQgPSB0aGlzLmNoaXBzLnNjcm9sbExlZnQgKyBkZWx0YTtcbiAgICAgIHNjcm9sbC5sZWZ0KHRoaXMuY2hpcHMsIG5leHRTY3JvbGxMZWZ0KTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjYXRlZ29yeUxpc3QsIG9uRGVsZXRlQ2F0ZWdvcnksIG9uQ2lsY2tDYXRlZ29yeSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cImNvbnRlbnQtY2F0ZWdvcmllcy1maWx0ZXJcIj5cbiAgICAgICAgPEJ1dHRvblNjcm9sbFxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTGVmdFNjcm9sbENsaWNrfVxuICAgICAgICAgIGRpcmVjdGlvbj1cImxlZnRcIlxuICAgICAgICAvPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwiY2F0ZWdvcmllcy1maWx0ZXJcIlxuICAgICAgICAgIHJlZj17KG5vZGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hpcHMgPSBub2RlO1xuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8VHJhbnNpdGlvbkdyb3VwIHN0eWxlPXt7IGRpc3BsYXk6ICdpbmhlcml0JywgcGFkZGluZ0xlZnQ6ICcxLjI1ZW0nLCBwYWRkaW5nUmlnaHQ6ICcxLjI1ZW0nIH19PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjYXRlZ29yeUxpc3QubWFwKGNhdGVnb3J5ID0+IChcbiAgICAgICAgICAgICAgICA8RmFkZSBrZXk9e2NhdGVnb3J5LmlkfT5cbiAgICAgICAgICAgICAgICAgIDxDYXRlZ29yeVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2NhdGVnb3J5LmlkfVxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeT17Y2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtjYXRlZ29yeS5zZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICAgb25EZWxldGU9e29uRGVsZXRlQ2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2lsY2tDYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9GYWRlPlxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvVHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEJ1dHRvblNjcm9sbFxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlUmlnaHRTY3JvbGxDbGlja31cbiAgICAgICAgICBkaXJlY3Rpb249XCJyaWdodFwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkNhdGVnb3JpZXNGaWx0ZXIucHJvcFR5cGVzID0ge1xuICBjYXRlZ29yeUxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIG9uRGVsZXRlQ2F0ZWdvcnk6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNpbGNrQ2F0ZWdvcnk6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5DYXRlZ29yaWVzRmlsdGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25EZWxldGVDYXRlZ29yeTogdW5kZWZpbmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0ZWdvcmllc0ZpbHRlcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEJ1dHRvbkRlbGV0ZUNhdGVnb3J5IGZyb20gJy4vQnV0dG9uRGVsZXRlQ2F0ZWdvcnknO1xuXG5jb25zdCBDYXRlZ29yeSA9ICh7XG4gIGNhdGVnb3J5LCBzZWxlY3RlZCwgb25DbGljaywgb25EZWxldGUsXG59KSA9PiB7XG4gIGxldCBjc3NDbGFzcyA9ICcnO1xuXG4gIGNvbnN0IG9uQ2hpcENsaWNrID0gKGUpID0+IHtcbiAgICBvbkNsaWNrKGNhdGVnb3J5LCBlKTtcbiAgfTtcbiAgY29uc3Qgb25EZWxldGVDbGljayA9ICgpID0+IHtcbiAgICBvbkRlbGV0ZShjYXRlZ29yeSk7XG4gIH07XG5cbiAgaWYgKHNlbGVjdGVkKSB7XG4gICAgY3NzQ2xhc3MgPSAnY2F0ZWdvcnktc2VsZWN0ZWQnO1xuICB9XG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtgJHtjc3NDbGFzc30gY2F0ZWdvcnktY2hpcCBhbGlnbi1pdGVtcy1jZW50ZXJgfVxuICAgICAgb25DbGljaz17b25DaGlwQ2xpY2t9XG4gICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXRlZ29yeS10ZXh0XCI+e2NhdGVnb3J5Lm5hbWV9PC9zcGFuPlxuICAgICAge1xuICAgICAgICAoY2F0ZWdvcnkuaWQgIT09ICcwJyAmJiBvbkRlbGV0ZSAhPT0gdW5kZWZpbmVkKSAmJlxuICAgICAgICAgIDxCdXR0b25EZWxldGVDYXRlZ29yeSBvbkNsaWNrPXtvbkRlbGV0ZUNsaWNrfSAvPlxuICAgICAgfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuQ2F0ZWdvcnkucHJvcFR5cGVzID0ge1xuICBvbkRlbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNhdGVnb3J5OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbn07XG5cbkNhdGVnb3J5LmRlZmF1bHRQcm9wcyA9IHtcbiAgb25EZWxldGU6IHVuZGVmaW5lZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENhdGVnb3J5O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJ2xvZGFzaCc7XG5cbmNvbnN0IHdhaXRUaW1lID0gNTAwO1xuXG5jbGFzcyBJbmZpbml0ZVNjcm9sbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMub25TY3JvbGwgPSB0aGlzLm9uU2Nyb2xsLmJpbmQodGhpcyk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhyb3R0bGUodGhpcy5vblNjcm9sbCwgd2FpdFRpbWUpLCBmYWxzZSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhyb3R0bGUodGhpcy5vblNjcm9sbCwgd2FpdFRpbWUpLCBmYWxzZSk7XG4gIH1cblxuICBvblNjcm9sbCgpIHtcbiAgICBpZiAoKHdpbmRvdy5pbm5lckhlaWdodCArIHdpbmRvdy5zY3JvbGxZKSA+PSAoZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQgLSAyMDApKSB7XG4gICAgICBjb25zdCB7IGFyZ3MsIG9uU2Nyb2xsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgb25TY3JvbGwoLi4uYXJncyk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSW5maW5pdGVTY3JvbGwucHJvcFR5cGVzID0ge1xuICBhcmdzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgb25TY3JvbGw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5JbmZpbml0ZVNjcm9sbC5kZWZhdWx0UHJvcHMgPSB7XG4gIGFyZ3M6IFtdLFxuICBjbGFzc05hbWU6ICcnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgSW5maW5pdGVTY3JvbGw7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgTWFpbkFkZEJ1dHRvbiA9ICh7IG9uQ2xpY2sgfSkgPT4gKFxuICA8YnV0dG9uIGlkPVwibWFpbi1hZGQtYnV0dG9uXCIgb25DbGljaz17b25DbGlja30gPlxuICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+JiN4RTE0NTs8L2k+XG4gIDwvYnV0dG9uPlxuKTtcblxuTWFpbkFkZEJ1dHRvbi5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYWluQWRkQnV0dG9uO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgU25hY2tiYXJBbmltIGZyb20gJy4vYW5pbXMvU25hY2tiYXJBbmltJztcblxuY29uc3QgQWN0aW9uID0gKHsgb25DbGljaywgdGV4dCB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLWFjdGlvbi1zbmFja2JhclwiIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIHt0ZXh0fVxuICA8L2J1dHRvbj5cbik7XG5cbkFjdGlvbi5wcm9wVHlwZXMgPSB7XG4gIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmNsYXNzIFNuYWNrYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2xvc2UsIGR1cmF0aW9uLCBzaG93LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKHNob3cpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBvbkNsb3NlKCk7XG4gICAgICB9LCBkdXJhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG1lc3NhZ2UsIGlzRXJyb3IsIGFjdGlvblRleHQsIGFjdGlvbkNsaWNrLCBzaG93LFxuICAgICAgdmVydGljYWxQb3N0aW9uLCBob3Jpem9udGFsUG9zaXRpb24sXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTbmFja2JhckFuaW0gaW49e3Nob3d9IGN1c3RvbUNsYXNzPXtgJHt2ZXJ0aWNhbFBvc3Rpb259ICR7KGhvcml6b250YWxQb3NpdGlvbil9YH0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2BzbmFja2JhciAkeyhpc0Vycm9yKSA/ICdlcnJvcicgOiAnJ31gfVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic25hY2tiYXItbWVzc2FnZVwiPnttZXNzYWdlfTwvc3Bhbj5cbiAgICAgICAgICB7XG4gICAgICAgICAgICAoYWN0aW9uVGV4dCAhPT0gJycgJiYgYWN0aW9uQ2xpY2sgIT09IHVuZGVmaW5lZCkgJiZcbiAgICAgICAgICAgICAgPEFjdGlvbiBvbkNsaWNrPXthY3Rpb25DbGlja30gdGV4dD17YWN0aW9uVGV4dH0gLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9TbmFja2JhckFuaW0+XG4gICAgKTtcbiAgfVxufVxuXG5TbmFja2Jhci5wcm9wVHlwZXMgPSB7XG4gIHNob3c6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZHVyYXRpb246IFByb3BUeXBlcy5udW1iZXIsXG4gIGlzRXJyb3I6IFByb3BUeXBlcy5ib29sLFxuICBhY3Rpb25UZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBhY3Rpb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gIHZlcnRpY2FsUG9zdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsndG9wJywgJ2JvdHRvbSddKSxcbiAgaG9yaXpvbnRhbFBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxufTtcblxuU25hY2tiYXIuZGVmYXVsdFByb3BzID0ge1xuICBkdXJhdGlvbjogNTAwMCxcbiAgaXNFcnJvcjogZmFsc2UsXG4gIGFjdGlvblRleHQ6ICcnLFxuICBhY3Rpb25DbGljazogdW5kZWZpbmVkLFxuICB2ZXJ0aWNhbFBvc3Rpb246ICdib3R0b20nLFxuICBob3Jpem9udGFsUG9zaXRpb246ICdyaWdodCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTbmFja2JhcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IENvbGxhcHNlIGZyb20gJy4vYW5pbXMvQ29sbGFwc2UnO1xuaW1wb3J0IEZhZGUgZnJvbSAnLi9hbmltcy9GYWRlJztcbmltcG9ydCBCdXR0b25Db21wbGV0ZUFyZ3VtZW50IGZyb20gJy4vQnV0dG9uQ29tcGxldGVBcmd1bWVudCc7XG5pbXBvcnQgQnV0dG9uRGVsZXRlQXJndW1lbnQgZnJvbSAnLi9CdXR0b25EZWxldGVBcmd1bWVudCc7XG5pbXBvcnQgeyB0b1NpbXBsZURhdGVGb3JtYXQgfSBmcm9tICcuLi91dGlscy9Db21tb24nO1xuaW1wb3J0IGxhYmVscyBmcm9tICcuLi9jb25zdGFudHMvbGFiZWxzJztcblxuY2xhc3MgVGFzayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgIH07XG4gICAgdGhpcy5yZW5kZXJEYXRlID0gdGhpcy5yZW5kZXJEYXRlLmJpbmQodGhpcyk7XG4gIH1cblxuICBvblRpdGxlQ2xpY2soKSB7XG4gICAgY29uc3QgeyBjb2xsYXBzZWQgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGNvbGxhcHNlZDogIWNvbGxhcHNlZCB9KTtcbiAgfVxuXG4gIHJlbmRlckRhdGUoKSB7XG4gICAgY29uc3QgeyB0YXNrIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICh0YXNrLmNvbXBsZXRlZCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHAgY2xhc3NOYW1lPVwiY29tcGxldGUtZGF0ZVwiPntgJHtsYWJlbHMubGFiZWxQYXJ0aWFsQ29tcGxldGVkfSAkeyh0YXNrLmNvbXBsZXRlZEF0KSA/IHRvU2ltcGxlRGF0ZUZvcm1hdCh0YXNrLmNvbXBsZXRlZEF0KSA6ICcnfWB9PC9wPlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxwIGNsYXNzTmFtZT1cImNvbXBsZXRlLXdpdGhpbi1kYXRlXCI+e2Ake2xhYmVscy5sYWJlbFBhcnRpYWxUb0NvbXBsZXRlZH0gJHsodGFzay50b2RvV2l0aGluKSA/IHRvU2ltcGxlRGF0ZUZvcm1hdCh0YXNrLnRvZG9XaXRoaW4pIDogbGFiZWxzLmxhYmVsTm90U2V0fWB9PC9wPlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB0YXNrLCBvbkRlbGV0ZSwgb25Db21wbGV0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGNvbGxhcHNlZCB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcmd1bWVudC1pdGVtXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXJndW1lbnQtaGVhZGVyXCI+XG4gICAgICAgICAgPHBcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGFyZ3VtZW50LXRpdGxlICR7KHRhc2suY29tcGxldGVkKSA/ICdhcmd1bWVudC10aXRsZS1jb21wbGV0ZWQnIDogJyd9YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMub25UaXRsZUNsaWNrKCl9XG4gICAgICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGFzay50aXRsZX1cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPEZhZGUgaW49e2NvbGxhcHNlZH0+XG4gICAgICAgICAgICA8QnV0dG9uRGVsZXRlQXJndW1lbnRcbiAgICAgICAgICAgICAgb25DbGljaz17b25EZWxldGV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvRmFkZT5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBvbkNvbXBsZXRlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIDxCdXR0b25Db21wbGV0ZUFyZ3VtZW50XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ29tcGxldGV9XG4gICAgICAgICAgICAgIGNvbXBsZXRlZD17dGFzay5jb21wbGV0ZWR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXJndW1lbnQtZGF0ZVwiPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckRhdGUoKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxDb2xsYXBzZSBpbj17Y29sbGFwc2VkfT5cbiAgICAgICAgICA8ZGl2IGtleT17dGFzay5kZXNjcmlwdGlvbn0gY2xhc3NOYW1lPVwiYXJndW1lbnQtYm9keVwiPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYXJndW1lbnQtZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICh0YXNrLmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQgJiYgdGFzay5kZXNjcmlwdGlvbiAhPT0gJycpXG4gICAgICAgICAgICAgICAgPyB0YXNrLmRlc2NyaXB0aW9uIDogPHNwYW4gY2xhc3NOYW1lPVwiZW1wdHlcIj57bGFiZWxzLmxhYmVsTm9EZXNjcmlwdGlvbn08L3NwYW4+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Db2xsYXBzZT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuVGFzay5wcm9wVHlwZXMgPSB7XG4gIG9uRGVsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25Db21wbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIHRhc2s6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBjb21wbGV0ZWRBdDogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgfSkuaXNSZXF1aXJlZCxcbn07XG5cblRhc2suZGVmYXVsdFByb3BzID0ge1xuICBvbkRlbGV0ZTogdW5kZWZpbmVkLFxuICBvbkNvbXBsZXRlOiB1bmRlZmluZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBUYXNrO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uR3JvdXAgfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcbmltcG9ydCBSZXNpemUgZnJvbSAnLi9hbmltcy9SZXNpemUnO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrJztcbmltcG9ydCBJbmZpbml0ZVNjcm9sbCBmcm9tICcuL0luZmluaXRlU2Nyb2xsJztcbmltcG9ydCB7IHF1ZXJ5SXRlbXNMaW1pdCB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGxpbWl0OiBxdWVyeUl0ZW1zTGltaXQsXG4gIHNraXA6IDAsXG59O1xuXG5jbGFzcyBUYXNrcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSBpbml0aWFsU3RhdGU7XG4gICAgdGhpcy5vbkZldGNoVG9kb0FyZ3VtZW50c05leHQgPSB0aGlzLm9uRmV0Y2hUb2RvQXJndW1lbnRzTmV4dC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhuZXh0UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIGlmIChuZXh0UHJvcHMuc2tpcCAhPT0gcHJldlN0YXRlLnNraXApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNraXA6IG5leHRQcm9wcy5za2lwLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBvbkZldGNoVG9kb0FyZ3VtZW50c05leHQoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsXG4gICAgICBmZXRjaFRhc2tzLCBtb3JlVG9Mb2FkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghbW9yZVRvTG9hZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7IGxpbWl0LCBza2lwIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IG5ld1NraXAgPSBza2lwICsgbGltaXQ7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNraXA6IG5ld1NraXAgfSk7XG4gICAgZmV0Y2hUYXNrcyhjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCwgbGltaXQsIG5ld1NraXApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHRhc2tMaXN0LFxuICAgICAgb25EZWxldGVBcmd1bWVudCxcbiAgICAgIG9uQ29tcGxldGVBcmd1bWVudCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cImNvbnRlbnQtdG9kby1hcmd1bWVudHNcIj5cbiAgICAgICAgPEluZmluaXRlU2Nyb2xsIG9uU2Nyb2xsPXt0aGlzLm9uRmV0Y2hUb2RvQXJndW1lbnRzTmV4dH0+XG4gICAgICAgICAgPFRyYW5zaXRpb25Hcm91cD5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGFza0xpc3QubWFwKGFyZyA9PiAoXG4gICAgICAgICAgICAgICAgPFJlc2l6ZSBrZXk9e2FyZy5pZH0+XG4gICAgICAgICAgICAgICAgICA8VGFza1xuICAgICAgICAgICAgICAgICAgICBrZXk9e2FyZy5pZH1cbiAgICAgICAgICAgICAgICAgICAgdGFzaz17YXJnfVxuICAgICAgICAgICAgICAgICAgICBvbkRlbGV0ZT17KCkgPT4gb25EZWxldGVBcmd1bWVudChhcmcpfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXsoKSA9PiBvbkNvbXBsZXRlQXJndW1lbnQoYXJnKX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9SZXNpemU+XG4gICAgICAgICAgICAgICkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9UcmFuc2l0aW9uR3JvdXA+XG4gICAgICAgIDwvSW5maW5pdGVTY3JvbGw+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblRhc2tzLnByb3BUeXBlcyA9IHtcbiAgb25EZWxldGVBcmd1bWVudDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25Db21wbGV0ZUFyZ3VtZW50OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICB0YXNrTGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICBtb3JlVG9Mb2FkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBmZXRjaFRhc2tzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjYXRlZ29yaWVzSWQ6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLmlzUmVxdWlyZWQsXG4gIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2tzO1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBMb2FkZXJMaW5lYXIgZnJvbSAnLi4vY29tcG9uZW50cy9Mb2FkZXJMaW5lYXInO1xuaW1wb3J0IE1haW5BZGRCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9NYWluQWRkQnV0dG9uJztcbmltcG9ydCBDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lcnMvQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lcic7XG5pbXBvcnQgVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lciBmcm9tICcuLi9jb250YWluZXJzL1Zpc2liaWxpdHlGaWx0ZXJDb250YWluZXInO1xuaW1wb3J0IFRhc2tzQ29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lcnMvVGFza3NDb250YWluZXInO1xuaW1wb3J0IERpYWxvZ0FkZCBmcm9tICcuL2RpYWxvZ0FkZC9EaWFsb2dBZGQnO1xuaW1wb3J0IFNuYWNrYmFyIGZyb20gJy4vU25hY2tiYXInO1xuXG5jbGFzcyBUb2RvcyBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc0RpYWxvZ0FkZE9wZW46IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IGluaXRGZXRjaEFsbENhdGVnb3JpZXMgfSA9IHRoaXMucHJvcHM7XG4gICAgaW5pdEZldGNoQWxsQ2F0ZWdvcmllcygpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaXNEaWFsb2dBZGRPcGVuIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgbWVzc2FnZSwgaGlkZU1lc3NhZ2UsIHNob3dMb2FkaW5nIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtYXBwXCI+XG4gICAgICAgIDxMb2FkZXJMaW5lYXIgc2hvdz17c2hvd0xvYWRpbmd9IC8+XG4gICAgICAgIDxkaXYgaWQ9XCJtYWluLXRvcC1iYXJcIj5cbiAgICAgICAgICA8Q2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lciAvPlxuICAgICAgICAgIDxWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyIC8+XG4gICAgICAgICAgPE1haW5BZGRCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBpc0RpYWxvZ0FkZE9wZW46IHRydWUgfSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxUYXNrc0NvbnRhaW5lciAvPlxuICAgICAgICA8RGlhbG9nQWRkXG4gICAgICAgICAgb3Blbj17aXNEaWFsb2dBZGRPcGVufVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBpc0RpYWxvZ0FkZE9wZW46IGZhbHNlIH0pfVxuICAgICAgICAvPlxuICAgICAgICA8U25hY2tiYXJcbiAgICAgICAgICBzaG93PXttZXNzYWdlLnNob3d9XG4gICAgICAgICAgaXNFcnJvcj17bWVzc2FnZS5pc0Vycm9yfVxuICAgICAgICAgIG1lc3NhZ2U9e21lc3NhZ2UudGV4dH1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBoaWRlTWVzc2FnZSgpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Ub2Rvcy5wcm9wVHlwZXMgPSB7XG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2hvdzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0Vycm9yOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgaGlkZU1lc3NhZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGluaXRGZXRjaEFsbENhdGVnb3JpZXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHNob3dMb2FkaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9kb3M7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBWaXNpYmlsaXR5U3dpdGNoIGZyb20gJy4vVmlzaWJpbGl0eVN3aXRjaCc7XG5pbXBvcnQgeyBBTExfVE9ET1MsIE9OTFlfQ09NUExFVEVELCBPTkxZX1RPX0NPTVBMRVRFIH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmNvbnN0IFZpc2liaWxpdHlGaWx0ZXIgPSAoe1xuICBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIsIG9uVmlzaWJpbGl0eVN3aXRjaENsaWNrLFxufSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cInZpc2liaWxpdHktZmlsdGVyLXdyYXBwZXJcIj5cbiAgICA8VmlzaWJpbGl0eVN3aXRjaFxuICAgICAgc2VsZWN0ZWQ9eyhzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IE9OTFlfVE9fQ09NUExFVEVcbiAgICAgICAgfHwgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyID09PSBBTExfVE9ET1MpfVxuICAgICAgb25DbGljaz17b25WaXNpYmlsaXR5U3dpdGNoQ2xpY2soT05MWV9UT19DT01QTEVURSl9XG4gICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICA+XG4gICAgICA8aSBjbGFzc05hbWU9XCJpY29uLWNpcmNsZS1ib3JkZXJcIiAvPlxuICAgIDwvVmlzaWJpbGl0eVN3aXRjaD5cbiAgICA8VmlzaWJpbGl0eVN3aXRjaFxuICAgICAgc2VsZWN0ZWQ9eyhzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IE9OTFlfQ09NUExFVEVEXG4gICAgICAgIHx8IHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciA9PT0gQUxMX1RPRE9TKX1cbiAgICAgIG9uQ2xpY2s9e29uVmlzaWJpbGl0eVN3aXRjaENsaWNrKE9OTFlfQ09NUExFVEVEKX1cbiAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgID5cbiAgICAgIDxpIGNsYXNzTmFtZT1cImljb24tY2lyY2xlXCIgLz5cbiAgICA8L1Zpc2liaWxpdHlTd2l0Y2g+XG4gIDwvZGl2PlxuKTtcblxuVmlzaWJpbGl0eUZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvblZpc2liaWxpdHlTd2l0Y2hDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFZpc2liaWxpdHlGaWx0ZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgVmlzaWJpbGl0eVN3aXRjaCA9ICh7XG4gIHNlbGVjdGVkLCBjaGlsZHJlbiwgb25DbGljayxcbn0pID0+IChcbiAgPGRpdlxuICAgIGNsYXNzTmFtZT17YHZpc2liaWxpdHktYnV0dG9uLXN3aXRjaCBhbGlnbi1pdGVtcy1jZW50ZXIgJHsoc2VsZWN0ZWQpID8gJ3NlbGVjdGVkJyA6ICcnfSBgfVxuICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gID5cbiAgICB7Y2hpbGRyZW59XG4gIDwvZGl2PlxuKTtcblxuVmlzaWJpbGl0eVN3aXRjaC5wcm9wVHlwZXMgPSB7XG4gIHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5WaXNpYmlsaXR5U3dpdGNoLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2VsZWN0ZWQ6IGZhbHNlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaWJpbGl0eVN3aXRjaDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDMwMDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgaGVpZ2h0ICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBoZWlnaHQ6IDAsXG59O1xuXG5jb25zdCBvbkVudGVyID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gYCR7bm9kZS5maXJzdEVsZW1lbnRDaGlsZC5vZmZzZXRIZWlnaHR9cHhgO1xufTtcblxuY29uc3Qgb25FeGl0ID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gJzBweCc7XG59O1xuXG5jb25zdCBDb2xsYXBzZSA9ICh7IGluOiBpblByb3AsIGNoaWxkcmVuIH0pID0+IChcbiAgPFRyYW5zaXRpb24gb25FbnRlcj17b25FbnRlcn0gb25FeGl0PXtvbkV4aXR9IGluPXtpblByb3B9IHRpbWVvdXQ9e2R1cmF0aW9ufT5cbiAgICB7KCkgPT4gKFxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuQ29sbGFwc2UucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb2xsYXBzZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDI1MDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgYWxsICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBoZWlnaHQ6ICcwcHgnLFxuICBvcGFjaXR5OiAnMCcsXG4gIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxufTtcblxuY29uc3QgdHJhbnNpdGlvblN0eWxlcyA9IHtcbiAgZW50ZXJpbmc6IHtcbiAgICBoZWlnaHQ6ICcwcHgnLFxuICAgIG9wYWNpdHk6ICcwJyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgfSxcbiAgZW50ZXJlZDoge1xuICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgaGVpZ2h0OiAnMTAwdmgnLFxuICAgIG9wYWNpdHk6ICcxJyxcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gIH0sXG59O1xuXG5jb25zdCBEaWFsb2dBbmltID0gKHsgaW46IGluUHJvcCwgY2hpbGRyZW4gfSkgPT4gKFxuICA8VHJhbnNpdGlvbiBpbj17aW5Qcm9wfSB0aW1lb3V0PXtkdXJhdGlvbn0+XG4gICAge3N0YXRlID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJiYWNrZHJvcC1kaWFsb2dcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgICAuLi50cmFuc2l0aW9uU3R5bGVzW3N0YXRlXSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuRGlhbG9nQW5pbS5wcm9wVHlwZXMgPSB7XG4gIGluOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpYWxvZ0FuaW07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSAyNTA7XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgd2lkdGg6ICcxMDAlJyxcbiAgdHJhbnNpdGlvbjogYG9wYWNpdHkgJHtkdXJhdGlvbn1tcyBlYXNlLWluLW91dGAsXG4gIG9wYWNpdHk6IDAsXG4gIGRpc3BsYXk6ICdpbmhlcml0Jyxcbn07XG5cbmNvbnN0IHRyYW5zaXRpb25TdHlsZXMgPSB7XG4gIGVudGVyOiB7IG9wYWNpdHk6IDAgfSxcbiAgZW50ZXJlZDogeyBvcGFjaXR5OiAxIH0sXG59O1xuXG5jb25zdCBSZXBsYWNlQW5pbSA9ICh7IGluOiBpblByb3AsIGVuZExpc3RlbmVyLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxUcmFuc2l0aW9uXG4gICAgaW49e2luUHJvcH1cbiAgICB0aW1lb3V0PXtkdXJhdGlvbn1cbiAgICBhZGRFbmRMaXN0ZW5lcj17ZW5kTGlzdGVuZXJ9XG4gID5cbiAgICB7c3RhdGUgPT4gKFxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgICAuLi50cmFuc2l0aW9uU3R5bGVzW3N0YXRlXSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuUmVwbGFjZUFuaW0ucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgZW5kTGlzdGVuZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVwbGFjZUFuaW07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSB7XG4gIGVudGVyOiAzMDAsXG4gIGV4aXQ6IDIwMCxcbn07XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgdHJhbnNpdGlvbjogYGFsbCAke2R1cmF0aW9uLmVudGVyfW1zIGVhc2UtaW4tb3V0YCxcbiAgaGVpZ2h0OiAwLFxuICBvcGFjaXR5OiAwLFxufTtcblxuY29uc3Qgb25FbnRlciA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XG4gIHN0eWxlLmhlaWdodCA9IGAke25vZGUuZmlyc3RFbGVtZW50Q2hpbGQub2Zmc2V0SGVpZ2h0fXB4YDtcbiAgc3R5bGUub3BhY2l0eSA9IDE7XG59O1xuXG5jb25zdCBvbkVudGVyZWQgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSAnYXV0byc7XG59O1xuXG5jb25zdCBvbkV4aXQgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSBgJHtub2RlLmZpcnN0RWxlbWVudENoaWxkLm9mZnNldEhlaWdodH1weGA7XG59O1xuXG5jb25zdCBvbkV4aXRlZCA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XG4gIHN0eWxlLmhlaWdodCA9ICcwcHgnO1xuICBzdHlsZS5vcGFjaXR5ID0gMDtcbn07XG5cblxuY29uc3QgUmVzaXplID0gKHsgLi4ucHJvcHMsIGNoaWxkcmVuIH0pID0+IChcbiAgPFRyYW5zaXRpb25cbiAgICB7Li4ucHJvcHN9XG4gICAgb25FbnRlcj17b25FbnRlcn1cbiAgICBvbkVudGVyZWQ9e29uRW50ZXJlZH1cbiAgICBvbkV4aXQ9e29uRXhpdH1cbiAgICBvbkV4aXRlZD17b25FeGl0ZWR9XG4gICAgdGltZW91dD17ZHVyYXRpb259XG4gID5cbiAgICB7KCkgPT4gKFxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuUmVzaXplLnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZXNpemU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSAyNTA7XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgdHJhbnNpdGlvbjogYGFsbCAke2R1cmF0aW9ufW1zIGVhc2UtaW4tb3V0YCxcbiAgYm90dG9tOiAnLTEwMHB4Jyxcbn07XG5cbmNvbnN0IHRyYW5zaXRpb25TdHlsZXMgPSB7XG4gIGVudGVyaW5nOiB7XG4gICAgYm90dG9tOiAnLTEwMHB4JyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgfSxcbiAgZW50ZXJlZDoge1xuICAgIGJvdHRvbTogJzBweCcsXG4gICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICB9LFxufTtcblxuY29uc3QgU25hY2tiYXJBbmltID0gKHsgaW46IGluUHJvcCwgY2hpbGRyZW4sIGN1c3RvbUNsYXNzIH0pID0+IChcbiAgPFRyYW5zaXRpb24gaW49e2luUHJvcH0gdGltZW91dD17ZHVyYXRpb259PlxuICAgIHtzdGF0ZSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPVwiY29udGVudC1zbmFja2JhclwiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxuICAgICAgICAgIC4uLnRyYW5zaXRpb25TdHlsZXNbc3RhdGVdLFxuICAgICAgICB9fVxuICAgICAgICBjbGFzc05hbWU9e2N1c3RvbUNsYXNzfVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICA8L1RyYW5zaXRpb24+XG4pO1xuXG5TbmFja2JhckFuaW0ucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIGN1c3RvbUNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuU25hY2tiYXJBbmltLmRlZmF1bHRQcm9wcyA9IHtcbiAgY3VzdG9tQ2xhc3M6ICcnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU25hY2tiYXJBbmltO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IHsgQUREX0FSR1VNRU5UIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCB7IGFkZENhdGVnb3J5IH0gZnJvbSAnLi4vLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VJbmZvIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5cbmNsYXNzIEFkZENhdGVnb3J5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5hbWU6ICcnLFxuICAgIH07XG4gICAgdGhpcy5vbklucHV0VGV4dENoYW5nZSA9IHRoaXMub25JbnB1dFRleHRDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQnV0dG9uQWRkQ2xpY2sgPSB0aGlzLm9uQnV0dG9uQWRkQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQ2F0ZWdvcnlDcmVhdGVkID0gdGhpcy5vbkNhdGVnb3J5Q3JlYXRlZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25JbnB1dFRleHRDaGFuZ2UoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBuYW1lOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgfVxuXG4gIG9uQnV0dG9uQWRkQ2xpY2soKSB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgZGlzcGF0Y2ggfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKG5hbWUgPT09ICcnKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ05hbWVSZXF1aXJlZCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkaXNwYXRjaChhZGRDYXRlZ29yeShuYW1lLCB0aGlzLm9uQ2F0ZWdvcnlDcmVhdGVkKSk7XG4gIH1cblxuICBvbkNhdGVnb3J5Q3JlYXRlZChzZWxlY3RlZENhdGVnb3J5KSB7XG4gICAgY29uc3QgeyBvbk5leHQgfSA9IHRoaXMucHJvcHM7XG4gICAgb25OZXh0KHsgc3RlcElkOiBBRERfQVJHVU1FTlQsIG9wdGlvbnM6IHsgc2VsZWN0ZWRDYXRlZ29yeSB9IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtYWRkLWNhdGVnb3J5XCI+XG4gICAgICAgIDxoMj5BZGQgbmV3IENBVEVHT1JZPC9oMj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4taW5wdXRcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2xhYmVscy5wbGFjZWhvbGRlck5hbWV9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0VGV4dENoYW5nZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQnV0dG9uQWRkQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xhYmVscy5idXR0b25BZGR9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5BZGRDYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbk5leHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCkoQWRkQ2F0ZWdvcnkpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IHsgU0VMRUNUX0NPTVBMRVRFX0RBVEUgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VJbmZvIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5cbmNsYXNzIEFkZFRhc2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0aXRsZTogJycsXG4gICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgfTtcbiAgICB0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlID0gdGhpcy5vbklucHV0VGV4dENoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25CdXR0b25TY2hlZHVsZUNsaWNrID0gdGhpcy5vbkJ1dHRvblNjaGVkdWxlQ2xpY2suYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uSW5wdXRUZXh0Q2hhbmdlKG5hbWUpIHtcbiAgICByZXR1cm4gKGUpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBbbmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pO1xuICAgIH07XG4gIH1cblxuICBvbkJ1dHRvblNjaGVkdWxlQ2xpY2soKSB7XG4gICAgY29uc3QgeyBvcHRpb25zLCBkaXNwYXRjaCwgb25OZXh0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgdGl0bGUsIGRlc2NyaXB0aW9uIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGNhdGVnb3J5ID0gb3B0aW9ucy5zZWxlY3RlZENhdGVnb3J5O1xuICAgIGlmICh0aXRsZSA9PT0gJycpIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlSW5mbyhsYWJlbHMubXNnVGl0bGVSZXF1aXJlZCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvbk5leHQoeyBzdGVwSWQ6IFNFTEVDVF9DT01QTEVURV9EQVRFLCBvcHRpb25zOiB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgY2F0ZWdvcnkgfSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSA9IHRoaXMucHJvcHMub3B0aW9ucztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWFkZC1hcmd1bWVudFwiPlxuICAgICAgICA8aDI+e2xhYmVscy50aXRsZUFkZFRhc2t9PC9oMj5cbiAgICAgICAgPGgzPlxuICAgICAgICAgIHtsYWJlbHMubGFiZWxGb3JDYXRlZ29yeX1cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsYWJlbC1jYXRlZ29yeS1uYW1lXCI+XG4gICAgICAgICAgICB7YCAke3NlbGVjdGVkQ2F0ZWdvcnkubmFtZX1gfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9oMz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWZpZWxkc1wiPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17bGFiZWxzLnBsYWNlSG9sZGVyVGl0bGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0VGV4dENoYW5nZSgndGl0bGUnKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17bGFiZWxzLnBsYWNlSG9sZGVyRGVzY3JpcHRpb259XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0VGV4dENoYW5nZSgnZGVzY3JpcHRpb24nKX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQnV0dG9uU2NoZWR1bGVDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGFiZWxzLmJ1dHRvblNjaGVkdWxlfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQWRkVGFzay5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvcHRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHNlbGVjdGVkQ2F0ZWdvcnk6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIH0pLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoKShBZGRUYXNrKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgU2VsZWN0QWN0aW9uQWRkIGZyb20gJy4vU2VsZWN0QWN0aW9uQWRkJztcbmltcG9ydCBBZGRDYXRlZ29yeSBmcm9tICcuL0FkZENhdGVnb3J5JztcbmltcG9ydCBTZWxlY3RDYXRlZ29yeSBmcm9tICcuL1NlbGVjdENhdGVnb3J5JztcbmltcG9ydCBBZGRUYXNrIGZyb20gJy4vQWRkVGFzayc7XG5pbXBvcnQgU2VsZWN0Q29tcGxldGVEYXRlIGZyb20gJy4vU2VsZWN0Q29tcGxldGVEYXRlJztcbmltcG9ydCBEb25lIGZyb20gJy4vRG9uZSc7XG5pbXBvcnQge1xuICBTRUxFQ1RfV0FOVF9UT19BREQsXG4gIEFERF9DQVRFR09SWSxcbiAgQUREX0FSR1VNRU5ULFxuICBTRUxFQ1RfQ0FURUdPUlksXG4gIFNFTEVDVF9DT01QTEVURV9EQVRFLFxuICBET05FLFxuICBzdGVwTGlzdCxcbn0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCBSZXBsYWNlQW5pbSBmcm9tICcuLi9hbmltcy9SZXBsYWNlQW5pbSc7XG5pbXBvcnQgRGlhbG9nQW5pbSBmcm9tICcuLi9hbmltcy9EaWFsb2dBbmltJztcbmltcG9ydCBTdGVwcyBmcm9tICcuL1N0ZXBzJztcblxuY29uc3QgZ2V0Q29udGVudFRvUmVuZGVyID0gKHN0ZXBzLCBwcm9wcykgPT4ge1xuICBpZiAoc3RlcHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIDxTZWxlY3RBY3Rpb25BZGQgey4uLnByb3BzfSAvPjtcbiAgfVxuICBjb25zdCBsYXN0U3RlcCA9IHN0ZXBzW3N0ZXBzLmxlbmd0aCAtIDFdO1xuICBzd2l0Y2ggKGxhc3RTdGVwLnN0ZXBJZCkge1xuICAgIGNhc2UgU0VMRUNUX1dBTlRfVE9fQUREOlxuICAgICAgcmV0dXJuIDxTZWxlY3RBY3Rpb25BZGQgey4uLnByb3BzfSAvPjtcbiAgICBjYXNlIEFERF9DQVRFR09SWTpcbiAgICAgIHJldHVybiA8QWRkQ2F0ZWdvcnkgey4uLnByb3BzfSAvPjtcbiAgICBjYXNlIEFERF9BUkdVTUVOVDpcbiAgICAgIHJldHVybiA8QWRkVGFzayB7Li4ucHJvcHN9IG9wdGlvbnM9e2xhc3RTdGVwLm9wdGlvbnN9IC8+O1xuICAgIGNhc2UgU0VMRUNUX0NBVEVHT1JZOlxuICAgICAgcmV0dXJuIDxTZWxlY3RDYXRlZ29yeSB7Li4ucHJvcHN9IC8+O1xuICAgIGNhc2UgU0VMRUNUX0NPTVBMRVRFX0RBVEU6XG4gICAgICByZXR1cm4gPFNlbGVjdENvbXBsZXRlRGF0ZSB7Li4ucHJvcHN9IG9wdGlvbnM9e2xhc3RTdGVwLm9wdGlvbnN9IC8+O1xuICAgIGNhc2UgRE9ORTpcbiAgICAgIHJldHVybiA8RG9uZSB7Li4ucHJvcHN9IC8+O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gPFNlbGVjdEFjdGlvbkFkZCB7Li4ucHJvcHN9IC8+O1xuICB9XG59O1xuXG5jb25zdCBpbml0YWxTdGF0ZSA9IHtcbiAgbmV4dFN0ZXBzOiBbXSxcbiAgc3RlcHM6IFtcbiAgICB7XG4gICAgICBzdGVwSWQ6IFNFTEVDVF9XQU5UX1RPX0FERCxcbiAgICAgIG9wdGlvbnM6IHt9LFxuICAgIH0sXG4gIF0sXG4gIHNob3dTdGVwOiB0cnVlLFxufTtcblxuY2xhc3MgRGlhbG9nQWRkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC4uLmluaXRhbFN0YXRlLFxuICAgIH07XG4gICAgdGhpcy5vbkJhY2sgPSB0aGlzLm9uQmFjay5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25OZXh0ID0gdGhpcy5vbk5leHQuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uUmVzZXRBbmRDbG9zZSA9IHRoaXMub25SZXNldEFuZENsb3NlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkFuaW1hdGlvbkVuZCA9IHRoaXMub25BbmltYXRpb25FbmQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uQmFjaygpIHtcbiAgICBjb25zdCB7IHN0ZXBzIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgb25DbG9zZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzdGVwQ291bnQgPSBzdGVwcy5sZW5ndGg7XG4gICAgaWYgKHN0ZXBDb3VudCA9PT0gMSkge1xuICAgICAgLy8gUmV0dXJuZWQgdG8gdGhlIGZpcnN0IHN0ZXBzLCBjbG9zZSB0aGUgZGlhbG9nXG4gICAgICB0aGlzLnNldFN0YXRlKHsgLi4uaW5pdGFsU3RhdGUgfSk7XG4gICAgICBvbkNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZXh0U3RlcHM6IFtcbiAgICAgICAgICAuLi5zdGVwcy5zbGljZSgwLCBzdGVwcy5sZW5ndGggLSAxKSxcbiAgICAgICAgXSxcbiAgICAgICAgc2hvd1N0ZXA6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25OZXh0KHN0ZXAgPSB7IHN0ZXBJZDogJycsIG9wdGlvbnM6IHt9IH0pIHtcbiAgICBjb25zdCB7IHN0ZXBzIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbmV4dFN0ZXBzOiBbXG4gICAgICAgIC4uLnN0ZXBzLCB7XG4gICAgICAgICAgLi4uc3RlcCxcbiAgICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBzaG93U3RlcDogZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBvblJlc2V0QW5kQ2xvc2UoKSB7XG4gICAgY29uc3QgeyBvbkNsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgIG9uQ2xvc2UoKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi5pbml0YWxTdGF0ZSB9KTtcbiAgICB9LCA1MDApO1xuICB9XG5cbiAgb25BbmltYXRpb25FbmQobm9kZSwgZG9uZSkge1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsICgpID0+IHtcbiAgICAgIGRvbmUoKTtcbiAgICAgIGNvbnN0IHsgbmV4dFN0ZXBzLCBzaG93U3RlcCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIGlmIChzaG93U3RlcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc3RlcHM6IFtcbiAgICAgICAgICAuLi5uZXh0U3RlcHMsXG4gICAgICAgIF0sXG4gICAgICAgIHNob3dTdGVwOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgc3RlcHMsIHNob3dTdGVwIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgb25DbG9zZSwgb3BlbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IG9uTmV4dCwgb25SZXNldEFuZENsb3NlLCBvbkFuaW1hdGlvbkVuZCB9ID0gdGhpcztcbiAgICByZXR1cm4gKFxuICAgICAgPERpYWxvZ0FuaW0gaW49e29wZW59PlxuICAgICAgICA8ZGl2IGlkPVwiZGlhbG9nLWFkZFwiID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpYWxvZy1oZWFkZXJcIj5cbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJtYWluLWNsb3NlLWJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IG9uQ2xvc2UoKX0+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+JiN4RTVDRDs8L2k+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXBzLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPFN0ZXBzXG4gICAgICAgICAgICAgIGxpc3Q9e3N0ZXBMaXN0fVxuICAgICAgICAgICAgICBzdGVwSGlzdG9yeT17c3RlcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlhbG9nLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPFJlcGxhY2VBbmltIGluPXtzaG93U3RlcH0gZW5kTGlzdGVuZXI9e29uQW5pbWF0aW9uRW5kfT5cbiAgICAgICAgICAgICAge2dldENvbnRlbnRUb1JlbmRlcihzdGVwcywgeyBvbk5leHQsIG9uQ2xvc2U6IG9uUmVzZXRBbmRDbG9zZSB9KX1cbiAgICAgICAgICAgIDwvUmVwbGFjZUFuaW0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaWFsb2ctZm9vdGVyXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGlkPVwiYmFjay1idXR0b24tZGlhbG9nXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1idXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uQmFjaygpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBORVZFUiBNSU5ELCBHTyBCQUNLXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0RpYWxvZ0FuaW0+XG4gICAgKTtcbiAgfVxufVxuXG5EaWFsb2dBZGQucHJvcFR5cGVzID0ge1xuICBvcGVuOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlhbG9nQWRkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuXG5jbGFzcyBEb25lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCB7IG9uQ2xvc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgICBvbkNsb3NlKCk7XG4gICAgfSwgMzAwMCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1kb25lLWFkZFwiPlxuICAgICAgICA8aDI+e2xhYmVscy5sYWJlbERvbmV9PC9oMj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWljLWRvbmVcIj5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBzcmM9XCIuL2NsaWVudC9wdWJsaWMvaW1nL2ljLWRvbmUuc3ZnXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImljLWRvbmVcIlxuICAgICAgICAgICAgYWx0PVwiZG9uZSBpY29uXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRG9uZS5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEb25lO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCB7IEFERF9DQVRFR09SWSwgU0VMRUNUX0NBVEVHT1JZIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5cbmNvbnN0IFNlbGVjdEFjdGlvbkFkZCA9ICh7IG9uTmV4dCB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1zZWxlY3QtYWN0aW9uLWFkZFwiPlxuICAgIDxoMj57bGFiZWxzLnRpdGxlQWRkfTwvaDI+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtLXNlbGVjdFwiPlxuICAgICAgPHBcbiAgICAgICAgY2xhc3NOYW1lPVwic2VsZWN0LXRpdGxlXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4gb25OZXh0KHsgc3RlcElkOiBBRERfQ0FURUdPUlksIG9wdGlvbnM6IHt9IH0pfVxuICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgID5cbiAgICAgICAge2xhYmVscy5sYWJlbENhdGVnb3J5fVxuICAgICAgPC9wPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbS1zZWxlY3RcIj5cbiAgICAgIDxwXG4gICAgICAgIGNsYXNzTmFtZT1cInNlbGVjdC10aXRsZVwiXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uTmV4dCh7IHN0ZXBJZDogU0VMRUNUX0NBVEVHT1JZLCBvcHRpb25zOiB7fSB9KX1cbiAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICA+XG4gICAgICAgIHtsYWJlbHMubGFiZWxUYXNrfVxuICAgICAgPC9wPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbik7XG5cblNlbGVjdEFjdGlvbkFkZC5wcm9wVHlwZXMgPSB7XG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdEFjdGlvbkFkZDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi9jb25zdGFudHMvbGFiZWxzJztcbmltcG9ydCBDYXRlZ29yeSBmcm9tICcuLi9DYXRlZ29yeSc7XG5pbXBvcnQgeyBBRERfQVJHVU1FTlQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VJbmZvIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5cblxuY2xhc3MgU2VsZWN0Q2F0ZWdvcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VsZWN0ZWRDYXRlZ29yeTogdW5kZWZpbmVkLFxuICAgIH07XG4gICAgdGhpcy5vbkNhdGVnb3J5Q2xpY2sgPSB0aGlzLm9uQ2F0ZWdvcnlDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25CdXR0b25OZXh0Q2xpY2sgPSB0aGlzLm9uQnV0dG9uTmV4dENsaWNrLmJpbmQodGhpcyk7XG4gIH1cblxuICBvbkNhdGVnb3J5Q2xpY2soY2F0ZWdvcnkpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRDYXRlZ29yeTogY2F0ZWdvcnkgfSk7XG4gIH1cblxuICBvbkJ1dHRvbk5leHRDbGljaygpIHtcbiAgICBjb25zdCB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvbk5leHQsIGRpc3BhdGNoIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChzZWxlY3RlZENhdGVnb3J5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlSW5mbyhsYWJlbHMubXNnU2VsZWN0Q2F0ZWdvcnkpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25OZXh0KHsgc3RlcElkOiBBRERfQVJHVU1FTlQsIG9wdGlvbnM6IHsgc2VsZWN0ZWRDYXRlZ29yeSB9IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2F0ZWdvcmllc0xpc3QgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBzZWxlY3RlZENhdGVnb3J5IH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtc2VsZWN0LWNhdGVnb3J5XCI+XG4gICAgICAgIDxoMj5DaG9vc2UgYSBDQVRFR09SWTwvaDI+XG4gICAgICAgIDxkaXYgaWQ9XCJjb250ZW50LWNhdGVnb3JpZXNcIj5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBjYXRlZ29yaWVzTGlzdC5tYXAoY2F0ZWdvcnkgPT4gKFxuICAgICAgICAgICAgICAoY2F0ZWdvcnkuaWQgIT09ICcwJylcbiAgICAgICAgICAgICAgPyA8Q2F0ZWdvcnlcbiAgICAgICAgICAgICAgICBrZXk9e2NhdGVnb3J5LmlkfVxuICAgICAgICAgICAgICAgIGNhdGVnb3J5PXtjYXRlZ29yeX1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17c2VsZWN0ZWRDYXRlZ29yeSAhPT0gdW5kZWZpbmVkICYmIGNhdGVnb3J5LmlkID09PSBzZWxlY3RlZENhdGVnb3J5LmlkfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DYXRlZ29yeUNsaWNrfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSlcbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4tYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25CdXR0b25OZXh0Q2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xhYmVscy5idXR0b25OZXh0fVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuU2VsZWN0Q2F0ZWdvcnkucHJvcFR5cGVzID0ge1xuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY2F0ZWdvcmllc0xpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wID0gc3RhdGUgPT4gKFxuICB7XG4gICAgY2F0ZWdvcmllc0xpc3Q6IHN0YXRlLnRvZG9GaWx0ZXJzLmNhdGVnb3JpZXMsXG4gIH1cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3ApKFNlbGVjdENhdGVnb3J5KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBEYXRlUGlja2VyIGZyb20gJ3JlYWN0LWRhdGUtcGlja2VyJztcblxuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi9jb25zdGFudHMvbGFiZWxzJztcbmltcG9ydCB7IERPTkUgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IHsgYWRkVGFzayB9IGZyb20gJy4uLy4uL2FjdGlvbnMvdG9kb1Rhc2tzQWN0aW9ucyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUluZm8gfSBmcm9tICcuLi8uLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcblxuY2xhc3MgU2VsZWN0Q29tcGxldGVEYXRlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRvZG9XaXRoaW46IG5ldyBEYXRlKCksXG4gICAgfTtcbiAgICB0aGlzLm9uSW5wdXREYXRlQ2hhbmdlID0gdGhpcy5vbklucHV0RGF0ZUNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25CdXR0b25BZGRDbGljayA9IHRoaXMub25CdXR0b25BZGRDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25Ub2RvQXJndW1lbnRDcmVhdGVkID0gdGhpcy5vblRvZG9Bcmd1bWVudENyZWF0ZWQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uSW5wdXREYXRlQ2hhbmdlKGRhdGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgdG9kb1dpdGhpbjogZGF0ZSB9KTtcbiAgfVxuXG4gIG9uQnV0dG9uQWRkQ2xpY2soKSB7XG4gICAgY29uc3QgeyB0b2RvV2l0aGluIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgZGlzcGF0Y2gsIG9wdGlvbnMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyB0aXRsZSwgZGVzY3JpcHRpb24sIGNhdGVnb3J5IH0gPSBvcHRpb25zO1xuICAgIGlmICghdG9kb1dpdGhpbiB8fCB0b2RvV2l0aGluID09PSAnJykge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VJbmZvKGxhYmVscy5tc2dTZWxlY3REYXRlKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRpc3BhdGNoKGFkZFRhc2soXG4gICAgICB0aXRsZSwgZGVzY3JpcHRpb24sXG4gICAgICBjYXRlZ29yeSwgdG9kb1dpdGhpbiwgdGhpcy5vblRvZG9Bcmd1bWVudENyZWF0ZWQsXG4gICAgKSk7XG4gIH1cblxuICBvblRvZG9Bcmd1bWVudENyZWF0ZWQoKSB7XG4gICAgY29uc3QgeyBvbk5leHQgfSA9IHRoaXMucHJvcHM7XG4gICAgb25OZXh0KHsgc3RlcElkOiBET05FLCBvcHRpb25zOiB7IH0gfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB0b2RvV2l0aGluIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtc2VsZWN0LWNvbXBsZXRlLWRhdGVcIj5cbiAgICAgICAgPGgyPlRvZG8gV2l0aGluPC9oMj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWlucHV0XCI+XG4gICAgICAgICAgPERhdGVQaWNrZXJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4taW5wdXRcIlxuICAgICAgICAgICAgY2FsZW5kYXJDbGFzc05hbWU9XCJkYXJrLWNhbGVuZGFyXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXREYXRlQ2hhbmdlfVxuICAgICAgICAgICAgdmFsdWU9e3RvZG9XaXRoaW59XG4gICAgICAgICAgICBtaW5EYXRlPXtuZXcgRGF0ZSgpfVxuICAgICAgICAgICAgbG9jYWxlPVwiZW4tVVNcIlxuICAgICAgICAgICAgY2xlYXJJY29uPXs8aSBjbGFzc05hbWU9XCJpY29uLWRlbGV0ZVwiIC8+fVxuICAgICAgICAgICAgY2FsZW5kYXJJY29uPXs8aSBjbGFzc05hbWU9XCJpY29uLWNhbGVuZGFyXCIgLz59XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1idXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkJ1dHRvbkFkZENsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYWJlbHMuYnV0dG9uQWRkfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuU2VsZWN0Q29tcGxldGVEYXRlLnByb3BUeXBlcyA9IHtcbiAgZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9wdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNhdGVnb3J5OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB9KS5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkLFxuICBvbk5leHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCkoU2VsZWN0Q29tcGxldGVEYXRlKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBTdGVwID0gKHsgZGVzY3JpcHRpb24sIGNvbXBsZXRlZCwgbmVlZExpbmUgfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtY29udGFpbmVyXCI+XG4gICAge1xuICAgICAgbmVlZExpbmUgJiZcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbGluZSAkeyhjb21wbGV0ZWQpID8gJ2NvbXBsZXRlZCcgOiAnJ31gfSAvPlxuICAgIH1cbiAgICA8ZGl2IGNsYXNzTmFtZT17YHN0ZXAgJHsoY29tcGxldGVkKSA/ICdjb21wbGV0ZWQnIDogJyd9YH0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImluZGljYXRvclwiIC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtZGVzY3JpcHRpb25cIj5cbiAgICAgICAgPHA+e2Rlc2NyaXB0aW9ufTwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbik7XG5cblN0ZXAucHJvcFR5cGVzID0ge1xuICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIG5lZWRMaW5lOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuY29uc3QgU3RlcHMgPSAoeyBsaXN0LCBzdGVwSGlzdG9yeSB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwic3RlcHMtd3JhcHBlclwiPlxuICAgIHtcbiAgICAgIGxpc3QubWFwKChpdGVtLCBpKSA9PiAoXG4gICAgICAgIDxTdGVwXG4gICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgIHsuLi5pdGVtfVxuICAgICAgICAgIGNvbXBsZXRlZD17c3RlcEhpc3RvcnkuZmlsdGVyKHNoID0+IHNoLnN0ZXBJZCA9PT0gaXRlbS5pZCkubGVuZ3RoID4gMH1cbiAgICAgICAgICBuZWVkTGluZT17aSA+IDB9XG4gICAgICAgIC8+KSlcbiAgICB9XG4gIDwvZGl2PlxuKTtcblxuU3RlcHMucHJvcFR5cGVzID0ge1xuICBsaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgZGVzY3JpcHRpb246IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgc3RlcEhpc3Rvcnk6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc3RlcElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9KSkuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN0ZXBzO1xuIiwiY29uc3QgbGFiZWxzID0ge1xuICB0aXRsZUFkZDogJ1doYXQgd291bGQgeW91IGxpa2UgdG8gYWRkPycsXG4gIHRpdGxlQWRkVGFzazogJ0FkZCBuZXcgVGFzaycsXG4gIGxhYmVsRm9yQ2F0ZWdvcnk6ICdmb3IgdGhlIGNhdGVnb3J5OicsXG4gIGxhYmVsRG9uZTogJ0RvbmUhJyxcbiAgbGFiZWxDYXRlZ29yeTogJ0NBVEVHT1JZJyxcbiAgbGFiZWxUYXNrOiAnVEFTSycsXG4gIHBsYWNlSG9sZGVyVGl0bGU6ICdUeXBlIHRoZSB0aXRsZScsXG4gIHBsYWNlSG9sZGVyRGVzY3JpcHRpb246ICdUeXBlIHRoZSBkZXNjcmlwdGlvbicsXG4gIHBsYWNlaG9sZGVyTmFtZTogJ1R5cGUgdGhlIG5hbWUnLFxuICBidXR0b25TY2hlZHVsZTogJ1NDSEVEVUxFJyxcbiAgYnV0dG9uQWRkOiAnQUREJyxcbiAgYnV0dG9uTmV4dDogJ05FWFQnLFxuICBtc2dUaXRsZVJlcXVpcmVkOiAnRW50ZXIgdGhlIHRpdGxlJyxcbiAgbXNnTmFtZVJlcXVpcmVkOiAnRW50ZXIgdGhlIG5hbWUnLFxuICBtc2dTZWxlY3RDYXRlZ29yeTogJ1NlbGVjdCBhIGNhdGVnb3J5JyxcbiAgbXNnU2VsZWN0RGF0ZTogJ1BpY2sgYSBkYXRlIGFuZCBjb21taXQuIE5vIGV4Y3VzZXMhJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxhYmVscztcbiIsImV4cG9ydCBjb25zdCBTRUxFQ1RfV0FOVF9UT19BREQgPSAnU0VMRUNUX1dBTlRfVE9fQUREJztcbmV4cG9ydCBjb25zdCBBRERfQ0FURUdPUlkgPSAnQUREX0NBVEVHT1JZJztcbmV4cG9ydCBjb25zdCBBRERfQVJHVU1FTlQgPSAnQUREX0FSR1VNRU5UJztcbmV4cG9ydCBjb25zdCBTRUxFQ1RfQ0FURUdPUlkgPSAnU0VMRUNUX0NBVEVHT1JZJztcbmV4cG9ydCBjb25zdCBTRUxFQ1RfQ09NUExFVEVfREFURSA9ICdTRUxFQ1RfQ09NUExFVEVfREFURSc7XG5leHBvcnQgY29uc3QgRE9ORSA9ICdET05FJztcblxuZXhwb3J0IGNvbnN0IHN0ZXBMaXN0ID0gW1xuICB7XG4gICAgaWQ6IFNFTEVDVF9XQU5UX1RPX0FERCxcbiAgICBkZXNjcmlwdGlvbjogJ1doYXQgd2FudCB0byBhZGQnLFxuICB9LFxuICB7XG4gICAgaWQ6IEFERF9DQVRFR09SWSxcbiAgICBkZXNjcmlwdGlvbjogJ0FkZCBhIGNhdGVnb3J5JyxcbiAgfSxcbiAge1xuICAgIGlkOiBTRUxFQ1RfQ0FURUdPUlksXG4gICAgZGVzY3JpcHRpb246ICdTZWxlY3QgYSBjYXRlZ29yeScsXG4gIH0sXG4gIHtcbiAgICBpZDogQUREX0FSR1VNRU5ULFxuICAgIGRlc2NyaXB0aW9uOiAnQWRkIEFyZ3VtZW50JyxcbiAgfSxcbiAge1xuICAgIGlkOiBTRUxFQ1RfQ09NUExFVEVfREFURSxcbiAgICBkZXNjcmlwdGlvbjogJ1NjaGVkdWxlJyxcbiAgfSxcbiAge1xuICAgIGlkOiBET05FLFxuICAgIGRlc2NyaXB0aW9uOiAnVGhhdFxcJ3MgaXQnLFxuICB9LFxuXTtcbiIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgQ2F0ZWdvcmllc0ZpbHRlciBmcm9tICcuLi9jb21wb25lbnRzL0NhdGVnb3JpZXNGaWx0ZXInO1xuaW1wb3J0IHtcbiAgc2VsZWN0Q2F0ZWdvcnksXG4gIHNlbGVjdENhdGVnb3J5QWxsLFxuICBkZWxldGVDYXRlZ29yeSxcbn0gZnJvbSAnLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuaW1wb3J0IGNhdGVnb3J5QWxsIGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuXG5pbXBvcnQgeyBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdCB9IGZyb20gJy4uL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IChcbiAge1xuICAgIGNhdGVnb3J5TGlzdDogZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3Qoc3RhdGUpLFxuICB9XG4pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoXG4gIHtcbiAgICBvbkRlbGV0ZUNhdGVnb3J5OiAoY2F0ZWdvcnkpID0+IHtcbiAgICAgIGRpc3BhdGNoKGRlbGV0ZUNhdGVnb3J5KGNhdGVnb3J5LmlkKSk7XG4gICAgfSxcbiAgICBvbkNpbGNrQ2F0ZWdvcnk6IChjYXRlZ29yeSwgZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2knICYmIGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2J1dHRvbicpIHtcbiAgICAgICAgaWYgKGNhdGVnb3J5LmlkID09PSBjYXRlZ29yeUFsbC5pZCkge1xuICAgICAgICAgIGRpc3BhdGNoKHNlbGVjdENhdGVnb3J5QWxsKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpc3BhdGNoKHNlbGVjdENhdGVnb3J5KGNhdGVnb3J5KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICB9XG4pO1xuXG5jb25zdCBDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyID0gY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pKENhdGVnb3JpZXNGaWx0ZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyO1xuIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBUYXNrcyBmcm9tICcuLi9jb21wb25lbnRzL1Rhc2tzJztcbmltcG9ydCB7XG4gIGZldGNoVGFza3NCeUNhdGVnb3J5LFxuICBkZWxldGVUYXNrLFxuICB0b29nbGVUYXNrQ29tcGxldGVkLFxufSBmcm9tICcuLi9hY3Rpb25zL3RvZG9UYXNrc0FjdGlvbnMnO1xuXG5pbXBvcnQgeyBnZXRUYXNrTGlzdCwgZ2V0U2tpcCwgc3RpbGxNb3JlVG9Mb2FkIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9UYXNrc1NlbGVjdG9ycyc7XG5pbXBvcnQgeyBnZXRTZWxlY3RlZENhdGVnb3JpZXNJZCwgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICB0YXNrTGlzdDogZ2V0VGFza0xpc3Qoc3RhdGUpLFxuICAgIHNraXA6IGdldFNraXAoc3RhdGUpLFxuICAgIG1vcmVUb0xvYWQ6IHN0aWxsTW9yZVRvTG9hZChzdGF0ZSksXG4gICAgY2F0ZWdvcmllc0lkOiBnZXRTZWxlY3RlZENhdGVnb3JpZXNJZChzdGF0ZSksXG4gICAgY29tcGxldGVkOiB2aXNpYmlsaXR5T25seUNvbXBsZXRlZChzdGF0ZSksXG4gIH1cbik7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcbiAge1xuICAgIG9uRGVsZXRlQXJndW1lbnQ6ICh0YXNrKSA9PiB7XG4gICAgICBkaXNwYXRjaChkZWxldGVUYXNrKHRhc2suaWQpKTtcbiAgICB9LFxuICAgIG9uQ29tcGxldGVBcmd1bWVudDogKHRhc2spID0+IHtcbiAgICAgIGRpc3BhdGNoKHRvb2dsZVRhc2tDb21wbGV0ZWQodGFzay5pZCwgdGFzay5jb21wbGV0ZWQpKTtcbiAgICB9LFxuICAgIGZldGNoVGFza3M6IChjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCwgbGltaXQsIHNraXApID0+IHtcbiAgICAgIGRpc3BhdGNoKGZldGNoVGFza3NCeUNhdGVnb3J5KGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgc2tpcCkpO1xuICAgIH0sXG4gIH1cbik7XG5cbmNvbnN0IFRhc2tzQ29udGFpbmVyID0gY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pKFRhc2tzKTtcblxuZXhwb3J0IGRlZmF1bHQgVGFza3NDb250YWluZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IFRvZG9zIGZyb20gJy4uL2NvbXBvbmVudHMvVG9kb3MnO1xuaW1wb3J0IHsgZmV0Y2hBbGxDYXRlZ29yaWVzIH0gZnJvbSAnLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuaW1wb3J0IHsgaGlkZU1lc3NhZ2UgfSBmcm9tICcuLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcbmltcG9ydCB7IHNob3dMb2FkaW5nIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbW1vblNlbGVjdG9ycyc7XG5cbmNvbnN0IFRvZG9zQ29udGFpbmVyID0gcHJvcHMgPT4gPFRvZG9zIHsuLi5wcm9wc30gLz47XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IChcbiAge1xuICAgIG1lc3NhZ2U6IHN0YXRlLm1lc3NhZ2UsXG4gICAgc2hvd0xvYWRpbmc6IHNob3dMb2FkaW5nKHN0YXRlKSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgaGlkZU1lc3NhZ2U6ICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKGhpZGVNZXNzYWdlKCkpO1xuICAgIH0sXG4gICAgaW5pdEZldGNoQWxsQ2F0ZWdvcmllczogKCkgPT4ge1xuICAgICAgZGlzcGF0Y2goZmV0Y2hBbGxDYXRlZ29yaWVzKCkpO1xuICAgIH0sXG4gIH1cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFRvZG9zQ29udGFpbmVyKTtcbiIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlzaWJpbGl0eUZpbHRlcnMgZnJvbSAnLi4vY29tcG9uZW50cy9WaXNpYmlsaXR5RmlsdGVycyc7XG5pbXBvcnQgeyBjaGFuZ2VWaXNpYmlsaXR5IH0gZnJvbSAnLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuXG5pbXBvcnQgeyBnZXRWaXNpYmlsaXR5RmlsdGVyIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyOiBnZXRWaXNpYmlsaXR5RmlsdGVyKHN0YXRlKSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgb25WaXNpYmlsaXR5U3dpdGNoQ2xpY2s6IHZpc2liaWxpdHkgPT4gKCkgPT4gKFxuICAgICAgZGlzcGF0Y2goY2hhbmdlVmlzaWJpbGl0eSh2aXNpYmlsaXR5KSlcbiAgICApLFxuICB9XG4pO1xuXG5jb25zdCBWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyID0gY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pKFZpc2liaWxpdHlGaWx0ZXJzKTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lcjtcbiIsImltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHsgaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIgfSBmcm9tICcuL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcbmltcG9ydCB7IGlzRmV0Y2hpbmdUYXNrcyB9IGZyb20gJy4vdG9kb1Rhc2tzU2VsZWN0b3JzJztcblxuZXhwb3J0IGNvbnN0IHNob3dMb2FkaW5nID0gY3JlYXRlU2VsZWN0b3IoXG4gIGlzRmV0Y2hpbmdDYXRlZ29yaWVzRmlsdGVyLFxuICBpc0ZldGNoaW5nVGFza3MsXG4gIChpc0ZldGNoaW5nQ2F0ZWdvcmllcywgaXNGZXRjaGluZ1RvZG9zKSA9PiBpc0ZldGNoaW5nQ2F0ZWdvcmllcyB8fCBpc0ZldGNoaW5nVG9kb3MsXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBzaG93TG9hZGluZztcbiIsImltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHsgT05MWV9DT01QTEVURUQgfSBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcblxuZXhwb3J0IGNvbnN0IGlzRmV0Y2hpbmdDYXRlZ29yaWVzRmlsdGVyID0gc3RhdGUgPT4gc3RhdGUudG9kb0ZpbHRlcnMuaXNGZXRjaGluZztcbmV4cG9ydCBjb25zdCBnZXRUb2RvRmlsdGVycyA9IHN0YXRlID0+IHN0YXRlLnRvZG9GaWx0ZXJzO1xuZXhwb3J0IGNvbnN0IGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0ID0gc3RhdGUgPT4gc3RhdGUudG9kb0ZpbHRlcnMuY2F0ZWdvcmllcztcbmV4cG9ydCBjb25zdCBnZXRWaXNpYmlsaXR5RmlsdGVyID0gc3RhdGUgPT4gc3RhdGUudG9kb0ZpbHRlcnMudmlzaWJpbGl0eTtcblxuZXhwb3J0IGNvbnN0IHZpc2liaWxpdHlPbmx5Q29tcGxldGVkID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldFZpc2liaWxpdHlGaWx0ZXIsXG4gIHZpc2liaWxpdHkgPT4gdmlzaWJpbGl0eSA9PT0gT05MWV9DT01QTEVURUQsXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzRmlsdGVyID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0LFxuICBjYXRlZ29yaWVzID0+IGNhdGVnb3JpZXMuZmlsdGVyKGNhdGVnb3J5ID0+IGNhdGVnb3J5LnNlbGVjdGVkKSxcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRTZWxlY3RlZENhdGVnb3JpZXNJZCA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdCxcbiAgY2F0ZWdvcmllcyA9PiBjYXRlZ29yaWVzLmZpbHRlcihjYXRlZ29yeSA9PiBjYXRlZ29yeS5zZWxlY3RlZClcbiAgICAubWFwKGNhdGVnb3J5RmlsdGVyID0+IGNhdGVnb3J5RmlsdGVyLmlkKSxcbik7XG4iLCJleHBvcnQgY29uc3QgaXNGZXRjaGluZ1Rhc2tzID0gc3RhdGUgPT4gc3RhdGUudG9kb1Rhc2tzLmlzRmV0Y2hpbmc7XG5leHBvcnQgY29uc3QgZ2V0VGFza3MgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvVGFza3M7XG5leHBvcnQgY29uc3QgZ2V0VGFza0xpc3QgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvVGFza3MuaXRlbXM7XG5leHBvcnQgY29uc3QgZ2V0U2tpcCA9IHN0YXRlID0+IHN0YXRlLnRvZG9UYXNrcy5za2lwO1xuZXhwb3J0IGNvbnN0IHN0aWxsTW9yZVRvTG9hZCA9IHN0YXRlID0+IHN0YXRlLnRvZG9UYXNrcy5tb3JlVG9Mb2FkO1xuIiwiLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImNvbnNpc3RlbnRcIl0gKi9cblxuZXhwb3J0IGNvbnN0IE1ldGhvZHMgPSB7XG4gIFBPU1Q6ICdQT1NUJyxcbiAgR0VUOiAnR0VUJyxcbiAgREVMRVRFOiAnREVMRVRFJyxcbiAgUEFUQ0g6ICdQQVRDSCcsXG59O1xuXG5jb25zdCBmdWxsVXJsID0gdXJsID0+IGAvYXBpLyR7dXJsfWA7XG5cbmNvbnN0IGJhc2VSZXF1ZXN0SW5pdCA9IHtcbiAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgaGVhZGVyczoge1xuICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gIH0sXG59O1xuXG5jb25zdCBjcmVhdGVQb3N0UmVxdWVzdCA9ICh1cmwsIG9wdGlvbnMgPSB7fSkgPT4gKFxuICBmZXRjaCh1cmwsIHtcbiAgICAuLi5iYXNlUmVxdWVzdEluaXQsXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkob3B0aW9ucyksXG4gIH0pXG4pO1xuXG5jb25zdCBjcmVhdGVHZXRSZXF1ZXN0ID0gKHVybCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGxldCBmaW5hbFVybCA9IGAke3VybH0/YDtcbiAgT2JqZWN0LmVudHJpZXMob3B0aW9ucykuZm9yRWFjaCgoW2tleSwgdmFsdWVdLCBwb2l0aW9uKSA9PiB7XG4gICAgZmluYWxVcmwgPSBgJHtmaW5hbFVybH0keyhwb2l0aW9uID4gMCkgPyAnJicgOiAnJ30ke2tleX09JHt2YWx1ZX1gO1xuICB9KTtcbiAgcmV0dXJuIGZldGNoKGZpbmFsVXJsLCB7XG4gICAgLi4uYmFzZVJlcXVlc3RJbml0LFxuICAgIG1ldGhvZDogJ0dFVCcsXG4gIH0pO1xufTtcblxuY29uc3QgY3JlYXRlRGVsZXRlUmVxdWVzdCA9ICh1cmwsIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgZmluYWxVcmwgPSBgJHt1cmx9LyR7b3B0aW9uc31gO1xuICByZXR1cm4gZmV0Y2goZmluYWxVcmwsIHtcbiAgICAuLi5iYXNlUmVxdWVzdEluaXQsXG4gICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVQYXRjaFJlcXVlc3QgPSAodXJsLCBvcHRpb25zID0ge30pID0+IChcbiAgZmV0Y2godXJsLCB7XG4gICAgLi4uYmFzZVJlcXVlc3RJbml0LFxuICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvcHRpb25zKSxcbiAgfSlcbik7XG5cbmNvbnN0IGNyZWF0ZVJlcXVlc3QgPSAodXJsLCBvcHRpb25zLCBtZXRob2QpID0+IHtcbiAgY29uc3QgZmluYWxVcmwgPSBmdWxsVXJsKHVybCk7XG4gIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgY2FzZSBNZXRob2RzLlBPU1Q6IHJldHVybiBjcmVhdGVQb3N0UmVxdWVzdChmaW5hbFVybCwgb3B0aW9ucyk7XG4gICAgY2FzZSBNZXRob2RzLkdFVDogcmV0dXJuIGNyZWF0ZUdldFJlcXVlc3QoZmluYWxVcmwsIG9wdGlvbnMpO1xuICAgIGNhc2UgTWV0aG9kcy5ERUxFVEU6IHJldHVybiBjcmVhdGVEZWxldGVSZXF1ZXN0KGZpbmFsVXJsLCBvcHRpb25zKTtcbiAgICBjYXNlIE1ldGhvZHMuUEFUQ0g6IHJldHVybiBjcmVhdGVQYXRjaFJlcXVlc3QoZmluYWxVcmwsIG9wdGlvbnMpO1xuICAgIGRlZmF1bHQ6IHJldHVybiBjcmVhdGVQb3N0UmVxdWVzdChmaW5hbFVybCwgb3B0aW9ucyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjYWxsQXBpID0gKHVybCwgb3B0aW9ucyA9IHt9LCBtZXRob2QgPSBNZXRob2RzLlBPU1QpID0+IChcbiAgY3JlYXRlUmVxdWVzdCh1cmwsIG9wdGlvbnMsIG1ldGhvZCkudGhlbihcbiAgICByZXNwb25zZSA9PiAocmVzcG9uc2Uub2sgP1xuICAgICAgcmVzcG9uc2UuanNvbigpIDpcbiAgICAgIFByb21pc2UucmVqZWN0KHJlc3BvbnNlLnRleHQoKSlcbiAgICApLFxuICAgIGVycm9yID0+IFByb21pc2UucmVqZWN0KGVycm9yKSxcbiAgKVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY2FsbEFwaTtcblxuIiwiaW1wb3J0IGRhdGVGb3JtYXQgZnJvbSAnZGF0ZWZvcm1hdCc7XG5cbmV4cG9ydCBjb25zdCB0b0pzRGF0ZSA9IChwYXJzZURhdGUgPSAnJykgPT5cbiAgbmV3IERhdGUocGFyc2VJbnQocGFyc2VEYXRlLnN1YnN0cig2KSwgMTApKTtcblxuZXhwb3J0IGNvbnN0IHRvU2ltcGxlRGF0ZUZvcm1hdCA9IGRhdGUgPT5cbiAgZGF0ZUZvcm1hdChkYXRlLCAnZGRkZCBkZCBtbW0geXl5eScpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==