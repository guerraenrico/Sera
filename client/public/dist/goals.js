(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["goals"],{

/***/ "./src/components/anims/SnackbarAnim.jsx":
/*!***********************************************!*\
  !*** ./src/components/anims/SnackbarAnim.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/index.js");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_transition_group__WEBPACK_IMPORTED_MODULE_2__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var duration = 250;
var defaultStyle = {
  transition: "all ".concat(duration, "ms ease-in-out"),
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
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_2__["Transition"], {
    in: inProp,
    timeout: duration
  }, function (state) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "content-snackbar",
      style: _objectSpread({}, defaultStyle, transitionStyles[state]),
      className: customClass
    }, children);
  });
};

SnackbarAnim.propTypes = {
  in: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired,
  customClass: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
SnackbarAnim.defaultProps = {
  customClass: ''
};
/* harmony default export */ __webpack_exports__["default"] = (SnackbarAnim);

/***/ }),

/***/ "./src/components/goal/Goals.jsx":
/*!***************************************!*\
  !*** ./src/components/goal/Goals.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _layout_Snackbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../layout/Snackbar */ "./src/components/layout/Snackbar.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Goals =
/*#__PURE__*/
function (_Component) {
  _inherits(Goals, _Component);

  function Goals() {
    _classCallCheck(this, Goals);

    return _possibleConstructorReturn(this, _getPrototypeOf(Goals).apply(this, arguments));
  }

  _createClass(Goals, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          message = _this$props.message,
          hideMessage = _this$props.hideMessage;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content-app"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "In development"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layout_Snackbar__WEBPACK_IMPORTED_MODULE_2__["default"], {
        show: message.show,
        isError: message.isError,
        message: message.text,
        onClose: function onClose() {
          return hideMessage();
        }
      }));
    }
  }]);

  return Goals;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

Goals.propTypes = {
  message: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
    isError: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
    text: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
  }).isRequired,
  hideMessage: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Goals);

/***/ }),

/***/ "./src/components/layout/Snackbar.jsx":
/*!********************************************!*\
  !*** ./src/components/layout/Snackbar.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _anims_SnackbarAnim__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../anims/SnackbarAnim */ "./src/components/anims/SnackbarAnim.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Action = function Action(_ref) {
  var onClick = _ref.onClick,
      text = _ref.text;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "button-action-snackbar",
    onClick: onClick
  }, text);
};

Action.propTypes = {
  text: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};

var Snackbar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Snackbar, _React$Component);

  function Snackbar() {
    _classCallCheck(this, Snackbar);

    return _possibleConstructorReturn(this, _getPrototypeOf(Snackbar).apply(this, arguments));
  }

  _createClass(Snackbar, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$props = this.props,
          onClose = _this$props.onClose,
          duration = _this$props.duration,
          show = _this$props.show;

      if (show) {
        setTimeout(function () {
          onClose();
        }, duration);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          message = _this$props2.message,
          isError = _this$props2.isError,
          actionText = _this$props2.actionText,
          actionClick = _this$props2.actionClick,
          show = _this$props2.show,
          verticalPostion = _this$props2.verticalPostion,
          horizontalPosition = _this$props2.horizontalPosition;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_anims_SnackbarAnim__WEBPACK_IMPORTED_MODULE_2__["default"], {
        in: show,
        customClass: "".concat(verticalPostion, " ").concat(horizontalPosition)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "snackbar ".concat(isError ? 'error' : '')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "snackbar-message"
      }, message), actionText !== '' && actionClick !== undefined && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Action, {
        onClick: actionClick,
        text: actionText
      })));
    }
  }]);

  return Snackbar;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Snackbar.propTypes = {
  show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
  message: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  duration: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  isError: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  actionText: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  actionClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  verticalPostion: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['top', 'bottom']),
  horizontalPosition: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['left', 'right'])
};
Snackbar.defaultProps = {
  duration: 5000,
  isError: false,
  actionText: '',
  actionClick: undefined,
  verticalPostion: 'bottom',
  horizontalPosition: 'right'
};
/* harmony default export */ __webpack_exports__["default"] = (Snackbar);

/***/ }),

/***/ "./src/containers/GoalsContainer.jsx":
/*!*******************************************!*\
  !*** ./src/containers/GoalsContainer.jsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components_goal_Goals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/goal/Goals */ "./src/components/goal/Goals.jsx");
/* harmony import */ var _actions_messageActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/messageActions */ "./src/actions/messageActions.js");





var GoalsContainer = function GoalsContainer(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_goal_Goals__WEBPACK_IMPORTED_MODULE_2__["default"], props);
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    message: state.message
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    hideMessage: function hideMessage() {
      dispatch(Object(_actions_messageActions__WEBPACK_IMPORTED_MODULE_3__["hideMessage"])());
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(GoalsContainer));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9TbmFja2JhckFuaW0uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2dvYWwvR29hbHMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2xheW91dC9TbmFja2Jhci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvR29hbHNDb250YWluZXIuanN4Il0sIm5hbWVzIjpbImR1cmF0aW9uIiwiZGVmYXVsdFN0eWxlIiwidHJhbnNpdGlvbiIsImJvdHRvbSIsInRyYW5zaXRpb25TdHlsZXMiLCJlbnRlcmluZyIsInZpc2liaWxpdHkiLCJlbnRlcmVkIiwiU25hY2tiYXJBbmltIiwiaW5Qcm9wIiwiaW4iLCJjaGlsZHJlbiIsImN1c3RvbUNsYXNzIiwic3RhdGUiLCJwcm9wVHlwZXMiLCJib29sIiwiaXNSZXF1aXJlZCIsIm5vZGUiLCJzdHJpbmciLCJkZWZhdWx0UHJvcHMiLCJHb2FscyIsInByb3BzIiwibWVzc2FnZSIsImhpZGVNZXNzYWdlIiwic2hvdyIsImlzRXJyb3IiLCJ0ZXh0Iiwic2hhcGUiLCJmdW5jIiwiQWN0aW9uIiwib25DbGljayIsIlNuYWNrYmFyIiwib25DbG9zZSIsInNldFRpbWVvdXQiLCJhY3Rpb25UZXh0IiwiYWN0aW9uQ2xpY2siLCJ2ZXJ0aWNhbFBvc3Rpb24iLCJob3Jpem9udGFsUG9zaXRpb24iLCJ1bmRlZmluZWQiLCJDb21wb25lbnQiLCJudW1iZXIiLCJvbmVPZiIsIkdvYWxzQ29udGFpbmVyIiwibWFwU3RhdGVUb1Byb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiZGlzcGF0Y2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLFFBQVEsR0FBRyxHQUFqQjtBQUVBLElBQU1DLFlBQVksR0FBRztBQUNuQkMsWUFBVSxnQkFBU0YsUUFBVCxtQkFEUztBQUVuQkcsUUFB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LGVBQVcsRUFBRSx1QkFBTTtBQUNqQnNCLGNBQVEsQ0FBQywyRUFBVyxFQUFaLENBQVI7QUFDRDtBQUhILEdBRGlDO0FBQUEsQ0FBbkM7O0FBUWUsMEhBQU8sQ0FBQ0YsZUFBRCxFQUFrQkMsa0JBQWxCLENBQVAsQ0FBNkNGLGNBQTdDLENBQWYsRSIsImZpbGUiOiJnb2Fscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDI1MDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgYWxsICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBib3R0b206ICctMTAwcHgnLFxufTtcblxuY29uc3QgdHJhbnNpdGlvblN0eWxlcyA9IHtcbiAgZW50ZXJpbmc6IHtcbiAgICBib3R0b206ICctMTAwcHgnLFxuICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICB9LFxuICBlbnRlcmVkOiB7XG4gICAgYm90dG9tOiAnMHB4JyxcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gIH0sXG59O1xuXG5jb25zdCBTbmFja2JhckFuaW0gPSAoeyBpbjogaW5Qcm9wLCBjaGlsZHJlbiwgY3VzdG9tQ2xhc3MgfSkgPT4gKFxuICA8VHJhbnNpdGlvbiBpbj17aW5Qcm9wfSB0aW1lb3V0PXtkdXJhdGlvbn0+XG4gICAge3N0YXRlID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJjb250ZW50LXNuYWNrYmFyXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAuLi5kZWZhdWx0U3R5bGUsXG4gICAgICAgICAgLi4udHJhbnNpdGlvblN0eWxlc1tzdGF0ZV0sXG4gICAgICAgIH19XG4gICAgICAgIGNsYXNzTmFtZT17Y3VzdG9tQ2xhc3N9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICl9XG4gIDwvVHJhbnNpdGlvbj5cbik7XG5cblNuYWNrYmFyQW5pbS5wcm9wVHlwZXMgPSB7XG4gIGluOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgY3VzdG9tQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5TbmFja2JhckFuaW0uZGVmYXVsdFByb3BzID0ge1xuICBjdXN0b21DbGFzczogJycsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTbmFja2JhckFuaW07XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IFNuYWNrYmFyIGZyb20gJy4uL2xheW91dC9TbmFja2Jhcic7XG5cbmNsYXNzIEdvYWxzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBtZXNzYWdlLCBoaWRlTWVzc2FnZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWFwcFwiPlxuICAgICAgICA8cD5JbiBkZXZlbG9wbWVudDwvcD5cbiAgICAgICAgPFNuYWNrYmFyXG4gICAgICAgICAgc2hvdz17bWVzc2FnZS5zaG93fVxuICAgICAgICAgIGlzRXJyb3I9e21lc3NhZ2UuaXNFcnJvcn1cbiAgICAgICAgICBtZXNzYWdlPXttZXNzYWdlLnRleHR9XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gaGlkZU1lc3NhZ2UoKX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuR29hbHMucHJvcFR5cGVzID0ge1xuICBtZXNzYWdlOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHNob3c6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNFcnJvcjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICB0ZXh0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIGhpZGVNZXNzYWdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgR29hbHM7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBTbmFja2JhckFuaW0gZnJvbSAnLi4vYW5pbXMvU25hY2tiYXJBbmltJztcblxuY29uc3QgQWN0aW9uID0gKHsgb25DbGljaywgdGV4dCB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLWFjdGlvbi1zbmFja2JhclwiIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIHt0ZXh0fVxuICA8L2J1dHRvbj5cbik7XG5cbkFjdGlvbi5wcm9wVHlwZXMgPSB7XG4gIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmNsYXNzIFNuYWNrYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2xvc2UsIGR1cmF0aW9uLCBzaG93LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKHNob3cpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBvbkNsb3NlKCk7XG4gICAgICB9LCBkdXJhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG1lc3NhZ2UsIGlzRXJyb3IsIGFjdGlvblRleHQsIGFjdGlvbkNsaWNrLCBzaG93LFxuICAgICAgdmVydGljYWxQb3N0aW9uLCBob3Jpem9udGFsUG9zaXRpb24sXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTbmFja2JhckFuaW0gaW49e3Nob3d9IGN1c3RvbUNsYXNzPXtgJHt2ZXJ0aWNhbFBvc3Rpb259ICR7KGhvcml6b250YWxQb3NpdGlvbil9YH0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2BzbmFja2JhciAkeyhpc0Vycm9yKSA/ICdlcnJvcicgOiAnJ31gfVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic25hY2tiYXItbWVzc2FnZVwiPnttZXNzYWdlfTwvc3Bhbj5cbiAgICAgICAgICB7XG4gICAgICAgICAgICAoYWN0aW9uVGV4dCAhPT0gJycgJiYgYWN0aW9uQ2xpY2sgIT09IHVuZGVmaW5lZCkgJiZcbiAgICAgICAgICAgICAgPEFjdGlvbiBvbkNsaWNrPXthY3Rpb25DbGlja30gdGV4dD17YWN0aW9uVGV4dH0gLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9TbmFja2JhckFuaW0+XG4gICAgKTtcbiAgfVxufVxuXG5TbmFja2Jhci5wcm9wVHlwZXMgPSB7XG4gIHNob3c6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZHVyYXRpb246IFByb3BUeXBlcy5udW1iZXIsXG4gIGlzRXJyb3I6IFByb3BUeXBlcy5ib29sLFxuICBhY3Rpb25UZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBhY3Rpb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gIHZlcnRpY2FsUG9zdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsndG9wJywgJ2JvdHRvbSddKSxcbiAgaG9yaXpvbnRhbFBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxufTtcblxuU25hY2tiYXIuZGVmYXVsdFByb3BzID0ge1xuICBkdXJhdGlvbjogNTAwMCxcbiAgaXNFcnJvcjogZmFsc2UsXG4gIGFjdGlvblRleHQ6ICcnLFxuICBhY3Rpb25DbGljazogdW5kZWZpbmVkLFxuICB2ZXJ0aWNhbFBvc3Rpb246ICdib3R0b20nLFxuICBob3Jpem9udGFsUG9zaXRpb246ICdyaWdodCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTbmFja2JhcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgR29hbHMgZnJvbSAnLi4vY29tcG9uZW50cy9nb2FsL0dvYWxzJztcbmltcG9ydCB7IGhpZGVNZXNzYWdlIH0gZnJvbSAnLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5cbmNvbnN0IEdvYWxzQ29udGFpbmVyID0gcHJvcHMgPT4gPEdvYWxzIHsuLi5wcm9wc30gLz47XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IChcbiAge1xuICAgIG1lc3NhZ2U6IHN0YXRlLm1lc3NhZ2UsXG4gIH1cbik7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcbiAge1xuICAgIGhpZGVNZXNzYWdlOiAoKSA9PiB7XG4gICAgICBkaXNwYXRjaChoaWRlTWVzc2FnZSgpKTtcbiAgICB9LFxuICB9XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShHb2Fsc0NvbnRhaW5lcik7XG4iXSwic291cmNlUm9vdCI6IiJ9