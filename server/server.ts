import { Request, Response } from "express";
import { router as postsRouter } from "./Routes/posts";

const express = require("express");

const app = express();

app.use(express.json());

app.use("/posts", postsRouter);

app.use((req: Request, res: Response) => {
  res.status(404);
  res.send({
    result: "fail",
    error: `Page not found ${req.path}`,
  });
  console.log("404에러 발생");
});

app.use((err: Error, req: Request, res: Response) => {
  res.status(500);

  res.json({
    result: "fail",
    error: err.message,
  });
  console.log("500에러 발생");
});

app.listen(3003, () => {
  console.log("3001번 포트에서 서버가 실행되었습니다!");
});
