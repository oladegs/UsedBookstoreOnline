/*
Order Model:

Fields: order_id, user_id, status, order_date, total_price
Purpose: Represents orders placed by users, tracks order status, and calculates the total price of an order.
*/
let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    order_id: {
      type: mongoose.Types.ObjectId, // or Schema.Types.ObjectId for automatic generation of unique order IDs
      index: true,
      required: true,
      auto: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId, // Reference to the User model's ID
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled", "refunded"], // Assuming these are the possible statuses
      default: "pending",
      required: true,
    },
    order_date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "orders", 
    timestamps: { createdAt: "order_date", updatedAt: false },
  }
);

module.exports = mongoose.model("Order", OrderSchema);
