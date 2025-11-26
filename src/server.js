import express from 'express'
import { config } from 'dotenv'
import { connectDB, disconnectDB } from './config/configDB.js'

//import routes
import authRoutes from './routes/authRoutes.js'

config()

const app = express()
const PORT = process.env.PORT || 3000

// Rutas Api

app.use('/api/auth', authRoutes)

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`)
        })
    })
    .catch(() => {
        disconnectDB()
    })

    