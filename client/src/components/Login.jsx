import React from "react";
import PropTypes from "prop-types";
import GoogleLogin from "react-google-login";

import Snackbar from "./layout/Snackbar";
import { getCurrentBaseUrl } from "../utils/Common";
import { SeraLogo } from "../assets/Svgs";

const Login = ({ message, authenticateGoogleToken, hideMessage }) => {
  const responseGoogle = response => {
    if (response.code !== undefined) {
      authenticateGoogleToken(response.code);
    }
  };
  return (
    <div className="content-app">
      <div id="content-login">
        <div id="content-declaration">
          <h2 className="title">This is an Experimental App</h2>
          <p className="description">
            Dont use to store your confidential data. This app is Highly
            experimental and has been created only for my personal test
          </p>
        </div>
        <div id="content-logo">{SeraLogo}</div>
        <GoogleLogin
          clientId="489823671693-0vvlltnvkavfa37o2jl123jb57ulcphu.apps.googleusercontent.com"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          accessType="offline"
          responseType="code"
          redirectUri={getCurrentBaseUrl}
          render={renderProps => (
            <button
              className="main-button button-google-login"
              onClick={renderProps.onClick}
              type="button"
            >
              <span className="icon-google-g">
                <span className="path1" />
                <span className="path2" />
                <span className="path3" />
                <span className="path4" />
              </span>
              <span>Log in with Google</span>
            </button>
          )}
        />
        <div id="content-tip">
          <h2>“Don’t wish it was easier wish you were better”</h2>
        </div>
      </div>
      <Snackbar
        show={message.show}
        isError={message.isError}
        message={message.text}
        onClose={() => hideMessage()}
      />
    </div>
  );
};

Login.propTypes = {
  message: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  authenticateGoogleToken: PropTypes.func.isRequired,
  hideMessage: PropTypes.func.isRequired
};

export default Login;
