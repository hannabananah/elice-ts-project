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
    id: 3,
    uid: "bbbdfgdfgfdgfdgb",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 3,
    uid: "1111",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 3,
    uid: "3333",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 3,
    uid: "bbb4444bb",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 3,
    uid: "555",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 3,
    uid: "666",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 3,
    uid: "777",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 3,
    uid: "8888",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 3,
    uid: "999",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 3,
    uid: "00606",
    title: "third note",
    content: "My third note is here.",
    createdAt: "20231022",
    updatedAt: "20231022",
  },
  {
    id: 3,
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

const getPost = (id: Number) => {
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

const updatePost = (post: Post) => {
  const index = posts.findIndex((x) => x.id === post.id);

  if (index < 0) {
    throw new Error("Post not found for update");
  }
  const note = posts[index];
  note.title = post.title;
  note.content = post.content;
  note.createdAt = post.createdAt;
  note.updatedAt = post.updatedAt;

  posts[index] = note;
  return note;
};

const deletePost = (id: Number) => {
  if (!posts.some((x) => x.id === id)) {
    throw new Error("Post not found for delete");
  }

  posts = posts.filter((x) => x.id !== id);

  return;
};

export { list, getPost, createPost, updatePost, deletePost };
