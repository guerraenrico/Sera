const { ObjectId } = require("mongodb");

/* eslint dot-notation: 0 */
const Schema = {
  name: "User",
  fields: {
    googleId: "googleId",
    refreshToken: "refreshToken",
    email: "email",
    name: "name",
    locale: "locale",
    pictureUrl: "pictureUrl",
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
};

const New = (
  googleId,
  email,
  name,
  locale,
  pictureUrl,
  refreshToken = undefined,
  createdAt = undefined,
  updatedAt = undefined,
  id = undefined
) => ({
  [Schema.fields.googleId]: googleId,
  [Schema.fields.email]: email,
  [Schema.fields.name]: name,
  [Schema.fields.locale]: locale,
  [Schema.fields.pictureUrl]: pictureUrl,
  ...(refreshToken !== undefined && {
    [Schema.fields.refreshToken]: refreshToken
  }),
  [Schema.fields.createdAt]: createdAt,
  [Schema.fields.updatedAt]: updatedAt,
  ...(id !== undefined && { id })
});

const CreateFromDocument = userDocument =>
  New(
    userDocument[Schema.fields.googleId],
    userDocument[Schema.fields.email],
    userDocument[Schema.fields.name],
    userDocument[Schema.fields.locale],
    userDocument[Schema.fields.pictureUrl],
    userDocument[Schema.fields.refreshToken],
    userDocument[Schema.fields.createdAt],
    userDocument[Schema.fields.updatedAt],
    userDocument["_id"]
  );

const CreateFromDocuments = userDocuments =>
  userDocuments.map(doc => CreateFromDocument(doc));

const GetAsync = async (db, id) => {
  const userDoc = await db
    .collection(Schema.name)
    .findOne({ _id: ObjectId(id.toString()) });
  if (userDoc === undefined || userDoc === null) {
    return undefined;
  }
  return CreateFromDocument(userDoc);
};

const GetByGoogleIdAsync = async (db, googleId) => {
  const userDoc = await db
    .collection(Schema.name)
    .findOne({ [Schema.fields.googleId]: googleId });
  if (userDoc === undefined || userDoc === null) {
    return undefined;
  }
  return CreateFromDocument(userDoc);
};

const UpdateAsync = async (db, user) => {
  const { id, ...othres } = user;
  const now = new Date();
  const newUser = {
    ...othres,
    updatedAt: now
  };
  return db.collection(Schema.name).updateOne({ _id: id }, { $set: newUser });
};

const InsertAsync = async (db, user) => {
  const now = new Date();
  const newUser = {
    ...user,
    createdAt: now,
    updatedAt: now
  };
  return db.collection(Schema.name).insertOne(newUser);
};

module.exports = {
  Schema,
  New,
  CreateFromDocument,
  CreateFromDocuments,
  GetAsync,
  GetByGoogleIdAsync,
  InsertAsync,
  UpdateAsync
};
