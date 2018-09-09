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
          'completed ' + (task.completedAt ? (0, _Common.toSimpleDateFormat)(task.completedAt) : '')
        );
      }
      return _react2.default.createElement(
        'p',
        { className: 'complete-within-date' },
        'to complete within ' + (task.todoWithin ? (0, _Common.toSimpleDateFormat)(task.todoWithin) : 'not set')
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
                'No description to show :('
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
      // DialogAdd.preload();
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
            placeholder: 'Type the name',
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
            'ADD'
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

/***/ "./src/components/dialogAdd/AddTodoArgument.jsx":
/*!******************************************************!*\
  !*** ./src/components/dialogAdd/AddTodoArgument.jsx ***!
  \******************************************************/
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

var AddTodoArgument = function (_React$Component) {
  _inherits(AddTodoArgument, _React$Component);

  function AddTodoArgument() {
    _classCallCheck(this, AddTodoArgument);

    var _this = _possibleConstructorReturn(this, (AddTodoArgument.__proto__ || Object.getPrototypeOf(AddTodoArgument)).call(this));

    _this.state = {
      title: '',
      description: ''
    };
    _this.onInputTextChange = _this.onInputTextChange.bind(_this);
    _this.onButtonScheduleClick = _this.onButtonScheduleClick.bind(_this);
    return _this;
  }

  _createClass(AddTodoArgument, [{
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
          'Add new ARGUMENT'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'for the category:',
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
            placeholder: 'Type the title',
            onChange: this.onInputTextChange('title')
          }),
          _react2.default.createElement('input', {
            className: 'main-input',
            type: 'text',
            placeholder: 'Type the description',
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
            'SCHEDULE'
          )
        )
      );
    }
  }]);

  return AddTodoArgument;
}(_react2.default.Component);

AddTodoArgument.propTypes = {
  dispatch: _propTypes2.default.func.isRequired,
  options: _propTypes2.default.shape({
    selectedCategory: _propTypes2.default.shape({
      id: _propTypes2.default.string.isRequired,
      name: _propTypes2.default.string.isRequired
    }).isRequired
  }).isRequired,
  onNext: _propTypes2.default.func.isRequired
};

exports.default = (0, _reactRedux.connect)()(AddTodoArgument);

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

var _AddTodoArgument = __webpack_require__(/*! ./AddTodoArgument */ "./src/components/dialogAdd/AddTodoArgument.jsx");

var _AddTodoArgument2 = _interopRequireDefault(_AddTodoArgument);

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
      return _react2.default.createElement(_AddTodoArgument2.default, _extends({}, props, { options: lastStep.options }));
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
          'Done!'
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectActionAdd = function SelectActionAdd(_ref) {
  var onNext = _ref.onNext;
  return _react2.default.createElement(
    'div',
    { className: 'content-select-action-add' },
    _react2.default.createElement(
      'h2',
      null,
      'What would you like to add?'
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
        'CATEGORY'
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
        'ARGUMENT'
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
            'NEXT'
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
            'ADD'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy9tZXNzYWdlQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMvdG9kb1Rhc2tzQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CdXR0b25Db21wbGV0ZUFyZ3VtZW50LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CdXR0b25EZWxldGVBcmd1bWVudC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQnV0dG9uRGVsZXRlQ2F0ZWdvcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0J1dHRvblNjb2xsLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYXRlZ29yaWVzRmlsdGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYXRlZ29yeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvSW5maW5pdGVTY3JvbGwuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL01haW5BZGRCdXR0b24uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1NuYWNrYmFyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9UYXNrLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9UYXNrcy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVG9kb3MuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Zpc2liaWxpdHlGaWx0ZXJzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9WaXNpYmlsaXR5U3dpdGNoLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9Db2xsYXBzZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvRGlhbG9nQW5pbS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvUmVwbGFjZUFuaW0uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FuaW1zL1Jlc2l6ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvU25hY2tiYXJBbmltLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2dBZGQvQWRkQ2F0ZWdvcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9BZGRUb2RvQXJndW1lbnQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9EaWFsb2dBZGQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9Eb25lLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2dBZGQvU2VsZWN0QWN0aW9uQWRkLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kaWFsb2dBZGQvU2VsZWN0Q2F0ZWdvcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9TZWxlY3RDb21wbGV0ZURhdGUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9TdGVwcy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy9sYWJlbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy9zdGVwcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9DYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9UYXNrc0NvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvVG9kb3NDb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL1Zpc2liaWxpdHlGaWx0ZXJDb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9zZWxlY3RvcnMvY29tbW9uU2VsZWN0b3JzLmpzIiwid2VicGFjazovLy8uL3NyYy9zZWxlY3RvcnMvdG9kb0ZpbHRlcnNTZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy90b2RvVGFza3NTZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL0FwaVV0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9Db21tb24uanMiXSwibmFtZXMiOlsic2hvd01lc3NhZ2VJbmZvIiwidHlwZSIsIlNIT1dfTUVTU0FHRV9JTkZPIiwibWVzc2FnZSIsInNob3dNZXNzYWdlRXJyb3IiLCJTSE9XX01FU1NBR0VfRVJST1IiLCJoaWRlTWVzc2FnZSIsIkhJREVfTUVTU0FHRSIsImZldGNoVGFza3MiLCJzdGF0ZSIsInJlcXVlc3RGZXRjaEFsbENhdGVnb3JpZXMiLCJSRVFVRVNUX0ZFVENIX0FMTF9DQVRFR09SSUVTIiwicmVjZWl2ZUZldGNoQWxsQ2F0ZWdvcmllcyIsIlJFQ0VJVkVfRkVUQ0hfQUxMX0NBVEVHT1JJRVMiLCJjYXRlZ29yaWVzIiwiZXJyb3JGZXRjaEFsbENhdGVnb3JpZXMiLCJFUlJPUl9GRVRDSF9BTExfQ0FURUdPUklFUyIsImVycm9yIiwiYWRkQ2F0ZWdvcnlMb2NhbCIsIkFERF9DQVRFR09SWV9MT0NBTCIsImNhdGVnb3J5IiwicmVtb3ZlQ2F0ZWdvcnlMb2NhbCIsIlJFTU9WRV9DQVRFR09SWV9MT0NBTCIsImNhdGVnb3J5SW5kZXgiLCJ0b29nbGVTZWxlY3RDYXRlZ29yeSIsIlRPT0dMRV9TRUxFQ1RfQ0FURUdPUlkiLCJzZWxlY3RlZENhdGVnb3J5IiwidG9vZ2xlU2VsZWN0Q2F0ZWdvcnlBbGwiLCJUT09HTEVfU0VMRUNUX0NBVEVHT1JZX0FMTCIsInN3aXRjaFZpc2liaWxpdHlGaWx0ZXIiLCJTV0lUQ0hfVklTSUJJTElUWV9GSUxURVIiLCJ2aXNpYmlsaXR5IiwiZmV0Y2hBbGxDYXRlZ29yaWVzIiwibGltaXQiLCJxdWVyeUl0ZW1zTGltaXQiLCJza2lwIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsIk1ldGhvZHMiLCJHRVQiLCJyZXNwb25zZSIsInN1Y2Nlc3MiLCJkYXRhIiwibWVzc2FnZUVycm9yIiwiZGVsZXRlQ2F0ZWdvcnkiLCJjYXRlZ29yeUlkIiwiREVMRVRFIiwidG9kb0ZpbHRlcnMiLCJmaW5kSW5kZXgiLCJpZCIsImFkZENhdGVnb3J5IiwibmFtZSIsImNhbGxiYWNrIiwidW5kZWZpbmVkIiwiUE9TVCIsImNoYW5nZVZpc2liaWxpdHkiLCJzZWxlY3RDYXRlZ29yeSIsInNlbGVjdENhdGVnb3J5QWxsIiwicmVxdWVzdEZldGNoVGFza3MiLCJSRVFVRVNUX0ZFVENIX1RBU0tTIiwicmVjZWl2ZUZldGNoVGFza3MiLCJSRUNFSVZFX0ZFVENIX1RBU0tTIiwidGFza3MiLCJlcnJvckZldGNoVGFza3MiLCJFUlJPUl9GRVRDSF9UQVNLUyIsImFkZFRhc2tMb2NhbCIsIkFERF9UQVNLX0xPQ0FMIiwidGFzayIsInJlbW92ZVRhc2tMb2NhbCIsIlJFTU9WRV9UQVNLX0xPQ0FMIiwidGFza0luZGV4IiwidXBkYXRlVGFza0xvY2FsIiwiVVBEQVRFX1RBU0tfTE9DQUwiLCJmZXRjaFRhc2tzQnlDYXRlZ29yeSIsImNhdGVnb3JpZXNJZCIsImNvbXBsZXRlZCIsInRvZG9zIiwibWFwIiwidG9kbyIsImNvbXBsZXRlZEF0IiwiRGF0ZSIsInRvZG9XaXRoaW4iLCJkZWxldGVUYXNrIiwiaXRlbXMiLCJ0b2RvVGFza3MiLCJ0b2RvQXJndW1lbnRJbmRleCIsInRvZG9Bcmd1bWVudCIsImFkZFRhc2siLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwidG9vZ2xlVGFza0NvbXBsZXRlZCIsImlzQ29tcGxldGVkIiwiUEFUQ0giLCJCdXR0b25Db21wbGV0ZUFyZ3VtZW50Iiwib25DbGljayIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiYm9vbCIsImRlZmF1bHRQcm9wcyIsIkJ1dHRvbkRlbGV0ZUFyZ3VtZW50IiwiQnV0dG9uRGVsZXRlQ2F0ZWdvcnkiLCJCdXR0b25TY3JvbGwiLCJkaXJlY3Rpb24iLCJvbmVPZiIsIkNhdGVnb3JpZXNGaWx0ZXIiLCJwcm9wcyIsImNoaXBzIiwiaGFuZGxlTGVmdFNjcm9sbENsaWNrIiwiYmluZCIsImhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2siLCJtb3ZlQ2hpcHNTY3JvbGwiLCJjbGllbnRXaWR0aCIsImRlbHRhIiwibmV4dFNjcm9sbExlZnQiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsIiwibGVmdCIsImNhdGVnb3J5TGlzdCIsIm9uRGVsZXRlQ2F0ZWdvcnkiLCJvbkNpbGNrQ2F0ZWdvcnkiLCJub2RlIiwiZGlzcGxheSIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0Iiwic2VsZWN0ZWQiLCJSZWFjdCIsIkNvbXBvbmVudCIsImFycmF5T2YiLCJzaGFwZSIsInN0cmluZyIsIkNhdGVnb3J5Iiwib25EZWxldGUiLCJjc3NDbGFzcyIsIm9uQ2hpcENsaWNrIiwiZSIsIm9uRGVsZXRlQ2xpY2siLCJ3YWl0VGltZSIsIkluZmluaXRlU2Nyb2xsIiwib25TY3JvbGwiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImlubmVySGVpZ2h0Iiwic2Nyb2xsWSIsImRvY3VtZW50IiwiYm9keSIsIm9mZnNldEhlaWdodCIsImFyZ3MiLCJjaGlsZHJlbiIsImNsYXNzTmFtZSIsImFueSIsIk1haW5BZGRCdXR0b24iLCJBY3Rpb24iLCJ0ZXh0IiwiU25hY2tiYXIiLCJvbkNsb3NlIiwiZHVyYXRpb24iLCJzaG93Iiwic2V0VGltZW91dCIsImlzRXJyb3IiLCJhY3Rpb25UZXh0IiwiYWN0aW9uQ2xpY2siLCJ2ZXJ0aWNhbFBvc3Rpb24iLCJob3Jpem9udGFsUG9zaXRpb24iLCJudW1iZXIiLCJUYXNrIiwiY29sbGFwc2VkIiwicmVuZGVyRGF0ZSIsInNldFN0YXRlIiwib25Db21wbGV0ZSIsIm9uVGl0bGVDbGljayIsImluaXRpYWxTdGF0ZSIsIlRhc2tzIiwib25GZXRjaFRvZG9Bcmd1bWVudHNOZXh0IiwibW9yZVRvTG9hZCIsIm5ld1NraXAiLCJ0YXNrTGlzdCIsIm9uRGVsZXRlQXJndW1lbnQiLCJvbkNvbXBsZXRlQXJndW1lbnQiLCJhcmciLCJuZXh0UHJvcHMiLCJwcmV2U3RhdGUiLCJUb2RvcyIsImlzRGlhbG9nQWRkT3BlbiIsImluaXRGZXRjaEFsbENhdGVnb3JpZXMiLCJzaG93TG9hZGluZyIsIlZpc2liaWxpdHlGaWx0ZXIiLCJzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIiLCJvblZpc2liaWxpdHlTd2l0Y2hDbGljayIsIk9OTFlfVE9fQ09NUExFVEUiLCJBTExfVE9ET1MiLCJPTkxZX0NPTVBMRVRFRCIsIlZpc2liaWxpdHlTd2l0Y2giLCJkZWZhdWx0U3R5bGUiLCJ0cmFuc2l0aW9uIiwiaGVpZ2h0Iiwib25FbnRlciIsInN0eWxlIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJvbkV4aXQiLCJDb2xsYXBzZSIsImluUHJvcCIsImluIiwib3BhY2l0eSIsInRyYW5zaXRpb25TdHlsZXMiLCJlbnRlcmluZyIsImVudGVyZWQiLCJEaWFsb2dBbmltIiwid2lkdGgiLCJlbnRlciIsIlJlcGxhY2VBbmltIiwiZW5kTGlzdGVuZXIiLCJleGl0Iiwib25FbnRlcmVkIiwib25FeGl0ZWQiLCJSZXNpemUiLCJib3R0b20iLCJTbmFja2JhckFuaW0iLCJjdXN0b21DbGFzcyIsIkFkZENhdGVnb3J5Iiwib25JbnB1dFRleHRDaGFuZ2UiLCJvbkJ1dHRvbkFkZENsaWNrIiwib25DYXRlZ29yeUNyZWF0ZWQiLCJ0YXJnZXQiLCJ2YWx1ZSIsImxhYmVscyIsIm1zZ05hbWVSZXF1aXJlZCIsIm9uTmV4dCIsInN0ZXBJZCIsIkFERF9BUkdVTUVOVCIsIm9wdGlvbnMiLCJBZGRUb2RvQXJndW1lbnQiLCJvbkJ1dHRvblNjaGVkdWxlQ2xpY2siLCJtc2dUaXRsZVJlcXVpcmVkIiwiU0VMRUNUX0NPTVBMRVRFX0RBVEUiLCJnZXRDb250ZW50VG9SZW5kZXIiLCJzdGVwcyIsImxlbmd0aCIsImxhc3RTdGVwIiwiU0VMRUNUX1dBTlRfVE9fQUREIiwiQUREX0NBVEVHT1JZIiwiU0VMRUNUX0NBVEVHT1JZIiwiRE9ORSIsImluaXRhbFN0YXRlIiwibmV4dFN0ZXBzIiwic2hvd1N0ZXAiLCJEaWFsb2dBZGQiLCJvbkJhY2siLCJvblJlc2V0QW5kQ2xvc2UiLCJvbkFuaW1hdGlvbkVuZCIsInN0ZXBDb3VudCIsInNsaWNlIiwic3RlcCIsImNvbXBsZXRlIiwiZG9uZSIsIm9wZW4iLCJzdGVwTGlzdCIsIkRvbmUiLCJTZWxlY3RBY3Rpb25BZGQiLCJTZWxlY3RDYXRlZ29yeSIsIm9uQ2F0ZWdvcnlDbGljayIsIm9uQnV0dG9uTmV4dENsaWNrIiwibXNnU2VsZWN0Q2F0ZWdvcnkiLCJjYXRlZ29yaWVzTGlzdCIsIm1hcFN0YXRlVG9Qcm9wIiwiU2VsZWN0Q29tcGxldGVEYXRlIiwib25JbnB1dERhdGVDaGFuZ2UiLCJvblRvZG9Bcmd1bWVudENyZWF0ZWQiLCJkYXRlIiwibXNnU2VsZWN0RGF0ZSIsIlN0ZXAiLCJuZWVkTGluZSIsIlN0ZXBzIiwibGlzdCIsInN0ZXBIaXN0b3J5IiwiaXRlbSIsImkiLCJmaWx0ZXIiLCJzaCIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImNhdGVnb3J5QWxsIiwiQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lciIsIlRhc2tzQ29udGFpbmVyIiwiVG9kb3NDb250YWluZXIiLCJWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyIiwiVmlzaWJpbGl0eUZpbHRlcnMiLCJpc0ZldGNoaW5nQ2F0ZWdvcmllc0ZpbHRlciIsImlzRmV0Y2hpbmdUYXNrcyIsImlzRmV0Y2hpbmdDYXRlZ29yaWVzIiwiaXNGZXRjaGluZ1RvZG9zIiwiaXNGZXRjaGluZyIsImdldFRvZG9GaWx0ZXJzIiwiZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QiLCJnZXRWaXNpYmlsaXR5RmlsdGVyIiwidmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQiLCJnZXRTZWxlY3RlZENhdGVnb3JpZXNGaWx0ZXIiLCJnZXRTZWxlY3RlZENhdGVnb3JpZXNJZCIsImNhdGVnb3J5RmlsdGVyIiwiZ2V0VGFza3MiLCJnZXRUYXNrTGlzdCIsImdldFNraXAiLCJzdGlsbE1vcmVUb0xvYWQiLCJmdWxsVXJsIiwidXJsIiwiYmFzZVJlcXVlc3RJbml0IiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwiY3JlYXRlUG9zdFJlcXVlc3QiLCJmZXRjaCIsIm1ldGhvZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjcmVhdGVHZXRSZXF1ZXN0IiwiZmluYWxVcmwiLCJPYmplY3QiLCJlbnRyaWVzIiwiZm9yRWFjaCIsInBvaXRpb24iLCJrZXkiLCJjcmVhdGVEZWxldGVSZXF1ZXN0IiwiY3JlYXRlUGF0Y2hSZXF1ZXN0IiwiY3JlYXRlUmVxdWVzdCIsImNhbGxBcGkiLCJ0aGVuIiwib2siLCJqc29uIiwiUHJvbWlzZSIsInJlamVjdCIsInRvSnNEYXRlIiwicGFyc2VEYXRlIiwicGFyc2VJbnQiLCJzdWJzdHIiLCJ0b1NpbXBsZURhdGVGb3JtYXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBTU8sSUFBTUEsNENBQWtCLFNBQWxCQSxlQUFrQjtBQUFBLFNBQzdCO0FBQ0VDLFVBQU1DLDhCQURSO0FBRUVDO0FBRkYsR0FENkI7QUFBQSxDQUF4Qjs7QUFPQSxJQUFNQyw4Q0FBbUIsU0FBbkJBLGdCQUFtQjtBQUFBLFNBQzlCO0FBQ0VILFVBQU1JLCtCQURSO0FBRUVGO0FBRkYsR0FEOEI7QUFBQSxDQUF6Qjs7QUFPQSxJQUFNRyxvQ0FBYyxTQUFkQSxXQUFjO0FBQUEsU0FDekI7QUFDRUwsVUFBTU07QUFEUixHQUR5QjtBQUFBLENBQXBCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQlA7O0FBQ0E7O0FBVUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJ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a0RBQXFCLFNBQXJCQSxrQkFBcUI7QUFBQSxTQUNoQywwQkFBV25FLElBQVgsRUFBaUIsa0JBQWpCLENBRGdDO0FBQUEsQ0FBM0IsQyIsImZpbGUiOiJ0b2Rvcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFNIT1dfTUVTU0FHRV9JTkZPLFxuICBTSE9XX01FU1NBR0VfRVJST1IsXG4gIEhJREVfTUVTU0FHRSxcbn0gZnJvbSAnLi4vY29uc3RhbnRzL2FjdGlvblR5cGVzJztcblxuZXhwb3J0IGNvbnN0IHNob3dNZXNzYWdlSW5mbyA9IG1lc3NhZ2UgPT4gKFxuICB7XG4gICAgdHlwZTogU0hPV19NRVNTQUdFX0lORk8sXG4gICAgbWVzc2FnZSxcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IHNob3dNZXNzYWdlRXJyb3IgPSBtZXNzYWdlID0+IChcbiAge1xuICAgIHR5cGU6IFNIT1dfTUVTU0FHRV9FUlJPUixcbiAgICBtZXNzYWdlLFxuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgaGlkZU1lc3NhZ2UgPSAoKSA9PiAoXG4gIHtcbiAgICB0eXBlOiBISURFX01FU1NBR0UsXG4gIH1cbik7XG4iLCJpbXBvcnQgeyBjYWxsQXBpLCBNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvQXBpVXRpbHMnO1xuaW1wb3J0IHtcbiAgUkVRVUVTVF9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgUkVDRUlWRV9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgRVJST1JfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gIEFERF9DQVRFR09SWV9MT0NBTCxcbiAgUkVNT1ZFX0NBVEVHT1JZX0xPQ0FMLFxuICBUT09HTEVfU0VMRUNUX0NBVEVHT1JZLFxuICBUT09HTEVfU0VMRUNUX0NBVEVHT1JZX0FMTCxcbiAgU1dJVENIX1ZJU0lCSUxJVFlfRklMVEVSLFxufSBmcm9tICcuLi9jb25zdGFudHMvYWN0aW9uVHlwZXMnO1xuaW1wb3J0IHsgcXVlcnlJdGVtc0xpbWl0IH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5pbXBvcnQgeyBmZXRjaFRhc2tzQnlDYXRlZ29yeSB9IGZyb20gJy4vdG9kb1Rhc2tzQWN0aW9ucyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUVycm9yIH0gZnJvbSAnLi9tZXNzYWdlQWN0aW9ucyc7XG5pbXBvcnQgeyBnZXRTZWxlY3RlZENhdGVnb3JpZXNJZCwgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuXG5jb25zdCBmZXRjaFRhc2tzID0gc3RhdGUgPT4gZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkoXG4gIGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkKHN0YXRlKSxcbiAgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQoc3RhdGUpLFxuKTtcblxuY29uc3QgcmVxdWVzdEZldGNoQWxsQ2F0ZWdvcmllcyA9ICgpID0+IChcbiAge1xuICAgIHR5cGU6IFJFUVVFU1RfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gIH1cbik7XG5cbmNvbnN0IHJlY2VpdmVGZXRjaEFsbENhdGVnb3JpZXMgPSBjYXRlZ29yaWVzID0+IChcbiAge1xuICAgIHR5cGU6IFJFQ0VJVkVfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gICAgY2F0ZWdvcmllcyxcbiAgfVxuKTtcblxuY29uc3QgZXJyb3JGZXRjaEFsbENhdGVnb3JpZXMgPSBlcnJvciA9PiAoXG4gIHtcbiAgICB0eXBlOiBFUlJPUl9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgICBlcnJvcixcbiAgfVxuKTtcblxuY29uc3QgYWRkQ2F0ZWdvcnlMb2NhbCA9IGNhdGVnb3J5ID0+IChcbiAge1xuICAgIHR5cGU6IEFERF9DQVRFR09SWV9MT0NBTCxcbiAgICBjYXRlZ29yeSxcbiAgfVxuKTtcblxuY29uc3QgcmVtb3ZlQ2F0ZWdvcnlMb2NhbCA9IGNhdGVnb3J5SW5kZXggPT4gKFxuICB7XG4gICAgdHlwZTogUkVNT1ZFX0NBVEVHT1JZX0xPQ0FMLFxuICAgIGNhdGVnb3J5SW5kZXgsXG4gIH1cbik7XG5cbmNvbnN0IHRvb2dsZVNlbGVjdENhdGVnb3J5ID0gc2VsZWN0ZWRDYXRlZ29yeSA9PiAoXG4gIHtcbiAgICB0eXBlOiBUT09HTEVfU0VMRUNUX0NBVEVHT1JZLFxuICAgIHNlbGVjdGVkQ2F0ZWdvcnksXG4gIH1cbik7XG5cbmNvbnN0IHRvb2dsZVNlbGVjdENhdGVnb3J5QWxsID0gKCkgPT4gKFxuICB7XG4gICAgdHlwZTogVE9PR0xFX1NFTEVDVF9DQVRFR09SWV9BTEwsXG4gIH1cbik7XG5cbmNvbnN0IHN3aXRjaFZpc2liaWxpdHlGaWx0ZXIgPSB2aXNpYmlsaXR5ID0+IChcbiAge1xuICAgIHR5cGU6IFNXSVRDSF9WSVNJQklMSVRZX0ZJTFRFUixcbiAgICB2aXNpYmlsaXR5LFxuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgZmV0Y2hBbGxDYXRlZ29yaWVzID0gKGxpbWl0ID0gcXVlcnlJdGVtc0xpbWl0LCBza2lwID0gMCkgPT5cbiAgYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGRpc3BhdGNoKHJlcXVlc3RGZXRjaEFsbENhdGVnb3JpZXMoKSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbEFwaSgnY2F0ZWdvcmllcycsIHsgbGltaXQsIHNraXAgfSwgTWV0aG9kcy5HRVQpO1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgZGlzcGF0Y2gocmVjZWl2ZUZldGNoQWxsQ2F0ZWdvcmllcyhyZXNwb25zZS5kYXRhKSk7XG4gICAgICAgIGRpc3BhdGNoKGZldGNoVGFza3NCeUNhdGVnb3J5KGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkKGdldFN0YXRlKCkpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwYXRjaChlcnJvckZldGNoQWxsQ2F0ZWdvcmllcyhyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gICAgfVxuICB9O1xuXG5leHBvcnQgY29uc3QgZGVsZXRlQ2F0ZWdvcnkgPSAoY2F0ZWdvcnlJZCA9ICcnKSA9PiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBjYWxsQXBpKCdjYXRlZ29yaWVzJywgY2F0ZWdvcnlJZCwgTWV0aG9kcy5ERUxFVEUpO1xuICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICBjb25zdCB7IGNhdGVnb3JpZXMgfSA9IGdldFN0YXRlKCkudG9kb0ZpbHRlcnM7XG4gICAgICBjb25zdCBjYXRlZ29yeUluZGV4ID0gY2F0ZWdvcmllcy5maW5kSW5kZXgoY2F0ZWdvcnkgPT4gY2F0ZWdvcnkuaWQgPT09IGNhdGVnb3J5SWQpO1xuICAgICAgZGlzcGF0Y2gocmVtb3ZlQ2F0ZWdvcnlMb2NhbChjYXRlZ29yeUluZGV4KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG59O1xuXG4vKipcbiAqIFJlcXVlc3QgdG8gYWRkIGEgY2F0ZWdvcnlcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIGNhdGVnb3J5IG5hbWUgdG8gYWRkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IG5lZWQgdG8gaGFuZGxlIHRoZSBjYXRlZ29yeSBjcmVhdGVkXG4gKi9cbmV4cG9ydCBjb25zdCBhZGRDYXRlZ29yeSA9IChuYW1lID0gJycsIGNhbGxiYWNrID0gdW5kZWZpbmVkKSA9PiBhc3luYyAoZGlzcGF0Y2gpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoJ2NhdGVnb3JpZXMnLCB7IG5hbWUgfSwgTWV0aG9kcy5QT1NUKTtcbiAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgZGlzcGF0Y2goYWRkQ2F0ZWdvcnlMb2NhbChyZXNwb25zZS5kYXRhKSk7XG4gICAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjYWxsYmFjayhyZXNwb25zZS5kYXRhKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihlcnJvci5tZXNzYWdlKSlcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNoYW5nZVZpc2liaWxpdHkgPSB2aXNpYmlsaXR5ID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgZGlzcGF0Y2goc3dpdGNoVmlzaWJpbGl0eUZpbHRlcih2aXNpYmlsaXR5KSk7XG4gIHJldHVybiBkaXNwYXRjaChmZXRjaFRhc2tzKGdldFN0YXRlKCkpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RDYXRlZ29yeSA9IHNlbGVjdGVkQ2F0ZWdvcnkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBkaXNwYXRjaCh0b29nbGVTZWxlY3RDYXRlZ29yeShzZWxlY3RlZENhdGVnb3J5KSk7XG4gIHJldHVybiBkaXNwYXRjaChmZXRjaFRhc2tzKGdldFN0YXRlKCkpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RDYXRlZ29yeUFsbCA9ICgpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgZGlzcGF0Y2godG9vZ2xlU2VsZWN0Q2F0ZWdvcnlBbGwoKSk7XG4gIHJldHVybiBkaXNwYXRjaChmZXRjaFRhc2tzKGdldFN0YXRlKCkpKTtcbn07XG4iLCJpbXBvcnQgeyBjYWxsQXBpLCBNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvQXBpVXRpbHMnO1xuaW1wb3J0IHtcbiAgUkVRVUVTVF9GRVRDSF9UQVNLUyxcbiAgUkVDRUlWRV9GRVRDSF9UQVNLUyxcbiAgRVJST1JfRkVUQ0hfVEFTS1MsXG4gIEFERF9UQVNLX0xPQ0FMLFxuICBSRU1PVkVfVEFTS19MT0NBTCxcbiAgVVBEQVRFX1RBU0tfTE9DQUwsXG59IGZyb20gJy4uL2NvbnN0YW50cy9hY3Rpb25UeXBlcyc7XG5pbXBvcnQgeyBxdWVyeUl0ZW1zTGltaXQgfSBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcbmltcG9ydCB7IHNob3dNZXNzYWdlRXJyb3IgfSBmcm9tICcuL21lc3NhZ2VBY3Rpb25zJztcblxuY29uc3QgcmVxdWVzdEZldGNoVGFza3MgPSAobGltaXQsIHNraXApID0+IChcbiAge1xuICAgIHR5cGU6IFJFUVVFU1RfRkVUQ0hfVEFTS1MsXG4gICAgbGltaXQsXG4gICAgc2tpcCxcbiAgfVxuKTtcblxuY29uc3QgcmVjZWl2ZUZldGNoVGFza3MgPSB0YXNrcyA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRUNFSVZFX0ZFVENIX1RBU0tTLFxuICAgIHRhc2tzLFxuICB9XG4pO1xuXG5jb25zdCBlcnJvckZldGNoVGFza3MgPSBlcnJvciA9PiAoXG4gIHtcbiAgICB0eXBlOiBFUlJPUl9GRVRDSF9UQVNLUyxcbiAgICBlcnJvcixcbiAgfVxuKTtcblxuY29uc3QgYWRkVGFza0xvY2FsID0gdGFzayA9PiAoXG4gIHtcbiAgICB0eXBlOiBBRERfVEFTS19MT0NBTCxcbiAgICB0YXNrLFxuICB9XG4pO1xuXG5jb25zdCByZW1vdmVUYXNrTG9jYWwgPSB0YXNrSW5kZXggPT4gKFxuICB7XG4gICAgdHlwZTogUkVNT1ZFX1RBU0tfTE9DQUwsXG4gICAgdGFza0luZGV4LFxuICB9XG4pO1xuXG5jb25zdCB1cGRhdGVUYXNrTG9jYWwgPSB0YXNrID0+IChcbiAge1xuICAgIHR5cGU6IFVQREFURV9UQVNLX0xPQ0FMLFxuICAgIHRhc2ssXG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBmZXRjaFRhc2tzQnlDYXRlZ29yeSA9IChcbiAgY2F0ZWdvcmllc0lkID0gW10sXG4gIGNvbXBsZXRlZCA9IGZhbHNlLFxuICBsaW1pdCA9IHF1ZXJ5SXRlbXNMaW1pdCxcbiAgc2tpcCA9IDAsXG4pID0+IGFzeW5jIChkaXNwYXRjaCkgPT4ge1xuICBkaXNwYXRjaChyZXF1ZXN0RmV0Y2hUYXNrcyhsaW1pdCwgc2tpcCkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBcGkoJ3Rhc2tzJywge1xuICAgIGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgc2tpcCxcbiAgfSwgTWV0aG9kcy5HRVQpO1xuICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgIGNvbnN0IHRvZG9zID0gcmVzcG9uc2UuZGF0YS5tYXAodG9kbyA9PlxuICAgICAgKHtcbiAgICAgICAgLi4udG9kbyxcbiAgICAgICAgY29tcGxldGVkQXQ6ICh0b2RvLmNvbXBsZXRlZEF0KSA/IG5ldyBEYXRlKHRvZG8uY29tcGxldGVkQXQpIDogdW5kZWZpbmVkLFxuICAgICAgICB0b2RvV2l0aGluOiAodG9kby50b2RvV2l0aGluKSA/IG5ldyBEYXRlKHRvZG8udG9kb1dpdGhpbikgOiB1bmRlZmluZWQsXG4gICAgICB9KSk7XG4gICAgZGlzcGF0Y2gocmVjZWl2ZUZldGNoVGFza3ModG9kb3MpKTtcbiAgfSBlbHNlIHtcbiAgICBkaXNwYXRjaChlcnJvckZldGNoVGFza3MocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBkZWxldGVUYXNrID0gKGlkID0gJycpID0+IGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKCd0YXNrcycsIGlkLCBNZXRob2RzLkRFTEVURSk7XG4gIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgY29uc3QgeyBpdGVtcyB9ID0gZ2V0U3RhdGUoKS50b2RvVGFza3M7XG4gICAgY29uc3QgdG9kb0FyZ3VtZW50SW5kZXggPSBpdGVtcy5maW5kSW5kZXgodG9kb0FyZ3VtZW50ID0+XG4gICAgICB0b2RvQXJndW1lbnQuaWQgPT09IGlkKTtcbiAgICBkaXNwYXRjaChyZW1vdmVUYXNrTG9jYWwodG9kb0FyZ3VtZW50SW5kZXgpKTtcbiAgfSBlbHNlIHtcbiAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLm1lc3NhZ2VFcnJvcikpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgYWRkVGFzayA9ICh0aXRsZSA9ICcnLCBkZXNjcmlwdGlvbiA9ICcnLCBjYXRlZ29yeSA9IHsgaWQ6ICcnIH0sIHRvZG9XaXRoaW4sIGNhbGxiYWNrID0gdW5kZWZpbmVkKSA9PiBhc3luYyAoZGlzcGF0Y2gpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKFxuICAgICd0YXNrcycsXG4gICAge1xuICAgICAgdGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5LmlkLFxuICAgICAgdG9kb1dpdGhpbixcbiAgICB9LFxuICAgIE1ldGhvZHMuUE9TVCxcbiAgKTtcbiAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICBjb25zdCB0b2RvID0ge1xuICAgICAgLi4ucmVzcG9uc2UuZGF0YSxcbiAgICAgIGNvbXBsZXRlZEF0OiAocmVzcG9uc2UuZGF0YS5jb21wbGV0ZWRBdClcbiAgICAgICAgPyBuZXcgRGF0ZShyZXNwb25zZS5kYXRhLmNvbXBsZXRlZEF0KSA6IHVuZGVmaW5lZCxcbiAgICAgIHRvZG9XaXRoaW46IChyZXNwb25zZS5kYXRhLnRvZG9XaXRoaW4pXG4gICAgICAgID8gbmV3IERhdGUocmVzcG9uc2UuZGF0YS50b2RvV2l0aGluKSA6IHVuZGVmaW5lZCxcbiAgICB9O1xuICAgIGRpc3BhdGNoKGFkZFRhc2tMb2NhbCh0b2RvKSk7XG4gICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB0b29nbGVUYXNrQ29tcGxldGVkID0gKGlkID0gJycsIGlzQ29tcGxldGVkID0gZmFsc2UpID0+IGFzeW5jIChkaXNwYXRjaCkgPT4ge1xuICBjb25zdCBjb21wbGV0ZWQgPSAhaXNDb21wbGV0ZWQ7XG4gIGNvbnN0IGNvbXBsZXRlZEF0ID0gKGNvbXBsZXRlZCkgPyBuZXcgRGF0ZSgpIDogbnVsbDtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXBpKCd0YXNrcycsIHsgaWQsIGNvbXBsZXRlZCwgY29tcGxldGVkQXQgfSwgTWV0aG9kcy5QQVRDSCk7XG4gIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgY29uc3QgdG9kbyA9IHtcbiAgICAgIC4uLnJlc3BvbnNlLmRhdGEsXG4gICAgICBjb21wbGV0ZWRBdDogKHJlc3BvbnNlLmRhdGEuY29tcGxldGVkQXQpXG4gICAgICAgID8gbmV3IERhdGUocmVzcG9uc2UuZGF0YS5jb21wbGV0ZWRBdCkgOiB1bmRlZmluZWQsXG4gICAgfTtcbiAgICBkaXNwYXRjaCh1cGRhdGVUYXNrTG9jYWwodG9kbykpO1xuICB9IGVsc2Uge1xuICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgQnV0dG9uQ29tcGxldGVBcmd1bWVudCA9ICh7IG9uQ2xpY2ssIGNvbXBsZXRlZCB9KSA9PiAoXG4gIDxidXR0b25cbiAgICBjbGFzc05hbWU9e2BidXR0b24tY29tcGxldGUtYXJndW1lbnQgJHsoY29tcGxldGVkKSA/ICdidXR0b24tY29tcGxldGVkLWFyZ3VtZW50JyA6ICcnfWB9XG4gICAgb25DbGljaz17b25DbGlja31cbiAgPlxuICAgIDxpIGNsYXNzTmFtZT1cImljb24tY2hlY2tcIiAvPlxuICA8L2J1dHRvbj5cbik7XG5cbkJ1dHRvbkNvbXBsZXRlQXJndW1lbnQucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLFxufTtcblxuQnV0dG9uQ29tcGxldGVBcmd1bWVudC5kZWZhdWx0UHJvcHMgPSB7XG4gIGNvbXBsZXRlZDogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25Db21wbGV0ZUFyZ3VtZW50O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEJ1dHRvbkRlbGV0ZUFyZ3VtZW50ID0gKHsgb25DbGljayB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLWRlbGV0ZS1hcmd1bWVudFwiIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIDxpIGNsYXNzTmFtZT1cImljb24tZGVsZXRlXCIgLz5cbiAgPC9idXR0b24+XG4pO1xuXG5CdXR0b25EZWxldGVBcmd1bWVudC5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25EZWxldGVBcmd1bWVudDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdXR0b25EZWxldGVDYXRlZ29yeSA9ICh7IG9uQ2xpY2sgfSkgPT4gKFxuICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvbi1kZWxldGUtY2F0ZWdvcnlcIiBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICA8aSBjbGFzc05hbWU9XCJpY29uLWRlbGV0ZVwiIC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uRGVsZXRlQ2F0ZWdvcnkucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uRGVsZXRlQ2F0ZWdvcnk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgQnV0dG9uU2Nyb2xsID0gKHsgb25DbGljaywgZGlyZWN0aW9uIH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9e2BidXR0b24tc2Nyb2xsICR7ZGlyZWN0aW9ufWB9IG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIDxpIGNsYXNzTmFtZT17KGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSA/ICdpY29uLWJhY2t3YXJkJyA6ICdpY29uLWZvcndhcmQnfSAvPlxuICA8L2J1dHRvbj5cbik7XG5cbkJ1dHRvblNjcm9sbC5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGRpcmVjdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnbGVmdCcsICdyaWdodCddKSxcbn07XG5cbkJ1dHRvblNjcm9sbC5kZWZhdWx0UHJvcHMgPSB7XG4gIGRpcmVjdGlvbjogJ2xlZnQnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uU2Nyb2xsO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uR3JvdXAgfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcbmltcG9ydCBzY3JvbGwgZnJvbSAnc2Nyb2xsJztcbmltcG9ydCBCdXR0b25TY3JvbGwgZnJvbSAnLi9CdXR0b25TY29sbCc7XG5pbXBvcnQgQ2F0ZWdvcnkgZnJvbSAnLi9DYXRlZ29yeSc7XG5pbXBvcnQgRmFkZSBmcm9tICcuL2FuaW1zL0ZhZGUnO1xuXG5jbGFzcyBDYXRlZ29yaWVzRmlsdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5jaGlwcyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmhhbmRsZUxlZnRTY3JvbGxDbGljayA9IHRoaXMuaGFuZGxlTGVmdFNjcm9sbENsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVSaWdodFNjcm9sbENsaWNrID0gdGhpcy5oYW5kbGVSaWdodFNjcm9sbENsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5tb3ZlQ2hpcHNTY3JvbGwgPSB0aGlzLm1vdmVDaGlwc1Njcm9sbC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaGFuZGxlTGVmdFNjcm9sbENsaWNrKCkge1xuICAgIGlmICh0aGlzLmNoaXBzKSB7XG4gICAgICB0aGlzLm1vdmVDaGlwc1Njcm9sbCgtdGhpcy5jaGlwcy5jbGllbnRXaWR0aCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUmlnaHRTY3JvbGxDbGljaygpIHtcbiAgICBpZiAodGhpcy5jaGlwcykge1xuICAgICAgdGhpcy5tb3ZlQ2hpcHNTY3JvbGwodGhpcy5jaGlwcy5jbGllbnRXaWR0aCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUNoaXBzU2Nyb2xsKGRlbHRhKSB7XG4gICAgaWYgKHRoaXMuY2hpcHMpIHtcbiAgICAgIGNvbnN0IG5leHRTY3JvbGxMZWZ0ID0gdGhpcy5jaGlwcy5zY3JvbGxMZWZ0ICsgZGVsdGE7XG4gICAgICBzY3JvbGwubGVmdCh0aGlzLmNoaXBzLCBuZXh0U2Nyb2xsTGVmdCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2F0ZWdvcnlMaXN0LCBvbkRlbGV0ZUNhdGVnb3J5LCBvbkNpbGNrQ2F0ZWdvcnkgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJjb250ZW50LWNhdGVnb3JpZXMtZmlsdGVyXCI+XG4gICAgICAgIDxCdXR0b25TY3JvbGxcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUxlZnRTY3JvbGxDbGlja31cbiAgICAgICAgICBkaXJlY3Rpb249XCJsZWZ0XCJcbiAgICAgICAgLz5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cImNhdGVnb3JpZXMtZmlsdGVyXCJcbiAgICAgICAgICByZWY9eyhub2RlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoaXBzID0gbm9kZTtcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPFRyYW5zaXRpb25Hcm91cCBzdHlsZT17eyBkaXNwbGF5OiAnaW5oZXJpdCcsIHBhZGRpbmdMZWZ0OiAnMS4yNWVtJywgcGFkZGluZ1JpZ2h0OiAnMS4yNWVtJyB9fT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2F0ZWdvcnlMaXN0Lm1hcChjYXRlZ29yeSA9PiAoXG4gICAgICAgICAgICAgICAgPEZhZGUga2V5PXtjYXRlZ29yeS5pZH0+XG4gICAgICAgICAgICAgICAgICA8Q2F0ZWdvcnlcbiAgICAgICAgICAgICAgICAgICAga2V5PXtjYXRlZ29yeS5pZH1cbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk9e2NhdGVnb3J5fVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17Y2F0ZWdvcnkuc2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlPXtvbkRlbGV0ZUNhdGVnb3J5fVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNpbGNrQ2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvRmFkZT5cbiAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L1RyYW5zaXRpb25Hcm91cD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxCdXR0b25TY3JvbGxcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2t9XG4gICAgICAgICAgZGlyZWN0aW9uPVwicmlnaHRcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5DYXRlZ29yaWVzRmlsdGVyLnByb3BUeXBlcyA9IHtcbiAgY2F0ZWdvcnlMaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICBvbkRlbGV0ZUNhdGVnb3J5OiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DaWxja0NhdGVnb3J5OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuQ2F0ZWdvcmllc0ZpbHRlci5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uRGVsZXRlQ2F0ZWdvcnk6IHVuZGVmaW5lZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENhdGVnb3JpZXNGaWx0ZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBCdXR0b25EZWxldGVDYXRlZ29yeSBmcm9tICcuL0J1dHRvbkRlbGV0ZUNhdGVnb3J5JztcblxuY29uc3QgQ2F0ZWdvcnkgPSAoe1xuICBjYXRlZ29yeSwgc2VsZWN0ZWQsIG9uQ2xpY2ssIG9uRGVsZXRlLFxufSkgPT4ge1xuICBsZXQgY3NzQ2xhc3MgPSAnJztcblxuICBjb25zdCBvbkNoaXBDbGljayA9IChlKSA9PiB7XG4gICAgb25DbGljayhjYXRlZ29yeSwgZSk7XG4gIH07XG4gIGNvbnN0IG9uRGVsZXRlQ2xpY2sgPSAoKSA9PiB7XG4gICAgb25EZWxldGUoY2F0ZWdvcnkpO1xuICB9O1xuXG4gIGlmIChzZWxlY3RlZCkge1xuICAgIGNzc0NsYXNzID0gJ2NhdGVnb3J5LXNlbGVjdGVkJztcbiAgfVxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17YCR7Y3NzQ2xhc3N9IGNhdGVnb3J5LWNoaXAgYWxpZ24taXRlbXMtY2VudGVyYH1cbiAgICAgIG9uQ2xpY2s9e29uQ2hpcENsaWNrfVxuICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2F0ZWdvcnktdGV4dFwiPntjYXRlZ29yeS5uYW1lfTwvc3Bhbj5cbiAgICAgIHtcbiAgICAgICAgKGNhdGVnb3J5LmlkICE9PSAnMCcgJiYgb25EZWxldGUgIT09IHVuZGVmaW5lZCkgJiZcbiAgICAgICAgICA8QnV0dG9uRGVsZXRlQ2F0ZWdvcnkgb25DbGljaz17b25EZWxldGVDbGlja30gLz5cbiAgICAgIH1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbkNhdGVnb3J5LnByb3BUeXBlcyA9IHtcbiAgb25EZWxldGU6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjYXRlZ29yeTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5DYXRlZ29yeS5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uRGVsZXRlOiB1bmRlZmluZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYXRlZ29yeTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tICdsb2Rhc2gnO1xuXG5jb25zdCB3YWl0VGltZSA9IDUwMDtcblxuY2xhc3MgSW5maW5pdGVTY3JvbGwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLm9uU2Nyb2xsID0gdGhpcy5vblNjcm9sbC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRocm90dGxlKHRoaXMub25TY3JvbGwsIHdhaXRUaW1lKSwgZmFsc2UpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRocm90dGxlKHRoaXMub25TY3JvbGwsIHdhaXRUaW1lKSwgZmFsc2UpO1xuICB9XG5cbiAgb25TY3JvbGwoKSB7XG4gICAgaWYgKCh3aW5kb3cuaW5uZXJIZWlnaHQgKyB3aW5kb3cuc2Nyb2xsWSkgPj0gKGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0IC0gMjAwKSkge1xuICAgICAgY29uc3QgeyBhcmdzLCBvblNjcm9sbCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIG9uU2Nyb2xsKC4uLmFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNoaWxkcmVuLCBjbGFzc05hbWUgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkluZmluaXRlU2Nyb2xsLnByb3BUeXBlcyA9IHtcbiAgYXJnczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG9uU2Nyb2xsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuSW5maW5pdGVTY3JvbGwuZGVmYXVsdFByb3BzID0ge1xuICBhcmdzOiBbXSxcbiAgY2xhc3NOYW1lOiAnJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEluZmluaXRlU2Nyb2xsO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IE1haW5BZGRCdXR0b24gPSAoeyBvbkNsaWNrIH0pID0+IChcbiAgPGJ1dHRvbiBpZD1cIm1haW4tYWRkLWJ1dHRvblwiIG9uQ2xpY2s9e29uQ2xpY2t9ID5cbiAgICA8aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPiYjeEUxNDU7PC9pPlxuICA8L2J1dHRvbj5cbik7XG5cbk1haW5BZGRCdXR0b24ucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTWFpbkFkZEJ1dHRvbjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFNuYWNrYmFyQW5pbSBmcm9tICcuL2FuaW1zL1NuYWNrYmFyQW5pbSc7XG5cbmNvbnN0IEFjdGlvbiA9ICh7IG9uQ2xpY2ssIHRleHQgfSkgPT4gKFxuICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvbi1hY3Rpb24tc25hY2tiYXJcIiBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICB7dGV4dH1cbiAgPC9idXR0b24+XG4pO1xuXG5BY3Rpb24ucHJvcFR5cGVzID0ge1xuICB0ZXh0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5jbGFzcyBTbmFja2JhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBjb25zdCB7XG4gICAgICBvbkNsb3NlLCBkdXJhdGlvbiwgc2hvdyxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChzaG93KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgb25DbG9zZSgpO1xuICAgICAgfSwgZHVyYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBtZXNzYWdlLCBpc0Vycm9yLCBhY3Rpb25UZXh0LCBhY3Rpb25DbGljaywgc2hvdyxcbiAgICAgIHZlcnRpY2FsUG9zdGlvbiwgaG9yaXpvbnRhbFBvc2l0aW9uLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8U25hY2tiYXJBbmltIGluPXtzaG93fSBjdXN0b21DbGFzcz17YCR7dmVydGljYWxQb3N0aW9ufSAkeyhob3Jpem9udGFsUG9zaXRpb24pfWB9PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtgc25hY2tiYXIgJHsoaXNFcnJvcikgPyAnZXJyb3InIDogJyd9YH1cbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNuYWNrYmFyLW1lc3NhZ2VcIj57bWVzc2FnZX08L3NwYW4+XG4gICAgICAgICAge1xuICAgICAgICAgICAgKGFjdGlvblRleHQgIT09ICcnICYmIGFjdGlvbkNsaWNrICE9PSB1bmRlZmluZWQpICYmXG4gICAgICAgICAgICAgIDxBY3Rpb24gb25DbGljaz17YWN0aW9uQ2xpY2t9IHRleHQ9e2FjdGlvblRleHR9IC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvU25hY2tiYXJBbmltPlxuICAgICk7XG4gIH1cbn1cblxuU25hY2tiYXIucHJvcFR5cGVzID0ge1xuICBzaG93OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGR1cmF0aW9uOiBQcm9wVHlwZXMubnVtYmVyLFxuICBpc0Vycm9yOiBQcm9wVHlwZXMuYm9vbCxcbiAgYWN0aW9uVGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgYWN0aW9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICB2ZXJ0aWNhbFBvc3Rpb246IFByb3BUeXBlcy5vbmVPZihbJ3RvcCcsICdib3R0b20nXSksXG4gIGhvcml6b250YWxQb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnbGVmdCcsICdyaWdodCddKSxcbn07XG5cblNuYWNrYmFyLmRlZmF1bHRQcm9wcyA9IHtcbiAgZHVyYXRpb246IDUwMDAsXG4gIGlzRXJyb3I6IGZhbHNlLFxuICBhY3Rpb25UZXh0OiAnJyxcbiAgYWN0aW9uQ2xpY2s6IHVuZGVmaW5lZCxcbiAgdmVydGljYWxQb3N0aW9uOiAnYm90dG9tJyxcbiAgaG9yaXpvbnRhbFBvc2l0aW9uOiAncmlnaHQnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU25hY2tiYXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBDb2xsYXBzZSBmcm9tICcuL2FuaW1zL0NvbGxhcHNlJztcbmltcG9ydCBGYWRlIGZyb20gJy4vYW5pbXMvRmFkZSc7XG5pbXBvcnQgQnV0dG9uQ29tcGxldGVBcmd1bWVudCBmcm9tICcuL0J1dHRvbkNvbXBsZXRlQXJndW1lbnQnO1xuaW1wb3J0IEJ1dHRvbkRlbGV0ZUFyZ3VtZW50IGZyb20gJy4vQnV0dG9uRGVsZXRlQXJndW1lbnQnO1xuaW1wb3J0IHsgdG9TaW1wbGVEYXRlRm9ybWF0IH0gZnJvbSAnLi4vdXRpbHMvQ29tbW9uJztcblxuY2xhc3MgVGFzayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgIH07XG4gICAgdGhpcy5yZW5kZXJEYXRlID0gdGhpcy5yZW5kZXJEYXRlLmJpbmQodGhpcyk7XG4gIH1cblxuICBvblRpdGxlQ2xpY2soKSB7XG4gICAgY29uc3QgeyBjb2xsYXBzZWQgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGNvbGxhcHNlZDogIWNvbGxhcHNlZCB9KTtcbiAgfVxuXG4gIHJlbmRlckRhdGUoKSB7XG4gICAgY29uc3QgeyB0YXNrIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICh0YXNrLmNvbXBsZXRlZCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHAgY2xhc3NOYW1lPVwiY29tcGxldGUtZGF0ZVwiPntgY29tcGxldGVkICR7KHRhc2suY29tcGxldGVkQXQpID8gdG9TaW1wbGVEYXRlRm9ybWF0KHRhc2suY29tcGxldGVkQXQpIDogJyd9YH08L3A+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPHAgY2xhc3NOYW1lPVwiY29tcGxldGUtd2l0aGluLWRhdGVcIj57YHRvIGNvbXBsZXRlIHdpdGhpbiAkeyh0YXNrLnRvZG9XaXRoaW4pID8gdG9TaW1wbGVEYXRlRm9ybWF0KHRhc2sudG9kb1dpdGhpbikgOiAnbm90IHNldCd9YH08L3A+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHRhc2ssIG9uRGVsZXRlLCBvbkNvbXBsZXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY29sbGFwc2VkIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFyZ3VtZW50LWl0ZW1cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcmd1bWVudC1oZWFkZXJcIj5cbiAgICAgICAgICA8cFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYXJndW1lbnQtdGl0bGUgJHsodGFzay5jb21wbGV0ZWQpID8gJ2FyZ3VtZW50LXRpdGxlLWNvbXBsZXRlZCcgOiAnJ31gfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5vblRpdGxlQ2xpY2soKX1cbiAgICAgICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0YXNrLnRpdGxlfVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8RmFkZSBpbj17Y29sbGFwc2VkfT5cbiAgICAgICAgICAgIDxCdXR0b25EZWxldGVBcmd1bWVudFxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkRlbGV0ZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9GYWRlPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG9uQ29tcGxldGUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgPEJ1dHRvbkNvbXBsZXRlQXJndW1lbnRcbiAgICAgICAgICAgICAgb25DbGljaz17b25Db21wbGV0ZX1cbiAgICAgICAgICAgICAgY29tcGxldGVkPXt0YXNrLmNvbXBsZXRlZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcmd1bWVudC1kYXRlXCI+XG4gICAgICAgICAge3RoaXMucmVuZGVyRGF0ZSgpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPENvbGxhcHNlIGluPXtjb2xsYXBzZWR9PlxuICAgICAgICAgIDxkaXYga2V5PXt0YXNrLmRlc2NyaXB0aW9ufSBjbGFzc05hbWU9XCJhcmd1bWVudC1ib2R5XCI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhcmd1bWVudC1kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgKHRhc2suZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCAmJiB0YXNrLmRlc2NyaXB0aW9uICE9PSAnJylcbiAgICAgICAgICAgICAgICA/IHRhc2suZGVzY3JpcHRpb24gOiA8c3BhbiBjbGFzc05hbWU9XCJlbXB0eVwiPk5vIGRlc2NyaXB0aW9uIHRvIHNob3cgOig8L3NwYW4+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Db2xsYXBzZT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuVGFzay5wcm9wVHlwZXMgPSB7XG4gIG9uRGVsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25Db21wbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIHRhc2s6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBjb21wbGV0ZWRBdDogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgfSkuaXNSZXF1aXJlZCxcbn07XG5cblRhc2suZGVmYXVsdFByb3BzID0ge1xuICBvbkRlbGV0ZTogdW5kZWZpbmVkLFxuICBvbkNvbXBsZXRlOiB1bmRlZmluZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBUYXNrO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uR3JvdXAgfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcbmltcG9ydCBSZXNpemUgZnJvbSAnLi9hbmltcy9SZXNpemUnO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrJztcbmltcG9ydCBJbmZpbml0ZVNjcm9sbCBmcm9tICcuL0luZmluaXRlU2Nyb2xsJztcbmltcG9ydCB7IHF1ZXJ5SXRlbXNMaW1pdCB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGxpbWl0OiBxdWVyeUl0ZW1zTGltaXQsXG4gIHNraXA6IDAsXG59O1xuXG5jbGFzcyBUYXNrcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSBpbml0aWFsU3RhdGU7XG4gICAgdGhpcy5vbkZldGNoVG9kb0FyZ3VtZW50c05leHQgPSB0aGlzLm9uRmV0Y2hUb2RvQXJndW1lbnRzTmV4dC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhuZXh0UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIGlmIChuZXh0UHJvcHMuc2tpcCAhPT0gcHJldlN0YXRlLnNraXApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNraXA6IG5leHRQcm9wcy5za2lwLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBvbkZldGNoVG9kb0FyZ3VtZW50c05leHQoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsXG4gICAgICBmZXRjaFRhc2tzLCBtb3JlVG9Mb2FkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghbW9yZVRvTG9hZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7IGxpbWl0LCBza2lwIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IG5ld1NraXAgPSBza2lwICsgbGltaXQ7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNraXA6IG5ld1NraXAgfSk7XG4gICAgZmV0Y2hUYXNrcyhjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCwgbGltaXQsIG5ld1NraXApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHRhc2tMaXN0LFxuICAgICAgb25EZWxldGVBcmd1bWVudCxcbiAgICAgIG9uQ29tcGxldGVBcmd1bWVudCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cImNvbnRlbnQtdG9kby1hcmd1bWVudHNcIj5cbiAgICAgICAgPEluZmluaXRlU2Nyb2xsIG9uU2Nyb2xsPXt0aGlzLm9uRmV0Y2hUb2RvQXJndW1lbnRzTmV4dH0+XG4gICAgICAgICAgPFRyYW5zaXRpb25Hcm91cD5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGFza0xpc3QubWFwKGFyZyA9PiAoXG4gICAgICAgICAgICAgICAgPFJlc2l6ZSBrZXk9e2FyZy5pZH0+XG4gICAgICAgICAgICAgICAgICA8VGFza1xuICAgICAgICAgICAgICAgICAgICBrZXk9e2FyZy5pZH1cbiAgICAgICAgICAgICAgICAgICAgdGFzaz17YXJnfVxuICAgICAgICAgICAgICAgICAgICBvbkRlbGV0ZT17KCkgPT4gb25EZWxldGVBcmd1bWVudChhcmcpfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXsoKSA9PiBvbkNvbXBsZXRlQXJndW1lbnQoYXJnKX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9SZXNpemU+XG4gICAgICAgICAgICAgICkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9UcmFuc2l0aW9uR3JvdXA+XG4gICAgICAgIDwvSW5maW5pdGVTY3JvbGw+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblRhc2tzLnByb3BUeXBlcyA9IHtcbiAgb25EZWxldGVBcmd1bWVudDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25Db21wbGV0ZUFyZ3VtZW50OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICB0YXNrTGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICBtb3JlVG9Mb2FkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBmZXRjaFRhc2tzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjYXRlZ29yaWVzSWQ6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLmlzUmVxdWlyZWQsXG4gIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2tzO1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBMb2FkZXJMaW5lYXIgZnJvbSAnLi4vY29tcG9uZW50cy9Mb2FkZXJMaW5lYXInO1xuaW1wb3J0IE1haW5BZGRCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9NYWluQWRkQnV0dG9uJztcbmltcG9ydCBDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lcnMvQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lcic7XG5pbXBvcnQgVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lciBmcm9tICcuLi9jb250YWluZXJzL1Zpc2liaWxpdHlGaWx0ZXJDb250YWluZXInO1xuaW1wb3J0IFRhc2tzQ29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lcnMvVGFza3NDb250YWluZXInO1xuaW1wb3J0IERpYWxvZ0FkZCBmcm9tICcuL2RpYWxvZ0FkZC9EaWFsb2dBZGQnO1xuaW1wb3J0IFNuYWNrYmFyIGZyb20gJy4vU25hY2tiYXInO1xuXG5jbGFzcyBUb2RvcyBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc0RpYWxvZ0FkZE9wZW46IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvLyBEaWFsb2dBZGQucHJlbG9hZCgpO1xuICAgIGNvbnN0IHsgaW5pdEZldGNoQWxsQ2F0ZWdvcmllcyB9ID0gdGhpcy5wcm9wcztcbiAgICBpbml0RmV0Y2hBbGxDYXRlZ29yaWVzKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBpc0RpYWxvZ0FkZE9wZW4gfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBtZXNzYWdlLCBoaWRlTWVzc2FnZSwgc2hvd0xvYWRpbmcgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1hcHBcIj5cbiAgICAgICAgPExvYWRlckxpbmVhciBzaG93PXtzaG93TG9hZGluZ30gLz5cbiAgICAgICAgPGRpdiBpZD1cIm1haW4tdG9wLWJhclwiPlxuICAgICAgICAgIDxDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyIC8+XG4gICAgICAgICAgPFZpc2liaWxpdHlGaWx0ZXJDb250YWluZXIgLz5cbiAgICAgICAgICA8TWFpbkFkZEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IGlzRGlhbG9nQWRkT3BlbjogdHJ1ZSB9KX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFRhc2tzQ29udGFpbmVyIC8+XG4gICAgICAgIDxEaWFsb2dBZGRcbiAgICAgICAgICBvcGVuPXtpc0RpYWxvZ0FkZE9wZW59XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IGlzRGlhbG9nQWRkT3BlbjogZmFsc2UgfSl9XG4gICAgICAgIC8+XG4gICAgICAgIDxTbmFja2JhclxuICAgICAgICAgIHNob3c9e21lc3NhZ2Uuc2hvd31cbiAgICAgICAgICBpc0Vycm9yPXttZXNzYWdlLmlzRXJyb3J9XG4gICAgICAgICAgbWVzc2FnZT17bWVzc2FnZS50ZXh0fVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IGhpZGVNZXNzYWdlKCl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblRvZG9zLnByb3BUeXBlcyA9IHtcbiAgbWVzc2FnZTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBzaG93OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzRXJyb3I6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkLFxuICBoaWRlTWVzc2FnZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaW5pdEZldGNoQWxsQ2F0ZWdvcmllczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgc2hvd0xvYWRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb2RvcztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFZpc2liaWxpdHlTd2l0Y2ggZnJvbSAnLi9WaXNpYmlsaXR5U3dpdGNoJztcbmltcG9ydCB7IEFMTF9UT0RPUywgT05MWV9DT01QTEVURUQsIE9OTFlfVE9fQ09NUExFVEUgfSBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcblxuY29uc3QgVmlzaWJpbGl0eUZpbHRlciA9ICh7XG4gIHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciwgb25WaXNpYmlsaXR5U3dpdGNoQ2xpY2ssXG59KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwidmlzaWJpbGl0eS1maWx0ZXItd3JhcHBlclwiPlxuICAgIDxWaXNpYmlsaXR5U3dpdGNoXG4gICAgICBzZWxlY3RlZD17KHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciA9PT0gT05MWV9UT19DT01QTEVURVxuICAgICAgICB8fCBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IEFMTF9UT0RPUyl9XG4gICAgICBvbkNsaWNrPXtvblZpc2liaWxpdHlTd2l0Y2hDbGljayhPTkxZX1RPX0NPTVBMRVRFKX1cbiAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgID5cbiAgICAgIDxpIGNsYXNzTmFtZT1cImljb24tY2lyY2xlLWJvcmRlclwiIC8+XG4gICAgPC9WaXNpYmlsaXR5U3dpdGNoPlxuICAgIDxWaXNpYmlsaXR5U3dpdGNoXG4gICAgICBzZWxlY3RlZD17KHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciA9PT0gT05MWV9DT01QTEVURURcbiAgICAgICAgfHwgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyID09PSBBTExfVE9ET1MpfVxuICAgICAgb25DbGljaz17b25WaXNpYmlsaXR5U3dpdGNoQ2xpY2soT05MWV9DT01QTEVURUQpfVxuICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgPlxuICAgICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1jaXJjbGVcIiAvPlxuICAgIDwvVmlzaWJpbGl0eVN3aXRjaD5cbiAgPC9kaXY+XG4pO1xuXG5WaXNpYmlsaXR5RmlsdGVyLnByb3BUeXBlcyA9IHtcbiAgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uVmlzaWJpbGl0eVN3aXRjaENsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaWJpbGl0eUZpbHRlcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBWaXNpYmlsaXR5U3dpdGNoID0gKHtcbiAgc2VsZWN0ZWQsIGNoaWxkcmVuLCBvbkNsaWNrLFxufSkgPT4gKFxuICA8ZGl2XG4gICAgY2xhc3NOYW1lPXtgdmlzaWJpbGl0eS1idXR0b24tc3dpdGNoIGFsaWduLWl0ZW1zLWNlbnRlciAkeyhzZWxlY3RlZCkgPyAnc2VsZWN0ZWQnIDogJyd9IGB9XG4gICAgb25DbGljaz17b25DbGlja31cbiAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgPlxuICAgIHtjaGlsZHJlbn1cbiAgPC9kaXY+XG4pO1xuXG5WaXNpYmlsaXR5U3dpdGNoLnByb3BUeXBlcyA9IHtcbiAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cblZpc2liaWxpdHlTd2l0Y2guZGVmYXVsdFByb3BzID0ge1xuICBzZWxlY3RlZDogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBWaXNpYmlsaXR5U3dpdGNoO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5cbmNvbnN0IGR1cmF0aW9uID0gMzAwO1xuXG5jb25zdCBkZWZhdWx0U3R5bGUgPSB7XG4gIHRyYW5zaXRpb246IGBoZWlnaHQgJHtkdXJhdGlvbn1tcyBlYXNlLWluLW91dGAsXG4gIGhlaWdodDogMCxcbn07XG5cbmNvbnN0IG9uRW50ZXIgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSBgJHtub2RlLmZpcnN0RWxlbWVudENoaWxkLm9mZnNldEhlaWdodH1weGA7XG59O1xuXG5jb25zdCBvbkV4aXQgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSAnMHB4Jztcbn07XG5cbmNvbnN0IENvbGxhcHNlID0gKHsgaW46IGluUHJvcCwgY2hpbGRyZW4gfSkgPT4gKFxuICA8VHJhbnNpdGlvbiBvbkVudGVyPXtvbkVudGVyfSBvbkV4aXQ9e29uRXhpdH0gaW49e2luUHJvcH0gdGltZW91dD17ZHVyYXRpb259PlxuICAgIHsoKSA9PiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICA8L1RyYW5zaXRpb24+XG4pO1xuXG5Db2xsYXBzZS5wcm9wVHlwZXMgPSB7XG4gIGluOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbGxhcHNlO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5cbmNvbnN0IGR1cmF0aW9uID0gMjUwO1xuXG5jb25zdCBkZWZhdWx0U3R5bGUgPSB7XG4gIHRyYW5zaXRpb246IGBhbGwgJHtkdXJhdGlvbn1tcyBlYXNlLWluLW91dGAsXG4gIGhlaWdodDogJzBweCcsXG4gIG9wYWNpdHk6ICcwJyxcbiAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG59O1xuXG5jb25zdCB0cmFuc2l0aW9uU3R5bGVzID0ge1xuICBlbnRlcmluZzoge1xuICAgIGhlaWdodDogJzBweCcsXG4gICAgb3BhY2l0eTogJzAnLFxuICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICB9LFxuICBlbnRlcmVkOiB7XG4gICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICBoZWlnaHQ6ICcxMDB2aCcsXG4gICAgb3BhY2l0eTogJzEnLFxuICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJyxcbiAgfSxcbn07XG5cbmNvbnN0IERpYWxvZ0FuaW0gPSAoeyBpbjogaW5Qcm9wLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxUcmFuc2l0aW9uIGluPXtpblByb3B9IHRpbWVvdXQ9e2R1cmF0aW9ufT5cbiAgICB7c3RhdGUgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD1cImJhY2tkcm9wLWRpYWxvZ1wiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxuICAgICAgICAgIC4uLnRyYW5zaXRpb25TdHlsZXNbc3RhdGVdLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICA8L1RyYW5zaXRpb24+XG4pO1xuXG5EaWFsb2dBbmltLnByb3BUeXBlcyA9IHtcbiAgaW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlhbG9nQW5pbTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDI1MDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB3aWR0aDogJzEwMCUnLFxuICB0cmFuc2l0aW9uOiBgb3BhY2l0eSAke2R1cmF0aW9ufW1zIGVhc2UtaW4tb3V0YCxcbiAgb3BhY2l0eTogMCxcbiAgZGlzcGxheTogJ2luaGVyaXQnLFxufTtcblxuY29uc3QgdHJhbnNpdGlvblN0eWxlcyA9IHtcbiAgZW50ZXI6IHsgb3BhY2l0eTogMCB9LFxuICBlbnRlcmVkOiB7IG9wYWNpdHk6IDEgfSxcbn07XG5cbmNvbnN0IFJlcGxhY2VBbmltID0gKHsgaW46IGluUHJvcCwgZW5kTGlzdGVuZXIsIGNoaWxkcmVuIH0pID0+IChcbiAgPFRyYW5zaXRpb25cbiAgICBpbj17aW5Qcm9wfVxuICAgIHRpbWVvdXQ9e2R1cmF0aW9ufVxuICAgIGFkZEVuZExpc3RlbmVyPXtlbmRMaXN0ZW5lcn1cbiAgPlxuICAgIHtzdGF0ZSA9PiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxuICAgICAgICAgIC4uLnRyYW5zaXRpb25TdHlsZXNbc3RhdGVdLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICA8L1RyYW5zaXRpb24+XG4pO1xuXG5SZXBsYWNlQW5pbS5wcm9wVHlwZXMgPSB7XG4gIGluOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBlbmRMaXN0ZW5lcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZXBsYWNlQW5pbTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IHtcbiAgZW50ZXI6IDMwMCxcbiAgZXhpdDogMjAwLFxufTtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgYWxsICR7ZHVyYXRpb24uZW50ZXJ9bXMgZWFzZS1pbi1vdXRgLFxuICBoZWlnaHQ6IDAsXG4gIG9wYWNpdHk6IDAsXG59O1xuXG5jb25zdCBvbkVudGVyID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gYCR7bm9kZS5maXJzdEVsZW1lbnRDaGlsZC5vZmZzZXRIZWlnaHR9cHhgO1xuICBzdHlsZS5vcGFjaXR5ID0gMTtcbn07XG5cbmNvbnN0IG9uRW50ZXJlZCA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XG4gIHN0eWxlLmhlaWdodCA9ICdhdXRvJztcbn07XG5cbmNvbnN0IG9uRXhpdCA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XG4gIHN0eWxlLmhlaWdodCA9IGAke25vZGUuZmlyc3RFbGVtZW50Q2hpbGQub2Zmc2V0SGVpZ2h0fXB4YDtcbn07XG5cbmNvbnN0IG9uRXhpdGVkID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gJzBweCc7XG4gIHN0eWxlLm9wYWNpdHkgPSAwO1xufTtcblxuXG5jb25zdCBSZXNpemUgPSAoeyAuLi5wcm9wcywgY2hpbGRyZW4gfSkgPT4gKFxuICA8VHJhbnNpdGlvblxuICAgIHsuLi5wcm9wc31cbiAgICBvbkVudGVyPXtvbkVudGVyfVxuICAgIG9uRW50ZXJlZD17b25FbnRlcmVkfVxuICAgIG9uRXhpdD17b25FeGl0fVxuICAgIG9uRXhpdGVkPXtvbkV4aXRlZH1cbiAgICB0aW1lb3V0PXtkdXJhdGlvbn1cbiAgPlxuICAgIHsoKSA9PiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICA8L1RyYW5zaXRpb24+XG4pO1xuXG5SZXNpemUucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJlc2l6ZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDI1MDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgYWxsICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBib3R0b206ICctMTAwcHgnLFxufTtcblxuY29uc3QgdHJhbnNpdGlvblN0eWxlcyA9IHtcbiAgZW50ZXJpbmc6IHtcbiAgICBib3R0b206ICctMTAwcHgnLFxuICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICB9LFxuICBlbnRlcmVkOiB7XG4gICAgYm90dG9tOiAnMHB4JyxcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gIH0sXG59O1xuXG5jb25zdCBTbmFja2JhckFuaW0gPSAoeyBpbjogaW5Qcm9wLCBjaGlsZHJlbiwgY3VzdG9tQ2xhc3MgfSkgPT4gKFxuICA8VHJhbnNpdGlvbiBpbj17aW5Qcm9wfSB0aW1lb3V0PXtkdXJhdGlvbn0+XG4gICAge3N0YXRlID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJjb250ZW50LXNuYWNrYmFyXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAuLi5kZWZhdWx0U3R5bGUsXG4gICAgICAgICAgLi4udHJhbnNpdGlvblN0eWxlc1tzdGF0ZV0sXG4gICAgICAgIH19XG4gICAgICAgIGNsYXNzTmFtZT17Y3VzdG9tQ2xhc3N9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICl9XG4gIDwvVHJhbnNpdGlvbj5cbik7XG5cblNuYWNrYmFyQW5pbS5wcm9wVHlwZXMgPSB7XG4gIGluOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgY3VzdG9tQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5TbmFja2JhckFuaW0uZGVmYXVsdFByb3BzID0ge1xuICBjdXN0b21DbGFzczogJycsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTbmFja2JhckFuaW07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5pbXBvcnQgeyBBRERfQVJHVU1FTlQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IHsgYWRkQ2F0ZWdvcnkgfSBmcm9tICcuLi8uLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUluZm8gfSBmcm9tICcuLi8uLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcblxuY2xhc3MgQWRkQ2F0ZWdvcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbmFtZTogJycsXG4gICAgfTtcbiAgICB0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlID0gdGhpcy5vbklucHV0VGV4dENoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25CdXR0b25BZGRDbGljayA9IHRoaXMub25CdXR0b25BZGRDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25DYXRlZ29yeUNyZWF0ZWQgPSB0aGlzLm9uQ2F0ZWdvcnlDcmVhdGVkLmJpbmQodGhpcyk7XG4gIH1cblxuICBvbklucHV0VGV4dENoYW5nZShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IG5hbWU6IGUudGFyZ2V0LnZhbHVlIH0pO1xuICB9XG5cbiAgb25CdXR0b25BZGRDbGljaygpIHtcbiAgICBjb25zdCB7IG5hbWUgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBkaXNwYXRjaCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAobmFtZSA9PT0gJycpIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlSW5mbyhsYWJlbHMubXNnTmFtZVJlcXVpcmVkKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRpc3BhdGNoKGFkZENhdGVnb3J5KG5hbWUsIHRoaXMub25DYXRlZ29yeUNyZWF0ZWQpKTtcbiAgfVxuXG4gIG9uQ2F0ZWdvcnlDcmVhdGVkKHNlbGVjdGVkQ2F0ZWdvcnkpIHtcbiAgICBjb25zdCB7IG9uTmV4dCB9ID0gdGhpcy5wcm9wcztcbiAgICBvbk5leHQoeyBzdGVwSWQ6IEFERF9BUkdVTUVOVCwgb3B0aW9uczogeyBzZWxlY3RlZENhdGVnb3J5IH0gfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1hZGQtY2F0ZWdvcnlcIj5cbiAgICAgICAgPGgyPkFkZCBuZXcgQ0FURUdPUlk8L2gyPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlR5cGUgdGhlIG5hbWVcIlxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dFRleHRDaGFuZ2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1idXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkJ1dHRvbkFkZENsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIEFERFxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQWRkQ2F0ZWdvcnkucHJvcFR5cGVzID0ge1xuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCgpKEFkZENhdGVnb3J5KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi9jb25zdGFudHMvbGFiZWxzJztcbmltcG9ydCB7IFNFTEVDVF9DT01QTEVURV9EQVRFIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5jbGFzcyBBZGRUb2RvQXJndW1lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0aXRsZTogJycsXG4gICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgfTtcbiAgICB0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlID0gdGhpcy5vbklucHV0VGV4dENoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25CdXR0b25TY2hlZHVsZUNsaWNrID0gdGhpcy5vbkJ1dHRvblNjaGVkdWxlQ2xpY2suYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uSW5wdXRUZXh0Q2hhbmdlKG5hbWUpIHtcbiAgICByZXR1cm4gKGUpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBbbmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pO1xuICAgIH07XG4gIH1cblxuICBvbkJ1dHRvblNjaGVkdWxlQ2xpY2soKSB7XG4gICAgY29uc3QgeyBvcHRpb25zLCBkaXNwYXRjaCwgb25OZXh0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgdGl0bGUsIGRlc2NyaXB0aW9uIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGNhdGVnb3J5ID0gb3B0aW9ucy5zZWxlY3RlZENhdGVnb3J5O1xuICAgIGlmICh0aXRsZSA9PT0gJycpIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlSW5mbyhsYWJlbHMubXNnVGl0bGVSZXF1aXJlZCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvbk5leHQoeyBzdGVwSWQ6IFNFTEVDVF9DT01QTEVURV9EQVRFLCBvcHRpb25zOiB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgY2F0ZWdvcnkgfSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSA9IHRoaXMucHJvcHMub3B0aW9ucztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWFkZC1hcmd1bWVudFwiPlxuICAgICAgICA8aDI+QWRkIG5ldyBBUkdVTUVOVDwvaDI+XG4gICAgICAgIDxoMz5cbiAgICAgICAgICBmb3IgdGhlIGNhdGVnb3J5OlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxhYmVsLWNhdGVnb3J5LW5hbWVcIj5cbiAgICAgICAgICAgIHtgICR7c2VsZWN0ZWRDYXRlZ29yeS5uYW1lfWB9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2gzPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtZmllbGRzXCI+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVHlwZSB0aGUgdGl0bGVcIlxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dFRleHRDaGFuZ2UoJ3RpdGxlJyl9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4taW5wdXRcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJUeXBlIHRoZSBkZXNjcmlwdGlvblwiXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0VGV4dENoYW5nZSgnZGVzY3JpcHRpb24nKX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQnV0dG9uU2NoZWR1bGVDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICBTQ0hFRFVMRVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQWRkVG9kb0FyZ3VtZW50LnByb3BUeXBlcyA9IHtcbiAgZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9wdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2VsZWN0ZWRDYXRlZ29yeTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgfSkuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCgpKEFkZFRvZG9Bcmd1bWVudCk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IFNlbGVjdEFjdGlvbkFkZCBmcm9tICcuL1NlbGVjdEFjdGlvbkFkZCc7XG5pbXBvcnQgQWRkQ2F0ZWdvcnkgZnJvbSAnLi9BZGRDYXRlZ29yeSc7XG5pbXBvcnQgU2VsZWN0Q2F0ZWdvcnkgZnJvbSAnLi9TZWxlY3RDYXRlZ29yeSc7XG5pbXBvcnQgQWRkVG9kb0FyZ3VtZW50IGZyb20gJy4vQWRkVG9kb0FyZ3VtZW50JztcbmltcG9ydCBTZWxlY3RDb21wbGV0ZURhdGUgZnJvbSAnLi9TZWxlY3RDb21wbGV0ZURhdGUnO1xuaW1wb3J0IERvbmUgZnJvbSAnLi9Eb25lJztcbmltcG9ydCB7XG4gIFNFTEVDVF9XQU5UX1RPX0FERCxcbiAgQUREX0NBVEVHT1JZLFxuICBBRERfQVJHVU1FTlQsXG4gIFNFTEVDVF9DQVRFR09SWSxcbiAgU0VMRUNUX0NPTVBMRVRFX0RBVEUsXG4gIERPTkUsXG4gIHN0ZXBMaXN0LFxufSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IFJlcGxhY2VBbmltIGZyb20gJy4uL2FuaW1zL1JlcGxhY2VBbmltJztcbmltcG9ydCBEaWFsb2dBbmltIGZyb20gJy4uL2FuaW1zL0RpYWxvZ0FuaW0nO1xuaW1wb3J0IFN0ZXBzIGZyb20gJy4vU3RlcHMnO1xuXG5jb25zdCBnZXRDb250ZW50VG9SZW5kZXIgPSAoc3RlcHMsIHByb3BzKSA9PiB7XG4gIGlmIChzdGVwcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gPFNlbGVjdEFjdGlvbkFkZCB7Li4ucHJvcHN9IC8+O1xuICB9XG4gIGNvbnN0IGxhc3RTdGVwID0gc3RlcHNbc3RlcHMubGVuZ3RoIC0gMV07XG4gIHN3aXRjaCAobGFzdFN0ZXAuc3RlcElkKSB7XG4gICAgY2FzZSBTRUxFQ1RfV0FOVF9UT19BREQ6XG4gICAgICByZXR1cm4gPFNlbGVjdEFjdGlvbkFkZCB7Li4ucHJvcHN9IC8+O1xuICAgIGNhc2UgQUREX0NBVEVHT1JZOlxuICAgICAgcmV0dXJuIDxBZGRDYXRlZ29yeSB7Li4ucHJvcHN9IC8+O1xuICAgIGNhc2UgQUREX0FSR1VNRU5UOlxuICAgICAgcmV0dXJuIDxBZGRUb2RvQXJndW1lbnQgey4uLnByb3BzfSBvcHRpb25zPXtsYXN0U3RlcC5vcHRpb25zfSAvPjtcbiAgICBjYXNlIFNFTEVDVF9DQVRFR09SWTpcbiAgICAgIHJldHVybiA8U2VsZWN0Q2F0ZWdvcnkgey4uLnByb3BzfSAvPjtcbiAgICBjYXNlIFNFTEVDVF9DT01QTEVURV9EQVRFOlxuICAgICAgcmV0dXJuIDxTZWxlY3RDb21wbGV0ZURhdGUgey4uLnByb3BzfSBvcHRpb25zPXtsYXN0U3RlcC5vcHRpb25zfSAvPjtcbiAgICBjYXNlIERPTkU6XG4gICAgICByZXR1cm4gPERvbmUgey4uLnByb3BzfSAvPjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIDxTZWxlY3RBY3Rpb25BZGQgey4uLnByb3BzfSAvPjtcbiAgfVxufTtcblxuY29uc3QgaW5pdGFsU3RhdGUgPSB7XG4gIG5leHRTdGVwczogW10sXG4gIHN0ZXBzOiBbXG4gICAge1xuICAgICAgc3RlcElkOiBTRUxFQ1RfV0FOVF9UT19BREQsXG4gICAgICBvcHRpb25zOiB7fSxcbiAgICB9LFxuICBdLFxuICBzaG93U3RlcDogdHJ1ZSxcbn07XG5cbmNsYXNzIERpYWxvZ0FkZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAuLi5pbml0YWxTdGF0ZSxcbiAgICB9O1xuICAgIHRoaXMub25CYWNrID0gdGhpcy5vbkJhY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uTmV4dCA9IHRoaXMub25OZXh0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblJlc2V0QW5kQ2xvc2UgPSB0aGlzLm9uUmVzZXRBbmRDbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25BbmltYXRpb25FbmQgPSB0aGlzLm9uQW5pbWF0aW9uRW5kLmJpbmQodGhpcyk7XG4gIH1cblxuICBvbkJhY2soKSB7XG4gICAgY29uc3QgeyBzdGVwcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IG9uQ2xvc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc3RlcENvdW50ID0gc3RlcHMubGVuZ3RoO1xuICAgIGlmIChzdGVwQ291bnQgPT09IDEpIHtcbiAgICAgIC8vIFJldHVybmVkIHRvIHRoZSBmaXJzdCBzdGVwcywgY2xvc2UgdGhlIGRpYWxvZ1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLmluaXRhbFN0YXRlIH0pO1xuICAgICAgb25DbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbmV4dFN0ZXBzOiBbXG4gICAgICAgICAgLi4uc3RlcHMuc2xpY2UoMCwgc3RlcHMubGVuZ3RoIC0gMSksXG4gICAgICAgIF0sXG4gICAgICAgIHNob3dTdGVwOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uTmV4dChzdGVwID0geyBzdGVwSWQ6ICcnLCBvcHRpb25zOiB7fSB9KSB7XG4gICAgY29uc3QgeyBzdGVwcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG5leHRTdGVwczogW1xuICAgICAgICAuLi5zdGVwcywge1xuICAgICAgICAgIC4uLnN0ZXAsXG4gICAgICAgICAgY29tcGxldGU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgc2hvd1N0ZXA6IGZhbHNlLFxuICAgIH0pO1xuICB9XG5cbiAgb25SZXNldEFuZENsb3NlKCkge1xuICAgIGNvbnN0IHsgb25DbG9zZSB9ID0gdGhpcy5wcm9wcztcbiAgICBvbkNsb3NlKCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgLi4uaW5pdGFsU3RhdGUgfSk7XG4gICAgfSwgNTAwKTtcbiAgfVxuXG4gIG9uQW5pbWF0aW9uRW5kKG5vZGUsIGRvbmUpIHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCAoKSA9PiB7XG4gICAgICBkb25lKCk7XG4gICAgICBjb25zdCB7IG5leHRTdGVwcywgc2hvd1N0ZXAgfSA9IHRoaXMuc3RhdGU7XG4gICAgICBpZiAoc2hvd1N0ZXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHN0ZXBzOiBbXG4gICAgICAgICAgLi4ubmV4dFN0ZXBzLFxuICAgICAgICBdLFxuICAgICAgICBzaG93U3RlcDogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHN0ZXBzLCBzaG93U3RlcCB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IG9uQ2xvc2UsIG9wZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBvbk5leHQsIG9uUmVzZXRBbmRDbG9zZSwgb25BbmltYXRpb25FbmQgfSA9IHRoaXM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxEaWFsb2dBbmltIGluPXtvcGVufT5cbiAgICAgICAgPGRpdiBpZD1cImRpYWxvZy1hZGRcIiA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaWFsb2ctaGVhZGVyXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwibWFpbi1jbG9zZS1idXR0b25cIiBvbkNsaWNrPXsoKSA9PiBvbkNsb3NlKCl9PlxuICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPiYjeEU1Q0Q7PC9pPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwcy1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxTdGVwc1xuICAgICAgICAgICAgICBsaXN0PXtzdGVwTGlzdH1cbiAgICAgICAgICAgICAgc3RlcEhpc3Rvcnk9e3N0ZXBzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpYWxvZy1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxSZXBsYWNlQW5pbSBpbj17c2hvd1N0ZXB9IGVuZExpc3RlbmVyPXtvbkFuaW1hdGlvbkVuZH0+XG4gICAgICAgICAgICAgIHtnZXRDb250ZW50VG9SZW5kZXIoc3RlcHMsIHsgb25OZXh0LCBvbkNsb3NlOiBvblJlc2V0QW5kQ2xvc2UgfSl9XG4gICAgICAgICAgICA8L1JlcGxhY2VBbmltPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlhbG9nLWZvb3RlclwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBpZD1cImJhY2stYnV0dG9uLWRpYWxvZ1wiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5vbkJhY2soKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgTkVWRVIgTUlORCwgR08gQkFDS1xuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9EaWFsb2dBbmltPlxuICAgICk7XG4gIH1cbn1cblxuRGlhbG9nQWRkLnByb3BUeXBlcyA9IHtcbiAgb3BlbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpYWxvZ0FkZDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jbGFzcyBEb25lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCB7IG9uQ2xvc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgICBvbkNsb3NlKCk7XG4gICAgfSwgMzAwMCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1kb25lLWFkZFwiPlxuICAgICAgICA8aDI+RG9uZSE8L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtaWMtZG9uZVwiPlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz1cIi4vY2xpZW50L3B1YmxpYy9pbWcvaWMtZG9uZS5zdmdcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaWMtZG9uZVwiXG4gICAgICAgICAgICBhbHQ9XCJkb25lIGljb25cIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Eb25lLnByb3BUeXBlcyA9IHtcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERvbmU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHsgQUREX0NBVEVHT1JZLCBTRUxFQ1RfQ0FURUdPUlkgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuXG5jb25zdCBTZWxlY3RBY3Rpb25BZGQgPSAoeyBvbk5leHQgfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtc2VsZWN0LWFjdGlvbi1hZGRcIj5cbiAgICA8aDI+V2hhdCB3b3VsZCB5b3UgbGlrZSB0byBhZGQ/PC9oMj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW0tc2VsZWN0XCI+XG4gICAgICA8cFxuICAgICAgICBjbGFzc05hbWU9XCJzZWxlY3QtdGl0bGVcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk5leHQoeyBzdGVwSWQ6IEFERF9DQVRFR09SWSwgb3B0aW9uczoge30gfSl9XG4gICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgPlxuICAgICAgICBDQVRFR09SWVxuICAgICAgPC9wPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbS1zZWxlY3RcIj5cbiAgICAgIDxwXG4gICAgICAgIGNsYXNzTmFtZT1cInNlbGVjdC10aXRsZVwiXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uTmV4dCh7IHN0ZXBJZDogU0VMRUNUX0NBVEVHT1JZLCBvcHRpb25zOiB7fSB9KX1cbiAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICA+XG4gICAgICAgIEFSR1VNRU5UXG4gICAgICA8L3A+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuU2VsZWN0QWN0aW9uQWRkLnByb3BUeXBlcyA9IHtcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0QWN0aW9uQWRkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IENhdGVnb3J5IGZyb20gJy4uL0NhdGVnb3J5JztcbmltcG9ydCB7IEFERF9BUkdVTUVOVCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUluZm8gfSBmcm9tICcuLi8uLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcblxuXG5jbGFzcyBTZWxlY3RDYXRlZ29yeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZENhdGVnb3J5OiB1bmRlZmluZWQsXG4gICAgfTtcbiAgICB0aGlzLm9uQ2F0ZWdvcnlDbGljayA9IHRoaXMub25DYXRlZ29yeUNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkJ1dHRvbk5leHRDbGljayA9IHRoaXMub25CdXR0b25OZXh0Q2xpY2suYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uQ2F0ZWdvcnlDbGljayhjYXRlZ29yeSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZENhdGVnb3J5OiBjYXRlZ29yeSB9KTtcbiAgfVxuXG4gIG9uQnV0dG9uTmV4dENsaWNrKCkge1xuICAgIGNvbnN0IHsgc2VsZWN0ZWRDYXRlZ29yeSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IG9uTmV4dCwgZGlzcGF0Y2ggfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKHNlbGVjdGVkQ2F0ZWdvcnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VJbmZvKGxhYmVscy5tc2dTZWxlY3RDYXRlZ29yeSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvbk5leHQoeyBzdGVwSWQ6IEFERF9BUkdVTUVOVCwgb3B0aW9uczogeyBzZWxlY3RlZENhdGVnb3J5IH0gfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjYXRlZ29yaWVzTGlzdCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1zZWxlY3QtY2F0ZWdvcnlcIj5cbiAgICAgICAgPGgyPkNob29zZSBhIENBVEVHT1JZPC9oMj5cbiAgICAgICAgPGRpdiBpZD1cImNvbnRlbnQtY2F0ZWdvcmllc1wiPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNhdGVnb3JpZXNMaXN0Lm1hcChjYXRlZ29yeSA9PiAoXG4gICAgICAgICAgICAgIChjYXRlZ29yeS5pZCAhPT0gJzAnKVxuICAgICAgICAgICAgICA/IDxDYXRlZ29yeVxuICAgICAgICAgICAgICAgIGtleT17Y2F0ZWdvcnkuaWR9XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk9e2NhdGVnb3J5fVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtzZWxlY3RlZENhdGVnb3J5ICE9PSB1bmRlZmluZWQgJiYgY2F0ZWdvcnkuaWQgPT09IHNlbGVjdGVkQ2F0ZWdvcnkuaWR9XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNhdGVnb3J5Q2xpY2t9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICApKVxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1idXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkJ1dHRvbk5leHRDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICBORVhUXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TZWxlY3RDYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjYXRlZ29yaWVzTGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3AgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICBjYXRlZ29yaWVzTGlzdDogc3RhdGUudG9kb0ZpbHRlcnMuY2F0ZWdvcmllcyxcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcCkoU2VsZWN0Q2F0ZWdvcnkpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IERhdGVQaWNrZXIgZnJvbSAncmVhY3QtZGF0ZS1waWNrZXInO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IHsgRE9ORSB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgeyBhZGRUYXNrIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy90b2RvVGFza3NBY3Rpb25zJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5jbGFzcyBTZWxlY3RDb21wbGV0ZURhdGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdG9kb1dpdGhpbjogbmV3IERhdGUoKSxcbiAgICB9O1xuICAgIHRoaXMub25JbnB1dERhdGVDaGFuZ2UgPSB0aGlzLm9uSW5wdXREYXRlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkJ1dHRvbkFkZENsaWNrID0gdGhpcy5vbkJ1dHRvbkFkZENsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblRvZG9Bcmd1bWVudENyZWF0ZWQgPSB0aGlzLm9uVG9kb0FyZ3VtZW50Q3JlYXRlZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25JbnB1dERhdGVDaGFuZ2UoZGF0ZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyB0b2RvV2l0aGluOiBkYXRlIH0pO1xuICB9XG5cbiAgb25CdXR0b25BZGRDbGljaygpIHtcbiAgICBjb25zdCB7IHRvZG9XaXRoaW4gfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBkaXNwYXRjaCwgb3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgY2F0ZWdvcnkgfSA9IG9wdGlvbnM7XG4gICAgaWYgKCF0b2RvV2l0aGluIHx8IHRvZG9XaXRoaW4gPT09ICcnKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ1NlbGVjdERhdGUpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGlzcGF0Y2goYWRkVGFzayhcbiAgICAgIHRpdGxlLCBkZXNjcmlwdGlvbixcbiAgICAgIGNhdGVnb3J5LCB0b2RvV2l0aGluLCB0aGlzLm9uVG9kb0FyZ3VtZW50Q3JlYXRlZCxcbiAgICApKTtcbiAgfVxuXG4gIG9uVG9kb0FyZ3VtZW50Q3JlYXRlZCgpIHtcbiAgICBjb25zdCB7IG9uTmV4dCB9ID0gdGhpcy5wcm9wcztcbiAgICBvbk5leHQoeyBzdGVwSWQ6IERPTkUsIG9wdGlvbnM6IHsgfSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHRvZG9XaXRoaW4gfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1zZWxlY3QtY29tcGxldGUtZGF0ZVwiPlxuICAgICAgICA8aDI+VG9kbyBXaXRoaW48L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtaW5wdXRcIj5cbiAgICAgICAgICA8RGF0ZVBpY2tlclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICBjYWxlbmRhckNsYXNzTmFtZT1cImRhcmstY2FsZW5kYXJcIlxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dERhdGVDaGFuZ2V9XG4gICAgICAgICAgICB2YWx1ZT17dG9kb1dpdGhpbn1cbiAgICAgICAgICAgIG1pbkRhdGU9e25ldyBEYXRlKCl9XG4gICAgICAgICAgICBsb2NhbGU9XCJlbi1VU1wiXG4gICAgICAgICAgICBjbGVhckljb249ezxpIGNsYXNzTmFtZT1cImljb24tZGVsZXRlXCIgLz59XG4gICAgICAgICAgICBjYWxlbmRhckljb249ezxpIGNsYXNzTmFtZT1cImljb24tY2FsZW5kYXJcIiAvPn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQnV0dG9uQWRkQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgQUREXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TZWxlY3RDb21wbGV0ZURhdGUucHJvcFR5cGVzID0ge1xuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb3B0aW9uczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY2F0ZWdvcnk6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIH0pLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoKShTZWxlY3RDb21wbGV0ZURhdGUpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IFN0ZXAgPSAoeyBkZXNjcmlwdGlvbiwgY29tcGxldGVkLCBuZWVkTGluZSB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1jb250YWluZXJcIj5cbiAgICB7XG4gICAgICBuZWVkTGluZSAmJlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BsaW5lICR7KGNvbXBsZXRlZCkgPyAnY29tcGxldGVkJyA6ICcnfWB9IC8+XG4gICAgfVxuICAgIDxkaXYgY2xhc3NOYW1lPXtgc3RlcCAkeyhjb21wbGV0ZWQpID8gJ2NvbXBsZXRlZCcgOiAnJ31gfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5kaWNhdG9yXCIgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1kZXNjcmlwdGlvblwiPlxuICAgICAgICA8cD57ZGVzY3JpcHRpb259PC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuU3RlcC5wcm9wVHlwZXMgPSB7XG4gIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgbmVlZExpbmU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5jb25zdCBTdGVwcyA9ICh7IGxpc3QsIHN0ZXBIaXN0b3J5IH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJzdGVwcy13cmFwcGVyXCI+XG4gICAge1xuICAgICAgbGlzdC5tYXAoKGl0ZW0sIGkpID0+IChcbiAgICAgICAgPFN0ZXBcbiAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgey4uLml0ZW19XG4gICAgICAgICAgY29tcGxldGVkPXtzdGVwSGlzdG9yeS5maWx0ZXIoc2ggPT4gc2guc3RlcElkID09PSBpdGVtLmlkKS5sZW5ndGggPiAwfVxuICAgICAgICAgIG5lZWRMaW5lPXtpID4gMH1cbiAgICAgICAgLz4pKVxuICAgIH1cbiAgPC9kaXY+XG4pO1xuXG5TdGVwcy5wcm9wVHlwZXMgPSB7XG4gIGxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICBzdGVwSGlzdG9yeTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBzdGVwSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH0pKS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3RlcHM7XG4iLCJjb25zdCBsYWJlbHMgPSB7XG4gIG1zZ1RpdGxlUmVxdWlyZWQ6ICdFbnRlciB0aGUgdGl0bGUnLFxuICBtc2dOYW1lUmVxdWlyZWQ6ICdFbnRlciB0aGUgbmFtZScsXG4gIG1zZ1NlbGVjdENhdGVnb3J5OiAnU2VsZWN0IGEgY2F0ZWdvcnknLFxuICBtc2dTZWxlY3REYXRlOiAnUGljayBhIGRhdGUgYW5kIGNvbW1pdC4gTm8gZXhjdXNlcyEnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbGFiZWxzO1xuIiwiZXhwb3J0IGNvbnN0IFNFTEVDVF9XQU5UX1RPX0FERCA9ICdTRUxFQ1RfV0FOVF9UT19BREQnO1xuZXhwb3J0IGNvbnN0IEFERF9DQVRFR09SWSA9ICdBRERfQ0FURUdPUlknO1xuZXhwb3J0IGNvbnN0IEFERF9BUkdVTUVOVCA9ICdBRERfQVJHVU1FTlQnO1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9DQVRFR09SWSA9ICdTRUxFQ1RfQ0FURUdPUlknO1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9DT01QTEVURV9EQVRFID0gJ1NFTEVDVF9DT01QTEVURV9EQVRFJztcbmV4cG9ydCBjb25zdCBET05FID0gJ0RPTkUnO1xuXG5leHBvcnQgY29uc3Qgc3RlcExpc3QgPSBbXG4gIHtcbiAgICBpZDogU0VMRUNUX1dBTlRfVE9fQURELFxuICAgIGRlc2NyaXB0aW9uOiAnV2hhdCB3YW50IHRvIGFkZCcsXG4gIH0sXG4gIHtcbiAgICBpZDogQUREX0NBVEVHT1JZLFxuICAgIGRlc2NyaXB0aW9uOiAnQWRkIGEgY2F0ZWdvcnknLFxuICB9LFxuICB7XG4gICAgaWQ6IFNFTEVDVF9DQVRFR09SWSxcbiAgICBkZXNjcmlwdGlvbjogJ1NlbGVjdCBhIGNhdGVnb3J5JyxcbiAgfSxcbiAge1xuICAgIGlkOiBBRERfQVJHVU1FTlQsXG4gICAgZGVzY3JpcHRpb246ICdBZGQgQXJndW1lbnQnLFxuICB9LFxuICB7XG4gICAgaWQ6IFNFTEVDVF9DT01QTEVURV9EQVRFLFxuICAgIGRlc2NyaXB0aW9uOiAnU2NoZWR1bGUnLFxuICB9LFxuICB7XG4gICAgaWQ6IERPTkUsXG4gICAgZGVzY3JpcHRpb246ICdUaGF0XFwncyBpdCcsXG4gIH0sXG5dO1xuIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBDYXRlZ29yaWVzRmlsdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvQ2F0ZWdvcmllc0ZpbHRlcic7XG5pbXBvcnQge1xuICBzZWxlY3RDYXRlZ29yeSxcbiAgc2VsZWN0Q2F0ZWdvcnlBbGwsXG4gIGRlbGV0ZUNhdGVnb3J5LFxufSBmcm9tICcuLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5pbXBvcnQgY2F0ZWdvcnlBbGwgZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmltcG9ydCB7IGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0IH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgY2F0ZWdvcnlMaXN0OiBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdChzdGF0ZSksXG4gIH1cbik7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcbiAge1xuICAgIG9uRGVsZXRlQ2F0ZWdvcnk6IChjYXRlZ29yeSkgPT4ge1xuICAgICAgZGlzcGF0Y2goZGVsZXRlQ2F0ZWdvcnkoY2F0ZWdvcnkuaWQpKTtcbiAgICB9LFxuICAgIG9uQ2lsY2tDYXRlZ29yeTogKGNhdGVnb3J5LCBlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnaScgJiYgZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnYnV0dG9uJykge1xuICAgICAgICBpZiAoY2F0ZWdvcnkuaWQgPT09IGNhdGVnb3J5QWxsLmlkKSB7XG4gICAgICAgICAgZGlzcGF0Y2goc2VsZWN0Q2F0ZWdvcnlBbGwoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGlzcGF0Y2goc2VsZWN0Q2F0ZWdvcnkoY2F0ZWdvcnkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gIH1cbik7XG5cbmNvbnN0IENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIgPSBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbikoQ2F0ZWdvcmllc0ZpbHRlcik7XG5cbmV4cG9ydCBkZWZhdWx0IENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXI7XG4iLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFRhc2tzIGZyb20gJy4uL2NvbXBvbmVudHMvVGFza3MnO1xuaW1wb3J0IHtcbiAgZmV0Y2hUYXNrc0J5Q2F0ZWdvcnksXG4gIGRlbGV0ZVRhc2ssXG4gIHRvb2dsZVRhc2tDb21wbGV0ZWQsXG59IGZyb20gJy4uL2FjdGlvbnMvdG9kb1Rhc2tzQWN0aW9ucyc7XG5cbmltcG9ydCB7IGdldFRhc2tMaXN0LCBnZXRTa2lwLCBzdGlsbE1vcmVUb0xvYWQgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb1Rhc2tzU2VsZWN0b3JzJztcbmltcG9ydCB7IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkLCB2aXNpYmlsaXR5T25seUNvbXBsZXRlZCB9IGZyb20gJy4uL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IChcbiAge1xuICAgIHRhc2tMaXN0OiBnZXRUYXNrTGlzdChzdGF0ZSksXG4gICAgc2tpcDogZ2V0U2tpcChzdGF0ZSksXG4gICAgbW9yZVRvTG9hZDogc3RpbGxNb3JlVG9Mb2FkKHN0YXRlKSxcbiAgICBjYXRlZ29yaWVzSWQ6IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkKHN0YXRlKSxcbiAgICBjb21wbGV0ZWQ6IHZpc2liaWxpdHlPbmx5Q29tcGxldGVkKHN0YXRlKSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgb25EZWxldGVBcmd1bWVudDogKHRhc2spID0+IHtcbiAgICAgIGRpc3BhdGNoKGRlbGV0ZVRhc2sodGFzay5pZCkpO1xuICAgIH0sXG4gICAgb25Db21wbGV0ZUFyZ3VtZW50OiAodGFzaykgPT4ge1xuICAgICAgZGlzcGF0Y2godG9vZ2xlVGFza0NvbXBsZXRlZCh0YXNrLmlkLCB0YXNrLmNvbXBsZXRlZCkpO1xuICAgIH0sXG4gICAgZmV0Y2hUYXNrczogKGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgc2tpcCkgPT4ge1xuICAgICAgZGlzcGF0Y2goZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkoY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsIGxpbWl0LCBza2lwKSk7XG4gICAgfSxcbiAgfVxuKTtcblxuY29uc3QgVGFza3NDb250YWluZXIgPSBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbikoVGFza3MpO1xuXG5leHBvcnQgZGVmYXVsdCBUYXNrc0NvbnRhaW5lcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgVG9kb3MgZnJvbSAnLi4vY29tcG9uZW50cy9Ub2Rvcyc7XG5pbXBvcnQgeyBmZXRjaEFsbENhdGVnb3JpZXMgfSBmcm9tICcuLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5pbXBvcnQgeyBoaWRlTWVzc2FnZSB9IGZyb20gJy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuaW1wb3J0IHsgc2hvd0xvYWRpbmcgfSBmcm9tICcuLi9zZWxlY3RvcnMvY29tbW9uU2VsZWN0b3JzJztcblxuY29uc3QgVG9kb3NDb250YWluZXIgPSBwcm9wcyA9PiA8VG9kb3Mgey4uLnByb3BzfSAvPjtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgbWVzc2FnZTogc3RhdGUubWVzc2FnZSxcbiAgICBzaG93TG9hZGluZzogc2hvd0xvYWRpbmcoc3RhdGUpLFxuICB9XG4pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoXG4gIHtcbiAgICBoaWRlTWVzc2FnZTogKCkgPT4ge1xuICAgICAgZGlzcGF0Y2goaGlkZU1lc3NhZ2UoKSk7XG4gICAgfSxcbiAgICBpbml0RmV0Y2hBbGxDYXRlZ29yaWVzOiAoKSA9PiB7XG4gICAgICBkaXNwYXRjaChmZXRjaEFsbENhdGVnb3JpZXMoKSk7XG4gICAgfSxcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVG9kb3NDb250YWluZXIpO1xuIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaXNpYmlsaXR5RmlsdGVycyBmcm9tICcuLi9jb21wb25lbnRzL1Zpc2liaWxpdHlGaWx0ZXJzJztcbmltcG9ydCB7IGNoYW5nZVZpc2liaWxpdHkgfSBmcm9tICcuLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5cbmltcG9ydCB7IGdldFZpc2liaWxpdHlGaWx0ZXIgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXI6IGdldFZpc2liaWxpdHlGaWx0ZXIoc3RhdGUpLFxuICB9XG4pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoXG4gIHtcbiAgICBvblZpc2liaWxpdHlTd2l0Y2hDbGljazogdmlzaWJpbGl0eSA9PiAoKSA9PiAoXG4gICAgICBkaXNwYXRjaChjaGFuZ2VWaXNpYmlsaXR5KHZpc2liaWxpdHkpKVxuICAgICksXG4gIH1cbik7XG5cbmNvbnN0IFZpc2liaWxpdHlGaWx0ZXJDb250YWluZXIgPSBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbikoVmlzaWJpbGl0eUZpbHRlcnMpO1xuXG5leHBvcnQgZGVmYXVsdCBWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyO1xuIiwiaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgeyBpc0ZldGNoaW5nQ2F0ZWdvcmllc0ZpbHRlciB9IGZyb20gJy4vdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuaW1wb3J0IHsgaXNGZXRjaGluZ1Rhc2tzIH0gZnJvbSAnLi90b2RvVGFza3NTZWxlY3RvcnMnO1xuXG5leHBvcnQgY29uc3Qgc2hvd0xvYWRpbmcgPSBjcmVhdGVTZWxlY3RvcihcbiAgaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIsXG4gIGlzRmV0Y2hpbmdUYXNrcyxcbiAgKGlzRmV0Y2hpbmdDYXRlZ29yaWVzLCBpc0ZldGNoaW5nVG9kb3MpID0+IGlzRmV0Y2hpbmdDYXRlZ29yaWVzIHx8IGlzRmV0Y2hpbmdUb2Rvcyxcbik7XG5cbmV4cG9ydCBkZWZhdWx0IHNob3dMb2FkaW5nO1xuIiwiaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgeyBPTkxZX0NPTVBMRVRFRCB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuXG5leHBvcnQgY29uc3QgaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy5pc0ZldGNoaW5nO1xuZXhwb3J0IGNvbnN0IGdldFRvZG9GaWx0ZXJzID0gc3RhdGUgPT4gc3RhdGUudG9kb0ZpbHRlcnM7XG5leHBvcnQgY29uc3QgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy5jYXRlZ29yaWVzO1xuZXhwb3J0IGNvbnN0IGdldFZpc2liaWxpdHlGaWx0ZXIgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy52aXNpYmlsaXR5O1xuXG5leHBvcnQgY29uc3QgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0VmlzaWJpbGl0eUZpbHRlcixcbiAgdmlzaWJpbGl0eSA9PiB2aXNpYmlsaXR5ID09PSBPTkxZX0NPTVBMRVRFRCxcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRTZWxlY3RlZENhdGVnb3JpZXNGaWx0ZXIgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QsXG4gIGNhdGVnb3JpZXMgPT4gY2F0ZWdvcmllcy5maWx0ZXIoY2F0ZWdvcnkgPT4gY2F0ZWdvcnkuc2VsZWN0ZWQpLFxuKTtcblxuZXhwb3J0IGNvbnN0IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0LFxuICBjYXRlZ29yaWVzID0+IGNhdGVnb3JpZXMuZmlsdGVyKGNhdGVnb3J5ID0+IGNhdGVnb3J5LnNlbGVjdGVkKVxuICAgIC5tYXAoY2F0ZWdvcnlGaWx0ZXIgPT4gY2F0ZWdvcnlGaWx0ZXIuaWQpLFxuKTtcbiIsImV4cG9ydCBjb25zdCBpc0ZldGNoaW5nVGFza3MgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvVGFza3MuaXNGZXRjaGluZztcbmV4cG9ydCBjb25zdCBnZXRUYXNrcyA9IHN0YXRlID0+IHN0YXRlLnRvZG9UYXNrcztcbmV4cG9ydCBjb25zdCBnZXRUYXNrTGlzdCA9IHN0YXRlID0+IHN0YXRlLnRvZG9UYXNrcy5pdGVtcztcbmV4cG9ydCBjb25zdCBnZXRTa2lwID0gc3RhdGUgPT4gc3RhdGUudG9kb1Rhc2tzLnNraXA7XG5leHBvcnQgY29uc3Qgc3RpbGxNb3JlVG9Mb2FkID0gc3RhdGUgPT4gc3RhdGUudG9kb1Rhc2tzLm1vcmVUb0xvYWQ7XG4iLCIvKiBlc2xpbnQgcXVvdGUtcHJvcHM6IFtcImVycm9yXCIsIFwiY29uc2lzdGVudFwiXSAqL1xuXG5leHBvcnQgY29uc3QgTWV0aG9kcyA9IHtcbiAgUE9TVDogJ1BPU1QnLFxuICBHRVQ6ICdHRVQnLFxuICBERUxFVEU6ICdERUxFVEUnLFxuICBQQVRDSDogJ1BBVENIJyxcbn07XG5cbmNvbnN0IGZ1bGxVcmwgPSB1cmwgPT4gYC9hcGkvJHt1cmx9YDtcblxuY29uc3QgYmFzZVJlcXVlc3RJbml0ID0ge1xuICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICBoZWFkZXJzOiB7XG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgfSxcbn07XG5cbmNvbnN0IGNyZWF0ZVBvc3RSZXF1ZXN0ID0gKHVybCwgb3B0aW9ucyA9IHt9KSA9PiAoXG4gIGZldGNoKHVybCwge1xuICAgIC4uLmJhc2VSZXF1ZXN0SW5pdCxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvcHRpb25zKSxcbiAgfSlcbik7XG5cbmNvbnN0IGNyZWF0ZUdldFJlcXVlc3QgPSAodXJsLCBvcHRpb25zID0ge30pID0+IHtcbiAgbGV0IGZpbmFsVXJsID0gYCR7dXJsfT9gO1xuICBPYmplY3QuZW50cmllcyhvcHRpb25zKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0sIHBvaXRpb24pID0+IHtcbiAgICBmaW5hbFVybCA9IGAke2ZpbmFsVXJsfSR7KHBvaXRpb24gPiAwKSA/ICcmJyA6ICcnfSR7a2V5fT0ke3ZhbHVlfWA7XG4gIH0pO1xuICByZXR1cm4gZmV0Y2goZmluYWxVcmwsIHtcbiAgICAuLi5iYXNlUmVxdWVzdEluaXQsXG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVEZWxldGVSZXF1ZXN0ID0gKHVybCwgb3B0aW9ucykgPT4ge1xuICBjb25zdCBmaW5hbFVybCA9IGAke3VybH0vJHtvcHRpb25zfWA7XG4gIHJldHVybiBmZXRjaChmaW5hbFVybCwge1xuICAgIC4uLmJhc2VSZXF1ZXN0SW5pdCxcbiAgICBtZXRob2Q6ICdERUxFVEUnLFxuICB9KTtcbn07XG5cbmNvbnN0IGNyZWF0ZVBhdGNoUmVxdWVzdCA9ICh1cmwsIG9wdGlvbnMgPSB7fSkgPT4gKFxuICBmZXRjaCh1cmwsIHtcbiAgICAuLi5iYXNlUmVxdWVzdEluaXQsXG4gICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpLFxuICB9KVxuKTtcblxuY29uc3QgY3JlYXRlUmVxdWVzdCA9ICh1cmwsIG9wdGlvbnMsIG1ldGhvZCkgPT4ge1xuICBjb25zdCBmaW5hbFVybCA9IGZ1bGxVcmwodXJsKTtcbiAgc3dpdGNoIChtZXRob2QpIHtcbiAgICBjYXNlIE1ldGhvZHMuUE9TVDogcmV0dXJuIGNyZWF0ZVBvc3RSZXF1ZXN0KGZpbmFsVXJsLCBvcHRpb25zKTtcbiAgICBjYXNlIE1ldGhvZHMuR0VUOiByZXR1cm4gY3JlYXRlR2V0UmVxdWVzdChmaW5hbFVybCwgb3B0aW9ucyk7XG4gICAgY2FzZSBNZXRob2RzLkRFTEVURTogcmV0dXJuIGNyZWF0ZURlbGV0ZVJlcXVlc3QoZmluYWxVcmwsIG9wdGlvbnMpO1xuICAgIGNhc2UgTWV0aG9kcy5QQVRDSDogcmV0dXJuIGNyZWF0ZVBhdGNoUmVxdWVzdChmaW5hbFVybCwgb3B0aW9ucyk7XG4gICAgZGVmYXVsdDogcmV0dXJuIGNyZWF0ZVBvc3RSZXF1ZXN0KGZpbmFsVXJsLCBvcHRpb25zKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNhbGxBcGkgPSAodXJsLCBvcHRpb25zID0ge30sIG1ldGhvZCA9IE1ldGhvZHMuUE9TVCkgPT4gKFxuICBjcmVhdGVSZXF1ZXN0KHVybCwgb3B0aW9ucywgbWV0aG9kKS50aGVuKFxuICAgIHJlc3BvbnNlID0+IChyZXNwb25zZS5vayA/XG4gICAgICByZXNwb25zZS5qc29uKCkgOlxuICAgICAgUHJvbWlzZS5yZWplY3QocmVzcG9uc2UudGV4dCgpKVxuICAgICksXG4gICAgZXJyb3IgPT4gUHJvbWlzZS5yZWplY3QoZXJyb3IpLFxuICApXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBjYWxsQXBpO1xuXG4iLCJpbXBvcnQgZGF0ZUZvcm1hdCBmcm9tICdkYXRlZm9ybWF0JztcblxuZXhwb3J0IGNvbnN0IHRvSnNEYXRlID0gKHBhcnNlRGF0ZSA9ICcnKSA9PlxuICBuZXcgRGF0ZShwYXJzZUludChwYXJzZURhdGUuc3Vic3RyKDYpLCAxMCkpO1xuXG5leHBvcnQgY29uc3QgdG9TaW1wbGVEYXRlRm9ybWF0ID0gZGF0ZSA9PlxuICBkYXRlRm9ybWF0KGRhdGUsICdkZGRkIGRkIG1tbSB5eXl5Jyk7XG4iXSwic291cmNlUm9vdCI6IiJ9