"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, { success, message, data = null, error = null }) => {
    res.status(success ? 200 : 400).json({
        success,
        message,
        data,
        error,
    });
};
exports.sendResponse = sendResponse;
