// @flow
import React from "react";
import { connect } from "react-redux";

import LoaderLinear from "~/components/LoaderLinear";
import Snackbar from "~/components/Snackbar";
import Switch from "~/components/Switch";

import Result from "./components/Result";

import * as messageActions from "~/actions/messageActions";
import * as commonSelectors from "~/selectors/commonSelectors";

import type { MessageState } from "~/reducers/message";

import Strings from "~/styles/strings";

import { ContentApp, MainTopBar, Container, ContentSwitches } from "./style";

type Props = {
  +message: MessageState,
  +hideMessage: () => void,
  +showLoading: boolean
};

type State = {};

class Results extends React.PureComponent<Props, State> {
  state = {};

  onSwitch = () => {};

  render() {
    const { message, hideMessage, showLoading } = this.props;
    return (
      <ContentApp>
        <LoaderLinear show={showLoading} />
        <MainTopBar>
          <ContentSwitches>
            <Switch
              options={[
                {
                  name: "WEEK",
                  selected: false,
                  text: Strings().filterResultsWeek
                },
                {
                  name: "MONTH",
                  selected: true,
                  text: Strings().filterResultsMonth
                },
                {
                  name: "YEAR",
                  selected: false,
                  text: Strings().filterResultsYear
                }
              ]}
              onOptionClick={this.onSwitch}
              role="presentation"
            />
          </ContentSwitches>
        </MainTopBar>
        <Container>
          <Result title={Strings().labelTasks} first />
          <Result title={Strings().labelGoals} />
        </Container>

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
