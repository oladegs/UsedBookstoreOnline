const mongoose = require("mongoose");
let crypto = require("crypto");

/*
User Model:
Fields: id, username, email, password (hashed), role (seller or buyer)
Purpose: Stores user account information for authentication, registration, and role management.
*/

//user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid e-mail address"],
    },
    password: {
      type: String,
      required: "Passowrd is required",
    },
    salt: {
      type: String,
    },
    created: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    updated: {
      type: Date,
      default: Date.now,
    },
    admin: {
      type: Boolean,
      default: false,
    },

    // Other user attributes
  },
  {
    timestamps: true, // Automatically add "createdAt" and "updatedAt" timestamps
  },
  {
    collection: "user",
  }
);

UserSchema.virtual("fullName")
  .get(function () {
    return this.firstName + " " + this.lastName;
  })
  .set(function (fullName) {
    let splitName = fullName.split(" ");
    this.firstName = splitName[0] || "";
    this.lastName = splitName[1] || "";
  });

UserSchema.virtual("password").set(function (password) {
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  } else {
    this.salt = Buffer.from(
      crypto.randomBytes(16).toString("base64"),
      "base64"
    );
    this.hashed_password = this.hashPassword(password);
  }
});

UserSchema.methods.hashPassword = function (password) {
  return crypto
    .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
    .toString("base64");
};

UserSchema.methods.authenticate = function (password) {
  return this.hashed_password === this.hashPassword(password);
};

// Ensure virtual fields are serialised.
//The purpose of this code is to control how user data is represented when it's converted to JSON
UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hashed_password;
    delete ret.salt;
  },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
