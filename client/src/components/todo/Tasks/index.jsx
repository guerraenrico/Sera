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

import { Container, itemAnimationStyle } from "./style";

type Props = {
  onDeleteTask: Task => void,
  onCompleteTask: Task => void,
  taskList: Array<Task>,
  moreToLoad: boolean,
  fetchTasks: (string, boolean, number, number) => void,
  categoryFilterId: string,
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

  componentDidMount() {
    const { categoryFilterId, completed, fetchTasks } = this.props;
    const { limit, skip } = this.state;
    fetchTasks(categoryFilterId, completed, limit, skip);
    this.setState(state => ({ skip: state.skip + state.limit }));
  }

  onFetchTodoTasksNext = () => {
    const { categoryFilterId, completed, fetchTasks, moreToLoad } = this.props;
    if (!moreToLoad) {
      return;
    }
    const { limit, skip } = this.state;
    const newSkip = skip + limit;
    fetchTasks(categoryFilterId, completed, limit, newSkip);
    this.setState(state => ({ skip: state.skip + state.limit }));
  };

  render() {
    const { taskList, onDeleteTask, onCompleteTask } = this.props;
    return (
      <Container>
        <InfiniteScroll onScroll={this.onFetchTodoTasksNext}>
          <TransitionGroup>
            {taskList.map((task, i) => (
              <Resize
                key={task.id}
                style={itemAnimationStyle(i === taskList.length - 1)}
              >
                <TaskComponent
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
  categoryFilterId: todoFiltersSelectors.getSelectedCategoryId(state),
  completed: todoFiltersSelectors.visibilityOnlyCompleted(state)
});

const mapDispatchToProps = dispatch => ({
  onDeleteTask: task => {
    dispatch(todoTasksActions.deleteTask(task.id));
  },
  onCompleteTask: task => {
    dispatch(todoTasksActions.toogleTaskCompleted(task.id, task.completed));
  },
  fetchTasks: (categoryFilterId, completed, limit, skip) => {
    dispatch(
      todoTasksActions.fetchTasksByCategory(
        categoryFilterId && [categoryFilterId],
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
