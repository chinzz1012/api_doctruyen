"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = __importDefault(require("../controllers/category.controller"));
const authToken_middlewares_1 = require("../middleware/authToken.middlewares");
const router = express_1.default.Router();
router.get("/get-all-category", category_controller_1.default.getAllCategory);
router.post("/create-category", authToken_middlewares_1.authAdmin, category_controller_1.default.createCategory);
exports.default = router;
//# sourceMappingURL=category.route.js.map