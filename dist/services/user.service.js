"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserService = exports.loginByTokenService = exports.loginService = exports.getUserService = exports.createUserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ACCESS_TIME = 1800;
const REFRESH_TIME = 864000;
const createUserService = async (newUser) => {
    if (newUser.username.includes(" ") === true) {
        return {
            statusCode: "400",
            message: "Tên đăng nhập không được chứ khoảng trắng",
        };
    }
    const foundUser = await user_model_1.default.findOne({
        $or: [{ email: newUser.email }, { username: newUser.username }],
    });
    if ((foundUser === null || foundUser === void 0 ? void 0 : foundUser.verified) === true) {
        return { statusCode: "400", message: "Tài khoản đã tồn tại" };
    }
    if ((foundUser === null || foundUser === void 0 ? void 0 : foundUser.verified) === false &&
        foundUser.email !== newUser.email &&
        foundUser.username === newUser.username) {
        return { statusCode: "400", message: "Tên tài khoản đã tồn tại" };
    }
    if ((foundUser === null || foundUser === void 0 ? void 0 : foundUser.verified) === false && foundUser.email === newUser.email) {
        await user_model_1.default.deleteOne({
            email: foundUser.email,
        });
    }
    newUser.password = bcrypt_1.default.hashSync(newUser.password, bcrypt_1.default.genSaltSync(8));
    await user_model_1.default.create(newUser);
    return { statusCode: "200", message: "Tạo tài khoản thành công" };
};
exports.createUserService = createUserService;
const getUserService = async (username, email) => {
    const foundUser = await user_model_1.default
        .findOne({
        $or: [{ email: email }, { username: username }],
        lock: false,
        verified: true,
    })
        .select("-_id -__v -password");
    return {
        statusCode: "200",
        message: "lấy người dùng thành công",
        data: foundUser,
    };
};
exports.getUserService = getUserService;
const getToken = (username, role, type) => {
    let key = process.env.JWT_SECRET || "";
    const payload = {
        username: username,
        rule: role || "",
    };
    if (type === "accessToken") {
        const accessToken = jsonwebtoken_1.default.sign(payload, key, {
            expiresIn: ACCESS_TIME,
        });
        return accessToken;
    }
    const refreshToken = jsonwebtoken_1.default.sign(payload, key, {
        expiresIn: REFRESH_TIME,
    });
    return refreshToken;
};
const loginByTokenService = async (token) => {
    let key = process.env.JWT_SECRET || "";
    try {
        const decoded = jsonwebtoken_1.default.verify(token, key);
        const foundUser = await user_model_1.default
            .findOne({
            username: decoded === null || decoded === void 0 ? void 0 : decoded.username,
            verified: true,
            locked: false,
        })
            .select("-_id -__v -password -verified -locked -createdAt -updatedAt");
        if ((foundUser === null || foundUser === void 0 ? void 0 : foundUser.refreshToken) !== token) {
            return { statusCode: "401", message: "refresh token không đúng" };
        }
        const accessToken = getToken(foundUser.username, foundUser === null || foundUser === void 0 ? void 0 : foundUser.role, "accessToken");
        const newUser = foundUser;
        return {
            statusCode: "200",
            message: "Đăng nhập thành công ",
            data: Object.assign(Object.assign({}, newUser._doc), { accessToken }),
        };
    }
    catch (error) {
        return { statusCode: "402", message: "token đã hết hạn" };
    }
};
exports.loginByTokenService = loginByTokenService;
const loginService = async (id, password) => {
    let foundUser = await user_model_1.default
        .findOne({
        $or: [{ email: id }, { username: id }],
        verified: true,
        locked: false,
    })
        .select("-_id -__v -verified -locked -createdAt -updatedAt");
    if (!foundUser) {
        return { statusCode: "400", message: "không tìm thấy tài khoản" };
    }
    const checkPass = bcrypt_1.default.compareSync(password, foundUser.password);
    if (checkPass === false) {
        return { statusCode: "400", message: "mật khẩu không đúng" };
    }
    let refreshToken = "";
    let key = process.env.JWT_SECRET || "";
    if (!foundUser.refreshToken) {
        refreshToken = getToken(foundUser.username, foundUser === null || foundUser === void 0 ? void 0 : foundUser.role, "refreshToken");
        await user_model_1.default.updateOne({ username: foundUser.username }, { refreshToken: refreshToken });
    }
    if (foundUser === null || foundUser === void 0 ? void 0 : foundUser.refreshToken) {
        try {
            jsonwebtoken_1.default.verify(foundUser === null || foundUser === void 0 ? void 0 : foundUser.refreshToken, key);
            refreshToken = foundUser === null || foundUser === void 0 ? void 0 : foundUser.refreshToken;
        }
        catch (error) {
            refreshToken = getToken(foundUser.username, foundUser === null || foundUser === void 0 ? void 0 : foundUser.role, "refreshToken");
            await user_model_1.default.updateOne({ username: foundUser.username }, { refreshToken: refreshToken });
        }
    }
    const accessToken = getToken(foundUser.username, foundUser === null || foundUser === void 0 ? void 0 : foundUser.role, "accessToken");
    foundUser.password = "";
    const newUser = foundUser;
    return {
        statusCode: "200",
        message: "Đăng nhập thành công",
        data: Object.assign(Object.assign({}, newUser === null || newUser === void 0 ? void 0 : newUser._doc), { accessToken, refreshToken }),
    };
};
exports.loginService = loginService;
const verifyUserService = async (email) => {
    await user_model_1.default.updateOne({
        email: email,
    }, { verified: true });
};
exports.verifyUserService = verifyUserService;
//# sourceMappingURL=user.service.js.map