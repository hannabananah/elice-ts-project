import { Request, Response, NextFunction } from "express";
import {
  list,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../models/post";

const { Router } = require("express");

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  const posts = list();
  console.log("----params-----", req.params);
  console.log("--------body-------", req.body);
  // res.header("Access-Control-Allow-Origin", "*");
  res.json(posts);
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  try {
    const post = getPost(id);
    res.json(post);
  } catch (e) {
    next(e);
  }
});

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  const { title, content } = req.body;
  const post = createPost(title);
  res.json(post);
});

router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;

  try {
    const post = updatePost(content);
    res.json(post);
  } catch (e) {
    next(e);
  }
});

// delete 메서드 정의 : query이기 때문에 :id를 붙일 필요 없음
// params으로 request 보냄
//api 정의하는 방법은 따로 필요
router.delete("/", (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.query.id);
  console.log(req);
  console.log(req.query);
  console.log("delete");
  console.log(id);
  try {
    deletePost(id);
    res.json({ result: "success" });
  } catch (e) {
    next(e);
  }
});

export { router };
