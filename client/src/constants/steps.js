import labels from './labels';

export const SELECT_WANT_TO_ADD = 'SELECT_WANT_TO_ADD';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_TASK = 'ADD_TASK';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const SELECT_COMPLETE_DATE = 'SELECT_COMPLETE_DATE';
export const DONE = 'DONE';

export const stepList = [
  {
    id: SELECT_WANT_TO_ADD,
    description: labels.stepDescWantToAdd,
  },
  {
    id: ADD_CATEGORY,
    description: labels.stepDescAddCategory,
  },
  {
    id: SELECT_CATEGORY,
    description: labels.stepDescrSelecCategory,
  },
  {
    id: ADD_TASK,
    description: labels.stepDescAddTask,
  },
  {
    id: SELECT_COMPLETE_DATE,
    description: labels.stepDescCompleteDate,
  },
  {
    id: DONE,
    description: labels.stepDescDone,
  },
];
