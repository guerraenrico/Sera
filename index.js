const express = require('express');
const http = require('http');
const { MongoClient } = require('mongodb');
const path = require('path');
// const assert = require('assert');
const { dbName, dbUrl } = require('./server/constants/dbConstants');
const Api = require('./server/Api');

const PORT = process.env.PORT || 5000;

const app = express();

const httpServer = http.createServer(app);
httpServer.listen(PORT, () => {
  console.log(`sera server running on port ${PORT}`);
});

app.use(express.json());

app.use('/client/public', express.static(path.join(__dirname, '/client/public')));

const CallApi = (apiFunction, req, res) => {
  MongoClient.connect(dbUrl, { useNewUrlParser: true })
    .then((conn) => {
      const db = conn.db(dbName);
      return apiFunction(db, req, res)
        .then(() => {
          console.log('close connection');
          conn.close();
        });
    });
};

app.get('/api/categories', (req, res) => {
  CallApi(Api.getCategories, req, res);
});

app.post('/api/categories', (req, res) => {
  CallApi(Api.insertCategory, req, res);
});

app.delete('/api/categories/:id', (req, res) => {
  CallApi(Api.deleteCategory, req, res);
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/public/index.html'));
});
