import express from "express";
import storyController from "../controllers/story.controller";
import { authAdmin } from "../middleware/authToken.middlewares";

const router = express.Router();

router.get("/get-all-story", storyController.getAllStory);

router.get("/get-story", storyController.getStory);

router.post("/create-story", authAdmin, storyController.createStory);

router.post("/update-story", authAdmin, storyController.updateStory);

export default router;
