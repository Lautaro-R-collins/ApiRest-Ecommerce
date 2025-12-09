import Review from '../models/reviewModel.js'

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

        // Datos del user desde el token
        const userId = req.user.userId
        const username = req.user.username

        const review = new Review({
            productId,
            userId,
            username,
            rating,
            comment,
        })

        await review.save()

        res.status(201).json({ message: 'Reseña publicada', review })
    } catch (error) {
        res.status(500).json({ error: 'No se pudo crear la reseña' })
    }
}
