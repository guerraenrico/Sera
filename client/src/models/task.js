import PropTypes from "prop-types";
import { CategoryType } from "./category";

export const TaskType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  todoWithin: PropTypes.instanceOf(Date).isRequired,
  completedAt: PropTypes.instanceOf(Date),
  createdAt: PropTypes.instanceOf(Date).isRequired,
  userId: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(CategoryType)
});
