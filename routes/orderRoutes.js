const express = require("express");
const { addOrderItem } = require("../controllers/orderControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

// create new order
router.route("/").post(protect, addOrderItem);


module.exports = router