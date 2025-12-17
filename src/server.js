import express from 'express'
import { config } from 'dotenv'
import { connectDB, disconnectDB } from './config/configDB.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'

// import routes
import authRoutes from './routes/authRoutes.js'
import productsRoutes from './routes/productsRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'

config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware CORS

app.use('/uploads', express.static(path.resolve('uploads')))

app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
)

app.use(cookieParser())
app.use(express.json())

// Rutas Api
app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/reviews', reviewRoutes)

// Conexión a la BD

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`)
        })
    })
    .catch(() => {
        disconnectDB()
    })
