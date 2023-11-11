var express = require("express");
var router = express.Router();

let wishListController = require("../controllers/wishlist");
let authController = require("../controllers/auth");



router.post('/wishlist', wishlistController.createWishlistItem);
router.get('/wishlist/:user_id', wishListController.getWishlistByUser);
router.delete('/wishlist/:wishList_id', wishlistController.deleteWishlistItem);
router.put('/wishlist/:wishList_id', wishlistController.updateWishlistItem);

module.exports = router;
