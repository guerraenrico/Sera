import React from "react";
import PropTypes from "prop-types";
import Collapse from "../../anims/Collapse";
import Fade from "../../anims/Fade";
import ButtonCompleteTask from "./ButtonCompleteTask";
import ButtonDeleteTask from "./ButtonDeleteTask";
import { toSimpleDateFormat } from "../../../utils/Common";
import labels from "../../../constants/labels";

class Task extends React.Component {
  state = {
    collapsed: false
  };

  onTitleClick = () => {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  };

  renderDate() {
    const { task } = this.props;
    if (task.completed) {
      return (
        <p className="complete-date">
          {`${labels.labelPartialCompleted} ${
            task.completedAt ? toSimpleDateFormat(task.completedAt) : ""
          }`}
        </p>
      );
    }
    return (
      <p className="complete-within-date">
        {`${labels.labelPartialToCompleted} ${
          task.todoWithin
            ? toSimpleDateFormat(task.todoWithin)
            : labels.labelNotSet
        }`}
      </p>
    );
  }

  render() {
    const { task, onDelete, onComplete } = this.props;
    const { collapsed } = this.state;
    return (
      <div className="task-item">
        <div className="task-header">
          <p
            className={`task-title ${
              task.completed ? "task-title-completed" : ""
            }`}
            onClick={() => this.onTitleClick()}
            role="presentation"
          >
            {task.title}
          </p>
          <Fade in={collapsed}>
            <ButtonDeleteTask onClick={onDelete} />
          </Fade>
          {onComplete !== undefined && (
            <ButtonCompleteTask
              onClick={onComplete}
              completed={task.completed}
            />
          )}
        </div>
        <div className="task-date">{this.renderDate()}</div>
        <Collapse in={collapsed}>
          <div key={task.description} className="task-body">
            <p className="task-description">
              {task.description !== undefined && task.description !== "" ? (
                task.description
              ) : (
                <span className="empty">{labels.labelNoDescription}</span>
              )}
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
    completedAt: PropTypes.shape({})
  }).isRequired
};

Task.defaultProps = {
  onDelete: undefined,
  onComplete: undefined
};

export default Task;
