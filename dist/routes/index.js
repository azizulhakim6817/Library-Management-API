"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_routes_1 = require("../modules/book/book.routes");
const borrow_routes_1 = require("../modules/borrow/borrow.routes");
exports.appRouter = express_1.default.Router();
exports.appRouter.use("/books", book_routes_1.bookRoutes);
exports.appRouter.use("/borrow", borrow_routes_1.borrowRoutes);
