import { Post } from "./../types/index";
import { Request, Response, NextFunction } from "express";

const { Router } = require("express");
const router = Router();

const Posts = require("../models/schemas/post");

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { uid, content, title, createdAt } = req.body;
  try {
    const post = new Posts({
      uid,
      content,
      title,
      createdAt,
    });

    post
      .save()
      .then((post: any) => {
        res.json(post);
      })
      .catch((err: any) => {
        res.status(500);
      });
  } catch (err) {
    next(err);
  }
});

// Posts 목록 가져오기
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Posts.find({});
    const newPosts = posts.map((post: any) => {
      const obj = { ...post._doc };
      return { ...obj, id: obj._id };
    });
    res.json(newPosts);
  } catch (err) {
    next(err);
  }
});

// Posts 상세 보기
router.get("/:_id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params._id;

    const dePosts = await Posts.findOne({ _id: _id });
    const obj = { ...dePosts._doc };
    const newDePosts = { ...obj, id: obj._id };
    res.json(newDePosts);
  } catch (err) {
    next(err);
  }
});

// Posts 삭제하기
router.delete(
  "/:_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const _id = req.params._id;

      const delPosts = await Posts.deleteOne({ _id: _id });
      console.log(delPosts);
      res.json(delPosts);
    } catch (err) {
      next(err);
    }
  }
);

// Posts 수정하기
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { uid, title, content, updatedAt } = req.body;

    const modiPosts = await Posts.findOneAndUpdate(
      { _id: id },
      {
        uid,
        title,
        content,
        updatedAt,
      }
    );
    res.json(modiPosts);
  } catch (err) {
    next(err);
  }
});

export { router };
