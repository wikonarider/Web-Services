const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const http = require("http");
const app = express();
const socketIO = require("socket.io");
const serverchat = require("./controllers/chat.js");
require("./db.js");

app.name = "API";
app.set("port", process.env.PORT || 3001);// permite que la nube asigne un port cuando deploye
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/", routes);

// Error catching endware.
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

const server = http.createServer(app); //requerido por socket.io para conexion chat
const serverIO = socketIO(server, {
  // require cors para dominio
  cors: {
    origin: "*", //habilita al front que se conecte
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    credentials: "true",
  },
}); //socketIO servidor de conexion

serverchat(serverIO);

module.exports = { server, port: app.get("port") };
