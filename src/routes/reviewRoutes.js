import express from 'express'
import {
    createReview,
    getReviewsByProduct,
} from '../controllers/reviewController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

// GET reseñas de un producto
router.get('/:productId', getReviewsByProduct)

// POST reseña (requiere login)
router.post('/:productId', authMiddleware, createReview)

export default router
