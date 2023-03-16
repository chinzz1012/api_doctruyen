"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const logging_1 = __importDefault(require("./config/logging"));
const index_1 = __importDefault(require("./routes/index"));
const NAME_SPACE = "Server";
const app = (0, express_1.default)();
mongoose_1.default.set("strictQuery", true);
mongoose_1.default
    .connect(config_1.default.mongo.url, config_1.default.mongo.options)
    .then(() => {
    logging_1.default.info(NAME_SPACE, "Mongo Connected");
})
    .catch((err) => {
    logging_1.default.error(NAME_SPACE, err.message, err);
});
app.use((0, cors_1.default)({ origin: "*", methods: "*", optionsSuccessStatus: 200 }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, index_1.default)(app);
app.use((_req, res, _next) => {
    const error = new Error("Not found");
    res.status(404).json({
        message: error.message,
    });
});
const httpServer = http_1.default.createServer(app);
httpServer.listen(config_1.default.server.port, () => {
    logging_1.default.info(NAME_SPACE, `Server is running http://${config_1.default.server.hostname}:${config_1.default.server.port}`);
});
//# sourceMappingURL=index.js.map