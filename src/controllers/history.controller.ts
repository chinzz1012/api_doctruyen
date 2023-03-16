import { Request, Response } from "express";
import response from "../types/response";
import {
  createHistoryService,
  likeHistoryService,
  getHistoryService,
  deleteHistoryService,
} from "../services/history.service";

const getHistoryByUsername = async (req: Request, res: Response) => {
  try {
    const username: string = req.params.username || "";
    const response: response = await getHistoryService({
      username: username,
      currentChapter: { $gte: 1 },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getAllLikeByUsername = async (req: Request, res: Response) => {
  try {
    const username: string = req.params.username || "";
    const response: response = await getHistoryService({
      userName: username,
      liked: true,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getLike = async (req: Request, res: Response) => {
  try {
    const username: string = req.query.username?.toString() || "";
    const storyName: string = req.query.storyName?.toString() || "";
    const response: response = await getHistoryService({
      userName: username,
      liked: true,
      storyName: storyName,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const createHistory = async (req: Request, res: Response) => {
  try {
    const newHistory: any = {
      username: req.body.username,
      storyName: req.body.storyName,
      currentChapter: Number(req.body.currentChapter),
    };
    const response: response = await createHistoryService(newHistory);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const deleteHistory = async (req: Request, res: Response) => {
  try {
    const { username, storyName } = req.body;
    const response: response = await deleteHistoryService(username, storyName);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const likeStory = async (req: Request, res: Response) => {
  try {
    const newHistory: any = {
      username: req.body.username,
      storyName: req.body.storyName,
      liked: req.body.liked,
    };
    const response: response = await likeHistoryService(newHistory);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

export default {
  getHistoryByUsername,
  deleteHistory,
  getLike,
  getAllLikeByUsername,
  createHistory,
  likeStory,
};
