/* eslint dot-notation: 0 */
const Schema = {
  name: 'Task',
  fields: {
    title: 'title',
    description: 'description',
    completed: 'completed',
    todoWithin: 'todo_within',
    completedAt: 'completed_at',
    categoryId: 'category_id',
  },
};

const New = (
  title = '',
  description = '',
  todoWithin = undefined,
  categoryId = '',
  completed = false,
  completedAt = undefined,
  id = undefined,
) => (
  {
    ...((id !== undefined) && { id }),
    title,
    description,
    todoWithin,
    completedAt,
    categoryId,
    completed,
  }
);

const CreateFromBodyRequest = (body) => {
  if (body.title === undefined || body.title === '') {
    return undefined;
  }  
  if (body.todoWithin === undefined || body.todoWithin === '') {
    return undefined;
  }
  if (body.categoryId === undefined || body.categoryId === '') {
    return undefined;
  }
  return New(
    body.title,
    body.description,
    body.todoWithin,
    body.categoryId,
  );
};

const CreateFromDocument = categoryDocument => (
  New(
    categoryDocument.title,
    categoryDocument.description,
    categoryDocument.todoWithin,
    categoryDocument.categoryId,
    categoryDocument.completed,
    categoryDocument.completedAt,
    categoryDocument['_id'],
  )
);

const CreateFromDocuments = categoryDocuments => (
  categoryDocuments.map(doc => CreateFromDocument(doc))
);

module.exports = {
  Schema,
  CreateFromBodyRequest,
  CreateFromDocument,
  CreateFromDocuments,
};
