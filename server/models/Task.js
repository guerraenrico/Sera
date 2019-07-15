const { ObjectId } = require("mongodb");
const Category = require("./Category");

const { isNullOrUndefined } = require("../utils/common");
const database = require("../utils/database");

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
  if (isNullOrUndefined(body.title) || body.title === "") {
    return undefined;
  }
  if (isNullOrUndefined(body.todoWithin) || body.todoWithin === "") {
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

const GetAllAsync = async ({
  userId,
  limit,
  skip,
  completed,
  categoriesId = [],
  orderBy = { [Schema.fields.todoWithin]: 1 }
}) => {
  const db = database.instance();
  const filter = {
    $and: [
      { [Schema.fields.userId]: userId },
      !isNullOrUndefined(completed)
        ? { [Schema.fields.completed]: completed }
        : {},
      categoriesId.length > 0 && categoriesId[0] !== ""
        ? { [`${Schema.fields.categories}.id`]: { $in: categoriesId } }
        : {}
    ]
  };
  const query =
    !isNullOrUndefined(limit) && !isNullOrUndefined(skip)
      ? db
          .collection(Schema.name)
          .find(filter)
          .limit(limit)
          .skip(skip)
          .sort(orderBy)
      : db
          .collection(Schema.name)
          .find(filter)
          .sort(orderBy);
  const tasksDocs = await query.toArray();
  return CreateFromDocuments(tasksDocs);
};

const GetAsync = async (userId, id) => {
  const db = database.instance();
  return db.collection(Schema.name).findOne({
    $and: [{ _id: ObjectId(id.toString()) }, { [Schema.fields.userId]: userId }]
  });
};

const GetAllByIdsAsync = async (userId, ids) => {
  const db = database.instance();
  const tasksDocs = await db
    .collection(Schema.name)
    .find({
      $and: [
        { _id: { $in: ids.map(id => ObjectId(id.toString())) } },
        { [Schema.fields.userId]: userId }
      ]
    })
    .toArray();
  return CreateFromDocuments(tasksDocs);
};

const InsertAsync = async task => {
  const db = database.instance();
  return db.collection(Schema.name).insertOne({
    ...task,
    createdAt: new Date()
  });
};

const DeleteAsync = async (userId, id) => {
  const db = database.instance();
  return db.collection(Schema.name).deleteOne({
    $and: [{ _id: ObjectId(id.toString()) }, { [Schema.fields.userId]: userId }]
  });
};

const UpdateAsync = async (id, fields) => {
  const db = database.instance();
  return db
    .collection(Schema.name)
    .findOneAndUpdate(
      { _id: ObjectId(id.toString()) },
      { $set: { ...fields } }
    );
};

const SearchAsync = async (userId, text) => {
  const db = database.instance();
  let regex = "";
  const words = text.split(" ");
  words.forEach(word => {
    regex = `${regex}(.*${word})`;
  });
  const filter = {
    $and: [
      { [Schema.fields.userId]: userId },
      {
        $or: [
          { [Schema.fields.title]: { $regex: regex, $options: "i" } },
          { [Schema.fields.description]: { $regex: regex, $options: "i" } }
          // { [Schema.fields.description]: { $regex: `${regex}`, $options: "i" } }
        ]
      }
    ]
  };
  const query = db.collection(Schema.name).find(filter);
  const categoriesDocs = await query.toArray();
  return CreateFromDocuments(categoriesDocs);
};

module.exports = {
  Schema,
  CreateFromBodyRequest,
  CreateFromDocument,
  CreateFromDocuments,
  GetAllAsync,
  GetAllByIdsAsync,
  GetAsync,
  InsertAsync,
  DeleteAsync,
  UpdateAsync,
  SearchAsync
};
