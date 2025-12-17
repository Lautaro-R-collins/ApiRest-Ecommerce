import express from 'express'
import Order from '../models/Order.js'
import Product from '../models/productModel.js'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { buyer, shipping, items } = req.body

        if (!items || items.length === 0) {
            return res
                .status(400)
                .json({ message: 'No hay productos en la orden.' })
        }

        const verifiedItems = []
        let total = 0

        // VALIDAR STOCK PRIMERO
        for (const item of items) {
            const product = await Product.findById(item.productId)

            if (!product) {
                return res
                    .status(404)
                    .json({ message: 'Producto no encontrado' })
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `No hay stock suficiente de "${product.name}". Stock disponible: ${product.stock}, solicitado: ${item.quantity}`,
                })
            }
        }

        // Calcular precios y preparar items
        for (const item of items) {
            const product = await Product.findById(item.productId)

            const finalPrice = product.discountActive
                ? Math.round(
                      product.price - (product.price * product.discount) / 100
                  )
                : product.price

            verifiedItems.push({
                productId: product._id,
                name: product.name,
                originalPrice: product.price,
                finalPrice: finalPrice,
                quantity: item.quantity,
                discountApplied: product.discountActive ? product.discount : 0,
            })

            total += finalPrice * item.quantity
        }

        // Descontar Stock
        for (const item of items) {
            await Product.findByIdAndUpdate(item.productId, {
                $inc: { stock: -item.quantity },
            })
        }

        // Crear orden
        const newOrder = await Order.create({
            buyer,
            shipping,
            items: verifiedItems,
            total,
        })

        res.json({ orderId: newOrder._id })
    } catch (err) {
        console.log('Error creando orden:', err)
        res.status(500).json({ message: 'Error creando orden' })
    }
})

export default router
