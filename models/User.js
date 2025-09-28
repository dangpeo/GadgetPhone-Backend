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
<<<<<<< HEAD
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
=======
>>>>>>> 1a504b80e387f35991947f14e0a5868d8fec50d2
});

module.exports = mongoose.model("User", UserSchema);
