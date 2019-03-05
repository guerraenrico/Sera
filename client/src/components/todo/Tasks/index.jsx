// @flow
import React from "react";
import { connect } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import Resize from "../../anims/Resize";
import TaskComponent from "../Task";
import InfiniteScroll from "../../layout/InfiniteScroll";
import { queryItemsLimit } from "../../../constants/config";

import * as todoTasksActions from "../../../actions/todoTasksActions";
import * as todoTasksSelectors from "../../../selectors/todoTasksSelectors";
import * as todoFiltersSelectors from "../../../selectors/todoFiltersSelectors";

import type { Task } from "../../../models/task";

import { Container } from "./style";

type Props = {
  onDeleteTask: Task => void,
  onCompleteTask: Task => void,
  taskList: Array<Task>,
  moreToLoad: boolean,
  fetchTasks: (Array<string>, boolean, number, number) => void,
  categoriesId: Array<string>,
  completed: boolean,
  // eslint-disable-next-line
  skip: number
};

type State = {
  limit: number,
  skip: number
};

const initialState: State = {
  limit: queryItemsLimit,
  skip: 0
};

class Tasks extends React.Component<Props, State> {
  state = initialState;

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
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
      <Container>
        <InfiniteScroll onScroll={this.onFetchTodoTasksNext}>
          <TransitionGroup>
            {taskList.map((task, i) => (
              <Resize key={task.id}>
                <TaskComponent
                  key={task.id}
                  last={i === taskList.length - 1}
                  task={task}
                  onDelete={() => onDeleteTask(task)}
                  onComplete={() => onCompleteTask(task)}
                />
              </Resize>
            ))}
          </TransitionGroup>
        </InfiniteScroll>
      </Container>
    );
  }
}

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
