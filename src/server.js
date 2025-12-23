import { config } from 'dotenv'
import { connectDB, disconnectDB } from './config/configDB.js'
import app from './app.js'

config()

const PORT = process.env.PORT || 3000

// Conexión a la BD
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`)
        })
    })
    .catch((error) => {
        console.error('Error al iniciar el servidor:', error)
        disconnectDB()
    })

