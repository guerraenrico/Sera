import React from "react";
import PropTypes from "prop-types";

import ChartProgress from "~/components/ChartProgress";

import {
  Content,
  Title,
  ContentChart,
  ContentCaption,
  Caption,
  CaptionText,
  SmallText,
  ContainerStats
} from "./style";

const getPercentage = stats => {
  if (stats.total === 0) {
    return 0;
  }
  return (stats.completed / stats.total) * 100;
};

const Result = ({ title, stats }) => (
  <Content>
    <Title>{title}</Title>
    <ContainerStats>
      <ContentChart>
        <ChartProgress progress={getPercentage(stats)} />
      </ContentChart>
      <ContentCaption>
        <Caption>
          <CaptionText>
            <span>{stats.completed}</span>
            <SmallText> of </SmallText>
            <span>{stats.total}</span>
          </CaptionText>
        </Caption>
      </ContentCaption>
    </ContainerStats>
  </Content>
);

Result.propTypes = {
  title: PropTypes.string.isRequired,
  stats: PropTypes.shape({
    completed: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  }).isRequired
};

export default Result;
