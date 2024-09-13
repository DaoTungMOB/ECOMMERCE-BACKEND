const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// Hàm tạo Access Token
const generalAccessToken = async (payload) => {
  const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: "30s",
  });
  return access_token;
};
const generalRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN, {
    expiresIn: "365d",
  });
  return refresh_token;
};
const refreshTokenJWTService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("token", token);
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          resolve({
            status: "error",
            message: "Authentication failed",
          });
        } else {
          // Sử dụng trực tiếp user.id và user.isAdmin thay vì payload
          const access_token = await generalAccessToken({
            id: user.id,
            isAdmin: user.isAdmin,
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
