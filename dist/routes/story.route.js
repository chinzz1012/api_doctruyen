"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const story_controller_1 = __importDefault(require("../controllers/story.controller"));
const authToken_middlewares_1 = require("../middleware/authToken.middlewares");
const router = express_1.default.Router();
router.get("/get-all-story", story_controller_1.default.getAllStory);
router.get("/get-story", story_controller_1.default.getStory);
router.post("/create-story", authToken_middlewares_1.authAdmin, story_controller_1.default.createStory);
router.post("/update-story", authToken_middlewares_1.authAdmin, story_controller_1.default.updateStory);
exports.default = router;
//# sourceMappingURL=story.route.js.map