import posts from "../models/post";
import { Post } from "../types/index";

const list = () => {
  return posts.map(({ id, uid, title, content, createdAt, updatedAt }) => ({
    id,
    uid,
    title,
    content,
    createdAt,
    updatedAt,
  }));
};

const getPost = async (id: Number) => {
  const note = posts.find((x) => x.id === id);

  if (!note) {
    throw new Error("Post not found");
  }
  return note;
};

const createPost = (post: Post): Post => {
  const { id: lastId } = posts[posts.length - 1];
  const newPost = {
    id: lastId + 1,
    uid: post.uid,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
  posts.push(newPost);
  return newPost;
};

// request body에 update data를 받아서 데이터가 저장되어 있는 곳의 정보를 업데이트
const updatePost = (post: Omit<Post, "createdAt">) => {
  // 1. update될 항목을 찾는다.
  const index = posts.findIndex((x) => x.id === Number(post.id));
  console.log(post);
  if (index < 0) {
    throw new Error("Post not found for update");
  }
  // 2. 해당 항목을 받아온 데이터로 바꾼다.
  const note = posts[index];
  note.id = Number(post.id);
  note.uid = post.uid;
  note.title = post.title;
  note.content = post.content;
  note.updatedAt = post.updatedAt;

  posts[index] = note;
  return note;
};

const deletePost = (id: Number) => {
  // 일치하는 아이디값이 없으면 에러
  if (!posts.some((x) => x.id === id)) {
    throw new Error("Post not found for delete");
  }
  // 일치하지 않는 데이터들만 남음
  const filtered = posts.filter((x) => x.id !== id);

  return;
};

export { list, getPost, createPost, updatePost, deletePost };
