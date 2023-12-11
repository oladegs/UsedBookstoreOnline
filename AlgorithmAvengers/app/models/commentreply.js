/*
Book Model:
Fields: isbn, category, title, author, condition, price, description
Purpose: Represents details of each book listing, including title, author, condition, price, and seller information.
*/
let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: "Comment Ob is required",
    },
    isbn: {
        type: String,
        required: "Book is required"
    },
    user: {
        type: String,
      },
    comment: {
      type: String,
      required: "Comment is required",
    },
  },
  {
    collection: "commensreply",
    timestamps: true,
  }
);

module.exports = mongoose.model("Commentreply", CommentSchema);
