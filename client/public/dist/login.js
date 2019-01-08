(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login"],{

/***/ "./src/assets/Svgs.jsx":
/*!*****************************!*\
  !*** ./src/assets/Svgs.jsx ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeraLogo = undefined;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SeraLogo = exports.SeraLogo = _react2.default.createElement(
  "svg",
  { xmlns: "http://www.w3.org/2000/svg", width: "193", height: "52", viewBox: "0 0 193 52" },
  _react2.default.createElement("path", { style: { fill: '#009688', fillRule: 'evenodd' }, d: "M20.538,51.75q10,0,15.1-3.7a11.627,11.627,0,0,0,5.1-9.9q0-6-3.55-9.4t-12.65-5.9q-5.8-1.5-8.45-2.45a9.594,9.594,0,0,1-3.85-2.25,4.813,4.813,0,0,1-1.2-3.4,4.652,4.652,0,0,1,2.8-4.6,19.88,19.88,0,0,1,8.1-1.3,37.707,37.707,0,0,1,8.65,1,25.889,25.889,0,0,1,7.15,2.7V4.15a24.6,24.6,0,0,0-7.4-2.5,48.846,48.846,0,0,0-9.4-.9q-9.2,0-14.65,3.55A11.676,11.676,0,0,0,.838,14.75a12.662,12.662,0,0,0,1.75,7,13,13,0,0,0,5.2,4.45,54.749,54.749,0,0,0,9.35,3.45,82.322,82.322,0,0,1,8.25,2.6,9.96,9.96,0,0,1,3.9,2.45,5.294,5.294,0,0,1,1.15,3.55,4.4,4.4,0,0,1-2.5,4.2q-2.5,1.3-7.9,1.3a36.111,36.111,0,0,1-9.9-1.45,38.156,38.156,0,0,1-9-3.75v8.6a26.8,26.8,0,0,0,8.8,3.35,48.747,48.747,0,0,0,10.6,1.25h0Zm57.6,0a64.808,64.808,0,0,0,10.35-.85,40.041,40.041,0,0,0,8.45-2.15v-8.1a45,45,0,0,1-8.3,2.25,52.144,52.144,0,0,1-9.3.85q-9,0-14.25-3.35t-5.75-10.15h42.2v-5a26.546,26.546,0,0,0-2.95-12.65,20.981,20.981,0,0,0-8.75-8.7A29.189,29.189,0,0,0,75.738.75q-12.5,0-19.25,6.9t-6.75,18.7q0,12.1,7.55,18.75t20.85,6.65h0Zm-18.8-28.6a14.144,14.144,0,0,1,4.4-10.4q4.2-3.9,11.8-3.9,7.8,0,12.05,3.75t4.45,10.55h-32.7Zm53.2,27.1h10.1V20.55a14.026,14.026,0,0,1,7.6-7.9,31.731,31.731,0,0,1,13.2-2.5V2.25a35.058,35.058,0,0,0-12.65,2.1,17.532,17.532,0,0,0-8.45,6.5V2.25h-9.8v48Zm52.6,1.5A27.232,27.232,0,0,0,175.486,50a20.28,20.28,0,0,0,7.35-5.15v5.4h9.5V20.55q0-9.3-5.75-14.55t-17.65-5.25a53.415,53.415,0,0,0-9.3.85,31.949,31.949,0,0,0-7.8,2.25v8.2a34.911,34.911,0,0,1,7.45-2.35,42.557,42.557,0,0,1,8.55-.85q7.4,0,10.85,2.75t3.45,8.45v2.5q-6.9-4-16.8-4-9.3,0-14.35,4.35t-5.05,12.35q0,7.6,5.25,12.05t13.95,4.45h0Zm2.5-7.7q-11.5,0-11.5-8.8,0-4.6,2.85-6.85t8.65-2.25a26.159,26.159,0,0,1,14.5,4.2v6.5a12.86,12.86,0,0,1-5.8,5.3,19.593,19.593,0,0,1-8.7,1.9h0Z" })
);

exports.default = SeraLogo;

/***/ }),

/***/ "./src/components/Login.jsx":
/*!**********************************!*\
  !*** ./src/components/Login.jsx ***!
  \**********************************/
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

var _reactGoogleLogin = __webpack_require__(/*! react-google-login */ "./node_modules/react-google-login/dist/google-login.js");

var _reactGoogleLogin2 = _interopRequireDefault(_reactGoogleLogin);

var _Snackbar = __webpack_require__(/*! ./layout/Snackbar */ "./src/components/layout/Snackbar.jsx");

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _Common = __webpack_require__(/*! ../utils/Common */ "./src/utils/Common.js");

var _Svgs = __webpack_require__(/*! ../assets/Svgs */ "./src/assets/Svgs.jsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Login = function Login(_ref) {
  var message = _ref.message,
      authenticateGoogleToken = _ref.authenticateGoogleToken,
      hideMessage = _ref.hideMessage;

  var responseGoogle = function responseGoogle(response) {
    if (response.code !== undefined) {
      authenticateGoogleToken(response.code);
    }
  };
  return _react2.default.createElement(
    'div',
    { className: 'content-app' },
    _react2.default.createElement(
      'div',
      { id: 'content-login' },
      _react2.default.createElement(
        'div',
        { id: 'content-declaration' },
        _react2.default.createElement(
          'h2',
          { className: 'title' },
          'This is an Experimental App'
        ),
        _react2.default.createElement(
          'p',
          { className: 'description' },
          'Dont use to store your confidential data. This app is Highly experimental and has been created only for my personal test'
        )
      ),
      _react2.default.createElement(
        'div',
        { id: 'content-logo' },
        _Svgs.SeraLogo
      ),
      _react2.default.createElement(
        _reactGoogleLogin2.default,
        {
          clientId: '489823671693-0vvlltnvkavfa37o2jl123jb57ulcphu.apps.googleusercontent.com',
          buttonText: 'Login',
          onSuccess: responseGoogle,
          onFailure: responseGoogle,
          className: 'main-button button-google-login',
          accessType: 'offline',
          responseType: 'code',
          redirectUri: _Common.getCurrentBaseUrl
        },
        _react2.default.createElement(
          'span',
          { className: 'icon-google-g' },
          _react2.default.createElement('span', { className: 'path1' }),
          _react2.default.createElement('span', { className: 'path2' }),
          _react2.default.createElement('span', { className: 'path3' }),
          _react2.default.createElement('span', { className: 'path4' })
        ),
        _react2.default.createElement(
          'span',
          null,
          'Log in with Google'
        )
      ),
      _react2.default.createElement(
        'div',
        { id: 'content-tip' },
        _react2.default.createElement(
          'h2',
          null,
          '\u201CDon\u2019t wish it was easier wish you were better\u201D'
        )
      )
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
};

Login.propTypes = {
  message: _propTypes2.default.shape({
    show: _propTypes2.default.bool.isRequired,
    isError: _propTypes2.default.bool.isRequired,
    text: _propTypes2.default.string.isRequired
  }).isRequired,
  authenticateGoogleToken: _propTypes2.default.func.isRequired,
  hideMessage: _propTypes2.default.func.isRequired
};

exports.default = Login;

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

/***/ "./src/containers/LoginContainer.jsx":
/*!*******************************************!*\
  !*** ./src/containers/LoginContainer.jsx ***!
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

var _Login = __webpack_require__(/*! ../components/Login */ "./src/components/Login.jsx");

var _Login2 = _interopRequireDefault(_Login);

var _authActions = __webpack_require__(/*! ../actions/authActions */ "./src/actions/authActions.js");

var _messageActions = __webpack_require__(/*! ../actions/messageActions */ "./src/actions/messageActions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginContainer = function LoginContainer(props) {
  return _react2.default.createElement(_Login2.default, props);
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    message: state.message
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    authenticateGoogleToken: function authenticateGoogleToken(idToken, accessToken) {
      dispatch((0, _authActions.authenticateGoogleToken)(idToken, accessToken));
    },
    hideMessage: function hideMessage() {
      dispatch((0, _messageActions.hideMessage)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LoginContainer);

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
exports.getCurrentBaseUrl = exports.toSimpleDateFormat = exports.toJsDate = undefined;

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

var getCurrentBaseUrl = exports.getCurrentBaseUrl = function getCurrentBaseUrl() {
  var getUrl = window.location;
  return getUrl.protocol + '//' + getUrl.host;
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL1N2Z3MuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0xvZ2luLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbmltcy9TbmFja2JhckFuaW0uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2xheW91dC9TbmFja2Jhci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvTG9naW5Db250YWluZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9Db21tb24uanMiXSwibmFtZXMiOlsiU2VyYUxvZ28iLCJmaWxsIiwiZmlsbFJ1bGUiLCJMb2dpbiIsIm1lc3NhZ2UiLCJhdXRoZW50aWNhdGVHb29nbGVUb2tlbiIsImhpZGVNZXNzYWdlIiwicmVzcG9uc2VHb29nbGUiLCJyZXNwb25zZSIsImNvZGUiLCJ1bmRlZmluZWQiLCJnZXRDdXJyZW50QmFzZVVybCIsInNob3ciLCJpc0Vycm9yIiwidGV4dCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsInNoYXBlIiwiYm9vbCIsImlzUmVxdWlyZWQiLCJzdHJpbmciLCJmdW5jIiwiZHVyYXRpb24iLCJkZWZhdWx0U3R5bGUiLCJ0cmFuc2l0aW9uIiwiYm90dG9tIiwidHJhbnNpdGlvblN0eWxlcyIsImVudGVyaW5nIiwidmlzaWJpbGl0eSIsImVudGVyZWQiLCJTbmFja2JhckFuaW0iLCJpblByb3AiLCJpbiIsImNoaWxkcmVuIiwiY3VzdG9tQ2xhc3MiLCJzdGF0ZSIsIm5vZGUiLCJkZWZhdWx0UHJvcHMiLCJBY3Rpb24iLCJvbkNsaWNrIiwiU25hY2tiYXIiLCJwcm9wcyIsIm9uQ2xvc2UiLCJzZXRUaW1lb3V0IiwiYWN0aW9uVGV4dCIsImFjdGlvbkNsaWNrIiwidmVydGljYWxQb3N0aW9uIiwiaG9yaXpvbnRhbFBvc2l0aW9uIiwiUmVhY3QiLCJDb21wb25lbnQiLCJudW1iZXIiLCJvbmVPZiIsIkxvZ2luQ29udGFpbmVyIiwibWFwU3RhdGVUb1Byb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiaWRUb2tlbiIsImFjY2Vzc1Rva2VuIiwiZGlzcGF0Y2giLCJ0b0pzRGF0ZSIsInBhcnNlRGF0ZSIsIkRhdGUiLCJwYXJzZUludCIsInN1YnN0ciIsInRvU2ltcGxlRGF0ZUZvcm1hdCIsImRhdGUiLCJnZXRVcmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInByb3RvY29sIiwiaG9zdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRU8sSUFBTUEsOEJBQ1g7QUFBQTtBQUFBLElBQUssT0FBTSw0QkFBWCxFQUF3QyxPQUFNLEtBQTlDLEVBQW9ELFFBQU8sSUFBM0QsRUFBZ0UsU0FBUSxZQUF4RTtBQUNFLDBDQUFNLE9BQU8sRUFBRUMsTUFBTSxTQUFSLEVBQW1CQyxVQUFVLFNBQTdCLEVBQWIsRUFBdUQsR0FBRSxtckRBQXpEO0FBREYsQ0FESzs7a0JBTVFGLFE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1JmOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNRyxRQUFRLFNBQVJBLEtBQVEsT0FBdUQ7QUFBQSxNQUFwREMsT0FBb0QsUUFBcERBLE9BQW9EO0FBQUEsTUFBM0NDLHVCQUEyQyxRQUEzQ0EsdUJBQTJDO0FBQUEsTUFBbEJDLFdBQWtCLFFBQWxCQSxXQUFrQjs7QUFDbkUsTUFBTUMsaUJBQWlCLFNBQWpCQSxjQUFpQixDQUFDQyxRQUFELEVBQWM7QUFDbkMsUUFBSUEsU0FBU0MsSUFBVCxLQUFrQkMsU0FBdEIsRUFBaUM7QUFDL0JMLDhCQUF3QkcsU0FBU0MsSUFBakM7QUFDRDtBQUNGLEdBSkQ7QUFLQSxTQUNFO0FBQUE7QUFBQSxNQUFLLFdBQVUsYUFBZjtBQUNFO0FBQUE7QUFBQSxRQUFLLElBQUcsZUFBUjtBQUNFO0FBQUE7QUFBQSxVQUFLLElBQUcscUJBQVI7QUFDRTtBQUFBO0FBQUEsWUFBSSxXQUFVLE9BQWQ7QUFBQTtBQUFBLFNBREY7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QXlCLGlDQUFDa0QsT0FBRCxFQUFVQyxXQUFWLEVBQTBCO0FBQ2pEQyxlQUFTLDBDQUF3QkYsT0FBeEIsRUFBaUNDLFdBQWpDLENBQVQ7QUFDRCxLQUhIO0FBSUVsRCxpQkFBYSx1QkFBTTtBQUNqQm1ELGVBQVMsa0NBQVQ7QUFDRDtBQU5ILEdBRHlCO0FBQUEsQ0FBM0I7O2tCQVdlLHlCQUFRSixlQUFSLEVBQXlCQyxrQkFBekIsRUFBNkNGLGNBQTdDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQmY7Ozs7OztBQUVPLElBQU1NLDhCQUFXLFNBQVhBLFFBQVc7QUFBQSxNQUFDQyxTQUFELHVFQUFhLEVBQWI7QUFBQSxTQUN0QixJQUFJQyxJQUFKLENBQVNDLFNBQVNGLFVBQVVHLE1BQVYsQ0FBaUIsQ0FBakIsQ0FBVCxFQUE4QixFQUE5QixDQUFULENBRHNCO0FBQUEsQ0FBakI7O0FBR0EsSUFBTUMsa0RBQXFCLFNBQXJCQSxrQkFBcUI7QUFBQSxTQUNoQywwQkFBV0MsSUFBWCxFQUFpQixrQkFBakIsQ0FEZ0M7QUFBQSxDQUEzQjs7QUFHQSxJQUFNckQsZ0RBQW9CLFNBQXBCQSxpQkFBb0IsR0FBTTtBQUNyQyxNQUFNc0QsU0FBU0MsT0FBT0MsUUFBdEI7QUFDQSxTQUFVRixPQUFPRyxRQUFqQixVQUE4QkgsT0FBT0ksSUFBckM7QUFDRCxDQUhNLEMiLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgY29uc3QgU2VyYUxvZ28gPSAoXG4gIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTkzXCIgaGVpZ2h0PVwiNTJcIiB2aWV3Qm94PVwiMCAwIDE5MyA1MlwiPlxuICAgIDxwYXRoIHN0eWxlPXt7IGZpbGw6ICcjMDA5Njg4JywgZmlsbFJ1bGU6ICdldmVub2RkJyB9fSBkPVwiTTIwLjUzOCw1MS43NXExMCwwLDE1LjEtMy43YTExLjYyNywxMS42MjcsMCwwLDAsNS4xLTkuOXEwLTYtMy41NS05LjR0LTEyLjY1LTUuOXEtNS44LTEuNS04LjQ1LTIuNDVhOS41OTQsOS41OTQsMCwwLDEtMy44NS0yLjI1LDQuODEzLDQuODEzLDAsMCwxLTEuMi0zLjQsNC42NTIsNC42NTIsMCwwLDEsMi44LTQuNiwxOS44OCwxOS44OCwwLDAsMSw4LjEtMS4zLDM3LjcwNywzNy43MDcsMCwwLDEsOC42NSwxLDI1Ljg4OSwyNS44ODksMCwwLDEsNy4xNSwyLjdWNC4xNWEyNC42LDI0LjYsMCwwLDAtNy40LTIuNSw0OC44NDYsNDguODQ2LDAsMCwwLTkuNC0uOXEtOS4yLDAtMTQuNjUsMy41NUExMS42NzYsMTEuNjc2LDAsMCwwLC44MzgsMTQuNzVhMTIuNjYyLDEyLjY2MiwwLDAsMCwxLjc1LDcsMTMsMTMsMCwwLDAsNS4yLDQuNDUsNTQuNzQ5LDU0Ljc0OSwwLDAsMCw5LjM1LDMuNDUsODIuMzIyLDgyLjMyMiwwLDAsMSw4LjI1LDIuNiw5Ljk2LDkuOTYsMCwwLDEsMy45LDIuNDUsNS4yOTQsNS4yOTQsMCwwLDEsMS4xNSwzLjU1LDQuNCw0LjQsMCwwLDEtMi41LDQuMnEtMi41LDEuMy03LjksMS4zYTM2LjExMSwzNi4xMTEsMCwwLDEtOS45LTEuNDUsMzguMTU2LDM4LjE1NiwwLDAsMS05LTMuNzV2OC42YTI2LjgsMjYuOCwwLDAsMCw4LjgsMy4zNSw0OC43NDcsNDguNzQ3LDAsMCwwLDEwLjYsMS4yNWgwWm01Ny42LDBhNjQuODA4LDY0LjgwOCwwLDAsMCwxMC4zNS0uODUsNDAuMDQxLDQwLjA0MSwwLDAsMCw4LjQ1LTIuMTV2LTguMWE0NSw0NSwwLDAsMS04LjMsMi4yNSw1Mi4xNDQsNTIuMTQ0LDAsMCwxLTkuMy44NXEtOSwwLTE0LjI1LTMuMzV0LTUuNzUtMTAuMTVoNDIuMnYtNWEyNi41NDYsMjYuNTQ2LDAsMCwwLTIuOTUtMTIuNjUsMjAuOTgxLDIwLjk4MSwwLDAsMC04Ljc1LTguN0EyOS4xODksMjkuMTg5LDAsMCwwLDc1LjczOC43NXEtMTIuNSwwLTE5LjI1LDYuOXQtNi43NSwxOC43cTAsMTIuMSw3LjU1LDE4Ljc1dDIwLjg1LDYuNjVoMFptLTE4LjgtMjguNmExNC4xNDQsMTQuMTQ0LDAsMCwxLDQuNC0xMC40cTQuMi0zLjksMTEuOC0zLjksNy44LDAsMTIuMDUsMy43NXQ0LjQ1LDEwLjU1aC0zMi43Wm01My4yLDI3LjFoMTAuMVYyMC41NWExNC4wMjYsMTQuMDI2LDAsMCwxLDcuNi03LjksMzEuNzMxLDMxLjczMSwwLDAsMSwxMy4yLTIuNVYyLjI1YTM1LjA1OCwzNS4wNTgsMCwwLDAtMTIuNjUsMi4xLDE3LjUzMiwxNy41MzIsMCwwLDAtOC40NSw2LjVWMi4yNWgtOS44djQ4Wm01Mi42LDEuNUEyNy4yMzIsMjcuMjMyLDAsMCwwLDE3NS40ODYsNTBhMjAuMjgsMjAuMjgsMCwwLDAsNy4zNS01LjE1djUuNGg5LjVWMjAuNTVxMC05LjMtNS43NS0xNC41NXQtMTcuNjUtNS4yNWE1My40MTUsNTMuNDE1LDAsMCwwLTkuMy44NSwzMS45NDksMzEuOTQ5LDAsMCwwLTcuOCwyLjI1djguMmEzNC45MTEsMzQuOTExLDAsMCwxLDcuNDUtMi4zNSw0Mi41NTcsNDIuNTU3LDAsMCwxLDguNTUtLjg1cTcuNCwwLDEwLjg1LDIuNzV0My40NSw4LjQ1djIuNXEtNi45LTQtMTYuOC00LTkuMywwLTE0LjM1LDQuMzV0LTUuMDUsMTIuMzVxMCw3LjYsNS4yNSwxMi4wNXQxMy45NSw0LjQ1aDBabTIuNS03LjdxLTExLjUsMC0xMS41LTguOCwwLTQuNiwyLjg1LTYuODV0OC42NS0yLjI1YTI2LjE1OSwyNi4xNTksMCwwLDEsMTQuNSw0LjJ2Ni41YTEyLjg2LDEyLjg2LDAsMCwxLTUuOCw1LjMsMTkuNTkzLDE5LjU5MywwLDAsMS04LjcsMS45aDBaXCIvPlxuICA8L3N2Zz5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFNlcmFMb2dvO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgR29vZ2xlTG9naW4gZnJvbSAncmVhY3QtZ29vZ2xlLWxvZ2luJztcblxuaW1wb3J0IFNuYWNrYmFyIGZyb20gJy4vbGF5b3V0L1NuYWNrYmFyJztcbmltcG9ydCB7IGdldEN1cnJlbnRCYXNlVXJsIH0gZnJvbSAnLi4vdXRpbHMvQ29tbW9uJztcbmltcG9ydCB7IFNlcmFMb2dvIH0gZnJvbSAnLi4vYXNzZXRzL1N2Z3MnO1xuXG5jb25zdCBMb2dpbiA9ICh7IG1lc3NhZ2UsIGF1dGhlbnRpY2F0ZUdvb2dsZVRva2VuLCBoaWRlTWVzc2FnZSB9KSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlR29vZ2xlID0gKHJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlc3BvbnNlLmNvZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYXV0aGVudGljYXRlR29vZ2xlVG9rZW4ocmVzcG9uc2UuY29kZSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1hcHBcIj5cbiAgICAgIDxkaXYgaWQ9XCJjb250ZW50LWxvZ2luXCI+XG4gICAgICAgIDxkaXYgaWQ9XCJjb250ZW50LWRlY2xhcmF0aW9uXCI+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRpdGxlXCI+VGhpcyBpcyBhbiBFeHBlcmltZW50YWwgQXBwPC9oMj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkZXNjcmlwdGlvblwiPkRvbnQgdXNlIHRvIHN0b3JlIHlvdXIgY29uZmlkZW50aWFsIGRhdGEuIFRoaXMgYXBwIGlzIEhpZ2hseSBleHBlcmltZW50YWwgYW5kIGhhcyBiZWVuIGNyZWF0ZWQgb25seSBmb3IgbXkgcGVyc29uYWwgdGVzdDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgaWQ9XCJjb250ZW50LWxvZ29cIj5cbiAgICAgICAgICB7IFNlcmFMb2dvIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxHb29nbGVMb2dpblxuICAgICAgICAgIGNsaWVudElkPVwiNDg5ODIzNjcxNjkzLTB2dmxsdG52a2F2ZmEzN28yamwxMjNqYjU3dWxjcGh1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tXCJcbiAgICAgICAgICBidXR0b25UZXh0PVwiTG9naW5cIlxuICAgICAgICAgIG9uU3VjY2Vzcz17cmVzcG9uc2VHb29nbGV9XG4gICAgICAgICAgb25GYWlsdXJlPXtyZXNwb25zZUdvb2dsZX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvbiBidXR0b24tZ29vZ2xlLWxvZ2luXCJcbiAgICAgICAgICBhY2Nlc3NUeXBlPVwib2ZmbGluZVwiXG4gICAgICAgICAgcmVzcG9uc2VUeXBlPVwiY29kZVwiXG4gICAgICAgICAgcmVkaXJlY3RVcmk9e2dldEN1cnJlbnRCYXNlVXJsfVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvbi1nb29nbGUtZ1wiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicGF0aDFcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicGF0aDJcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicGF0aDNcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicGF0aDRcIiAvPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8c3Bhbj5Mb2cgaW4gd2l0aCBHb29nbGU8L3NwYW4+XG4gICAgICAgIDwvR29vZ2xlTG9naW4+XG4gICAgICAgIDxkaXYgaWQ9XCJjb250ZW50LXRpcFwiPlxuICAgICAgICAgIDxoMj7igJxEb27igJl0IHdpc2ggaXQgd2FzIGVhc2llciB3aXNoIHlvdSB3ZXJlIGJldHRlcuKAnTwvaDI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8U25hY2tiYXJcbiAgICAgICAgc2hvdz17bWVzc2FnZS5zaG93fVxuICAgICAgICBpc0Vycm9yPXttZXNzYWdlLmlzRXJyb3J9XG4gICAgICAgIG1lc3NhZ2U9e21lc3NhZ2UudGV4dH1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gaGlkZU1lc3NhZ2UoKX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5Mb2dpbi5wcm9wVHlwZXMgPSB7XG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2hvdzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0Vycm9yOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgYXV0aGVudGljYXRlR29vZ2xlVG9rZW46IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGhpZGVNZXNzYWdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTG9naW47XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgZHVyYXRpb24gPSAyNTA7XG5cbmNvbnN0IGRlZmF1bHRTdHlsZSA9IHtcbiAgdHJhbnNpdGlvbjogYGFsbCAke2R1cmF0aW9ufW1zIGVhc2UtaW4tb3V0YCxcbiAgYm90dG9tOiAnLTEwMHB4Jyxcbn07XG5cbmNvbnN0IHRyYW5zaXRpb25TdHlsZXMgPSB7XG4gIGVudGVyaW5nOiB7XG4gICAgYm90dG9tOiAnLTEwMHB4JyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgfSxcbiAgZW50ZXJlZDoge1xuICAgIGJvdHRvbTogJzBweCcsXG4gICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICB9LFxufTtcblxuY29uc3QgU25hY2tiYXJBbmltID0gKHsgaW46IGluUHJvcCwgY2hpbGRyZW4sIGN1c3RvbUNsYXNzIH0pID0+IChcbiAgPFRyYW5zaXRpb24gaW49e2luUHJvcH0gdGltZW91dD17ZHVyYXRpb259PlxuICAgIHtzdGF0ZSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPVwiY29udGVudC1zbmFja2JhclwiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgLi4uZGVmYXVsdFN0eWxlLFxuICAgICAgICAgIC4uLnRyYW5zaXRpb25TdHlsZXNbc3RhdGVdLFxuICAgICAgICB9fVxuICAgICAgICBjbGFzc05hbWU9e2N1c3RvbUNsYXNzfVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICA8L1RyYW5zaXRpb24+XG4pO1xuXG5TbmFja2JhckFuaW0ucHJvcFR5cGVzID0ge1xuICBpbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIGN1c3RvbUNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuU25hY2tiYXJBbmltLmRlZmF1bHRQcm9wcyA9IHtcbiAgY3VzdG9tQ2xhc3M6ICcnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU25hY2tiYXJBbmltO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgU25hY2tiYXJBbmltIGZyb20gJy4uL2FuaW1zL1NuYWNrYmFyQW5pbSc7XG5cbmNvbnN0IEFjdGlvbiA9ICh7IG9uQ2xpY2ssIHRleHQgfSkgPT4gKFxuICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvbi1hY3Rpb24tc25hY2tiYXJcIiBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICB7dGV4dH1cbiAgPC9idXR0b24+XG4pO1xuXG5BY3Rpb24ucHJvcFR5cGVzID0ge1xuICB0ZXh0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5jbGFzcyBTbmFja2JhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBjb25zdCB7XG4gICAgICBvbkNsb3NlLCBkdXJhdGlvbiwgc2hvdyxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChzaG93KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgb25DbG9zZSgpO1xuICAgICAgfSwgZHVyYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBtZXNzYWdlLCBpc0Vycm9yLCBhY3Rpb25UZXh0LCBhY3Rpb25DbGljaywgc2hvdyxcbiAgICAgIHZlcnRpY2FsUG9zdGlvbiwgaG9yaXpvbnRhbFBvc2l0aW9uLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8U25hY2tiYXJBbmltIGluPXtzaG93fSBjdXN0b21DbGFzcz17YCR7dmVydGljYWxQb3N0aW9ufSAkeyhob3Jpem9udGFsUG9zaXRpb24pfWB9PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtgc25hY2tiYXIgJHsoaXNFcnJvcikgPyAnZXJyb3InIDogJyd9YH1cbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNuYWNrYmFyLW1lc3NhZ2VcIj57bWVzc2FnZX08L3NwYW4+XG4gICAgICAgICAge1xuICAgICAgICAgICAgKGFjdGlvblRleHQgIT09ICcnICYmIGFjdGlvbkNsaWNrICE9PSB1bmRlZmluZWQpICYmXG4gICAgICAgICAgICAgIDxBY3Rpb24gb25DbGljaz17YWN0aW9uQ2xpY2t9IHRleHQ9e2FjdGlvblRleHR9IC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvU25hY2tiYXJBbmltPlxuICAgICk7XG4gIH1cbn1cblxuU25hY2tiYXIucHJvcFR5cGVzID0ge1xuICBzaG93OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBtZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGR1cmF0aW9uOiBQcm9wVHlwZXMubnVtYmVyLFxuICBpc0Vycm9yOiBQcm9wVHlwZXMuYm9vbCxcbiAgYWN0aW9uVGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbiAgYWN0aW9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICB2ZXJ0aWNhbFBvc3Rpb246IFByb3BUeXBlcy5vbmVPZihbJ3RvcCcsICdib3R0b20nXSksXG4gIGhvcml6b250YWxQb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnbGVmdCcsICdyaWdodCddKSxcbn07XG5cblNuYWNrYmFyLmRlZmF1bHRQcm9wcyA9IHtcbiAgZHVyYXRpb246IDUwMDAsXG4gIGlzRXJyb3I6IGZhbHNlLFxuICBhY3Rpb25UZXh0OiAnJyxcbiAgYWN0aW9uQ2xpY2s6IHVuZGVmaW5lZCxcbiAgdmVydGljYWxQb3N0aW9uOiAnYm90dG9tJyxcbiAgaG9yaXpvbnRhbFBvc2l0aW9uOiAncmlnaHQnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU25hY2tiYXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IExvZ2luIGZyb20gJy4uL2NvbXBvbmVudHMvTG9naW4nO1xuaW1wb3J0IHsgYXV0aGVudGljYXRlR29vZ2xlVG9rZW4gfSBmcm9tICcuLi9hY3Rpb25zL2F1dGhBY3Rpb25zJztcbmltcG9ydCB7IGhpZGVNZXNzYWdlIH0gZnJvbSAnLi4vYWN0aW9ucy9tZXNzYWdlQWN0aW9ucyc7XG5cbmNvbnN0IExvZ2luQ29udGFpbmVyID0gcHJvcHMgPT4gPExvZ2luIHsuLi5wcm9wc30gLz47XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IChcbiAge1xuICAgIG1lc3NhZ2U6IHN0YXRlLm1lc3NhZ2UsXG4gIH1cbik7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IChcbiAge1xuICAgIGF1dGhlbnRpY2F0ZUdvb2dsZVRva2VuOiAoaWRUb2tlbiwgYWNjZXNzVG9rZW4pID0+IHtcbiAgICAgIGRpc3BhdGNoKGF1dGhlbnRpY2F0ZUdvb2dsZVRva2VuKGlkVG9rZW4sIGFjY2Vzc1Rva2VuKSk7XG4gICAgfSxcbiAgICBoaWRlTWVzc2FnZTogKCkgPT4ge1xuICAgICAgZGlzcGF0Y2goaGlkZU1lc3NhZ2UoKSk7XG4gICAgfSxcbiAgfVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoTG9naW5Db250YWluZXIpO1xuIiwiaW1wb3J0IGRhdGVGb3JtYXQgZnJvbSAnZGF0ZWZvcm1hdCc7XG5cbmV4cG9ydCBjb25zdCB0b0pzRGF0ZSA9IChwYXJzZURhdGUgPSAnJykgPT5cbiAgbmV3IERhdGUocGFyc2VJbnQocGFyc2VEYXRlLnN1YnN0cig2KSwgMTApKTtcblxuZXhwb3J0IGNvbnN0IHRvU2ltcGxlRGF0ZUZvcm1hdCA9IGRhdGUgPT5cbiAgZGF0ZUZvcm1hdChkYXRlLCAnZGRkZCBkZCBtbW0geXl5eScpO1xuXG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudEJhc2VVcmwgPSAoKSA9PiB7XG4gIGNvbnN0IGdldFVybCA9IHdpbmRvdy5sb2NhdGlvbjtcbiAgcmV0dXJuIGAke2dldFVybC5wcm90b2NvbH0vLyR7Z2V0VXJsLmhvc3R9YDtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9