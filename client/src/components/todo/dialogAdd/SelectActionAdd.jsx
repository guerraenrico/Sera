import React from 'react';
import PropTypes from 'prop-types';

import { ADD_CATEGORY, SELECT_CATEGORY } from '../../../constants/steps';
import labels from '../../../constants/labels';

const SelectActionAdd = ({ onNext }) => (
  <div className="content-select-action-add">
    <h2>{labels.titleAdd}</h2>
    <div className="item-select">
      <p
        className="select-title"
        onClick={() => onNext({ stepId: ADD_CATEGORY, options: {} })}
        role="presentation"
      >
        {labels.labelCategory}
      </p>
    </div>
    <div className="item-select">
      <p
        className="select-title"
        onClick={() => onNext({ stepId: SELECT_CATEGORY, options: {} })}
        role="presentation"
      >
        {labels.labelTask}
      </p>
    </div>
  </div>
);

SelectActionAdd.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default SelectActionAdd;
