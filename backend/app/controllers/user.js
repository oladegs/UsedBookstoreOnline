/*
UserController:

Responsibilities:
User registration: Handles user registration, including validating user input, creating user accounts, and securely storing passwords.
User authentication: Manages user login and logout functionality, verifying user credentials.
Account management: Allows users to update their account information, change passwords, and manage roles (seller or buyer).
Actions: register, login, logout, profile, updateProfile, changePassword, manageRoles.
*/
const UserModel = require("../models/user");
