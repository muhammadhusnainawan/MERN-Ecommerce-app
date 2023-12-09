const express = require("express");
const {
  getProducts,
  getProduct,
} = require("../controllers/productsControllers");
const router = express.Router();

// get routes for all products
router.route("/products").get(getProducts);
// get one product with id
router.route("/products/:id").get(getProduct);

module.exports = router;
