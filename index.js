require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json());

// CORS Middleware
app.use(cors({ origin: true }));

app.use(bodyParser.json({ limit: "1000mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "1000mb" }));

const allRoutes = require("./api/server/routes");

const http = require("http").Server(app);
// const server = createServer(app);

function setupRoutes() {
  const routes = allRoutes;
  routes.setup(app);
}
setupRoutes();

// when a random route is inputed
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to this API.",
  })
);

//Set port
const port = process.env.PORT || 8000;

http.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
  console.log(`Websocket is now running on ws://localhost:${port} `);
});

module.exports = app;
