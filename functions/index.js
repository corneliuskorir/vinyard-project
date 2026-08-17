const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

const express = require("express");
const jsonServer = require("json-server");

setGlobalOptions({ maxInstances: 1 });

const app = express();
const port = 3000;

// Set up standard Express routes
app.get("/hello", (req, res) => {
  res.json({ message: "Welcome to my custom Express route!" });
});

// Create and configure the json-server router
const jsonRouter = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Mount json-server onto a specific endpoint prefix
app.use(middlewares);
app.use("/api", jsonRouter);

exports.suncrestvalleybackend = onRequest(
  { cors: true, invoker: "public" },
  app,
);
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
