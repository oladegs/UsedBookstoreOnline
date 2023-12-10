var express = require("express");
var router = express.Router();

let commentController = require("../controllers/comments");

// Define routes
router.post("/create", commentController.create);
router.get("/findbyisbn/:isbn", commentController.findCommentsByBook);

module.exports = router;
