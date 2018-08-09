import React from 'react';
import PropTypes from 'prop-types';
import Collapse from './anims/Collapse';
import Fade from './anims/Fade';
import ButtonCompleteArgument from './ButtonCompleteArgument';
import ButtonDeleteArgument from './ButtonDeleteArgument';
import { toSimpleDateFormat } from '../utils/Common';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.renderDate = this.renderDate.bind(this);
  }

  onTitleClick() {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  }

  renderDate() {
    const { task } = this.props;
    if (task.completed) {
      return (
        <p className="complete-date">{`completed ${(task.completedAt) ? toSimpleDateFormat(task.completedAt) : ''}`}</p>
      );
    }
    return (
      <p className="complete-within-date">{`to complete within ${(task.todoWithin) ? toSimpleDateFormat(task.todoWithin) : 'not set'}`}</p>
    );
  }

  render() {
    const { task, onDelete, onComplete } = this.props;
    const { collapsed } = this.state;
    return (
      <div className="argument-item">
        <div className="argument-header">
          <p
            className={`argument-title ${(task.completed) ? 'argument-title-completed' : ''}`}
            onClick={() => this.onTitleClick()}
            role="presentation"
          >
            {task.title}
          </p>
          <Fade in={collapsed}>
            <ButtonDeleteArgument
              onClick={onDelete}
            />
          </Fade>
          {
            onComplete !== undefined &&
            <ButtonCompleteArgument
              onClick={onComplete}
              completed={task.completed}
            />
          }
        </div>
        <div className="argument-date">
          {this.renderDate()}
        </div>
        <Collapse in={collapsed}>
          <div key={task.description} className="argument-body">
            <p className="argument-description">
              {
                (task.description !== undefined && task.description !== '')
                ? task.description : <span className="empty">No description to show :(</span>
              }
            </p>
          </div>
        </Collapse>
      </div>
    );
  }
}

Task.propTypes = {
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    completedAt: PropTypes.shape({}),
  }).isRequired,
};

Task.defaultProps = {
  onDelete: undefined,
  onComplete: undefined,
};

export default Task;
