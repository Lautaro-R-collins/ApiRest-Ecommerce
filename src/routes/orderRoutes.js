import express from "express";
import Order from "../models/Order.js";
import Product from "../models/productModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { buyer, shipping, items, total } = req.body;

    // Guardar orden
    const newOrder = await Order.create({ buyer, shipping, items, total });

    // Restar stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity }
      });
    }

    res.json({ orderId: newOrder._id });

  } catch (err) {
    console.log("Error creando orden:", err);
    res.status(500).json({ message: "Error creando orden" });
  }
});

export default router;
