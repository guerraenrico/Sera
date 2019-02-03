import React, { Component } from "react";
import PropTypes from "prop-types";

import LoaderLinear from "../layout/LoaderLinear";
import MainAddButton from "../layout/MainAddButton";
import CategoriesFilterContainer from "../../containers/CategoriesFilterContainer";
import VisibilityFilterContainer from "../../containers/VisibilityFilterContainer";
import TasksContainer from "../../containers/TasksContainer";
import DialogAdd from "./dialogAdd/DialogAdd";
import Snackbar from "../layout/Snackbar";

class Todos extends Component {
  state = {
    isDialogAddOpen: false
  };

  componentDidMount() {
    const { initFetchAllCategories } = this.props;
    initFetchAllCategories();
  }

  render() {
    const { isDialogAddOpen } = this.state;
    const { message, hideMessage, showLoading } = this.props;
    return (
      <div className="content-app">
        <LoaderLinear show={showLoading} />
        <div id="main-top-bar">
          <CategoriesFilterContainer />
          <VisibilityFilterContainer />
          <MainAddButton
            onClick={() => this.setState({ isDialogAddOpen: true })}
          />
        </div>
        <TasksContainer />
        <DialogAdd
          open={isDialogAddOpen}
          onClose={() => this.setState({ isDialogAddOpen: false })}
        />
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

Todos.propTypes = {
  message: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  hideMessage: PropTypes.func.isRequired,
  initFetchAllCategories: PropTypes.func.isRequired,
  showLoading: PropTypes.bool.isRequired
};

export default Todos;
