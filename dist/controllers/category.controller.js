"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_service_1 = require("../services/category.service");
const formatName_1 = require("../utils/formatName");
const getAllCategory = async (_req, res) => {
    try {
        const response = await (0, category_service_1.getAllCategoryService)();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const createCategory = async (req, res) => {
    try {
        const newCategory = {
            name: (0, formatName_1.formatName)(req.body.name),
        };
        const response = await (0, category_service_1.createCategoryService)(newCategory);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
exports.default = { getAllCategory, createCategory };
//# sourceMappingURL=category.controller.js.map