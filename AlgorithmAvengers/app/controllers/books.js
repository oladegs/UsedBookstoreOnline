let Book = require("../models/books");

// Create a new book
exports.create = async (req, res) => {
  try {
    const { isbn, category, title, author, condition, price, description, postedBy, expiryDate, active } =
      req.body;
    const newBook = new Book({
      isbn,
      category,
      title,
      author,
      condition,
      price,
      description,
      postedBy,
      expiryDate,
      active
    });

    await newBook.save();
    res
      .status(201)
      .json({ message: "Book created successfully", book: newBook });
      console.log({ isbn, category, title, author, condition, price, description, postedBy,expiryDate, active });
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
    const { category, title, author, condition, price, description,expiryDate, active } = req.body;
    const updatedBook = await Book.findOneAndUpdate(
      { isbn, postedBy: req.user._id },
      { category, title, author, condition, price, description, expiryDate, active },
      { new: true }
    );

    if (updatedBook) {
      res
        .status(200)
        .json({ message: "Book updated successfully", book: updatedBook });
    } else {
      res.status(404).json({ message: "Book not found or unauthorized" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating book", error: error.message });
  }
};


// Find a book by user ID
exports.findBookByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const books = await Book.find({ postedBy: userId });

    if (books) {
      res.status(200).json(books);
    } else {
      res.status(404).json({ message: "Books not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding books", error: error.message });
  }
};
