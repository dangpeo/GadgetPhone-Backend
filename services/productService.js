const Product = require('../models/Product');

const getAllProducts = async () => {
  return await Product.find();
};

const createProduct = async (data, file) => {
  const { name, price, description, quantity } = data;
  let imageUrl = '';
  if (file) {
    imageUrl = '/uploads/' + file.filename;
  }
  const product = new Product({ name, price, description, quantity, image: imageUrl });
  await product.save();
  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error('Không tìm thấy sản phẩm');
  return { message: 'Đã xóa sản phẩm', product };
};

const updateProduct = async (id, data) => {
  const { name, price, description, quantity, image } = data;
  const product = await Product.findByIdAndUpdate(
    id,
    { name, price, description, quantity, image },
    { new: true }
  );
  if (!product) throw new Error('Không tìm thấy sản phẩm');
  return product;
};

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct
};
