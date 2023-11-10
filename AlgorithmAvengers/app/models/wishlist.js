/*
Wishlist Model:
Fields: wishList_id, user_id,isbn
Purpose: Stores a list of books that users want to save for future consideration.
*/
let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishlistSchema = new Schema(
  {
    wishList_id: {
      type: mongoose.Types.ObjectId, // Automatically generated unique identifier for the wishlist item
      index: true,
      required: true,
      auto: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId, // References the User model's ID
      required: true,
      ref: "User",
    },
    isbn: {
      type: String,
      required: "ISBN is required",
      match: [/^\d{10,13}$/, "Please fill a valid ISBN number"], // Supports ISBN-10 or ISBN-13 format
    },
  },
  {
    collection: "wishlists", // The name of the collection in the database
    timestamps: true, // If you want to track when wishlist items are created or updated
  }
);

module.exports = mongoose.model("Wishlist", WishlistSchema);
