const mongoose = require("mongoose");

// Định nghĩa schema cho order
const orderSchema = new mongoose.Schema(
  {
    // orderItem là một mảng của các đối tượng item
    orderItem: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    // Địa chỉ giao hàng
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      phone: { type: Number, required: true },
    },
    // Phương thức thanh toán
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    // Người dùng đặt hàng
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Trạng thái thanh toán và giao hàng
    isPaid: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    // Trường deletedAt để lưu thời gian xóa mềm
    deletedAt: { type: Date },
  },
  // Tự động thêm timestamps (createdAt, updatedAt)
  { timestamps: true }
);

// Tạo model Order từ schema
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
