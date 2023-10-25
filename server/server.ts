import { Request, Response } from "express";
import { router as postsRouter } from "./Routes/posts";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MONGO_USER, MONGO_PASS } = process.env;
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// 몽고 연결
mongoose
  .connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.eribjyc.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("연결됨");
  })
  .catch((err:any) => {
    console.log(err);
  });

// CORS 설정을 전역으로 해줌
// put, delete : CORS를 일부러 걸어놓음 -> 그래서 이걸 따로 설정해줘야함(요청을 put, delete로 보내는 경우 CORS 정책 적용 안하도록)
// 그래서 그냥 전역으로 설정해서 다 통과되게 함.
// (정확하지 않음)
app.use(
  cors()
  // 없어도 됨(기본값)
  //   {
  //   origin: "*",
  //   optionsSuccessStatus: 200,
  //   Credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  // }
);

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
