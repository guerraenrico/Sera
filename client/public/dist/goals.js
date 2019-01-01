(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["goals"],{

/***/ "./src/components/Goals.jsx":
/*!**********************************!*\
  !*** ./src/components/Goals.jsx ***!
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

var _Snackbar = __webpack_require__(/*! ./Snackbar */ "./src/components/Snackbar.jsx");

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

var _Goals = __webpack_require__(/*! ../components/Goals */ "./src/components/Goals.jsx");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Hb2Fscy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvU25hY2tiYXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FuaW1zL1NuYWNrYmFyQW5pbS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvR29hbHNDb250YWluZXIuanN4Il0sIm5hbWVzIjpbIkdvYWxzIiwicHJvcHMiLCJtZXNzYWdlIiwiaGlkZU1lc3NhZ2UiLCJzaG93IiwiaXNFcnJvciIsInRleHQiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzaGFwZSIsImJvb2wiLCJpc1JlcXVpcmVkIiwic3RyaW5nIiwiZnVuYyIsIkFjdGlvbiIsIm9uQ2xpY2siLCJTbmFja2JhciIsIm9uQ2xvc2UiLCJkdXJhdGlvbiIsInNldFRpbWVvdXQiLCJhY3Rpb25UZXh0IiwiYWN0aW9uQ2xpY2siLCJ2ZXJ0aWNhbFBvc3Rpb24iLCJob3Jpem9udGFsUG9zaXRpb24iLCJ1bmRlZmluZWQiLCJSZWFjdCIsIm51bWJlciIsIm9uZU9mIiwiZGVmYXVsdFByb3BzIiwiZGVmYXVsdFN0eWxlIiwidHJhbnNpdGlvbiIsImJvdHRvbSIsInRyYW5zaXRpb25TdHlsZXMiLCJlbnRlcmluZyIsInZpc2liaWxpdHkiLCJlbnRlcmVkIiwiU25hY2tiYXJBbmltIiwiaW5Qcm9wIiwiaW4iLCJjaGlsZHJlbiIsImN1c3RvbUNsYXNzIiwic3RhdGUiLCJub2RlIiwiR29hbHNDb250YWluZXIiLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFTUEsSzs7Ozs7Ozs7Ozs7d0NBQ2dCLENBQ25COzs7NkJBRVE7QUFBQSxtQkFDMEIsS0FBS0MsS0FEL0I7QUFB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aUJBSCxhQUFhN0IsU0FBYixHQUF5QjtBQUN2QitCLE1BQUk5QixvQkFBVUUsSUFBVixDQUFlQyxVQURJO0FBRXZCNEIsWUFBVS9CLG9CQUFVa0MsSUFBVixDQUFlL0IsVUFGRjtBQUd2QjZCLGVBQWFoQyxvQkFBVUk7QUFIQSxDQUF6Qjs7QUFNQXdCLGFBQWFSLFlBQWIsR0FBNEI7QUFDMUJZLGVBQWE7QUFEYSxDQUE1Qjs7a0JBSWVKLFk7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pEZjs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNTyxpQkFBaUIsU0FBakJBLGNBQWlCO0FBQUEsU0FBUyw4QkFBQyxlQUFELEVBQVczQyxLQUFYLENBQVQ7QUFBQSxDQUF2Qjs7QUFFQSxJQUFNNEMsa0JBQWtCLFNBQWxCQSxlQUFrQjtBQUFBLFNBQ3RCO0FBQ0UzQyxhQUFTd0MsTUFBTXhDO0FBRGpCLEdBRHNCO0FBQUEsQ0FBeEI7O0FBTUEsSUFBTTRDLHFCQUFxQixTQUFyQkEsa0JBQXFCO0FBQUEsU0FDekI7QUFDRTNDLGlCQUFhLHVCQUFNO0FBQ2pCNEMsZUFBUyxrQ0FBVDtBQUNEO0FBSEgsR0FEeUI7QUFBQSxDQUEzQjs7a0JBUWUseUJBQVFGLGVBQVIsRUFBeUJDLGtCQUF6QixFQUE2Q0YsY0FBN0MsQyIsImZpbGUiOiJnb2Fscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcblxyXG5pbXBvcnQgU25hY2tiYXIgZnJvbSAnLi9TbmFja2Jhcic7XHJcblxyXG5jbGFzcyBHb2FscyBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IG1lc3NhZ2UsIGhpZGVNZXNzYWdlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWFwcFwiPlxyXG4gICAgICAgIDxwPkluIGRldmVsb3BtZW50PC9wPlxyXG4gICAgICAgIDxTbmFja2JhclxyXG4gICAgICAgICAgc2hvdz17bWVzc2FnZS5zaG93fVxyXG4gICAgICAgICAgaXNFcnJvcj17bWVzc2FnZS5pc0Vycm9yfVxyXG4gICAgICAgICAgbWVzc2FnZT17bWVzc2FnZS50ZXh0fVxyXG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gaGlkZU1lc3NhZ2UoKX1cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5Hb2Fscy5wcm9wVHlwZXMgPSB7XHJcbiAgbWVzc2FnZTogUHJvcFR5cGVzLnNoYXBlKHtcclxuICAgIHNob3c6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBpc0Vycm9yOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gIH0pLmlzUmVxdWlyZWQsXHJcbiAgaGlkZU1lc3NhZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHb2FscztcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgU25hY2tiYXJBbmltIGZyb20gJy4vYW5pbXMvU25hY2tiYXJBbmltJztcblxuY29uc3QgQWN0aW9uID0gKHsgb25DbGljaywgdGV4dCB9KSA9PiAoXG4gIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLWFjdGlvbi1zbmFja2JhclwiIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIHt0ZXh0fVxuICA8L2J1dHRvbj5cbik7XG5cbkFjdGlvbi5wcm9wVHlwZXMgPSB7XG4gIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmNsYXNzIFNuYWNrYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2xvc2UsIGR1cmF0aW9uLCBzaG93LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKHNob3cpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBvbkNsb3NlKCk7XG4gICAgICB9LCBkdXJhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG1lc3NhZ2UsIGlzRXJyb3IsIGFjdGlvblRleHQsIGFjdGlvbkNsaWNrLCBzaG93LFxuICAgICAgdmVydGljYWxQb3N0aW9uLCBob3Jpem9udGFsUG9zaXRpb24sXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTbmFja2JhckFuaW0gaW49e3Nob3d9IGN1c3RvbUNsYXNzPXtgJHt2ZXJ0aWNhbFBvc3Rpb259ICR7KGhvcml6b250YWxQb3NpdGlvbil9YH0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2BzbmFja2JhciAkeyhpc0Vycm9yKSA/ICdlcnJvcicgOiAnJ31gfVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic25hY2tiYXItbWVzc2FnZVwiPnttZXNzYWdlfTwvc3Bhbj5cbiAgICAgICAgICB7XG4gICAgICAgICAgICAoYWN0aW9uVGV4dCAhPT0gJycgJiYgYWN0aW9uQ2xpY2sgIT09IHVuZGVmaW5lZCkgJiZcbiAgICAgICAgICAgICAgPEFjdGlvbiBvbkNsaWNrPXthY3Rpb25DbGlja30gdGV4dD17YWN0aW9uVGV4dH0gLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9TbmFja2JhckFuaW0+XG4gICAgKTtcbiAgfVxufVxuXG5TbmFja2Jhci5wcm9wVHlwZXMgPSB7XG4gIHNob3c6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZHVyYXRpb246IFByb3BUeXBlcy5udW1iZXIsXG4gIGlzRXJyb3I6IFByb3BUeXBlcy5ib29sLFxuICBhY3Rpb25UZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBhY3Rpb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gIHZlcnRpY2FsUG9zdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsndG9wJywgJ2JvdHRvbSddKSxcbiAgaG9yaXpvbnRhbFBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxufTtcblxuU25hY2tiYXIuZGVmYXVsdFByb3BzID0ge1xuICBkdXJhdGlvbjogNTAwMCxcbiAgaXNFcnJvcjogZmFsc2UsXG4gIGFjdGlvblRleHQ6ICcnLFxuICBhY3Rpb25DbGljazogdW5kZWZpbmVkLFxuICB2ZXJ0aWNhbFBvc3Rpb246ICdib3R0b20nLFxuICBob3Jpem9udGFsUG9zaXRpb246ICdyaWdodCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTbmFja2JhcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAnO1xuXG5jb25zdCBkdXJhdGlvbiA9IDI1MDtcblxuY29uc3QgZGVmYXVsdFN0eWxlID0ge1xuICB0cmFuc2l0aW9uOiBgYWxsICR7ZHVyYXRpb259bXMgZWFzZS1pbi1vdXRgLFxuICBib3R0b206ICctMTAwcHgnLFxufTtcblxuY29uc3QgdHJhbnNpdGlvblN0eWxlcyA9IHtcbiAgZW50ZXJpbmc6IHtcbiAgICBib3R0b206ICctMTAwcHgnLFxuICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICB9LFxuICBlbnRlcmVkOiB7XG4gICAgYm90dG9tOiAnMHB4JyxcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gIH0sXG59O1xuXG5jb25zdCBTbmFja2JhckFuaW0gPSAoeyBpbjogaW5Qcm9wLCBjaGlsZHJlbiwgY3VzdG9tQ2xhc3MgfSkgPT4gKFxuICA8VHJhbnNpdGlvbiBpbj17aW5Qcm9wfSB0aW1lb3V0PXtkdXJhdGlvbn0+XG4gICAge3N0YXRlID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJjb250ZW50LXNuYWNrYmFyXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAuLi5kZWZhdWx0U3R5bGUsXG4gICAgICAgICAgLi4udHJhbnNpdGlvblN0eWxlc1tzdGF0ZV0sXG4gICAgICAgIH19XG4gICAgICAgIGNsYXNzTmFtZT17Y3VzdG9tQ2xhc3N9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICl9XG4gIDwvVHJhbnNpdGlvbj5cbik7XG5cblNuYWNrYmFyQW5pbS5wcm9wVHlwZXMgPSB7XG4gIGluOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgY3VzdG9tQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5TbmFja2JhckFuaW0uZGVmYXVsdFByb3BzID0ge1xuICBjdXN0b21DbGFzczogJycsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTbmFja2JhckFuaW07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5cclxuaW1wb3J0IEdvYWxzIGZyb20gJy4uL2NvbXBvbmVudHMvR29hbHMnO1xyXG5pbXBvcnQgeyBoaWRlTWVzc2FnZSB9IGZyb20gJy4uL2FjdGlvbnMvbWVzc2FnZUFjdGlvbnMnO1xyXG5cclxuY29uc3QgR29hbHNDb250YWluZXIgPSBwcm9wcyA9PiA8R29hbHMgey4uLnByb3BzfSAvPjtcclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IChcclxuICB7XHJcbiAgICBtZXNzYWdlOiBzdGF0ZS5tZXNzYWdlLFxyXG4gIH1cclxuKTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcclxuICB7XHJcbiAgICBoaWRlTWVzc2FnZTogKCkgPT4ge1xyXG4gICAgICBkaXNwYXRjaChoaWRlTWVzc2FnZSgpKTtcclxuICAgIH0sXHJcbiAgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoR29hbHNDb250YWluZXIpO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9