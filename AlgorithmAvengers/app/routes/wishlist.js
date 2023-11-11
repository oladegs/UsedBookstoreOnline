var express = require("express");
var router = express.Router();

let wishListController = require("../controllers/wishlist");
let authController = require("../controllers/auth");



router.post('/create', wishlistController.createWishlistItem);
router.get('/get/:user_id', wishListController.getWishlistByUser);
router.delete('/delete/:wishList_id', wishlistController.deleteWishlistItem);
router.put('/update/:wishList_id', wishlistController.updateWishlistItem);

module.exports = router;
