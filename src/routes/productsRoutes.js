import express from 'express'
import {
    createProduct,
    updateProduct,
    getProductsById,
    getAllProducts,
    deleteProduct,
    searchProducts,
} from '../controllers/productControllers.js'

const router = express.Router()

// ===============
// RUTAS PÚBLICAS
// ===============

router.get('/search', searchProducts)
router.get('/', getAllProducts)
router.get('/:id', getProductsById)

// ============================
// RUTAS PRIVADAS (solo admin)
// ============================

router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router
