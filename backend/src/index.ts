import "dotenv/config";
import cors from "cors";
import express from "express";
import { apiRouter } from "./routes/api.js";
import { healthRouter } from "./routes/health.js";

const app = express();
const port = Number(process.env.PORT) || 3002;

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: frontendOrigin.split(",").map((origin) => origin.trim()),
  }),
);
app.use(express.json());

app.use("/health", healthRouter);
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
