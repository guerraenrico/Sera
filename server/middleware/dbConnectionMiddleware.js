const { DATABASE_NAME, MONGODB_URI } = process.env;
const { MongoClient } = require('mongodb');

const connection = async (fn) => {
  const conn = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true });
  const db = conn.db(DATABASE_NAME);
  await fn(db);
  conn.close();
};

module.exports = connection;
