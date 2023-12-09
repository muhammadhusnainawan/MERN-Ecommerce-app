const express = require("express");
const {
  registerUserController,
  authController,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/usersControllers");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

// user registration
router.route("/").post(registerUserController);

// post email and password
router.route("/login").post(authController);

//get user profile  Private Route
//put user profile update Private Route
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
