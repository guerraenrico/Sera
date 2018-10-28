const { MongoClient } = require('mongodb');
const { dbName, dbUrl } = require('../constants/dbConstants');

const connection = async (fn) => {
  const conn = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
  const db = conn.db(dbName);
  await fn(db);
  conn.close();
};

module.exports = connection;
