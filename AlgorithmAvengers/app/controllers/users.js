/*
UserController:

Responsibilities:
User registration: Handles user registration, including validating user input, creating user accounts, and securely storing passwords.
User authentication: Manages user login and logout functionality, verifying user credentials.
Account management: Allows users to update their account information, change passwords, and manage roles (seller or buyer).
Actions: register, login, logout, profile, updateProfile, changePassword, manageRoles.
*/
let UserModel = require("../models/user");

module.exports.create = async function (req, res, next) {
  try {
    let newUser = new UserModel(req.body);

    let result = await UserModel.create(newUser);
    res.json({
      success: true,
      message: "User created sucessfully.",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.list = async function (req, res, next) {
  try {
    let list = await UserModel.find({}, "-hashed_password -salt");
    res.json(list);
  } catch (error) {
    next(error);
  }
};

exports.userByID = async function (req, res, next) {
  try {
    let userId = req.params.userId;
    req.user = await UserModel.findOne(
      { _id: userId },
      "-hashed_password -salt"
    );
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.read = function (req, res) {
  res.json(req.user);
};

exports.update = async (req, res, next) => {
  try {
    let userId = req.params.userId;
    let updatedUser = UserModel(req.body);
    updatedUser._id = userId;

    let result = await UserModel.updateOne({ _id: userId }, updatedUser);
    console.log(result);
    if (result.modifiedCount > 0) {
      res.json({
        success: true,
        message: "User updated sucessfully.",
      });
    } else {
      // Express will catch this on its own.
      throw new Error("User not updated. Are you sure it exists?");
    }
  } catch (error) {
    next(error);
  }
};

module.exports.remove = async (req, res, next) => {
  try {
    let id = req.params.userId;
    let result = await UserModel.deleteOne({ _id: id });
    console.log("====> Result: ", result);
    if (result.deletedCount > 0) {
      res.json({
        success: true,
        message: "User deleted sucessfully.",
      });
    } else {
      // Express will catch this on its own.
      throw new Error("User not deleted. Are you sure it exists?");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.setAdmin = async function (req, res, next) {
  try {
    // Check if the current user is admin. Only admins can set another admin.
    let authorized = await UserModel.findOne({ _id: req.auth.id }, "admin");

    if (!authorized) {
      return res.status("403").json({
        success: false,
        message: "User is not authorized",
      });
    } else {
      // Update one single field.
      let result = await UserModel.updateOne(
        { _id: req.params.userId },
        { admin: true }
      );
      console.log("setAdmin", result);
      if (result.modifiedCount > 0) {
        res.json({
          success: true,
          message: "User promoted successfully.",
        });
      } else {
        // Express will catch this on its own.
        throw new Error("User not updated. Are you sure it exists?");
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
