// @flow
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Resize from "~/components/anims/Resize";
import TaskComponent from "../Task";
import InfiniteScroll from "~/components/InfiniteScroll";

import * as todoFiltersActions from "~/actions/todoFiltersActions";
import * as todoTasksActions from "~/actions/todoTasksActions";
import * as todoTasksSelectors from "~/selectors/todoTasksSelectors";
import * as todoFiltersSelectors from "~/selectors/todoFiltersSelectors";

import { Container } from "./style";

const initialState = {};

class Tasks extends React.PureComponent {
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

  onDragEnd = result => {
    const { changeTaskOrder } = this.props;
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
    changeTaskOrder(source.index, destination.index, draggableId);
  };

  render() {
    const {
      taskList,
      deleteTask,
      completeTask,
      completed,
      addTask,
      setSelectedCategory,
      setCategoryToTask,
      createAndSetCategoryToTask,
      removeCategoryToTask,
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
                          onCreate={async task => {
                            const response = await addTask(task);
                            if (response.success) {
                              onAbortCreatingTask();
                            }
                          }}
                        />
                      </Resize>
                    )}
                    {taskList &&
                      taskList
                        .filter(task => task.completed === completed)
                        .map((task, i) => (
                          <Resize key={`rsz${task.id}`}>
                            <TaskComponent
                              key={task.id}
                              index={i}
                              task={task}
                              onDelete={() => deleteTask(task)}
                              onComplete={() => completeTask(task)}
                              onCategoryClick={category =>
                                setSelectedCategory(category)
                              }
                              onSetCategory={category =>
                                setCategoryToTask(task, category)
                              }
                              onCreateCategory={name =>
                                createAndSetCategoryToTask(task, name)
                              }
                              onRemoveCategory={category =>
                                removeCategoryToTask(task, category)
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

Tasks.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  completeTask: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  setCategoryToTask: PropTypes.func.isRequired,
  createAndSetCategoryToTask: PropTypes.func.isRequired,
  removeCategoryToTask: PropTypes.func.isRequired,
  changeTaskOrder: PropTypes.func.isRequired,
  taskList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      todoWithin: PropTypes.instanceOf(Date).isRequired,
      completedAt: PropTypes.instanceOf(Date),
      createdAt: PropTypes.instanceOf(Date).isRequired,
      userId: PropTypes.string.isRequired,
      categories: PropTypes.arrayOf(PropTypes.shape())
    })
  ).isRequired,
  moreToLoad: PropTypes.bool.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  categoryFilterId: PropTypes.string,
  completed: PropTypes.bool.isRequired,
  skip: PropTypes.number.isRequired,
  creatingTask: PropTypes.bool.isRequired,
  onAbortCreatingTask: PropTypes.func.isRequired
};

Tasks.defaultProps = {
  categoryFilterId: undefined
};

const mapStateToProps = state => ({
  taskList: todoTasksSelectors.getTaskList(state),
  skip: todoTasksSelectors.getSkip(state),
  moreToLoad: todoTasksSelectors.stillMoreToLoad(state),
  categoryFilterId: todoFiltersSelectors.getSelectedCategoryId(state),
  completed: todoFiltersSelectors.visibilityOnlyCompleted(state)
});

const mapDispatchToProps = dispatch => ({
  deleteTask: task => dispatch(todoTasksActions.deleteTask(task.id)),
  completeTask: task =>
    dispatch(todoTasksActions.toggleTaskCompleted(task.id, task.completed)),
  addTask: task =>
    dispatch(
      todoTasksActions.addTask(
        task.title,
        task.description,
        undefined,
        task.todoWithin
      )
    ),
  setSelectedCategory: category =>
    dispatch(todoFiltersActions.setSelectedCategory(category)),
  setCategoryToTask: (task, category) =>
    dispatch(todoTasksActions.setCategoryToTask(task, category)),
  createAndSetCategoryToTask: (task, name) =>
    dispatch(todoTasksActions.createAndSetCategoryToTask(task, name)),
  removeCategoryToTask: (task, category) =>
    dispatch(todoTasksActions.removeCategoryToTask(task, category)),
  changeTaskOrder: (previousIndex, nextIndex, taskId) =>
    dispatch(
      todoTasksActions.changeTaskOrder(previousIndex, nextIndex, taskId)
    ),
  fetchTasks: (categoryFilterId, completed, skip, limit) =>
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
