require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const session = require('express-session');
const passport = require('passport');
const path = require('path');
require('./middleware/googleAuth');

connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Phục vụ file ảnh tĩnh uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/users", require("./routes/users"));

// Route test
const auth = require("./middleware/authMiddleware");

app.get("/admin", auth(["admin"]), (req, res) => {
  res.json({ message: "Xin chào Admin!" });
});

app.get("/customer", auth(["customer", "admin"]), (req, res) => {
  res.json({ message: "Xin chào Customer!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server chạy tại cổng ${PORT}`));


