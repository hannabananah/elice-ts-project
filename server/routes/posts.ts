const { Router } = require("express");
import { Request, Response, NextFunction } from "express";
const { Post } = require("../models");
import { PostType } from "../types";

const router = Router();

// 게시물 리스트
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await Post.find({});
    const newPost = post.map((post: PostType) => {
      const obj = { ...post._doc };
      return { ...obj, id: obj._id };
    });
    res.json(newPost);
  } catch (e) {
    next(e);
  }
});

// 게시물 등록 ******
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { uid, content, title, createdAt } = req.body;
  try {
    const post = Post.create({
      uid,
      content,
      title,
      createdAt,
    });
    res.json(post);
  } catch (e) {
    next(e);
  }
});

// 게시물 상세
router.get("/:_id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.params;

    const post = await Post.findOne({ _id: _id });
    const obj = { ...post._doc };
    const newPost = { ...obj, id: obj._id };
    res.json(newPost);
  } catch (e) {
    next(e);
  }
});

// 게시물 삭제
router.delete(
  "/:_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.params;

      const post = await Post.deleteOne({ _id: _id });
      res.json(post);
    } catch (e) {
      next(e);
    }
  }
);

// 게시물 수정
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, content, updatedAt } = req.body;

    const post = await Post.updateOne(
      { _id: id },
      {
        title,
        content,
        updatedAt,
      }
    );
    res.json(post);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
