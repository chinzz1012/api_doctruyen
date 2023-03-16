"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chapter_controller_1 = __importDefault(require("../controllers/chapter.controller"));
const authToken_middlewares_1 = require("../middleware/authToken.middlewares");
const router = express_1.default.Router();
router.get("/story/get-chapter", chapter_controller_1.default.getChapterInStory);
router.get("/get-chapter", chapter_controller_1.default.getChapter);
router.post("/create-chapter", authToken_middlewares_1.authAdmin, chapter_controller_1.default.createChapter);
exports.default = router;
//# sourceMappingURL=chapter.route.js.map