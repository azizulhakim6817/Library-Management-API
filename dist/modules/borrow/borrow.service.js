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
exports.getBorrowSummary = exports.borrowBook = void 0;
const borrow_model_1 = require("./borrow.model");
const book_model_1 = require("../book/book.model");
const borrowBook = (bookId, quantity, dueDate) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(bookId);
    if (!book)
        throw new Error("Book not found");
    if (book.copies < quantity)
        throw new Error("Not enough copies available");
    book.copies -= quantity;
    if (book.copies === 0) {
        book.available = false;
    }
    yield book.save();
    const borrowRecord = yield borrow_model_1.Borrow.create({
        book: bookId,
        quantity,
        dueDate,
    });
    return borrowRecord;
});
exports.borrowBook = borrowBook;
const getBorrowSummary = () => __awaiter(void 0, void 0, void 0, function* () {
    const borrowSummary = yield borrow_model_1.Borrow.aggregate([
        {
            $group: {
                _id: "$book",
                totalQuantity: { $sum: "$quantity" },
            },
        },
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "book",
            },
        },
        {
            $unwind: "$book",
        },
        {
            $project: {
                "book.title": 1,
                "book.isbn": 1,
                totalQuantity: 1,
            },
        },
    ]);
    return borrowSummary;
});
exports.getBorrowSummary = getBorrowSummary;
