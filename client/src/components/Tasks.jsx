import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import Resize from './anims/Resize';
import Task from './Task';
import InfiniteScroll from './InfiniteScroll';
import { queryItemsLimit } from '../constants/config';

const initialState = {
  limit: queryItemsLimit,
  skip: 0,
};

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onFetchTodoTasksNext = this.onFetchTodoTasksNext.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.skip !== prevState.skip) {
      return {
        skip: nextProps.skip,
      };
    }
    return null;
  }

  onFetchTodoTasksNext() {
    const {
      categoriesId, completed,
      fetchTasks, moreToLoad,
    } = this.props;
    if (!moreToLoad) {
      return;
    }
    const { limit, skip } = this.state;
    const newSkip = skip + limit;
    this.setState({ skip: newSkip });
    fetchTasks(categoriesId, completed, limit, newSkip);
  }

  render() {
    const {
      taskList,
      onDeleteTask,
      onCompleteTask,
    } = this.props;
    return (
      <div id="content-todo-tasks">
        <InfiniteScroll onScroll={this.onFetchTodoTasksNext}>
          <TransitionGroup>
            {
              taskList.map(arg => (
                <Resize key={arg.id}>
                  <Task
                    key={arg.id}
                    task={arg}
                    onDelete={() => onDeleteTask(arg)}
                    onComplete={() => onCompleteTask(arg)}
                  />
                </Resize>
              ))
            }
          </TransitionGroup>
        </InfiniteScroll>
      </div>
    );
  }
}

Tasks.propTypes = {
  onDeleteTask: PropTypes.func.isRequired,
  onCompleteTask: PropTypes.func.isRequired,
  taskList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  moreToLoad: PropTypes.bool.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  categoriesId: PropTypes.arrayOf(PropTypes.string).isRequired,
  completed: PropTypes.bool.isRequired,
};

export default Tasks;
