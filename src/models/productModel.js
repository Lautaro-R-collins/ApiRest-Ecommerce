import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        brand: {
            type: String,
            default: 'Genérico',
        },

        images: {
            type: [String],
            default: [],
        },

        category: {
            type: String,
            required: true,
        },

        subcategory: {
            type: String,
            default: null,
        },

        subsubcategory: {
            type: String,
            default: null,
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
        discount: {
            type: Number, // Ej: 20 = 20% off
            default: 0,
        },
        discountActive: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

export default mongoose.model('Product', productSchema)
