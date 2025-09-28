const User = require('../models/User');
const Product = require('../models/Product');

// Thêm sản phẩm vào wishlist
const addToWishlist = async (userId, productId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('Không tìm thấy người dùng');

  const product = await Product.findById(productId);
  if (!product) throw new Error('Không tìm thấy sản phẩm');

  // Kiểm tra xem sản phẩm đã có trong wishlist chưa
  const alreadyInWishlist = user.wishlist.some((id) => String(id) === String(productId));
  if (alreadyInWishlist) {
    throw new Error('Sản phẩm đã có trong danh sách yêu thích');
  }

  user.wishlist.push(productId);
  await user.save();
  
  return { message: 'Đã thêm vào danh sách yêu thích', product };
};

// Xóa sản phẩm khỏi wishlist
const removeFromWishlist = async (userId, productId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('Không tìm thấy người dùng');

  const productIndex = user.wishlist.findIndex((id) => String(id) === String(productId));
  if (productIndex === -1) {
    throw new Error('Sản phẩm không có trong danh sách yêu thích');
  }

  user.wishlist.splice(productIndex, 1);
  await user.save();
  
  return { message: 'Đã xóa khỏi danh sách yêu thích' };
};

// Lấy danh sách sản phẩm trong wishlist
const getWishlist = async (userId) => {
  const user = await User.findById(userId).populate('wishlist');
  if (!user) throw new Error('Không tìm thấy người dùng');

  return user.wishlist;
};

// Kiểm tra xem sản phẩm có trong wishlist không
const isInWishlist = async (userId, productId) => {
  const user = await User.findById(userId);
  if (!user) return false;

  return user.wishlist.some((id) => String(id) === String(productId));
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  isInWishlist
};
