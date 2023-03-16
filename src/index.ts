import express, { Application } from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config/config";
import logging from "./config/logging";
import route from "./routes/index";
const NAME_SPACE: string = "Server";

const app: Application = express();

mongoose.set("strictQuery", true);
mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then(() => {
    logging.info(NAME_SPACE, "Mongo Connected");
  })
  .catch((err) => {
    logging.error(NAME_SPACE, err.message, err);
  });

app.use(cors({ origin: "*", methods: "*", optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
route(app);

app.use((_req, res, _next) => {
  const error = new Error("Not found");
  res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => {
  logging.info(
    NAME_SPACE,
    `Server is running http://${config.server.hostname}:${config.server.port}`
  );
});
