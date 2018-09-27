const express = require('express');
const http = require('http');
const { MongoClient } = require('mongodb');
const path = require('path');

const auth = require('./server/lib/auth');
const { dbName, dbUrl } = require('./server/constants/dbConstants');
const Api = require('./server/Api');

if (process.env.NODE_ENV !== 'production') {
  /* eslint global-require: 0 */
  require('dotenv').load();
}

const PORT = process.env.PORT || 5000;

const app = express();

const httpServer = http.createServer(app);
httpServer.listen(PORT, () => {
  console.log(`sera server running on port ${PORT}`);
});

app.use(express.json());

app.use('/client/public', express.static(path.join(__dirname, '/client/public')));

const CallApi = async (apiFunction, req, res) => {
  const conn = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
  const db = conn.db(dbName);
  await apiFunction(db, req, res);
  conn.close();
};

app.use('/api/auth/google/callback', auth);

app.get('/api/categories', (req, res) => {
  CallApi(Api.getCategories, req, res);
});

app.post('/api/categories', (req, res) => {
  CallApi(Api.insertCategory, req, res);
});

app.delete('/api/categories/:id', (req, res) => {
  CallApi(Api.deleteCategory, req, res);
});

app.get('/api/tasks', (req, res) => {
  CallApi(Api.getTasks, req, res);
});

app.post('/api/tasks', (req, res) => {
  CallApi(Api.insertTask, req, res);
});

app.delete('/api/tasks/:id', (req, res) => {
  CallApi(Api.deleteTask, req, res);
});

app.patch('/api/tasks', (req, res) => {
  CallApi(Api.updateTask, req, res);
});

app.get('/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/public/privacy.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/public/index.html'));
});
