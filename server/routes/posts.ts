import { Request, Response, NextFunction } from "express";
import { list, get, create, update, del } from "../models/schemas/post";

const { Router } = require("express");

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  const posts = list();
  console.log("----params-----", req.params);
  console.log("--------body-------", req.body);
  res.header("Access-Control-Allow-Origin", "*");
  res.json(posts);
});

// router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
//   const id = Number(req.params.id);

//   try {
//     const post = get(id);
//     res.json(post);
//   } catch (e) {
//     next(e);
//   }
// });

// router.post("/", (req: Request, res: Response, next: NextFunction) => {
//   const { title, content } = req.body;
//   const post = create(title, content);
//   res.json(post);
// });

// router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
//   const id = Number(req.params.id);
//   const { title, content } = req.body;

//   try {
//     const post = update(id);
//     res.json(post);
//   } catch (e) {
//     next(e);
//   }
// });

router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  try {
    del(id);
    res.json({ result: "success" });
  } catch (e) {
    next(e);
  }
});

export { router };
