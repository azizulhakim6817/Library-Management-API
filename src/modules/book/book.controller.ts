import { Request, Response } from "express";
import * as BookService from "./book.service";
import { sendResponse } from "../../utils/sendResponse";

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await BookService.createBook(req.body);
    sendResponse(res, {
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    sendResponse(res, {
      success: false,
      message: "Book creation failed",
      error,
    });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;
    const books = await BookService.getAllBooks(
      filter as string,
      sortBy as string,
      sort as "asc" | "desc",
      Number(limit)
    );
    sendResponse(res, {
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    sendResponse(res, {
      success: false,
      message: "Failed to retrieve books",
      error,
    });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const book = await BookService.getBookById(bookId);
    sendResponse(res, {
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    sendResponse(res, {
      success: false,
      message: "Failed to retrieve book",
      error,
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const book = await BookService.updateBook(bookId, req.body);
    sendResponse(res, {
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    sendResponse(res, {
      success: false,
      message: "Failed to update book",
      error,
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    await BookService.deleteBook(bookId);
    sendResponse(res, {
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    sendResponse(res, {
      success: false,
      message: "Failed to delete book",
      error,
    });
  }
};
