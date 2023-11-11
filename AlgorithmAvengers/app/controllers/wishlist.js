/*
WishlistController:

Responsibilities:
Adding to wishlist: Handles the addition of books to the user's wishlist.
Removing from wishlist: Allows users to remove books from their wishlist.
Viewing wishlist: Displays the books saved in the user's wishlist.
Actions: addToWishlist, removeFromWishlist, viewWishlist.
*/
let WishListModel = require("../models/wishlist");
exports.addToWishListModel = async function(req, res, next){
    try{
        let  newWishListItem = new WishListModel(req.body);
        
        let result = await WishListModel.create(newWishListItem);
        res.json({
            success : true,
            message :"Book added to wishlist sucessfully"

        });
    } catch(error){
        console.log(error);
        next(error);
    }
};
exports.removeFromWishlist = async function (req, res, next) {
    try {
      let wishlistItemId = req.params.wishlistItemId;
      let result = await WishListModel.deleteOne({ _id: wishlistItemId });
      console.log("Result: ", result);
      if (result.deletedCount > 0) {
        res.json({
          success: true,
          message: "Book removed from wishlist successfully.",
        });
      } else {
        throw new Error("Book not found in the wishlist. Make sure it exists.");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  