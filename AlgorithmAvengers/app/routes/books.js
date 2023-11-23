var express = require("express");
var router = express.Router();

let bookController = require("../controllers/books");

// Define routes
router.post("/create", bookController.create);
router.get("/get", bookController.getAllBooks);
router.put("/update/:isbn", bookController.updateBook);
router.delete("/delete/:isbn", bookController.deleteBook);
router.get("/find/:isbn", bookController.findBookByISBN);

module.exports = router;
