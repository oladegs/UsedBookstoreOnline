var express = require("express");
var router = express.Router();

let cartController = require("../controllers/cart");
let authController = require("../controllers/auth");

// Define routes
router.post("/cart", cartController.createCartItem);
router.get("/cart/:userId", cartController.getCartItems);
router.put("/cart/:cart_id", cartController.updateCartItem);
router.delete("/cart/:cart_id", cartController.deleteCartItem);
router.get("/cart/:cart_id", cartController.findCartItem);

module.exports = router;
