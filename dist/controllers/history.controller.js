"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const history_service_1 = require("../services/history.service");
const getHistoryByUsername = async (req, res) => {
    try {
        const username = req.params.username || "";
        const response = await (0, history_service_1.getHistoryService)({
            username: username,
            currentChapter: { $gte: 1 },
        });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getAllLikeByUsername = async (req, res) => {
    try {
        const username = req.params.username || "";
        const response = await (0, history_service_1.getHistoryService)({
            userName: username,
            liked: true,
        });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getLike = async (req, res) => {
    var _a, _b;
    try {
        const username = ((_a = req.query.username) === null || _a === void 0 ? void 0 : _a.toString()) || "";
        const storyName = ((_b = req.query.storyName) === null || _b === void 0 ? void 0 : _b.toString()) || "";
        const response = await (0, history_service_1.getHistoryService)({
            userName: username,
            liked: true,
            storyName: storyName,
        });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const createHistory = async (req, res) => {
    try {
        const newHistory = {
            username: req.body.username,
            storyName: req.body.storyName,
            currentChapter: Number(req.body.currentChapter),
        };
        const response = await (0, history_service_1.createHistoryService)(newHistory);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const deleteHistory = async (req, res) => {
    try {
        const { username, storyName } = req.body;
        const response = await (0, history_service_1.deleteHistoryService)(username, storyName);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const likeStory = async (req, res) => {
    try {
        const newHistory = {
            username: req.body.username,
            storyName: req.body.storyName,
            liked: req.body.liked,
        };
        const response = await (0, history_service_1.likeHistoryService)(newHistory);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
exports.default = {
    getHistoryByUsername,
    deleteHistory,
    getLike,
    getAllLikeByUsername,
    createHistory,
    likeStory,
};
//# sourceMappingURL=history.controller.js.map