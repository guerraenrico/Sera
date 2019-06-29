/* eslint dot-notation: 0 */

const database = require("../utils/database");

const Schema = {
  name: "Session",
  fields: {
    userId: "userId",
    accessToken: "accessToken",
    platform: "platform",
    expireAt: "expireAt",
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
};

const New = ({
  userId,
  accessToken,
  platform,
  expireAt,
  createdAt,
  updatedAt,
  id = undefined
}) => ({
  [Schema.fields.userId]: userId,
  [Schema.fields.accessToken]: accessToken,
  [Schema.fields.platform]: platform,
  [Schema.fields.expireAt]: expireAt,
  [Schema.fields.createdAt]: createdAt,
  [Schema.fields.updatedAt]: updatedAt,
  ...(id !== undefined && { id })
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

const CreateFromDocuments = sessionDocuments =>
  sessionDocuments.map(doc => CreateFromDocument(doc));

const GetByAccessTokenAsync = async accessToken => {
  const db = database.instance();
  const sessionDoc = await db
    .collection(Schema.name)
    .findOne({ [Schema.fields.accessToken]: accessToken });
  if (sessionDoc === undefined || sessionDoc === null) {
    return undefined;
  }
  return CreateFromDocument(sessionDoc);
};

const UpdateAsync = async session => {
  const db = database.instance();
  const { id, ...othres } = session;
  const now = new Date();
  const newSession = {
    ...othres,
    updatedAt: now
  };
  return db
    .collection(Schema.name)
    .updateOne({ _id: id }, { $set: newSession });
};

const InsertAsync = async session => {
  const db = database.instance();
  const now = new Date();
  const newSession = {
    ...session,
    createdAt: now,
    updatedAt: now
  };
  return db.collection(Schema.name).insertOne(newSession);
};

const DeleteByAccessTokenAsync = async accessToken => {
  const db = database.instance();
  return db.collection(Schema.name).deleteOne({
    [Schema.fields.accessToken]: accessToken
  });
};

module.exports = {
  Schema,
  New,
  CreateFromDocument,
  CreateFromDocuments,
  GetByAccessTokenAsync,
  UpdateAsync,
  InsertAsync,
  DeleteByAccessTokenAsync
};
