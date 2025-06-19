import { Borrow } from "./borrow.model";
import { Book } from "../book/book.model";

export const borrowBook = async (
  bookId: string,
  quantity: number,
  dueDate: Date
) => {
  const book = await Book.findById(bookId);
  if (!book) throw new Error("Book not found");

  if (book.copies < quantity) throw new Error("Not enough copies available");

  book.copies -= quantity;
  if (book.copies === 0) {
    book.available = false;
  }

  await book.save();

  const borrowRecord = await Borrow.create({
    book: bookId,
    quantity,
    dueDate,
  });

  return borrowRecord;
};

export const getBorrowSummary = async () => {
  const borrowSummary = await Borrow.aggregate([
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
};
