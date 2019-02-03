const { ObjectId } = require("mongodb");

/* eslint dot-notation: 0 */
const Schema = {
  name: "Category",
  fields: {
    name: "name",
    userId: "userId"
  }
};

const New = (name = "", userId = "", id = undefined) => ({
  ...(id !== undefined && { id }),
  [Schema.fields.name]: name,
  [Schema.fields.userId]: userId
});

const CreateFromBodyRequest = (body, userId) => {
  if (body.name !== undefined && body.name !== "") {
    return New(body.name, userId);
  }
  return undefined;
};

const CreateFromDocument = categoryDocument =>
  New(
    categoryDocument[Schema.fields.name],
    categoryDocument[Schema.fields.userId],
    categoryDocument["_id"]
  );

const CreateFromDocuments = categoryDocuments =>
  categoryDocuments.map(doc => CreateFromDocument(doc));

const GetAllAsync = async (db, userId, limit, skip) => {
  const filter = { [Schema.fields.userId]: userId };
  const query =
    limit !== undefined && skip !== undefined
      ? db
          .collection(Schema.name)
          .find(filter)
          .limit(limit)
          .skip(skip)
      : db.collection(Schema.name).find(filter);
  const categoriesDocs = await query.toArray();
  return CreateFromDocuments(categoriesDocs);
};

const InsertAsync = async (db, category) =>
  db.collection(Schema.name).insertOne(category);

const DeleteAsync = async (db, userId, id) =>
  db.collection(Schema.name).deleteOne({
    $and: [{ _id: ObjectId(id.toString()) }, { [Schema.fields.userId]: userId }]
  });

module.exports = {
  Schema,
  New,
  CreateFromBodyRequest,
  CreateFromDocument,
  CreateFromDocuments,
  GetAllAsync,
  InsertAsync,
  DeleteAsync
};
