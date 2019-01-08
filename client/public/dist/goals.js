(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["goals"],{

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

/***/ "./src/components/goal/Goals.jsx":
/*!***************************************!*\
  !*** ./src/components/goal/Goals.jsx ***!
  \***************************************/
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

var _Snackbar = __webpack_require__(/*! ../layout/Snackbar */ "./src/components/layout/Snackbar.jsx");

var _Snackbar2 = _interopRequireDefault(_Snackbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Goals = function (_Component) {
  _inherits(Goals, _Component);

  function Goals() {
    _classCallCheck(this, Goals);

    return _possibleConstructorReturn(this, (Goals.__proto__ || Object.getPrototypeOf(Goals)).apply(this, arguments));
  }

  _createClass(Goals, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          message = _props.message,
          hideMessage = _props.hideMessage;

      return _react2.default.createElement(
        'div',
        { className: 'content-app' },
        _react2.default.createElement(
          'p',
          null,
          'In development'
        ),
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

  return Goals;
}(_react.Component);

Goals.propTypes = {
  message: _propTypes2.default.shape({
    show: _propTypes2.default.bool.isRequired,
    isError: _propTypes2.default.bool.isRequired,
    text: _propTypes2.default.string.isRequired
  }).isRequired,
  hideMessage: _propTypes2.default.func.isRequired
};

exports.default = Goals;

/***/ }),

/***/ "./src/components/layout/Snackbar.jsx":
/*!********************************************!*\
  !*** ./src/components/layout/Snackbar.jsx ***!
  \********************************************/
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

var _SnackbarAnim = __webpack_require__(/*! ../anims/SnackbarAnim */ "./src/components/anims/SnackbarAnim.jsx");

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

/***/ "./src/containers/GoalsContainer.jsx":
/*!*******************************************!*\
  !*** ./src/containers/GoalsContainer.jsx ***!
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

var _Goals = __webpack_require__(/*! ../components/goal/Goals */ "./src/components/goal/Goals.jsx");

var _Goals2 = _interopRequireDefault(_Goals);

var _messageActions = __webpack_require__(/*! ../actions/messageActions */ "./src/actions/messageActions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GoalsContainer = function GoalsContainer(props) {
  return _react2.default.createElement(_Goals2.default, props);
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    message: state.message
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    hideMessage: function hideMessage() {
      dispatch((0, _messageActions.hideMessage)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(GoalsContainer);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9TbmFja2JhckFuaW0uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2dvYWwvR29hbHMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2xheW91dC9TbmFja2Jhci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvR29hbHNDb250YWluZXIuanN4Il0sIm5hbWVzIjpbImR1cmF0aW9uIiwiZGVmYXVsdFN0eWxlIiwidHJhbnNpdGlvbiIsImJvdHRvbSIsInRyYW5zaXRpb25TdHlsZXMiLCJlbnRlcmluZyIsInZpc2liaWxpdHkiLCJlbnRlcmVkIiwiU25hY2tiYXJBbmltIiwiaW5Qcm9wIiwiaW4iLCJjaGlsZHJlbiIsImN1c3RvbUNsYXNzIiwic3RhdGUiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJib29sIiwiaXNSZXF1aXJlZCIsIm5vZGUiLCJzdHJpbmciLCJkZWZhdWx0UHJvcHMiLCJHb2FscyIsInByb3BzIiwibWVzc2FnZSIsImhpZGVNZXNzYWdlIiwic2hvdyIsImlzRXJyb3IiLCJ0ZXh0IiwiQ29tcG9uZW50Iiwic2hhcGUiLCJmdW5jIiwiQWN0aW9uIiwib25DbGljayIsIlNuYWNrYmFyIiwib25DbG9zZSIsInNldFRpbWVvdXQiLCJhY3Rpb25UZXh0IiwiYWN0aW9uQ2xpY2siLCJ2ZXJ0aWNhbFBvc3Rpb24iLCJob3Jpem9udGFsUG9zaXRpb24iLCJ1bmRlZmluZWQiLCJSZWFjdCIsIm51bWJlciIsIm9uZU9mIiwiR29hbHNDb250YWluZXIiLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUEsSUFBTUEsV0FBVyxHQUFqQjs7QUFFQSxJQUFNQyxlQUFlO0FBQ25CQyx1QkFBbUJGLFFBQW5CLG1C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QixLQUFWLENBQWdCLENBQUMsTUFBRCxFQUFTLE9BQVQsQ0FBaEI7QUFURCxDQUFyQjs7QUFZQVYsU0FBU2IsWUFBVCxHQUF3QjtBQUN0QnBCLFlBQVUsSUFEWTtBQUV0QjBCLFdBQVMsS0FGYTtBQUd0QlUsY0FBWSxFQUhVO0FBSXRCQyxlQUFhRyxTQUpTO0FBS3RCRixtQkFBaUIsUUFMSztBQU10QkMsc0JBQW9CO0FBTkUsQ0FBeEI7O2tCQVNlTixROzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RWY7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBRUEsSUFBTVcsaUJBQWlCLFNBQWpCQSxjQUFpQjtBQUFBLFNBQVMsOEJBQUMsZUFBRCxFQUFXdEIsS0FBWCxDQUFUO0FBQUEsQ0FBdkI7O0FBRUEsSUFBTXVCLGtCQUFrQixTQUFsQkEsZUFBa0I7QUFBQSxTQUN0QjtBQUNFdEIsYUFBU1YsTUFBTVU7QUFEakIsR0FEc0I7QUFBQSxDQUF4Qjs7QUFNQSxJQUFNdUIscUJBQXFCLFNBQXJCQSxrQkFBcUI7QUFBQSxTQUN6QjtBQUNFdEIsaUJBQWEsdUJBQU07QUFDakJ1QixlQUFTLGtDQUFUO0FBQ0Q7QUFISCxHQUR5QjtBQUFBLENBQTNCOztrQkFRZSx5QkFBUUYsZUFBUixFQUF5QkMsa0JBQXpCLEVBQTZDRixjQUE3QyxDIiwiZmlsZSI6ImdvYWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5cbmNvbnN0IGR1cmF0aW9uID0gMjUwO1xuXG5jb25zdCBkZWZhdWx0U3R5bGUgPSB7XG4gIHRyYW5zaXRpb246IGBhbGwgJHtkdXJhdGlvbn1tcyBlYXNlLWluLW91dGAsXG4gIGJvdHRvbTogJy0xMDBweCcsXG59O1xuXG5jb25zdCB0cmFuc2l0aW9uU3R5bGVzID0ge1xuICBlbnRlcmluZzoge1xuICAgIGJvdHRvbTogJy0xMDBweCcsXG4gICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gIH0sXG4gIGVudGVyZWQ6IHtcbiAgICBib3R0b206ICcwcHgnLFxuICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJyxcbiAgfSxcbn07XG5cbmNvbnN0IFNuYWNrYmFyQW5pbSA9ICh7IGluOiBpblByb3AsIGNoaWxkcmVuLCBjdXN0b21DbGFzcyB9KSA9PiAoXG4gIDxUcmFuc2l0aW9uIGluPXtpblByb3B9IHRpbWVvdXQ9e2R1cmF0aW9ufT5cbiAgICB7c3RhdGUgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD1cImNvbnRlbnQtc25hY2tiYXJcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgICAuLi50cmFuc2l0aW9uU3R5bGVzW3N0YXRlXSxcbiAgICAgICAgfX1cbiAgICAgICAgY2xhc3NOYW1lPXtjdXN0b21DbGFzc31cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuU25hY2tiYXJBbmltLnByb3BUeXBlcyA9IHtcbiAgaW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICBjdXN0b21DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cblNuYWNrYmFyQW5pbS5kZWZhdWx0UHJvcHMgPSB7XG4gIGN1c3RvbUNsYXNzOiAnJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNuYWNrYmFyQW5pbTtcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgU25hY2tiYXIgZnJvbSAnLi4vbGF5b3V0L1NuYWNrYmFyJztcblxuY2xhc3MgR29hbHMgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IG1lc3NhZ2UsIGhpZGVNZXNzYWdlIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtYXBwXCI+XG4gICAgICAgIDxwPkluIGRldmVsb3BtZW50PC9wPlxuICAgICAgICA8U25hY2tiYXJcbiAgICAgICAgICBzaG93PXttZXNzYWdlLnNob3d9XG4gICAgICAgICAgaXNFcnJvcj17bWVzc2FnZS5pc0Vycm9yfVxuICAgICAgICAgIG1lc3NhZ2U9e21lc3NhZ2UudGV4dH1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBoaWRlTWVzc2FnZSgpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Hb2Fscy5wcm9wVHlwZXMgPSB7XG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2hvdzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0Vycm9yOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgaGlkZU1lc3NhZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBHb2FscztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFNuYWNrYmFyQW5pbSBmcm9tICcuLi9hbmltcy9TbmFja2JhckFuaW0nO1xuXG5jb25zdCBBY3Rpb24gPSAoeyBvbkNsaWNrLCB0ZXh0IH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24tYWN0aW9uLXNuYWNrYmFyXCIgb25DbGljaz17b25DbGlja30+XG4gICAge3RleHR9XG4gIDwvYnV0dG9uPlxuKTtcblxuQWN0aW9uLnByb3BUeXBlcyA9IHtcbiAgdGV4dDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuY2xhc3MgU25hY2tiYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgY29uc3Qge1xuICAgICAgb25DbG9zZSwgZHVyYXRpb24sIHNob3csXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoc2hvdykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgIH0sIGR1cmF0aW9uKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbWVzc2FnZSwgaXNFcnJvciwgYWN0aW9uVGV4dCwgYWN0aW9uQ2xpY2ssIHNob3csXG4gICAgICB2ZXJ0aWNhbFBvc3Rpb24sIGhvcml6b250YWxQb3NpdGlvbixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPFNuYWNrYmFyQW5pbSBpbj17c2hvd30gY3VzdG9tQ2xhc3M9e2Ake3ZlcnRpY2FsUG9zdGlvbn0gJHsoaG9yaXpvbnRhbFBvc2l0aW9uKX1gfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YHNuYWNrYmFyICR7KGlzRXJyb3IpID8gJ2Vycm9yJyA6ICcnfWB9XG4gICAgICAgID5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzbmFja2Jhci1tZXNzYWdlXCI+e21lc3NhZ2V9PC9zcGFuPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIChhY3Rpb25UZXh0ICE9PSAnJyAmJiBhY3Rpb25DbGljayAhPT0gdW5kZWZpbmVkKSAmJlxuICAgICAgICAgICAgICA8QWN0aW9uIG9uQ2xpY2s9e2FjdGlvbkNsaWNrfSB0ZXh0PXthY3Rpb25UZXh0fSAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L1NuYWNrYmFyQW5pbT5cbiAgICApO1xuICB9XG59XG5cblNuYWNrYmFyLnByb3BUeXBlcyA9IHtcbiAgc2hvdzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBkdXJhdGlvbjogUHJvcFR5cGVzLm51bWJlcixcbiAgaXNFcnJvcjogUHJvcFR5cGVzLmJvb2wsXG4gIGFjdGlvblRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGFjdGlvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgdmVydGljYWxQb3N0aW9uOiBQcm9wVHlwZXMub25lT2YoWyd0b3AnLCAnYm90dG9tJ10pLFxuICBob3Jpem9udGFsUG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbJ2xlZnQnLCAncmlnaHQnXSksXG59O1xuXG5TbmFja2Jhci5kZWZhdWx0UHJvcHMgPSB7XG4gIGR1cmF0aW9uOiA1MDAwLFxuICBpc0Vycm9yOiBmYWxzZSxcbiAgYWN0aW9uVGV4dDogJycsXG4gIGFjdGlvbkNsaWNrOiB1bmRlZmluZWQsXG4gIHZlcnRpY2FsUG9zdGlvbjogJ2JvdHRvbScsXG4gIGhvcml6b250YWxQb3NpdGlvbjogJ3JpZ2h0Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNuYWNrYmFyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBHb2FscyBmcm9tICcuLi9jb21wb25lbnRzL2dvYWwvR29hbHMnO1xuaW1wb3J0IHsgaGlkZU1lc3NhZ2UgfSBmcm9tICcuLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcblxuY29uc3QgR29hbHNDb250YWluZXIgPSBwcm9wcyA9PiA8R29hbHMgey4uLnByb3BzfSAvPjtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgbWVzc2FnZTogc3RhdGUubWVzc2FnZSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgaGlkZU1lc3NhZ2U6ICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKGhpZGVNZXNzYWdlKCkpO1xuICAgIH0sXG4gIH1cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEdvYWxzQ29udGFpbmVyKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=