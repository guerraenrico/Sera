if (process.env.NODE_ENV !== "production") {
  /* eslint global-require: 0 */
  require("dotenv").config();
}

const express = require("express");
const http = require("http");
const path = require("path");

const { PORT } = process.env;
const app = express();

const httpServer = http.createServer(app);

app.use(express.json());

app.use(
  "/client/public",
  express.static(path.join(__dirname, "/client/public"))
);

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

(function start() {
  httpServer.listen(PORT, () => {
    console.log(`sera server running on port ${PORT}`);
  });
})();
