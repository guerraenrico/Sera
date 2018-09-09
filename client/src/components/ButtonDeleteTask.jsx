import React from 'react';
import PropTypes from 'prop-types';

const ButtonDeleteTask = ({ onClick }) => (
  <button className="button-delete-task" onClick={onClick}>
    <i className="icon-delete" />
  </button>
);

ButtonDeleteTask.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonDeleteTask;
