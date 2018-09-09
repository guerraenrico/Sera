import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import labels from '../../constants/labels';
import { SELECT_COMPLETE_DATE } from '../../constants/steps';
import { showMessageInfo } from '../../actions/messageActions';

class AddTask extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
    };
    this.onInputTextChange = this.onInputTextChange.bind(this);
    this.onButtonScheduleClick = this.onButtonScheduleClick.bind(this);
  }

  onInputTextChange(name) {
    return (e) => {
      this.setState({ [name]: e.target.value });
    };
  }

  onButtonScheduleClick() {
    const { options, dispatch, onNext } = this.props;
    const { title, description } = this.state;
    const category = options.selectedCategory;
    if (title === '') {
      dispatch(showMessageInfo(labels.msgTitleRequired));
      return;
    }
    onNext({ stepId: SELECT_COMPLETE_DATE, options: { title, description, category } });
  }

  render() {
    const { selectedCategory } = this.props.options;
    return (
      <div className="content-add-argument">
        <h2>{labels.titleAddTask}</h2>
        <h3>
          {labels.labelForCategory}
          <span className="label-category-name">
            {` ${selectedCategory.name}`}
          </span>
        </h3>
        <div className="content-fields">
          <input
            className="main-input"
            type="text"
            placeholder={labels.placeHolderTitle}
            onChange={this.onInputTextChange('title')}
          />
          <input
            className="main-input"
            type="text"
            placeholder={labels.placeHolderDescription}
            onChange={this.onInputTextChange('description')}
          />
        </div>
        <div>
          <button
            className="main-button"
            onClick={this.onButtonScheduleClick}
          >
            {labels.buttonSchedule}
          </button>
        </div>
      </div>
    );
  }
}

AddTask.propTypes = {
  dispatch: PropTypes.func.isRequired,
  options: PropTypes.shape({
    selectedCategory: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onNext: PropTypes.func.isRequired,
};

export default connect()(AddTask);
