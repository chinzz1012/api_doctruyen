"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendFileUnity = (req, res, next) => {
    let options = {
        root: "./uploads",
    };
    let fileName = req.params.fileName;
    res.sendFile(fileName, options, (err) => {
        if (err) {
            next(err);
            return;
        }
        console.log("Send file name :", fileName);
    });
};
exports.default = {
    sendFileUnity,
};
//# sourceMappingURL=file.controller.js.map