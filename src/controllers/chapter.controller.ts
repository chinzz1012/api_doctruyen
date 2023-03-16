import { Request, Response } from "express";
import chapter from "../types/chapter";
import response from "../types/response";
import {
  createChapterService,
  getChapterService,
  getChapterInStoryService,
} from "../services/chapter.service";

const getChapter = async (req: Request, res: Response) => {
  try {
    const storyName: string = req.query.name?.toString() || "";
    const chapterNumber: number = Number(req.query.chapter?.toString()) || 0;
    const response: response = await getChapterService(
      storyName,
      chapterNumber
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getChapterInStory = async (req: Request, res: Response) => {
  try {
    const storyName: string = req.query.name?.toString() || "";
    const response: response = await getChapterInStoryService(storyName);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const createChapter = async (req: Request, res: Response) => {
  try {
    const newChapter: chapter = req.body;
    const response: response = await createChapterService(newChapter);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

export default { getChapter, createChapter, getChapterInStory };
