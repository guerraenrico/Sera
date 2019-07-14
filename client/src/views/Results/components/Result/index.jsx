// @flow
import React from "react";

import ChartProgress from "~/components/ChartProgress";
import type { Stats } from "~/models/resultsData";

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

type Props = {
  +title: string,
  +first?: boolean,
  +stats?: Stats
};

const getPercentage = stats => {
  if (stats.total === 0) {
    return 0;
  }
  return (stats.completed / stats.total) * 100;
};

const Result = ({ title, first, stats }: Props) => (
  <Content first={first}>
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

Result.defaultProps = {
  first: false,
  stats: { completed: 0, total: 0 }
};

export default Result;
