const { ObjectId } = require("mongodb");
const database = require("../utils/database");

/* eslint dot-notation: 0 */
const Schema = {
  name: "ItemOrder",
  fields: {
    orderedIds: "orderedIds",
    collection: "collection",
    userId: "userId",
    filter: "filter"
  }
};

const New = ({
  orderedIds = [],
  collection = "",
  userId = "",
  filter = {},
  id = undefined
}) => ({
  ...(id !== undefined && { id }),
  [Schema.fields.orderedIds]: orderedIds,
  [Schema.fields.collection]: collection,
  [Schema.fields.userId]: userId,
  [Schema.fields.filter]: filter
});

const CreateFromDocument = document => {
  if (document === undefined || document === null) {
    return undefined;
  }
  let fields = {};
  Object.keys(Schema.fields).forEach(key => {
    fields = {
      ...fields,
      [Schema.fields[key]]: document[Schema.fields[key]]
    };
  });
  return New({
    ...fields,
    id: document["_id"]
  });
};

const CreateFromDocuments = documents =>
  documents.map(doc => CreateFromDocument(doc));

const GetAsync = async (userId, collection, filter) => {
  const db = database.instance();
  const queryFilter = {
    $and: [
      { [Schema.fields.userId]: userId },
      { [Schema.fields.collection]: collection },
      { [Schema.fields.filter]: filter }
    ]
  };
  const document = await db.collection(Schema.name).findOne(queryFilter);
  if (document === undefined || document === null) {
    return undefined;
  }
  return CreateFromDocument(document);
};

const InsertAsync = async itemOrder => {
  const db = database.instance();
  return db.collection(Schema.name).insertOne(itemOrder);
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

const RemoveIdAsync = async (userId, collection, filter, idToRemove) => {
  const db = database.instance();
  const { id, ...itemOtherFields } = await GetAsync(
    db,
    userId,
    collection,
    filter
  );
  return UpdateAsync(db, id, {
    ...itemOtherFields,
    orderedIds: itemOtherFields.orderedIds.filter(
      orderId => idToRemove !== orderId
    )
  });
};

const PrependIdAsync = async (userId, collection, filter, idToAdd) => {
  const db = database.instance();
  const { id, ...itemOtherFields } = await GetAsync(
    db,
    userId,
    collection,
    filter
  );
  return UpdateAsync(db, id, {
    ...itemOtherFields,
    orderedIds: [idToAdd, ...itemOtherFields.orderedIds]
  });
};

const MoveIdAsync = async (
  db,
  userId,
  collection,
  filter,
  nextId,
  idToMove
) => {
  const { id, ...itemOtherFields } = await GetAsync(
    db,
    userId,
    collection,
    filter
  );

  const ids = Array.from(itemOtherFields.orderedIds);

  const currentIndex = ids.findIndex(cid => cid === idToMove);
  const nextIndex = nextId
    ? ids.findIndex(cid => cid === nextId) - 1
    : ids.length;

  ids.splice(currentIndex, 1);
  ids.splice(nextIndex, 0, idToMove);

  return UpdateAsync(db, id, {
    ...itemOtherFields,
    orderedIds: ids
  });
};

module.exports = {
  Schema,
  New,
  CreateFromDocument,
  CreateFromDocuments,
  GetAsync,
  InsertAsync,
  DeleteAsync,
  UpdateAsync,
  RemoveIdAsync,
  PrependIdAsync,
  MoveIdAsync
};
