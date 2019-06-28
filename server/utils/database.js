const { DATABASE_NAME, MONGODB_URI } = process.env;
const { MongoClient } = require("mongodb");

let connection;
let db;

async function openConnection() {
  if (connection && db) {
    return;
  }
  connection = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true
  });
  db = connection.db(DATABASE_NAME);
}

function closeConnection() {
  if (!connection) {
    return Promise.resolve();
  }
  return connection.close();
}

function instance() {
  return db;
}

module.exports = {
  openConnection,
  closeConnection,
  instance
};
