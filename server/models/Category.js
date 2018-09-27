const { ObjectId } = require('mongodb');

/* eslint dot-notation: 0 */
const Schema = {
  name: 'Category',
  fields: {
    name: 'name',
  },
};

const New = (name = '', id = undefined) => (
  {
    ...((id !== undefined) && { id }),
    name,
  }
);

const CreateFromBodyRequest = (body) => {
  if (body.name !== undefined && body.name !== '') {
    return New(body.name);
  }
  return undefined;
};

const CreateFromDocument = categoryDocument => (
  New(categoryDocument.name, categoryDocument['_id'])
);

const CreateFromDocuments = categoryDocuments => (
  categoryDocuments.map(doc => CreateFromDocument(doc))
);

const GetAllAsync = async (db, limit, skip) => {
  const query = (limit !== undefined && skip !== undefined)
    ? db.collection(Schema.name).find({}).limit(limit).skip(skip)
    : db.collection(Schema.name).find({});
  const categoriesDocs = await query.toArray();
  return CreateFromDocuments(categoriesDocs);
};

const InsertAsync = async (db, category) => db.collection(Schema.name).insertOne(category);

const DeleteAsync = async (db, id) => (
  db.collection(Schema.name).deleteOne({ _id: ObjectId(id.toString()) })
);

module.exports = {
  Schema,
  New,
  CreateFromBodyRequest,
  CreateFromDocument,
  CreateFromDocuments,
  GetAllAsync,
  InsertAsync,
  DeleteAsync,
};
