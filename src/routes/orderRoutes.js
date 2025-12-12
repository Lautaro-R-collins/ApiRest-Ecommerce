import express from 'express'
import Order from '../models/Order.js'
import Product from '../models/productModel.js'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { buyer, shipping, items } = req.body;

        const verifiedItems = [];
        let total = 0;

        for (const item of items) {
            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }

            // Calcular precio con descuento
            const finalPrice = product.discountActive
                ? Math.round(product.price - (product.price * product.discount) / 100)
                : product.price;

            verifiedItems.push({
                productId: product._id,
                name: product.name,
                originalPrice: product.price,
                finalPrice: finalPrice,
                quantity: item.quantity,
                discountApplied: product.discountActive ? product.discount : 0
            });

            total += finalPrice * item.quantity;

            // Restar stock
            await Product.findByIdAndUpdate(product._id, {
                $inc: { stock: -item.quantity }
            });
        }

        // Crear orden validada
        const newOrder = await Order.create({
            buyer,
            shipping,
            items: verifiedItems,
            total
        });

        res.json({ orderId: newOrder._id });

    } catch (err) {
        console.log("Error creando orden:", err);
        res.status(500).json({ message: "Error creando orden" });
    }
});


export default router
