import React from "react";
import PropTypes from "prop-types";
import { LoaderTip, H1, H3 } from "./style";

const LoaderTipComponent = ({ phrase, author }) => (
  <LoaderTip>
    <H1>{phrase}</H1>
    <H3>{author}</H3>
  </LoaderTip>
);

LoaderTipComponent.propTypes = {
  phrase: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
};

export default LoaderTipComponent;
