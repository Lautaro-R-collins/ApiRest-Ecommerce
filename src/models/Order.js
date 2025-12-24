import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    buyer: {
        name: String,
        email: String,
        phone: String,
    },
    shipping: {
        pais: String,
        codigoPostal: String,
        calle: String,
        numero: String,
        piso: String,
    },
    items: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            name: String,
            originalPrice: Number,
            finalPrice: Number,
            discountApplied: Number,
            quantity: Number,
        },
    ],
    total: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.model('Order', OrderSchema)
