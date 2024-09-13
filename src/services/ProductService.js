const Product = require("../models/ProductModel");
const bcrypt = require("bcrypt");
const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, countInStock, price, rating, description } =
      newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "OK",
          message: "The name of product  is already ",
        });
      }

      const newProduct = await Product.create({
        name,
        image,
        type,
        countInStock,
        price,
        rating,
        description,
      });
      if (newProduct) {
        resolve({
          status: "OK OK",
          message: "Create user success",
          data: newProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id });

      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "The product is not defined ",
        });
      }
      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK OK",
        message: "Create user success",
        data: updatedProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id });

      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "The product is not defined ",
        });
      }
      await Product.findByIdAndDelete(id);
      resolve({
        status: "OK OK",
        message: "Delete product success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Khai báo biến allProduct để lưu kết quả cuối cùng
      let allProduct;

      // Lấy tổng số sản phẩm
      const totalProduct = await Product.countDocuments();

      // Nếu có filter, thực hiện truy vấn có lọc
      if (filter) {
        const label = filter[0];
        const filterValue = filter[1];
        allProduct = await Product.find({
          [label]: { $regex: filterValue, $options: "i" }, // Sử dụng $regex để lọc
        })
          .limit(limit)
          .skip(page * limit);
      }

      // Nếu không có filter nhưng có sort, thực hiện sắp xếp
      else if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        allProduct = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);
      }

      // Nếu không có filter và sort, lấy danh sách sản phẩm bình thường
      else {
        allProduct = await Product.find()
          .limit(limit)
          .skip(page * limit);
      }

      // Tính toán số trang hiện tại và tổng số trang
      const pageCurrent = Number(page + 1);
      const totalPage = Math.ceil(totalProduct / limit);

      // Trả về kết quả cuối cùng
      resolve({
        status: "OK OK",
        message: "Success",
        data: allProduct,
        total: totalProduct,
        pageCurrent: pageCurrent,
        totalPage: totalPage,
      });
    } catch (e) {
      reject(e); // Bắt và trả lỗi nếu có
    }
  });
};

const getDetailProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({ _id: id });

      if (product === null) {
        resolve({
          status: "OK",
          message: "The product is not defined ",
        });
      }
      resolve({
        status: "OK OK",
        message: "Success",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createProduct,
  updateProduct,
  getDetailProduct,
  deleteProduct,
  getAllProduct,
};
