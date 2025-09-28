const Product = require('../models/Product');

const getAllProducts = async () => {
  return await Product.find();
};

<<<<<<< HEAD
const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error('Không tìm thấy sản phẩm');
  return product;
};

const getBaseUrl = () => {
  // Ưu tiên biến môi trường, fallback localhost:5000
  const base = process.env.BASE_URL || 'http://localhost:5000'
  return base.replace(/\/$/, '')
}

=======
>>>>>>> 1a504b80e387f35991947f14e0a5868d8fec50d2
const createProduct = async (data, file) => {
  const { name, price, description, quantity } = data;
  let imageUrl = '';
  if (file) {
<<<<<<< HEAD
    const relative = '/uploads/' + file.filename;
    const base = getBaseUrl();
    imageUrl = `${base}${relative}`;
=======
    imageUrl = '/uploads/' + file.filename;
>>>>>>> 1a504b80e387f35991947f14e0a5868d8fec50d2
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
<<<<<<< HEAD
  getProductById,
=======
>>>>>>> 1a504b80e387f35991947f14e0a5868d8fec50d2
  createProduct,
  deleteProduct,
  updateProduct
};
