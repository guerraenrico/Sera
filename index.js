if (process.env.NODE_ENV !== 'production') {
  /* eslint global-require: 0 */
  require('dotenv').load();
}

const express = require('express');
const http = require('http');
const path = require('path');

const authRoutes = require('./server/routes/authRoutes');
const categoryRoutes = require('./server/routes/categoryRoutes');
const taskRouters = require('./server/routes/taskRoutes');

const { PORT } = process.env;
const app = express();

const httpServer = http.createServer(app);
httpServer.listen(PORT, () => {
  console.log(`sera server running on port ${PORT}`);
});

app.use(express.json());

app.use('/client/public', express.static(path.join(__dirname, '/client/public')));

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tasks', taskRouters);

app.get('/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/public/privacy.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/public/index.html'));
});
