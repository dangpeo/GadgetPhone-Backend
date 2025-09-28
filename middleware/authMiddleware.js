const jwt = require("jsonwebtoken");

const auth = (roles = []) => {
  return (req, res, next) => {
    try {
<<<<<<< HEAD
      const token = req.header("Authorization").replace("Bearer ", "");
=======
<<<<<<< HEAD
      const authHeader = req.header("Authorization");
      if (!authHeader) return res.status(401).json({ error: "Không có token" });

      const token = authHeader.replace("Bearer ", "");
=======
      const token = req.header("Authorization").replace("Bearer ", "");
>>>>>>> 1a504b80e387f35991947f14e0a5868d8fec50d2
>>>>>>> 85a077b0f0285e85d6fbf1f679d9266e6d95e69a
      if (!token) return res.status(401).json({ error: "Không có token" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Bạn không có quyền truy cập" });
      }

      next();
    } catch (err) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
      console.error("Auth middleware error:", err.message);
=======
>>>>>>> 1a504b80e387f35991947f14e0a5868d8fec50d2
>>>>>>> 85a077b0f0285e85d6fbf1f679d9266e6d95e69a
      res.status(401).json({ error: "Token không hợp lệ" });
    }
  };
};

module.exports = auth;
