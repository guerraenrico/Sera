// @flow
import React from "react";
import { connect } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import Resize from "../../anims/Resize";
import TaskComponent from "../Task";
import InfiniteScroll from "../../layout/InfiniteScroll";

import { setSelectedCategory } from "../../../actions/todoFiltersActions";
import * as todoTasksActions from "../../../actions/todoTasksActions";
import * as todoTasksSelectors from "../../../selectors/todoTasksSelectors";
import * as todoFiltersSelectors from "../../../selectors/todoFiltersSelectors";

import type { Task } from "../../../models/task";
import type { Category } from "../../../models/category";

import { Container, itemAnimationStyle } from "./style";

type Props = {
  +onDeleteTask: Task => void,
  +onCompleteTask: Task => void,
  +doSetSelectedCategory: Category => void,
  +doSetCategoryToTask: (Task, Category) => void,
  +doCreateAndSetCategoryToTask: (Task, string) => void,
  +doRemoveCategoryToTask: (Task, Category) => void,
  +taskList: Array<Task>,
  +moreToLoad: boolean,
  +fetchTasks: (string, boolean, number, ?number) => void,
  +categoryFilterId: string,
  +completed: boolean,
  // eslint-disable-next-line
  +skip: number
};

type State = {};

const initialState: State = {};

class Tasks extends React.Component<Props, State> {
  state = initialState;

  componentDidMount() {
    const { categoryFilterId, completed, fetchTasks, skip } = this.props;
    fetchTasks(categoryFilterId, completed, skip);
  }

  onFetchTodoTasksNext = () => {
    const {
      categoryFilterId,
      completed,
      fetchTasks,
      moreToLoad,
      skip
    } = this.props;
    if (!moreToLoad) {
      return;
    }
    fetchTasks(categoryFilterId, completed, skip);
  };

  render() {
    const {
      taskList,
      onDeleteTask,
      onCompleteTask,
      doSetSelectedCategory,
      doSetCategoryToTask,
      doCreateAndSetCategoryToTask,
      doRemoveCategoryToTask
    } = this.props;
    return (
      <Container>
        <InfiniteScroll onScroll={this.onFetchTodoTasksNext}>
          <TransitionGroup>
            {taskList.map((task, i) => (
              <Resize
                key={`rsz${task.id}`}
                style={itemAnimationStyle(i === taskList.length - 1)}
              >
                <TaskComponent
                  key={task.id}
                  task={task}
                  onDelete={() => onDeleteTask(task)}
                  onComplete={() => onCompleteTask(task)}
                  onCategoryClick={category => doSetSelectedCategory(category)}
                  onSetCategory={category =>
                    doSetCategoryToTask(task, category)
                  }
                  onCreateCategory={name =>
                    doCreateAndSetCategoryToTask(task, name)
                  }
                  onRemoveCategory={category =>
                    doRemoveCategoryToTask(task, category)
                  }
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
  doSetSelectedCategory: category => dispatch(setSelectedCategory(category)),
  doSetCategoryToTask: (task, category) =>
    dispatch(todoTasksActions.setCategoryToTask(task, category)),
  doCreateAndSetCategoryToTask: (task, name) =>
    dispatch(todoTasksActions.createAndSetCategoryToTask(task, name)),
  doRemoveCategoryToTask: (task, category) =>
    dispatch(todoTasksActions.removeCategoryToTask(task, category)),
  fetchTasks: (categoryFilterId, completed, skip, limit) => {
    dispatch(
      todoTasksActions.fetchTasksByCategory(
        categoryFilterId && [categoryFilterId],
        completed,
        skip,
        limit
      )
    );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
