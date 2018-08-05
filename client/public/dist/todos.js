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
    var request = (0, _ApiUtils.callApi)('/fetch-arguments-by-category', {
      categoriesId: categoriesId, completed: completed, limit: limit, skip: skip
    });
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
    var request = (0, _ApiUtils.callApi)('/delete-argument', { todoArgumentId: todoArgumentId });
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
    var request = (0, _ApiUtils.callApi)('/add-argument', {
      title: title,
      description: description,
      categoryId: category.id,
      todoWithin: todoWithin
    });
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
    category: _propTypes2.default.shape({}).isRequired,
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

  _createClass(TodoArguments, null, [{
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
  }]);

  return TodoArguments;
}(_react2.default.Component);

TodoArguments.propTypes = {
  onDeleteArgument: _propTypes2.default.func.isRequired,
  onCompleteArgument: _propTypes2.default.func.isRequired,
  listTodoArguments: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string.isRequired,
    completed: _propTypes2.default.bool.isRequired,
    category: _propTypes2.default.shape({}).isRequired
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy9tZXNzYWdlQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy90b2RvQXJndW1lbnRzQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQnV0dG9uQ29tcGxldGVBcmd1bWVudC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQnV0dG9uRGVsZXRlQXJndW1lbnQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0J1dHRvbkRlbGV0ZUNhdGVnb3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CdXR0b25TY29sbC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2F0ZWdvcmllc0ZpbHRlci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2F0ZWdvcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0luZmluaXRlU2Nyb2xsLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9NYWluQWRkQnV0dG9uLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9TbmFja2Jhci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVG9kb0FyZ3VtZW50LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ub2RvQXJndW1lbnRzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ub2Rvcy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVmlzaWJpbGl0eUZpbHRlcnMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Zpc2liaWxpdHlTd2l0Y2guanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FuaW1zL0NvbGxhcHNlLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9EaWFsb2dBbmltLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9SZXBsYWNlQW5pbS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvUmVzaXplLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9TbmFja2JhckFuaW0uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9BZGRDYXRlZ29yeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0FkZFRvZG9Bcmd1bWVudC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0RpYWxvZ0FkZC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL0RvbmUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9TZWxlY3RBY3Rpb25BZGQuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2RpYWxvZ0FkZC9TZWxlY3RDYXRlZ29yeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL1NlbGVjdENvbXBsZXRlRGF0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZGlhbG9nQWRkL1N0ZXBzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2xhYmVscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL3N0ZXBzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL0NhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL1RvZG9Bcmd1bWVudHNDb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL1RvZG9zQ29udGFpbmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9WaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0b3JzL2NvbW1vblNlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0b3JzL3RvZG9Bcmd1bWVudHNTZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvQXBpVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL0NvbW1vbi5qcyJdLCJuYW1lcyI6WyJzaG93TWVzc2FnZUluZm8iLCJ0eXBlIiwiU0hPV19NRVNTQUdFX0lORk8iLCJtZXNzYWdlIiwic2hvd01lc3NhZ2VFcnJvciIsIlNIT1dfTUVTU0FHRV9FUlJPUiIsImhpZGVNZXNzYWdlIiwiSElERV9NRVNTQUdFIiwicmVxdWVzdEZldGNoQXJndW1lbnRzIiwibGltaXQiLCJza2lwIiwiUkVRVUVTVF9GRVRDSF9BUkdVTUVOVFMiLCJyZWNlaXZlRmV0Y2hBcmd1bWVudHMiLCJSRUNFSVZFX0ZFVENIX0FSR1VNRU5UUyIsInRvZG9Bcmd1bWVudHMiLCJlcnJvckZldGNoQXJndW1lbnRzIiwiRVJST1JfRkVUQ0hfQVJHVU1FTlRTIiwiZXJyb3IiLCJhZGRBcmd1bWVudExvY2FsIiwiQUREX0FSR1VNRU5UX0xPQ0FMIiwidG9kb0FyZ3VtZW50IiwicmVtb3ZlQXJndW1lbnRMb2NhbCIsIlJFTU9WRV9BUkdVTUVOVF9MT0NBTCIsInRvZG9Bcmd1bWVudEluZGV4IiwidXBkYXRlQXJndW1lbnRMb2NhbCIsIlVQREFURV9BUkdVTUVOVF9MT0NBTCIsImZldGNoVG9kb0FyZ3VtZW50c0J5Q2F0ZWdvcnkiLCJjYXRlZ29yaWVzSWQiLCJjb21wbGV0ZWQiLCJxdWVyeUl0ZW1zTGltaXQiLCJkaXNwYXRjaCIsInJlcXVlc3QiLCJ0aGVuIiwicmVzcG9uc2UiLCJzdWNjZXNzIiwidG9kb3MiLCJkYXRhIiwibWFwIiwidG9kbyIsImNvbXBsZXRlZEF0IiwidW5kZWZpbmVkIiwidG9kb1dpdGhpbiIsIm1lc3NhZ2VFcnJvciIsImRlbGV0ZVRvZG9Bcmd1bWVudCIsInRvZG9Bcmd1bWVudElkIiwiZ2V0U3RhdGUiLCJpdGVtcyIsImZpbmRJbmRleCIsImlkIiwiYWRkVG9kb0FyZ3VtZW50IiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImNhdGVnb3J5IiwiY2FsbGJhY2siLCJjYXRlZ29yeUlkIiwidG9vZ2xlVG9kb0FyZ3VtZW50Q29tcGxldGVkIiwiZmV0Y2hBcmd1bWVudHMiLCJzdGF0ZSIsInJlcXVlc3RGZXRjaEFsbENhdGVnb3JpZXMiLCJSRVFVRVNUX0ZFVENIX0FMTF9DQVRFR09SSUVTIiwicmVjZWl2ZUZldGNoQWxsQ2F0ZWdvcmllcyIsIlJFQ0VJVkVfRkVUQ0hfQUxMX0NBVEVHT1JJRVMiLCJjYXRlZ29yaWVzIiwiZXJyb3JGZXRjaEFsbENhdGVnb3JpZXMiLCJFUlJPUl9GRVRDSF9BTExfQ0FURUdPUklFUyIsImFkZENhdGVnb3J5TG9jYWwiLCJBRERfQ0FURUdPUllfTE9DQUwiLCJyZW1vdmVDYXRlZ29yeUxvY2FsIiwiUkVNT1ZFX0NBVEVHT1JZX0xPQ0FMIiwiY2F0ZWdvcnlJbmRleCIsInRvb2dsZVNlbGVjdENhdGVnb3J5IiwiVE9PR0xFX1NFTEVDVF9DQVRFR09SWSIsInNlbGVjdGVkQ2F0ZWdvcnkiLCJ0b29nbGVTZWxlY3RDYXRlZ29yeUFsbCIsIlRPT0dMRV9TRUxFQ1RfQ0FURUdPUllfQUxMIiwic3dpdGNoVmlzaWJpbGl0eUZpbHRlciIsIlNXSVRDSF9WSVNJQklMSVRZX0ZJTFRFUiIsInZpc2liaWxpdHkiLCJmZXRjaEFsbENhdGVnb3JpZXMiLCJNZXRob2RzIiwiR0VUIiwiZGVsZXRlQ2F0ZWdvcnkiLCJERUxFVEUiLCJ0b2RvRmlsdGVycyIsImFkZENhdGVnb3J5IiwibmFtZSIsIlBPU1QiLCJjaGFuZ2VWaXNpYmlsaXR5Iiwic2VsZWN0Q2F0ZWdvcnkiLCJzZWxlY3RDYXRlZ29yeUFsbCIsIkJ1dHRvbkNvbXBsZXRlQXJndW1lbnQiLCJvbkNsaWNrIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJib29sIiwiZGVmYXVsdFByb3BzIiwiQnV0dG9uRGVsZXRlQXJndW1lbnQiLCJCdXR0b25EZWxldGVDYXRlZ29yeSIsIkJ1dHRvblNjcm9sbCIsImRpcmVjdGlvbiIsIm9uZU9mIiwiQ2F0ZWdvcmllc0ZpbHRlciIsInByb3BzIiwiY2hpcHMiLCJoYW5kbGVMZWZ0U2Nyb2xsQ2xpY2siLCJiaW5kIiwiaGFuZGxlUmlnaHRTY3JvbGxDbGljayIsIm1vdmVDaGlwc1Njcm9sbCIsImNsaWVudFdpZHRoIiwiZGVsdGEiLCJuZXh0U2Nyb2xsTGVmdCIsInNjcm9sbExlZnQiLCJzY3JvbGwiLCJsZWZ0IiwiY2F0ZWdvcnlMaXN0Iiwib25EZWxldGVDYXRlZ29yeSIsIm9uQ2lsY2tDYXRlZ29yeSIsIm5vZGUiLCJkaXNwbGF5IiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJzZWxlY3RlZCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiYXJyYXlPZiIsInNoYXBlIiwic3RyaW5nIiwiQ2F0ZWdvcnkiLCJvbkRlbGV0ZSIsImNzc0NsYXNzIiwib25DaGlwQ2xpY2siLCJlIiwib25EZWxldGVDbGljayIsIndhaXRUaW1lIiwiSW5maW5pdGVTY3JvbGwiLCJvblNjcm9sbCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaW5uZXJIZWlnaHQiLCJzY3JvbGxZIiwiZG9jdW1lbnQiLCJib2R5Iiwib2Zmc2V0SGVpZ2h0IiwiYXJncyIsImNoaWxkcmVuIiwiY2xhc3NOYW1lIiwiYW55IiwiTWFpbkFkZEJ1dHRvbiIsIkFjdGlvbiIsInRleHQiLCJTbmFja2JhciIsIm9uQ2xvc2UiLCJkdXJhdGlvbiIsInNob3ciLCJzZXRUaW1lb3V0IiwiaXNFcnJvciIsImFjdGlvblRleHQiLCJhY3Rpb25DbGljayIsInZlcnRpY2FsUG9zdGlvbiIsImhvcml6b250YWxQb3NpdGlvbiIsIm51bWJlciIsIlRvZG9Bcmd1bWVudCIsImNvbGxhcHNlZCIsInJlbmRlckRhdGUiLCJzZXRTdGF0ZSIsImFyZ3VtZW50Iiwib25Db21wbGV0ZSIsIm9uVGl0bGVDbGljayIsImluaXRpYWxTdGF0ZSIsIlRvZG9Bcmd1bWVudHMiLCJuZXh0UHJvcHMiLCJwcmV2U3RhdGUiLCJvbkZldGNoVG9kb0FyZ3VtZW50c05leHQiLCJmZXRjaFRvZG9Bcmd1bWVudHMiLCJtb3JlVG9Mb2FkIiwibmV3U2tpcCIsImxpc3RUb2RvQXJndW1lbnRzIiwib25EZWxldGVBcmd1bWVudCIsIm9uQ29tcGxldGVBcmd1bWVudCIsImFyZyIsIlRvZG9zIiwiaXNEaWFsb2dBZGRPcGVuIiwiaW5pdEZldGNoQWxsQ2F0ZWdvcmllcyIsInNob3dMb2FkaW5nIiwiVmlzaWJpbGl0eUZpbHRlciIsInNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciIsIm9uVmlzaWJpbGl0eVN3aXRjaENsaWNrIiwiT05MWV9UT19DT01QTEVURSIsIkFMTF9UT0RPUyIsIk9OTFlfQ09NUExFVEVEIiwiVmlzaWJpbGl0eVN3aXRjaCIsImRlZmF1bHRTdHlsZSIsInRyYW5zaXRpb24iLCJoZWlnaHQiLCJvbkVudGVyIiwic3R5bGUiLCJmaXJzdEVsZW1lbnRDaGlsZCIsIm9uRXhpdCIsIkNvbGxhcHNlIiwiaW5Qcm9wIiwiaW4iLCJvcGFjaXR5IiwidHJhbnNpdGlvblN0eWxlcyIsImVudGVyaW5nIiwiZW50ZXJlZCIsIkRpYWxvZ0FuaW0iLCJ3aWR0aCIsImVudGVyIiwiUmVwbGFjZUFuaW0iLCJlbmRMaXN0ZW5lciIsImV4aXQiLCJvbkVudGVyZWQiLCJvbkV4aXRlZCIsIlJlc2l6ZSIsImJvdHRvbSIsIlNuYWNrYmFyQW5pbSIsImN1c3RvbUNsYXNzIiwiQWRkQ2F0ZWdvcnkiLCJvbklucHV0VGV4dENoYW5nZSIsIm9uQnV0dG9uQWRkQ2xpY2siLCJvbkNhdGVnb3J5Q3JlYXRlZCIsInRhcmdldCIsInZhbHVlIiwibGFiZWxzIiwibXNnTmFtZVJlcXVpcmVkIiwib25OZXh0Iiwic3RlcElkIiwiQUREX0FSR1VNRU5UIiwib3B0aW9ucyIsIkFkZFRvZG9Bcmd1bWVudCIsIm9uQnV0dG9uU2NoZWR1bGVDbGljayIsIm1zZ1RpdGxlUmVxdWlyZWQiLCJTRUxFQ1RfQ09NUExFVEVfREFURSIsImdldENvbnRlbnRUb1JlbmRlciIsInN0ZXBzIiwibGVuZ3RoIiwibGFzdFN0ZXAiLCJTRUxFQ1RfV0FOVF9UT19BREQiLCJBRERfQ0FURUdPUlkiLCJTRUxFQ1RfQ0FURUdPUlkiLCJET05FIiwiaW5pdGFsU3RhdGUiLCJuZXh0U3RlcHMiLCJzaG93U3RlcCIsIkRpYWxvZ0FkZCIsIm9uQmFjayIsIm9uUmVzZXRBbmRDbG9zZSIsIm9uQW5pbWF0aW9uRW5kIiwic3RlcENvdW50Iiwic2xpY2UiLCJzdGVwIiwiY29tcGxldGUiLCJkb25lIiwib3BlbiIsInN0ZXBMaXN0IiwiRG9uZSIsIlNlbGVjdEFjdGlvbkFkZCIsIlNlbGVjdENhdGVnb3J5Iiwib25DYXRlZ29yeUNsaWNrIiwib25CdXR0b25OZXh0Q2xpY2siLCJtc2dTZWxlY3RDYXRlZ29yeSIsImNhdGVnb3JpZXNMaXN0IiwibWFwU3RhdGVUb1Byb3AiLCJTZWxlY3RDb21wbGV0ZURhdGUiLCJEYXRlIiwib25JbnB1dERhdGVDaGFuZ2UiLCJvblRvZG9Bcmd1bWVudENyZWF0ZWQiLCJkYXRlIiwibXNnU2VsZWN0RGF0ZSIsIlN0ZXAiLCJuZWVkTGluZSIsIlN0ZXBzIiwibGlzdCIsInN0ZXBIaXN0b3J5IiwiaXRlbSIsImkiLCJmaWx0ZXIiLCJzaCIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImNhdGVnb3J5QWxsIiwiQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lciIsIlRvZG9Bcmd1bWVudHNDb250YWluZXIiLCJUb2Rvc0NvbnRhaW5lciIsIlZpc2liaWxpdHlGaWx0ZXJDb250YWluZXIiLCJWaXNpYmlsaXR5RmlsdGVycyIsImlzRmV0Y2hpbmdDYXRlZ29yaWVzRmlsdGVyIiwiaXNGZXRjaGluZ1RvZG9Bcmd1bWVudHMiLCJpc0ZldGNoaW5nQ2F0ZWdvcmllcyIsImlzRmV0Y2hpbmdUb2RvcyIsImlzRmV0Y2hpbmciLCJnZXRUb2RvQXJndW1lbnRzIiwiZ2V0VG9kb0FyZ3VtZW50c0xpc3QiLCJnZXRTa2lwIiwic3RpbGxNb3JlVG9Mb2FkIiwiZ2V0VG9kb0ZpbHRlcnMiLCJnZXRDYXRlZ29yaWVzRmlsdGVyTGlzdCIsImdldFZpc2liaWxpdHlGaWx0ZXIiLCJ2aXNpYmlsaXR5T25seUNvbXBsZXRlZCIsImdldFNlbGVjdGVkQ2F0ZWdvcmllc0ZpbHRlciIsImdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkIiwiY2F0ZWdvcnlGaWx0ZXIiLCJmdWxsVXJsIiwidXJsIiwiYmFzZVJlcXVlc3RJbml0IiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwiY3JlYXRlUG9zdFJlcXVlc3QiLCJmZXRjaCIsIm1ldGhvZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjcmVhdGVHZXRSZXF1ZXN0IiwiZmluYWxVcmwiLCJPYmplY3QiLCJlbnRyaWVzIiwiZm9yRWFjaCIsInBvaXRpb24iLCJrZXkiLCJjcmVhdGVEZWxldGVSZXF1ZXN0IiwiY3JlYXRlUmVxdWVzdCIsImNhbGxBcGkiLCJvayIsImpzb24iLCJQcm9taXNlIiwicmVqZWN0IiwidG9Kc0RhdGUiLCJwYXJzZURhdGUiLCJwYXJzZUludCIsInN1YnN0ciIsInRvU2ltcGxlRGF0ZUZvcm1hdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFNTyxJQUFNQSw0Q0FBa0IsU0FBbEJBLGVBQWtCO0FBQUEsU0FDN0I7QUFDRUMsVUFBTUMsOEJBRFI7QUFFRUM7QUFGRixHQUQ2QjtBQUFBLENBQXhCOztBQU9BLElBQU1DLDhDQUFtQixTQUFuQkEsZ0JBQW1CO0FBQUEsU0FDOUI7QUFDRUgsVUFBTUksK0JBRFI7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QU0rRiw0QkFBVSxTQUFWQSxPQUFVLENBQUNsQixHQUFEO0FBQUEsTUFBTTdFLE9BQU4sdUVBQWdCLEVBQWhCO0FBQUEsTUFBb0JtRixNQUFwQix1RUFBNkIzTyxRQUFRTyxJQUFyQztBQUFBLFNBQ3JCK08sY0FBY2pCLEdBQWQsRUFBbUI3RSxPQUFuQixFQUE0Qm1GLE1BQTVCLEVBQW9DMVIsSUFBcEMsQ0FDRTtBQUFBLFdBQWFDLFNBQVNzUyxFQUFULEdBQ1h0UyxTQUFTdVMsSUFBVCxFQURXLEdBRVhDLFFBQVFDLE1BQVIsQ0FBZXpTLFNBQVN1SCxJQUFULEVBQWYsQ0FGRjtBQUFBLEdBREYsRUFLRTtBQUFBLFdBQVNpTCxRQUFRQyxNQUFSLENBQWV6VCxLQUFmLENBQVQ7QUFBQSxHQUxGLENBRHFCO0FBQUEsQ0FBaEI7O2tCQVVRcVQsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFZjs7Ozs7O0FBRU8sSUFBTUssOEJBQVcsU0FBWEEsUUFBVztBQUFBLE1BQUNDLFNBQUQsdUVBQWEsRUFBYjtBQUFBLFNBQ3RCLElBQUlqRSxJQUFKLENBQVNrRSxTQUFTRCxVQUFVRSxNQUFWLENBQWlCLENBQWpCLENBQVQsRUFBOEIsRUFBOUIsQ0FBVCxDQURzQjtBQUFBLENBQWpCOztBQUdBLElBQU1DLGtEQUFxQixTQUFyQkEsa0JBQXFCO0FBQUEsU0FDaEMsMEJBQVdqRSxJQUFYLEVBQWlCLGtCQUFqQixDQURnQztBQUFBLENBQTNCLEMiLCJmaWxlIjoidG9kb3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBTSE9XX01FU1NBR0VfSU5GTyxcbiAgU0hPV19NRVNTQUdFX0VSUk9SLFxuICBISURFX01FU1NBR0UsXG59IGZyb20gJy4uL2NvbnN0YW50cy9hY3Rpb25UeXBlcyc7XG5cbmV4cG9ydCBjb25zdCBzaG93TWVzc2FnZUluZm8gPSBtZXNzYWdlID0+IChcbiAge1xuICAgIHR5cGU6IFNIT1dfTUVTU0FHRV9JTkZPLFxuICAgIG1lc3NhZ2UsXG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBzaG93TWVzc2FnZUVycm9yID0gbWVzc2FnZSA9PiAoXG4gIHtcbiAgICB0eXBlOiBTSE9XX01FU1NBR0VfRVJST1IsXG4gICAgbWVzc2FnZSxcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGhpZGVNZXNzYWdlID0gKCkgPT4gKFxuICB7XG4gICAgdHlwZTogSElERV9NRVNTQUdFLFxuICB9XG4pO1xuIiwiaW1wb3J0IHsgY2FsbEFwaSB9IGZyb20gJy4uL3V0aWxzL0FwaVV0aWxzJztcbmltcG9ydCB7XG4gIFJFUVVFU1RfRkVUQ0hfQVJHVU1FTlRTLFxuICBSRUNFSVZFX0ZFVENIX0FSR1VNRU5UUyxcbiAgRVJST1JfRkVUQ0hfQVJHVU1FTlRTLFxuICBBRERfQVJHVU1FTlRfTE9DQUwsXG4gIFJFTU9WRV9BUkdVTUVOVF9MT0NBTCxcbiAgVVBEQVRFX0FSR1VNRU5UX0xPQ0FMLFxufSBmcm9tICcuLi9jb25zdGFudHMvYWN0aW9uVHlwZXMnO1xuaW1wb3J0IHsgcXVlcnlJdGVtc0xpbWl0IH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUVycm9yIH0gZnJvbSAnLi9tZXNzYWdlQWN0aW9ucyc7XG5pbXBvcnQgeyB0b0pzRGF0ZSB9IGZyb20gJy4uL3V0aWxzL0NvbW1vbic7XG5cbmNvbnN0IHJlcXVlc3RGZXRjaEFyZ3VtZW50cyA9IChsaW1pdCwgc2tpcCkgPT4gKFxuICB7XG4gICAgdHlwZTogUkVRVUVTVF9GRVRDSF9BUkdVTUVOVFMsXG4gICAgbGltaXQsXG4gICAgc2tpcCxcbiAgfVxuKTtcblxuY29uc3QgcmVjZWl2ZUZldGNoQXJndW1lbnRzID0gdG9kb0FyZ3VtZW50cyA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRUNFSVZFX0ZFVENIX0FSR1VNRU5UUyxcbiAgICB0b2RvQXJndW1lbnRzLFxuICB9XG4pO1xuXG5jb25zdCBlcnJvckZldGNoQXJndW1lbnRzID0gZXJyb3IgPT4gKFxuICB7XG4gICAgdHlwZTogRVJST1JfRkVUQ0hfQVJHVU1FTlRTLFxuICAgIGVycm9yLFxuICB9XG4pO1xuXG5jb25zdCBhZGRBcmd1bWVudExvY2FsID0gdG9kb0FyZ3VtZW50ID0+IChcbiAge1xuICAgIHR5cGU6IEFERF9BUkdVTUVOVF9MT0NBTCxcbiAgICB0b2RvQXJndW1lbnQsXG4gIH1cbik7XG5cbmNvbnN0IHJlbW92ZUFyZ3VtZW50TG9jYWwgPSB0b2RvQXJndW1lbnRJbmRleCA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRU1PVkVfQVJHVU1FTlRfTE9DQUwsXG4gICAgdG9kb0FyZ3VtZW50SW5kZXgsXG4gIH1cbik7XG5cbmNvbnN0IHVwZGF0ZUFyZ3VtZW50TG9jYWwgPSB0b2RvQXJndW1lbnQgPT4gKFxuICB7XG4gICAgdHlwZTogVVBEQVRFX0FSR1VNRU5UX0xPQ0FMLFxuICAgIHRvZG9Bcmd1bWVudCxcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGZldGNoVG9kb0FyZ3VtZW50c0J5Q2F0ZWdvcnkgPSAoXG4gIGNhdGVnb3JpZXNJZCA9IFtdLFxuICBjb21wbGV0ZWQgPSBmYWxzZSxcbiAgbGltaXQgPSBxdWVyeUl0ZW1zTGltaXQsXG4gIHNraXAgPSAwLFxuKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgZGlzcGF0Y2gocmVxdWVzdEZldGNoQXJndW1lbnRzKGxpbWl0LCBza2lwKSk7XG4gIGNvbnN0IHJlcXVlc3QgPSBjYWxsQXBpKCcvZmV0Y2gtYXJndW1lbnRzLWJ5LWNhdGVnb3J5Jywge1xuICAgIGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgc2tpcCxcbiAgfSk7XG4gIHJldHVybiByZXF1ZXN0LnRoZW4oXG4gICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICBjb25zdCB0b2RvcyA9IHJlc3BvbnNlLmRhdGEubWFwKHRvZG8gPT5cbiAgICAgICAgICAoe1xuICAgICAgICAgICAgLi4udG9kbyxcbiAgICAgICAgICAgIGNvbXBsZXRlZEF0OiAodG9kby5jb21wbGV0ZWRBdCkgPyB0b0pzRGF0ZSh0b2RvLmNvbXBsZXRlZEF0KSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHRvZG9XaXRoaW46ICh0b2RvLnRvZG9XaXRoaW4pID8gdG9Kc0RhdGUodG9kby50b2RvV2l0aGluKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB9KSk7XG4gICAgICAgIGRpc3BhdGNoKHJlY2VpdmVGZXRjaEFyZ3VtZW50cyh0b2RvcykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGF0Y2goZXJyb3JGZXRjaEFyZ3VtZW50cyhyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yID0+ICh7IGVycm9yIH0pLFxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZVRvZG9Bcmd1bWVudCA9ICh0b2RvQXJndW1lbnRJZCA9ICcnKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGNvbnN0IHJlcXVlc3QgPSBjYWxsQXBpKCcvZGVsZXRlLWFyZ3VtZW50JywgeyB0b2RvQXJndW1lbnRJZCB9KTtcbiAgcmV0dXJuIHJlcXVlc3QudGhlbihcbiAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIGNvbnN0IHsgaXRlbXMgfSA9IGdldFN0YXRlKCkudG9kb0FyZ3VtZW50cztcbiAgICAgICAgY29uc3QgdG9kb0FyZ3VtZW50SW5kZXggPSBpdGVtcy5maW5kSW5kZXgodG9kb0FyZ3VtZW50ID0+XG4gICAgICAgICAgdG9kb0FyZ3VtZW50LmlkID09PSB0b2RvQXJndW1lbnRJZCk7XG4gICAgICAgIGRpc3BhdGNoKHJlbW92ZUFyZ3VtZW50TG9jYWwodG9kb0FyZ3VtZW50SW5kZXgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBlcnJvciA9PiAoeyBlcnJvciB9KSxcbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRUb2RvQXJndW1lbnQgPSAodGl0bGUgPSAnJywgZGVzY3JpcHRpb24gPSAnJywgY2F0ZWdvcnkgPSB7IGlkOiAnJyB9LCB0b2RvV2l0aGluLCBjYWxsYmFjayA9IHVuZGVmaW5lZCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGNvbnN0IHJlcXVlc3QgPSBjYWxsQXBpKFxuICAgICcvYWRkLWFyZ3VtZW50JyxcbiAgICB7XG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnkuaWQsXG4gICAgICB0b2RvV2l0aGluLFxuICAgIH0sXG4gICk7XG4gIHJldHVybiByZXF1ZXN0LnRoZW4oXG4gICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICBjb25zdCB0b2RvID0ge1xuICAgICAgICAgIC4uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgY29tcGxldGVkQXQ6IChyZXNwb25zZS5kYXRhLmNvbXBsZXRlZEF0KVxuICAgICAgICAgICAgPyB0b0pzRGF0ZShyZXNwb25zZS5kYXRhLmNvbXBsZXRlZEF0KSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB0b2RvV2l0aGluOiAocmVzcG9uc2UuZGF0YS50b2RvV2l0aGluKVxuICAgICAgICAgICAgPyB0b0pzRGF0ZShyZXNwb25zZS5kYXRhLnRvZG9XaXRoaW4pIDogdW5kZWZpbmVkLFxuICAgICAgICB9O1xuICAgICAgICBkaXNwYXRjaChhZGRBcmd1bWVudExvY2FsKHRvZG8pKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLm1lc3NhZ2VFcnJvcikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3IgPT4gKHsgZXJyb3IgfSksXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgdG9vZ2xlVG9kb0FyZ3VtZW50Q29tcGxldGVkID0gKHRvZG9Bcmd1bWVudElkID0gJycsIGNvbXBsZXRlZCA9IGZhbHNlKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgY29uc3QgcmVxdWVzdCA9IGNhbGxBcGkoJy90b29nbGUtYXJndW1lbnQtY29tcGxldGVkJywgeyB0b2RvQXJndW1lbnRJZCwgY29tcGxldGVkIH0pO1xuICByZXR1cm4gcmVxdWVzdC50aGVuKFxuICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgY29uc3QgdG9kbyA9IHtcbiAgICAgICAgICAuLi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIGNvbXBsZXRlZEF0OiAocmVzcG9uc2UuZGF0YS5jb21wbGV0ZWRBdClcbiAgICAgICAgICAgID8gdG9Kc0RhdGUocmVzcG9uc2UuZGF0YS5jb21wbGV0ZWRBdCkgOiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgICAgIGRpc3BhdGNoKHVwZGF0ZUFyZ3VtZW50TG9jYWwodG9kbykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihyZXNwb25zZS5tZXNzYWdlRXJyb3IpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yID0+ICh7IGVycm9yIH0pLFxuICApO1xufTtcbiIsImltcG9ydCB7IGNhbGxBcGksIE1ldGhvZHMgfSBmcm9tICcuLi91dGlscy9BcGlVdGlscyc7XG5pbXBvcnQge1xuICBSRVFVRVNUX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICBSRUNFSVZFX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICBFUlJPUl9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgQUREX0NBVEVHT1JZX0xPQ0FMLFxuICBSRU1PVkVfQ0FURUdPUllfTE9DQUwsXG4gIFRPT0dMRV9TRUxFQ1RfQ0FURUdPUlksXG4gIFRPT0dMRV9TRUxFQ1RfQ0FURUdPUllfQUxMLFxuICBTV0lUQ0hfVklTSUJJTElUWV9GSUxURVIsXG59IGZyb20gJy4uL2NvbnN0YW50cy9hY3Rpb25UeXBlcyc7XG5pbXBvcnQgeyBxdWVyeUl0ZW1zTGltaXQgfSBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcbmltcG9ydCB7IGZldGNoVG9kb0FyZ3VtZW50c0J5Q2F0ZWdvcnkgfSBmcm9tICcuL3RvZG9Bcmd1bWVudHNBY3Rpb25zJztcbmltcG9ydCB7IHNob3dNZXNzYWdlRXJyb3IgfSBmcm9tICcuL21lc3NhZ2VBY3Rpb25zJztcbmltcG9ydCB7IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkLCB2aXNpYmlsaXR5T25seUNvbXBsZXRlZCB9IGZyb20gJy4uL3NlbGVjdG9ycy90b2RvRmlsdGVyc1NlbGVjdG9ycyc7XG5cbmNvbnN0IGZldGNoQXJndW1lbnRzID0gc3RhdGUgPT4gZmV0Y2hUb2RvQXJndW1lbnRzQnlDYXRlZ29yeShcbiAgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQoc3RhdGUpLFxuICB2aXNpYmlsaXR5T25seUNvbXBsZXRlZChzdGF0ZSksXG4pO1xuXG5jb25zdCByZXF1ZXN0RmV0Y2hBbGxDYXRlZ29yaWVzID0gKCkgPT4gKFxuICB7XG4gICAgdHlwZTogUkVRVUVTVF9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgfVxuKTtcblxuY29uc3QgcmVjZWl2ZUZldGNoQWxsQ2F0ZWdvcmllcyA9IGNhdGVnb3JpZXMgPT4gKFxuICB7XG4gICAgdHlwZTogUkVDRUlWRV9GRVRDSF9BTExfQ0FURUdPUklFUyxcbiAgICBjYXRlZ29yaWVzLFxuICB9XG4pO1xuXG5jb25zdCBlcnJvckZldGNoQWxsQ2F0ZWdvcmllcyA9IGVycm9yID0+IChcbiAge1xuICAgIHR5cGU6IEVSUk9SX0ZFVENIX0FMTF9DQVRFR09SSUVTLFxuICAgIGVycm9yLFxuICB9XG4pO1xuXG5jb25zdCBhZGRDYXRlZ29yeUxvY2FsID0gY2F0ZWdvcnkgPT4gKFxuICB7XG4gICAgdHlwZTogQUREX0NBVEVHT1JZX0xPQ0FMLFxuICAgIGNhdGVnb3J5LFxuICB9XG4pO1xuXG5jb25zdCByZW1vdmVDYXRlZ29yeUxvY2FsID0gY2F0ZWdvcnlJbmRleCA9PiAoXG4gIHtcbiAgICB0eXBlOiBSRU1PVkVfQ0FURUdPUllfTE9DQUwsXG4gICAgY2F0ZWdvcnlJbmRleCxcbiAgfVxuKTtcblxuY29uc3QgdG9vZ2xlU2VsZWN0Q2F0ZWdvcnkgPSBzZWxlY3RlZENhdGVnb3J5ID0+IChcbiAge1xuICAgIHR5cGU6IFRPT0dMRV9TRUxFQ1RfQ0FURUdPUlksXG4gICAgc2VsZWN0ZWRDYXRlZ29yeSxcbiAgfVxuKTtcblxuY29uc3QgdG9vZ2xlU2VsZWN0Q2F0ZWdvcnlBbGwgPSAoKSA9PiAoXG4gIHtcbiAgICB0eXBlOiBUT09HTEVfU0VMRUNUX0NBVEVHT1JZX0FMTCxcbiAgfVxuKTtcblxuY29uc3Qgc3dpdGNoVmlzaWJpbGl0eUZpbHRlciA9IHZpc2liaWxpdHkgPT4gKFxuICB7XG4gICAgdHlwZTogU1dJVENIX1ZJU0lCSUxJVFlfRklMVEVSLFxuICAgIHZpc2liaWxpdHksXG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBmZXRjaEFsbENhdGVnb3JpZXMgPSAobGltaXQgPSBxdWVyeUl0ZW1zTGltaXQsIHNraXAgPSAwKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGRpc3BhdGNoKHJlcXVlc3RGZXRjaEFsbENhdGVnb3JpZXMoKSk7XG4gIGNvbnN0IHJlcXVlc3QgPSBjYWxsQXBpKCdjYXRlZ29yaWVzJywgeyBsaW1pdCwgc2tpcCB9LCBNZXRob2RzLkdFVCk7XG4gIHJldHVybiByZXF1ZXN0LnRoZW4oXG4gICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICBkaXNwYXRjaChyZWNlaXZlRmV0Y2hBbGxDYXRlZ29yaWVzKHJlc3BvbnNlLmRhdGEpKTtcbiAgICAgICAgZGlzcGF0Y2goZmV0Y2hUb2RvQXJndW1lbnRzQnlDYXRlZ29yeShnZXRTZWxlY3RlZENhdGVnb3JpZXNJZChnZXRTdGF0ZSgpKSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGF0Y2goZXJyb3JGZXRjaEFsbENhdGVnb3JpZXMocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBlcnJvciA9PiAoXG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKVxuICAgICksXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgZGVsZXRlQ2F0ZWdvcnkgPSAoY2F0ZWdvcnlJZCA9ICcnKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGNvbnN0IHJlcXVlc3QgPSBjYWxsQXBpKCdjYXRlZ29yaWVzJywgY2F0ZWdvcnlJZCwgTWV0aG9kcy5ERUxFVEUpO1xuICByZXR1cm4gcmVxdWVzdC50aGVuKFxuICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgY29uc3QgeyBjYXRlZ29yaWVzIH0gPSBnZXRTdGF0ZSgpLnRvZG9GaWx0ZXJzO1xuICAgICAgICBjb25zdCBjYXRlZ29yeUluZGV4ID0gY2F0ZWdvcmllcy5maW5kSW5kZXgoY2F0ZWdvcnkgPT4gY2F0ZWdvcnkuaWQgPT09IGNhdGVnb3J5SWQpO1xuICAgICAgICBkaXNwYXRjaChyZW1vdmVDYXRlZ29yeUxvY2FsKGNhdGVnb3J5SW5kZXgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoKHNob3dNZXNzYWdlRXJyb3IocmVzcG9uc2UubWVzc2FnZUVycm9yKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBlcnJvciA9PiAoXG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKGVycm9yLm1lc3NhZ2UpKVxuICAgICksXG4gICk7XG59O1xuXG4vKipcbiAqIFJlcXVlc3QgdG8gYWRkIGEgY2F0ZWdvcnlcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIGNhdGVnb3J5IG5hbWUgdG8gYWRkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IG5lZWQgdG8gaGFuZGxlIHRoZSBjYXRlZ29yeSBjcmVhdGVkXG4gKi9cbmV4cG9ydCBjb25zdCBhZGRDYXRlZ29yeSA9IChuYW1lID0gJycsIGNhbGxiYWNrID0gdW5kZWZpbmVkKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgY29uc3QgcmVxdWVzdCA9IGNhbGxBcGkoJ2NhdGVnb3JpZXMnLCB7IG5hbWUgfSwgTWV0aG9kcy5QT1NUKTtcbiAgcmV0dXJuIHJlcXVlc3QudGhlbihcbiAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIGRpc3BhdGNoKGFkZENhdGVnb3J5TG9jYWwocmVzcG9uc2UuZGF0YSkpO1xuICAgICAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUVycm9yKHJlc3BvbnNlLm1lc3NhZ2VFcnJvcikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3IgPT4gKFxuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VFcnJvcihlcnJvci5tZXNzYWdlKSlcbiAgICApLFxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IGNoYW5nZVZpc2liaWxpdHkgPSB2aXNpYmlsaXR5ID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgZGlzcGF0Y2goc3dpdGNoVmlzaWJpbGl0eUZpbHRlcih2aXNpYmlsaXR5KSk7XG4gIHJldHVybiBkaXNwYXRjaChmZXRjaEFyZ3VtZW50cyhnZXRTdGF0ZSgpKSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0Q2F0ZWdvcnkgPSBzZWxlY3RlZENhdGVnb3J5ID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgZGlzcGF0Y2godG9vZ2xlU2VsZWN0Q2F0ZWdvcnkoc2VsZWN0ZWRDYXRlZ29yeSkpO1xuICByZXR1cm4gZGlzcGF0Y2goZmV0Y2hBcmd1bWVudHMoZ2V0U3RhdGUoKSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdENhdGVnb3J5QWxsID0gKCkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBkaXNwYXRjaCh0b29nbGVTZWxlY3RDYXRlZ29yeUFsbCgpKTtcbiAgcmV0dXJuIGRpc3BhdGNoKGZldGNoQXJndW1lbnRzKGdldFN0YXRlKCkpKTtcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgQnV0dG9uQ29tcGxldGVBcmd1bWVudCA9ICh7IG9uQ2xpY2ssIGNvbXBsZXRlZCB9KSA9PiAoXG4gIDxidXR0b25cbiAgICBjbGFzc05hbWU9e2BidXR0b24tY29tcGxldGUtYXJndW1lbnQgJHsoY29tcGxldGVkKSA/ICdidXR0b24tY29tcGxldGVkLWFyZ3VtZW50JyA6ICcnfWB9XG4gICAgb25DbGljaz17b25DbGlja31cbiAgPlxuICAgIDxpIGNsYXNzTmFtZT1cImljb24tY2hlY2tcIiAvPlxuICA8L2J1dHRvbj5cbik7XG5cbkJ1dHRvbkNvbXBsZXRlQXJndW1lbnQucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLFxufTtcblxuQnV0dG9uQ29tcGxldGVBcmd1bWVudC5kZWZhdWx0UHJvcHMgPSB7XG4gIGNvbXBsZXRlZDogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25Db21wbGV0ZUFyZ3VtZW50O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEJ1dHRvbkRlbGV0ZUFyZ3VtZW50ID0gKHsgb25DbGljayB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLWRlbGV0ZS1hcmd1bWVudFwiIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIDxpIGNsYXNzTmFtZT1cImljb24tZGVsZXRlXCIgLz5cbiAgPC9idXR0b24+XG4pO1xuXG5CdXR0b25EZWxldGVBcmd1bWVudC5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25EZWxldGVBcmd1bWVudDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdXR0b25EZWxldGVDYXRlZ29yeSA9ICh7IG9uQ2xpY2sgfSkgPT4gKFxuICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvbi1kZWxldGUtY2F0ZWdvcnlcIiBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICA8aSBjbGFzc05hbWU9XCJpY29uLWRlbGV0ZVwiIC8+XG4gIDwvYnV0dG9uPlxuKTtcblxuQnV0dG9uRGVsZXRlQ2F0ZWdvcnkucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uRGVsZXRlQ2F0ZWdvcnk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgQnV0dG9uU2Nyb2xsID0gKHsgb25DbGljaywgZGlyZWN0aW9uIH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9e2BidXR0b24tc2Nyb2xsICR7ZGlyZWN0aW9ufWB9IG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIDxpIGNsYXNzTmFtZT17KGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSA/ICdpY29uLWJhY2t3YXJkJyA6ICdpY29uLWZvcndhcmQnfSAvPlxuICA8L2J1dHRvbj5cbik7XG5cbkJ1dHRvblNjcm9sbC5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGRpcmVjdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnbGVmdCcsICdyaWdodCddKSxcbn07XG5cbkJ1dHRvblNjcm9sbC5kZWZhdWx0UHJvcHMgPSB7XG4gIGRpcmVjdGlvbjogJ2xlZnQnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uU2Nyb2xsO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uR3JvdXAgfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcbmltcG9ydCBzY3JvbGwgZnJvbSAnc2Nyb2xsJztcbmltcG9ydCBCdXR0b25TY3JvbGwgZnJvbSAnLi9CdXR0b25TY29sbCc7XG5pbXBvcnQgQ2F0ZWdvcnkgZnJvbSAnLi9DYXRlZ29yeSc7XG5pbXBvcnQgRmFkZSBmcm9tICcuL2FuaW1zL0ZhZGUnO1xuXG5jbGFzcyBDYXRlZ29yaWVzRmlsdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5jaGlwcyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmhhbmRsZUxlZnRTY3JvbGxDbGljayA9IHRoaXMuaGFuZGxlTGVmdFNjcm9sbENsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVSaWdodFNjcm9sbENsaWNrID0gdGhpcy5oYW5kbGVSaWdodFNjcm9sbENsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5tb3ZlQ2hpcHNTY3JvbGwgPSB0aGlzLm1vdmVDaGlwc1Njcm9sbC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaGFuZGxlTGVmdFNjcm9sbENsaWNrKCkge1xuICAgIGlmICh0aGlzLmNoaXBzKSB7XG4gICAgICB0aGlzLm1vdmVDaGlwc1Njcm9sbCgtdGhpcy5jaGlwcy5jbGllbnRXaWR0aCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUmlnaHRTY3JvbGxDbGljaygpIHtcbiAgICBpZiAodGhpcy5jaGlwcykge1xuICAgICAgdGhpcy5tb3ZlQ2hpcHNTY3JvbGwodGhpcy5jaGlwcy5jbGllbnRXaWR0aCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUNoaXBzU2Nyb2xsKGRlbHRhKSB7XG4gICAgaWYgKHRoaXMuY2hpcHMpIHtcbiAgICAgIGNvbnN0IG5leHRTY3JvbGxMZWZ0ID0gdGhpcy5jaGlwcy5zY3JvbGxMZWZ0ICsgZGVsdGE7XG4gICAgICBzY3JvbGwubGVmdCh0aGlzLmNoaXBzLCBuZXh0U2Nyb2xsTGVmdCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2F0ZWdvcnlMaXN0LCBvbkRlbGV0ZUNhdGVnb3J5LCBvbkNpbGNrQ2F0ZWdvcnkgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJjb250ZW50LWNhdGVnb3JpZXMtZmlsdGVyXCI+XG4gICAgICAgIDxCdXR0b25TY3JvbGxcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUxlZnRTY3JvbGxDbGlja31cbiAgICAgICAgICBkaXJlY3Rpb249XCJsZWZ0XCJcbiAgICAgICAgLz5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cImNhdGVnb3JpZXMtZmlsdGVyXCJcbiAgICAgICAgICByZWY9eyhub2RlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoaXBzID0gbm9kZTtcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPFRyYW5zaXRpb25Hcm91cCBzdHlsZT17eyBkaXNwbGF5OiAnaW5oZXJpdCcsIHBhZGRpbmdMZWZ0OiAnMS4yNWVtJywgcGFkZGluZ1JpZ2h0OiAnMS4yNWVtJyB9fT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2F0ZWdvcnlMaXN0Lm1hcChjYXRlZ29yeSA9PiAoXG4gICAgICAgICAgICAgICAgPEZhZGUga2V5PXtjYXRlZ29yeS5pZH0+XG4gICAgICAgICAgICAgICAgICA8Q2F0ZWdvcnlcbiAgICAgICAgICAgICAgICAgICAga2V5PXtjYXRlZ29yeS5pZH1cbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk9e2NhdGVnb3J5fVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17Y2F0ZWdvcnkuc2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlPXtvbkRlbGV0ZUNhdGVnb3J5fVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNpbGNrQ2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvRmFkZT5cbiAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L1RyYW5zaXRpb25Hcm91cD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxCdXR0b25TY3JvbGxcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVJpZ2h0U2Nyb2xsQ2xpY2t9XG4gICAgICAgICAgZGlyZWN0aW9uPVwicmlnaHRcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5DYXRlZ29yaWVzRmlsdGVyLnByb3BUeXBlcyA9IHtcbiAgY2F0ZWdvcnlMaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICBvbkRlbGV0ZUNhdGVnb3J5OiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DaWxja0NhdGVnb3J5OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuQ2F0ZWdvcmllc0ZpbHRlci5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uRGVsZXRlQ2F0ZWdvcnk6IHVuZGVmaW5lZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENhdGVnb3JpZXNGaWx0ZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBCdXR0b25EZWxldGVDYXRlZ29yeSBmcm9tICcuL0J1dHRvbkRlbGV0ZUNhdGVnb3J5JztcblxuY29uc3QgQ2F0ZWdvcnkgPSAoe1xuICBjYXRlZ29yeSwgc2VsZWN0ZWQsIG9uQ2xpY2ssIG9uRGVsZXRlLFxufSkgPT4ge1xuICBsZXQgY3NzQ2xhc3MgPSAnJztcblxuICBjb25zdCBvbkNoaXBDbGljayA9IChlKSA9PiB7XG4gICAgb25DbGljayhjYXRlZ29yeSwgZSk7XG4gIH07XG4gIGNvbnN0IG9uRGVsZXRlQ2xpY2sgPSAoKSA9PiB7XG4gICAgb25EZWxldGUoY2F0ZWdvcnkpO1xuICB9O1xuXG4gIGlmIChzZWxlY3RlZCkge1xuICAgIGNzc0NsYXNzID0gJ2NhdGVnb3J5LXNlbGVjdGVkJztcbiAgfVxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17YCR7Y3NzQ2xhc3N9IGNhdGVnb3J5LWNoaXAgYWxpZ24taXRlbXMtY2VudGVyYH1cbiAgICAgIG9uQ2xpY2s9e29uQ2hpcENsaWNrfVxuICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2F0ZWdvcnktdGV4dFwiPntjYXRlZ29yeS5uYW1lfTwvc3Bhbj5cbiAgICAgIHtcbiAgICAgICAgKGNhdGVnb3J5LmlkICE9PSAnMCcgJiYgb25EZWxldGUgIT09IHVuZGVmaW5lZCkgJiZcbiAgICAgICAgICA8QnV0dG9uRGVsZXRlQ2F0ZWdvcnkgb25DbGljaz17b25EZWxldGVDbGlja30gLz5cbiAgICAgIH1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbkNhdGVnb3J5LnByb3BUeXBlcyA9IHtcbiAgb25EZWxldGU6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjYXRlZ29yeTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5DYXRlZ29yeS5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uRGVsZXRlOiB1bmRlZmluZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYXRlZ29yeTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tICdsb2Rhc2gnO1xuXG5jb25zdCB3YWl0VGltZSA9IDUwMDtcblxuY2xhc3MgSW5maW5pdGVTY3JvbGwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLm9uU2Nyb2xsID0gdGhpcy5vblNjcm9sbC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRocm90dGxlKHRoaXMub25TY3JvbGwsIHdhaXRUaW1lKSwgZmFsc2UpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRocm90dGxlKHRoaXMub25TY3JvbGwsIHdhaXRUaW1lKSwgZmFsc2UpO1xuICB9XG5cbiAgb25TY3JvbGwoKSB7XG4gICAgaWYgKCh3aW5kb3cuaW5uZXJIZWlnaHQgKyB3aW5kb3cuc2Nyb2xsWSkgPj0gKGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0IC0gMjAwKSkge1xuICAgICAgY29uc3QgeyBhcmdzLCBvblNjcm9sbCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIG9uU2Nyb2xsKC4uLmFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNoaWxkcmVuLCBjbGFzc05hbWUgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkluZmluaXRlU2Nyb2xsLnByb3BUeXBlcyA9IHtcbiAgYXJnczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG9uU2Nyb2xsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuSW5maW5pdGVTY3JvbGwuZGVmYXVsdFByb3BzID0ge1xuICBhcmdzOiBbXSxcbiAgY2xhc3NOYW1lOiAnJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEluZmluaXRlU2Nyb2xsO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IE1haW5BZGRCdXR0b24gPSAoeyBvbkNsaWNrIH0pID0+IChcbiAgPGJ1dHRvbiBpZD1cIm1haW4tYWRkLWJ1dHRvblwiIG9uQ2xpY2s9e29uQ2xpY2t9ID5cbiAgICA8aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPiYjeEUxNDU7PC9pPlxuICA8L2J1dHRvbj5cbik7XG5cbk1haW5BZGRCdXR0b24ucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTWFpbkFkZEJ1dHRvbjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFNuYWNrYmFyQW5pbSBmcm9tICcuL2FuaW1zL1NuYWNrYmFyQW5pbSc7XG5cbmNvbnN0IEFjdGlvbiA9ICh7IG9uQ2xpY2ssIHRleHQgfSkgPT4gKFxuICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvbi1hY3Rpb24tc25hY2tiYXJcIiBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICB7dGV4dH1cbiAgPC9idXR0b24+XG4pO1xuXG5BY3Rpb24ucHJvcFR5cGVzID0ge1xuICB0ZXh0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5jbGFzcyBTbmFja2JhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBjb25zdCB7XG4gICAgICBvbkNsb3NlLCBkdXJhdGlvbiwgc2hvdyxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChzaG93KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgb25DbG9zZSgpO1xuICAgICAgfSwgZHVyYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBtZXNzYWdlLCBpc0Vycm9yLCBhY3Rpb25UZXh0LCBhY3Rpb25DbGljaywgc2hvdyxcbiAgICAgIHZlcnRpY2FsUG9zdGlvbiwgaG9yaXpvbnRhbFBvc2l0aW9uLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8U25hY2tiYXJBbmltIGluPXtzaG93fSBjdXN0b21DbGFzcz17YCR7dmVydGljYWxQb3N0aW9ufSAkeyhob3Jpem9udGFsUG9zaXRpb24pfWB9PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtgc25hY2tiYXIgJHsoaXNFcnJvcikgPyAnZXJyb3InIDogJyd9YH1cbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNuYWNrYmFyLW1lc3NhZ2VcIj57bWVzc2FnZX08L3NwYW4+XG4gICAgICAgICAge1xuICAgICAgICAgICAgKGFjdGlvblRleHQgIT09ICcnICYmIGFjdGlvbkNsaWNrICE9PSB1bmRlZmluZWQpICYmXG4gICAgICAgICAgICAgIDxBY3Rpb24gb25DbGljaz17YWN0aW9uQ2xpY2t9IHRleHQ9e2FjdGlvblRleHR9IC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvU25hY2tiYXJBbmltPlxuICAgICk7XG4gIH1cbn1cblxuU25hY2tiYXIucHJvcFR5cGVzID0ge1xuICBzaG93OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGR1cmF0aW9uOiBQcm9wVHlwZXMubnVtYmVyLFxuICBpc0Vycm9yOiBQcm9wVHlwZXMuYm9vbCxcbiAgYWN0aW9uVGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgYWN0aW9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICB2ZXJ0aWNhbFBvc3Rpb246IFByb3BUeXBlcy5vbmVPZihbJ3RvcCcsICdib3R0b20nXSksXG4gIGhvcml6b250YWxQb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnbGVmdCcsICdyaWdodCddKSxcbn07XG5cblNuYWNrYmFyLmRlZmF1bHRQcm9wcyA9IHtcbiAgZHVyYXRpb246IDUwMDAsXG4gIGlzRXJyb3I6IGZhbHNlLFxuICBhY3Rpb25UZXh0OiAnJyxcbiAgYWN0aW9uQ2xpY2s6IHVuZGVmaW5lZCxcbiAgdmVydGljYWxQb3N0aW9uOiAnYm90dG9tJyxcbiAgaG9yaXpvbnRhbFBvc2l0aW9uOiAncmlnaHQnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU25hY2tiYXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBDb2xsYXBzZSBmcm9tICcuL2FuaW1zL0NvbGxhcHNlJztcbmltcG9ydCBGYWRlIGZyb20gJy4vYW5pbXMvRmFkZSc7XG5pbXBvcnQgQnV0dG9uQ29tcGxldGVBcmd1bWVudCBmcm9tICcuL0J1dHRvbkNvbXBsZXRlQXJndW1lbnQnO1xuaW1wb3J0IEJ1dHRvbkRlbGV0ZUFyZ3VtZW50IGZyb20gJy4vQnV0dG9uRGVsZXRlQXJndW1lbnQnO1xuaW1wb3J0IHsgdG9TaW1wbGVEYXRlRm9ybWF0IH0gZnJvbSAnLi4vdXRpbHMvQ29tbW9uJztcblxuY2xhc3MgVG9kb0FyZ3VtZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgfTtcbiAgICB0aGlzLnJlbmRlckRhdGUgPSB0aGlzLnJlbmRlckRhdGUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uVGl0bGVDbGljaygpIHtcbiAgICBjb25zdCB7IGNvbGxhcHNlZCB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnNldFN0YXRlKHsgY29sbGFwc2VkOiAhY29sbGFwc2VkIH0pO1xuICB9XG5cbiAgcmVuZGVyRGF0ZSgpIHtcbiAgICBjb25zdCB7IGFyZ3VtZW50IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChhcmd1bWVudC5jb21wbGV0ZWQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cImNvbXBsZXRlLWRhdGVcIj57YGNvbXBsZXRlZCAkeyhhcmd1bWVudC5jb21wbGV0ZWRBdCkgPyB0b1NpbXBsZURhdGVGb3JtYXQoYXJndW1lbnQuY29tcGxldGVkQXQpIDogJyd9YH08L3A+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPHAgY2xhc3NOYW1lPVwiY29tcGxldGUtd2l0aGluLWRhdGVcIj57YHRvIGNvbXBsZXRlIHdpdGhpbiAkeyhhcmd1bWVudC50b2RvV2l0aGluKSA/IHRvU2ltcGxlRGF0ZUZvcm1hdChhcmd1bWVudC50b2RvV2l0aGluKSA6ICdub3Qgc2V0J31gfTwvcD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgYXJndW1lbnQsIG9uRGVsZXRlLCBvbkNvbXBsZXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY29sbGFwc2VkIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFyZ3VtZW50LWl0ZW1cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcmd1bWVudC1oZWFkZXJcIj5cbiAgICAgICAgICA8cFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYXJndW1lbnQtdGl0bGUgJHsoYXJndW1lbnQuY29tcGxldGVkKSA/ICdhcmd1bWVudC10aXRsZS1jb21wbGV0ZWQnIDogJyd9YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMub25UaXRsZUNsaWNrKCl9XG4gICAgICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7YXJndW1lbnQudGl0bGV9XG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxGYWRlIGluPXtjb2xsYXBzZWR9PlxuICAgICAgICAgICAgPEJ1dHRvbkRlbGV0ZUFyZ3VtZW50XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uRGVsZXRlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0ZhZGU+XG4gICAgICAgICAge1xuICAgICAgICAgICAgb25Db21wbGV0ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICA8QnV0dG9uQ29tcGxldGVBcmd1bWVudFxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNvbXBsZXRlfVxuICAgICAgICAgICAgICBjb21wbGV0ZWQ9e2FyZ3VtZW50LmNvbXBsZXRlZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcmd1bWVudC1kYXRlXCI+XG4gICAgICAgICAge3RoaXMucmVuZGVyRGF0ZSgpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPENvbGxhcHNlIGluPXtjb2xsYXBzZWR9PlxuICAgICAgICAgIDxkaXYga2V5PXthcmd1bWVudC5kZXNjcmlwdGlvbn0gY2xhc3NOYW1lPVwiYXJndW1lbnQtYm9keVwiPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYXJndW1lbnQtZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIChhcmd1bWVudC5kZXNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkICYmIGFyZ3VtZW50LmRlc2NyaXB0aW9uICE9PSAnJylcbiAgICAgICAgICAgICAgICA/IGFyZ3VtZW50LmRlc2NyaXB0aW9uIDogPHNwYW4gY2xhc3NOYW1lPVwiZW1wdHlcIj5ObyBkZXNjcmlwdGlvbiB0byBzaG93IDooPC9zcGFuPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQ29sbGFwc2U+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblRvZG9Bcmd1bWVudC5wcm9wVHlwZXMgPSB7XG4gIG9uRGVsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25Db21wbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIGFyZ3VtZW50OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgY2F0ZWdvcnk6IFByb3BUeXBlcy5zaGFwZSh7fSkuaXNSZXF1aXJlZCxcbiAgICBjb21wbGV0ZWRBdDogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgfSkuaXNSZXF1aXJlZCxcbn07XG5cblRvZG9Bcmd1bWVudC5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uRGVsZXRlOiB1bmRlZmluZWQsXG4gIG9uQ29tcGxldGU6IHVuZGVmaW5lZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9Bcmd1bWVudDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbkdyb3VwIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5pbXBvcnQgUmVzaXplIGZyb20gJy4vYW5pbXMvUmVzaXplJztcbmltcG9ydCBUb2RvQXJndW1lbnQgZnJvbSAnLi9Ub2RvQXJndW1lbnQnO1xuaW1wb3J0IEluZmluaXRlU2Nyb2xsIGZyb20gJy4vSW5maW5pdGVTY3JvbGwnO1xuaW1wb3J0IHsgcXVlcnlJdGVtc0xpbWl0IH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgbGltaXQ6IHF1ZXJ5SXRlbXNMaW1pdCxcbiAgc2tpcDogMCxcbn07XG5cbmNsYXNzIFRvZG9Bcmd1bWVudHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKG5leHRQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgaWYgKG5leHRQcm9wcy5za2lwICE9PSBwcmV2U3RhdGUuc2tpcCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2tpcDogbmV4dFByb3BzLnNraXAsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSBpbml0aWFsU3RhdGU7XG4gICAgdGhpcy5vbkZldGNoVG9kb0FyZ3VtZW50c05leHQgPSB0aGlzLm9uRmV0Y2hUb2RvQXJndW1lbnRzTmV4dC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25GZXRjaFRvZG9Bcmd1bWVudHNOZXh0KCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLFxuICAgICAgZmV0Y2hUb2RvQXJndW1lbnRzLCBtb3JlVG9Mb2FkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghbW9yZVRvTG9hZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7IGxpbWl0LCBza2lwIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IG5ld1NraXAgPSBza2lwICsgbGltaXQ7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNraXA6IG5ld1NraXAgfSk7XG4gICAgZmV0Y2hUb2RvQXJndW1lbnRzKGNhdGVnb3JpZXNJZCwgY29tcGxldGVkLCBsaW1pdCwgbmV3U2tpcCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbGlzdFRvZG9Bcmd1bWVudHMsXG4gICAgICBvbkRlbGV0ZUFyZ3VtZW50LFxuICAgICAgb25Db21wbGV0ZUFyZ3VtZW50LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiY29udGVudC10b2RvLWFyZ3VtZW50c1wiPlxuICAgICAgICA8SW5maW5pdGVTY3JvbGwgb25TY3JvbGw9e3RoaXMub25GZXRjaFRvZG9Bcmd1bWVudHNOZXh0fT5cbiAgICAgICAgICA8VHJhbnNpdGlvbkdyb3VwPlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsaXN0VG9kb0FyZ3VtZW50cy5tYXAoYXJnID0+IChcbiAgICAgICAgICAgICAgICA8UmVzaXplIGtleT17YXJnLmlkfT5cbiAgICAgICAgICAgICAgICAgIDxUb2RvQXJndW1lbnRcbiAgICAgICAgICAgICAgICAgICAga2V5PXthcmcuaWR9XG4gICAgICAgICAgICAgICAgICAgIGFyZ3VtZW50PXthcmd9XG4gICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlPXsoKSA9PiBvbkRlbGV0ZUFyZ3VtZW50KGFyZyl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU9eygpID0+IG9uQ29tcGxldGVBcmd1bWVudChhcmcpfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L1Jlc2l6ZT5cbiAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L1RyYW5zaXRpb25Hcm91cD5cbiAgICAgICAgPC9JbmZpbml0ZVNjcm9sbD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuVG9kb0FyZ3VtZW50cy5wcm9wVHlwZXMgPSB7XG4gIG9uRGVsZXRlQXJndW1lbnQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uQ29tcGxldGVBcmd1bWVudDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgbGlzdFRvZG9Bcmd1bWVudHM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGNvbXBsZXRlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBjYXRlZ29yeTogUHJvcFR5cGVzLnNoYXBlKHt9KS5pc1JlcXVpcmVkLFxuICB9KS5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICBtb3JlVG9Mb2FkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBmZXRjaFRvZG9Bcmd1bWVudHM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNhdGVnb3JpZXNJZDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZykuaXNSZXF1aXJlZCxcbiAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9kb0FyZ3VtZW50cztcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgTG9hZGVyTGluZWFyIGZyb20gJy4uL2NvbXBvbmVudHMvTG9hZGVyTGluZWFyJztcbmltcG9ydCBNYWluQWRkQnV0dG9uIGZyb20gJy4uL2NvbXBvbmVudHMvTWFpbkFkZEJ1dHRvbic7XG5pbXBvcnQgQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lciBmcm9tICcuLi9jb250YWluZXJzL0NhdGVnb3JpZXNGaWx0ZXJDb250YWluZXInO1xuaW1wb3J0IFZpc2liaWxpdHlGaWx0ZXJDb250YWluZXIgZnJvbSAnLi4vY29udGFpbmVycy9WaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyJztcbmltcG9ydCBUb2RvQXJndW1lbnRzQ29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lcnMvVG9kb0FyZ3VtZW50c0NvbnRhaW5lcic7XG5pbXBvcnQgRGlhbG9nQWRkIGZyb20gJy4vZGlhbG9nQWRkL0RpYWxvZ0FkZCc7XG5pbXBvcnQgU25hY2tiYXIgZnJvbSAnLi9TbmFja2Jhcic7XG5cbmNsYXNzIFRvZG9zIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzRGlhbG9nQWRkT3BlbjogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIC8vIERpYWxvZ0FkZC5wcmVsb2FkKCk7XG4gICAgY29uc3QgeyBpbml0RmV0Y2hBbGxDYXRlZ29yaWVzIH0gPSB0aGlzLnByb3BzO1xuICAgIGluaXRGZXRjaEFsbENhdGVnb3JpZXMoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGlzRGlhbG9nQWRkT3BlbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IG1lc3NhZ2UsIGhpZGVNZXNzYWdlLCBzaG93TG9hZGluZyB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWFwcFwiPlxuICAgICAgICA8TG9hZGVyTGluZWFyIHNob3c9e3Nob3dMb2FkaW5nfSAvPlxuICAgICAgICA8ZGl2IGlkPVwibWFpbi10b3AtYmFyXCI+XG4gICAgICAgICAgPENhdGVnb3JpZXNGaWx0ZXJDb250YWluZXIgLz5cbiAgICAgICAgICA8VmlzaWJpbGl0eUZpbHRlckNvbnRhaW5lciAvPlxuICAgICAgICAgIDxNYWluQWRkQnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgaXNEaWFsb2dBZGRPcGVuOiB0cnVlIH0pfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8VG9kb0FyZ3VtZW50c0NvbnRhaW5lciAvPlxuICAgICAgICA8RGlhbG9nQWRkXG4gICAgICAgICAgb3Blbj17aXNEaWFsb2dBZGRPcGVufVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBpc0RpYWxvZ0FkZE9wZW46IGZhbHNlIH0pfVxuICAgICAgICAvPlxuICAgICAgICA8U25hY2tiYXJcbiAgICAgICAgICBzaG93PXttZXNzYWdlLnNob3d9XG4gICAgICAgICAgaXNFcnJvcj17bWVzc2FnZS5pc0Vycm9yfVxuICAgICAgICAgIG1lc3NhZ2U9e21lc3NhZ2UudGV4dH1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBoaWRlTWVzc2FnZSgpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Ub2Rvcy5wcm9wVHlwZXMgPSB7XG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2hvdzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0Vycm9yOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgaGlkZU1lc3NhZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGluaXRGZXRjaEFsbENhdGVnb3JpZXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHNob3dMb2FkaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9kb3M7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBWaXNpYmlsaXR5U3dpdGNoIGZyb20gJy4vVmlzaWJpbGl0eVN3aXRjaCc7XG5pbXBvcnQgeyBBTExfVE9ET1MsIE9OTFlfQ09NUExFVEVELCBPTkxZX1RPX0NPTVBMRVRFIH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbmZpZyc7XG5cbmNvbnN0IFZpc2liaWxpdHlGaWx0ZXIgPSAoe1xuICBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIsIG9uVmlzaWJpbGl0eVN3aXRjaENsaWNrLFxufSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cInZpc2liaWxpdHktZmlsdGVyLXdyYXBwZXJcIj5cbiAgICA8VmlzaWJpbGl0eVN3aXRjaFxuICAgICAgc2VsZWN0ZWQ9eyhzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IE9OTFlfVE9fQ09NUExFVEVcbiAgICAgICAgfHwgc2VsZWN0ZWRWaXNpYmlsaXR5RmlsdGVyID09PSBBTExfVE9ET1MpfVxuICAgICAgb25DbGljaz17b25WaXNpYmlsaXR5U3dpdGNoQ2xpY2soT05MWV9UT19DT01QTEVURSl9XG4gICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICA+XG4gICAgICA8aSBjbGFzc05hbWU9XCJpY29uLWNpcmNsZS1ib3JkZXJcIiAvPlxuICAgIDwvVmlzaWJpbGl0eVN3aXRjaD5cbiAgICA8VmlzaWJpbGl0eVN3aXRjaFxuICAgICAgc2VsZWN0ZWQ9eyhzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXIgPT09IE9OTFlfQ09NUExFVEVEXG4gICAgICAgIHx8IHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlciA9PT0gQUxMX1RPRE9TKX1cbiAgICAgIG9uQ2xpY2s9e29uVmlzaWJpbGl0eVN3aXRjaENsaWNrKE9OTFlfQ09NUExFVEVEKX1cbiAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgID5cbiAgICAgIDxpIGNsYXNzTmFtZT1cImljb24tY2lyY2xlXCIgLz5cbiAgICA8L1Zpc2liaWxpdHlTd2l0Y2g+XG4gIDwvZGl2PlxuKTtcblxuVmlzaWJpbGl0eUZpbHRlci5wcm9wVHlwZXMgPSB7XG4gIHNlbGVjdGVkVmlzaWJpbGl0eUZpbHRlcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvblZpc2liaWxpdHlTd2l0Y2hDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFZpc2liaWxpdHlGaWx0ZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgVmlzaWJpbGl0eVN3aXRjaCA9ICh7XG4gIHNlbGVjdGVkLCBjaGlsZHJlbiwgb25DbGljayxcbn0pID0+IChcbiAgPGRpdlxuICAgIGNsYXNzTmFtZT17YHZpc2liaWxpdHktYnV0dG9uLXN3aXRjaCBhbGlnbi1pdGVtcy1jZW50ZXIgJHsoc2VsZWN0ZWQpID8gJ3NlbGVjdGVkJyA6ICcnfSBgfVxuICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gID5cbiAgICB7Y2hpbGRyZW59XG4gIDwvZGl2PlxuKTtcblxuVmlzaWJpbGl0eVN3aXRjaC5wcm9wVHlwZXMgPSB7XG4gIHNlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5WaXNpYmlsaXR5U3dpdGNoLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2VsZWN0ZWQ6IGZhbHNlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaWJpbGl0eVN3aXRjaDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDMwMDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgaGVpZ2h0ICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBoZWlnaHQ6IDAsXG59O1xuXG5jb25zdCBvbkVudGVyID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gYCR7bm9kZS5maXJzdEVsZW1lbnRDaGlsZC5vZmZzZXRIZWlnaHR9cHhgO1xufTtcblxuY29uc3Qgb25FeGl0ID0gKG5vZGUpID0+IHtcbiAgY29uc3QgeyBzdHlsZSB9ID0gbm9kZTtcbiAgc3R5bGUuaGVpZ2h0ID0gJzBweCc7XG59O1xuXG5jb25zdCBDb2xsYXBzZSA9ICh7IGluOiBpblByb3AsIGNoaWxkcmVuIH0pID0+IChcbiAgPFRyYW5zaXRpb24gb25FbnRlcj17b25FbnRlcn0gb25FeGl0PXtvbkV4aXR9IGluPXtpblByb3B9IHRpbWVvdXQ9e2R1cmF0aW9ufT5cbiAgICB7KCkgPT4gKFxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuQ29sbGFwc2UucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb2xsYXBzZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDI1MDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgYWxsICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBoZWlnaHQ6ICcwcHgnLFxuICBvcGFjaXR5OiAnMCcsXG4gIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxufTtcblxuY29uc3QgdHJhbnNpdGlvblN0eWxlcyA9IHtcbiAgZW50ZXJpbmc6IHtcbiAgICBoZWlnaHQ6ICcwcHgnLFxuICAgIG9wYWNpdHk6ICcwJyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgfSxcbiAgZW50ZXJlZDoge1xuICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgaGVpZ2h0OiAnMTAwdmgnLFxuICAgIG9wYWNpdHk6ICcxJyxcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gIH0sXG59O1xuXG5jb25zdCBEaWFsb2dBbmltID0gKHsgaW46IGluUHJvcCwgY2hpbGRyZW4gfSkgPT4gKFxuICA8VHJhbnNpdGlvbiBpbj17aW5Qcm9wfSB0aW1lb3V0PXtkdXJhdGlvbn0+XG4gICAge3N0YXRlID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJiYWNrZHJvcC1kaWFsb2dcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgICAuLi50cmFuc2l0aW9uU3R5bGVzW3N0YXRlXSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuRGlhbG9nQW5pbS5wcm9wVHlwZXMgPSB7XG4gIGluOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpYWxvZ0FuaW07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSAyNTA7XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgd2lkdGg6ICcxMDAlJyxcbiAgdHJhbnNpdGlvbjogYG9wYWNpdHkgJHtkdXJhdGlvbn1tcyBlYXNlLWluLW91dGAsXG4gIG9wYWNpdHk6IDAsXG4gIGRpc3BsYXk6ICdpbmhlcml0Jyxcbn07XG5cbmNvbnN0IHRyYW5zaXRpb25TdHlsZXMgPSB7XG4gIGVudGVyOiB7IG9wYWNpdHk6IDAgfSxcbiAgZW50ZXJlZDogeyBvcGFjaXR5OiAxIH0sXG59O1xuXG5jb25zdCBSZXBsYWNlQW5pbSA9ICh7IGluOiBpblByb3AsIGVuZExpc3RlbmVyLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxUcmFuc2l0aW9uXG4gICAgaW49e2luUHJvcH1cbiAgICB0aW1lb3V0PXtkdXJhdGlvbn1cbiAgICBhZGRFbmRMaXN0ZW5lcj17ZW5kTGlzdGVuZXJ9XG4gID5cbiAgICB7c3RhdGUgPT4gKFxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgICAuLi50cmFuc2l0aW9uU3R5bGVzW3N0YXRlXSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuUmVwbGFjZUFuaW0ucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgZW5kTGlzdGVuZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVwbGFjZUFuaW07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSB7XG4gIGVudGVyOiAzMDAsXG4gIGV4aXQ6IDIwMCxcbn07XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgdHJhbnNpdGlvbjogYGFsbCAke2R1cmF0aW9uLmVudGVyfW1zIGVhc2UtaW4tb3V0YCxcbiAgaGVpZ2h0OiAwLFxuICBvcGFjaXR5OiAwLFxufTtcblxuY29uc3Qgb25FbnRlciA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XG4gIHN0eWxlLmhlaWdodCA9IGAke25vZGUuZmlyc3RFbGVtZW50Q2hpbGQub2Zmc2V0SGVpZ2h0fXB4YDtcbiAgc3R5bGUub3BhY2l0eSA9IDE7XG59O1xuXG5jb25zdCBvbkVudGVyZWQgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSAnYXV0byc7XG59O1xuXG5jb25zdCBvbkV4aXQgPSAobm9kZSkgPT4ge1xuICBjb25zdCB7IHN0eWxlIH0gPSBub2RlO1xuICBzdHlsZS5oZWlnaHQgPSBgJHtub2RlLmZpcnN0RWxlbWVudENoaWxkLm9mZnNldEhlaWdodH1weGA7XG59O1xuXG5jb25zdCBvbkV4aXRlZCA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHsgc3R5bGUgfSA9IG5vZGU7XG4gIHN0eWxlLmhlaWdodCA9ICcwcHgnO1xuICBzdHlsZS5vcGFjaXR5ID0gMDtcbn07XG5cblxuY29uc3QgUmVzaXplID0gKHsgLi4ucHJvcHMsIGNoaWxkcmVuIH0pID0+IChcbiAgPFRyYW5zaXRpb25cbiAgICB7Li4ucHJvcHN9XG4gICAgb25FbnRlcj17b25FbnRlcn1cbiAgICBvbkVudGVyZWQ9e29uRW50ZXJlZH1cbiAgICBvbkV4aXQ9e29uRXhpdH1cbiAgICBvbkV4aXRlZD17b25FeGl0ZWR9XG4gICAgdGltZW91dD17ZHVyYXRpb259XG4gID5cbiAgICB7KCkgPT4gKFxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuUmVzaXplLnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZXNpemU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSAyNTA7XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgdHJhbnNpdGlvbjogYGFsbCAke2R1cmF0aW9ufW1zIGVhc2UtaW4tb3V0YCxcbiAgYm90dG9tOiAnLTEwMHB4Jyxcbn07XG5cbmNvbnN0IHRyYW5zaXRpb25TdHlsZXMgPSB7XG4gIGVudGVyaW5nOiB7XG4gICAgYm90dG9tOiAnLTEwMHB4JyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgfSxcbiAgZW50ZXJlZDoge1xuICAgIGJvdHRvbTogJzBweCcsXG4gICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICB9LFxufTtcblxuY29uc3QgU25hY2tiYXJBbmltID0gKHsgaW46IGluUHJvcCwgY2hpbGRyZW4sIGN1c3RvbUNsYXNzIH0pID0+IChcbiAgPFRyYW5zaXRpb24gaW49e2luUHJvcH0gdGltZW91dD17ZHVyYXRpb259PlxuICAgIHtzdGF0ZSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPVwiY29udGVudC1zbmFja2JhclwiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxuICAgICAgICAgIC4uLnRyYW5zaXRpb25TdHlsZXNbc3RhdGVdLFxuICAgICAgICB9fVxuICAgICAgICBjbGFzc05hbWU9e2N1c3RvbUNsYXNzfVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICA8L1RyYW5zaXRpb24+XG4pO1xuXG5TbmFja2JhckFuaW0ucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIGN1c3RvbUNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuU25hY2tiYXJBbmltLmRlZmF1bHRQcm9wcyA9IHtcbiAgY3VzdG9tQ2xhc3M6ICcnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU25hY2tiYXJBbmltO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IHsgQUREX0FSR1VNRU5UIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCB7IGFkZENhdGVnb3J5IH0gZnJvbSAnLi4vLi4vYWN0aW9ucy90b2RvRmlsdGVyc0FjdGlvbnMnO1xuaW1wb3J0IHsgc2hvd01lc3NhZ2VJbmZvIH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5cbmNsYXNzIEFkZENhdGVnb3J5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5hbWU6ICcnLFxuICAgIH07XG4gICAgdGhpcy5vbklucHV0VGV4dENoYW5nZSA9IHRoaXMub25JbnB1dFRleHRDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQnV0dG9uQWRkQ2xpY2sgPSB0aGlzLm9uQnV0dG9uQWRkQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQ2F0ZWdvcnlDcmVhdGVkID0gdGhpcy5vbkNhdGVnb3J5Q3JlYXRlZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25JbnB1dFRleHRDaGFuZ2UoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBuYW1lOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgfVxuXG4gIG9uQnV0dG9uQWRkQ2xpY2soKSB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgZGlzcGF0Y2ggfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKG5hbWUgPT09ICcnKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ05hbWVSZXF1aXJlZCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkaXNwYXRjaChhZGRDYXRlZ29yeShuYW1lLCB0aGlzLm9uQ2F0ZWdvcnlDcmVhdGVkKSk7XG4gIH1cblxuICBvbkNhdGVnb3J5Q3JlYXRlZChzZWxlY3RlZENhdGVnb3J5KSB7XG4gICAgY29uc3QgeyBvbk5leHQgfSA9IHRoaXMucHJvcHM7XG4gICAgb25OZXh0KHsgc3RlcElkOiBBRERfQVJHVU1FTlQsIG9wdGlvbnM6IHsgc2VsZWN0ZWRDYXRlZ29yeSB9IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtYWRkLWNhdGVnb3J5XCI+XG4gICAgICAgIDxoMj5BZGQgbmV3IENBVEVHT1JZPC9oMj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4taW5wdXRcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJUeXBlIHRoZSBuYW1lXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4tYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25CdXR0b25BZGRDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICBBRERcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkFkZENhdGVnb3J5LnByb3BUeXBlcyA9IHtcbiAgZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoKShBZGRDYXRlZ29yeSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBsYWJlbHMgZnJvbSAnLi4vLi4vY29uc3RhbnRzL2xhYmVscyc7XG5pbXBvcnQgeyBTRUxFQ1RfQ09NUExFVEVfREFURSB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUluZm8gfSBmcm9tICcuLi8uLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcblxuY2xhc3MgQWRkVG9kb0FyZ3VtZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdGl0bGU6ICcnLFxuICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgIH07XG4gICAgdGhpcy5vbklucHV0VGV4dENoYW5nZSA9IHRoaXMub25JbnB1dFRleHRDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQnV0dG9uU2NoZWR1bGVDbGljayA9IHRoaXMub25CdXR0b25TY2hlZHVsZUNsaWNrLmJpbmQodGhpcyk7XG4gIH1cblxuICBvbklucHV0VGV4dENoYW5nZShuYW1lKSB7XG4gICAgcmV0dXJuIChlKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgW25hbWVdOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgICB9O1xuICB9XG5cbiAgb25CdXR0b25TY2hlZHVsZUNsaWNrKCkge1xuICAgIGNvbnN0IHsgb3B0aW9ucywgZGlzcGF0Y2gsIG9uTmV4dCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBjYXRlZ29yeSA9IG9wdGlvbnMuc2VsZWN0ZWRDYXRlZ29yeTtcbiAgICBpZiAodGl0bGUgPT09ICcnKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ1RpdGxlUmVxdWlyZWQpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25OZXh0KHsgc3RlcElkOiBTRUxFQ1RfQ09NUExFVEVfREFURSwgb3B0aW9uczogeyB0aXRsZSwgZGVzY3JpcHRpb24sIGNhdGVnb3J5IH0gfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBzZWxlY3RlZENhdGVnb3J5IH0gPSB0aGlzLnByb3BzLm9wdGlvbnM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1hZGQtYXJndW1lbnRcIj5cbiAgICAgICAgPGgyPkFkZCBuZXcgQVJHVU1FTlQ8L2gyPlxuICAgICAgICA8aDM+XG4gICAgICAgICAgZm9yIHRoZSBjYXRlZ29yeTpcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsYWJlbC1jYXRlZ29yeS1uYW1lXCI+XG4gICAgICAgICAgICB7YCAke3NlbGVjdGVkQ2F0ZWdvcnkubmFtZX1gfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9oMz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWZpZWxkc1wiPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1pbnB1dFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlR5cGUgdGhlIHRpdGxlXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRUZXh0Q2hhbmdlKCd0aXRsZScpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVHlwZSB0aGUgZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dFRleHRDaGFuZ2UoJ2Rlc2NyaXB0aW9uJyl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1idXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkJ1dHRvblNjaGVkdWxlQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgU0NIRURVTEVcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkFkZFRvZG9Bcmd1bWVudC5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvcHRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHNlbGVjdGVkQ2F0ZWdvcnk6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIH0pLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIG9uTmV4dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoKShBZGRUb2RvQXJndW1lbnQpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBTZWxlY3RBY3Rpb25BZGQgZnJvbSAnLi9TZWxlY3RBY3Rpb25BZGQnO1xuaW1wb3J0IEFkZENhdGVnb3J5IGZyb20gJy4vQWRkQ2F0ZWdvcnknO1xuaW1wb3J0IFNlbGVjdENhdGVnb3J5IGZyb20gJy4vU2VsZWN0Q2F0ZWdvcnknO1xuaW1wb3J0IEFkZFRvZG9Bcmd1bWVudCBmcm9tICcuL0FkZFRvZG9Bcmd1bWVudCc7XG5pbXBvcnQgU2VsZWN0Q29tcGxldGVEYXRlIGZyb20gJy4vU2VsZWN0Q29tcGxldGVEYXRlJztcbmltcG9ydCBEb25lIGZyb20gJy4vRG9uZSc7XG5pbXBvcnQge1xuICBTRUxFQ1RfV0FOVF9UT19BREQsXG4gIEFERF9DQVRFR09SWSxcbiAgQUREX0FSR1VNRU5ULFxuICBTRUxFQ1RfQ0FURUdPUlksXG4gIFNFTEVDVF9DT01QTEVURV9EQVRFLFxuICBET05FLFxuICBzdGVwTGlzdCxcbn0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3N0ZXBzJztcbmltcG9ydCBSZXBsYWNlQW5pbSBmcm9tICcuLi9hbmltcy9SZXBsYWNlQW5pbSc7XG5pbXBvcnQgRGlhbG9nQW5pbSBmcm9tICcuLi9hbmltcy9EaWFsb2dBbmltJztcbmltcG9ydCBTdGVwcyBmcm9tICcuL1N0ZXBzJztcblxuY29uc3QgZ2V0Q29udGVudFRvUmVuZGVyID0gKHN0ZXBzLCBwcm9wcykgPT4ge1xuICBpZiAoc3RlcHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIDxTZWxlY3RBY3Rpb25BZGQgey4uLnByb3BzfSAvPjtcbiAgfVxuICBjb25zdCBsYXN0U3RlcCA9IHN0ZXBzW3N0ZXBzLmxlbmd0aCAtIDFdO1xuICBzd2l0Y2ggKGxhc3RTdGVwLnN0ZXBJZCkge1xuICAgIGNhc2UgU0VMRUNUX1dBTlRfVE9fQUREOlxuICAgICAgcmV0dXJuIDxTZWxlY3RBY3Rpb25BZGQgey4uLnByb3BzfSAvPjtcbiAgICBjYXNlIEFERF9DQVRFR09SWTpcbiAgICAgIHJldHVybiA8QWRkQ2F0ZWdvcnkgey4uLnByb3BzfSAvPjtcbiAgICBjYXNlIEFERF9BUkdVTUVOVDpcbiAgICAgIHJldHVybiA8QWRkVG9kb0FyZ3VtZW50IHsuLi5wcm9wc30gb3B0aW9ucz17bGFzdFN0ZXAub3B0aW9uc30gLz47XG4gICAgY2FzZSBTRUxFQ1RfQ0FURUdPUlk6XG4gICAgICByZXR1cm4gPFNlbGVjdENhdGVnb3J5IHsuLi5wcm9wc30gLz47XG4gICAgY2FzZSBTRUxFQ1RfQ09NUExFVEVfREFURTpcbiAgICAgIHJldHVybiA8U2VsZWN0Q29tcGxldGVEYXRlIHsuLi5wcm9wc30gb3B0aW9ucz17bGFzdFN0ZXAub3B0aW9uc30gLz47XG4gICAgY2FzZSBET05FOlxuICAgICAgcmV0dXJuIDxEb25lIHsuLi5wcm9wc30gLz47XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiA8U2VsZWN0QWN0aW9uQWRkIHsuLi5wcm9wc30gLz47XG4gIH1cbn07XG5cbmNvbnN0IGluaXRhbFN0YXRlID0ge1xuICBuZXh0U3RlcHM6IFtdLFxuICBzdGVwczogW1xuICAgIHtcbiAgICAgIHN0ZXBJZDogU0VMRUNUX1dBTlRfVE9fQURELFxuICAgICAgb3B0aW9uczoge30sXG4gICAgfSxcbiAgXSxcbiAgc2hvd1N0ZXA6IHRydWUsXG59O1xuXG5jbGFzcyBEaWFsb2dBZGQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLi4uaW5pdGFsU3RhdGUsXG4gICAgfTtcbiAgICB0aGlzLm9uQmFjayA9IHRoaXMub25CYWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbk5leHQgPSB0aGlzLm9uTmV4dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25SZXNldEFuZENsb3NlID0gdGhpcy5vblJlc2V0QW5kQ2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQW5pbWF0aW9uRW5kID0gdGhpcy5vbkFuaW1hdGlvbkVuZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25CYWNrKCkge1xuICAgIGNvbnN0IHsgc3RlcHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvbkNsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHN0ZXBDb3VudCA9IHN0ZXBzLmxlbmd0aDtcbiAgICBpZiAoc3RlcENvdW50ID09PSAxKSB7XG4gICAgICAvLyBSZXR1cm5lZCB0byB0aGUgZmlyc3Qgc3RlcHMsIGNsb3NlIHRoZSBkaWFsb2dcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyAuLi5pbml0YWxTdGF0ZSB9KTtcbiAgICAgIG9uQ2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5leHRTdGVwczogW1xuICAgICAgICAgIC4uLnN0ZXBzLnNsaWNlKDAsIHN0ZXBzLmxlbmd0aCAtIDEpLFxuICAgICAgICBdLFxuICAgICAgICBzaG93U3RlcDogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbk5leHQoc3RlcCA9IHsgc3RlcElkOiAnJywgb3B0aW9uczoge30gfSkge1xuICAgIGNvbnN0IHsgc3RlcHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBuZXh0U3RlcHM6IFtcbiAgICAgICAgLi4uc3RlcHMsIHtcbiAgICAgICAgICAuLi5zdGVwLFxuICAgICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHNob3dTdGVwOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIG9uUmVzZXRBbmRDbG9zZSgpIHtcbiAgICBjb25zdCB7IG9uQ2xvc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgb25DbG9zZSgpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IC4uLmluaXRhbFN0YXRlIH0pO1xuICAgIH0sIDUwMCk7XG4gIH1cblxuICBvbkFuaW1hdGlvbkVuZChub2RlLCBkb25lKSB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgKCkgPT4ge1xuICAgICAgZG9uZSgpO1xuICAgICAgY29uc3QgeyBuZXh0U3RlcHMsIHNob3dTdGVwIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgaWYgKHNob3dTdGVwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzdGVwczogW1xuICAgICAgICAgIC4uLm5leHRTdGVwcyxcbiAgICAgICAgXSxcbiAgICAgICAgc2hvd1N0ZXA6IHRydWUsXG4gICAgICB9KTtcbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBzdGVwcywgc2hvd1N0ZXAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvbkNsb3NlLCBvcGVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgb25OZXh0LCBvblJlc2V0QW5kQ2xvc2UsIG9uQW5pbWF0aW9uRW5kIH0gPSB0aGlzO1xuICAgIHJldHVybiAoXG4gICAgICA8RGlhbG9nQW5pbSBpbj17b3Blbn0+XG4gICAgICAgIDxkaXYgaWQ9XCJkaWFsb2ctYWRkXCIgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlhbG9nLWhlYWRlclwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cIm1haW4tY2xvc2UtYnV0dG9uXCIgb25DbGljaz17KCkgPT4gb25DbG9zZSgpfT5cbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj4mI3hFNUNEOzwvaT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcHMtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8U3RlcHNcbiAgICAgICAgICAgICAgbGlzdD17c3RlcExpc3R9XG4gICAgICAgICAgICAgIHN0ZXBIaXN0b3J5PXtzdGVwc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaWFsb2ctY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8UmVwbGFjZUFuaW0gaW49e3Nob3dTdGVwfSBlbmRMaXN0ZW5lcj17b25BbmltYXRpb25FbmR9PlxuICAgICAgICAgICAgICB7Z2V0Q29udGVudFRvUmVuZGVyKHN0ZXBzLCB7IG9uTmV4dCwgb25DbG9zZTogb25SZXNldEFuZENsb3NlIH0pfVxuICAgICAgICAgICAgPC9SZXBsYWNlQW5pbT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpYWxvZy1mb290ZXJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgaWQ9XCJiYWNrLWJ1dHRvbi1kaWFsb2dcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMub25CYWNrKCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIE5FVkVSIE1JTkQsIEdPIEJBQ0tcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvRGlhbG9nQW5pbT5cbiAgICApO1xuICB9XG59XG5cbkRpYWxvZ0FkZC5wcm9wVHlwZXMgPSB7XG4gIG9wZW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaWFsb2dBZGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY2xhc3MgRG9uZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgeyBvbkNsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgICAgb25DbG9zZSgpO1xuICAgIH0sIDMwMDApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtZG9uZS1hZGRcIj5cbiAgICAgICAgPGgyPkRvbmUhPC9oMj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWljLWRvbmVcIj5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBzcmM9XCJpbWcvaWMtZG9uZS5zdmdcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaWMtZG9uZVwiXG4gICAgICAgICAgICBhbHQ9XCJkb25lIGljb25cIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Eb25lLnByb3BUeXBlcyA9IHtcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERvbmU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHsgQUREX0NBVEVHT1JZLCBTRUxFQ1RfQ0FURUdPUlkgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvc3RlcHMnO1xuXG5jb25zdCBTZWxlY3RBY3Rpb25BZGQgPSAoeyBvbk5leHQgfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtc2VsZWN0LWFjdGlvbi1hZGRcIj5cbiAgICA8aDI+V2hhdCB3b3VsZCB5b3UgbGlrZSB0byBhZGQ/PC9oMj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW0tc2VsZWN0XCI+XG4gICAgICA8cFxuICAgICAgICBjbGFzc05hbWU9XCJzZWxlY3QtdGl0bGVcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk5leHQoeyBzdGVwSWQ6IEFERF9DQVRFR09SWSwgb3B0aW9uczoge30gfSl9XG4gICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgPlxuICAgICAgICBDQVRFR09SWVxuICAgICAgPC9wPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbS1zZWxlY3RcIj5cbiAgICAgIDxwXG4gICAgICAgIGNsYXNzTmFtZT1cInNlbGVjdC10aXRsZVwiXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uTmV4dCh7IHN0ZXBJZDogU0VMRUNUX0NBVEVHT1JZLCBvcHRpb25zOiB7fSB9KX1cbiAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICA+XG4gICAgICAgIEFSR1VNRU5UXG4gICAgICA8L3A+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuU2VsZWN0QWN0aW9uQWRkLnByb3BUeXBlcyA9IHtcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0QWN0aW9uQWRkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IENhdGVnb3J5IGZyb20gJy4uL0NhdGVnb3J5JztcbmltcG9ydCB7IEFERF9BUkdVTUVOVCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgeyBzaG93TWVzc2FnZUluZm8gfSBmcm9tICcuLi8uLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcblxuXG5jbGFzcyBTZWxlY3RDYXRlZ29yeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZENhdGVnb3J5OiB1bmRlZmluZWQsXG4gICAgfTtcbiAgICB0aGlzLm9uQ2F0ZWdvcnlDbGljayA9IHRoaXMub25DYXRlZ29yeUNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkJ1dHRvbk5leHRDbGljayA9IHRoaXMub25CdXR0b25OZXh0Q2xpY2suYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uQ2F0ZWdvcnlDbGljayhjYXRlZ29yeSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZENhdGVnb3J5OiBjYXRlZ29yeSB9KTtcbiAgfVxuXG4gIG9uQnV0dG9uTmV4dENsaWNrKCkge1xuICAgIGNvbnN0IHsgc2VsZWN0ZWRDYXRlZ29yeSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IG9uTmV4dCwgZGlzcGF0Y2ggfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKHNlbGVjdGVkQ2F0ZWdvcnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZGlzcGF0Y2goc2hvd01lc3NhZ2VJbmZvKGxhYmVscy5tc2dTZWxlY3RDYXRlZ29yeSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvbk5leHQoeyBzdGVwSWQ6IEFERF9BUkdVTUVOVCwgb3B0aW9uczogeyBzZWxlY3RlZENhdGVnb3J5IH0gfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjYXRlZ29yaWVzTGlzdCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHNlbGVjdGVkQ2F0ZWdvcnkgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1zZWxlY3QtY2F0ZWdvcnlcIj5cbiAgICAgICAgPGgyPkNob29zZSBhIENBVEVHT1JZPC9oMj5cbiAgICAgICAgPGRpdiBpZD1cImNvbnRlbnQtY2F0ZWdvcmllc1wiPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNhdGVnb3JpZXNMaXN0Lm1hcChjYXRlZ29yeSA9PiAoXG4gICAgICAgICAgICAgIChjYXRlZ29yeS5pZCAhPT0gJzAnKVxuICAgICAgICAgICAgICA/IDxDYXRlZ29yeVxuICAgICAgICAgICAgICAgIGtleT17Y2F0ZWdvcnkuaWR9XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk9e2NhdGVnb3J5fVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtzZWxlY3RlZENhdGVnb3J5ICE9PSB1bmRlZmluZWQgJiYgY2F0ZWdvcnkuaWQgPT09IHNlbGVjdGVkQ2F0ZWdvcnkuaWR9XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkNhdGVnb3J5Q2xpY2t9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICApKVxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFpbi1idXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkJ1dHRvbk5leHRDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICBORVhUXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TZWxlY3RDYXRlZ29yeS5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjYXRlZ29yaWVzTGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3AgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICBjYXRlZ29yaWVzTGlzdDogc3RhdGUudG9kb0ZpbHRlcnMuY2F0ZWdvcmllcyxcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcCkoU2VsZWN0Q2F0ZWdvcnkpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IERhdGVQaWNrZXIgZnJvbSAncmVhY3QtZGF0ZS1waWNrZXInO1xuXG5pbXBvcnQgbGFiZWxzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9sYWJlbHMnO1xuaW1wb3J0IHsgRE9ORSB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9zdGVwcyc7XG5pbXBvcnQgeyBhZGRUb2RvQXJndW1lbnQgfSBmcm9tICcuLi8uLi9hY3Rpb25zL3RvZG9Bcmd1bWVudHNBY3Rpb25zJztcbmltcG9ydCB7IHNob3dNZXNzYWdlSW5mbyB9IGZyb20gJy4uLy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuXG5jbGFzcyBTZWxlY3RDb21wbGV0ZURhdGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdG9kb1dpdGhpbjogbmV3IERhdGUoKSxcbiAgICB9O1xuICAgIHRoaXMub25JbnB1dERhdGVDaGFuZ2UgPSB0aGlzLm9uSW5wdXREYXRlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkJ1dHRvbkFkZENsaWNrID0gdGhpcy5vbkJ1dHRvbkFkZENsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblRvZG9Bcmd1bWVudENyZWF0ZWQgPSB0aGlzLm9uVG9kb0FyZ3VtZW50Q3JlYXRlZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25JbnB1dERhdGVDaGFuZ2UoZGF0ZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyB0b2RvV2l0aGluOiBkYXRlIH0pO1xuICB9XG5cbiAgb25CdXR0b25BZGRDbGljaygpIHtcbiAgICBjb25zdCB7IHRvZG9XaXRoaW4gfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBkaXNwYXRjaCwgb3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgY2F0ZWdvcnkgfSA9IG9wdGlvbnM7XG4gICAgaWYgKCF0b2RvV2l0aGluIHx8IHRvZG9XaXRoaW4gPT09ICcnKSB7XG4gICAgICBkaXNwYXRjaChzaG93TWVzc2FnZUluZm8obGFiZWxzLm1zZ1NlbGVjdERhdGUpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGlzcGF0Y2goYWRkVG9kb0FyZ3VtZW50KFxuICAgICAgdGl0bGUsIGRlc2NyaXB0aW9uLFxuICAgICAgY2F0ZWdvcnksIHRvZG9XaXRoaW4sIHRoaXMub25Ub2RvQXJndW1lbnRDcmVhdGVkLFxuICAgICkpO1xuICB9XG5cbiAgb25Ub2RvQXJndW1lbnRDcmVhdGVkKCkge1xuICAgIGNvbnN0IHsgb25OZXh0IH0gPSB0aGlzLnByb3BzO1xuICAgIG9uTmV4dCh7IHN0ZXBJZDogRE9ORSwgb3B0aW9uczogeyB9IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgdG9kb1dpdGhpbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LXNlbGVjdC1jb21wbGV0ZS1kYXRlXCI+XG4gICAgICAgIDxoMj5Ub2RvIFdpdGhpbjwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1pbnB1dFwiPlxuICAgICAgICAgIDxEYXRlUGlja2VyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWlucHV0XCJcbiAgICAgICAgICAgIGNhbGVuZGFyQ2xhc3NOYW1lPVwiZGFyay1jYWxlbmRhclwiXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0RGF0ZUNoYW5nZX1cbiAgICAgICAgICAgIHZhbHVlPXt0b2RvV2l0aGlufVxuICAgICAgICAgICAgbWluRGF0ZT17bmV3IERhdGUoKX1cbiAgICAgICAgICAgIGxvY2FsZT1cImVuLVVTXCJcbiAgICAgICAgICAgIGNsZWFySWNvbj17PGkgY2xhc3NOYW1lPVwiaWNvbi1kZWxldGVcIiAvPn1cbiAgICAgICAgICAgIGNhbGVuZGFySWNvbj17PGkgY2xhc3NOYW1lPVwiaWNvbi1jYWxlbmRhclwiIC8+fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1haW4tYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25CdXR0b25BZGRDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICBBRERcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblNlbGVjdENvbXBsZXRlRGF0ZS5wcm9wVHlwZXMgPSB7XG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvcHRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgZGVzY3JpcHRpb246IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjYXRlZ29yeTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgfSkuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgb25OZXh0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCgpKFNlbGVjdENvbXBsZXRlRGF0ZSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgU3RlcCA9ICh7IGRlc2NyaXB0aW9uLCBjb21wbGV0ZWQsIG5lZWRMaW5lIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNvbnRhaW5lclwiPlxuICAgIHtcbiAgICAgIG5lZWRMaW5lICYmXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGxpbmUgJHsoY29tcGxldGVkKSA/ICdjb21wbGV0ZWQnIDogJyd9YH0gLz5cbiAgICB9XG4gICAgPGRpdiBjbGFzc05hbWU9e2BzdGVwICR7KGNvbXBsZXRlZCkgPyAnY29tcGxldGVkJyA6ICcnfWB9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmRpY2F0b3JcIiAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWRlc2NyaXB0aW9uXCI+XG4gICAgICAgIDxwPntkZXNjcmlwdGlvbn08L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4pO1xuXG5TdGVwLnByb3BUeXBlcyA9IHtcbiAgZGVzY3JpcHRpb246IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgY29tcGxldGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBuZWVkTGluZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbn07XG5cbmNvbnN0IFN0ZXBzID0gKHsgbGlzdCwgc3RlcEhpc3RvcnkgfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXBzLXdyYXBwZXJcIj5cbiAgICB7XG4gICAgICBsaXN0Lm1hcCgoaXRlbSwgaSkgPT4gKFxuICAgICAgICA8U3RlcFxuICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICB7Li4uaXRlbX1cbiAgICAgICAgICBjb21wbGV0ZWQ9e3N0ZXBIaXN0b3J5LmZpbHRlcihzaCA9PiBzaC5zdGVwSWQgPT09IGl0ZW0uaWQpLmxlbmd0aCA+IDB9XG4gICAgICAgICAgbmVlZExpbmU9e2kgPiAwfVxuICAgICAgICAvPikpXG4gICAgfVxuICA8L2Rpdj5cbik7XG5cblN0ZXBzLnByb3BUeXBlcyA9IHtcbiAgbGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIHN0ZXBIaXN0b3J5OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHN0ZXBJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgfSkpLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdGVwcztcbiIsImNvbnN0IGxhYmVscyA9IHtcbiAgbXNnVGl0bGVSZXF1aXJlZDogJ0VudGVyIHRoZSB0aXRsZScsXG4gIG1zZ05hbWVSZXF1aXJlZDogJ0VudGVyIHRoZSBuYW1lJyxcbiAgbXNnU2VsZWN0Q2F0ZWdvcnk6ICdTZWxlY3QgYSBjYXRlZ29yeScsXG4gIG1zZ1NlbGVjdERhdGU6ICdQaWNrIGEgZGF0ZSBhbmQgY29tbWl0LiBObyBleGN1c2VzIScsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBsYWJlbHM7XG4iLCJleHBvcnQgY29uc3QgU0VMRUNUX1dBTlRfVE9fQUREID0gJ1NFTEVDVF9XQU5UX1RPX0FERCc7XG5leHBvcnQgY29uc3QgQUREX0NBVEVHT1JZID0gJ0FERF9DQVRFR09SWSc7XG5leHBvcnQgY29uc3QgQUREX0FSR1VNRU5UID0gJ0FERF9BUkdVTUVOVCc7XG5leHBvcnQgY29uc3QgU0VMRUNUX0NBVEVHT1JZID0gJ1NFTEVDVF9DQVRFR09SWSc7XG5leHBvcnQgY29uc3QgU0VMRUNUX0NPTVBMRVRFX0RBVEUgPSAnU0VMRUNUX0NPTVBMRVRFX0RBVEUnO1xuZXhwb3J0IGNvbnN0IERPTkUgPSAnRE9ORSc7XG5cbmV4cG9ydCBjb25zdCBzdGVwTGlzdCA9IFtcbiAge1xuICAgIGlkOiBTRUxFQ1RfV0FOVF9UT19BREQsXG4gICAgZGVzY3JpcHRpb246ICdXaGF0IHdhbnQgdG8gYWRkJyxcbiAgfSxcbiAge1xuICAgIGlkOiBBRERfQ0FURUdPUlksXG4gICAgZGVzY3JpcHRpb246ICdBZGQgYSBjYXRlZ29yeScsXG4gIH0sXG4gIHtcbiAgICBpZDogU0VMRUNUX0NBVEVHT1JZLFxuICAgIGRlc2NyaXB0aW9uOiAnU2VsZWN0IGEgY2F0ZWdvcnknLFxuICB9LFxuICB7XG4gICAgaWQ6IEFERF9BUkdVTUVOVCxcbiAgICBkZXNjcmlwdGlvbjogJ0FkZCBBcmd1bWVudCcsXG4gIH0sXG4gIHtcbiAgICBpZDogU0VMRUNUX0NPTVBMRVRFX0RBVEUsXG4gICAgZGVzY3JpcHRpb246ICdTY2hlZHVsZScsXG4gIH0sXG4gIHtcbiAgICBpZDogRE9ORSxcbiAgICBkZXNjcmlwdGlvbjogJ1RoYXRcXCdzIGl0JyxcbiAgfSxcbl07XG4iLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IENhdGVnb3JpZXNGaWx0ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9DYXRlZ29yaWVzRmlsdGVyJztcbmltcG9ydCB7XG4gIHNlbGVjdENhdGVnb3J5LFxuICBzZWxlY3RDYXRlZ29yeUFsbCxcbiAgZGVsZXRlQ2F0ZWdvcnksXG59IGZyb20gJy4uL2FjdGlvbnMvdG9kb0ZpbHRlcnNBY3Rpb25zJztcbmltcG9ydCBjYXRlZ29yeUFsbCBmcm9tICcuLi9jb25zdGFudHMvY29uZmlnJztcblxuaW1wb3J0IHsgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICBjYXRlZ29yeUxpc3Q6IGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0KHN0YXRlKSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgb25EZWxldGVDYXRlZ29yeTogKGNhdGVnb3J5KSA9PiB7XG4gICAgICBkaXNwYXRjaChkZWxldGVDYXRlZ29yeShjYXRlZ29yeS5pZCkpO1xuICAgIH0sXG4gICAgb25DaWxja0NhdGVnb3J5OiAoY2F0ZWdvcnksIGUpID0+IHtcbiAgICAgIGlmIChlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdpJyAmJiBlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdidXR0b24nKSB7XG4gICAgICAgIGlmIChjYXRlZ29yeS5pZCA9PT0gY2F0ZWdvcnlBbGwuaWQpIHtcbiAgICAgICAgICBkaXNwYXRjaChzZWxlY3RDYXRlZ29yeUFsbCgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaXNwYXRjaChzZWxlY3RDYXRlZ29yeShjYXRlZ29yeSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgfVxuKTtcblxuY29uc3QgQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lciA9IGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuKShDYXRlZ29yaWVzRmlsdGVyKTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0ZWdvcmllc0ZpbHRlckNvbnRhaW5lcjtcbiIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVG9kb0FyZ3VtZW50cyBmcm9tICcuLi9jb21wb25lbnRzL1RvZG9Bcmd1bWVudHMnO1xuaW1wb3J0IHtcbiAgZmV0Y2hUb2RvQXJndW1lbnRzQnlDYXRlZ29yeSxcbiAgZGVsZXRlVG9kb0FyZ3VtZW50LFxuICB0b29nbGVUb2RvQXJndW1lbnRDb21wbGV0ZWQsXG59IGZyb20gJy4uL2FjdGlvbnMvdG9kb0FyZ3VtZW50c0FjdGlvbnMnO1xuXG5pbXBvcnQgeyBnZXRUb2RvQXJndW1lbnRzTGlzdCwgZ2V0U2tpcCwgc3RpbGxNb3JlVG9Mb2FkIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9Bcmd1bWVudHNTZWxlY3RvcnMnO1xuaW1wb3J0IHsgZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQsIHZpc2liaWxpdHlPbmx5Q29tcGxldGVkIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3RvZG9GaWx0ZXJzU2VsZWN0b3JzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgbGlzdFRvZG9Bcmd1bWVudHM6IGdldFRvZG9Bcmd1bWVudHNMaXN0KHN0YXRlKSxcbiAgICBza2lwOiBnZXRTa2lwKHN0YXRlKSxcbiAgICBtb3JlVG9Mb2FkOiBzdGlsbE1vcmVUb0xvYWQoc3RhdGUpLFxuICAgIGNhdGVnb3JpZXNJZDogZ2V0U2VsZWN0ZWRDYXRlZ29yaWVzSWQoc3RhdGUpLFxuICAgIGNvbXBsZXRlZDogdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQoc3RhdGUpLFxuICB9XG4pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoXG4gIHtcbiAgICBvbkRlbGV0ZUFyZ3VtZW50OiAoYXJndW1lbnQpID0+IHtcbiAgICAgIGRpc3BhdGNoKGRlbGV0ZVRvZG9Bcmd1bWVudChhcmd1bWVudC5pZCkpO1xuICAgIH0sXG4gICAgb25Db21wbGV0ZUFyZ3VtZW50OiAoYXJndW1lbnQpID0+IHtcbiAgICAgIGRpc3BhdGNoKHRvb2dsZVRvZG9Bcmd1bWVudENvbXBsZXRlZChhcmd1bWVudC5pZCwgYXJndW1lbnQuY29tcGxldGVkKSk7XG4gICAgfSxcbiAgICBmZXRjaFRvZG9Bcmd1bWVudHM6IChjYXRlZ29yaWVzSWQsIGNvbXBsZXRlZCwgbGltaXQsIHNraXApID0+IHtcbiAgICAgIGRpc3BhdGNoKGZldGNoVG9kb0FyZ3VtZW50c0J5Q2F0ZWdvcnkoY2F0ZWdvcmllc0lkLCBjb21wbGV0ZWQsIGxpbWl0LCBza2lwKSk7XG4gICAgfSxcbiAgfVxuKTtcblxuY29uc3QgVG9kb0FyZ3VtZW50c0NvbnRhaW5lciA9IGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuKShUb2RvQXJndW1lbnRzKTtcblxuZXhwb3J0IGRlZmF1bHQgVG9kb0FyZ3VtZW50c0NvbnRhaW5lcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgVG9kb3MgZnJvbSAnLi4vY29tcG9uZW50cy9Ub2Rvcyc7XG5pbXBvcnQgeyBmZXRjaEFsbENhdGVnb3JpZXMgfSBmcm9tICcuLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5pbXBvcnQgeyBoaWRlTWVzc2FnZSB9IGZyb20gJy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xuaW1wb3J0IHsgc2hvd0xvYWRpbmcgfSBmcm9tICcuLi9zZWxlY3RvcnMvY29tbW9uU2VsZWN0b3JzJztcblxuY29uc3QgVG9kb3NDb250YWluZXIgPSBwcm9wcyA9PiA8VG9kb3Mgey4uLnByb3BzfSAvPjtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgbWVzc2FnZTogc3RhdGUubWVzc2FnZSxcbiAgICBzaG93TG9hZGluZzogc2hvd0xvYWRpbmcoc3RhdGUpLFxuICB9XG4pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoXG4gIHtcbiAgICBoaWRlTWVzc2FnZTogKCkgPT4ge1xuICAgICAgZGlzcGF0Y2goaGlkZU1lc3NhZ2UoKSk7XG4gICAgfSxcbiAgICBpbml0RmV0Y2hBbGxDYXRlZ29yaWVzOiAoKSA9PiB7XG4gICAgICBkaXNwYXRjaChmZXRjaEFsbENhdGVnb3JpZXMoKSk7XG4gICAgfSxcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVG9kb3NDb250YWluZXIpO1xuIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaXNpYmlsaXR5RmlsdGVycyBmcm9tICcuLi9jb21wb25lbnRzL1Zpc2liaWxpdHlGaWx0ZXJzJztcbmltcG9ydCB7IGNoYW5nZVZpc2liaWxpdHkgfSBmcm9tICcuLi9hY3Rpb25zL3RvZG9GaWx0ZXJzQWN0aW9ucyc7XG5cbmltcG9ydCB7IGdldFZpc2liaWxpdHlGaWx0ZXIgfSBmcm9tICcuLi9zZWxlY3RvcnMvdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiAoXG4gIHtcbiAgICBzZWxlY3RlZFZpc2liaWxpdHlGaWx0ZXI6IGdldFZpc2liaWxpdHlGaWx0ZXIoc3RhdGUpLFxuICB9XG4pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoXG4gIHtcbiAgICBvblZpc2liaWxpdHlTd2l0Y2hDbGljazogdmlzaWJpbGl0eSA9PiAoKSA9PiAoXG4gICAgICBkaXNwYXRjaChjaGFuZ2VWaXNpYmlsaXR5KHZpc2liaWxpdHkpKVxuICAgICksXG4gIH1cbik7XG5cbmNvbnN0IFZpc2liaWxpdHlGaWx0ZXJDb250YWluZXIgPSBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbikoVmlzaWJpbGl0eUZpbHRlcnMpO1xuXG5leHBvcnQgZGVmYXVsdCBWaXNpYmlsaXR5RmlsdGVyQ29udGFpbmVyO1xuIiwiaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgeyBpc0ZldGNoaW5nQ2F0ZWdvcmllc0ZpbHRlciB9IGZyb20gJy4vdG9kb0ZpbHRlcnNTZWxlY3RvcnMnO1xuaW1wb3J0IHsgaXNGZXRjaGluZ1RvZG9Bcmd1bWVudHMgfSBmcm9tICcuL3RvZG9Bcmd1bWVudHNTZWxlY3RvcnMnO1xuXG5leHBvcnQgY29uc3Qgc2hvd0xvYWRpbmcgPSBjcmVhdGVTZWxlY3RvcihcbiAgaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIsXG4gIGlzRmV0Y2hpbmdUb2RvQXJndW1lbnRzLFxuICAoaXNGZXRjaGluZ0NhdGVnb3JpZXMsIGlzRmV0Y2hpbmdUb2RvcykgPT4gaXNGZXRjaGluZ0NhdGVnb3JpZXMgfHwgaXNGZXRjaGluZ1RvZG9zLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgc2hvd0xvYWRpbmc7XG4iLCJleHBvcnQgY29uc3QgaXNGZXRjaGluZ1RvZG9Bcmd1bWVudHMgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvQXJndW1lbnRzLmlzRmV0Y2hpbmc7XG5leHBvcnQgY29uc3QgZ2V0VG9kb0FyZ3VtZW50cyA9IHN0YXRlID0+IHN0YXRlLnRvZG9Bcmd1bWVudHM7XG5leHBvcnQgY29uc3QgZ2V0VG9kb0FyZ3VtZW50c0xpc3QgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvQXJndW1lbnRzLml0ZW1zO1xuZXhwb3J0IGNvbnN0IGdldFNraXAgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvQXJndW1lbnRzLnNraXA7XG5leHBvcnQgY29uc3Qgc3RpbGxNb3JlVG9Mb2FkID0gc3RhdGUgPT4gc3RhdGUudG9kb0FyZ3VtZW50cy5tb3JlVG9Mb2FkO1xuIiwiaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgeyBPTkxZX0NPTVBMRVRFRCB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25maWcnO1xuXG5leHBvcnQgY29uc3QgaXNGZXRjaGluZ0NhdGVnb3JpZXNGaWx0ZXIgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy5pc0ZldGNoaW5nO1xuZXhwb3J0IGNvbnN0IGdldFRvZG9GaWx0ZXJzID0gc3RhdGUgPT4gc3RhdGUudG9kb0ZpbHRlcnM7XG5leHBvcnQgY29uc3QgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy5jYXRlZ29yaWVzO1xuZXhwb3J0IGNvbnN0IGdldFZpc2liaWxpdHlGaWx0ZXIgPSBzdGF0ZSA9PiBzdGF0ZS50b2RvRmlsdGVycy52aXNpYmlsaXR5O1xuXG5leHBvcnQgY29uc3QgdmlzaWJpbGl0eU9ubHlDb21wbGV0ZWQgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0VmlzaWJpbGl0eUZpbHRlcixcbiAgdmlzaWJpbGl0eSA9PiB2aXNpYmlsaXR5ID09PSBPTkxZX0NPTVBMRVRFRCxcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRTZWxlY3RlZENhdGVnb3JpZXNGaWx0ZXIgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q2F0ZWdvcmllc0ZpbHRlckxpc3QsXG4gIGNhdGVnb3JpZXMgPT4gY2F0ZWdvcmllcy5maWx0ZXIoY2F0ZWdvcnkgPT4gY2F0ZWdvcnkuc2VsZWN0ZWQpLFxuKTtcblxuZXhwb3J0IGNvbnN0IGdldFNlbGVjdGVkQ2F0ZWdvcmllc0lkID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENhdGVnb3JpZXNGaWx0ZXJMaXN0LFxuICBjYXRlZ29yaWVzID0+IGNhdGVnb3JpZXMuZmlsdGVyKGNhdGVnb3J5ID0+IGNhdGVnb3J5LnNlbGVjdGVkKVxuICAgIC5tYXAoY2F0ZWdvcnlGaWx0ZXIgPT4gY2F0ZWdvcnlGaWx0ZXIuaWQpLFxuKTtcbiIsIi8qIGVzbGludCBxdW90ZS1wcm9wczogW1wiZXJyb3JcIiwgXCJjb25zaXN0ZW50XCJdICovXG5cbmV4cG9ydCBjb25zdCBNZXRob2RzID0ge1xuICBQT1NUOiAnUE9TVCcsXG4gIEdFVDogJ0dFVCcsXG4gIERFTEVURTogJ0RFTEVURScsXG59O1xuXG5jb25zdCBmdWxsVXJsID0gdXJsID0+IGAvYXBpLyR7dXJsfWA7XG5cbmNvbnN0IGJhc2VSZXF1ZXN0SW5pdCA9IHtcbiAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgaGVhZGVyczoge1xuICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gIH0sXG59O1xuXG5jb25zdCBjcmVhdGVQb3N0UmVxdWVzdCA9ICh1cmwsIG9wdGlvbnMgPSB7fSkgPT4gKFxuICBmZXRjaCh1cmwsIHtcbiAgICAuLi5iYXNlUmVxdWVzdEluaXQsXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkob3B0aW9ucyksXG4gIH0pXG4pO1xuXG5jb25zdCBjcmVhdGVHZXRSZXF1ZXN0ID0gKHVybCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGxldCBmaW5hbFVybCA9IGAke3VybH0/YDtcbiAgT2JqZWN0LmVudHJpZXMob3B0aW9ucykuZm9yRWFjaCgoW2tleSwgdmFsdWVdLCBwb2l0aW9uKSA9PiB7XG4gICAgZmluYWxVcmwgPSBgJHtmaW5hbFVybH0keyhwb2l0aW9uID4gMCkgPyAnJicgOiAnJ30ke2tleX09JHt2YWx1ZX1gO1xuICB9KTtcbiAgcmV0dXJuIGZldGNoKGZpbmFsVXJsLCB7XG4gICAgLi4uYmFzZVJlcXVlc3RJbml0LFxuICAgIG1ldGhvZDogJ0dFVCcsXG4gIH0pO1xufTtcblxuY29uc3QgY3JlYXRlRGVsZXRlUmVxdWVzdCA9ICh1cmwsIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgZmluYWxVcmwgPSBgJHt1cmx9LyR7b3B0aW9uc31gO1xuICByZXR1cm4gZmV0Y2goZmluYWxVcmwsIHtcbiAgICAuLi5iYXNlUmVxdWVzdEluaXQsXG4gICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVSZXF1ZXN0ID0gKHVybCwgb3B0aW9ucywgbWV0aG9kKSA9PiB7XG4gIGNvbnN0IGZpbmFsVXJsID0gZnVsbFVybCh1cmwpO1xuICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgIGNhc2UgTWV0aG9kcy5QT1NUOiByZXR1cm4gY3JlYXRlUG9zdFJlcXVlc3QoZmluYWxVcmwsIG9wdGlvbnMpO1xuICAgIGNhc2UgTWV0aG9kcy5HRVQ6IHJldHVybiBjcmVhdGVHZXRSZXF1ZXN0KGZpbmFsVXJsLCBvcHRpb25zKTtcbiAgICBjYXNlIE1ldGhvZHMuREVMRVRFOiByZXR1cm4gY3JlYXRlRGVsZXRlUmVxdWVzdChmaW5hbFVybCwgb3B0aW9ucyk7XG4gICAgZGVmYXVsdDogcmV0dXJuIGNyZWF0ZVBvc3RSZXF1ZXN0KGZpbmFsVXJsLCBvcHRpb25zKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNhbGxBcGkgPSAodXJsLCBvcHRpb25zID0ge30sIG1ldGhvZCA9IE1ldGhvZHMuUE9TVCkgPT4gKFxuICBjcmVhdGVSZXF1ZXN0KHVybCwgb3B0aW9ucywgbWV0aG9kKS50aGVuKFxuICAgIHJlc3BvbnNlID0+IChyZXNwb25zZS5vayA/XG4gICAgICByZXNwb25zZS5qc29uKCkgOlxuICAgICAgUHJvbWlzZS5yZWplY3QocmVzcG9uc2UudGV4dCgpKVxuICAgICksXG4gICAgZXJyb3IgPT4gUHJvbWlzZS5yZWplY3QoZXJyb3IpLFxuICApXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBjYWxsQXBpO1xuXG4iLCJpbXBvcnQgZGF0ZUZvcm1hdCBmcm9tICdkYXRlZm9ybWF0JztcblxuZXhwb3J0IGNvbnN0IHRvSnNEYXRlID0gKHBhcnNlRGF0ZSA9ICcnKSA9PlxuICBuZXcgRGF0ZShwYXJzZUludChwYXJzZURhdGUuc3Vic3RyKDYpLCAxMCkpO1xuXG5leHBvcnQgY29uc3QgdG9TaW1wbGVEYXRlRm9ybWF0ID0gZGF0ZSA9PlxuICBkYXRlRm9ybWF0KGRhdGUsICdkZGRkIGRkIG1tbSB5eXl5Jyk7XG4iXSwic291cmNlUm9vdCI6IiJ9