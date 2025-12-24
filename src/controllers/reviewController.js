import Review from '../models/reviewModel.js'
import User from '../models/userModel.js'

export const getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params
        const reviews = await Review.find({ productId }).sort({ createdAt: -1 })

        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo reseñas' })
    }
}

export const createReview = async (req, res) => {
    try {
        const { productId } = req.params
        const { rating, comment } = req.body

        const userId = req.user.userId

        const user = await User.findById(userId).select('username')

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }

        const review = new Review({
            productId,
            userId,
            username: user.username,
            rating,
            comment,
        })

        await review.save()

        res.status(201).json({ message: 'Reseña publicada', review })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'No se pudo crear la reseña' })
    }
}
