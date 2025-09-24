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
  resetCode: { type: String },
  resetCodeExpire: { type: Date },
});

module.exports = mongoose.model("User", UserSchema);
