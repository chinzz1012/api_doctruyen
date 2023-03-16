"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const history_controller_1 = __importDefault(require("../controllers/history.controller"));
const authToken_middlewares_1 = require("../middleware/authToken.middlewares");
const router = express_1.default.Router();
router.get("/get-history/:username", history_controller_1.default.getHistoryByUsername);
router.get("/get-like/:username", history_controller_1.default.getAllLikeByUsername);
router.get("/get-like", history_controller_1.default.getLike);
router.post("/like-story", authToken_middlewares_1.authUser, history_controller_1.default.likeStory);
router.post("/create-history", authToken_middlewares_1.authUser, history_controller_1.default.createHistory);
router.put("/delete-history", authToken_middlewares_1.authUser, history_controller_1.default.deleteHistory);
exports.default = router;
//# sourceMappingURL=history.route.js.map