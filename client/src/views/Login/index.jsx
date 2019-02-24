// @flow

import React from "react";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";

import Snackbar from "../../components/layout/Snackbar";
import { getCurrentBaseUrl } from "../../utils/Common";
import { SeraLogo } from "../../assets/Svgs";

import * as authActions from "../../actions/authActions";
import * as messageActions from "../../actions/messageActions";
import type { MessageState } from "../../reducers/message";

type Props = {
  message: MessageState,
  authenticateGoogleToken: string => void,
  hideMessage: () => void
};

const Login = ({ message, authenticateGoogleToken, hideMessage }: Props) => {
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

const mapStateToProps = state => ({
  message: state.message
});

const mapDispatchToProps = dispatch => ({
  authenticateGoogleToken: (idToken: string) => {
    dispatch(authActions.authenticateGoogleToken(idToken));
  },
  hideMessage: () => {
    dispatch(messageActions.hideMessage());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
