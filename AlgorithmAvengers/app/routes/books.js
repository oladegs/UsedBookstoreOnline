var express = require("express");
var router = express.Router();

let bookController = require("../controllers/books");

// Define routes
router.post("/books", bookController.createBook);
router.get("/books", bookController.getAllBooks);
router.put("/books/:isbn", bookController.updateBook);
router.delete("/books/:isbn", bookController.deleteBook);
router.get("/books/:isbn", bookController.findBookByISBN);

module.exports = router;
