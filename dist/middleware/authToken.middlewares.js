"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAdmin = exports.authUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authUser = async (req, res, next) => {
    var _a;
    try {
        const accessToken = req.headers.access_token;
        const username = (_a = req.body) === null || _a === void 0 ? void 0 : _a.username;
        if (!accessToken) {
            res
                .status(200)
                .json({ statusCode: "411", message: "Không tìm thấy token" });
            return;
        }
        let key = process.env.JWT_SECRET || "";
        const decoded = jsonwebtoken_1.default.verify(accessToken, key);
        if ((decoded === null || decoded === void 0 ? void 0 : decoded.username) !== username) {
            res.status(200).json({
                statusCode: "412",
                message: "username không đúng",
            });
            return;
        }
        next();
    }
    catch (error) {
        res.status(200).json({ statusCode: "410", message: `${error}` });
    }
};
exports.authUser = authUser;
const authAdmin = async (req, res, next) => {
    try {
        const accessToken = req.headers.access_token;
        if (!accessToken) {
            res
                .status(200)
                .json({ statusCode: "411", message: "Không tìm thấy token" });
            return;
        }
        let key = process.env.JWT_SECRET || "";
        const decoded = jsonwebtoken_1.default.verify(accessToken, key);
        if ((decoded === null || decoded === void 0 ? void 0 : decoded.rule) !== "admin") {
            res.status(200).json({
                statusCode: "412",
                message: "Người dùng không có quyền thay đổi dữ liệu này",
            });
            return;
        }
        next();
    }
    catch (error) {
        res.status(200).json({ statusCode: "410", message: `${error}` });
    }
};
exports.authAdmin = authAdmin;
//# sourceMappingURL=authToken.middlewares.js.map