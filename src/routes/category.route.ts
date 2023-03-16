import express from "express";
import categoryController from "../controllers/category.controller";
import { authAdmin } from "../middleware/authToken.middlewares";

const router = express.Router();

router.get("/get-all-category", categoryController.getAllCategory);

router.post("/create-category", authAdmin, categoryController.createCategory);

export default router;
