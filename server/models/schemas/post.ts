import mongoose from "mongoose";
import { Post } from "../../types/index";
const { Schema } = mongoose;

// id: Number, uid, title,content, createdAt, updateAt 의 type은 String이며 필수로 들어가야하는 값
let posts = new Schema ({
  id: {
    // 변경사항
    type: String,
    required: false,
  },
      uid:{
    type: String,
    required: true,
  },
      title: {
    type: String,
    required: true,
  },
      content: {
    type: String,
    required: true,
  },
      createdAt: {
    type: String,
    required: true,
  },
      updatedAt: {
    type: String,
    required: false,
  }
})

   module.exports = mongoose.model("posts",posts);
