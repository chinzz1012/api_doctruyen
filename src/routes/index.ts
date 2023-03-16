import { Application } from "express";
import user from "./user.route";
import story from "./story.route";
import category from "./category.route";
import history from "./history.route";
import chapter from "./chapter.route";

const route = (app: Application) => {
  app.use("/user", user);
  app.use("/story", story);
  app.use("/category", category);
  app.use("/chapter", chapter);
  app.use("/history", history);
};

export default route;
