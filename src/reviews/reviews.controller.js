const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reviews.service");

async function reviewExists (req, res, next) {
    const review = await service.getReviewById(req.params.reviewId)
    if (review) {
        res.locals.critics = await service.getCritics()
        res.locals.review= review;
        return next();
    }
    next({status: 404, message: `Review cannot be found`})
}

async function update (req, res, next) {
    const review = res.locals.review;
    const updatedReview = review;
    const {data: {content = review.content, score=review.score}} = req.body
    updatedReview.score=score;
    updatedReview.content=content;
    await service.update(
        updatedReview.review_id,
        updatedReview
    )
    const critic = res.locals.critics.find((critic) => critic.critic_id === updatedReview.critic_id)
    updatedReview.critic = critic
    updatedReview.created_at = "any string"
    updatedReview.updated_at = "anystring"
    res.json({data: updatedReview})
}

async function destroy (req, res, next) {
    await service.deleteReviewById(res.locals.review.review_id)
    res.sendStatus(204);
}

module.exports = {
    update: [asyncErrorBoundary(reviewExists), update],
    destroy: [asyncErrorBoundary(reviewExists), destroy]
}