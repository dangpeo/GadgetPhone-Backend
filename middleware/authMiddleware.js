const jwt = require("jsonwebtoken");

const auth = (roles = []) => {
  return (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      if (!token) return res.status(401).json({ error: "Không có token" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Bạn không có quyền truy cập" });
      }

      next();
    } catch (err) {
      res.status(401).json({ error: "Token không hợp lệ" });
    }
  };
};

module.exports = auth;
