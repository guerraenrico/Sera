import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { TransitionGroup } from "react-transition-group";
import Resize from "../../anims/Resize";
import Task from "../Task";
import InfiniteScroll from "../../layout/InfiniteScroll";
import { queryItemsLimit } from "../../../constants/config";

import * as todoTasksActions from "../../../actions/todoTasksActions";
import * as todoTasksSelectors from "../../../selectors/todoTasksSelectors";
import * as todoFiltersSelectors from "../../../selectors/todoFiltersSelectors";

const initialState = {
  limit: queryItemsLimit,
  skip: 0
};

class Tasks extends React.Component {
  state = initialState;

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.skip !== prevState.skip) {
      return {
        skip: nextProps.skip
      };
    }
    return null;
  }

  onFetchTodoTasksNext = () => {
    const { categoriesId, completed, fetchTasks, moreToLoad } = this.props;
    if (!moreToLoad) {
      return;
    }
    const { limit, skip } = this.state;
    const newSkip = skip + limit;
    fetchTasks(categoriesId, completed, limit, newSkip);
    this.setState(state => ({ skip: state.skip + state.limit }));
  };

  render() {
    const { taskList, onDeleteTask, onCompleteTask } = this.props;
    return (
      <div id="content-todo-tasks">
        <InfiniteScroll onScroll={this.onFetchTodoTasksNext}>
          <TransitionGroup>
            {taskList.map(arg => (
              <Resize key={arg.id}>
                <Task
                  key={arg.id}
                  task={arg}
                  onDelete={() => onDeleteTask(arg)}
                  onComplete={() => onCompleteTask(arg)}
                />
              </Resize>
            ))}
          </TransitionGroup>
        </InfiniteScroll>
      </div>
    );
  }
}

Tasks.propTypes = {
  onDeleteTask: PropTypes.func.isRequired,
  onCompleteTask: PropTypes.func.isRequired,
  taskList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired,
  moreToLoad: PropTypes.bool.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  categoriesId: PropTypes.arrayOf(PropTypes.string).isRequired,
  completed: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  taskList: todoTasksSelectors.getTaskList(state),
  skip: todoTasksSelectors.getSkip(state),
  moreToLoad: todoTasksSelectors.stillMoreToLoad(state),
  categoriesId: todoFiltersSelectors.getSelectedCategoriesId(state),
  completed: todoFiltersSelectors.visibilityOnlyCompleted(state)
});

const mapDispatchToProps = dispatch => ({
  onDeleteTask: task => {
    dispatch(todoTasksActions.deleteTask(task.id));
  },
  onCompleteTask: task => {
    dispatch(todoTasksActions.toogleTaskCompleted(task.id, task.completed));
  },
  fetchTasks: (categoriesId, completed, limit, skip) => {
    dispatch(
      todoTasksActions.fetchTasksByCategory(
        categoriesId,
        completed,
        limit,
        skip
      )
    );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
