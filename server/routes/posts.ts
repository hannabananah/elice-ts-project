import { Post } from "./../types/index";
import { Request, Response, NextFunction } from "express";
// import {
//   list,
//   getPost,
//   createPost,
//   updatePost,
//   deletePost,
// } from "../models/post";

const { Router } = require("express");
const router = Router();

const Posts = require("../models/post");

// make-user
// /make-user 경로에 body값인 id,uid,content,title, createdAt, updateAt post요청을 한다
// post에 Post값을 넣어준다
// post는 저장하고 응답을 보낸다
// 에러가 잡히면 500상태를 보낸다
// 등록(일반적으로)
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
    // Posts의 전체 목록을 posts에 찾는다
    const posts = await Posts.find({});
    // 새로운 배열을 받아서 return
    const newPosts = posts.map((post: any) => {
      const obj = { ...post._doc };
      return { ...obj, id: obj._id };
    });
    console.log(newPosts);
    // post를 json형식으로 받아온다.
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
    console.log(newDePosts);

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
    console.log(modiPosts);
    res.json(modiPosts);
  } catch (err) {
    next(err);
  }
});

//********
// router.get("/", (req: Request, res: Response, next: NextFunction) => {
//   const posts = list();
//   // res.header("Access-Control-Allow-Origin", "*");
//   res.json(posts);
// });

// // 특정 유저 게시물 상세보기
// router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
//   const id = Number(req.params.id);

//   try {
//     const post = await getPost(id);
//     res.json(post);
//   } catch (e) {
//     next(e);
//   }
// });

// router.post("/", async (req: Request, res: Response, next: NextFunction) => {
//   // 객체 하나씩 보내지 말고 req.body 채로 data를 넘긴다.
//   // const { title, content } = req.body;
//   const data = req.body;
//   const post = createPost(data);
//   res.json(post);
// });

// // patch로 요청 보낸 것은 patch로 받아야되는걸까나...(modify/index.txs line 26즈음 참고)
// router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
//   const id = Number(req.params.id);
//   const data = req.body;

//   // patch에 대해서 공부하기
//   try {
//     const post = updatePost(data);
//     res.json(post);
//   } catch (e) {
//     next(e);
//   }
// });

// // delete 메서드 정의 : query이기 때문에 :id를 붙일 필요 없음
// // params으로 request 보냄
// // api 정의하는 방법은 따로 학습 필요
// router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
//   //  query/body/params 중 어떤 방식으로 req가 들어오는지 우선적으로 확인하기
//   const id = Number(req.params.id);
//   try {
//     const data = deletePost(id);
//     res.status(200);
//     res.json(data);
//     // res.json({ result: "success" });
//     console.log("success");
//   } catch (e) {
//     next(e);
//     console.log("fail");
//   }
// });

export { router };
