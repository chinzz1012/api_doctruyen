"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatName = void 0;
const formatName = (text) => {
    text = text.trim();
    text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    while (text.includes("  ") === true) {
        text = text.replaceAll("  ", " ");
    }
    return text;
};
exports.formatName = formatName;
//# sourceMappingURL=formatName.js.map