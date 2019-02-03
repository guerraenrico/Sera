import React from "react";
import { connect } from "react-redux";

import Goals from "../components/goal/Goals";
import { hideMessage } from "../actions/messageActions";

const GoalsContainer = props => <Goals {...props} />;

const mapStateToProps = state => ({
  message: state.message
});

const mapDispatchToProps = dispatch => ({
  hideMessage: () => {
    dispatch(hideMessage());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalsContainer);
