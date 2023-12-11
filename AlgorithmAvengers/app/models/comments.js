/*
Book Model:
Fields: isbn, category, title, author, condition, price, description
Purpose: Represents details of each book listing, including title, author, condition, price, and seller information.
*/
let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
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
        commentDetails: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Commentreply'
            }
        ]
    },
    {
        collection: "comments",
        timestamps: true,
    }
);

module.exports = mongoose.model("Comment", CommentSchema);
