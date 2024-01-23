import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [{ type: mongoose.ObjectId, ref: "products" }],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Processed",
      enum: ["Not Processed", "Processing", "Shipped", "Dilevered", "Canceled"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
