const { ObjectId } = require("mongodb");

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

const GetAsync = async (db, userId, collection, filter) => {
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

const InsertAsync = async (db, itemOrder) =>
  db.collection(Schema.name).insertOne(itemOrder);

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

const RemoveIdAsync = async (db, userId, collection, filter, idToRemove) => {
  const itemOrder = await GetAsync(db, userId, collection, filter);
  return UpdateAsync(db, itemOrder.id, {
    ...itemOrder,
    orderedIds: itemOrder.orderedIds.fields(id => idToRemove !== id)
  });
};

const PrependIdAsync = async (db, userId, collection, filter, idToAdd) => {
  const itemOrder = await GetAsync(db, userId, collection, filter);
  return UpdateAsync(db, itemOrder.id, {
    ...itemOrder,
    orderedIds: [idToAdd, ...itemOrder.orderedIds]
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
  const itemOrder = await GetAsync(db, userId, collection, filter);

  const ids = Array.from(itemOrder.orderedIds);

  const currentIndex = ids.findIndex(id => id === idToMove);
  const nextIndex = ids.findIndex(id => id === nextId) - 1;

  ids.splice(currentIndex, 1);
  ids.splice(nextIndex, 0, itemOrder.orderedIds[currentIndex]);

  return UpdateAsync(db, itemOrder.id, {
    ...itemOrder,
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