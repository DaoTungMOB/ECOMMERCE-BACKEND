const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Hàm tạo Access Token với cú pháp spread để trải payload
const generalAccessToken = async (payload) => {
  const access_token = jwt.sign(
    { ...payload }, // Sử dụng spread operator để trải các thuộc tính của payload
    process.env.ACCESS_TOKEN,
    { expiresIn: "30s" }
  );
  return access_token;
};

// Hàm tạo Refresh Token với cú pháp spread
const generalRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    { ...payload }, // Trải các thuộc tính của payload cho refresh token
    process.env.REFRESH_TOKEN,
    { expiresIn: "365d" }
  );
  return refresh_token;
};

// Hàm xử lý refresh token
const refreshTokenJWTService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("token", token);
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          console.log("err", err);
          resolve({
            status: "ERR",
            message: "Authentication failed",
          });
        } else {
          // Sử dụng user.id và user.isAdmin để tạo access token mới
          const access_token = await generalAccessToken({
            id: user?.id,
            isAdmin: user?.isAdmin,
          });
          console.log("access_token", access_token);
          resolve({
            status: "OK",
            message: "Success",
            access_token,
          });
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  generalAccessToken,
  generalRefreshToken,
  refreshTokenJWTService,
};
