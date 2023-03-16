"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = __importDefault(require("./user.route"));
const story_route_1 = __importDefault(require("./story.route"));
const category_route_1 = __importDefault(require("./category.route"));
const history_route_1 = __importDefault(require("./history.route"));
const chapter_route_1 = __importDefault(require("./chapter.route"));
const route = (app) => {
    app.use("/user", user_route_1.default);
    app.use("/story", story_route_1.default);
    app.use("/category", category_route_1.default);
    app.use("/chapter", chapter_route_1.default);
    app.use("/history", history_route_1.default);
};
exports.default = route;
//# sourceMappingURL=index.js.map