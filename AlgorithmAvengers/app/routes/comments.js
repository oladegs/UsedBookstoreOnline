var express = require("express");
var router = express.Router();

let commentController = require("../controllers/comments");
let commentReplyController = require("../controllers/commentsreply");

// Define routes
router.post("/create", commentController.create);
router.get("/findbyisbn/:isbn", commentController.findCommentsByBook);

router.post("/createReply", commentReplyController.create);
router.get("/findbycomment/:id", commentReplyController.findCommentsByComment);

module.exports = router;
