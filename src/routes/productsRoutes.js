import express from "express";
import { createProduct, updateProduct } from "../controllers/productControllers.js"


const router = express.Router();

// ===============
// RUTAS PÚBLICAS
// ===============

// Obtener todos los productos, con filtros por categoría
router.get("/", async (req, res) => {
    res.json({ message: "Lista de productos" });
});

// Obtener un producto por ID
router.get("/:id", async (req, res) => {
    res.json({ message: "productor obtenido" });
});

// ============================
// RUTAS PRIVADAS (solo admin)          
// ============================

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", async (req, res) => {});

export default router;
