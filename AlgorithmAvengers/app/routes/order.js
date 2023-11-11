var express = require("express");
var router = express.Router();

let orderController = require("../controllers/order");
let authController = require("../controllers/auth");

// Define routes
router.post("/order", orderController.createOrder);
router.get("/order/:user_id", orderController.getUserOrders);
router.put("/order/:order_id", orderController.updateOrderStatus);
router.delete("/order/:order_id", orderController.deleteOrder);
router.get("/order/:order_id", orderController.findOrderById);

module.exports = router;
