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

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/profile', profile)

router.put(
  '/avatar',
  authMiddleware,
  uploadAvatar.single('avatar'),
  updateAvatar
)

export default router
