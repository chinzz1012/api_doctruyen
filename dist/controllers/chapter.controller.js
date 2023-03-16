"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chapter_service_1 = require("../services/chapter.service");
const getChapter = async (req, res) => {
    var _a, _b;
    try {
        const storyName = ((_a = req.query.name) === null || _a === void 0 ? void 0 : _a.toString()) || "";
        const chapterNumber = Number((_b = req.query.chapter) === null || _b === void 0 ? void 0 : _b.toString()) || 0;
        const response = await (0, chapter_service_1.getChapterService)(storyName, chapterNumber);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getChapterInStory = async (req, res) => {
    var _a;
    try {
        const storyName = ((_a = req.query.name) === null || _a === void 0 ? void 0 : _a.toString()) || "";
        const response = await (0, chapter_service_1.getChapterInStoryService)(storyName);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const createChapter = async (req, res) => {
    try {
        const newChapter = req.body;
        const response = await (0, chapter_service_1.createChapterService)(newChapter);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
exports.default = { getChapter, createChapter, getChapterInStory };
//# sourceMappingURL=chapter.controller.js.map