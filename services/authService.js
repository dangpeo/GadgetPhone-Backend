const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const register = async (data) => {
  const { username, password, role, email, phone, address, dob } = data;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, password: hashedPassword, role, email, phone, address, dob });
  await newUser.save();
  return { message: "Đăng ký thành công" };
};

const login = async (data) => {
  const { username, password } = data;
  const user = await User.findOne({ username });
  if (!user) throw new Error("Sai tài khoản hoặc mật khẩu");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Sai tài khoản hoặc mật khẩu");
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return { token, role: user.role };
};

const sendResetCode = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Email không tồn tại!');
  const code = crypto.randomInt(100000, 999999).toString();
  user.resetCode = code;
  user.resetCodeExpire = Date.now() + 10 * 60 * 1000;
  await user.save();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Mã xác thực đổi mật khẩu GadgetPhone',
    text: `Mã xác thực của bạn là: ${code}. Có hiệu lực trong 10 phút.`
  };
  await transporter.sendMail(mailOptions);
  return { message: 'Đã gửi mã xác thực về email!' };
};

const resetPassword = async ({ email, code, newPassword }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Email không tồn tại!');
  if (!user.resetCode || !user.resetCodeExpire || user.resetCode !== code || Date.now() > user.resetCodeExpire) {
    throw new Error('Mã xác thực không đúng hoặc đã hết hạn!');
  }
  user.password = await bcrypt.hash(newPassword, 10);
  user.resetCode = undefined;
  user.resetCodeExpire = undefined;
  await user.save();
  return { message: 'Đổi mật khẩu thành công!' };
};

module.exports = {
  register,
  login,
  sendResetCode,
  resetPassword
};
