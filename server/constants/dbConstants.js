const dbName = 'seraDatabase';
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017';

module.exports = {
  dbName,
  dbUrl,
};
