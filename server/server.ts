import { NextFunction, Request, Response } from "express";
import { router as postsRouter } from "./Routes/posts";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MONGO_USER, MONGO_PASS } = process.env;
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.eribjyc.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("연결됨");
  })
  .catch((err: any) => {
    console.log(err);
  });

app.use(cors());

app.use("/posts", postsRouter);

app.use((req: Request, res: Response) => {
  res.status(404);
  res.send({
    result: "fail",
    error: `Page not found ${req.path}`,
  });
  console.log("404에러 발생");
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500);

  res.json({
    result: "fail",
    error: err.message,
  });
  console.log("500에러 발생");
});

app.listen(3210, () => {
  console.log("3210번 포트에서 서버가 실행되었습니다!");
});
