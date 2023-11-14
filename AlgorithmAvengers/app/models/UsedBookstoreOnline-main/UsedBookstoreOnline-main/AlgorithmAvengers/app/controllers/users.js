let UserModel = require("../models/user");

//create a new user
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

//find user by id
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

//update user
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
