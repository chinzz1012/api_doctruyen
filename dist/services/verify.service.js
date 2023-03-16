"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVerifyService = exports.deleteVerifyService = exports.createVerifyService = void 0;
const verify_model_1 = __importDefault(require("../models/verify.model"));
const EFFECTIVE_SECONDS = 3600;
const createVerifyService = async (newVerify) => {
    newVerify.effectiveSeconds = EFFECTIVE_SECONDS;
    await verify_model_1.default.create(newVerify);
    return { statusCode: "200", message: "tạo mã xác thực thành công" };
};
exports.createVerifyService = createVerifyService;
const getVerifyService = async (email, uniqueString) => {
    const foundVerify = await verify_model_1.default.findOne({
        email: email,
        uniqueString: uniqueString,
    });
    return {
        statusCode: "200",
        message: "lấy mã xác thực thành công",
        data: foundVerify,
    };
};
exports.getVerifyService = getVerifyService;
const deleteVerifyService = async (email) => {
    await verify_model_1.default.deleteMany({
        email: email,
    });
};
exports.deleteVerifyService = deleteVerifyService;
//# sourceMappingURL=verify.service.js.map