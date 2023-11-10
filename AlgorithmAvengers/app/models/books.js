/*
Book Model:
Fields: isbn, category, title, author, condition, price, description
Purpose: Represents details of each book listing, including title, author, condition, price, and seller information.
*/
let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    isbn: {
      type: String,
      required: "ISBN is required",
      unique: true,
      match: [/^\d{13}$/, "Please fill a valid ISBN number"], // Assuming ISBN-13 format
    },
    category: {
      type: String,
      required: "Category is required",
    },
    title: {
      type: String,
      required: "Title is required",
    },
    author: {
      type: String,
      required: "Author is required",
    },
    condition: {
      type: String,
      required: "Condition is required",
      enum: ["new", "like new", "used", "worn"], // Example condition values
    },
    price: {
      type: Number,
      required: "Price is required",
      min: 0,
    },
    description: {
      type: String,
      required: "Description is required",
    },
  },
  {
    collection: "books", // The name of the collection in the database
    timestamps: true, // If you want to track when books are created or updated
  }
);

module.exports = mongoose.model("Book", BookSchema);
