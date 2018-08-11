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

/***/ "./src/actions/tasksActions.js":
/*!*************************************!*\
  !*** ./src/actions/tasksActions.js ***!
  \*************************************/
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
  return function (dispatch) {
    dispatch(requestFetchTasks(limit, skip));
    var request = (0, _ApiUtils.callApi)('tasks', {
      categoriesId: categoriesId, completed: completed, limit: limit, skip: skip
    }, _ApiUtils.Methods.GET);
    return request.then(function (response) {
      if (response.success) {
        var todos = response.data.map(function (todo) {
          return _extends({}, todo, {
            completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined,
            todoWithin: todo.todoWithin ? new Date(todo.todoWithin) : undefined
          });
        });
        dispatch(receiveFetchTasks(todos));
      } else {
        dispatch(errorFetchTasks(response.messageError));
      }
    }, function (error) {
      return { error: error };
    });
  };
};

var deleteTask = exports.deleteTask = function deleteTask() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return function (dispatch, getState) {
    var request = (0, _ApiUtils.callApi)('tasks', id, _ApiUtils.Methods.DELETE);
    return request.then(function (response) {
      if (response.success) {
        var items = getState().tasks.items;

        var todoArgumentIndex = items.findIndex(function (todoArgument) {
          return todoArgument.id === id;
        });
        dispatch(removeTaskLocal(todoArgumentIndex));
      } else {
        dispatch((0, _messageActions.showMessageError)(response.messageError));
      }
    }, function (error) {
      return { error: error };
    });
  };
};

var addTask = exports.addTask = function addTask() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var description = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var category = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { id: '' };
  var todoWithin = arguments[3];
  var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
  return function (dispatch) {
    var request = (0, _ApiUtils.callApi)('tasks', {
      title: title,
      description: description,
      categoryId: category.id,
      todoWithin: todoWithin
    }, _ApiUtils.Methods.POST);
    return request.then(function (response) {
      if (response.success) {
        var todo = _extends({}, response.data, {
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
    }, function (error) {
      return { error: error };
    });
  };
};

var toogleTaskCompleted = exports.toogleTaskCompleted = function toogleTaskCompleted() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var isCompleted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function (dispatch) {
    var completed = !isCompleted;
    var completedAt = completed ? new Date() : null;
    var request = (0, _ApiUtils.callApi)('tasks', { id: id, completed: completed, completedAt: completedAt }, _ApiUtils.Methods.PATCH);
    return request.then(function (response) {
      if (response.success) {
        var todo = _extends({}, response.data, {
          completedAt: response.data.completedAt ? new Date(response.data.completedAt) : undefined
        });
        dispatch(updateTaskLocal(todo));
      } else {
        dispatch((0, _messageActions.showMessageError)(response.messageError));
      }
    }, function (error) {
      return { error: error };
    });
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

var _tasksActions = __webpack_require__(/*! ./tasksActions */ "./src/actions/tasksActions.js");

var _messageActions = __webpack_require__(/*! ./messageActions */ "./src/actions/messageActions.js");

var _todoFiltersSelectors = __webpack_require__(/*! ../selectors/todoFiltersSelectors */ "./src/selectors/todoFiltersSelectors.js");

var fetchTasks = function fetchTasks(state) {
  return (0, _tasksActions.fetchTasksByCategory)((0, _todoFiltersSelectors.getSelectedCategoriesId)(state), (0, _todoFiltersSelectors.visibilityOnlyCompleted)(state));
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
  return function (dispatch, getState) {
    dispatch(requestFetchAllCategories());
    var request = (0, _ApiUtils.callApi)('categories', { limit: limit, skip: skip }, _ApiUtils.Methods.GET);
    return request.then(function (response) {
      if (response.success) {
        dispatch(receiveFetchAllCategories(response.data));
        dispatch((0, _tasksActions.fetchTasksByCategory)((0, _todoFiltersSelectors.getSelectedCategoriesId)(getState())));
      } else {
        dispatch(errorFetchAllCategories(response.messageError));
      }
    }, function (error) {
      return dispatch((0, _messageActions.showMessageError)(error.message));
    });
  };
};

var deleteCategory = exports.deleteCategory = function deleteCategory() {
  var categoryId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return function (dispatch, getState) {
    var request = (0, _ApiUtils.callApi)('categories', categoryId, _ApiUtils.Methods.DELETE);
    return request.then(function (response) {
      if (response.success) {
        var categories = getState().todoFilters.categories;

        var categoryIndex = categories.findIndex(function (category) {
          return category.id === categoryId;
        });
        dispatch(removeCategoryLocal(categoryIndex));
      } else {
        dispatch((0, _messageActions.showMessageError)(response.messageError));
      }
    }, function (error) {
      return dispatch((0, _messageActions.showMessageError)(error.message));
    });
  };
};

/**
 * Request to add a category
 * @param {String} name category name to add
 * @param {Function} callback function that need to handle the category created
 */
var addCategory = exports.addCategory = function addCategory() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  return function (dispatch) {
    var request = (0, _ApiUtils.callApi)('categories', { name: name }, _ApiUtils.Methods.POST);
    return request.then(function (response) {
      if (response.success) {
        dispatch(addCategoryLocal(response.data));
        if (callback !== undefined) {
          callback(response.data);
        }
      } else {
        dispatch((0, _messageActions.showMessageError)(response.messageError));
      }
    }, function (error) {
      return dispatch((0, _messageActions.showMessageError)(error.message));
    });
  };
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

var _tasksActions = __webpack_require__(/*! ../../actions/tasksActions */ "./src/actions/tasksActions.js");

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
      dispatch((0, _tasksActions.addTask)(title, description, category, todoWithin, this.onTodoArgumentCreated));
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

var _tasksActions = __webpack_require__(/*! ../actions/tasksActions */ "./src/actions/tasksActions.js");

var _tasksSelectors = __webpack_require__(/*! ../selectors/tasksSelectors */ "./src/selectors/tasksSelectors.js");

var _todoFiltersSelectors = __webpack_require__(/*! ../selectors/todoFiltersSelectors */ "./src/selectors/todoFiltersSelectors.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    taskList: (0, _tasksSelectors.getTaskList)(state),
    skip: (0, _tasksSelectors.getSkip)(state),
    moreToLoad: (0, _tasksSelectors.stillMoreToLoad)(state),
    categoriesId: (0, _todoFiltersSelectors.getSelectedCategoriesId)(state),
    completed: (0, _todoFiltersSelectors.visibilityOnlyCompleted)(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onDeleteArgument: function onDeleteArgument(task) {
      dispatch((0, _tasksActions.deleteTask)(task.id));
    },
    onCompleteArgument: function onCompleteArgument(task) {
      dispatch((0, _tasksActions.toogleTaskCompleted)(task.id, task.completed));
    },
    fetchTasks: function fetchTasks(categoriesId, completed, limit, skip) {
      dispatch((0, _tasksActions.fetchTasksByCategory)(categoriesId, completed, limit, skip));
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

var _tasksSelectors = __webpack_require__(/*! ./tasksSelectors */ "./src/selectors/tasksSelectors.js");

var showLoading = exports.showLoading = (0, _reselect.createSelector)(_todoFiltersSelectors.isFetchingCategoriesFilter, _tasksSelectors.isFetchingTasks, function (isFetchingCategories, isFetchingTodos) {
  return isFetchingCategories || isFetchingTodos;
});

exports.default = showLoading;

/***/ }),

/***/ "./src/selectors/tasksSelectors.js":
/*!*****************************************!*\
  !*** ./src/selectors/tasksSelectors.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var isFetchingTasks = exports.isFetchingTasks = function isFetchingTasks(state) {
  return state.tasks.isFetching;
};
var getTasks = exports.getTasks = function getTasks(state) {
  return state.tasks;
};
var getTaskList = exports.getTaskList = function getTaskList(state) {
  return state.tasks.items;
};
var getSkip = exports.getSkip = function getSkip(state) {
  return state.tasks.skip;
};
var stillMoreToLoad = exports.stillMoreToLoad = function stillMoreToLoad(state) {
  return state.tasks.moreToLoad;
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy9tZXNzYWdlQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy90YXNrc0FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMvdG9kb0ZpbHRlcnNBY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0J1dHRvbkNvbXBsZXRlQXJndW1lbnQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0J1dHRvbkRlbGV0ZUFyZ3VtZW50LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CdXR0b25EZWxldGVDYXRlZ29yeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQnV0dG9uU2NvbGwuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0NhdGVnb3JpZXNGaWx0ZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0NhdGVnb3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9JbmZpbml0ZVNjcm9sbC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTWFpbkFkZEJ1dHRvbi5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvU25hY2tiYXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Rhc2suanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Rhc2tzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ub2Rvcy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVmlzaWJpbGl0eUZpbHRlcnMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Zpc2liaWxpdHlTd2l0Y2guanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FuaW1zL0NvbGxhcHNlLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9EaWFsb2dBbmltLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9SZXBsYWNlQW5pbS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvUmVzaXplLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9TbmFja2JhckFuaW0uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9BZGRDYXRlZ29yeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0FkZFRvZG9Bcmd1bWVudC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0RpYWxvZ0FkZC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0RvbmUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9TZWxlY3RBY3Rpb25BZGQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9TZWxlY3RDYXRlZ29yeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL1NlbGVjdENvbXBsZXRlRGF0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL1N0ZXBzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2xhYmVscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL3N0ZXBzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL0NhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL1Rhc2tzQ29udGFpbmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9Ub2Rvc0NvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy9jb21tb25TZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy90YXNrc1NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9BcGlVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvQ29tbW9uLmpzIl0sIm5hbWVzIjpbInNob3dNZXNzYWdlSW5mbyIsInR5cGUiLCJTSE9XX01FU1NBR0VfSU5GTyIsIm1lc3NhZ2UiLCJzaG93TWVzc2FnZUVycm9yIiwiU0hPV19NRVNTQUdFX0VSUk9SIiwiaGlkZU1lc3NhZ2UiLCJISURFX01FU1NBR0UiLCJyZXF1ZXN0RmV0Y2hUYXNrcyIsImxpbWl0Iiwic2tpcCIsIlJFUVVFU1RfRkVUQ0hfVEFTS1MiLCJyZWNlaXZlRmV0Y2hUYXNrcyIsIlJFQ0VJVkVfRkVUQ0hfVEFTS1MiLCJ0YXNrcyIsImVycm9yRmV0Y2hUYXNrcyIsIkVSUk9SX0ZFVENIX1RBU0tTIiwiZXJyb3IiLCJhZGRUYXNrTG9jYWwiLCJBRERfVEFTS19MT0NBTCIsInRhc2siLCJyZW1vdmVUYXNrTG9jYWwiLCJSRU1PVkVfVEFTS19MT0NBTCIsInRhc2tJbmRleCIsInVwZGF0ZVRhc2tMb2NhbCIsIlVQREFURV9UQVNLX0xPQ0FMIiwiZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkiLCJjYXRlZ29yaWVzSWQiLCJjb21wbGV0ZWQiLCJxdWVyeUl0ZW1zTGltaXQiLCJkaXNwYXRjaCIsInJlcXVlc3QiLCJNZXRob2RzIiwiR0VUIiwidGhlbiIsInJlc3BvbnNlIiwic3VjY2VzcyIsInRvZG9zIiwiZGF0YSIsIm1hcCIsInRvZG8iLCJjb21wbGV0ZWRBdCIsIkRhdGUiLCJ1bmRlZmluZWQiLCJ0b2RvV2l0aGluIiwibWVzc2FnZUVycm9yIiwiZGVsZXRlVGFzayIsImlkIiwiZ2V0U3RhdGUiLCJERUxFVEUiLCJpdGVtcyIsInRvZG9Bcmd1bWVudEluZGV4IiwiZmluZEluZGV4IiwidG9kb0FyZ3VtZW50IiwiYWRkVGFzayIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJjYXRlZ29yeSIsImNhbGxiYWNrIiwiY2F0ZWdvcnlJZCIsIlBPU1QiLCJ0b29nbGVUYXNrQ29tcGxldGVkIiwiaXNDb21wbGV0ZWQiLCJQQVRDSCIsImZldGNoVGFza3MiLCJzdGF0ZSIsInJlcXVlc3RGZXRjaEFsbENhdGVnb3JpZXMiLCJSRVFVRVNUX0ZFVENIX0FMTF9DQVRFR09SSUVTIiwicmVjZWl2ZUZldGNoQWxsQ2F0ZWdvcmllcyIsIlJFQ0VJVkVfRkVUQ0hfQUxMX0NBVEVHT1JJRVMiLCJjYXRlZ29yaWVzIiwiZXJyb3JGZXRjaEFsbENhdGVnb3JpZXMiLCJFUlJPUl9GRVRDSF9BTExfQ0FURUdPUklFUyIsImFkZENhdGVnb3J5TG9jYWwiLCJBRERfQ0FURUdPUllfTE9DQUwiLCJyZW1vdmVDYXRlZ29yeUxvY2FsIiwiUkVNT1ZFX0NBVEVHT1JZX0xPQ0FMIiwiY2F0ZWdvcnlJbmRleCIsInRvb2dsZVNlbGVjdENhdGVnb3J5IiwiVE9PR0xFX1NFTEVDVF9DQVRFR09SWSIsInNlbGVjdGVkQ2F0ZWdvcnkiLCJ0b29nbGVTZWxlY3RDYXRlZ29yeUFsbCIsIlRPT0dMRV9TRUxFQ1RfQ0FURUdPUllfQUxMIiwic3dpdGNoVmlzaWJpbGl0eUZpbHRlciIsIlNXSVRDSF9WSVNJQklMSVRZX0ZJTFRFUiIsInZpc2liaWxpdHkiLCJmZXRjaEFsbENhdGVnb3JpZXMiLCJkZWxldGVDYXRlZ29yeSIsInRvZG9GaWx0ZXJzIiwiYWRkQ2F0ZWdvcnkiLCJuYW1lIiwiY2hhbmdlVmlzaWJpbGl0eSIsInNlbGVjdENhdGVnb3J5Iiwic2VsZWN0Q2F0ZWdvcnlBbGwiLCJCdXR0b25Db21wbGV0ZUFyZ3VtZW50Iiwib25DbGljayIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiYm9vbCIsImRlZmF1bHRQcm9wcyIsIkJ1dHRvbkRlbGV0ZUFyZ3VtZW50IiwiQnV0dG9uRGVsZXRlQ2F0ZWdvcnkiLCJCdXR0b25TY3JvbGwiLCJkaXJlY3Rpb24iLCJvbmVPZiIsIkNhdGVnb3JpZXNGaWx0ZXIiLCJwcm9wcyIsImNoaXBzIiwiaGFuZGxlTGVmdFNjcm9sbENsaWNrIiwiYmluZCIsImhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2siLCJtb3ZlQ2hpcHNTY3JvbGwiLCJjbGllbnRXaWR0aCIsImRlbHRhIiwibmV4dFNjcm9sbExlZnQiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsIiwibGVmdCIsImNhdGVnb3J5TGlzdCIsIm9uRGVsZXRlQ2F0ZWdvcnkiLCJvbkNpbGNrQ2F0ZWdvcnkiLCJub2RlIiwiZGlzcGxheSIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0Iiwic2VsZWN0ZWQiLCJSZWFjdCIsIkNvbXBvbmVudCIsImFycmF5T2YiLCJzaGFwZSIsInN0cmluZyIsIkNhdGVnb3J5Iiwib25EZWxldGUiLCJjc3NDbGFzcyIsIm9uQ2hpcENsaWNrIiwiZSIsIm9uRGVsZXRlQ2xpY2siLCJ3YWl0VGltZSIsIkluZmluaXRlU2Nyb2xsIiwib25TY3JvbGwiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImlubmVySGVpZ2h0Iiwic2Nyb2xsWSIsImRvY3VtZW50IiwiYm9keSIsIm9mZnNldEhlaWdodCIsImFyZ3MiLCJjaGlsZHJlbiIsImNsYXNzTmFtZSIsImFueSIsIk1haW5BZGRCdXR0b24iLCJBY3Rpb24iLCJ0ZXh0IiwiU25hY2tiYXIiLCJvbkNsb3NlIiwiZHVyYXRpb24iLCJzaG93Iiwic2V0VGltZW91dCIsImlzRXJyb3IiLCJhY3Rpb25UZXh0IiwiYWN0aW9uQ2xpY2siLCJ2ZXJ0aWNhbFBvc3Rpb24iLCJob3Jpem9udGFsUG9zaXRpb24iLCJudW1iZXIiLCJUYXNrIiwiY29sbGFwc2VkIiwicmVuZGVyRGF0ZSIsInNldFN0YXRlIiwib25Db21wbGV0ZSIsIm9uVGl0bGVDbGljayIsImluaXRpYWxTdGF0ZSIsIlRhc2tzIiwib25GZXRjaFRvZG9Bcmd1bWVudHNOZXh0IiwibW9yZVRvTG9hZCIsIm5ld1NraXAiLCJ0YXNrTGlzdCIsIm9uRGVsZXRlQXJndW1lbnQiLCJvbkNvbXBsZXRlQXJndW1lbnQiLCJhcmciLCJuZXh0UHJvcHMiLCJwcmV2U3RhdGUiLCJUb2RvcyIsImlzRGlhbG9nQWRkT3BlbiIsImluaXRGZXRjaEFsbENhdGVnb3JpZXMiLCJzaG93TG9hZGluZyIsIlZpc2liaWxpdHlGaWx0ZXIiLCJzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIiLCJvblZpc2liaWxpdHlTd2l0Y2hDbGljayIsIk9OTFlfVE9fQ09NUExFVEUiLCJBTExfVE9ET1MiLCJPTkxZX0NPTVBMRVRFRCIsIlZpc2liaWxpdHlTd2l0Y2giLCJkZWZhdWx0U3R5bGUiLCJ0cmFuc2l0aW9uIiwiaGVpZ2h0Iiwib25FbnRlciIsInN0eWxlIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJvbkV4aXQiLCJDb2xsYXBzZSIsImluUHJvcCIsImluIiwib3BhY2l0eSIsInRyYW5zaXRpb25TdHlsZXMiLCJlbnRlcmluZyIsImVudGVyZWQiLCJEaWFsb2dBbmltIiwid2lkdGgiLCJlbnRlciIsIlJlcGxhY2VBbmltIiwiZW5kTGlzdGVuZXIiLCJleGl0Iiwib25FbnRlcmVkIiwib25FeGl0ZWQiLCJSZXNpemUiLCJib3R0b20iLCJTbmFja2JhckFuaW0iLCJjdXN0b21DbGFzcyIsIkFkZENhdGVnb3J5Iiwib25JbnB1dFRleHRDaGFuZ2UiLCJvbkJ1dHRvbkFkZENsaWNrIiwib25DYXRlZ29yeUNyZWF0ZWQiLCJ0YXJnZXQiLCJ2YWx1ZSIsImxhYmVscyIsIm1zZ05hbWVSZXF1aXJlZCIsIm9uTmV4dCIsInN0ZXBJZCIsIkFERF9BUkdVTUVOVCIsIm9wdGlvbnMiLCJBZGRUb2RvQXJndW1lbnQiLCJvbkJ1dHRvblNjaGVkdWxlQ2xpY2siLCJtc2dUaXRsZVJlcXVpcmVkIiwiU0VMRUNUX0NPTVBMRVRFX0RBVEUiLCJnZXRDb250ZW50VG9SZW5kZXIiLCJzdGVwcyIsImxlbmd0aCIsImxhc3RTdGVwIiwiU0VMRUNUX1dBTlRfVE9fQUREIiwiQUREX0NBVEVHT1JZIiwiU0VMRUNUX0NBVEVHT1JZIiwiRE9ORSIsImluaXRhbFN0YXRlIiwibmV4dFN0ZXBzIiwic2hvd1N0ZXAiLCJEaWFsb2dBZGQiLCJvbkJhY2siLCJvblJlc2V0QW5kQ2xvc2UiLCJvbkFuaW1hdGlvbkVuZCIsInN0ZXBDb3VudCIsInNsaWNlIiwic3RlcCIsImNvbXBsZXRlIiwiZG9uZSIsIm9wZW4iLCJzdGVwTGlzdCIsIkRvbmUiLCJTZWxlY3RBY3Rpb25BZGQiLCJTZWxlY3RDYXRlZ29yeSIsIm9uQ2F0ZWdvcnlDbGljayIsIm9uQnV0dG9uTmV4dENsaWNrIiwibXNnU2VsZWN0Q2F0ZWdvcnkiLCJjYXRlZ29yaWVzTGlzdCIsIm1hcFN0YXRlVG9Qcm9wIiwiU2VsZWN0Q29tcGxldGVEYXRlIiwib25JbnB1dERhdGVDaGFuZ2UiLCJvblRvZG9Bcmd1bWVudENyZWF0ZWQiLCJkYXRlIiwibXNnU2VsZWN0RGF0ZSIsIlN0ZXAiLCJuZWVkTGluZSIsIlN0ZXBzIiwibGlzdCIsInN0ZXBIaXN0b3J5IiwiaXRlbSIsImkiLCJmaWx0ZXIiLCJzaCIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImNhdGVnb3J5QWxsIiwiQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lciIsIlRhc2tzQ29udGFpbmVyIiwiVG9kb3NDb250YWluZXIiLCJWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyIiwiVmlzaWJpbGl0eUZpbHRlcnMiLCJpc0ZldGNoaW5nQ2F0ZWdvcmllc0ZpbHRlciIsImlzRmV0Y2hpbmdUYXNrcyIsImlzRmV0Y2hpbmdDYXRlZ29yaWVzIiwiaXNGZXRjaGluZ1RvZG9zIiwiaXNGZXRjaGluZyIsImdldFRhc2tzIiwiZ2V0VGFza0xpc3QiLCJnZXRTa2lwIiwic3RpbGxNb3JlVG9Mb2FkIiwiZ2V0VG9kb0ZpbHRlcnMiLCJnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdCIsImdldFZpc2liaWxpdHlGaWx0ZXIiLCJ2aXNpYmlsaXR5T25seUNvbXBsZXRlZCIsImdldFNlbGVjdGVkQ2F0ZWdvcmllc0ZpbHRlciIsImdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkIiwiY2F0ZWdvcnlGaWx0ZXIiLCJmdWxsVXJsIiwidXJsIiwiYmFzZVJlcXVlc3RJbml0IiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwiY3JlYXRlUG9zdFJlcXVlc3QiLCJmZXRjaCIsIm1ldGhvZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjcmVhdGVHZXRSZXF1ZXN0IiwiZmluYWxVcmwiLCJPYmplY3QiLCJlbnRyaWVzIiwiZm9yRWFjaCIsInBvaXRpb24iLCJrZXkiLCJjcmVhdGVEZWxldGVSZXF1ZXN0IiwiY3JlYXRlUGF0Y2hSZXF1ZXN0IiwiY3JlYXRlUmVxdWVzdCIsImNhbGxBcGkiLCJvayIsImpzb24iLCJQcm9taXNlIiwicmVqZWN0IiwidG9Kc0RhdGUiLCJwYXJzZURhdGUiLCJwYXJzZUludCIsInN1YnN0ciIsInRvU2ltcGxlRGF0ZUZvcm1hdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFNTyxJQUFNQSw0Q0FBa0IsU0FBbEJBLGVBQWtCO0FBQUEsU0FDN0I7QUFDRUMsVUFBTUMsOEJBRFI7QUFFRUM7QUFGRixHQUQ2QjtBQUFBLENBQXhCOztBQU9BLElBQU1DLDhDQUFtQixTQUFuQkEsZ0JBQW1CO0FBQUEsU0FDOUI7QUFDRUgsVUFBTUksK0JBRFI7QUFFRUY7QUFGRixHQUQ4QjtBQUFBLENBQXpCOztBQU9BLElBQU1HLG9DQUFjLFNBQWRBLFdBQWM7QUFBQSxTQUN6QjtBQUNFTCxVQUFNTTtBQURSLEdBRHlCO0FBQUEsQ0FBcEIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJQOztBQUNBOztBQVFBOztBQUNBOztBQUVBLElBQU1DLG9CQUFvQixTQUFwQkEsaUJB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UDtBQUNyQixTQUFLek0sUUFBUStCLEtBQWI7QUFBb0IsYUFBT3VRLG1CQUFtQlAsUUFBbkIsRUFBNkJ0RixPQUE3QixDQUFQO0FBQ3BCO0FBQVMsYUFBT2dGLGtCQUFrQk0sUUFBbEIsRUFBNEJ0RixPQUE1QixDQUFQO0FBTFg7QUFPRCxDQVREOztBQVdPLElBQU0rRiw0QkFBVSxTQUFWQSxPQUFVLENBQUNuQixHQUFEO0FBQUEsTUFBTTVFLE9BQU4sdUVBQWdCLEVBQWhCO0FBQUEsTUFBb0JrRixNQUFwQix1RUFBNkIzUixRQUFRNEIsSUFBckM7QUFBQSxTQUNyQjJRLGNBQWNsQixHQUFkLEVBQW1CNUUsT0FBbkIsRUFBNEJrRixNQUE1QixFQUFvQ3pSLElBQXBDLENBQ0U7QUFBQSxXQUFhQyxTQUFTc1MsRUFBVCxHQUNYdFMsU0FBU3VTLElBQVQsRUFEVyxHQUVYQyxRQUFRQyxNQUFSLENBQWV6UyxTQUFTeUgsSUFBVCxFQUFmLENBRkY7QUFBQSxHQURGLEVBS0U7QUFBQSxXQUFTK0ssUUFBUUMsTUFBUixDQUFlM1QsS0FBZixDQUFUO0FBQUEsR0FMRixDQURxQjtBQUFBLENBQWhCOztrQkFVUXVULE87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRWY7Ozs7OztBQUVPLElBQU1LLDhCQUFXLFNBQVhBLFFBQVc7QUFBQSxNQUFDQyxTQUFELHVFQUFhLEVBQWI7QUFBQSxTQUN0QixJQUFJcFMsSUFBSixDQUFTcVMsU0FBU0QsVUFBVUUsTUFBVixDQUFpQixDQUFqQixDQUFULEVBQThCLEVBQTlCLENBQVQsQ0FEc0I7QUFBQSxDQUFqQjs7QUFHQSxJQUFNQyxrREFBcUIsU0FBckJBLGtCQUFxQjtBQUFBLFNBQ2hDLDBCQUFXbEUsSUFBWCxFQUFpQixrQkFBakIsQ0FEZ0M7QUFBQSxDQUEzQixDIiwiZmlsZSI6InRvZG9zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgU0hPV19NRVNTQUdFX0lORk8sXG4gIFNIT1dfTUVTU0FHRV9FUlJPUixcbiAgSElERV9NRVNTQUdFLFxufSBmcm9tICcuLi9jb25zdGFudHMvYWN0aW9uVHlwZXMnO1xuXG5leHBvcnQgY29uc3Qgc2hvd01lc3NhZ2VJbmZvID0gbWVzc2FnZSA9PiAoXG4gIHtcbiAgICB0eXBlOiBTSE9XX01FU1NBR0VfSU5GTyxcbiAgICBtZXNzYWdlLFxuICB9XG4pO1xuXG5leHBvcnQgY29uc3Qgc2hvd01lc3NhZ2VFcnJvciA9IG1lc3NhZ2UgPT4gKFxuICB7XG4gICAgdHlwZTogU0hPV19NRVNTQUdFX0VSUk9SLFxuICAgIG1lc3NhZ2UsXG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBoaWRlTWVzc2FnZSA9ICgpID0+IChcbiAge1xuICAgIHR5cGU6IEhJREVfTUVTU0FHRSxcbiAgfVxuKTtcbiIsImltcG9ydCB7IGNhbGxBcGksIE1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9BcGlVdGlscyc7XG5pbXBvcnQge1xuICBSRVFVRVNUX0ZFVENIX1RBU0tTLFxuICBSRUNFSVZFX0ZFVENIX1RBU0tTLFxuICBFUlJPUl9GRVRDSF9UQVNLUyxcbiAgQUREX1RBU0tfTE9DQUwsXG4gIFJFTU9WRV9UQVNLX0xPQ0FMLFxuICBVUERBVEVfVEFTS19MT0NBTCxcbn0gZnJvbSAnLi4vY29uc3RhbnRzL2FjdGlvblR5cGVzJztcbmltcG9ydCB7IHF1ZXJ5SXRlbXNMaW1pdCB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VFcnJvciB9IGZyb20gJy4vbWVzc2FnZUFjdGlvbnMnO1xuXG5jb25zdCByZXF1ZXN0RmV0Y2hUYXNrcyA9IChsaW1pdCwgc2tpcCkgPT4gKFxuICB7XG4gICAgdHlwZTogUkVRVUVTVF9GRVRDSF9UQVNLUyxcbiAgICBsaW1pdCxcbiAgICBza2lwLFxuICB9XG4pO1xuXG5jb25zdCByZWNlaXZlRmV0Y2hUYXNrcyA9IHRhc2tzID0+IChcbiAge1xuICAgIHR5cGU6IFJFQ0VJVkVfRkVUQ0hfVEFTS1MsXG4gICAgdGFza3MsXG4gIH1cbik7XG5cbmNvbnN0IGVycm9yRmV0Y2hUYXNrcyA9IGVycm9yID0+IChcbiAge1xuICAgIHR5cGU6IEVSUk9SX0ZFVENIX1RBU0tTLFxuICAgIGVycm9yLFxuICB9XG4pO1xuXG5jb25zdCBhZGRUYXNrTG9jYWwgPSB0YXNrID0+IChcbiAge1xuICAgIHR5cGU6IEFERF9UQVNLX0xPQ0FMLFxuICAgIHRhc2ssXG4gIH1cbik7XG5cbmNvbnN0IHJlbW92ZVRhc2tMb2NhbCA9IHRhc2tJbmRleCA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRU1PVkVfVEFTS19MT0NBTCxcbiAgICB0YXNrSW5kZXgsXG4gIH1cbik7XG5cbmNvbnN0IHVwZGF0ZVRhc2tMb2NhbCA9IHRhc2sgPT4gKFxuICB7XG4gICAgdHlwZTogVVBEQVRFX1RBU0tfTE9DQUwsXG4gICAgdGFzayxcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGZldGNoVGFza3NCeUNhdGVnb3J5ID0gKFxuICBjYXRlZ29yaWVzSWQgPSBbXSxcbiAgY29tcGxldGVkID0gZmFsc2UsXG4gIGxpbWl0ID0gcXVlcnlJdGVtc0xpbWl0LFxuICBza2lwID0gMCxcbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHJlcXVlc3RGZXRjaFRhc2tzKGxpbWl0LCBza2lwKSk7XG4gIGNvbnN0IHJlcXVlc3QgPSBjYWxsQXBpKCd0YXNrcycsIHtcbiAgICBjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCwgbGltaXQsIHNraXAsXG4gIH0sIE1ldGhvZHMuR0VUKTtcbiAgcmV0dXJuIHJlcXVlc3QudGhlbihcbiAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIGNvbnN0IHRvZG9zID0gcmVzcG9uc2UuZGF0YS5tYXAodG9kbyA9PlxuICAgICAgICAgICh7XG4gICAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgICAgY29tcGxldGVkQXQ6ICh0b2RvLmNvbXBsZXRlZEF0KSA/IG5ldyBEYXRlKHRvZG8uY29tcGxldGVkQXQpIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdG9kb1dpdGhpbjogKHRvZG8udG9kb1dpdGhpbikgPyBuZXcgRGF0ZSh0b2RvLnRvZG9XaXRoaW4pIDogdW5kZWZpbmVkLFxuICAgICAgICAgIH0pKTtcbiAgICAgICAgZGlzcGF0Y2gocmVjZWl2ZUZldGNoVGFza3ModG9kb3MpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoKGVycm9yRmV0Y2hUYXNrcyhyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yID0+ICh7IGVycm9yIH0pLFxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZVRhc2sgPSAoaWQgPSAnJykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBjb25zdCByZXF1ZXN0ID0gY2FsbEFwaSgndGFza3MnLCBpZCwgTWV0aG9kcy5ERUxFVEUpO1xuICByZXR1cm4gcmVxdWVzdC50aGVuKFxuICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgY29uc3QgeyBpdGVtcyB9ID0gZ2V0U3RhdGUoKS50YXNrcztcbiAgICAgICAgY29uc3QgdG9kb0FyZ3VtZW50SW5kZXggPSBpdGVtcy5maW5kSW5kZXgodG9kb0FyZ3VtZW50ID0+XG4gICAgICAgICAgdG9kb0FyZ3VtZW50LmlkID09PSBpZCk7XG4gICAgICAgIGRpc3BhdGNoKHJlbW92ZVRhc2tMb2NhbCh0b2RvQXJndW1lbnRJbmRleCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yID0+ICh7IGVycm9yIH0pLFxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRhc2sgPSAodGl0bGUgPSAnJywgZGVzY3JpcHRpb24gPSAnJywgY2F0ZWdvcnkgPSB7IGlkOiAnJyB9LCB0b2RvV2l0aGluLCBjYWxsYmFjayA9IHVuZGVmaW5lZCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGNvbnN0IHJlcXVlc3QgPSBjYWxsQXBpKFxuICAgICd0YXNrcycsXG4gICAge1xuICAgICAgdGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5LmlkLFxuICAgICAgdG9kb1dpdGhpbixcbiAgICB9LFxuICAgIE1ldGhvZHMuUE9TVCxcbiAgKTtcbiAgcmV0dXJuIHJlcXVlc3QudGhlbihcbiAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIGNvbnN0IHRvZG8gPSB7XG4gICAgICAgICAgLi4ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICBjb21wbGV0ZWRBdDogKHJlc3BvbnNlLmRhdGEuY29tcGxldGVkQXQpXG4gICAgICAgICAgICA/IG5ldyBEYXRlKHJlc3BvbnNlLmRhdGEuY29tcGxldGVkQXQpIDogdW5kZWZpbmVkLFxuICAgICAgICAgIHRvZG9XaXRoaW46IChyZXNwb25zZS5kYXRhLnRvZG9XaXRoaW4pXG4gICAgICAgICAgICA/IG5ldyBEYXRlKHJlc3BvbnNlLmRhdGEudG9kb1dpdGhpbikgOiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgICAgIGRpc3BhdGNoKGFkZFRhc2tMb2NhbCh0b2RvKSk7XG4gICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yID0+ICh7IGVycm9yIH0pLFxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IHRvb2dsZVRhc2tDb21wbGV0ZWQgPSAoaWQgPSAnJywgaXNDb21wbGV0ZWQgPSBmYWxzZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGNvbnN0IGNvbXBsZXRlZCA9ICFpc0NvbXBsZXRlZDtcbiAgY29uc3QgY29tcGxldGVkQXQgPSAoY29tcGxldGVkKSA/IG5ldyBEYXRlKCkgOiBudWxsO1xuICBjb25zdCByZXF1ZXN0ID0gY2FsbEFwaSgndGFza3MnLCB7IGlkLCBjb21wbGV0ZWQsIGNvbXBsZXRlZEF0IH0sIE1ldGhvZHMuUEFUQ0gpO1xuICByZXR1cm4gcmVxdWVzdC50aGVuKFxuICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgY29uc3QgdG9kbyA9IHtcbiAgICAgICAgICAuLi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIGNvbXBsZXRlZEF0OiAocmVzcG9uc2UuZGF0YS5jb21wbGV0ZWRBdClcbiAgICAgICAgICAgID8gbmV3IERhdGUocmVzcG9uc2UuZGF0YS5jb21wbGV0ZWRBdCkgOiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgICAgIGRpc3BhdGNoKHVwZGF0ZVRhc2tMb2NhbCh0b2RvKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLm1lc3NhZ2VFcnJvcikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3IgPT4gKHsgZXJyb3IgfSksXG4gICk7XG59O1xuIiwiaW1wb3J0IHsgY2FsbEFwaSwgTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL0FwaVV0aWxzJztcbmltcG9ydCB7XG4gIFJFUVVFU1RfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gIFJFQ0VJVkVfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gIEVSUk9SX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICBBRERfQ0FURUdPUllfTE9DQUwsXG4gIFJFTU9WRV9DQVRFR09SWV9MT0NBTCxcbiAgVE9PR0xFX1NFTEVDVF9DQVRFR09SWSxcbiAgVE9PR0xFX1NFTEVDVF9DQVRFR09SWV9BTEwsXG4gIFNXSVRDSF9WSVNJQklMSVRZX0ZJTFRFUixcbn0gZnJvbSAnLi4vY29uc3RhbnRzL2FjdGlvblR5cGVzJztcbmltcG9ydCB7IHF1ZXJ5SXRlbXNMaW1pdCB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuaW1wb3J0IHsgZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkgfSBmcm9tICcuL3Rhc2tzQWN0aW9ucyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUVycm9yIH0gZnJvbSAnLi9tZXNzYWdlQWN0aW9ucyc7XG5pbXBvcnQgeyBnZXRTZWxlY3RlZENhdGVnb3JpZXNJZCwgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuXG5jb25zdCBmZXRjaFRhc2tzID0gc3RhdGUgPT4gZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkoXG4gIGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkKHN0YXRlKSxcbiAgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQoc3RhdGUpLFxuKTtcblxuY29uc3QgcmVxdWVzdEZldGNoQWxsQ2F0ZWdvcmllcyA9ICgpID0+IChcbiAge1xuICAgIHR5cGU6IFJFUVVFU1RfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gIH1cbik7XG5cbmNvbnN0IHJlY2VpdmVGZXRjaEFsbENhdGVnb3JpZXMgPSBjYXRlZ29yaWVzID0+IChcbiAge1xuICAgIHR5cGU6IFJFQ0VJVkVfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gICAgY2F0ZWdvcmllcyxcbiAgfVxuKTtcblxuY29uc3QgZXJyb3JGZXRjaEFsbENhdGVnb3JpZXMgPSBlcnJvciA9PiAoXG4gIHtcbiAgICB0eXBlOiBFUlJPUl9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgICBlcnJvcixcbiAgfVxuKTtcblxuY29uc3QgYWRkQ2F0ZWdvcnlMb2NhbCA9IGNhdGVnb3J5ID0+IChcbiAge1xuICAgIHR5cGU6IEFERF9DQVRFR09SWV9MT0NBTCxcbiAgICBjYXRlZ29yeSxcbiAgfVxuKTtcblxuY29uc3QgcmVtb3ZlQ2F0ZWdvcnlMb2NhbCA9IGNhdGVnb3J5SW5kZXggPT4gKFxuICB7XG4gICAgdHlwZTogUkVNT1ZFX0NBVEVHT1JZX0xPQ0FMLFxuICAgIGNhdGVnb3J5SW5kZXgsXG4gIH1cbik7XG5cbmNvbnN0IHRvb2dsZVNlbGVjdENhdGVnb3J5ID0gc2VsZWN0ZWRDYXRlZ29yeSA9PiAoXG4gIHtcbiAgICB0eXBlOiBUT09HTEVfU0VMRUNUX0NBVEVHT1JZLFxuICAgIHNlbGVjdGVkQ2F0ZWdvcnksXG4gIH1cbik7XG5cbmNvbnN0IHRvb2dsZVNlbGVjdENhdGVnb3J5QWxsID0gKCkgPT4gKFxuICB7XG4gICAgdHlwZTogVE9PR0xFX1NFTEVDVF9DQVRFR09SWV9BTEwsXG4gIH1cbik7XG5cbmNvbnN0IHN3aXRjaFZpc2liaWxpdHlGaWx0ZXIgPSB2aXNpYmlsaXR5ID0+IChcbiAge1xuICAgIHR5cGU6IFNXSVRDSF9WSVNJQklMSVRZX0ZJTFRFUixcbiAgICB2aXNpYmlsaXR5LFxuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgZmV0Y2hBbGxDYXRlZ29yaWVzID0gKGxpbWl0ID0gcXVlcnlJdGVtc0xpbWl0LCBza2lwID0gMCkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBkaXNwYXRjaChyZXF1ZXN0RmV0Y2hBbGxDYXRlZ29yaWVzKCkpO1xuICBjb25zdCByZXF1ZXN0ID0gY2FsbEFwaSgnY2F0ZWdvcmllcycsIHsgbGltaXQsIHNraXAgfSwgTWV0aG9kcy5HRVQpO1xuICByZXR1cm4gcmVxdWVzdC50aGVuKFxuICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgZGlzcGF0Y2gocmVjZWl2ZUZldGNoQWxsQ2F0ZWdvcmllcyhyZXNwb25zZS5kYXRhKSk7XG4gICAgICAgIGRpc3BhdGNoKGZldGNoVGFza3NCeUNhdGVnb3J5KGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkKGdldFN0YXRlKCkpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwYXRjaChlcnJvckZldGNoQWxsQ2F0ZWdvcmllcyhyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yID0+IChcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpXG4gICAgKSxcbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZWxldGVDYXRlZ29yeSA9IChjYXRlZ29yeUlkID0gJycpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgY29uc3QgcmVxdWVzdCA9IGNhbGxBcGkoJ2NhdGVnb3JpZXMnLCBjYXRlZ29yeUlkLCBNZXRob2RzLkRFTEVURSk7XG4gIHJldHVybiByZXF1ZXN0LnRoZW4oXG4gICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICBjb25zdCB7IGNhdGVnb3JpZXMgfSA9IGdldFN0YXRlKCkudG9kb0ZpbHRlcnM7XG4gICAgICAgIGNvbnN0IGNhdGVnb3J5SW5kZXggPSBjYXRlZ29yaWVzLmZpbmRJbmRleChjYXRlZ29yeSA9PiBjYXRlZ29yeS5pZCA9PT0gY2F0ZWdvcnlJZCk7XG4gICAgICAgIGRpc3BhdGNoKHJlbW92ZUNhdGVnb3J5TG9jYWwoY2F0ZWdvcnlJbmRleCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yID0+IChcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpXG4gICAgKSxcbiAgKTtcbn07XG5cbi8qKlxuICogUmVxdWVzdCB0byBhZGQgYSBjYXRlZ29yeVxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgY2F0ZWdvcnkgbmFtZSB0byBhZGRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgbmVlZCB0byBoYW5kbGUgdGhlIGNhdGVnb3J5IGNyZWF0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGFkZENhdGVnb3J5ID0gKG5hbWUgPSAnJywgY2FsbGJhY2sgPSB1bmRlZmluZWQpID0+IChkaXNwYXRjaCkgPT4ge1xuICBjb25zdCByZXF1ZXN0ID0gY2FsbEFwaSgnY2F0ZWdvcmllcycsIHsgbmFtZSB9LCBNZXRob2RzLlBPU1QpO1xuICByZXR1cm4gcmVxdWVzdC50aGVuKFxuICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgZGlzcGF0Y2goYWRkQ2F0ZWdvcnlMb2NhbChyZXNwb25zZS5kYXRhKSk7XG4gICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY2FsbGJhY2socmVzcG9uc2UuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBlcnJvciA9PiAoXG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKVxuICAgICksXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgY2hhbmdlVmlzaWJpbGl0eSA9IHZpc2liaWxpdHkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBkaXNwYXRjaChzd2l0Y2hWaXNpYmlsaXR5RmlsdGVyKHZpc2liaWxpdHkpKTtcbiAgcmV0dXJuIGRpc3BhdGNoKGZldGNoVGFza3MoZ2V0U3RhdGUoKSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdENhdGVnb3J5ID0gc2VsZWN0ZWRDYXRlZ29yeSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGRpc3BhdGNoKHRvb2dsZVNlbGVjdENhdGVnb3J5KHNlbGVjdGVkQ2F0ZWdvcnkpKTtcbiAgcmV0dXJuIGRpc3BhdGNoKGZldGNoVGFza3MoZ2V0U3RhdGUoKSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdENhdGVnb3J5QWxsID0gKCkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBkaXNwYXRjaCh0b29nbGVTZWxlY3RDYXRlZ29yeUFsbCgpKTtcbiAgcmV0dXJuIGRpc3BhdGNoKGZldGNoVGFza3MoZ2V0U3RhdGUoKSkpO1xufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdXR0b25Db21wbGV0ZUFyZ3VtZW50ID0gKHsgb25DbGljaywgY29tcGxldGVkIH0pID0+IChcbiAgPGJ1dHRvblxuICAgIGNsYXNzTmFtZT17YGJ1dHRvbi1jb21wbGV0ZS1hcmd1bWVudCAkeyhjb21wbGV0ZWQpID8gJ2J1dHRvbi1jb21wbGV0ZWQtYXJndW1lbnQnIDogJyd9YH1cbiAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICA+XG4gICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1jaGVja1wiIC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uQ29tcGxldGVBcmd1bWVudC5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5CdXR0b25Db21wbGV0ZUFyZ3VtZW50LmRlZmF1bHRQcm9wcyA9IHtcbiAgY29tcGxldGVkOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkNvbXBsZXRlQXJndW1lbnQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgQnV0dG9uRGVsZXRlQXJndW1lbnQgPSAoeyBvbkNsaWNrIH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24tZGVsZXRlLWFyZ3VtZW50XCIgb25DbGljaz17b25DbGlja30+XG4gICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1kZWxldGVcIiAvPlxuICA8L2J1dHRvbj5cbik7XG5cbkJ1dHRvbkRlbGV0ZUFyZ3VtZW50LnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkRlbGV0ZUFyZ3VtZW50O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEJ1dHRvbkRlbGV0ZUNhdGVnb3J5ID0gKHsgb25DbGljayB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLWRlbGV0ZS1jYXRlZ29yeVwiIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIDxpIGNsYXNzTmFtZT1cImljb24tZGVsZXRlXCIgLz5cbiAgPC9idXR0b24+XG4pO1xuXG5CdXR0b25EZWxldGVDYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25EZWxldGVDYXRlZ29yeTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdXR0b25TY3JvbGwgPSAoeyBvbkNsaWNrLCBkaXJlY3Rpb24gfSkgPT4gKFxuICA8YnV0dG9uIGNsYXNzTmFtZT17YGJ1dHRvbi1zY3JvbGwgJHtkaXJlY3Rpb259YH0gb25DbGljaz17b25DbGlja30+XG4gICAgPGkgY2xhc3NOYW1lPXsoZGlyZWN0aW9uID09PSAnbGVmdCcpID8gJ2ljb24tYmFja3dhcmQnIDogJ2ljb24tZm9yd2FyZCd9IC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uU2Nyb2xsLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZGlyZWN0aW9uOiBQcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxufTtcblxuQnV0dG9uU2Nyb2xsLmRlZmF1bHRQcm9wcyA9IHtcbiAgZGlyZWN0aW9uOiAnbGVmdCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25TY3JvbGw7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb25Hcm91cCB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuaW1wb3J0IHNjcm9sbCBmcm9tICdzY3JvbGwnO1xuaW1wb3J0IEJ1dHRvblNjcm9sbCBmcm9tICcuL0J1dHRvblNjb2xsJztcbmltcG9ydCBDYXRlZ29yeSBmcm9tICcuL0NhdGVnb3J5JztcbmltcG9ydCBGYWRlIGZyb20gJy4vYW5pbXMvRmFkZSc7XG5cbmNsYXNzIENhdGVnb3JpZXNGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmNoaXBzID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuaGFuZGxlTGVmdFNjcm9sbENsaWNrID0gdGhpcy5oYW5kbGVMZWZ0U2Nyb2xsQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2sgPSB0aGlzLmhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vdmVDaGlwc1Njcm9sbCA9IHRoaXMubW92ZUNoaXBzU2Nyb2xsLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVMZWZ0U2Nyb2xsQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuY2hpcHMpIHtcbiAgICAgIHRoaXMubW92ZUNoaXBzU2Nyb2xsKC10aGlzLmNoaXBzLmNsaWVudFdpZHRoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVSaWdodFNjcm9sbENsaWNrKCkge1xuICAgIGlmICh0aGlzLmNoaXBzKSB7XG4gICAgICB0aGlzLm1vdmVDaGlwc1Njcm9sbCh0aGlzLmNoaXBzLmNsaWVudFdpZHRoKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlQ2hpcHNTY3JvbGwoZGVsdGEpIHtcbiAgICBpZiAodGhpcy5jaGlwcykge1xuICAgICAgY29uc3QgbmV4dFNjcm9sbExlZnQgPSB0aGlzLmNoaXBzLnNjcm9sbExlZnQgKyBkZWx0YTtcbiAgICAgIHNjcm9sbC5sZWZ0KHRoaXMuY2hpcHMsIG5leHRTY3JvbGxMZWZ0KTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjYXRlZ29yeUxpc3QsIG9uRGVsZXRlQ2F0ZWdvcnksIG9uQ2lsY2tDYXRlZ29yeSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cImNvbnRlbnQtY2F0ZWdvcmllcy1maWx0ZXJcIj5cbiAgICAgICAgPEJ1dHRvblNjcm9sbFxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTGVmdFNjcm9sbENsaWNrfVxuICAgICAgICAgIGRpcmVjdGlvbj1cImxlZnRcIlxuICAgICAgICAvPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwiY2F0ZWdvcmllcy1maWx0ZXJcIlxuICAgICAgICAgIHJlZj17KG5vZGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hpcHMgPSBub2RlO1xuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8VHJhbnNpdGlvbkdyb3VwIHN0eWxlPXt7IGRpc3BsYXk6ICdpbmhlcml0JywgcGFkZGluZ0xlZnQ6ICcxLjI1ZW0nLCBwYWRkaW5nUmlnaHQ6ICcxLjI1ZW0nIH19PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjYXRlZ29yeUxpc3QubWFwKGNhdGVnb3J5ID0+IChcbiAgICAgICAgICAgICAgICA8RmFkZSBrZXk9e2NhdGVnb3J5LmlkfT5cbiAgICAgICAgICAgICAgICAgIDxDYXRlZ29yeVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2NhdGVnb3J5LmlkfVxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeT17Y2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtjYXRlZ29yeS5zZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICAgb25EZWxldGU9e29uRGVsZXRlQ2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2lsY2tDYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9GYWRlPlxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvVHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEJ1dHRvblNjcm9sbFxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlUmlnaHRTY3JvbGxDbGlja31cbiAgICAgICAgICBkaXJlY3Rpb249XCJyaWdodFwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkNhdGVnb3JpZXNGaWx0ZXIucHJvcFR5cGVzID0ge1xuICBjYXRlZ29yeUxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIG9uRGVsZXRlQ2F0ZWdvcnk6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNpbGNrQ2F0ZWdvcnk6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5DYXRlZ29yaWVzRmlsdGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25EZWxldGVDYXRlZ29yeTogdW5kZWZpbmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0ZWdvcmllc0ZpbHRlcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEJ1dHRvbkRlbGV0ZUNhdGVnb3J5IGZyb20gJy4vQnV0dG9uRGVsZXRlQ2F0ZWdvcnknO1xuXG5jb25zdCBDYXRlZ29yeSA9ICh7XG4gIGNhdGVnb3J5LCBzZWxlY3RlZCwgb25DbGljaywgb25EZWxldGUsXG59KSA9PiB7XG4gIGxldCBjc3NDbGFzcyA9ICcnO1xuXG4gIGNvbnN0IG9uQ2hpcENsaWNrID0gKGUpID0+IHtcbiAgICBvbkNsaWNrKGNhdGVnb3J5LCBlKTtcbiAgfTtcbiAgY29uc3Qgb25EZWxldGVDbGljayA9ICgpID0+IHtcbiAgICBvbkRlbGV0ZShjYXRlZ29yeSk7XG4gIH07XG5cbiAgaWYgKHNlbGVjdGVkKSB7XG4gICAgY3NzQ2xhc3MgPSAnY2F0ZWdvcnktc2VsZWN0ZWQnO1xuICB9XG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtgJHtjc3NDbGFzc30gY2F0ZWdvcnktY2hpcCBhbGlnbi1pdGVtcy1jZW50ZXJgfVxuICAgICAgb25DbGljaz17b25DaGlwQ2xpY2t9XG4gICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXRlZ29yeS10ZXh0XCI+e2NhdGVnb3J5Lm5hbWV9PC9zcGFuPlxuICAgICAge1xuICAgICAgICAoY2F0ZWdvcnkuaWQgIT09ICcwJyAmJiBvbkRlbGV0ZSAhPT0gdW5kZWZpbmVkKSAmJlxuICAgICAgICAgIDxCdXR0b25EZWxldGVDYXRlZ29yeSBvbkNsaWNrPXtvbkRlbGV0ZUNsaWNrfSAvPlxuICAgICAgfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuQ2F0ZWdvcnkucHJvcFR5cGVzID0ge1xuICBvbkRlbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNhdGVnb3J5OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbn07XG5cbkNhdGVnb3J5LmRlZmF1bHRQcm9wcyA9IHtcbiAgb25EZWxldGU6IHVuZGVmaW5lZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENhdGVnb3J5O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJ2xvZGFzaCc7XG5cbmNvbnN0IHdhaXRUaW1lID0gNTAwO1xuXG5jbGFzcyBJbmZpbml0ZVNjcm9sbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMub25TY3JvbGwgPSB0aGlzLm9uU2Nyb2xsLmJpbmQodGhpcyk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhyb3R0bGUodGhpcy5vblNjcm9sbCwgd2FpdFRpbWUpLCBmYWxzZSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhyb3R0bGUodGhpcy5vblNjcm9sbCwgd2FpdFRpbWUpLCBmYWxzZSk7XG4gIH1cblxuICBvblNjcm9sbCgpIHtcbiAgICBpZiAoKHdpbmRvdy5pbm5lckhlaWdodCArIHdpbmRvdy5zY3JvbGxZKSA+PSAoZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQgLSAyMDApKSB7XG4gICAgICBjb25zdCB7IGFyZ3MsIG9uU2Nyb2xsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgb25TY3JvbGwoLi4uYXJncyk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSW5maW5pdGVTY3JvbGwucHJvcFR5cGVzID0ge1xuICBhcmdzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgb25TY3JvbGw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5JbmZpbml0ZVNjcm9sbC5kZWZhdWx0UHJvcHMgPSB7XG4gIGFyZ3M6IFtdLFxuICBjbGFzc05hbWU6ICcnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgSW5maW5pdGVTY3JvbGw7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgTWFpbkFkZEJ1dHRvbiA9ICh7IG9uQ2xpY2sgfSkgPT4gKFxuICA8YnV0dG9uIGlkPVwibWFpbi1hZGQtYnV0dG9uXCIgb25DbGljaz17b25DbGlja30gPlxuICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+JiN4RTE0NTs8L2k+XG4gIDwvYnV0dG9uPlxuKTtcblxuTWFpbkFkZEJ1dHRvbi5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYWluQWRkQnV0dG9uO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgU25hY2tiYXJBbmltIGZyb20gJy4vYW5pbXMvU25hY2tiYXJBbmltJztcblxuY29uc3QgQWN0aW9uID0gKHsgb25DbGljaywgdGV4dCB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLWFjdGlvbi1zbmFja2JhclwiIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIHt0ZXh0fVxuICA8L2J1dHRvbj5cbik7XG5cbkFjdGlvbi5wcm9wVHlwZXMgPSB7XG4gIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmNsYXNzIFNuYWNrYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2xvc2UsIGR1cmF0aW9uLCBzaG93LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKHNob3cpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBvbkNsb3NlKCk7XG4gICAgICB9LCBkdXJhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG1lc3NhZ2UsIGlzRXJyb3IsIGFjdGlvblRleHQsIGFjdGlvbkNsaWNrLCBzaG93LFxuICAgICAgdmVydGljYWxQb3N0aW9uLCBob3Jpem9udGFsUG9zaXRpb24sXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTbmFja2JhckFuaW0gaW49e3Nob3d9IGN1c3RvbUNsYXNzPXtgJHt2ZXJ0aWNhbFBvc3Rpb259ICR7KGhvcml6b250YWxQb3NpdGlvbil9YH0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2BzbmFja2JhciAkeyhpc0Vycm9yKSA/ICdlcnJvcicgOiAnJ31gfVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic25hY2tiYXItbWVzc2FnZVwiPnttZXNzYWdlfTwvc3Bhbj5cbiAgICAgICAgICB7XG4gICAgICAgICAgICAoYWN0aW9uVGV4dCAhPT0gJycgJiYgYWN0aW9uQ2xpY2sgIT09IHVuZGVmaW5lZCkgJiZcbiAgICAgICAgICAgICAgPEFjdGlvbiBvbkNsaWNrPXthY3Rpb25DbGlja30gdGV4dD17YWN0aW9uVGV4dH0gLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9TbmFja2JhckFuaW0+XG4gICAgKTtcbiAgfVxufVxuXG5TbmFja2Jhci5wcm9wVHlwZXMgPSB7XG4gIHNob3c6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZHVyYXRpb246IFByb3BUeXBlcy5udW1iZXIsXG4gIGlzRXJyb3I6IFByb3BUeXBlcy5ib29sLFxuICBhY3Rpb25UZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBhY3Rpb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gIHZlcnRpY2FsUG9zdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsndG9wJywgJ2JvdHRvbSddKSxcbiAgaG9yaXpvbnRhbFBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxufTtcblxuU25hY2tiYXIuZGVmYXVsdFByb3BzID0ge1xuICBkdXJhdGlvbjogNTAwMCxcbiAgaXNFcnJvcjogZmFsc2UsXG4gIGFjdGlvblRleHQ6ICcnLFxuICBhY3Rpb25DbGljazogdW5kZWZpbmVkLFxuICB2ZXJ0aWNhbFBvc3Rpb246ICdib3R0b20nLFxuICBob3Jpem9udGFsUG9zaXRpb246ICdyaWdodCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTbmFja2JhcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IENvbGxhcHNlIGZyb20gJy4vYW5pbXMvQ29sbGFwc2UnO1xuaW1wb3J0IEZhZGUgZnJvbSAnLi9hbmltcy9GYWRlJztcbmltcG9ydCBCdXR0b25Db21wbGV0ZUFyZ3VtZW50IGZyb20gJy4vQnV0dG9uQ29tcGxldGVBcmd1bWVudCc7XG5pbXBvcnQgQnV0dG9uRGVsZXRlQXJndW1lbnQgZnJvbSAnLi9CdXR0b25EZWxldGVBcmd1bWVudCc7XG5pbXBvcnQgeyB0b1NpbXBsZURhdGVGb3JtYXQgfSBmcm9tICcuLi91dGlscy9Db21tb24nO1xuXG5jbGFzcyBUYXNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgfTtcbiAgICB0aGlzLnJlbmRlckRhdGUgPSB0aGlzLnJlbmRlckRhdGUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uVGl0bGVDbGljaygpIHtcbiAgICBjb25zdCB7IGNvbGxhcHNlZCB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnNldFN0YXRlKHsgY29sbGFwc2VkOiAhY29sbGFwc2VkIH0pO1xuICB9XG5cbiAgcmVuZGVyRGF0ZSgpIHtcbiAgICBjb25zdCB7IHRhc2sgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKHRhc2suY29tcGxldGVkKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8cCBjbGFzc05hbWU9XCJjb21wbGV0ZS1kYXRlXCI+e2Bjb21wbGV0ZWQgJHsodGFzay5jb21wbGV0ZWRBdCkgPyB0b1NpbXBsZURhdGVGb3JtYXQodGFzay5jb21wbGV0ZWRBdCkgOiAnJ31gfTwvcD5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8cCBjbGFzc05hbWU9XCJjb21wbGV0ZS13aXRoaW4tZGF0ZVwiPntgdG8gY29tcGxldGUgd2l0aGluICR7KHRhc2sudG9kb1dpdGhpbikgPyB0b1NpbXBsZURhdGVGb3JtYXQodGFzay50b2RvV2l0aGluKSA6ICdub3Qgc2V0J31gfTwvcD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgdGFzaywgb25EZWxldGUsIG9uQ29tcGxldGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBjb2xsYXBzZWQgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXJndW1lbnQtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFyZ3VtZW50LWhlYWRlclwiPlxuICAgICAgICAgIDxwXG4gICAgICAgICAgICBjbGFzc05hbWU9e2Bhcmd1bWVudC10aXRsZSAkeyh0YXNrLmNvbXBsZXRlZCkgPyAnYXJndW1lbnQtdGl0bGUtY29tcGxldGVkJyA6ICcnfWB9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uVGl0bGVDbGljaygpfVxuICAgICAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3Rhc2sudGl0bGV9XG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxGYWRlIGluPXtjb2xsYXBzZWR9PlxuICAgICAgICAgICAgPEJ1dHRvbkRlbGV0ZUFyZ3VtZW50XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uRGVsZXRlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0ZhZGU+XG4gICAgICAgICAge1xuICAgICAgICAgICAgb25Db21wbGV0ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICA8QnV0dG9uQ29tcGxldGVBcmd1bWVudFxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNvbXBsZXRlfVxuICAgICAgICAgICAgICBjb21wbGV0ZWQ9e3Rhc2suY29tcGxldGVkfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFyZ3VtZW50LWRhdGVcIj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJEYXRlKCl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Q29sbGFwc2UgaW49e2NvbGxhcHNlZH0+XG4gICAgICAgICAgPGRpdiBrZXk9e3Rhc2suZGVzY3JpcHRpb259IGNsYXNzTmFtZT1cImFyZ3VtZW50LWJvZHlcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImFyZ3VtZW50LWRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAodGFzay5kZXNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkICYmIHRhc2suZGVzY3JpcHRpb24gIT09ICcnKVxuICAgICAgICAgICAgICAgID8gdGFzay5kZXNjcmlwdGlvbiA6IDxzcGFuIGNsYXNzTmFtZT1cImVtcHR5XCI+Tm8gZGVzY3JpcHRpb24gdG8gc2hvdyA6KDwvc3Bhbj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NvbGxhcHNlPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5UYXNrLnByb3BUeXBlcyA9IHtcbiAgb25EZWxldGU6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNvbXBsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgdGFzazogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGNvbXBsZXRlZEF0OiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICB9KS5pc1JlcXVpcmVkLFxufTtcblxuVGFzay5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uRGVsZXRlOiB1bmRlZmluZWQsXG4gIG9uQ29tcGxldGU6IHVuZGVmaW5lZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2s7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb25Hcm91cCB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuaW1wb3J0IFJlc2l6ZSBmcm9tICcuL2FuaW1zL1Jlc2l6ZSc7XG5pbXBvcnQgVGFzayBmcm9tICcuL1Rhc2snO1xuaW1wb3J0IEluZmluaXRlU2Nyb2xsIGZyb20gJy4vSW5maW5pdGVTY3JvbGwnO1xuaW1wb3J0IHsgcXVlcnlJdGVtc0xpbWl0IH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgbGltaXQ6IHF1ZXJ5SXRlbXNMaW1pdCxcbiAgc2tpcDogMCxcbn07XG5cbmNsYXNzIFRhc2tzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IGluaXRpYWxTdGF0ZTtcbiAgICB0aGlzLm9uRmV0Y2hUb2RvQXJndW1lbnRzTmV4dCA9IHRoaXMub25GZXRjaFRvZG9Bcmd1bWVudHNOZXh0LmJpbmQodGhpcyk7XG4gIH1cblxuICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKG5leHRQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgaWYgKG5leHRQcm9wcy5za2lwICE9PSBwcmV2U3RhdGUuc2tpcCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2tpcDogbmV4dFByb3BzLnNraXAsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIG9uRmV0Y2hUb2RvQXJndW1lbnRzTmV4dCgpIHtcbiAgICBjb25zdCB7XG4gICAgICBjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCxcbiAgICAgIGZldGNoVGFza3MsIG1vcmVUb0xvYWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFtb3JlVG9Mb2FkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgbGltaXQsIHNraXAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgbmV3U2tpcCA9IHNraXAgKyBsaW1pdDtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2tpcDogbmV3U2tpcCB9KTtcbiAgICBmZXRjaFRhc2tzKGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgbmV3U2tpcCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdGFza0xpc3QsXG4gICAgICBvbkRlbGV0ZUFyZ3VtZW50LFxuICAgICAgb25Db21wbGV0ZUFyZ3VtZW50LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiY29udGVudC10b2RvLWFyZ3VtZW50c1wiPlxuICAgICAgICA8SW5maW5pdGVTY3JvbGwgb25TY3JvbGw9e3RoaXMub25GZXRjaFRvZG9Bcmd1bWVudHNOZXh0fT5cbiAgICAgICAgICA8VHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0YXNrTGlzdC5tYXAoYXJnID0+IChcbiAgICAgICAgICAgICAgICA8UmVzaXplIGtleT17YXJnLmlkfT5cbiAgICAgICAgICAgICAgICAgIDxUYXNrXG4gICAgICAgICAgICAgICAgICAgIGtleT17YXJnLmlkfVxuICAgICAgICAgICAgICAgICAgICB0YXNrPXthcmd9XG4gICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlPXsoKSA9PiBvbkRlbGV0ZUFyZ3VtZW50KGFyZyl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9eygpID0+IG9uQ29tcGxldGVBcmd1bWVudChhcmcpfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L1Jlc2l6ZT5cbiAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L1RyYW5zaXRpb25Hcm91cD5cbiAgICAgICAgPC9JbmZpbml0ZVNjcm9sbD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuVGFza3MucHJvcFR5cGVzID0ge1xuICBvbkRlbGV0ZUFyZ3VtZW50OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkNvbXBsZXRlQXJndW1lbnQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHRhc2tMaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIG1vcmVUb0xvYWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGZldGNoVGFza3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNhdGVnb3JpZXNJZDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZykuaXNSZXF1aXJlZCxcbiAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVGFza3M7XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IExvYWRlckxpbmVhciBmcm9tICcuLi9jb21wb25lbnRzL0xvYWRlckxpbmVhcic7XG5pbXBvcnQgTWFpbkFkZEJ1dHRvbiBmcm9tICcuLi9jb21wb25lbnRzL01haW5BZGRCdXR0b24nO1xuaW1wb3J0IENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIgZnJvbSAnLi4vY29udGFpbmVycy9DYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyJztcbmltcG9ydCBWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lcnMvVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lcic7XG5pbXBvcnQgVGFza3NDb250YWluZXIgZnJvbSAnLi4vY29udGFpbmVycy9UYXNrc0NvbnRhaW5lcic7XG5pbXBvcnQgRGlhbG9nQWRkIGZyb20gJy4vZGlhbG9nQWRkL0RpYWxvZ0FkZCc7XG5pbXBvcnQgU25hY2tiYXIgZnJvbSAnLi9TbmFja2Jhcic7XG5cbmNsYXNzIFRvZG9zIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzRGlhbG9nQWRkT3BlbjogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIC8vIERpYWxvZ0FkZC5wcmVsb2FkKCk7XG4gICAgY29uc3QgeyBpbml0RmV0Y2hBbGxDYXRlZ29yaWVzIH0gPSB0aGlzLnByb3BzO1xuICAgIGluaXRGZXRjaEFsbENhdGVnb3JpZXMoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGlzRGlhbG9nQWRkT3BlbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IG1lc3NhZ2UsIGhpZGVNZXNzYWdlLCBzaG93TG9hZGluZyB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWFwcFwiPlxuICAgICAgICA8TG9hZGVyTGluZWFyIHNob3c9e3Nob3dMb2FkaW5nfSAvPlxuICAgICAgICA8ZGl2IGlkPVwibWFpbi10b3AtYmFyXCI+XG4gICAgICAgICAgPENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIgLz5cbiAgICAgICAgICA8VmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lciAvPlxuICAgICAgICAgIDxNYWluQWRkQnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgaXNEaWFsb2dBZGRPcGVuOiB0cnVlIH0pfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8VGFza3NDb250YWluZXIgLz5cbiAgICAgICAgPERpYWxvZ0FkZFxuICAgICAgICAgIG9wZW49e2lzRGlhbG9nQWRkT3Blbn1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgaXNEaWFsb2dBZGRPcGVuOiBmYWxzZSB9KX1cbiAgICAgICAgLz5cbiAgICAgICAgPFNuYWNrYmFyXG4gICAgICAgICAgc2hvdz17bWVzc2FnZS5zaG93fVxuICAgICAgICAgIGlzRXJyb3I9e21lc3NhZ2UuaXNFcnJvcn1cbiAgICAgICAgICBtZXNzYWdlPXttZXNzYWdlLnRleHR9XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gaGlkZU1lc3NhZ2UoKX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuVG9kb3MucHJvcFR5cGVzID0ge1xuICBtZXNzYWdlOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHNob3c6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNFcnJvcjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICB0ZXh0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIGhpZGVNZXNzYWdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBpbml0RmV0Y2hBbGxDYXRlZ29yaWVzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBzaG93TG9hZGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9zO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgVmlzaWJpbGl0eVN3aXRjaCBmcm9tICcuL1Zpc2liaWxpdHlTd2l0Y2gnO1xuaW1wb3J0IHsgQUxMX1RPRE9TLCBPTkxZX0NPTVBMRVRFRCwgT05MWV9UT19DT01QTEVURSB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuXG5jb25zdCBWaXNpYmlsaXR5RmlsdGVyID0gKHtcbiAgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyLCBvblZpc2liaWxpdHlTd2l0Y2hDbGljayxcbn0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpYmlsaXR5LWZpbHRlci13cmFwcGVyXCI+XG4gICAgPFZpc2liaWxpdHlTd2l0Y2hcbiAgICAgIHNlbGVjdGVkPXsoc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyID09PSBPTkxZX1RPX0NPTVBMRVRFXG4gICAgICAgIHx8IHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciA9PT0gQUxMX1RPRE9TKX1cbiAgICAgIG9uQ2xpY2s9e29uVmlzaWJpbGl0eVN3aXRjaENsaWNrKE9OTFlfVE9fQ09NUExFVEUpfVxuICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgPlxuICAgICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1jaXJjbGUtYm9yZGVyXCIgLz5cbiAgICA8L1Zpc2liaWxpdHlTd2l0Y2g+XG4gICAgPFZpc2liaWxpdHlTd2l0Y2hcbiAgICAgIHNlbGVjdGVkPXsoc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyID09PSBPTkxZX0NPTVBMRVRFRFxuICAgICAgICB8fCBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IEFMTF9UT0RPUyl9XG4gICAgICBvbkNsaWNrPXtvblZpc2liaWxpdHlTd2l0Y2hDbGljayhPTkxZX0NPTVBMRVRFRCl9XG4gICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICA+XG4gICAgICA8aSBjbGFzc05hbWU9XCJpY29uLWNpcmNsZVwiIC8+XG4gICAgPC9WaXNpYmlsaXR5U3dpdGNoPlxuICA8L2Rpdj5cbik7XG5cblZpc2liaWxpdHlGaWx0ZXIucHJvcFR5cGVzID0ge1xuICBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXI6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25WaXNpYmlsaXR5U3dpdGNoQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBWaXNpYmlsaXR5RmlsdGVyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IFZpc2liaWxpdHlTd2l0Y2ggPSAoe1xuICBzZWxlY3RlZCwgY2hpbGRyZW4sIG9uQ2xpY2ssXG59KSA9PiAoXG4gIDxkaXZcbiAgICBjbGFzc05hbWU9e2B2aXNpYmlsaXR5LWJ1dHRvbi1zd2l0Y2ggYWxpZ24taXRlbXMtY2VudGVyICR7KHNlbGVjdGVkKSA/ICdzZWxlY3RlZCcgOiAnJ30gYH1cbiAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICA+XG4gICAge2NoaWxkcmVufVxuICA8L2Rpdj5cbik7XG5cblZpc2liaWxpdHlTd2l0Y2gucHJvcFR5cGVzID0ge1xuICBzZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuVmlzaWJpbGl0eVN3aXRjaC5kZWZhdWx0UHJvcHMgPSB7XG4gIHNlbGVjdGVkOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFZpc2liaWxpdHlTd2l0Y2g7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSAzMDA7XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgdHJhbnNpdGlvbjogYGhlaWdodCAke2R1cmF0aW9ufW1zIGVhc2UtaW4tb3V0YCxcbiAgaGVpZ2h0OiAwLFxufTtcblxuY29uc3Qgb25FbnRlciA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XG4gIHN0eWxlLmhlaWdodCA9IGAke25vZGUuZmlyc3RFbGVtZW50Q2hpbGQub2Zmc2V0SGVpZ2h0fXB4YDtcbn07XG5cbmNvbnN0IG9uRXhpdCA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XG4gIHN0eWxlLmhlaWdodCA9ICcwcHgnO1xufTtcblxuY29uc3QgQ29sbGFwc2UgPSAoeyBpbjogaW5Qcm9wLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxUcmFuc2l0aW9uIG9uRW50ZXI9e29uRW50ZXJ9IG9uRXhpdD17b25FeGl0fSBpbj17aW5Qcm9wfSB0aW1lb3V0PXtkdXJhdGlvbn0+XG4gICAgeygpID0+IChcbiAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAuLi5kZWZhdWx0U3R5bGUsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICl9XG4gIDwvVHJhbnNpdGlvbj5cbik7XG5cbkNvbGxhcHNlLnByb3BUeXBlcyA9IHtcbiAgaW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29sbGFwc2U7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSAyNTA7XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgdHJhbnNpdGlvbjogYGFsbCAke2R1cmF0aW9ufW1zIGVhc2UtaW4tb3V0YCxcbiAgaGVpZ2h0OiAnMHB4JyxcbiAgb3BhY2l0eTogJzAnLFxuICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbn07XG5cbmNvbnN0IHRyYW5zaXRpb25TdHlsZXMgPSB7XG4gIGVudGVyaW5nOiB7XG4gICAgaGVpZ2h0OiAnMHB4JyxcbiAgICBvcGFjaXR5OiAnMCcsXG4gICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gIH0sXG4gIGVudGVyZWQ6IHtcbiAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgIGhlaWdodDogJzEwMHZoJyxcbiAgICBvcGFjaXR5OiAnMScsXG4gICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICB9LFxufTtcblxuY29uc3QgRGlhbG9nQW5pbSA9ICh7IGluOiBpblByb3AsIGNoaWxkcmVuIH0pID0+IChcbiAgPFRyYW5zaXRpb24gaW49e2luUHJvcH0gdGltZW91dD17ZHVyYXRpb259PlxuICAgIHtzdGF0ZSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPVwiYmFja2Ryb3AtZGlhbG9nXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAuLi5kZWZhdWx0U3R5bGUsXG4gICAgICAgICAgLi4udHJhbnNpdGlvblN0eWxlc1tzdGF0ZV0sXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICl9XG4gIDwvVHJhbnNpdGlvbj5cbik7XG5cbkRpYWxvZ0FuaW0ucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaWFsb2dBbmltO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5cbmNvbnN0IGR1cmF0aW9uID0gMjUwO1xuXG5jb25zdCBkZWZhdWx0U3R5bGUgPSB7XG4gIHdpZHRoOiAnMTAwJScsXG4gIHRyYW5zaXRpb246IGBvcGFjaXR5ICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBvcGFjaXR5OiAwLFxuICBkaXNwbGF5OiAnaW5oZXJpdCcsXG59O1xuXG5jb25zdCB0cmFuc2l0aW9uU3R5bGVzID0ge1xuICBlbnRlcjogeyBvcGFjaXR5OiAwIH0sXG4gIGVudGVyZWQ6IHsgb3BhY2l0eTogMSB9LFxufTtcblxuY29uc3QgUmVwbGFjZUFuaW0gPSAoeyBpbjogaW5Qcm9wLCBlbmRMaXN0ZW5lciwgY2hpbGRyZW4gfSkgPT4gKFxuICA8VHJhbnNpdGlvblxuICAgIGluPXtpblByb3B9XG4gICAgdGltZW91dD17ZHVyYXRpb259XG4gICAgYWRkRW5kTGlzdGVuZXI9e2VuZExpc3RlbmVyfVxuICA+XG4gICAge3N0YXRlID0+IChcbiAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAuLi5kZWZhdWx0U3R5bGUsXG4gICAgICAgICAgLi4udHJhbnNpdGlvblN0eWxlc1tzdGF0ZV0sXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICl9XG4gIDwvVHJhbnNpdGlvbj5cbik7XG5cblJlcGxhY2VBbmltLnByb3BUeXBlcyA9IHtcbiAgaW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGVuZExpc3RlbmVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJlcGxhY2VBbmltO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5cbmNvbnN0IGR1cmF0aW9uID0ge1xuICBlbnRlcjogMzAwLFxuICBleGl0OiAyMDAsXG59O1xuXG5jb25zdCBkZWZhdWx0U3R5bGUgPSB7XG4gIHRyYW5zaXRpb246IGBhbGwgJHtkdXJhdGlvbi5lbnRlcn1tcyBlYXNlLWluLW91dGAsXG4gIGhlaWdodDogMCxcbiAgb3BhY2l0eTogMCxcbn07XG5cbmNvbnN0IG9uRW50ZXIgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSBgJHtub2RlLmZpcnN0RWxlbWVudENoaWxkLm9mZnNldEhlaWdodH1weGA7XG4gIHN0eWxlLm9wYWNpdHkgPSAxO1xufTtcblxuY29uc3Qgb25FbnRlcmVkID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xufTtcblxuY29uc3Qgb25FeGl0ID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gYCR7bm9kZS5maXJzdEVsZW1lbnRDaGlsZC5vZmZzZXRIZWlnaHR9cHhgO1xufTtcblxuY29uc3Qgb25FeGl0ZWQgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSAnMHB4JztcbiAgc3R5bGUub3BhY2l0eSA9IDA7XG59O1xuXG5cbmNvbnN0IFJlc2l6ZSA9ICh7IC4uLnByb3BzLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxUcmFuc2l0aW9uXG4gICAgey4uLnByb3BzfVxuICAgIG9uRW50ZXI9e29uRW50ZXJ9XG4gICAgb25FbnRlcmVkPXtvbkVudGVyZWR9XG4gICAgb25FeGl0PXtvbkV4aXR9XG4gICAgb25FeGl0ZWQ9e29uRXhpdGVkfVxuICAgIHRpbWVvdXQ9e2R1cmF0aW9ufVxuICA+XG4gICAgeygpID0+IChcbiAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAuLi5kZWZhdWx0U3R5bGUsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICl9XG4gIDwvVHJhbnNpdGlvbj5cbik7XG5cblJlc2l6ZS5wcm9wVHlwZXMgPSB7XG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVzaXplO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5cbmNvbnN0IGR1cmF0aW9uID0gMjUwO1xuXG5jb25zdCBkZWZhdWx0U3R5bGUgPSB7XG4gIHRyYW5zaXRpb246IGBhbGwgJHtkdXJhdGlvbn1tcyBlYXNlLWluLW91dGAsXG4gIGJvdHRvbTogJy0xMDBweCcsXG59O1xuXG5jb25zdCB0cmFuc2l0aW9uU3R5bGVzID0ge1xuICBlbnRlcmluZzoge1xuICAgIGJvdHRvbTogJy0xMDBweCcsXG4gICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gIH0sXG4gIGVudGVyZWQ6IHtcbiAgICBib3R0b206ICcwcHgnLFxuICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJyxcbiAgfSxcbn07XG5cbmNvbnN0IFNuYWNrYmFyQW5pbSA9ICh7IGluOiBpblByb3AsIGNoaWxkcmVuLCBjdXN0b21DbGFzcyB9KSA9PiAoXG4gIDxUcmFuc2l0aW9uIGluPXtpblByb3B9IHRpbWVvdXQ9e2R1cmF0aW9ufT5cbiAgICB7c3RhdGUgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD1cImNvbnRlbnQtc25hY2tiYXJcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgICAuLi50cmFuc2l0aW9uU3R5bGVzW3N0YXRlXSxcbiAgICAgICAgfX1cbiAgICAgICAgY2xhc3NOYW1lPXtjdXN0b21DbGFzc31cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuU25hY2tiYXJBbmltLnByb3BUeXBlcyA9IHtcbiAgaW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICBjdXN0b21DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cblNuYWNrYmFyQW5pbS5kZWZhdWx0UHJvcHMgPSB7XG4gIGN1c3RvbUNsYXNzOiAnJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNuYWNrYmFyQW5pbTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi9jb25zdGFudHMvbGFiZWxzJztcbmltcG9ydCB7IEFERF9BUkdVTUVOVCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgeyBhZGRDYXRlZ29yeSB9IGZyb20gJy4uLy4uL2FjdGlvbnMvdG9kb0ZpbHRlcnNBY3Rpb25zJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5jbGFzcyBBZGRDYXRlZ29yeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBuYW1lOiAnJyxcbiAgICB9O1xuICAgIHRoaXMub25JbnB1dFRleHRDaGFuZ2UgPSB0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkJ1dHRvbkFkZENsaWNrID0gdGhpcy5vbkJ1dHRvbkFkZENsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkNhdGVnb3J5Q3JlYXRlZCA9IHRoaXMub25DYXRlZ29yeUNyZWF0ZWQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uSW5wdXRUZXh0Q2hhbmdlKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgbmFtZTogZS50YXJnZXQudmFsdWUgfSk7XG4gIH1cblxuICBvbkJ1dHRvbkFkZENsaWNrKCkge1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IGRpc3BhdGNoIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChuYW1lID09PSAnJykge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VJbmZvKGxhYmVscy5tc2dOYW1lUmVxdWlyZWQpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGlzcGF0Y2goYWRkQ2F0ZWdvcnkobmFtZSwgdGhpcy5vbkNhdGVnb3J5Q3JlYXRlZCkpO1xuICB9XG5cbiAgb25DYXRlZ29yeUNyZWF0ZWQoc2VsZWN0ZWRDYXRlZ29yeSkge1xuICAgIGNvbnN0IHsgb25OZXh0IH0gPSB0aGlzLnByb3BzO1xuICAgIG9uTmV4dCh7IHN0ZXBJZDogQUREX0FSR1VNRU5ULCBvcHRpb25zOiB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWFkZC1jYXRlZ29yeVwiPlxuICAgICAgICA8aDI+QWRkIG5ldyBDQVRFR09SWTwvaDI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVHlwZSB0aGUgbmFtZVwiXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0VGV4dENoYW5nZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQnV0dG9uQWRkQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgQUREXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5BZGRDYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbk5leHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCkoQWRkQ2F0ZWdvcnkpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IHsgU0VMRUNUX0NPTVBMRVRFX0RBVEUgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VJbmZvIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5cbmNsYXNzIEFkZFRvZG9Bcmd1bWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRpdGxlOiAnJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICB9O1xuICAgIHRoaXMub25JbnB1dFRleHRDaGFuZ2UgPSB0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkJ1dHRvblNjaGVkdWxlQ2xpY2sgPSB0aGlzLm9uQnV0dG9uU2NoZWR1bGVDbGljay5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25JbnB1dFRleHRDaGFuZ2UobmFtZSkge1xuICAgIHJldHVybiAoZSkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtuYW1lXTogZS50YXJnZXQudmFsdWUgfSk7XG4gICAgfTtcbiAgfVxuXG4gIG9uQnV0dG9uU2NoZWR1bGVDbGljaygpIHtcbiAgICBjb25zdCB7IG9wdGlvbnMsIGRpc3BhdGNoLCBvbk5leHQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyB0aXRsZSwgZGVzY3JpcHRpb24gfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgY2F0ZWdvcnkgPSBvcHRpb25zLnNlbGVjdGVkQ2F0ZWdvcnk7XG4gICAgaWYgKHRpdGxlID09PSAnJykge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VJbmZvKGxhYmVscy5tc2dUaXRsZVJlcXVpcmVkKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9uTmV4dCh7IHN0ZXBJZDogU0VMRUNUX0NPTVBMRVRFX0RBVEUsIG9wdGlvbnM6IHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBjYXRlZ29yeSB9IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgc2VsZWN0ZWRDYXRlZ29yeSB9ID0gdGhpcy5wcm9wcy5vcHRpb25zO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtYWRkLWFyZ3VtZW50XCI+XG4gICAgICAgIDxoMj5BZGQgbmV3IEFSR1VNRU5UPC9oMj5cbiAgICAgICAgPGgzPlxuICAgICAgICAgIGZvciB0aGUgY2F0ZWdvcnk6XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGFiZWwtY2F0ZWdvcnktbmFtZVwiPlxuICAgICAgICAgICAge2AgJHtzZWxlY3RlZENhdGVnb3J5Lm5hbWV9YH1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvaDM+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1maWVsZHNcIj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4taW5wdXRcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJUeXBlIHRoZSB0aXRsZVwiXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0VGV4dENoYW5nZSgndGl0bGUnKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlR5cGUgdGhlIGRlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlKCdkZXNjcmlwdGlvbicpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4tYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25CdXR0b25TY2hlZHVsZUNsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIFNDSEVEVUxFXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5BZGRUb2RvQXJndW1lbnQucHJvcFR5cGVzID0ge1xuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb3B0aW9uczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBzZWxlY3RlZENhdGVnb3J5OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB9KS5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkLFxuICBvbk5leHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCkoQWRkVG9kb0FyZ3VtZW50KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgU2VsZWN0QWN0aW9uQWRkIGZyb20gJy4vU2VsZWN0QWN0aW9uQWRkJztcbmltcG9ydCBBZGRDYXRlZ29yeSBmcm9tICcuL0FkZENhdGVnb3J5JztcbmltcG9ydCBTZWxlY3RDYXRlZ29yeSBmcm9tICcuL1NlbGVjdENhdGVnb3J5JztcbmltcG9ydCBBZGRUb2RvQXJndW1lbnQgZnJvbSAnLi9BZGRUb2RvQXJndW1lbnQnO1xuaW1wb3J0IFNlbGVjdENvbXBsZXRlRGF0ZSBmcm9tICcuL1NlbGVjdENvbXBsZXRlRGF0ZSc7XG5pbXBvcnQgRG9uZSBmcm9tICcuL0RvbmUnO1xuaW1wb3J0IHtcbiAgU0VMRUNUX1dBTlRfVE9fQURELFxuICBBRERfQ0FURUdPUlksXG4gIEFERF9BUkdVTUVOVCxcbiAgU0VMRUNUX0NBVEVHT1JZLFxuICBTRUxFQ1RfQ09NUExFVEVfREFURSxcbiAgRE9ORSxcbiAgc3RlcExpc3QsXG59IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgUmVwbGFjZUFuaW0gZnJvbSAnLi4vYW5pbXMvUmVwbGFjZUFuaW0nO1xuaW1wb3J0IERpYWxvZ0FuaW0gZnJvbSAnLi4vYW5pbXMvRGlhbG9nQW5pbSc7XG5pbXBvcnQgU3RlcHMgZnJvbSAnLi9TdGVwcyc7XG5cbmNvbnN0IGdldENvbnRlbnRUb1JlbmRlciA9IChzdGVwcywgcHJvcHMpID0+IHtcbiAgaWYgKHN0ZXBzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiA8U2VsZWN0QWN0aW9uQWRkIHsuLi5wcm9wc30gLz47XG4gIH1cbiAgY29uc3QgbGFzdFN0ZXAgPSBzdGVwc1tzdGVwcy5sZW5ndGggLSAxXTtcbiAgc3dpdGNoIChsYXN0U3RlcC5zdGVwSWQpIHtcbiAgICBjYXNlIFNFTEVDVF9XQU5UX1RPX0FERDpcbiAgICAgIHJldHVybiA8U2VsZWN0QWN0aW9uQWRkIHsuLi5wcm9wc30gLz47XG4gICAgY2FzZSBBRERfQ0FURUdPUlk6XG4gICAgICByZXR1cm4gPEFkZENhdGVnb3J5IHsuLi5wcm9wc30gLz47XG4gICAgY2FzZSBBRERfQVJHVU1FTlQ6XG4gICAgICByZXR1cm4gPEFkZFRvZG9Bcmd1bWVudCB7Li4ucHJvcHN9IG9wdGlvbnM9e2xhc3RTdGVwLm9wdGlvbnN9IC8+O1xuICAgIGNhc2UgU0VMRUNUX0NBVEVHT1JZOlxuICAgICAgcmV0dXJuIDxTZWxlY3RDYXRlZ29yeSB7Li4ucHJvcHN9IC8+O1xuICAgIGNhc2UgU0VMRUNUX0NPTVBMRVRFX0RBVEU6XG4gICAgICByZXR1cm4gPFNlbGVjdENvbXBsZXRlRGF0ZSB7Li4ucHJvcHN9IG9wdGlvbnM9e2xhc3RTdGVwLm9wdGlvbnN9IC8+O1xuICAgIGNhc2UgRE9ORTpcbiAgICAgIHJldHVybiA8RG9uZSB7Li4ucHJvcHN9IC8+O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gPFNlbGVjdEFjdGlvbkFkZCB7Li4ucHJvcHN9IC8+O1xuICB9XG59O1xuXG5jb25zdCBpbml0YWxTdGF0ZSA9IHtcbiAgbmV4dFN0ZXBzOiBbXSxcbiAgc3RlcHM6IFtcbiAgICB7XG4gICAgICBzdGVwSWQ6IFNFTEVDVF9XQU5UX1RPX0FERCxcbiAgICAgIG9wdGlvbnM6IHt9LFxuICAgIH0sXG4gIF0sXG4gIHNob3dTdGVwOiB0cnVlLFxufTtcblxuY2xhc3MgRGlhbG9nQWRkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC4uLmluaXRhbFN0YXRlLFxuICAgIH07XG4gICAgdGhpcy5vbkJhY2sgPSB0aGlzLm9uQmFjay5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25OZXh0ID0gdGhpcy5vbk5leHQuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uUmVzZXRBbmRDbG9zZSA9IHRoaXMub25SZXNldEFuZENsb3NlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkFuaW1hdGlvbkVuZCA9IHRoaXMub25BbmltYXRpb25FbmQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uQmFjaygpIHtcbiAgICBjb25zdCB7IHN0ZXBzIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgb25DbG9zZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzdGVwQ291bnQgPSBzdGVwcy5sZW5ndGg7XG4gICAgaWYgKHN0ZXBDb3VudCA9PT0gMSkge1xuICAgICAgLy8gUmV0dXJuZWQgdG8gdGhlIGZpcnN0IHN0ZXBzLCBjbG9zZSB0aGUgZGlhbG9nXG4gICAgICB0aGlzLnNldFN0YXRlKHsgLi4uaW5pdGFsU3RhdGUgfSk7XG4gICAgICBvbkNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZXh0U3RlcHM6IFtcbiAgICAgICAgICAuLi5zdGVwcy5zbGljZSgwLCBzdGVwcy5sZW5ndGggLSAxKSxcbiAgICAgICAgXSxcbiAgICAgICAgc2hvd1N0ZXA6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25OZXh0KHN0ZXAgPSB7IHN0ZXBJZDogJycsIG9wdGlvbnM6IHt9IH0pIHtcbiAgICBjb25zdCB7IHN0ZXBzIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbmV4dFN0ZXBzOiBbXG4gICAgICAgIC4uLnN0ZXBzLCB7XG4gICAgICAgICAgLi4uc3RlcCxcbiAgICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBzaG93U3RlcDogZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBvblJlc2V0QW5kQ2xvc2UoKSB7XG4gICAgY29uc3QgeyBvbkNsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgIG9uQ2xvc2UoKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi5pbml0YWxTdGF0ZSB9KTtcbiAgICB9LCA1MDApO1xuICB9XG5cbiAgb25BbmltYXRpb25FbmQobm9kZSwgZG9uZSkge1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsICgpID0+IHtcbiAgICAgIGRvbmUoKTtcbiAgICAgIGNvbnN0IHsgbmV4dFN0ZXBzLCBzaG93U3RlcCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIGlmIChzaG93U3RlcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc3RlcHM6IFtcbiAgICAgICAgICAuLi5uZXh0U3RlcHMsXG4gICAgICAgIF0sXG4gICAgICAgIHNob3dTdGVwOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgc3RlcHMsIHNob3dTdGVwIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgb25DbG9zZSwgb3BlbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IG9uTmV4dCwgb25SZXNldEFuZENsb3NlLCBvbkFuaW1hdGlvbkVuZCB9ID0gdGhpcztcbiAgICByZXR1cm4gKFxuICAgICAgPERpYWxvZ0FuaW0gaW49e29wZW59PlxuICAgICAgICA8ZGl2IGlkPVwiZGlhbG9nLWFkZFwiID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpYWxvZy1oZWFkZXJcIj5cbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJtYWluLWNsb3NlLWJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IG9uQ2xvc2UoKX0+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+JiN4RTVDRDs8L2k+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXBzLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPFN0ZXBzXG4gICAgICAgICAgICAgIGxpc3Q9e3N0ZXBMaXN0fVxuICAgICAgICAgICAgICBzdGVwSGlzdG9yeT17c3RlcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlhbG9nLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPFJlcGxhY2VBbmltIGluPXtzaG93U3RlcH0gZW5kTGlzdGVuZXI9e29uQW5pbWF0aW9uRW5kfT5cbiAgICAgICAgICAgICAge2dldENvbnRlbnRUb1JlbmRlcihzdGVwcywgeyBvbk5leHQsIG9uQ2xvc2U6IG9uUmVzZXRBbmRDbG9zZSB9KX1cbiAgICAgICAgICAgIDwvUmVwbGFjZUFuaW0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaWFsb2ctZm9vdGVyXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGlkPVwiYmFjay1idXR0b24tZGlhbG9nXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1idXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uQmFjaygpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBORVZFUiBNSU5ELCBHTyBCQUNLXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0RpYWxvZ0FuaW0+XG4gICAgKTtcbiAgfVxufVxuXG5EaWFsb2dBZGQucHJvcFR5cGVzID0ge1xuICBvcGVuOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlhbG9nQWRkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNsYXNzIERvbmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHsgb25DbG9zZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgIG9uQ2xvc2UoKTtcbiAgICB9LCAzMDAwKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWRvbmUtYWRkXCI+XG4gICAgICAgIDxoMj5Eb25lITwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1pYy1kb25lXCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgc3JjPVwiLi9jbGllbnQvcHVibGljL2ltZy9pYy1kb25lLnN2Z1wiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJpYy1kb25lXCJcbiAgICAgICAgICAgIGFsdD1cImRvbmUgaWNvblwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkRvbmUucHJvcFR5cGVzID0ge1xuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRG9uZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgeyBBRERfQ0FURUdPUlksIFNFTEVDVF9DQVRFR09SWSB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5cbmNvbnN0IFNlbGVjdEFjdGlvbkFkZCA9ICh7IG9uTmV4dCB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1zZWxlY3QtYWN0aW9uLWFkZFwiPlxuICAgIDxoMj5XaGF0IHdvdWxkIHlvdSBsaWtlIHRvIGFkZD88L2gyPlxuICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbS1zZWxlY3RcIj5cbiAgICAgIDxwXG4gICAgICAgIGNsYXNzTmFtZT1cInNlbGVjdC10aXRsZVwiXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uTmV4dCh7IHN0ZXBJZDogQUREX0NBVEVHT1JZLCBvcHRpb25zOiB7fSB9KX1cbiAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICA+XG4gICAgICAgIENBVEVHT1JZXG4gICAgICA8L3A+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtLXNlbGVjdFwiPlxuICAgICAgPHBcbiAgICAgICAgY2xhc3NOYW1lPVwic2VsZWN0LXRpdGxlXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4gb25OZXh0KHsgc3RlcElkOiBTRUxFQ1RfQ0FURUdPUlksIG9wdGlvbnM6IHt9IH0pfVxuICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgID5cbiAgICAgICAgQVJHVU1FTlRcbiAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4pO1xuXG5TZWxlY3RBY3Rpb25BZGQucHJvcFR5cGVzID0ge1xuICBvbk5leHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RBY3Rpb25BZGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5pbXBvcnQgQ2F0ZWdvcnkgZnJvbSAnLi4vQ2F0ZWdvcnknO1xuaW1wb3J0IHsgQUREX0FSR1VNRU5UIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5cbmNsYXNzIFNlbGVjdENhdGVnb3J5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlbGVjdGVkQ2F0ZWdvcnk6IHVuZGVmaW5lZCxcbiAgICB9O1xuICAgIHRoaXMub25DYXRlZ29yeUNsaWNrID0gdGhpcy5vbkNhdGVnb3J5Q2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQnV0dG9uTmV4dENsaWNrID0gdGhpcy5vbkJ1dHRvbk5leHRDbGljay5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25DYXRlZ29yeUNsaWNrKGNhdGVnb3J5KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkQ2F0ZWdvcnk6IGNhdGVnb3J5IH0pO1xuICB9XG5cbiAgb25CdXR0b25OZXh0Q2xpY2soKSB7XG4gICAgY29uc3QgeyBzZWxlY3RlZENhdGVnb3J5IH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgb25OZXh0LCBkaXNwYXRjaCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoc2VsZWN0ZWRDYXRlZ29yeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ1NlbGVjdENhdGVnb3J5KSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9uTmV4dCh7IHN0ZXBJZDogQUREX0FSR1VNRU5ULCBvcHRpb25zOiB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNhdGVnb3JpZXNMaXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgc2VsZWN0ZWRDYXRlZ29yeSB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LXNlbGVjdC1jYXRlZ29yeVwiPlxuICAgICAgICA8aDI+Q2hvb3NlIGEgQ0FURUdPUlk8L2gyPlxuICAgICAgICA8ZGl2IGlkPVwiY29udGVudC1jYXRlZ29yaWVzXCI+XG4gICAgICAgICAge1xuICAgICAgICAgICAgY2F0ZWdvcmllc0xpc3QubWFwKGNhdGVnb3J5ID0+IChcbiAgICAgICAgICAgICAgKGNhdGVnb3J5LmlkICE9PSAnMCcpXG4gICAgICAgICAgICAgID8gPENhdGVnb3J5XG4gICAgICAgICAgICAgICAga2V5PXtjYXRlZ29yeS5pZH1cbiAgICAgICAgICAgICAgICBjYXRlZ29yeT17Y2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3NlbGVjdGVkQ2F0ZWdvcnkgIT09IHVuZGVmaW5lZCAmJiBjYXRlZ29yeS5pZCA9PT0gc2VsZWN0ZWRDYXRlZ29yeS5pZH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2F0ZWdvcnlDbGlja31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICkpXG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQnV0dG9uTmV4dENsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIE5FWFRcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblNlbGVjdENhdGVnb3J5LnByb3BUeXBlcyA9IHtcbiAgZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNhdGVnb3JpZXNMaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICBvbk5leHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcCA9IHN0YXRlID0+IChcbiAge1xuICAgIGNhdGVnb3JpZXNMaXN0OiBzdGF0ZS50b2RvRmlsdGVycy5jYXRlZ29yaWVzLFxuICB9XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wKShTZWxlY3RDYXRlZ29yeSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgRGF0ZVBpY2tlciBmcm9tICdyZWFjdC1kYXRlLXBpY2tlcic7XG5cbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5pbXBvcnQgeyBET05FIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCB7IGFkZFRhc2sgfSBmcm9tICcuLi8uLi9hY3Rpb25zL3Rhc2tzQWN0aW9ucyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUluZm8gfSBmcm9tICcuLi8uLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcblxuY2xhc3MgU2VsZWN0Q29tcGxldGVEYXRlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRvZG9XaXRoaW46IG5ldyBEYXRlKCksXG4gICAgfTtcbiAgICB0aGlzLm9uSW5wdXREYXRlQ2hhbmdlID0gdGhpcy5vbklucHV0RGF0ZUNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25CdXR0b25BZGRDbGljayA9IHRoaXMub25CdXR0b25BZGRDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25Ub2RvQXJndW1lbnRDcmVhdGVkID0gdGhpcy5vblRvZG9Bcmd1bWVudENyZWF0ZWQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uSW5wdXREYXRlQ2hhbmdlKGRhdGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgdG9kb1dpdGhpbjogZGF0ZSB9KTtcbiAgfVxuXG4gIG9uQnV0dG9uQWRkQ2xpY2soKSB7XG4gICAgY29uc3QgeyB0b2RvV2l0aGluIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgZGlzcGF0Y2gsIG9wdGlvbnMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyB0aXRsZSwgZGVzY3JpcHRpb24sIGNhdGVnb3J5IH0gPSBvcHRpb25zO1xuICAgIGlmICghdG9kb1dpdGhpbiB8fCB0b2RvV2l0aGluID09PSAnJykge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VJbmZvKGxhYmVscy5tc2dTZWxlY3REYXRlKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRpc3BhdGNoKGFkZFRhc2soXG4gICAgICB0aXRsZSwgZGVzY3JpcHRpb24sXG4gICAgICBjYXRlZ29yeSwgdG9kb1dpdGhpbiwgdGhpcy5vblRvZG9Bcmd1bWVudENyZWF0ZWQsXG4gICAgKSk7XG4gIH1cblxuICBvblRvZG9Bcmd1bWVudENyZWF0ZWQoKSB7XG4gICAgY29uc3QgeyBvbk5leHQgfSA9IHRoaXMucHJvcHM7XG4gICAgb25OZXh0KHsgc3RlcElkOiBET05FLCBvcHRpb25zOiB7IH0gfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB0b2RvV2l0aGluIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtc2VsZWN0LWNvbXBsZXRlLWRhdGVcIj5cbiAgICAgICAgPGgyPlRvZG8gV2l0aGluPC9oMj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWlucHV0XCI+XG4gICAgICAgICAgPERhdGVQaWNrZXJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4taW5wdXRcIlxuICAgICAgICAgICAgY2FsZW5kYXJDbGFzc05hbWU9XCJkYXJrLWNhbGVuZGFyXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXREYXRlQ2hhbmdlfVxuICAgICAgICAgICAgdmFsdWU9e3RvZG9XaXRoaW59XG4gICAgICAgICAgICBtaW5EYXRlPXtuZXcgRGF0ZSgpfVxuICAgICAgICAgICAgbG9jYWxlPVwiZW4tVVNcIlxuICAgICAgICAgICAgY2xlYXJJY29uPXs8aSBjbGFzc05hbWU9XCJpY29uLWRlbGV0ZVwiIC8+fVxuICAgICAgICAgICAgY2FsZW5kYXJJY29uPXs8aSBjbGFzc05hbWU9XCJpY29uLWNhbGVuZGFyXCIgLz59XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1idXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkJ1dHRvbkFkZENsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIEFERFxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuU2VsZWN0Q29tcGxldGVEYXRlLnByb3BUeXBlcyA9IHtcbiAgZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9wdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNhdGVnb3J5OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB9KS5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkLFxuICBvbk5leHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCkoU2VsZWN0Q29tcGxldGVEYXRlKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBTdGVwID0gKHsgZGVzY3JpcHRpb24sIGNvbXBsZXRlZCwgbmVlZExpbmUgfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtY29udGFpbmVyXCI+XG4gICAge1xuICAgICAgbmVlZExpbmUgJiZcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbGluZSAkeyhjb21wbGV0ZWQpID8gJ2NvbXBsZXRlZCcgOiAnJ31gfSAvPlxuICAgIH1cbiAgICA8ZGl2IGNsYXNzTmFtZT17YHN0ZXAgJHsoY29tcGxldGVkKSA/ICdjb21wbGV0ZWQnIDogJyd9YH0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImluZGljYXRvclwiIC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtZGVzY3JpcHRpb25cIj5cbiAgICAgICAgPHA+e2Rlc2NyaXB0aW9ufTwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbik7XG5cblN0ZXAucHJvcFR5cGVzID0ge1xuICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIG5lZWRMaW5lOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuY29uc3QgU3RlcHMgPSAoeyBsaXN0LCBzdGVwSGlzdG9yeSB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwic3RlcHMtd3JhcHBlclwiPlxuICAgIHtcbiAgICAgIGxpc3QubWFwKChpdGVtLCBpKSA9PiAoXG4gICAgICAgIDxTdGVwXG4gICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgIHsuLi5pdGVtfVxuICAgICAgICAgIGNvbXBsZXRlZD17c3RlcEhpc3RvcnkuZmlsdGVyKHNoID0+IHNoLnN0ZXBJZCA9PT0gaXRlbS5pZCkubGVuZ3RoID4gMH1cbiAgICAgICAgICBuZWVkTGluZT17aSA+IDB9XG4gICAgICAgIC8+KSlcbiAgICB9XG4gIDwvZGl2PlxuKTtcblxuU3RlcHMucHJvcFR5cGVzID0ge1xuICBsaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgZGVzY3JpcHRpb246IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgc3RlcEhpc3Rvcnk6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc3RlcElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9KSkuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN0ZXBzO1xuIiwiY29uc3QgbGFiZWxzID0ge1xuICBtc2dUaXRsZVJlcXVpcmVkOiAnRW50ZXIgdGhlIHRpdGxlJyxcbiAgbXNnTmFtZVJlcXVpcmVkOiAnRW50ZXIgdGhlIG5hbWUnLFxuICBtc2dTZWxlY3RDYXRlZ29yeTogJ1NlbGVjdCBhIGNhdGVnb3J5JyxcbiAgbXNnU2VsZWN0RGF0ZTogJ1BpY2sgYSBkYXRlIGFuZCBjb21taXQuIE5vIGV4Y3VzZXMhJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxhYmVscztcbiIsImV4cG9ydCBjb25zdCBTRUxFQ1RfV0FOVF9UT19BREQgPSAnU0VMRUNUX1dBTlRfVE9fQUREJztcbmV4cG9ydCBjb25zdCBBRERfQ0FURUdPUlkgPSAnQUREX0NBVEVHT1JZJztcbmV4cG9ydCBjb25zdCBBRERfQVJHVU1FTlQgPSAnQUREX0FSR1VNRU5UJztcbmV4cG9ydCBjb25zdCBTRUxFQ1RfQ0FURUdPUlkgPSAnU0VMRUNUX0NBVEVHT1JZJztcbmV4cG9ydCBjb25zdCBTRUxFQ1RfQ09NUExFVEVfREFURSA9ICdTRUxFQ1RfQ09NUExFVEVfREFURSc7XG5leHBvcnQgY29uc3QgRE9ORSA9ICdET05FJztcblxuZXhwb3J0IGNvbnN0IHN0ZXBMaXN0ID0gW1xuICB7XG4gICAgaWQ6IFNFTEVDVF9XQU5UX1RPX0FERCxcbiAgICBkZXNjcmlwdGlvbjogJ1doYXQgd2FudCB0byBhZGQnLFxuICB9LFxuICB7XG4gICAgaWQ6IEFERF9DQVRFR09SWSxcbiAgICBkZXNjcmlwdGlvbjogJ0FkZCBhIGNhdGVnb3J5JyxcbiAgfSxcbiAge1xuICAgIGlkOiBTRUxFQ1RfQ0FURUdPUlksXG4gICAgZGVzY3JpcHRpb246ICdTZWxlY3QgYSBjYXRlZ29yeScsXG4gIH0sXG4gIHtcbiAgICBpZDogQUREX0FSR1VNRU5ULFxuICAgIGRlc2NyaXB0aW9uOiAnQWRkIEFyZ3VtZW50JyxcbiAgfSxcbiAge1xuICAgIGlkOiBTRUxFQ1RfQ09NUExFVEVfREFURSxcbiAgICBkZXNjcmlwdGlvbjogJ1NjaGVkdWxlJyxcbiAgfSxcbiAge1xuICAgIGlkOiBET05FLFxuICAgIGRlc2NyaXB0aW9uOiAnVGhhdFxcJ3MgaXQnLFxuICB9LFxuXTtcbiIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgQ2F0ZWdvcmllc0ZpbHRlciBmcm9tICcuLi9jb21wb25lbnRzL0NhdGVnb3JpZXNGaWx0ZXInO1xuaW1wb3J0IHtcbiAgc2VsZWN0Q2F0ZWdvcnksXG4gIHNlbGVjdENhdGVnb3J5QWxsLFxuICBkZWxldGVDYXRlZ29yeSxcbn0gZnJvbSAnLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuaW1wb3J0IGNhdGVnb3J5QWxsIGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuXG5pbXBvcnQgeyBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdCB9IGZyb20gJy4uL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IChcbiAge1xuICAgIGNhdGVnb3J5TGlzdDogZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3Qoc3RhdGUpLFxuICB9XG4pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoXG4gIHtcbiAgICBvbkRlbGV0ZUNhdGVnb3J5OiAoY2F0ZWdvcnkpID0+IHtcbiAgICAgIGRpc3BhdGNoKGRlbGV0ZUNhdGVnb3J5KGNhdGVnb3J5LmlkKSk7XG4gICAgfSxcbiAgICBvbkNpbGNrQ2F0ZWdvcnk6IChjYXRlZ29yeSwgZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2knICYmIGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2J1dHRvbicpIHtcbiAgICAgICAgaWYgKGNhdGVnb3J5LmlkID09PSBjYXRlZ29yeUFsbC5pZCkge1xuICAgICAgICAgIGRpc3BhdGNoKHNlbGVjdENhdGVnb3J5QWxsKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpc3BhdGNoKHNlbGVjdENhdGVnb3J5KGNhdGVnb3J5KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICB9XG4pO1xuXG5jb25zdCBDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyID0gY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pKENhdGVnb3JpZXNGaWx0ZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyO1xuIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBUYXNrcyBmcm9tICcuLi9jb21wb25lbnRzL1Rhc2tzJztcbmltcG9ydCB7XG4gIGZldGNoVGFza3NCeUNhdGVnb3J5LFxuICBkZWxldGVUYXNrLFxuICB0b29nbGVUYXNrQ29tcGxldGVkLFxufSBmcm9tICcuLi9hY3Rpb25zL3Rhc2tzQWN0aW9ucyc7XG5cbmltcG9ydCB7IGdldFRhc2tMaXN0LCBnZXRTa2lwLCBzdGlsbE1vcmVUb0xvYWQgfSBmcm9tICcuLi9zZWxlY3RvcnMvdGFza3NTZWxlY3RvcnMnO1xuaW1wb3J0IHsgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQsIHZpc2liaWxpdHlPbmx5Q29tcGxldGVkIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgdGFza0xpc3Q6IGdldFRhc2tMaXN0KHN0YXRlKSxcbiAgICBza2lwOiBnZXRTa2lwKHN0YXRlKSxcbiAgICBtb3JlVG9Mb2FkOiBzdGlsbE1vcmVUb0xvYWQoc3RhdGUpLFxuICAgIGNhdGVnb3JpZXNJZDogZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQoc3RhdGUpLFxuICAgIGNvbXBsZXRlZDogdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQoc3RhdGUpLFxuICB9XG4pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoXG4gIHtcbiAgICBvbkRlbGV0ZUFyZ3VtZW50OiAodGFzaykgPT4ge1xuICAgICAgZGlzcGF0Y2goZGVsZXRlVGFzayh0YXNrLmlkKSk7XG4gICAgfSxcbiAgICBvbkNvbXBsZXRlQXJndW1lbnQ6ICh0YXNrKSA9PiB7XG4gICAgICBkaXNwYXRjaCh0b29nbGVUYXNrQ29tcGxldGVkKHRhc2suaWQsIHRhc2suY29tcGxldGVkKSk7XG4gICAgfSxcbiAgICBmZXRjaFRhc2tzOiAoY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsIGxpbWl0LCBza2lwKSA9PiB7XG4gICAgICBkaXNwYXRjaChmZXRjaFRhc2tzQnlDYXRlZ29yeShjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCwgbGltaXQsIHNraXApKTtcbiAgICB9LFxuICB9XG4pO1xuXG5jb25zdCBUYXNrc0NvbnRhaW5lciA9IGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuKShUYXNrcyk7XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2tzQ29udGFpbmVyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBUb2RvcyBmcm9tICcuLi9jb21wb25lbnRzL1RvZG9zJztcbmltcG9ydCB7IGZldGNoQWxsQ2F0ZWdvcmllcyB9IGZyb20gJy4uL2FjdGlvbnMvdG9kb0ZpbHRlcnNBY3Rpb25zJztcbmltcG9ydCB7IGhpZGVNZXNzYWdlIH0gZnJvbSAnLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5pbXBvcnQgeyBzaG93TG9hZGluZyB9IGZyb20gJy4uL3NlbGVjdG9ycy9jb21tb25TZWxlY3RvcnMnO1xuXG5jb25zdCBUb2Rvc0NvbnRhaW5lciA9IHByb3BzID0+IDxUb2RvcyB7Li4ucHJvcHN9IC8+O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICBtZXNzYWdlOiBzdGF0ZS5tZXNzYWdlLFxuICAgIHNob3dMb2FkaW5nOiBzaG93TG9hZGluZyhzdGF0ZSksXG4gIH1cbik7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcbiAge1xuICAgIGhpZGVNZXNzYWdlOiAoKSA9PiB7XG4gICAgICBkaXNwYXRjaChoaWRlTWVzc2FnZSgpKTtcbiAgICB9LFxuICAgIGluaXRGZXRjaEFsbENhdGVnb3JpZXM6ICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKGZldGNoQWxsQ2F0ZWdvcmllcygpKTtcbiAgICB9LFxuICB9XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShUb2Rvc0NvbnRhaW5lcik7XG4iLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpc2liaWxpdHlGaWx0ZXJzIGZyb20gJy4uL2NvbXBvbmVudHMvVmlzaWJpbGl0eUZpbHRlcnMnO1xuaW1wb3J0IHsgY2hhbmdlVmlzaWJpbGl0eSB9IGZyb20gJy4uL2FjdGlvbnMvdG9kb0ZpbHRlcnNBY3Rpb25zJztcblxuaW1wb3J0IHsgZ2V0VmlzaWJpbGl0eUZpbHRlciB9IGZyb20gJy4uL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IChcbiAge1xuICAgIHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlcjogZ2V0VmlzaWJpbGl0eUZpbHRlcihzdGF0ZSksXG4gIH1cbik7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcbiAge1xuICAgIG9uVmlzaWJpbGl0eVN3aXRjaENsaWNrOiB2aXNpYmlsaXR5ID0+ICgpID0+IChcbiAgICAgIGRpc3BhdGNoKGNoYW5nZVZpc2liaWxpdHkodmlzaWJpbGl0eSkpXG4gICAgKSxcbiAgfVxuKTtcblxuY29uc3QgVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lciA9IGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuKShWaXNpYmlsaXR5RmlsdGVycyk7XG5cbmV4cG9ydCBkZWZhdWx0IFZpc2liaWxpdHlGaWx0ZXJDb250YWluZXI7XG4iLCJpbXBvcnQgeyBjcmVhdGVTZWxlY3RvciB9IGZyb20gJ3Jlc2VsZWN0JztcbmltcG9ydCB7IGlzRmV0Y2hpbmdDYXRlZ29yaWVzRmlsdGVyIH0gZnJvbSAnLi90b2RvRmlsdGVyc1NlbGVjdG9ycyc7XG5pbXBvcnQgeyBpc0ZldGNoaW5nVGFza3MgfSBmcm9tICcuL3Rhc2tzU2VsZWN0b3JzJztcblxuZXhwb3J0IGNvbnN0IHNob3dMb2FkaW5nID0gY3JlYXRlU2VsZWN0b3IoXG4gIGlzRmV0Y2hpbmdDYXRlZ29yaWVzRmlsdGVyLFxuICBpc0ZldGNoaW5nVGFza3MsXG4gIChpc0ZldGNoaW5nQ2F0ZWdvcmllcywgaXNGZXRjaGluZ1RvZG9zKSA9PiBpc0ZldGNoaW5nQ2F0ZWdvcmllcyB8fCBpc0ZldGNoaW5nVG9kb3MsXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBzaG93TG9hZGluZztcbiIsImV4cG9ydCBjb25zdCBpc0ZldGNoaW5nVGFza3MgPSBzdGF0ZSA9PiBzdGF0ZS50YXNrcy5pc0ZldGNoaW5nO1xuZXhwb3J0IGNvbnN0IGdldFRhc2tzID0gc3RhdGUgPT4gc3RhdGUudGFza3M7XG5leHBvcnQgY29uc3QgZ2V0VGFza0xpc3QgPSBzdGF0ZSA9PiBzdGF0ZS50YXNrcy5pdGVtcztcbmV4cG9ydCBjb25zdCBnZXRTa2lwID0gc3RhdGUgPT4gc3RhdGUudGFza3Muc2tpcDtcbmV4cG9ydCBjb25zdCBzdGlsbE1vcmVUb0xvYWQgPSBzdGF0ZSA9PiBzdGF0ZS50YXNrcy5tb3JlVG9Mb2FkO1xuIiwiaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgeyBPTkxZX0NPTVBMRVRFRCB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuXG5leHBvcnQgY29uc3QgaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy5pc0ZldGNoaW5nO1xuZXhwb3J0IGNvbnN0IGdldFRvZG9GaWx0ZXJzID0gc3RhdGUgPT4gc3RhdGUudG9kb0ZpbHRlcnM7XG5leHBvcnQgY29uc3QgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy5jYXRlZ29yaWVzO1xuZXhwb3J0IGNvbnN0IGdldFZpc2liaWxpdHlGaWx0ZXIgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy52aXNpYmlsaXR5O1xuXG5leHBvcnQgY29uc3QgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0VmlzaWJpbGl0eUZpbHRlcixcbiAgdmlzaWJpbGl0eSA9PiB2aXNpYmlsaXR5ID09PSBPTkxZX0NPTVBMRVRFRCxcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRTZWxlY3RlZENhdGVnb3JpZXNGaWx0ZXIgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QsXG4gIGNhdGVnb3JpZXMgPT4gY2F0ZWdvcmllcy5maWx0ZXIoY2F0ZWdvcnkgPT4gY2F0ZWdvcnkuc2VsZWN0ZWQpLFxuKTtcblxuZXhwb3J0IGNvbnN0IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0LFxuICBjYXRlZ29yaWVzID0+IGNhdGVnb3JpZXMuZmlsdGVyKGNhdGVnb3J5ID0+IGNhdGVnb3J5LnNlbGVjdGVkKVxuICAgIC5tYXAoY2F0ZWdvcnlGaWx0ZXIgPT4gY2F0ZWdvcnlGaWx0ZXIuaWQpLFxuKTtcbiIsIi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJjb25zaXN0ZW50XCJdICovXG5cbmV4cG9ydCBjb25zdCBNZXRob2RzID0ge1xuICBQT1NUOiAnUE9TVCcsXG4gIEdFVDogJ0dFVCcsXG4gIERFTEVURTogJ0RFTEVURScsXG4gIFBBVENIOiAnUEFUQ0gnLFxufTtcblxuY29uc3QgZnVsbFVybCA9IHVybCA9PiBgL2FwaS8ke3VybH1gO1xuXG5jb25zdCBiYXNlUmVxdWVzdEluaXQgPSB7XG4gIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gIGhlYWRlcnM6IHtcbiAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICB9LFxufTtcblxuY29uc3QgY3JlYXRlUG9zdFJlcXVlc3QgPSAodXJsLCBvcHRpb25zID0ge30pID0+IChcbiAgZmV0Y2godXJsLCB7XG4gICAgLi4uYmFzZVJlcXVlc3RJbml0LFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpLFxuICB9KVxuKTtcblxuY29uc3QgY3JlYXRlR2V0UmVxdWVzdCA9ICh1cmwsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBsZXQgZmluYWxVcmwgPSBgJHt1cmx9P2A7XG4gIE9iamVjdC5lbnRyaWVzKG9wdGlvbnMpLmZvckVhY2goKFtrZXksIHZhbHVlXSwgcG9pdGlvbikgPT4ge1xuICAgIGZpbmFsVXJsID0gYCR7ZmluYWxVcmx9JHsocG9pdGlvbiA+IDApID8gJyYnIDogJyd9JHtrZXl9PSR7dmFsdWV9YDtcbiAgfSk7XG4gIHJldHVybiBmZXRjaChmaW5hbFVybCwge1xuICAgIC4uLmJhc2VSZXF1ZXN0SW5pdCxcbiAgICBtZXRob2Q6ICdHRVQnLFxuICB9KTtcbn07XG5cbmNvbnN0IGNyZWF0ZURlbGV0ZVJlcXVlc3QgPSAodXJsLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IGZpbmFsVXJsID0gYCR7dXJsfS8ke29wdGlvbnN9YDtcbiAgcmV0dXJuIGZldGNoKGZpbmFsVXJsLCB7XG4gICAgLi4uYmFzZVJlcXVlc3RJbml0LFxuICAgIG1ldGhvZDogJ0RFTEVURScsXG4gIH0pO1xufTtcblxuY29uc3QgY3JlYXRlUGF0Y2hSZXF1ZXN0ID0gKHVybCwgb3B0aW9ucyA9IHt9KSA9PiAoXG4gIGZldGNoKHVybCwge1xuICAgIC4uLmJhc2VSZXF1ZXN0SW5pdCxcbiAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkob3B0aW9ucyksXG4gIH0pXG4pO1xuXG5jb25zdCBjcmVhdGVSZXF1ZXN0ID0gKHVybCwgb3B0aW9ucywgbWV0aG9kKSA9PiB7XG4gIGNvbnN0IGZpbmFsVXJsID0gZnVsbFVybCh1cmwpO1xuICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgIGNhc2UgTWV0aG9kcy5QT1NUOiByZXR1cm4gY3JlYXRlUG9zdFJlcXVlc3QoZmluYWxVcmwsIG9wdGlvbnMpO1xuICAgIGNhc2UgTWV0aG9kcy5HRVQ6IHJldHVybiBjcmVhdGVHZXRSZXF1ZXN0KGZpbmFsVXJsLCBvcHRpb25zKTtcbiAgICBjYXNlIE1ldGhvZHMuREVMRVRFOiByZXR1cm4gY3JlYXRlRGVsZXRlUmVxdWVzdChmaW5hbFVybCwgb3B0aW9ucyk7XG4gICAgY2FzZSBNZXRob2RzLlBBVENIOiByZXR1cm4gY3JlYXRlUGF0Y2hSZXF1ZXN0KGZpbmFsVXJsLCBvcHRpb25zKTtcbiAgICBkZWZhdWx0OiByZXR1cm4gY3JlYXRlUG9zdFJlcXVlc3QoZmluYWxVcmwsIG9wdGlvbnMpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY2FsbEFwaSA9ICh1cmwsIG9wdGlvbnMgPSB7fSwgbWV0aG9kID0gTWV0aG9kcy5QT1NUKSA9PiAoXG4gIGNyZWF0ZVJlcXVlc3QodXJsLCBvcHRpb25zLCBtZXRob2QpLnRoZW4oXG4gICAgcmVzcG9uc2UgPT4gKHJlc3BvbnNlLm9rID9cbiAgICAgIHJlc3BvbnNlLmpzb24oKSA6XG4gICAgICBQcm9taXNlLnJlamVjdChyZXNwb25zZS50ZXh0KCkpXG4gICAgKSxcbiAgICBlcnJvciA9PiBQcm9taXNlLnJlamVjdChlcnJvciksXG4gIClcbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNhbGxBcGk7XG5cbiIsImltcG9ydCBkYXRlRm9ybWF0IGZyb20gJ2RhdGVmb3JtYXQnO1xuXG5leHBvcnQgY29uc3QgdG9Kc0RhdGUgPSAocGFyc2VEYXRlID0gJycpID0+XG4gIG5ldyBEYXRlKHBhcnNlSW50KHBhcnNlRGF0ZS5zdWJzdHIoNiksIDEwKSk7XG5cbmV4cG9ydCBjb25zdCB0b1NpbXBsZURhdGVGb3JtYXQgPSBkYXRlID0+XG4gIGRhdGVGb3JtYXQoZGF0ZSwgJ2RkZGQgZGQgbW1tIHl5eXknKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=