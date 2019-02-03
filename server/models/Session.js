/* eslint dot-notation: 0 */
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

const New = (
  userId,
  accessToken,
  platform,
  expireAt,
  createdAt,
  updatedAt,
  id = undefined
) => ({
  [Schema.fields.userId]: userId,
  [Schema.fields.accessToken]: accessToken,
  [Schema.fields.platform]: platform,
  [Schema.fields.expireAt]: expireAt,
  [Schema.fields.createdAt]: createdAt,
  [Schema.fields.updatedAt]: updatedAt,
  ...(id !== undefined && { id })
});

const CreateFromDocument = sessionDocument =>
  New(
    sessionDocument[Schema.fields.userId],
    sessionDocument[Schema.fields.accessToken],
    sessionDocument[Schema.fields.platform],
    sessionDocument[Schema.fields.expireAt],
    sessionDocument[Schema.fields.createdAt],
    sessionDocument[Schema.fields.updatedAt],
    sessionDocument["_id"]
  );

const CreateFromDocuments = sessionDocuments =>
  sessionDocuments.map(doc => CreateFromDocument(doc));

const GetByAccessTokenAsync = async (db, accessToken) => {
  const sessionDoc = await db
    .collection(Schema.name)
    .findOne({ [Schema.fields.accessToken]: accessToken });
  if (sessionDoc === undefined || sessionDoc === null) {
    return undefined;
  }
  return CreateFromDocument(sessionDoc);
};

const UpdateAsync = async (db, session) => {
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

const InsertAsync = async (db, session) => {
  const now = new Date();
  const newSession = {
    ...session,
    createdAt: now,
    updatedAt: now
  };
  return db.collection(Schema.name).insertOne(newSession);
};

const DeleteByAccessTokenAsync = async (db, accessToken) =>
  db.collection(Schema.name).deleteOne({
    [Schema.fields.accessToken]: accessToken
  });

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
