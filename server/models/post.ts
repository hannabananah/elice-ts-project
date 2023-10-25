import { Post } from "../types/index";

let posts = [
  {
    id: 1,
    uid: "aaaaa",
    title: "first note",
    content: "My first note is here.",
    createdAt: "20231020",
    updatedAt: "20231020",
  },
  {
    id: 2,
    uid: "bbbbb",
    title: "second note",
    content: "My second note is here.",
    createdAt: "20231020",
    updatedAt: "20231020",
  },
  {
    id: 3,
    uid: "bbbbb",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 4,
    uid: "bbbbdfgdfgb",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 5,
    uid: "bbbdfgdfgfdgfdgb",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 6,
    uid: "1111",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 7,
    uid: "3333",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 8,
    uid: "bbb4444bb",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 9,
    uid: "555",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 10,
    uid: "666",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 11,
    uid: "777",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 12,
    uid: "8888",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 13,
    uid: "999",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 14,
    uid: "00606",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 15,
    uid: "4645",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
];

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
  posts = posts.filter((x) => x.id !== id);
  return;
};

export { list, getPost, createPost, updatePost, deletePost };
