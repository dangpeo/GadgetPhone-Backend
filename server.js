const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));

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
