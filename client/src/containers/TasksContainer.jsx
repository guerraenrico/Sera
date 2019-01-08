import { connect } from 'react-redux';
import Tasks from '../components/todo/task/Tasks';
import {
  fetchTasksByCategory,
  deleteTask,
  toogleTaskCompleted,
} from '../actions/todoTasksActions';

import { getTaskList, getSkip, stillMoreToLoad } from '../selectors/todoTasksSelectors';
import { getSelectedCategoriesId, visibilityOnlyCompleted } from '../selectors/todoFiltersSelectors';

const mapStateToProps = state => (
  {
    taskList: getTaskList(state),
    skip: getSkip(state),
    moreToLoad: stillMoreToLoad(state),
    categoriesId: getSelectedCategoriesId(state),
    completed: visibilityOnlyCompleted(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    onDeleteTask: (task) => {
      dispatch(deleteTask(task.id));
    },
    onCompleteTask: (task) => {
      dispatch(toogleTaskCompleted(task.id, task.completed));
    },
    fetchTasks: (categoriesId, completed, limit, skip) => {
      dispatch(fetchTasksByCategory(categoriesId, completed, limit, skip));
    },
  }
);

const TasksContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks);

export default TasksContainer;
