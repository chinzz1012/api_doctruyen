import { Request, Response } from "express";
import response from "../types/response";
import {
  createCategoryService,
  getAllCategoryService,
} from "../services/category.service";
import { formatName } from "../utils/formatName";

const getAllCategory = async (_req: Request, res: Response) => {
  try {
    const response: response = await getAllCategoryService();
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const newCategory: any = {
      name: formatName(req.body.name),
    };
    const response: response = await createCategoryService(newCategory);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

export default { getAllCategory, createCategory };
