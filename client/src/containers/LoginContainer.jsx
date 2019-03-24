// @flow

import React from "react";
import { connect } from "react-redux";

import Login from "../components/Login";
import { authenticateGoogleToken } from "../actions/authActions";
import { hideMessage } from "../actions/messageActions";

const LoginContainer = props => <Login {...props} />;

const mapStateToProps = state => ({
  message: state.message
});

const mapDispatchToProps = dispatch => ({
  authenticateGoogleToken: (idToken: string) => {
    dispatch(authenticateGoogleToken(idToken));
  },
  hideMessage: () => {
    dispatch(hideMessage());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);