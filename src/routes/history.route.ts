import express from "express";
import historyController from "../controllers/history.controller";
import { authUser } from "../middleware/authToken.middlewares";

const router = express.Router();

router.get("/get-history/:username", historyController.getHistoryByUsername);

router.get("/get-like/:username", historyController.getAllLikeByUsername);

router.get("/get-like", historyController.getLike);

router.post("/like-story", authUser, historyController.likeStory);

router.post("/create-history", authUser, historyController.createHistory);

router.put("/delete-history", authUser, historyController.deleteHistory);

export default router;
