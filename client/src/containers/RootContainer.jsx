import React from "react";
import { connect } from "react-redux";

import Root from "../components/Root";

import { initAuth, logout } from "../actions/authActions";
import {
  isAuthenticated,
  isFetchingAuthentication
} from "../selectors/authSelector";

const RootContainer = props => <Root {...props} />;

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
  isFetchingAuthentication: isFetchingAuthentication(state)
});

const mapDispatchToProps = dispatch => ({
  initAuth: () => {
    dispatch(initAuth());
  },
  logout: () => {
    dispatch(logout());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainer);
