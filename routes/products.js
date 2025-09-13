const express = require("express");
const router = express.Router();

// Fake product data
const products = [
  { id: 1, name: "iPhone 15 Pro", price: 29990000 },
  { id: 2, name: "Samsung Galaxy S24 Ultra", price: 25990000 },
  { id: 3, name: "Xiaomi 14 Pro", price: 18990000 }
];

// GET /api/products
router.get("/", (req, res) => {
  res.json(products);
});

module.exports = router;
