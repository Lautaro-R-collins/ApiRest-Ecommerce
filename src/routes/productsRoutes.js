import express from 'express'
import {
    createProduct,
    updateProduct,
    getProductsById,
    getAllProducts,
    deleteProduct
} from '../controllers/productControllers.js'

const router = express.Router()

// ===============
// RUTAS PÚBLICAS
// ===============

// Obtener todos los productos, con filtros por categoría
router.get('/', getAllProducts)

// Obtener un producto por ID
router.get('/:id', getProductsById)

// ============================
// RUTAS PRIVADAS (solo admin)
// ============================

router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router
