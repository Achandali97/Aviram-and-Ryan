import { Router } from "express";

export const apiRouter = Router();

apiRouter.get("/hello", (_req, res) => {
  res.json({
    message: "Hello from the Node.js TypeScript API",
  });
});
