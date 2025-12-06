import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const dbURI = process.env.MONGO_DB_URI.replace(
            '<db_username>',
            process.env.MONGO_DB_URI_USER
        ).replace('<db_password>', process.env.MONGO_DB_URI_PASSWORD)
        await mongoose.connect(dbURI)

        console.log('Conectado a la base de datos MongoDB')
    } catch (error) {
        console.error('Error al conectarse a la base de datos :', error)
    }
}

export const disconnectDB = async () => {
    try {
        await mongoose.disconnect()
        console.log('Desconectado de la base de datos MongoDB')
    } catch (error) {
        console.error('Error al desconectarse de la base de datos :', error)
    }
}
