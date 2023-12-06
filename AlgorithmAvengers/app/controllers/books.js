let Book = require("../models/books");

// Create a new book
exports.create = async (req, res) => {
  try {
    console.log('hellooooooooooooooo', req.body)
    const { isbn, category, title, author, condition, price, description, expiryDate  } =
      req.body;
    const newBook = new Book({
      isbn,
      category,
      title,
      author,
      condition,
      price,
      description,
      expiryDate, // Include the expiryDate field here
    });

    await newBook.save();
    res
      .status(201)
      .json({ message: "Book created successfully", book: newBook });
      console.log({ isbn, category, title, author, condition, price, description, expiryDate  });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating book", error: error.message });
  }
};

// Retrieve all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching books", error: error.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const { isbn } = req.params;
    const { category, title, author, condition, price, description, expiryDate  } = req.body;
    const updatedBook = await Book.findOneAndUpdate(
      { isbn },
      { category, title, author, condition, price, description, expiryDate  },
      { new: true }
    );

    if (updatedBook) {
      res
        .status(200)
        .json({ message: "Book updated successfully", book: updatedBook });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating book", error: error.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const { isbn } = req.params;
    const deletedBook = await Book.findOneAndDelete({ isbn });

    if (deletedBook) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting book", error: error.message });
  }
};

// Find a book by ISBN
exports.findBookByISBN = async (req, res) => {
  try {
    const { isbn } = req.params;
    const book = await Book.findOne({ isbn });

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding book", error: error.message });
  }
};
