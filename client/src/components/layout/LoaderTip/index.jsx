// @flow
import React from "react";
import { LoaderTip, H1, H3 } from "./style";

type Props = {
  phrase: string,
  author: string
};

const LoaderTipComponent = ({ phrase, author }: Props) => (
  <LoaderTip>
    <H1>{phrase}</H1>
    <H3>{author}</H3>
  </LoaderTip>
);

export default LoaderTipComponent;
