const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");
const User = require("../models/UserModel");

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);

    if (!email || !password) {
      return res.status(200).json({
        status: "error",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "error",
        message: "The Input is email",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "error",
        message: "The password and confirmPassword is not match",
      });
    }

    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);

    if (!email || !password) {
      return res.status(200).json({
        status: "error",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "error",
        message: "The Input is email",
      });
    }

    const response = await UserService.loginUser(req.body);
    const { refresh_token, ...newResponse } = response;
    // console.log("response", response);
    res.cookie("refresh_token", refresh_token, {
      HttpOnly: true,
      Secure: true,
    });
    return res.status(200).json(newResponse);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const data = req.body;
    if (!userID) {
      return res.status(200).json({
        status: "error",
        message: "The userID is required",
      });
    }

    const response = await UserService.updateUser(userID, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userID = req.params.id;

    if (!userID) {
      return res.status(200).json({
        status: "error",
        message: "The userID is required",
      });
    }

    const response = await UserService.deleteUser(userID);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
};
const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
};
const getDetailsUser = async (req, res) => {
  try {
    const userID = req.params.id;

    if (!userID) {
      return res.status(200).json({
        status: "error",
        message: "The userID is required",
      });
    }

    const response = await UserService.getDetailsUser(userID);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
};
const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;

    if (!token) {
      return res.status(200).json({
        status: "error",
        message: "The token is required",
      });
    }

    const response = await JwtService.refreshTokenJWTService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
};
module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  refreshToken,
};
