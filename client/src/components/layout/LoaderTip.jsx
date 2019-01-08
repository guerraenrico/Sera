import React from 'react';
import PropTypes from 'prop-types';

const LoaderTip = ({ phrase, author }) => (
  <div id="content-loader-tip">
    <h1>{phrase}</h1>
    <h3>{author}</h3>
  </div>
);

LoaderTip.propTypes = {
  phrase: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default LoaderTip;
