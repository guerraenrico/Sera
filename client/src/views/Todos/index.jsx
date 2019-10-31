import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LoaderLinear from "~/components/LoaderLinear";
import ButtonIcon from "~/components/ButtonIcon";
import Search from "./components/Search";
import Tasks from "./components/Tasks";

import Filters from "./components/Filters";
import Snackbar from "~/components/Snackbar";

import * as messageActions from "~/actions/messageActions";
import * as commonSelectors from "~/selectors/commonSelectors";

import { ContentApp, MainTopBar, ContentTopBarActions } from "./style";

class Todos extends React.PureComponent {
  state = {
    isFilterOpen: false,
    creatingTask: false
  };

  handleAbortCreatingTask = () => {
    this.setState({ creatingTask: false });
  };

  render() {
    const { isFilterOpen, creatingTask } = this.state;
    const { message, hideMessage, showLoading } = this.props;
    return (
      <ContentApp>
        <LoaderLinear show={showLoading} />
        <MainTopBar>
          {/* <CategoriesFilter />
          <VisibilityFilter /> */}
          <Search />
          <ContentTopBarActions>
            <ButtonIcon
              onClick={() => this.setState({ isFilterOpen: true })}
              iconClassName="icon-filter"
            />
            <ButtonIcon
              onClick={() => this.setState({ creatingTask: true })}
              iconClassName="icon-add"
            />
          </ContentTopBarActions>
        </MainTopBar>
        <Tasks
          creatingTask={creatingTask}
          onAbortCreatingTask={this.handleAbortCreatingTask}
        />
        <Filters
          open={isFilterOpen}
          onClose={() => this.setState({ isFilterOpen: false })}
        />
        <Snackbar
          show={message.show}
          isError={message.isError}
          message={message.text}
          onClose={() => hideMessage()}
        />
      </ContentApp>
    );
  }
}

Todos.propTypes = {
  message: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    text: PropTypes.string
  }).isRequired,
  hideMessage: PropTypes.func.isRequired,
  showLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  message: state.message,
  showLoading: commonSelectors.showLoading(state)
});

const mapDispatchToProps = dispatch => ({
  hideMessage: () => {
    dispatch(messageActions.hideMessage());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);
