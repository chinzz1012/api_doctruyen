"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateViewCountChapterService = exports.getChapterInStoryService = exports.getChapterService = exports.createChapterService = void 0;
const chapter_model_1 = __importDefault(require("../models/chapter.model"));
const createChapterService = async (newChapter) => {
    const foundChapter = (await getChapterService(newChapter.storyName, newChapter.chapterNumber)).data;
    if (foundChapter) {
        return { statusCode: "400", message: "Chapter đã tồn tại" };
    }
    await chapter_model_1.default.create(newChapter);
    return { statusCode: "200", message: "tạo chapter thành công" };
};
exports.createChapterService = createChapterService;
const getChapterService = async (storyName, chapterNumber) => {
    const foundChapter = await chapter_model_1.default.findOne({
        storyName: storyName,
        chapterNumber: chapterNumber,
    });
    return {
        statusCode: "200",
        message: "Lấy chapter thành công",
        data: foundChapter,
    };
};
exports.getChapterService = getChapterService;
const getChapterInStoryService = async (storyName) => {
    const foundChapter = await chapter_model_1.default
        .find({
        storyName: storyName,
    })
        .select("-_id -__v -updatedAt -url")
        .sort({ chapterNumber: 1 });
    return {
        statusCode: "200",
        message: "Lấy chapter thành công",
        data: foundChapter,
    };
};
exports.getChapterInStoryService = getChapterInStoryService;
const updateViewCountChapterService = async (storyName, chapterNumber) => {
    const foundChapter = (await getChapterService(storyName, chapterNumber)).data;
    if (!foundChapter) {
        return { statusCode: "400", message: "Chapter không tồn tại" };
    }
    await chapter_model_1.default.updateOne({ storyName: storyName, chapterNumber: chapterNumber }, {
        viewCount: ++foundChapter.viewCount,
    });
    return { statusCode: "200", message: "update view chapter thành công" };
};
exports.updateViewCountChapterService = updateViewCountChapterService;
//# sourceMappingURL=chapter.service.js.map