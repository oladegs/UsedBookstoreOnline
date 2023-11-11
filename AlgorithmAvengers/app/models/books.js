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
      match: [/^\d{13}$/, "Please fill a valid ISBN number"], 
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
      enum: ["new", "like new", "used", "worn"], 
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
    collection: "books",
    timestamps: true, 
  }
);

module.exports = mongoose.model("Book", BookSchema);
