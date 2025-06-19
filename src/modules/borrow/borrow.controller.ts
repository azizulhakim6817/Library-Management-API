import { Request, Response } from "express";
import * as BorrowService from "./borrow.service";
import { sendResponse } from "../../utils/sendResponse";

export const borrowBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { book, quantity, dueDate } = req.body;

    const borrowRecord = await BorrowService.borrowBook(
      book,
      quantity,
      new Date(dueDate)
    );

    sendResponse(res, {
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord,
    });
  } catch (error: any) {
    sendResponse(res, {
      success: false,
      message: "Failed to borrow book",
      error: error?.message || error,
    });
  }
};

// GET /api/borrow
export const getBorrowSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const summary = await BorrowService.getBorrowSummary();

    sendResponse(res, {
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error: any) {
    sendResponse(res, {
      success: false,
      message: "Failed to retrieve borrowed books summary",
      error: error?.message || error,
    });
  }
};
