var express = require("express");
var router = express.Router();

let wishListController = require("../controllers/wishlist");
let authController = require("../controllers/auth");

router.post(
    "/wishlist",
    authController.authenticate, 
    wishListController.addToWishlist
  );

  router.delete(
    "/wishlist/:wishlistItemId",
    authController.authenticate, 
    wishListController.removeFromWishlist
  );
  router.get(
    "/wishlist",
    authController.authenticate, 
    wishListController.viewWishlist
  );
  
  module.exports = router;