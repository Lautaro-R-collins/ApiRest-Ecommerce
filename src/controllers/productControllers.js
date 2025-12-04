import Product from '../models/productModel.js'
import { productSchema } from '../schemas/productSchema.js'

export const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            brand,
            images,
            category,
            subcategory,
            subsubcategory,
            stock,
            isActive,
            discount,
            discountActive,
        } = productSchema.parse(req.body)

        const newProduct = new Product({
            name,
            description,
            price,
            brand,
            images,
            category,
            subcategory,
            subsubcategory,
            stock,
            isActive,
            discount,
            discountActive,
        })

        const savedProduct = await newProduct.save()

        return res.status(201).json({
            message: 'Producto creado exitosamente',
            product: savedProduct,
        })
    } catch (error) {
        console.error('Error al crear producto:', error)
        return res.status(500).json({
            message: 'Error interno del servidor',
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        // Validar datos
        const validatedData = productSchema.partial().parse(req.body)
        // Obtener el id
        const { id } = req.params
        // Actualizar en DB
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            validatedData,
            { new: true }
        )

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' })
        }

        return res.json({
            message: 'Producto actualizado correctamente',
            product: updatedProduct,
        })
    } catch (error) {
        console.error('Error actualizando producto:', error)
        if (error?.issues) {
            return res.status(400).json({
                message: 'Error de validación',
                errors: error.issues,
            })
        }

        return res.status(500).json({ message: 'Error interno del servidor' })
    }
}

export const getProductsById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' })
        }
        return res.json(product)
    } catch (error) {
        console.error('Error obteniendo producto:', error)
        return res.status(500).json({ message: 'Error interno del servidor' })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        let { category, subcategory } = req.query
        if (category) category = category.toLowerCase()
        if (subcategory) subcategory = subcategory.toLowerCase()

        const filter = {}

        if (category)
            filter.category = { $regex: new RegExp(`^${category}$`, 'i') }
        if (subcategory)
            filter.subcategory = { $regex: new RegExp(`^${subcategory}$`, 'i') }

        const products = await Product.find(filter)
        return res.json(products)
    } catch (error) {
        console.error('Error obteniendo productos:', error)
        return res.status(500).json({ message: 'Error interno del servidor' })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const deletedProduct = await Product.findByIdAndDelete(id)
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' })
        }
        return res.json({ message: 'Producto eliminado correctamente' })
    } catch (error) {
        console.error('Error eliminando producto:', error)
        return res.status(500).json({ message: 'Error interno del servidor' })
    }
}

// Buscar productos
export const searchProducts = async (req, res) => {
    const { query } = req.query

    if (!query || query.trim() === '') {
        return res.json([])
    }

    try {
        const regex = new RegExp(query, 'i')

        const results = await Product.find({
            $or: [
                { name: regex },
                { description: regex },
                { category: regex },
                { subcategory: regex },
                { brand: regex },
            ],
        })

        res.json(results)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error en el servidor' })
    }
}
