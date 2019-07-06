// @flow
import type { Category } from "./category";

export type Task = {
  id: string,
  title: string,
  description: string,
  completed: boolean,
  todoWithin: Date,
  completedAt: Date | void,
  createdAt: Date,
  userId: string,
  categories: Array<Category> | void
};
