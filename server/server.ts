const express = require("express");
import { Request, Response, NextFunction } from "express";
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const postRouter = require("./routes/posts");
const app = express();
const port = 3210;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/posts", postRouter);

app.use((req: Request, res: Response) => {
  res.status(404);
  res.send({
    result: "fail",
    error: `Page not found ${req.path}`,
  });
  console.log("404에러");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500);
  res.json({
    result: "fail",
    message: err.message,
  });
  console.log("500에러");
});

app.listen(port, () => {
  console.log(`${port}번 포트에서 서버가 실행되었습니다.`);
});
