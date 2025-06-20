"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("./book.model");
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = yield book_model_1.Book.create(payload);
    return newBook;
});
exports.createBook = createBook;
const getAllBooks = (filter_1, sortBy_1, sort_1, ...args_1) => __awaiter(void 0, [filter_1, sortBy_1, sort_1, ...args_1], void 0, function* (filter, sortBy, sort, limit = 10) {
    const query = {};
    if (filter) {
        query.genre = filter;
    }
    const books = yield book_model_1.Book.find(query)
        .sort({ [sortBy || "createdAt"]: sort === "asc" ? 1 : -1 })
        .limit(Number(limit));
    return books;
});
exports.getAllBooks = getAllBooks;
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(id);
    return book;
});
exports.getBookById = getBookById;
const updateBook = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    return book;
});
exports.updateBook = updateBook;
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield book_model_1.Book.findByIdAndDelete(id);
    return null;
});
exports.deleteBook = deleteBook;
