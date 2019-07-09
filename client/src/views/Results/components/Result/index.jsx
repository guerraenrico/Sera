// @flow
import React from "react";

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

type Props = {
  +title: string,
  +first: boolean
};

const Result = ({ title, first }: Props) => (
  <Content first={first}>
    <Title>{title}</Title>
    <ContainerStats>
      <ContentChart>
        <ChartProgress progress={70} />
      </ContentChart>
      <ContentCaption>
        <Caption>
          <CaptionText>
            <span>50</span>
            <SmallText> of </SmallText>
            <span>100</span>
          </CaptionText>
        </Caption>
      </ContentCaption>
    </ContainerStats>
  </Content>
);

export default Result;
