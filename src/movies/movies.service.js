const knex = require("../db/connection")

const list = (isShowing) => {
    if (isShowing) {
        return knex("movies_theaters as mt")
            .join("movies as m", "m.movie_id", "mt.movie_id")
            .select("m.*")
            .groupBy("m.movie_id",)
            .where({is_showing: true})
    } else {
        return knex("movies").select("*");
    }
    
}

const read = (movie_id) => {
    return knex("movies")
        .select("*")
        .where({movie_id})
        .first();
}
const listTheatersByMovieId = () => {
    return knex("movies_theaters as mt")
        .join("theaters as t", "t.theater_id", "mt.theater_id")
        .select("*");
}

const listReviews = () => {
    return knex("reviews")
        .select("*");
}
const listCritics = () => {
    return knex("critics")
        .select("*");
}
module.exports = {
    list,
    read,
    listTheatersByMovieId,
    listReviews,
    listCritics
}