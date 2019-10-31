import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LoaderLinear from "~/components/LoaderLinear";
import Snackbar from "~/components/Snackbar";
import Switch from "~/components/Switch";

import Result from "./components/Result";

import * as messageActions from "~/actions/messageActions";
import * as resultsFiltersActions from "~/actions/resultsFiltersActions";
import * as resultsDataActions from "~/actions/resultsDataActions";

import * as commonSelectors from "~/selectors/commonSelectors";
import * as resultsFiltersSelectors from "~/selectors/resultsFiltersSelectors";
import * as resultsDataSelectors from "~/selectors/resultsDataSelectors";

import { TimeInterval } from "~/models/resultsData";

import Strings from "~/styles/strings";

import { ContentApp, MainTopBar, Container, ContentSwitches } from "./style";

class Results extends React.PureComponent {
  state = {};

  componentDidMount() {
    const { fetchResults } = this.props;
    fetchResults();
  }

  onSwitch = timeInterval => {
    const { changeTimeInterval } = this.props;
    changeTimeInterval(timeInterval);
  };

  render() {
    const {
      message,
      hideMessage,
      showLoading,
      timeInterval,
      resultsData
    } = this.props;

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
          <Result title={Strings().labelTasks} stats={resultsData.tasks} />
          <Result title={Strings().labelGoals} stats={resultsData.goals} />
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

Results.propTypes = {
  message: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    text: PropTypes.string
  }).isRequired,
  hideMessage: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired,
  changeTimeInterval: PropTypes.func.isRequired,
  showLoading: PropTypes.bool.isRequired,
  timeInterval: PropTypes.oneOf([
    TimeInterval.MONTH,
    TimeInterval.WEEK,
    TimeInterval.YEAR
  ]).isRequired,
  resultsData: PropTypes.shape({
    tasks: PropTypes.shape({
      completed: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired
    }).isRequired,
    goals: PropTypes.shape({
      completed: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired
    }).isRequired
  })
};

Results.defaultProps = {
  resultsData: {
    tasks: { completed: 0, total: 0 },
    goals: { completed: 0, total: 0 }
  }
};

const mapStateToProps = state => ({
  message: state.message,
  timeInterval: resultsFiltersSelectors.getTimeIntervalFilter(state),
  resultsData: resultsDataSelectors.getResultsData(state),
  showLoading: commonSelectors.showLoading(state)
});

const mapDispatchToProps = dispatch => ({
  hideMessage: () => {
    dispatch(messageActions.hideMessage());
  },
  changeTimeInterval: timeInterval => {
    dispatch(resultsFiltersActions.changeTimeInterval(timeInterval));
  },
  fetchResults: () => {
    dispatch(resultsDataActions.fetchResults());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);
