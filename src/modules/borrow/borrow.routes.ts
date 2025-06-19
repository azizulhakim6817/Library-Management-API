import express from "express";
import { borrowBook, getBorrowSummary } from "./borrow.controller";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", borrowBook);
borrowRoutes.get("/", getBorrowSummary);
