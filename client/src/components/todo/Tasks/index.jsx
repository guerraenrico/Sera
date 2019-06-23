// @flow
import React from "react";
import { connect } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Resize from "../../anims/Resize";
import TaskComponent from "../Task";
import InfiniteScroll from "../../layout/InfiniteScroll";

import { setSelectedCategory } from "../../../actions/todoFiltersActions";
import * as todoTasksActions from "../../../actions/todoTasksActions";
import * as todoTasksSelectors from "../../../selectors/todoTasksSelectors";
import * as todoFiltersSelectors from "../../../selectors/todoFiltersSelectors";

import type { Task } from "../../../models/task";
import type { Category } from "../../../models/category";
import type { Response } from "../../../models/response";

import { Container } from "./style";

type Props = {
  +onDeleteTask: Task => void,
  +onCompleteTask: Task => void,
  +doAddTask: Task => Promise<Response>,
  +doSetSelectedCategory: Category => void,
  +doSetCategoryToTask: (Task, Category) => void,
  +doCreateAndSetCategoryToTask: (Task, string) => void,
  +doRemoveCategoryToTask: (Task, Category) => void,
  +doChangeTaskOrder: (number, number, string) => void,
  +taskList: Array<Task>,
  +moreToLoad: boolean,
  +fetchTasks: (string, boolean, number, ?number) => void,
  +categoryFilterId: string,
  +completed: boolean,
  // eslint-disable-next-line
  +skip: number,
  +creatingTask: boolean,
  +onAbortCreatingTask: () => void
};

type State = {};

const initialState: State = {};

class Tasks extends React.PureComponent<Props, State> {
  state = initialState;

  componentDidMount() {
    const { categoryFilterId, completed, fetchTasks, skip } = this.props;
    fetchTasks(categoryFilterId, completed, skip);
  }

  onFetchTodoTasksNext = () => {
    // TODO: Fix load more issues - task may be mixed on load
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

  onDragEnd = result => {
    const { doChangeTaskOrder } = this.props;
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    doChangeTaskOrder(source.index, destination.index, draggableId);
  };

  render() {
    const {
      taskList,
      onDeleteTask,
      onCompleteTask,
      doAddTask,
      doSetSelectedCategory,
      doSetCategoryToTask,
      doCreateAndSetCategoryToTask,
      doRemoveCategoryToTask,
      creatingTask,
      onAbortCreatingTask
    } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          <InfiniteScroll onScroll={this.onFetchTodoTasksNext}>
            <Droppable droppableId="tasks">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <TransitionGroup>
                    {creatingTask && (
                      <Resize key="creation_task">
                        <TaskComponent
                          creating
                          onUndo={onAbortCreatingTask}
                          onCreate={async (task: Task) => {
                            const response = await doAddTask(task);
                            if (response.success) {
                              onAbortCreatingTask();
                            }
                          }}
                        />
                      </Resize>
                    )}
                    {taskList.map((task, i) => (
                      <Resize key={`rsz${task.id}`}>
                        <TaskComponent
                          key={task.id}
                          index={i}
                          task={task}
                          onDelete={() => onDeleteTask(task)}
                          onComplete={() => onCompleteTask(task)}
                          onCategoryClick={category =>
                            doSetSelectedCategory(category)
                          }
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
                    {provided.placeholder}
                  </TransitionGroup>
                </div>
              )}
            </Droppable>
          </InfiniteScroll>
        </Container>
      </DragDropContext>
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
  onDeleteTask: (task: Task) => dispatch(todoTasksActions.deleteTask(task.id)),
  onCompleteTask: (task: Task) =>
    dispatch(todoTasksActions.toggleTaskCompleted(task.id, task.completed)),
  doAddTask: (task: Task) =>
    dispatch(
      todoTasksActions.addTask(
        task.title,
        task.description,
        undefined,
        task.todoWithin
      )
    ),
  doSetSelectedCategory: (category: Category) =>
    dispatch(setSelectedCategory(category)),
  doSetCategoryToTask: (task: Task, category: Category) =>
    dispatch(todoTasksActions.setCategoryToTask(task, category)),
  doCreateAndSetCategoryToTask: (task: Task, name: string) =>
    dispatch(todoTasksActions.createAndSetCategoryToTask(task, name)),
  doRemoveCategoryToTask: (task: Task, category: Category) =>
    dispatch(todoTasksActions.removeCategoryToTask(task, category)),
  doChangeTaskOrder: (
    previousIndex: number,
    nextIndex: number,
    taskId: string
  ) =>
    dispatch(
      todoTasksActions.changeTaskOrder(previousIndex, nextIndex, taskId)
    ),
  fetchTasks: (
    categoryFilterId: string,
    completed: boolean,
    skip: number,
    limit: number
  ) =>
    dispatch(
      todoTasksActions.fetchTasksByCategory(
        categoryFilterId ? [categoryFilterId] : [],
        completed,
        skip,
        limit
      )
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
