export const isFetchingTasks = state => state.todoTasks.isFetching;
export const getTasks = state => state.todoTasks;
export const getTaskList = state => state.todoTasks.items;
export const getSkip = state => state.todoTasks.skip;
export const stillMoreToLoad = state => state.todoTasks.moreToLoad;
