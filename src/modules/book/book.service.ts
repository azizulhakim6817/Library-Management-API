import { Book } from "./book.model";

export const createBook = async (payload: any) => {
  payload.available = payload.copies > 0;
  const newBook = await Book.create(payload);
  return newBook;
};

export const getAllBooks = async (
  filter?: string,
  sortBy?: string,
  sort?: "asc" | "desc",
  limit = 10
) => {
  const query: any = {};
  if (filter) {
    query.genre = filter;
  }

  const books = await Book.find(query)
    .sort({ [sortBy || "createdAt"]: sort === "asc" ? 1 : -1 })
    .limit(Number(limit));

  return books;
};

export const getBookById = async (id: string) => {
  const book = await Book.findById(id);
  return book;
};

export const updateBook = async (id: string, updateData: any) => {
  const book = await Book.findById(id);
  if (!book) {
    throw new Error("Book not found");
  }
  Object.assign(book, updateData);

  if (updateData.copies !== undefined) {
    book.available = updateData.copies > 0;
  }
  await book.updateAvailability();
  await book.save();
  return book;
};

export const deleteBook = async (id: string) => {
  await Book.findByIdAndDelete(id);
  return null;
};
