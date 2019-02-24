import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LoaderLinear from "../../components/layout/LoaderLinear";
import MainAddButton from "../../components/layout/MainAddButton";
import CategoriesFilter from "../../components/todo/Category/CategoriesFilter";
import VisibilityFilter from "../../components/todo/visibility/VisibilityFilters";
import Tasks from "../../components/todo/Tasks";
import DialogAdd from "../../components/todo/dialogAdd/DialogAdd";
import Snackbar from "../../components/layout/Snackbar";

import * as todoFiltersActions from "../../actions/todoFiltersActions";
import * as messageActions from "../../actions/messageActions";
import * as commonSelectors from "../../selectors/commonSelectors";

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
          <CategoriesFilter />
          <VisibilityFilter />
          <MainAddButton
            onClick={() => this.setState({ isDialogAddOpen: true })}
          />
        </div>
        <Tasks />
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

const mapStateToProps = state => ({
  message: state.message,
  showLoading: commonSelectors.showLoading(state)
});

const mapDispatchToProps = dispatch => ({
  hideMessage: () => {
    dispatch(messageActions.hideMessage());
  },
  initFetchAllCategories: () => {
    dispatch(todoFiltersActions.fetchAllCategories());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);
