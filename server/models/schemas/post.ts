import { Post } from "../../types/index";

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

const get = (id: Number) => {
  const note = posts.find((note) => note.id === id);

  if (!note) {
    throw new Error("Post not found");
  }
  return note;
};

const create = (post: Post): Post => {
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

const update = (post: Post) => {
  const index = posts.findIndex((note) => note.id === post.id);

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

const del = (id: Number) => {
  if (!posts.some((note) => note.id === id)) {
    throw new Error("Post not found for delete");
  }

  posts = posts.filter((note) => note.id !== id);

  return;
};

export { list, get, create, update, del };
