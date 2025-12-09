import express from "express";
import { createReview, getReviewsByProduct, deleteReview } from "../controllers/reviewController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET reseñas de un producto
router.get("/:productId", getReviewsByProduct);

// POST reseña (requiere login)
router.post("/:productId", authMiddleware, createReview);

// DELETE reseña (requiere login)   
router.delete("/:productId/:reviewId", authMiddleware, deleteReview);



export default router;
