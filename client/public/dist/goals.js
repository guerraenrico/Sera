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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9TbmFja2JhckFuaW0uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2dvYWwvR29hbHMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2xheW91dC9TbmFja2Jhci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvR29hbHNDb250YWluZXIuanN4Il0sIm5hbWVzIjpbImR1cmF0aW9uIiwiZGVmYXVsdFN0eWxlIiwidHJhbnNpdGlvbiIsImJvdHRvbSIsInRyYW5zaXRpb25TdHlsZXMiLCJlbnRlcmluZyIsInZpc2liaWxpdHkiLCJlbnRlcmVkIiwiU25hY2tiYXJBbmltIiwiaW5Qcm9wIiwiaW4iLCJjaGlsZHJlbiIsImN1c3RvbUNsYXNzIiwic3RhdGUiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJib29sIiwiaXNSZXF1aXJlZCIsIm5vZGUiLCJzdHJpbmciLCJkZWZhdWx0UHJvcHMiLCJHb2FscyIsInByb3BzIiwibWVzc2FnZSIsImhpZGVNZXNzYWdlIiwic2hvdyIsImlzRXJyb3IiLCJ0ZXh0IiwiQ29tcG9uZW50Iiwic2hhcGUiLCJmdW5jIiwiQWN0aW9uIiwib25DbGljayIsIlNuYWNrYmFyIiwib25DbG9zZSIsInNldFRpbWVvdXQiLCJhY3Rpb25UZXh0IiwiYWN0aW9uQ2xpY2siLCJ2ZXJ0aWNhbFBvc3Rpb24iLCJob3Jpem9udGFsUG9zaXRpb24iLCJ1bmRlZmluZWQiLCJSZWFjdCIsIm51bWJlciIsIm9uZU9mIiwiR29hbHNDb250YWluZXIiLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCIsImNvbm5lY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLFFBQVEsR0FBRyxHQUFqQjtBQUVBLElBQU1DLFlBQVksR0FBRztBQUNuQkMsWUFB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QUFHLFNBQXJCQSxrQkFBcUIsQ0FBQUMsUUFBUTtBQUFBLFNBQ2pDO0FBQ0V2QixlQUFXLEVBQUUsdUJBQU07QUFDakJ1QixjQUFRLENBQUN2QiwyRUFBVyxFQUFaLENBQVI7QUFDRDtBQUhILEdBRGlDO0FBQUEsQ0FBbkM7O0FBUWV3QiwwSEFBTyxDQUFDSCxlQUFELEVBQWtCQyxrQkFBbEIsQ0FBUCxDQUE2Q0YsY0FBN0MsQ0FBZixFIiwiZmlsZSI6ImdvYWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5cbmNvbnN0IGR1cmF0aW9uID0gMjUwO1xuXG5jb25zdCBkZWZhdWx0U3R5bGUgPSB7XG4gIHRyYW5zaXRpb246IGBhbGwgJHtkdXJhdGlvbn1tcyBlYXNlLWluLW91dGAsXG4gIGJvdHRvbTogJy0xMDBweCcsXG59O1xuXG5jb25zdCB0cmFuc2l0aW9uU3R5bGVzID0ge1xuICBlbnRlcmluZzoge1xuICAgIGJvdHRvbTogJy0xMDBweCcsXG4gICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gIH0sXG4gIGVudGVyZWQ6IHtcbiAgICBib3R0b206ICcwcHgnLFxuICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJyxcbiAgfSxcbn07XG5cbmNvbnN0IFNuYWNrYmFyQW5pbSA9ICh7IGluOiBpblByb3AsIGNoaWxkcmVuLCBjdXN0b21DbGFzcyB9KSA9PiAoXG4gIDxUcmFuc2l0aW9uIGluPXtpblByb3B9IHRpbWVvdXQ9e2R1cmF0aW9ufT5cbiAgICB7c3RhdGUgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD1cImNvbnRlbnQtc25hY2tiYXJcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgICAuLi50cmFuc2l0aW9uU3R5bGVzW3N0YXRlXSxcbiAgICAgICAgfX1cbiAgICAgICAgY2xhc3NOYW1lPXtjdXN0b21DbGFzc31cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuU25hY2tiYXJBbmltLnByb3BUeXBlcyA9IHtcbiAgaW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICBjdXN0b21DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cblNuYWNrYmFyQW5pbS5kZWZhdWx0UHJvcHMgPSB7XG4gIGN1c3RvbUNsYXNzOiAnJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNuYWNrYmFyQW5pbTtcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgU25hY2tiYXIgZnJvbSAnLi4vbGF5b3V0L1NuYWNrYmFyJztcblxuY2xhc3MgR29hbHMgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IG1lc3NhZ2UsIGhpZGVNZXNzYWdlIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtYXBwXCI+XG4gICAgICAgIDxwPkluIGRldmVsb3BtZW50PC9wPlxuICAgICAgICA8U25hY2tiYXJcbiAgICAgICAgICBzaG93PXttZXNzYWdlLnNob3d9XG4gICAgICAgICAgaXNFcnJvcj17bWVzc2FnZS5pc0Vycm9yfVxuICAgICAgICAgIG1lc3NhZ2U9e21lc3NhZ2UudGV4dH1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBoaWRlTWVzc2FnZSgpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Hb2Fscy5wcm9wVHlwZXMgPSB7XG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2hvdzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0Vycm9yOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgaGlkZU1lc3NhZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBHb2FscztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFNuYWNrYmFyQW5pbSBmcm9tICcuLi9hbmltcy9TbmFja2JhckFuaW0nO1xuXG5jb25zdCBBY3Rpb24gPSAoeyBvbkNsaWNrLCB0ZXh0IH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24tYWN0aW9uLXNuYWNrYmFyXCIgb25DbGljaz17b25DbGlja30+XG4gICAge3RleHR9XG4gIDwvYnV0dG9uPlxuKTtcblxuQWN0aW9uLnByb3BUeXBlcyA9IHtcbiAgdGV4dDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuY2xhc3MgU25hY2tiYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgY29uc3Qge1xuICAgICAgb25DbG9zZSwgZHVyYXRpb24sIHNob3csXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoc2hvdykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgIH0sIGR1cmF0aW9uKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbWVzc2FnZSwgaXNFcnJvciwgYWN0aW9uVGV4dCwgYWN0aW9uQ2xpY2ssIHNob3csXG4gICAgICB2ZXJ0aWNhbFBvc3Rpb24sIGhvcml6b250YWxQb3NpdGlvbixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPFNuYWNrYmFyQW5pbSBpbj17c2hvd30gY3VzdG9tQ2xhc3M9e2Ake3ZlcnRpY2FsUG9zdGlvbn0gJHsoaG9yaXpvbnRhbFBvc2l0aW9uKX1gfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YHNuYWNrYmFyICR7KGlzRXJyb3IpID8gJ2Vycm9yJyA6ICcnfWB9XG4gICAgICAgID5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzbmFja2Jhci1tZXNzYWdlXCI+e21lc3NhZ2V9PC9zcGFuPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIChhY3Rpb25UZXh0ICE9PSAnJyAmJiBhY3Rpb25DbGljayAhPT0gdW5kZWZpbmVkKSAmJlxuICAgICAgICAgICAgICA8QWN0aW9uIG9uQ2xpY2s9e2FjdGlvbkNsaWNrfSB0ZXh0PXthY3Rpb25UZXh0fSAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L1NuYWNrYmFyQW5pbT5cbiAgICApO1xuICB9XG59XG5cblNuYWNrYmFyLnByb3BUeXBlcyA9IHtcbiAgc2hvdzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBkdXJhdGlvbjogUHJvcFR5cGVzLm51bWJlcixcbiAgaXNFcnJvcjogUHJvcFR5cGVzLmJvb2wsXG4gIGFjdGlvblRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGFjdGlvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgdmVydGljYWxQb3N0aW9uOiBQcm9wVHlwZXMub25lT2YoWyd0b3AnLCAnYm90dG9tJ10pLFxuICBob3Jpem9udGFsUG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbJ2xlZnQnLCAncmlnaHQnXSksXG59O1xuXG5TbmFja2Jhci5kZWZhdWx0UHJvcHMgPSB7XG4gIGR1cmF0aW9uOiA1MDAwLFxuICBpc0Vycm9yOiBmYWxzZSxcbiAgYWN0aW9uVGV4dDogJycsXG4gIGFjdGlvbkNsaWNrOiB1bmRlZmluZWQsXG4gIHZlcnRpY2FsUG9zdGlvbjogJ2JvdHRvbScsXG4gIGhvcml6b250YWxQb3NpdGlvbjogJ3JpZ2h0Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNuYWNrYmFyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBHb2FscyBmcm9tICcuLi9jb21wb25lbnRzL2dvYWwvR29hbHMnO1xuaW1wb3J0IHsgaGlkZU1lc3NhZ2UgfSBmcm9tICcuLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcblxuY29uc3QgR29hbHNDb250YWluZXIgPSBwcm9wcyA9PiA8R29hbHMgey4uLnByb3BzfSAvPjtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgbWVzc2FnZTogc3RhdGUubWVzc2FnZSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgaGlkZU1lc3NhZ2U6ICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKGhpZGVNZXNzYWdlKCkpO1xuICAgIH0sXG4gIH1cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEdvYWxzQ29udGFpbmVyKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=