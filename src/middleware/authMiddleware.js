const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleWare = (req, res, next) => {
  try {
    // Lấy token từ headers
    const token = req.headers.token.split(" ")[1];

    // Xác thực token
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: "error",
          message: "Authentication failed",
        });
      }

      // Kiểm tra xem người dùng có phải admin không
      if (user?.isAdmin) {
        next(); // Cho phép tiếp tục nếu là admin
      } else {
        return res.status(403).json({
          status: "error",
          message: "Not authorized",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
const authUserMiddleWare = (req, res, next) => {
  try {
    // Kiểm tra xem token có tồn tại trong headers hay không
    if (!req.headers.token) {
      return res.status(403).json({
        status: "error",
        message: "No token provided",
      });
    }

    const token = req.headers.token.split(" ")[1]; // Lấy phần token
    const userID = req.params.id;

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: "error",
          message: "Authentication failed",
        });
      }

      // Kiểm tra quyền admin hoặc user ID
      if (user?.isAdmin || user?.id === userID) {
        next();
      } else {
        return res.status(403).json({
          status: "error",
          message: "Not authorized",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = { authMiddleWare, authUserMiddleWare };
