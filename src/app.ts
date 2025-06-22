import express, { Application, Request, Response } from "express";
import cors from "cors";
import { appRouter } from "./routes";

export const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api", appRouter);
