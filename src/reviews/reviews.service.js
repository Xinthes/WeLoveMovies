const knex = require("../db/connection")

const update = (reviewId, updatedReview) => {
    return knex("reviews")
        .select("*")
        .where({review_id: reviewId})
        .update(updatedReview, "*");
}

const getReviewById = (reviewId) => {
    return knex("reviews")
        .where({review_id: reviewId})
        .first()

}
const getCritics = () => {
    return knex("critics")
        .select("*")
}

const deleteReviewById = (reviewId) => {
    return knex("reviews")
        .where({review_id: reviewId}).del();
}

module.exports = {
    update,
    getReviewById,
    getCritics,
    deleteReviewById
}