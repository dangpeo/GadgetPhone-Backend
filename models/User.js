const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["admin", "customer"], 
    default: "customer" 
  },
  email: { type: String },
  address: { type: String },
  phone: { type: String },
  dob: { type: Date },
  resetCode: { type: String },
  resetCodeExpire: { type: Date },
});

module.exports = mongoose.model("User", UserSchema);
