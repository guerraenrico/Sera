// @flow
import React from "react";
import { connect } from "react-redux";

import LoaderLinear from "~/components/LoaderLinear";
import ButtonIcon from "~/components/ButtonIcon";
import Snackbar from "~/components/Snackbar";

import * as messageActions from "~/actions/messageActions";
import * as commonSelectors from "~/selectors/commonSelectors";

import type { MessageState } from "~/reducers/message";

import * as paths from "~/constants/paths";

import { ContentApp, MainTopBar, ContentTopBarActions } from "./style";

type Props = {
  message: MessageState,
  hideMessage: () => void,
  showLoading: boolean
};

type State = {};

class Results extends React.PureComponent<Props, State> {
  state = {};

  render() {
    const { message, hideMessage, showLoading } = this.props;
    return (
      <ContentApp>
        <LoaderLinear show={showLoading} />
        <MainTopBar>
          <p>In development</p>
        </MainTopBar>

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
)(Results);
