import dotenv from "dotenv";
dotenv.config();

const MONGO_OPTIONS = {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
};
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_COLLECTION = "comics";

const MONGO = {
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  collection: MONGO_COLLECTION,
  options: MONGO_OPTIONS,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@qluser.qf9zv.mongodb.net/${MONGO_COLLECTION}?retryWrites=true&w=majority`,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 1308;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};
const config = {
  server: SERVER,
  mongo: MONGO,
};

export default config;
