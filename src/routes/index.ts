import express from "express";
import { bookRoutes } from "../modules/book/book.routes";
import { borrowRoutes } from "../modules/borrow/borrow.routes";

export const appRouter = express.Router();

appRouter.use("/books", bookRoutes);
appRouter.use("/borrow", borrowRoutes);
