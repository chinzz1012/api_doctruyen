import { Request, Response } from "express";
import story from "../types/story";
import response from "../types/response";
import {
  getAllStoryService,
  getStoryByCategoryService,
  getStoryByNameService,
  createStoryService,
  updateStoryService,
} from "../services/story.service";
import { formatName } from "../utils/formatName";

const getAllStory = async (req: Request, res: Response) => {
  try {
    const page: number = Number(req.query.page) || 0;
    const response: response = await getAllStoryService(page);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getStory = async (req: Request, res: Response) => {
  try {
    const category: string | undefined = req.query.category?.toString();
    const name: string | undefined = req.query.name?.toString();
    let response: response = { statusCode: "200", message: "", data: null };
    if (category) {
      response = await getStoryByCategoryService(category);
    } else if (name) {
      response = await getStoryByNameService(name);
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const createStory = async (req: Request, res: Response) => {
  try {
    const newStory: story = req.body;
    newStory.name = formatName(newStory.name);
    const response: response = await createStoryService(newStory);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const updateStory = async (req: Request, res: Response) => {
  try {
    const newStory: story = req.body;
    const response: response = await updateStoryService(newStory);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

export default { getAllStory, getStory, createStory, updateStory };
