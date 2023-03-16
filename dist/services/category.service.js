"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategoryService = exports.createCategoryService = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
const createCategoryService = async (newCategory) => {
    const foundCategory = await category_model_1.default.findOne({ name: newCategory.name });
    if (foundCategory) {
        return { statusCode: "400", message: "Danh mục đã tồn tại" };
    }
    await category_model_1.default.create(newCategory);
    return { statusCode: "200", message: "tạo danh mục thành công" };
};
exports.createCategoryService = createCategoryService;
const getAllCategoryService = async () => {
    const allCategory = await category_model_1.default
        .find({})
        .select("-_id -__v -createdAt -updatedAt")
        .sort({ name: 1 });
    return {
        statusCode: "200",
        message: "Lấy danh mục thành công",
        data: allCategory,
    };
};
exports.getAllCategoryService = getAllCategoryService;
//# sourceMappingURL=category.service.js.map