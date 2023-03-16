"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHistoryService = exports.getHistoryService = exports.likeHistoryService = exports.createHistoryService = void 0;
const history_model_1 = __importDefault(require("../models/history.model"));
const story_service_1 = require("./story.service");
const chapter_service_1 = require("./chapter.service");
const story_service_2 = require("./story.service");
const createHistoryService = async (newHistory) => {
    const foundStory = (await (0, story_service_2.getStoryByNameService)(newHistory.storyName)).data;
    if (!foundStory) {
        return { statusCode: "400", message: "Truyện không tồn tại" };
    }
    newHistory.avatarStory = foundStory === null || foundStory === void 0 ? void 0 : foundStory.avatar;
    let foundHistory = await history_model_1.default.findOne({
        username: newHistory.username,
        storyName: newHistory.storyName,
    });
    if (foundHistory) {
        let res = await (0, story_service_1.updateViewCountService)(newHistory.storyName);
        if (res.statusCode !== "200") {
            return res;
        }
        res = await (0, chapter_service_1.updateViewCountChapterService)(newHistory.storyName, (newHistory === null || newHistory === void 0 ? void 0 : newHistory.currentChapter) || -1);
        if (res.statusCode !== "200") {
            return res;
        }
        await history_model_1.default.updateOne({ userName: newHistory.username, storyName: newHistory.storyName }, {
            currentChapter: newHistory.currentChapter,
            avatarStory: newHistory.avatarStory,
        });
        return { statusCode: "200", message: "Cập nhật lịch sử thành công" };
    }
    let res = await (0, story_service_1.updateViewCountService)(newHistory.storyName);
    if (res.statusCode !== "200") {
        return res;
    }
    res = await (0, chapter_service_1.updateViewCountChapterService)(newHistory.storyName, (newHistory === null || newHistory === void 0 ? void 0 : newHistory.currentChapter) || -1);
    if (res.statusCode !== "200") {
        return res;
    }
    await history_model_1.default.create(newHistory);
    return { statusCode: "200", message: "Thêm lịch sử thành công" };
};
exports.createHistoryService = createHistoryService;
const likeHistoryService = async (newHistory) => {
    let foundHistory = await history_model_1.default.findOne({
        username: newHistory.username,
        storyName: newHistory.storyName,
    });
    if (foundHistory) {
        if (foundHistory.liked === newHistory.liked) {
            return { statusCode: "200", message: "Không có gì cần cập nhật" };
        }
        let value = (newHistory === null || newHistory === void 0 ? void 0 : newHistory.liked) === true ? 1 : -1;
        const res = await (0, story_service_1.updateLikeCountService)(newHistory.storyName, value);
        if (res.statusCode !== "200") {
            return res;
        }
        await history_model_1.default.updateOne({ userName: newHistory.username, storyName: newHistory.storyName }, { liked: newHistory.liked });
        return { statusCode: "200", message: "Cập nhật thành công" };
    }
    if ((newHistory === null || newHistory === void 0 ? void 0 : newHistory.liked) === false) {
        return { statusCode: "400", message: "Không thể hủy like" };
    }
    const res = await (0, story_service_1.updateLikeCountService)(newHistory.storyName, 1);
    if (res.statusCode !== "200") {
        return res;
    }
    await history_model_1.default.create(newHistory);
    return { statusCode: "200", message: "Like thành công" };
};
exports.likeHistoryService = likeHistoryService;
const getHistoryService = async (history) => {
    const foundHistory = await history_model_1.default
        .find(history)
        .select("-_id -__v -createdAt")
        .sort({ updatedAt: -1 });
    return {
        statusCode: "200",
        message: "Lấy dữ liệu thành công",
        data: foundHistory,
    };
};
exports.getHistoryService = getHistoryService;
const deleteHistoryService = async (username, storyName) => {
    await history_model_1.default.findOneAndUpdate({ username, storyName }, { currentChapter: 0 });
    return {
        statusCode: "200",
        message: "Xóa lịch sử thành công",
    };
};
exports.deleteHistoryService = deleteHistoryService;
//# sourceMappingURL=history.service.js.map