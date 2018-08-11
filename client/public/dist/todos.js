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
        var items = getState().todoArguments.items;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy9tZXNzYWdlQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy90YXNrc0FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMvdG9kb0ZpbHRlcnNBY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0J1dHRvbkNvbXBsZXRlQXJndW1lbnQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0J1dHRvbkRlbGV0ZUFyZ3VtZW50LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CdXR0b25EZWxldGVDYXRlZ29yeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQnV0dG9uU2NvbGwuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0NhdGVnb3JpZXNGaWx0ZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0NhdGVnb3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9JbmZpbml0ZVNjcm9sbC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTWFpbkFkZEJ1dHRvbi5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvU25hY2tiYXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Rhc2suanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Rhc2tzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ub2Rvcy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVmlzaWJpbGl0eUZpbHRlcnMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Zpc2liaWxpdHlTd2l0Y2guanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FuaW1zL0NvbGxhcHNlLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9EaWFsb2dBbmltLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9SZXBsYWNlQW5pbS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvUmVzaXplLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9TbmFja2JhckFuaW0uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9BZGRDYXRlZ29yeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0FkZFRvZG9Bcmd1bWVudC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0RpYWxvZ0FkZC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0RvbmUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9TZWxlY3RBY3Rpb25BZGQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9TZWxlY3RDYXRlZ29yeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL1NlbGVjdENvbXBsZXRlRGF0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL1N0ZXBzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2xhYmVscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL3N0ZXBzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL0NhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL1Rhc2tzQ29udGFpbmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9Ub2Rvc0NvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy9jb21tb25TZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy90YXNrc1NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9BcGlVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvQ29tbW9uLmpzIl0sIm5hbWVzIjpbInNob3dNZXNzYWdlSW5mbyIsInR5cGUiLCJTSE9XX01FU1NBR0VfSU5GTyIsIm1lc3NhZ2UiLCJzaG93TWVzc2FnZUVycm9yIiwiU0hPV19NRVNTQUdFX0VSUk9SIiwiaGlkZU1lc3NhZ2UiLCJISURFX01FU1NBR0UiLCJyZXF1ZXN0RmV0Y2hUYXNrcyIsImxpbWl0Iiwic2tpcCIsIlJFUVVFU1RfRkVUQ0hfVEFTS1MiLCJyZWNlaXZlRmV0Y2hUYXNrcyIsIlJFQ0VJVkVfRkVUQ0hfVEFTS1MiLCJ0YXNrcyIsImVycm9yRmV0Y2hUYXNrcyIsIkVSUk9SX0ZFVENIX1RBU0tTIiwiZXJyb3IiLCJhZGRUYXNrTG9jYWwiLCJBRERfVEFTS19MT0NBTCIsInRhc2siLCJyZW1vdmVUYXNrTG9jYWwiLCJSRU1PVkVfVEFTS19MT0NBTCIsInRhc2tJbmRleCIsInVwZGF0ZVRhc2tMb2NhbCIsIlVQREFURV9UQVNLX0xPQ0FMIiwiZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkiLCJjYXRlZ29yaWVzSWQiLCJjb21wbGV0ZWQiLCJxdWVyeUl0ZW1zTGltaXQiLCJkaXNwYXRjaCIsInJlcXVlc3QiLCJNZXRob2RzIiwiR0VUIiwidGhlbiIsInJlc3BvbnNlIiwic3VjY2VzcyIsInRvZG9zIiwiZGF0YSIsIm1hcCIsInRvZG8iLCJjb21wbGV0ZWRBdCIsIkRhdGUiLCJ1bmRlZmluZWQiLCJ0b2RvV2l0aGluIiwibWVzc2FnZUVycm9yIiwiZGVsZXRlVGFzayIsImlkIiwiZ2V0U3RhdGUiLCJERUxFVEUiLCJpdGVtcyIsInRvZG9Bcmd1bWVudHMiLCJ0b2RvQXJndW1lbnRJbmRleCIsImZpbmRJbmRleCIsInRvZG9Bcmd1bWVudCIsImFkZFRhc2siLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwiY2F0ZWdvcnkiLCJjYWxsYmFjayIsImNhdGVnb3J5SWQiLCJQT1NUIiwidG9vZ2xlVGFza0NvbXBsZXRlZCIsImlzQ29tcGxldGVkIiwiUEFUQ0giLCJmZXRjaFRhc2tzIiwic3RhdGUiLCJyZXF1ZXN0RmV0Y2hBbGxDYXRlZ29yaWVzIiwiUkVRVUVTVF9GRVRDSF9BTExfQ0FURUdPUklFUyIsInJlY2VpdmVGZXRjaEFsbENhdGVnb3JpZXMiLCJSRUNFSVZFX0ZFVENIX0FMTF9DQVRFR09SSUVTIiwiY2F0ZWdvcmllcyIsImVycm9yRmV0Y2hBbGxDYXRlZ29yaWVzIiwiRVJST1JfRkVUQ0hfQUxMX0NBVEVHT1JJRVMiLCJhZGRDYXRlZ29yeUxvY2FsIiwiQUREX0NBVEVHT1JZX0xPQ0FMIiwicmVtb3ZlQ2F0ZWdvcnlMb2NhbCIsIlJFTU9WRV9DQVRFR09SWV9MT0NBTCIsImNhdGVnb3J5SW5kZXgiLCJ0b29nbGVTZWxlY3RDYXRlZ29yeSIsIlRPT0dMRV9TRUxFQ1RfQ0FURUdPUlkiLCJzZWxlY3RlZENhdGVnb3J5IiwidG9vZ2xlU2VsZWN0Q2F0ZWdvcnlBbGwiLCJUT09HTEVfU0VMRUNUX0NBVEVHT1JZX0FMTCIsInN3aXRjaFZpc2liaWxpdHlGaWx0ZXIiLCJTV0lUQ0hfVklTSUJJTElUWV9GSUxURVIiLCJ2aXNpYmlsaXR5IiwiZmV0Y2hBbGxDYXRlZ29yaWVzIiwiZGVsZXRlQ2F0ZWdvcnkiLCJ0b2RvRmlsdGVycyIsImFkZENhdGVnb3J5IiwibmFtZSIsImNoYW5nZVZpc2liaWxpdHkiLCJzZWxlY3RDYXRlZ29yeSIsInNlbGVjdENhdGVnb3J5QWxsIiwiQnV0dG9uQ29tcGxldGVBcmd1bWVudCIsIm9uQ2xpY2siLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsImJvb2wiLCJkZWZhdWx0UHJvcHMiLCJCdXR0b25EZWxldGVBcmd1bWVudCIsIkJ1dHRvbkRlbGV0ZUNhdGVnb3J5IiwiQnV0dG9uU2Nyb2xsIiwiZGlyZWN0aW9uIiwib25lT2YiLCJDYXRlZ29yaWVzRmlsdGVyIiwicHJvcHMiLCJjaGlwcyIsImhhbmRsZUxlZnRTY3JvbGxDbGljayIsImJpbmQiLCJoYW5kbGVSaWdodFNjcm9sbENsaWNrIiwibW92ZUNoaXBzU2Nyb2xsIiwiY2xpZW50V2lkdGgiLCJkZWx0YSIsIm5leHRTY3JvbGxMZWZ0Iiwic2Nyb2xsTGVmdCIsInNjcm9sbCIsImxlZnQiLCJjYXRlZ29yeUxpc3QiLCJvbkRlbGV0ZUNhdGVnb3J5Iiwib25DaWxja0NhdGVnb3J5Iiwibm9kZSIsImRpc3BsYXkiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsInNlbGVjdGVkIiwiUmVhY3QiLCJDb21wb25lbnQiLCJhcnJheU9mIiwic2hhcGUiLCJzdHJpbmciLCJDYXRlZ29yeSIsIm9uRGVsZXRlIiwiY3NzQ2xhc3MiLCJvbkNoaXBDbGljayIsImUiLCJvbkRlbGV0ZUNsaWNrIiwid2FpdFRpbWUiLCJJbmZpbml0ZVNjcm9sbCIsIm9uU2Nyb2xsIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJpbm5lckhlaWdodCIsInNjcm9sbFkiLCJkb2N1bWVudCIsImJvZHkiLCJvZmZzZXRIZWlnaHQiLCJhcmdzIiwiY2hpbGRyZW4iLCJjbGFzc05hbWUiLCJhbnkiLCJNYWluQWRkQnV0dG9uIiwiQWN0aW9uIiwidGV4dCIsIlNuYWNrYmFyIiwib25DbG9zZSIsImR1cmF0aW9uIiwic2hvdyIsInNldFRpbWVvdXQiLCJpc0Vycm9yIiwiYWN0aW9uVGV4dCIsImFjdGlvbkNsaWNrIiwidmVydGljYWxQb3N0aW9uIiwiaG9yaXpvbnRhbFBvc2l0aW9uIiwibnVtYmVyIiwiVGFzayIsImNvbGxhcHNlZCIsInJlbmRlckRhdGUiLCJzZXRTdGF0ZSIsIm9uQ29tcGxldGUiLCJvblRpdGxlQ2xpY2siLCJpbml0aWFsU3RhdGUiLCJUYXNrcyIsIm9uRmV0Y2hUb2RvQXJndW1lbnRzTmV4dCIsIm1vcmVUb0xvYWQiLCJuZXdTa2lwIiwidGFza0xpc3QiLCJvbkRlbGV0ZUFyZ3VtZW50Iiwib25Db21wbGV0ZUFyZ3VtZW50IiwiYXJnIiwibmV4dFByb3BzIiwicHJldlN0YXRlIiwiVG9kb3MiLCJpc0RpYWxvZ0FkZE9wZW4iLCJpbml0RmV0Y2hBbGxDYXRlZ29yaWVzIiwic2hvd0xvYWRpbmciLCJWaXNpYmlsaXR5RmlsdGVyIiwic2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyIiwib25WaXNpYmlsaXR5U3dpdGNoQ2xpY2siLCJPTkxZX1RPX0NPTVBMRVRFIiwiQUxMX1RPRE9TIiwiT05MWV9DT01QTEVURUQiLCJWaXNpYmlsaXR5U3dpdGNoIiwiZGVmYXVsdFN0eWxlIiwidHJhbnNpdGlvbiIsImhlaWdodCIsIm9uRW50ZXIiLCJzdHlsZSIsImZpcnN0RWxlbWVudENoaWxkIiwib25FeGl0IiwiQ29sbGFwc2UiLCJpblByb3AiLCJpbiIsIm9wYWNpdHkiLCJ0cmFuc2l0aW9uU3R5bGVzIiwiZW50ZXJpbmciLCJlbnRlcmVkIiwiRGlhbG9nQW5pbSIsIndpZHRoIiwiZW50ZXIiLCJSZXBsYWNlQW5pbSIsImVuZExpc3RlbmVyIiwiZXhpdCIsIm9uRW50ZXJlZCIsIm9uRXhpdGVkIiwiUmVzaXplIiwiYm90dG9tIiwiU25hY2tiYXJBbmltIiwiY3VzdG9tQ2xhc3MiLCJBZGRDYXRlZ29yeSIsIm9uSW5wdXRUZXh0Q2hhbmdlIiwib25CdXR0b25BZGRDbGljayIsIm9uQ2F0ZWdvcnlDcmVhdGVkIiwidGFyZ2V0IiwidmFsdWUiLCJsYWJlbHMiLCJtc2dOYW1lUmVxdWlyZWQiLCJvbk5leHQiLCJzdGVwSWQiLCJBRERfQVJHVU1FTlQiLCJvcHRpb25zIiwiQWRkVG9kb0FyZ3VtZW50Iiwib25CdXR0b25TY2hlZHVsZUNsaWNrIiwibXNnVGl0bGVSZXF1aXJlZCIsIlNFTEVDVF9DT01QTEVURV9EQVRFIiwiZ2V0Q29udGVudFRvUmVuZGVyIiwic3RlcHMiLCJsZW5ndGgiLCJsYXN0U3RlcCIsIlNFTEVDVF9XQU5UX1RPX0FERCIsIkFERF9DQVRFR09SWSIsIlNFTEVDVF9DQVRFR09SWSIsIkRPTkUiLCJpbml0YWxTdGF0ZSIsIm5leHRTdGVwcyIsInNob3dTdGVwIiwiRGlhbG9nQWRkIiwib25CYWNrIiwib25SZXNldEFuZENsb3NlIiwib25BbmltYXRpb25FbmQiLCJzdGVwQ291bnQiLCJzbGljZSIsInN0ZXAiLCJjb21wbGV0ZSIsImRvbmUiLCJvcGVuIiwic3RlcExpc3QiLCJEb25lIiwiU2VsZWN0QWN0aW9uQWRkIiwiU2VsZWN0Q2F0ZWdvcnkiLCJvbkNhdGVnb3J5Q2xpY2siLCJvbkJ1dHRvbk5leHRDbGljayIsIm1zZ1NlbGVjdENhdGVnb3J5IiwiY2F0ZWdvcmllc0xpc3QiLCJtYXBTdGF0ZVRvUHJvcCIsIlNlbGVjdENvbXBsZXRlRGF0ZSIsIm9uSW5wdXREYXRlQ2hhbmdlIiwib25Ub2RvQXJndW1lbnRDcmVhdGVkIiwiZGF0ZSIsIm1zZ1NlbGVjdERhdGUiLCJTdGVwIiwibmVlZExpbmUiLCJTdGVwcyIsImxpc3QiLCJzdGVwSGlzdG9yeSIsIml0ZW0iLCJpIiwiZmlsdGVyIiwic2giLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJjYXRlZ29yeUFsbCIsIkNhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIiLCJUYXNrc0NvbnRhaW5lciIsIlRvZG9zQ29udGFpbmVyIiwiVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lciIsIlZpc2liaWxpdHlGaWx0ZXJzIiwiaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIiLCJpc0ZldGNoaW5nVGFza3MiLCJpc0ZldGNoaW5nQ2F0ZWdvcmllcyIsImlzRmV0Y2hpbmdUb2RvcyIsImlzRmV0Y2hpbmciLCJnZXRUYXNrcyIsImdldFRhc2tMaXN0IiwiZ2V0U2tpcCIsInN0aWxsTW9yZVRvTG9hZCIsImdldFRvZG9GaWx0ZXJzIiwiZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QiLCJnZXRWaXNpYmlsaXR5RmlsdGVyIiwidmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQiLCJnZXRTZWxlY3RlZENhdGVnb3JpZXNGaWx0ZXIiLCJnZXRTZWxlY3RlZENhdGVnb3JpZXNJZCIsImNhdGVnb3J5RmlsdGVyIiwiZnVsbFVybCIsInVybCIsImJhc2VSZXF1ZXN0SW5pdCIsImNyZWRlbnRpYWxzIiwiaGVhZGVycyIsImNyZWF0ZVBvc3RSZXF1ZXN0IiwiZmV0Y2giLCJtZXRob2QiLCJKU09OIiwic3RyaW5naWZ5IiwiY3JlYXRlR2V0UmVxdWVzdCIsImZpbmFsVXJsIiwiT2JqZWN0IiwiZW50cmllcyIsImZvckVhY2giLCJwb2l0aW9uIiwia2V5IiwiY3JlYXRlRGVsZXRlUmVxdWVzdCIsImNyZWF0ZVBhdGNoUmVxdWVzdCIsImNyZWF0ZVJlcXVlc3QiLCJjYWxsQXBpIiwib2siLCJqc29uIiwiUHJvbWlzZSIsInJlamVjdCIsInRvSnNEYXRlIiwicGFyc2VEYXRlIiwicGFyc2VJbnQiLCJzdWJzdHIiLCJ0b1NpbXBsZURhdGVGb3JtYXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBTU8sSUFBTUEsNENBQWtCLFNBQWxCQSxlQUFrQjtBQUFBLFNBQzdCO0FBQ0VDLFVBQU1DLDhCQURSO0FBRUVDO0FBRkYsR0FENkI7QUFBQSxDQUF4Qjs7QUFPQSxJQUFNQyw4Q0FBbUIsU0FBbkJBLGdCQUFtQjtBQUFBLFNBQzlCO0FBQ0VILFVBQU1JLCtCQURSO0FBRUVGO0FBRkYsR0FEOEI7QUFBQSxDQUF6Qjs7QUFPQSxJQUFNRyxvQ0FBYyxTQUFkQSxXQUFjO0FBQUEsU0FDekI7QUFDRUwsVUFBTU07QUFEUixHQUR5QjtBQUFBLENBQXBCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCUDs7QUFDQTs7QUFRQTs7QUFDQTs7QUFFQSxJQUFNQyxv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QXBCLEVBQThCdEYsT0FBOUIsQ0FBUDtBQUNyQixTQUFLMU0sUUFBUWdDLEtBQWI7QUFBb0IsYUFBT3VRLG1CQUFtQlAsUUFBbkIsRUFBNkJ0RixPQUE3QixDQUFQO0FBQ3BCO0FBQVMsYUFBT2dGLGtCQUFrQk0sUUFBbEIsRUFBNEJ0RixPQUE1QixDQUFQO0FBTFg7QUFPRCxDQVREOztBQVdPLElBQU0rRiw0QkFBVSxTQUFWQSxPQUFVLENBQUNuQixHQUFEO0FBQUEsTUFBTTVFLE9BQU4sdUVBQWdCLEVBQWhCO0FBQUEsTUFBb0JrRixNQUFwQix1RUFBNkI1UixRQUFRNkIsSUFBckM7QUFBQSxTQUNyQjJRLGNBQWNsQixHQUFkLEVBQW1CNUUsT0FBbkIsRUFBNEJrRixNQUE1QixFQUFvQzFSLElBQXBDLENBQ0U7QUFBQSxXQUFhQyxTQUFTdVMsRUFBVCxHQUNYdlMsU0FBU3dTLElBQVQsRUFEVyxHQUVYQyxRQUFRQyxNQUFSLENBQWUxUyxTQUFTMEgsSUFBVCxFQUFmLENBRkY7QUFBQSxHQURGLEVBS0U7QUFBQSxXQUFTK0ssUUFBUUMsTUFBUixDQUFlNVQsS0FBZixDQUFUO0FBQUEsR0FMRixDQURxQjtBQUFBLENBQWhCOztrQkFVUXdULE87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRWY7Ozs7OztBQUVPLElBQU1LLDhCQUFXLFNBQVhBLFFBQVc7QUFBQSxNQUFDQyxTQUFELHVFQUFhLEVBQWI7QUFBQSxTQUN0QixJQUFJclMsSUFBSixDQUFTc1MsU0FBU0QsVUFBVUUsTUFBVixDQUFpQixDQUFqQixDQUFULEVBQThCLEVBQTlCLENBQVQsQ0FEc0I7QUFBQSxDQUFqQjs7QUFHQSxJQUFNQyxrREFBcUIsU0FBckJBLGtCQUFxQjtBQUFBLFNBQ2hDLDBCQUFXbEUsSUFBWCxFQUFpQixrQkFBakIsQ0FEZ0M7QUFBQSxDQUEzQixDIiwiZmlsZSI6InRvZG9zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgU0hPV19NRVNTQUdFX0lORk8sXG4gIFNIT1dfTUVTU0FHRV9FUlJPUixcbiAgSElERV9NRVNTQUdFLFxufSBmcm9tICcuLi9jb25zdGFudHMvYWN0aW9uVHlwZXMnO1xuXG5leHBvcnQgY29uc3Qgc2hvd01lc3NhZ2VJbmZvID0gbWVzc2FnZSA9PiAoXG4gIHtcbiAgICB0eXBlOiBTSE9XX01FU1NBR0VfSU5GTyxcbiAgICBtZXNzYWdlLFxuICB9XG4pO1xuXG5leHBvcnQgY29uc3Qgc2hvd01lc3NhZ2VFcnJvciA9IG1lc3NhZ2UgPT4gKFxuICB7XG4gICAgdHlwZTogU0hPV19NRVNTQUdFX0VSUk9SLFxuICAgIG1lc3NhZ2UsXG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBoaWRlTWVzc2FnZSA9ICgpID0+IChcbiAge1xuICAgIHR5cGU6IEhJREVfTUVTU0FHRSxcbiAgfVxuKTtcbiIsImltcG9ydCB7IGNhbGxBcGksIE1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9BcGlVdGlscyc7XG5pbXBvcnQge1xuICBSRVFVRVNUX0ZFVENIX1RBU0tTLFxuICBSRUNFSVZFX0ZFVENIX1RBU0tTLFxuICBFUlJPUl9GRVRDSF9UQVNLUyxcbiAgQUREX1RBU0tfTE9DQUwsXG4gIFJFTU9WRV9UQVNLX0xPQ0FMLFxuICBVUERBVEVfVEFTS19MT0NBTCxcbn0gZnJvbSAnLi4vY29uc3RhbnRzL2FjdGlvblR5cGVzJztcbmltcG9ydCB7IHF1ZXJ5SXRlbXNMaW1pdCB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VFcnJvciB9IGZyb20gJy4vbWVzc2FnZUFjdGlvbnMnO1xuXG5jb25zdCByZXF1ZXN0RmV0Y2hUYXNrcyA9IChsaW1pdCwgc2tpcCkgPT4gKFxuICB7XG4gICAgdHlwZTogUkVRVUVTVF9GRVRDSF9UQVNLUyxcbiAgICBsaW1pdCxcbiAgICBza2lwLFxuICB9XG4pO1xuXG5jb25zdCByZWNlaXZlRmV0Y2hUYXNrcyA9IHRhc2tzID0+IChcbiAge1xuICAgIHR5cGU6IFJFQ0VJVkVfRkVUQ0hfVEFTS1MsXG4gICAgdGFza3MsXG4gIH1cbik7XG5cbmNvbnN0IGVycm9yRmV0Y2hUYXNrcyA9IGVycm9yID0+IChcbiAge1xuICAgIHR5cGU6IEVSUk9SX0ZFVENIX1RBU0tTLFxuICAgIGVycm9yLFxuICB9XG4pO1xuXG5jb25zdCBhZGRUYXNrTG9jYWwgPSB0YXNrID0+IChcbiAge1xuICAgIHR5cGU6IEFERF9UQVNLX0xPQ0FMLFxuICAgIHRhc2ssXG4gIH1cbik7XG5cbmNvbnN0IHJlbW92ZVRhc2tMb2NhbCA9IHRhc2tJbmRleCA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRU1PVkVfVEFTS19MT0NBTCxcbiAgICB0YXNrSW5kZXgsXG4gIH1cbik7XG5cbmNvbnN0IHVwZGF0ZVRhc2tMb2NhbCA9IHRhc2sgPT4gKFxuICB7XG4gICAgdHlwZTogVVBEQVRFX1RBU0tfTE9DQUwsXG4gICAgdGFzayxcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGZldGNoVGFza3NCeUNhdGVnb3J5ID0gKFxuICBjYXRlZ29yaWVzSWQgPSBbXSxcbiAgY29tcGxldGVkID0gZmFsc2UsXG4gIGxpbWl0ID0gcXVlcnlJdGVtc0xpbWl0LFxuICBza2lwID0gMCxcbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHJlcXVlc3RGZXRjaFRhc2tzKGxpbWl0LCBza2lwKSk7XG4gIGNvbnN0IHJlcXVlc3QgPSBjYWxsQXBpKCd0YXNrcycsIHtcbiAgICBjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCwgbGltaXQsIHNraXAsXG4gIH0sIE1ldGhvZHMuR0VUKTtcbiAgcmV0dXJuIHJlcXVlc3QudGhlbihcbiAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIGNvbnN0IHRvZG9zID0gcmVzcG9uc2UuZGF0YS5tYXAodG9kbyA9PlxuICAgICAgICAgICh7XG4gICAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgICAgY29tcGxldGVkQXQ6ICh0b2RvLmNvbXBsZXRlZEF0KSA/IG5ldyBEYXRlKHRvZG8uY29tcGxldGVkQXQpIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdG9kb1dpdGhpbjogKHRvZG8udG9kb1dpdGhpbikgPyBuZXcgRGF0ZSh0b2RvLnRvZG9XaXRoaW4pIDogdW5kZWZpbmVkLFxuICAgICAgICAgIH0pKTtcbiAgICAgICAgZGlzcGF0Y2gocmVjZWl2ZUZldGNoVGFza3ModG9kb3MpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoKGVycm9yRmV0Y2hUYXNrcyhyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yID0+ICh7IGVycm9yIH0pLFxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZVRhc2sgPSAoaWQgPSAnJykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBjb25zdCByZXF1ZXN0ID0gY2FsbEFwaSgndGFza3MnLCBpZCwgTWV0aG9kcy5ERUxFVEUpO1xuICByZXR1cm4gcmVxdWVzdC50aGVuKFxuICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgY29uc3QgeyBpdGVtcyB9ID0gZ2V0U3RhdGUoKS50b2RvQXJndW1lbnRzO1xuICAgICAgICBjb25zdCB0b2RvQXJndW1lbnRJbmRleCA9IGl0ZW1zLmZpbmRJbmRleCh0b2RvQXJndW1lbnQgPT5cbiAgICAgICAgICB0b2RvQXJndW1lbnQuaWQgPT09IGlkKTtcbiAgICAgICAgZGlzcGF0Y2gocmVtb3ZlVGFza0xvY2FsKHRvZG9Bcmd1bWVudEluZGV4KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLm1lc3NhZ2VFcnJvcikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3IgPT4gKHsgZXJyb3IgfSksXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkVGFzayA9ICh0aXRsZSA9ICcnLCBkZXNjcmlwdGlvbiA9ICcnLCBjYXRlZ29yeSA9IHsgaWQ6ICcnIH0sIHRvZG9XaXRoaW4sIGNhbGxiYWNrID0gdW5kZWZpbmVkKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgY29uc3QgcmVxdWVzdCA9IGNhbGxBcGkoXG4gICAgJ3Rhc2tzJyxcbiAgICB7XG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnkuaWQsXG4gICAgICB0b2RvV2l0aGluLFxuICAgIH0sXG4gICAgTWV0aG9kcy5QT1NULFxuICApO1xuICByZXR1cm4gcmVxdWVzdC50aGVuKFxuICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgY29uc3QgdG9kbyA9IHtcbiAgICAgICAgICAuLi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIGNvbXBsZXRlZEF0OiAocmVzcG9uc2UuZGF0YS5jb21wbGV0ZWRBdClcbiAgICAgICAgICAgID8gbmV3IERhdGUocmVzcG9uc2UuZGF0YS5jb21wbGV0ZWRBdCkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgdG9kb1dpdGhpbjogKHJlc3BvbnNlLmRhdGEudG9kb1dpdGhpbilcbiAgICAgICAgICAgID8gbmV3IERhdGUocmVzcG9uc2UuZGF0YS50b2RvV2l0aGluKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgfTtcbiAgICAgICAgZGlzcGF0Y2goYWRkVGFza0xvY2FsKHRvZG8pKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLm1lc3NhZ2VFcnJvcikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3IgPT4gKHsgZXJyb3IgfSksXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgdG9vZ2xlVGFza0NvbXBsZXRlZCA9IChpZCA9ICcnLCBpc0NvbXBsZXRlZCA9IGZhbHNlKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgY29uc3QgY29tcGxldGVkID0gIWlzQ29tcGxldGVkO1xuICBjb25zdCBjb21wbGV0ZWRBdCA9IChjb21wbGV0ZWQpID8gbmV3IERhdGUoKSA6IG51bGw7XG4gIGNvbnN0IHJlcXVlc3QgPSBjYWxsQXBpKCd0YXNrcycsIHsgaWQsIGNvbXBsZXRlZCwgY29tcGxldGVkQXQgfSwgTWV0aG9kcy5QQVRDSCk7XG4gIHJldHVybiByZXF1ZXN0LnRoZW4oXG4gICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICBjb25zdCB0b2RvID0ge1xuICAgICAgICAgIC4uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgY29tcGxldGVkQXQ6IChyZXNwb25zZS5kYXRhLmNvbXBsZXRlZEF0KVxuICAgICAgICAgICAgPyBuZXcgRGF0ZShyZXNwb25zZS5kYXRhLmNvbXBsZXRlZEF0KSA6IHVuZGVmaW5lZCxcbiAgICAgICAgfTtcbiAgICAgICAgZGlzcGF0Y2godXBkYXRlVGFza0xvY2FsKHRvZG8pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBlcnJvciA9PiAoeyBlcnJvciB9KSxcbiAgKTtcbn07XG4iLCJpbXBvcnQgeyBjYWxsQXBpLCBNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvQXBpVXRpbHMnO1xuaW1wb3J0IHtcbiAgUkVRVUVTVF9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgUkVDRUlWRV9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgRVJST1JfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gIEFERF9DQVRFR09SWV9MT0NBTCxcbiAgUkVNT1ZFX0NBVEVHT1JZX0xPQ0FMLFxuICBUT09HTEVfU0VMRUNUX0NBVEVHT1JZLFxuICBUT09HTEVfU0VMRUNUX0NBVEVHT1JZX0FMTCxcbiAgU1dJVENIX1ZJU0lCSUxJVFlfRklMVEVSLFxufSBmcm9tICcuLi9jb25zdGFudHMvYWN0aW9uVHlwZXMnO1xuaW1wb3J0IHsgcXVlcnlJdGVtc0xpbWl0IH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5pbXBvcnQgeyBmZXRjaFRhc2tzQnlDYXRlZ29yeSB9IGZyb20gJy4vdGFza3NBY3Rpb25zJztcbmltcG9ydCB7IHNob3dNZXNzYWdlRXJyb3IgfSBmcm9tICcuL21lc3NhZ2VBY3Rpb25zJztcbmltcG9ydCB7IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkLCB2aXNpYmlsaXR5T25seUNvbXBsZXRlZCB9IGZyb20gJy4uL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycyc7XG5cbmNvbnN0IGZldGNoVGFza3MgPSBzdGF0ZSA9PiBmZXRjaFRhc2tzQnlDYXRlZ29yeShcbiAgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQoc3RhdGUpLFxuICB2aXNpYmlsaXR5T25seUNvbXBsZXRlZChzdGF0ZSksXG4pO1xuXG5jb25zdCByZXF1ZXN0RmV0Y2hBbGxDYXRlZ29yaWVzID0gKCkgPT4gKFxuICB7XG4gICAgdHlwZTogUkVRVUVTVF9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgfVxuKTtcblxuY29uc3QgcmVjZWl2ZUZldGNoQWxsQ2F0ZWdvcmllcyA9IGNhdGVnb3JpZXMgPT4gKFxuICB7XG4gICAgdHlwZTogUkVDRUlWRV9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgICBjYXRlZ29yaWVzLFxuICB9XG4pO1xuXG5jb25zdCBlcnJvckZldGNoQWxsQ2F0ZWdvcmllcyA9IGVycm9yID0+IChcbiAge1xuICAgIHR5cGU6IEVSUk9SX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICAgIGVycm9yLFxuICB9XG4pO1xuXG5jb25zdCBhZGRDYXRlZ29yeUxvY2FsID0gY2F0ZWdvcnkgPT4gKFxuICB7XG4gICAgdHlwZTogQUREX0NBVEVHT1JZX0xPQ0FMLFxuICAgIGNhdGVnb3J5LFxuICB9XG4pO1xuXG5jb25zdCByZW1vdmVDYXRlZ29yeUxvY2FsID0gY2F0ZWdvcnlJbmRleCA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRU1PVkVfQ0FURUdPUllfTE9DQUwsXG4gICAgY2F0ZWdvcnlJbmRleCxcbiAgfVxuKTtcblxuY29uc3QgdG9vZ2xlU2VsZWN0Q2F0ZWdvcnkgPSBzZWxlY3RlZENhdGVnb3J5ID0+IChcbiAge1xuICAgIHR5cGU6IFRPT0dMRV9TRUxFQ1RfQ0FURUdPUlksXG4gICAgc2VsZWN0ZWRDYXRlZ29yeSxcbiAgfVxuKTtcblxuY29uc3QgdG9vZ2xlU2VsZWN0Q2F0ZWdvcnlBbGwgPSAoKSA9PiAoXG4gIHtcbiAgICB0eXBlOiBUT09HTEVfU0VMRUNUX0NBVEVHT1JZX0FMTCxcbiAgfVxuKTtcblxuY29uc3Qgc3dpdGNoVmlzaWJpbGl0eUZpbHRlciA9IHZpc2liaWxpdHkgPT4gKFxuICB7XG4gICAgdHlwZTogU1dJVENIX1ZJU0lCSUxJVFlfRklMVEVSLFxuICAgIHZpc2liaWxpdHksXG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBmZXRjaEFsbENhdGVnb3JpZXMgPSAobGltaXQgPSBxdWVyeUl0ZW1zTGltaXQsIHNraXAgPSAwKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGRpc3BhdGNoKHJlcXVlc3RGZXRjaEFsbENhdGVnb3JpZXMoKSk7XG4gIGNvbnN0IHJlcXVlc3QgPSBjYWxsQXBpKCdjYXRlZ29yaWVzJywgeyBsaW1pdCwgc2tpcCB9LCBNZXRob2RzLkdFVCk7XG4gIHJldHVybiByZXF1ZXN0LnRoZW4oXG4gICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICBkaXNwYXRjaChyZWNlaXZlRmV0Y2hBbGxDYXRlZ29yaWVzKHJlc3BvbnNlLmRhdGEpKTtcbiAgICAgICAgZGlzcGF0Y2goZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkoZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQoZ2V0U3RhdGUoKSkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoKGVycm9yRmV0Y2hBbGxDYXRlZ29yaWVzKHJlc3BvbnNlLm1lc3NhZ2VFcnJvcikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3IgPT4gKFxuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihlcnJvci5tZXNzYWdlKSlcbiAgICApLFxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZUNhdGVnb3J5ID0gKGNhdGVnb3J5SWQgPSAnJykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBjb25zdCByZXF1ZXN0ID0gY2FsbEFwaSgnY2F0ZWdvcmllcycsIGNhdGVnb3J5SWQsIE1ldGhvZHMuREVMRVRFKTtcbiAgcmV0dXJuIHJlcXVlc3QudGhlbihcbiAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIGNvbnN0IHsgY2F0ZWdvcmllcyB9ID0gZ2V0U3RhdGUoKS50b2RvRmlsdGVycztcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlJbmRleCA9IGNhdGVnb3JpZXMuZmluZEluZGV4KGNhdGVnb3J5ID0+IGNhdGVnb3J5LmlkID09PSBjYXRlZ29yeUlkKTtcbiAgICAgICAgZGlzcGF0Y2gocmVtb3ZlQ2F0ZWdvcnlMb2NhbChjYXRlZ29yeUluZGV4KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLm1lc3NhZ2VFcnJvcikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3IgPT4gKFxuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihlcnJvci5tZXNzYWdlKSlcbiAgICApLFxuICApO1xufTtcblxuLyoqXG4gKiBSZXF1ZXN0IHRvIGFkZCBhIGNhdGVnb3J5XG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBjYXRlZ29yeSBuYW1lIHRvIGFkZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBuZWVkIHRvIGhhbmRsZSB0aGUgY2F0ZWdvcnkgY3JlYXRlZFxuICovXG5leHBvcnQgY29uc3QgYWRkQ2F0ZWdvcnkgPSAobmFtZSA9ICcnLCBjYWxsYmFjayA9IHVuZGVmaW5lZCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGNvbnN0IHJlcXVlc3QgPSBjYWxsQXBpKCdjYXRlZ29yaWVzJywgeyBuYW1lIH0sIE1ldGhvZHMuUE9TVCk7XG4gIHJldHVybiByZXF1ZXN0LnRoZW4oXG4gICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICBkaXNwYXRjaChhZGRDYXRlZ29yeUxvY2FsKHJlc3BvbnNlLmRhdGEpKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjYWxsYmFjayhyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yID0+IChcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpXG4gICAgKSxcbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VWaXNpYmlsaXR5ID0gdmlzaWJpbGl0eSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGRpc3BhdGNoKHN3aXRjaFZpc2liaWxpdHlGaWx0ZXIodmlzaWJpbGl0eSkpO1xuICByZXR1cm4gZGlzcGF0Y2goZmV0Y2hUYXNrcyhnZXRTdGF0ZSgpKSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0Q2F0ZWdvcnkgPSBzZWxlY3RlZENhdGVnb3J5ID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgZGlzcGF0Y2godG9vZ2xlU2VsZWN0Q2F0ZWdvcnkoc2VsZWN0ZWRDYXRlZ29yeSkpO1xuICByZXR1cm4gZGlzcGF0Y2goZmV0Y2hUYXNrcyhnZXRTdGF0ZSgpKSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0Q2F0ZWdvcnlBbGwgPSAoKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGRpc3BhdGNoKHRvb2dsZVNlbGVjdENhdGVnb3J5QWxsKCkpO1xuICByZXR1cm4gZGlzcGF0Y2goZmV0Y2hUYXNrcyhnZXRTdGF0ZSgpKSk7XG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEJ1dHRvbkNvbXBsZXRlQXJndW1lbnQgPSAoeyBvbkNsaWNrLCBjb21wbGV0ZWQgfSkgPT4gKFxuICA8YnV0dG9uXG4gICAgY2xhc3NOYW1lPXtgYnV0dG9uLWNvbXBsZXRlLWFyZ3VtZW50ICR7KGNvbXBsZXRlZCkgPyAnYnV0dG9uLWNvbXBsZXRlZC1hcmd1bWVudCcgOiAnJ31gfVxuICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gID5cbiAgICA8aSBjbGFzc05hbWU9XCJpY29uLWNoZWNrXCIgLz5cbiAgPC9idXR0b24+XG4pO1xuXG5CdXR0b25Db21wbGV0ZUFyZ3VtZW50LnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbCxcbn07XG5cbkJ1dHRvbkNvbXBsZXRlQXJndW1lbnQuZGVmYXVsdFByb3BzID0ge1xuICBjb21wbGV0ZWQ6IGZhbHNlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uQ29tcGxldGVBcmd1bWVudDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdXR0b25EZWxldGVBcmd1bWVudCA9ICh7IG9uQ2xpY2sgfSkgPT4gKFxuICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvbi1kZWxldGUtYXJndW1lbnRcIiBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICA8aSBjbGFzc05hbWU9XCJpY29uLWRlbGV0ZVwiIC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uRGVsZXRlQXJndW1lbnQucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uRGVsZXRlQXJndW1lbnQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgQnV0dG9uRGVsZXRlQ2F0ZWdvcnkgPSAoeyBvbkNsaWNrIH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24tZGVsZXRlLWNhdGVnb3J5XCIgb25DbGljaz17b25DbGlja30+XG4gICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1kZWxldGVcIiAvPlxuICA8L2J1dHRvbj5cbik7XG5cbkJ1dHRvbkRlbGV0ZUNhdGVnb3J5LnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkRlbGV0ZUNhdGVnb3J5O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEJ1dHRvblNjcm9sbCA9ICh7IG9uQ2xpY2ssIGRpcmVjdGlvbiB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPXtgYnV0dG9uLXNjcm9sbCAke2RpcmVjdGlvbn1gfSBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICA8aSBjbGFzc05hbWU9eyhkaXJlY3Rpb24gPT09ICdsZWZ0JykgPyAnaWNvbi1iYWNrd2FyZCcgOiAnaWNvbi1mb3J3YXJkJ30gLz5cbiAgPC9idXR0b24+XG4pO1xuXG5CdXR0b25TY3JvbGwucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBkaXJlY3Rpb246IFByb3BUeXBlcy5vbmVPZihbJ2xlZnQnLCAncmlnaHQnXSksXG59O1xuXG5CdXR0b25TY3JvbGwuZGVmYXVsdFByb3BzID0ge1xuICBkaXJlY3Rpb246ICdsZWZ0Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvblNjcm9sbDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbkdyb3VwIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5pbXBvcnQgc2Nyb2xsIGZyb20gJ3Njcm9sbCc7XG5pbXBvcnQgQnV0dG9uU2Nyb2xsIGZyb20gJy4vQnV0dG9uU2NvbGwnO1xuaW1wb3J0IENhdGVnb3J5IGZyb20gJy4vQ2F0ZWdvcnknO1xuaW1wb3J0IEZhZGUgZnJvbSAnLi9hbmltcy9GYWRlJztcblxuY2xhc3MgQ2F0ZWdvcmllc0ZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuY2hpcHMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5oYW5kbGVMZWZ0U2Nyb2xsQ2xpY2sgPSB0aGlzLmhhbmRsZUxlZnRTY3JvbGxDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlUmlnaHRTY3JvbGxDbGljayA9IHRoaXMuaGFuZGxlUmlnaHRTY3JvbGxDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMubW92ZUNoaXBzU2Nyb2xsID0gdGhpcy5tb3ZlQ2hpcHNTY3JvbGwuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZUxlZnRTY3JvbGxDbGljaygpIHtcbiAgICBpZiAodGhpcy5jaGlwcykge1xuICAgICAgdGhpcy5tb3ZlQ2hpcHNTY3JvbGwoLXRoaXMuY2hpcHMuY2xpZW50V2lkdGgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuY2hpcHMpIHtcbiAgICAgIHRoaXMubW92ZUNoaXBzU2Nyb2xsKHRoaXMuY2hpcHMuY2xpZW50V2lkdGgpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVDaGlwc1Njcm9sbChkZWx0YSkge1xuICAgIGlmICh0aGlzLmNoaXBzKSB7XG4gICAgICBjb25zdCBuZXh0U2Nyb2xsTGVmdCA9IHRoaXMuY2hpcHMuc2Nyb2xsTGVmdCArIGRlbHRhO1xuICAgICAgc2Nyb2xsLmxlZnQodGhpcy5jaGlwcywgbmV4dFNjcm9sbExlZnQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNhdGVnb3J5TGlzdCwgb25EZWxldGVDYXRlZ29yeSwgb25DaWxja0NhdGVnb3J5IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiY29udGVudC1jYXRlZ29yaWVzLWZpbHRlclwiPlxuICAgICAgICA8QnV0dG9uU2Nyb2xsXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVMZWZ0U2Nyb2xsQ2xpY2t9XG4gICAgICAgICAgZGlyZWN0aW9uPVwibGVmdFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJjYXRlZ29yaWVzLWZpbHRlclwiXG4gICAgICAgICAgcmVmPXsobm9kZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGlwcyA9IG5vZGU7XG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxUcmFuc2l0aW9uR3JvdXAgc3R5bGU9e3sgZGlzcGxheTogJ2luaGVyaXQnLCBwYWRkaW5nTGVmdDogJzEuMjVlbScsIHBhZGRpbmdSaWdodDogJzEuMjVlbScgfX0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNhdGVnb3J5TGlzdC5tYXAoY2F0ZWdvcnkgPT4gKFxuICAgICAgICAgICAgICAgIDxGYWRlIGtleT17Y2F0ZWdvcnkuaWR9PlxuICAgICAgICAgICAgICAgICAgPENhdGVnb3J5XG4gICAgICAgICAgICAgICAgICAgIGtleT17Y2F0ZWdvcnkuaWR9XG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5PXtjYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2NhdGVnb3J5LnNlbGVjdGVkfVxuICAgICAgICAgICAgICAgICAgICBvbkRlbGV0ZT17b25EZWxldGVDYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b25DaWxja0NhdGVnb3J5fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L0ZhZGU+XG4gICAgICAgICAgICAgICkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9UcmFuc2l0aW9uR3JvdXA+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8QnV0dG9uU2Nyb2xsXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVSaWdodFNjcm9sbENsaWNrfVxuICAgICAgICAgIGRpcmVjdGlvbj1cInJpZ2h0XCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQ2F0ZWdvcmllc0ZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIGNhdGVnb3J5TGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgb25EZWxldGVDYXRlZ29yeTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2lsY2tDYXRlZ29yeTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbkNhdGVnb3JpZXNGaWx0ZXIuZGVmYXVsdFByb3BzID0ge1xuICBvbkRlbGV0ZUNhdGVnb3J5OiB1bmRlZmluZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYXRlZ29yaWVzRmlsdGVyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQnV0dG9uRGVsZXRlQ2F0ZWdvcnkgZnJvbSAnLi9CdXR0b25EZWxldGVDYXRlZ29yeSc7XG5cbmNvbnN0IENhdGVnb3J5ID0gKHtcbiAgY2F0ZWdvcnksIHNlbGVjdGVkLCBvbkNsaWNrLCBvbkRlbGV0ZSxcbn0pID0+IHtcbiAgbGV0IGNzc0NsYXNzID0gJyc7XG5cbiAgY29uc3Qgb25DaGlwQ2xpY2sgPSAoZSkgPT4ge1xuICAgIG9uQ2xpY2soY2F0ZWdvcnksIGUpO1xuICB9O1xuICBjb25zdCBvbkRlbGV0ZUNsaWNrID0gKCkgPT4ge1xuICAgIG9uRGVsZXRlKGNhdGVnb3J5KTtcbiAgfTtcblxuICBpZiAoc2VsZWN0ZWQpIHtcbiAgICBjc3NDbGFzcyA9ICdjYXRlZ29yeS1zZWxlY3RlZCc7XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2Ake2Nzc0NsYXNzfSBjYXRlZ29yeS1jaGlwIGFsaWduLWl0ZW1zLWNlbnRlcmB9XG4gICAgICBvbkNsaWNrPXtvbkNoaXBDbGlja31cbiAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhdGVnb3J5LXRleHRcIj57Y2F0ZWdvcnkubmFtZX08L3NwYW4+XG4gICAgICB7XG4gICAgICAgIChjYXRlZ29yeS5pZCAhPT0gJzAnICYmIG9uRGVsZXRlICE9PSB1bmRlZmluZWQpICYmXG4gICAgICAgICAgPEJ1dHRvbkRlbGV0ZUNhdGVnb3J5IG9uQ2xpY2s9e29uRGVsZXRlQ2xpY2t9IC8+XG4gICAgICB9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5DYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIG9uRGVsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY2F0ZWdvcnk6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuQ2F0ZWdvcnkuZGVmYXVsdFByb3BzID0ge1xuICBvbkRlbGV0ZTogdW5kZWZpbmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0ZWdvcnk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSAnbG9kYXNoJztcblxuY29uc3Qgd2FpdFRpbWUgPSA1MDA7XG5cbmNsYXNzIEluZmluaXRlU2Nyb2xsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5vblNjcm9sbCA9IHRoaXMub25TY3JvbGwuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZSh0aGlzLm9uU2Nyb2xsLCB3YWl0VGltZSksIGZhbHNlKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZSh0aGlzLm9uU2Nyb2xsLCB3YWl0VGltZSksIGZhbHNlKTtcbiAgfVxuXG4gIG9uU2Nyb2xsKCkge1xuICAgIGlmICgod2luZG93LmlubmVySGVpZ2h0ICsgd2luZG93LnNjcm9sbFkpID49IChkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCAtIDIwMCkpIHtcbiAgICAgIGNvbnN0IHsgYXJncywgb25TY3JvbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICBvblNjcm9sbCguLi5hcmdzKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgY2xhc3NOYW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5JbmZpbml0ZVNjcm9sbC5wcm9wVHlwZXMgPSB7XG4gIGFyZ3M6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvblNjcm9sbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbkluZmluaXRlU2Nyb2xsLmRlZmF1bHRQcm9wcyA9IHtcbiAgYXJnczogW10sXG4gIGNsYXNzTmFtZTogJycsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbmZpbml0ZVNjcm9sbDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBNYWluQWRkQnV0dG9uID0gKHsgb25DbGljayB9KSA9PiAoXG4gIDxidXR0b24gaWQ9XCJtYWluLWFkZC1idXR0b25cIiBvbkNsaWNrPXtvbkNsaWNrfSA+XG4gICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj4mI3hFMTQ1OzwvaT5cbiAgPC9idXR0b24+XG4pO1xuXG5NYWluQWRkQnV0dG9uLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1haW5BZGRCdXR0b247XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBTbmFja2JhckFuaW0gZnJvbSAnLi9hbmltcy9TbmFja2JhckFuaW0nO1xuXG5jb25zdCBBY3Rpb24gPSAoeyBvbkNsaWNrLCB0ZXh0IH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24tYWN0aW9uLXNuYWNrYmFyXCIgb25DbGljaz17b25DbGlja30+XG4gICAge3RleHR9XG4gIDwvYnV0dG9uPlxuKTtcblxuQWN0aW9uLnByb3BUeXBlcyA9IHtcbiAgdGV4dDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuY2xhc3MgU25hY2tiYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgY29uc3Qge1xuICAgICAgb25DbG9zZSwgZHVyYXRpb24sIHNob3csXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoc2hvdykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgIH0sIGR1cmF0aW9uKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbWVzc2FnZSwgaXNFcnJvciwgYWN0aW9uVGV4dCwgYWN0aW9uQ2xpY2ssIHNob3csXG4gICAgICB2ZXJ0aWNhbFBvc3Rpb24sIGhvcml6b250YWxQb3NpdGlvbixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPFNuYWNrYmFyQW5pbSBpbj17c2hvd30gY3VzdG9tQ2xhc3M9e2Ake3ZlcnRpY2FsUG9zdGlvbn0gJHsoaG9yaXpvbnRhbFBvc2l0aW9uKX1gfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YHNuYWNrYmFyICR7KGlzRXJyb3IpID8gJ2Vycm9yJyA6ICcnfWB9XG4gICAgICAgID5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzbmFja2Jhci1tZXNzYWdlXCI+e21lc3NhZ2V9PC9zcGFuPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIChhY3Rpb25UZXh0ICE9PSAnJyAmJiBhY3Rpb25DbGljayAhPT0gdW5kZWZpbmVkKSAmJlxuICAgICAgICAgICAgICA8QWN0aW9uIG9uQ2xpY2s9e2FjdGlvbkNsaWNrfSB0ZXh0PXthY3Rpb25UZXh0fSAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L1NuYWNrYmFyQW5pbT5cbiAgICApO1xuICB9XG59XG5cblNuYWNrYmFyLnByb3BUeXBlcyA9IHtcbiAgc2hvdzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBkdXJhdGlvbjogUHJvcFR5cGVzLm51bWJlcixcbiAgaXNFcnJvcjogUHJvcFR5cGVzLmJvb2wsXG4gIGFjdGlvblRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGFjdGlvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgdmVydGljYWxQb3N0aW9uOiBQcm9wVHlwZXMub25lT2YoWyd0b3AnLCAnYm90dG9tJ10pLFxuICBob3Jpem9udGFsUG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbJ2xlZnQnLCAncmlnaHQnXSksXG59O1xuXG5TbmFja2Jhci5kZWZhdWx0UHJvcHMgPSB7XG4gIGR1cmF0aW9uOiA1MDAwLFxuICBpc0Vycm9yOiBmYWxzZSxcbiAgYWN0aW9uVGV4dDogJycsXG4gIGFjdGlvbkNsaWNrOiB1bmRlZmluZWQsXG4gIHZlcnRpY2FsUG9zdGlvbjogJ2JvdHRvbScsXG4gIGhvcml6b250YWxQb3NpdGlvbjogJ3JpZ2h0Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNuYWNrYmFyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQ29sbGFwc2UgZnJvbSAnLi9hbmltcy9Db2xsYXBzZSc7XG5pbXBvcnQgRmFkZSBmcm9tICcuL2FuaW1zL0ZhZGUnO1xuaW1wb3J0IEJ1dHRvbkNvbXBsZXRlQXJndW1lbnQgZnJvbSAnLi9CdXR0b25Db21wbGV0ZUFyZ3VtZW50JztcbmltcG9ydCBCdXR0b25EZWxldGVBcmd1bWVudCBmcm9tICcuL0J1dHRvbkRlbGV0ZUFyZ3VtZW50JztcbmltcG9ydCB7IHRvU2ltcGxlRGF0ZUZvcm1hdCB9IGZyb20gJy4uL3V0aWxzL0NvbW1vbic7XG5cbmNsYXNzIFRhc2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICB9O1xuICAgIHRoaXMucmVuZGVyRGF0ZSA9IHRoaXMucmVuZGVyRGF0ZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25UaXRsZUNsaWNrKCkge1xuICAgIGNvbnN0IHsgY29sbGFwc2VkIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBjb2xsYXBzZWQ6ICFjb2xsYXBzZWQgfSk7XG4gIH1cblxuICByZW5kZXJEYXRlKCkge1xuICAgIGNvbnN0IHsgdGFzayB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAodGFzay5jb21wbGV0ZWQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cImNvbXBsZXRlLWRhdGVcIj57YGNvbXBsZXRlZCAkeyh0YXNrLmNvbXBsZXRlZEF0KSA/IHRvU2ltcGxlRGF0ZUZvcm1hdCh0YXNrLmNvbXBsZXRlZEF0KSA6ICcnfWB9PC9wPlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxwIGNsYXNzTmFtZT1cImNvbXBsZXRlLXdpdGhpbi1kYXRlXCI+e2B0byBjb21wbGV0ZSB3aXRoaW4gJHsodGFzay50b2RvV2l0aGluKSA/IHRvU2ltcGxlRGF0ZUZvcm1hdCh0YXNrLnRvZG9XaXRoaW4pIDogJ25vdCBzZXQnfWB9PC9wPlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB0YXNrLCBvbkRlbGV0ZSwgb25Db21wbGV0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGNvbGxhcHNlZCB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcmd1bWVudC1pdGVtXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXJndW1lbnQtaGVhZGVyXCI+XG4gICAgICAgICAgPHBcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGFyZ3VtZW50LXRpdGxlICR7KHRhc2suY29tcGxldGVkKSA/ICdhcmd1bWVudC10aXRsZS1jb21wbGV0ZWQnIDogJyd9YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMub25UaXRsZUNsaWNrKCl9XG4gICAgICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGFzay50aXRsZX1cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPEZhZGUgaW49e2NvbGxhcHNlZH0+XG4gICAgICAgICAgICA8QnV0dG9uRGVsZXRlQXJndW1lbnRcbiAgICAgICAgICAgICAgb25DbGljaz17b25EZWxldGV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvRmFkZT5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBvbkNvbXBsZXRlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIDxCdXR0b25Db21wbGV0ZUFyZ3VtZW50XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ29tcGxldGV9XG4gICAgICAgICAgICAgIGNvbXBsZXRlZD17dGFzay5jb21wbGV0ZWR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXJndW1lbnQtZGF0ZVwiPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckRhdGUoKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxDb2xsYXBzZSBpbj17Y29sbGFwc2VkfT5cbiAgICAgICAgICA8ZGl2IGtleT17dGFzay5kZXNjcmlwdGlvbn0gY2xhc3NOYW1lPVwiYXJndW1lbnQtYm9keVwiPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYXJndW1lbnQtZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICh0YXNrLmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQgJiYgdGFzay5kZXNjcmlwdGlvbiAhPT0gJycpXG4gICAgICAgICAgICAgICAgPyB0YXNrLmRlc2NyaXB0aW9uIDogPHNwYW4gY2xhc3NOYW1lPVwiZW1wdHlcIj5ObyBkZXNjcmlwdGlvbiB0byBzaG93IDooPC9zcGFuPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQ29sbGFwc2U+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblRhc2sucHJvcFR5cGVzID0ge1xuICBvbkRlbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ29tcGxldGU6IFByb3BUeXBlcy5mdW5jLFxuICB0YXNrOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgY29tcGxldGVkQXQ6IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gIH0pLmlzUmVxdWlyZWQsXG59O1xuXG5UYXNrLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25EZWxldGU6IHVuZGVmaW5lZCxcbiAgb25Db21wbGV0ZTogdW5kZWZpbmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVGFzaztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbkdyb3VwIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5pbXBvcnQgUmVzaXplIGZyb20gJy4vYW5pbXMvUmVzaXplJztcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XG5pbXBvcnQgSW5maW5pdGVTY3JvbGwgZnJvbSAnLi9JbmZpbml0ZVNjcm9sbCc7XG5pbXBvcnQgeyBxdWVyeUl0ZW1zTGltaXQgfSBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBsaW1pdDogcXVlcnlJdGVtc0xpbWl0LFxuICBza2lwOiAwLFxufTtcblxuY2xhc3MgVGFza3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0gaW5pdGlhbFN0YXRlO1xuICAgIHRoaXMub25GZXRjaFRvZG9Bcmd1bWVudHNOZXh0ID0gdGhpcy5vbkZldGNoVG9kb0FyZ3VtZW50c05leHQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMobmV4dFByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICBpZiAobmV4dFByb3BzLnNraXAgIT09IHByZXZTdGF0ZS5za2lwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBza2lwOiBuZXh0UHJvcHMuc2tpcCxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgb25GZXRjaFRvZG9Bcmd1bWVudHNOZXh0KCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLFxuICAgICAgZmV0Y2hUYXNrcywgbW9yZVRvTG9hZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIW1vcmVUb0xvYWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeyBsaW1pdCwgc2tpcCB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBuZXdTa2lwID0gc2tpcCArIGxpbWl0O1xuICAgIHRoaXMuc2V0U3RhdGUoeyBza2lwOiBuZXdTa2lwIH0pO1xuICAgIGZldGNoVGFza3MoY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsIGxpbWl0LCBuZXdTa2lwKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB0YXNrTGlzdCxcbiAgICAgIG9uRGVsZXRlQXJndW1lbnQsXG4gICAgICBvbkNvbXBsZXRlQXJndW1lbnQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJjb250ZW50LXRvZG8tYXJndW1lbnRzXCI+XG4gICAgICAgIDxJbmZpbml0ZVNjcm9sbCBvblNjcm9sbD17dGhpcy5vbkZldGNoVG9kb0FyZ3VtZW50c05leHR9PlxuICAgICAgICAgIDxUcmFuc2l0aW9uR3JvdXA+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRhc2tMaXN0Lm1hcChhcmcgPT4gKFxuICAgICAgICAgICAgICAgIDxSZXNpemUga2V5PXthcmcuaWR9PlxuICAgICAgICAgICAgICAgICAgPFRhc2tcbiAgICAgICAgICAgICAgICAgICAga2V5PXthcmcuaWR9XG4gICAgICAgICAgICAgICAgICAgIHRhc2s9e2FyZ31cbiAgICAgICAgICAgICAgICAgICAgb25EZWxldGU9eygpID0+IG9uRGVsZXRlQXJndW1lbnQoYXJnKX1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17KCkgPT4gb25Db21wbGV0ZUFyZ3VtZW50KGFyZyl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvUmVzaXplPlxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvVHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICA8L0luZmluaXRlU2Nyb2xsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5UYXNrcy5wcm9wVHlwZXMgPSB7XG4gIG9uRGVsZXRlQXJndW1lbnQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uQ29tcGxldGVBcmd1bWVudDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgdGFza0xpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgbW9yZVRvTG9hZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgZmV0Y2hUYXNrczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY2F0ZWdvcmllc0lkOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKS5pc1JlcXVpcmVkLFxuICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBUYXNrcztcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgTG9hZGVyTGluZWFyIGZyb20gJy4uL2NvbXBvbmVudHMvTG9hZGVyTGluZWFyJztcbmltcG9ydCBNYWluQWRkQnV0dG9uIGZyb20gJy4uL2NvbXBvbmVudHMvTWFpbkFkZEJ1dHRvbic7XG5pbXBvcnQgQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lciBmcm9tICcuLi9jb250YWluZXJzL0NhdGVnb3JpZXNGaWx0ZXJDb250YWluZXInO1xuaW1wb3J0IFZpc2liaWxpdHlGaWx0ZXJDb250YWluZXIgZnJvbSAnLi4vY29udGFpbmVycy9WaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyJztcbmltcG9ydCBUYXNrc0NvbnRhaW5lciBmcm9tICcuLi9jb250YWluZXJzL1Rhc2tzQ29udGFpbmVyJztcbmltcG9ydCBEaWFsb2dBZGQgZnJvbSAnLi9kaWFsb2dBZGQvRGlhbG9nQWRkJztcbmltcG9ydCBTbmFja2JhciBmcm9tICcuL1NuYWNrYmFyJztcblxuY2xhc3MgVG9kb3MgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNEaWFsb2dBZGRPcGVuOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gRGlhbG9nQWRkLnByZWxvYWQoKTtcbiAgICBjb25zdCB7IGluaXRGZXRjaEFsbENhdGVnb3JpZXMgfSA9IHRoaXMucHJvcHM7XG4gICAgaW5pdEZldGNoQWxsQ2F0ZWdvcmllcygpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaXNEaWFsb2dBZGRPcGVuIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgbWVzc2FnZSwgaGlkZU1lc3NhZ2UsIHNob3dMb2FkaW5nIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtYXBwXCI+XG4gICAgICAgIDxMb2FkZXJMaW5lYXIgc2hvdz17c2hvd0xvYWRpbmd9IC8+XG4gICAgICAgIDxkaXYgaWQ9XCJtYWluLXRvcC1iYXJcIj5cbiAgICAgICAgICA8Q2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lciAvPlxuICAgICAgICAgIDxWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyIC8+XG4gICAgICAgICAgPE1haW5BZGRCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBpc0RpYWxvZ0FkZE9wZW46IHRydWUgfSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxUYXNrc0NvbnRhaW5lciAvPlxuICAgICAgICA8RGlhbG9nQWRkXG4gICAgICAgICAgb3Blbj17aXNEaWFsb2dBZGRPcGVufVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBpc0RpYWxvZ0FkZE9wZW46IGZhbHNlIH0pfVxuICAgICAgICAvPlxuICAgICAgICA8U25hY2tiYXJcbiAgICAgICAgICBzaG93PXttZXNzYWdlLnNob3d9XG4gICAgICAgICAgaXNFcnJvcj17bWVzc2FnZS5pc0Vycm9yfVxuICAgICAgICAgIG1lc3NhZ2U9e21lc3NhZ2UudGV4dH1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBoaWRlTWVzc2FnZSgpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Ub2Rvcy5wcm9wVHlwZXMgPSB7XG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2hvdzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0Vycm9yOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgaGlkZU1lc3NhZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGluaXRGZXRjaEFsbENhdGVnb3JpZXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHNob3dMb2FkaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9kb3M7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBWaXNpYmlsaXR5U3dpdGNoIGZyb20gJy4vVmlzaWJpbGl0eVN3aXRjaCc7XG5pbXBvcnQgeyBBTExfVE9ET1MsIE9OTFlfQ09NUExFVEVELCBPTkxZX1RPX0NPTVBMRVRFIH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmNvbnN0IFZpc2liaWxpdHlGaWx0ZXIgPSAoe1xuICBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIsIG9uVmlzaWJpbGl0eVN3aXRjaENsaWNrLFxufSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cInZpc2liaWxpdHktZmlsdGVyLXdyYXBwZXJcIj5cbiAgICA8VmlzaWJpbGl0eVN3aXRjaFxuICAgICAgc2VsZWN0ZWQ9eyhzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IE9OTFlfVE9fQ09NUExFVEVcbiAgICAgICAgfHwgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyID09PSBBTExfVE9ET1MpfVxuICAgICAgb25DbGljaz17b25WaXNpYmlsaXR5U3dpdGNoQ2xpY2soT05MWV9UT19DT01QTEVURSl9XG4gICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICA+XG4gICAgICA8aSBjbGFzc05hbWU9XCJpY29uLWNpcmNsZS1ib3JkZXJcIiAvPlxuICAgIDwvVmlzaWJpbGl0eVN3aXRjaD5cbiAgICA8VmlzaWJpbGl0eVN3aXRjaFxuICAgICAgc2VsZWN0ZWQ9eyhzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IE9OTFlfQ09NUExFVEVEXG4gICAgICAgIHx8IHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciA9PT0gQUxMX1RPRE9TKX1cbiAgICAgIG9uQ2xpY2s9e29uVmlzaWJpbGl0eVN3aXRjaENsaWNrKE9OTFlfQ09NUExFVEVEKX1cbiAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgID5cbiAgICAgIDxpIGNsYXNzTmFtZT1cImljb24tY2lyY2xlXCIgLz5cbiAgICA8L1Zpc2liaWxpdHlTd2l0Y2g+XG4gIDwvZGl2PlxuKTtcblxuVmlzaWJpbGl0eUZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvblZpc2liaWxpdHlTd2l0Y2hDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFZpc2liaWxpdHlGaWx0ZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgVmlzaWJpbGl0eVN3aXRjaCA9ICh7XG4gIHNlbGVjdGVkLCBjaGlsZHJlbiwgb25DbGljayxcbn0pID0+IChcbiAgPGRpdlxuICAgIGNsYXNzTmFtZT17YHZpc2liaWxpdHktYnV0dG9uLXN3aXRjaCBhbGlnbi1pdGVtcy1jZW50ZXIgJHsoc2VsZWN0ZWQpID8gJ3NlbGVjdGVkJyA6ICcnfSBgfVxuICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gID5cbiAgICB7Y2hpbGRyZW59XG4gIDwvZGl2PlxuKTtcblxuVmlzaWJpbGl0eVN3aXRjaC5wcm9wVHlwZXMgPSB7XG4gIHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5WaXNpYmlsaXR5U3dpdGNoLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2VsZWN0ZWQ6IGZhbHNlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaWJpbGl0eVN3aXRjaDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDMwMDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgaGVpZ2h0ICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBoZWlnaHQ6IDAsXG59O1xuXG5jb25zdCBvbkVudGVyID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gYCR7bm9kZS5maXJzdEVsZW1lbnRDaGlsZC5vZmZzZXRIZWlnaHR9cHhgO1xufTtcblxuY29uc3Qgb25FeGl0ID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gJzBweCc7XG59O1xuXG5jb25zdCBDb2xsYXBzZSA9ICh7IGluOiBpblByb3AsIGNoaWxkcmVuIH0pID0+IChcbiAgPFRyYW5zaXRpb24gb25FbnRlcj17b25FbnRlcn0gb25FeGl0PXtvbkV4aXR9IGluPXtpblByb3B9IHRpbWVvdXQ9e2R1cmF0aW9ufT5cbiAgICB7KCkgPT4gKFxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuQ29sbGFwc2UucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb2xsYXBzZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDI1MDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgYWxsICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBoZWlnaHQ6ICcwcHgnLFxuICBvcGFjaXR5OiAnMCcsXG4gIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxufTtcblxuY29uc3QgdHJhbnNpdGlvblN0eWxlcyA9IHtcbiAgZW50ZXJpbmc6IHtcbiAgICBoZWlnaHQ6ICcwcHgnLFxuICAgIG9wYWNpdHk6ICcwJyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgfSxcbiAgZW50ZXJlZDoge1xuICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgaGVpZ2h0OiAnMTAwdmgnLFxuICAgIG9wYWNpdHk6ICcxJyxcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gIH0sXG59O1xuXG5jb25zdCBEaWFsb2dBbmltID0gKHsgaW46IGluUHJvcCwgY2hpbGRyZW4gfSkgPT4gKFxuICA8VHJhbnNpdGlvbiBpbj17aW5Qcm9wfSB0aW1lb3V0PXtkdXJhdGlvbn0+XG4gICAge3N0YXRlID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJiYWNrZHJvcC1kaWFsb2dcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgICAuLi50cmFuc2l0aW9uU3R5bGVzW3N0YXRlXSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuRGlhbG9nQW5pbS5wcm9wVHlwZXMgPSB7XG4gIGluOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpYWxvZ0FuaW07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSAyNTA7XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgd2lkdGg6ICcxMDAlJyxcbiAgdHJhbnNpdGlvbjogYG9wYWNpdHkgJHtkdXJhdGlvbn1tcyBlYXNlLWluLW91dGAsXG4gIG9wYWNpdHk6IDAsXG4gIGRpc3BsYXk6ICdpbmhlcml0Jyxcbn07XG5cbmNvbnN0IHRyYW5zaXRpb25TdHlsZXMgPSB7XG4gIGVudGVyOiB7IG9wYWNpdHk6IDAgfSxcbiAgZW50ZXJlZDogeyBvcGFjaXR5OiAxIH0sXG59O1xuXG5jb25zdCBSZXBsYWNlQW5pbSA9ICh7IGluOiBpblByb3AsIGVuZExpc3RlbmVyLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxUcmFuc2l0aW9uXG4gICAgaW49e2luUHJvcH1cbiAgICB0aW1lb3V0PXtkdXJhdGlvbn1cbiAgICBhZGRFbmRMaXN0ZW5lcj17ZW5kTGlzdGVuZXJ9XG4gID5cbiAgICB7c3RhdGUgPT4gKFxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgICAuLi50cmFuc2l0aW9uU3R5bGVzW3N0YXRlXSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuUmVwbGFjZUFuaW0ucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgZW5kTGlzdGVuZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVwbGFjZUFuaW07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSB7XG4gIGVudGVyOiAzMDAsXG4gIGV4aXQ6IDIwMCxcbn07XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgdHJhbnNpdGlvbjogYGFsbCAke2R1cmF0aW9uLmVudGVyfW1zIGVhc2UtaW4tb3V0YCxcbiAgaGVpZ2h0OiAwLFxuICBvcGFjaXR5OiAwLFxufTtcblxuY29uc3Qgb25FbnRlciA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XG4gIHN0eWxlLmhlaWdodCA9IGAke25vZGUuZmlyc3RFbGVtZW50Q2hpbGQub2Zmc2V0SGVpZ2h0fXB4YDtcbiAgc3R5bGUub3BhY2l0eSA9IDE7XG59O1xuXG5jb25zdCBvbkVudGVyZWQgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSAnYXV0byc7XG59O1xuXG5jb25zdCBvbkV4aXQgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSBgJHtub2RlLmZpcnN0RWxlbWVudENoaWxkLm9mZnNldEhlaWdodH1weGA7XG59O1xuXG5jb25zdCBvbkV4aXRlZCA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XG4gIHN0eWxlLmhlaWdodCA9ICcwcHgnO1xuICBzdHlsZS5vcGFjaXR5ID0gMDtcbn07XG5cblxuY29uc3QgUmVzaXplID0gKHsgLi4ucHJvcHMsIGNoaWxkcmVuIH0pID0+IChcbiAgPFRyYW5zaXRpb25cbiAgICB7Li4ucHJvcHN9XG4gICAgb25FbnRlcj17b25FbnRlcn1cbiAgICBvbkVudGVyZWQ9e29uRW50ZXJlZH1cbiAgICBvbkV4aXQ9e29uRXhpdH1cbiAgICBvbkV4aXRlZD17b25FeGl0ZWR9XG4gICAgdGltZW91dD17ZHVyYXRpb259XG4gID5cbiAgICB7KCkgPT4gKFxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuUmVzaXplLnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZXNpemU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSAyNTA7XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgdHJhbnNpdGlvbjogYGFsbCAke2R1cmF0aW9ufW1zIGVhc2UtaW4tb3V0YCxcbiAgYm90dG9tOiAnLTEwMHB4Jyxcbn07XG5cbmNvbnN0IHRyYW5zaXRpb25TdHlsZXMgPSB7XG4gIGVudGVyaW5nOiB7XG4gICAgYm90dG9tOiAnLTEwMHB4JyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgfSxcbiAgZW50ZXJlZDoge1xuICAgIGJvdHRvbTogJzBweCcsXG4gICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICB9LFxufTtcblxuY29uc3QgU25hY2tiYXJBbmltID0gKHsgaW46IGluUHJvcCwgY2hpbGRyZW4sIGN1c3RvbUNsYXNzIH0pID0+IChcbiAgPFRyYW5zaXRpb24gaW49e2luUHJvcH0gdGltZW91dD17ZHVyYXRpb259PlxuICAgIHtzdGF0ZSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPVwiY29udGVudC1zbmFja2JhclwiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxuICAgICAgICAgIC4uLnRyYW5zaXRpb25TdHlsZXNbc3RhdGVdLFxuICAgICAgICB9fVxuICAgICAgICBjbGFzc05hbWU9e2N1c3RvbUNsYXNzfVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICA8L1RyYW5zaXRpb24+XG4pO1xuXG5TbmFja2JhckFuaW0ucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIGN1c3RvbUNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuU25hY2tiYXJBbmltLmRlZmF1bHRQcm9wcyA9IHtcbiAgY3VzdG9tQ2xhc3M6ICcnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU25hY2tiYXJBbmltO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IHsgQUREX0FSR1VNRU5UIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCB7IGFkZENhdGVnb3J5IH0gZnJvbSAnLi4vLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VJbmZvIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5cbmNsYXNzIEFkZENhdGVnb3J5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5hbWU6ICcnLFxuICAgIH07XG4gICAgdGhpcy5vbklucHV0VGV4dENoYW5nZSA9IHRoaXMub25JbnB1dFRleHRDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQnV0dG9uQWRkQ2xpY2sgPSB0aGlzLm9uQnV0dG9uQWRkQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQ2F0ZWdvcnlDcmVhdGVkID0gdGhpcy5vbkNhdGVnb3J5Q3JlYXRlZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25JbnB1dFRleHRDaGFuZ2UoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBuYW1lOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgfVxuXG4gIG9uQnV0dG9uQWRkQ2xpY2soKSB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgZGlzcGF0Y2ggfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKG5hbWUgPT09ICcnKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ05hbWVSZXF1aXJlZCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkaXNwYXRjaChhZGRDYXRlZ29yeShuYW1lLCB0aGlzLm9uQ2F0ZWdvcnlDcmVhdGVkKSk7XG4gIH1cblxuICBvbkNhdGVnb3J5Q3JlYXRlZChzZWxlY3RlZENhdGVnb3J5KSB7XG4gICAgY29uc3QgeyBvbk5leHQgfSA9IHRoaXMucHJvcHM7XG4gICAgb25OZXh0KHsgc3RlcElkOiBBRERfQVJHVU1FTlQsIG9wdGlvbnM6IHsgc2VsZWN0ZWRDYXRlZ29yeSB9IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtYWRkLWNhdGVnb3J5XCI+XG4gICAgICAgIDxoMj5BZGQgbmV3IENBVEVHT1JZPC9oMj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4taW5wdXRcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJUeXBlIHRoZSBuYW1lXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4tYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25CdXR0b25BZGRDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICBBRERcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkFkZENhdGVnb3J5LnByb3BUeXBlcyA9IHtcbiAgZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoKShBZGRDYXRlZ29yeSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5pbXBvcnQgeyBTRUxFQ1RfQ09NUExFVEVfREFURSB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUluZm8gfSBmcm9tICcuLi8uLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcblxuY2xhc3MgQWRkVG9kb0FyZ3VtZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdGl0bGU6ICcnLFxuICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgIH07XG4gICAgdGhpcy5vbklucHV0VGV4dENoYW5nZSA9IHRoaXMub25JbnB1dFRleHRDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQnV0dG9uU2NoZWR1bGVDbGljayA9IHRoaXMub25CdXR0b25TY2hlZHVsZUNsaWNrLmJpbmQodGhpcyk7XG4gIH1cblxuICBvbklucHV0VGV4dENoYW5nZShuYW1lKSB7XG4gICAgcmV0dXJuIChlKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgW25hbWVdOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgICB9O1xuICB9XG5cbiAgb25CdXR0b25TY2hlZHVsZUNsaWNrKCkge1xuICAgIGNvbnN0IHsgb3B0aW9ucywgZGlzcGF0Y2gsIG9uTmV4dCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBjYXRlZ29yeSA9IG9wdGlvbnMuc2VsZWN0ZWRDYXRlZ29yeTtcbiAgICBpZiAodGl0bGUgPT09ICcnKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ1RpdGxlUmVxdWlyZWQpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25OZXh0KHsgc3RlcElkOiBTRUxFQ1RfQ09NUExFVEVfREFURSwgb3B0aW9uczogeyB0aXRsZSwgZGVzY3JpcHRpb24sIGNhdGVnb3J5IH0gfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBzZWxlY3RlZENhdGVnb3J5IH0gPSB0aGlzLnByb3BzLm9wdGlvbnM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1hZGQtYXJndW1lbnRcIj5cbiAgICAgICAgPGgyPkFkZCBuZXcgQVJHVU1FTlQ8L2gyPlxuICAgICAgICA8aDM+XG4gICAgICAgICAgZm9yIHRoZSBjYXRlZ29yeTpcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsYWJlbC1jYXRlZ29yeS1uYW1lXCI+XG4gICAgICAgICAgICB7YCAke3NlbGVjdGVkQ2F0ZWdvcnkubmFtZX1gfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9oMz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWZpZWxkc1wiPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlR5cGUgdGhlIHRpdGxlXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlKCd0aXRsZScpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVHlwZSB0aGUgZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dFRleHRDaGFuZ2UoJ2Rlc2NyaXB0aW9uJyl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1idXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkJ1dHRvblNjaGVkdWxlQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgU0NIRURVTEVcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkFkZFRvZG9Bcmd1bWVudC5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvcHRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHNlbGVjdGVkQ2F0ZWdvcnk6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIH0pLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoKShBZGRUb2RvQXJndW1lbnQpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBTZWxlY3RBY3Rpb25BZGQgZnJvbSAnLi9TZWxlY3RBY3Rpb25BZGQnO1xuaW1wb3J0IEFkZENhdGVnb3J5IGZyb20gJy4vQWRkQ2F0ZWdvcnknO1xuaW1wb3J0IFNlbGVjdENhdGVnb3J5IGZyb20gJy4vU2VsZWN0Q2F0ZWdvcnknO1xuaW1wb3J0IEFkZFRvZG9Bcmd1bWVudCBmcm9tICcuL0FkZFRvZG9Bcmd1bWVudCc7XG5pbXBvcnQgU2VsZWN0Q29tcGxldGVEYXRlIGZyb20gJy4vU2VsZWN0Q29tcGxldGVEYXRlJztcbmltcG9ydCBEb25lIGZyb20gJy4vRG9uZSc7XG5pbXBvcnQge1xuICBTRUxFQ1RfV0FOVF9UT19BREQsXG4gIEFERF9DQVRFR09SWSxcbiAgQUREX0FSR1VNRU5ULFxuICBTRUxFQ1RfQ0FURUdPUlksXG4gIFNFTEVDVF9DT01QTEVURV9EQVRFLFxuICBET05FLFxuICBzdGVwTGlzdCxcbn0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCBSZXBsYWNlQW5pbSBmcm9tICcuLi9hbmltcy9SZXBsYWNlQW5pbSc7XG5pbXBvcnQgRGlhbG9nQW5pbSBmcm9tICcuLi9hbmltcy9EaWFsb2dBbmltJztcbmltcG9ydCBTdGVwcyBmcm9tICcuL1N0ZXBzJztcblxuY29uc3QgZ2V0Q29udGVudFRvUmVuZGVyID0gKHN0ZXBzLCBwcm9wcykgPT4ge1xuICBpZiAoc3RlcHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIDxTZWxlY3RBY3Rpb25BZGQgey4uLnByb3BzfSAvPjtcbiAgfVxuICBjb25zdCBsYXN0U3RlcCA9IHN0ZXBzW3N0ZXBzLmxlbmd0aCAtIDFdO1xuICBzd2l0Y2ggKGxhc3RTdGVwLnN0ZXBJZCkge1xuICAgIGNhc2UgU0VMRUNUX1dBTlRfVE9fQUREOlxuICAgICAgcmV0dXJuIDxTZWxlY3RBY3Rpb25BZGQgey4uLnByb3BzfSAvPjtcbiAgICBjYXNlIEFERF9DQVRFR09SWTpcbiAgICAgIHJldHVybiA8QWRkQ2F0ZWdvcnkgey4uLnByb3BzfSAvPjtcbiAgICBjYXNlIEFERF9BUkdVTUVOVDpcbiAgICAgIHJldHVybiA8QWRkVG9kb0FyZ3VtZW50IHsuLi5wcm9wc30gb3B0aW9ucz17bGFzdFN0ZXAub3B0aW9uc30gLz47XG4gICAgY2FzZSBTRUxFQ1RfQ0FURUdPUlk6XG4gICAgICByZXR1cm4gPFNlbGVjdENhdGVnb3J5IHsuLi5wcm9wc30gLz47XG4gICAgY2FzZSBTRUxFQ1RfQ09NUExFVEVfREFURTpcbiAgICAgIHJldHVybiA8U2VsZWN0Q29tcGxldGVEYXRlIHsuLi5wcm9wc30gb3B0aW9ucz17bGFzdFN0ZXAub3B0aW9uc30gLz47XG4gICAgY2FzZSBET05FOlxuICAgICAgcmV0dXJuIDxEb25lIHsuLi5wcm9wc30gLz47XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiA8U2VsZWN0QWN0aW9uQWRkIHsuLi5wcm9wc30gLz47XG4gIH1cbn07XG5cbmNvbnN0IGluaXRhbFN0YXRlID0ge1xuICBuZXh0U3RlcHM6IFtdLFxuICBzdGVwczogW1xuICAgIHtcbiAgICAgIHN0ZXBJZDogU0VMRUNUX1dBTlRfVE9fQURELFxuICAgICAgb3B0aW9uczoge30sXG4gICAgfSxcbiAgXSxcbiAgc2hvd1N0ZXA6IHRydWUsXG59O1xuXG5jbGFzcyBEaWFsb2dBZGQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLi4uaW5pdGFsU3RhdGUsXG4gICAgfTtcbiAgICB0aGlzLm9uQmFjayA9IHRoaXMub25CYWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbk5leHQgPSB0aGlzLm9uTmV4dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25SZXNldEFuZENsb3NlID0gdGhpcy5vblJlc2V0QW5kQ2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQW5pbWF0aW9uRW5kID0gdGhpcy5vbkFuaW1hdGlvbkVuZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25CYWNrKCkge1xuICAgIGNvbnN0IHsgc3RlcHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvbkNsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHN0ZXBDb3VudCA9IHN0ZXBzLmxlbmd0aDtcbiAgICBpZiAoc3RlcENvdW50ID09PSAxKSB7XG4gICAgICAvLyBSZXR1cm5lZCB0byB0aGUgZmlyc3Qgc3RlcHMsIGNsb3NlIHRoZSBkaWFsb2dcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi5pbml0YWxTdGF0ZSB9KTtcbiAgICAgIG9uQ2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5leHRTdGVwczogW1xuICAgICAgICAgIC4uLnN0ZXBzLnNsaWNlKDAsIHN0ZXBzLmxlbmd0aCAtIDEpLFxuICAgICAgICBdLFxuICAgICAgICBzaG93U3RlcDogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbk5leHQoc3RlcCA9IHsgc3RlcElkOiAnJywgb3B0aW9uczoge30gfSkge1xuICAgIGNvbnN0IHsgc3RlcHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZXh0U3RlcHM6IFtcbiAgICAgICAgLi4uc3RlcHMsIHtcbiAgICAgICAgICAuLi5zdGVwLFxuICAgICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHNob3dTdGVwOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIG9uUmVzZXRBbmRDbG9zZSgpIHtcbiAgICBjb25zdCB7IG9uQ2xvc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgb25DbG9zZSgpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLmluaXRhbFN0YXRlIH0pO1xuICAgIH0sIDUwMCk7XG4gIH1cblxuICBvbkFuaW1hdGlvbkVuZChub2RlLCBkb25lKSB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgKCkgPT4ge1xuICAgICAgZG9uZSgpO1xuICAgICAgY29uc3QgeyBuZXh0U3RlcHMsIHNob3dTdGVwIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgaWYgKHNob3dTdGVwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzdGVwczogW1xuICAgICAgICAgIC4uLm5leHRTdGVwcyxcbiAgICAgICAgXSxcbiAgICAgICAgc2hvd1N0ZXA6IHRydWUsXG4gICAgICB9KTtcbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBzdGVwcywgc2hvd1N0ZXAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvbkNsb3NlLCBvcGVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgb25OZXh0LCBvblJlc2V0QW5kQ2xvc2UsIG9uQW5pbWF0aW9uRW5kIH0gPSB0aGlzO1xuICAgIHJldHVybiAoXG4gICAgICA8RGlhbG9nQW5pbSBpbj17b3Blbn0+XG4gICAgICAgIDxkaXYgaWQ9XCJkaWFsb2ctYWRkXCIgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlhbG9nLWhlYWRlclwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cIm1haW4tY2xvc2UtYnV0dG9uXCIgb25DbGljaz17KCkgPT4gb25DbG9zZSgpfT5cbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj4mI3hFNUNEOzwvaT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcHMtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8U3RlcHNcbiAgICAgICAgICAgICAgbGlzdD17c3RlcExpc3R9XG4gICAgICAgICAgICAgIHN0ZXBIaXN0b3J5PXtzdGVwc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaWFsb2ctY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8UmVwbGFjZUFuaW0gaW49e3Nob3dTdGVwfSBlbmRMaXN0ZW5lcj17b25BbmltYXRpb25FbmR9PlxuICAgICAgICAgICAgICB7Z2V0Q29udGVudFRvUmVuZGVyKHN0ZXBzLCB7IG9uTmV4dCwgb25DbG9zZTogb25SZXNldEFuZENsb3NlIH0pfVxuICAgICAgICAgICAgPC9SZXBsYWNlQW5pbT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpYWxvZy1mb290ZXJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgaWQ9XCJiYWNrLWJ1dHRvbi1kaWFsb2dcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMub25CYWNrKCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIE5FVkVSIE1JTkQsIEdPIEJBQ0tcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvRGlhbG9nQW5pbT5cbiAgICApO1xuICB9XG59XG5cbkRpYWxvZ0FkZC5wcm9wVHlwZXMgPSB7XG4gIG9wZW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaWFsb2dBZGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY2xhc3MgRG9uZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgeyBvbkNsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgICAgb25DbG9zZSgpO1xuICAgIH0sIDMwMDApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtZG9uZS1hZGRcIj5cbiAgICAgICAgPGgyPkRvbmUhPC9oMj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWljLWRvbmVcIj5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBzcmM9XCIuL2NsaWVudC9wdWJsaWMvaW1nL2ljLWRvbmUuc3ZnXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImljLWRvbmVcIlxuICAgICAgICAgICAgYWx0PVwiZG9uZSBpY29uXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRG9uZS5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEb25lO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCB7IEFERF9DQVRFR09SWSwgU0VMRUNUX0NBVEVHT1JZIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcblxuY29uc3QgU2VsZWN0QWN0aW9uQWRkID0gKHsgb25OZXh0IH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LXNlbGVjdC1hY3Rpb24tYWRkXCI+XG4gICAgPGgyPldoYXQgd291bGQgeW91IGxpa2UgdG8gYWRkPzwvaDI+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtLXNlbGVjdFwiPlxuICAgICAgPHBcbiAgICAgICAgY2xhc3NOYW1lPVwic2VsZWN0LXRpdGxlXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4gb25OZXh0KHsgc3RlcElkOiBBRERfQ0FURUdPUlksIG9wdGlvbnM6IHt9IH0pfVxuICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgID5cbiAgICAgICAgQ0FURUdPUllcbiAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW0tc2VsZWN0XCI+XG4gICAgICA8cFxuICAgICAgICBjbGFzc05hbWU9XCJzZWxlY3QtdGl0bGVcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk5leHQoeyBzdGVwSWQ6IFNFTEVDVF9DQVRFR09SWSwgb3B0aW9uczoge30gfSl9XG4gICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgPlxuICAgICAgICBBUkdVTUVOVFxuICAgICAgPC9wPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbik7XG5cblNlbGVjdEFjdGlvbkFkZC5wcm9wVHlwZXMgPSB7XG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdEFjdGlvbkFkZDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi9jb25zdGFudHMvbGFiZWxzJztcbmltcG9ydCBDYXRlZ29yeSBmcm9tICcuLi9DYXRlZ29yeSc7XG5pbXBvcnQgeyBBRERfQVJHVU1FTlQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VJbmZvIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5cblxuY2xhc3MgU2VsZWN0Q2F0ZWdvcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VsZWN0ZWRDYXRlZ29yeTogdW5kZWZpbmVkLFxuICAgIH07XG4gICAgdGhpcy5vbkNhdGVnb3J5Q2xpY2sgPSB0aGlzLm9uQ2F0ZWdvcnlDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25CdXR0b25OZXh0Q2xpY2sgPSB0aGlzLm9uQnV0dG9uTmV4dENsaWNrLmJpbmQodGhpcyk7XG4gIH1cblxuICBvbkNhdGVnb3J5Q2xpY2soY2F0ZWdvcnkpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRDYXRlZ29yeTogY2F0ZWdvcnkgfSk7XG4gIH1cblxuICBvbkJ1dHRvbk5leHRDbGljaygpIHtcbiAgICBjb25zdCB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvbk5leHQsIGRpc3BhdGNoIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChzZWxlY3RlZENhdGVnb3J5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlSW5mbyhsYWJlbHMubXNnU2VsZWN0Q2F0ZWdvcnkpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25OZXh0KHsgc3RlcElkOiBBRERfQVJHVU1FTlQsIG9wdGlvbnM6IHsgc2VsZWN0ZWRDYXRlZ29yeSB9IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2F0ZWdvcmllc0xpc3QgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBzZWxlY3RlZENhdGVnb3J5IH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtc2VsZWN0LWNhdGVnb3J5XCI+XG4gICAgICAgIDxoMj5DaG9vc2UgYSBDQVRFR09SWTwvaDI+XG4gICAgICAgIDxkaXYgaWQ9XCJjb250ZW50LWNhdGVnb3JpZXNcIj5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBjYXRlZ29yaWVzTGlzdC5tYXAoY2F0ZWdvcnkgPT4gKFxuICAgICAgICAgICAgICAoY2F0ZWdvcnkuaWQgIT09ICcwJylcbiAgICAgICAgICAgICAgPyA8Q2F0ZWdvcnlcbiAgICAgICAgICAgICAgICBrZXk9e2NhdGVnb3J5LmlkfVxuICAgICAgICAgICAgICAgIGNhdGVnb3J5PXtjYXRlZ29yeX1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17c2VsZWN0ZWRDYXRlZ29yeSAhPT0gdW5kZWZpbmVkICYmIGNhdGVnb3J5LmlkID09PSBzZWxlY3RlZENhdGVnb3J5LmlkfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DYXRlZ29yeUNsaWNrfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSlcbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4tYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25CdXR0b25OZXh0Q2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgTkVYVFxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuU2VsZWN0Q2F0ZWdvcnkucHJvcFR5cGVzID0ge1xuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY2F0ZWdvcmllc0xpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wID0gc3RhdGUgPT4gKFxuICB7XG4gICAgY2F0ZWdvcmllc0xpc3Q6IHN0YXRlLnRvZG9GaWx0ZXJzLmNhdGVnb3JpZXMsXG4gIH1cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3ApKFNlbGVjdENhdGVnb3J5KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBEYXRlUGlja2VyIGZyb20gJ3JlYWN0LWRhdGUtcGlja2VyJztcblxuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi9jb25zdGFudHMvbGFiZWxzJztcbmltcG9ydCB7IERPTkUgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IHsgYWRkVGFzayB9IGZyb20gJy4uLy4uL2FjdGlvbnMvdGFza3NBY3Rpb25zJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5jbGFzcyBTZWxlY3RDb21wbGV0ZURhdGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdG9kb1dpdGhpbjogbmV3IERhdGUoKSxcbiAgICB9O1xuICAgIHRoaXMub25JbnB1dERhdGVDaGFuZ2UgPSB0aGlzLm9uSW5wdXREYXRlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkJ1dHRvbkFkZENsaWNrID0gdGhpcy5vbkJ1dHRvbkFkZENsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblRvZG9Bcmd1bWVudENyZWF0ZWQgPSB0aGlzLm9uVG9kb0FyZ3VtZW50Q3JlYXRlZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25JbnB1dERhdGVDaGFuZ2UoZGF0ZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyB0b2RvV2l0aGluOiBkYXRlIH0pO1xuICB9XG5cbiAgb25CdXR0b25BZGRDbGljaygpIHtcbiAgICBjb25zdCB7IHRvZG9XaXRoaW4gfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBkaXNwYXRjaCwgb3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgY2F0ZWdvcnkgfSA9IG9wdGlvbnM7XG4gICAgaWYgKCF0b2RvV2l0aGluIHx8IHRvZG9XaXRoaW4gPT09ICcnKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ1NlbGVjdERhdGUpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGlzcGF0Y2goYWRkVGFzayhcbiAgICAgIHRpdGxlLCBkZXNjcmlwdGlvbixcbiAgICAgIGNhdGVnb3J5LCB0b2RvV2l0aGluLCB0aGlzLm9uVG9kb0FyZ3VtZW50Q3JlYXRlZCxcbiAgICApKTtcbiAgfVxuXG4gIG9uVG9kb0FyZ3VtZW50Q3JlYXRlZCgpIHtcbiAgICBjb25zdCB7IG9uTmV4dCB9ID0gdGhpcy5wcm9wcztcbiAgICBvbk5leHQoeyBzdGVwSWQ6IERPTkUsIG9wdGlvbnM6IHsgfSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHRvZG9XaXRoaW4gfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1zZWxlY3QtY29tcGxldGUtZGF0ZVwiPlxuICAgICAgICA8aDI+VG9kbyBXaXRoaW48L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtaW5wdXRcIj5cbiAgICAgICAgICA8RGF0ZVBpY2tlclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICBjYWxlbmRhckNsYXNzTmFtZT1cImRhcmstY2FsZW5kYXJcIlxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dERhdGVDaGFuZ2V9XG4gICAgICAgICAgICB2YWx1ZT17dG9kb1dpdGhpbn1cbiAgICAgICAgICAgIG1pbkRhdGU9e25ldyBEYXRlKCl9XG4gICAgICAgICAgICBsb2NhbGU9XCJlbi1VU1wiXG4gICAgICAgICAgICBjbGVhckljb249ezxpIGNsYXNzTmFtZT1cImljb24tZGVsZXRlXCIgLz59XG4gICAgICAgICAgICBjYWxlbmRhckljb249ezxpIGNsYXNzTmFtZT1cImljb24tY2FsZW5kYXJcIiAvPn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQnV0dG9uQWRkQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgQUREXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TZWxlY3RDb21wbGV0ZURhdGUucHJvcFR5cGVzID0ge1xuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb3B0aW9uczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY2F0ZWdvcnk6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIH0pLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoKShTZWxlY3RDb21wbGV0ZURhdGUpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IFN0ZXAgPSAoeyBkZXNjcmlwdGlvbiwgY29tcGxldGVkLCBuZWVkTGluZSB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1jb250YWluZXJcIj5cbiAgICB7XG4gICAgICBuZWVkTGluZSAmJlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BsaW5lICR7KGNvbXBsZXRlZCkgPyAnY29tcGxldGVkJyA6ICcnfWB9IC8+XG4gICAgfVxuICAgIDxkaXYgY2xhc3NOYW1lPXtgc3RlcCAkeyhjb21wbGV0ZWQpID8gJ2NvbXBsZXRlZCcgOiAnJ31gfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5kaWNhdG9yXCIgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1kZXNjcmlwdGlvblwiPlxuICAgICAgICA8cD57ZGVzY3JpcHRpb259PC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuU3RlcC5wcm9wVHlwZXMgPSB7XG4gIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgbmVlZExpbmU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5jb25zdCBTdGVwcyA9ICh7IGxpc3QsIHN0ZXBIaXN0b3J5IH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJzdGVwcy13cmFwcGVyXCI+XG4gICAge1xuICAgICAgbGlzdC5tYXAoKGl0ZW0sIGkpID0+IChcbiAgICAgICAgPFN0ZXBcbiAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgey4uLml0ZW19XG4gICAgICAgICAgY29tcGxldGVkPXtzdGVwSGlzdG9yeS5maWx0ZXIoc2ggPT4gc2guc3RlcElkID09PSBpdGVtLmlkKS5sZW5ndGggPiAwfVxuICAgICAgICAgIG5lZWRMaW5lPXtpID4gMH1cbiAgICAgICAgLz4pKVxuICAgIH1cbiAgPC9kaXY+XG4pO1xuXG5TdGVwcy5wcm9wVHlwZXMgPSB7XG4gIGxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICBzdGVwSGlzdG9yeTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBzdGVwSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH0pKS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3RlcHM7XG4iLCJjb25zdCBsYWJlbHMgPSB7XG4gIG1zZ1RpdGxlUmVxdWlyZWQ6ICdFbnRlciB0aGUgdGl0bGUnLFxuICBtc2dOYW1lUmVxdWlyZWQ6ICdFbnRlciB0aGUgbmFtZScsXG4gIG1zZ1NlbGVjdENhdGVnb3J5OiAnU2VsZWN0IGEgY2F0ZWdvcnknLFxuICBtc2dTZWxlY3REYXRlOiAnUGljayBhIGRhdGUgYW5kIGNvbW1pdC4gTm8gZXhjdXNlcyEnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbGFiZWxzO1xuIiwiZXhwb3J0IGNvbnN0IFNFTEVDVF9XQU5UX1RPX0FERCA9ICdTRUxFQ1RfV0FOVF9UT19BREQnO1xuZXhwb3J0IGNvbnN0IEFERF9DQVRFR09SWSA9ICdBRERfQ0FURUdPUlknO1xuZXhwb3J0IGNvbnN0IEFERF9BUkdVTUVOVCA9ICdBRERfQVJHVU1FTlQnO1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9DQVRFR09SWSA9ICdTRUxFQ1RfQ0FURUdPUlknO1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9DT01QTEVURV9EQVRFID0gJ1NFTEVDVF9DT01QTEVURV9EQVRFJztcbmV4cG9ydCBjb25zdCBET05FID0gJ0RPTkUnO1xuXG5leHBvcnQgY29uc3Qgc3RlcExpc3QgPSBbXG4gIHtcbiAgICBpZDogU0VMRUNUX1dBTlRfVE9fQURELFxuICAgIGRlc2NyaXB0aW9uOiAnV2hhdCB3YW50IHRvIGFkZCcsXG4gIH0sXG4gIHtcbiAgICBpZDogQUREX0NBVEVHT1JZLFxuICAgIGRlc2NyaXB0aW9uOiAnQWRkIGEgY2F0ZWdvcnknLFxuICB9LFxuICB7XG4gICAgaWQ6IFNFTEVDVF9DQVRFR09SWSxcbiAgICBkZXNjcmlwdGlvbjogJ1NlbGVjdCBhIGNhdGVnb3J5JyxcbiAgfSxcbiAge1xuICAgIGlkOiBBRERfQVJHVU1FTlQsXG4gICAgZGVzY3JpcHRpb246ICdBZGQgQXJndW1lbnQnLFxuICB9LFxuICB7XG4gICAgaWQ6IFNFTEVDVF9DT01QTEVURV9EQVRFLFxuICAgIGRlc2NyaXB0aW9uOiAnU2NoZWR1bGUnLFxuICB9LFxuICB7XG4gICAgaWQ6IERPTkUsXG4gICAgZGVzY3JpcHRpb246ICdUaGF0XFwncyBpdCcsXG4gIH0sXG5dO1xuIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBDYXRlZ29yaWVzRmlsdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvQ2F0ZWdvcmllc0ZpbHRlcic7XG5pbXBvcnQge1xuICBzZWxlY3RDYXRlZ29yeSxcbiAgc2VsZWN0Q2F0ZWdvcnlBbGwsXG4gIGRlbGV0ZUNhdGVnb3J5LFxufSBmcm9tICcuLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5pbXBvcnQgY2F0ZWdvcnlBbGwgZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmltcG9ydCB7IGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0IH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgY2F0ZWdvcnlMaXN0OiBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdChzdGF0ZSksXG4gIH1cbik7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcbiAge1xuICAgIG9uRGVsZXRlQ2F0ZWdvcnk6IChjYXRlZ29yeSkgPT4ge1xuICAgICAgZGlzcGF0Y2goZGVsZXRlQ2F0ZWdvcnkoY2F0ZWdvcnkuaWQpKTtcbiAgICB9LFxuICAgIG9uQ2lsY2tDYXRlZ29yeTogKGNhdGVnb3J5LCBlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnaScgJiYgZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnYnV0dG9uJykge1xuICAgICAgICBpZiAoY2F0ZWdvcnkuaWQgPT09IGNhdGVnb3J5QWxsLmlkKSB7XG4gICAgICAgICAgZGlzcGF0Y2goc2VsZWN0Q2F0ZWdvcnlBbGwoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGlzcGF0Y2goc2VsZWN0Q2F0ZWdvcnkoY2F0ZWdvcnkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gIH1cbik7XG5cbmNvbnN0IENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIgPSBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbikoQ2F0ZWdvcmllc0ZpbHRlcik7XG5cbmV4cG9ydCBkZWZhdWx0IENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXI7XG4iLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFRhc2tzIGZyb20gJy4uL2NvbXBvbmVudHMvVGFza3MnO1xuaW1wb3J0IHtcbiAgZmV0Y2hUYXNrc0J5Q2F0ZWdvcnksXG4gIGRlbGV0ZVRhc2ssXG4gIHRvb2dsZVRhc2tDb21wbGV0ZWQsXG59IGZyb20gJy4uL2FjdGlvbnMvdGFza3NBY3Rpb25zJztcblxuaW1wb3J0IHsgZ2V0VGFza0xpc3QsIGdldFNraXAsIHN0aWxsTW9yZVRvTG9hZCB9IGZyb20gJy4uL3NlbGVjdG9ycy90YXNrc1NlbGVjdG9ycyc7XG5pbXBvcnQgeyBnZXRTZWxlY3RlZENhdGVnb3JpZXNJZCwgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICB0YXNrTGlzdDogZ2V0VGFza0xpc3Qoc3RhdGUpLFxuICAgIHNraXA6IGdldFNraXAoc3RhdGUpLFxuICAgIG1vcmVUb0xvYWQ6IHN0aWxsTW9yZVRvTG9hZChzdGF0ZSksXG4gICAgY2F0ZWdvcmllc0lkOiBnZXRTZWxlY3RlZENhdGVnb3JpZXNJZChzdGF0ZSksXG4gICAgY29tcGxldGVkOiB2aXNpYmlsaXR5T25seUNvbXBsZXRlZChzdGF0ZSksXG4gIH1cbik7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcbiAge1xuICAgIG9uRGVsZXRlQXJndW1lbnQ6ICh0YXNrKSA9PiB7XG4gICAgICBkaXNwYXRjaChkZWxldGVUYXNrKHRhc2suaWQpKTtcbiAgICB9LFxuICAgIG9uQ29tcGxldGVBcmd1bWVudDogKHRhc2spID0+IHtcbiAgICAgIGRpc3BhdGNoKHRvb2dsZVRhc2tDb21wbGV0ZWQodGFzay5pZCwgdGFzay5jb21wbGV0ZWQpKTtcbiAgICB9LFxuICAgIGZldGNoVGFza3M6IChjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCwgbGltaXQsIHNraXApID0+IHtcbiAgICAgIGRpc3BhdGNoKGZldGNoVGFza3NCeUNhdGVnb3J5KGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgc2tpcCkpO1xuICAgIH0sXG4gIH1cbik7XG5cbmNvbnN0IFRhc2tzQ29udGFpbmVyID0gY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pKFRhc2tzKTtcblxuZXhwb3J0IGRlZmF1bHQgVGFza3NDb250YWluZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IFRvZG9zIGZyb20gJy4uL2NvbXBvbmVudHMvVG9kb3MnO1xuaW1wb3J0IHsgZmV0Y2hBbGxDYXRlZ29yaWVzIH0gZnJvbSAnLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuaW1wb3J0IHsgaGlkZU1lc3NhZ2UgfSBmcm9tICcuLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcbmltcG9ydCB7IHNob3dMb2FkaW5nIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbW1vblNlbGVjdG9ycyc7XG5cbmNvbnN0IFRvZG9zQ29udGFpbmVyID0gcHJvcHMgPT4gPFRvZG9zIHsuLi5wcm9wc30gLz47XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IChcbiAge1xuICAgIG1lc3NhZ2U6IHN0YXRlLm1lc3NhZ2UsXG4gICAgc2hvd0xvYWRpbmc6IHNob3dMb2FkaW5nKHN0YXRlKSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgaGlkZU1lc3NhZ2U6ICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKGhpZGVNZXNzYWdlKCkpO1xuICAgIH0sXG4gICAgaW5pdEZldGNoQWxsQ2F0ZWdvcmllczogKCkgPT4ge1xuICAgICAgZGlzcGF0Y2goZmV0Y2hBbGxDYXRlZ29yaWVzKCkpO1xuICAgIH0sXG4gIH1cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFRvZG9zQ29udGFpbmVyKTtcbiIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlzaWJpbGl0eUZpbHRlcnMgZnJvbSAnLi4vY29tcG9uZW50cy9WaXNpYmlsaXR5RmlsdGVycyc7XG5pbXBvcnQgeyBjaGFuZ2VWaXNpYmlsaXR5IH0gZnJvbSAnLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuXG5pbXBvcnQgeyBnZXRWaXNpYmlsaXR5RmlsdGVyIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyOiBnZXRWaXNpYmlsaXR5RmlsdGVyKHN0YXRlKSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgb25WaXNpYmlsaXR5U3dpdGNoQ2xpY2s6IHZpc2liaWxpdHkgPT4gKCkgPT4gKFxuICAgICAgZGlzcGF0Y2goY2hhbmdlVmlzaWJpbGl0eSh2aXNpYmlsaXR5KSlcbiAgICApLFxuICB9XG4pO1xuXG5jb25zdCBWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyID0gY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pKFZpc2liaWxpdHlGaWx0ZXJzKTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lcjtcbiIsImltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHsgaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIgfSBmcm9tICcuL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcbmltcG9ydCB7IGlzRmV0Y2hpbmdUYXNrcyB9IGZyb20gJy4vdGFza3NTZWxlY3RvcnMnO1xuXG5leHBvcnQgY29uc3Qgc2hvd0xvYWRpbmcgPSBjcmVhdGVTZWxlY3RvcihcbiAgaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIsXG4gIGlzRmV0Y2hpbmdUYXNrcyxcbiAgKGlzRmV0Y2hpbmdDYXRlZ29yaWVzLCBpc0ZldGNoaW5nVG9kb3MpID0+IGlzRmV0Y2hpbmdDYXRlZ29yaWVzIHx8IGlzRmV0Y2hpbmdUb2Rvcyxcbik7XG5cbmV4cG9ydCBkZWZhdWx0IHNob3dMb2FkaW5nO1xuIiwiZXhwb3J0IGNvbnN0IGlzRmV0Y2hpbmdUYXNrcyA9IHN0YXRlID0+IHN0YXRlLnRhc2tzLmlzRmV0Y2hpbmc7XG5leHBvcnQgY29uc3QgZ2V0VGFza3MgPSBzdGF0ZSA9PiBzdGF0ZS50YXNrcztcbmV4cG9ydCBjb25zdCBnZXRUYXNrTGlzdCA9IHN0YXRlID0+IHN0YXRlLnRhc2tzLml0ZW1zO1xuZXhwb3J0IGNvbnN0IGdldFNraXAgPSBzdGF0ZSA9PiBzdGF0ZS50YXNrcy5za2lwO1xuZXhwb3J0IGNvbnN0IHN0aWxsTW9yZVRvTG9hZCA9IHN0YXRlID0+IHN0YXRlLnRhc2tzLm1vcmVUb0xvYWQ7XG4iLCJpbXBvcnQgeyBjcmVhdGVTZWxlY3RvciB9IGZyb20gJ3Jlc2VsZWN0JztcbmltcG9ydCB7IE9OTFlfQ09NUExFVEVEIH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBpc0ZldGNoaW5nQ2F0ZWdvcmllc0ZpbHRlciA9IHN0YXRlID0+IHN0YXRlLnRvZG9GaWx0ZXJzLmlzRmV0Y2hpbmc7XG5leHBvcnQgY29uc3QgZ2V0VG9kb0ZpbHRlcnMgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycztcbmV4cG9ydCBjb25zdCBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdCA9IHN0YXRlID0+IHN0YXRlLnRvZG9GaWx0ZXJzLmNhdGVnb3JpZXM7XG5leHBvcnQgY29uc3QgZ2V0VmlzaWJpbGl0eUZpbHRlciA9IHN0YXRlID0+IHN0YXRlLnRvZG9GaWx0ZXJzLnZpc2liaWxpdHk7XG5cbmV4cG9ydCBjb25zdCB2aXNpYmlsaXR5T25seUNvbXBsZXRlZCA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRWaXNpYmlsaXR5RmlsdGVyLFxuICB2aXNpYmlsaXR5ID0+IHZpc2liaWxpdHkgPT09IE9OTFlfQ09NUExFVEVELFxuKTtcblxuZXhwb3J0IGNvbnN0IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0ZpbHRlciA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdCxcbiAgY2F0ZWdvcmllcyA9PiBjYXRlZ29yaWVzLmZpbHRlcihjYXRlZ29yeSA9PiBjYXRlZ29yeS5zZWxlY3RlZCksXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QsXG4gIGNhdGVnb3JpZXMgPT4gY2F0ZWdvcmllcy5maWx0ZXIoY2F0ZWdvcnkgPT4gY2F0ZWdvcnkuc2VsZWN0ZWQpXG4gICAgLm1hcChjYXRlZ29yeUZpbHRlciA9PiBjYXRlZ29yeUZpbHRlci5pZCksXG4pO1xuIiwiLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImNvbnNpc3RlbnRcIl0gKi9cblxuZXhwb3J0IGNvbnN0IE1ldGhvZHMgPSB7XG4gIFBPU1Q6ICdQT1NUJyxcbiAgR0VUOiAnR0VUJyxcbiAgREVMRVRFOiAnREVMRVRFJyxcbiAgUEFUQ0g6ICdQQVRDSCcsXG59O1xuXG5jb25zdCBmdWxsVXJsID0gdXJsID0+IGAvYXBpLyR7dXJsfWA7XG5cbmNvbnN0IGJhc2VSZXF1ZXN0SW5pdCA9IHtcbiAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgaGVhZGVyczoge1xuICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gIH0sXG59O1xuXG5jb25zdCBjcmVhdGVQb3N0UmVxdWVzdCA9ICh1cmwsIG9wdGlvbnMgPSB7fSkgPT4gKFxuICBmZXRjaCh1cmwsIHtcbiAgICAuLi5iYXNlUmVxdWVzdEluaXQsXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkob3B0aW9ucyksXG4gIH0pXG4pO1xuXG5jb25zdCBjcmVhdGVHZXRSZXF1ZXN0ID0gKHVybCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGxldCBmaW5hbFVybCA9IGAke3VybH0/YDtcbiAgT2JqZWN0LmVudHJpZXMob3B0aW9ucykuZm9yRWFjaCgoW2tleSwgdmFsdWVdLCBwb2l0aW9uKSA9PiB7XG4gICAgZmluYWxVcmwgPSBgJHtmaW5hbFVybH0keyhwb2l0aW9uID4gMCkgPyAnJicgOiAnJ30ke2tleX09JHt2YWx1ZX1gO1xuICB9KTtcbiAgcmV0dXJuIGZldGNoKGZpbmFsVXJsLCB7XG4gICAgLi4uYmFzZVJlcXVlc3RJbml0LFxuICAgIG1ldGhvZDogJ0dFVCcsXG4gIH0pO1xufTtcblxuY29uc3QgY3JlYXRlRGVsZXRlUmVxdWVzdCA9ICh1cmwsIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgZmluYWxVcmwgPSBgJHt1cmx9LyR7b3B0aW9uc31gO1xuICByZXR1cm4gZmV0Y2goZmluYWxVcmwsIHtcbiAgICAuLi5iYXNlUmVxdWVzdEluaXQsXG4gICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVQYXRjaFJlcXVlc3QgPSAodXJsLCBvcHRpb25zID0ge30pID0+IChcbiAgZmV0Y2godXJsLCB7XG4gICAgLi4uYmFzZVJlcXVlc3RJbml0LFxuICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvcHRpb25zKSxcbiAgfSlcbik7XG5cbmNvbnN0IGNyZWF0ZVJlcXVlc3QgPSAodXJsLCBvcHRpb25zLCBtZXRob2QpID0+IHtcbiAgY29uc3QgZmluYWxVcmwgPSBmdWxsVXJsKHVybCk7XG4gIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgY2FzZSBNZXRob2RzLlBPU1Q6IHJldHVybiBjcmVhdGVQb3N0UmVxdWVzdChmaW5hbFVybCwgb3B0aW9ucyk7XG4gICAgY2FzZSBNZXRob2RzLkdFVDogcmV0dXJuIGNyZWF0ZUdldFJlcXVlc3QoZmluYWxVcmwsIG9wdGlvbnMpO1xuICAgIGNhc2UgTWV0aG9kcy5ERUxFVEU6IHJldHVybiBjcmVhdGVEZWxldGVSZXF1ZXN0KGZpbmFsVXJsLCBvcHRpb25zKTtcbiAgICBjYXNlIE1ldGhvZHMuUEFUQ0g6IHJldHVybiBjcmVhdGVQYXRjaFJlcXVlc3QoZmluYWxVcmwsIG9wdGlvbnMpO1xuICAgIGRlZmF1bHQ6IHJldHVybiBjcmVhdGVQb3N0UmVxdWVzdChmaW5hbFVybCwgb3B0aW9ucyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjYWxsQXBpID0gKHVybCwgb3B0aW9ucyA9IHt9LCBtZXRob2QgPSBNZXRob2RzLlBPU1QpID0+IChcbiAgY3JlYXRlUmVxdWVzdCh1cmwsIG9wdGlvbnMsIG1ldGhvZCkudGhlbihcbiAgICByZXNwb25zZSA9PiAocmVzcG9uc2Uub2sgP1xuICAgICAgcmVzcG9uc2UuanNvbigpIDpcbiAgICAgIFByb21pc2UucmVqZWN0KHJlc3BvbnNlLnRleHQoKSlcbiAgICApLFxuICAgIGVycm9yID0+IFByb21pc2UucmVqZWN0KGVycm9yKSxcbiAgKVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY2FsbEFwaTtcblxuIiwiaW1wb3J0IGRhdGVGb3JtYXQgZnJvbSAnZGF0ZWZvcm1hdCc7XG5cbmV4cG9ydCBjb25zdCB0b0pzRGF0ZSA9IChwYXJzZURhdGUgPSAnJykgPT5cbiAgbmV3IERhdGUocGFyc2VJbnQocGFyc2VEYXRlLnN1YnN0cig2KSwgMTApKTtcblxuZXhwb3J0IGNvbnN0IHRvU2ltcGxlRGF0ZUZvcm1hdCA9IGRhdGUgPT5cbiAgZGF0ZUZvcm1hdChkYXRlLCAnZGRkZCBkZCBtbW0geXl5eScpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==