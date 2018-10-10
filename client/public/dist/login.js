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

var _Snackbar = __webpack_require__(/*! ./Snackbar */ "./src/components/Snackbar.jsx");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL1N2Z3MuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0xvZ2luLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9TbmFja2Jhci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYW5pbXMvU25hY2tiYXJBbmltLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9Mb2dpbkNvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL0NvbW1vbi5qcyJdLCJuYW1lcyI6WyJTZXJhTG9nbyIsImZpbGwiLCJmaWxsUnVsZSIsIkxvZ2luIiwibWVzc2FnZSIsImF1dGhlbnRpY2F0ZUdvb2dsZVRva2VuIiwiaGlkZU1lc3NhZ2UiLCJyZXNwb25zZUdvb2dsZSIsInJlc3BvbnNlIiwiY29kZSIsInVuZGVmaW5lZCIsImdldEN1cnJlbnRCYXNlVXJsIiwic2hvdyIsImlzRXJyb3IiLCJ0ZXh0IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic2hhcGUiLCJib29sIiwiaXNSZXF1aXJlZCIsInN0cmluZyIsImZ1bmMiLCJBY3Rpb24iLCJvbkNsaWNrIiwiU25hY2tiYXIiLCJwcm9wcyIsIm9uQ2xvc2UiLCJkdXJhdGlvbiIsInNldFRpbWVvdXQiLCJhY3Rpb25UZXh0IiwiYWN0aW9uQ2xpY2siLCJ2ZXJ0aWNhbFBvc3Rpb24iLCJob3Jpem9udGFsUG9zaXRpb24iLCJSZWFjdCIsIkNvbXBvbmVudCIsIm51bWJlciIsIm9uZU9mIiwiZGVmYXVsdFByb3BzIiwiZGVmYXVsdFN0eWxlIiwidHJhbnNpdGlvbiIsImJvdHRvbSIsInRyYW5zaXRpb25TdHlsZXMiLCJlbnRlcmluZyIsInZpc2liaWxpdHkiLCJlbnRlcmVkIiwiU25hY2tiYXJBbmltIiwiaW5Qcm9wIiwiaW4iLCJjaGlsZHJlbiIsImN1c3RvbUNsYXNzIiwic3RhdGUiLCJub2RlIiwiTG9naW5Db250YWluZXIiLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJpZFRva2VuIiwiYWNjZXNzVG9rZW4iLCJkaXNwYXRjaCIsInRvSnNEYXRlIiwicGFyc2VEYXRlIiwiRGF0ZSIsInBhcnNlSW50Iiwic3Vic3RyIiwidG9TaW1wbGVEYXRlRm9ybWF0IiwiZGF0ZSIsImdldFVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJob3N0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFTyxJQUFNQSw4QkFDWDtBQUFBO0FBQUEsSUFBSyxPQUFNLDRCQUFYLEVBQXdDLE9BQU0sS0FBOUMsRUFBb0QsUUFBTyxJQUEzRCxFQUFnRSxTQUFRLFlBQXhFO0FBQ0UsMENBQU0sT0FBTyxFQUFFQyxNQUFNLFNBQVIsRUFBbUJDLFVBQVUsU0FBN0IsRUFBYixFQUF1RCxHQUFFLG1yREFBekQ7QUFERixDQURLOztrQkFNUUYsUTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUmY7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7OztBQUVBLElBQU1HLFFBQVEsU0FBUkEsS0FBUSxPQUF1RDtBQUFBLE1BQXBEQyxPQUFvRCxRQUFwREEsT0FBb0Q7QUFBQSxNQUEzQ0MsdUJBQTJDLFFBQTNDQSx1QkFBMkM7QUFBQSxNQUFsQkMsV0FBa0IsUUFBbEJBLFdBQWtCOztBQUNuRSxNQUFNQyxpQkFBaUIsU0FBakJBLGNBQWlCLENBQUNDLFFBQUQsRUFBYztBQUNuQyxRQUFJQSxTQUFTQyxJQUFULEtBQWtCQyxTQUF0QixFQUFpQztBQUMvQkwsOEJBQXdCRyxTQUFTQyxJQUFqQztBQUNEO0FBQ0YsR0FKRDtBQUtBLFNBQ0U7QUFBQTtBQUFBLE1BQUssV0FBVSxhQUFmO0FBQ0U7QUFBQTtBQUFBLFFBQUssSUFBRyxlQUFSO0FBQ0U7QUFBQTtBQUFBLFVBQUssSUFBRyxxQkFBUjtBQUNFO0FBQUE7QUFBQSxZQUFJLFdBQVUsT0FBZDtBQUFBO0FBQUEsU0FERjtBQUVFO0FB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VUMsV0FBVixFQUEwQjtBQUNqREMsZUFBUywwQ0FBd0JGLE9BQXhCLEVBQWlDQyxXQUFqQyxDQUFUO0FBQ0QsS0FISDtBQUlFbEQsaUJBQWEsdUJBQU07QUFDakJtRCxlQUFTLGtDQUFUO0FBQ0Q7QUFOSCxHQUR5QjtBQUFBLENBQTNCOztrQkFXZSx5QkFBUUosZUFBUixFQUF5QkMsa0JBQXpCLEVBQTZDRixjQUE3QyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUJmOzs7Ozs7QUFFTyxJQUFNTSw4QkFBVyxTQUFYQSxRQUFXO0FBQUEsTUFBQ0MsU0FBRCx1RUFBYSxFQUFiO0FBQUEsU0FDdEIsSUFBSUMsSUFBSixDQUFTQyxTQUFTRixVQUFVRyxNQUFWLENBQWlCLENBQWpCLENBQVQsRUFBOEIsRUFBOUIsQ0FBVCxDQURzQjtBQUFBLENBQWpCOztBQUdBLElBQU1DLGtEQUFxQixTQUFyQkEsa0JBQXFCO0FBQUEsU0FDaEMsMEJBQVdDLElBQVgsRUFBaUIsa0JBQWpCLENBRGdDO0FBQUEsQ0FBM0I7O0FBR0EsSUFBTXJELGdEQUFvQixTQUFwQkEsaUJBQW9CLEdBQU07QUFDckMsTUFBTXNELFNBQVNDLE9BQU9DLFFBQXRCO0FBQ0EsU0FBVUYsT0FBT0csUUFBakIsVUFBOEJILE9BQU9JLElBQXJDO0FBQ0QsQ0FITSxDIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGNvbnN0IFNlcmFMb2dvID0gKFxuICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE5M1wiIGhlaWdodD1cIjUyXCIgdmlld0JveD1cIjAgMCAxOTMgNTJcIj5cbiAgICA8cGF0aCBzdHlsZT17eyBmaWxsOiAnIzAwOTY4OCcsIGZpbGxSdWxlOiAnZXZlbm9kZCcgfX0gZD1cIk0yMC41MzgsNTEuNzVxMTAsMCwxNS4xLTMuN2ExMS42MjcsMTEuNjI3LDAsMCwwLDUuMS05LjlxMC02LTMuNTUtOS40dC0xMi42NS01LjlxLTUuOC0xLjUtOC40NS0yLjQ1YTkuNTk0LDkuNTk0LDAsMCwxLTMuODUtMi4yNSw0LjgxMyw0LjgxMywwLDAsMS0xLjItMy40LDQuNjUyLDQuNjUyLDAsMCwxLDIuOC00LjYsMTkuODgsMTkuODgsMCwwLDEsOC4xLTEuMywzNy43MDcsMzcuNzA3LDAsMCwxLDguNjUsMSwyNS44ODksMjUuODg5LDAsMCwxLDcuMTUsMi43VjQuMTVhMjQuNiwyNC42LDAsMCwwLTcuNC0yLjUsNDguODQ2LDQ4Ljg0NiwwLDAsMC05LjQtLjlxLTkuMiwwLTE0LjY1LDMuNTVBMTEuNjc2LDExLjY3NiwwLDAsMCwuODM4LDE0Ljc1YTEyLjY2MiwxMi42NjIsMCwwLDAsMS43NSw3LDEzLDEzLDAsMCwwLDUuMiw0LjQ1LDU0Ljc0OSw1NC43NDksMCwwLDAsOS4zNSwzLjQ1LDgyLjMyMiw4Mi4zMjIsMCwwLDEsOC4yNSwyLjYsOS45Niw5Ljk2LDAsMCwxLDMuOSwyLjQ1LDUuMjk0LDUuMjk0LDAsMCwxLDEuMTUsMy41NSw0LjQsNC40LDAsMCwxLTIuNSw0LjJxLTIuNSwxLjMtNy45LDEuM2EzNi4xMTEsMzYuMTExLDAsMCwxLTkuOS0xLjQ1LDM4LjE1NiwzOC4xNTYsMCwwLDEtOS0zLjc1djguNmEyNi44LDI2LjgsMCwwLDAsOC44LDMuMzUsNDguNzQ3LDQ4Ljc0NywwLDAsMCwxMC42LDEuMjVoMFptNTcuNiwwYTY0LjgwOCw2NC44MDgsMCwwLDAsMTAuMzUtLjg1LDQwLjA0MSw0MC4wNDEsMCwwLDAsOC40NS0yLjE1di04LjFhNDUsNDUsMCwwLDEtOC4zLDIuMjUsNTIuMTQ0LDUyLjE0NCwwLDAsMS05LjMuODVxLTksMC0xNC4yNS0zLjM1dC01Ljc1LTEwLjE1aDQyLjJ2LTVhMjYuNTQ2LDI2LjU0NiwwLDAsMC0yLjk1LTEyLjY1LDIwLjk4MSwyMC45ODEsMCwwLDAtOC43NS04LjdBMjkuMTg5LDI5LjE4OSwwLDAsMCw3NS43MzguNzVxLTEyLjUsMC0xOS4yNSw2Ljl0LTYuNzUsMTguN3EwLDEyLjEsNy41NSwxOC43NXQyMC44NSw2LjY1aDBabS0xOC44LTI4LjZhMTQuMTQ0LDE0LjE0NCwwLDAsMSw0LjQtMTAuNHE0LjItMy45LDExLjgtMy45LDcuOCwwLDEyLjA1LDMuNzV0NC40NSwxMC41NWgtMzIuN1ptNTMuMiwyNy4xaDEwLjFWMjAuNTVhMTQuMDI2LDE0LjAyNiwwLDAsMSw3LjYtNy45LDMxLjczMSwzMS43MzEsMCwwLDEsMTMuMi0yLjVWMi4yNWEzNS4wNTgsMzUuMDU4LDAsMCwwLTEyLjY1LDIuMSwxNy41MzIsMTcuNTMyLDAsMCwwLTguNDUsNi41VjIuMjVoLTkuOHY0OFptNTIuNiwxLjVBMjcuMjMyLDI3LjIzMiwwLDAsMCwxNzUuNDg2LDUwYTIwLjI4LDIwLjI4LDAsMCwwLDcuMzUtNS4xNXY1LjRoOS41VjIwLjU1cTAtOS4zLTUuNzUtMTQuNTV0LTE3LjY1LTUuMjVhNTMuNDE1LDUzLjQxNSwwLDAsMC05LjMuODUsMzEuOTQ5LDMxLjk0OSwwLDAsMC03LjgsMi4yNXY4LjJhMzQuOTExLDM0LjkxMSwwLDAsMSw3LjQ1LTIuMzUsNDIuNTU3LDQyLjU1NywwLDAsMSw4LjU1LS44NXE3LjQsMCwxMC44NSwyLjc1dDMuNDUsOC40NXYyLjVxLTYuOS00LTE2LjgtNC05LjMsMC0xNC4zNSw0LjM1dC01LjA1LDEyLjM1cTAsNy42LDUuMjUsMTIuMDV0MTMuOTUsNC40NWgwWm0yLjUtNy43cS0xMS41LDAtMTEuNS04LjgsMC00LjYsMi44NS02Ljg1dDguNjUtMi4yNWEyNi4xNTksMjYuMTU5LDAsMCwxLDE0LjUsNC4ydjYuNWExMi44NiwxMi44NiwwLDAsMS01LjgsNS4zLDE5LjU5MywxOS41OTMsMCwwLDEtOC43LDEuOWgwWlwiLz5cbiAgPC9zdmc+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBTZXJhTG9nbztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEdvb2dsZUxvZ2luIGZyb20gJ3JlYWN0LWdvb2dsZS1sb2dpbic7XG5cbmltcG9ydCBTbmFja2JhciBmcm9tICcuL1NuYWNrYmFyJztcbmltcG9ydCB7IGdldEN1cnJlbnRCYXNlVXJsIH0gZnJvbSAnLi4vdXRpbHMvQ29tbW9uJztcbmltcG9ydCB7IFNlcmFMb2dvIH0gZnJvbSAnLi4vYXNzZXRzL1N2Z3MnO1xuXG5jb25zdCBMb2dpbiA9ICh7IG1lc3NhZ2UsIGF1dGhlbnRpY2F0ZUdvb2dsZVRva2VuLCBoaWRlTWVzc2FnZSB9KSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlR29vZ2xlID0gKHJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlc3BvbnNlLmNvZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYXV0aGVudGljYXRlR29vZ2xlVG9rZW4ocmVzcG9uc2UuY29kZSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1hcHBcIj5cbiAgICAgIDxkaXYgaWQ9XCJjb250ZW50LWxvZ2luXCI+XG4gICAgICAgIDxkaXYgaWQ9XCJjb250ZW50LWRlY2xhcmF0aW9uXCI+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRpdGxlXCI+VGhpcyBpcyBhbiBFeHBlcmltZW50YWwgQXBwPC9oMj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkZXNjcmlwdGlvblwiPkRvbnQgdXNlIHRvIHN0b3JlIHlvdXIgY29uZmlkZW50aWFsIGRhdGEuIFRoaXMgYXBwIGlzIEhpZ2hseSBleHBlcmltZW50YWwgYW5kIGhhcyBiZWVuIGNyZWF0ZWQgb25seSBmb3IgbXkgcGVyc29uYWwgdGVzdDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgaWQ9XCJjb250ZW50LWxvZ29cIj5cbiAgICAgICAgICB7IFNlcmFMb2dvIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxHb29nbGVMb2dpblxuICAgICAgICAgIGNsaWVudElkPVwiNDg5ODIzNjcxNjkzLTB2dmxsdG52a2F2ZmEzN28yamwxMjNqYjU3dWxjcGh1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tXCJcbiAgICAgICAgICBidXR0b25UZXh0PVwiTG9naW5cIlxuICAgICAgICAgIG9uU3VjY2Vzcz17cmVzcG9uc2VHb29nbGV9XG4gICAgICAgICAgb25GYWlsdXJlPXtyZXNwb25zZUdvb2dsZX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJtYWluLWJ1dHRvbiBidXR0b24tZ29vZ2xlLWxvZ2luXCJcbiAgICAgICAgICBhY2Nlc3NUeXBlPVwib2ZmbGluZVwiXG4gICAgICAgICAgcmVzcG9uc2VUeXBlPVwiY29kZVwiXG4gICAgICAgICAgcmVkaXJlY3RVcmk9e2dldEN1cnJlbnRCYXNlVXJsfVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvbi1nb29nbGUtZ1wiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicGF0aDFcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicGF0aDJcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicGF0aDNcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicGF0aDRcIiAvPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8c3Bhbj5Mb2cgaW4gd2l0aCBHb29nbGU8L3NwYW4+XG4gICAgICAgIDwvR29vZ2xlTG9naW4+XG4gICAgICAgIDxkaXYgaWQ9XCJjb250ZW50LXRpcFwiPlxuICAgICAgICAgIDxoMj7igJxEb27igJl0IHdpc2ggaXQgd2FzIGVhc2llciB3aXNoIHlvdSB3ZXJlIGJldHRlcuKAnTwvaDI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8U25hY2tiYXJcbiAgICAgICAgc2hvdz17bWVzc2FnZS5zaG93fVxuICAgICAgICBpc0Vycm9yPXttZXNzYWdlLmlzRXJyb3J9XG4gICAgICAgIG1lc3NhZ2U9e21lc3NhZ2UudGV4dH1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gaGlkZU1lc3NhZ2UoKX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5Mb2dpbi5wcm9wVHlwZXMgPSB7XG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgc2hvdzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0Vycm9yOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgYXV0aGVudGljYXRlR29vZ2xlVG9rZW46IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGhpZGVNZXNzYWdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTG9naW47XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBTbmFja2JhckFuaW0gZnJvbSAnLi9hbmltcy9TbmFja2JhckFuaW0nO1xuXG5jb25zdCBBY3Rpb24gPSAoeyBvbkNsaWNrLCB0ZXh0IH0pID0+IChcbiAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24tYWN0aW9uLXNuYWNrYmFyXCIgb25DbGljaz17b25DbGlja30+XG4gICAge3RleHR9XG4gIDwvYnV0dG9uPlxuKTtcblxuQWN0aW9uLnByb3BUeXBlcyA9IHtcbiAgdGV4dDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuY2xhc3MgU25hY2tiYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgY29uc3Qge1xuICAgICAgb25DbG9zZSwgZHVyYXRpb24sIHNob3csXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoc2hvdykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgIH0sIGR1cmF0aW9uKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbWVzc2FnZSwgaXNFcnJvciwgYWN0aW9uVGV4dCwgYWN0aW9uQ2xpY2ssIHNob3csXG4gICAgICB2ZXJ0aWNhbFBvc3Rpb24sIGhvcml6b250YWxQb3NpdGlvbixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPFNuYWNrYmFyQW5pbSBpbj17c2hvd30gY3VzdG9tQ2xhc3M9e2Ake3ZlcnRpY2FsUG9zdGlvbn0gJHsoaG9yaXpvbnRhbFBvc2l0aW9uKX1gfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YHNuYWNrYmFyICR7KGlzRXJyb3IpID8gJ2Vycm9yJyA6ICcnfWB9XG4gICAgICAgID5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzbmFja2Jhci1tZXNzYWdlXCI+e21lc3NhZ2V9PC9zcGFuPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIChhY3Rpb25UZXh0ICE9PSAnJyAmJiBhY3Rpb25DbGljayAhPT0gdW5kZWZpbmVkKSAmJlxuICAgICAgICAgICAgICA8QWN0aW9uIG9uQ2xpY2s9e2FjdGlvbkNsaWNrfSB0ZXh0PXthY3Rpb25UZXh0fSAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L1NuYWNrYmFyQW5pbT5cbiAgICApO1xuICB9XG59XG5cblNuYWNrYmFyLnByb3BUeXBlcyA9IHtcbiAgc2hvdzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBkdXJhdGlvbjogUHJvcFR5cGVzLm51bWJlcixcbiAgaXNFcnJvcjogUHJvcFR5cGVzLmJvb2wsXG4gIGFjdGlvblRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGFjdGlvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgdmVydGljYWxQb3N0aW9uOiBQcm9wVHlwZXMub25lT2YoWyd0b3AnLCAnYm90dG9tJ10pLFxuICBob3Jpem9udGFsUG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbJ2xlZnQnLCAncmlnaHQnXSksXG59O1xuXG5TbmFja2Jhci5kZWZhdWx0UHJvcHMgPSB7XG4gIGR1cmF0aW9uOiA1MDAwLFxuICBpc0Vycm9yOiBmYWxzZSxcbiAgYWN0aW9uVGV4dDogJycsXG4gIGFjdGlvbkNsaWNrOiB1bmRlZmluZWQsXG4gIHZlcnRpY2FsUG9zdGlvbjogJ2JvdHRvbScsXG4gIGhvcml6b250YWxQb3NpdGlvbjogJ3JpZ2h0Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNuYWNrYmFyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cCc7XG5cbmNvbnN0IGR1cmF0aW9uID0gMjUwO1xuXG5jb25zdCBkZWZhdWx0U3R5bGUgPSB7XG4gIHRyYW5zaXRpb246IGBhbGwgJHtkdXJhdGlvbn1tcyBlYXNlLWluLW91dGAsXG4gIGJvdHRvbTogJy0xMDBweCcsXG59O1xuXG5jb25zdCB0cmFuc2l0aW9uU3R5bGVzID0ge1xuICBlbnRlcmluZzoge1xuICAgIGJvdHRvbTogJy0xMDBweCcsXG4gICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gIH0sXG4gIGVudGVyZWQ6IHtcbiAgICBib3R0b206ICcwcHgnLFxuICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJyxcbiAgfSxcbn07XG5cbmNvbnN0IFNuYWNrYmFyQW5pbSA9ICh7IGluOiBpblByb3AsIGNoaWxkcmVuLCBjdXN0b21DbGFzcyB9KSA9PiAoXG4gIDxUcmFuc2l0aW9uIGluPXtpblByb3B9IHRpbWVvdXQ9e2R1cmF0aW9ufT5cbiAgICB7c3RhdGUgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD1cImNvbnRlbnQtc25hY2tiYXJcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIC4uLmRlZmF1bHRTdHlsZSxcbiAgICAgICAgICAuLi50cmFuc2l0aW9uU3R5bGVzW3N0YXRlXSxcbiAgICAgICAgfX1cbiAgICAgICAgY2xhc3NOYW1lPXtjdXN0b21DbGFzc31cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgPC9UcmFuc2l0aW9uPlxuKTtcblxuU25hY2tiYXJBbmltLnByb3BUeXBlcyA9IHtcbiAgaW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICBjdXN0b21DbGFzczogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cblNuYWNrYmFyQW5pbS5kZWZhdWx0UHJvcHMgPSB7XG4gIGN1c3RvbUNsYXNzOiAnJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNuYWNrYmFyQW5pbTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgTG9naW4gZnJvbSAnLi4vY29tcG9uZW50cy9Mb2dpbic7XG5pbXBvcnQgeyBhdXRoZW50aWNhdGVHb29nbGVUb2tlbiB9IGZyb20gJy4uL2FjdGlvbnMvYXV0aEFjdGlvbnMnO1xuaW1wb3J0IHsgaGlkZU1lc3NhZ2UgfSBmcm9tICcuLi9hY3Rpb25zL21lc3NhZ2VBY3Rpb25zJztcblxuY29uc3QgTG9naW5Db250YWluZXIgPSBwcm9wcyA9PiA8TG9naW4gey4uLnByb3BzfSAvPjtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKFxuICB7XG4gICAgbWVzc2FnZTogc3RhdGUubWVzc2FnZSxcbiAgfVxuKTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICB7XG4gICAgYXV0aGVudGljYXRlR29vZ2xlVG9rZW46IChpZFRva2VuLCBhY2Nlc3NUb2tlbikgPT4ge1xuICAgICAgZGlzcGF0Y2goYXV0aGVudGljYXRlR29vZ2xlVG9rZW4oaWRUb2tlbiwgYWNjZXNzVG9rZW4pKTtcbiAgICB9LFxuICAgIGhpZGVNZXNzYWdlOiAoKSA9PiB7XG4gICAgICBkaXNwYXRjaChoaWRlTWVzc2FnZSgpKTtcbiAgICB9LFxuICB9XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShMb2dpbkNvbnRhaW5lcik7XG4iLCJpbXBvcnQgZGF0ZUZvcm1hdCBmcm9tICdkYXRlZm9ybWF0JztcblxuZXhwb3J0IGNvbnN0IHRvSnNEYXRlID0gKHBhcnNlRGF0ZSA9ICcnKSA9PlxuICBuZXcgRGF0ZShwYXJzZUludChwYXJzZURhdGUuc3Vic3RyKDYpLCAxMCkpO1xuXG5leHBvcnQgY29uc3QgdG9TaW1wbGVEYXRlRm9ybWF0ID0gZGF0ZSA9PlxuICBkYXRlRm9ybWF0KGRhdGUsICdkZGRkIGRkIG1tbSB5eXl5Jyk7XG5cbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50QmFzZVVybCA9ICgpID0+IHtcbiAgY29uc3QgZ2V0VXJsID0gd2luZG93LmxvY2F0aW9uO1xuICByZXR1cm4gYCR7Z2V0VXJsLnByb3RvY29sfS8vJHtnZXRVcmwuaG9zdH1gO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=