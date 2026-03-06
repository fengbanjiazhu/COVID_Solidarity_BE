import express from "express";

// import {
//   protect,
//   restrictTo,
//   login,
//   signup,
//   updatePassword,
// } from "../Controllers/authController.js";

const userRoute = express.Router();

// userRoute.route("/").get(protect, getMe);
// userRoute.route("/login").post(login);
// userRoute.route("/register").post(signup);
// userRoute.route("/checkEmail").get(checkEmail);

// userRoute.route("/update").patch(protect, updateCurrentUser);

export default userRoute;
