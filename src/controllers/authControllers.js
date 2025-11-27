import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js'
import { registerSchema } from '../schemas/authSchema.js'

export const registerUser = async (req, res) => {
    try {
        // extrar los datos y validar
        const { email, password, username } = registerSchema.parse(req.body)

        // comprobar si el usuario existe
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe' })
        }

        // encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10)

        // comprobar admin
        const isAdminUser = email === process.env.ADMIN_EMAIL

        // guardar usuario en BD
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            isAdmin: isAdminUser,
        })

        await newUser.save()

        // respuesta final
        res.json({
            message: 'Usuario registrado exitosamente',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: error.errors || 'Error en el servidor' })
    }
}
