import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Snackbar from "~/components/Snackbar";
import * as messageActions from "~/actions/messageActions";

class Goals extends Component {
  componentDidMount() {}

  render() {
    const { message, hideMessage } = this.props;
    return (
      <div className="content-app">
        <p>In development</p>
        <Snackbar
          show={message.show}
          isError={message.isError}
          message={message.text}
          onClose={() => hideMessage()}
        />
      </div>
    );
  }
}

Goals.propTypes = {
  message: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  hideMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  message: state.message
});

const mapDispatchToProps = dispatch => ({
  hideMessage: () => {
    dispatch(messageActions.hideMessage());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Goals);
