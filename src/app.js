import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import helmet from 'helmet'
import morgan from 'morgan'

// import routes
import authRoutes from './routes/authRoutes.js'
import productsRoutes from './routes/productsRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import { errorHandler } from './middlewares/errorMiddleware.js'

const app = express()

// Middleware
app.use(helmet())
app.use(morgan('dev'))
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

// Error Handler
app.use(errorHandler)

export default app
