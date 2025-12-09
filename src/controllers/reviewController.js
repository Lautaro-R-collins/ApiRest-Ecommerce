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

export const deleteReview = async (req, res) => {
    try {
        const { productId, reviewId } = req.params

        const product = await Product.findById(productId)
        if (!product)
            return res.status(404).json({ msg: 'Producto no encontrado' })

        const review = product.reviews.id(reviewId)
        if (!review)
            return res.status(404).json({ msg: 'Review no encontrada' })

        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'No autorizado' })
        }

        review.deleteOne()
        await product.save()

        res.json({ msg: 'Review eliminada' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: 'Error del servidor' })
    }
}
