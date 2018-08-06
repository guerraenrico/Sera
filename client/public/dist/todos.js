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

/***/ "./src/actions/todoArgumentsActions.js":
/*!*********************************************!*\
  !*** ./src/actions/todoArgumentsActions.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toogleTodoArgumentCompleted = exports.addTodoArgument = exports.deleteTodoArgument = exports.fetchTodoArgumentsByCategory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ApiUtils = __webpack_require__(/*! ../utils/ApiUtils */ "./src/utils/ApiUtils.js");

var _actionTypes = __webpack_require__(/*! ../constants/actionTypes */ "./src/constants/actionTypes.js");

var _config = __webpack_require__(/*! ../constants/config */ "./src/constants/config.js");

var _messageActions = __webpack_require__(/*! ./messageActions */ "./src/actions/messageActions.js");

var _Common = __webpack_require__(/*! ../utils/Common */ "./src/utils/Common.js");

var requestFetchArguments = function requestFetchArguments(limit, skip) {
  return {
    type: _actionTypes.REQUEST_FETCH_ARGUMENTS,
    limit: limit,
    skip: skip
  };
};

var receiveFetchArguments = function receiveFetchArguments(todoArguments) {
  return {
    type: _actionTypes.RECEIVE_FETCH_ARGUMENTS,
    todoArguments: todoArguments
  };
};

var errorFetchArguments = function errorFetchArguments(error) {
  return {
    type: _actionTypes.ERROR_FETCH_ARGUMENTS,
    error: error
  };
};

var addArgumentLocal = function addArgumentLocal(todoArgument) {
  return {
    type: _actionTypes.ADD_ARGUMENT_LOCAL,
    todoArgument: todoArgument
  };
};

var removeArgumentLocal = function removeArgumentLocal(todoArgumentIndex) {
  return {
    type: _actionTypes.REMOVE_ARGUMENT_LOCAL,
    todoArgumentIndex: todoArgumentIndex
  };
};

var updateArgumentLocal = function updateArgumentLocal(todoArgument) {
  return {
    type: _actionTypes.UPDATE_ARGUMENT_LOCAL,
    todoArgument: todoArgument
  };
};

var fetchTodoArgumentsByCategory = exports.fetchTodoArgumentsByCategory = function fetchTodoArgumentsByCategory() {
  var categoriesId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var completed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _config.queryItemsLimit;
  var skip = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  return function (dispatch) {
    dispatch(requestFetchArguments(limit, skip));
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
        dispatch(receiveFetchArguments(todos));
      } else {
        dispatch(errorFetchArguments(response.messageError));
      }
    }, function (error) {
      return { error: error };
    });
  };
};

var deleteTodoArgument = exports.deleteTodoArgument = function deleteTodoArgument() {
  var todoArgumentId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return function (dispatch, getState) {
    var request = (0, _ApiUtils.callApi)('tasks', todoArgumentId, _ApiUtils.Methods.DELETE);
    return request.then(function (response) {
      if (response.success) {
        var items = getState().todoArguments.items;

        var todoArgumentIndex = items.findIndex(function (todoArgument) {
          return todoArgument.id === todoArgumentId;
        });
        dispatch(removeArgumentLocal(todoArgumentIndex));
      } else {
        dispatch((0, _messageActions.showMessageError)(response.messageError));
      }
    }, function (error) {
      return { error: error };
    });
  };
};

var addTodoArgument = exports.addTodoArgument = function addTodoArgument() {
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
        dispatch(addArgumentLocal(todo));
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

var toogleTodoArgumentCompleted = exports.toogleTodoArgumentCompleted = function toogleTodoArgumentCompleted() {
  var todoArgumentId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var completed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function (dispatch) {
    var request = (0, _ApiUtils.callApi)('/toogle-argument-completed', { todoArgumentId: todoArgumentId, completed: completed });
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

var _todoArgumentsActions = __webpack_require__(/*! ./todoArgumentsActions */ "./src/actions/todoArgumentsActions.js");

var _messageActions = __webpack_require__(/*! ./messageActions */ "./src/actions/messageActions.js");

var _todoFiltersSelectors = __webpack_require__(/*! ../selectors/todoFiltersSelectors */ "./src/selectors/todoFiltersSelectors.js");

var fetchArguments = function fetchArguments(state) {
  return (0, _todoArgumentsActions.fetchTodoArgumentsByCategory)((0, _todoFiltersSelectors.getSelectedCategoriesId)(state), (0, _todoFiltersSelectors.visibilityOnlyCompleted)(state));
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
        dispatch((0, _todoArgumentsActions.fetchTodoArgumentsByCategory)((0, _todoFiltersSelectors.getSelectedCategoriesId)(getState())));
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

/***/ "./src/components/TodoArgument.jsx":
/*!*****************************************!*\
  !*** ./src/components/TodoArgument.jsx ***!
  \*****************************************/
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

var TodoArgument = function (_React$Component) {
  _inherits(TodoArgument, _React$Component);

  function TodoArgument(props) {
    _classCallCheck(this, TodoArgument);

    var _this = _possibleConstructorReturn(this, (TodoArgument.__proto__ || Object.getPrototypeOf(TodoArgument)).call(this, props));

    _this.state = {
      collapsed: false
    };
    _this.renderDate = _this.renderDate.bind(_this);
    return _this;
  }

  _createClass(TodoArgument, [{
    key: 'onTitleClick',
    value: function onTitleClick() {
      var collapsed = this.state.collapsed;

      this.setState({ collapsed: !collapsed });
    }
  }, {
    key: 'renderDate',
    value: function renderDate() {
      var argument = this.props.argument;

      if (argument.completed) {
        return _react2.default.createElement(
          'p',
          { className: 'complete-date' },
          'completed ' + (argument.completedAt ? (0, _Common.toSimpleDateFormat)(argument.completedAt) : '')
        );
      }
      return _react2.default.createElement(
        'p',
        { className: 'complete-within-date' },
        'to complete within ' + (argument.todoWithin ? (0, _Common.toSimpleDateFormat)(argument.todoWithin) : 'not set')
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          argument = _props.argument,
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
              className: 'argument-title ' + (argument.completed ? 'argument-title-completed' : ''),
              onClick: function onClick() {
                return _this2.onTitleClick();
              },
              role: 'presentation'
            },
            argument.title
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
            completed: argument.completed
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
            { key: argument.description, className: 'argument-body' },
            _react2.default.createElement(
              'p',
              { className: 'argument-description' },
              argument.description !== undefined && argument.description !== '' ? argument.description : _react2.default.createElement(
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

  return TodoArgument;
}(_react2.default.Component);

TodoArgument.propTypes = {
  onDelete: _propTypes2.default.func,
  onComplete: _propTypes2.default.func,
  argument: _propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string.isRequired,
    completed: _propTypes2.default.bool.isRequired,
    completedAt: _propTypes2.default.shape({})
  }).isRequired
};

TodoArgument.defaultProps = {
  onDelete: undefined,
  onComplete: undefined
};

exports.default = TodoArgument;

/***/ }),

/***/ "./src/components/TodoArguments.jsx":
/*!******************************************!*\
  !*** ./src/components/TodoArguments.jsx ***!
  \******************************************/
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

var _TodoArgument = __webpack_require__(/*! ./TodoArgument */ "./src/components/TodoArgument.jsx");

var _TodoArgument2 = _interopRequireDefault(_TodoArgument);

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

var TodoArguments = function (_React$Component) {
  _inherits(TodoArguments, _React$Component);

  function TodoArguments(props) {
    _classCallCheck(this, TodoArguments);

    var _this = _possibleConstructorReturn(this, (TodoArguments.__proto__ || Object.getPrototypeOf(TodoArguments)).call(this, props));

    _this.state = initialState;
    _this.onFetchTodoArgumentsNext = _this.onFetchTodoArgumentsNext.bind(_this);
    return _this;
  }

  _createClass(TodoArguments, [{
    key: 'onFetchTodoArgumentsNext',
    value: function onFetchTodoArgumentsNext() {
      var _props = this.props,
          categoriesId = _props.categoriesId,
          completed = _props.completed,
          fetchTodoArguments = _props.fetchTodoArguments,
          moreToLoad = _props.moreToLoad;

      if (!moreToLoad) {
        return;
      }
      var _state = this.state,
          limit = _state.limit,
          skip = _state.skip;

      var newSkip = skip + limit;
      this.setState({ skip: newSkip });
      fetchTodoArguments(categoriesId, completed, limit, newSkip);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          listTodoArguments = _props2.listTodoArguments,
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
            listTodoArguments.map(function (arg) {
              return _react2.default.createElement(
                _Resize2.default,
                { key: arg.id },
                _react2.default.createElement(_TodoArgument2.default, {
                  key: arg.id,
                  argument: arg,
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

  return TodoArguments;
}(_react2.default.Component);

TodoArguments.propTypes = {
  onDeleteArgument: _propTypes2.default.func.isRequired,
  onCompleteArgument: _propTypes2.default.func.isRequired,
  listTodoArguments: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string.isRequired,
    completed: _propTypes2.default.bool.isRequired
  }).isRequired).isRequired,
  moreToLoad: _propTypes2.default.bool.isRequired,
  fetchTodoArguments: _propTypes2.default.func.isRequired,
  categoriesId: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  completed: _propTypes2.default.bool.isRequired
};

exports.default = TodoArguments;

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

var _TodoArgumentsContainer = __webpack_require__(/*! ../containers/TodoArgumentsContainer */ "./src/containers/TodoArgumentsContainer.jsx");

var _TodoArgumentsContainer2 = _interopRequireDefault(_TodoArgumentsContainer);

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
        _react2.default.createElement(_TodoArgumentsContainer2.default, null),
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

var _todoArgumentsActions = __webpack_require__(/*! ../../actions/todoArgumentsActions */ "./src/actions/todoArgumentsActions.js");

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
      dispatch((0, _todoArgumentsActions.addTodoArgument)(title, description, category, todoWithin, this.onTodoArgumentCreated));
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

/***/ "./src/containers/TodoArgumentsContainer.jsx":
/*!***************************************************!*\
  !*** ./src/containers/TodoArgumentsContainer.jsx ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _TodoArguments = __webpack_require__(/*! ../components/TodoArguments */ "./src/components/TodoArguments.jsx");

var _TodoArguments2 = _interopRequireDefault(_TodoArguments);

var _todoArgumentsActions = __webpack_require__(/*! ../actions/todoArgumentsActions */ "./src/actions/todoArgumentsActions.js");

var _todoArgumentsSelectors = __webpack_require__(/*! ../selectors/todoArgumentsSelectors */ "./src/selectors/todoArgumentsSelectors.js");

var _todoFiltersSelectors = __webpack_require__(/*! ../selectors/todoFiltersSelectors */ "./src/selectors/todoFiltersSelectors.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    listTodoArguments: (0, _todoArgumentsSelectors.getTodoArgumentsList)(state),
    skip: (0, _todoArgumentsSelectors.getSkip)(state),
    moreToLoad: (0, _todoArgumentsSelectors.stillMoreToLoad)(state),
    categoriesId: (0, _todoFiltersSelectors.getSelectedCategoriesId)(state),
    completed: (0, _todoFiltersSelectors.visibilityOnlyCompleted)(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onDeleteArgument: function onDeleteArgument(argument) {
      dispatch((0, _todoArgumentsActions.deleteTodoArgument)(argument.id));
    },
    onCompleteArgument: function onCompleteArgument(argument) {
      dispatch((0, _todoArgumentsActions.toogleTodoArgumentCompleted)(argument.id, argument.completed));
    },
    fetchTodoArguments: function fetchTodoArguments(categoriesId, completed, limit, skip) {
      dispatch((0, _todoArgumentsActions.fetchTodoArgumentsByCategory)(categoriesId, completed, limit, skip));
    }
  };
};

var TodoArgumentsContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_TodoArguments2.default);

exports.default = TodoArgumentsContainer;

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

var _todoArgumentsSelectors = __webpack_require__(/*! ./todoArgumentsSelectors */ "./src/selectors/todoArgumentsSelectors.js");

var showLoading = exports.showLoading = (0, _reselect.createSelector)(_todoFiltersSelectors.isFetchingCategoriesFilter, _todoArgumentsSelectors.isFetchingTodoArguments, function (isFetchingCategories, isFetchingTodos) {
  return isFetchingCategories || isFetchingTodos;
});

exports.default = showLoading;

/***/ }),

/***/ "./src/selectors/todoArgumentsSelectors.js":
/*!*************************************************!*\
  !*** ./src/selectors/todoArgumentsSelectors.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var isFetchingTodoArguments = exports.isFetchingTodoArguments = function isFetchingTodoArguments(state) {
  return state.todoArguments.isFetching;
};
var getTodoArguments = exports.getTodoArguments = function getTodoArguments(state) {
  return state.todoArguments;
};
var getTodoArgumentsList = exports.getTodoArgumentsList = function getTodoArgumentsList(state) {
  return state.todoArguments.items;
};
var getSkip = exports.getSkip = function getSkip(state) {
  return state.todoArguments.skip;
};
var stillMoreToLoad = exports.stillMoreToLoad = function stillMoreToLoad(state) {
  return state.todoArguments.moreToLoad;
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
  DELETE: 'DELETE'
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

var createRequest = function createRequest(url, options, method) {
  var finalUrl = fullUrl(url);
  switch (method) {
    case Methods.POST:
      return createPostRequest(finalUrl, options);
    case Methods.GET:
      return createGetRequest(finalUrl, options);
    case Methods.DELETE:
      return createDeleteRequest(finalUrl, options);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy9tZXNzYWdlQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy90b2RvQXJndW1lbnRzQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQnV0dG9uQ29tcGxldGVBcmd1bWVudC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQnV0dG9uRGVsZXRlQXJndW1lbnQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0J1dHRvbkRlbGV0ZUNhdGVnb3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CdXR0b25TY29sbC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2F0ZWdvcmllc0ZpbHRlci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2F0ZWdvcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0luZmluaXRlU2Nyb2xsLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9NYWluQWRkQnV0dG9uLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9TbmFja2Jhci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVG9kb0FyZ3VtZW50LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ub2RvQXJndW1lbnRzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ub2Rvcy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVmlzaWJpbGl0eUZpbHRlcnMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Zpc2liaWxpdHlTd2l0Y2guanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FuaW1zL0NvbGxhcHNlLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9EaWFsb2dBbmltLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9SZXBsYWNlQW5pbS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvUmVzaXplLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9TbmFja2JhckFuaW0uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9BZGRDYXRlZ29yeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0FkZFRvZG9Bcmd1bWVudC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0RpYWxvZ0FkZC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0RvbmUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9TZWxlY3RBY3Rpb25BZGQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9TZWxlY3RDYXRlZ29yeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL1NlbGVjdENvbXBsZXRlRGF0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL1N0ZXBzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2xhYmVscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL3N0ZXBzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL0NhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL1RvZG9Bcmd1bWVudHNDb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL1RvZG9zQ29udGFpbmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9WaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0b3JzL2NvbW1vblNlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0b3JzL3RvZG9Bcmd1bWVudHNTZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvQXBpVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL0NvbW1vbi5qcyJdLCJuYW1lcyI6WyJzaG93TWVzc2FnZUluZm8iLCJ0eXBlIiwiU0hPV19NRVNTQUdFX0lORk8iLCJtZXNzYWdlIiwic2hvd01lc3NhZ2VFcnJvciIsIlNIT1dfTUVTU0FHRV9FUlJPUiIsImhpZGVNZXNzYWdlIiwiSElERV9NRVNTQUdFIiwicmVxdWVzdEZldGNoQXJndW1lbnRzIiwibGltaXQiLCJza2lwIiwiUkVRVUVTVF9GRVRDSF9BUkdVTUVOVFMiLCJyZWNlaXZlRmV0Y2hBcmd1bWVudHMiLCJSRUNFSVZFX0ZFVENIX0FSR1VNRU5UUyIsInRvZG9Bcmd1bWVudHMiLCJlcnJvckZldGNoQXJndW1lbnRzIiwiRVJST1JfRkVUQ0hfQVJHVU1FTlRTIiwiZXJyb3IiLCJhZGRBcmd1bWVudExvY2FsIiwiQUREX0FSR1VNRU5UX0xPQ0FMIiwidG9kb0FyZ3VtZW50IiwicmVtb3ZlQXJndW1lbnRMb2NhbCIsIlJFTU9WRV9BUkdVTUVOVF9MT0NBTCIsInRvZG9Bcmd1bWVudEluZGV4IiwidXBkYXRlQXJndW1lbnRMb2NhbCIsIlVQREFURV9BUkdVTUVOVF9MT0NBTCIsImZldGNoVG9kb0FyZ3VtZW50c0J5Q2F0ZWdvcnkiLCJjYXRlZ29yaWVzSWQiLCJjb21wbGV0ZWQiLCJxdWVyeUl0ZW1zTGltaXQiLCJkaXNwYXRjaCIsInJlcXVlc3QiLCJNZXRob2RzIiwiR0VUIiwidGhlbiIsInJlc3BvbnNlIiwic3VjY2VzcyIsInRvZG9zIiwiZGF0YSIsIm1hcCIsInRvZG8iLCJjb21wbGV0ZWRBdCIsInVuZGVmaW5lZCIsInRvZG9XaXRoaW4iLCJtZXNzYWdlRXJyb3IiLCJkZWxldGVUb2RvQXJndW1lbnQiLCJ0b2RvQXJndW1lbnRJZCIsImdldFN0YXRlIiwiREVMRVRFIiwiaXRlbXMiLCJmaW5kSW5kZXgiLCJpZCIsImFkZFRvZG9Bcmd1bWVudCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJjYXRlZ29yeSIsImNhbGxiYWNrIiwiY2F0ZWdvcnlJZCIsIlBPU1QiLCJ0b29nbGVUb2RvQXJndW1lbnRDb21wbGV0ZWQiLCJmZXRjaEFyZ3VtZW50cyIsInN0YXRlIiwicmVxdWVzdEZldGNoQWxsQ2F0ZWdvcmllcyIsIlJFUVVFU1RfRkVUQ0hfQUxMX0NBVEVHT1JJRVMiLCJyZWNlaXZlRmV0Y2hBbGxDYXRlZ29yaWVzIiwiUkVDRUlWRV9GRVRDSF9BTExfQ0FURUdPUklFUyIsImNhdGVnb3JpZXMiLCJlcnJvckZldGNoQWxsQ2F0ZWdvcmllcyIsIkVSUk9SX0ZFVENIX0FMTF9DQVRFR09SSUVTIiwiYWRkQ2F0ZWdvcnlMb2NhbCIsIkFERF9DQVRFR09SWV9MT0NBTCIsInJlbW92ZUNhdGVnb3J5TG9jYWwiLCJSRU1PVkVfQ0FURUdPUllfTE9DQUwiLCJjYXRlZ29yeUluZGV4IiwidG9vZ2xlU2VsZWN0Q2F0ZWdvcnkiLCJUT09HTEVfU0VMRUNUX0NBVEVHT1JZIiwic2VsZWN0ZWRDYXRlZ29yeSIsInRvb2dsZVNlbGVjdENhdGVnb3J5QWxsIiwiVE9PR0xFX1NFTEVDVF9DQVRFR09SWV9BTEwiLCJzd2l0Y2hWaXNpYmlsaXR5RmlsdGVyIiwiU1dJVENIX1ZJU0lCSUxJVFlfRklMVEVSIiwidmlzaWJpbGl0eSIsImZldGNoQWxsQ2F0ZWdvcmllcyIsImRlbGV0ZUNhdGVnb3J5IiwidG9kb0ZpbHRlcnMiLCJhZGRDYXRlZ29yeSIsIm5hbWUiLCJjaGFuZ2VWaXNpYmlsaXR5Iiwic2VsZWN0Q2F0ZWdvcnkiLCJzZWxlY3RDYXRlZ29yeUFsbCIsIkJ1dHRvbkNvbXBsZXRlQXJndW1lbnQiLCJvbkNsaWNrIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJib29sIiwiZGVmYXVsdFByb3BzIiwiQnV0dG9uRGVsZXRlQXJndW1lbnQiLCJCdXR0b25EZWxldGVDYXRlZ29yeSIsIkJ1dHRvblNjcm9sbCIsImRpcmVjdGlvbiIsIm9uZU9mIiwiQ2F0ZWdvcmllc0ZpbHRlciIsInByb3BzIiwiY2hpcHMiLCJoYW5kbGVMZWZ0U2Nyb2xsQ2xpY2siLCJiaW5kIiwiaGFuZGxlUmlnaHRTY3JvbGxDbGljayIsIm1vdmVDaGlwc1Njcm9sbCIsImNsaWVudFdpZHRoIiwiZGVsdGEiLCJuZXh0U2Nyb2xsTGVmdCIsInNjcm9sbExlZnQiLCJzY3JvbGwiLCJsZWZ0IiwiY2F0ZWdvcnlMaXN0Iiwib25EZWxldGVDYXRlZ29yeSIsIm9uQ2lsY2tDYXRlZ29yeSIsIm5vZGUiLCJkaXNwbGF5IiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJzZWxlY3RlZCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiYXJyYXlPZiIsInNoYXBlIiwic3RyaW5nIiwiQ2F0ZWdvcnkiLCJvbkRlbGV0ZSIsImNzc0NsYXNzIiwib25DaGlwQ2xpY2siLCJlIiwib25EZWxldGVDbGljayIsIndhaXRUaW1lIiwiSW5maW5pdGVTY3JvbGwiLCJvblNjcm9sbCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaW5uZXJIZWlnaHQiLCJzY3JvbGxZIiwiZG9jdW1lbnQiLCJib2R5Iiwib2Zmc2V0SGVpZ2h0IiwiYXJncyIsImNoaWxkcmVuIiwiY2xhc3NOYW1lIiwiYW55IiwiTWFpbkFkZEJ1dHRvbiIsIkFjdGlvbiIsInRleHQiLCJTbmFja2JhciIsIm9uQ2xvc2UiLCJkdXJhdGlvbiIsInNob3ciLCJzZXRUaW1lb3V0IiwiaXNFcnJvciIsImFjdGlvblRleHQiLCJhY3Rpb25DbGljayIsInZlcnRpY2FsUG9zdGlvbiIsImhvcml6b250YWxQb3NpdGlvbiIsIm51bWJlciIsIlRvZG9Bcmd1bWVudCIsImNvbGxhcHNlZCIsInJlbmRlckRhdGUiLCJzZXRTdGF0ZSIsImFyZ3VtZW50Iiwib25Db21wbGV0ZSIsIm9uVGl0bGVDbGljayIsImluaXRpYWxTdGF0ZSIsIlRvZG9Bcmd1bWVudHMiLCJvbkZldGNoVG9kb0FyZ3VtZW50c05leHQiLCJmZXRjaFRvZG9Bcmd1bWVudHMiLCJtb3JlVG9Mb2FkIiwibmV3U2tpcCIsImxpc3RUb2RvQXJndW1lbnRzIiwib25EZWxldGVBcmd1bWVudCIsIm9uQ29tcGxldGVBcmd1bWVudCIsImFyZyIsIm5leHRQcm9wcyIsInByZXZTdGF0ZSIsIlRvZG9zIiwiaXNEaWFsb2dBZGRPcGVuIiwiaW5pdEZldGNoQWxsQ2F0ZWdvcmllcyIsInNob3dMb2FkaW5nIiwiVmlzaWJpbGl0eUZpbHRlciIsInNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciIsIm9uVmlzaWJpbGl0eVN3aXRjaENsaWNrIiwiT05MWV9UT19DT01QTEVURSIsIkFMTF9UT0RPUyIsIk9OTFlfQ09NUExFVEVEIiwiVmlzaWJpbGl0eVN3aXRjaCIsImRlZmF1bHRTdHlsZSIsInRyYW5zaXRpb24iLCJoZWlnaHQiLCJvbkVudGVyIiwic3R5bGUiLCJmaXJzdEVsZW1lbnRDaGlsZCIsIm9uRXhpdCIsIkNvbGxhcHNlIiwiaW5Qcm9wIiwiaW4iLCJvcGFjaXR5IiwidHJhbnNpdGlvblN0eWxlcyIsImVudGVyaW5nIiwiZW50ZXJlZCIsIkRpYWxvZ0FuaW0iLCJ3aWR0aCIsImVudGVyIiwiUmVwbGFjZUFuaW0iLCJlbmRMaXN0ZW5lciIsImV4aXQiLCJvbkVudGVyZWQiLCJvbkV4aXRlZCIsIlJlc2l6ZSIsImJvdHRvbSIsIlNuYWNrYmFyQW5pbSIsImN1c3RvbUNsYXNzIiwiQWRkQ2F0ZWdvcnkiLCJvbklucHV0VGV4dENoYW5nZSIsIm9uQnV0dG9uQWRkQ2xpY2siLCJvbkNhdGVnb3J5Q3JlYXRlZCIsInRhcmdldCIsInZhbHVlIiwibGFiZWxzIiwibXNnTmFtZVJlcXVpcmVkIiwib25OZXh0Iiwic3RlcElkIiwiQUREX0FSR1VNRU5UIiwib3B0aW9ucyIsIkFkZFRvZG9Bcmd1bWVudCIsIm9uQnV0dG9uU2NoZWR1bGVDbGljayIsIm1zZ1RpdGxlUmVxdWlyZWQiLCJTRUxFQ1RfQ09NUExFVEVfREFURSIsImdldENvbnRlbnRUb1JlbmRlciIsInN0ZXBzIiwibGVuZ3RoIiwibGFzdFN0ZXAiLCJTRUxFQ1RfV0FOVF9UT19BREQiLCJBRERfQ0FURUdPUlkiLCJTRUxFQ1RfQ0FURUdPUlkiLCJET05FIiwiaW5pdGFsU3RhdGUiLCJuZXh0U3RlcHMiLCJzaG93U3RlcCIsIkRpYWxvZ0FkZCIsIm9uQmFjayIsIm9uUmVzZXRBbmRDbG9zZSIsIm9uQW5pbWF0aW9uRW5kIiwic3RlcENvdW50Iiwic2xpY2UiLCJzdGVwIiwiY29tcGxldGUiLCJkb25lIiwib3BlbiIsInN0ZXBMaXN0IiwiRG9uZSIsIlNlbGVjdEFjdGlvbkFkZCIsIlNlbGVjdENhdGVnb3J5Iiwib25DYXRlZ29yeUNsaWNrIiwib25CdXR0b25OZXh0Q2xpY2siLCJtc2dTZWxlY3RDYXRlZ29yeSIsImNhdGVnb3JpZXNMaXN0IiwibWFwU3RhdGVUb1Byb3AiLCJTZWxlY3RDb21wbGV0ZURhdGUiLCJEYXRlIiwib25JbnB1dERhdGVDaGFuZ2UiLCJvblRvZG9Bcmd1bWVudENyZWF0ZWQiLCJkYXRlIiwibXNnU2VsZWN0RGF0ZSIsIlN0ZXAiLCJuZWVkTGluZSIsIlN0ZXBzIiwibGlzdCIsInN0ZXBIaXN0b3J5IiwiaXRlbSIsImkiLCJmaWx0ZXIiLCJzaCIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImNhdGVnb3J5QWxsIiwiQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lciIsIlRvZG9Bcmd1bWVudHNDb250YWluZXIiLCJUb2Rvc0NvbnRhaW5lciIsIlZpc2liaWxpdHlGaWx0ZXJDb250YWluZXIiLCJWaXNpYmlsaXR5RmlsdGVycyIsImlzRmV0Y2hpbmdDYXRlZ29yaWVzRmlsdGVyIiwiaXNGZXRjaGluZ1RvZG9Bcmd1bWVudHMiLCJpc0ZldGNoaW5nQ2F0ZWdvcmllcyIsImlzRmV0Y2hpbmdUb2RvcyIsImlzRmV0Y2hpbmciLCJnZXRUb2RvQXJndW1lbnRzIiwiZ2V0VG9kb0FyZ3VtZW50c0xpc3QiLCJnZXRTa2lwIiwic3RpbGxNb3JlVG9Mb2FkIiwiZ2V0VG9kb0ZpbHRlcnMiLCJnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdCIsImdldFZpc2liaWxpdHlGaWx0ZXIiLCJ2aXNpYmlsaXR5T25seUNvbXBsZXRlZCIsImdldFNlbGVjdGVkQ2F0ZWdvcmllc0ZpbHRlciIsImdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkIiwiY2F0ZWdvcnlGaWx0ZXIiLCJmdWxsVXJsIiwidXJsIiwiYmFzZVJlcXVlc3RJbml0IiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwiY3JlYXRlUG9zdFJlcXVlc3QiLCJmZXRjaCIsIm1ldGhvZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjcmVhdGVHZXRSZXF1ZXN0IiwiZmluYWxVcmwiLCJPYmplY3QiLCJlbnRyaWVzIiwiZm9yRWFjaCIsInBvaXRpb24iLCJrZXkiLCJjcmVhdGVEZWxldGVSZXF1ZXN0IiwiY3JlYXRlUmVxdWVzdCIsImNhbGxBcGkiLCJvayIsImpzb24iLCJQcm9taXNlIiwicmVqZWN0IiwidG9Kc0RhdGUiLCJwYXJzZURhdGUiLCJwYXJzZUludCIsInN1YnN0ciIsInRvU2ltcGxlRGF0ZUZvcm1hdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFNTyxJQUFNQSw0Q0FBa0IsU0FBbEJBLGVBQWtCO0FBQUEsU0FDN0I7QUFDRUMsVUFBTUMsOEJBRFI7QUFFRUM7QUFGRixHQUQ2QjtBQUFBLENBQXhCOztBQU9BLElBQU1DLDhDQUFtQixTQUFuQkEsZ0JBQW1CO0FBQUEsU0FDOUI7QUFDRUgsVUFBTUksK0JBRFI7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LE1BQU03RSxPQUFOLHVFQUFnQixFQUFoQjtBQUFBLE1BQW9CbUYsTUFBcEIsdUVBQTZCMVIsUUFBUTBCLElBQXJDO0FBQUEsU0FDckIyUSxjQUFjakIsR0FBZCxFQUFtQjdFLE9BQW5CLEVBQTRCbUYsTUFBNUIsRUFBb0N4UixJQUFwQyxDQUNFO0FBQUEsV0FBYUMsU0FBU29TLEVBQVQsR0FDWHBTLFNBQVNxUyxJQUFULEVBRFcsR0FFWEMsUUFBUUMsTUFBUixDQUFldlMsU0FBU3FILElBQVQsRUFBZixDQUZGO0FBQUEsR0FERixFQUtFO0FBQUEsV0FBU2lMLFFBQVFDLE1BQVIsQ0FBZXpULEtBQWYsQ0FBVDtBQUFBLEdBTEYsQ0FEcUI7QUFBQSxDQUFoQjs7a0JBVVFxVCxPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEVmOzs7Ozs7QUFFTyxJQUFNSyw4QkFBVyxTQUFYQSxRQUFXO0FBQUEsTUFBQ0MsU0FBRCx1RUFBYSxFQUFiO0FBQUEsU0FDdEIsSUFBSWpFLElBQUosQ0FBU2tFLFNBQVNELFVBQVVFLE1BQVYsQ0FBaUIsQ0FBakIsQ0FBVCxFQUE4QixFQUE5QixDQUFULENBRHNCO0FBQUEsQ0FBakI7O0FBR0EsSUFBTUMsa0RBQXFCLFNBQXJCQSxrQkFBcUI7QUFBQSxTQUNoQywwQkFBV2pFLElBQVgsRUFBaUIsa0JBQWpCLENBRGdDO0FBQUEsQ0FBM0IsQyIsImZpbGUiOiJ0b2Rvcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFNIT1dfTUVTU0FHRV9JTkZPLFxuICBTSE9XX01FU1NBR0VfRVJST1IsXG4gIEhJREVfTUVTU0FHRSxcbn0gZnJvbSAnLi4vY29uc3RhbnRzL2FjdGlvblR5cGVzJztcblxuZXhwb3J0IGNvbnN0IHNob3dNZXNzYWdlSW5mbyA9IG1lc3NhZ2UgPT4gKFxuICB7XG4gICAgdHlwZTogU0hPV19NRVNTQUdFX0lORk8sXG4gICAgbWVzc2FnZSxcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IHNob3dNZXNzYWdlRXJyb3IgPSBtZXNzYWdlID0+IChcbiAge1xuICAgIHR5cGU6IFNIT1dfTUVTU0FHRV9FUlJPUixcbiAgICBtZXNzYWdlLFxuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgaGlkZU1lc3NhZ2UgPSAoKSA9PiAoXG4gIHtcbiAgICB0eXBlOiBISURFX01FU1NBR0UsXG4gIH1cbik7XG4iLCJpbXBvcnQgeyBjYWxsQXBpLCBNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvQXBpVXRpbHMnO1xuaW1wb3J0IHtcbiAgUkVRVUVTVF9GRVRDSF9BUkdVTUVOVFMsXG4gIFJFQ0VJVkVfRkVUQ0hfQVJHVU1FTlRTLFxuICBFUlJPUl9GRVRDSF9BUkdVTUVOVFMsXG4gIEFERF9BUkdVTUVOVF9MT0NBTCxcbiAgUkVNT1ZFX0FSR1VNRU5UX0xPQ0FMLFxuICBVUERBVEVfQVJHVU1FTlRfTE9DQUwsXG59IGZyb20gJy4uL2NvbnN0YW50cy9hY3Rpb25UeXBlcyc7XG5pbXBvcnQgeyBxdWVyeUl0ZW1zTGltaXQgfSBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcbmltcG9ydCB7IHNob3dNZXNzYWdlRXJyb3IgfSBmcm9tICcuL21lc3NhZ2VBY3Rpb25zJztcbmltcG9ydCB7IHRvSnNEYXRlIH0gZnJvbSAnLi4vdXRpbHMvQ29tbW9uJztcblxuY29uc3QgcmVxdWVzdEZldGNoQXJndW1lbnRzID0gKGxpbWl0LCBza2lwKSA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRVFVRVNUX0ZFVENIX0FSR1VNRU5UUyxcbiAgICBsaW1pdCxcbiAgICBza2lwLFxuICB9XG4pO1xuXG5jb25zdCByZWNlaXZlRmV0Y2hBcmd1bWVudHMgPSB0b2RvQXJndW1lbnRzID0+IChcbiAge1xuICAgIHR5cGU6IFJFQ0VJVkVfRkVUQ0hfQVJHVU1FTlRTLFxuICAgIHRvZG9Bcmd1bWVudHMsXG4gIH1cbik7XG5cbmNvbnN0IGVycm9yRmV0Y2hBcmd1bWVudHMgPSBlcnJvciA9PiAoXG4gIHtcbiAgICB0eXBlOiBFUlJPUl9GRVRDSF9BUkdVTUVOVFMsXG4gICAgZXJyb3IsXG4gIH1cbik7XG5cbmNvbnN0IGFkZEFyZ3VtZW50TG9jYWwgPSB0b2RvQXJndW1lbnQgPT4gKFxuICB7XG4gICAgdHlwZTogQUREX0FSR1VNRU5UX0xPQ0FMLFxuICAgIHRvZG9Bcmd1bWVudCxcbiAgfVxuKTtcblxuY29uc3QgcmVtb3ZlQXJndW1lbnRMb2NhbCA9IHRvZG9Bcmd1bWVudEluZGV4ID0+IChcbiAge1xuICAgIHR5cGU6IFJFTU9WRV9BUkdVTUVOVF9MT0NBTCxcbiAgICB0b2RvQXJndW1lbnRJbmRleCxcbiAgfVxuKTtcblxuY29uc3QgdXBkYXRlQXJndW1lbnRMb2NhbCA9IHRvZG9Bcmd1bWVudCA9PiAoXG4gIHtcbiAgICB0eXBlOiBVUERBVEVfQVJHVU1FTlRfTE9DQUwsXG4gICAgdG9kb0FyZ3VtZW50LFxuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgZmV0Y2hUb2RvQXJndW1lbnRzQnlDYXRlZ29yeSA9IChcbiAgY2F0ZWdvcmllc0lkID0gW10sXG4gIGNvbXBsZXRlZCA9IGZhbHNlLFxuICBsaW1pdCA9IHF1ZXJ5SXRlbXNMaW1pdCxcbiAgc2tpcCA9IDAsXG4pID0+IChkaXNwYXRjaCkgPT4ge1xuICBkaXNwYXRjaChyZXF1ZXN0RmV0Y2hBcmd1bWVudHMobGltaXQsIHNraXApKTtcbiAgY29uc3QgcmVxdWVzdCA9IGNhbGxBcGkoJ3Rhc2tzJywge1xuICAgIGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgc2tpcCxcbiAgfSwgTWV0aG9kcy5HRVQpO1xuICByZXR1cm4gcmVxdWVzdC50aGVuKFxuICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgY29uc3QgdG9kb3MgPSByZXNwb25zZS5kYXRhLm1hcCh0b2RvID0+XG4gICAgICAgICAgKHtcbiAgICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgICBjb21wbGV0ZWRBdDogKHRvZG8uY29tcGxldGVkQXQpID8gdG9Kc0RhdGUodG9kby5jb21wbGV0ZWRBdCkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB0b2RvV2l0aGluOiAodG9kby50b2RvV2l0aGluKSA/IHRvSnNEYXRlKHRvZG8udG9kb1dpdGhpbikgOiB1bmRlZmluZWQsXG4gICAgICAgICAgfSkpO1xuICAgICAgICBkaXNwYXRjaChyZWNlaXZlRmV0Y2hBcmd1bWVudHModG9kb3MpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoKGVycm9yRmV0Y2hBcmd1bWVudHMocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBlcnJvciA9PiAoeyBlcnJvciB9KSxcbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZWxldGVUb2RvQXJndW1lbnQgPSAodG9kb0FyZ3VtZW50SWQgPSAnJykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBjb25zdCByZXF1ZXN0ID0gY2FsbEFwaSgndGFza3MnLCB0b2RvQXJndW1lbnRJZCwgTWV0aG9kcy5ERUxFVEUpO1xuICByZXR1cm4gcmVxdWVzdC50aGVuKFxuICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgY29uc3QgeyBpdGVtcyB9ID0gZ2V0U3RhdGUoKS50b2RvQXJndW1lbnRzO1xuICAgICAgICBjb25zdCB0b2RvQXJndW1lbnRJbmRleCA9IGl0ZW1zLmZpbmRJbmRleCh0b2RvQXJndW1lbnQgPT5cbiAgICAgICAgICB0b2RvQXJndW1lbnQuaWQgPT09IHRvZG9Bcmd1bWVudElkKTtcbiAgICAgICAgZGlzcGF0Y2gocmVtb3ZlQXJndW1lbnRMb2NhbCh0b2RvQXJndW1lbnRJbmRleCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yID0+ICh7IGVycm9yIH0pLFxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRvZG9Bcmd1bWVudCA9ICh0aXRsZSA9ICcnLCBkZXNjcmlwdGlvbiA9ICcnLCBjYXRlZ29yeSA9IHsgaWQ6ICcnIH0sIHRvZG9XaXRoaW4sIGNhbGxiYWNrID0gdW5kZWZpbmVkKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgY29uc3QgcmVxdWVzdCA9IGNhbGxBcGkoXG4gICAgJ3Rhc2tzJyxcbiAgICB7XG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnkuaWQsXG4gICAgICB0b2RvV2l0aGluLFxuICAgIH0sXG4gICAgTWV0aG9kcy5QT1NULFxuICApO1xuICByZXR1cm4gcmVxdWVzdC50aGVuKFxuICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgY29uc3QgdG9kbyA9IHtcbiAgICAgICAgICAuLi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIGNvbXBsZXRlZEF0OiAocmVzcG9uc2UuZGF0YS5jb21wbGV0ZWRBdClcbiAgICAgICAgICAgID8gdG9Kc0RhdGUocmVzcG9uc2UuZGF0YS5jb21wbGV0ZWRBdCkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgdG9kb1dpdGhpbjogKHJlc3BvbnNlLmRhdGEudG9kb1dpdGhpbilcbiAgICAgICAgICAgID8gdG9Kc0RhdGUocmVzcG9uc2UuZGF0YS50b2RvV2l0aGluKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgfTtcbiAgICAgICAgZGlzcGF0Y2goYWRkQXJndW1lbnRMb2NhbCh0b2RvKSk7XG4gICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yID0+ICh7IGVycm9yIH0pLFxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IHRvb2dsZVRvZG9Bcmd1bWVudENvbXBsZXRlZCA9ICh0b2RvQXJndW1lbnRJZCA9ICcnLCBjb21wbGV0ZWQgPSBmYWxzZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGNvbnN0IHJlcXVlc3QgPSBjYWxsQXBpKCcvdG9vZ2xlLWFyZ3VtZW50LWNvbXBsZXRlZCcsIHsgdG9kb0FyZ3VtZW50SWQsIGNvbXBsZXRlZCB9KTtcbiAgcmV0dXJuIHJlcXVlc3QudGhlbihcbiAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIGNvbnN0IHRvZG8gPSB7XG4gICAgICAgICAgLi4ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICBjb21wbGV0ZWRBdDogKHJlc3BvbnNlLmRhdGEuY29tcGxldGVkQXQpXG4gICAgICAgICAgICA/IHRvSnNEYXRlKHJlc3BvbnNlLmRhdGEuY29tcGxldGVkQXQpIDogdW5kZWZpbmVkLFxuICAgICAgICB9O1xuICAgICAgICBkaXNwYXRjaCh1cGRhdGVBcmd1bWVudExvY2FsKHRvZG8pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBlcnJvciA9PiAoeyBlcnJvciB9KSxcbiAgKTtcbn07XG4iLCJpbXBvcnQgeyBjYWxsQXBpLCBNZXRob2RzIH0gZnJvbSAnLi4vdXRpbHMvQXBpVXRpbHMnO1xuaW1wb3J0IHtcbiAgUkVRVUVTVF9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgUkVDRUlWRV9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgRVJST1JfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gIEFERF9DQVRFR09SWV9MT0NBTCxcbiAgUkVNT1ZFX0NBVEVHT1JZX0xPQ0FMLFxuICBUT09HTEVfU0VMRUNUX0NBVEVHT1JZLFxuICBUT09HTEVfU0VMRUNUX0NBVEVHT1JZX0FMTCxcbiAgU1dJVENIX1ZJU0lCSUxJVFlfRklMVEVSLFxufSBmcm9tICcuLi9jb25zdGFudHMvYWN0aW9uVHlwZXMnO1xuaW1wb3J0IHsgcXVlcnlJdGVtc0xpbWl0IH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5pbXBvcnQgeyBmZXRjaFRvZG9Bcmd1bWVudHNCeUNhdGVnb3J5IH0gZnJvbSAnLi90b2RvQXJndW1lbnRzQWN0aW9ucyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUVycm9yIH0gZnJvbSAnLi9tZXNzYWdlQWN0aW9ucyc7XG5pbXBvcnQgeyBnZXRTZWxlY3RlZENhdGVnb3JpZXNJZCwgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuXG5jb25zdCBmZXRjaEFyZ3VtZW50cyA9IHN0YXRlID0+IGZldGNoVG9kb0FyZ3VtZW50c0J5Q2F0ZWdvcnkoXG4gIGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkKHN0YXRlKSxcbiAgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQoc3RhdGUpLFxuKTtcblxuY29uc3QgcmVxdWVzdEZldGNoQWxsQ2F0ZWdvcmllcyA9ICgpID0+IChcbiAge1xuICAgIHR5cGU6IFJFUVVFU1RfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gIH1cbik7XG5cbmNvbnN0IHJlY2VpdmVGZXRjaEFsbENhdGVnb3JpZXMgPSBjYXRlZ29yaWVzID0+IChcbiAge1xuICAgIHR5cGU6IFJFQ0VJVkVfRkVUQ0hfQUxMX0NBVEVHT1JJRVMsXG4gICAgY2F0ZWdvcmllcyxcbiAgfVxuKTtcblxuY29uc3QgZXJyb3JGZXRjaEFsbENhdGVnb3JpZXMgPSBlcnJvciA9PiAoXG4gIHtcbiAgICB0eXBlOiBFUlJPUl9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgICBlcnJvcixcbiAgfVxuKTtcblxuY29uc3QgYWRkQ2F0ZWdvcnlMb2NhbCA9IGNhdGVnb3J5ID0+IChcbiAge1xuICAgIHR5cGU6IEFERF9DQVRFR09SWV9MT0NBTCxcbiAgICBjYXRlZ29yeSxcbiAgfVxuKTtcblxuY29uc3QgcmVtb3ZlQ2F0ZWdvcnlMb2NhbCA9IGNhdGVnb3J5SW5kZXggPT4gKFxuICB7XG4gICAgdHlwZTogUkVNT1ZFX0NBVEVHT1JZX0xPQ0FMLFxuICAgIGNhdGVnb3J5SW5kZXgsXG4gIH1cbik7XG5cbmNvbnN0IHRvb2dsZVNlbGVjdENhdGVnb3J5ID0gc2VsZWN0ZWRDYXRlZ29yeSA9PiAoXG4gIHtcbiAgICB0eXBlOiBUT09HTEVfU0VMRUNUX0NBVEVHT1JZLFxuICAgIHNlbGVjdGVkQ2F0ZWdvcnksXG4gIH1cbik7XG5cbmNvbnN0IHRvb2dsZVNlbGVjdENhdGVnb3J5QWxsID0gKCkgPT4gKFxuICB7XG4gICAgdHlwZTogVE9PR0xFX1NFTEVDVF9DQVRFR09SWV9BTEwsXG4gIH1cbik7XG5cbmNvbnN0IHN3aXRjaFZpc2liaWxpdHlGaWx0ZXIgPSB2aXNpYmlsaXR5ID0+IChcbiAge1xuICAgIHR5cGU6IFNXSVRDSF9WSVNJQklMSVRZX0ZJTFRFUixcbiAgICB2aXNpYmlsaXR5LFxuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgZmV0Y2hBbGxDYXRlZ29yaWVzID0gKGxpbWl0ID0gcXVlcnlJdGVtc0xpbWl0LCBza2lwID0gMCkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBkaXNwYXRjaChyZXF1ZXN0RmV0Y2hBbGxDYXRlZ29yaWVzKCkpO1xuICBjb25zdCByZXF1ZXN0ID0gY2FsbEFwaSgnY2F0ZWdvcmllcycsIHsgbGltaXQsIHNraXAgfSwgTWV0aG9kcy5HRVQpO1xuICByZXR1cm4gcmVxdWVzdC50aGVuKFxuICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgZGlzcGF0Y2gocmVjZWl2ZUZldGNoQWxsQ2F0ZWdvcmllcyhyZXNwb25zZS5kYXRhKSk7XG4gICAgICAgIGRpc3BhdGNoKGZldGNoVG9kb0FyZ3VtZW50c0J5Q2F0ZWdvcnkoZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQoZ2V0U3RhdGUoKSkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoKGVycm9yRmV0Y2hBbGxDYXRlZ29yaWVzKHJlc3BvbnNlLm1lc3NhZ2VFcnJvcikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3IgPT4gKFxuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihlcnJvci5tZXNzYWdlKSlcbiAgICApLFxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZUNhdGVnb3J5ID0gKGNhdGVnb3J5SWQgPSAnJykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBjb25zdCByZXF1ZXN0ID0gY2FsbEFwaSgnY2F0ZWdvcmllcycsIGNhdGVnb3J5SWQsIE1ldGhvZHMuREVMRVRFKTtcbiAgcmV0dXJuIHJlcXVlc3QudGhlbihcbiAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIGNvbnN0IHsgY2F0ZWdvcmllcyB9ID0gZ2V0U3RhdGUoKS50b2RvRmlsdGVycztcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlJbmRleCA9IGNhdGVnb3JpZXMuZmluZEluZGV4KGNhdGVnb3J5ID0+IGNhdGVnb3J5LmlkID09PSBjYXRlZ29yeUlkKTtcbiAgICAgICAgZGlzcGF0Y2gocmVtb3ZlQ2F0ZWdvcnlMb2NhbChjYXRlZ29yeUluZGV4KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLm1lc3NhZ2VFcnJvcikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3IgPT4gKFxuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihlcnJvci5tZXNzYWdlKSlcbiAgICApLFxuICApO1xufTtcblxuLyoqXG4gKiBSZXF1ZXN0IHRvIGFkZCBhIGNhdGVnb3J5XG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBjYXRlZ29yeSBuYW1lIHRvIGFkZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBuZWVkIHRvIGhhbmRsZSB0aGUgY2F0ZWdvcnkgY3JlYXRlZFxuICovXG5leHBvcnQgY29uc3QgYWRkQ2F0ZWdvcnkgPSAobmFtZSA9ICcnLCBjYWxsYmFjayA9IHVuZGVmaW5lZCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGNvbnN0IHJlcXVlc3QgPSBjYWxsQXBpKCdjYXRlZ29yaWVzJywgeyBuYW1lIH0sIE1ldGhvZHMuUE9TVCk7XG4gIHJldHVybiByZXF1ZXN0LnRoZW4oXG4gICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICBkaXNwYXRjaChhZGRDYXRlZ29yeUxvY2FsKHJlc3BvbnNlLmRhdGEpKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjYWxsYmFjayhyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yID0+IChcbiAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IoZXJyb3IubWVzc2FnZSkpXG4gICAgKSxcbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VWaXNpYmlsaXR5ID0gdmlzaWJpbGl0eSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGRpc3BhdGNoKHN3aXRjaFZpc2liaWxpdHlGaWx0ZXIodmlzaWJpbGl0eSkpO1xuICByZXR1cm4gZGlzcGF0Y2goZmV0Y2hBcmd1bWVudHMoZ2V0U3RhdGUoKSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdENhdGVnb3J5ID0gc2VsZWN0ZWRDYXRlZ29yeSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGRpc3BhdGNoKHRvb2dsZVNlbGVjdENhdGVnb3J5KHNlbGVjdGVkQ2F0ZWdvcnkpKTtcbiAgcmV0dXJuIGRpc3BhdGNoKGZldGNoQXJndW1lbnRzKGdldFN0YXRlKCkpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RDYXRlZ29yeUFsbCA9ICgpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgZGlzcGF0Y2godG9vZ2xlU2VsZWN0Q2F0ZWdvcnlBbGwoKSk7XG4gIHJldHVybiBkaXNwYXRjaChmZXRjaEFyZ3VtZW50cyhnZXRTdGF0ZSgpKSk7XG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEJ1dHRvbkNvbXBsZXRlQXJndW1lbnQgPSAoeyBvbkNsaWNrLCBjb21wbGV0ZWQgfSkgPT4gKFxuICA8YnV0dG9uXG4gICAgY2xhc3NOYW1lPXtgYnV0dG9uLWNvbXBsZXRlLWFyZ3VtZW50ICR7KGNvbXBsZXRlZCkgPyAnYnV0dG9uLWNvbXBsZXRlZC1hcmd1bWVudCcgOiAnJ31gfVxuICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gID5cbiAgICA8aSBjbGFzc05hbWU9XCJpY29uLWNoZWNrXCIgLz5cbiAgPC9idXR0b24+XG4pO1xuXG5CdXR0b25Db21wbGV0ZUFyZ3VtZW50LnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbCxcbn07XG5cbkJ1dHRvbkNvbXBsZXRlQXJndW1lbnQuZGVmYXVsdFByb3BzID0ge1xuICBjb21wbGV0ZWQ6IGZhbHNlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uQ29tcGxldGVBcmd1bWVudDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdXR0b25EZWxldGVBcmd1bWVudCA9ICh7IG9uQ2xpY2sgfSkgPT4gKFxuICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvbi1kZWxldGUtYXJndW1lbnRcIiBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICA8aSBjbGFzc05hbWU9XCJpY29uLWRlbGV0ZVwiIC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uRGVsZXRlQXJndW1lbnQucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uRGVsZXRlQXJndW1lbnQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgQnV0dG9uRGVsZXRlQ2F0ZWdvcnkgPSAoeyBvbkNsaWNrIH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24tZGVsZXRlLWNhdGVnb3J5XCIgb25DbGljaz17b25DbGlja30+XG4gICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1kZWxldGVcIiAvPlxuICA8L2J1dHRvbj5cbik7XG5cbkJ1dHRvbkRlbGV0ZUNhdGVnb3J5LnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkRlbGV0ZUNhdGVnb3J5O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEJ1dHRvblNjcm9sbCA9ICh7IG9uQ2xpY2ssIGRpcmVjdGlvbiB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPXtgYnV0dG9uLXNjcm9sbCAke2RpcmVjdGlvbn1gfSBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICA8aSBjbGFzc05hbWU9eyhkaXJlY3Rpb24gPT09ICdsZWZ0JykgPyAnaWNvbi1iYWNrd2FyZCcgOiAnaWNvbi1mb3J3YXJkJ30gLz5cbiAgPC9idXR0b24+XG4pO1xuXG5CdXR0b25TY3JvbGwucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBkaXJlY3Rpb246IFByb3BUeXBlcy5vbmVPZihbJ2xlZnQnLCAncmlnaHQnXSksXG59O1xuXG5CdXR0b25TY3JvbGwuZGVmYXVsdFByb3BzID0ge1xuICBkaXJlY3Rpb246ICdsZWZ0Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvblNjcm9sbDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbkdyb3VwIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5pbXBvcnQgc2Nyb2xsIGZyb20gJ3Njcm9sbCc7XG5pbXBvcnQgQnV0dG9uU2Nyb2xsIGZyb20gJy4vQnV0dG9uU2NvbGwnO1xuaW1wb3J0IENhdGVnb3J5IGZyb20gJy4vQ2F0ZWdvcnknO1xuaW1wb3J0IEZhZGUgZnJvbSAnLi9hbmltcy9GYWRlJztcblxuY2xhc3MgQ2F0ZWdvcmllc0ZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuY2hpcHMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5oYW5kbGVMZWZ0U2Nyb2xsQ2xpY2sgPSB0aGlzLmhhbmRsZUxlZnRTY3JvbGxDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlUmlnaHRTY3JvbGxDbGljayA9IHRoaXMuaGFuZGxlUmlnaHRTY3JvbGxDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMubW92ZUNoaXBzU2Nyb2xsID0gdGhpcy5tb3ZlQ2hpcHNTY3JvbGwuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZUxlZnRTY3JvbGxDbGljaygpIHtcbiAgICBpZiAodGhpcy5jaGlwcykge1xuICAgICAgdGhpcy5tb3ZlQ2hpcHNTY3JvbGwoLXRoaXMuY2hpcHMuY2xpZW50V2lkdGgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuY2hpcHMpIHtcbiAgICAgIHRoaXMubW92ZUNoaXBzU2Nyb2xsKHRoaXMuY2hpcHMuY2xpZW50V2lkdGgpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVDaGlwc1Njcm9sbChkZWx0YSkge1xuICAgIGlmICh0aGlzLmNoaXBzKSB7XG4gICAgICBjb25zdCBuZXh0U2Nyb2xsTGVmdCA9IHRoaXMuY2hpcHMuc2Nyb2xsTGVmdCArIGRlbHRhO1xuICAgICAgc2Nyb2xsLmxlZnQodGhpcy5jaGlwcywgbmV4dFNjcm9sbExlZnQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNhdGVnb3J5TGlzdCwgb25EZWxldGVDYXRlZ29yeSwgb25DaWxja0NhdGVnb3J5IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiY29udGVudC1jYXRlZ29yaWVzLWZpbHRlclwiPlxuICAgICAgICA8QnV0dG9uU2Nyb2xsXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVMZWZ0U2Nyb2xsQ2xpY2t9XG4gICAgICAgICAgZGlyZWN0aW9uPVwibGVmdFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJjYXRlZ29yaWVzLWZpbHRlclwiXG4gICAgICAgICAgcmVmPXsobm9kZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGlwcyA9IG5vZGU7XG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxUcmFuc2l0aW9uR3JvdXAgc3R5bGU9e3sgZGlzcGxheTogJ2luaGVyaXQnLCBwYWRkaW5nTGVmdDogJzEuMjVlbScsIHBhZGRpbmdSaWdodDogJzEuMjVlbScgfX0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNhdGVnb3J5TGlzdC5tYXAoY2F0ZWdvcnkgPT4gKFxuICAgICAgICAgICAgICAgIDxGYWRlIGtleT17Y2F0ZWdvcnkuaWR9PlxuICAgICAgICAgICAgICAgICAgPENhdGVnb3J5XG4gICAgICAgICAgICAgICAgICAgIGtleT17Y2F0ZWdvcnkuaWR9XG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5PXtjYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e2NhdGVnb3J5LnNlbGVjdGVkfVxuICAgICAgICAgICAgICAgICAgICBvbkRlbGV0ZT17b25EZWxldGVDYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b25DaWxja0NhdGVnb3J5fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L0ZhZGU+XG4gICAgICAgICAgICAgICkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9UcmFuc2l0aW9uR3JvdXA+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8QnV0dG9uU2Nyb2xsXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVSaWdodFNjcm9sbENsaWNrfVxuICAgICAgICAgIGRpcmVjdGlvbj1cInJpZ2h0XCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQ2F0ZWdvcmllc0ZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIGNhdGVnb3J5TGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgb25EZWxldGVDYXRlZ29yeTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2lsY2tDYXRlZ29yeTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbkNhdGVnb3JpZXNGaWx0ZXIuZGVmYXVsdFByb3BzID0ge1xuICBvbkRlbGV0ZUNhdGVnb3J5OiB1bmRlZmluZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYXRlZ29yaWVzRmlsdGVyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQnV0dG9uRGVsZXRlQ2F0ZWdvcnkgZnJvbSAnLi9CdXR0b25EZWxldGVDYXRlZ29yeSc7XG5cbmNvbnN0IENhdGVnb3J5ID0gKHtcbiAgY2F0ZWdvcnksIHNlbGVjdGVkLCBvbkNsaWNrLCBvbkRlbGV0ZSxcbn0pID0+IHtcbiAgbGV0IGNzc0NsYXNzID0gJyc7XG5cbiAgY29uc3Qgb25DaGlwQ2xpY2sgPSAoZSkgPT4ge1xuICAgIG9uQ2xpY2soY2F0ZWdvcnksIGUpO1xuICB9O1xuICBjb25zdCBvbkRlbGV0ZUNsaWNrID0gKCkgPT4ge1xuICAgIG9uRGVsZXRlKGNhdGVnb3J5KTtcbiAgfTtcblxuICBpZiAoc2VsZWN0ZWQpIHtcbiAgICBjc3NDbGFzcyA9ICdjYXRlZ29yeS1zZWxlY3RlZCc7XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2Ake2Nzc0NsYXNzfSBjYXRlZ29yeS1jaGlwIGFsaWduLWl0ZW1zLWNlbnRlcmB9XG4gICAgICBvbkNsaWNrPXtvbkNoaXBDbGlja31cbiAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhdGVnb3J5LXRleHRcIj57Y2F0ZWdvcnkubmFtZX08L3NwYW4+XG4gICAgICB7XG4gICAgICAgIChjYXRlZ29yeS5pZCAhPT0gJzAnICYmIG9uRGVsZXRlICE9PSB1bmRlZmluZWQpICYmXG4gICAgICAgICAgPEJ1dHRvbkRlbGV0ZUNhdGVnb3J5IG9uQ2xpY2s9e29uRGVsZXRlQ2xpY2t9IC8+XG4gICAgICB9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5DYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIG9uRGVsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY2F0ZWdvcnk6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuQ2F0ZWdvcnkuZGVmYXVsdFByb3BzID0ge1xuICBvbkRlbGV0ZTogdW5kZWZpbmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0ZWdvcnk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSAnbG9kYXNoJztcblxuY29uc3Qgd2FpdFRpbWUgPSA1MDA7XG5cbmNsYXNzIEluZmluaXRlU2Nyb2xsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5vblNjcm9sbCA9IHRoaXMub25TY3JvbGwuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZSh0aGlzLm9uU2Nyb2xsLCB3YWl0VGltZSksIGZhbHNlKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZSh0aGlzLm9uU2Nyb2xsLCB3YWl0VGltZSksIGZhbHNlKTtcbiAgfVxuXG4gIG9uU2Nyb2xsKCkge1xuICAgIGlmICgod2luZG93LmlubmVySGVpZ2h0ICsgd2luZG93LnNjcm9sbFkpID49IChkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCAtIDIwMCkpIHtcbiAgICAgIGNvbnN0IHsgYXJncywgb25TY3JvbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICBvblNjcm9sbCguLi5hcmdzKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgY2xhc3NOYW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5JbmZpbml0ZVNjcm9sbC5wcm9wVHlwZXMgPSB7XG4gIGFyZ3M6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvblNjcm9sbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbkluZmluaXRlU2Nyb2xsLmRlZmF1bHRQcm9wcyA9IHtcbiAgYXJnczogW10sXG4gIGNsYXNzTmFtZTogJycsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbmZpbml0ZVNjcm9sbDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBNYWluQWRkQnV0dG9uID0gKHsgb25DbGljayB9KSA9PiAoXG4gIDxidXR0b24gaWQ9XCJtYWluLWFkZC1idXR0b25cIiBvbkNsaWNrPXtvbkNsaWNrfSA+XG4gICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj4mI3hFMTQ1OzwvaT5cbiAgPC9idXR0b24+XG4pO1xuXG5NYWluQWRkQnV0dG9uLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1haW5BZGRCdXR0b247XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBTbmFja2JhckFuaW0gZnJvbSAnLi9hbmltcy9TbmFja2JhckFuaW0nO1xuXG5jb25zdCBBY3Rpb24gPSAoeyBvbkNsaWNrLCB0ZXh0IH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24tYWN0aW9uLXNuYWNrYmFyXCIgb25DbGljaz17b25DbGlja30+XG4gICAge3RleHR9XG4gIDwvYnV0dG9uPlxuKTtcblxuQWN0aW9uLnByb3BUeXBlcyA9IHtcbiAgdGV4dDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuY2xhc3MgU25hY2tiYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgY29uc3Qge1xuICAgICAgb25DbG9zZSwgZHVyYXRpb24sIHNob3csXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoc2hvdykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgIH0sIGR1cmF0aW9uKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbWVzc2FnZSwgaXNFcnJvciwgYWN0aW9uVGV4dCwgYWN0aW9uQ2xpY2ssIHNob3csXG4gICAgICB2ZXJ0aWNhbFBvc3Rpb24sIGhvcml6b250YWxQb3NpdGlvbixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPFNuYWNrYmFyQW5pbSBpbj17c2hvd30gY3VzdG9tQ2xhc3M9e2Ake3ZlcnRpY2FsUG9zdGlvbn0gJHsoaG9yaXpvbnRhbFBvc2l0aW9uKX1gfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YHNuYWNrYmFyICR7KGlzRXJyb3IpID8gJ2Vycm9yJyA6ICcnfWB9XG4gICAgICAgID5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzbmFja2Jhci1tZXNzYWdlXCI+e21lc3NhZ2V9PC9zcGFuPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIChhY3Rpb25UZXh0ICE9PSAnJyAmJiBhY3Rpb25DbGljayAhPT0gdW5kZWZpbmVkKSAmJlxuICAgICAgICAgICAgICA8QWN0aW9uIG9uQ2xpY2s9e2FjdGlvbkNsaWNrfSB0ZXh0PXthY3Rpb25UZXh0fSAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L1NuYWNrYmFyQW5pbT5cbiAgICApO1xuICB9XG59XG5cblNuYWNrYmFyLnByb3BUeXBlcyA9IHtcbiAgc2hvdzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBkdXJhdGlvbjogUHJvcFR5cGVzLm51bWJlcixcbiAgaXNFcnJvcjogUHJvcFR5cGVzLmJvb2wsXG4gIGFjdGlvblRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGFjdGlvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgdmVydGljYWxQb3N0aW9uOiBQcm9wVHlwZXMub25lT2YoWyd0b3AnLCAnYm90dG9tJ10pLFxuICBob3Jpem9udGFsUG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbJ2xlZnQnLCAncmlnaHQnXSksXG59O1xuXG5TbmFja2Jhci5kZWZhdWx0UHJvcHMgPSB7XG4gIGR1cmF0aW9uOiA1MDAwLFxuICBpc0Vycm9yOiBmYWxzZSxcbiAgYWN0aW9uVGV4dDogJycsXG4gIGFjdGlvbkNsaWNrOiB1bmRlZmluZWQsXG4gIHZlcnRpY2FsUG9zdGlvbjogJ2JvdHRvbScsXG4gIGhvcml6b250YWxQb3NpdGlvbjogJ3JpZ2h0Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNuYWNrYmFyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQ29sbGFwc2UgZnJvbSAnLi9hbmltcy9Db2xsYXBzZSc7XG5pbXBvcnQgRmFkZSBmcm9tICcuL2FuaW1zL0ZhZGUnO1xuaW1wb3J0IEJ1dHRvbkNvbXBsZXRlQXJndW1lbnQgZnJvbSAnLi9CdXR0b25Db21wbGV0ZUFyZ3VtZW50JztcbmltcG9ydCBCdXR0b25EZWxldGVBcmd1bWVudCBmcm9tICcuL0J1dHRvbkRlbGV0ZUFyZ3VtZW50JztcbmltcG9ydCB7IHRvU2ltcGxlRGF0ZUZvcm1hdCB9IGZyb20gJy4uL3V0aWxzL0NvbW1vbic7XG5cbmNsYXNzIFRvZG9Bcmd1bWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgIH07XG4gICAgdGhpcy5yZW5kZXJEYXRlID0gdGhpcy5yZW5kZXJEYXRlLmJpbmQodGhpcyk7XG4gIH1cblxuICBvblRpdGxlQ2xpY2soKSB7XG4gICAgY29uc3QgeyBjb2xsYXBzZWQgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGNvbGxhcHNlZDogIWNvbGxhcHNlZCB9KTtcbiAgfVxuXG4gIHJlbmRlckRhdGUoKSB7XG4gICAgY29uc3QgeyBhcmd1bWVudCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoYXJndW1lbnQuY29tcGxldGVkKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8cCBjbGFzc05hbWU9XCJjb21wbGV0ZS1kYXRlXCI+e2Bjb21wbGV0ZWQgJHsoYXJndW1lbnQuY29tcGxldGVkQXQpID8gdG9TaW1wbGVEYXRlRm9ybWF0KGFyZ3VtZW50LmNvbXBsZXRlZEF0KSA6ICcnfWB9PC9wPlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxwIGNsYXNzTmFtZT1cImNvbXBsZXRlLXdpdGhpbi1kYXRlXCI+e2B0byBjb21wbGV0ZSB3aXRoaW4gJHsoYXJndW1lbnQudG9kb1dpdGhpbikgPyB0b1NpbXBsZURhdGVGb3JtYXQoYXJndW1lbnQudG9kb1dpdGhpbikgOiAnbm90IHNldCd9YH08L3A+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGFyZ3VtZW50LCBvbkRlbGV0ZSwgb25Db21wbGV0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGNvbGxhcHNlZCB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcmd1bWVudC1pdGVtXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXJndW1lbnQtaGVhZGVyXCI+XG4gICAgICAgICAgPHBcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGFyZ3VtZW50LXRpdGxlICR7KGFyZ3VtZW50LmNvbXBsZXRlZCkgPyAnYXJndW1lbnQtdGl0bGUtY29tcGxldGVkJyA6ICcnfWB9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uVGl0bGVDbGljaygpfVxuICAgICAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge2FyZ3VtZW50LnRpdGxlfVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8RmFkZSBpbj17Y29sbGFwc2VkfT5cbiAgICAgICAgICAgIDxCdXR0b25EZWxldGVBcmd1bWVudFxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkRlbGV0ZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9GYWRlPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG9uQ29tcGxldGUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgPEJ1dHRvbkNvbXBsZXRlQXJndW1lbnRcbiAgICAgICAgICAgICAgb25DbGljaz17b25Db21wbGV0ZX1cbiAgICAgICAgICAgICAgY29tcGxldGVkPXthcmd1bWVudC5jb21wbGV0ZWR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXJndW1lbnQtZGF0ZVwiPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckRhdGUoKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxDb2xsYXBzZSBpbj17Y29sbGFwc2VkfT5cbiAgICAgICAgICA8ZGl2IGtleT17YXJndW1lbnQuZGVzY3JpcHRpb259IGNsYXNzTmFtZT1cImFyZ3VtZW50LWJvZHlcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImFyZ3VtZW50LWRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAoYXJndW1lbnQuZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCAmJiBhcmd1bWVudC5kZXNjcmlwdGlvbiAhPT0gJycpXG4gICAgICAgICAgICAgICAgPyBhcmd1bWVudC5kZXNjcmlwdGlvbiA6IDxzcGFuIGNsYXNzTmFtZT1cImVtcHR5XCI+Tm8gZGVzY3JpcHRpb24gdG8gc2hvdyA6KDwvc3Bhbj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NvbGxhcHNlPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Ub2RvQXJndW1lbnQucHJvcFR5cGVzID0ge1xuICBvbkRlbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ29tcGxldGU6IFByb3BUeXBlcy5mdW5jLFxuICBhcmd1bWVudDogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGNvbXBsZXRlZEF0OiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICB9KS5pc1JlcXVpcmVkLFxufTtcblxuVG9kb0FyZ3VtZW50LmRlZmF1bHRQcm9wcyA9IHtcbiAgb25EZWxldGU6IHVuZGVmaW5lZCxcbiAgb25Db21wbGV0ZTogdW5kZWZpbmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9kb0FyZ3VtZW50O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uR3JvdXAgfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcbmltcG9ydCBSZXNpemUgZnJvbSAnLi9hbmltcy9SZXNpemUnO1xuaW1wb3J0IFRvZG9Bcmd1bWVudCBmcm9tICcuL1RvZG9Bcmd1bWVudCc7XG5pbXBvcnQgSW5maW5pdGVTY3JvbGwgZnJvbSAnLi9JbmZpbml0ZVNjcm9sbCc7XG5pbXBvcnQgeyBxdWVyeUl0ZW1zTGltaXQgfSBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBsaW1pdDogcXVlcnlJdGVtc0xpbWl0LFxuICBza2lwOiAwLFxufTtcblxuY2xhc3MgVG9kb0FyZ3VtZW50cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSBpbml0aWFsU3RhdGU7XG4gICAgdGhpcy5vbkZldGNoVG9kb0FyZ3VtZW50c05leHQgPSB0aGlzLm9uRmV0Y2hUb2RvQXJndW1lbnRzTmV4dC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhuZXh0UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIGlmIChuZXh0UHJvcHMuc2tpcCAhPT0gcHJldlN0YXRlLnNraXApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNraXA6IG5leHRQcm9wcy5za2lwLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBvbkZldGNoVG9kb0FyZ3VtZW50c05leHQoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsXG4gICAgICBmZXRjaFRvZG9Bcmd1bWVudHMsIG1vcmVUb0xvYWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFtb3JlVG9Mb2FkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgbGltaXQsIHNraXAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgbmV3U2tpcCA9IHNraXAgKyBsaW1pdDtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2tpcDogbmV3U2tpcCB9KTtcbiAgICBmZXRjaFRvZG9Bcmd1bWVudHMoY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsIGxpbWl0LCBuZXdTa2lwKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBsaXN0VG9kb0FyZ3VtZW50cyxcbiAgICAgIG9uRGVsZXRlQXJndW1lbnQsXG4gICAgICBvbkNvbXBsZXRlQXJndW1lbnQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJjb250ZW50LXRvZG8tYXJndW1lbnRzXCI+XG4gICAgICAgIDxJbmZpbml0ZVNjcm9sbCBvblNjcm9sbD17dGhpcy5vbkZldGNoVG9kb0FyZ3VtZW50c05leHR9PlxuICAgICAgICAgIDxUcmFuc2l0aW9uR3JvdXA+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxpc3RUb2RvQXJndW1lbnRzLm1hcChhcmcgPT4gKFxuICAgICAgICAgICAgICAgIDxSZXNpemUga2V5PXthcmcuaWR9PlxuICAgICAgICAgICAgICAgICAgPFRvZG9Bcmd1bWVudFxuICAgICAgICAgICAgICAgICAgICBrZXk9e2FyZy5pZH1cbiAgICAgICAgICAgICAgICAgICAgYXJndW1lbnQ9e2FyZ31cbiAgICAgICAgICAgICAgICAgICAgb25EZWxldGU9eygpID0+IG9uRGVsZXRlQXJndW1lbnQoYXJnKX1cbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17KCkgPT4gb25Db21wbGV0ZUFyZ3VtZW50KGFyZyl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvUmVzaXplPlxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvVHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICA8L0luZmluaXRlU2Nyb2xsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Ub2RvQXJndW1lbnRzLnByb3BUeXBlcyA9IHtcbiAgb25EZWxldGVBcmd1bWVudDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25Db21wbGV0ZUFyZ3VtZW50OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBsaXN0VG9kb0FyZ3VtZW50czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICBtb3JlVG9Mb2FkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBmZXRjaFRvZG9Bcmd1bWVudHM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNhdGVnb3JpZXNJZDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZykuaXNSZXF1aXJlZCxcbiAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9kb0FyZ3VtZW50cztcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgTG9hZGVyTGluZWFyIGZyb20gJy4uL2NvbXBvbmVudHMvTG9hZGVyTGluZWFyJztcbmltcG9ydCBNYWluQWRkQnV0dG9uIGZyb20gJy4uL2NvbXBvbmVudHMvTWFpbkFkZEJ1dHRvbic7XG5pbXBvcnQgQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lciBmcm9tICcuLi9jb250YWluZXJzL0NhdGVnb3JpZXNGaWx0ZXJDb250YWluZXInO1xuaW1wb3J0IFZpc2liaWxpdHlGaWx0ZXJDb250YWluZXIgZnJvbSAnLi4vY29udGFpbmVycy9WaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyJztcbmltcG9ydCBUb2RvQXJndW1lbnRzQ29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lcnMvVG9kb0FyZ3VtZW50c0NvbnRhaW5lcic7XG5pbXBvcnQgRGlhbG9nQWRkIGZyb20gJy4vZGlhbG9nQWRkL0RpYWxvZ0FkZCc7XG5pbXBvcnQgU25hY2tiYXIgZnJvbSAnLi9TbmFja2Jhcic7XG5cbmNsYXNzIFRvZG9zIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzRGlhbG9nQWRkT3BlbjogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIC8vIERpYWxvZ0FkZC5wcmVsb2FkKCk7XG4gICAgY29uc3QgeyBpbml0RmV0Y2hBbGxDYXRlZ29yaWVzIH0gPSB0aGlzLnByb3BzO1xuICAgIGluaXRGZXRjaEFsbENhdGVnb3JpZXMoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGlzRGlhbG9nQWRkT3BlbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IG1lc3NhZ2UsIGhpZGVNZXNzYWdlLCBzaG93TG9hZGluZyB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWFwcFwiPlxuICAgICAgICA8TG9hZGVyTGluZWFyIHNob3c9e3Nob3dMb2FkaW5nfSAvPlxuICAgICAgICA8ZGl2IGlkPVwibWFpbi10b3AtYmFyXCI+XG4gICAgICAgICAgPENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIgLz5cbiAgICAgICAgICA8VmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lciAvPlxuICAgICAgICAgIDxNYWluQWRkQnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgaXNEaWFsb2dBZGRPcGVuOiB0cnVlIH0pfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8VG9kb0FyZ3VtZW50c0NvbnRhaW5lciAvPlxuICAgICAgICA8RGlhbG9nQWRkXG4gICAgICAgICAgb3Blbj17aXNEaWFsb2dBZGRPcGVufVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBpc0RpYWxvZ0FkZE9wZW46IGZhbHNlIH0pfVxuICAgICAgICAvPlxuICAgICAgICA8U25hY2tiYXJcbiAgICAgICAgICBzaG93PXttZXNzYWdlLnNob3d9XG4gICAgICAgICAgaXNFcnJvcj17bWVzc2FnZS5pc0Vycm9yfVxuICAgICAgICAgIG1lc3NhZ2U9e21lc3NhZ2UudGV4dH1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBoaWRlTWVzc2FnZSgpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Ub2Rvcy5wcm9wVHlwZXMgPSB7XG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2hvdzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0Vycm9yOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgaGlkZU1lc3NhZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGluaXRGZXRjaEFsbENhdGVnb3JpZXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHNob3dMb2FkaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9kb3M7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBWaXNpYmlsaXR5U3dpdGNoIGZyb20gJy4vVmlzaWJpbGl0eVN3aXRjaCc7XG5pbXBvcnQgeyBBTExfVE9ET1MsIE9OTFlfQ09NUExFVEVELCBPTkxZX1RPX0NPTVBMRVRFIH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmNvbnN0IFZpc2liaWxpdHlGaWx0ZXIgPSAoe1xuICBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIsIG9uVmlzaWJpbGl0eVN3aXRjaENsaWNrLFxufSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cInZpc2liaWxpdHktZmlsdGVyLXdyYXBwZXJcIj5cbiAgICA8VmlzaWJpbGl0eVN3aXRjaFxuICAgICAgc2VsZWN0ZWQ9eyhzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IE9OTFlfVE9fQ09NUExFVEVcbiAgICAgICAgfHwgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyID09PSBBTExfVE9ET1MpfVxuICAgICAgb25DbGljaz17b25WaXNpYmlsaXR5U3dpdGNoQ2xpY2soT05MWV9UT19DT01QTEVURSl9XG4gICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICA+XG4gICAgICA8aSBjbGFzc05hbWU9XCJpY29uLWNpcmNsZS1ib3JkZXJcIiAvPlxuICAgIDwvVmlzaWJpbGl0eVN3aXRjaD5cbiAgICA8VmlzaWJpbGl0eVN3aXRjaFxuICAgICAgc2VsZWN0ZWQ9eyhzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IE9OTFlfQ09NUExFVEVEXG4gICAgICAgIHx8IHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciA9PT0gQUxMX1RPRE9TKX1cbiAgICAgIG9uQ2xpY2s9e29uVmlzaWJpbGl0eVN3aXRjaENsaWNrKE9OTFlfQ09NUExFVEVEKX1cbiAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgID5cbiAgICAgIDxpIGNsYXNzTmFtZT1cImljb24tY2lyY2xlXCIgLz5cbiAgICA8L1Zpc2liaWxpdHlTd2l0Y2g+XG4gIDwvZGl2PlxuKTtcblxuVmlzaWJpbGl0eUZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvblZpc2liaWxpdHlTd2l0Y2hDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFZpc2liaWxpdHlGaWx0ZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgVmlzaWJpbGl0eVN3aXRjaCA9ICh7XG4gIHNlbGVjdGVkLCBjaGlsZHJlbiwgb25DbGljayxcbn0pID0+IChcbiAgPGRpdlxuICAgIGNsYXNzTmFtZT17YHZpc2liaWxpdHktYnV0dG9uLXN3aXRjaCBhbGlnbi1pdGVtcy1jZW50ZXIgJHsoc2VsZWN0ZWQpID8gJ3NlbGVjdGVkJyA6ICcnfSBgfVxuICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gID5cbiAgICB7Y2hpbGRyZW59XG4gIDwvZGl2PlxuKTtcblxuVmlzaWJpbGl0eVN3aXRjaC5wcm9wVHlwZXMgPSB7XG4gIHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5WaXNpYmlsaXR5U3dpdGNoLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2VsZWN0ZWQ6IGZhbHNlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaWJpbGl0eVN3aXRjaDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDMwMDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgaGVpZ2h0ICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBoZWlnaHQ6IDAsXG59O1xuXG5jb25zdCBvbkVudGVyID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gYCR7bm9kZS5maXJzdEVsZW1lbnRDaGlsZC5vZmZzZXRIZWlnaHR9cHhgO1xufTtcblxuY29uc3Qgb25FeGl0ID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gJzBweCc7XG59O1xuXG5jb25zdCBDb2xsYXBzZSA9ICh7IGluOiBpblByb3AsIGNoaWxkcmVuIH0pID0+IChcbiAgPFRyYW5zaXRpb24gb25FbnRlcj17b25FbnRlcn0gb25FeGl0PXtvbkV4aXR9IGluPXtpblByb3B9IHRpbWVvdXQ9e2R1cmF0aW9ufT5cbiAgICB7KCkgPT4gKFxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuQ29sbGFwc2UucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb2xsYXBzZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDI1MDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgYWxsICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBoZWlnaHQ6ICcwcHgnLFxuICBvcGFjaXR5OiAnMCcsXG4gIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxufTtcblxuY29uc3QgdHJhbnNpdGlvblN0eWxlcyA9IHtcbiAgZW50ZXJpbmc6IHtcbiAgICBoZWlnaHQ6ICcwcHgnLFxuICAgIG9wYWNpdHk6ICcwJyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgfSxcbiAgZW50ZXJlZDoge1xuICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgaGVpZ2h0OiAnMTAwdmgnLFxuICAgIG9wYWNpdHk6ICcxJyxcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gIH0sXG59O1xuXG5jb25zdCBEaWFsb2dBbmltID0gKHsgaW46IGluUHJvcCwgY2hpbGRyZW4gfSkgPT4gKFxuICA8VHJhbnNpdGlvbiBpbj17aW5Qcm9wfSB0aW1lb3V0PXtkdXJhdGlvbn0+XG4gICAge3N0YXRlID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJiYWNrZHJvcC1kaWFsb2dcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgICAuLi50cmFuc2l0aW9uU3R5bGVzW3N0YXRlXSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuRGlhbG9nQW5pbS5wcm9wVHlwZXMgPSB7XG4gIGluOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpYWxvZ0FuaW07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSAyNTA7XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgd2lkdGg6ICcxMDAlJyxcbiAgdHJhbnNpdGlvbjogYG9wYWNpdHkgJHtkdXJhdGlvbn1tcyBlYXNlLWluLW91dGAsXG4gIG9wYWNpdHk6IDAsXG4gIGRpc3BsYXk6ICdpbmhlcml0Jyxcbn07XG5cbmNvbnN0IHRyYW5zaXRpb25TdHlsZXMgPSB7XG4gIGVudGVyOiB7IG9wYWNpdHk6IDAgfSxcbiAgZW50ZXJlZDogeyBvcGFjaXR5OiAxIH0sXG59O1xuXG5jb25zdCBSZXBsYWNlQW5pbSA9ICh7IGluOiBpblByb3AsIGVuZExpc3RlbmVyLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxUcmFuc2l0aW9uXG4gICAgaW49e2luUHJvcH1cbiAgICB0aW1lb3V0PXtkdXJhdGlvbn1cbiAgICBhZGRFbmRMaXN0ZW5lcj17ZW5kTGlzdGVuZXJ9XG4gID5cbiAgICB7c3RhdGUgPT4gKFxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgICAuLi50cmFuc2l0aW9uU3R5bGVzW3N0YXRlXSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuUmVwbGFjZUFuaW0ucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgZW5kTGlzdGVuZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVwbGFjZUFuaW07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSB7XG4gIGVudGVyOiAzMDAsXG4gIGV4aXQ6IDIwMCxcbn07XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgdHJhbnNpdGlvbjogYGFsbCAke2R1cmF0aW9uLmVudGVyfW1zIGVhc2UtaW4tb3V0YCxcbiAgaGVpZ2h0OiAwLFxuICBvcGFjaXR5OiAwLFxufTtcblxuY29uc3Qgb25FbnRlciA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XG4gIHN0eWxlLmhlaWdodCA9IGAke25vZGUuZmlyc3RFbGVtZW50Q2hpbGQub2Zmc2V0SGVpZ2h0fXB4YDtcbiAgc3R5bGUub3BhY2l0eSA9IDE7XG59O1xuXG5jb25zdCBvbkVudGVyZWQgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSAnYXV0byc7XG59O1xuXG5jb25zdCBvbkV4aXQgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSBgJHtub2RlLmZpcnN0RWxlbWVudENoaWxkLm9mZnNldEhlaWdodH1weGA7XG59O1xuXG5jb25zdCBvbkV4aXRlZCA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XG4gIHN0eWxlLmhlaWdodCA9ICcwcHgnO1xuICBzdHlsZS5vcGFjaXR5ID0gMDtcbn07XG5cblxuY29uc3QgUmVzaXplID0gKHsgLi4ucHJvcHMsIGNoaWxkcmVuIH0pID0+IChcbiAgPFRyYW5zaXRpb25cbiAgICB7Li4ucHJvcHN9XG4gICAgb25FbnRlcj17b25FbnRlcn1cbiAgICBvbkVudGVyZWQ9e29uRW50ZXJlZH1cbiAgICBvbkV4aXQ9e29uRXhpdH1cbiAgICBvbkV4aXRlZD17b25FeGl0ZWR9XG4gICAgdGltZW91dD17ZHVyYXRpb259XG4gID5cbiAgICB7KCkgPT4gKFxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuUmVzaXplLnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZXNpemU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSAyNTA7XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgdHJhbnNpdGlvbjogYGFsbCAke2R1cmF0aW9ufW1zIGVhc2UtaW4tb3V0YCxcbiAgYm90dG9tOiAnLTEwMHB4Jyxcbn07XG5cbmNvbnN0IHRyYW5zaXRpb25TdHlsZXMgPSB7XG4gIGVudGVyaW5nOiB7XG4gICAgYm90dG9tOiAnLTEwMHB4JyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgfSxcbiAgZW50ZXJlZDoge1xuICAgIGJvdHRvbTogJzBweCcsXG4gICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICB9LFxufTtcblxuY29uc3QgU25hY2tiYXJBbmltID0gKHsgaW46IGluUHJvcCwgY2hpbGRyZW4sIGN1c3RvbUNsYXNzIH0pID0+IChcbiAgPFRyYW5zaXRpb24gaW49e2luUHJvcH0gdGltZW91dD17ZHVyYXRpb259PlxuICAgIHtzdGF0ZSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPVwiY29udGVudC1zbmFja2JhclwiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxuICAgICAgICAgIC4uLnRyYW5zaXRpb25TdHlsZXNbc3RhdGVdLFxuICAgICAgICB9fVxuICAgICAgICBjbGFzc05hbWU9e2N1c3RvbUNsYXNzfVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICA8L1RyYW5zaXRpb24+XG4pO1xuXG5TbmFja2JhckFuaW0ucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIGN1c3RvbUNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuU25hY2tiYXJBbmltLmRlZmF1bHRQcm9wcyA9IHtcbiAgY3VzdG9tQ2xhc3M6ICcnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU25hY2tiYXJBbmltO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IHsgQUREX0FSR1VNRU5UIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCB7IGFkZENhdGVnb3J5IH0gZnJvbSAnLi4vLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VJbmZvIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5cbmNsYXNzIEFkZENhdGVnb3J5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5hbWU6ICcnLFxuICAgIH07XG4gICAgdGhpcy5vbklucHV0VGV4dENoYW5nZSA9IHRoaXMub25JbnB1dFRleHRDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQnV0dG9uQWRkQ2xpY2sgPSB0aGlzLm9uQnV0dG9uQWRkQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQ2F0ZWdvcnlDcmVhdGVkID0gdGhpcy5vbkNhdGVnb3J5Q3JlYXRlZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25JbnB1dFRleHRDaGFuZ2UoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBuYW1lOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgfVxuXG4gIG9uQnV0dG9uQWRkQ2xpY2soKSB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgZGlzcGF0Y2ggfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKG5hbWUgPT09ICcnKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ05hbWVSZXF1aXJlZCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkaXNwYXRjaChhZGRDYXRlZ29yeShuYW1lLCB0aGlzLm9uQ2F0ZWdvcnlDcmVhdGVkKSk7XG4gIH1cblxuICBvbkNhdGVnb3J5Q3JlYXRlZChzZWxlY3RlZENhdGVnb3J5KSB7XG4gICAgY29uc3QgeyBvbk5leHQgfSA9IHRoaXMucHJvcHM7XG4gICAgb25OZXh0KHsgc3RlcElkOiBBRERfQVJHVU1FTlQsIG9wdGlvbnM6IHsgc2VsZWN0ZWRDYXRlZ29yeSB9IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtYWRkLWNhdGVnb3J5XCI+XG4gICAgICAgIDxoMj5BZGQgbmV3IENBVEVHT1JZPC9oMj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4taW5wdXRcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJUeXBlIHRoZSBuYW1lXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4tYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25CdXR0b25BZGRDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICBBRERcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkFkZENhdGVnb3J5LnByb3BUeXBlcyA9IHtcbiAgZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoKShBZGRDYXRlZ29yeSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5pbXBvcnQgeyBTRUxFQ1RfQ09NUExFVEVfREFURSB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUluZm8gfSBmcm9tICcuLi8uLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcblxuY2xhc3MgQWRkVG9kb0FyZ3VtZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdGl0bGU6ICcnLFxuICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgIH07XG4gICAgdGhpcy5vbklucHV0VGV4dENoYW5nZSA9IHRoaXMub25JbnB1dFRleHRDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQnV0dG9uU2NoZWR1bGVDbGljayA9IHRoaXMub25CdXR0b25TY2hlZHVsZUNsaWNrLmJpbmQodGhpcyk7XG4gIH1cblxuICBvbklucHV0VGV4dENoYW5nZShuYW1lKSB7XG4gICAgcmV0dXJuIChlKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgW25hbWVdOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgICB9O1xuICB9XG5cbiAgb25CdXR0b25TY2hlZHVsZUNsaWNrKCkge1xuICAgIGNvbnN0IHsgb3B0aW9ucywgZGlzcGF0Y2gsIG9uTmV4dCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBjYXRlZ29yeSA9IG9wdGlvbnMuc2VsZWN0ZWRDYXRlZ29yeTtcbiAgICBpZiAodGl0bGUgPT09ICcnKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ1RpdGxlUmVxdWlyZWQpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25OZXh0KHsgc3RlcElkOiBTRUxFQ1RfQ09NUExFVEVfREFURSwgb3B0aW9uczogeyB0aXRsZSwgZGVzY3JpcHRpb24sIGNhdGVnb3J5IH0gfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBzZWxlY3RlZENhdGVnb3J5IH0gPSB0aGlzLnByb3BzLm9wdGlvbnM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1hZGQtYXJndW1lbnRcIj5cbiAgICAgICAgPGgyPkFkZCBuZXcgQVJHVU1FTlQ8L2gyPlxuICAgICAgICA8aDM+XG4gICAgICAgICAgZm9yIHRoZSBjYXRlZ29yeTpcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsYWJlbC1jYXRlZ29yeS1uYW1lXCI+XG4gICAgICAgICAgICB7YCAke3NlbGVjdGVkQ2F0ZWdvcnkubmFtZX1gfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9oMz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWZpZWxkc1wiPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlR5cGUgdGhlIHRpdGxlXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlKCd0aXRsZScpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVHlwZSB0aGUgZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dFRleHRDaGFuZ2UoJ2Rlc2NyaXB0aW9uJyl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1idXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkJ1dHRvblNjaGVkdWxlQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgU0NIRURVTEVcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkFkZFRvZG9Bcmd1bWVudC5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvcHRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHNlbGVjdGVkQ2F0ZWdvcnk6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIH0pLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoKShBZGRUb2RvQXJndW1lbnQpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBTZWxlY3RBY3Rpb25BZGQgZnJvbSAnLi9TZWxlY3RBY3Rpb25BZGQnO1xuaW1wb3J0IEFkZENhdGVnb3J5IGZyb20gJy4vQWRkQ2F0ZWdvcnknO1xuaW1wb3J0IFNlbGVjdENhdGVnb3J5IGZyb20gJy4vU2VsZWN0Q2F0ZWdvcnknO1xuaW1wb3J0IEFkZFRvZG9Bcmd1bWVudCBmcm9tICcuL0FkZFRvZG9Bcmd1bWVudCc7XG5pbXBvcnQgU2VsZWN0Q29tcGxldGVEYXRlIGZyb20gJy4vU2VsZWN0Q29tcGxldGVEYXRlJztcbmltcG9ydCBEb25lIGZyb20gJy4vRG9uZSc7XG5pbXBvcnQge1xuICBTRUxFQ1RfV0FOVF9UT19BREQsXG4gIEFERF9DQVRFR09SWSxcbiAgQUREX0FSR1VNRU5ULFxuICBTRUxFQ1RfQ0FURUdPUlksXG4gIFNFTEVDVF9DT01QTEVURV9EQVRFLFxuICBET05FLFxuICBzdGVwTGlzdCxcbn0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCBSZXBsYWNlQW5pbSBmcm9tICcuLi9hbmltcy9SZXBsYWNlQW5pbSc7XG5pbXBvcnQgRGlhbG9nQW5pbSBmcm9tICcuLi9hbmltcy9EaWFsb2dBbmltJztcbmltcG9ydCBTdGVwcyBmcm9tICcuL1N0ZXBzJztcblxuY29uc3QgZ2V0Q29udGVudFRvUmVuZGVyID0gKHN0ZXBzLCBwcm9wcykgPT4ge1xuICBpZiAoc3RlcHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIDxTZWxlY3RBY3Rpb25BZGQgey4uLnByb3BzfSAvPjtcbiAgfVxuICBjb25zdCBsYXN0U3RlcCA9IHN0ZXBzW3N0ZXBzLmxlbmd0aCAtIDFdO1xuICBzd2l0Y2ggKGxhc3RTdGVwLnN0ZXBJZCkge1xuICAgIGNhc2UgU0VMRUNUX1dBTlRfVE9fQUREOlxuICAgICAgcmV0dXJuIDxTZWxlY3RBY3Rpb25BZGQgey4uLnByb3BzfSAvPjtcbiAgICBjYXNlIEFERF9DQVRFR09SWTpcbiAgICAgIHJldHVybiA8QWRkQ2F0ZWdvcnkgey4uLnByb3BzfSAvPjtcbiAgICBjYXNlIEFERF9BUkdVTUVOVDpcbiAgICAgIHJldHVybiA8QWRkVG9kb0FyZ3VtZW50IHsuLi5wcm9wc30gb3B0aW9ucz17bGFzdFN0ZXAub3B0aW9uc30gLz47XG4gICAgY2FzZSBTRUxFQ1RfQ0FURUdPUlk6XG4gICAgICByZXR1cm4gPFNlbGVjdENhdGVnb3J5IHsuLi5wcm9wc30gLz47XG4gICAgY2FzZSBTRUxFQ1RfQ09NUExFVEVfREFURTpcbiAgICAgIHJldHVybiA8U2VsZWN0Q29tcGxldGVEYXRlIHsuLi5wcm9wc30gb3B0aW9ucz17bGFzdFN0ZXAub3B0aW9uc30gLz47XG4gICAgY2FzZSBET05FOlxuICAgICAgcmV0dXJuIDxEb25lIHsuLi5wcm9wc30gLz47XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiA8U2VsZWN0QWN0aW9uQWRkIHsuLi5wcm9wc30gLz47XG4gIH1cbn07XG5cbmNvbnN0IGluaXRhbFN0YXRlID0ge1xuICBuZXh0U3RlcHM6IFtdLFxuICBzdGVwczogW1xuICAgIHtcbiAgICAgIHN0ZXBJZDogU0VMRUNUX1dBTlRfVE9fQURELFxuICAgICAgb3B0aW9uczoge30sXG4gICAgfSxcbiAgXSxcbiAgc2hvd1N0ZXA6IHRydWUsXG59O1xuXG5jbGFzcyBEaWFsb2dBZGQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLi4uaW5pdGFsU3RhdGUsXG4gICAgfTtcbiAgICB0aGlzLm9uQmFjayA9IHRoaXMub25CYWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbk5leHQgPSB0aGlzLm9uTmV4dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25SZXNldEFuZENsb3NlID0gdGhpcy5vblJlc2V0QW5kQ2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQW5pbWF0aW9uRW5kID0gdGhpcy5vbkFuaW1hdGlvbkVuZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25CYWNrKCkge1xuICAgIGNvbnN0IHsgc3RlcHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvbkNsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHN0ZXBDb3VudCA9IHN0ZXBzLmxlbmd0aDtcbiAgICBpZiAoc3RlcENvdW50ID09PSAxKSB7XG4gICAgICAvLyBSZXR1cm5lZCB0byB0aGUgZmlyc3Qgc3RlcHMsIGNsb3NlIHRoZSBkaWFsb2dcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi5pbml0YWxTdGF0ZSB9KTtcbiAgICAgIG9uQ2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5leHRTdGVwczogW1xuICAgICAgICAgIC4uLnN0ZXBzLnNsaWNlKDAsIHN0ZXBzLmxlbmd0aCAtIDEpLFxuICAgICAgICBdLFxuICAgICAgICBzaG93U3RlcDogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbk5leHQoc3RlcCA9IHsgc3RlcElkOiAnJywgb3B0aW9uczoge30gfSkge1xuICAgIGNvbnN0IHsgc3RlcHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZXh0U3RlcHM6IFtcbiAgICAgICAgLi4uc3RlcHMsIHtcbiAgICAgICAgICAuLi5zdGVwLFxuICAgICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHNob3dTdGVwOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIG9uUmVzZXRBbmRDbG9zZSgpIHtcbiAgICBjb25zdCB7IG9uQ2xvc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgb25DbG9zZSgpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLmluaXRhbFN0YXRlIH0pO1xuICAgIH0sIDUwMCk7XG4gIH1cblxuICBvbkFuaW1hdGlvbkVuZChub2RlLCBkb25lKSB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgKCkgPT4ge1xuICAgICAgZG9uZSgpO1xuICAgICAgY29uc3QgeyBuZXh0U3RlcHMsIHNob3dTdGVwIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgaWYgKHNob3dTdGVwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzdGVwczogW1xuICAgICAgICAgIC4uLm5leHRTdGVwcyxcbiAgICAgICAgXSxcbiAgICAgICAgc2hvd1N0ZXA6IHRydWUsXG4gICAgICB9KTtcbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBzdGVwcywgc2hvd1N0ZXAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvbkNsb3NlLCBvcGVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgb25OZXh0LCBvblJlc2V0QW5kQ2xvc2UsIG9uQW5pbWF0aW9uRW5kIH0gPSB0aGlzO1xuICAgIHJldHVybiAoXG4gICAgICA8RGlhbG9nQW5pbSBpbj17b3Blbn0+XG4gICAgICAgIDxkaXYgaWQ9XCJkaWFsb2ctYWRkXCIgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlhbG9nLWhlYWRlclwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cIm1haW4tY2xvc2UtYnV0dG9uXCIgb25DbGljaz17KCkgPT4gb25DbG9zZSgpfT5cbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj4mI3hFNUNEOzwvaT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcHMtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8U3RlcHNcbiAgICAgICAgICAgICAgbGlzdD17c3RlcExpc3R9XG4gICAgICAgICAgICAgIHN0ZXBIaXN0b3J5PXtzdGVwc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaWFsb2ctY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8UmVwbGFjZUFuaW0gaW49e3Nob3dTdGVwfSBlbmRMaXN0ZW5lcj17b25BbmltYXRpb25FbmR9PlxuICAgICAgICAgICAgICB7Z2V0Q29udGVudFRvUmVuZGVyKHN0ZXBzLCB7IG9uTmV4dCwgb25DbG9zZTogb25SZXNldEFuZENsb3NlIH0pfVxuICAgICAgICAgICAgPC9SZXBsYWNlQW5pbT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpYWxvZy1mb290ZXJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgaWQ9XCJiYWNrLWJ1dHRvbi1kaWFsb2dcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMub25CYWNrKCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIE5FVkVSIE1JTkQsIEdPIEJBQ0tcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvRGlhbG9nQW5pbT5cbiAgICApO1xuICB9XG59XG5cbkRpYWxvZ0FkZC5wcm9wVHlwZXMgPSB7XG4gIG9wZW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaWFsb2dBZGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY2xhc3MgRG9uZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgeyBvbkNsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgICAgb25DbG9zZSgpO1xuICAgIH0sIDMwMDApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtZG9uZS1hZGRcIj5cbiAgICAgICAgPGgyPkRvbmUhPC9oMj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWljLWRvbmVcIj5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBzcmM9XCJpbWcvaWMtZG9uZS5zdmdcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaWMtZG9uZVwiXG4gICAgICAgICAgICBhbHQ9XCJkb25lIGljb25cIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Eb25lLnByb3BUeXBlcyA9IHtcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERvbmU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHsgQUREX0NBVEVHT1JZLCBTRUxFQ1RfQ0FURUdPUlkgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuXG5jb25zdCBTZWxlY3RBY3Rpb25BZGQgPSAoeyBvbk5leHQgfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtc2VsZWN0LWFjdGlvbi1hZGRcIj5cbiAgICA8aDI+V2hhdCB3b3VsZCB5b3UgbGlrZSB0byBhZGQ/PC9oMj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW0tc2VsZWN0XCI+XG4gICAgICA8cFxuICAgICAgICBjbGFzc05hbWU9XCJzZWxlY3QtdGl0bGVcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk5leHQoeyBzdGVwSWQ6IEFERF9DQVRFR09SWSwgb3B0aW9uczoge30gfSl9XG4gICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgPlxuICAgICAgICBDQVRFR09SWVxuICAgICAgPC9wPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbS1zZWxlY3RcIj5cbiAgICAgIDxwXG4gICAgICAgIGNsYXNzTmFtZT1cInNlbGVjdC10aXRsZVwiXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uTmV4dCh7IHN0ZXBJZDogU0VMRUNUX0NBVEVHT1JZLCBvcHRpb25zOiB7fSB9KX1cbiAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICA+XG4gICAgICAgIEFSR1VNRU5UXG4gICAgICA8L3A+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuU2VsZWN0QWN0aW9uQWRkLnByb3BUeXBlcyA9IHtcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0QWN0aW9uQWRkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IENhdGVnb3J5IGZyb20gJy4uL0NhdGVnb3J5JztcbmltcG9ydCB7IEFERF9BUkdVTUVOVCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUluZm8gfSBmcm9tICcuLi8uLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcblxuXG5jbGFzcyBTZWxlY3RDYXRlZ29yeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZENhdGVnb3J5OiB1bmRlZmluZWQsXG4gICAgfTtcbiAgICB0aGlzLm9uQ2F0ZWdvcnlDbGljayA9IHRoaXMub25DYXRlZ29yeUNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkJ1dHRvbk5leHRDbGljayA9IHRoaXMub25CdXR0b25OZXh0Q2xpY2suYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uQ2F0ZWdvcnlDbGljayhjYXRlZ29yeSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZENhdGVnb3J5OiBjYXRlZ29yeSB9KTtcbiAgfVxuXG4gIG9uQnV0dG9uTmV4dENsaWNrKCkge1xuICAgIGNvbnN0IHsgc2VsZWN0ZWRDYXRlZ29yeSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IG9uTmV4dCwgZGlzcGF0Y2ggfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKHNlbGVjdGVkQ2F0ZWdvcnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VJbmZvKGxhYmVscy5tc2dTZWxlY3RDYXRlZ29yeSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvbk5leHQoeyBzdGVwSWQ6IEFERF9BUkdVTUVOVCwgb3B0aW9uczogeyBzZWxlY3RlZENhdGVnb3J5IH0gfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjYXRlZ29yaWVzTGlzdCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1zZWxlY3QtY2F0ZWdvcnlcIj5cbiAgICAgICAgPGgyPkNob29zZSBhIENBVEVHT1JZPC9oMj5cbiAgICAgICAgPGRpdiBpZD1cImNvbnRlbnQtY2F0ZWdvcmllc1wiPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNhdGVnb3JpZXNMaXN0Lm1hcChjYXRlZ29yeSA9PiAoXG4gICAgICAgICAgICAgIChjYXRlZ29yeS5pZCAhPT0gJzAnKVxuICAgICAgICAgICAgICA/IDxDYXRlZ29yeVxuICAgICAgICAgICAgICAgIGtleT17Y2F0ZWdvcnkuaWR9XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk9e2NhdGVnb3J5fVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtzZWxlY3RlZENhdGVnb3J5ICE9PSB1bmRlZmluZWQgJiYgY2F0ZWdvcnkuaWQgPT09IHNlbGVjdGVkQ2F0ZWdvcnkuaWR9XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNhdGVnb3J5Q2xpY2t9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICApKVxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1idXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkJ1dHRvbk5leHRDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICBORVhUXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TZWxlY3RDYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjYXRlZ29yaWVzTGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3AgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICBjYXRlZ29yaWVzTGlzdDogc3RhdGUudG9kb0ZpbHRlcnMuY2F0ZWdvcmllcyxcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcCkoU2VsZWN0Q2F0ZWdvcnkpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IERhdGVQaWNrZXIgZnJvbSAncmVhY3QtZGF0ZS1waWNrZXInO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IHsgRE9ORSB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgeyBhZGRUb2RvQXJndW1lbnQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL3RvZG9Bcmd1bWVudHNBY3Rpb25zJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5jbGFzcyBTZWxlY3RDb21wbGV0ZURhdGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdG9kb1dpdGhpbjogbmV3IERhdGUoKSxcbiAgICB9O1xuICAgIHRoaXMub25JbnB1dERhdGVDaGFuZ2UgPSB0aGlzLm9uSW5wdXREYXRlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkJ1dHRvbkFkZENsaWNrID0gdGhpcy5vbkJ1dHRvbkFkZENsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblRvZG9Bcmd1bWVudENyZWF0ZWQgPSB0aGlzLm9uVG9kb0FyZ3VtZW50Q3JlYXRlZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25JbnB1dERhdGVDaGFuZ2UoZGF0ZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyB0b2RvV2l0aGluOiBkYXRlIH0pO1xuICB9XG5cbiAgb25CdXR0b25BZGRDbGljaygpIHtcbiAgICBjb25zdCB7IHRvZG9XaXRoaW4gfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBkaXNwYXRjaCwgb3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgY2F0ZWdvcnkgfSA9IG9wdGlvbnM7XG4gICAgaWYgKCF0b2RvV2l0aGluIHx8IHRvZG9XaXRoaW4gPT09ICcnKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ1NlbGVjdERhdGUpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGlzcGF0Y2goYWRkVG9kb0FyZ3VtZW50KFxuICAgICAgdGl0bGUsIGRlc2NyaXB0aW9uLFxuICAgICAgY2F0ZWdvcnksIHRvZG9XaXRoaW4sIHRoaXMub25Ub2RvQXJndW1lbnRDcmVhdGVkLFxuICAgICkpO1xuICB9XG5cbiAgb25Ub2RvQXJndW1lbnRDcmVhdGVkKCkge1xuICAgIGNvbnN0IHsgb25OZXh0IH0gPSB0aGlzLnByb3BzO1xuICAgIG9uTmV4dCh7IHN0ZXBJZDogRE9ORSwgb3B0aW9uczogeyB9IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgdG9kb1dpdGhpbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LXNlbGVjdC1jb21wbGV0ZS1kYXRlXCI+XG4gICAgICAgIDxoMj5Ub2RvIFdpdGhpbjwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1pbnB1dFwiPlxuICAgICAgICAgIDxEYXRlUGlja2VyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIGNhbGVuZGFyQ2xhc3NOYW1lPVwiZGFyay1jYWxlbmRhclwiXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0RGF0ZUNoYW5nZX1cbiAgICAgICAgICAgIHZhbHVlPXt0b2RvV2l0aGlufVxuICAgICAgICAgICAgbWluRGF0ZT17bmV3IERhdGUoKX1cbiAgICAgICAgICAgIGxvY2FsZT1cImVuLVVTXCJcbiAgICAgICAgICAgIGNsZWFySWNvbj17PGkgY2xhc3NOYW1lPVwiaWNvbi1kZWxldGVcIiAvPn1cbiAgICAgICAgICAgIGNhbGVuZGFySWNvbj17PGkgY2xhc3NOYW1lPVwiaWNvbi1jYWxlbmRhclwiIC8+fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4tYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25CdXR0b25BZGRDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICBBRERcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblNlbGVjdENvbXBsZXRlRGF0ZS5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvcHRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgZGVzY3JpcHRpb246IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjYXRlZ29yeTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgfSkuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCgpKFNlbGVjdENvbXBsZXRlRGF0ZSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgU3RlcCA9ICh7IGRlc2NyaXB0aW9uLCBjb21wbGV0ZWQsIG5lZWRMaW5lIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNvbnRhaW5lclwiPlxuICAgIHtcbiAgICAgIG5lZWRMaW5lICYmXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGxpbmUgJHsoY29tcGxldGVkKSA/ICdjb21wbGV0ZWQnIDogJyd9YH0gLz5cbiAgICB9XG4gICAgPGRpdiBjbGFzc05hbWU9e2BzdGVwICR7KGNvbXBsZXRlZCkgPyAnY29tcGxldGVkJyA6ICcnfWB9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmRpY2F0b3JcIiAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWRlc2NyaXB0aW9uXCI+XG4gICAgICAgIDxwPntkZXNjcmlwdGlvbn08L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4pO1xuXG5TdGVwLnByb3BUeXBlcyA9IHtcbiAgZGVzY3JpcHRpb246IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBuZWVkTGluZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbn07XG5cbmNvbnN0IFN0ZXBzID0gKHsgbGlzdCwgc3RlcEhpc3RvcnkgfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXBzLXdyYXBwZXJcIj5cbiAgICB7XG4gICAgICBsaXN0Lm1hcCgoaXRlbSwgaSkgPT4gKFxuICAgICAgICA8U3RlcFxuICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICB7Li4uaXRlbX1cbiAgICAgICAgICBjb21wbGV0ZWQ9e3N0ZXBIaXN0b3J5LmZpbHRlcihzaCA9PiBzaC5zdGVwSWQgPT09IGl0ZW0uaWQpLmxlbmd0aCA+IDB9XG4gICAgICAgICAgbmVlZExpbmU9e2kgPiAwfVxuICAgICAgICAvPikpXG4gICAgfVxuICA8L2Rpdj5cbik7XG5cblN0ZXBzLnByb3BUeXBlcyA9IHtcbiAgbGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIHN0ZXBIaXN0b3J5OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHN0ZXBJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgfSkpLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdGVwcztcbiIsImNvbnN0IGxhYmVscyA9IHtcbiAgbXNnVGl0bGVSZXF1aXJlZDogJ0VudGVyIHRoZSB0aXRsZScsXG4gIG1zZ05hbWVSZXF1aXJlZDogJ0VudGVyIHRoZSBuYW1lJyxcbiAgbXNnU2VsZWN0Q2F0ZWdvcnk6ICdTZWxlY3QgYSBjYXRlZ29yeScsXG4gIG1zZ1NlbGVjdERhdGU6ICdQaWNrIGEgZGF0ZSBhbmQgY29tbWl0LiBObyBleGN1c2VzIScsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBsYWJlbHM7XG4iLCJleHBvcnQgY29uc3QgU0VMRUNUX1dBTlRfVE9fQUREID0gJ1NFTEVDVF9XQU5UX1RPX0FERCc7XG5leHBvcnQgY29uc3QgQUREX0NBVEVHT1JZID0gJ0FERF9DQVRFR09SWSc7XG5leHBvcnQgY29uc3QgQUREX0FSR1VNRU5UID0gJ0FERF9BUkdVTUVOVCc7XG5leHBvcnQgY29uc3QgU0VMRUNUX0NBVEVHT1JZID0gJ1NFTEVDVF9DQVRFR09SWSc7XG5leHBvcnQgY29uc3QgU0VMRUNUX0NPTVBMRVRFX0RBVEUgPSAnU0VMRUNUX0NPTVBMRVRFX0RBVEUnO1xuZXhwb3J0IGNvbnN0IERPTkUgPSAnRE9ORSc7XG5cbmV4cG9ydCBjb25zdCBzdGVwTGlzdCA9IFtcbiAge1xuICAgIGlkOiBTRUxFQ1RfV0FOVF9UT19BREQsXG4gICAgZGVzY3JpcHRpb246ICdXaGF0IHdhbnQgdG8gYWRkJyxcbiAgfSxcbiAge1xuICAgIGlkOiBBRERfQ0FURUdPUlksXG4gICAgZGVzY3JpcHRpb246ICdBZGQgYSBjYXRlZ29yeScsXG4gIH0sXG4gIHtcbiAgICBpZDogU0VMRUNUX0NBVEVHT1JZLFxuICAgIGRlc2NyaXB0aW9uOiAnU2VsZWN0IGEgY2F0ZWdvcnknLFxuICB9LFxuICB7XG4gICAgaWQ6IEFERF9BUkdVTUVOVCxcbiAgICBkZXNjcmlwdGlvbjogJ0FkZCBBcmd1bWVudCcsXG4gIH0sXG4gIHtcbiAgICBpZDogU0VMRUNUX0NPTVBMRVRFX0RBVEUsXG4gICAgZGVzY3JpcHRpb246ICdTY2hlZHVsZScsXG4gIH0sXG4gIHtcbiAgICBpZDogRE9ORSxcbiAgICBkZXNjcmlwdGlvbjogJ1RoYXRcXCdzIGl0JyxcbiAgfSxcbl07XG4iLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IENhdGVnb3JpZXNGaWx0ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9DYXRlZ29yaWVzRmlsdGVyJztcbmltcG9ydCB7XG4gIHNlbGVjdENhdGVnb3J5LFxuICBzZWxlY3RDYXRlZ29yeUFsbCxcbiAgZGVsZXRlQ2F0ZWdvcnksXG59IGZyb20gJy4uL2FjdGlvbnMvdG9kb0ZpbHRlcnNBY3Rpb25zJztcbmltcG9ydCBjYXRlZ29yeUFsbCBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcblxuaW1wb3J0IHsgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICBjYXRlZ29yeUxpc3Q6IGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0KHN0YXRlKSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgb25EZWxldGVDYXRlZ29yeTogKGNhdGVnb3J5KSA9PiB7XG4gICAgICBkaXNwYXRjaChkZWxldGVDYXRlZ29yeShjYXRlZ29yeS5pZCkpO1xuICAgIH0sXG4gICAgb25DaWxja0NhdGVnb3J5OiAoY2F0ZWdvcnksIGUpID0+IHtcbiAgICAgIGlmIChlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdpJyAmJiBlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdidXR0b24nKSB7XG4gICAgICAgIGlmIChjYXRlZ29yeS5pZCA9PT0gY2F0ZWdvcnlBbGwuaWQpIHtcbiAgICAgICAgICBkaXNwYXRjaChzZWxlY3RDYXRlZ29yeUFsbCgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaXNwYXRjaChzZWxlY3RDYXRlZ29yeShjYXRlZ29yeSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgfVxuKTtcblxuY29uc3QgQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lciA9IGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuKShDYXRlZ29yaWVzRmlsdGVyKTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lcjtcbiIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVG9kb0FyZ3VtZW50cyBmcm9tICcuLi9jb21wb25lbnRzL1RvZG9Bcmd1bWVudHMnO1xuaW1wb3J0IHtcbiAgZmV0Y2hUb2RvQXJndW1lbnRzQnlDYXRlZ29yeSxcbiAgZGVsZXRlVG9kb0FyZ3VtZW50LFxuICB0b29nbGVUb2RvQXJndW1lbnRDb21wbGV0ZWQsXG59IGZyb20gJy4uL2FjdGlvbnMvdG9kb0FyZ3VtZW50c0FjdGlvbnMnO1xuXG5pbXBvcnQgeyBnZXRUb2RvQXJndW1lbnRzTGlzdCwgZ2V0U2tpcCwgc3RpbGxNb3JlVG9Mb2FkIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9Bcmd1bWVudHNTZWxlY3RvcnMnO1xuaW1wb3J0IHsgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQsIHZpc2liaWxpdHlPbmx5Q29tcGxldGVkIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgbGlzdFRvZG9Bcmd1bWVudHM6IGdldFRvZG9Bcmd1bWVudHNMaXN0KHN0YXRlKSxcbiAgICBza2lwOiBnZXRTa2lwKHN0YXRlKSxcbiAgICBtb3JlVG9Mb2FkOiBzdGlsbE1vcmVUb0xvYWQoc3RhdGUpLFxuICAgIGNhdGVnb3JpZXNJZDogZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQoc3RhdGUpLFxuICAgIGNvbXBsZXRlZDogdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQoc3RhdGUpLFxuICB9XG4pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoXG4gIHtcbiAgICBvbkRlbGV0ZUFyZ3VtZW50OiAoYXJndW1lbnQpID0+IHtcbiAgICAgIGRpc3BhdGNoKGRlbGV0ZVRvZG9Bcmd1bWVudChhcmd1bWVudC5pZCkpO1xuICAgIH0sXG4gICAgb25Db21wbGV0ZUFyZ3VtZW50OiAoYXJndW1lbnQpID0+IHtcbiAgICAgIGRpc3BhdGNoKHRvb2dsZVRvZG9Bcmd1bWVudENvbXBsZXRlZChhcmd1bWVudC5pZCwgYXJndW1lbnQuY29tcGxldGVkKSk7XG4gICAgfSxcbiAgICBmZXRjaFRvZG9Bcmd1bWVudHM6IChjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCwgbGltaXQsIHNraXApID0+IHtcbiAgICAgIGRpc3BhdGNoKGZldGNoVG9kb0FyZ3VtZW50c0J5Q2F0ZWdvcnkoY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsIGxpbWl0LCBza2lwKSk7XG4gICAgfSxcbiAgfVxuKTtcblxuY29uc3QgVG9kb0FyZ3VtZW50c0NvbnRhaW5lciA9IGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuKShUb2RvQXJndW1lbnRzKTtcblxuZXhwb3J0IGRlZmF1bHQgVG9kb0FyZ3VtZW50c0NvbnRhaW5lcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgVG9kb3MgZnJvbSAnLi4vY29tcG9uZW50cy9Ub2Rvcyc7XG5pbXBvcnQgeyBmZXRjaEFsbENhdGVnb3JpZXMgfSBmcm9tICcuLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5pbXBvcnQgeyBoaWRlTWVzc2FnZSB9IGZyb20gJy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuaW1wb3J0IHsgc2hvd0xvYWRpbmcgfSBmcm9tICcuLi9zZWxlY3RvcnMvY29tbW9uU2VsZWN0b3JzJztcblxuY29uc3QgVG9kb3NDb250YWluZXIgPSBwcm9wcyA9PiA8VG9kb3Mgey4uLnByb3BzfSAvPjtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgbWVzc2FnZTogc3RhdGUubWVzc2FnZSxcbiAgICBzaG93TG9hZGluZzogc2hvd0xvYWRpbmcoc3RhdGUpLFxuICB9XG4pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoXG4gIHtcbiAgICBoaWRlTWVzc2FnZTogKCkgPT4ge1xuICAgICAgZGlzcGF0Y2goaGlkZU1lc3NhZ2UoKSk7XG4gICAgfSxcbiAgICBpbml0RmV0Y2hBbGxDYXRlZ29yaWVzOiAoKSA9PiB7XG4gICAgICBkaXNwYXRjaChmZXRjaEFsbENhdGVnb3JpZXMoKSk7XG4gICAgfSxcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVG9kb3NDb250YWluZXIpO1xuIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaXNpYmlsaXR5RmlsdGVycyBmcm9tICcuLi9jb21wb25lbnRzL1Zpc2liaWxpdHlGaWx0ZXJzJztcbmltcG9ydCB7IGNoYW5nZVZpc2liaWxpdHkgfSBmcm9tICcuLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5cbmltcG9ydCB7IGdldFZpc2liaWxpdHlGaWx0ZXIgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXI6IGdldFZpc2liaWxpdHlGaWx0ZXIoc3RhdGUpLFxuICB9XG4pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoXG4gIHtcbiAgICBvblZpc2liaWxpdHlTd2l0Y2hDbGljazogdmlzaWJpbGl0eSA9PiAoKSA9PiAoXG4gICAgICBkaXNwYXRjaChjaGFuZ2VWaXNpYmlsaXR5KHZpc2liaWxpdHkpKVxuICAgICksXG4gIH1cbik7XG5cbmNvbnN0IFZpc2liaWxpdHlGaWx0ZXJDb250YWluZXIgPSBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbikoVmlzaWJpbGl0eUZpbHRlcnMpO1xuXG5leHBvcnQgZGVmYXVsdCBWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyO1xuIiwiaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgeyBpc0ZldGNoaW5nQ2F0ZWdvcmllc0ZpbHRlciB9IGZyb20gJy4vdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuaW1wb3J0IHsgaXNGZXRjaGluZ1RvZG9Bcmd1bWVudHMgfSBmcm9tICcuL3RvZG9Bcmd1bWVudHNTZWxlY3RvcnMnO1xuXG5leHBvcnQgY29uc3Qgc2hvd0xvYWRpbmcgPSBjcmVhdGVTZWxlY3RvcihcbiAgaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIsXG4gIGlzRmV0Y2hpbmdUb2RvQXJndW1lbnRzLFxuICAoaXNGZXRjaGluZ0NhdGVnb3JpZXMsIGlzRmV0Y2hpbmdUb2RvcykgPT4gaXNGZXRjaGluZ0NhdGVnb3JpZXMgfHwgaXNGZXRjaGluZ1RvZG9zLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgc2hvd0xvYWRpbmc7XG4iLCJleHBvcnQgY29uc3QgaXNGZXRjaGluZ1RvZG9Bcmd1bWVudHMgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvQXJndW1lbnRzLmlzRmV0Y2hpbmc7XG5leHBvcnQgY29uc3QgZ2V0VG9kb0FyZ3VtZW50cyA9IHN0YXRlID0+IHN0YXRlLnRvZG9Bcmd1bWVudHM7XG5leHBvcnQgY29uc3QgZ2V0VG9kb0FyZ3VtZW50c0xpc3QgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvQXJndW1lbnRzLml0ZW1zO1xuZXhwb3J0IGNvbnN0IGdldFNraXAgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvQXJndW1lbnRzLnNraXA7XG5leHBvcnQgY29uc3Qgc3RpbGxNb3JlVG9Mb2FkID0gc3RhdGUgPT4gc3RhdGUudG9kb0FyZ3VtZW50cy5tb3JlVG9Mb2FkO1xuIiwiaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgeyBPTkxZX0NPTVBMRVRFRCB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuXG5leHBvcnQgY29uc3QgaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy5pc0ZldGNoaW5nO1xuZXhwb3J0IGNvbnN0IGdldFRvZG9GaWx0ZXJzID0gc3RhdGUgPT4gc3RhdGUudG9kb0ZpbHRlcnM7XG5leHBvcnQgY29uc3QgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy5jYXRlZ29yaWVzO1xuZXhwb3J0IGNvbnN0IGdldFZpc2liaWxpdHlGaWx0ZXIgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy52aXNpYmlsaXR5O1xuXG5leHBvcnQgY29uc3QgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0VmlzaWJpbGl0eUZpbHRlcixcbiAgdmlzaWJpbGl0eSA9PiB2aXNpYmlsaXR5ID09PSBPTkxZX0NPTVBMRVRFRCxcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRTZWxlY3RlZENhdGVnb3JpZXNGaWx0ZXIgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QsXG4gIGNhdGVnb3JpZXMgPT4gY2F0ZWdvcmllcy5maWx0ZXIoY2F0ZWdvcnkgPT4gY2F0ZWdvcnkuc2VsZWN0ZWQpLFxuKTtcblxuZXhwb3J0IGNvbnN0IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0LFxuICBjYXRlZ29yaWVzID0+IGNhdGVnb3JpZXMuZmlsdGVyKGNhdGVnb3J5ID0+IGNhdGVnb3J5LnNlbGVjdGVkKVxuICAgIC5tYXAoY2F0ZWdvcnlGaWx0ZXIgPT4gY2F0ZWdvcnlGaWx0ZXIuaWQpLFxuKTtcbiIsIi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJjb25zaXN0ZW50XCJdICovXG5cbmV4cG9ydCBjb25zdCBNZXRob2RzID0ge1xuICBQT1NUOiAnUE9TVCcsXG4gIEdFVDogJ0dFVCcsXG4gIERFTEVURTogJ0RFTEVURScsXG59O1xuXG5jb25zdCBmdWxsVXJsID0gdXJsID0+IGAvYXBpLyR7dXJsfWA7XG5cbmNvbnN0IGJhc2VSZXF1ZXN0SW5pdCA9IHtcbiAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgaGVhZGVyczoge1xuICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gIH0sXG59O1xuXG5jb25zdCBjcmVhdGVQb3N0UmVxdWVzdCA9ICh1cmwsIG9wdGlvbnMgPSB7fSkgPT4gKFxuICBmZXRjaCh1cmwsIHtcbiAgICAuLi5iYXNlUmVxdWVzdEluaXQsXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkob3B0aW9ucyksXG4gIH0pXG4pO1xuXG5jb25zdCBjcmVhdGVHZXRSZXF1ZXN0ID0gKHVybCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGxldCBmaW5hbFVybCA9IGAke3VybH0/YDtcbiAgT2JqZWN0LmVudHJpZXMob3B0aW9ucykuZm9yRWFjaCgoW2tleSwgdmFsdWVdLCBwb2l0aW9uKSA9PiB7XG4gICAgZmluYWxVcmwgPSBgJHtmaW5hbFVybH0keyhwb2l0aW9uID4gMCkgPyAnJicgOiAnJ30ke2tleX09JHt2YWx1ZX1gO1xuICB9KTtcbiAgcmV0dXJuIGZldGNoKGZpbmFsVXJsLCB7XG4gICAgLi4uYmFzZVJlcXVlc3RJbml0LFxuICAgIG1ldGhvZDogJ0dFVCcsXG4gIH0pO1xufTtcblxuY29uc3QgY3JlYXRlRGVsZXRlUmVxdWVzdCA9ICh1cmwsIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgZmluYWxVcmwgPSBgJHt1cmx9LyR7b3B0aW9uc31gO1xuICByZXR1cm4gZmV0Y2goZmluYWxVcmwsIHtcbiAgICAuLi5iYXNlUmVxdWVzdEluaXQsXG4gICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVSZXF1ZXN0ID0gKHVybCwgb3B0aW9ucywgbWV0aG9kKSA9PiB7XG4gIGNvbnN0IGZpbmFsVXJsID0gZnVsbFVybCh1cmwpO1xuICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgIGNhc2UgTWV0aG9kcy5QT1NUOiByZXR1cm4gY3JlYXRlUG9zdFJlcXVlc3QoZmluYWxVcmwsIG9wdGlvbnMpO1xuICAgIGNhc2UgTWV0aG9kcy5HRVQ6IHJldHVybiBjcmVhdGVHZXRSZXF1ZXN0KGZpbmFsVXJsLCBvcHRpb25zKTtcbiAgICBjYXNlIE1ldGhvZHMuREVMRVRFOiByZXR1cm4gY3JlYXRlRGVsZXRlUmVxdWVzdChmaW5hbFVybCwgb3B0aW9ucyk7XG4gICAgZGVmYXVsdDogcmV0dXJuIGNyZWF0ZVBvc3RSZXF1ZXN0KGZpbmFsVXJsLCBvcHRpb25zKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNhbGxBcGkgPSAodXJsLCBvcHRpb25zID0ge30sIG1ldGhvZCA9IE1ldGhvZHMuUE9TVCkgPT4gKFxuICBjcmVhdGVSZXF1ZXN0KHVybCwgb3B0aW9ucywgbWV0aG9kKS50aGVuKFxuICAgIHJlc3BvbnNlID0+IChyZXNwb25zZS5vayA/XG4gICAgICByZXNwb25zZS5qc29uKCkgOlxuICAgICAgUHJvbWlzZS5yZWplY3QocmVzcG9uc2UudGV4dCgpKVxuICAgICksXG4gICAgZXJyb3IgPT4gUHJvbWlzZS5yZWplY3QoZXJyb3IpLFxuICApXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBjYWxsQXBpO1xuXG4iLCJpbXBvcnQgZGF0ZUZvcm1hdCBmcm9tICdkYXRlZm9ybWF0JztcblxuZXhwb3J0IGNvbnN0IHRvSnNEYXRlID0gKHBhcnNlRGF0ZSA9ICcnKSA9PlxuICBuZXcgRGF0ZShwYXJzZUludChwYXJzZURhdGUuc3Vic3RyKDYpLCAxMCkpO1xuXG5leHBvcnQgY29uc3QgdG9TaW1wbGVEYXRlRm9ybWF0ID0gZGF0ZSA9PlxuICBkYXRlRm9ybWF0KGRhdGUsICdkZGRkIGRkIG1tbSB5eXl5Jyk7XG4iXSwic291cmNlUm9vdCI6IiJ9