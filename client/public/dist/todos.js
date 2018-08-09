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

var _Common = __webpack_require__(/*! ../utils/Common */ "./src/utils/Common.js");

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

var updateArgumentLocal = function updateArgumentLocal(task) {
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
            completedAt: todo.completedAt ? (0, _Common.toJsDate)(todo.completedAt) : undefined,
            todoWithin: todo.todoWithin ? (0, _Common.toJsDate)(todo.todoWithin) : undefined
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
          completedAt: response.data.completedAt ? (0, _Common.toJsDate)(response.data.completedAt) : undefined,
          todoWithin: response.data.todoWithin ? (0, _Common.toJsDate)(response.data.todoWithin) : undefined
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
  var completed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function (dispatch) {
    var request = (0, _ApiUtils.callApi)('tasks', { id: id, completed: completed }, _ApiUtils.Methods.PATCH);
    return request.then(function (response) {
      if (response.success) {
        var todo = _extends({}, response.data, {
          completedAt: response.data.completedAt ? (0, _Common.toJsDate)(response.data.completedAt) : undefined
        });
        dispatch(updateArgumentLocal(todo));
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

var fetchArguments = function fetchArguments(state) {
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
    return dispatch(fetchArguments(getState()));
  };
};

var selectCategory = exports.selectCategory = function selectCategory(selectedCategory) {
  return function (dispatch, getState) {
    dispatch(toogleSelectCategory(selectedCategory));
    return dispatch(fetchArguments(getState()));
  };
};

var selectCategoryAll = exports.selectCategoryAll = function selectCategoryAll() {
  return function (dispatch, getState) {
    dispatch(toogleSelectCategoryAll());
    return dispatch(fetchArguments(getState()));
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
            src: 'img/ic-done.svg',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy9tZXNzYWdlQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy90YXNrc0FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMvdG9kb0ZpbHRlcnNBY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0J1dHRvbkNvbXBsZXRlQXJndW1lbnQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0J1dHRvbkRlbGV0ZUFyZ3VtZW50LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CdXR0b25EZWxldGVDYXRlZ29yeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQnV0dG9uU2NvbGwuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0NhdGVnb3JpZXNGaWx0ZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0NhdGVnb3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9JbmZpbml0ZVNjcm9sbC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTWFpbkFkZEJ1dHRvbi5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvU25hY2tiYXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Rhc2suanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Rhc2tzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ub2Rvcy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVmlzaWJpbGl0eUZpbHRlcnMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Zpc2liaWxpdHlTd2l0Y2guanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FuaW1zL0NvbGxhcHNlLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9EaWFsb2dBbmltLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9SZXBsYWNlQW5pbS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvUmVzaXplLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9TbmFja2JhckFuaW0uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9BZGRDYXRlZ29yeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0FkZFRvZG9Bcmd1bWVudC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0RpYWxvZ0FkZC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0RvbmUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9TZWxlY3RBY3Rpb25BZGQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9TZWxlY3RDYXRlZ29yeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL1NlbGVjdENvbXBsZXRlRGF0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL1N0ZXBzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2xhYmVscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL3N0ZXBzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL0NhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL1Rhc2tzQ29udGFpbmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9Ub2Rvc0NvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy9jb21tb25TZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy90YXNrc1NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9BcGlVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvQ29tbW9uLmpzIl0sIm5hbWVzIjpbInNob3dNZXNzYWdlSW5mbyIsInR5cGUiLCJTSE9XX01FU1NBR0VfSU5GTyIsIm1lc3NhZ2UiLCJzaG93TWVzc2FnZUVycm9yIiwiU0hPV19NRVNTQUdFX0VSUk9SIiwiaGlkZU1lc3NhZ2UiLCJISURFX01FU1NBR0UiLCJyZXF1ZXN0RmV0Y2hUYXNrcyIsImxpbWl0Iiwic2tpcCIsIlJFUVVFU1RfRkVUQ0hfVEFTS1MiLCJyZWNlaXZlRmV0Y2hUYXNrcyIsIlJFQ0VJVkVfRkVUQ0hfVEFTS1MiLCJ0YXNrcyIsImVycm9yRmV0Y2hUYXNrcyIsIkVSUk9SX0ZFVENIX1RBU0tTIiwiZXJyb3IiLCJhZGRUYXNrTG9jYWwiLCJBRERfVEFTS19MT0NBTCIsInRhc2siLCJyZW1vdmVUYXNrTG9jYWwiLCJSRU1PVkVfVEFTS19MT0NBTCIsInRhc2tJbmRleCIsInVwZGF0ZUFyZ3VtZW50TG9jYWwiLCJVUERBVEVfVEFTS19MT0NBTCIsImZldGNoVGFza3NCeUNhdGVnb3J5IiwiY2F0ZWdvcmllc0lkIiwiY29tcGxldGVkIiwicXVlcnlJdGVtc0xpbWl0IiwiZGlzcGF0Y2giLCJyZXF1ZXN0IiwiTWV0aG9kcyIsIkdFVCIsInRoZW4iLCJyZXNwb25zZSIsInN1Y2Nlc3MiLCJ0b2RvcyIsImRhdGEiLCJtYXAiLCJ0b2RvIiwiY29tcGxldGVkQXQiLCJ1bmRlZmluZWQiLCJ0b2RvV2l0aGluIiwibWVzc2FnZUVycm9yIiwiZGVsZXRlVGFzayIsImlkIiwiZ2V0U3RhdGUiLCJERUxFVEUiLCJpdGVtcyIsInRvZG9Bcmd1bWVudHMiLCJ0b2RvQXJndW1lbnRJbmRleCIsImZpbmRJbmRleCIsInRvZG9Bcmd1bWVudCIsImFkZFRhc2siLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwiY2F0ZWdvcnkiLCJjYWxsYmFjayIsImNhdGVnb3J5SWQiLCJQT1NUIiwidG9vZ2xlVGFza0NvbXBsZXRlZCIsIlBBVENIIiwiZmV0Y2hBcmd1bWVudHMiLCJzdGF0ZSIsInJlcXVlc3RGZXRjaEFsbENhdGVnb3JpZXMiLCJSRVFVRVNUX0ZFVENIX0FMTF9DQVRFR09SSUVTIiwicmVjZWl2ZUZldGNoQWxsQ2F0ZWdvcmllcyIsIlJFQ0VJVkVfRkVUQ0hfQUxMX0NBVEVHT1JJRVMiLCJjYXRlZ29yaWVzIiwiZXJyb3JGZXRjaEFsbENhdGVnb3JpZXMiLCJFUlJPUl9GRVRDSF9BTExfQ0FURUdPUklFUyIsImFkZENhdGVnb3J5TG9jYWwiLCJBRERfQ0FURUdPUllfTE9DQUwiLCJyZW1vdmVDYXRlZ29yeUxvY2FsIiwiUkVNT1ZFX0NBVEVHT1JZX0xPQ0FMIiwiY2F0ZWdvcnlJbmRleCIsInRvb2dsZVNlbGVjdENhdGVnb3J5IiwiVE9PR0xFX1NFTEVDVF9DQVRFR09SWSIsInNlbGVjdGVkQ2F0ZWdvcnkiLCJ0b29nbGVTZWxlY3RDYXRlZ29yeUFsbCIsIlRPT0dMRV9TRUxFQ1RfQ0FURUdPUllfQUxMIiwic3dpdGNoVmlzaWJpbGl0eUZpbHRlciIsIlNXSVRDSF9WSVNJQklMSVRZX0ZJTFRFUiIsInZpc2liaWxpdHkiLCJmZXRjaEFsbENhdGVnb3JpZXMiLCJkZWxldGVDYXRlZ29yeSIsInRvZG9GaWx0ZXJzIiwiYWRkQ2F0ZWdvcnkiLCJuYW1lIiwiY2hhbmdlVmlzaWJpbGl0eSIsInNlbGVjdENhdGVnb3J5Iiwic2VsZWN0Q2F0ZWdvcnlBbGwiLCJCdXR0b25Db21wbGV0ZUFyZ3VtZW50Iiwib25DbGljayIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiYm9vbCIsImRlZmF1bHRQcm9wcyIsIkJ1dHRvbkRlbGV0ZUFyZ3VtZW50IiwiQnV0dG9uRGVsZXRlQ2F0ZWdvcnkiLCJCdXR0b25TY3JvbGwiLCJkaXJlY3Rpb24iLCJvbmVPZiIsIkNhdGVnb3JpZXNGaWx0ZXIiLCJwcm9wcyIsImNoaXBzIiwiaGFuZGxlTGVmdFNjcm9sbENsaWNrIiwiYmluZCIsImhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2siLCJtb3ZlQ2hpcHNTY3JvbGwiLCJjbGllbnRXaWR0aCIsImRlbHRhIiwibmV4dFNjcm9sbExlZnQiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsIiwibGVmdCIsImNhdGVnb3J5TGlzdCIsIm9uRGVsZXRlQ2F0ZWdvcnkiLCJvbkNpbGNrQ2F0ZWdvcnkiLCJub2RlIiwiZGlzcGxheSIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0Iiwic2VsZWN0ZWQiLCJSZWFjdCIsIkNvbXBvbmVudCIsImFycmF5T2YiLCJzaGFwZSIsInN0cmluZyIsIkNhdGVnb3J5Iiwib25EZWxldGUiLCJjc3NDbGFzcyIsIm9uQ2hpcENsaWNrIiwiZSIsIm9uRGVsZXRlQ2xpY2siLCJ3YWl0VGltZSIsIkluZmluaXRlU2Nyb2xsIiwib25TY3JvbGwiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImlubmVySGVpZ2h0Iiwic2Nyb2xsWSIsImRvY3VtZW50IiwiYm9keSIsIm9mZnNldEhlaWdodCIsImFyZ3MiLCJjaGlsZHJlbiIsImNsYXNzTmFtZSIsImFueSIsIk1haW5BZGRCdXR0b24iLCJBY3Rpb24iLCJ0ZXh0IiwiU25hY2tiYXIiLCJvbkNsb3NlIiwiZHVyYXRpb24iLCJzaG93Iiwic2V0VGltZW91dCIsImlzRXJyb3IiLCJhY3Rpb25UZXh0IiwiYWN0aW9uQ2xpY2siLCJ2ZXJ0aWNhbFBvc3Rpb24iLCJob3Jpem9udGFsUG9zaXRpb24iLCJudW1iZXIiLCJUYXNrIiwiY29sbGFwc2VkIiwicmVuZGVyRGF0ZSIsInNldFN0YXRlIiwib25Db21wbGV0ZSIsIm9uVGl0bGVDbGljayIsImluaXRpYWxTdGF0ZSIsIlRhc2tzIiwib25GZXRjaFRvZG9Bcmd1bWVudHNOZXh0IiwiZmV0Y2hUYXNrcyIsIm1vcmVUb0xvYWQiLCJuZXdTa2lwIiwidGFza0xpc3QiLCJvbkRlbGV0ZUFyZ3VtZW50Iiwib25Db21wbGV0ZUFyZ3VtZW50IiwiYXJnIiwibmV4dFByb3BzIiwicHJldlN0YXRlIiwiVG9kb3MiLCJpc0RpYWxvZ0FkZE9wZW4iLCJpbml0RmV0Y2hBbGxDYXRlZ29yaWVzIiwic2hvd0xvYWRpbmciLCJWaXNpYmlsaXR5RmlsdGVyIiwic2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyIiwib25WaXNpYmlsaXR5U3dpdGNoQ2xpY2siLCJPTkxZX1RPX0NPTVBMRVRFIiwiQUxMX1RPRE9TIiwiT05MWV9DT01QTEVURUQiLCJWaXNpYmlsaXR5U3dpdGNoIiwiZGVmYXVsdFN0eWxlIiwidHJhbnNpdGlvbiIsImhlaWdodCIsIm9uRW50ZXIiLCJzdHlsZSIsImZpcnN0RWxlbWVudENoaWxkIiwib25FeGl0IiwiQ29sbGFwc2UiLCJpblByb3AiLCJpbiIsIm9wYWNpdHkiLCJ0cmFuc2l0aW9uU3R5bGVzIiwiZW50ZXJpbmciLCJlbnRlcmVkIiwiRGlhbG9nQW5pbSIsIndpZHRoIiwiZW50ZXIiLCJSZXBsYWNlQW5pbSIsImVuZExpc3RlbmVyIiwiZXhpdCIsIm9uRW50ZXJlZCIsIm9uRXhpdGVkIiwiUmVzaXplIiwiYm90dG9tIiwiU25hY2tiYXJBbmltIiwiY3VzdG9tQ2xhc3MiLCJBZGRDYXRlZ29yeSIsIm9uSW5wdXRUZXh0Q2hhbmdlIiwib25CdXR0b25BZGRDbGljayIsIm9uQ2F0ZWdvcnlDcmVhdGVkIiwidGFyZ2V0IiwidmFsdWUiLCJsYWJlbHMiLCJtc2dOYW1lUmVxdWlyZWQiLCJvbk5leHQiLCJzdGVwSWQiLCJBRERfQVJHVU1FTlQiLCJvcHRpb25zIiwiQWRkVG9kb0FyZ3VtZW50Iiwib25CdXR0b25TY2hlZHVsZUNsaWNrIiwibXNnVGl0bGVSZXF1aXJlZCIsIlNFTEVDVF9DT01QTEVURV9EQVRFIiwiZ2V0Q29udGVudFRvUmVuZGVyIiwic3RlcHMiLCJsZW5ndGgiLCJsYXN0U3RlcCIsIlNFTEVDVF9XQU5UX1RPX0FERCIsIkFERF9DQVRFR09SWSIsIlNFTEVDVF9DQVRFR09SWSIsIkRPTkUiLCJpbml0YWxTdGF0ZSIsIm5leHRTdGVwcyIsInNob3dTdGVwIiwiRGlhbG9nQWRkIiwib25CYWNrIiwib25SZXNldEFuZENsb3NlIiwib25BbmltYXRpb25FbmQiLCJzdGVwQ291bnQiLCJzbGljZSIsInN0ZXAiLCJjb21wbGV0ZSIsImRvbmUiLCJvcGVuIiwic3RlcExpc3QiLCJEb25lIiwiU2VsZWN0QWN0aW9uQWRkIiwiU2VsZWN0Q2F0ZWdvcnkiLCJvbkNhdGVnb3J5Q2xpY2siLCJvbkJ1dHRvbk5leHRDbGljayIsIm1zZ1NlbGVjdENhdGVnb3J5IiwiY2F0ZWdvcmllc0xpc3QiLCJtYXBTdGF0ZVRvUHJvcCIsIlNlbGVjdENvbXBsZXRlRGF0ZSIsIkRhdGUiLCJvbklucHV0RGF0ZUNoYW5nZSIsIm9uVG9kb0FyZ3VtZW50Q3JlYXRlZCIsImRhdGUiLCJtc2dTZWxlY3REYXRlIiwiU3RlcCIsIm5lZWRMaW5lIiwiU3RlcHMiLCJsaXN0Iiwic3RlcEhpc3RvcnkiLCJpdGVtIiwiaSIsImZpbHRlciIsInNoIiwibWFwU3RhdGVUb1Byb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwiY2F0ZWdvcnlBbGwiLCJDYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyIiwiVGFza3NDb250YWluZXIiLCJUb2Rvc0NvbnRhaW5lciIsIlZpc2liaWxpdHlGaWx0ZXJDb250YWluZXIiLCJWaXNpYmlsaXR5RmlsdGVycyIsImlzRmV0Y2hpbmdDYXRlZ29yaWVzRmlsdGVyIiwiaXNGZXRjaGluZ1Rhc2tzIiwiaXNGZXRjaGluZ0NhdGVnb3JpZXMiLCJpc0ZldGNoaW5nVG9kb3MiLCJpc0ZldGNoaW5nIiwiZ2V0VGFza3MiLCJnZXRUYXNrTGlzdCIsImdldFNraXAiLCJzdGlsbE1vcmVUb0xvYWQiLCJnZXRUb2RvRmlsdGVycyIsImdldENhdGVnb3JpZXNGaWx0ZXJMaXN0IiwiZ2V0VmlzaWJpbGl0eUZpbHRlciIsInZpc2liaWxpdHlPbmx5Q29tcGxldGVkIiwiZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzRmlsdGVyIiwiZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQiLCJjYXRlZ29yeUZpbHRlciIsImZ1bGxVcmwiLCJ1cmwiLCJiYXNlUmVxdWVzdEluaXQiLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJjcmVhdGVQb3N0UmVxdWVzdCIsImZldGNoIiwibWV0aG9kIiwiSlNPTiIsInN0cmluZ2lmeSIsImNyZWF0ZUdldFJlcXVlc3QiLCJmaW5hbFVybCIsIk9iamVjdCIsImVudHJpZXMiLCJmb3JFYWNoIiwicG9pdGlvbiIsImtleSIsImNyZWF0ZURlbGV0ZVJlcXVlc3QiLCJjcmVhdGVQYXRjaFJlcXVlc3QiLCJjcmVhdGVSZXF1ZXN0IiwiY2FsbEFwaSIsIm9rIiwianNvbiIsIlByb21pc2UiLCJyZWplY3QiLCJ0b0pzRGF0ZSIsInBhcnNlRGF0ZSIsInBhcnNlSW50Iiwic3Vic3RyIiwidG9TaW1wbGVEYXRlRm9ybWF0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQU1PLElBQU1BLDRDQUFrQixTQUFsQkEsZUFBa0I7QUFBQSxTQUM3QjtBQUNFQyxVQUFNQyw4QkFEUjtBQUVFQztBQUZGLEdBRDZCO0FBQUEsQ0FBeEI7O0FBT0EsSUFBTUMsOENBQW1CLFNBQW5CQSxnQkFBbUI7QUFBQSxTQUM5QjtBQUNFSCxVQUFNSSwrQkFEUjtBQUVFRjtBQUZGLEdBRDhCO0FBQUEsQ0FBekI7O0FBT0EsSUFBTUcsb0NBQWMsU0FBZEEsV0FBYztBQUFBLFNBQ3pCO0FBQ0VMLFVBQU1NO0FBRFIsR0FEeUI7QUFBQSxDQUFwQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQlA7O0FBQ0E7O0FBUUE7O0FBQ0E7O0FBQ0E7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LE9BQTVCLENBQVA7QUFMWDtBQU9ELENBVEQ7O0FBV08sSUFBTWdHLDRCQUFVLFNBQVZBLE9BQVUsQ0FBQ25CLEdBQUQ7QUFBQSxNQUFNN0UsT0FBTix1RUFBZ0IsRUFBaEI7QUFBQSxNQUFvQm1GLE1BQXBCLHVFQUE2QjVSLFFBQVE0QixJQUFyQztBQUFBLFNBQ3JCNFEsY0FBY2xCLEdBQWQsRUFBbUI3RSxPQUFuQixFQUE0Qm1GLE1BQTVCLEVBQW9DMVIsSUFBcEMsQ0FDRTtBQUFBLFdBQWFDLFNBQVN1UyxFQUFULEdBQ1h2UyxTQUFTd1MsSUFBVCxFQURXLEdBRVhDLFFBQVFDLE1BQVIsQ0FBZTFTLFNBQVN3SCxJQUFULEVBQWYsQ0FGRjtBQUFBLEdBREYsRUFLRTtBQUFBLFdBQVNpTCxRQUFRQyxNQUFSLENBQWU1VCxLQUFmLENBQVQ7QUFBQSxHQUxGLENBRHFCO0FBQUEsQ0FBaEI7O2tCQVVRd1QsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFFZjs7Ozs7O0FBRU8sSUFBTUssOEJBQVcsU0FBWEEsUUFBVztBQUFBLE1BQUNDLFNBQUQsdUVBQWEsRUFBYjtBQUFBLFNBQ3RCLElBQUlsRSxJQUFKLENBQVNtRSxTQUFTRCxVQUFVRSxNQUFWLENBQWlCLENBQWpCLENBQVQsRUFBOEIsRUFBOUIsQ0FBVCxDQURzQjtBQUFBLENBQWpCOztBQUdBLElBQU1DLGtEQUFxQixTQUFyQkEsa0JBQXFCO0FBQUEsU0FDaEMsMEJBQVdsRSxJQUFYLEVBQWlCLGtCQUFqQixDQURnQztBQUFBLENBQTNCLEMiLCJmaWxlIjoidG9kb3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBTSE9XX01FU1NBR0VfSU5GTyxcbiAgU0hPV19NRVNTQUdFX0VSUk9SLFxuICBISURFX01FU1NBR0UsXG59IGZyb20gJy4uL2NvbnN0YW50cy9hY3Rpb25UeXBlcyc7XG5cbmV4cG9ydCBjb25zdCBzaG93TWVzc2FnZUluZm8gPSBtZXNzYWdlID0+IChcbiAge1xuICAgIHR5cGU6IFNIT1dfTUVTU0FHRV9JTkZPLFxuICAgIG1lc3NhZ2UsXG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBzaG93TWVzc2FnZUVycm9yID0gbWVzc2FnZSA9PiAoXG4gIHtcbiAgICB0eXBlOiBTSE9XX01FU1NBR0VfRVJST1IsXG4gICAgbWVzc2FnZSxcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGhpZGVNZXNzYWdlID0gKCkgPT4gKFxuICB7XG4gICAgdHlwZTogSElERV9NRVNTQUdFLFxuICB9XG4pO1xuIiwiaW1wb3J0IHsgY2FsbEFwaSwgTWV0aG9kcyB9IGZyb20gJy4uL3V0aWxzL0FwaVV0aWxzJztcbmltcG9ydCB7XG4gIFJFUVVFU1RfRkVUQ0hfVEFTS1MsXG4gIFJFQ0VJVkVfRkVUQ0hfVEFTS1MsXG4gIEVSUk9SX0ZFVENIX1RBU0tTLFxuICBBRERfVEFTS19MT0NBTCxcbiAgUkVNT1ZFX1RBU0tfTE9DQUwsXG4gIFVQREFURV9UQVNLX0xPQ0FMLFxufSBmcm9tICcuLi9jb25zdGFudHMvYWN0aW9uVHlwZXMnO1xuaW1wb3J0IHsgcXVlcnlJdGVtc0xpbWl0IH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUVycm9yIH0gZnJvbSAnLi9tZXNzYWdlQWN0aW9ucyc7XG5pbXBvcnQgeyB0b0pzRGF0ZSB9IGZyb20gJy4uL3V0aWxzL0NvbW1vbic7XG5cbmNvbnN0IHJlcXVlc3RGZXRjaFRhc2tzID0gKGxpbWl0LCBza2lwKSA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRVFVRVNUX0ZFVENIX1RBU0tTLFxuICAgIGxpbWl0LFxuICAgIHNraXAsXG4gIH1cbik7XG5cbmNvbnN0IHJlY2VpdmVGZXRjaFRhc2tzID0gdGFza3MgPT4gKFxuICB7XG4gICAgdHlwZTogUkVDRUlWRV9GRVRDSF9UQVNLUyxcbiAgICB0YXNrcyxcbiAgfVxuKTtcblxuY29uc3QgZXJyb3JGZXRjaFRhc2tzID0gZXJyb3IgPT4gKFxuICB7XG4gICAgdHlwZTogRVJST1JfRkVUQ0hfVEFTS1MsXG4gICAgZXJyb3IsXG4gIH1cbik7XG5cbmNvbnN0IGFkZFRhc2tMb2NhbCA9IHRhc2sgPT4gKFxuICB7XG4gICAgdHlwZTogQUREX1RBU0tfTE9DQUwsXG4gICAgdGFzayxcbiAgfVxuKTtcblxuY29uc3QgcmVtb3ZlVGFza0xvY2FsID0gdGFza0luZGV4ID0+IChcbiAge1xuICAgIHR5cGU6IFJFTU9WRV9UQVNLX0xPQ0FMLFxuICAgIHRhc2tJbmRleCxcbiAgfVxuKTtcblxuY29uc3QgdXBkYXRlQXJndW1lbnRMb2NhbCA9IHRhc2sgPT4gKFxuICB7XG4gICAgdHlwZTogVVBEQVRFX1RBU0tfTE9DQUwsXG4gICAgdGFzayxcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGZldGNoVGFza3NCeUNhdGVnb3J5ID0gKFxuICBjYXRlZ29yaWVzSWQgPSBbXSxcbiAgY29tcGxldGVkID0gZmFsc2UsXG4gIGxpbWl0ID0gcXVlcnlJdGVtc0xpbWl0LFxuICBza2lwID0gMCxcbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHJlcXVlc3RGZXRjaFRhc2tzKGxpbWl0LCBza2lwKSk7XG4gIGNvbnN0IHJlcXVlc3QgPSBjYWxsQXBpKCd0YXNrcycsIHtcbiAgICBjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCwgbGltaXQsIHNraXAsXG4gIH0sIE1ldGhvZHMuR0VUKTtcbiAgcmV0dXJuIHJlcXVlc3QudGhlbihcbiAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIGNvbnN0IHRvZG9zID0gcmVzcG9uc2UuZGF0YS5tYXAodG9kbyA9PlxuICAgICAgICAgICh7XG4gICAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgICAgY29tcGxldGVkQXQ6ICh0b2RvLmNvbXBsZXRlZEF0KSA/IHRvSnNEYXRlKHRvZG8uY29tcGxldGVkQXQpIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdG9kb1dpdGhpbjogKHRvZG8udG9kb1dpdGhpbikgPyB0b0pzRGF0ZSh0b2RvLnRvZG9XaXRoaW4pIDogdW5kZWZpbmVkLFxuICAgICAgICAgIH0pKTtcbiAgICAgICAgZGlzcGF0Y2gocmVjZWl2ZUZldGNoVGFza3ModG9kb3MpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoKGVycm9yRmV0Y2hUYXNrcyhyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yID0+ICh7IGVycm9yIH0pLFxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZVRhc2sgPSAoaWQgPSAnJykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBjb25zdCByZXF1ZXN0ID0gY2FsbEFwaSgndGFza3MnLCBpZCwgTWV0aG9kcy5ERUxFVEUpO1xuICByZXR1cm4gcmVxdWVzdC50aGVuKFxuICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgY29uc3QgeyBpdGVtcyB9ID0gZ2V0U3RhdGUoKS50b2RvQXJndW1lbnRzO1xuICAgICAgICBjb25zdCB0b2RvQXJndW1lbnRJbmRleCA9IGl0ZW1zLmZpbmRJbmRleCh0b2RvQXJndW1lbnQgPT5cbiAgICAgICAgICB0b2RvQXJndW1lbnQuaWQgPT09IGlkKTtcbiAgICAgICAgZGlzcGF0Y2gocmVtb3ZlVGFza0xvY2FsKHRvZG9Bcmd1bWVudEluZGV4KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLm1lc3NhZ2VFcnJvcikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3IgPT4gKHsgZXJyb3IgfSksXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkVGFzayA9ICh0aXRsZSA9ICcnLCBkZXNjcmlwdGlvbiA9ICcnLCBjYXRlZ29yeSA9IHsgaWQ6ICcnIH0sIHRvZG9XaXRoaW4sIGNhbGxiYWNrID0gdW5kZWZpbmVkKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgY29uc3QgcmVxdWVzdCA9IGNhbGxBcGkoXG4gICAgJ3Rhc2tzJyxcbiAgICB7XG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnkuaWQsXG4gICAgICB0b2RvV2l0aGluLFxuICAgIH0sXG4gICAgTWV0aG9kcy5QT1NULFxuICApO1xuICByZXR1cm4gcmVxdWVzdC50aGVuKFxuICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgY29uc3QgdG9kbyA9IHtcbiAgICAgICAgICAuLi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIGNvbXBsZXRlZEF0OiAocmVzcG9uc2UuZGF0YS5jb21wbGV0ZWRBdClcbiAgICAgICAgICAgID8gdG9Kc0RhdGUocmVzcG9uc2UuZGF0YS5jb21wbGV0ZWRBdCkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgdG9kb1dpdGhpbjogKHJlc3BvbnNlLmRhdGEudG9kb1dpdGhpbilcbiAgICAgICAgICAgID8gdG9Kc0RhdGUocmVzcG9uc2UuZGF0YS50b2RvV2l0aGluKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgfTtcbiAgICAgICAgZGlzcGF0Y2goYWRkVGFza0xvY2FsKHRvZG8pKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLm1lc3NhZ2VFcnJvcikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3IgPT4gKHsgZXJyb3IgfSksXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgdG9vZ2xlVGFza0NvbXBsZXRlZCA9IChpZCA9ICcnLCBjb21wbGV0ZWQgPSBmYWxzZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGNvbnN0IHJlcXVlc3QgPSBjYWxsQXBpKCd0YXNrcycsIHsgaWQsIGNvbXBsZXRlZCB9LCBNZXRob2RzLlBBVENIKTtcbiAgcmV0dXJuIHJlcXVlc3QudGhlbihcbiAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIGNvbnN0IHRvZG8gPSB7XG4gICAgICAgICAgLi4ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICBjb21wbGV0ZWRBdDogKHJlc3BvbnNlLmRhdGEuY29tcGxldGVkQXQpXG4gICAgICAgICAgICA/IHRvSnNEYXRlKHJlc3BvbnNlLmRhdGEuY29tcGxldGVkQXQpIDogdW5kZWZpbmVkLFxuICAgICAgICB9O1xuICAgICAgICBkaXNwYXRjaCh1cGRhdGVBcmd1bWVudExvY2FsKHRvZG8pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBlcnJvciA9PiAoeyBlcnJvciB9KSxcbiAgKTtcbn07XG4iLCJpbXBvcnQgeyBjYWxsQXBpLCBNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvQXBpVXRpbHMnO1xuaW1wb3J0IHtcbiAgUkVRVUVTVF9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgUkVDRUlWRV9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgRVJST1JfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gIEFERF9DQVRFR09SWV9MT0NBTCxcbiAgUkVNT1ZFX0NBVEVHT1JZX0xPQ0FMLFxuICBUT09HTEVfU0VMRUNUX0NBVEVHT1JZLFxuICBUT09HTEVfU0VMRUNUX0NBVEVHT1JZX0FMTCxcbiAgU1dJVENIX1ZJU0lCSUxJVFlfRklMVEVSLFxufSBmcm9tICcuLi9jb25zdGFudHMvYWN0aW9uVHlwZXMnO1xuaW1wb3J0IHsgcXVlcnlJdGVtc0xpbWl0IH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5pbXBvcnQgeyBmZXRjaFRhc2tzQnlDYXRlZ29yeSB9IGZyb20gJy4vdGFza3NBY3Rpb25zJztcbmltcG9ydCB7IHNob3dNZXNzYWdlRXJyb3IgfSBmcm9tICcuL21lc3NhZ2VBY3Rpb25zJztcbmltcG9ydCB7IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkLCB2aXNpYmlsaXR5T25seUNvbXBsZXRlZCB9IGZyb20gJy4uL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycyc7XG5cbmNvbnN0IGZldGNoQXJndW1lbnRzID0gc3RhdGUgPT4gZmV0Y2hUYXNrc0J5Q2F0ZWdvcnkoXG4gIGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkKHN0YXRlKSxcbiAgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQoc3RhdGUpLFxuKTtcblxuY29uc3QgcmVxdWVzdEZldGNoQWxsQ2F0ZWdvcmllcyA9ICgpID0+IChcbiAge1xuICAgIHR5cGU6IFJFUVVFU1RfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gIH1cbik7XG5cbmNvbnN0IHJlY2VpdmVGZXRjaEFsbENhdGVnb3JpZXMgPSBjYXRlZ29yaWVzID0+IChcbiAge1xuICAgIHR5cGU6IFJFQ0VJVkVfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gICAgY2F0ZWdvcmllcyxcbiAgfVxuKTtcblxuY29uc3QgZXJyb3JGZXRjaEFsbENhdGVnb3JpZXMgPSBlcnJvciA9PiAoXG4gIHtcbiAgICB0eXBlOiBFUlJPUl9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgICBlcnJvcixcbiAgfVxuKTtcblxuY29uc3QgYWRkQ2F0ZWdvcnlMb2NhbCA9IGNhdGVnb3J5ID0+IChcbiAge1xuICAgIHR5cGU6IEFERF9DQVRFR09SWV9MT0NBTCxcbiAgICBjYXRlZ29yeSxcbiAgfVxuKTtcblxuY29uc3QgcmVtb3ZlQ2F0ZWdvcnlMb2NhbCA9IGNhdGVnb3J5SW5kZXggPT4gKFxuICB7XG4gICAgdHlwZTogUkVNT1ZFX0NBVEVHT1JZX0xPQ0FMLFxuICAgIGNhdGVnb3J5SW5kZXgsXG4gIH1cbik7XG5cbmNvbnN0IHRvb2dsZVNlbGVjdENhdGVnb3J5ID0gc2VsZWN0ZWRDYXRlZ29yeSA9PiAoXG4gIHtcbiAgICB0eXBlOiBUT09HTEVfU0VMRUNUX0NBVEVHT1JZLFxuICAgIHNlbGVjdGVkQ2F0ZWdvcnksXG4gIH1cbik7XG5cbmNvbnN0IHRvb2dsZVNlbGVjdENhdGVnb3J5QWxsID0gKCkgPT4gKFxuICB7XG4gICAgdHlwZTogVE9PR0xFX1NFTEVDVF9DQVRFR09SWV9BTEwsXG4gIH1cbik7XG5cbmNvbnN0IHN3aXRjaFZpc2liaWxpdHlGaWx0ZXIgPSB2aXNpYmlsaXR5ID0+IChcbiAge1xuICAgIHR5cGU6IFNXSVRDSF9WSVNJQklMSVRZX0ZJTFRFUixcbiAgICB2aXNpYmlsaXR5LFxuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgZmV0Y2hBbGxDYXRlZ29yaWVzID0gKGxpbWl0ID0gcXVlcnlJdGVtc0xpbWl0LCBza2lwID0gMCkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBkaXNwYXRjaChyZXF1ZXN0RmV0Y2hBbGxDYXRlZ29yaWVzKCkpO1xuICBjb25zdCByZXF1ZXN0ID0gY2FsbEFwaSgnY2F0ZWdvcmllcycsIHsgbGltaXQsIHNraXAgfSwgTWV0aG9kcy5HRVQpO1xuICByZXR1cm4gcmVxdWVzdC50aGVuKFxuICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgZGlzcGF0Y2gocmVjZWl2ZUZldGNoQWxsQ2F0ZWdvcmllcyhyZXNwb25zZS5kYXRhKSk7XG4gICAgICAgIGRpc3BhdGNoKGZldGNoVGFza3NCeUNhdGVnb3J5KGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkKGdldFN0YXRlKCkpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwYXRjaChlcnJvckZldGNoQWxsQ2F0ZWdvcmllcyhyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yID0+IChcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpXG4gICAgKSxcbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZWxldGVDYXRlZ29yeSA9IChjYXRlZ29yeUlkID0gJycpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgY29uc3QgcmVxdWVzdCA9IGNhbGxBcGkoJ2NhdGVnb3JpZXMnLCBjYXRlZ29yeUlkLCBNZXRob2RzLkRFTEVURSk7XG4gIHJldHVybiByZXF1ZXN0LnRoZW4oXG4gICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICBjb25zdCB7IGNhdGVnb3JpZXMgfSA9IGdldFN0YXRlKCkudG9kb0ZpbHRlcnM7XG4gICAgICAgIGNvbnN0IGNhdGVnb3J5SW5kZXggPSBjYXRlZ29yaWVzLmZpbmRJbmRleChjYXRlZ29yeSA9PiBjYXRlZ29yeS5pZCA9PT0gY2F0ZWdvcnlJZCk7XG4gICAgICAgIGRpc3BhdGNoKHJlbW92ZUNhdGVnb3J5TG9jYWwoY2F0ZWdvcnlJbmRleCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yID0+IChcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpXG4gICAgKSxcbiAgKTtcbn07XG5cbi8qKlxuICogUmVxdWVzdCB0byBhZGQgYSBjYXRlZ29yeVxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgY2F0ZWdvcnkgbmFtZSB0byBhZGRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgbmVlZCB0byBoYW5kbGUgdGhlIGNhdGVnb3J5IGNyZWF0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGFkZENhdGVnb3J5ID0gKG5hbWUgPSAnJywgY2FsbGJhY2sgPSB1bmRlZmluZWQpID0+IChkaXNwYXRjaCkgPT4ge1xuICBjb25zdCByZXF1ZXN0ID0gY2FsbEFwaSgnY2F0ZWdvcmllcycsIHsgbmFtZSB9LCBNZXRob2RzLlBPU1QpO1xuICByZXR1cm4gcmVxdWVzdC50aGVuKFxuICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgZGlzcGF0Y2goYWRkQ2F0ZWdvcnlMb2NhbChyZXNwb25zZS5kYXRhKSk7XG4gICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY2FsbGJhY2socmVzcG9uc2UuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBlcnJvciA9PiAoXG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKVxuICAgICksXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgY2hhbmdlVmlzaWJpbGl0eSA9IHZpc2liaWxpdHkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBkaXNwYXRjaChzd2l0Y2hWaXNpYmlsaXR5RmlsdGVyKHZpc2liaWxpdHkpKTtcbiAgcmV0dXJuIGRpc3BhdGNoKGZldGNoQXJndW1lbnRzKGdldFN0YXRlKCkpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RDYXRlZ29yeSA9IHNlbGVjdGVkQ2F0ZWdvcnkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBkaXNwYXRjaCh0b29nbGVTZWxlY3RDYXRlZ29yeShzZWxlY3RlZENhdGVnb3J5KSk7XG4gIHJldHVybiBkaXNwYXRjaChmZXRjaEFyZ3VtZW50cyhnZXRTdGF0ZSgpKSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0Q2F0ZWdvcnlBbGwgPSAoKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGRpc3BhdGNoKHRvb2dsZVNlbGVjdENhdGVnb3J5QWxsKCkpO1xuICByZXR1cm4gZGlzcGF0Y2goZmV0Y2hBcmd1bWVudHMoZ2V0U3RhdGUoKSkpO1xufTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdXR0b25Db21wbGV0ZUFyZ3VtZW50ID0gKHsgb25DbGljaywgY29tcGxldGVkIH0pID0+IChcbiAgPGJ1dHRvblxuICAgIGNsYXNzTmFtZT17YGJ1dHRvbi1jb21wbGV0ZS1hcmd1bWVudCAkeyhjb21wbGV0ZWQpID8gJ2J1dHRvbi1jb21wbGV0ZWQtYXJndW1lbnQnIDogJyd9YH1cbiAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICA+XG4gICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1jaGVja1wiIC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uQ29tcGxldGVBcmd1bWVudC5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5CdXR0b25Db21wbGV0ZUFyZ3VtZW50LmRlZmF1bHRQcm9wcyA9IHtcbiAgY29tcGxldGVkOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkNvbXBsZXRlQXJndW1lbnQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgQnV0dG9uRGVsZXRlQXJndW1lbnQgPSAoeyBvbkNsaWNrIH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24tZGVsZXRlLWFyZ3VtZW50XCIgb25DbGljaz17b25DbGlja30+XG4gICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1kZWxldGVcIiAvPlxuICA8L2J1dHRvbj5cbik7XG5cbkJ1dHRvbkRlbGV0ZUFyZ3VtZW50LnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkRlbGV0ZUFyZ3VtZW50O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEJ1dHRvbkRlbGV0ZUNhdGVnb3J5ID0gKHsgb25DbGljayB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLWRlbGV0ZS1jYXRlZ29yeVwiIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIDxpIGNsYXNzTmFtZT1cImljb24tZGVsZXRlXCIgLz5cbiAgPC9idXR0b24+XG4pO1xuXG5CdXR0b25EZWxldGVDYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25EZWxldGVDYXRlZ29yeTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdXR0b25TY3JvbGwgPSAoeyBvbkNsaWNrLCBkaXJlY3Rpb24gfSkgPT4gKFxuICA8YnV0dG9uIGNsYXNzTmFtZT17YGJ1dHRvbi1zY3JvbGwgJHtkaXJlY3Rpb259YH0gb25DbGljaz17b25DbGlja30+XG4gICAgPGkgY2xhc3NOYW1lPXsoZGlyZWN0aW9uID09PSAnbGVmdCcpID8gJ2ljb24tYmFja3dhcmQnIDogJ2ljb24tZm9yd2FyZCd9IC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uU2Nyb2xsLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZGlyZWN0aW9uOiBQcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxufTtcblxuQnV0dG9uU2Nyb2xsLmRlZmF1bHRQcm9wcyA9IHtcbiAgZGlyZWN0aW9uOiAnbGVmdCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25TY3JvbGw7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb25Hcm91cCB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuaW1wb3J0IHNjcm9sbCBmcm9tICdzY3JvbGwnO1xuaW1wb3J0IEJ1dHRvblNjcm9sbCBmcm9tICcuL0J1dHRvblNjb2xsJztcbmltcG9ydCBDYXRlZ29yeSBmcm9tICcuL0NhdGVnb3J5JztcbmltcG9ydCBGYWRlIGZyb20gJy4vYW5pbXMvRmFkZSc7XG5cbmNsYXNzIENhdGVnb3JpZXNGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmNoaXBzID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuaGFuZGxlTGVmdFNjcm9sbENsaWNrID0gdGhpcy5oYW5kbGVMZWZ0U2Nyb2xsQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2sgPSB0aGlzLmhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vdmVDaGlwc1Njcm9sbCA9IHRoaXMubW92ZUNoaXBzU2Nyb2xsLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVMZWZ0U2Nyb2xsQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuY2hpcHMpIHtcbiAgICAgIHRoaXMubW92ZUNoaXBzU2Nyb2xsKC10aGlzLmNoaXBzLmNsaWVudFdpZHRoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVSaWdodFNjcm9sbENsaWNrKCkge1xuICAgIGlmICh0aGlzLmNoaXBzKSB7XG4gICAgICB0aGlzLm1vdmVDaGlwc1Njcm9sbCh0aGlzLmNoaXBzLmNsaWVudFdpZHRoKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlQ2hpcHNTY3JvbGwoZGVsdGEpIHtcbiAgICBpZiAodGhpcy5jaGlwcykge1xuICAgICAgY29uc3QgbmV4dFNjcm9sbExlZnQgPSB0aGlzLmNoaXBzLnNjcm9sbExlZnQgKyBkZWx0YTtcbiAgICAgIHNjcm9sbC5sZWZ0KHRoaXMuY2hpcHMsIG5leHRTY3JvbGxMZWZ0KTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjYXRlZ29yeUxpc3QsIG9uRGVsZXRlQ2F0ZWdvcnksIG9uQ2lsY2tDYXRlZ29yeSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cImNvbnRlbnQtY2F0ZWdvcmllcy1maWx0ZXJcIj5cbiAgICAgICAgPEJ1dHRvblNjcm9sbFxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTGVmdFNjcm9sbENsaWNrfVxuICAgICAgICAgIGRpcmVjdGlvbj1cImxlZnRcIlxuICAgICAgICAvPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwiY2F0ZWdvcmllcy1maWx0ZXJcIlxuICAgICAgICAgIHJlZj17KG5vZGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hpcHMgPSBub2RlO1xuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8VHJhbnNpdGlvbkdyb3VwIHN0eWxlPXt7IGRpc3BsYXk6ICdpbmhlcml0JywgcGFkZGluZ0xlZnQ6ICcxLjI1ZW0nLCBwYWRkaW5nUmlnaHQ6ICcxLjI1ZW0nIH19PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjYXRlZ29yeUxpc3QubWFwKGNhdGVnb3J5ID0+IChcbiAgICAgICAgICAgICAgICA8RmFkZSBrZXk9e2NhdGVnb3J5LmlkfT5cbiAgICAgICAgICAgICAgICAgIDxDYXRlZ29yeVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2NhdGVnb3J5LmlkfVxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeT17Y2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtjYXRlZ29yeS5zZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICAgb25EZWxldGU9e29uRGVsZXRlQ2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2lsY2tDYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9GYWRlPlxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvVHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEJ1dHRvblNjcm9sbFxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlUmlnaHRTY3JvbGxDbGlja31cbiAgICAgICAgICBkaXJlY3Rpb249XCJyaWdodFwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkNhdGVnb3JpZXNGaWx0ZXIucHJvcFR5cGVzID0ge1xuICBjYXRlZ29yeUxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIG9uRGVsZXRlQ2F0ZWdvcnk6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNpbGNrQ2F0ZWdvcnk6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5DYXRlZ29yaWVzRmlsdGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25EZWxldGVDYXRlZ29yeTogdW5kZWZpbmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0ZWdvcmllc0ZpbHRlcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEJ1dHRvbkRlbGV0ZUNhdGVnb3J5IGZyb20gJy4vQnV0dG9uRGVsZXRlQ2F0ZWdvcnknO1xuXG5jb25zdCBDYXRlZ29yeSA9ICh7XG4gIGNhdGVnb3J5LCBzZWxlY3RlZCwgb25DbGljaywgb25EZWxldGUsXG59KSA9PiB7XG4gIGxldCBjc3NDbGFzcyA9ICcnO1xuXG4gIGNvbnN0IG9uQ2hpcENsaWNrID0gKGUpID0+IHtcbiAgICBvbkNsaWNrKGNhdGVnb3J5LCBlKTtcbiAgfTtcbiAgY29uc3Qgb25EZWxldGVDbGljayA9ICgpID0+IHtcbiAgICBvbkRlbGV0ZShjYXRlZ29yeSk7XG4gIH07XG5cbiAgaWYgKHNlbGVjdGVkKSB7XG4gICAgY3NzQ2xhc3MgPSAnY2F0ZWdvcnktc2VsZWN0ZWQnO1xuICB9XG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtgJHtjc3NDbGFzc30gY2F0ZWdvcnktY2hpcCBhbGlnbi1pdGVtcy1jZW50ZXJgfVxuICAgICAgb25DbGljaz17b25DaGlwQ2xpY2t9XG4gICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXRlZ29yeS10ZXh0XCI+e2NhdGVnb3J5Lm5hbWV9PC9zcGFuPlxuICAgICAge1xuICAgICAgICAoY2F0ZWdvcnkuaWQgIT09ICcwJyAmJiBvbkRlbGV0ZSAhPT0gdW5kZWZpbmVkKSAmJlxuICAgICAgICAgIDxCdXR0b25EZWxldGVDYXRlZ29yeSBvbkNsaWNrPXtvbkRlbGV0ZUNsaWNrfSAvPlxuICAgICAgfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuQ2F0ZWdvcnkucHJvcFR5cGVzID0ge1xuICBvbkRlbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNhdGVnb3J5OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbn07XG5cbkNhdGVnb3J5LmRlZmF1bHRQcm9wcyA9IHtcbiAgb25EZWxldGU6IHVuZGVmaW5lZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENhdGVnb3J5O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJ2xvZGFzaCc7XG5cbmNvbnN0IHdhaXRUaW1lID0gNTAwO1xuXG5jbGFzcyBJbmZpbml0ZVNjcm9sbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMub25TY3JvbGwgPSB0aGlzLm9uU2Nyb2xsLmJpbmQodGhpcyk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhyb3R0bGUodGhpcy5vblNjcm9sbCwgd2FpdFRpbWUpLCBmYWxzZSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhyb3R0bGUodGhpcy5vblNjcm9sbCwgd2FpdFRpbWUpLCBmYWxzZSk7XG4gIH1cblxuICBvblNjcm9sbCgpIHtcbiAgICBpZiAoKHdpbmRvdy5pbm5lckhlaWdodCArIHdpbmRvdy5zY3JvbGxZKSA+PSAoZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQgLSAyMDApKSB7XG4gICAgICBjb25zdCB7IGFyZ3MsIG9uU2Nyb2xsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgb25TY3JvbGwoLi4uYXJncyk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSW5maW5pdGVTY3JvbGwucHJvcFR5cGVzID0ge1xuICBhcmdzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgb25TY3JvbGw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5JbmZpbml0ZVNjcm9sbC5kZWZhdWx0UHJvcHMgPSB7XG4gIGFyZ3M6IFtdLFxuICBjbGFzc05hbWU6ICcnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgSW5maW5pdGVTY3JvbGw7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgTWFpbkFkZEJ1dHRvbiA9ICh7IG9uQ2xpY2sgfSkgPT4gKFxuICA8YnV0dG9uIGlkPVwibWFpbi1hZGQtYnV0dG9uXCIgb25DbGljaz17b25DbGlja30gPlxuICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+JiN4RTE0NTs8L2k+XG4gIDwvYnV0dG9uPlxuKTtcblxuTWFpbkFkZEJ1dHRvbi5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYWluQWRkQnV0dG9uO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgU25hY2tiYXJBbmltIGZyb20gJy4vYW5pbXMvU25hY2tiYXJBbmltJztcblxuY29uc3QgQWN0aW9uID0gKHsgb25DbGljaywgdGV4dCB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLWFjdGlvbi1zbmFja2JhclwiIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIHt0ZXh0fVxuICA8L2J1dHRvbj5cbik7XG5cbkFjdGlvbi5wcm9wVHlwZXMgPSB7XG4gIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmNsYXNzIFNuYWNrYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2xvc2UsIGR1cmF0aW9uLCBzaG93LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKHNob3cpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBvbkNsb3NlKCk7XG4gICAgICB9LCBkdXJhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG1lc3NhZ2UsIGlzRXJyb3IsIGFjdGlvblRleHQsIGFjdGlvbkNsaWNrLCBzaG93LFxuICAgICAgdmVydGljYWxQb3N0aW9uLCBob3Jpem9udGFsUG9zaXRpb24sXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTbmFja2JhckFuaW0gaW49e3Nob3d9IGN1c3RvbUNsYXNzPXtgJHt2ZXJ0aWNhbFBvc3Rpb259ICR7KGhvcml6b250YWxQb3NpdGlvbil9YH0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2BzbmFja2JhciAkeyhpc0Vycm9yKSA/ICdlcnJvcicgOiAnJ31gfVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic25hY2tiYXItbWVzc2FnZVwiPnttZXNzYWdlfTwvc3Bhbj5cbiAgICAgICAgICB7XG4gICAgICAgICAgICAoYWN0aW9uVGV4dCAhPT0gJycgJiYgYWN0aW9uQ2xpY2sgIT09IHVuZGVmaW5lZCkgJiZcbiAgICAgICAgICAgICAgPEFjdGlvbiBvbkNsaWNrPXthY3Rpb25DbGlja30gdGV4dD17YWN0aW9uVGV4dH0gLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9TbmFja2JhckFuaW0+XG4gICAgKTtcbiAgfVxufVxuXG5TbmFja2Jhci5wcm9wVHlwZXMgPSB7XG4gIHNob3c6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZHVyYXRpb246IFByb3BUeXBlcy5udW1iZXIsXG4gIGlzRXJyb3I6IFByb3BUeXBlcy5ib29sLFxuICBhY3Rpb25UZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBhY3Rpb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gIHZlcnRpY2FsUG9zdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsndG9wJywgJ2JvdHRvbSddKSxcbiAgaG9yaXpvbnRhbFBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxufTtcblxuU25hY2tiYXIuZGVmYXVsdFByb3BzID0ge1xuICBkdXJhdGlvbjogNTAwMCxcbiAgaXNFcnJvcjogZmFsc2UsXG4gIGFjdGlvblRleHQ6ICcnLFxuICBhY3Rpb25DbGljazogdW5kZWZpbmVkLFxuICB2ZXJ0aWNhbFBvc3Rpb246ICdib3R0b20nLFxuICBob3Jpem9udGFsUG9zaXRpb246ICdyaWdodCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTbmFja2JhcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IENvbGxhcHNlIGZyb20gJy4vYW5pbXMvQ29sbGFwc2UnO1xuaW1wb3J0IEZhZGUgZnJvbSAnLi9hbmltcy9GYWRlJztcbmltcG9ydCBCdXR0b25Db21wbGV0ZUFyZ3VtZW50IGZyb20gJy4vQnV0dG9uQ29tcGxldGVBcmd1bWVudCc7XG5pbXBvcnQgQnV0dG9uRGVsZXRlQXJndW1lbnQgZnJvbSAnLi9CdXR0b25EZWxldGVBcmd1bWVudCc7XG5pbXBvcnQgeyB0b1NpbXBsZURhdGVGb3JtYXQgfSBmcm9tICcuLi91dGlscy9Db21tb24nO1xuXG5jbGFzcyBUYXNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgfTtcbiAgICB0aGlzLnJlbmRlckRhdGUgPSB0aGlzLnJlbmRlckRhdGUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uVGl0bGVDbGljaygpIHtcbiAgICBjb25zdCB7IGNvbGxhcHNlZCB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnNldFN0YXRlKHsgY29sbGFwc2VkOiAhY29sbGFwc2VkIH0pO1xuICB9XG5cbiAgcmVuZGVyRGF0ZSgpIHtcbiAgICBjb25zdCB7IHRhc2sgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKHRhc2suY29tcGxldGVkKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8cCBjbGFzc05hbWU9XCJjb21wbGV0ZS1kYXRlXCI+e2Bjb21wbGV0ZWQgJHsodGFzay5jb21wbGV0ZWRBdCkgPyB0b1NpbXBsZURhdGVGb3JtYXQodGFzay5jb21wbGV0ZWRBdCkgOiAnJ31gfTwvcD5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8cCBjbGFzc05hbWU9XCJjb21wbGV0ZS13aXRoaW4tZGF0ZVwiPntgdG8gY29tcGxldGUgd2l0aGluICR7KHRhc2sudG9kb1dpdGhpbikgPyB0b1NpbXBsZURhdGVGb3JtYXQodGFzay50b2RvV2l0aGluKSA6ICdub3Qgc2V0J31gfTwvcD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgdGFzaywgb25EZWxldGUsIG9uQ29tcGxldGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBjb2xsYXBzZWQgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXJndW1lbnQtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFyZ3VtZW50LWhlYWRlclwiPlxuICAgICAgICAgIDxwXG4gICAgICAgICAgICBjbGFzc05hbWU9e2Bhcmd1bWVudC10aXRsZSAkeyh0YXNrLmNvbXBsZXRlZCkgPyAnYXJndW1lbnQtdGl0bGUtY29tcGxldGVkJyA6ICcnfWB9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uVGl0bGVDbGljaygpfVxuICAgICAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3Rhc2sudGl0bGV9XG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxGYWRlIGluPXtjb2xsYXBzZWR9PlxuICAgICAgICAgICAgPEJ1dHRvbkRlbGV0ZUFyZ3VtZW50XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uRGVsZXRlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0ZhZGU+XG4gICAgICAgICAge1xuICAgICAgICAgICAgb25Db21wbGV0ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICA8QnV0dG9uQ29tcGxldGVBcmd1bWVudFxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNvbXBsZXRlfVxuICAgICAgICAgICAgICBjb21wbGV0ZWQ9e3Rhc2suY29tcGxldGVkfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFyZ3VtZW50LWRhdGVcIj5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJEYXRlKCl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Q29sbGFwc2UgaW49e2NvbGxhcHNlZH0+XG4gICAgICAgICAgPGRpdiBrZXk9e3Rhc2suZGVzY3JpcHRpb259IGNsYXNzTmFtZT1cImFyZ3VtZW50LWJvZHlcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImFyZ3VtZW50LWRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAodGFzay5kZXNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkICYmIHRhc2suZGVzY3JpcHRpb24gIT09ICcnKVxuICAgICAgICAgICAgICAgID8gdGFzay5kZXNjcmlwdGlvbiA6IDxzcGFuIGNsYXNzTmFtZT1cImVtcHR5XCI+Tm8gZGVzY3JpcHRpb24gdG8gc2hvdyA6KDwvc3Bhbj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NvbGxhcHNlPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5UYXNrLnByb3BUeXBlcyA9IHtcbiAgb25EZWxldGU6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNvbXBsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgdGFzazogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGNvbXBsZXRlZEF0OiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICB9KS5pc1JlcXVpcmVkLFxufTtcblxuVGFzay5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uRGVsZXRlOiB1bmRlZmluZWQsXG4gIG9uQ29tcGxldGU6IHVuZGVmaW5lZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2s7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb25Hcm91cCB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuaW1wb3J0IFJlc2l6ZSBmcm9tICcuL2FuaW1zL1Jlc2l6ZSc7XG5pbXBvcnQgVGFzayBmcm9tICcuL1Rhc2snO1xuaW1wb3J0IEluZmluaXRlU2Nyb2xsIGZyb20gJy4vSW5maW5pdGVTY3JvbGwnO1xuaW1wb3J0IHsgcXVlcnlJdGVtc0xpbWl0IH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgbGltaXQ6IHF1ZXJ5SXRlbXNMaW1pdCxcbiAgc2tpcDogMCxcbn07XG5cbmNsYXNzIFRhc2tzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IGluaXRpYWxTdGF0ZTtcbiAgICB0aGlzLm9uRmV0Y2hUb2RvQXJndW1lbnRzTmV4dCA9IHRoaXMub25GZXRjaFRvZG9Bcmd1bWVudHNOZXh0LmJpbmQodGhpcyk7XG4gIH1cblxuICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKG5leHRQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgaWYgKG5leHRQcm9wcy5za2lwICE9PSBwcmV2U3RhdGUuc2tpcCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2tpcDogbmV4dFByb3BzLnNraXAsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIG9uRmV0Y2hUb2RvQXJndW1lbnRzTmV4dCgpIHtcbiAgICBjb25zdCB7XG4gICAgICBjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCxcbiAgICAgIGZldGNoVGFza3MsIG1vcmVUb0xvYWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFtb3JlVG9Mb2FkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgbGltaXQsIHNraXAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgbmV3U2tpcCA9IHNraXAgKyBsaW1pdDtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2tpcDogbmV3U2tpcCB9KTtcbiAgICBmZXRjaFRhc2tzKGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgbmV3U2tpcCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdGFza0xpc3QsXG4gICAgICBvbkRlbGV0ZUFyZ3VtZW50LFxuICAgICAgb25Db21wbGV0ZUFyZ3VtZW50LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiY29udGVudC10b2RvLWFyZ3VtZW50c1wiPlxuICAgICAgICA8SW5maW5pdGVTY3JvbGwgb25TY3JvbGw9e3RoaXMub25GZXRjaFRvZG9Bcmd1bWVudHNOZXh0fT5cbiAgICAgICAgICA8VHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0YXNrTGlzdC5tYXAoYXJnID0+IChcbiAgICAgICAgICAgICAgICA8UmVzaXplIGtleT17YXJnLmlkfT5cbiAgICAgICAgICAgICAgICAgIDxUYXNrXG4gICAgICAgICAgICAgICAgICAgIGtleT17YXJnLmlkfVxuICAgICAgICAgICAgICAgICAgICB0YXNrPXthcmd9XG4gICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlPXsoKSA9PiBvbkRlbGV0ZUFyZ3VtZW50KGFyZyl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9eygpID0+IG9uQ29tcGxldGVBcmd1bWVudChhcmcpfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L1Jlc2l6ZT5cbiAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L1RyYW5zaXRpb25Hcm91cD5cbiAgICAgICAgPC9JbmZpbml0ZVNjcm9sbD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuVGFza3MucHJvcFR5cGVzID0ge1xuICBvbkRlbGV0ZUFyZ3VtZW50OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkNvbXBsZXRlQXJndW1lbnQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHRhc2tMaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIG1vcmVUb0xvYWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGZldGNoVGFza3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNhdGVnb3JpZXNJZDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZykuaXNSZXF1aXJlZCxcbiAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVGFza3M7XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IExvYWRlckxpbmVhciBmcm9tICcuLi9jb21wb25lbnRzL0xvYWRlckxpbmVhcic7XG5pbXBvcnQgTWFpbkFkZEJ1dHRvbiBmcm9tICcuLi9jb21wb25lbnRzL01haW5BZGRCdXR0b24nO1xuaW1wb3J0IENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIgZnJvbSAnLi4vY29udGFpbmVycy9DYXRlZ29yaWVzRmlsdGVyQ29udGFpbmVyJztcbmltcG9ydCBWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lcnMvVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lcic7XG5pbXBvcnQgVGFza3NDb250YWluZXIgZnJvbSAnLi4vY29udGFpbmVycy9UYXNrc0NvbnRhaW5lcic7XG5pbXBvcnQgRGlhbG9nQWRkIGZyb20gJy4vZGlhbG9nQWRkL0RpYWxvZ0FkZCc7XG5pbXBvcnQgU25hY2tiYXIgZnJvbSAnLi9TbmFja2Jhcic7XG5cbmNsYXNzIFRvZG9zIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzRGlhbG9nQWRkT3BlbjogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIC8vIERpYWxvZ0FkZC5wcmVsb2FkKCk7XG4gICAgY29uc3QgeyBpbml0RmV0Y2hBbGxDYXRlZ29yaWVzIH0gPSB0aGlzLnByb3BzO1xuICAgIGluaXRGZXRjaEFsbENhdGVnb3JpZXMoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGlzRGlhbG9nQWRkT3BlbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IG1lc3NhZ2UsIGhpZGVNZXNzYWdlLCBzaG93TG9hZGluZyB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWFwcFwiPlxuICAgICAgICA8TG9hZGVyTGluZWFyIHNob3c9e3Nob3dMb2FkaW5nfSAvPlxuICAgICAgICA8ZGl2IGlkPVwibWFpbi10b3AtYmFyXCI+XG4gICAgICAgICAgPENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIgLz5cbiAgICAgICAgICA8VmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lciAvPlxuICAgICAgICAgIDxNYWluQWRkQnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgaXNEaWFsb2dBZGRPcGVuOiB0cnVlIH0pfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8VGFza3NDb250YWluZXIgLz5cbiAgICAgICAgPERpYWxvZ0FkZFxuICAgICAgICAgIG9wZW49e2lzRGlhbG9nQWRkT3Blbn1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgaXNEaWFsb2dBZGRPcGVuOiBmYWxzZSB9KX1cbiAgICAgICAgLz5cbiAgICAgICAgPFNuYWNrYmFyXG4gICAgICAgICAgc2hvdz17bWVzc2FnZS5zaG93fVxuICAgICAgICAgIGlzRXJyb3I9e21lc3NhZ2UuaXNFcnJvcn1cbiAgICAgICAgICBtZXNzYWdlPXttZXNzYWdlLnRleHR9XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gaGlkZU1lc3NhZ2UoKX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuVG9kb3MucHJvcFR5cGVzID0ge1xuICBtZXNzYWdlOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHNob3c6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNFcnJvcjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICB0ZXh0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIGhpZGVNZXNzYWdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBpbml0RmV0Y2hBbGxDYXRlZ29yaWVzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBzaG93TG9hZGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9zO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgVmlzaWJpbGl0eVN3aXRjaCBmcm9tICcuL1Zpc2liaWxpdHlTd2l0Y2gnO1xuaW1wb3J0IHsgQUxMX1RPRE9TLCBPTkxZX0NPTVBMRVRFRCwgT05MWV9UT19DT01QTEVURSB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuXG5jb25zdCBWaXNpYmlsaXR5RmlsdGVyID0gKHtcbiAgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyLCBvblZpc2liaWxpdHlTd2l0Y2hDbGljayxcbn0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJ2aXNpYmlsaXR5LWZpbHRlci13cmFwcGVyXCI+XG4gICAgPFZpc2liaWxpdHlTd2l0Y2hcbiAgICAgIHNlbGVjdGVkPXsoc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyID09PSBPTkxZX1RPX0NPTVBMRVRFXG4gICAgICAgIHx8IHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciA9PT0gQUxMX1RPRE9TKX1cbiAgICAgIG9uQ2xpY2s9e29uVmlzaWJpbGl0eVN3aXRjaENsaWNrKE9OTFlfVE9fQ09NUExFVEUpfVxuICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgPlxuICAgICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1jaXJjbGUtYm9yZGVyXCIgLz5cbiAgICA8L1Zpc2liaWxpdHlTd2l0Y2g+XG4gICAgPFZpc2liaWxpdHlTd2l0Y2hcbiAgICAgIHNlbGVjdGVkPXsoc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyID09PSBPTkxZX0NPTVBMRVRFRFxuICAgICAgICB8fCBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IEFMTF9UT0RPUyl9XG4gICAgICBvbkNsaWNrPXtvblZpc2liaWxpdHlTd2l0Y2hDbGljayhPTkxZX0NPTVBMRVRFRCl9XG4gICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICA+XG4gICAgICA8aSBjbGFzc05hbWU9XCJpY29uLWNpcmNsZVwiIC8+XG4gICAgPC9WaXNpYmlsaXR5U3dpdGNoPlxuICA8L2Rpdj5cbik7XG5cblZpc2liaWxpdHlGaWx0ZXIucHJvcFR5cGVzID0ge1xuICBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXI6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25WaXNpYmlsaXR5U3dpdGNoQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBWaXNpYmlsaXR5RmlsdGVyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IFZpc2liaWxpdHlTd2l0Y2ggPSAoe1xuICBzZWxlY3RlZCwgY2hpbGRyZW4sIG9uQ2xpY2ssXG59KSA9PiAoXG4gIDxkaXZcbiAgICBjbGFzc05hbWU9e2B2aXNpYmlsaXR5LWJ1dHRvbi1zd2l0Y2ggYWxpZ24taXRlbXMtY2VudGVyICR7KHNlbGVjdGVkKSA/ICdzZWxlY3RlZCcgOiAnJ30gYH1cbiAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICA+XG4gICAge2NoaWxkcmVufVxuICA8L2Rpdj5cbik7XG5cblZpc2liaWxpdHlTd2l0Y2gucHJvcFR5cGVzID0ge1xuICBzZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuVmlzaWJpbGl0eVN3aXRjaC5kZWZhdWx0UHJvcHMgPSB7XG4gIHNlbGVjdGVkOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFZpc2liaWxpdHlTd2l0Y2g7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSAzMDA7XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgdHJhbnNpdGlvbjogYGhlaWdodCAke2R1cmF0aW9ufW1zIGVhc2UtaW4tb3V0YCxcbiAgaGVpZ2h0OiAwLFxufTtcblxuY29uc3Qgb25FbnRlciA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XG4gIHN0eWxlLmhlaWdodCA9IGAke25vZGUuZmlyc3RFbGVtZW50Q2hpbGQub2Zmc2V0SGVpZ2h0fXB4YDtcbn07XG5cbmNvbnN0IG9uRXhpdCA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XG4gIHN0eWxlLmhlaWdodCA9ICcwcHgnO1xufTtcblxuY29uc3QgQ29sbGFwc2UgPSAoeyBpbjogaW5Qcm9wLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxUcmFuc2l0aW9uIG9uRW50ZXI9e29uRW50ZXJ9IG9uRXhpdD17b25FeGl0fSBpbj17aW5Qcm9wfSB0aW1lb3V0PXtkdXJhdGlvbn0+XG4gICAgeygpID0+IChcbiAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAuLi5kZWZhdWx0U3R5bGUsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICl9XG4gIDwvVHJhbnNpdGlvbj5cbik7XG5cbkNvbGxhcHNlLnByb3BUeXBlcyA9IHtcbiAgaW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29sbGFwc2U7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSAyNTA7XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgdHJhbnNpdGlvbjogYGFsbCAke2R1cmF0aW9ufW1zIGVhc2UtaW4tb3V0YCxcbiAgaGVpZ2h0OiAnMHB4JyxcbiAgb3BhY2l0eTogJzAnLFxuICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbn07XG5cbmNvbnN0IHRyYW5zaXRpb25TdHlsZXMgPSB7XG4gIGVudGVyaW5nOiB7XG4gICAgaGVpZ2h0OiAnMHB4JyxcbiAgICBvcGFjaXR5OiAnMCcsXG4gICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gIH0sXG4gIGVudGVyZWQ6IHtcbiAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgIGhlaWdodDogJzEwMHZoJyxcbiAgICBvcGFjaXR5OiAnMScsXG4gICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICB9LFxufTtcblxuY29uc3QgRGlhbG9nQW5pbSA9ICh7IGluOiBpblByb3AsIGNoaWxkcmVuIH0pID0+IChcbiAgPFRyYW5zaXRpb24gaW49e2luUHJvcH0gdGltZW91dD17ZHVyYXRpb259PlxuICAgIHtzdGF0ZSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPVwiYmFja2Ryb3AtZGlhbG9nXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAuLi5kZWZhdWx0U3R5bGUsXG4gICAgICAgICAgLi4udHJhbnNpdGlvblN0eWxlc1tzdGF0ZV0sXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICl9XG4gIDwvVHJhbnNpdGlvbj5cbik7XG5cbkRpYWxvZ0FuaW0ucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaWFsb2dBbmltO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5cbmNvbnN0IGR1cmF0aW9uID0gMjUwO1xuXG5jb25zdCBkZWZhdWx0U3R5bGUgPSB7XG4gIHdpZHRoOiAnMTAwJScsXG4gIHRyYW5zaXRpb246IGBvcGFjaXR5ICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBvcGFjaXR5OiAwLFxuICBkaXNwbGF5OiAnaW5oZXJpdCcsXG59O1xuXG5jb25zdCB0cmFuc2l0aW9uU3R5bGVzID0ge1xuICBlbnRlcjogeyBvcGFjaXR5OiAwIH0sXG4gIGVudGVyZWQ6IHsgb3BhY2l0eTogMSB9LFxufTtcblxuY29uc3QgUmVwbGFjZUFuaW0gPSAoeyBpbjogaW5Qcm9wLCBlbmRMaXN0ZW5lciwgY2hpbGRyZW4gfSkgPT4gKFxuICA8VHJhbnNpdGlvblxuICAgIGluPXtpblByb3B9XG4gICAgdGltZW91dD17ZHVyYXRpb259XG4gICAgYWRkRW5kTGlzdGVuZXI9e2VuZExpc3RlbmVyfVxuICA+XG4gICAge3N0YXRlID0+IChcbiAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAuLi5kZWZhdWx0U3R5bGUsXG4gICAgICAgICAgLi4udHJhbnNpdGlvblN0eWxlc1tzdGF0ZV0sXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICl9XG4gIDwvVHJhbnNpdGlvbj5cbik7XG5cblJlcGxhY2VBbmltLnByb3BUeXBlcyA9IHtcbiAgaW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGVuZExpc3RlbmVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJlcGxhY2VBbmltO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5cbmNvbnN0IGR1cmF0aW9uID0ge1xuICBlbnRlcjogMzAwLFxuICBleGl0OiAyMDAsXG59O1xuXG5jb25zdCBkZWZhdWx0U3R5bGUgPSB7XG4gIHRyYW5zaXRpb246IGBhbGwgJHtkdXJhdGlvbi5lbnRlcn1tcyBlYXNlLWluLW91dGAsXG4gIGhlaWdodDogMCxcbiAgb3BhY2l0eTogMCxcbn07XG5cbmNvbnN0IG9uRW50ZXIgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSBgJHtub2RlLmZpcnN0RWxlbWVudENoaWxkLm9mZnNldEhlaWdodH1weGA7XG4gIHN0eWxlLm9wYWNpdHkgPSAxO1xufTtcblxuY29uc3Qgb25FbnRlcmVkID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xufTtcblxuY29uc3Qgb25FeGl0ID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gYCR7bm9kZS5maXJzdEVsZW1lbnRDaGlsZC5vZmZzZXRIZWlnaHR9cHhgO1xufTtcblxuY29uc3Qgb25FeGl0ZWQgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSAnMHB4JztcbiAgc3R5bGUub3BhY2l0eSA9IDA7XG59O1xuXG5cbmNvbnN0IFJlc2l6ZSA9ICh7IC4uLnByb3BzLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxUcmFuc2l0aW9uXG4gICAgey4uLnByb3BzfVxuICAgIG9uRW50ZXI9e29uRW50ZXJ9XG4gICAgb25FbnRlcmVkPXtvbkVudGVyZWR9XG4gICAgb25FeGl0PXtvbkV4aXR9XG4gICAgb25FeGl0ZWQ9e29uRXhpdGVkfVxuICAgIHRpbWVvdXQ9e2R1cmF0aW9ufVxuICA+XG4gICAgeygpID0+IChcbiAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAuLi5kZWZhdWx0U3R5bGUsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICl9XG4gIDwvVHJhbnNpdGlvbj5cbik7XG5cblJlc2l6ZS5wcm9wVHlwZXMgPSB7XG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVzaXplO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5cbmNvbnN0IGR1cmF0aW9uID0gMjUwO1xuXG5jb25zdCBkZWZhdWx0U3R5bGUgPSB7XG4gIHRyYW5zaXRpb246IGBhbGwgJHtkdXJhdGlvbn1tcyBlYXNlLWluLW91dGAsXG4gIGJvdHRvbTogJy0xMDBweCcsXG59O1xuXG5jb25zdCB0cmFuc2l0aW9uU3R5bGVzID0ge1xuICBlbnRlcmluZzoge1xuICAgIGJvdHRvbTogJy0xMDBweCcsXG4gICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gIH0sXG4gIGVudGVyZWQ6IHtcbiAgICBib3R0b206ICcwcHgnLFxuICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJyxcbiAgfSxcbn07XG5cbmNvbnN0IFNuYWNrYmFyQW5pbSA9ICh7IGluOiBpblByb3AsIGNoaWxkcmVuLCBjdXN0b21DbGFzcyB9KSA9PiAoXG4gIDxUcmFuc2l0aW9uIGluPXtpblByb3B9IHRpbWVvdXQ9e2R1cmF0aW9ufT5cbiAgICB7c3RhdGUgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD1cImNvbnRlbnQtc25hY2tiYXJcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgICAuLi50cmFuc2l0aW9uU3R5bGVzW3N0YXRlXSxcbiAgICAgICAgfX1cbiAgICAgICAgY2xhc3NOYW1lPXtjdXN0b21DbGFzc31cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuU25hY2tiYXJBbmltLnByb3BUeXBlcyA9IHtcbiAgaW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICBjdXN0b21DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cblNuYWNrYmFyQW5pbS5kZWZhdWx0UHJvcHMgPSB7XG4gIGN1c3RvbUNsYXNzOiAnJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNuYWNrYmFyQW5pbTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi9jb25zdGFudHMvbGFiZWxzJztcbmltcG9ydCB7IEFERF9BUkdVTUVOVCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgeyBhZGRDYXRlZ29yeSB9IGZyb20gJy4uLy4uL2FjdGlvbnMvdG9kb0ZpbHRlcnNBY3Rpb25zJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5jbGFzcyBBZGRDYXRlZ29yeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBuYW1lOiAnJyxcbiAgICB9O1xuICAgIHRoaXMub25JbnB1dFRleHRDaGFuZ2UgPSB0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkJ1dHRvbkFkZENsaWNrID0gdGhpcy5vbkJ1dHRvbkFkZENsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkNhdGVnb3J5Q3JlYXRlZCA9IHRoaXMub25DYXRlZ29yeUNyZWF0ZWQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uSW5wdXRUZXh0Q2hhbmdlKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgbmFtZTogZS50YXJnZXQudmFsdWUgfSk7XG4gIH1cblxuICBvbkJ1dHRvbkFkZENsaWNrKCkge1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IGRpc3BhdGNoIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChuYW1lID09PSAnJykge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VJbmZvKGxhYmVscy5tc2dOYW1lUmVxdWlyZWQpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGlzcGF0Y2goYWRkQ2F0ZWdvcnkobmFtZSwgdGhpcy5vbkNhdGVnb3J5Q3JlYXRlZCkpO1xuICB9XG5cbiAgb25DYXRlZ29yeUNyZWF0ZWQoc2VsZWN0ZWRDYXRlZ29yeSkge1xuICAgIGNvbnN0IHsgb25OZXh0IH0gPSB0aGlzLnByb3BzO1xuICAgIG9uTmV4dCh7IHN0ZXBJZDogQUREX0FSR1VNRU5ULCBvcHRpb25zOiB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWFkZC1jYXRlZ29yeVwiPlxuICAgICAgICA8aDI+QWRkIG5ldyBDQVRFR09SWTwvaDI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVHlwZSB0aGUgbmFtZVwiXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0VGV4dENoYW5nZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQnV0dG9uQWRkQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgQUREXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5BZGRDYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbk5leHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCkoQWRkQ2F0ZWdvcnkpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IHsgU0VMRUNUX0NPTVBMRVRFX0RBVEUgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VJbmZvIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5cbmNsYXNzIEFkZFRvZG9Bcmd1bWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRpdGxlOiAnJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICB9O1xuICAgIHRoaXMub25JbnB1dFRleHRDaGFuZ2UgPSB0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkJ1dHRvblNjaGVkdWxlQ2xpY2sgPSB0aGlzLm9uQnV0dG9uU2NoZWR1bGVDbGljay5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25JbnB1dFRleHRDaGFuZ2UobmFtZSkge1xuICAgIHJldHVybiAoZSkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtuYW1lXTogZS50YXJnZXQudmFsdWUgfSk7XG4gICAgfTtcbiAgfVxuXG4gIG9uQnV0dG9uU2NoZWR1bGVDbGljaygpIHtcbiAgICBjb25zdCB7IG9wdGlvbnMsIGRpc3BhdGNoLCBvbk5leHQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyB0aXRsZSwgZGVzY3JpcHRpb24gfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgY2F0ZWdvcnkgPSBvcHRpb25zLnNlbGVjdGVkQ2F0ZWdvcnk7XG4gICAgaWYgKHRpdGxlID09PSAnJykge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VJbmZvKGxhYmVscy5tc2dUaXRsZVJlcXVpcmVkKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9uTmV4dCh7IHN0ZXBJZDogU0VMRUNUX0NPTVBMRVRFX0RBVEUsIG9wdGlvbnM6IHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBjYXRlZ29yeSB9IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgc2VsZWN0ZWRDYXRlZ29yeSB9ID0gdGhpcy5wcm9wcy5vcHRpb25zO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtYWRkLWFyZ3VtZW50XCI+XG4gICAgICAgIDxoMj5BZGQgbmV3IEFSR1VNRU5UPC9oMj5cbiAgICAgICAgPGgzPlxuICAgICAgICAgIGZvciB0aGUgY2F0ZWdvcnk6XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGFiZWwtY2F0ZWdvcnktbmFtZVwiPlxuICAgICAgICAgICAge2AgJHtzZWxlY3RlZENhdGVnb3J5Lm5hbWV9YH1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvaDM+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1maWVsZHNcIj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4taW5wdXRcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJUeXBlIHRoZSB0aXRsZVwiXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0VGV4dENoYW5nZSgndGl0bGUnKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlR5cGUgdGhlIGRlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlKCdkZXNjcmlwdGlvbicpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4tYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25CdXR0b25TY2hlZHVsZUNsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIFNDSEVEVUxFXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5BZGRUb2RvQXJndW1lbnQucHJvcFR5cGVzID0ge1xuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb3B0aW9uczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBzZWxlY3RlZENhdGVnb3J5OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB9KS5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkLFxuICBvbk5leHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCkoQWRkVG9kb0FyZ3VtZW50KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgU2VsZWN0QWN0aW9uQWRkIGZyb20gJy4vU2VsZWN0QWN0aW9uQWRkJztcbmltcG9ydCBBZGRDYXRlZ29yeSBmcm9tICcuL0FkZENhdGVnb3J5JztcbmltcG9ydCBTZWxlY3RDYXRlZ29yeSBmcm9tICcuL1NlbGVjdENhdGVnb3J5JztcbmltcG9ydCBBZGRUb2RvQXJndW1lbnQgZnJvbSAnLi9BZGRUb2RvQXJndW1lbnQnO1xuaW1wb3J0IFNlbGVjdENvbXBsZXRlRGF0ZSBmcm9tICcuL1NlbGVjdENvbXBsZXRlRGF0ZSc7XG5pbXBvcnQgRG9uZSBmcm9tICcuL0RvbmUnO1xuaW1wb3J0IHtcbiAgU0VMRUNUX1dBTlRfVE9fQURELFxuICBBRERfQ0FURUdPUlksXG4gIEFERF9BUkdVTUVOVCxcbiAgU0VMRUNUX0NBVEVHT1JZLFxuICBTRUxFQ1RfQ09NUExFVEVfREFURSxcbiAgRE9ORSxcbiAgc3RlcExpc3QsXG59IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgUmVwbGFjZUFuaW0gZnJvbSAnLi4vYW5pbXMvUmVwbGFjZUFuaW0nO1xuaW1wb3J0IERpYWxvZ0FuaW0gZnJvbSAnLi4vYW5pbXMvRGlhbG9nQW5pbSc7XG5pbXBvcnQgU3RlcHMgZnJvbSAnLi9TdGVwcyc7XG5cbmNvbnN0IGdldENvbnRlbnRUb1JlbmRlciA9IChzdGVwcywgcHJvcHMpID0+IHtcbiAgaWYgKHN0ZXBzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiA8U2VsZWN0QWN0aW9uQWRkIHsuLi5wcm9wc30gLz47XG4gIH1cbiAgY29uc3QgbGFzdFN0ZXAgPSBzdGVwc1tzdGVwcy5sZW5ndGggLSAxXTtcbiAgc3dpdGNoIChsYXN0U3RlcC5zdGVwSWQpIHtcbiAgICBjYXNlIFNFTEVDVF9XQU5UX1RPX0FERDpcbiAgICAgIHJldHVybiA8U2VsZWN0QWN0aW9uQWRkIHsuLi5wcm9wc30gLz47XG4gICAgY2FzZSBBRERfQ0FURUdPUlk6XG4gICAgICByZXR1cm4gPEFkZENhdGVnb3J5IHsuLi5wcm9wc30gLz47XG4gICAgY2FzZSBBRERfQVJHVU1FTlQ6XG4gICAgICByZXR1cm4gPEFkZFRvZG9Bcmd1bWVudCB7Li4ucHJvcHN9IG9wdGlvbnM9e2xhc3RTdGVwLm9wdGlvbnN9IC8+O1xuICAgIGNhc2UgU0VMRUNUX0NBVEVHT1JZOlxuICAgICAgcmV0dXJuIDxTZWxlY3RDYXRlZ29yeSB7Li4ucHJvcHN9IC8+O1xuICAgIGNhc2UgU0VMRUNUX0NPTVBMRVRFX0RBVEU6XG4gICAgICByZXR1cm4gPFNlbGVjdENvbXBsZXRlRGF0ZSB7Li4ucHJvcHN9IG9wdGlvbnM9e2xhc3RTdGVwLm9wdGlvbnN9IC8+O1xuICAgIGNhc2UgRE9ORTpcbiAgICAgIHJldHVybiA8RG9uZSB7Li4ucHJvcHN9IC8+O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gPFNlbGVjdEFjdGlvbkFkZCB7Li4ucHJvcHN9IC8+O1xuICB9XG59O1xuXG5jb25zdCBpbml0YWxTdGF0ZSA9IHtcbiAgbmV4dFN0ZXBzOiBbXSxcbiAgc3RlcHM6IFtcbiAgICB7XG4gICAgICBzdGVwSWQ6IFNFTEVDVF9XQU5UX1RPX0FERCxcbiAgICAgIG9wdGlvbnM6IHt9LFxuICAgIH0sXG4gIF0sXG4gIHNob3dTdGVwOiB0cnVlLFxufTtcblxuY2xhc3MgRGlhbG9nQWRkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC4uLmluaXRhbFN0YXRlLFxuICAgIH07XG4gICAgdGhpcy5vbkJhY2sgPSB0aGlzLm9uQmFjay5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25OZXh0ID0gdGhpcy5vbk5leHQuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uUmVzZXRBbmRDbG9zZSA9IHRoaXMub25SZXNldEFuZENsb3NlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkFuaW1hdGlvbkVuZCA9IHRoaXMub25BbmltYXRpb25FbmQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uQmFjaygpIHtcbiAgICBjb25zdCB7IHN0ZXBzIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgb25DbG9zZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzdGVwQ291bnQgPSBzdGVwcy5sZW5ndGg7XG4gICAgaWYgKHN0ZXBDb3VudCA9PT0gMSkge1xuICAgICAgLy8gUmV0dXJuZWQgdG8gdGhlIGZpcnN0IHN0ZXBzLCBjbG9zZSB0aGUgZGlhbG9nXG4gICAgICB0aGlzLnNldFN0YXRlKHsgLi4uaW5pdGFsU3RhdGUgfSk7XG4gICAgICBvbkNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZXh0U3RlcHM6IFtcbiAgICAgICAgICAuLi5zdGVwcy5zbGljZSgwLCBzdGVwcy5sZW5ndGggLSAxKSxcbiAgICAgICAgXSxcbiAgICAgICAgc2hvd1N0ZXA6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25OZXh0KHN0ZXAgPSB7IHN0ZXBJZDogJycsIG9wdGlvbnM6IHt9IH0pIHtcbiAgICBjb25zdCB7IHN0ZXBzIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbmV4dFN0ZXBzOiBbXG4gICAgICAgIC4uLnN0ZXBzLCB7XG4gICAgICAgICAgLi4uc3RlcCxcbiAgICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBzaG93U3RlcDogZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBvblJlc2V0QW5kQ2xvc2UoKSB7XG4gICAgY29uc3QgeyBvbkNsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgIG9uQ2xvc2UoKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi5pbml0YWxTdGF0ZSB9KTtcbiAgICB9LCA1MDApO1xuICB9XG5cbiAgb25BbmltYXRpb25FbmQobm9kZSwgZG9uZSkge1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsICgpID0+IHtcbiAgICAgIGRvbmUoKTtcbiAgICAgIGNvbnN0IHsgbmV4dFN0ZXBzLCBzaG93U3RlcCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIGlmIChzaG93U3RlcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc3RlcHM6IFtcbiAgICAgICAgICAuLi5uZXh0U3RlcHMsXG4gICAgICAgIF0sXG4gICAgICAgIHNob3dTdGVwOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgc3RlcHMsIHNob3dTdGVwIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgb25DbG9zZSwgb3BlbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IG9uTmV4dCwgb25SZXNldEFuZENsb3NlLCBvbkFuaW1hdGlvbkVuZCB9ID0gdGhpcztcbiAgICByZXR1cm4gKFxuICAgICAgPERpYWxvZ0FuaW0gaW49e29wZW59PlxuICAgICAgICA8ZGl2IGlkPVwiZGlhbG9nLWFkZFwiID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpYWxvZy1oZWFkZXJcIj5cbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJtYWluLWNsb3NlLWJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IG9uQ2xvc2UoKX0+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+JiN4RTVDRDs8L2k+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXBzLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPFN0ZXBzXG4gICAgICAgICAgICAgIGxpc3Q9e3N0ZXBMaXN0fVxuICAgICAgICAgICAgICBzdGVwSGlzdG9yeT17c3RlcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlhbG9nLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPFJlcGxhY2VBbmltIGluPXtzaG93U3RlcH0gZW5kTGlzdGVuZXI9e29uQW5pbWF0aW9uRW5kfT5cbiAgICAgICAgICAgICAge2dldENvbnRlbnRUb1JlbmRlcihzdGVwcywgeyBvbk5leHQsIG9uQ2xvc2U6IG9uUmVzZXRBbmRDbG9zZSB9KX1cbiAgICAgICAgICAgIDwvUmVwbGFjZUFuaW0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaWFsb2ctZm9vdGVyXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGlkPVwiYmFjay1idXR0b24tZGlhbG9nXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1idXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uQmFjaygpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBORVZFUiBNSU5ELCBHTyBCQUNLXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0RpYWxvZ0FuaW0+XG4gICAgKTtcbiAgfVxufVxuXG5EaWFsb2dBZGQucHJvcFR5cGVzID0ge1xuICBvcGVuOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlhbG9nQWRkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNsYXNzIERvbmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHsgb25DbG9zZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgIG9uQ2xvc2UoKTtcbiAgICB9LCAzMDAwKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWRvbmUtYWRkXCI+XG4gICAgICAgIDxoMj5Eb25lITwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1pYy1kb25lXCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgc3JjPVwiaW1nL2ljLWRvbmUuc3ZnXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImljLWRvbmVcIlxuICAgICAgICAgICAgYWx0PVwiZG9uZSBpY29uXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRG9uZS5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEb25lO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCB7IEFERF9DQVRFR09SWSwgU0VMRUNUX0NBVEVHT1JZIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcblxuY29uc3QgU2VsZWN0QWN0aW9uQWRkID0gKHsgb25OZXh0IH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LXNlbGVjdC1hY3Rpb24tYWRkXCI+XG4gICAgPGgyPldoYXQgd291bGQgeW91IGxpa2UgdG8gYWRkPzwvaDI+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtLXNlbGVjdFwiPlxuICAgICAgPHBcbiAgICAgICAgY2xhc3NOYW1lPVwic2VsZWN0LXRpdGxlXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4gb25OZXh0KHsgc3RlcElkOiBBRERfQ0FURUdPUlksIG9wdGlvbnM6IHt9IH0pfVxuICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgID5cbiAgICAgICAgQ0FURUdPUllcbiAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW0tc2VsZWN0XCI+XG4gICAgICA8cFxuICAgICAgICBjbGFzc05hbWU9XCJzZWxlY3QtdGl0bGVcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk5leHQoeyBzdGVwSWQ6IFNFTEVDVF9DQVRFR09SWSwgb3B0aW9uczoge30gfSl9XG4gICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgPlxuICAgICAgICBBUkdVTUVOVFxuICAgICAgPC9wPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbik7XG5cblNlbGVjdEFjdGlvbkFkZC5wcm9wVHlwZXMgPSB7XG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdEFjdGlvbkFkZDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi9jb25zdGFudHMvbGFiZWxzJztcbmltcG9ydCBDYXRlZ29yeSBmcm9tICcuLi9DYXRlZ29yeSc7XG5pbXBvcnQgeyBBRERfQVJHVU1FTlQgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VJbmZvIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5cblxuY2xhc3MgU2VsZWN0Q2F0ZWdvcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VsZWN0ZWRDYXRlZ29yeTogdW5kZWZpbmVkLFxuICAgIH07XG4gICAgdGhpcy5vbkNhdGVnb3J5Q2xpY2sgPSB0aGlzLm9uQ2F0ZWdvcnlDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25CdXR0b25OZXh0Q2xpY2sgPSB0aGlzLm9uQnV0dG9uTmV4dENsaWNrLmJpbmQodGhpcyk7XG4gIH1cblxuICBvbkNhdGVnb3J5Q2xpY2soY2F0ZWdvcnkpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRDYXRlZ29yeTogY2F0ZWdvcnkgfSk7XG4gIH1cblxuICBvbkJ1dHRvbk5leHRDbGljaygpIHtcbiAgICBjb25zdCB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvbk5leHQsIGRpc3BhdGNoIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChzZWxlY3RlZENhdGVnb3J5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlSW5mbyhsYWJlbHMubXNnU2VsZWN0Q2F0ZWdvcnkpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25OZXh0KHsgc3RlcElkOiBBRERfQVJHVU1FTlQsIG9wdGlvbnM6IHsgc2VsZWN0ZWRDYXRlZ29yeSB9IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2F0ZWdvcmllc0xpc3QgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBzZWxlY3RlZENhdGVnb3J5IH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtc2VsZWN0LWNhdGVnb3J5XCI+XG4gICAgICAgIDxoMj5DaG9vc2UgYSBDQVRFR09SWTwvaDI+XG4gICAgICAgIDxkaXYgaWQ9XCJjb250ZW50LWNhdGVnb3JpZXNcIj5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBjYXRlZ29yaWVzTGlzdC5tYXAoY2F0ZWdvcnkgPT4gKFxuICAgICAgICAgICAgICAoY2F0ZWdvcnkuaWQgIT09ICcwJylcbiAgICAgICAgICAgICAgPyA8Q2F0ZWdvcnlcbiAgICAgICAgICAgICAgICBrZXk9e2NhdGVnb3J5LmlkfVxuICAgICAgICAgICAgICAgIGNhdGVnb3J5PXtjYXRlZ29yeX1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17c2VsZWN0ZWRDYXRlZ29yeSAhPT0gdW5kZWZpbmVkICYmIGNhdGVnb3J5LmlkID09PSBzZWxlY3RlZENhdGVnb3J5LmlkfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25DYXRlZ29yeUNsaWNrfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSlcbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4tYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25CdXR0b25OZXh0Q2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgTkVYVFxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuU2VsZWN0Q2F0ZWdvcnkucHJvcFR5cGVzID0ge1xuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY2F0ZWdvcmllc0xpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wID0gc3RhdGUgPT4gKFxuICB7XG4gICAgY2F0ZWdvcmllc0xpc3Q6IHN0YXRlLnRvZG9GaWx0ZXJzLmNhdGVnb3JpZXMsXG4gIH1cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3ApKFNlbGVjdENhdGVnb3J5KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBEYXRlUGlja2VyIGZyb20gJ3JlYWN0LWRhdGUtcGlja2VyJztcblxuaW1wb3J0IGxhYmVscyBmcm9tICcuLi8uLi9jb25zdGFudHMvbGFiZWxzJztcbmltcG9ydCB7IERPTkUgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuaW1wb3J0IHsgYWRkVGFzayB9IGZyb20gJy4uLy4uL2FjdGlvbnMvdGFza3NBY3Rpb25zJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5jbGFzcyBTZWxlY3RDb21wbGV0ZURhdGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdG9kb1dpdGhpbjogbmV3IERhdGUoKSxcbiAgICB9O1xuICAgIHRoaXMub25JbnB1dERhdGVDaGFuZ2UgPSB0aGlzLm9uSW5wdXREYXRlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkJ1dHRvbkFkZENsaWNrID0gdGhpcy5vbkJ1dHRvbkFkZENsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblRvZG9Bcmd1bWVudENyZWF0ZWQgPSB0aGlzLm9uVG9kb0FyZ3VtZW50Q3JlYXRlZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25JbnB1dERhdGVDaGFuZ2UoZGF0ZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyB0b2RvV2l0aGluOiBkYXRlIH0pO1xuICB9XG5cbiAgb25CdXR0b25BZGRDbGljaygpIHtcbiAgICBjb25zdCB7IHRvZG9XaXRoaW4gfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBkaXNwYXRjaCwgb3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgY2F0ZWdvcnkgfSA9IG9wdGlvbnM7XG4gICAgaWYgKCF0b2RvV2l0aGluIHx8IHRvZG9XaXRoaW4gPT09ICcnKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ1NlbGVjdERhdGUpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGlzcGF0Y2goYWRkVGFzayhcbiAgICAgIHRpdGxlLCBkZXNjcmlwdGlvbixcbiAgICAgIGNhdGVnb3J5LCB0b2RvV2l0aGluLCB0aGlzLm9uVG9kb0FyZ3VtZW50Q3JlYXRlZCxcbiAgICApKTtcbiAgfVxuXG4gIG9uVG9kb0FyZ3VtZW50Q3JlYXRlZCgpIHtcbiAgICBjb25zdCB7IG9uTmV4dCB9ID0gdGhpcy5wcm9wcztcbiAgICBvbk5leHQoeyBzdGVwSWQ6IERPTkUsIG9wdGlvbnM6IHsgfSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHRvZG9XaXRoaW4gfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1zZWxlY3QtY29tcGxldGUtZGF0ZVwiPlxuICAgICAgICA8aDI+VG9kbyBXaXRoaW48L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtaW5wdXRcIj5cbiAgICAgICAgICA8RGF0ZVBpY2tlclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICBjYWxlbmRhckNsYXNzTmFtZT1cImRhcmstY2FsZW5kYXJcIlxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dERhdGVDaGFuZ2V9XG4gICAgICAgICAgICB2YWx1ZT17dG9kb1dpdGhpbn1cbiAgICAgICAgICAgIG1pbkRhdGU9e25ldyBEYXRlKCl9XG4gICAgICAgICAgICBsb2NhbGU9XCJlbi1VU1wiXG4gICAgICAgICAgICBjbGVhckljb249ezxpIGNsYXNzTmFtZT1cImljb24tZGVsZXRlXCIgLz59XG4gICAgICAgICAgICBjYWxlbmRhckljb249ezxpIGNsYXNzTmFtZT1cImljb24tY2FsZW5kYXJcIiAvPn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQnV0dG9uQWRkQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgQUREXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TZWxlY3RDb21wbGV0ZURhdGUucHJvcFR5cGVzID0ge1xuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb3B0aW9uczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY2F0ZWdvcnk6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIH0pLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoKShTZWxlY3RDb21wbGV0ZURhdGUpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IFN0ZXAgPSAoeyBkZXNjcmlwdGlvbiwgY29tcGxldGVkLCBuZWVkTGluZSB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1jb250YWluZXJcIj5cbiAgICB7XG4gICAgICBuZWVkTGluZSAmJlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BsaW5lICR7KGNvbXBsZXRlZCkgPyAnY29tcGxldGVkJyA6ICcnfWB9IC8+XG4gICAgfVxuICAgIDxkaXYgY2xhc3NOYW1lPXtgc3RlcCAkeyhjb21wbGV0ZWQpID8gJ2NvbXBsZXRlZCcgOiAnJ31gfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5kaWNhdG9yXCIgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1kZXNjcmlwdGlvblwiPlxuICAgICAgICA8cD57ZGVzY3JpcHRpb259PC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuU3RlcC5wcm9wVHlwZXMgPSB7XG4gIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgbmVlZExpbmU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5jb25zdCBTdGVwcyA9ICh7IGxpc3QsIHN0ZXBIaXN0b3J5IH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJzdGVwcy13cmFwcGVyXCI+XG4gICAge1xuICAgICAgbGlzdC5tYXAoKGl0ZW0sIGkpID0+IChcbiAgICAgICAgPFN0ZXBcbiAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgey4uLml0ZW19XG4gICAgICAgICAgY29tcGxldGVkPXtzdGVwSGlzdG9yeS5maWx0ZXIoc2ggPT4gc2guc3RlcElkID09PSBpdGVtLmlkKS5sZW5ndGggPiAwfVxuICAgICAgICAgIG5lZWRMaW5lPXtpID4gMH1cbiAgICAgICAgLz4pKVxuICAgIH1cbiAgPC9kaXY+XG4pO1xuXG5TdGVwcy5wcm9wVHlwZXMgPSB7XG4gIGxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICBzdGVwSGlzdG9yeTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBzdGVwSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH0pKS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3RlcHM7XG4iLCJjb25zdCBsYWJlbHMgPSB7XG4gIG1zZ1RpdGxlUmVxdWlyZWQ6ICdFbnRlciB0aGUgdGl0bGUnLFxuICBtc2dOYW1lUmVxdWlyZWQ6ICdFbnRlciB0aGUgbmFtZScsXG4gIG1zZ1NlbGVjdENhdGVnb3J5OiAnU2VsZWN0IGEgY2F0ZWdvcnknLFxuICBtc2dTZWxlY3REYXRlOiAnUGljayBhIGRhdGUgYW5kIGNvbW1pdC4gTm8gZXhjdXNlcyEnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbGFiZWxzO1xuIiwiZXhwb3J0IGNvbnN0IFNFTEVDVF9XQU5UX1RPX0FERCA9ICdTRUxFQ1RfV0FOVF9UT19BREQnO1xuZXhwb3J0IGNvbnN0IEFERF9DQVRFR09SWSA9ICdBRERfQ0FURUdPUlknO1xuZXhwb3J0IGNvbnN0IEFERF9BUkdVTUVOVCA9ICdBRERfQVJHVU1FTlQnO1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9DQVRFR09SWSA9ICdTRUxFQ1RfQ0FURUdPUlknO1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9DT01QTEVURV9EQVRFID0gJ1NFTEVDVF9DT01QTEVURV9EQVRFJztcbmV4cG9ydCBjb25zdCBET05FID0gJ0RPTkUnO1xuXG5leHBvcnQgY29uc3Qgc3RlcExpc3QgPSBbXG4gIHtcbiAgICBpZDogU0VMRUNUX1dBTlRfVE9fQURELFxuICAgIGRlc2NyaXB0aW9uOiAnV2hhdCB3YW50IHRvIGFkZCcsXG4gIH0sXG4gIHtcbiAgICBpZDogQUREX0NBVEVHT1JZLFxuICAgIGRlc2NyaXB0aW9uOiAnQWRkIGEgY2F0ZWdvcnknLFxuICB9LFxuICB7XG4gICAgaWQ6IFNFTEVDVF9DQVRFR09SWSxcbiAgICBkZXNjcmlwdGlvbjogJ1NlbGVjdCBhIGNhdGVnb3J5JyxcbiAgfSxcbiAge1xuICAgIGlkOiBBRERfQVJHVU1FTlQsXG4gICAgZGVzY3JpcHRpb246ICdBZGQgQXJndW1lbnQnLFxuICB9LFxuICB7XG4gICAgaWQ6IFNFTEVDVF9DT01QTEVURV9EQVRFLFxuICAgIGRlc2NyaXB0aW9uOiAnU2NoZWR1bGUnLFxuICB9LFxuICB7XG4gICAgaWQ6IERPTkUsXG4gICAgZGVzY3JpcHRpb246ICdUaGF0XFwncyBpdCcsXG4gIH0sXG5dO1xuIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBDYXRlZ29yaWVzRmlsdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvQ2F0ZWdvcmllc0ZpbHRlcic7XG5pbXBvcnQge1xuICBzZWxlY3RDYXRlZ29yeSxcbiAgc2VsZWN0Q2F0ZWdvcnlBbGwsXG4gIGRlbGV0ZUNhdGVnb3J5LFxufSBmcm9tICcuLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5pbXBvcnQgY2F0ZWdvcnlBbGwgZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmltcG9ydCB7IGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0IH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgY2F0ZWdvcnlMaXN0OiBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdChzdGF0ZSksXG4gIH1cbik7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcbiAge1xuICAgIG9uRGVsZXRlQ2F0ZWdvcnk6IChjYXRlZ29yeSkgPT4ge1xuICAgICAgZGlzcGF0Y2goZGVsZXRlQ2F0ZWdvcnkoY2F0ZWdvcnkuaWQpKTtcbiAgICB9LFxuICAgIG9uQ2lsY2tDYXRlZ29yeTogKGNhdGVnb3J5LCBlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnaScgJiYgZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnYnV0dG9uJykge1xuICAgICAgICBpZiAoY2F0ZWdvcnkuaWQgPT09IGNhdGVnb3J5QWxsLmlkKSB7XG4gICAgICAgICAgZGlzcGF0Y2goc2VsZWN0Q2F0ZWdvcnlBbGwoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGlzcGF0Y2goc2VsZWN0Q2F0ZWdvcnkoY2F0ZWdvcnkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gIH1cbik7XG5cbmNvbnN0IENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIgPSBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbikoQ2F0ZWdvcmllc0ZpbHRlcik7XG5cbmV4cG9ydCBkZWZhdWx0IENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXI7XG4iLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFRhc2tzIGZyb20gJy4uL2NvbXBvbmVudHMvVGFza3MnO1xuaW1wb3J0IHtcbiAgZmV0Y2hUYXNrc0J5Q2F0ZWdvcnksXG4gIGRlbGV0ZVRhc2ssXG4gIHRvb2dsZVRhc2tDb21wbGV0ZWQsXG59IGZyb20gJy4uL2FjdGlvbnMvdGFza3NBY3Rpb25zJztcblxuaW1wb3J0IHsgZ2V0VGFza0xpc3QsIGdldFNraXAsIHN0aWxsTW9yZVRvTG9hZCB9IGZyb20gJy4uL3NlbGVjdG9ycy90YXNrc1NlbGVjdG9ycyc7XG5pbXBvcnQgeyBnZXRTZWxlY3RlZENhdGVnb3JpZXNJZCwgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICB0YXNrTGlzdDogZ2V0VGFza0xpc3Qoc3RhdGUpLFxuICAgIHNraXA6IGdldFNraXAoc3RhdGUpLFxuICAgIG1vcmVUb0xvYWQ6IHN0aWxsTW9yZVRvTG9hZChzdGF0ZSksXG4gICAgY2F0ZWdvcmllc0lkOiBnZXRTZWxlY3RlZENhdGVnb3JpZXNJZChzdGF0ZSksXG4gICAgY29tcGxldGVkOiB2aXNpYmlsaXR5T25seUNvbXBsZXRlZChzdGF0ZSksXG4gIH1cbik7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcbiAge1xuICAgIG9uRGVsZXRlQXJndW1lbnQ6ICh0YXNrKSA9PiB7XG4gICAgICBkaXNwYXRjaChkZWxldGVUYXNrKHRhc2suaWQpKTtcbiAgICB9LFxuICAgIG9uQ29tcGxldGVBcmd1bWVudDogKHRhc2spID0+IHtcbiAgICAgIGRpc3BhdGNoKHRvb2dsZVRhc2tDb21wbGV0ZWQodGFzay5pZCwgdGFzay5jb21wbGV0ZWQpKTtcbiAgICB9LFxuICAgIGZldGNoVGFza3M6IChjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCwgbGltaXQsIHNraXApID0+IHtcbiAgICAgIGRpc3BhdGNoKGZldGNoVGFza3NCeUNhdGVnb3J5KGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgc2tpcCkpO1xuICAgIH0sXG4gIH1cbik7XG5cbmNvbnN0IFRhc2tzQ29udGFpbmVyID0gY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pKFRhc2tzKTtcblxuZXhwb3J0IGRlZmF1bHQgVGFza3NDb250YWluZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IFRvZG9zIGZyb20gJy4uL2NvbXBvbmVudHMvVG9kb3MnO1xuaW1wb3J0IHsgZmV0Y2hBbGxDYXRlZ29yaWVzIH0gZnJvbSAnLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuaW1wb3J0IHsgaGlkZU1lc3NhZ2UgfSBmcm9tICcuLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcbmltcG9ydCB7IHNob3dMb2FkaW5nIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbW1vblNlbGVjdG9ycyc7XG5cbmNvbnN0IFRvZG9zQ29udGFpbmVyID0gcHJvcHMgPT4gPFRvZG9zIHsuLi5wcm9wc30gLz47XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IChcbiAge1xuICAgIG1lc3NhZ2U6IHN0YXRlLm1lc3NhZ2UsXG4gICAgc2hvd0xvYWRpbmc6IHNob3dMb2FkaW5nKHN0YXRlKSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgaGlkZU1lc3NhZ2U6ICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKGhpZGVNZXNzYWdlKCkpO1xuICAgIH0sXG4gICAgaW5pdEZldGNoQWxsQ2F0ZWdvcmllczogKCkgPT4ge1xuICAgICAgZGlzcGF0Y2goZmV0Y2hBbGxDYXRlZ29yaWVzKCkpO1xuICAgIH0sXG4gIH1cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFRvZG9zQ29udGFpbmVyKTtcbiIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlzaWJpbGl0eUZpbHRlcnMgZnJvbSAnLi4vY29tcG9uZW50cy9WaXNpYmlsaXR5RmlsdGVycyc7XG5pbXBvcnQgeyBjaGFuZ2VWaXNpYmlsaXR5IH0gZnJvbSAnLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuXG5pbXBvcnQgeyBnZXRWaXNpYmlsaXR5RmlsdGVyIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyOiBnZXRWaXNpYmlsaXR5RmlsdGVyKHN0YXRlKSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgb25WaXNpYmlsaXR5U3dpdGNoQ2xpY2s6IHZpc2liaWxpdHkgPT4gKCkgPT4gKFxuICAgICAgZGlzcGF0Y2goY2hhbmdlVmlzaWJpbGl0eSh2aXNpYmlsaXR5KSlcbiAgICApLFxuICB9XG4pO1xuXG5jb25zdCBWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyID0gY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pKFZpc2liaWxpdHlGaWx0ZXJzKTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lcjtcbiIsImltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHsgaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIgfSBmcm9tICcuL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcbmltcG9ydCB7IGlzRmV0Y2hpbmdUYXNrcyB9IGZyb20gJy4vdGFza3NTZWxlY3RvcnMnO1xuXG5leHBvcnQgY29uc3Qgc2hvd0xvYWRpbmcgPSBjcmVhdGVTZWxlY3RvcihcbiAgaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIsXG4gIGlzRmV0Y2hpbmdUYXNrcyxcbiAgKGlzRmV0Y2hpbmdDYXRlZ29yaWVzLCBpc0ZldGNoaW5nVG9kb3MpID0+IGlzRmV0Y2hpbmdDYXRlZ29yaWVzIHx8IGlzRmV0Y2hpbmdUb2Rvcyxcbik7XG5cbmV4cG9ydCBkZWZhdWx0IHNob3dMb2FkaW5nO1xuIiwiZXhwb3J0IGNvbnN0IGlzRmV0Y2hpbmdUYXNrcyA9IHN0YXRlID0+IHN0YXRlLnRhc2tzLmlzRmV0Y2hpbmc7XG5leHBvcnQgY29uc3QgZ2V0VGFza3MgPSBzdGF0ZSA9PiBzdGF0ZS50YXNrcztcbmV4cG9ydCBjb25zdCBnZXRUYXNrTGlzdCA9IHN0YXRlID0+IHN0YXRlLnRhc2tzLml0ZW1zO1xuZXhwb3J0IGNvbnN0IGdldFNraXAgPSBzdGF0ZSA9PiBzdGF0ZS50YXNrcy5za2lwO1xuZXhwb3J0IGNvbnN0IHN0aWxsTW9yZVRvTG9hZCA9IHN0YXRlID0+IHN0YXRlLnRhc2tzLm1vcmVUb0xvYWQ7XG4iLCJpbXBvcnQgeyBjcmVhdGVTZWxlY3RvciB9IGZyb20gJ3Jlc2VsZWN0JztcbmltcG9ydCB7IE9OTFlfQ09NUExFVEVEIH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBpc0ZldGNoaW5nQ2F0ZWdvcmllc0ZpbHRlciA9IHN0YXRlID0+IHN0YXRlLnRvZG9GaWx0ZXJzLmlzRmV0Y2hpbmc7XG5leHBvcnQgY29uc3QgZ2V0VG9kb0ZpbHRlcnMgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycztcbmV4cG9ydCBjb25zdCBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdCA9IHN0YXRlID0+IHN0YXRlLnRvZG9GaWx0ZXJzLmNhdGVnb3JpZXM7XG5leHBvcnQgY29uc3QgZ2V0VmlzaWJpbGl0eUZpbHRlciA9IHN0YXRlID0+IHN0YXRlLnRvZG9GaWx0ZXJzLnZpc2liaWxpdHk7XG5cbmV4cG9ydCBjb25zdCB2aXNpYmlsaXR5T25seUNvbXBsZXRlZCA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRWaXNpYmlsaXR5RmlsdGVyLFxuICB2aXNpYmlsaXR5ID0+IHZpc2liaWxpdHkgPT09IE9OTFlfQ09NUExFVEVELFxuKTtcblxuZXhwb3J0IGNvbnN0IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0ZpbHRlciA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdCxcbiAgY2F0ZWdvcmllcyA9PiBjYXRlZ29yaWVzLmZpbHRlcihjYXRlZ29yeSA9PiBjYXRlZ29yeS5zZWxlY3RlZCksXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QsXG4gIGNhdGVnb3JpZXMgPT4gY2F0ZWdvcmllcy5maWx0ZXIoY2F0ZWdvcnkgPT4gY2F0ZWdvcnkuc2VsZWN0ZWQpXG4gICAgLm1hcChjYXRlZ29yeUZpbHRlciA9PiBjYXRlZ29yeUZpbHRlci5pZCksXG4pO1xuIiwiLyogZXNsaW50IHF1b3RlLXByb3BzOiBbXCJlcnJvclwiLCBcImNvbnNpc3RlbnRcIl0gKi9cblxuZXhwb3J0IGNvbnN0IE1ldGhvZHMgPSB7XG4gIFBPU1Q6ICdQT1NUJyxcbiAgR0VUOiAnR0VUJyxcbiAgREVMRVRFOiAnREVMRVRFJyxcbiAgUEFUQ0g6ICdQQVRDSCcsXG59O1xuXG5jb25zdCBmdWxsVXJsID0gdXJsID0+IGAvYXBpLyR7dXJsfWA7XG5cbmNvbnN0IGJhc2VSZXF1ZXN0SW5pdCA9IHtcbiAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgaGVhZGVyczoge1xuICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gIH0sXG59O1xuXG5jb25zdCBjcmVhdGVQb3N0UmVxdWVzdCA9ICh1cmwsIG9wdGlvbnMgPSB7fSkgPT4gKFxuICBmZXRjaCh1cmwsIHtcbiAgICAuLi5iYXNlUmVxdWVzdEluaXQsXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkob3B0aW9ucyksXG4gIH0pXG4pO1xuXG5jb25zdCBjcmVhdGVHZXRSZXF1ZXN0ID0gKHVybCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGxldCBmaW5hbFVybCA9IGAke3VybH0/YDtcbiAgT2JqZWN0LmVudHJpZXMob3B0aW9ucykuZm9yRWFjaCgoW2tleSwgdmFsdWVdLCBwb2l0aW9uKSA9PiB7XG4gICAgZmluYWxVcmwgPSBgJHtmaW5hbFVybH0keyhwb2l0aW9uID4gMCkgPyAnJicgOiAnJ30ke2tleX09JHt2YWx1ZX1gO1xuICB9KTtcbiAgcmV0dXJuIGZldGNoKGZpbmFsVXJsLCB7XG4gICAgLi4uYmFzZVJlcXVlc3RJbml0LFxuICAgIG1ldGhvZDogJ0dFVCcsXG4gIH0pO1xufTtcblxuY29uc3QgY3JlYXRlRGVsZXRlUmVxdWVzdCA9ICh1cmwsIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgZmluYWxVcmwgPSBgJHt1cmx9LyR7b3B0aW9uc31gO1xuICByZXR1cm4gZmV0Y2goZmluYWxVcmwsIHtcbiAgICAuLi5iYXNlUmVxdWVzdEluaXQsXG4gICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVQYXRjaFJlcXVlc3QgPSAodXJsLCBvcHRpb25zID0ge30pID0+IChcbiAgZmV0Y2godXJsLCB7XG4gICAgLi4uYmFzZVJlcXVlc3RJbml0LFxuICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvcHRpb25zKSxcbiAgfSlcbik7XG5cbmNvbnN0IGNyZWF0ZVJlcXVlc3QgPSAodXJsLCBvcHRpb25zLCBtZXRob2QpID0+IHtcbiAgY29uc3QgZmluYWxVcmwgPSBmdWxsVXJsKHVybCk7XG4gIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgY2FzZSBNZXRob2RzLlBPU1Q6IHJldHVybiBjcmVhdGVQb3N0UmVxdWVzdChmaW5hbFVybCwgb3B0aW9ucyk7XG4gICAgY2FzZSBNZXRob2RzLkdFVDogcmV0dXJuIGNyZWF0ZUdldFJlcXVlc3QoZmluYWxVcmwsIG9wdGlvbnMpO1xuICAgIGNhc2UgTWV0aG9kcy5ERUxFVEU6IHJldHVybiBjcmVhdGVEZWxldGVSZXF1ZXN0KGZpbmFsVXJsLCBvcHRpb25zKTtcbiAgICBjYXNlIE1ldGhvZHMuUEFUQ0g6IHJldHVybiBjcmVhdGVQYXRjaFJlcXVlc3QoZmluYWxVcmwsIG9wdGlvbnMpO1xuICAgIGRlZmF1bHQ6IHJldHVybiBjcmVhdGVQb3N0UmVxdWVzdChmaW5hbFVybCwgb3B0aW9ucyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjYWxsQXBpID0gKHVybCwgb3B0aW9ucyA9IHt9LCBtZXRob2QgPSBNZXRob2RzLlBPU1QpID0+IChcbiAgY3JlYXRlUmVxdWVzdCh1cmwsIG9wdGlvbnMsIG1ldGhvZCkudGhlbihcbiAgICByZXNwb25zZSA9PiAocmVzcG9uc2Uub2sgP1xuICAgICAgcmVzcG9uc2UuanNvbigpIDpcbiAgICAgIFByb21pc2UucmVqZWN0KHJlc3BvbnNlLnRleHQoKSlcbiAgICApLFxuICAgIGVycm9yID0+IFByb21pc2UucmVqZWN0KGVycm9yKSxcbiAgKVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY2FsbEFwaTtcblxuIiwiaW1wb3J0IGRhdGVGb3JtYXQgZnJvbSAnZGF0ZWZvcm1hdCc7XG5cbmV4cG9ydCBjb25zdCB0b0pzRGF0ZSA9IChwYXJzZURhdGUgPSAnJykgPT5cbiAgbmV3IERhdGUocGFyc2VJbnQocGFyc2VEYXRlLnN1YnN0cig2KSwgMTApKTtcblxuZXhwb3J0IGNvbnN0IHRvU2ltcGxlRGF0ZUZvcm1hdCA9IGRhdGUgPT5cbiAgZGF0ZUZvcm1hdChkYXRlLCAnZGRkZCBkZCBtbW0geXl5eScpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==