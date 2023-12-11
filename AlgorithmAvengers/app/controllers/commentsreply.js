let CommentReply = require("../models/commentreply");
let Comments = require("../models/comments");
let mongoose = require("mongoose");

// Create a new comment
exports.create = async (req, res) => {
    try {
        const { isbn, user, comment, comment_id } =
            req.body;



        const newComment = new CommentReply({
            comment_id: new mongoose.Types.ObjectId(comment_id),
            isbn,
            user,
            comment
        });
        console.log('NC',newComment);

        await newComment.save();
        const updatedComment = await Comments.findByIdAndUpdate(
            comment_id,
            { $push: { commentDetails: newComment._id } },
            { new: true }
          );

        console.log('Comment founded '+updatedComment);

        res
            .status(201)
            .json({ message: "Comment created successfully", comment: newComment });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error creating comment", error: error.message });
    }
};

exports.findCommentsByComment = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Received ISBN:', id);
        const comments = await CommentReply.find({ _id: id });
        if (comments) {
            res.status(200).json(comments);
        } else {
            res.status(200).json({ message: "Comments not found for isbn: " + isbn });
        }
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error finding comments", error: error.message });
    }
};