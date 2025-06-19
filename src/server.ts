import { app } from "./app";
import { connectDB } from "./config/database";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
});
