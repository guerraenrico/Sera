const { ObjectId } = require('mongodb');

/* eslint dot-notation: 0 */
const Schema = {
  name: 'Task',
  fields: {
    title: 'title',
    description: 'description',
    completed: 'completed',
    todoWithin: 'todoWithin',
    completedAt: 'completedAt',
    categoryId: 'categoryId',
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

const GetAllAsync = async (db, limit, skip, completed, categoriesId) => {
  const filter = {
    $and: [
      { [Schema.fields.completed]: completed },
      ((categoriesId[0] !== '0')
        ? { [Schema.fields.categoryId]: { $in: categoriesId } } : {}),
    ],
  };
  const query = (limit !== undefined && skip !== undefined)
    ? db.collection(Schema.name).find(filter).limit(limit).skip(skip)
    : db.collection(Schema.name).find(filter);
  const tasksDocs = await query.toArray();
  return CreateFromDocuments(tasksDocs);
};

const InsertAsync = async (db, task) => (
  db.collection(Schema.name).insertOne(task)
);

const DeleteAsync = async (db, id) => (
  db.collection(Schema.name).deleteOne({ _id: ObjectId(id.toString()) })
);

const UpdateAsync = async (db, id, fields) => (
  db.collection(Schema.name).findOneAndUpdate(
    { _id: ObjectId(id.toString()) },
    { $set: { ...fields } },
  )
);

module.exports = {
  Schema,
  CreateFromBodyRequest,
  CreateFromDocument,
  CreateFromDocuments,
  GetAllAsync,
  InsertAsync,
  DeleteAsync,
  UpdateAsync,
};
