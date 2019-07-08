// @flow
import React from "react";

import ChartProgress from "~/components/ChartProgress";

import { Content, Title, ContentChart } from "./style";

type Props = {
  +title: string,
  +first: boolean
};

const Result = ({ title, first }: Props) => (
  <Content first={first}>
    <Title>{title}</Title>
    <ContentChart>
      <ChartProgress progress={70} />
    </ContentChart>
  </Content>
);

export default Result;
