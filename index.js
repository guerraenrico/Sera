if (process.env.NODE_ENV !== "production") {
  /* eslint global-require: 0 */
  require("dotenv").config();
}

const express = require("express");
const http = require("http");
const path = require("path");

const database = require("./server/utils/database");

const authRoutes = require("./server/routes/authRoutes");
const categoryRoutes = require("./server/routes/categoryRoutes");
const taskRouters = require("./server/routes/taskRoutes");

const { PORT } = process.env;
const app = express();

const httpServer = http.createServer(app);

app.use(express.json());

app.use(
  "/client/public",
  express.static(path.join(__dirname, "/client/public"))
);

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tasks", taskRouters);

app.get("/privacy", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/public/privacy.html"));
});

app.get("/*", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      process.env.NODE_ENV !== "production"
        ? "/client/public/index-dev.html"
        : "/client/public/index.html"
    )
  );
});

(async function start() {
  await database.openConnection();
  httpServer.listen(PORT, () => {
    console.log(`sera server running on port ${PORT}`);
  });
})();
