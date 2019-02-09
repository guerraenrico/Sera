// @flow
export type Task = {
  id: string,
  title: string,
  description: string,
  completed: boolean,
  todoWithin: Date | void,
  completedAt: Date | void,
  categoryId: string,
  createdAt: Date,
  userId: string
};
