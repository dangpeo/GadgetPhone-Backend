const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const auth = require('../middleware/authMiddleware');

// Lấy danh sách tất cả người dùng (chỉ admin)
router.get('/', auth(['admin']), async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi lấy danh sách người dùng' });
  }
});

module.exports = router;
// Thêm người dùng mới (chỉ admin)
router.post('/', auth(['admin']), async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Lỗi khi tạo người dùng' });
  }
});

// Sửa thông tin người dùng (chỉ admin)
router.put('/:id', auth(['admin']), async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ error: 'Không tìm thấy user' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Lỗi khi cập nhật user' });
  }
});

// Xóa người dùng (chỉ admin)
router.delete('/:id', auth(['admin']), async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) return res.status(404).json({ error: 'Không tìm thấy user' });
    res.json({ message: 'Đã xóa user' });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Lỗi khi xóa user' });
  }
});
