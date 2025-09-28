const express = require("express");
const passport = require('passport');
const router = express.Router();
const authService = require('../services/authService');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Đăng ký
router.post("/register", async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Đăng nhập
router.post("/login", async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Quên mật khẩu: gửi mã về Gmail
router.post('/forgot-password', async (req, res) => {
  try {
    const result = await authService.sendResetCode(req.body.email);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Đổi mật khẩu mới bằng mã xác thực
router.post('/reset-password', async (req, res) => {
  try {
    const result = await authService.resetPassword(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Lấy thông tin người dùng hiện tại
router.get('/me', auth(), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// Đổi mật khẩu khi đã đăng nhập
router.post('/change-password', auth(), async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Thiếu mật khẩu' });
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    const ok = await bcrypt.compare(currentPassword, user.password);
    if (!ok) return res.status(400).json({ error: 'Mật khẩu hiện tại không đúng' });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Đổi mật khẩu thành công' });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Đổi mật khẩu thất bại' });
  }
});

// Cập nhật thông tin người dùng hiện tại
router.put('/me', auth(), async (req, res) => {
  try {
    const allowed = ['username', 'phone', 'address', 'email', 'dob'];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Lỗi cập nhật hồ sơ' });
  }
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;
