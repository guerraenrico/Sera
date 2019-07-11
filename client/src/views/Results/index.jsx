// @flow
import React from "react";
import { connect } from "react-redux";

import LoaderLinear from "~/components/LoaderLinear";
import Snackbar from "~/components/Snackbar";
import Switch from "~/components/Switch";

import Result from "./components/Result";

import * as messageActions from "~/actions/messageActions";
import * as resultsFiltersActions from "~/actions/resultsFiltersActions";
import * as commonSelectors from "~/selectors/commonSelectors";
import * as resultsFiltersSelectors from "~/selectors/resultsFiltersSelectors";

import type { MessageState } from "~/reducers/message";
import type { TimeInterval } from "~/reducers/resultsFilters";

import Strings from "~/styles/strings";

import { ContentApp, MainTopBar, Container, ContentSwitches } from "./style";

type Props = {
  +message: MessageState,
  +hideMessage: () => void,
  +showLoading: boolean,
  +timeInterval: TimeInterval,
  +dispatchChangeTimeInterval: TimeInterval => {}
};

type State = {};

class Results extends React.PureComponent<Props, State> {
  state = {};

  onSwitch = timeInterval => {
    const { dispatchChangeTimeInterval } = this.props;
    dispatchChangeTimeInterval(timeInterval);
  };

  render() {
    const { message, hideMessage, showLoading, timeInterval } = this.props;
    return (
      <ContentApp>
        <LoaderLinear show={showLoading} />
        <MainTopBar>
          <ContentSwitches>
            <Switch
              options={[
                {
                  name: "WEEK",
                  selected: timeInterval === "WEEK",
                  text: Strings().filterResultsWeek
                },
                {
                  name: "MONTH",
                  selected: timeInterval === "MONTH",
                  text: Strings().filterResultsMonth
                },
                {
                  name: "YEAR",
                  selected: timeInterval === "YEAR",
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
  timeInterval: resultsFiltersSelectors.getTimeIntervalFilter(state),
  showLoading: commonSelectors.showLoading(state)
});

const mapDispatchToProps = dispatch => ({
  hideMessage: () => {
    dispatch(messageActions.hideMessage());
  },
  dispatchChangeTimeInterval: (timeInterval: TimeInterval) => {
    dispatch(resultsFiltersActions.changeTimeInterval(timeInterval));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);
