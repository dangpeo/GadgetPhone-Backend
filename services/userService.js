const User = require('../models/User');

const getAllUsers = async () => {
  // Return all user fields except password so UI receives address and others
  return await User.find({}, '-password');
};

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
