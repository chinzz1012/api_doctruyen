"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLikeCountService = exports.updateViewCountService = exports.updateStoryService = exports.createStoryService = exports.getStoryByNameService = exports.getStoryByCategoryService = exports.getAllStoryService = void 0;
const story_model_1 = __importDefault(require("../models/story.model"));
const category_service_1 = require("./category.service");
const perPage = 10;
const getAllStoryService = async (page) => {
    if (page === 0) {
        const allStory = await story_model_1.default
            .find({})
            .select("-_id -__v -describe -finished")
            .sort({ viewCount: -1, updatedAt: 1 });
        return {
            statusCode: "200",
            message: "lấy truyện thành công",
            data: allStory,
        };
    }
    const foundStory = await story_model_1.default
        .find({})
        .select("-_id -__v -describe -finished")
        .sort({ viewCount: -1, updatedAt: -1 })
        .skip(perPage * page - perPage)
        .limit(perPage);
    return {
        statusCode: "200",
        message: "Lấy truyện thành công",
        data: foundStory,
    };
};
exports.getAllStoryService = getAllStoryService;
const getStoryByCategoryService = async (category) => {
    const foundStory = await story_model_1.default
        .find({ category: { $regex: category, $options: "i" } })
        .select("-_id -__v -describe -finished")
        .sort({ viewCount: -1, updatedAt: 1 });
    return {
        statusCode: "200",
        message: "Lấy truyện thành công",
        data: foundStory,
    };
};
exports.getStoryByCategoryService = getStoryByCategoryService;
const getStoryByNameService = async (name) => {
    const foundStory = await story_model_1.default
        .findOne({ name: name })
        .select("-_id -__v");
    return {
        statusCode: "200",
        message: "Lấy truyện thành công",
        data: foundStory,
    };
};
exports.getStoryByNameService = getStoryByNameService;
const createStoryService = async (newStory) => {
    const foundStory = (await getStoryByNameService(newStory.name)).data;
    if (foundStory) {
        return { statusCode: "400", message: "Truyện đã tồn tại" };
    }
    const allCategory = (await (0, category_service_1.getAllCategoryService)()).data.toString();
    let check = newStory.category.find((cate) => allCategory.includes(cate) === false);
    if (check) {
        return { statusCode: "400", message: "Danh mục không tồn tại" };
    }
    await story_model_1.default.create(newStory);
    return { statusCode: "200", message: "Tạo truyện thành công" };
};
exports.createStoryService = createStoryService;
const updateStoryService = async (newStory) => {
    const foundStory = (await getStoryByNameService(newStory.name))
        .data;
    if (!foundStory) {
        return { statusCode: "400", message: "Truyện không tồn tại" };
    }
    await story_model_1.default.updateOne({ name: foundStory.name }, {
        creator: newStory.creator || foundStory.creator,
        describe: newStory.describe || foundStory.describe,
        finished: newStory.finished || foundStory.finished,
        category: newStory.category || foundStory.category,
    });
    return { statusCode: "200", message: "Tạo truyện thành công" };
};
exports.updateStoryService = updateStoryService;
const updateViewCountService = async (name) => {
    const foundStory = (await getStoryByNameService(name)).data;
    if (!foundStory) {
        return { statusCode: "400", message: "Truyện không tồn tại" };
    }
    await story_model_1.default.updateOne({ name: foundStory.name }, {
        viewCount: ++foundStory.viewCount,
    });
    return { statusCode: "200", message: "Tạo truyện thành công" };
};
exports.updateViewCountService = updateViewCountService;
const updateLikeCountService = async (name, value) => {
    const foundStory = (await getStoryByNameService(name)).data;
    if (!foundStory) {
        return { statusCode: "400", message: "Truyện không tồn tại" };
    }
    await story_model_1.default.updateOne({ name: foundStory.name }, {
        likeCount: foundStory.likeCount + value,
    });
    return { statusCode: "200", message: "Tạo truyện thành công" };
};
exports.updateLikeCountService = updateLikeCountService;
//# sourceMappingURL=story.service.js.map