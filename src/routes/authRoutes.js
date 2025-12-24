import express from 'express'

import {
    registerUser,
    profile,
    loginUser,
    logoutUser,
    updateAvatar,
} from '../controllers/authControllers.js'

import { authMiddleware } from '../middlewares/authMiddleware.js'
import { uploadAvatar } from '../middlewares/uploadAvatar.js'
import { validateSchema } from '../middlewares/validationMiddleware.js'
import { registerSchema, loginSchema } from '../schemas/authSchema.js'

const router = express.Router()

router.post('/register', validateSchema(registerSchema), registerUser)
router.post('/login', validateSchema(loginSchema), loginUser)
router.post('/logout', logoutUser)
router.get('/profile', profile)

router.put(
    '/avatar',
    authMiddleware,
    uploadAvatar.single('avatar'),
    updateAvatar
)

export default router
