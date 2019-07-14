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

const Result = ({ title, first, stats }: Props) => (
  <Content first={first}>
    <Title>{title}</Title>
    <ContainerStats>
      <ContentChart>
        <ChartProgress progress={(stats.completed / stats.total) * 100} />
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
