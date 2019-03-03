const { ObjectId } = require("mongodb");
const Category = require("./Category");

/* eslint dot-notation: 0 */
const Schema = {
  name: "Task",
  fields: {
    title: "title",
    description: "description",
    completed: "completed",
    todoWithin: "todoWithin",
    completedAt: "completedAt",
    categories: "categories",
    createdAt: "createdAt",
    userId: "userId"
  }
};

const New = ({
  title = "",
  description = "",
  todoWithin = undefined,
  categories = [],
  completed = false,
  completedAt = undefined,
  userId = "",
  createdAt = undefined,
  id = undefined
}) => ({
  ...(id !== undefined && { id }),
  [Schema.fields.title]: title,
  [Schema.fields.description]: description,
  [Schema.fields.todoWithin]: todoWithin,
  [Schema.fields.completedAt]: completedAt,
  [Schema.fields.categories]: categories,
  [Schema.fields.completed]: completed,
  [Schema.fields.createdAt]: createdAt,
  [Schema.fields.userId]: userId
});

const CreateFromBodyRequest = (body, userId) => {
  if (body.title === undefined || body.title === "") {
    return undefined;
  }
  if (body.todoWithin === undefined || body.todoWithin === "") {
    return undefined;
  }
  return New({
    title: body.title,
    description: body.description,
    todoWithin: body.todoWithin,
    categories: body.categories.map(cat => Category.New(cat)),
    userId
  });
};

const CreateFromDocument = taskDocument => {
  let fields = {};
  Object.keys(Schema.fields).forEach(key => {
    fields = {
      ...fields,
      [Schema.fields[key]]: taskDocument[Schema.fields[key]]
    };
  });
  return New({
    ...fields,
    id: taskDocument["_id"]
  });
};

const CreateFromDocuments = taskDocuments =>
  taskDocuments.map(doc => CreateFromDocument(doc));

const GetAllAsync = async (
  db,
  userId,
  limit,
  skip,
  completed,
  categoriesId = []
) => {
  const filter = {
    $and: [
      { [Schema.fields.completed]: completed },
      categoriesId.length > 0 && categoriesId[0] !== "0"
        ? { [`${Schema.fields.categories}.id`]: { $in: categoriesId } }
        : {},
      { [Schema.fields.userId]: userId }
    ]
  };
  const query =
    limit !== undefined && skip !== undefined
      ? db
          .collection(Schema.name)
          .find(filter)
          .limit(limit)
          .skip(skip)
      : db.collection(Schema.name).find(filter);
  const tasksDocs = await query.toArray();
  return CreateFromDocuments(tasksDocs);
};

const InsertAsync = async (db, task) =>
  db.collection(Schema.name).insertOne({
    ...task,
    createdAt: new Date()
  });

const DeleteAsync = async (db, userId, id) =>
  db.collection(Schema.name).deleteOne({
    $and: [{ _id: ObjectId(id.toString()) }, { [Schema.fields.userId]: userId }]
  });

const UpdateAsync = async (db, id, fields) =>
  db
    .collection(Schema.name)
    .findOneAndUpdate(
      { _id: ObjectId(id.toString()) },
      { $set: { ...fields } }
    );

module.exports = {
  Schema,
  CreateFromBodyRequest,
  CreateFromDocument,
  CreateFromDocuments,
  GetAllAsync,
  InsertAsync,
  DeleteAsync,
  UpdateAsync
};
