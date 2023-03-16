"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = express_1.default.Router();
router.get("/verify/:email/:uniqueString", user_controller_1.default.verifyEmail);
router.get("/verified", user_controller_1.default.verified);
router.get("/get-user", user_controller_1.default.getUser);
router.post("/create-user", user_controller_1.default.createUser);
router.post("/login", user_controller_1.default.login);
router.post("/login-token", user_controller_1.default.loginByToken);
exports.default = router;
//# sourceMappingURL=user.route.js.map