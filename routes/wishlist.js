const express = require("express");
const router = express.Router();
const wishlistService = require('../services/wishlistService');
const authMiddleware = require('../middleware/authMiddleware');

// Test route không cần authentication
router.get('/test', (req, res) => {
  res.json({ message: 'Wishlist route works!' });
});

// Route GET /api/wishlist lấy danh sách wishlist (cần auth)
router.get('/', authMiddleware(), async (req, res) => {
  try {
    const list = await wishlistService.getWishlist(req.user.id);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Các routes khác cần authentication
router.use(authMiddleware());

// POST /api/wishlist/:productId - thêm sản phẩm vào wishlist
router.post('/:productId', async (req, res) => {
  try {
    const result = await wishlistService.addToWishlist(req.user.id, req.params.productId);
    res.json(result);
  } catch (err) {
    if (err.message === 'Sản phẩm đã có trong danh sách yêu thích') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/wishlist/:productId - xóa sản phẩm khỏi wishlist
router.delete('/:productId', async (req, res) => {
  try {
    const result = await wishlistService.removeFromWishlist(req.user.id, req.params.productId);
    res.json(result);
  } catch (err) {
    if (err.message === 'Sản phẩm không có trong danh sách yêu thích') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
});

// GET /api/wishlist/check/:productId - kiểm tra xem sản phẩm có trong wishlist không
router.get('/check/:productId', async (req, res) => {
  try {
    const isInWishlist = await wishlistService.isInWishlist(req.user.id, req.params.productId);
    res.json({ isInWishlist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
