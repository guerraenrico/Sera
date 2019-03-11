// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import LoaderLinear from "../../components/layout/LoaderLinear";
import ButtonIcon from "../../components/layout/ButtonIcon";
// import CategoriesFilter from "../../components/todo/Category/CategoriesFilter";
// import VisibilityFilter from "../../components/todo/visibility/VisibilityFilters";
import Search from "../../components/todo/Search";
import Tasks from "../../components/todo/Tasks";
import DialogAdd from "../../components/todo/dialogAdd/DialogAdd";
import Snackbar from "../../components/layout/Snackbar";

import * as messageActions from "../../actions/messageActions";
import * as commonSelectors from "../../selectors/commonSelectors";

import type { MessageState } from "../../reducers/message";

import { ContentApp, MainTopBar, ContentTopBarActions } from "./style";

type Props = {
  message: MessageState,
  hideMessage: () => void,
  showLoading: boolean
};

type State = {
  isDialogAddOpen: boolean
};

class Todos extends Component<Props, State> {
  state = {
    isDialogAddOpen: false
  };

  render() {
    const { isDialogAddOpen } = this.state;
    const { message, hideMessage, showLoading } = this.props;
    return (
      <ContentApp>
        <LoaderLinear show={showLoading} />
        <MainTopBar>
          {/* <CategoriesFilter />
          <VisibilityFilter /> */}
          <Search />
          <ContentTopBarActions>
            <ButtonIcon onClick={() => {}} className="icon-filter" />
            <ButtonIcon
              onClick={() => this.setState({ isDialogAddOpen: true })}
              className="icon-add"
            />
          </ContentTopBarActions>
        </MainTopBar>
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
      </ContentApp>
    );
  }
}

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
