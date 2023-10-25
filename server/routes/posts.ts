import { Request, Response, NextFunction } from "express";
import {
  list,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../service/postService";

const { Router } = require("express");

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  const posts = list();
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

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  // 객체 하나씩 보내지 말고 req.body 채로 data를 넘긴다.
  // const { title, content } = req.body;
  const data = req.body;
  const post = createPost(data);
  res.json(post);
});

// patch로 요청 보낸 것은 patch로 받아야되는걸까나...(modify/index.txs line 26즈음 참고)
router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const data = req.body;

  // patch에 대해서 공부하기
  try {
    const post = updatePost(data);
    console.log("-----data----", data);
    console.log("-----id----", id);
    res.json(post);
  } catch (e) {
    next(e);
  }
});

// delete 메서드 정의 : query이기 때문에 :id를 붙일 필요 없음
// params으로 request 보냄
// api 정의하는 방법은 따로 학습 필요
router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  //  qeury/body/params 중 어떤 방식으로 req가 들어오는지 우선적으로 확인하기
  const id = Number(req.params.id);
  try {
    deletePost(id);
    res.status(200);
    res.json({ result: "success" });
    console.log("success");
  } catch (e) {
    next(e);
    console.log("fail");
  }
});

export { router };
