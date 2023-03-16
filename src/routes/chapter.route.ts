import express from "express";
import chapterController from "../controllers/chapter.controller";
import { authAdmin } from "../middleware/authToken.middlewares";

const router = express.Router();

router.get("/story/get-chapter", chapterController.getChapterInStory);

router.get("/get-chapter", chapterController.getChapter);

router.post("/create-chapter", authAdmin, chapterController.createChapter);

export default router;
