import axios from "axios";
import { BoardType as Post } from "~/BoardType";

export const getPostAll = () => {
  return axios.get("http://localhost:3210/posts").then((res) => {
    const posts = res.data;
    return posts.map((post: Post, index: number) => {
      const newPost = { ...post, pageIndex: index + 1 };
      return newPost;
    });
  });
};

// 각 동작마다 오류처리 실행되도록(get, delete)=>axios에 대한 오류처리하기(then/catch 사용 or try/catch)

// export const getPostOne = (id: number) => {};

// export const deletePost = (id: number) => {};

// "아이디랑 바디(어떤 타입만 받을건지, 정하기)" 둘다 넘길지, 바디만 넘길지 생각해봐야함
// export const putPostOne = (id: number, body) => {};
