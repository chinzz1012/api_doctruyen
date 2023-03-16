"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const story_service_1 = require("../services/story.service");
const formatName_1 = require("../utils/formatName");
const getAllStory = async (req, res) => {
    try {
        const page = Number(req.query.page) || 0;
        const response = await (0, story_service_1.getAllStoryService)(page);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getStory = async (req, res) => {
    var _a, _b;
    try {
        const category = (_a = req.query.category) === null || _a === void 0 ? void 0 : _a.toString();
        const name = (_b = req.query.name) === null || _b === void 0 ? void 0 : _b.toString();
        let response = { statusCode: "200", message: "", data: null };
        if (category) {
            response = await (0, story_service_1.getStoryByCategoryService)(category);
        }
        else if (name) {
            response = await (0, story_service_1.getStoryByNameService)(name);
        }
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const createStory = async (req, res) => {
    try {
        const newStory = req.body;
        newStory.name = (0, formatName_1.formatName)(newStory.name);
        const response = await (0, story_service_1.createStoryService)(newStory);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const updateStory = async (req, res) => {
    try {
        const newStory = req.body;
        const response = await (0, story_service_1.updateStoryService)(newStory);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
exports.default = { getAllStory, getStory, createStory, updateStory };
//# sourceMappingURL=story.controller.js.map