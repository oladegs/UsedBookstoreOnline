let Comment = require("../models/comments");

// Create a new comment
exports.create = async (req, res) => {
  try {
    const { isbn, user, comment} =
      req.body;
    const newComment = new Comment({
      isbn,
      user,
      comment
    });
    console.log(newComment);
    await newComment.save();
    

    res
      .status(201)
      .json({ message: "Comment created successfully", comment: newComment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating comment", error: error.message });
  }
};


exports.findCommentsByBook = async (req, res) => {
    try {
      const { isbn } = req.params;
      console.log('Received ISBN:', isbn);
      const comments = await  Comment.find({ isbn: isbn });
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ message: "Comments not found for isbn: " + isbn});
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error finding comments", error: error.message });
    }
  };