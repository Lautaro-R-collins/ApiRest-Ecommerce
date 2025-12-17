import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // 🔥 ESTO ES LO QUE TE FALTA
    req.user = {
      userId: decoded.userId,
      isAdmin: decoded.isAdmin,
    }

    next()
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' })
  }
}
