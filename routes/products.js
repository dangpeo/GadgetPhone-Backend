const express = require("express");
const router = express.Router();
<<<<<<< HEAD

const Product = require('../models/Product');
const productService = require('../services/productService');
const multer = require('multer');
const path = require('path');
=======
const multer = require('multer');
const path = require('path');
const productService = require('../services/productService');
>>>>>>> 1a504b80e387f35991947f14e0a5868d8fec50d2

// Thiết lập lưu file upload vào thư mục uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + file.fieldname + ext);
  }
});
const upload = multer({ storage });

// GET /api/products - lấy danh sách sản phẩm
router.get('/', async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

<<<<<<< HEAD
// GET /api/products/:id - lấy chi tiết 1 sản phẩm
router.get('/:id', async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    if (err.message === 'Không tìm thấy sản phẩm') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
});

=======
>>>>>>> 1a504b80e387f35991947f14e0a5868d8fec50d2
// POST /api/products - thêm sản phẩm mới (có upload ảnh)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const product = await productService.createProduct(req.body, req.file);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/products/:id - xóa sản phẩm
router.delete('/:id', async (req, res) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.json(result);
  } catch (err) {
<<<<<<< HEAD
    if (err.message === 'Không tìm thấy sản phẩm') {
      return res.status(404).json({ error: err.message });
    }
=======
>>>>>>> 1a504b80e387f35991947f14e0a5868d8fec50d2
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/products/:id - cập nhật sản phẩm
router.put('/:id', async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (err) {
<<<<<<< HEAD
    if (err.message === 'Không tìm thấy sản phẩm') {
      return res.status(404).json({ error: err.message });
    }
=======
>>>>>>> 1a504b80e387f35991947f14e0a5868d8fec50d2
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
