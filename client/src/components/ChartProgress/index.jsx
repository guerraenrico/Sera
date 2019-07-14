import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import {
  ContentChart,
  ChartTotal,
  ChartProgress,
  defaultChartColor
} from "./styles";

const DEFAULT_ANIMANTION_DELAY = 1000;

class ChartProgressComponent extends PureComponent {
  static defaultProps = {
    radius: 120,
    progress: 100,
    strokeWidth: 8,
    dimension: 250,
    color: defaultChartColor
  };

  state = {
    setStrokeLength: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ setStrokeLength: true });
    }, DEFAULT_ANIMANTION_DELAY);
  }

  render() {
    const { setStrokeLength } = this.state;
    const { radius, progress, strokeWidth, dimension, color } = this.props;

    const circleRadius = Math.min(radius, 120);
    const circumference = 2 * 3.14 * circleRadius;
    const strokeLength = setStrokeLength ? (circumference / 100) * progress : 0;
    return (
      <ContentChart className={strokeLength === 0 ? "no-progress" : ""}>
        <svg viewBox="0 0 250 250" width={dimension} height={dimension}>
          <ChartTotal
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            cx="125"
            cy="125"
            r={circleRadius}
          />
          <ChartProgress
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${strokeLength},${circumference}`}
            strokeLinecap="round"
            fill="none"
            cx="125"
            cy="125"
            r={circleRadius}
          />
        </svg>
      </ContentChart>
    );
  }
}

ChartProgressComponent.propTypes = {
  radius: PropTypes.number,
  strokeWidth: PropTypes.number,
  color: PropTypes.string,
  progress: PropTypes.number,
  dimension: PropTypes.number
};

export default ChartProgressComponent;
