/*
Responsibilities:
Handling static pages: Manages the rendering of static pages, including the landing page, homepage, registration/login page, item detail page, checkout page, wishlist page, my account page, and confirmation page.
Implementing recommendations or featured books on the landing page.
Actions: landing, home, register, login, itemDetail, checkout, wishlist, myAccount, confirmation.
*/
let User = require("../models/user");
let Books = require("../models/books");
let Cart = require("../models/cart");
let Order = require("../models/order");
let WishList = require('../models/Wishlist');

let config = require("../../config/config");
let jwt = require("jsonwebtoken");
let { expressjwt } = require("express-jwt");

module.exports.signin = async function (req, res, next) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("User not found");
    if (!user.authenticate(req.body.password))
      throw new Error("Email and/or password don't match.");

    // Issue the token
    let payload = {
      id: user._id,
      username: user.username,
    };

    let token = jwt.sign(payload, config.SECRETKEY, {
      algorithm: "HS512",
      expiresIn: "20min",
    });

    // Send the token to the client
    return res.json({
      success: true,
      token: token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Checks the token validation
module.exports.requireSignin = expressjwt({
  secret: config.SECRETKEY,
  algorithms: ["HS512"],
  userProperty: "auth",
});

// Checks if the requester is allowed to perform the acction.
module.exports.hasAuthorization = async function (req, res, next) {
  let authorized =
    req.auth && req.user && req.user.username == req.auth.username;

  if (!authorized) {
    return res.status("403").json({
      success: false,
      message: "User is not authorized",
    });
  }
  next();
};

// Validates the owner of the item.
exports.isAllowed = async function (req, res, next) {
  try {
    let id = req.params.id;
    let inventoryItem = await Inventory.findById(id).populate("owner");

    // If there is no item found.
    if (inventoryItem == null) {
      throw new Error("Item not found."); // Express will catch this on its own.
    } else if (inventoryItem.owner != null) {
      // If the item found has a owner.

      if (inventoryItem.owner._id != req.auth.id) {
        // If the owner differs.

        let currentUser = await User.findOne({ _id: req.auth.id }, "admin");

        if (currentUser.admin != true) {
          // If the user is not a Admin

          console.log("====> Not authorized");
          return res.status(403).json({
            success: false,
            message: "User is not authorized to modify this item.",
          });
        }
      }
    }

    // If it reaches this point, runs the next middleware.
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
