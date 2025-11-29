import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import { registerSchema } from '../schemas/authSchema.js'

export const registerUser = async (req, res) => {
    try {
        // extraer datos y validar
        const { email, password, username } = registerSchema.parse(req.body)

        // comprobar si existe
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe' })
        }

        // encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10)

        // comprobar admin
        const isAdminUser = email === process.env.ADMIN_EMAIL

        // crear usuario
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            isAdmin: isAdminUser,
        })

        await newUser.save()

        // generar token JTW
        const token = jwt.sign(
            { userId: newUser._id, isAdmin: newUser.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        // enviar cookie segura
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        })

        // enviar respuesta final
        return res.status(201).json({
            message: 'Usuario registrado exitosamente',
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
            },
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Error interno del servidor' })
    }
}

export const profile = async (req, res) => {
    try {
        // Leer cookie
        const token = req.cookies.token;
        console.log("cookie:", token);

        if (!token) {
            return res.status(401).json({ error: "No hay token, usuario no autenticado" });
        }

        // Verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("datos decodificados:", decoded);

        // Buscar usuario en DB
        const user = await userModel.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        console.log("Usuario encontrado con éxito y enviando datos al front");

        return res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        });

    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
};
