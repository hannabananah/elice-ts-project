const { Schema } = require("mongoose");

export {};
const PostSchema = new Schema({
  id: {
    type: String,
  },
  uid: {
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
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = PostSchema;
